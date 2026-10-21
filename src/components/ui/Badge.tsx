import React, { HTMLAttributes } from 'react';
import { cn } from '../../lib/utils';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'success' | 'warning' | 'error' | 'outline' | 'accent';
  size?: 'sm' | 'md';
}

export function Badge({ className, variant = 'default', size = 'md', children, ...props }: BadgeProps) {
  const variants = {
    default: 'bg-subtle text-text-main border border-border',
    accent: 'bg-primary/10 text-primary border border-primary/20',
    success: 'bg-success-subtle text-success border border-success/30',
    warning: 'bg-warning-subtle text-warning border border-warning/30',
    error: 'bg-error-subtle text-error border border-error/30',
    outline: 'bg-transparent text-text-muted border border-border',
  };

  const sizes = {
    sm: 'text-[11px] px-2 py-0.5 rounded-sm font-medium',
    md: 'text-xs px-2.5 py-1 rounded-sm font-medium',
  };

  return (
    <span className={cn('inline-flex items-center gap-1.5', variants[variant], sizes[size], className)} {...props}>
      {children}
    </span>
  );
}
