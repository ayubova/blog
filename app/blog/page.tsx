import PostsList from "components/common/PostsList";

import {getPosts} from "api";

const limit = 9;

export default async function Home () {
  const params = new URLSearchParams({
    pageNo: "0",
    limit: `${limit}`,
  });
  const {posts, total} = await getPosts(params.toString())


  return (
    <PostsList
      totalPosts={total}
      posts={posts}
    />
  );
}
