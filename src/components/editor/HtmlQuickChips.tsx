import React from 'react';
import { Sparkles, Code2 } from 'lucide-react';

export interface HtmlQuickChipsProps {
  onInsert: (snippet: string) => void;
  customChips?: string[];
}

export function HtmlQuickChips({ onInsert, customChips = [] }: HtmlQuickChipsProps) {
  const defaultChips = [
    '<h1></h1>',
    '<p></p>',
    '<a href=""></a>',
    '<img src="" alt="" />',
    '<ul></ul>',
    '<li></li>',
    '<button></button>',
    '<input type="text" />',
    '<form></form>',
    '<div></div>',
    '<strong></strong>',
    '<em></em>',
    '<table></table>',
    '<tr></tr>',
    '<td></td>',
    '<br />',
  ];

  const allChips = Array.from(new Set([...customChips, ...defaultChips]));

  return (
    <div className="bg-subtle/70 border border-border rounded-t-md p-2 space-y-1.5 select-none">
      <div className="flex items-center justify-between text-[11px] font-semibold text-text-muted px-0.5">
        <span className="flex items-center gap-1.5 text-[#E44D26]">
          <Code2 className="w-3.5 h-3.5" />
          <span>Quick HTML Tags (Tap to Insert)</span>
        </span>
        <span className="text-[10px] hidden sm:inline text-text-muted">
          Click any tag to insert into editor
        </span>
      </div>

      <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto py-0.5 scrollbar-thin">
        {allChips.map((chip) => (
          <button
            key={chip}
            type="button"
            onClick={() => onInsert(chip)}
            className="px-2.5 py-1 text-xs font-mono font-bold bg-surface border border-border text-[#E44D26] hover:bg-[#E44D26] hover:text-white rounded-md transition-all cursor-pointer active:scale-95 shadow-2xs"
            title={`Insert ${chip}`}
          >
            {chip}
          </button>
        ))}
      </div>
    </div>
  );
}
