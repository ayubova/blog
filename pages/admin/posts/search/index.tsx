import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useCallback, useState } from "react";
import axios from "axios";

import AdminLayout from "components/layout/AdminLayout";
import PostsList from "components/common/PostsList";
import { filterPosts } from "utils/helper";

import { PostDetail } from "types";

interface Props {}

const Search: NextPage<Props> = () => {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<PostDetail[]>([]);

  const { query } = useRouter();
  const title = query.title;

  const handleSearch = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await axios(`/api/posts/search?title=${title}`);
      setLoading(false);
      setResults(data.results);
    } catch (error: any) {
      console.error(error.message);
      setLoading(false);
    }
  }, [title]);

  useEffect(() => {
    if (loading) return;
    handleSearch();
  }, [title]);

  return (
    <AdminLayout>
      {loading && <h1> Searching...</h1>}
      {!!results.length && !loading && (
        <PostsList
          hasMore={false}
          next={() => {}}
          dataLength={results.length}
          posts={results}
          showControls={true}
          onPostRemoved={(post) => setResults(filterPosts(results, post))}
        />
      )}
      {!results.length && !loading && (
        <h1 className="text-center text-3xl font-semibold opacity-40 text-secondary-dark">
          Not found :(
        </h1>
      )}
    </AdminLayout>
  );
};

export default Search;
