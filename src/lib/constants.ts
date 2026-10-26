export const APP_NAME = 'Learn by Ceeras';
export const APP_TAGLINE = 'Learn SQL. Practise freely. Build real skills.';
export const APP_DESCRIPTION =
  'Master SQL step by step with interactive lessons, real-time query execution, instant feedback, quizzes, and offline learning.';

export const PASSING_PERCENTAGE = 80;

export const THEME_STORAGE_KEY = 'querypath_theme';
export const FONT_SIZE_STORAGE_KEY = 'querypath_font_size';

export type ThemeName = 'light' | 'dark' | 'soft-light' | 'soft-dark';

export const THEMES: { id: 'light' | 'dark'; label: string; description: string }[] = [
  {
    id: 'light',
    label: 'Daylight Mode',
    description: 'Crisp, clean pure white background with blue accents.',
  },
  {
    id: 'dark',
    label: 'Dark Mode',
    description: 'Deep slate navy inspired by professional developer environments.',
  },
];

export const NAVIGATION_ITEMS = [
  { path: '/', label: 'Home Dashboard', icon: 'LayoutDashboard' },
  { path: '/learn', label: 'Course Lessons', icon: 'BookOpen' },
  { path: '/practice', label: 'Practice Playground', icon: 'Terminal' },
  { path: '/quizzes', label: 'Quizzes & Tests', icon: 'CheckSquare' },
  { path: '/progress', label: 'Progress & Stats', icon: 'BarChart2' },
  { path: '/bookmarks', label: 'Bookmarks', icon: 'Bookmark' },
  { path: '/notes', label: 'Notes', icon: 'FileText' },
  { path: '/settings', label: 'Settings', icon: 'Settings' },
];
