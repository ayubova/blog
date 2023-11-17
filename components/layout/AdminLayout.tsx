import Link from "next/link";
import {FC, ReactNode} from "react";
import {
  AiOutlineDashboard,
  AiOutlineContainer,
  AiOutlineTeam,
  AiOutlineMail,
  AiOutlineFileAdd,
} from "react-icons/ai";

import AdminNav from "../../pages/admin/components/AdminNav";
import AppHead from "../common/AppHead";
import AdminSecondaryNav from "../../pages/admin/components/AdminSecondaryNav";

interface Props {
  children: ReactNode;
  title?: string;
}

const navItems = [
  {href: "/admin", icon: AiOutlineDashboard, label: "Dashboard"},
  {href: "/admin/posts", icon: AiOutlineContainer, label: "Posts"},
  {href: "/admin/users", icon: AiOutlineTeam, label: "Users"},
  {href: "/admin/comments", icon: AiOutlineMail, label: "Comments"},
];

const AdminLayout: FC<Props> = ({title, children}): JSX.Element => {
  return (
    <>
      <AppHead title={title} />
      <div className="flex ">
        <AdminNav navItems={navItems} />
        <div className="flex-1 p-4 dark:bg-primary-dark bg-primary-light">
          <AdminSecondaryNav />
          {children}
        </div>
        <Link href="/admin/posts/create">
          <div className="bg-secondary-dark dark:bg-secondary-main text-primary-light dark:text-primary-dark fixed z-10 right-10 bottom-10 p-3 rounded-full hover:scale-90 shadow-sm transition">
            <AiOutlineFileAdd size={24} />
          </div>
        </Link>
      </div>
    </>
  );
};

export default AdminLayout;
