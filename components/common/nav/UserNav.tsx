import Link from "next/link";
import { signOut } from "next-auth/react";
import { FC, useState } from "react";
import { CgProfile } from "react-icons/cg";

import AuthButtons from "../AuthButtons";
import Dropdown, { DropdownOptions } from "../Dropdown";
import ModalContainer from "../ModalContainer";
import ProfileHead from "../ProfileHead";
import Logo from "../Logo";
import ThemeButton from "../ThemeButton";
import { useRouter } from "next/router";
import useAuth from "hooks/useAuth";

type Props = {
  tags: string[],
};

const defaultOptions: DropdownOptions = [
  {
    label: "Logout",
    async onClick() {
      await signOut();
    },
  },
];

const UserNav: FC<Props> = ({tags}): JSX.Element => {
  const router = useRouter();

  const {tag} = router.query;

  const [modalOpen, setModalOpen] = useState(false);

  const { user, status } = useAuth();

  const isAuth = status === "authenticated";

  const isAdmin = user && user.role === "admin";

  const userName = user?.name;

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
    <div 
    className="flex items-center flex-col w-full bg-secondary-light sticky top-0 z-10 "
    >
       <div className="logo flex justify-center items-center h-20 border-b border-slate-400	max-w-7xl w-full">
        <Link href="/">
          <a className="hover:scale-105">
            <Logo />
          </a>
        </Link>
      </div>

    <div className="menu flex items-center justify-between py-3 px-3 md:px-12 border-b border-slate-400 w-full">
        <div className="categories lg:max-w-5xl flex gap-x-3 flex-wrap">
        <Link href="/">
          <a>
            <span className={`md:text-base text-xs font-heading text-primary-main transition-all hover:border-b-[3px] duration-200 hover:border-action uppercase mr-3 ${router.pathname==='/' && !tag ? 'border-b-2 border-action': ''}`}>
             Latest
            </span>
          </a>
        </Link>

    {tags?.map(tagItem => (
      <Link href={`/?tag=${tagItem}`} key={tagItem}>
      <a>
       <span className={`md:text-base text-xs font-heading text-primary-main transition-all hover:border-b-[3px] duration-200 hover:border-action uppercase mr-3 ${tagItem===tag? 'border-b-2 border-action': ''}`}>
       {tagItem}
        </span>
     </a>
      </Link>
    ))}

        <Link href="/about">
          <a>
            <span className={`md:text-base text-xs font-heading text-primary-main transition-all hover:border-b-[3px] duration-200 hover:border-action uppercase mr-3 ${router.pathname==='/about' && !tag ? 'border-b-2 border-action': ''}`}>
              About
            </span>
          </a>
        </Link>
        </div>

        <div className="buttons flex items-center justify-center  md:gap-x-3">
        <div className="mr-3 hidden md:flex">
          <ThemeButton />
        </div>
        {isAuth ? (
          <Dropdown
            options={dropDownOptions}
            head={
              <ProfileHead
                nameInitial={userName?.[0]}
                avatar={user?.avatar}
              />
            }
          />
        ) : (
          <button
            className="text-primary-main hover:text-secondary-dark"
            onClick={() => setModalOpen(true)}
          >
            <CgProfile size={24} />
          </button>
        )}
        <ModalContainer visible={modalOpen} onClose={() => setModalOpen(false)}>
          <div className="bg-background-pink drop-shadow-xl flex flex-col justify-center items-center p-16 rounded-lg lg:w-1/3 lg:h-1/2 w-full">
            <div className="font-heading font-semibold text-lg text-secondary-dark pb-8">
              Welcome to my blog!
            </div>
            <AuthButtons lightOnly />
          </div>
        </ModalContainer>
      </div>
    </div>
    </div>
  );
};

export default UserNav;
