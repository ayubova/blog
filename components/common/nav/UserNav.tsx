import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { FC } from "react";
import { HiLightBulb } from "react-icons/hi";
import AuthButtons from "../AuthButtons";
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
    <div className="flex items-center justify-between bg-secondary-main py-5 md:px-12 px-5">
      <div className="flex space-x-4 md:space-x-8">
        <Link href="/">
          <a className="flex items-center space-x-2 ">
            <span className="md:text-2xl text-xs font-semibold text-primary-light pl-2 italic">
              {APP_NAME}
            </span>
          </a>
        </Link>
      </div>

      <div className="flex items-center space-x-3">
        <Link href="/">
          <a className="flex items-center space-x-2">
            <span className="md:text-xl text-xs font-semibold text-primary-main hover:text-white">
              Blog
            </span>
          </a>
        </Link>
        <Link href="/about">
          <a className="flex items-center space-x-2">
            <span className="md:text-xl text-xs font-semibold text-primary-main hover:text-white">
              About
            </span>
          </a>
        </Link>
        <button className="dark:text-secondary-dark text-highlight-light">
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
