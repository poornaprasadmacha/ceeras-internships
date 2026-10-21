import React, { useState, useMemo } from 'react';
import { PandasTableData } from '../../types/pandasLesson';
import { Table, Search, ArrowUpDown, Download, Database, Layers } from 'lucide-react';

interface PandasTableProps {
  data?: PandasTableData;
  className?: string;
}

export function PandasTable({ data, className = '' }: PandasTableProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortCol, setSortCol] = useState<string | null>(null);
  const [sortAsc, setSortAsc] = useState(true);

  if (!data || !data.columns || data.columns.length === 0) {
    return (
      <div className={`p-8 text-center bg-subtle/30 rounded-xl border border-dashed border-border ${className}`}>
        <Table className="w-8 h-8 mx-auto text-text-muted/60 mb-2" />
        <p className="text-xs text-text-muted">No DataFrame to display. Run code that outputs or returns a DataFrame or Series.</p>
      </div>
    );
  }

  const columns = data.columns;
  const index = data.index || Array.from({ length: data.data.length }, (_, i) => i);
  const rows = data.data;

  // Filter rows by search term
  const filteredRows = useMemo(() => {
    let result = rows.map((r, i) => ({ row: r, idx: index[i] }));

    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      result = result.filter(({ row }) =>
        row.some((cell) => cell !== null && cell !== undefined && String(cell).toLowerCase().includes(q))
      );
    }

    if (sortCol) {
      const colIdx = columns.indexOf(sortCol);
      if (colIdx !== -1) {
        result.sort((a, b) => {
          const vA = a.row[colIdx];
          const vB = b.row[colIdx];
          if (vA === vB) return 0;
          if (vA === null || vA === undefined) return 1;
          if (vB === null || vB === undefined) return -1;
          if (typeof vA === 'number' && typeof vB === 'number') {
            return sortAsc ? vA - vB : vB - vA;
          }
          return sortAsc
            ? String(vA).localeCompare(String(vB))
            : String(vB).localeCompare(String(vA));
        });
      }
    }

    return result;
  }, [rows, index, columns, searchTerm, sortCol, sortAsc]);

  const handleSort = (col: string) => {
    if (sortCol === col) {
      setSortAsc(!sortAsc);
    } else {
      setSortCol(col);
      setSortAsc(true);
    }
  };

  const downloadCsv = () => {
    const header = ['index', ...columns].join(',');
    const csvRows = filteredRows.map(({ row, idx }) => [idx, ...row].join(','));
    const content = 'data:text/csv;charset=utf-8,' + encodeURIComponent([header, ...csvRows].join('\n'));
    const link = document.createElement('a');
    link.setAttribute('href', content);
    link.setAttribute('download', 'dataframe_export.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className={`flex flex-col bg-subtle/50 rounded-xl border border-border overflow-hidden shadow-xs ${className}`}>
      {/* Table Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 bg-surface/70 border-b border-border text-xs">
        <div className="flex items-center gap-2">
          <Database className="w-4 h-4 text-[#130754] dark:text-[#00D2FF]" />
          <span className="font-semibold text-text-main">{data.title || 'DataFrame'}</span>
          <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[11px] font-mono border border-primary/20">
            {data.shape[0]} rows × {data.shape[1]} cols
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Quick search */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-text-muted" />
            <input
              type="text"
              placeholder="Filter table..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8 pr-3 py-1 rounded-md text-xs bg-surface border border-border focus:outline-hidden focus:border-primary text-text-main w-36 sm:w-44"
            />
          </div>

          <button
            type="button"
            onClick={downloadCsv}
            title="Download CSV"
            className="p-1.5 rounded-md hover:bg-subtle text-text-muted hover:text-text-main transition-colors border border-border cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Table Content */}
      <div className="overflow-x-auto max-h-[360px] overflow-y-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-subtle border-b border-border sticky top-0 z-10">
              {/* Index Column Header */}
              <th className="py-2 px-3 text-[11px] font-mono font-medium text-text-muted uppercase tracking-wider bg-subtle/95 border-r border-border w-14 text-center">
                index
              </th>
              {columns.map((col) => {
                const dtype = data.dtypes ? data.dtypes[col] : 'object';
                const isSorted = sortCol === col;
                return (
                  <th
                    key={col}
                    onClick={() => handleSort(col)}
                    className="py-2 px-3 text-[11px] font-mono font-semibold text-text-main hover:bg-subtle/80 cursor-pointer select-none transition-colors border-r border-border/60 last:border-r-0"
                  >
                    <div className="flex items-center justify-between gap-1.5">
                      <span>{col}</span>
                      <div className="flex items-center gap-1">
                        <span className="text-[9px] font-mono text-text-muted/80 uppercase font-normal">
                          {dtype}
                        </span>
                        <ArrowUpDown
                          className={`w-3 h-3 ${isSorted ? 'text-primary' : 'text-text-muted/40'}`}
                        />
                      </div>
                    </div>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody className="divide-y divide-border/60 font-mono text-[11px]">
            {filteredRows.length === 0 ? (
              <tr>
                <td colSpan={columns.length + 1} className="py-6 text-center text-text-muted">
                  No matching rows found
                </td>
              </tr>
            ) : (
              filteredRows.map(({ row, idx }, rIdx) => (
                <tr
                  key={rIdx}
                  className="hover:bg-primary/5 transition-colors group"
                >
                  <td className="py-1.5 px-3 bg-subtle/30 text-text-muted font-medium text-center border-r border-border select-none">
                    {String(idx)}
                  </td>
                  {row.map((cell, cIdx) => {
                    const isNull = cell === null || cell === undefined || Number.isNaN(cell);
                    return (
                      <td
                        key={cIdx}
                        className="py-1.5 px-3 text-text-main border-r border-border/40 last:border-r-0 whitespace-nowrap"
                      >
                        {isNull ? (
                          <span className="px-1.5 py-0.5 rounded text-[10px] bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold border border-amber-500/20">
                            NaN
                          </span>
                        ) : typeof cell === 'boolean' ? (
                          <span className={cell ? 'text-emerald-600 dark:text-emerald-400 font-semibold' : 'text-rose-600 dark:text-rose-400 font-semibold'}>
                            {String(cell)}
                          </span>
                        ) : typeof cell === 'number' ? (
                          <span className="text-blue-600 dark:text-blue-400 font-mono">
                            {Number.isInteger(cell) ? cell : cell.toFixed(2)}
                          </span>
                        ) : (
                          <span>{String(cell)}</span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Footer Info */}
      <div className="flex items-center justify-between px-4 py-2 bg-surface/50 border-t border-border text-[11px] text-text-muted">
        <div className="flex items-center gap-1.5">
          <Layers className="w-3.5 h-3.5" />
          <span>Showing {filteredRows.length} of {data.shape[0]} rows</span>
        </div>
        <div className="text-[10px] text-text-muted/80">
          Click headers to sort • Type in search to filter
        </div>
      </div>
    </div>
  );
}
