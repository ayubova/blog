import { FC } from "react";

interface Props {}

const categories = [
  "style",
  "movie",
  "book",
  "programming",
  "beauty",
  "cat",
  "sport",
  "music",
];

const Categories: FC<Props> = (props): JSX.Element => {
  return (
    <div className="md:pt-80 md:pr-10 flex flex-wrap space-x-2 md:space-x-5 h-full max-w-sm mx-auto justify-center">
      {categories.map((category) => (
        <div
          key={category}
          className="rounded-full bg-secondary-main font-semibold
           text-primary-main h-5 flex items-center justify-center p-5 mt-5 cursor-pointer
            hover:text-secondary-main hover:bg-primary-main hover:drop-shadow-lg transition"
        >
          {category}
        </div>
      ))}
    </div>
  );
};

export default Categories;
