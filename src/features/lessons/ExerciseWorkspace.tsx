import React, { useState, useEffect, useCallback } from 'react';
import { Database as SqliteDatabase } from 'sql.js';
import { ExerciseDefinition, DatasetDefinition } from '../../types/lesson';
import { QueryResult, VerificationResult } from '../../types/database';
import { createDatabaseFromDataset, executeQuery } from '../../database/sqlEngine';
import { verifyQueryResult } from '../../database/queryValidator';
import { SqlEditor } from '../../components/editor/SqlEditor';
import { ResultsTable } from '../../components/editor/ResultsTable';
import { QueryExecutionBar } from '../../components/editor/QueryExecutionBar';
import { QuickSqlChips } from '../../components/editor/QuickSqlChips';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import {
  CheckCircle2,
  AlertCircle,
  Lightbulb,
  Eye,
  Check,
  RotateCcw,
  Table,
  ArrowRight,
  Sparkles,
  HelpCircle,
  Zap,
} from 'lucide-react';
import { cn } from '../../lib/utils';

export interface ExerciseWorkspaceProps {
  exercise: ExerciseDefinition;
  dataset: DatasetDefinition;
  isSolved: boolean;
  onSolve: (query: string) => void;
  savedQuery?: string;
  onNextTask?: () => void;
  onGoToQuiz?: () => void;
}

