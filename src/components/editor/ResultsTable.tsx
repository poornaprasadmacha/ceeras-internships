import React from 'react';
import { QueryResult } from '../../types/database';
import { Clock, Database, AlertCircle } from 'lucide-react';
import { cn } from '../../lib/utils';

export interface ResultsTableProps {
  result: QueryResult | null;
  isLoading?: boolean;
  className?: string;
}

export function ResultsTable({ result, isLoading, className }: ResultsTableProps) {
  if (isLoading) {
    return (
      <div
        className={cn(
          'w-full bg-surface border border-border rounded-lg p-8 flex flex-col items-center justify-center text-center text-text-muted gap-3 min-h-[160px]',
          className
        )}
      >
        <span className="inline-block w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        <span className="text-sm font-medium">Executing SQL query in local SQLite engine...</span>
      </div>
    );
  }

  if (!result) {
    return (
      <div
        className={cn(
          'w-full bg-subtle/50 border border-dashed border-border rounded-lg p-8 flex flex-col items-center justify-center text-center text-text-muted gap-2 min-h-[160px]',
          className
        )}
      >
        <Database className="w-6 h-6 text-text-muted/60" />
        <p className="text-sm font-medium">No query executed yet</p>
        <p className="text-xs text-text-muted/80">
          Write a SQL statement and click "Run Query" (or press Ctrl+Enter) to view output.
        </p>
      </div>
    );
  }

  if (result.error) {
    return (
      <div
        className={cn(
          'w-full bg-error-subtle border border-error/40 rounded-lg p-4 text-text-main flex items-start gap-3',
          className
        )}
      >
        <AlertCircle className="w-5 h-5 text-error shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="text-sm font-semibold text-error">Execution Error</p>
          <p className="text-xs font-mono text-text-main/90 whitespace-pre-wrap leading-relaxed">
            {result.error}
          </p>
        </div>
      </div>
    );
  }

  if (result.columns.length === 0) {
    return (
      <div
        className={cn(
          'w-full bg-surface border border-border rounded-lg p-6 text-center text-text-muted',
          className
        )}
      >
        <p className="text-sm">Query executed successfully, but returned 0 columns.</p>
        <p className="text-xs text-text-muted mt-1 font-mono">
          Duration: {result.executionTimeMs} ms
        </p>
      </div>
    );
  }

  return (
    <div className={cn('w-full space-y-2', className)}>
      {/* Execution meta bar */}
      <div className="flex items-center justify-between text-xs text-text-muted px-1">
        <span className="font-medium">
          Returned {result.rowCount} {result.rowCount === 1 ? 'row' : 'rows'} ({result.columns.length}{' '}
          {result.columns.length === 1 ? 'column' : 'columns'})
        </span>
        <div className="flex items-center gap-1.5 font-mono">
          <Clock className="w-3.5 h-3.5" />
          <span>{result.executionTimeMs} ms</span>
        </div>
      </div>

      {/* Grid container */}
      <div className="w-full border border-border rounded-lg overflow-x-auto bg-surface shadow-subtle max-h-80 overflow-y-auto">
        <table className="w-full text-left border-collapse text-sm">
          <thead>
            <tr className="bg-subtle border-b border-border text-xs font-semibold text-text-main sticky top-0 z-10">
              <th className="py-2 px-3 border-r border-border text-center w-10 text-text-muted font-mono">
                #
              </th>
              {result.columns.map((col, idx) => (
                <th
                  key={idx}
                  className="py-2.5 px-4 font-mono font-medium tracking-wide border-r border-border last:border-r-0"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border/60">
            {result.values.length === 0 ? (
              <tr>
                <td
                  colSpan={result.columns.length + 1}
                  className="py-6 text-center text-text-muted text-xs font-mono"
                >
                  (Empty result set)
                </td>
              </tr>
            ) : (
              result.values.map((row, rowIdx) => (
                <tr
                  key={rowIdx}
                  className="hover:bg-subtle/50 transition-colors font-mono text-xs text-text-main"
                >
                  <td className="py-2 px-3 text-center text-text-muted/60 bg-subtle/30 border-r border-border">
                    {rowIdx + 1}
                  </td>
                  {row.map((cell, cellIdx) => {
                    const isNum = typeof cell === 'number';
                    const isNull = cell === null || cell === undefined;
                    return (
                      <td
                        key={cellIdx}
                        className={cn(
                          'py-2.5 px-4 border-r border-border/60 last:border-r-0 whitespace-nowrap',
                          isNum ? 'text-right' : 'text-left',
                          isNull && 'text-text-muted italic'
                        )}
                      >
                        {isNull ? 'NULL' : String(cell)}
                      </td>
                    );
                  })}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
