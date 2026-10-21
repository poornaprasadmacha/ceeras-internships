import { useState, useEffect } from 'react';
import { ThemeName, THEME_STORAGE_KEY } from '../lib/constants';
import { getUserSetting, setUserSetting } from '../database/storage';

export function useTheme() {
  const [theme, setThemeState] = useState<ThemeName>(() => {
    const saved = localStorage.getItem(THEME_STORAGE_KEY) as ThemeName | null;
    return saved || 'soft-light';
  });

  useEffect(() => {
    // Sync with IndexedDB
    getUserSetting<ThemeName>('theme', theme).then((savedTheme) => {
      if (savedTheme && savedTheme !== theme) {
        setThemeState(savedTheme);
        document.documentElement.setAttribute('data-theme', savedTheme);
      }
    });
  }, []);

  const setTheme = (newTheme: ThemeName) => {
    setThemeState(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem(THEME_STORAGE_KEY, newTheme);
    setUserSetting('theme', newTheme);
  };

  return { theme, setTheme };
}
