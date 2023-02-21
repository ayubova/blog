import { FC } from 'react';
import { useRouter } from 'next/router';
import { signOut } from 'next-auth/react';

import Dropdown, { DropdownOptions } from '../Dropdown';
import ProfileHead from '../ProfileHead';
import SearchBar from '../SearchBar';
import useDarkMode from 'hooks/useDarkMode';

interface Props {}

const AdminSecondaryNav: FC<Props> = (props): JSX.Element => {
  const router = useRouter();
  const { toggleTheme } = useDarkMode();

  const navigateToCreateNewPost = () => router.push('admin/posts/create');
  const handleLogout = async () => await signOut();

  const options: DropdownOptions = [
    { label: 'Add new post', onClick: navigateToCreateNewPost },
    { label: 'Change theme', onClick: toggleTheme },
    { label: 'Log out', onClick: handleLogout },
  ];
  return (
    <div className="flex items-center justify-between">
      <SearchBar />
      <Dropdown head={<ProfileHead nameInitial="J" />} options={options} />
    </div>
  );
};

export default AdminSecondaryNav;
