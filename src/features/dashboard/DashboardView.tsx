import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useProgress } from '../../hooks/useProgress';
import {
  COURSES_CONFIG,
  calculateCourseProgress,
  findAnyLessonById,
} from '../../hooks/useActiveCourse';
import { LESSON_MANIFEST } from '../../data/lessons';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { ProgressBar } from '../../components/ui/ProgressBar';
import { RotatingGlobe } from '../../components/ui/RotatingGlobe';
import {
  BookOpen,
  CheckCircle2,
  ArrowRight,
  Flame,
  Bookmark,
  CheckSquare,
  Search,
  Sparkles,
  Compass,
  Clock,
  Layers,
  Code2,
  Play,
  RotateCcw,
  Trash2,
  ExternalLink,
} from 'lucide-react';
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
} from '../../components/ui/LanguageLogos';

type CategoryFilter = 'all' | 'databases' | 'programming' | 'web' | 'datascience' | 'tools';

interface CourseCardData {
  id: string;
  configId: string;
  title: string;
  shortTitle: string;
  category: string;
  filterCategory: CategoryFilter;
  description: string;
  level: string;
  modulesCount: number;
  duration: string;
  engineName: string;
  route: string;
  logo: React.ComponentType<{ className?: string; size?: number }>;
}

const COURSES_DATA: CourseCardData[] = [
  {
    id: 'sql-relational',
    configId: 'sql',
    title: 'SQL & Relational Databases',
    shortTitle: 'SQL',
    category: 'Databases & SQL',
    filterCategory: 'databases',
    description:
      'Master relational schemas, multi-table joins, subqueries, aggregations, and window functions with in-browser query execution.',
    level: 'Zero to Advanced',
    modulesCount: 24,
    duration: '14-16 hours',
    engineName: 'In-Browser SQLite WASM',
    route: '/learn',
    logo: SqlLogo,
  },
  {
    id: 'python-core',
    configId: 'python',
    title: 'Python Programming Fundamentals',
    shortTitle: 'Python',
    category: 'Programming & Python',
    filterCategory: 'programming',
    description:
      'Build core programming fundamentals: control structures, data collections, functions, object-oriented design, and algorithms.',
    level: 'Beginner',
    modulesCount: 12,
    duration: '6-8 hours',
    engineName: 'In-Browser Python 3 Console',
    route: '/learn/python',
    logo: PythonLogo,
  },
  {
    id: 'html-core',
    configId: 'html',
    title: 'HTML5 & Modern Web Architecture',
    shortTitle: 'HTML5',
    category: 'Web Development',
    filterCategory: 'web',
    description:
      'Construct semantic, accessible, and high-performance documents with modern HTML5 APIs, forms, audio/video, and SEO best practices.',
    level: 'Beginner',
    modulesCount: 12,
    duration: '6-8 hours',
    engineName: 'Live Sandboxed Web Preview',
    route: '/learn/html',
    logo: HtmlLogo,
  },
  {
    id: 'css-core',
    configId: 'css',
    title: 'CSS3 & Modern Responsive Design',
    shortTitle: 'CSS3',
    category: 'Web Development',
    filterCategory: 'web',
    description:
      'Master Flexbox, CSS Grid, media queries, CSS variables, transitions, and accessible UI component styling across all screen sizes.',
    level: 'Beginner to Intermediate',
    modulesCount: 12,
    duration: '6-8 hours',
    engineName: 'Component Visualizer',
    route: '/learn/css',
    logo: CssLogo,
  },
  {
    id: 'javascript-modern',
    configId: 'javascript',
    title: 'Modern JavaScript (ES6+ & Web APIs)',
    shortTitle: 'JavaScript',
    category: 'Web Development',
    filterCategory: 'web',
    description:
      'Deep dive into ES6+ syntax, asynchronous programming with Promises & async/await, DOM manipulation, and browser APIs.',
    level: 'Beginner to Intermediate',
    modulesCount: 14,
    duration: '8-10 hours',
    engineName: 'In-Browser Live JS Runtime',
    route: '/learn/javascript',
    logo: JavaScriptLogo,
  },
  {
    id: 'numpy-computing',
    configId: 'numpy',
    title: 'NumPy for Numerical Computing',
    shortTitle: 'NumPy',
    category: 'Data Science & AI',
    filterCategory: 'datascience',
    description:
      'Explore n-dimensional arrays, vectorized broadcasting, linear algebra, slicing, indexing, and high-performance numerical routines.',
    level: 'Intermediate',
    modulesCount: 12,
    duration: '6-8 hours',
    engineName: 'Numerical Memory Engine',
    route: '/learn/numpy',
    logo: NumpyLogo,
  },
  {
    id: 'pandas-data',
    configId: 'pandas',
    title: 'Pandas for Data Analysis & Manipulation',
    shortTitle: 'Pandas',
    category: 'Data Science & AI',
    filterCategory: 'datascience',
    description:
      'Transform, filter, clean, reshape, and aggregate tabular datasets using Series and DataFrames with immediate table outputs.',
    level: 'Intermediate',
    modulesCount: 12,
    duration: '6-8 hours',
    engineName: 'Tabular Data Engine',
    route: '/learn/pandas',
    logo: PandasLogo,
  },
  {
    id: 'data-science',
    configId: 'datascience',
    title: 'Data Science (Statistics, EDA & ML)',
    shortTitle: 'Data Science',
    category: 'Data Science & AI',
    filterCategory: 'datascience',
    description:
      'Learn exploratory data analysis, descriptive statistics, feature distribution, hypothesis testing, and SVG visualization charts.',
    level: 'Intermediate to Advanced',
    modulesCount: 14,
    duration: '8-10 hours',
    engineName: 'Statistical Engine & Plotter',
    route: '/learn/datascience',
    logo: DataScienceLogo,
  },
  {
    id: 'machine-learning',
    configId: 'machinelearning',
    title: 'Machine Learning (Algorithms & Ensembles)',
    shortTitle: 'Machine Learning',
    category: 'Data Science & AI',
    filterCategory: 'datascience',
    description:
      'Train classification, regression, clustering models, and evaluate performance with confusion matrices and precision-recall curves.',
    level: 'Advanced',
    modulesCount: 15,
    duration: '10-12 hours',
    engineName: 'In-Browser ML Sandbox',
    route: '/learn/machinelearning',
    logo: ScikitLearnLogo,
  },
  {
    id: 'git-github',
    configId: 'git',
    title: 'Git & GitHub Distributed Version Control',
    shortTitle: 'Git & GitHub',
    category: 'Developer Tools',
    filterCategory: 'tools',
    description:
      'Master commit histories, branching strategies, merge conflicts, stashing, rebasing, remote remotes, and pull request workflows.',
    level: 'Beginner to Intermediate',
    modulesCount: 12,
    duration: '6-8 hours',
    engineName: 'In-Browser Git Sandbox & DAG',
    route: '/learn/git',
    logo: GitLogo,
  },
  {
    id: 'vscode-mastery',
    configId: 'vscode',
    title: 'Visual Studio Code Mastery & Productivity',
    shortTitle: 'VS Code',
    category: 'Developer Tools',
    filterCategory: 'tools',
    description:
      'Boost developer velocity with multi-cursor workflows, keyboard shortcuts, debugger setup, extensions, and workspace configurations.',
    level: 'Beginner',
    modulesCount: 12,
    duration: '6-8 hours',
    engineName: 'In-Browser IDE Simulator',
    route: '/learn/vscode',
    logo: VsCodeLogo,
  },
];

