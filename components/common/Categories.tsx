import { FC } from "react";

interface Props {
  onClickTag: (category: string) => void;
  selectedTag?: string;
  tags: string[];
}

const Categories: FC<Props> = ({
  selectedTag,
  onClickTag,
  tags,
}): JSX.Element => {
  return (
    <div className="md:pt-80 md:pr-10 flex flex-wrap space-x-2 md:space-x-5 h-full max-w-sm mx-auto justify-center">
      {tags.map((category) => (
        <div
          key={category}
          className={`rounded-full ${
            selectedTag === category
              ? "bg-primary-main text-secondary-main"
              : "bg-secondary-main text-primary-main"
          }  font-semibold
            h-5 flex items-center justify-center p-5 mt-5 cursor-pointer
            hover:text-secondary-main hover:bg-primary-main hover:drop-shadow-lg transition`}
          onClick={() => onClickTag(selectedTag !== category ? category : "")}
        >
          {category}
        </div>
      ))}
    </div>
  );
};

export default Categories;
