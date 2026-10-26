import { useState, useEffect } from 'react';
import { ThemeName, THEME_STORAGE_KEY } from '../lib/constants';
import { getUserSetting, setUserSetting } from '../database/storage';

export function useTheme() {
  const [theme, setThemeState] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem(THEME_STORAGE_KEY) as string | null;
    if (saved === 'dark' || saved === 'soft-dark') return 'dark';
    return 'light';
  });

  useEffect(() => {
    // Initial sync
    const current = document.documentElement.getAttribute('data-theme');
    if (!current || (current !== 'light' && current !== 'dark')) {
      document.documentElement.setAttribute('data-theme', theme);
    }

    getUserSetting<string>('theme', theme).then((savedTheme) => {
      if (savedTheme) {
        const resolved: 'light' | 'dark' =
          savedTheme === 'dark' || savedTheme === 'soft-dark' ? 'dark' : 'light';
        if (resolved !== theme) {
          setThemeState(resolved);
          document.documentElement.setAttribute('data-theme', resolved);
        }
      }
    });
  }, [theme]);

  const setTheme = (newTheme: 'light' | 'dark' | ThemeName) => {
    const resolved: 'light' | 'dark' =
      newTheme === 'dark' || newTheme === 'soft-dark' ? 'dark' : 'light';
    setThemeState(resolved);
    document.documentElement.setAttribute('data-theme', resolved);
    localStorage.setItem(THEME_STORAGE_KEY, resolved);
    setUserSetting('theme', resolved);
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return { theme, setTheme, toggleTheme };
}