const LEARNING_PATHS = [
  {
    id: 'data-analyst',
    title: 'Data Analyst & BI Specialist',
    description:
      'Extract, clean, aggregate, and visualize enterprise data to produce actionable business intelligence.',
    steps: [
      { name: 'SQL & Relational Databases', path: '/learn' },
      { name: 'NumPy Computing', path: '/learn/numpy' },
      { name: 'Pandas DataFrames', path: '/learn/pandas' },
      { name: 'Data Science & EDA', path: '/learn/datascience' },
    ],
  },
  {
    id: 'web-developer',
    title: 'Modern Web Developer',
    description:
      'Build responsive, accessible, high-performance web applications with semantic markup and client logic.',
    steps: [
      { name: 'HTML5 Architecture', path: '/learn/html' },
      { name: 'CSS3 Responsive Design', path: '/learn/css' },
      { name: 'Modern JavaScript (ES6+)', path: '/learn/javascript' },
      { name: 'Git & GitHub', path: '/learn/git' },
    ],
  },
  {
    id: 'ai-ml-engineer',
    title: 'AI & Machine Learning Engineer',
    description:
      'From fundamental Python algorithms to matrix linear algebra, statistical learning, and predictive modeling.',
    steps: [
      { name: 'Python Fundamentals', path: '/learn/python' },
      { name: 'NumPy Vectorization', path: '/learn/numpy' },
      { name: 'Data Science & EDA', path: '/learn/datascience' },
      { name: 'Machine Learning Models', path: '/learn/machinelearning' },
    ],
  },
];

