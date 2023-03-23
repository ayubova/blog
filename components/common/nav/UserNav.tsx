import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { FC } from "react";
import { HiLightBulb } from "react-icons/hi";
import AuthButtons from "../AuthButtons";
import { APP_NAME } from "../AppHead";
import Dropdown, { DropdownOptions } from "../Dropdown";
import ProfileHead from "../ProfileHead";
import Logo from "../Logo";
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

const UserNav: FC<Props> = (): JSX.Element => {
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
    <div className="flex items-center justify-between bg-secondary-light py-5 md:px-12 px-5 sticky top-0 z-10">
      <div className="flex space-x-4 md:space-x-8 mr-10">
        <Link href="/">
          <a className="flex items-center space-x-2 hover:scale-105">
            <Logo />
          </a>
        </Link>
      </div>

      <div className="flex items-center space-x-3">
        <Link href="/">
          <a className="flex items-center space-x-2">
            <span className="md:text-xl text-xs font-semibold font-heading text-secondary-dark hover:text-white uppercase">
              Blog
            </span>
          </a>
        </Link>
        <Link href="/about">
          <a className="flex items-center space-x-2">
            <span className="md:text-xl text-xs font-semibold font-heading text-secondary-dark hover:text-white uppercase">
              About
            </span>
          </a>
        </Link>
        <button className="dark:text-secondary-dark text-secondary-main">
          <HiLightBulb size={24} onClick={toggleTheme} />
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
          <AuthButtons lightOnly />
        )}
      </div>
    </div>
  );
};

export default UserNav;
