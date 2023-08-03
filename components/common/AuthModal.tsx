import {FC} from "react";

import AuthButtons from "./AuthButtons";
import ModalContainer from "./ModalContainer";

type Props = {
    isOpen: boolean,
    handleClose: ()=>void
};

const AuthModal: FC<Props> = ({isOpen, handleClose}): JSX.Element => {
  return (
    <ModalContainer visible={isOpen} onClose={handleClose}>
      <div className="bg-white drop-shadow-2xl flex flex-col justify-center items-center p-16 lg:w-1/2 lg:h-1/2 w-full min-h-[400px]">
        <div className="font-heading text-center text-2xl uppercase text-primary-dark pb-12">
              Welcome to my blog 🤝 !
        </div>
        <AuthButtons />
      </div>
    </ModalContainer>
  );
};

export default AuthModal;
