import {FC} from "react";
import {AiFillGithub} from "react-icons/ai";
import {FcGoogle} from "react-icons/fc";
import {signIn} from "next-auth/react";

interface Props {
  onClick?(): void;
}

const AuthButtons: FC<Props> = (): JSX.Element => {

  const handleClickGithub = async () => {
    await signIn("github");
  };

  const handleClickGoogle = async () => {
    await signIn("google");
  };

  return (
    <div className="space-y-10">
      <div className="after:w-0 after:h-[2px] after:block after:bg-action hover:after:w-full after:transition-all after:duration-500">
        <button
          onClick={handleClickGithub}
          className= "text-primary-dark uppercase flex items-center justify-center py-1"
        >
          <span className="mr-3">Continue with</span>
          <AiFillGithub size={24} />
        </button>
      </div>
      <div className="after:w-0 after:h-[2px] after:block after:bg-action hover:after:w-full after:transition-all after:duration-500">
        <button
          onClick={handleClickGoogle}
          className= "text-primary-dark uppercase flex items-center justify-center py-1"
        >
          <span className="mr-3">Continue with</span>
          <FcGoogle size={24} />
        </button>
      </div>

    </div>
  );
};

export default AuthButtons;
