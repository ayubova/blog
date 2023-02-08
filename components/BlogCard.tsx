import { FC } from "react";
import Link from "next/link";

interface Props {
  title: string;
  description: string;
  slug: string;
}

const BlogCard: FC<Props> = ({
  title,
  description,
  slug,
}: Props): JSX.Element => {
  return (
    <Link href={`/posts/${slug}`} className="block">
      <div className=" bg-pink-100 p-5 rounded cursor-pointer">
        <h1 className="text-3xl font-semibold text-gray-600">{title}</h1>
        <p className="text-gray-400">{description}</p>
      </div>
    </Link>
  );
};

export default BlogCard;
