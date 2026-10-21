import React, { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Table, Columns, Rows, MousePointerClick, Info } from 'lucide-react';
import { cn } from '../../lib/utils';

export interface InteractiveTableVisualizerProps {
  tableName: string;
  columns: string[];
  rows: (string | number | null)[][];
  description?: string;
}

export function InteractiveTableVisualizer({
  tableName,
  columns,
  rows,
  description,
}: InteractiveTableVisualizerProps) {
  const [highlightMode, setHighlightMode] = useState<'none' | 'columns' | 'rows' | 'single-col'>('none');
  const [selectedColIndex, setSelectedColIndex] = useState<number | null>(null);
  const [selectedRowIndex, setSelectedRowIndex] = useState<number | null>(null);

  const handleSelectCol = (idx: number) => {
    setSelectedColIndex(idx);
    setSelectedRowIndex(null);
    setHighlightMode('single-col');
  };

  const handleSelectRow = (idx: number) => {
    setSelectedRowIndex(idx);
    setSelectedColIndex(null);
    setHighlightMode('rows');
  };

  return (
    <Card className="p-4 sm:p-5 border-border shadow-subtle space-y-4">
      {/* Header with Mode Toggles */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border pb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-md bg-primary/10 text-primary flex items-center justify-center shrink-0">
            <Table className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-text-main font-mono">
                {tableName}
              </h3>
              <Badge variant="accent" size="sm">
                Interactive Inspector
              </Badge>
            </div>
            {description && (
              <p className="text-xs text-text-muted mt-0.5">{description}</p>
            )}
          </div>
        </div>

        {/* Visual Inspection Toggles */}
        <div className="flex items-center gap-1.5 self-start sm:self-auto flex-wrap">
          <span className="text-[11px] text-text-muted font-medium mr-1">Highlight:</span>
          <button
            type="button"
            onClick={() => {
              setHighlightMode(highlightMode === 'columns' ? 'none' : 'columns');
              setSelectedColIndex(null);
              setSelectedRowIndex(null);
            }}
            className={cn(
              'px-2.5 py-1 rounded text-xs font-medium border transition-all cursor-pointer flex items-center gap-1',
              highlightMode === 'columns'
                ? 'bg-primary text-white border-primary shadow-2xs font-semibold'
                : 'bg-subtle text-text-main border-border hover:bg-border'
            )}
          >
            <Columns className="w-3.5 h-3.5" />
            <span>All Columns</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setHighlightMode(highlightMode === 'rows' ? 'none' : 'rows');
              setSelectedColIndex(null);
              setSelectedRowIndex(null);
            }}
            className={cn(
              'px-2.5 py-1 rounded text-xs font-medium border transition-all cursor-pointer flex items-center gap-1',
              highlightMode === 'rows' && selectedRowIndex === null
                ? 'bg-secondary text-white border-secondary shadow-2xs font-semibold'
                : 'bg-subtle text-text-main border-border hover:bg-border'
            )}
          >
            <Rows className="w-3.5 h-3.5" />
            <span>All Rows</span>
          </button>
        </div>
      </div>

      {/* Interactive Helper Banner */}
      <div className="p-2.5 bg-subtle/70 rounded-md border border-border/80 text-xs text-text-muted flex items-start sm:items-center gap-2">
        <MousePointerClick className="w-4 h-4 text-primary shrink-0 mt-0.5 sm:mt-0" />
        <span className="leading-snug">
          {highlightMode === 'single-col' && selectedColIndex !== null
            ? `Highlighting Column: "${columns[selectedColIndex]}" (Vertical attribute across all rows)`
            : highlightMode === 'rows' && selectedRowIndex !== null
            ? `Highlighting Row #${selectedRowIndex + 1} (Horizontal record of one individual entity)`
            : highlightMode === 'columns'
            ? 'Columns represent vertical attributes (data fields) that share the same type.'
            : highlightMode === 'rows'
            ? 'Rows represent horizontal tuples/records. Each row is one individual item.'
            : 'Tap any column header to highlight vertical data, or tap any row number to highlight that entity.'}
        </span>
      </div>

      {/* Interactive Table */}
      <div className="border border-border rounded-lg overflow-x-auto bg-surface max-h-72 overflow-y-auto">
        <table className="w-full text-left border-collapse text-xs font-mono">
          <thead>
            <tr className="bg-subtle border-b border-border text-text-main sticky top-0 z-10">
              <th className="py-2.5 px-3 border-r border-border text-center w-12 text-text-muted font-mono select-none">
                Row
              </th>
              {columns.map((col, idx) => {
                const isColActive =
                  highlightMode === 'columns' ||
                  (highlightMode === 'single-col' && selectedColIndex === idx);

                return (
                  <th
                    key={col}
                    onClick={() => handleSelectCol(idx)}
                    className={cn(
                      'py-2.5 px-4 font-semibold border-r border-border last:border-r-0 cursor-pointer select-none transition-colors tracking-wide',
                      isColActive
                        ? 'bg-primary/15 text-primary border-b-2 border-b-primary font-bold'
                        : 'hover:bg-subtle/80 hover:text-primary'
                    )}
                    title="Click to highlight this vertical column"
                  >
                    <div className="flex items-center justify-between gap-1">
                      <span>{col}</span>
                      <Columns className="w-3 h-3 opacity-40 shrink-0" />
                    </div>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody className="divide-y divide-border/60">
            {rows.map((row, rIdx) => {
              const isRowActive =
                (highlightMode === 'rows' && selectedRowIndex === null) ||
                (highlightMode === 'rows' && selectedRowIndex === rIdx);

              return (
                <tr
                  key={rIdx}
                  className={cn(
                    'transition-colors font-mono',
                    isRowActive ? 'bg-secondary/15 font-medium' : 'hover:bg-subtle/40'
                  )}
                >
                  <td
                    onClick={() => handleSelectRow(rIdx)}
                    className={cn(
                      'py-2.5 px-3 text-center border-r border-border cursor-pointer select-none',
                      isRowActive
                        ? 'bg-secondary/30 text-text-main font-bold'
                        : 'bg-subtle/40 text-text-muted hover:bg-border/60'
                    )}
                    title="Click to highlight this row"
                  >
                    #{rIdx + 1}
                  </td>
                  {row.map((cell, cIdx) => {
                    const isCellColActive =
                      highlightMode === 'columns' ||
                      (highlightMode === 'single-col' && selectedColIndex === cIdx);

                    return (
                      <td
                        key={cIdx}
                        className={cn(
                          'py-2.5 px-4 border-r border-border/60 last:border-r-0 whitespace-nowrap',
                          typeof cell === 'number' ? 'text-right' : 'text-left',
                          isCellColActive && 'bg-primary/10 text-primary font-medium',
                          isRowActive && !isCellColActive && 'bg-secondary/10'
                        )}
                      >
                        {String(cell)}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
