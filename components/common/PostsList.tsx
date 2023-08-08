import axios from "axios";
import {FC, ReactNode, useState} from "react";

import ConfirmModal from "./ConfirmModal";
import PostCard from "./PostCard";
import Pagination from "./Pagination";
import PostsListSkeleton from "./PostsListSkeleton";
import {PostDetail} from "types";

interface Props {
  posts: PostDetail[];
  showControls?: boolean;
  loader?: ReactNode;
  onPostRemoved(post: PostDetail): void;
  handlePageClick?(event: any): void;
  total?: number;
  itemsPerPage?: number;
  withoutPagination?: boolean;
  currentPage?: number;
  loading: boolean;
}

const PostsList: FC<Props> = ({
  posts,
  showControls,
  onPostRemoved,
  handlePageClick,
  total,
  itemsPerPage,
  withoutPagination,
  currentPage = 0,
  loading
}): JSX.Element => {
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
    const {data} = await axios.delete(`/api/posts/${postToRemove.id}`);

    if (data.removed) onPostRemoved(postToRemove);

    setRemoving(false);
  };

  return (
    <>
      <div className="w-full">
        <div className="grid lg:grid-cols-3 gap-10">
          {loading && <PostsListSkeleton/>}
          {!loading && posts.map((post, index) => (
            <PostCard
              key={post.slug + index}
              post={post}
              controls={showControls}
              onDelete={() => handleOnDeleteClick(post)}
              busy={post.id === postToRemove?.id && removing}
            />
          ))}
        </div>
        {!withoutPagination && handlePageClick && !!total && !!itemsPerPage && (
          <div className="flex justify-end pt-10">
            <Pagination
              handlePageClick={handlePageClick}
              total={total}
              itemsPerPage={itemsPerPage}
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
    </>
  );
};

export default PostsList;
