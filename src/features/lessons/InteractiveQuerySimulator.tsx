import React, { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { DatasetDefinition } from '../../types/lesson';
import { Eye, Check, SlidersHorizontal, Table } from 'lucide-react';
import { cn } from '../../lib/utils';

export interface InteractiveQuerySimulatorProps {
  dataset: DatasetDefinition;
}

export function InteractiveQuerySimulator({ dataset }: InteractiveQuerySimulatorProps) {
  const [selectedColumns, setSelectedColumns] = useState<string[]>([
    dataset.sampleColumns[1] || dataset.sampleColumns[0],
  ]);

  const toggleColumn = (col: string) => {
    if (selectedColumns.includes(col)) {
      if (selectedColumns.length > 1) {
        setSelectedColumns(selectedColumns.filter((c) => c !== col));
      }
    } else {
      setSelectedColumns([...selectedColumns, col]);
    }
  };

  const handleSelectAll = () => {
    setSelectedColumns([...dataset.sampleColumns]);
  };

  const isAllSelected = selectedColumns.length === dataset.sampleColumns.length;

  const generatedSql = isAllSelected
    ? `SELECT *\nFROM ${dataset.tableName};`
    : `SELECT ${selectedColumns.join(', ')}\nFROM ${dataset.tableName};`;

  // Filter sample rows by selected columns
  const colIndices = selectedColumns.map((col) => dataset.sampleColumns.indexOf(col));
  const filteredRows = dataset.sampleRows.map((row) =>
    colIndices.map((idx) => (idx !== -1 ? row[idx] : null))
  );

  return (
    <Card className="p-4 sm:p-5 border-border shadow-subtle space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border pb-3">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-primary" />
          <h3 className="text-sm font-bold text-text-main">
            Interactive Query Simulator (Live Output Preview)
          </h3>
        </div>
        <Badge variant="accent" size="sm">
          Hands-On Visualizer
        </Badge>
      </div>

      <p className="text-xs text-text-muted">
        Toggle columns below to observe how the SELECT statement dynamically reshapes the returned table:
      </p>

      {/* Column Checkbox Chips */}
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={handleSelectAll}
          className={cn(
            'px-2.5 py-1.5 rounded-md text-xs font-mono font-bold border transition-colors cursor-pointer flex items-center gap-1.5',
            isAllSelected
              ? 'bg-primary text-white border-primary shadow-2xs'
              : 'bg-subtle text-text-main border-border hover:bg-border'
          )}
        >
          <Check className="w-3.5 h-3.5" />
          <span>* (All Columns)</span>
        </button>

        {dataset.sampleColumns.map((col) => {
          const isChecked = selectedColumns.includes(col);
          return (
            <button
              key={col}
              type="button"
              onClick={() => toggleColumn(col)}
              className={cn(
                'px-2.5 py-1.5 rounded-md text-xs font-mono font-medium border transition-colors cursor-pointer flex items-center gap-1.5',
                isChecked && !isAllSelected
                  ? 'bg-secondary/20 text-primary border-secondary font-semibold'
                  : isChecked && isAllSelected
                  ? 'bg-primary/10 text-primary border-primary/30 font-medium'
                  : 'bg-surface text-text-muted border-border hover:bg-subtle'
              )}
            >
              <span
                className={cn(
                  'w-3.5 h-3.5 rounded border flex items-center justify-center text-[10px]',
                  isChecked ? 'bg-primary text-white border-primary' : 'border-border'
                )}
              >
                {isChecked && <Check className="w-2.5 h-2.5 stroke-[3]" />}
              </span>
              <span>{col}</span>
            </button>
          );
        })}
      </div>

      {/* Live Generated SQL Box */}
      <div className="space-y-1">
        <span className="text-[11px] font-semibold text-text-muted block">
          Generated SQL Statement:
        </span>
        <pre className="p-3 bg-editor-bg border border-border rounded-md font-mono text-xs text-editor-text whitespace-pre-wrap">
          {generatedSql}
        </pre>
      </div>

      {/* Live Preview Table */}
      <div className="space-y-1 pt-1">
        <div className="flex items-center justify-between text-xs text-text-muted">
          <span className="font-medium">
            Live Preview Output ({selectedColumns.length} columns, {filteredRows.length} rows)
          </span>
        </div>

        <div className="border border-border rounded-lg overflow-x-auto bg-surface max-h-56 overflow-y-auto">
          <table className="w-full text-left border-collapse text-xs font-mono">
            <thead>
              <tr className="bg-subtle border-b border-border text-text-main sticky top-0 z-10">
                <th className="py-2 px-3 border-r border-border text-center w-10 text-text-muted">
                  #
                </th>
                {selectedColumns.map((col) => (
                  <th key={col} className="py-2 px-3 font-semibold border-r border-border last:border-r-0">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {filteredRows.map((row, rIdx) => (
                <tr key={rIdx} className="hover:bg-subtle/30 font-mono">
                  <td className="py-2 px-3 text-center text-text-muted bg-subtle/20 border-r border-border">
                    {rIdx + 1}
                  </td>
                  {row.map((cell, cIdx) => (
                    <td
                      key={cIdx}
                      className={cn(
                        'py-2 px-3 border-r border-border/60 last:border-r-0 whitespace-nowrap',
                        typeof cell === 'number' ? 'text-right' : 'text-left'
                      )}
                    >
                      {String(cell)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Card>
  );
}