export function ExerciseWorkspace({
  exercise,
  dataset,
  isSolved,
  onSolve,
  savedQuery,
  onNextTask,
  onGoToQuiz,
}: ExerciseWorkspaceProps) {
  const [query, setQuery] = useState(savedQuery || exercise.initialQuery);
  const [dbInstance, setDbInstance] = useState<SqliteDatabase | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [queryResult, setQueryResult] = useState<QueryResult | null>(null);
  const [verification, setVerification] = useState<VerificationResult | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [showTablePreview, setShowTablePreview] = useState(false);
  const [initError, setInitError] = useState<string | null>(null);

  // Initialize isolated SQLite database
  const initDb = useCallback(async () => {
    setInitError(null);
    try {
      const db = await createDatabaseFromDataset(dataset);
      setDbInstance((prev) => {
        if (prev) prev.close();
        return db;
      });
    } catch (err: any) {
      setInitError(err?.message || 'Failed to initialize database engine.');
    }
  }, [dataset]);

  useEffect(() => {
    initDb();
    return () => {
      // Clean up when unmounting
      setDbInstance((prev) => {
        if (prev) prev.close();
        return null;
      });
    };
  }, [initDb]);

  // Reset state when exercise changes
  useEffect(() => {
    setQuery(savedQuery || exercise.initialQuery);
    setQueryResult(null);
    setVerification(null);
    setShowHint(false);
    setShowSolution(false);
  }, [exercise.id, savedQuery, exercise.initialQuery]);

  const handleRunQuery = useCallback(async () => {
    setIsRunning(true);
    setVerification(null);

    // Yield control briefly to ensure loading indicator renders
    await new Promise((r) => setTimeout(r, 40));

    try {
      const allowMutation = !!exercise.allowsMutation;

      if (allowMutation && exercise.verificationQuery) {
        // Safe mutation flow: Run against fresh copies to prevent duplicate key or dirty state loops
        const studentDb = await createDatabaseFromDataset(dataset);
        const refDb = await createDatabaseFromDataset(dataset);

        try {
          const studentExec = executeQuery(studentDb, query, true);
          if (studentExec.error) {
            setQueryResult(studentExec);
            setVerification({
              isCorrect: false,
              feedbackType: 'error',
              message: studentExec.error,
            });
            return;
          }

          // Reference execution
          executeQuery(refDb, exercise.solutionQuery, true);

          const expectedState = executeQuery(refDb, exercise.verificationQuery, true);
          const actualState = executeQuery(studentDb, exercise.verificationQuery, true);

          // Adopt the student's modified database instance so subsequent operations/views reflect their change
          setDbInstance((prev) => {
            if (prev) prev.close();
            return studentDb;
          });

          // Show resulting table data in the results panel
          setQueryResult(actualState);

          const verifyStatus = verifyQueryResult(
            actualState,
            expectedState,
            exercise.expectedColumns,
            exercise.requiresOrder
          );
          setVerification(verifyStatus);

          if (verifyStatus.isCorrect) {
            onSolve(query);
          }
        } finally {
          refDb.close();
        }
      } else {
        // Standard Read-Only Query Flow
        if (!dbInstance) return;
        const studentResult = executeQuery(dbInstance, query, allowMutation);
        setQueryResult(studentResult);

        if (!studentResult.error) {
          const referenceResult = executeQuery(dbInstance, exercise.solutionQuery, allowMutation);
          const verifyStatus = verifyQueryResult(
            studentResult,
            referenceResult,
            exercise.expectedColumns,
            exercise.requiresOrder
          );
          setVerification(verifyStatus);

          if (verifyStatus.isCorrect) {
            onSolve(query);
          }
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
  }, [dbInstance, query, exercise, dataset, onSolve]);

  const handleResetQuery = async () => {
    setQuery(exercise.initialQuery);
    setQueryResult(null);
    setVerification(null);
    if (exercise.allowsMutation) {
      await initDb();
    }
  };

  const handleApplySolution = () => {
    setQuery(exercise.solutionQuery);
    setShowSolution(false);
  };

  const handleInsertSnippet = (snippet: string) => {
    setQuery((prev) => {
      if (!prev || prev.trim() === '') return snippet;
      if (/\s$/.test(prev)) return prev + snippet;
      return prev + ' ' + snippet;
    });
  };

  // Determine dynamic extra keywords for chips
  const dynamicKeywords: string[] = [];
  if (exercise.allowsMutation) {
    dynamicKeywords.push('INSERT INTO', 'VALUES', 'UPDATE', 'SET', 'DELETE FROM');
  } else {
    dynamicKeywords.push('AND', 'OR', 'ASC', 'DESC', 'COUNT(*)', 'JOIN', 'ON');
  }

  return (
    <div className="space-y-4">
      {/* Objective Card */}
      <Card className="p-4 bg-surface border-border shadow-subtle">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-primary uppercase tracking-wide">
                Task Goal
              </span>
              {isSolved && (
                <Badge variant="success" size="sm">
                  <Check className="w-3 h-3" />
                  <span>Completed</span>
                </Badge>
              )}
            </div>
            <p className="text-sm font-semibold text-text-main leading-relaxed">
              {exercise.objective}
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {/* Table preview toggle button */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowTablePreview((prev) => !prev)}
              className="text-xs"
              title="Preview sample table columns and rows"
            >
              <Table className="w-3.5 h-3.5 text-secondary" />
              <span>{showTablePreview ? 'Hide Data' : 'Table Data'}</span>
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowHint((prev) => !prev)}
              className="text-xs"
            >
              <Lightbulb className="w-3.5 h-3.5 text-warning" />
              <span>{showHint ? 'Hide Hint' : 'Hint'}</span>
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowSolution((prev) => !prev)}
              className="text-xs"
            >
              <Eye className="w-3.5 h-3.5 text-text-muted" />
              <span>{showSolution ? 'Hide Solution' : 'Solution'}</span>
            </Button>
          </div>
        </div>

        {/* Optional In-Workspace Table Data Preview */}
        {showTablePreview && (
          <div className="mt-4 p-3 bg-subtle/70 rounded-xl border border-border space-y-2 animate-fadeIn">
            <div className="flex items-center justify-between text-xs font-semibold text-text-main">
              <span className="font-mono text-primary">{dataset.tableName} (Data Sample)</span>
              <span className="text-[11px] text-text-muted">
                {dataset.sampleColumns.length} columns • {dataset.sampleRows.length} sample rows
              </span>
            </div>
            <div className="overflow-x-auto max-h-48 border border-border rounded-lg bg-surface scrollbar-thin">
              <table className="w-full text-left text-xs border-collapse">
                <thead className="bg-subtle sticky top-0 border-b border-border">
                  <tr>
                    {dataset.sampleColumns.map((col) => (
                      <th key={col} className="p-2 font-mono font-bold text-text-main">
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/60">
                  {dataset.sampleRows.map((row, rIdx) => (
                    <tr key={rIdx} className="hover:bg-subtle/40">
                      {row.map((cell, cIdx) => (
                        <td key={cIdx} className="p-2 font-mono text-text-main/90">
                          {cell === null ? (
                            <span className="text-[10px] italic text-text-muted">NULL</span>
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
          </div>
        )}

        {/* Progressive Hint Drawer */}
        {showHint && (
          <div className="mt-3 p-3.5 bg-warning-subtle/60 border border-warning/40 rounded-xl text-xs text-text-main leading-relaxed flex items-start gap-2.5 animate-fadeIn">
            <Lightbulb className="w-4 h-4 text-warning shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="font-bold text-warning block">Helpful Clue:</span>
              <p className="leading-relaxed">{exercise.hint}</p>
            </div>
          </div>
        )}

        {/* Progressive Solution Reveal */}
        {showSolution && (
          <div className="mt-3 p-3.5 bg-subtle border border-border rounded-xl text-xs space-y-2.5 animate-fadeIn">
            <div className="flex items-center justify-between">
              <span className="font-bold text-text-main">Reference Solution:</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleApplySolution}
                className="text-[11px] py-1 h-auto text-primary font-semibold hover:bg-primary/10"
              >
                Copy to Editor
              </Button>
            </div>
            <pre className="p-2.5 bg-editor-bg border border-border rounded-lg font-mono text-xs text-editor-text font-bold overflow-x-auto">
              {exercise.solutionQuery}
            </pre>
            <p className="text-text-muted leading-relaxed">{exercise.explanation}</p>
          </div>
        )}
      </Card>

      {/* Editor & Execution Panel */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs text-text-muted px-1">
          <span className="font-semibold text-text-main">Interactive SQL Editor</span>
          <span className="flex items-center gap-1.5">
            <span>Target Table:</span>
            <span className="font-mono font-bold text-primary bg-primary/10 px-2 py-0.5 rounded">
              {dataset.tableName}
            </span>
          </span>
        </div>

        {initError ? (
          <div className="p-4 bg-error-subtle border border-error/40 rounded-xl text-xs text-error">
            Failed to load SQLite WebAssembly: {initError}
          </div>
        ) : (
          <div className="rounded-xl border border-border overflow-hidden bg-surface shadow-subtle">
            {/* Quick Code Building Blocks */}
            <QuickSqlChips
              onInsert={handleInsertSnippet}
              tableName={dataset.tableName}
              availableColumns={dataset.sampleColumns}
              extraKeywords={dynamicKeywords}
              allowedKeywords={exercise.allowedKeywords}
            />

            {/* CodeMirror SQL Editor */}
            <SqlEditor
              value={query}
              onChange={setQuery}
              onRun={handleRunQuery}
              disabled={!dbInstance || isRunning}
              className="border-0 rounded-none min-h-[110px]"
            />

            {/* Execution action toolbar */}
            <div className="p-2.5 bg-subtle/50 border-t border-border flex items-center justify-between flex-wrap gap-2">
              <QueryExecutionBar
                onRun={handleRunQuery}
                onReset={handleResetQuery}
                query={query}
                isRunning={isRunning}
              />

              {exercise.allowsMutation && (
                <button
                  type="button"
                  onClick={initDb}
                  className="flex items-center gap-1 px-2.5 py-1 text-xs text-text-muted hover:text-text-main rounded-md border border-border/80 hover:bg-subtle transition-colors cursor-pointer"
                  title="Reload table to original data rows"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset Table Data</span>
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Verification Feedback Banner: Kid-friendly celebratory or encouraging */}
      {verification && (
        <div
          className={cn(
            'p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all text-xs leading-relaxed animate-fadeIn',
            verification.isCorrect
              ? 'bg-success-subtle border-success/40 text-text-main'
              : 'bg-warning-subtle border-warning/40 text-text-main'
          )}
        >
          <div className="flex items-start gap-3">
            {verification.isCorrect ? (
              <div className="w-8 h-8 rounded-full bg-success/20 flex items-center justify-center shrink-0 mt-0.5 text-success">
                <CheckCircle2 className="w-5 h-5" />
              </div>
            ) : (
              <div className="w-8 h-8 rounded-full bg-warning/20 flex items-center justify-center shrink-0 mt-0.5 text-warning">
                <AlertCircle className="w-5 h-5" />
              </div>
            )}
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <p className="font-bold text-sm">
                  {verification.isCorrect ? 'Target Matched! Great Job!' : 'Almost there!'}
                </p>
                {verification.isCorrect && (
                  <Badge variant="success" size="sm">
                    Solved
                  </Badge>
                )}
              </div>
              <p className="font-medium text-xs text-text-main">{verification.message}</p>
              {verification.isCorrect && (
                <p className="text-text-muted pt-0.5">{exercise.explanation}</p>
              )}
            </div>
          </div>

          {/* Quick Action Navigation on Success/Error */}
          <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
            {verification.isCorrect ? (
              onNextTask ? (
                <Button variant="primary" size="sm" onClick={onNextTask} className="text-xs">
                  <span>Next Task</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Button>
              ) : onGoToQuiz ? (
                <Button variant="primary" size="sm" onClick={onGoToQuiz} className="text-xs">
                  <span>Take Quiz</span>
                  <Sparkles className="w-3.5 h-3.5" />
                </Button>
              ) : null
            ) : (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowHint(true)}
                className="text-xs"
              >
                <HelpCircle className="w-3.5 h-3.5 text-warning" />
                <span>Show Hint</span>
              </Button>
            )}
          </div>
        </div>
      )}

      {/* Result Grid Output */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs text-text-muted px-1">
          <span className="font-semibold text-text-main">
            {exercise.allowsMutation ? 'Resulting Database State' : 'Query Output Table'}
          </span>
          {queryResult && !queryResult.error && (
            <span>
              {queryResult.rowCount} {queryResult.rowCount === 1 ? 'row' : 'rows'} returned (
              {queryResult.executionTimeMs} ms)
            </span>
          )}
        </div>
        <ResultsTable result={queryResult} isLoading={isRunning} />
      </div>
    </div>
  );
}
