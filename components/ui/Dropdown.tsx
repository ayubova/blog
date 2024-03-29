import {FC, ReactNode, useState} from "react";

interface Props {
  options: DropdownOptions;
  head: ReactNode;
}

export type DropdownOptions = { label: string; onClick(): void }[];

const Dropdown: FC<Props> = ({head, options}): JSX.Element => {
  const [showOptions, setShowOptions] = useState(false);

  return (
    <button
      onMouseDown={() => setShowOptions(!showOptions)}
      onBlur={() => setShowOptions(false)}
      className="relative"
    >
      {head}
      {showOptions && (
        <div className="min-w-max absolute top-full mt-4 right-2 z-40 border border-secondary-dark dark:border-primary text-left bg-primary-light dark:bg-primary-dark">
          <ul>
            {options.map(({label, onClick}, index) => {
              return (
                <li
                  className="text-primary-dark dark:text-primary-light hover:bg-secondary-light hover:text-primary-dark hover:dark:text-primary-dark px-4 py-3"
                  key={label + index}
                  onMouseDown={onClick}
                >
                  {label}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </button>
  );
};

export default Dropdown;
