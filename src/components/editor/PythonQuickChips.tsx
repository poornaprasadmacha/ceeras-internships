import React from 'react';
import { Sparkles, Terminal } from 'lucide-react';

export interface PythonQuickChipsProps {
  onInsert: (snippet: string) => void;
  customChips?: string[];
}

export function PythonQuickChips({ onInsert, customChips = [] }: PythonQuickChipsProps) {
  const defaultChips = [
    'print()',
    'if ',
    'else:',
    'for ',
    'in ',
    'def ',
    'return ',
    'len()',
    'range()',
    'f"{}"',
    '[]',
    '{}',
    '==',
  ];

  const allChips = Array.from(new Set([...defaultChips, ...customChips]));

  return (
    <div className="bg-subtle/70 border border-border rounded-t-md p-2 space-y-1.5 select-none">
      <div className="flex items-center justify-between text-[11px] font-semibold text-text-muted px-0.5">
        <span className="flex items-center gap-1.5 text-primary">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Quick Python Chips</span>
        </span>
      </div>

      <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto py-0.5 scrollbar-thin">
        {allChips.map((chip) => (
          <button
            key={chip}
            type="button"
            onClick={() => onInsert(chip)}
            className="px-2.5 py-1 text-xs font-mono font-bold bg-surface border border-border text-primary rounded-md hover:bg-primary hover:text-white transition-all cursor-pointer active:scale-95 shadow-2xs"
            title={`Insert ${chip}`}
          >
            {chip}
          </button>
        ))}
      </div>
    </div>
  );
}
