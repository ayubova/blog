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
    <div className="md:pt-7 md:pr-10 flex flex-wrap space-x-2 md:space-x-5 h-full max-w-sm mx-auto justify-center">
      {tags.map((category) => (
        <div
          key={category}
          className={`rounded ${
            selectedTag === category
              ? "bg-primary-dark text-secondary-main"
              : "bg-secondary-main text-primary-dark"
          }  font-semibold
            h-5 flex items-center justify-center p-4 mt-5 cursor-pointer
            hover:text-secondary-main hover:bg-primary-dark hover:drop-shadow-lg transition`}
          onClick={() => onClickTag(selectedTag !== category ? category : "")}
        >
          {category}
        </div>
      ))}
    </div>
  );
};

export default Categories;
