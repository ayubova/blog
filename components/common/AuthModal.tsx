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
      <div className="bg-secondary-light drop-shadow-xl flex flex-col justify-center items-center p-16 rounded-lg lg:w-1/3 lg:h-1/2 w-full">
        <div className="font-heading text-center text-3xl text-primary-dark pb-8">
              Welcome to my blog!
        </div>
        <AuthButtons lightOnly />
      </div>
    </ModalContainer>
  );
};

export default AuthModal;
