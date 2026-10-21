import React from 'react';
import { Sun, Moon, BookOpen } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
import { THEMES, ThemeName } from '../../lib/constants';
import { cn } from '../../lib/utils';

export interface ThemeToggleProps {
  compact?: boolean;
  showLabels?: boolean;
  className?: string;
}

export function ThemeToggle({ compact = false, showLabels = false, className }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme();

  const themeIcons: Record<ThemeName, React.ReactNode> = {
    'soft-light': <Sun className="w-3.5 h-3.5 text-amber-500" />,
    'warm-paper': <BookOpen className="w-3.5 h-3.5 text-amber-700" />,
    'soft-dark': <Moon className="w-3.5 h-3.5 text-cyan-400" />,
  };

  const themeShortLabels: Record<ThemeName, string> = {
    'soft-light': 'Light',
    'warm-paper': 'Paper',
    'soft-dark': 'Dark',
  };

  // Quick 1-tap cycle for compact / mobile buttons
  const cycleNextTheme = () => {
    const ids: ThemeName[] = ['soft-light', 'warm-paper', 'soft-dark'];
    const currentIndex = ids.indexOf(theme);
    const nextTheme = ids[(currentIndex + 1) % ids.length];
    setTheme(nextTheme);
  };

  if (compact) {
    return (
      <button
        type="button"
        onClick={cycleNextTheme}
        aria-label={`Current theme: ${theme}. Tap to switch mode`}
        title={`Current mode: ${theme}. Tap to switch`}
        className={cn(
          'w-8 h-8 rounded-full flex items-center justify-center bg-subtle border border-border text-text-main hover:bg-border/60 transition-all active:scale-95 cursor-pointer shadow-subtle',
          className
        )}
      >
        {themeIcons[theme]}
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
      {THEMES.map((t) => {
        const isSelected = theme === t.id;
        return (
          <button
            key={t.id}
            type="button"
            role="radio"
            aria-checked={isSelected}
            onClick={() => setTheme(t.id)}
            title={t.description}
            aria-label={`${t.label} mode`}
            className={cn(
              'flex items-center justify-center rounded-full text-xs font-medium transition-all cursor-pointer',
              showLabels ? 'gap-1 px-2.5 py-1' : 'w-7 h-7',
              isSelected
                ? 'bg-surface text-primary shadow-xs font-bold scale-[1.05]'
                : 'text-text-muted hover:text-text-main hover:bg-surface/50'
            )}
          >
            {themeIcons[t.id]}
            {showLabels && <span>{themeShortLabels[t.id]}</span>}
          </button>
        );
      })}
    </div>
  );
}
