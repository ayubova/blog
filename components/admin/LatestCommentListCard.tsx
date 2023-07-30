import { FC } from "react";
import { BsBoxArrowUpRight } from "react-icons/bs";
import parse from "html-react-parser";
import ProfileIcon from "../common/ProfileIcon";
import { trimText } from "utils/helper";
import { LatestComment } from "types";

interface Props {
  comment: LatestComment;
}

const LatestCommentListCard: FC<Props> = ({ comment }): JSX.Element => {
  const { owner, belongsTo, content } = comment;
  return (
    <div className="flex space-x-2">
      <ProfileIcon nameInitial={owner.name[0]} avatar={owner.avatar} />

      <div className="flex-1">
        <p className="font-semibold text-primary-dark dark:text-primary-light transition">
          {owner.name}{" "}
          <span className="text-sm text-secondary-dark">commented on</span>
        </p>

        <a
          href={"/" + belongsTo.slug}
          target="_blank"
          rel="noreferrer noopener"
          className="text-secondary-dark hover:underline"
        >
          <div className="flex items-center space-x-2 text-sm font-heading text-primary-dark font-semibold pb-4">
            <BsBoxArrowUpRight size={12} className="mr-4" />
            {trimText(belongsTo.title, 60)}
          </div>
        </a>

        <div className="text-secondary-dark dark:text-primary-light transition text-sm">
          {parse(content)}
        </div>
        <hr className="mt-2" />
      </div>
    </div>
  );
};

export default LatestCommentListCard;