export function DashboardView() {
  const navigate = useNavigate();
  const { stats, bookmarks, lessonsProgress, toggleBookmarkItem } = useProgress();

  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Determine if student has started any learning activity
  const hasStartedAny = useMemo(() => {
    if (
      stats.solvedExercises > 0 ||
      stats.quizzesTaken > 0 ||
      stats.completedLessons > 0 ||
      Object.values(lessonsProgress).some((l) => l.isStarted || l.isCompleted)
    ) {
      return true;
    }

    const checkStorageKeys = [
      'ceeras_python_solved',
      'ceeras_html_solved',
      'ceeras_css_solved',
      'ceeras_js_solved',
      'ceeras_ds_solved',
      'ceeras_ml_solved',
      'ceeras_numpy_solved',
      'ceeras_pandas_solved',
      'ceeras_git_solved',
      'ceeras_vscode_solved',
    ];

    for (const key of checkStorageKeys) {
      try {
        const item = localStorage.getItem(key);
        if (item && Object.keys(JSON.parse(item)).length > 0) {
          return true;
        }
      } catch {
        // ignore JSON parse error
      }
    }
    return false;
  }, [stats, lessonsProgress]);

  // Determine next incomplete lesson for the SQL curriculum
  const nextSqlLesson = useMemo(() => {
    return (
      LESSON_MANIFEST.find((l) => !lessonsProgress[l.id]?.isCompleted) || LESSON_MANIFEST[0]
    );
  }, [lessonsProgress]);

  // Calculate course progress mapping for all 11 courses
  const courseProgressMap = useMemo(() => {
    const map: Record<string, { completedLessons: number; totalLessons: number; percentage: number }> =
      {};
    for (const course of COURSES_DATA) {
      const conf = COURSES_CONFIG.find((c) => c.id === course.configId);
      if (conf) {
        map[course.id] = calculateCourseProgress(conf, {
          completedLessons: stats.completedLessons,
          totalLessons: stats.totalLessons,
          coursePercentage: stats.coursePercentage,
        });
      } else {
        map[course.id] = { completedLessons: 0, totalLessons: course.modulesCount, percentage: 0 };
      }
    }
    return map;
  }, [stats]);

  // Filter courses by category and search query
  const filteredCourses = useMemo(() => {
    return COURSES_DATA.filter((course) => {
      const matchesCategory =
        selectedCategory === 'all' ||
        course.filterCategory === selectedCategory ||
        (selectedCategory === 'programming' && course.id === 'javascript-modern');

      const matchesSearch =
        searchQuery.trim() === '' ||
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.shortTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.engineName.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const scrollToCourses = () => {
    const el = document.getElementById('courses-catalog');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="space-y-12 pb-16">
      {/* 1. HERO SECTION */}
      <section className="pt-2 sm:pt-4 md:pt-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Text / Student State Column */}
          <div className="lg:col-span-7 space-y-6">
            {hasStartedAny ? (
              /* RETURNING STUDENT HERO BANNER */
              <div className="space-y-5 animate-fadeIn">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold">
                  <Sparkles className="w-3.5 h-3.5 shrink-0" />
                  <span>Welcome Back to CEERAS</span>
                </div>

                <div className="space-y-2">
                  <h1 className="font-raleway text-3xl sm:text-4xl md:text-5xl font-bold text-text-main tracking-tight leading-[1.18]">
                    Continue your learning journey.
                  </h1>
                  <p className="text-sm sm:text-base text-text-muted leading-relaxed">
                    Pick up right where you paused. Practice real queries and coding tasks with our
                    offline in-browser engines.
                  </p>
                </div>

                {/* Continue Learning Featured Card */}
                <Card className="p-5 sm:p-6 bg-surface border border-primary/30 shadow-card space-y-4 relative overflow-hidden">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[11px] font-bold text-primary uppercase tracking-wider">
                      SQL &amp; Relational Databases • Up Next
                    </span>
                    <Badge variant="accent" size="sm">
                      Lesson {nextSqlLesson.number} of {LESSON_MANIFEST.length}
                    </Badge>
                  </div>

                  <div>
                    <h2 className="font-raleway text-lg sm:text-xl font-bold text-text-main">
                      Lesson {nextSqlLesson.number}: {nextSqlLesson.title}
                    </h2>
                    <p className="text-xs text-text-muted mt-1 line-clamp-2">
                      {nextSqlLesson.shortDescription}
                    </p>
                  </div>

                  {/* Progress indicator */}
                  <div className="space-y-1.5 pt-1">
                    <div className="flex items-center justify-between text-xs font-semibold">
                      <span className="text-text-muted">Curriculum Progress:</span>
                      <span className="font-mono text-primary">{stats.coursePercentage}%</span>
                    </div>
                    <ProgressBar value={stats.coursePercentage} showPercentage={false} size="sm" />
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 border-t border-border/70">
                    <div className="flex items-center gap-4 text-xs text-text-muted">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{nextSqlLesson.estimatedMinutes || 15} mins</span>
                      </span>
                      <span>In-Browser SQLite WASM</span>
                    </div>

                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => navigate(`/learn/${nextSqlLesson.slug}`)}
                      className="font-medium text-xs px-4"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>Resume Lesson</span>
                    </Button>
                  </div>
                </Card>
              </div>
            ) : (
              /* NEW VISITOR HERO BANNER */
              <div className="space-y-5 animate-fadeIn">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold">
                  <Compass className="w-3.5 h-3.5 shrink-0" />
                  <span>Open-Access Interactive Curriculum</span>
                </div>

                <div className="space-y-3">
                  <h1 className="font-raleway text-3xl sm:text-4xl md:text-5xl lg:text-[46px] font-bold text-text-main tracking-tight leading-[1.18]">
                    Our mission: <br />
                    <span className="text-primary">Spreading knowledge to ignite global change.</span>
                  </h1>
                  <p className="text-sm sm:text-base text-text-muted leading-relaxed max-w-xl">
                    Master essential technology tracks through hands-on code execution right in your
                    browser. Zero software installation, real client-side runtimes, and immediate
                    pedagogical feedback.
                  </p>
                </div>

                {/* Primary & Secondary Call to Action */}
                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <Button
                    variant="primary"
                    size="md"
                    onClick={scrollToCourses}
                    className="font-semibold text-sm px-5 shadow-sm"
                  >
                    <span>Explore All Courses</span>
                    <ArrowRight className="w-4 h-4 ml-1.5" />
                  </Button>

                  <Button
                    variant="outline"
                    size="md"
                    onClick={() => navigate('/learn')}
                    className="font-medium text-sm px-5"
                  >
                    <span>Start SQL Curriculum</span>
                  </Button>
                </div>

                {/* Platform Highlights */}
                <div className="pt-3 flex flex-wrap items-center gap-2 sm:gap-3 text-xs text-text-muted">
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-subtle border border-border">
                    <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" />
                    <span>100% In-Browser Execution</span>
                  </div>
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-subtle border border-border">
                    <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" />
                    <span>11 Comprehensive Tech Tracks</span>
                  </div>
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-subtle border border-border">
                    <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" />
                    <span>Zero Setup Required</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Interactive Rotating 3D Knowledge Globe */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <RotatingGlobe />
          </div>
        </div>
      </section>

      {/* 2. STUDY ANALYTICS (Visible once the student begins any course) */}
      {hasStartedAny && (
        <section className="space-y-4 pt-4 border-t border-border animate-fadeIn">
          <div className="flex items-center justify-between">
            <h2 className="font-raleway text-xl sm:text-2xl font-bold text-text-main">
              Your Study Analytics
            </h2>
            <Link
              to="/progress"
              className="text-xs font-semibold text-primary hover:underline flex items-center gap-1"
            >
              <span>Detailed Progress</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="p-4 space-y-1.5 bg-surface border border-border">
              <div className="flex items-center justify-between text-text-muted">
                <span className="text-xs font-medium">Completed Lessons</span>
                <BookOpen className="w-4 h-4 text-primary" />
              </div>
              <div className="text-2xl font-bold font-mono text-text-main">
                {stats.completedLessons} / {stats.totalLessons}
              </div>
              <span className="text-[11px] text-text-muted block">
                {stats.completedLessons === stats.totalLessons
                  ? 'All SQL modules complete'
                  : `${stats.totalLessons - stats.completedLessons} remaining`}
              </span>
            </Card>

            <Card className="p-4 space-y-1.5 bg-surface border border-border">
              <div className="flex items-center justify-between text-text-muted">
                <span className="text-xs font-medium">Exercises Solved</span>
                <CheckCircle2 className="w-4 h-4 text-success" />
              </div>
              <div className="text-2xl font-bold font-mono text-text-main">
                {stats.solvedExercises} / {stats.totalExercises}
              </div>
              <span className="text-[11px] text-text-muted block">
                {stats.exercisePercentage}% of hands-on queries
              </span>
            </Card>

            <Card className="p-4 space-y-1.5 bg-surface border border-border">
              <div className="flex items-center justify-between text-text-muted">
                <span className="text-xs font-medium">Quiz Average</span>
                <CheckSquare className="w-4 h-4 text-secondary" />
              </div>
              <div className="text-2xl font-bold font-mono text-text-main">
                {stats.quizzesTaken > 0 ? `${stats.averageQuizScore}%` : '—'}
              </div>
              <span className="text-[11px] text-text-muted block">
                {stats.quizzesTaken} {stats.quizzesTaken === 1 ? 'attempt' : 'attempts'} logged
              </span>
            </Card>

            <Card className="p-4 space-y-1.5 bg-surface border border-border">
              <div className="flex items-center justify-between text-text-muted">
                <span className="text-xs font-medium">Study Streak</span>
                <Flame className="w-4 h-4 text-warning" />
              </div>
              <div className="text-2xl font-bold font-mono text-text-main">
                {stats.currentStreakDays} {stats.currentStreakDays === 1 ? 'day' : 'days'}
              </div>
              <span className="text-[11px] text-text-muted block">
                {stats.currentStreakDays > 0 ? 'Consecutive days active' : 'Start today'}
              </span>
            </Card>
          </div>
        </section>
      )}

      {/* 3. ASSESSMENTS & BOOKMARKS (Visible for Returning Students) */}
      {hasStartedAny && (
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fadeIn">
          {/* Foundation Review Assessment Card */}
          <Card
            variant="subtle"
            className="p-6 space-y-4 flex flex-col justify-between border border-border"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Badge variant="accent" size="sm">
                  Comprehensive Review
                </Badge>
                <span className="text-xs font-medium text-text-muted">10 Questions • 15 Mins</span>
              </div>
              <h3 className="font-raleway text-lg font-bold text-text-main">
                Foundation Review Test
              </h3>
              <p className="text-xs text-text-muted leading-relaxed">
                Consolidate your knowledge from the interactive SQL curriculum with our 10-question
                assessment covering relational concepts, column selection, syntax, and query
                predictions.
              </p>
            </div>

            <div className="pt-3 flex items-center justify-between border-t border-border/50">
              <div className="text-xs text-text-muted">
                <span>Pass Mark: </span>
                <span className="font-semibold text-text-main">80%</span>
              </div>
              <Button variant="primary" size="sm" onClick={() => navigate('/quizzes')}>
                <span>Start Review Test</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </Button>
            </div>
          </Card>

          {/* Bookmarked Lessons Card */}
          <Card className="p-6 space-y-4 bg-surface border border-border flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-raleway text-base font-bold text-text-main flex items-center gap-2">
                  <Bookmark className="w-4 h-4 text-primary" />
                  <span>Bookmarked Lessons</span>
                </h3>
                <span className="text-xs text-text-muted">
                  {bookmarks.length} {bookmarks.length === 1 ? 'saved' : 'saved'}
                </span>
              </div>

              {bookmarks.length === 0 ? (
                <div className="py-6 text-center text-xs text-text-muted bg-subtle/50 rounded-lg border border-border/60">
                  <p>No bookmarked lessons yet.</p>
                  <p className="mt-1 text-[11px]">
                    Click the bookmark icon inside any lesson to save it here for quick reference.
                  </p>
                </div>
              ) : (
                <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                  {bookmarks.map((b) => {
                    const lessonMeta = findAnyLessonById(b.lessonId);
                    return (
                      <div
                        key={b.id}
                        className="p-2.5 rounded-md bg-subtle hover:bg-border/60 transition-colors flex items-center justify-between text-xs group"
                      >
                        <span
                          onClick={() => {
                            if (lessonMeta?.fullPath) {
                              navigate(lessonMeta.fullPath);
                            } else {
                              navigate('/learn');
                            }
                          }}
                          className="font-medium text-text-main hover:text-primary cursor-pointer truncate flex-1 mr-2"
                        >
                          {b.title}
                        </span>

                        <div className="flex items-center gap-1.5 shrink-0">
                          <button
                            type="button"
                            onClick={() => toggleBookmarkItem(b.lessonId, b.title)}
                            className="p-1 text-text-muted hover:text-danger opacity-60 hover:opacity-100 transition-opacity"
                            title="Remove bookmark"
                            aria-label={`Remove bookmark for ${b.title}`}
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              if (lessonMeta?.fullPath) {
                                navigate(lessonMeta.fullPath);
                              } else {
                                navigate('/learn');
                              }
                            }}
                            className="p-1 text-text-muted hover:text-primary transition-colors"
                            aria-label={`Open lesson ${b.title}`}
                          >
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="pt-2 border-t border-border/50 text-[11px] text-text-muted flex justify-between items-center">
              <span>Saved locally in browser</span>
              {bookmarks.length > 0 && (
                <Link to="/progress" className="text-primary hover:underline font-medium">
                  Manage all
                </Link>
              )}
            </div>
          </Card>
        </section>
      )}

      {/* 4. WHY LEARN WITH CEERAS (Interactive Learning Explanation) */}
      <section className="space-y-6 pt-4 border-t border-border">
        <div>
          <span className="text-xs font-semibold text-primary uppercase tracking-wider block mb-1">
            Engineered for Deep Retention
          </span>
          <h2 className="font-raleway text-2xl sm:text-3xl font-bold text-text-main tracking-tight">
            How CEERAS Empowers Independent Problem-Solving
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6 space-y-3 bg-surface border border-border">
            <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
              <Code2 className="w-5 h-5" />
            </div>
            <h3 className="font-raleway text-base font-bold text-text-main">
              In-Browser Sandbox Engines
            </h3>
            <p className="text-xs text-text-muted leading-relaxed">
              Run real SQLite WASM queries, Python scripts, and live web previews in an isolated
              sandbox. No server connection, installation, or environment setup required.
            </p>
          </Card>

          <Card className="p-6 space-y-3 bg-surface border border-border">
            <div className="w-10 h-10 rounded-xl bg-secondary/10 border border-secondary/20 flex items-center justify-center text-secondary">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="font-raleway text-base font-bold text-text-main">
              Hands-On First Pedagogy
            </h3>
            <p className="text-xs text-text-muted leading-relaxed">
              Every lesson emphasizes practical code writing. Structured explanations are
              immediately paired with embedded editors, interactive anatomy breakdowns, and instant
              verification.
            </p>
          </Card>

          <Card className="p-6 space-y-3 bg-surface border border-border">
            <div className="w-10 h-10 rounded-xl bg-success/10 border border-success/20 flex items-center justify-center text-success">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <h3 className="font-raleway text-base font-bold text-text-main">
              Private, Offline &amp; Persistent
            </h3>
            <p className="text-xs text-text-muted leading-relaxed">
              Your exercises, notes, quiz scores, and daily streaks persist securely in your
              browser's IndexedDB. Learn at your own pace without cookies, accounts, or tracking.
            </p>
          </Card>
        </div>
      </section>

      {/* 5. CURATED CAREER LEARNING PATHS */}
      <section className="space-y-6 pt-4 border-t border-border">
        <div>
          <span className="text-xs font-semibold text-primary uppercase tracking-wider block mb-1">
            Structured Roadmaps
          </span>
          <h2 className="font-raleway text-2xl sm:text-3xl font-bold text-text-main tracking-tight">
            Curated Learning Paths
          </h2>
          <p className="text-xs sm:text-sm text-text-muted mt-1 max-w-2xl">
            Follow a proven sequence of courses designed to take you from foundational syntax to
            practical job-ready proficiency.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {LEARNING_PATHS.map((path) => (
            <Card
              key={path.id}
              className="p-6 bg-surface border border-border flex flex-col justify-between space-y-5"
            >
              <div className="space-y-3">
                <Badge variant="default" size="sm">
                  Career Track
                </Badge>
                <h3 className="font-raleway text-lg font-bold text-text-main">{path.title}</h3>
                <p className="text-xs text-text-muted leading-relaxed">{path.description}</p>
              </div>

              {/* Steps Sequence */}
              <div className="space-y-2 pt-2 border-t border-border/60">
                <span className="text-[11px] font-semibold text-text-muted uppercase tracking-wider block">
                  Course Sequence:
                </span>
                <div className="space-y-1.5">
                  {path.steps.map((step, idx) => (
                    <Link
                      key={step.name}
                      to={step.path}
                      className="p-2 rounded-md bg-subtle hover:bg-border/60 transition-colors flex items-center justify-between text-xs text-text-main hover:text-primary"
                    >
                      <span className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-border/80 text-[10px] font-mono font-bold flex items-center justify-center shrink-0">
                          {idx + 1}
                        </span>
                        <span className="font-medium truncate">{step.name}</span>
                      </span>
                      <ArrowRight className="w-3.5 h-3.5 text-text-muted shrink-0" />
                    </Link>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* 6. COURSE CATALOGUE & DISCOVERY */}
      <section id="courses-catalog" className="space-y-6 pt-4 border-t border-border scroll-mt-24">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-semibold text-primary uppercase tracking-wider block mb-1">
              Complete Catalogue
            </span>
            <h2 className="font-raleway text-2xl sm:text-3xl font-bold text-text-main tracking-tight">
              Featured Courses ({filteredCourses.length})
            </h2>
          </div>

          {/* Quick Search Input */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-text-muted absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by topic or track..."
              className="w-full pl-9 pr-3 py-2 text-xs bg-surface border border-border rounded-lg text-text-main placeholder:text-text-muted focus:outline-none focus:border-primary transition-colors"
            />
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 border-b border-border pb-3">
          {(
            [
              { id: 'all', label: 'All Tracks (11)' },
              { id: 'databases', label: 'Databases & SQL' },
              { id: 'programming', label: 'Programming & Python' },
              { id: 'web', label: 'Web Development' },
              { id: 'datascience', label: 'Data Science & AI' },
              { id: 'tools', label: 'Developer Tools' },
            ] as const
          ).map((tab) => {
            const isActive = selectedCategory === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setSelectedCategory(tab.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-primary text-white shadow-xs font-semibold'
                    : 'bg-subtle text-text-muted hover:text-text-main hover:bg-border/60'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Courses Grid */}
        {filteredCourses.length === 0 ? (
          <div className="py-12 text-center text-sm text-text-muted bg-surface rounded-xl border border-border">
            <p>No courses match your selected filter or search query.</p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="mt-2 text-xs text-primary font-semibold hover:underline"
            >
              Reset all filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => {
              const Logo = course.logo;
              const progress = courseProgressMap[course.id] || {
                completedLessons: 0,
                totalLessons: course.modulesCount,
                percentage: 0,
              };
              const isStarted = progress.percentage > 0 || progress.completedLessons > 0;
              const isComplete = progress.percentage === 100;

              return (
                <Card
                  key={course.id}
                  className="p-6 flex flex-col justify-between transition-all space-y-5 relative overflow-hidden bg-surface border border-border shadow-card hover:border-primary/60"
                >
                  <div className="space-y-4 pt-1">
                    {/* Header Row: Logo & Category Badge */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="w-13 h-13 rounded-2xl bg-subtle border border-border flex items-center justify-center p-2.5 shadow-xs shrink-0">
                        <Logo className="w-full h-full object-contain" />
                      </div>

                      <div className="text-right">
                        <span className="text-[11px] font-semibold text-secondary uppercase tracking-wider block">
                          {course.category}
                        </span>
                        <span className="text-[11px] text-text-muted block mt-0.5">
                          {course.level}
                        </span>
                      </div>
                    </div>

                    {/* Title & Description */}
                    <div>
                      <h3 className="font-raleway text-lg font-bold text-text-main leading-snug">
                        {course.title}
                      </h3>
                      <p className="text-xs text-text-muted mt-2 leading-relaxed line-clamp-3">
                        {course.description}
                      </p>
                    </div>

                    {/* Course Metrics & Progress */}
                    <div className="pt-2 space-y-2 border-t border-border/60">
                      {isStarted ? (
                        <div className="space-y-1.5">
                          <div className="flex items-center justify-between text-xs font-semibold">
                            <span className="text-text-muted">Course Completion:</span>
                            <span className="font-mono text-primary">{progress.percentage}%</span>
                          </div>
                          <ProgressBar value={progress.percentage} showPercentage={false} size="sm" />
                          <div className="flex items-center justify-between text-[11px] text-text-muted pt-0.5">
                            <span>
                              {progress.completedLessons} of {progress.totalLessons} modules finished
                            </span>
                            {isComplete && (
                              <span className="font-semibold text-success">Finished</span>
                            )}
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-1 text-xs text-text-muted">
                          <div className="flex items-center justify-between">
                            <span>Syllabus:</span>
                            <span className="font-semibold text-text-main">
                              {course.modulesCount} Lessons
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span>Duration:</span>
                            <span className="font-semibold text-text-main">{course.duration}</span>
                          </div>
                        </div>
                      )}

                      <div className="flex items-center justify-between text-xs text-text-muted pt-1">
                        <span>Runtime:</span>
                        <span className="font-semibold text-primary">{course.engineName}</span>
                      </div>
                    </div>
                  </div>

                  {/* Card Action Button */}
                  <div className="pt-4 border-t border-border">
                    <Button
                      variant={isComplete ? 'outline' : 'primary'}
                      size="sm"
                      onClick={() => navigate(course.route)}
                      className="w-full text-xs font-semibold"
                    >
                      {isComplete ? (
                        <>
                          <RotateCcw className="w-3.5 h-3.5 mr-1.5" />
                          <span>Review Course</span>
                        </>
                      ) : isStarted ? (
                        <>
                          <span>Continue Learning ({progress.percentage}%)</span>
                          <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                        </>
                      ) : (
                        <>
                          <span>Start Course</span>
                          <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                        </>
                      )}
                    </Button>
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
