import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  BookOpen,
  Terminal,
  CheckSquare,
  BarChart2,
  Bookmark,
  FileText,
  Settings,
  Database,
  GraduationCap,
  X,
} from 'lucide-react';
import { APP_NAME, APP_TAGLINE } from '../../lib/constants';
import { useProgress } from '../../hooks/useProgress';
import { ProgressBar } from '../ui/ProgressBar';
import { cn } from '../../lib/utils';

export interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const { stats } = useProgress();

  const navigation = [
    { to: '/', label: 'Learning Home', icon: LayoutDashboard },
    { to: '/learn', label: 'Course Lessons', icon: BookOpen },
    { to: '/practice', label: 'Practice Playground', icon: Terminal },
    { to: '/quizzes', label: 'Quizzes & Tests', icon: CheckSquare },
    { to: '/progress', label: 'Progress & Stats', icon: BarChart2 },
    { to: '/bookmarks', label: 'Bookmarks', icon: Bookmark },
    { to: '/notes', label: 'Notes', icon: FileText },
    { to: '/settings', label: 'Settings', icon: Settings },
  ];

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
          <NavLink to="/" onClick={onClose} className="flex items-center gap-2 group">
            <span className="font-raleway font-extrabold text-xl tracking-widest text-[#0E5E77] group-hover:text-primary transition-colors">
              CEERAS
            </span>
          </NavLink>

          <button
            onClick={onClose}
            className="lg:hidden p-1 text-text-muted hover:text-text-main cursor-pointer"
            aria-label="Close navigation"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation list */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
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
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* Progress summary widget */}
        <div className="p-4 border-t border-border bg-subtle/40 space-y-2 shrink-0">
          <div className="flex items-center justify-between text-xs font-semibold text-text-main">
            <span>Course Progress</span>
            <span className="font-mono text-primary">{stats.coursePercentage}%</span>
          </div>

          <ProgressBar value={stats.coursePercentage} showPercentage={false} size="sm" />

          <div className="flex items-center justify-between text-[11px] text-text-muted pt-1">
            <span>{stats.completedLessons} of {stats.totalLessons} lessons</span>
            <span>{stats.solvedExercises} of {stats.totalExercises} tasks</span>
          </div>
        </div>
      </aside>
    </>
  );
}
