import React, { useState, useEffect, useCallback } from 'react';
import { Database as SqliteDatabase } from 'sql.js';
import { DatasetDefinition } from '../../types/lesson';
import { QueryResult, VerificationResult } from '../../types/database';
import { createDatabaseFromDataset, executeQuery } from '../../database/sqlEngine';
import { verifyQueryResult } from '../../database/queryValidator';
import { SqlEditor } from '../../components/editor/SqlEditor';
import { QuickSqlChips } from '../../components/editor/QuickSqlChips';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Play, RotateCcw, Lightbulb, Eye, CheckCircle2, AlertCircle } from 'lucide-react';
import { cn } from '../../lib/utils';

export interface EmbeddedSqlEditorProps {
  id: string;
  initialQuery: string;
  solutionQuery: string;
  expectedColumns?: string[];
  requiresOrder?: boolean;
  dataset: DatasetDefinition;
  goalDescription?: string;
  hint?: string;
  explanation?: string;
  allowedKeywords?: string[];
  isSolved?: boolean;
  onSolve?: (query: string) => void;
  savedQuery?: string;
}

export function EmbeddedSqlEditor({
  id,
  initialQuery,
  solutionQuery,
  expectedColumns,
  requiresOrder = false,
  dataset,
  goalDescription,
  hint,
  explanation,
  allowedKeywords = ['SELECT', '*', 'FROM', ';'],
  isSolved = false,
  onSolve,
  savedQuery,
}: EmbeddedSqlEditorProps) {
  const [query, setQuery] = useState(savedQuery || initialQuery);
  const [dbInstance, setDbInstance] = useState<SqliteDatabase | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [queryResult, setQueryResult] = useState<QueryResult | null>(null);
  const [verification, setVerification] = useState<VerificationResult | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [showSolution, setShowSolution] = useState(false);

  // Initialize isolated SQLite database
  const initDb = useCallback(async () => {
    try {
      const db = await createDatabaseFromDataset(dataset);
      setDbInstance((prev) => {
        if (prev) prev.close();
        return db;
      });
    } catch (err: any) {
      console.error('Failed to init SQLite WASM:', err);
    }
  }, [dataset]);

  useEffect(() => {
    initDb();
    return () => {
      setDbInstance((prev) => {
        if (prev) prev.close();
        return null;
      });
    };
  }, [initDb]);

  useEffect(() => {
    setQuery(savedQuery || initialQuery);
    setQueryResult(null);
    setVerification(null);
    setShowHint(false);
    setShowSolution(false);
  }, [id, savedQuery, initialQuery]);

  const handleRunQuery = useCallback(async () => {
    if (!dbInstance) return;
    setIsRunning(true);
    setVerification(null);

    await new Promise((r) => setTimeout(r, 30));

    try {
      const actualResult = executeQuery(dbInstance, query, false);
      setQueryResult(actualResult);

      if (!actualResult.error) {
        const referenceResult = executeQuery(dbInstance, solutionQuery, false);
        const verifyStatus = verifyQueryResult(
          actualResult,
          referenceResult,
          expectedColumns,
          requiresOrder
        );
        setVerification(verifyStatus);

        if (verifyStatus.isCorrect && onSolve) {
          onSolve(query);
        }
      }
    } catch (err: any) {
      setQueryResult({
        columns: [],
        values: [],
        rowCount: 0,
        executionTimeMs: 0,
        error: err?.message || String(err),
      });
    } finally {
      setIsRunning(false);
    }
  }, [dbInstance, query, solutionQuery, expectedColumns, requiresOrder, onSolve]);

  const handleInsertSnippet = (snippet: string) => {
    setQuery((prev) => {
      if (!prev || prev.trim() === '') return snippet;
      if (/\s$/.test(prev)) return prev + snippet;
      return prev + ' ' + snippet;
    });
  };

  const handleReset = () => {
    setQuery(initialQuery);
    setQueryResult(null);
    setVerification(null);
    setShowHint(false);
    setShowSolution(false);
  };

  return (
    <div className="my-5 rounded-lg border border-gray-300 dark:border-[#283b4d] bg-white dark:bg-[#1b2a38] shadow-xs overflow-hidden">
      {/* Optional goal bar */}
      {goalDescription && (
        <div className="px-3.5 py-2.5 bg-gray-50 dark:bg-[#15202b] border-b border-gray-200 dark:border-[#283b4d] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2">
            <span className="font-bold text-gray-700 dark:text-gray-300">Practice Goal:</span>
            <span className="text-gray-900 dark:text-white font-medium">{goalDescription}</span>
          </div>
          {isSolved && (
            <Badge variant="success" size="sm" className="self-start sm:self-auto">
              Completed
            </Badge>
          )}
        </div>
      )}

      {/* Quick SQL code chips */}
      <QuickSqlChips
        onInsert={handleInsertSnippet}
        tableName={dataset.tableName}
        availableColumns={dataset.sampleColumns}
        allowedKeywords={allowedKeywords}
      />

      {/* Dark CodeMirror Editor */}
      <div className="p-2 bg-[#1e293b]">
        <SqlEditor
          value={query}
          onChange={setQuery}
          onRun={handleRunQuery}
          disabled={!dbInstance || isRunning}
          themeMode="dark"
          minHeight="110px"
          className="border-0 rounded"
        />
      </div>

      {/* Action Toolbar */}
      <div className="p-2.5 bg-gray-50 dark:bg-[#15202b] border-t border-gray-200 dark:border-[#283b4d] flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleRunQuery}
            disabled={!dbInstance || isRunning}
            className="px-4 py-2 bg-[#0066cc] hover:bg-[#0052a3] text-white rounded font-medium text-xs flex items-center gap-1.5 transition-colors cursor-pointer min-h-[38px] shadow-2xs disabled:opacity-50"
          >
            <Play className="w-3.5 h-3.5 fill-white" />
            <span>{isRunning ? 'Running...' : 'Run Query'}</span>
            <span className="text-[10px] opacity-75 hidden sm:inline ml-1 font-mono">
              (Ctrl+Enter)
            </span>
          </button>

          <button
            type="button"
            onClick={handleReset}
            className="px-3 py-2 bg-white dark:bg-[#1b2a38] hover:bg-gray-100 hover:dark:bg-[#223647] border border-gray-300 dark:border-[#283b4d] text-gray-700 dark:text-[#cbd5e1] rounded text-xs flex items-center gap-1 transition-colors cursor-pointer min-h-[38px]"
            title="Reset to starting query"
          >
            <RotateCcw className="w-3 h-3 text-gray-500 dark:text-gray-400" />
            <span>Reset</span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          {hint && (
            <button
              type="button"
              onClick={() => setShowHint((prev) => !prev)}
              className="px-2.5 py-1.5 text-xs text-amber-700 dark:text-amber-400 hover:text-amber-900 border border-amber-300 dark:border-amber-700 hover:bg-amber-50 hover:dark:bg-amber-950/40 rounded flex items-center gap-1 cursor-pointer transition-colors"
            >
              <Lightbulb className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
              <span>{showHint ? 'Hide Hint' : 'Hint'}</span>
            </button>
          )}

          {solutionQuery && (
            <button
              type="button"
              onClick={() => setShowSolution((prev) => !prev)}
              className="px-2.5 py-1.5 text-xs text-gray-600 dark:text-[#99aab8] hover:text-gray-900 hover:dark:text-white border border-gray-300 dark:border-[#283b4d] hover:bg-gray-100 hover:dark:bg-[#223647] rounded flex items-center gap-1 cursor-pointer transition-colors"
            >
              <Eye className="w-3.5 h-3.5 text-gray-500 dark:text-gray-400" />
              <span>{showSolution ? 'Hide Solution' : 'Solution'}</span>
            </button>
          )}
        </div>
      </div>

      {/* Hint Drawer */}
      {showHint && hint && (
        <div className="p-3 bg-amber-50 dark:bg-[#252824] border-t border-amber-200 dark:border-[#4d401a] text-xs text-amber-950 dark:text-amber-200 flex items-start gap-2 animate-fadeIn">
          <Lightbulb className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold block">Hint:</span>
            <p>{hint}</p>
          </div>
        </div>
      )}

      {/* Solution Drawer */}
      {showSolution && solutionQuery && (
        <div className="p-3 bg-gray-50 dark:bg-[#15202b] border-t border-gray-200 dark:border-[#283b4d] text-xs text-gray-900 dark:text-[#e2e8f0] space-y-1.5 animate-fadeIn">
          <div className="flex items-center justify-between">
            <span className="font-semibold">Reference Solution:</span>
            <button
              type="button"
              onClick={() => {
                setQuery(solutionQuery);
                setShowSolution(false);
              }}
              className="text-[#0066cc] dark:text-[#38bdf8] hover:underline font-semibold text-[11px]"
            >
              Copy to Editor
            </button>
          </div>
          <pre className="p-2 bg-[#1e293b] text-[#f8fafc] rounded font-mono text-xs overflow-x-auto border border-gray-700">
            {solutionQuery}
          </pre>
          {explanation && <p className="text-gray-600 dark:text-gray-400 text-[11px]">{explanation}</p>}
        </div>
      )}

      {/* Verification Feedback Banner */}
      {verification && (
        <div
          className={cn(
            'p-3 border-t text-xs flex items-start gap-2.5 animate-fadeIn',
            verification.isCorrect
              ? 'bg-green-50 dark:bg-[#132e22] border-green-200 dark:border-green-800 text-green-950 dark:text-green-300'
              : 'bg-amber-50 dark:bg-[#332612] border-amber-200 dark:border-amber-800 text-amber-950 dark:text-amber-300'
          )}
        >
          {verification.isCorrect ? (
            <CheckCircle2 className="w-4 h-4 text-green-600 dark:text-green-400 shrink-0 mt-0.5" />
          ) : (
            <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
          )}
          <div className="space-y-0.5">
            <p className="font-bold">
              {verification.isCorrect ? 'Great work! Your query is correct.' : 'Not quite. Check the hint and try again:'}
            </p>
            <p className="text-xs">{verification.message}</p>
          </div>
        </div>
      )}

      {/* Query Output Area */}
      <div className="p-3.5 bg-white dark:bg-[#15202b] border-t border-gray-200 dark:border-[#283b4d] space-y-1.5">
        <div className="flex items-center justify-between text-xs text-gray-700 dark:text-gray-300">
          <span className="font-semibold">Output:</span>
          {queryResult && !queryResult.error && (
            <span className="text-[11px] text-gray-500 dark:text-gray-400 font-mono">
              {queryResult.rowCount} {queryResult.rowCount === 1 ? 'row' : 'rows'} returned (
              {queryResult.executionTimeMs} ms)
            </span>
          )}
        </div>

        {isRunning ? (
          <div className="p-6 border border-gray-200 dark:border-[#283b4d] rounded-lg text-center text-xs text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-[#0f172a]">
            Running query in SQLite engine...
          </div>
        ) : queryResult?.error ? (
          <div className="p-3 bg-red-50 dark:bg-[#331a1a] border border-red-200 dark:border-red-900 rounded-lg text-xs text-red-900 dark:text-red-300 font-mono whitespace-pre-wrap">
            {queryResult.error}
          </div>
        ) : queryResult && queryResult.columns.length > 0 ? (
          <div className="border border-gray-200 dark:border-[#283b4d] rounded-lg overflow-x-auto bg-[#f8fafc] dark:bg-[#0f172a]">
            <table className="w-full text-left text-xs border-collapse">
              <thead className="bg-[#f1f5f9] dark:bg-[#15202b] border-b border-gray-200 dark:border-[#283b4d]">
                <tr>
                  {queryResult.columns.map((c) => (
                    <th key={c} className="p-2 font-mono font-bold text-gray-800 dark:text-white">
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-[#283b4d]">
                {queryResult.values.map((row, rIdx) => (
                  <tr key={rIdx} className="hover:bg-[#f1f5f9]/60 hover:dark:bg-[#1b2a38]/60">
                    {row.map((cell, cIdx) => (
                      <td key={cIdx} className="p-2 font-mono text-gray-800 dark:text-[#cbd5e1]">
                        {cell === null ? (
                          <span className="text-gray-400 dark:text-gray-500 italic">NULL</span>
                        ) : (
                          String(cell)
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-4 border border-dashed border-gray-200 dark:border-[#283b4d] rounded-lg text-center text-xs text-gray-400 bg-gray-50 dark:bg-[#0f172a]">
            Click "Run Query" to execute the SQL statement and view the output table here.
          </div>
        )}
      </div>
    </div>
  );
}
