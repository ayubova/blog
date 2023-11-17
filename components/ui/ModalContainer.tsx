import {
  FC,
  ReactNode,
  useCallback,
  useEffect,
  useId,
} from "react";

export interface ModalProps {
  visible?: boolean;
  onClose?(): void;
}

interface Props extends ModalProps {
  children: ReactNode;
}

const ModalContainer: FC<Props> = ({
  visible,
  children,
  onClose,
}): JSX.Element | null => {
  const containerId = useId();
  const handleClose = useCallback(() => onClose && onClose(), [onClose]);

  const handleClick = ({target}: any) => {
    if (target.id === containerId) handleClose();
  };

  useEffect(() => {
    if (visible) {
      document.body.style.position = "fixed";
    }
    return () => {
      document.body.style.position = "";
    }
  },[visible])
  
  useEffect(() => {
    const closeModal = ({key}: any) => key === "Escape" && handleClose();
    document.addEventListener("keydown", closeModal);
    return () => {
      document.removeEventListener("keydown", closeModal)
    };
  }, [handleClose]);

  if (!visible) return null;

  return (
    <div
      id={containerId}
      onClick={handleClick}
      className="fixed inset-0 bg-primary-light dark:bg-primary-dark dark:bg-opacity-50 bg-opacity-50 backdrop-blur-[2px] z-50 flex items-center justify-center"
    >
      {children}
    </div>
  );
};

export default ModalContainer;
