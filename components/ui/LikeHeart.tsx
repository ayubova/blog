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
  const likeIcon = liked ? <BsHeartFill color="#ee3024" size={20}/> : <BsHeart size={20} className="group-hover:text-primary-dark text-secondary-dark"/>;

  return (
    <button
      type="button"
      className="text-secondary-dark flex items-center space-x-4 outline-none group"
      onClick={onClick}
    >
      {busy ? <BiLoader className="animate-spin" size={20} /> : likeIcon}
      <p className="group-hover:text-primary-dark text-secondary-dark">{label}</p>
    </button>
  );
};

export default LikeHeart;
