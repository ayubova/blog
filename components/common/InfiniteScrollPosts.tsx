import axios from "axios";
import { FC, ReactNode, useState } from "react";

import { PostDetail } from "types";
import ConfirmModal from "./ConfirmModal";
import PostCard from "./PostCard";

interface Props {
  posts: PostDetail[];
  showControls?: boolean;
  hasMore: boolean;
  next(): void;
  dataLength: number;
  loader?: ReactNode;
  onPostRemoved(post: PostDetail): void;
}

const InfiniteScrollPosts: FC<Props> = ({
  posts,
  showControls,
  onPostRemoved,
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
    const { data } = await axios.delete(`/api/posts/${postToRemove.id}`);

    if (data.removed) onPostRemoved(postToRemove);

    setRemoving(false);
  };

  // const defaultLoader = (
  //   <p className="p-3 text-secondary-dark opacity-50 text-center font-semibold text-xl animate-pulse">
  //     Loading...
  //   </p>
  // );

  // TODO do pagination

  return (
    <>
      <div className="mx-auto md:p-12 p-5 w-full">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-12">
          {posts.map((post, index) => (
            <PostCard
              key={post.slug + index}
              post={post}
              controls={showControls}
              onDelete={() => handleOnDeleteClick(post)}
              busy={post.id === postToRemove?.id && removing}
            />
          ))}
        </div>
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

export default InfiniteScrollPosts;
