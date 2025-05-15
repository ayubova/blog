import PostsList from "components/common/PostsList";

import {getPosts} from "api";

type Props = {
  searchParams: Record<string, string>,
}

export const revalidate = 60;

export default async function Home({searchParams}: Props) {
  const params = new URLSearchParams(searchParams);
  const {posts, total} = await getPosts(params.toString());

  return (
    <PostsList totalPosts={total} posts={posts} />
  );
}
