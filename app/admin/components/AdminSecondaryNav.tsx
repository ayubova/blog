"use client"

import {FC} from "react";
import {useRouter} from "next/navigation";
import {signOut} from "next-auth/react";

import ProfileHead from "components/ui/ProfileHead";
import Dropdown, {DropdownOptions} from "components/ui/Dropdown";
import SearchBar from "components/common/SearchBar";
import useDarkMode from "hooks/useDarkMode";
import useAuth from "hooks/useAuth";

const AdminSecondaryNav: FC = (): JSX.Element => {
  const router = useRouter();
  const {toggleTheme} = useDarkMode();

  const {user} = useAuth();

  const userName = user?.name;

  const navigateToCreateNewPost = () => router.push("admin/posts/create");

  const handleSearchSubmit = (query: string) => {
    if (!query.trim()) return;
    router.push(`/admin/posts/search?title=${query}`);
  };

  const options: DropdownOptions = [
    {label: "Add new post", onClick: navigateToCreateNewPost},
    {label: "Change theme", onClick: toggleTheme},
    {label: "Log out", onClick: signOut},
  ];
  return (
    <div className="flex items-center justify-between">
      <SearchBar onSubmit={handleSearchSubmit} />
      <Dropdown
        options={options}
        head={(
          <ProfileHead
            nameInitial={userName?.[0]}
            avatar={user?.avatar}
          />
        )}
      />
    </div>
  );
};

export default AdminSecondaryNav;
