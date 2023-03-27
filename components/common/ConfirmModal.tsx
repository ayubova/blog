import classNames from "classnames";
import { FC } from "react";
import { ImSpinner3 } from "react-icons/im";
import ModalContainer, { ModalProps } from "./ModalContainer";

interface Props extends ModalProps {
  title: string;
  subTitle: string;
  busy?: boolean;
  onCancel?(): void;
  onConfirm?(): void;
}

const commonBtnClasses = "px-3 py-1 text-white rounded";

const ConfirmModal: FC<Props> = ({
  visible,
  title,
  subTitle,
  busy = false,
  onClose,
  onCancel,
  onConfirm,
}): JSX.Element => {
  return (
    <ModalContainer visible={visible} onClose={onClose}>
      <div className="bg-secondary-mediumDark dark:bg-primary-light rounded p-10 max-w-[380px]">
        <p className="dark:text-primary-dark text-primary-light font-semibold font-heading text-center mb-5 text-lg">
          {title}
        </p>
        <p className="dark:text-primary-dark text-primary-light text-center">
          {subTitle}
        </p>
        {busy && (
          <p className="flex items-center space-x-2 dark:text-primary-dark text-primary pt-3">
            <ImSpinner3 className="animate-spin" />
            <span>Please wait</span>
          </p>
        )}
        {!busy && (
          <div className="flex justify-center space-x-2 pt-5">
            <button
              onClick={onConfirm}
              className={classNames(
                commonBtnClasses,
                "bg-red-300",
                "hover:bg-red-400"
              )}
            >
              Confirm
            </button>
            <button
              onClick={onCancel}
              className={classNames(
                commonBtnClasses,
                "bg-blue-300",
                "hover:bg-blue-400"
              )}
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </ModalContainer>
  );
};

export default ConfirmModal;
