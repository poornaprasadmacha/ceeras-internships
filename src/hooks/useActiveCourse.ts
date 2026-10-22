import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import {
  SqlLogo,
  PythonLogo,
  HtmlLogo,
  CssLogo,
  NumpyLogo,
  PandasLogo,
  GitLogo,
  VsCodeLogo,
  DataScienceLogo,
  JavaScriptLogo,
  ScikitLearnLogo,
} from '../components/ui/LanguageLogos';

export type CourseId =
  | 'sql'
  | 'python'
  | 'html'
  | 'css'
  | 'javascript'
  | 'datascience'
  | 'machinelearning'
  | 'numpy'
  | 'pandas'
  | 'git'
  | 'vscode';

export type PlaygroundTab = 'sql' | 'python' | 'web' | 'git' | 'vscode';

export interface CourseMeta {
  id: CourseId;
  title: string;
  shortTitle: string;
  category: string;
  lessonsPath: string;
  totalLessons: number;
  storageKey: string;
  playgroundTab: PlaygroundTab;
  logo: React.ComponentType<{ className?: string; size?: number }>;
}

export const COURSES_CONFIG: CourseMeta[] = [
  {
    id: 'sql',
    title: 'SQL & Relational Databases',
    shortTitle: 'SQL',
    category: 'Databases & SQL',
    lessonsPath: '/learn',
    totalLessons: 24,
    storageKey: 'ceeras_sql_progress',
    playgroundTab: 'sql',
    logo: SqlLogo,
  },
  {
    id: 'python',
    title: 'Python Programming Fundamentals',
    shortTitle: 'Python',
    category: 'Python & Software Engineering',
    lessonsPath: '/learn/python',
    totalLessons: 12,
    storageKey: 'ceeras_python_solved',
    playgroundTab: 'python',
    logo: PythonLogo,
  },
  {
    id: 'html',
    title: 'HTML5 & Modern Web Architecture',
    shortTitle: 'HTML5',
    category: 'Web Development & Frontend',
    lessonsPath: '/learn/html',
    totalLessons: 12,
    storageKey: 'ceeras_html_solved',
    playgroundTab: 'web',
    logo: HtmlLogo,
  },
  {
    id: 'css',
    title: 'CSS3 & Modern Responsive Design',
    shortTitle: 'CSS3',
    category: 'Web Development & Frontend',
    lessonsPath: '/learn/css',
    totalLessons: 12,
    storageKey: 'ceeras_css_solved',
    playgroundTab: 'web',
    logo: CssLogo,
  },
  {
    id: 'javascript',
    title: 'Modern JavaScript (ES6+ & Web APIs)',
    shortTitle: 'JavaScript',
    category: 'Web Development & Frontend',
    lessonsPath: '/learn/javascript',
    totalLessons: 14,
    storageKey: 'ceeras_js_solved',
    playgroundTab: 'web',
    logo: JavaScriptLogo,
  },
  {
    id: 'datascience',
    title: 'Data Science (Statistics, EDA & ML)',
    shortTitle: 'Data Science',
    category: 'Python & Data Science',
    lessonsPath: '/learn/datascience',
    totalLessons: 14,
    storageKey: 'ceeras_ds_solved',
    playgroundTab: 'python',
    logo: DataScienceLogo,
  },
  {
    id: 'machinelearning',
    title: 'Machine Learning (Algorithms & Ensembles)',
    shortTitle: 'Machine Learning',
    category: 'AI & Data Science',
    lessonsPath: '/learn/machinelearning',
    totalLessons: 15,
    storageKey: 'ceeras_ml_solved',
    playgroundTab: 'python',
    logo: ScikitLearnLogo,
  },
  {
    id: 'numpy',
    title: 'NumPy for Numerical Computing',
    shortTitle: 'NumPy',
    category: 'Python & Data Science',
    lessonsPath: '/learn/numpy',
    totalLessons: 12,
    storageKey: 'ceeras_numpy_solved',
    playgroundTab: 'python',
    logo: NumpyLogo,
  },
  {
    id: 'pandas',
    title: 'Pandas for Data Analysis & Manipulation',
    shortTitle: 'Pandas',
    category: 'Python & Data Science',
    lessonsPath: '/learn/pandas',
    totalLessons: 12,
    storageKey: 'ceeras_pandas_solved',
    playgroundTab: 'python',
    logo: PandasLogo,
  },
  {
    id: 'git',
    title: 'Git & GitHub Distributed Version Control',
    shortTitle: 'Git & GitHub',
    category: 'DevOps & Tooling',
    lessonsPath: '/learn/git',
    totalLessons: 12,
    storageKey: 'ceeras_git_solved',
    playgroundTab: 'git',
    logo: GitLogo,
  },
  {
    id: 'vscode',
    title: 'Visual Studio Code Mastery & Productivity',
    shortTitle: 'VS Code',
    category: 'IDE & Developer Tooling',
    lessonsPath: '/learn/vscode',
    totalLessons: 12,
    storageKey: 'ceeras_vscode_solved',
    playgroundTab: 'vscode',
    logo: VsCodeLogo,
  },
];

