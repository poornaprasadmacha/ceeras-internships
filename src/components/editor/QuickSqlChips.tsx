import React from 'react';
import { Sparkles, Database, Columns, Code } from 'lucide-react';

export interface QuickSqlChipsProps {
  onInsert: (snippet: string) => void;
  availableColumns?: string[];
  tableName?: string;
  extraKeywords?: string[];
  allowedKeywords?: string[];
}

export function QuickSqlChips({
  onInsert,
  availableColumns = [],
  tableName,
  extraKeywords = [],
  allowedKeywords,
}: QuickSqlChipsProps) {
  // If specific allowedKeywords are provided, use only those; otherwise default cleanly
  const standardKeywords = [
    'SELECT',
    'FROM',
    '*',
    'WHERE',
    '=',
    'LIKE',
    'ORDER BY',
    'LIMIT',
  ];

  const effectiveKeywords = allowedKeywords && allowedKeywords.length > 0
    ? allowedKeywords
    : Array.from(new Set([...standardKeywords, ...extraKeywords]));

  return (
    <div className="bg-subtle/80 border border-border rounded-t-md p-2 space-y-2">
      <div className="flex items-center justify-between text-[11px] font-semibold text-text-muted px-0.5">
        <span className="flex items-center gap-1.5 text-primary">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Quick Code Chips</span>
        </span>
        <span className="text-[10px] text-text-muted">Tap to insert at cursor</span>
      </div>

      <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto py-0.5 scrollbar-thin">
        {/* Keywords */}
        {effectiveKeywords.map((kw) => (
          <button
            key={kw}
            type="button"
            onClick={() => onInsert(kw === ',' || kw === ';' ? `${kw} ` : `${kw} `)}
            className="min-h-[38px] px-3 py-1.5 text-xs font-mono font-bold bg-surface border border-border text-primary rounded-md hover:bg-primary hover:text-white transition-all cursor-pointer active:scale-95 shadow-2xs"
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
            className="min-h-[38px] flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-bold bg-secondary/10 border border-secondary/30 text-secondary rounded-md hover:bg-secondary hover:text-white transition-all cursor-pointer active:scale-95 shadow-2xs"
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
            className="min-h-[38px] flex items-center gap-1 px-2.5 py-1.5 text-xs font-mono bg-surface border border-border/80 text-text-main rounded-md hover:bg-primary/10 hover:border-primary/40 transition-all cursor-pointer active:scale-95 shadow-2xs"
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
