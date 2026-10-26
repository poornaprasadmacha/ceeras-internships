import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
import { cn } from '../../lib/utils';

export interface ThemeToggleProps {
  compact?: boolean;
  showLabels?: boolean;
  className?: string;
}

export function ThemeToggle({ compact = false, showLabels = false, className }: ThemeToggleProps) {
  const { theme, setTheme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  if (compact) {
    return (
      <button
        type="button"
        onClick={toggleTheme}
        aria-label={`Current theme: ${isDark ? 'Dark Mode' : 'Daylight Mode'}. Tap to switch`}
        title={`Current mode: ${isDark ? 'Dark Mode' : 'Daylight Mode'}. Tap to switch`}
        className={cn(
          'w-8 h-8 rounded-full flex items-center justify-center bg-subtle border border-border text-text-main hover:bg-border/60 transition-all active:scale-95 cursor-pointer shadow-subtle',
          className
        )}
      >
        {isDark ? (
          <Moon className="w-4 h-4 text-cyan-400" />
        ) : (
          <Sun className="w-4 h-4 text-amber-500" />
        )}
      </button>
    );
  }

  return (
    <div
      role="radiogroup"
      aria-label="Theme mode selector"
      className={cn(
        'inline-flex items-center p-0.5 rounded-full bg-subtle border border-border/80 shadow-subtle select-none',
        className
      )}
    >
      <button
        type="button"
        role="radio"
        aria-checked={!isDark}
        onClick={() => setTheme('light')}
        title="Daylight Mode: Pure clean white background"
        aria-label="Daylight mode"
        className={cn(
          'flex items-center justify-center rounded-full text-xs font-medium transition-all cursor-pointer',
          showLabels ? 'gap-1 px-2.5 py-1' : 'w-7 h-7',
          !isDark
            ? 'bg-surface text-primary shadow-xs font-bold scale-[1.05]'
            : 'text-text-muted hover:text-text-main hover:bg-surface/50'
        )}
      >
        <Sun className="w-3.5 h-3.5 text-amber-500" />
        {showLabels && <span>Daylight</span>}
      </button>

      <button
        type="button"
        role="radio"
        aria-checked={isDark}
        onClick={() => setTheme('dark')}
        title="Dark Mode: Deep slate navy background"
        aria-label="Dark mode"
        className={cn(
          'flex items-center justify-center rounded-full text-xs font-medium transition-all cursor-pointer',
          showLabels ? 'gap-1 px-2.5 py-1' : 'w-7 h-7',
          isDark
            ? 'bg-surface text-primary shadow-xs font-bold scale-[1.05]'
            : 'text-text-muted hover:text-text-main hover:bg-surface/50'
        )}
      >
        <Moon className="w-3.5 h-3.5 text-cyan-400" />
        {showLabels && <span>Dark</span>}
      </button>
    </div>
  );
}
