export const APP_NAME = 'Learn by Ceeras';
export const APP_TAGLINE = 'Learn SQL. Practise freely. Build real skills.';
export const APP_DESCRIPTION =
  'Master SQL step by step with interactive lessons, real-time query execution, instant feedback, quizzes, and offline learning.';

export const PASSING_PERCENTAGE = 80;

export const THEME_STORAGE_KEY = 'querypath_theme';
export const FONT_SIZE_STORAGE_KEY = 'querypath_font_size';

export type ThemeName = 'soft-light' | 'warm-paper' | 'soft-dark';

export const THEMES: { id: ThemeName; label: string; description: string }[] = [
  {
    id: 'soft-light',
    label: 'Soft Light',
    description: 'Clean soothing slate background with deep Ceeras teal accents. Ideal for daylight study.',
  },
  {
    id: 'warm-paper',
    label: 'Warm Paper',
    description: 'Warm parchment and terracotta tones with muted teal highlights. Gentle on the eyes during evening reading.',
  },
  {
    id: 'soft-dark',
    label: 'Soft Dark',
    description: 'Deep ocean charcoal surface with luminous cyan highlights. Zero neon glare.',
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
