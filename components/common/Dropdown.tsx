import { FC, ReactNode, useState } from 'react';

interface Props {
  options: DropdownOptions;
  head: ReactNode;
}

export type DropdownOptions = { label: string; onClick(): void }[];

const Dropdown: FC<Props> = ({ head, options }): JSX.Element => {
  const [showOptions, setShowOptions] = useState(false);

  return (
    <button onMouseDown={() => setShowOptions(!showOptions)} onBlur={() => setShowOptions(false)} className="relative">
      {head}
      {showOptions && (
        <div className="min-w-max absolute top-full mt-4 right-2 z-40 border-2 border-primary-dark dark:border-primary rounded text-left bg-primary dark:bg-primary-dark">
          <ul className="p-3 space-y-3">
            {options.map(({ label, onClick }, index) => {
              return (
                <li className="text-primary-dark dark:text-primary" key={label + index} onMouseDown={onClick}>
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
