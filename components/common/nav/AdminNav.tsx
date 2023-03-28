import Link from "next/link";
import { FC, useEffect, useState } from "react";
import { IconType } from "react-icons";
import { RiMenuFoldFill, RiMenuUnfoldFill } from "react-icons/ri";

import Logo from "../Logo";

import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";

interface Props {
  navItems: { label: string; icon: IconType; href: string }[];
}

const NAV_OPEN_WIDTH = "w-60";
const NAV_CLOSE_WIDTH = "w-12";
const NAV_VISIBILITY = "nav-visibility";

const AdminNav: FC<Props> = ({ navItems }): JSX.Element => {
  const [visible, setVisible] = useState(true);

  const updateNavState = () => {
    const newState = !visible;
    setVisible(newState);
    localStorage.setItem(NAV_VISIBILITY, JSON.stringify(newState));
  };

  useEffect(() => {
    const navState = localStorage.getItem(NAV_VISIBILITY);
    if (navState !== null) {
      const newState = JSON.parse(navState);
      setVisible(newState);
    } else {
      setVisible(true);
    }
  }, []);

  return (
    <nav
      className={`${
        visible ? NAV_OPEN_WIDTH : NAV_CLOSE_WIDTH
      } h-screen  shadow-sm bg-secondary-dark flex flex-col justify-between transition-width overflow-hidden sticky top-0`}
    >
      <div>
        <Link href="/admin">
          <a className="flex items-center space-x-4 py-3 mb-10">
            <Logo />
            {visible && (
              <span className="text-highlight-light text-sm font-heading font-semibold leading-none">
                Admin
              </span>
            )}
          </a>
        </Link>

        <div className="space-y-6">
          {navItems.map((item) => {
            return (
              <Tippy
                key={item.href}
                content={item.label}
                delay={100}
                disabled={visible}
              >
                <div>
                  <Link key={item.href} href={item.href}>
                    <a className="flex items-center text-highlight-light text-lg p-3 hover:text-primary-dark hover:bg-secondary-mediumDark transition">
                      <item.icon size={24} />
                      {visible && (
                        <span className="ml-2 leading-none">{item.label}</span>
                      )}
                    </a>
                  </Link>
                </div>
              </Tippy>
            );
          })}
        </div>
      </div>

      <button
        onClick={updateNavState}
        className="text-highlight-light p-3 hover:scale-[0.95] transition self-end"
      >
        {visible ? (
          <RiMenuFoldFill size={25} />
        ) : (
          <RiMenuUnfoldFill size={25} />
        )}
      </button>
    </nav>
  );
};

export default AdminNav;
