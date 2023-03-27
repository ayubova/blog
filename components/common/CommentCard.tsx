import { FC, ReactNode, useState } from "react";
import ProfileIcon from "./ProfileIcon";
import dateFormat from "dateformat";
import parse from "html-react-parser";
import {
  BsFillReplyAllFill,
  BsFillTrashFill,
  BsPencilSquare,
} from "react-icons/bs";
import CommentForm from "./CommentForm";
import { CommentResponse } from "types";
import LikeHeart from "./LikeHeart";

interface Props {
  comment: CommentResponse;
  showControls?: boolean;
  onUpdateSubmit?(content: string): void;
  onReplySubmit?(content: string): void;
  onDeleteClick?(): void;
  onLikeClick?(): void;
  busy?: boolean;
}

const CommentCard: FC<Props> = ({
  comment,
  showControls = false,
  onUpdateSubmit,
  onReplySubmit,
  onDeleteClick,
  onLikeClick,
  busy,
}): JSX.Element => {
  const { owner, createdAt, content, likedByOwner, likes } = comment;
  const { name, avatar } = owner;
  const [showForm, setShowForm] = useState(false);
  const [initialState, setInitialState] = useState("");

  const displayReplyForm = () => {
    setInitialState("");
    setShowForm(true);
  };

  const hideReplyForm = () => {
    setShowForm(false);
  };

  const handleOnReplyClick = () => {
    displayReplyForm();
  };

  const handleOnEditClick = () => {
    displayReplyForm();
    setInitialState(content);
  };

  const handleCommentSubmit = (comment: string) => {
    if (initialState) {
      onUpdateSubmit && onUpdateSubmit(comment);
    } else {
      onReplySubmit && onReplySubmit(comment);
    }
    hideReplyForm();
  };

  return (
    <div className="flex space-x-3  bg-white dark:bg-secondary-mediumDark rounded p-4">
      <ProfileIcon nameInitial={name[0].toUpperCase()} avatar={avatar} />

      <div className="flex-1">
        <h1 className="italic text-primary-dark dark:text-primary font-semibold">
          {name}
        </h1>
        <span className="text-xs text-secondary-dark">
          {dateFormat(createdAt, "mmm d, yyyy")}
        </span>
        <div className="text-highlight-dark dark:text-primary-light">
          {parse(content)}
        </div>

        <div className="flex space-x-4 mt-2">
          <LikeHeart
            liked={likedByOwner}
            label={likes + " likes"}
            onClick={onLikeClick}
            busy={busy}
          />
          <Button onClick={handleOnReplyClick}>
            <BsFillReplyAllFill className="text-secondary-main hover:text-secondary-dark dark:text-primary-light" />
          </Button>
          {showControls && (
            <>
              <Button onClick={handleOnEditClick}>
                <BsPencilSquare className="text-secondary-main hover:text-secondary-dark dark:text-primary-light" />
              </Button>
              <Button onClick={onDeleteClick}>
                <BsFillTrashFill className="text-secondary-main hover:text-secondary-dark dark:text-primary-light" />
              </Button>
            </>
          )}
        </div>

        {showForm && (
          <div className="mt-3">
            <CommentForm
              onSubmit={handleCommentSubmit}
              onClose={hideReplyForm}
              initialState={initialState}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentCard;

interface ButtonProps {
  children: ReactNode;
  onClick?(): void;
}
const Button: FC<ButtonProps> = ({ children, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center text-primary-dark dark:text-primary space-x-2"
    >
      {children}
    </button>
  );
};
