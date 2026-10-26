import React from 'react';
import { Palette } from 'lucide-react';

export interface CssQuickChipsProps {
  onInsert: (snippet: string) => void;
  customChips?: string[];
}

export function CssQuickChips({ onInsert, customChips = [] }: CssQuickChipsProps) {
  const defaultChips = [
    'color: #0E5E77;',
    'background-color: #f1f5f9;',
    'padding: 16px;',
    'margin: 12px;',
    'border-radius: 8px;',
    'display: flex;',
    'justify-content: center;',
    'align-items: center;',
    'gap: 12px;',
    'display: grid;',
    'grid-template-columns: repeat(3, 1fr);',
    'box-shadow: 0 4px 6px rgba(0,0,0,0.1);',
    'transition: all 0.3s ease;',
    ':hover',
  ];

  const allChips = Array.from(new Set([...customChips, ...defaultChips]));

  return (
    <div className="bg-subtle/70 border border-border rounded-t-md p-2 space-y-1.5">
      <div className="flex items-center justify-between text-[11px] font-semibold text-text-muted px-0.5">
        <span className="flex items-center gap-1.5 text-[#1572B6]">
          <Palette className="w-3.5 h-3.5" />
          <span>Quick CSS Declarations</span>
        </span>
      </div>

      <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto py-0.5 scrollbar-thin">
        {allChips.map((chip) => (
          <button
            key={chip}
            type="button"
            onClick={() => onInsert(chip + '\n')}
            className="px-2.5 py-1 text-xs font-mono font-bold bg-surface border border-border text-[#1572B6] hover:bg-[#1572B6] hover:text-white rounded-md transition-all cursor-pointer active:scale-95 shadow-2xs"
            title={`Insert ${chip}`}
          >
            {chip}
          </button>
        ))}
      </div>
    </div>
  );
}
