import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useProgress } from '../../hooks/useProgress';
import { getLessonById } from '../../data/lessons';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { ProgressBar } from '../../components/ui/ProgressBar';
import {
  BookOpen,
  CheckCircle2,
  ArrowRight,
  Flame,
  Terminal,
  Bookmark,
  CheckSquare,
  Database,
  Layers,
  Code2,
  BarChart3,
} from 'lucide-react';
import {
  SqlLogo,
  PythonLogo,
  HtmlLogo,
  CssLogo,
  NumpyLogo,
  PandasLogo,
  DataScienceLogo,
  JavaScriptLogo,
  ScikitLearnLogo,
} from '../../components/ui/LanguageLogos';

interface CourseItem {
  id: string;
  title: string;
  category: string;
  badge: string;
  badgeVariant: 'accent' | 'outline';
  status: 'active' | 'upcoming';
  modulesCount: number;
  duration: string;
  logo: React.ComponentType<{ className?: string; size?: number }>;
}

const COURSES: CourseItem[] = [
  {
    id: 'sql-relational',
    title: 'SQL & Relational Databases',
    category: 'Databases & SQL',
    badge: 'Enrolled & Active',
    badgeVariant: 'accent',
    status: 'active',
    modulesCount: 24,
    duration: '14-16 hours',
    logo: SqlLogo,
  },
  {
    id: 'python-core',
    title: 'Python Programming Fundamentals',
    category: 'Python & Software Engineering',
    badge: 'Enrolled & Active',
    badgeVariant: 'accent',
    status: 'active',
    modulesCount: 12,
    duration: '6-8 hours',
    logo: PythonLogo,
  },
  {
    id: 'html-core',
    title: 'HTML5 & Modern Web Architecture',
    category: 'Web Development & Frontend',
    badge: 'Enrolled & Active',
    badgeVariant: 'accent',
    status: 'active',
    modulesCount: 12,
    duration: '6-8 hours',
    logo: HtmlLogo,
  },
  {
    id: 'css-core',
    title: 'CSS3 & Modern Responsive Design',
    category: 'Web Development & Frontend',
    badge: 'Enrolled & Active',
    badgeVariant: 'accent',
    status: 'active',
    modulesCount: 12,
    duration: '6-8 hours',
    logo: CssLogo,
  },
  {
    id: 'numpy-computing',
    title: 'NumPy for Numerical Computing',
    category: 'Python & Data Science',
    badge: 'Enrolled & Active',
    badgeVariant: 'accent',
    status: 'active',
    modulesCount: 12,
    duration: '6-8 hours',
    logo: NumpyLogo,
  },
  {
    id: 'pandas-data',
    title: 'Pandas for Data Analysis & Manipulation',
    category: 'Python & Data Science',
    badge: 'Enrolled & Active',
    badgeVariant: 'accent',
    status: 'active',
    modulesCount: 12,
    duration: '6-8 hours',
    logo: PandasLogo,
  },
  {
    id: 'data-science',
    title: 'Data Science (Statistics, EDA & ML)',
    category: 'Python & Data Science',
    badge: 'Enrolled & Active',
    badgeVariant: 'accent',
    status: 'active',
    modulesCount: 14,
    duration: '8-10 hours',
    logo: DataScienceLogo,
  },
  {
    id: 'javascript-modern',
    title: 'Modern JavaScript (ES6+ & Web APIs)',
    category: 'Web Development & Frontend',
    badge: 'Enrolled & Active',
    badgeVariant: 'accent',
    status: 'active',
    modulesCount: 14,
    duration: '8-10 hours',
    logo: JavaScriptLogo,
  },
  {
    id: 'machine-learning',
    title: 'Machine Learning (Algorithms & Ensembles)',
    category: 'AI & Data Science',
    badge: 'Enrolled & Active',
    badgeVariant: 'accent',
    status: 'active',
    modulesCount: 15,
    duration: '10-12 hours',
    logo: ScikitLearnLogo,
  },
];

