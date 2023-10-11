import {FC, MouseEventHandler} from "react";
import {BiLoader} from "react-icons/bi";
import {Tooltip} from "react-tippy";
interface Props {
  title: string;
  busy?: boolean;
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  icon?: React.ReactElement,
  tip?: string
}

const ActionButton: FC<Props> = ({
  disabled,
  busy = false,
  title,
  onClick,
  icon,
  tip
}): JSX.Element => {
  return tip ? (
    <Tooltip
      title={tip}
      position="bottom"
      trigger={"mouseenter"}
      theme="light"
      arrow
    >
      <button
        className="text-primary-light bg-secondary-dark drop-shadow-sm px-6 py-2 hover:scale-[0.97] duration-100 rounded w-full flex items-center justify-center space-x-2 transition disabled:opacity-50 disabled:hover:scale-100"
        onClick={onClick}
        disabled={disabled}
      >
        <div className="flex gap-x-4 justify-between items-center">
          {icon ?  icon : null}
          <span>{title}</span>
        </div>
        {busy && <BiLoader className="animate-spin" size={20} />}
      </button>
    </Tooltip>
  ) : (
    <button
      className="text-primary-light bg-secondary-dark drop-shadow-sm px-6 py-2 hover:scale-[0.97] duration-100 rounded w-full flex items-center justify-center space-x-2 transition disabled:opacity-50 disabled:hover:scale-100"
      onClick={onClick}
      disabled={disabled}
    >
      <div className="flex gap-x-4 justify-between items-center">
        {icon ?  icon : null}
        <span>{title}</span>
      </div>
      {busy && <BiLoader className="animate-spin" size={20} />}
    </button>
  );
};

export default ActionButton;
