import {useSession} from "next-auth/react";
import {UserProfile} from "types";

const useAuth = () => {
  const {data, status} = useSession();

  const user = data?.user as UserProfile;

  return {user, status};
};

export default useAuth;
