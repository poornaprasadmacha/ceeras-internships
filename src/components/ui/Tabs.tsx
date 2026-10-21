import React, { ReactNode } from 'react';
import { cn } from '../../lib/utils';

export interface TabItem {
  id: string;
  label: string;
  count?: number;
}

export interface TabsProps {
  tabs: TabItem[];
  activeTab: string;
  onChange: (tabId: string) => void;
  className?: string;
}

export function Tabs({ tabs, activeTab, onChange, className }: TabsProps) {
  return (
    <div
      role="tablist"
      className={cn('flex items-center gap-1 border-b border-border', className)}
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(tab.id)}
            className={cn(
              'px-4 py-2 text-sm font-medium border-b-2 -mb-px transition-colors cursor-pointer flex items-center gap-2',
              isActive
                ? 'border-primary text-primary font-semibold'
                : 'border-transparent text-text-muted hover:text-text-main hover:border-border'
            )}
          >
            {tab.label}
            {tab.count !== undefined && (
              <span
                className={cn(
                  'text-xs px-1.5 py-0.2 rounded-full font-mono',
                  isActive
                    ? 'bg-primary/10 text-primary'
                    : 'bg-border text-text-muted'
                )}
              >
                {tab.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
