import { FC } from "react";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import { BiLoader } from "react-icons/bi";

interface Props {
  busy?: boolean;
  label?: string;
  liked?: boolean;
  onClick?(): void;
}

const LikeHeart: FC<Props> = ({
  liked = false,
  label,
  busy,
  onClick,
}): JSX.Element => {
  const likeIcon = liked ? <BsHeartFill color="#ee3024" /> : <BsHeart />;

  return (
    <button
      type="button"
      className="text-primary-dark dark:text-primary text-xs flex items-center space-x-2 outline-none"
      onClick={onClick}
    >
      {busy ? <BiLoader className="animate-spin" size={20} /> : likeIcon}
      <span className="hover:underline">{label}</span>
    </button>
  );
};

export default LikeHeart;
