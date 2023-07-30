import {useEffect, useState} from "react";

const THEME_MODE = "theme_mode";
const defaultTheme = "light";
const darkTheme = "dark";
// TODO: Сделать функции updateTheme и initTheme и положить в utils (нет смысла хранить в utils)
const useDarkMode = () => {
  const readThemeFromLS = (): string => localStorage.getItem(THEME_MODE) || "";

  const [currentTheme, setCurrentTheme] = useState(defaultTheme);

  const storeThemeToLS = (themeMode: string) => {
    localStorage.setItem(THEME_MODE, themeMode);
  };

  const updateTheme = (newTheme: string, previousTheme?: string) => {
    const {classList} = document.documentElement;
    if (previousTheme) {
      classList.remove(previousTheme);
    }
    classList.add(newTheme);
  };

  const toggleTheme = () => {
    const newTheme = currentTheme === defaultTheme ? darkTheme : defaultTheme;
    updateTheme(newTheme, currentTheme);
    setCurrentTheme(newTheme);
    storeThemeToLS(newTheme);
  };

  useEffect(() => {
    setCurrentTheme(readThemeFromLS());
  }, []);

  useEffect(() => {
    if (currentTheme) {
      return updateTheme(currentTheme);
    }
    const runningOnDarkMode = window.matchMedia(
      "(prefers-color-scheme:dark)"
    ).matches;

    if (runningOnDarkMode) {
      updateTheme(darkTheme);
      storeThemeToLS(darkTheme);
      setCurrentTheme(darkTheme);
    } else {
      updateTheme(defaultTheme);
      storeThemeToLS(defaultTheme);
      setCurrentTheme(defaultTheme);
    }
  }, []);

  return {toggleTheme, currentTheme: currentTheme || defaultTheme};
};

export default useDarkMode;
