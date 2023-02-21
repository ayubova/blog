import { useEffect } from 'react';

const THEME_MODE = 'theme_mode';
const defaultTheme = 'light';
const darkTheme = 'dark';

const useDarkMode = () => {
  const storeThemeToLS = (themeMode: string) => {
    localStorage.setItem(THEME_MODE, themeMode);
  };

  const readThemeFromLS = (): string => localStorage.getItem(THEME_MODE) || '';

  const updateTheme = (newTheme: string, previousTheme?: string) => {
    const { classList } = document.documentElement;
    if (previousTheme) {
      classList.remove(previousTheme);
    }
    classList.add(newTheme);
  };

  const toggleTheme = () => {
    const previousTheme = readThemeFromLS();
    const newTheme = previousTheme === defaultTheme ? darkTheme : defaultTheme;
    updateTheme(newTheme, previousTheme);
    storeThemeToLS(newTheme);
  };

  useEffect(() => {
    const oldTheme = readThemeFromLS();
    if (oldTheme) {
      return updateTheme(oldTheme);
    }
    const runningOnDarkMode = window.matchMedia('(prefers-color-scheme:dark)').matches;

    if (runningOnDarkMode) {
      updateTheme(darkTheme);
      storeThemeToLS(darkTheme);
    } else {
      updateTheme(defaultTheme);
      storeThemeToLS(defaultTheme);
    }
  }, []);

  return { toggleTheme };
};

export default useDarkMode;
