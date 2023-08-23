import Link from "next/link";
import {FC, useEffect, useState} from "react";
import {IconType} from "react-icons";
import {RiMenuFoldFill, RiMenuUnfoldFill} from "react-icons/ri";

interface Props {
  navItems: { label: string; icon: IconType; href: string }[];
}

const NAV_OPEN_WIDTH = "w-60";
const NAV_CLOSE_WIDTH = "w-12";
const NAV_VISIBILITY = "nav-visibility";

const AdminNav: FC<Props> = ({navItems}): JSX.Element => {
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
          <div className="p-3 mb-10">
            {visible && (
              <span className="text-highlight-light font-heading font-semibold leading-none">
                Admin
              </span>
            )}
          </div>
        </Link>

        <div className="space-y-6">
          {navItems.map((item) => {
            return (
              <div key={item.href}>
                <Link href={item.href}>
                  <div className="flex items-center text-highlight-light text-lg p-3 hover:text-primary-dark hover:bg-secondary-mediumDark transition">
                    <item.icon size={24} />
                    {visible && (
                      <span className="ml-2 leading-none">{item.label}</span>
                    )}
                  </div>
                </Link>
              </div>
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
