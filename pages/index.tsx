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

import { formatPosts, readPostsFromDb, getTagsCollection } from "lib/utils";
import { PostDetail } from "types";
import { filterPosts } from "utils/helper";
import useAuth from "hooks/useAuth";

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

const Home: NextPage<Props> = ({ posts, tags }) => {
  const [postsToRender, setPostsToRender] = useState(posts);
  const [hasMorePosts, setHasMorePosts] = useState(posts.length >= limit);
  const [selectedTag, setSelectedTag] = useState<string>();

  const profile = useAuth();

  const isAdmin = profile && profile.role === "admin";

  const fetchMorePosts = () => {
    pageNo++;
    axios(
      `/api/posts?limit=${limit}&skip=${postsToRender.length}&tag=${selectedTag}`
    )
      .then(({ data }) => {
        if (data.posts.length < limit) {
          setPostsToRender([...postsToRender, ...data.posts]);
          setHasMorePosts(false);
        } else setPostsToRender([...postsToRender, ...data.posts]);
      }) // TODO: Don't call axios from components, move it to api
      .catch((error) => {
        setHasMorePosts(false);
        console.log(error);
      });
  };

  const fetchPosts = () => {
    axios(`/api/posts?limit=${limit}&skip=0&tag=${selectedTag}`)
      .then(({ data }) => {
        if (data.posts.length < limit) {
          setPostsToRender(data.posts);
          setHasMorePosts(false);
        } else setPostsToRender(data.posts);
      }) // TODO: Don't call axios from components, move it to api
      .catch((error) => {
        setHasMorePosts(false);
        console.log(error);
      });
  };

  useEffect(() => {
    if (selectedTag !== undefined) fetchPosts();
  }, [selectedTag]);

  return (
    <DefaultLayout>
      <div className="pb-20 flex md:flex-row flex-col md:space-x-10 justify-between">
        <PostsList
          hasMore={hasMorePosts}
          next={fetchMorePosts}
          dataLength={postsToRender.length}
          posts={postsToRender}
          showControls={isAdmin}
          onPostRemoved={(post) => setPostsToRender(filterPosts(posts, post))}
        />
        <Categories
          onClickTag={setSelectedTag}
          selectedTag={selectedTag}
          tags={tags}
        />
      </div>
    </DefaultLayout>
  );
};

interface ServerSideResponse {
  posts: PostDetail[];
  tags: string[];
}

let pageNo = 0;
const limit = 9;

export const getServerSideProps: GetServerSideProps<
  ServerSideResponse
> = async () => {
  try {
    const posts = await readPostsFromDb(limit, pageNo);
    const formattedPosts = formatPosts(posts);
    const tags = await getTagsCollection();

    return {
      props: {
        posts: formattedPosts,
        tags,
      },
    };
  } catch (error) {
    console.log(error);
    return { notFound: true };
  }
};

export default Home;
