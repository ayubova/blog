import { NextPage, InferGetStaticPropsType, GetStaticProps } from "next";

import BlogCard from "@/components/BlogCard";
import { readPostsInfo } from "@/lib/helper";
import type { PostApiResponse } from "../../types";

export const getStaticProps = async () => {
  const postInfo: PostApiResponse = readPostsInfo();
  return { props: { posts: postInfo } };
};

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const Posts: NextPage<Props> = ({ posts }) => {
  return (
    <div className=" mx-auto max-w-3xl p-5 space-y-5">
      {posts.map((post) => {
        return (
          <BlogCard
            key={post.slug}
            title={post.title}
            description={post.meta}
            slug={post.slug}
          />
        );
      })}
    </div>
  );
};

export default Posts;
