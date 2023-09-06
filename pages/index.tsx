import {useCallback, useEffect, useState} from "react";
import type {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import axios from "axios";
import {useFirstMountState} from "react-use";

import {useRouter} from "next/router";
import PostsList from "components/common/PostsList";
import DefaultLayout from "components/layout/DefaultLayout";

import {formatPosts, readPostsFromDb, getTagsCollection} from "lib/utils";
import {PostDetail} from "types";
import {filterPosts} from "utils/helper";
import useAuth from "hooks/useAuth";

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

const limit = 9;

const Home: NextPage<Props> = ({posts, tags, totalPosts}) => {
  const [postsToRender, setPostsToRender] = useState(posts);
  const [currentPage, setCurrentPage] = useState(0);
  const [total, setTotal] = useState(totalPosts);
  const [loading, setLoading] = useState(false)

  const {tag, search} = useRouter().query;

  const fetchPosts = useCallback((pageNo: number, limit: number, tag: string, search: string) => {
    const params = new URLSearchParams({ 
      pageNo: `${pageNo}`,
      limit: `${limit}`, 
    });

    if (tag) {
      params.set("tag", tag as string);
    }
    if (search) {
      params.set("search", search as string);
    }
    setLoading(true)
    axios(`/api/posts?${params.toString()}`)
      .then(({data}) => {
        setCurrentPage(pageNo);
        setPostsToRender(data.posts);
        setTotal(data.total);
      })
      .catch((err) => console.log(err))
      .finally(()=> setLoading(false))
  }, [setPostsToRender, setTotal, setCurrentPage]);


  const handlePageClick = (event: any) => {
    setCurrentPage(event.selected);
    fetchPosts(event.selected, limit, tag as string, search as string)
  };

  const isFirstMount = useFirstMountState();

  useEffect(() => {
    if(!isFirstMount || tag || search) {
      setCurrentPage(0);
      fetchPosts(0, limit, tag as string, search as string);
    }
   
  }, [tag, search]);
  
  useEffect(() => {
    window.scrollTo({top: 0, behavior: "smooth"})
  }, [currentPage]) 

  const {user} = useAuth();

  const isAdmin = user && user.role === "admin";

  const filteredPosts = postsToRender?.filter(
    (post) => post?.draft !== "true" || isAdmin
  );

  return (
    <DefaultLayout tags={tags}>
      {search && <div className="text-4xl pt-10">{`Search '${search}'`}</div>}
      <div className="lg:pb-0 pb-20 px-5 flex pt-10 lg:flex-row flex-col lg:space-x-12 lg:max-w-6xl justify-between">
        <PostsList
          total={total}
          handlePageClick={handlePageClick}
          posts={filteredPosts}
          showControls={isAdmin}
          onPostRemoved={(post) => setPostsToRender(filterPosts(posts, post))}
          itemsPerPage={limit}
          currentPage={currentPage}
          loading={loading}
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
    const {posts, total} = await readPostsFromDb(limit, pageNo);

    const formattedPosts = formatPosts(posts);
    const tags = await getTagsCollection();

    return {
      props: {
        posts: formattedPosts || null,
        tags,
        totalPosts: total,
      },
    };
  } catch (error) {
    console.log(error);
    return {notFound: true};
  }
};

export default Home;
