import React from 'react';
import { cn } from '../../lib/utils';

export interface ProgressBarProps {
  value: number; // 0 to 100
  label?: string;
  showPercentage?: boolean;
  className?: string;
  size?: 'sm' | 'md';
}

export function ProgressBar({
  value,
  label,
  showPercentage = true,
  className,
  size = 'md',
}: ProgressBarProps) {
  const clampedValue = Math.min(100, Math.max(0, Math.round(value)));

  const heights = {
    sm: 'h-1.5',
    md: 'h-2.5',
  };

  return (
    <div className={cn('w-full', className)}>
      {(label || showPercentage) && (
        <div className="flex items-center justify-between text-xs font-medium text-text-muted mb-1.5">
          {label && <span>{label}</span>}
          {showPercentage && <span className="font-mono text-text-main">{clampedValue}%</span>}
        </div>
      )}
      <div
        className={cn('w-full bg-border/60 rounded-full overflow-hidden', heights[size])}
        role="progressbar"
        aria-valuenow={clampedValue}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className="bg-primary h-full transition-all duration-300 ease-out rounded-full"
          style={{ width: `${clampedValue}%` }}
        />
      </div>
    </div>
  );
}
