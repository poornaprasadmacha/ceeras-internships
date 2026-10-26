import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, BookOpen, WifiOff, Wifi } from 'lucide-react';
import { useOnlineStatus } from '../../hooks/useOnlineStatus';
import { ThemeToggle } from '../ui/ThemeToggle';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { useScrollDirection } from '../../hooks/useScrollDirection';
import { cn } from '../../lib/utils';

export interface HeaderProps {
  onToggleSidebar: () => void;
  onToggleRightPanel?: () => void;
  showRightPanelToggle?: boolean;
  rightPanelOpen?: boolean;
}

export function Header({
  onToggleSidebar,
  onToggleRightPanel,
  showRightPanelToggle,
  rightPanelOpen,
}: HeaderProps) {
  const isOnline = useOnlineStatus();
  const isVisible = useScrollDirection();

  return (
    <header
      className={cn(
        'h-14 border-b border-border bg-surface px-4 flex items-center justify-between sticky top-0 z-30 transition-all duration-300 ease-in-out',
        isVisible
          ? 'translate-y-0 opacity-100'
          : '-translate-y-full opacity-0 pointer-events-none'
      )}
    >
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggleSidebar}
          className="lg:hidden p-1.5"
          aria-label="Toggle navigation menu"
        >
          <Menu className="w-5 h-5 text-text-main" />
        </Button>

        <Link to="/" className="lg:hidden logo !text-2xl shrink-0" aria-label="Ceeras Home">
          CEERAS
        </Link>
      </div>

      <div className="flex items-center gap-3">
        {/* Offline / Online indicator */}
        {!isOnline ? (
          <Badge variant="warning" size="sm" className="hidden sm:inline-flex">
            <WifiOff className="w-3.5 h-3.5" />
            <span>Offline Mode</span>
          </Badge>
        ) : (
          <Badge variant="outline" size="sm" className="hidden md:inline-flex">
            <Wifi className="w-3.5 h-3.5 text-success" />
            <span>Ready</span>
          </Badge>
        )}

        {/* Theme Selector: Mode Switcher */}
        <ThemeToggle className="hidden sm:inline-flex" />
        <ThemeToggle compact className="sm:hidden" />

        {/* Companion panel toggle for lessons */}
        {showRightPanelToggle && onToggleRightPanel && (
          <Button
            variant="outline"
            size="sm"
            onClick={onToggleRightPanel}
            className="hidden lg:inline-flex text-xs"
            aria-label="Toggle learning companion panel"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>{rightPanelOpen ? 'Hide Guide' : 'Show Guide'}</span>
          </Button>
        )}
      </div>
    </header>
  );
}