export function DashboardView() {
  const navigate = useNavigate();
  const { stats, bookmarks, lessonsProgress } = useProgress();

  const hasStartedPython = (() => {
    try {
      const p = localStorage.getItem('ceeras_python_solved');
      return p ? Object.keys(JSON.parse(p)).length > 0 : false;
    } catch {
      return false;
    }
  })();

  const hasStartedHtml = (() => {
    try {
      const h = localStorage.getItem('ceeras_html_solved');
      return h ? Object.keys(JSON.parse(h)).length > 0 : false;
    } catch {
      return false;
    }
  })();

  const hasStartedCss = (() => {
    try {
      const c = localStorage.getItem('ceeras_css_solved');
      return c ? Object.keys(JSON.parse(c)).length > 0 : false;
    } catch {
      return false;
    }
  })();

  const hasStartedJs = (() => {
    try {
      const j = localStorage.getItem('ceeras_js_solved');
      return j ? Object.keys(JSON.parse(j)).length > 0 : false;
    } catch {
      return false;
    }
  })();

  const hasStartedDs = (() => {
    try {
      const d = localStorage.getItem('ceeras_ds_solved');
      return d ? Object.keys(JSON.parse(d)).length > 0 : false;
    } catch {
      return false;
    }
  })();

  const hasStartedMl = (() => {
    try {
      const m = localStorage.getItem('ceeras_ml_solved');
      return m ? Object.keys(JSON.parse(m)).length > 0 : false;
    } catch {
      return false;
    }
  })();

  const hasStartedNumpy = (() => {
    try {
      const n = localStorage.getItem('ceeras_numpy_solved');
      return n ? Object.keys(JSON.parse(n)).length > 0 : false;
    } catch {
      return false;
    }
  })();

  const hasStartedPandas = (() => {
    try {
      const p = localStorage.getItem('ceeras_pandas_solved');
      return p ? Object.keys(JSON.parse(p)).length > 0 : false;
    } catch {
      return false;
    }
  })();

  const hasStartedAny =
    stats.solvedExercises > 0 ||
    stats.quizzesTaken > 0 ||
    stats.completedLessons > 0 ||
    hasStartedPython ||
    hasStartedHtml ||
    hasStartedCss ||
    hasStartedJs ||
    hasStartedDs ||
    hasStartedMl ||
    hasStartedNumpy ||
    hasStartedPandas ||
    Object.values(lessonsProgress).some((l) => l.isStarted || l.isCompleted);

  return (
    <div className="space-y-12 pb-16">
      {/* HERO SECTION MATCHING CEERAS DESIGN */}
      <section className="pt-4 sm:pt-6 md:pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6">
            <h1 className="font-raleway text-3xl sm:text-4xl md:text-5xl lg:text-[48px] font-bold text-primary tracking-tight leading-[1.16]">
              Our mission: <br />
              Spreading knowledge to ignite global change.
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-text-muted font-normal leading-relaxed max-w-xl">
              Join Our Ceeras Team Today and Shape a Brighter Future Together
            </p>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => navigate('/learn')}
                className="px-8 py-3 rounded-full bg-secondary hover:bg-secondary/90 text-white font-medium text-sm sm:text-base shadow-sm transition-all cursor-pointer active:scale-95 inline-flex items-center gap-2"
              >
                <span>Register Now</span>
              </button>
            </div>
          </div>

          {/* Right Illustration Column */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="w-full max-w-md lg:max-w-none">
              <img
                src="/images/ceeras-hero.png"
                alt="Ceeras Student Learning Illustration"
                className="w-full h-auto object-contain max-h-[380px] lg:max-h-[440px]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED COURSES SECTION */}
      <section className="space-y-6 pt-4 border-t border-border/70">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="font-raleway text-2xl sm:text-3xl font-bold text-text-main tracking-tight">
              Featured Courses
            </h2>
            <p className="text-xs sm:text-sm text-text-muted mt-0.5">
              Hands-on interactive learning powered by authentic in-browser WebAssembly engines.
            </p>
          </div>
          <Badge variant="accent" size="sm" className="self-start sm:self-auto">
            Available Online &amp; Offline
          </Badge>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {COURSES.map((course) => {
            const Logo = course.logo;
            const isSQL = course.id === 'sql-relational';
            const isPython = course.id === 'python-core';
            const isHtml = course.id === 'html-core';
            const isCss = course.id === 'css-core';
            const isJs = course.id === 'javascript-modern';
            const isDs = course.id === 'data-science';
            const isML = course.id === 'machine-learning';
            const isNumpy = course.id === 'numpy-computing';
            const isPandas = course.id === 'pandas-data';
            const isActive = isSQL || isPython || isHtml || isCss || isJs || isDs || isML || isNumpy || isPandas;

            return (
              <Card
                key={course.id}
                className={`p-6 flex flex-col justify-between transition-all space-y-5 relative overflow-hidden bg-surface ${
                  isActive
                    ? 'border-primary/50 shadow-card hover:border-primary'
                    : 'border-border/80 opacity-90'
                }`}
              >
                {/* Course Header Tag */}
                <div
                  className={`absolute top-0 right-0 text-[10px] font-bold px-3 py-1 rounded-bl-lg uppercase tracking-wider ${
                    isActive
                      ? 'bg-secondary text-white'
                      : 'bg-subtle text-text-muted border-l border-b border-border'
                  }`}
                >
                  {course.badge}
                </div>

                <div className="space-y-4 pt-2">
                  {/* Official Language Logo */}
                  <div className="w-14 h-14 rounded-2xl bg-subtle/80 border border-border/80 flex items-center justify-center p-2.5 shadow-xs">
                    <Logo className="w-full h-full object-contain" />
                  </div>

                  <div>
                    <span className="text-[11px] font-semibold text-secondary uppercase tracking-wider block mb-1">
                      {course.category}
                    </span>
                    <h3 className="font-raleway text-lg font-bold text-text-main leading-snug">
                      {course.title}
                    </h3>
                  </div>

                  {/* Course Details */}
                  {isSQL ? (
                    <div className="pt-2 space-y-2">
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-xs font-semibold">
                          <span className="text-text-muted">Course Completion:</span>
                          <span className="font-mono text-primary">{stats.coursePercentage}%</span>
                        </div>
                        <ProgressBar value={stats.coursePercentage} showPercentage={false} size="sm" />
                      </div>

                      <div className="space-y-1.5 pt-2 text-xs text-text-muted">
                        <div className="flex items-center justify-between">
                          <span>Syllabus:</span>
                          <span className="font-semibold text-text-main">24 Lessons (Zero to Senior Advanced)</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Exercises:</span>
                          <span className="font-semibold text-text-main">50+ Hands-On Queries</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Engine:</span>
                          <span className="font-semibold text-primary">In-Browser SQLite WASM</span>
                        </div>
                      </div>
                    </div>
                  ) : isPython ? (
                    <div className="pt-2 space-y-1.5 text-xs text-text-muted border-t border-border/50">
                      <div className="flex items-center justify-between">
                        <span>Syllabus:</span>
                        <span className="font-semibold text-text-main">12 Lessons (Zero to OOP)</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Interactive Tasks:</span>
                        <span className="font-semibold text-text-main">24 Coding Challenges</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Engine:</span>
                        <span className="font-semibold text-[#3776AB]">In-Browser Python 3 Console</span>
                      </div>
                    </div>
                  ) : isHtml ? (
                    <div className="pt-2 space-y-1.5 text-xs text-text-muted border-t border-border/50">
                      <div className="flex items-center justify-between">
                        <span>Syllabus:</span>
                        <span className="font-semibold text-text-main">12 Lessons (Zero to HTML5 Master)</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Interactive Tasks:</span>
                        <span className="font-semibold text-text-main">Live Browser Preview &amp; DOM Tests</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Engine:</span>
                        <span className="font-semibold text-[#E44D26]">Sandboxed Live Web Preview</span>
                      </div>
                    </div>
                  ) : isCss ? (
                    <div className="pt-2 space-y-1.5 text-xs text-text-muted border-t border-border/50">
                      <div className="flex items-center justify-between">
                        <span>Syllabus:</span>
                        <span className="font-semibold text-text-main">12 Lessons (Zero to Modern Layouts)</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Interactive Tasks:</span>
                        <span className="font-semibold text-text-main">Live Component Visualizer &amp; Styles</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Engine:</span>
                        <span className="font-semibold text-[#1572B6]">Sandboxed Component Visualizer</span>
                      </div>
                    </div>
                  ) : isJs ? (
                    <div className="pt-2 space-y-1.5 text-xs text-text-muted border-t border-border/50">
                      <div className="flex items-center justify-between">
                        <span>Syllabus:</span>
                        <span className="font-semibold text-text-main">14 Lessons (Zero to Advanced JS)</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Interactive Tasks:</span>
                        <span className="font-semibold text-text-main">Live V8 Console &amp; Algorithm Tests</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Engine:</span>
                        <span className="font-semibold text-amber-600 dark:text-amber-400">In-Browser Live JS Runtime</span>
                      </div>
                    </div>
                  ) : isDs ? (
                    <div className="pt-2 space-y-1.5 text-xs text-text-muted border-t border-border/50">
                      <div className="flex items-center justify-between">
                        <span>Syllabus:</span>
                        <span className="font-semibold text-text-main">14 Lessons (Zero to Hero)</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Interactive Tasks:</span>
                        <span className="font-semibold text-text-main">In-Browser DataFrames &amp; SVG Plots</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Engine:</span>
                        <span className="font-semibold text-[#E70488]">In-Browser Statistics &amp; Plotter</span>
                      </div>
                    </div>
                  ) : isML ? (
                    <div className="pt-2 space-y-1.5 text-xs text-text-muted border-t border-border/50">
                      <div className="flex items-center justify-between">
                        <span>Syllabus:</span>
                        <span className="font-semibold text-text-main">15 Lessons (Zero to Hero ML)</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Interactive Tasks:</span>
                        <span className="font-semibold text-text-main">In-Browser Model Training &amp; Plots</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Engine:</span>
                        <span className="font-semibold text-[#F89939]">In-Browser ML Sandbox &amp; Metrics</span>
                      </div>
                    </div>
                  ) : isNumpy ? (
                    <div className="pt-2 space-y-1.5 text-xs text-text-muted border-t border-border/50">
                      <div className="flex items-center justify-between">
                        <span>Syllabus:</span>
                        <span className="font-semibold text-text-main">12 Lessons (Zero to Hero NumPy)</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Interactive Tasks:</span>
                        <span className="font-semibold text-text-main">In-Browser ndarrays &amp; Matrix Layouts</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Engine:</span>
                        <span className="font-semibold text-[#4DABCF]">In-Browser Numerical C-Memory Engine</span>
                      </div>
                    </div>
                  ) : isPandas ? (
                    <div className="pt-2 space-y-1.5 text-xs text-text-muted border-t border-border/50">
                      <div className="flex items-center justify-between">
                        <span>Syllabus:</span>
                        <span className="font-semibold text-text-main">12 Lessons (Zero to Hero Pandas)</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Interactive Tasks:</span>
                        <span className="font-semibold text-text-main">In-Browser Series, DataFrames &amp; Tables</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Engine:</span>
                        <span className="font-semibold text-[#130754] dark:text-[#00D2FF]">In-Browser Tabular Data Engine</span>
                      </div>
                    </div>
                  ) : (
                    <div className="pt-2 space-y-1.5 text-xs text-text-muted border-t border-border/50">
                      <div className="flex items-center justify-between">
                        <span>Modules:</span>
                        <span className="font-semibold text-text-main">{course.modulesCount} Units</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Duration:</span>
                        <span className="font-semibold text-text-main">{course.duration}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Format:</span>
                        <span className="font-semibold text-text-muted">Interactive Sandbox</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Card Action Footer */}
                <div className="pt-4 border-t border-border flex items-center justify-between gap-2">
                  {isSQL ? (
                    <>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => navigate('/practice')}
                        className="text-xs"
                      >
                        <Terminal className="w-3.5 h-3.5" />
                        <span>Sandbox</span>
                      </Button>

                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => navigate('/learn')}
                        className="text-xs"
                      >
                        <span>{hasStartedAny ? 'Continue Course' : 'Start Course'}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Button>
                    </>
                  ) : isPython ? (
                    <>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => navigate('/learn/python')}
                        className="text-xs"
                      >
                        <BookOpen className="w-3.5 h-3.5" />
                        <span>Syllabus</span>
                      </Button>

                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => navigate('/learn/python/hello-python-print')}
                        className="text-xs bg-[#3776AB] hover:bg-[#2b5e89]"
                      >
                        <span>Start Python</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Button>
                    </>
                  ) : isHtml ? (
                    <>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => navigate('/learn/html')}
                        className="text-xs"
                      >
                        <BookOpen className="w-3.5 h-3.5" />
                        <span>Syllabus</span>
                      </Button>

                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => navigate('/learn/html/intro-to-html-and-tags')}
                        className="text-xs bg-[#E44D26] hover:bg-[#c83d19] text-white"
                      >
                        <span>Start HTML</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Button>
                    </>
                  ) : isCss ? (
                    <>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => navigate('/learn/css')}
                        className="text-xs"
                      >
                        <BookOpen className="w-3.5 h-3.5" />
                        <span>Syllabus</span>
                      </Button>

                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => navigate('/learn/css/intro-to-css-syntax-and-selectors')}
                        className="text-xs bg-[#1572B6] hover:bg-[#10568a] text-white"
                      >
                        <span>Start CSS</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Button>
                    </>
                  ) : isJs ? (
                    <>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => navigate('/learn/javascript')}
                        className="text-xs"
                      >
                        <BookOpen className="w-3.5 h-3.5" />
                        <span>Syllabus</span>
                      </Button>

                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => navigate('/learn/javascript/hello-javascript-and-console')}
                        className="text-xs bg-amber-500 hover:bg-amber-600 text-black font-bold"
                      >
                        <span>Start JS</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Button>
                    </>
                  ) : isDs ? (
                    <>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => navigate('/learn/datascience')}
                        className="text-xs"
                      >
                        <BookOpen className="w-3.5 h-3.5" />
                        <span>Syllabus</span>
                      </Button>

                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => navigate('/learn/datascience/intro-to-data-science-and-datasets')}
                        className="text-xs bg-[#130754] hover:bg-[#1f0c82] text-white font-bold"
                      >
                        <span>Start Data Science</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Button>
                    </>
                  ) : isML ? (
                    <>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => navigate('/learn/machinelearning')}
                        className="text-xs"
                      >
                        <BookOpen className="w-3.5 h-3.5" />
                        <span>Syllabus</span>
                      </Button>

                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => navigate('/learn/machinelearning/intro-to-machine-learning-paradigms')}
                        className="text-xs bg-[#1E293B] hover:bg-[#334155] text-white font-bold"
                      >
                        <span>Start ML</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Button>
                    </>
                  ) : isNumpy ? (
                    <>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => navigate('/learn/numpy')}
                        className="text-xs"
                      >
                        <BookOpen className="w-3.5 h-3.5" />
                        <span>Syllabus</span>
                      </Button>

                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => navigate('/learn/numpy/intro-to-numpy-and-ndarrays')}
                        className="text-xs bg-[#013243] hover:bg-[#024059] text-white font-bold"
                      >
                        <span>Start NumPy</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Button>
                    </>
                  ) : isPandas ? (
                    <>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => navigate('/learn/pandas')}
                        className="text-xs"
                      >
                        <BookOpen className="w-3.5 h-3.5" />
                        <span>Syllabus</span>
                      </Button>

                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => navigate('/learn/pandas/intro-to-pandas-series-and-dataframes')}
                        className="text-xs bg-[#130754] hover:bg-[#1f0c82] text-white font-bold"
                      >
                        <span>Start Pandas</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Button>
                    </>
                  ) : (
                    <div className="flex items-center justify-between w-full text-xs text-text-muted">
                      <span className="italic">In Curriculum Design</span>
                      <span className="text-[11px] font-semibold text-primary bg-primary/10 px-2.5 py-1 rounded-full">
                        Coming Soon
                      </span>
                    </div>
                  )}
                </div>
              </Card>
            );
          })}
        </div>
      </section>

      {/* STUDY ANALYTICS & REVIEW: Only visible once the student starts learning a course */}
      {hasStartedAny && (
        <>
          <section className="space-y-4 pt-4 border-t border-border/60 animate-fadeIn">
            <h2 className="font-raleway text-xl font-bold text-text-main">
              Your Study Analytics
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card className="p-4 space-y-1.5 bg-surface">
                <div className="flex items-center justify-between text-text-muted">
                  <span className="text-xs font-medium">Completed Lessons</span>
                  <BookOpen className="w-4 h-4 text-primary" />
                </div>
                <div className="text-2xl font-bold font-mono text-text-main">
                  {stats.completedLessons} / {stats.totalLessons}
                </div>
                <span className="text-[11px] text-text-muted block">
                  {stats.completedLessons === stats.totalLessons
                    ? 'All modules completed'
                    : `${stats.totalLessons - stats.completedLessons} remaining`}
                </span>
              </Card>

              <Card className="p-4 space-y-1.5 bg-surface">
                <div className="flex items-center justify-between text-text-muted">
                  <span className="text-xs font-medium">Exercises Solved</span>
                  <CheckCircle2 className="w-4 h-4 text-success" />
                </div>
                <div className="text-2xl font-bold font-mono text-text-main">
                  {stats.solvedExercises} / {stats.totalExercises}
                </div>
                <span className="text-[11px] text-text-muted block">
                  {stats.exercisePercentage}% of total tasks
                </span>
              </Card>

              <Card className="p-4 space-y-1.5 bg-surface">
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

              <Card className="p-4 space-y-1.5 bg-surface">
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

          {/* REVIEW TEST & BOOKMARKS */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fadeIn">
            <Card variant="subtle" className="p-6 space-y-4 flex flex-col justify-between border border-border">
              <div className="space-y-2">
                <Badge variant="accent" size="sm">
                  Comprehensive Review
                </Badge>
                <h3 className="font-raleway text-lg font-bold text-text-main">
                  Foundation Review Test
                </h3>
                <p className="text-xs text-text-muted leading-relaxed">
                  Consolidate your knowledge from the interactive SQL curriculum with our 10-question assessment covering relational concepts, column selection, syntax, and query predictions.
                </p>
              </div>

              <div className="pt-3 flex items-center justify-between border-t border-border/50">
                <span className="text-xs text-text-muted">Pass Mark: 80%</span>
                <Button variant="primary" size="sm" onClick={() => navigate('/quizzes')}>
                  <span>Start Review Test</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Button>
              </div>
            </Card>

            <Card className="p-6 space-y-4 bg-surface border border-border">
              <div className="flex items-center justify-between">
                <h3 className="font-raleway text-base font-bold text-text-main flex items-center gap-2">
                  <Bookmark className="w-4 h-4 text-primary" />
                  <span>Bookmarked Lessons</span>
                </h3>
                <Link to="/bookmarks" className="text-xs text-primary hover:underline">
                  View all
                </Link>
              </div>

              {bookmarks.length === 0 ? (
                <p className="text-xs text-text-muted py-4">
                  No bookmarked lessons yet. Click the bookmark icon inside any lesson to save it here for quick access.
                </p>
              ) : (
                <div className="space-y-2">
                  {bookmarks.slice(0, 3).map((b) => (
                    <div
                      key={b.id}
                      onClick={() => navigate(`/learn/${getLessonById(b.lessonId)?.slug || ''}`)}
                      className="p-2.5 rounded-md bg-subtle hover:bg-border/60 transition-colors cursor-pointer flex items-center justify-between text-xs"
                    >
                      <span className="font-medium text-text-main truncate">{b.title}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-text-muted shrink-0" />
                    </div>
                  ))}
                </div>
              )}
            </Card>
          </section>
        </>
      )}
    </div>
  );
}
