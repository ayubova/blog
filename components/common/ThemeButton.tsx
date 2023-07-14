import { FC } from "react";
import { MdOutlineLightMode } from "react-icons/md";
import { MdOutlineModeNight } from "react-icons/md";

import useDarkMode from "hooks/useDarkMode";

interface Props {}

const ThemeButton: FC<Props> = (): JSX.Element => {
  const { toggleTheme, currentTheme } = useDarkMode();

  return (
    <button className="text-primary-dark">
      {currentTheme === "light" ? (
        <MdOutlineLightMode size={28} onClick={toggleTheme} />
      ) : (
        <MdOutlineModeNight size={28} onClick={toggleTheme} />
      )}
    </button>
  );
};

export default ThemeButton;
