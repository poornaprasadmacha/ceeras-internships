import React, { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Info, Sparkles, HelpCircle } from 'lucide-react';
import { cn } from '../../lib/utils';

export interface SqlSyntaxBreakdownProps {
  query?: string;
  tableName?: string;
}

export function SqlSyntaxBreakdown({
  tableName = 'CourseCatalog',
}: SqlSyntaxBreakdownProps) {
  const [selectedPart, setSelectedPart] = useState<'select' | 'columns' | 'from' | 'table' | 'semicolon'>('select');

  const parts = {
    select: {
      keyword: 'SELECT',
      role: 'Action Keyword',
      color: 'bg-primary/10 text-primary border-primary/30 hover:bg-primary/20',
      description: 'Instructs the database engine WHICH attributes or calculated columns you want to view in your output.',
      tip: 'Conventionally written in UPPERCASE. Case-insensitive in SQL engines.',
    },
    columns: {
      keyword: 'course_name, instructor',
      role: 'Target Columns (Shape)',
      color: 'bg-secondary/15 text-text-main border-secondary/40 hover:bg-secondary/25',
      description: 'The comma-separated attributes to return. The order here determines the left-to-right order of the output grid.',
      tip: 'Use an asterisk (*) as a wildcard shorthand if you want every column.',
    },
    from: {
      keyword: 'FROM',
      role: 'Source Clause',
      color: 'bg-primary/10 text-primary border-primary/30 hover:bg-primary/20',
      description: 'Designates the data source or relational table where the records are physically stored.',
      tip: 'Never place a trailing comma between the last column and the FROM keyword.',
    },
    table: {
      keyword: tableName,
      role: 'Target Table Name',
      color: 'bg-warning/15 text-text-main border-warning/40 hover:bg-warning/25',
      description: `The exact name of the relational table inside the database schema (in this case, ${tableName}).`,
      tip: 'Double-check spelling; a typo like extra "s" produces "no such table".',
    },
    semicolon: {
      keyword: ';',
      role: 'Statement Terminator',
      color: 'bg-subtle text-text-muted border-border hover:bg-border/60',
      description: 'Standard ANSI/ISO SQL statement terminator. Tells the query parser the instruction is complete.',
      tip: 'Essential in scripts containing multiple queries.',
    },
  };

  const active = parts[selectedPart];

  return (
    <Card className="p-4 sm:p-5 border-border shadow-subtle space-y-4">
      <div className="flex items-center justify-between border-b border-border pb-3">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-primary" />
          <h3 className="text-sm font-bold text-text-main">
            Interactive SQL Anatomy (Tap Any Block)
          </h3>
        </div>
        <Badge variant="outline" size="sm">
          Syntax Breakdown
        </Badge>
      </div>

      {/* Visual Block Builder */}
      <div className="flex flex-wrap items-center gap-2 font-mono text-xs sm:text-sm p-3 bg-editor-bg rounded-lg border border-border select-none">
        <button
          type="button"
          onClick={() => setSelectedPart('select')}
          className={cn(
            'px-2.5 py-1.5 rounded font-bold border transition-all cursor-pointer',
            parts.select.color,
            selectedPart === 'select' && 'ring-2 ring-primary scale-105'
          )}
        >
          {parts.select.keyword}
        </button>

        <button
          type="button"
          onClick={() => setSelectedPart('columns')}
          className={cn(
            'px-2.5 py-1.5 rounded font-medium border transition-all cursor-pointer',
            parts.columns.color,
            selectedPart === 'columns' && 'ring-2 ring-secondary scale-105'
          )}
        >
          {parts.columns.keyword}
        </button>

        <button
          type="button"
          onClick={() => setSelectedPart('from')}
          className={cn(
            'px-2.5 py-1.5 rounded font-bold border transition-all cursor-pointer',
            parts.from.color,
            selectedPart === 'from' && 'ring-2 ring-primary scale-105'
          )}
        >
          {parts.from.keyword}
        </button>

        <button
          type="button"
          onClick={() => setSelectedPart('table')}
          className={cn(
            'px-2.5 py-1.5 rounded font-semibold border transition-all cursor-pointer',
            parts.table.color,
            selectedPart === 'table' && 'ring-2 ring-warning scale-105'
          )}
        >
          {parts.table.keyword}
        </button>

        <button
          type="button"
          onClick={() => setSelectedPart('semicolon')}
          className={cn(
            'px-2 py-1.5 rounded font-bold border transition-all cursor-pointer',
            parts.semicolon.color,
            selectedPart === 'semicolon' && 'ring-2 ring-primary scale-105'
          )}
        >
          {parts.semicolon.keyword}
        </button>
      </div>

      {/* Active Component Deep Dive */}
      <div className="p-3 bg-subtle/80 rounded-lg border border-border space-y-1.5 text-xs">
        <div className="flex items-center justify-between">
          <span className="font-bold text-text-main font-mono text-sm">
            {active.keyword}
          </span>
          <Badge variant="accent" size="sm">
            {active.role}
          </Badge>
        </div>
        <p className="text-text-main/90 leading-relaxed pt-0.5">
          {active.description}
        </p>
        <p className="text-text-muted text-[11px] pt-1 border-t border-border/50">
          <span className="font-semibold text-text-main">Tip: </span>
          {active.tip}
        </p>
      </div>
    </Card>
  );
}
