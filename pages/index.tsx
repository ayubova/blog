import { useEffect, useState } from "react";
import type {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import axios from "axios";

import PostsList from "components/common/PostsList";
import DefaultLayout from "components/layout/DefaultLayout";
import Categories from "components/common/Categories";
import SubscriptionForm from "components/common/SubscriptionForm";

import { formatPosts, readPostsFromDb, getTagsCollection } from "lib/utils";
import { PostDetail } from "types";
import { filterPosts } from "utils/helper";
import useAuth from "hooks/useAuth";

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

const limit = 6;

const Home: NextPage<Props> = ({ posts, tags, totalPosts }) => {
  const [postsToRender, setPostsToRender] = useState(posts);
  const [selectedTag, setSelectedTag] = useState<string>("");

  const [currentPage, setCurrentPage] = useState(0);
  const [total, setTotal] = useState(totalPosts);

  const handlePageClick = (event: any) => {
    setCurrentPage(event.selected);
    fetchPosts(event.selected);
  };

  const fetchPosts = (pageNo = currentPage) => {
    axios(`/api/posts?pageNo=${pageNo}&limit=${limit}&tag=${selectedTag}`)
      .then(({ data }) => {
        setPostsToRender(data.posts);
        setTotal(data.total);
      })
      .catch((err) => console.log(err));
  };

  useEffect(fetchPosts, [currentPage]);

  const profile = useAuth();

  const isAdmin = profile && profile.role === "admin";

  useEffect(() => {
    if (selectedTag !== undefined) fetchPosts();
  }, [selectedTag]);

  return (
    <DefaultLayout>
      <div className="lg:pb-0 pb-20 flex lg:flex-row flex-col lg:space-x-10 lg:pr-10 justify-between">
        <PostsList
          total={total}
          handlePageClick={handlePageClick}
          posts={postsToRender}
          showControls={isAdmin}
          onPostRemoved={(post) => setPostsToRender(filterPosts(posts, post))}
          itemsPerPage={limit}
        />
        <div className="flex flex-col h-full">
          <Categories
            onClickTag={setSelectedTag}
            selectedTag={selectedTag}
            tags={tags}
          />
          <SubscriptionForm />
        </div>
      </div>
    </DefaultLayout>
  );
};

interface ServerSideResponse {
  posts: PostDetail[];
  tags: string[];
  totalPosts: number;
}

let pageNo = 0;

export const getServerSideProps: GetServerSideProps<
  ServerSideResponse
> = async () => {
  try {
    const { posts, total } = await readPostsFromDb(limit, pageNo);

    const formattedPosts = formatPosts(posts);
    const tags = await getTagsCollection();

    return {
      props: {
        posts: formattedPosts,
        tags,
        totalPosts: total,
      },
    };
  } catch (error) {
    console.log(error);
    return { notFound: true };
  }
};

export default Home;
