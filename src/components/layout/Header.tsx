import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, BookOpen, WifiOff, Wifi } from 'lucide-react';
import { useOnlineStatus } from '../../hooks/useOnlineStatus';
import { ThemeToggle } from '../ui/ThemeToggle';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';

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

  return (
    <header className="h-14 border-b border-border bg-surface px-4 flex items-center justify-between sticky top-0 z-30">
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

        <Link to="/" className="lg:hidden flex items-center gap-2">
          <span className="font-raleway font-extrabold text-base tracking-widest text-[#0E5E77]">
            CEERAS
          </span>
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
