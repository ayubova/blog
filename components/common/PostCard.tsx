import Image from "next/image";
import {FC} from "react";
import dateformat from "dateformat";
import {BsCalendar} from "react-icons/bs";
import {BiBarChartAlt} from "react-icons/bi";

import Link from "next/link";
import {PostDetail} from "types";
import {trimText} from "utils/helper";

interface Props {
  post: PostDetail;
  busy?: boolean;
  controls?: boolean;
  onDelete?(): void;
}

const PostCard: FC<Props> = ({
  post,
  busy = false,
  controls,
  onDelete,
}): JSX.Element => {
  const {title, slug, meta, createdAt, tags, thumbnail, views} = post;
  return (
    <div className="lg:min-w-s hover:brightness-90 cursor-pointer hover:scale-101  bg-transparent overflow-hidden transition-all flex flex-col h-full pb-5">
      <Link href={"/" + slug} legacyBehavior>
        <div>
          <div className="aspect-video relative">
            {!thumbnail ? (
              <div className="w-full h-full flex items-center justify-center text-secondary-dark opacity-50 font-semibold">
                No image
              </div>
            ) : (
              <Image src={thumbnail} layout="fill" alt="Thumbnail" />
            )}
          </div>

          <div className="flex flex-col gap-y-4 mt-4">
            <div className="flex items-center space-x-2 text-xs">
              {tags.map((tagItem, index) => (
                <Link href={`/?tag=${tagItem}`} key={tagItem+index}>
                  <span className={"border-b-2 border-action text-secondary-dark uppercase hover:text-primary-dark"}>
                    {tagItem}
                  </span>
                </Link>
              ))}
            </div>

            <h1 className="font-semibold text-base dark:text-primary-light text-primary-main hover:text-secondary-dark ">
              {trimText(title, 50)}
            </h1>
            <p className="text-neutral-500 text-sm">{trimText(meta, 300)}</p>
            <div className="flex items-center justify-between text-sm text-neutral-500 dark:text-primary">
              <div className="text-secondary-dark flex items-center justify-between text-xs">
                <BsCalendar />
                <span className="ml-2">
                  {dateformat(createdAt, "mmm d, yyyy")}
                </span>
              </div>
              {!!views && (
                <div className="text-secondary-main flex items-center justify-between text-xs">
                  <BiBarChartAlt />
                  <span className="ml-1">{views + " views"}</span>
                </div>
              )}
            </div>
            {controls && (
              <div className="flex justify-end items-center h-8 mt-auto space-x-4 text-primary-dark dark:text-primary">
                {busy ? (
                  <span className="animate-pulse">Removing</span>
                ) : (
                  <>
                    <Link href={"/admin/posts/update/" + slug}>
                      <div className="hover:underline">Edit</div>
                    </Link>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        onDelete?.();
                      }}
                      className="hover:underline"
                    >
                      Delete
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default PostCard;
