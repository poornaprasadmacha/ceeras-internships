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
  Clock,
  Play,
  Trash2,
  X,
  Code,
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
  JavaLogo,
  CLogo,
  CppLogo,
  CSharpLogo,
  PhpLogo,
  ReactLogo,
  MySqlLogo,
} from '../../components/ui/LanguageLogos';

type CategoryFilter = 'all' | 'web' | 'programming' | 'databases' | 'datascience' | 'tools';

interface CourseCardData {
  id: string;
  configId: string;
  title: string;
  shortTitle: string;
  tagline: string;
  category: string;
  filterCategory: CategoryFilter;
  route: string;
  isComingSoon?: boolean;
  logo: React.ComponentType<{ className?: string; size?: number }>;
}

const COURSES_DATA: CourseCardData[] = [
  // Row 1 (Matches user reference screenshot)
  {
    id: 'html-core',
    configId: 'html',
    title: 'HTML',
    shortTitle: 'HTML',
    tagline: 'The building blocks of every webpage',
    category: 'Web Development',
    filterCategory: 'web',
    route: '/learn/html',
    logo: HtmlLogo,
  },
  {
    id: 'css-core',
    configId: 'css',
    title: 'CSS',
    shortTitle: 'CSS',
    tagline: 'Style and layout for web pages',
    category: 'Web Development',
    filterCategory: 'web',
    route: '/learn/css',
    logo: CssLogo,
  },
  {
    id: 'javascript-modern',
    configId: 'javascript',
    title: 'JavaScript',
    shortTitle: 'JavaScript',
    tagline: 'Interactive and dynamic web pages',
    category: 'Web Development',
    filterCategory: 'web',
    route: '/learn/javascript',
    logo: JavaScriptLogo,
  },
  {
    id: 'sql-relational',
    configId: 'sql',
    title: 'SQL',
    shortTitle: 'SQL',
    tagline: 'Query and manage databases',
    category: 'Databases & SQL',
    filterCategory: 'databases',
    route: '/learn',
    logo: SqlLogo,
  },

  // Row 2 (Matches user reference screenshot)
  {
    id: 'python-core',
    configId: 'python',
    title: 'Python',
    shortTitle: 'Python',
    tagline: 'Popular language for web, data & AI',
    category: 'Programming & Systems',
    filterCategory: 'programming',
    route: '/learn/python',
    logo: PythonLogo,
  },
  {
    id: 'java-core',
    configId: 'java',
    title: 'Java',
    shortTitle: 'Java',
    tagline: 'Object-oriented programming language',
    category: 'Programming & Systems',
    filterCategory: 'programming',
    route: '/learn/python',
    isComingSoon: true,
    logo: JavaLogo,
  },
  {
    id: 'c-core',
    configId: 'c',
    title: 'C',
    shortTitle: 'C',
    tagline: 'A powerful general-purpose language',
    category: 'Programming & Systems',
    filterCategory: 'programming',
    route: '/learn/python',
    isComingSoon: true,
    logo: CLogo,
  },
  {
    id: 'cpp-core',
    configId: 'cpp',
    title: 'C++',
    shortTitle: 'C++',
    tagline: 'The language behind games & engines',
    category: 'Programming & Systems',
    filterCategory: 'programming',
    route: '/learn/python',
    isComingSoon: true,
    logo: CppLogo,
  },

  // Row 3 (Matches user reference screenshot)
  {
    id: 'csharp-core',
    configId: 'csharp',
    title: 'C#',
    shortTitle: 'C#',
    tagline: 'Build apps, games and web services',
    category: 'Programming & Systems',
    filterCategory: 'programming',
    route: '/learn/python',
    isComingSoon: true,
    logo: CSharpLogo,
  },
  {
    id: 'php-core',
    configId: 'php',
    title: 'PHP',
    shortTitle: 'PHP',
    tagline: 'Server-side scripting language',
    category: 'Web Development',
    filterCategory: 'web',
    route: '/learn/javascript',
    isComingSoon: true,
    logo: PhpLogo,
  },
  {
    id: 'react-core',
    configId: 'react',
    title: 'React',
    shortTitle: 'React',
    tagline: 'Build interactive user interfaces',
    category: 'Web Development',
    filterCategory: 'web',
    route: '/playground?tab=web',
    logo: ReactLogo,
  },
  {
    id: 'mysql-core',
    configId: 'mysql',
    title: 'MySQL',
    shortTitle: 'MySQL',
    tagline: 'Store and manage relational data',
    category: 'Databases & SQL',
    filterCategory: 'databases',
    route: '/learn',
    logo: MySqlLogo,
  },

  // Row 4 (Data Science & Scientific Stack)
  {
    id: 'numpy-computing',
    configId: 'numpy',
    title: 'NumPy',
    shortTitle: 'NumPy',
    tagline: 'High-performance numerical computing',
    category: 'Data Science & AI',
    filterCategory: 'datascience',
    route: '/learn/numpy',
    logo: NumpyLogo,
  },
  {
    id: 'pandas-data',
    configId: 'pandas',
    title: 'Pandas',
    shortTitle: 'Pandas',
    tagline: 'Data analysis, manipulation & cleaning',
    category: 'Data Science & AI',
    filterCategory: 'datascience',
    route: '/learn/pandas',
    logo: PandasLogo,
  },
  {
    id: 'data-science',
    configId: 'datascience',
    title: 'Data Science',
    shortTitle: 'Data Science',
    tagline: 'Statistics, EDA and visual charts',
    category: 'Data Science & AI',
    filterCategory: 'datascience',
    route: '/learn/datascience',
    logo: DataScienceLogo,
  },
  {
    id: 'machine-learning',
    configId: 'machinelearning',
    title: 'Machine Learning',
    shortTitle: 'Machine Learning',
    tagline: 'Predictive algorithms and models',
    category: 'Data Science & AI',
    filterCategory: 'datascience',
    route: '/learn/machinelearning',
    logo: ScikitLearnLogo,
  },

  // Row 5 (Developer Tooling & Workflows)
  {
    id: 'git-github',
    configId: 'git',
    title: 'Git & GitHub',
    shortTitle: 'Git & GitHub',
    tagline: 'Distributed version control workflows',
    category: 'Developer Tools',
    filterCategory: 'tools',
    route: '/learn/git',
    logo: GitLogo,
  },
  {
    id: 'vscode-mastery',
    configId: 'vscode',
    title: 'VS Code',
    shortTitle: 'VS Code',
    tagline: 'Developer velocity and editor setup',
    category: 'Developer Tools',
    filterCategory: 'tools',
    route: '/learn/vscode',
    logo: VsCodeLogo,
  },
];

