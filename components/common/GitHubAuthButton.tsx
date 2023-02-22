import { FC, useCallback } from "react";
import classNames from "classnames";
import { AiFillGithub } from "react-icons/ai";
import { signIn } from "next-auth/react";

interface Props {
  lightOnly?: boolean;
  onClick?(): void;
}

const commonClasses =
  "flex items-center justify-center space-x-1 px-3 py-2 rounded hover:scale-[0.97] transition duration-100";

const GitHubAuthButton: FC<Props> = ({ lightOnly, onClick }): JSX.Element => {
  const getStyle = useCallback(() => {
    if (lightOnly) return "text-primary-dark bg-primary";
    return "bg-primary-dark dark:bg-primary dark:text-primary-dark text-primary";
  }, [lightOnly]);

  const handleClick = async () => {
    await signIn("github");
  };

  return (
    <button
      onClick={handleClick}
      className={classNames(commonClasses, getStyle())}
    >
      <span>Continue with</span>
      <AiFillGithub size={24} />
    </button>
  );
};

export default GitHubAuthButton;