const STORAGE_ACTIVE_COURSE_KEY = 'ceeras_active_course';

export function detectCourseFromPath(pathname: string, searchParamCourse?: string | null): CourseId | null {
  if (searchParamCourse) {
    const matched = COURSES_CONFIG.find((c) => c.id === searchParamCourse.toLowerCase());
    if (matched) return matched.id;
  }

  if (pathname.startsWith('/learn/python')) return 'python';
  if (pathname.startsWith('/learn/html')) return 'html';
  if (pathname.startsWith('/learn/css')) return 'css';
  if (pathname.startsWith('/learn/javascript')) return 'javascript';
  if (pathname.startsWith('/learn/datascience')) return 'datascience';
  if (pathname.startsWith('/learn/machinelearning')) return 'machinelearning';
  if (pathname.startsWith('/learn/numpy')) return 'numpy';
  if (pathname.startsWith('/learn/pandas')) return 'pandas';
  if (pathname.startsWith('/learn/git')) return 'git';
  if (pathname.startsWith('/learn/vscode')) return 'vscode';
  if (pathname.startsWith('/learn')) return 'sql';

  return null;
}

export function readStoredCourse(): CourseId {
  try {
    const saved = localStorage.getItem(STORAGE_ACTIVE_COURSE_KEY) as CourseId | null;
    if (saved && COURSES_CONFIG.some((c) => c.id === saved)) {
      return saved;
    }
  } catch {
    // ignore
  }
  return 'sql';
}

export function calculateCourseProgress(
  course: CourseMeta,
  sqlStats?: { completedLessons: number; totalLessons: number; coursePercentage: number }
): { completedLessons: number; totalLessons: number; percentage: number } {
  if (course.id === 'sql' && sqlStats) {
    return {
      completedLessons: sqlStats.completedLessons,
      totalLessons: sqlStats.totalLessons,
      percentage: sqlStats.coursePercentage,
    };
  }

  try {
    const raw = localStorage.getItem(course.storageKey);
    if (raw) {
      const parsed = JSON.parse(raw);
      const solvedCount = Object.values(parsed).filter(Boolean).length;
      // Approximate completed lessons based on solved items vs total lessons
      const completed = Math.min(course.totalLessons, solvedCount);
      const percentage = Math.min(100, Math.round((completed / course.totalLessons) * 100));
      return {
        completedLessons: completed,
        totalLessons: course.totalLessons,
        percentage,
      };
    }
  } catch {
    // ignore
  }

  return {
    completedLessons: 0,
    totalLessons: course.totalLessons,
    percentage: 0,
  };
}

export function useActiveCourse() {
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const [activeCourseId, setActiveCourseIdState] = useState<CourseId>(() => {
    const detected = detectCourseFromPath(location.pathname, searchParams.get('course'));
    return detected || readStoredCourse();
  });

  // Keep active course in sync when location changes
  useEffect(() => {
    const detected = detectCourseFromPath(location.pathname, searchParams.get('course'));
    if (detected && detected !== activeCourseId) {
      setActiveCourseIdState(detected);
      try {
        localStorage.setItem(STORAGE_ACTIVE_COURSE_KEY, detected);
      } catch {
        // ignore
      }
    }
  }, [location.pathname, searchParams, activeCourseId]);

  const setActiveCourseId = useCallback((id: CourseId) => {
    setActiveCourseIdState(id);
    try {
      localStorage.setItem(STORAGE_ACTIVE_COURSE_KEY, id);
    } catch {
      // ignore
    }
  }, []);

  const activeCourse = useMemo(() => {
    return COURSES_CONFIG.find((c) => c.id === activeCourseId) || COURSES_CONFIG[0];
  }, [activeCourseId]);

  return {
    activeCourse,
    activeCourseId,
    allCourses: COURSES_CONFIG,
    setActiveCourseId,
    getCourseProgress: (course: CourseMeta, sqlStats?: any) => calculateCourseProgress(course, sqlStats),
  };
}
