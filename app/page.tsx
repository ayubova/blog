import {Suspense} from "react"
import PostsList from "components/common/PostsList";

import {getPosts} from "api";

type Props = {
  searchParams: Record<string, string>,
}

export default async function Home ({
  searchParams,
}: Props) {
  const params = new URLSearchParams(searchParams);
  const {posts, total} = await getPosts(params.toString())


  return (
    <Suspense>
      <PostsList
        totalPosts={total}
        posts={posts}
      />
    </Suspense>
  );
}
