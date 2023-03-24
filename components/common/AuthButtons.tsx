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
  "flex items-center justify-center px-3 py-2 rounded-lg hover:scale-[0.95] transition duration-100 border border-slate-400";

const AuthButtons: FC<Props> = ({ lightOnly }): JSX.Element => {
  const getStyle = useCallback(() => {
    if (lightOnly) return "text-primary-dark";
    return "bg-primary-light dark:bg-primary dark:text-primary-dark text-primary";
  }, [lightOnly]); // TODO: inspect all useCallbacks (remove if not needed)

  const handleClickGithub = async () => {
    await signIn("github");
  };

  const handleClickGoogle = async () => {
    await signIn("google");
  };

  return (
    <div className="space-y-8">
      <button
        onClick={handleClickGithub}
        className={classNames(commonClasses, getStyle())}
      >
        <span className="mr-3">Continue with</span>
        <AiFillGithub size={24} />
      </button>
      <button
        onClick={handleClickGoogle}
        className={classNames(commonClasses, getStyle())}
      >
        <span className="mr-3">Continue with</span>
        <AiFillGoogleCircle size={24} />
      </button>
    </div>
  );
};

export default AuthButtons;
