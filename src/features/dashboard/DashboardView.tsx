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
  NumpyLogo,
  PandasLogo,
  JavaScriptLogo,
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
    modulesCount: 16,
    duration: '10-12 hours',
    logo: SqlLogo,
  },
  {
    id: 'python-core',
    title: 'Python Programming Fundamentals',
    category: 'Python & Data Science',
    badge: 'Coming Soon',
    badgeVariant: 'outline',
    status: 'upcoming',
    modulesCount: 8,
    duration: '6-8 hours',
    logo: PythonLogo,
  },
  {
    id: 'numpy-computing',
    title: 'NumPy for Numerical Computing',
    category: 'Python & Data Science',
    badge: 'Coming Soon',
    badgeVariant: 'outline',
    status: 'upcoming',
    modulesCount: 6,
    duration: '4-5 hours',
    logo: NumpyLogo,
  },
  {
    id: 'data-science',
    title: 'Data Science & Tabular Analytics',
    category: 'Python & Data Science',
    badge: 'Coming Soon',
    badgeVariant: 'outline',
    status: 'upcoming',
    modulesCount: 10,
    duration: '10-12 hours',
    logo: PandasLogo,
  },
  {
    id: 'javascript-modern',
    title: 'Modern JavaScript Essentials',
    category: 'Web Development',
    badge: 'Coming Soon',
    badgeVariant: 'outline',
    status: 'upcoming',
    modulesCount: 9,
    duration: '8-10 hours',
    logo: JavaScriptLogo,
  },
];

export function DashboardView() {
  const navigate = useNavigate();
  const { stats, bookmarks, lessonsProgress } = useProgress();

  const hasStartedAny =
    stats.solvedExercises > 0 ||
    stats.quizzesTaken > 0 ||
    stats.completedLessons > 0 ||
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

            return (
              <Card
                key={course.id}
                className={`p-6 flex flex-col justify-between transition-all space-y-5 relative overflow-hidden bg-surface ${
                  isSQL
                    ? 'border-primary/50 shadow-card hover:border-primary'
                    : 'border-border/80 opacity-90'
                }`}
              >
                {/* Course Header Tag */}
                <div
                  className={`absolute top-0 right-0 text-[10px] font-bold px-3 py-1 rounded-bl-lg uppercase tracking-wider ${
                    isSQL
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

                  {/* Course Details (No bulky description paragraphs) */}
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
                          <span className="font-semibold text-text-main">16 Lessons (Zero to Advanced)</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Exercises:</span>
                          <span className="font-semibold text-text-main">40+ Hands-On Queries</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Engine:</span>
                          <span className="font-semibold text-primary">In-Browser SQLite WASM</span>
                        </div>
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
