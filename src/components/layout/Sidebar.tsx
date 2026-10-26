import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  BookOpen,
  Terminal,
  CheckSquare,
  BarChart2,
  Bookmark,
  FileText,
  Settings,
  ChevronDown,
  ChevronRight,
  Layers,
  X,
} from 'lucide-react';
import { useProgress } from '../../hooks/useProgress';
import { useActiveCourse, CourseMeta } from '../../hooks/useActiveCourse';
import { ProgressBar } from '../ui/ProgressBar';
import { cn } from '../../lib/utils';

export interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const navigate = useNavigate();
  const { stats } = useProgress();
  const { activeCourse, allCourses, setActiveCourseId, getCourseProgress } = useActiveCourse();
  const [coursesExpanded, setCoursesExpanded] = useState(false);

  const currentProgress = getCourseProgress(activeCourse, stats);
  const ActiveLogo = activeCourse.logo;

  const navigation = [
    { to: '/', label: 'Learning Home', icon: LayoutDashboard },
    { to: activeCourse.lessonsPath, label: `${activeCourse.shortTitle} Lessons`, icon: BookOpen },
    { to: `/practice?course=${activeCourse.id}`, label: 'Practice Playground', icon: Terminal },
    { to: `/quizzes?course=${activeCourse.id}`, label: 'Quizzes & Tests', icon: CheckSquare },
    { to: `/progress?course=${activeCourse.id}`, label: 'Progress & Stats', icon: BarChart2 },
    { to: '/bookmarks', label: 'Bookmarks', icon: Bookmark },
    { to: '/notes', label: 'Notes', icon: FileText },
    { to: '/settings', label: 'Settings', icon: Settings },
  ];

  const handleSelectCourse = (course: CourseMeta) => {
    setActiveCourseId(course.id);
    navigate(course.lessonsPath);
    onClose();
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-xs lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar container */}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-40 w-64 bg-surface border-r border-border flex flex-col transition-transform duration-200 ease-in-out lg:translate-x-0 lg:sticky lg:top-0 lg:h-screen lg:self-start lg:shrink-0 lg:z-30',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Brand header */}
        <div className="h-14 p-4 border-b border-border flex items-center justify-between shrink-0">
          <NavLink to="/" onClick={onClose} className="logo !text-2xl shrink-0" aria-label="Ceeras Home">
            CEERAS
          </NavLink>

          <button
            onClick={onClose}
            className="lg:hidden p-1 text-text-muted hover:text-text-main cursor-pointer"
            aria-label="Close navigation"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Active Course Banner */}
        <div className="p-3 border-b border-border bg-subtle/50 shrink-0">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider">
              Current Course
            </span>
            <button
              type="button"
              onClick={() => setCoursesExpanded((prev) => !prev)}
              className="text-[11px] font-semibold text-primary hover:underline flex items-center gap-0.5 cursor-pointer"
            >
              <span>{coursesExpanded ? 'Hide' : 'Switch'}</span>
              <ChevronDown
                className={cn('w-3 h-3 transition-transform', coursesExpanded ? 'rotate-180' : '')}
              />
            </button>
          </div>

          <div
            onClick={() => setCoursesExpanded((prev) => !prev)}
            className="flex items-center gap-2.5 p-2 rounded-lg bg-surface border border-border/80 shadow-2xs hover:border-primary/50 transition-colors cursor-pointer"
          >
            <div className="w-7 h-7 rounded-md bg-subtle border border-border/60 flex items-center justify-center p-1 shrink-0">
              <ActiveLogo className="w-full h-full object-contain" />
            </div>
            <div className="min-w-0 flex-1">
              <span className="text-xs font-bold text-text-main block truncate">
                {activeCourse.shortTitle}
              </span>
              <span className="text-[10px] text-text-muted block truncate">
                {activeCourse.totalLessons} Lessons
              </span>
            </div>
          </div>
        </div>

        {/* Navigation list */}
        <nav className="flex-1 px-3 py-3 space-y-1 overflow-y-auto">
          {/* Main Contextual Nav Items */}
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={onClose}
                className={({ isActive }) =>
                  cn(
                    'flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer',
                    isActive
                      ? 'bg-subtle text-primary font-semibold border-l-2 border-primary -ml-[2px]'
                      : 'text-text-muted hover:text-text-main hover:bg-subtle/50'
                  )
                }
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span className="truncate">{item.label}</span>
              </NavLink>
            );
          })}

          {/* Curriculum Courses List (Collapsible / Switcher) */}
          <div className="pt-3 border-t border-border mt-3 space-y-1">
            <button
              type="button"
              onClick={() => setCoursesExpanded((prev) => !prev)}
              className="w-full flex items-center justify-between px-3 py-1.5 text-xs font-bold text-text-muted uppercase tracking-wider hover:text-text-main transition-colors cursor-pointer"
            >
              <span className="flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5" />
                <span>All Courses ({allCourses.length})</span>
              </span>
              <ChevronRight
                className={cn('w-3.5 h-3.5 transition-transform', coursesExpanded ? 'rotate-90' : '')}
              />
            </button>

            {coursesExpanded && (
              <div className="space-y-0.5 pt-1 max-h-56 overflow-y-auto scrollbar-thin">
                {allCourses.map((c) => {
                  const Logo = c.logo;
                  const isCurrent = c.id === activeCourse.id;
                  return (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => handleSelectCourse(c)}
                      className={cn(
                        'w-full flex items-center justify-between px-2.5 py-1.5 rounded-md text-xs transition-colors cursor-pointer text-left',
                        isCurrent
                          ? 'bg-primary/10 text-primary font-bold'
                          : 'text-text-muted hover:text-text-main hover:bg-subtle'
                      )}
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <div className="w-5 h-5 rounded bg-subtle border border-border/60 flex items-center justify-center p-0.5 shrink-0">
                          <Logo className="w-full h-full object-contain" />
                        </div>
                        <span className="truncate">{c.shortTitle}</span>
                      </div>
                      <span className="text-[10px] font-mono text-text-muted shrink-0 ml-1">
                        {c.totalLessons}L
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </nav>

        {/* Dynamic Course Progress summary widget */}
        <div className="p-4 border-t border-border bg-subtle/40 space-y-2 shrink-0">
          <div className="flex items-center justify-between text-xs font-semibold text-text-main">
            <span className="truncate">{activeCourse.shortTitle} Progress</span>
            <span className="font-mono text-primary">{currentProgress.percentage}%</span>
          </div>

          <ProgressBar value={currentProgress.percentage} showPercentage={false} size="sm" />

          <div className="flex items-center justify-between text-[11px] text-text-muted pt-1">
            <span>
              {currentProgress.completedLessons} of {currentProgress.totalLessons} lessons
            </span>
            {activeCourse.id === 'sql' ? (
              <span>{stats.solvedExercises} of {stats.totalExercises} tasks</span>
            ) : (
              <span>{currentProgress.percentage}% complete</span>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}
