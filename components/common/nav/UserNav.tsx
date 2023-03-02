import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { FC } from "react";
import { HiLightBulb } from "react-icons/hi";
import GitHubAuthButton from "../GitHubAuthButton";
import { APP_NAME } from "../AppHead";
import Dropdown, { DropdownOptions } from "../Dropdown";
import Logo from "../Logo";
import ProfileHead from "../ProfileHead";
import { useRouter } from "next/router";
import { UserProfile } from "types";
import useDarkMode from "hooks/useDarkMode";

interface Props {}

const defaultOptions: DropdownOptions = [
  {
    label: "Logout",
    async onClick() {
      await signOut();
    },
  },
];

const UserNav: FC<Props> = (props): JSX.Element => {
  const router = useRouter();
  const { data, status } = useSession();

  const isAuth = status === "authenticated";
  const profile = data?.user as UserProfile | undefined;
  const isAdmin = profile && profile.role === "admin";
  const userName = profile?.name;

  const dropDownOptions: DropdownOptions = isAdmin
    ? [
        {
          label: "Dashboard",
          onClick() {
            router.push("/admin");
          },
        },
        ...defaultOptions,
      ]
    : defaultOptions;
  const { toggleTheme } = useDarkMode();
  return (
    <div className="flex items-center justify-between bg-secondary-main py-8 px-4">
      <Link href="/">
        <a className="flex items-center space-x-2">
          <Logo className="fill-primary-main md:w-8 md:h-8 w-5 h-5" />
          <span className="md:text-xl text-xs font-semibold text-primary-main pl-2">
            {APP_NAME}
          </span>
        </a>
      </Link>

      <div className="flex items-center space-x-3">
        <button className="dark:text-secondary-dark text-highlight-light">
          <HiLightBulb size={34} onClick={toggleTheme} />
        </button>
        {isAuth ? (
          <Dropdown
            options={dropDownOptions}
            head={
              <ProfileHead
                nameInitial={userName?.[0]}
                lightOnly
                avatar={profile?.avatar}
              />
            }
          />
        ) : (
          <GitHubAuthButton lightOnly />
        )}
      </div>
    </div>
  );
};

export default UserNav;
