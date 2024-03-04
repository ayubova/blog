import {FC, useEffect, useState} from "react";
import {CgProfile} from "react-icons/cg";
import AuthModal from "../AuthModal";
import ConfirmModal from "../ConfirmModal";
import Pagination from "../Pagination";
import CommentForm from "./components/CommentForm";
import CommentCard from "./components/CommentCard";
import {CommentResponse} from "types";
import useAuth from "hooks/useAuth";
import {
  getComments,
  postComment,
  addReplyComment,
  updateComment,
  deleteComment,
  likeComment,
  getCommentByPostId
} from "api";
interface Props {
  belongsTo?: string;
  fetchAll?: boolean;
}

const limit = 5;

const Comments: FC<Props> = ({belongsTo, fetchAll}): JSX.Element => {
  const [comments, setComments] = useState<CommentResponse[]>();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [commentToDelete, setCommentToDelete] =
    useState<CommentResponse | null>(null);
  const [busyCommentLike, setBusyCommentLike] = useState(false);
  const [selectedComment, setSelectedComment] =
    useState<CommentResponse | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const [currentPage, setCurrentPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);

  const fetchAllComments = async (pageNo = currentPage) => {
    try {
      const {data} = await getComments(pageNo, limit);
      setComments(data.comments);
      setTotal(data.total);
    } catch (error) {
      console.log(error);
    }
  };

  const handlePageClick = (event: any) => {
    setCurrentPage(event.selected);
    fetchAllComments(event.selected);
  };

  const {user} = useAuth();

  const insertNewReplyComments = (reply: CommentResponse) => {
    if (!comments) return;
    const updatedComments = [...comments];

    const chiefCommentIndex = updatedComments.findIndex(
      ({id}) => id === reply.repliedTo
    );
    const {replies} = updatedComments[chiefCommentIndex];
    if (replies) {
      updatedComments[chiefCommentIndex].replies = [...replies, reply];
    } else {
      updatedComments[chiefCommentIndex].replies = [reply];
    }

    setComments([...updatedComments]);
  };

  const updateEditedComment = (newComment: CommentResponse) => {
    if (!comments) return;

    const updatedComments = [...comments];

    if (newComment.chiefComment) {
      const index = updatedComments.findIndex(({id}) => id === newComment.id);
      updatedComments[index].content = newComment.content;
    } else {
      const chiefCommentIndex = updatedComments.findIndex(
        ({id}) => id === newComment.repliedTo
      );

      let newReplies = updatedComments[chiefCommentIndex].replies;
      newReplies = newReplies?.map((comment) => {
        if (comment.id === newComment.id) comment.content = newComment.content;
        return comment;
      });

      updatedComments[chiefCommentIndex].replies = newReplies;
    }

    setComments([...updatedComments]);
  };

  const updateDeletedComments = (deletedComment: CommentResponse) => {
    if (!comments) return;
    let newComments = [...comments];

    if (deletedComment.chiefComment)
      newComments = newComments.filter(({id}) => id !== deletedComment.id);
    else {
      const chiefCommentIndex = newComments.findIndex(
        ({id}) => id === deletedComment.repliedTo
      );
      const newReplies = newComments[chiefCommentIndex].replies?.filter(
        ({id}) => id !== deletedComment.id
      );
      newComments[chiefCommentIndex].replies = newReplies;
    }

    setComments([...newComments]);
  };

  const updateLikedComments = (likedComment: CommentResponse) => {
    if (!comments) return;
    let newComments = [...comments];

    if (likedComment.chiefComment)
      newComments = newComments.map((comment) => {
        if (comment.id === likedComment.id) return likedComment;
        return comment;
      });
    else {
      const chiefCommentIndex = newComments.findIndex(
        ({id}) => id === likedComment.repliedTo
      );
      const newReplies = newComments[chiefCommentIndex].replies?.map(
        (reply) => {
          if (reply.id === likedComment.id) return likedComment;
          return reply;
        }
      );
      newComments[chiefCommentIndex].replies = newReplies;
    }

    setComments([...newComments]);
  };

  const handleNewCommentSubmit = async (content: string) => {
    try {
      setSubmitting(true);
      const newComment = await postComment(content, belongsTo)
        .then(({data}) => {
          setSubmitting(false);
          return data.comment;
        })
        .catch((err) => console.log(err));
      if (newComment && comments) setComments([...comments, newComment]);
      else setComments([newComment]);
    } catch (err) {
      setSubmitting(false);
      console.error(err);
    }
  };

  const handleReplySubmit = (replyComment: {
    content: string;
    repliedTo: string;
  }) => {
    addReplyComment(replyComment)
      .then(({data}) => insertNewReplyComments(data.comment))
      .catch((err) => console.log(err));
  };

  const handleUpdateSubmit = (content: string, id: string) => {
    updateComment(content, id)
      .then(({data}) => updateEditedComment(data.comment))
      .catch((err) => console.log(err));
  };

  const handleOnDeleteClick = (comment: CommentResponse) => {
    setCommentToDelete(comment);
    setShowConfirmModal(true);
  };

  const handleOnDeleteCancel = () => {
    setCommentToDelete(null);
    setShowConfirmModal(false);
  };

  const handleOnDeleteConfirm = () => {
    if (!commentToDelete) return;

    deleteComment(commentToDelete.id).then(({data}) => {
      if (data.removed) updateDeletedComments(commentToDelete);
    })
      .catch((err) => console.log(err))
      .finally(() => {
        setCommentToDelete(null);
        setShowConfirmModal(false);
      });
  };

  const handleOnLikeClick = (comment: CommentResponse) => {
    setBusyCommentLike(true);
    setSelectedComment(comment);
    likeComment(comment.id)
      .then(({data}) => {
        updateLikedComments(data.comment);
        setBusyCommentLike(false);
        setSelectedComment(null);
      })
      .catch((err) => {
        console.log(err);
        setBusyCommentLike(false);
        setSelectedComment(null);
      });
  };

  useEffect(() => {
    if (!belongsTo) return;
    getCommentByPostId(belongsTo)
      .then(({data}) => {
        console.log("data", data);

        setComments(data.comments);
      })
      .catch((err) => console.log(err));
  }, [belongsTo]);

  useEffect(() => {
    if (!belongsTo && fetchAll) {
      fetchAllComments();
    }
  }, [belongsTo, fetchAll]);

  return (
    <div className="py-10 space-y-10">
      {user ? (
        <CommentForm
          visible={!fetchAll}
          onSubmit={handleNewCommentSubmit}
          busy={submitting}
        />
      ) : (
        <div className="space-x-4 flex items-center group">
          <CgProfile
            size={24}
            className="text-secondary-dark group-hover:text-primary-dark"
          />
          <h3
            className="text-secondary-dark text-lg w-fit cursor-pointer group-hover:text-primary-dark"
            onClick={() => setModalOpen(true)}
          >
            Log in to add your comment
          </h3>
        </div>
      )}
      <AuthModal isOpen={modalOpen} handleClose={() => setModalOpen(false)} />

      {comments?.map((comment) => {
        const {replies} = comment;
        return (
          <div key={comment.id}>
            <CommentCard
              comment={comment}
              showControls={user?.id === comment.owner.id}
              onReplySubmit={(content) =>
                handleReplySubmit({content, repliedTo: comment.id})
              }
              onUpdateSubmit={(content) =>
                handleUpdateSubmit(content, comment.id)
              }
              onDeleteClick={() => handleOnDeleteClick(comment)}
              onLikeClick={() => handleOnLikeClick(comment)}
              busy={selectedComment?.id === comment.id && busyCommentLike}
            />

            {replies?.length ? (
              <div className="w-[93%] ml-auto space-y-3">
                <h1 className="text-secondary-dark my-3 text-lg">Replies</h1>
                {replies.map((reply) => {
                  return (
                    <CommentCard
                      key={reply.id}
                      comment={reply}
                      showControls={user?.id === reply.owner.id}
                      onReplySubmit={(content) =>
                        handleReplySubmit({content, repliedTo: comment.id})
                      }
                      onUpdateSubmit={(content) =>
                        handleUpdateSubmit(content, reply.id)
                      }
                      onDeleteClick={() => handleOnDeleteClick(reply)}
                      onLikeClick={() => handleOnLikeClick(reply)}
                      busy={selectedComment?.id === reply.id && busyCommentLike}
                    />
                  );
                })}
              </div>
            ) : null}
          </div>
        );
      })}
      {fetchAll ? (
        <div className="py-10 flex justify-end">
          <Pagination
            handlePageClick={handlePageClick}
            total={total}
            itemsPerPage={limit}
          />
        </div>
      ) : null}

      <ConfirmModal
        visible={showConfirmModal}
        title="Are you sure?"
        subTitle="This action will remove this comment and replies if this is main comment"
        onCancel={handleOnDeleteCancel}
        onConfirm={handleOnDeleteConfirm}
      />
    </div>
  );
};

export default Comments;
