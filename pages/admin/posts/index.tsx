import { useEffect, useState } from "react";
import type {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import axios from "axios";

import PostsList from "components/common/PostsList";
import DefaultLayout from "components/layout/DefaultLayout";

import { formatPosts, readPostsFromDb, getTagsCollection } from "lib/utils";
import { PostDetail } from "types";
import { filterPosts } from "utils/helper";
import useAuth from "hooks/useAuth";

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

const limit = 9;

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

  const { user } = useAuth();

  const isAdmin = user && user.role === "admin";

  useEffect(() => {
    if (selectedTag !== undefined) fetchPosts();
  }, [selectedTag]);
  
  return (
    <DefaultLayout tags={tags}>
      <div className="lg:pb-0 pb-20 px-2 flex pt-10 lg:flex-row flex-col lg:space-x-12 lg:max-w-7xl justify-between">
        <PostsList
          total={total}
          handlePageClick={handlePageClick}
          posts={postsToRender}
          showControls={isAdmin}
          onPostRemoved={(post) => setPostsToRender(filterPosts(posts, post))}
          itemsPerPage={limit}
        />
      </div>
    </DefaultLayout>
  );
};

interface ServerSideResponse {
  posts: PostDetail[];
  tags: string[];
  totalPosts: number;
}

const pageNo = 0;

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
