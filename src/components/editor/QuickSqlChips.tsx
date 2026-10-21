import React from 'react';
import { Sparkles, Database, Columns, Code } from 'lucide-react';

export interface QuickSqlChipsProps {
  onInsert: (snippet: string) => void;
  availableColumns?: string[];
  tableName?: string;
  extraKeywords?: string[];
}

export function QuickSqlChips({
  onInsert,
  availableColumns = [],
  tableName,
  extraKeywords = [],
}: QuickSqlChipsProps) {
  // Common beginner-friendly SQL keywords
  const standardKeywords = [
    'SELECT',
    'FROM',
    '*',
    'WHERE',
    '=',
    'LIKE',
    'ORDER BY',
    'LIMIT',
    ',',
  ];

  // Merge with any specific extra keywords, deduplicated
  const allKeywords = Array.from(new Set([...standardKeywords, ...extraKeywords]));

  return (
    <div className="bg-subtle/70 border border-border rounded-t-md p-2 space-y-2 select-none">
      <div className="flex items-center justify-between text-[11px] font-semibold text-text-muted px-0.5">
        <span className="flex items-center gap-1.5 text-primary">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Quick Code Chips (Click to Build Query)</span>
        </span>
        <span className="text-[10px] hidden sm:inline text-text-muted">
          Tap chips to add code
        </span>
      </div>

      <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto py-0.5 scrollbar-thin">
        {/* Keywords */}
        {allKeywords.map((kw) => (
          <button
            key={kw}
            type="button"
            onClick={() => onInsert(kw === ',' || kw === ';' ? `${kw} ` : `${kw} `)}
            className="px-2.5 py-1 text-xs font-mono font-bold bg-surface border border-border text-primary rounded-md hover:bg-primary hover:text-white transition-all cursor-pointer active:scale-95 shadow-2xs"
            title={`Insert keyword ${kw}`}
          >
            {kw}
          </button>
        ))}

        {/* Table Name Chip */}
        {tableName && (
          <button
            type="button"
            onClick={() => onInsert(`${tableName} `)}
            className="flex items-center gap-1 px-2.5 py-1 text-xs font-mono font-bold bg-secondary/10 border border-secondary/30 text-secondary rounded-md hover:bg-secondary hover:text-white transition-all cursor-pointer active:scale-95 shadow-2xs"
            title={`Insert table name ${tableName}`}
          >
            <Database className="w-3 h-3" />
            <span>{tableName}</span>
          </button>
        )}

        {/* Column Chips */}
        {availableColumns.map((col) => (
          <button
            key={col}
            type="button"
            onClick={() => onInsert(`${col} `)}
            className="flex items-center gap-1 px-2 py-1 text-xs font-mono bg-surface border border-border/80 text-text-main rounded-md hover:bg-primary/10 hover:border-primary/40 transition-all cursor-pointer active:scale-95 shadow-2xs"
            title={`Insert column ${col}`}
          >
            <Columns className="w-2.5 h-2.5 opacity-60" />
            <span>{col}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
