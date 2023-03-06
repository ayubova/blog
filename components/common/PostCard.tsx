import Image from "next/image";
import { FC } from "react";
import dateformat from "dateformat";
import { BsCalendar } from "react-icons/bs";

import { PostDetail } from "types";
import Link from "next/link";
import { trimText } from "utils/helper";

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
  const { title, slug, meta, createdAt, tags, thumbnail } = post;
  return (
    <div className="rounded-lg hover:shadow-lg hover:scale-101 hover:translate-x-1 hover:translate-y-1  shadow-secondary-dark dark:shadow-secondary-main overflow-hidden bg-white dark:bg-primary-light transition flex flex-col h-full pb-5">
      <Link href={"/" + slug}>
        <a>
          <div className="aspect-video relative">
            {!thumbnail ? (
              <div className="w-full h-full flex items-center justify-center text-secondary-dark opacity-50 font-semibold">
                No image
              </div>
            ) : (
              <Image src={thumbnail} layout="fill" alt="Thumbnail" />
            )}
          </div>

          <div className="p-4 flex-1 flex flex-col">
            <div className="flex items-center justify-between text-sm text-neutral-500 dark:text-primary">
              <div className="flex items-center space-x-2 font-thin text-xs">
                {tags.map((t, index) => (
                  <div
                    key={t + index}
                    className="bg-secondary-main rounded-full text-primary-main h-5 flex items-center justify-center p-3"
                  >
                    {t}
                  </div>
                ))}
              </div>
              <div className="text-highlight-dark flex items-center justify-between text-xs">
                <BsCalendar />
                <span className="ml-2">
                  {dateformat(createdAt, "mmm d, yyyy")}
                </span>
              </div>
            </div>

            <h1 className="font-semibold text-lg text-primary-main dark:text-primary-dark py-2">
              {trimText(title, 50)}
            </h1>
            <p className="text-neutral-500 dark:text-primary-light text-sm">
              {trimText(meta, 70)}
            </p>

            {/* {controls && (
              <div className="flex justify-end items-center h-8 mt-auto space-x-4 text-primary-dark dark:text-primary">
                {busy ? (
                  <span className="animate-pulse">Removing</span>
                ) : (
                  <>
                    <Link href={"/admin/posts/update/" + slug}>
                      <a className="hover:underline">Edit</a>
                    </Link>
                    <button onClick={onDelete} className="hover:underline">
                      Delete
                    </button>
                  </>
                )}
              </div>
            )} */}
          </div>
        </a>
      </Link>
    </div>
  );
};

export default PostCard;
