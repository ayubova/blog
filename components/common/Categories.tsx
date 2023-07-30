import {FC} from "react";

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
    <div className="">
      <div className="text-secondary-dark dark:text-secondary-light pb-4 font-semibold font-heading text-lg">
        Topics
      </div>
      <div
        className="flex max-w-sm flex-wrap items-start 
      rounded bg-transparent"
      >
        {tags.map((category) => (
          <div
            key={category}
            className={`rounded ${
              selectedTag === category
                ? "bg-secondary-dark text-secondary-light"
                : "bg-secondary-light text-secondary-dark"
            } font-heading uppercase
            h-5 mb-4 mr-4 flex items-center justify-center p-4  cursor-pointer
            hover:text-secondary-main hover:bg-secondary-dark hover:drop-shadow-lg transition`}
            onClick={() => onClickTag(selectedTag !== category ? category : "")}
          >
            {category}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
