import { useSession } from "next-auth/react";
import { UserProfile } from "types";

const useAuth = () => {
  const { data } = useSession();
  const user = data?.user;
  if (user) {
    return user as UserProfile;
  }
};

export default useAuth;
