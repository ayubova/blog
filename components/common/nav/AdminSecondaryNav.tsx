import { FC } from "react";
import { useRouter } from "next/router";
import { signOut } from "next-auth/react";

import Dropdown, { DropdownOptions } from "../Dropdown";
import ProfileHead from "../ProfileHead";
import SearchBar from "../SearchBar";
import useDarkMode from "hooks/useDarkMode";
import useAuth from "hooks/useAuth";

interface Props {}

const AdminSecondaryNav: FC<Props> = (): JSX.Element => {
  const router = useRouter();
  const { toggleTheme } = useDarkMode();

  const { user } = useAuth();

  const userName = user?.name;

  const navigateToCreateNewPost = () => router.push("admin/posts/create");

  const handleSearchSubmit = (query: string) => {
    if (!query.trim()) return;
    router.push(`/admin/posts/search?title=${query}`);
  };

  const options: DropdownOptions = [
    { label: "Add new post", onClick: navigateToCreateNewPost },
    { label: "Change theme", onClick: toggleTheme },
    { label: "Log out", onClick: signOut },
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
