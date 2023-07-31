import {FC} from "react";
import {BsHeart, BsHeartFill} from "react-icons/bs";
import {BiLoader} from "react-icons/bi";

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
  const likeIcon = liked ? <BsHeartFill color="#ee3024" size={24}/> : <BsHeart size={24}/>;

  return (
    <button
      type="button"
      className="text-primary-dark dark:text-primary text-xs flex items-center space-x-4 outline-none"
      onClick={onClick}
    >
      {busy ? <BiLoader className="animate-spin" size={20} /> : likeIcon}
      <p className="hover:underline text-primary-dark dark:text-primary-light">{label}</p>
    </button>
  );
};

export default LikeHeart;
