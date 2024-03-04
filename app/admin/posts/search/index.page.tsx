import {NextPage} from "next";
import {useRouter} from "next/navigation";
import {useEffect, useCallback, useState} from "react";
import {searchPosts}  from "api"

import AdminLayout from "components/layout/AdminLayout";
import PostsList from "components/common/PostsList";
import {filterPosts} from "utils/helper";

import {PostDetail} from "types";

const Search: NextPage = () => {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<PostDetail[]>([]);

  const {query} = useRouter();
  const title = query.title || "";

  const handleSearch = useCallback(async () => {
    try {
      setLoading(true);
      const {data} = await searchPosts(title as string);
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
      <div className="pt-10">
        {!!results.length && !loading && (
          <PostsList
            posts={results}
            showControls={true}
            onPostRemoved={(post) => setResults(filterPosts(results, post))}
            withoutPagination
          />
        )}
        {!results.length && !loading && (
          <h1 className="text-center text-3xl font-semibold opacity-40 text-secondary-dark">
            Not found :(
          </h1>
        )}
      </div>
    </AdminLayout>
  );
};

export default Search;
