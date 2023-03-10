import { FC, useCallback } from "react";
import classNames from "classnames";
import { AiFillGithub } from "react-icons/ai";
import { AiFillGoogleCircle } from "react-icons/ai";
import { signIn } from "next-auth/react";

interface Props {
  lightOnly?: boolean;
  onClick?(): void;
}

const commonClasses =
  "flex items-center justify-center space-x-1 px-3 py-2 rounded hover:scale-[0.97] transition duration-100";

const AuthButtons: FC<Props> = ({ lightOnly }): JSX.Element => {
  const getStyle = useCallback(() => {
    if (lightOnly) return "text-primary-light bg-highlight-dark  ";
    return "bg-primary-dark dark:bg-primary dark:text-primary-dark text-primary";
  }, [lightOnly]); // TODO: inspect all useCallbacks (remove if not needed)

  const handleClickGithub = async () => {
    await signIn("github");
  };

  const handleClickGoogle = async () => {
    await signIn("google");
  };

  return (
    <div className="flex space-x-2">
      <button
        onClick={handleClickGithub}
        className={classNames(commonClasses, getStyle())}
      >
        <span className="md:text-lg text-xs">Continue with</span>
        <AiFillGithub size={24} />
      </button>
      <button
        onClick={handleClickGoogle}
        className={classNames(commonClasses, getStyle())}
      >
        <span className="md:text-lg text-xs">Continue with</span>
        <AiFillGoogleCircle size={24} />
      </button>
    </div>
  );
};

export default AuthButtons;
