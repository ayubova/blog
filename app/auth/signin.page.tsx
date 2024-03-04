import {NextPage} from "next";
import AuthButtons from "components/common/AuthButtons";

const Signin: NextPage = () => {
  return (
    <div className="h-screen flex items-center justify-center bg-primary dark:bg-primary-dark">
      <AuthButtons />
    </div>
  );
};

export default Signin;
