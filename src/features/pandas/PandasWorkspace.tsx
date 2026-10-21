import React, { useState, useEffect } from 'react';
import { PandasExerciseDefinition } from '../../types/pandasLesson';
import { executePandasCode, PandasExecutionResult } from '../../services/pandasEngine';
import { JsEditor } from '../../components/editor/JsEditor';
import { PandasTable } from '../../components/charts/PandasTable';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import {
  Play,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  Lightbulb,
  Eye,
  Check,
  Terminal,
  ArrowRight,
  Database,
  Sparkles,
} from 'lucide-react';
import { cn } from '../../lib/utils';

export interface PandasWorkspaceProps {
  exercise: PandasExerciseDefinition;
  isSolved: boolean;
  onSolve: (code: string) => void;
  savedCode?: string;
  onNextTask?: () => void;
  onGoToQuiz?: () => void;
}

export function PandasWorkspace({
  exercise,
  isSolved,
  onSolve,
  savedCode,
  onNextTask,
  onGoToQuiz,
}: PandasWorkspaceProps) {
  const [code, setCode] = useState(savedCode || exercise.initialCode);
  const [isRunning, setIsRunning] = useState(false);
  const [result, setResult] = useState<PandasExecutionResult | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [feedbackMessage, setFeedbackMessage] = useState<string>('');
  const [showHint, setShowHint] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [copiedSolution, setCopiedSolution] = useState(false);
  const [activeTab, setActiveTab] = useState<'table' | 'console'>('table');

  useEffect(() => {
    setCode(savedCode || exercise.initialCode);
    setResult(null);
    setIsCorrect(null);
    setFeedbackMessage('');
    setShowHint(false);
    setShowSolution(false);
    setCopiedSolution(false);
    setActiveTab('table');
  }, [exercise.id, savedCode, exercise.initialCode]);

  const handleRunCode = async () => {
    setIsRunning(true);
    setIsCorrect(null);
    setFeedbackMessage('');

    await new Promise((r) => setTimeout(r, 40));

    try {
      const res = executePandasCode(code);
      setResult(res);

      if (res.error) {
        setIsCorrect(false);
        setFeedbackMessage(res.error);
        setActiveTab('console');
        return;
      }

      // If exercise specifies an expected text output
      if (exercise.expectedOutput !== undefined) {
        const cleanActual = res.output.trim().replace(/\r\n/g, '\n');
        const cleanExpected = exercise.expectedOutput.trim().replace(/\r\n/g, '\n');

        if (cleanActual === cleanExpected || cleanActual.includes(cleanExpected)) {
          setIsCorrect(true);
          setFeedbackMessage('Great job! DataFrame computation and output match expected results.');
          onSolve(code);
        } else {
          setIsCorrect(false);
          setFeedbackMessage(
            `Output mismatch.\nExpected:\n"${cleanExpected}"\n\nYour console produced:\n"${cleanActual}"`
          );
        }
      } else {
        setIsCorrect(true);
        setFeedbackMessage('Execution completed successfully.');
        onSolve(code);
      }
    } catch (err: any) {
      setResult({
        output: '',
        error: err?.message || String(err),
        executionTimeMs: 0,
      });
      setIsCorrect(false);
      setFeedbackMessage(err?.message || 'Runtime execution failed');
      setActiveTab('console');
    } finally {
      setIsRunning(false);
    }
  };

  const handleReset = () => {
    setCode(exercise.initialCode);
    setResult(null);
    setIsCorrect(null);
    setFeedbackMessage('');
    setShowHint(false);
    setShowSolution(false);
    setActiveTab('table');
  };

  const handleCopySolution = () => {
    setCode(exercise.solutionCode);
    setCopiedSolution(true);
    setTimeout(() => setCopiedSolution(false), 2000);
  };

  const handleInsertSnippet = (snippet: string) => {
    setCode((prev) => prev + (prev.endsWith('\n') ? '' : '\n') + snippet);
  };

  return (
    <div className="space-y-4">
      {/* Objective Card */}
      <Card className="p-4 bg-surface border-border">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-sm text-text-main">
              Task {exercise.order}: {exercise.title}
            </span>
            {isSolved && (
              <Badge variant="success" size="sm" className="gap-1">
                <CheckCircle2 className="w-3 h-3" />
                Solved
              </Badge>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setShowHint(!showHint)}
              className="text-xs text-text-muted hover:text-text-main transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
              <span>{showHint ? 'Hide Hint' : 'Hint'}</span>
            </button>

            <button
              type="button"
              onClick={() => setShowSolution(!showSolution)}
              className="text-xs text-text-muted hover:text-text-main transition-colors flex items-center gap-1 cursor-pointer ml-2"
            >
              <Eye className="w-3.5 h-3.5 text-primary" />
              <span>{showSolution ? 'Hide Solution' : 'Solution'}</span>
            </button>
          </div>
        </div>

        <p className="text-xs text-text-muted leading-relaxed font-normal">
          {exercise.objective}
        </p>

        {/* Hint Dropdown */}
        {showHint && (
          <div className="mt-3 p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 text-xs text-amber-900 dark:text-amber-200">
            <span className="font-semibold block mb-0.5">Hint:</span>
            {exercise.hint}
          </div>
        )}

        {/* Solution Dropdown */}
        {showSolution && (
          <div className="mt-3 p-3 rounded-lg bg-subtle border border-border text-xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-text-main">Reference Solution:</span>
              <Button
                variant="outline"
                size="sm"
                onClick={handleCopySolution}
                className="text-[11px] h-6 py-0 px-2"
              >
                {copiedSolution ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-500 mr-1" />
                    Inserted
                  </>
                ) : (
                  'Insert into Editor'
                )}
              </Button>
            </div>
            <pre className="p-2 rounded bg-surface border border-border font-mono text-[11px] overflow-x-auto text-text-main">
              {exercise.solutionCode}
            </pre>
            <p className="text-text-muted text-[11px]">{exercise.explanation}</p>
          </div>
        )}

        {/* Quick Syntax Chips */}
        {exercise.quickChips && exercise.quickChips.length > 0 && (
          <div className="mt-3 pt-3 border-t border-border flex flex-wrap items-center gap-1.5">
            <span className="text-[11px] text-text-muted flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-[#130754] dark:text-[#00D2FF]" />
              Quick Chips:
            </span>
            {exercise.quickChips.map((chip, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleInsertSnippet(chip)}
                className="px-2 py-0.5 text-[11px] font-mono rounded bg-subtle hover:bg-subtle/80 text-text-main border border-border transition-colors cursor-pointer"
                title={`Insert: ${chip}`}
              >
                {chip}
              </button>
            ))}
          </div>
        )}
      </Card>

      {/* Code Editor */}
      <div className="rounded-xl border border-border overflow-hidden bg-[#1E1E1E] shadow-sm">
        <div className="flex items-center justify-between px-4 py-2 bg-[#181818] border-b border-[#2d2d2d] text-xs text-neutral-400">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
            </div>
            <span className="font-mono text-[11px] text-neutral-300 ml-2">solution.py</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleReset}
              className="px-2.5 py-1 text-[11px] text-neutral-400 hover:text-white rounded hover:bg-white/10 transition-colors flex items-center gap-1 cursor-pointer"
              title="Reset Code"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          </div>
        </div>

        <JsEditor
          value={code}
          onChange={(newVal) => setCode(newVal)}
          minHeight="220px"
        />

        <div className="flex items-center justify-between px-4 py-2.5 bg-[#181818] border-t border-[#2d2d2d]">
          <span className="text-[11px] text-neutral-400 font-mono">
            Pure client-side Pandas environment
          </span>

          <Button
            variant="primary"
            size="sm"
            onClick={handleRunCode}
            disabled={isRunning}
            className="text-xs bg-[#130754] hover:bg-[#1c0b78] text-white font-medium"
          >
            <Play className={`w-3.5 h-3.5 fill-current ${isRunning ? 'animate-spin' : ''}`} />
            <span>{isRunning ? 'Executing...' : 'Run Code'}</span>
          </Button>
        </div>
      </div>

      {/* Output Panel with Tab Bar */}
      <div className="rounded-xl border border-border overflow-hidden bg-surface shadow-xs">
        <div className="flex items-center justify-between px-3 py-2 bg-subtle border-b border-border">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setActiveTab('table')}
              className={cn(
                'px-3 py-1 rounded-md text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer',
                activeTab === 'table'
                  ? 'bg-surface text-primary border border-border shadow-xs'
                  : 'text-text-muted hover:text-text-main'
              )}
            >
              <Database className="w-3.5 h-3.5" />
              <span>DataFrame Table</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('console')}
              className={cn(
                'px-3 py-1 rounded-md text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer',
                activeTab === 'console'
                  ? 'bg-surface text-primary border border-border shadow-xs'
                  : 'text-text-muted hover:text-text-main'
              )}
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>Console Log</span>
            </button>
          </div>

          {result && (
            <span className="text-[11px] font-mono text-text-muted">
              {result.executionTimeMs}ms
            </span>
          )}
        </div>

        {/* Tab Content */}
        <div className="p-3">
          {activeTab === 'table' ? (
            <PandasTable
              data={result?.table || exercise.expectedTable}
            />
          ) : (
            <div className="font-mono text-xs bg-subtle/50 p-3 rounded-lg border border-border min-h-[140px] max-h-[300px] overflow-y-auto whitespace-pre-wrap text-text-main">
              {result ? (
                result.error ? (
                  <span className="text-rose-500 font-semibold">{result.error}</span>
                ) : (
                  result.output || (result.table ? 'DataFrame displayed in Table Tab.' : 'No output produced.')
                )
              ) : (
                <span className="text-text-muted italic">Click "Run Code" to inspect the console output...</span>
              )}
            </div>
          )}
        </div>

        {/* Evaluation Banner */}
        {isCorrect !== null && (
          <div
            className={cn(
              'px-4 py-3 border-t text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2',
              isCorrect
                ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-900 dark:text-emerald-200'
                : 'bg-rose-500/10 border-rose-500/20 text-rose-900 dark:text-rose-200'
            )}
          >
            <div className="flex items-start gap-2">
              {isCorrect ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
              )}
              <div className="space-y-1">
                <span className="font-semibold block">
                  {isCorrect ? 'Correct!' : 'Check your solution:'}
                </span>
                <span className="text-[11px] opacity-90 whitespace-pre-line">
                  {feedbackMessage}
                </span>
              </div>
            </div>

            {isCorrect && (
              <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
                {onNextTask ? (
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={onNextTask}
                    className="text-xs bg-emerald-600 hover:bg-emerald-700 text-white"
                  >
                    <span>Next Task</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Button>
                ) : onGoToQuiz ? (
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={onGoToQuiz}
                    className="text-xs bg-emerald-600 hover:bg-emerald-700 text-white"
                  >
                    <span>Take Quiz</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Button>
                ) : null}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
