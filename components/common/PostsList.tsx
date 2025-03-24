"use client"
import {FC, useState, useEffect, useCallback, useRef} from "react";

import {useSearchParams} from "next/navigation";
import {Suspense} from "react"
import ConfirmModal from "./ConfirmModal";
import PostCard from "./PostCard";
import Pagination from "./Pagination";
import PostsListSkeleton from "./PostsListSkeleton";

import {PostDetail} from "types";
import useAuth from "hooks/useAuth";
import {getPosts, deletePost} from "api";
import {filterPosts} from "utils/helper";

interface Props {
  posts: PostDetail[];
  totalPosts?: number;
}

const limit = 9;

const PostsList: FC<Props> = ({
  posts,
  totalPosts
}): JSX.Element => {
  const isFirstMount = useRef(true)
  const [postsToRender, setPostsToRender] = useState(posts);
  const [currentPage, setCurrentPage] = useState(0);
  const [total, setTotal] = useState(totalPosts);
  const [loading, setLoading] = useState(false);

  const searchParams = useSearchParams();
  const search = searchParams ? searchParams.get("search") : "";
  const tag = searchParams ? searchParams.get("tag") : "";

  const fetchPosts = useCallback(
    (pageNo: number, limit: number, tag: string, search: string) => {
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
      setLoading(true);
      getPosts(params.toString())
        .then(({posts, total}) => {
          setCurrentPage(pageNo);
          setPostsToRender(posts);
          setTotal(total);
        })
        .catch((err) => console.log(err))
        .finally(() => setLoading(false));
    },
    [setPostsToRender, setTotal, setCurrentPage]
  );

  const handlePageClick = (event: any) => {
    setCurrentPage(event.selected);
    fetchPosts(event.selected, limit, tag as string, search as string);
  };


  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false
    } else {
      setCurrentPage(0);
      fetchPosts(0, limit, tag as string, search as string);
    }
  }, [isFirstMount, tag, search]);

  useEffect(() => {
    window.scrollTo({top: 0, behavior: "smooth"});
  }, [currentPage]);

  const {user} = useAuth();

  const isAdmin = user && user.role === "admin";

  const filteredPosts = postsToRender?.filter(
    (post) => post?.draft !== "true" || isAdmin
  );

  const [removing, setRemoving] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [postToRemove, setPostToRemove] = useState<PostDetail | null>(null);

  const handleOnDeleteClick = (post: PostDetail) => {
    setPostToRemove(post);
    setShowConfirmModal(true);
  };

  const handleDeleteCancel = () => {
    setShowConfirmModal(false);
  };

  const handleDeleteConfirm = async () => {
    if (!postToRemove) return handleDeleteCancel();

    setShowConfirmModal(false);
    setRemoving(true);
    const {data} = await deletePost(postToRemove.id);

    if (data.removed) setPostsToRender(filterPosts(posts, postToRemove));

    setRemoving(false);
  };

  return (
    <Suspense>
      {search && <div className="text-4xl pt-10">{`Search '${search}'`}</div>} 
      <div className="lg:pb-0 pb-20 px-5 flex pt-10 lg:flex-row flex-col lg:space-x-12 lg:max-w-6xl justify-between">
        <div className="w-full">
          <div className="grid lg:grid-cols-3 gap-10">
            {loading && <PostsListSkeleton/>}
            {!loading && filteredPosts.map((post, index) => (
              <PostCard
                key={post.slug + index}
                post={post}
                controls={isAdmin}
                onDelete={() => handleOnDeleteClick(post)}
                busy={post.id === postToRemove?.id && removing}
              />
            ))}
          </div>
          {!!total && (
            <div className="flex justify-end pt-10">
              <Pagination
                handlePageClick={handlePageClick}
                total={total}
                itemsPerPage={limit}
                currentPage={currentPage}
              />
            </div>
          )}
        </div>
        <ConfirmModal
          visible={showConfirmModal}
          onClose={handleDeleteCancel}
          onCancel={handleDeleteCancel}
          onConfirm={handleDeleteConfirm}
          title="Are you sure?"
          subTitle="This action will remove this post permanently!"
        />
      </div>
    </Suspense>
  );
};

export default PostsList;
