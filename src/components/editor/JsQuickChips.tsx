import React from 'react';
import { Terminal } from 'lucide-react';

export interface JsQuickChipsProps {
  onInsert: (snippet: string) => void;
  customChips?: string[];
}

export function JsQuickChips({ onInsert, customChips = [] }: JsQuickChipsProps) {
  const defaultChips = [
    'console.log()',
    'const ',
    'let ',
    '===',
    'function ',
    '() => {}',
    'return ',
    'if () {}',
    'for () {}',
    '.map()',
    '.filter()',
    'async ',
    'await ',
    'try {} catch {}',
    '[]',
    '{}',
    'f`{}`',
  ];

  const allChips = Array.from(new Set([...customChips, ...defaultChips]));

  return (
    <div className="bg-subtle/70 border border-border rounded-t-md p-2 space-y-1.5">
      <div className="flex items-center justify-between text-[11px] font-semibold text-text-muted px-0.5">
        <span className="flex items-center gap-1.5 text-amber-600 dark:text-amber-400">
          <Terminal className="w-3.5 h-3.5" />
          <span>Quick JavaScript Syntax</span>
        </span>
      </div>

      <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto py-0.5 scrollbar-thin">
        {allChips.map((chip) => (
          <button
            key={chip}
            type="button"
            onClick={() => onInsert(chip)}
            className="px-2.5 py-1 text-xs font-mono font-bold bg-surface border border-border text-amber-700 dark:text-amber-300 hover:bg-amber-400 hover:text-black rounded-md transition-all cursor-pointer active:scale-95 shadow-2xs"
            title={`Insert ${chip}`}
          >
            {chip}
          </button>
        ))}
      </div>
    </div>
  );
}