export function DashboardView() {
  const navigate = useNavigate();
  const { stats, bookmarks, lessonsProgress, toggleBookmarkItem } = useProgress();

  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [comingSoonModalCourse, setComingSoonModalCourse] = useState<CourseCardData | null>(null);

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
        // ignore parse error
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

  // Calculate course progress mapping for courses that have configs
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
        map[course.id] = { completedLessons: 0, totalLessons: 12, percentage: 0 };
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
        (selectedCategory === 'programming' && (course.id === 'javascript-modern' || course.id === 'python-core')) ||
        (selectedCategory === 'web' && (course.id === 'react-core' || course.id === 'php-core'));

      const matchesSearch =
        searchQuery.trim() === '' ||
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.shortTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.tagline.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const handleCourseClick = (course: CourseCardData) => {
    if (course.isComingSoon) {
      setComingSoonModalCourse(course);
    } else {
      navigate(course.route);
    }
  };

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
                    <span>Comprehensive Interactive Tracks</span>
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

      {/* 4. COURSE CATALOGUE & DISCOVERY (Clean 4-column cards matching reference design) */}
      <section id="courses-catalog" className="space-y-6 pt-4 border-t border-border scroll-mt-24">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-semibold text-primary uppercase tracking-wider block mb-1">
              Curriculum Tracks
            </span>
            <h2 className="font-raleway text-2xl sm:text-3xl font-bold text-text-main tracking-tight">
              Explore Courses ({filteredCourses.length})
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
              { id: 'all', label: 'All Courses (18)' },
              { id: 'web', label: 'Web Development' },
              { id: 'programming', label: 'Programming & Systems' },
              { id: 'databases', label: 'Databases & SQL' },
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

        {/* Courses Grid - 4 Columns on Desktop matching reference design */}
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
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
            {filteredCourses.map((course) => {
              const Logo = course.logo;
              const progress = courseProgressMap[course.id] || { percentage: 0 };
              const hasProgress = progress.percentage > 0;

              return (
                <div
                  key={course.id}
                  role="button"
                  tabIndex={0}
                  onClick={() => handleCourseClick(course)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleCourseClick(course);
                    }
                  }}
                  className="group relative p-6 sm:p-7 rounded-2xl bg-surface border border-border hover:border-primary/60 hover:-translate-y-1 transition-all duration-200 cursor-pointer flex flex-col items-center text-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-primary overflow-hidden min-h-[180px] sm:min-h-[200px]"
                >
                  {/* Technology Brand Logo */}
                  <div className="w-12 h-12 sm:w-14 sm:h-14 mb-3 sm:mb-4 flex items-center justify-center transition-transform duration-200 group-hover:scale-110 shrink-0">
                    <Logo className="w-full h-full object-contain" />
                  </div>

                  {/* Technology Name */}
                  <h3 className="font-raleway text-base sm:text-lg font-bold text-text-main group-hover:text-primary transition-colors tracking-tight">
                    {course.shortTitle || course.title}
                  </h3>

                  {/* Short Tagline / Description */}
                  <p className="text-xs sm:text-sm text-text-muted mt-1.5 leading-relaxed line-clamp-2 max-w-[210px]">
                    {course.tagline}
                  </p>

                  {/* Subtle Bottom Accent Indicator for Progress */}
                  {hasProgress && (
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-border/40">
                      <div
                        className="h-full bg-primary transition-all duration-300"
                        style={{ width: `${progress.percentage}%` }}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* COMING SOON MODAL */}
      {comingSoonModalCourse && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn"
          onClick={() => setComingSoonModalCourse(null)}
        >
          <div
            className="w-full max-w-md bg-surface border border-border rounded-2xl shadow-xl p-6 space-y-5 animate-scaleUp"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-subtle border border-border flex items-center justify-center p-2 shrink-0">
                  <comingSoonModalCourse.logo className="w-full h-full object-contain" />
                </div>
                <div>
                  <h3 id="modal-title" className="font-raleway text-lg font-bold text-text-main">
                    {comingSoonModalCourse.title} Curriculum
                  </h3>
                  <span className="text-xs text-primary font-semibold">Under Active Development</span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setComingSoonModalCourse(null)}
                className="p-1 rounded-md text-text-muted hover:text-text-main hover:bg-subtle transition-colors"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
              The <strong className="text-text-main">{comingSoonModalCourse.title}</strong> curriculum is currently being authored for CEERAS. In the meantime, you can dive straight into our fully interactive in-browser tracks:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  setComingSoonModalCourse(null);
                  navigate('/learn/python');
                }}
                className="text-xs font-semibold"
              >
                <span>Try Python 3 Track</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setComingSoonModalCourse(null);
                  navigate('/learn');
                }}
                className="text-xs font-semibold"
              >
                <span>Try SQL Track</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </Button>
            </div>

            <div className="pt-2 border-t border-border flex justify-end">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setComingSoonModalCourse(null)}
                className="text-xs text-text-muted"
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
