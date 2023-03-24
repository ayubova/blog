import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { FC, useState } from "react";
import { CgProfile } from "react-icons/cg";

import AuthButtons from "../AuthButtons";
import Dropdown, { DropdownOptions } from "../Dropdown";
import ModalContainer from "../ModalContainer";
import ProfileHead from "../ProfileHead";
import Logo from "../Logo";
import ThemeButton from "../ThemeButton";
import { useRouter } from "next/router";
import { UserProfile } from "types";

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
  const [modalOpen, setModalOpen] = useState(false);

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

  return (
    <div className="flex items-center justify-between bg-secondary-light py-5 md:px-12 px-5 sticky top-0 z-10">
      <div className="flex space-x-4 md:space-x-8 mr-10">
        <Link href="/">
          <a className="flex items-center space-x-2 hover:scale-105">
            <Logo />
          </a>
        </Link>
      </div>

      <div className="flex items-center">
        <Link href="/">
          <span className="md:text-xl text-xs font-semibold font-heading text-secondary-dark hover:text-white uppercase mr-3">
            Blog
          </span>
        </Link>
        <Link href="/about">
          <span className="md:text-xl text-xs font-semibold font-heading text-secondary-dark hover:text-white uppercase mr-3">
            About
          </span>
        </Link>
        <div className="mr-3 flex">
          <ThemeButton />
        </div>
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
          <button
            className="text-secondary-dark"
            onClick={() => setModalOpen(true)}
          >
            <CgProfile size={24} />
          </button>
        )}
        <ModalContainer visible={modalOpen} onClose={() => setModalOpen(false)}>
          <div className="bg-background-pink drop-shadow-xl flex flex-col justify-center items-center p-16 rounded-lg lg:w-1/3 lg:h-1/2 w-full">
            <div className="text-heading font-semibold text-lg text-secondary-dark pb-8">
              Welcome to my blog!
            </div>
            <AuthButtons lightOnly />
          </div>
        </ModalContainer>
      </div>
    </div>
  );
};

export default UserNav;
