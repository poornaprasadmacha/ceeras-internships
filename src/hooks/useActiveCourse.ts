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
import { LESSON_MANIFEST } from '../data/lessons';
import { PYTHON_LESSONS } from '../data/pythonLessons';
import { HTML_LESSONS } from '../data/htmlLessons';
import { CSS_LESSONS } from '../data/cssLessons';
import { JS_LESSONS } from '../data/jsLessons';
import { DATA_SCIENCE_LESSONS } from '../data/dataScienceLessons';
import { MACHINE_LEARNING_LESSONS } from '../data/machineLearningLessons';
import { NUMPY_LESSONS } from '../data/numpyLessons';
import { PANDAS_LESSONS } from '../data/pandasLessons';
import { GIT_LESSONS } from '../data/gitLessons';
import { VSCODE_LESSONS } from '../data/vscodeLessons';

export function findAnyLessonById(lessonId: string) {
  const sql = LESSON_MANIFEST.find((l) => l.id === lessonId);
  if (sql) return { id: sql.id, number: sql.number, title: sql.title, shortDescription: sql.shortDescription, slug: sql.slug, fullPath: `/learn/${sql.slug}` };

  const py = PYTHON_LESSONS.find((l) => l.id === lessonId);
  if (py) return { id: py.id, number: py.number, title: py.title, shortDescription: py.shortDescription, slug: py.slug, fullPath: `/learn/python/${py.slug}` };

  const h = HTML_LESSONS.find((l) => l.id === lessonId);
  if (h) return { id: h.id, number: h.number, title: h.title, shortDescription: h.shortDescription, slug: h.slug, fullPath: `/learn/html/${h.slug}` };

  const c = CSS_LESSONS.find((l) => l.id === lessonId);
  if (c) return { id: c.id, number: c.number, title: c.title, shortDescription: c.shortDescription, slug: c.slug, fullPath: `/learn/css/${c.slug}` };

  const j = JS_LESSONS.find((l) => l.id === lessonId);
  if (j) return { id: j.id, number: j.number, title: j.title, shortDescription: j.shortDescription, slug: j.slug, fullPath: `/learn/javascript/${j.slug}` };

  const ds = DATA_SCIENCE_LESSONS.find((l) => l.id === lessonId);
  if (ds) return { id: ds.id, number: ds.number, title: ds.title, shortDescription: ds.shortDescription, slug: ds.slug, fullPath: `/learn/datascience/${ds.slug}` };

  const ml = MACHINE_LEARNING_LESSONS.find((l) => l.id === lessonId);
  if (ml) return { id: ml.id, number: ml.number, title: ml.title, shortDescription: ml.shortDescription, slug: ml.slug, fullPath: `/learn/machinelearning/${ml.slug}` };

  const np = NUMPY_LESSONS.find((l) => l.id === lessonId);
  if (np) return { id: np.id, number: np.number, title: np.title, shortDescription: np.shortDescription, slug: np.slug, fullPath: `/learn/numpy/${np.slug}` };

  const pd = PANDAS_LESSONS.find((l) => l.id === lessonId);
  if (pd) return { id: pd.id, number: pd.number, title: pd.title, shortDescription: pd.shortDescription, slug: pd.slug, fullPath: `/learn/pandas/${pd.slug}` };

  const g = GIT_LESSONS.find((l) => l.id === lessonId);
  if (g) return { id: g.id, number: g.number, title: g.title, shortDescription: g.shortDescription, slug: g.slug, fullPath: `/learn/git/${g.slug}` };

  const v = VSCODE_LESSONS.find((l) => l.id === lessonId);
  if (v) return { id: v.id, number: v.number, title: v.title, shortDescription: v.shortDescription, slug: v.slug, fullPath: `/learn/vscode/${v.slug}` };

  return undefined;
}

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
