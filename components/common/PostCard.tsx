import Image from "next/image";
import { FC } from "react";
import dateformat from "dateformat";
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
    <div className="rounded-lg hover:shadow-lg hover:scale-101 hover:translate-x-1 hover:translate-y-1  shadow-secondary-dark overflow-hidden bg-white dark:bg-primary-dark transition flex flex-col h-full pb-10">
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
        <Link href={"/" + slug}>
          <a>
            <div className="flex items-center justify-between text-sm text-neutral-500 dark:text-primary">
              <div className="flex items-center space-x-1 font-thin text-xs">
                {tags.map((t, index) => (
                  <span key={t + index}>#{t}</span>
                ))}
              </div>
              <span>{dateformat(createdAt, "d-mmm-yyyy")}</span>
            </div>

            <h1 className="font-semibold text-lg text-primary-main dark:text-primary py-2">
              {trimText(title, 50)}
            </h1>
            <p className="text-neutral-500 text-sm">{trimText(meta, 70)}</p>
          </a>
        </Link>

        {controls && (
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
        )}
      </div>
    </div>
  );
};

export default PostCard;
