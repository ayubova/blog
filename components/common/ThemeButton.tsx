import { FC } from "react";
import { MdLightMode } from "react-icons/md";
import { MdModeNight } from "react-icons/md";

import useDarkMode from "hooks/useDarkMode";

interface Props {}

const ThemeButton: FC<Props> = (): JSX.Element => {
  const { toggleTheme, currentTheme } = useDarkMode();

  return (
    <button className="dark:text-primary-dark text-primary-light">
      {currentTheme === "light" ? (
        <MdLightMode size={24} onClick={toggleTheme} />
      ) : (
        <MdModeNight size={24} onClick={toggleTheme} />
      )}
    </button>
  );
};

export default ThemeButton;
