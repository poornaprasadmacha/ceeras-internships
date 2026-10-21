import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(isoDateString?: string | null): string {
  if (!isoDateString) return 'Never';
  try {
    const d = new Date(isoDateString);
    return d.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  } catch {
    return 'Invalid date';
  }
}

export function formatDateTime(isoDateString?: string | null): string {
  if (!isoDateString) return 'Never';
  try {
    const d = new Date(isoDateString);
    return `${d.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })} at ${d.toLocaleTimeString(undefined, {
      hour: '2-digit',
      minute: '2-digit',
    })}`;
  } catch {
    return 'Invalid date';
  }
}
