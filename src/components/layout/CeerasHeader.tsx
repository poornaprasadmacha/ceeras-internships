import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import {
  Search,
  ChevronDown,
  Menu,
  X,
  Database,
  CheckSquare,
  Award,
  GraduationCap,
  Sparkles,
} from 'lucide-react';
import { ThemeToggle } from '../ui/ThemeToggle';
import {
  SqlLogo,
  PythonLogo,
  HtmlLogo,
  CssLogo,
  NumpyLogo,
  PandasLogo,
  JavaScriptLogo,
} from '../ui/LanguageLogos';
import { useTheme } from '../../hooks/useTheme';
import { THEMES } from '../../lib/constants';

export function CeerasHeader({ onToggleSidebar }: { onToggleSidebar?: () => void }) {
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  const [coursesOpen, setCoursesOpen] = useState(false);
  const [quizzesOpen, setQuizzesOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    const q = searchQuery.toLowerCase();
    if (q.includes('sql') || q.includes('select') || q.includes('table') || q.includes('lesson')) {
      navigate('/learn');
    } else if (q.includes('quiz') || q.includes('test')) {
      navigate('/quizzes');
    } else if (q.includes('practice') || q.includes('sandbox')) {
      navigate('/practice');
    } else {
      navigate('/learn');
    }
    setSearchOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-surface/95 backdrop-blur-md border-b border-border transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo: CEERAS in bold Raleway Font matching reference design */}
        <Link to="/" className="flex items-center gap-2 group">
          <span className="font-raleway text-3xl sm:text-4xl font-extrabold tracking-widest text-[#0E5E77] group-hover:text-primary transition-colors">
            CEERAS
          </span>
        </Link>

        {/* Center Navigation Links (Desktop) */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-text-main">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `transition-colors hover:text-primary ${
                isActive ? 'text-primary font-semibold' : 'text-text-main'
              }`
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/progress"
            className={({ isActive }) =>
              `transition-colors hover:text-primary ${
                isActive ? 'text-primary font-semibold' : 'text-text-main'
              }`
            }
          >
            Verify
          </NavLink>

          <NavLink
            to="/about"
            className={({ isActive }) =>
              `transition-colors hover:text-primary ${
                isActive ? 'text-primary font-semibold' : 'text-text-main'
              }`
            }
          >
            About Us
          </NavLink>

          <NavLink
            to="/accessibility"
            className={({ isActive }) =>
              `transition-colors hover:text-primary ${
                isActive ? 'text-primary font-semibold' : 'text-text-main'
              }`
            }
          >
            Contact Us
          </NavLink>

          {/* Courses Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setCoursesOpen(true)}
            onMouseLeave={() => setCoursesOpen(false)}
          >
            <button
              type="button"
              onClick={() => setCoursesOpen((prev) => !prev)}
              className="flex items-center gap-1 transition-colors hover:text-primary cursor-pointer py-2"
            >
              <span>Courses</span>
              <ChevronDown className="w-3.5 h-3.5 opacity-70" />
            </button>

            {coursesOpen && (
              <div className="absolute top-full left-0 w-80 bg-surface border border-border rounded-xl shadow-card p-2 space-y-1 z-50">
                <div className="px-2 py-1 text-[11px] font-bold text-text-muted uppercase tracking-wider">
                  Active Courses
                </div>
                <Link
                  to="/learn"
                  onClick={() => setCoursesOpen(false)}
                  className="flex items-start gap-2.5 p-2 rounded-lg hover:bg-subtle transition-colors border border-transparent hover:border-border"
                >
                  <SqlLogo className="w-5 h-5 shrink-0 mt-0.5 rounded" />
                  <div>
                    <span className="font-semibold text-xs text-text-main block">
                      SQL &amp; Relational Databases
                    </span>
                    <span className="text-[11px] text-text-muted block">
                      24 Lessons • In-browser SQLite WASM
                    </span>
                  </div>
                </Link>

                <Link
                  to="/learn/python"
                  onClick={() => setCoursesOpen(false)}
                  className="flex items-start gap-2.5 p-2 rounded-lg hover:bg-subtle transition-colors border border-transparent hover:border-border"
                >
                  <PythonLogo className="w-5 h-5 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-xs text-text-main block">
                      Python Programming Fundamentals
                    </span>
                    <span className="text-[11px] text-text-muted block">
                      12 Lessons • In-browser Terminal Console
                    </span>
                  </div>
                </Link>

                <Link
                  to="/learn/html"
                  onClick={() => setCoursesOpen(false)}
                  className="flex items-start gap-2.5 p-2 rounded-lg hover:bg-subtle transition-colors border border-transparent hover:border-border"
                >
                  <HtmlLogo className="w-5 h-5 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-xs text-text-main block">
                      HTML5 &amp; Modern Web Architecture
                    </span>
                    <span className="text-[11px] text-text-muted block">
                      12 Lessons • Live Sandboxed Web Preview
                    </span>
                  </div>
                </Link>

                <Link
                  to="/learn/css"
                  onClick={() => setCoursesOpen(false)}
                  className="flex items-start gap-2.5 p-2 rounded-lg hover:bg-subtle transition-colors border border-transparent hover:border-border"
                >
                  <CssLogo className="w-5 h-5 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-xs text-text-main block">
                      CSS3 &amp; Modern Responsive Design
                    </span>
                    <span className="text-[11px] text-text-muted block">
                      12 Lessons • Live Component Visualizer
                    </span>
                  </div>
                </Link>

                <Link
                  to="/learn/javascript"
                  onClick={() => setCoursesOpen(false)}
                  className="flex items-start gap-2.5 p-2 rounded-lg hover:bg-subtle transition-colors border border-transparent hover:border-border"
                >
                  <JavaScriptLogo className="w-5 h-5 shrink-0 mt-0.5 rounded" />
                  <div>
                    <span className="font-semibold text-xs text-text-main block">
                      Modern JavaScript (ES6+ &amp; Web Engine)
                    </span>
                    <span className="text-[11px] text-text-muted block">
                      14 Lessons • Live V8 Console
                    </span>
                  </div>
                </Link>

                <Link
                  to="/learn/datascience"
                  onClick={() => setCoursesOpen(false)}
                  className="flex items-start gap-2.5 p-2 rounded-lg hover:bg-subtle transition-colors border border-transparent hover:border-border"
                >
                  <PandasLogo className="w-5 h-5 shrink-0 mt-0.5 rounded" />
                  <div>
                    <span className="font-semibold text-xs text-text-main block">
                      Data Science (Statistics, EDA &amp; ML)
                    </span>
                    <span className="text-[11px] text-text-muted block">
                      14 Lessons • Tabular Engine &amp; Plotter
                    </span>
                  </div>
                </Link>

                <div className="px-2 pt-2 text-[11px] font-bold text-text-muted uppercase tracking-wider border-t border-border/50">
                  Upcoming Academy Tracks
                </div>
                <div className="p-2 space-y-2 text-xs">
                  <div className="flex items-center justify-between text-text-main">
                    <span className="flex items-center gap-2 font-medium">
                      <NumpyLogo className="w-4 h-4 shrink-0 rounded" />
                      <span>NumPy for Computing</span>
                    </span>
                    <span className="text-[10px] font-semibold text-primary bg-primary/10 px-1.5 py-0.5 rounded">Soon</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Quizzes Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setQuizzesOpen(true)}
            onMouseLeave={() => setQuizzesOpen(false)}
          >
            <button
              type="button"
              onClick={() => setQuizzesOpen((prev) => !prev)}
              className="flex items-center gap-1 transition-colors hover:text-primary cursor-pointer py-2"
            >
              <span>Quizes</span>
              <ChevronDown className="w-3.5 h-3.5 opacity-70" />
            </button>

            {quizzesOpen && (
              <div className="absolute top-full left-0 w-60 bg-surface border border-border rounded-xl shadow-card p-2 space-y-1 z-50">
                <Link
                  to="/quizzes"
                  onClick={() => setQuizzesOpen(false)}
                  className="flex items-start gap-2.5 p-2.5 rounded-lg hover:bg-subtle transition-colors"
                >
                  <CheckSquare className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-xs text-text-main block">
                      Foundation Review Test
                    </span>
                    <span className="text-[11px] text-text-muted block">
                      10 questions (80% pass score)
                    </span>
                  </div>
                </Link>

                <Link
                  to="/learn/sql-basics#quiz"
                  onClick={() => setQuizzesOpen(false)}
                  className="p-2 text-xs text-text-muted hover:text-text-main block rounded hover:bg-subtle"
                >
                  Lesson 1 Knowledge Quiz
                </Link>
                <Link
                  to="/learn/sql-select-queries#quiz"
                  onClick={() => setQuizzesOpen(false)}
                  className="p-2 text-xs text-text-muted hover:text-text-main block rounded hover:bg-subtle"
                >
                  Lesson 2 Knowledge Quiz
                </Link>
              </div>
            )}
          </div>
        </nav>

        {/* Right Action Icons: Search + Theme + Mobile toggle */}
        <div className="flex items-center gap-3">
          {/* Search Trigger */}
          <div className="relative">
            {searchOpen ? (
              <form onSubmit={handleSearchSubmit} className="flex items-center">
                <input
                  type="text"
                  autoFocus
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search courses, lessons..."
                  className="w-48 sm:w-64 px-3 py-1.5 text-xs bg-subtle border border-primary rounded-full focus:outline-none text-text-main"
                />
                <button
                  type="button"
                  onClick={() => setSearchOpen(false)}
                  className="p-1 text-text-muted hover:text-text-main ml-1 cursor-pointer"
                  aria-label="Close search"
                >
                  <X className="w-4 h-4" />
                </button>
              </form>
            ) : (
              <button
                type="button"
                onClick={() => setSearchOpen(true)}
                className="p-2 text-text-main hover:text-primary transition-colors cursor-pointer"
                aria-label="Open search"
                title="Search courses and lessons"
              >
                <Search className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Theme Mode Switcher */}
          <ThemeToggle className="hidden sm:inline-flex" />
          <ThemeToggle compact className="sm:hidden" />

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="md:hidden p-2 text-text-main hover:text-primary cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-surface px-4 py-4 space-y-3 shadow-card animate-fadeIn">
          {/* Mobile Theme Switcher Bar */}
          <div className="flex items-center justify-between p-2 rounded-xl bg-subtle border border-border">
            <span className="text-xs font-semibold text-text-main">Appearance Mode:</span>
            <ThemeToggle />
          </div>

          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-semibold text-text-main hover:text-primary"
          >
            Home
          </Link>
          <Link
            to="/progress"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm text-text-main hover:text-primary"
          >
            Verify
          </Link>
          <Link
            to="/about"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm text-text-main hover:text-primary"
          >
            About Us
          </Link>
          <Link
            to="/accessibility"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm text-text-main hover:text-primary"
          >
            Contact Us
          </Link>

          <div className="pt-2 border-t border-border space-y-1">
            <span className="text-xs font-semibold text-text-muted uppercase tracking-wider block mb-2">
              Active Courses
            </span>
            <Link
              to="/learn"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 py-1.5 text-sm text-text-main hover:text-primary font-medium"
            >
              <SqlLogo className="w-4 h-4 rounded-xs" />
              <span>SQL &amp; Relational Databases</span>
            </Link>
            <Link
              to="/learn/python"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 py-1.5 text-sm text-text-main hover:text-primary font-medium"
            >
              <PythonLogo className="w-4 h-4" />
              <span>Python Programming</span>
            </Link>
            <Link
              to="/learn/html"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 py-1.5 text-sm text-text-main hover:text-primary font-medium"
            >
              <HtmlLogo className="w-4 h-4" />
              <span>HTML5 Web Architecture</span>
            </Link>
            <Link
              to="/learn/css"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 py-1.5 text-sm text-text-main hover:text-primary font-medium"
            >
              <CssLogo className="w-4 h-4" />
              <span>CSS3 Responsive Design</span>
            </Link>
            <Link
              to="/learn/javascript"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 py-1.5 text-sm text-text-main hover:text-primary font-medium"
            >
              <JavaScriptLogo className="w-4 h-4 rounded-xs" />
              <span>Modern JavaScript</span>
            </Link>
            <Link
              to="/learn/datascience"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 py-1.5 text-sm text-text-main hover:text-primary font-medium"
            >
              <PandasLogo className="w-4 h-4 rounded-xs" />
              <span>Data Science &amp; ML</span>
            </Link>
          </div>

          <div className="pt-2 border-t border-border">
            <span className="text-xs font-semibold text-text-muted uppercase tracking-wider block mb-2">
              Quizzes &amp; Tests
            </span>
            <Link
              to="/quizzes"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 py-1.5 text-sm text-text-main hover:text-primary"
            >
              <CheckSquare className="w-4 h-4 text-secondary" />
              <span>Foundation Review Test</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
