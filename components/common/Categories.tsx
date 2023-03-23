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
    <div
      className="flex max-w-lg flex-wrap justify-center space-x-4
      p-10 rounded bg-transparent"
    >
      {tags.map((category) => (
        <div
          key={category}
          className={`rounded ${
            selectedTag === category
              ? "bg-white text-secondary-light"
              : "bg-secondary-light text-white"
          } font-heading 
            h-5 mt-2 flex items-center justify-center p-4  cursor-pointer
            hover:text-secondary-main hover:bg-white hover:drop-shadow-lg transition`}
          onClick={() => onClickTag(selectedTag !== category ? category : "")}
        >
          {category}
        </div>
      ))}
    </div>
  );
};

export default Categories;
