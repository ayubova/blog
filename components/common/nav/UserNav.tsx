import Link from "next/link";
import {signOut} from "next-auth/react";
import {FC, useState, useEffect} from "react";
import {CgProfile} from "react-icons/cg";

import {useRouter} from "next/router";
import Dropdown, {DropdownOptions} from "../Dropdown";
import AuthModal from "../AuthModal";
import ProfileHead from "../ProfileHead";
import Logo from "../Logo";
import ThemeButton from "../ThemeButton";
import SearchBar from "../SearchBar";
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

  const {tag, search} = router.query;

  const [modalOpen, setModalOpen] = useState(false);

  const [prevScrollPos, setPrevScrollPos] = useState(0);

  const [menuVisible, setMenuVisible] = useState(true);

  const {user, status} = useAuth();

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

  const handleScroll = () => {
    const currentScrollPos = window.pageYOffset;
    setMenuVisible((prevScrollPos > currentScrollPos && prevScrollPos - currentScrollPos > 70) || currentScrollPos < 200);
    setPrevScrollPos(currentScrollPos);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);

  }, [prevScrollPos, menuVisible, handleScroll]);

  const handleSearchSubmit = (query: string) => {
    if (!query.trim()) return;
    router.push(`/?search=${query}`);
  };
  
  return (
    <div 
      className="flex items-center flex-col w-full bg-secondary-light sticky top-0 z-10"
    >
      <div className={`logo flex justify-center items-center transition-all duration-500
       ${menuVisible ? "h-20" : "h-16"} ${menuVisible ? "max-w-7xl" : ""}
       border-b border-slate-400 w-full transition-all`}>
        <Link href="/">
          <div className="hover:scale-105">
            <Logo menuVisible={menuVisible}/>
          </div>
        </Link>
      </div>

      <div className={`menu flex items-center transition-all justify-between py-3 px-3 md:px-12
       border-b border-slate-400 w-full bg-secondary-light fixed ${menuVisible ? "top-20" : "-top-24"}`}>
        <div className="categories lg:max-w-5xl flex lg:gap-x-10 gap-x-[8px] flex-wrap gap-y-3">
          <Link href="/" >
            <div className="flex items-center">
              <span className={`md:text-base text-xs font-heading text-primary-main transition-all
     after:w-0 after:h-[3px] after:block after:bg-action hover:after:w-full after:transition-all after:duration-500
     uppercase ${router.pathname === "/" && !tag && !search ? "after:w-full " : ""}`}>
             Latest
              </span>
            </div>
          </Link>

          {tags?.map(tagItem => (
            <Link href={`/?tag=${tagItem}`} key={tagItem} >
              <div className="flex items-center">
                <span className={`md:text-base text-xs font-heading text-primary-main transition-all
                  uppercase
                  after:w-0 after:h-[3px] after:block after:bg-action hover:after:w-full after:transition-all after:duration-500
                  ${tagItem === tag ? "after:w-full " : ""}`}>
                  {tagItem}
                </span>
              </div>
            </Link>
          ))}

          <Link href="/about" >
            <div className="flex items-center">
              <span className={`md:text-base text-xs font-heading text-primary-main transition-all
     after:w-0 after:h-[3px] after:block after:bg-action hover:after:w-full after:transition-all after:duration-500
     uppercase ${router.pathname === "/about" ? "after:w-full " : ""}`}>
              About
              </span>
            </div>
          </Link>
        </div>

        <div className="buttons flex items-center justify-center gap-x-3 md:gap-x-5">
          <SearchBar onSubmit={handleSearchSubmit}/>
          <div className="hidden md:flex">
            <ThemeButton />
          </div>
          {isAuth ? (
            <Dropdown
              options={dropDownOptions}
              head={(
                <ProfileHead
                  nameInitial={userName?.[0]}
                  avatar={user?.avatar}
                />
              )}
            />
          ) : (
            <button
              className="text-primary-main"
              onClick={() => setModalOpen(true)}
            >
              <CgProfile size={24} />
            </button>
          )}

          <AuthModal isOpen={modalOpen} handleClose={() => setModalOpen(false)}/>

        </div>
      </div>
    </div>
  );
};

export default UserNav;
