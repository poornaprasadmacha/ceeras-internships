import React, { HTMLAttributes } from 'react';
import { cn } from '../../lib/utils';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'subtle' | 'bordered';
}

export function Card({ className, variant = 'default', children, ...props }: CardProps) {
  const variants = {
    default: 'bg-surface border border-border shadow-subtle',
    subtle: 'bg-subtle border border-border/70',
    bordered: 'bg-transparent border border-border',
  };

  return (
    <div className={cn('rounded-lg p-5', variants[variant], className)} {...props}>
      {children}
    </div>
  );
}
