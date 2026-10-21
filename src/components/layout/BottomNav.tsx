import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  BookOpen,
  Terminal,
  CheckSquare,
  Menu,
} from 'lucide-react';
import { cn } from '../../lib/utils';

export interface BottomNavProps {
  onOpenMenu: () => void;
}

export function BottomNav({ onOpenMenu }: BottomNavProps) {
  const items = [
    { to: '/', label: 'Home', icon: LayoutDashboard },
    { to: '/learn', label: 'Lessons', icon: BookOpen },
    { to: '/practice', label: 'Sandbox', icon: Terminal },
    { to: '/quizzes', label: 'Quizzes', icon: CheckSquare },
  ];

  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-surface/95 backdrop-blur-md border-t border-border flex items-center justify-around px-2 py-1.5 shadow-card"
      aria-label="Mobile Navigation Bar"
    >
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              cn(
                'flex flex-col items-center justify-center py-1 px-3 rounded-lg text-[10px] font-medium transition-colors cursor-pointer min-w-[56px]',
                isActive
                  ? 'text-primary font-bold bg-primary/10'
                  : 'text-text-muted hover:text-text-main'
              )
            }
          >
            <Icon className="w-5 h-5 mb-0.5" />
            <span>{item.label}</span>
          </NavLink>
        );
      })}

      <button
        type="button"
        onClick={onOpenMenu}
        className="flex flex-col items-center justify-center py-1 px-3 rounded-lg text-[10px] font-medium text-text-muted hover:text-text-main transition-colors cursor-pointer min-w-[56px]"
        aria-label="Open full menu"
      >
        <Menu className="w-5 h-5 mb-0.5" />
        <span>Menu</span>
      </button>
    </nav>
  );
}
