import React, { useState, useEffect } from 'react';
import { DataScienceExerciseDefinition } from '../../types/dataScienceLesson';
import { executeDataScienceCode, DataScienceExecutionResult } from '../../services/dataScienceEngine';
import { JsEditor } from '../../components/editor/JsEditor';
import { DataScienceChart } from '../../components/charts/DataScienceChart';
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
  BarChart2,
  Table as TableIcon,
  Sparkles,
} from 'lucide-react';
import { cn } from '../../lib/utils';

export interface DataScienceWorkspaceProps {
  exercise: DataScienceExerciseDefinition;
  isSolved: boolean;
  onSolve: (code: string) => void;
  savedCode?: string;
  onNextTask?: () => void;
  onGoToQuiz?: () => void;
}

export function DataScienceWorkspace({
  exercise,
  isSolved,
  onSolve,
  savedCode,
  onNextTask,
  onGoToQuiz,
}: DataScienceWorkspaceProps) {
  const [code, setCode] = useState(savedCode || exercise.initialCode);
  const [isRunning, setIsRunning] = useState(false);
  const [result, setResult] = useState<DataScienceExecutionResult | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [feedbackMessage, setFeedbackMessage] = useState<string>('');
  const [showHint, setShowHint] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [showDatasetTable, setShowDatasetTable] = useState(false);
  const [copiedSolution, setCopiedSolution] = useState(false);

  useEffect(() => {
    setCode(savedCode || exercise.initialCode);
    setResult(null);
    setIsCorrect(null);
    setFeedbackMessage('');
    setShowHint(false);
    setShowSolution(false);
    setCopiedSolution(false);
  }, [exercise.id, savedCode, exercise.initialCode]);

  const handleRunCode = async () => {
    setIsRunning(true);
    setIsCorrect(null);
    setFeedbackMessage('');

    await new Promise((r) => setTimeout(r, 40));

    try {
      const res = await executeDataScienceCode(code, exercise.dataset);
      setResult(res);

      if (res.error) {
        setIsCorrect(false);
        setFeedbackMessage(res.error);
        return;
      }

      if (exercise.expectedOutput !== undefined) {
        const cleanActual = res.output.trim().replace(/\r\n/g, '\n');
        const cleanExpected = exercise.expectedOutput.trim().replace(/\r\n/g, '\n');

        if (cleanActual === cleanExpected || cleanActual.includes(cleanExpected)) {
          setIsCorrect(true);
          setFeedbackMessage('Great job! Statistical output and computations match the objective.');
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
      setFeedbackMessage(err?.message || 'Error executing Data Science calculation.');
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
  };

  const handleInsertSnippet = (snippet: string) => {
    setCode((prev) => prev + snippet);
  };

  const handleCopySolution = () => {
    navigator.clipboard.writeText(exercise.solutionCode);
    setCopiedSolution(true);
    setTimeout(() => setCopiedSolution(false), 2000);
  };

  const handleUseSolution = () => {
    setCode(exercise.solutionCode);
  };

  const defaultChips = [
    'df.mean("")',
    'df.median("")',
    'df.std("")',
    'df.describe()',
    'df.filter(r => )',
    'plot.bar(labels, vals)',
    'plot.scatter(points)',
    'console.log()',
  ];
  const allChips = Array.from(new Set([...(exercise.quickChips || []), ...defaultChips]));

  return (
    <div className="space-y-4">
      {/* Objective Header */}
      <Card className="p-4 sm:p-5 bg-surface border-border">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-border/70">
          <div>
            <div className="flex items-center gap-2">
              <Badge variant="accent" className="text-xs bg-[#E70488]/10 text-[#E70488] border-[#E70488]/30">
                Task {exercise.order}
              </Badge>
              <h3 className="font-raleway font-bold text-base sm:text-lg text-text-main">
                {exercise.title}
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-text-muted mt-1 leading-relaxed">
              {exercise.objective}
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
            {isSolved ? (
              <Badge variant="success" className="gap-1 text-xs px-2.5 py-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Passed</span>
              </Badge>
            ) : (
              <Badge variant="outline" className="gap-1 text-xs px-2.5 py-1 text-text-muted">
                <span>In Progress</span>
              </Badge>
            )}
          </div>
        </div>

        {/* Action Bar */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-3">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowHint(!showHint)}
              className="text-xs text-text-muted"
            >
              <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
              <span>{showHint ? 'Hide Hint' : 'Hint'}</span>
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowSolution(!showSolution)}
              className="text-xs text-text-muted"
            >
              <Eye className="w-3.5 h-3.5 text-primary" />
              <span>{showSolution ? 'Hide Solution' : 'Solution'}</span>
            </Button>

            {exercise.dataset && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowDatasetTable(!showDatasetTable)}
                className="text-xs text-[#E70488] border-[#E70488]/30 hover:bg-[#E70488]/10"
              >
                <TableIcon className="w-3.5 h-3.5" />
                <span>{showDatasetTable ? 'Hide Dataset' : 'Inspect Dataset'}</span>
              </Button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleReset}
              className="text-xs text-text-muted"
              title="Reset code to initial template"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </Button>

            <Button
              variant="primary"
              size="sm"
              onClick={handleRunCode}
              disabled={isRunning}
              className="text-xs bg-[#E70488] hover:bg-[#c20372] text-white font-bold px-4"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>{isRunning ? 'Calculating...' : 'Run Analysis'}</span>
            </Button>
          </div>
        </div>

        {/* Dataset Table Modal/Inline Drawer */}
        {showDatasetTable && exercise.dataset && (
          <div className="mt-3 p-3 bg-subtle border border-border rounded-lg text-xs space-y-2 animate-fadeIn overflow-x-auto">
            <div className="flex items-center justify-between font-bold text-text-main pb-1 border-b border-border">
              <span className="flex items-center gap-1.5">
                <Database className="w-3.5 h-3.5 text-[#E70488]" />
                <span>Active Dataset: {exercise.dataset.name} ({exercise.dataset.rows.length} rows)</span>
              </span>
              <span className="text-[11px] text-text-muted">{exercise.dataset.description}</span>
            </div>

            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-border/80 text-text-muted">
                  {exercise.dataset.columns.map((col, idx) => (
                    <th key={idx} className="p-1.5 font-semibold bg-surface/50">
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {exercise.dataset.rows.slice(0, 6).map((row, rIdx) => (
                  <tr key={rIdx} className="border-b border-border/40 hover:bg-surface/30">
                    {row.map((val, cIdx) => (
                      <td key={cIdx} className="p-1.5 font-mono text-[11px]">
                        {String(val)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Hint Box */}
        {showHint && (
          <div className="mt-3 p-3 bg-amber-500/10 border border-amber-500/30 rounded-lg text-xs text-amber-900 dark:text-amber-200 animate-fadeIn space-y-1">
            <div className="flex items-center gap-1.5 font-bold">
              <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
              <span>Analytics Hint:</span>
            </div>
            <p className="leading-relaxed pl-5">{exercise.hint}</p>
          </div>
        )}

        {/* Solution Box */}
        {showSolution && (
          <div className="mt-3 p-3 bg-primary/5 border border-primary/20 rounded-lg text-xs space-y-2 animate-fadeIn">
            <div className="flex items-center justify-between">
              <span className="font-bold text-primary flex items-center gap-1.5">
                <Eye className="w-3.5 h-3.5" />
                <span>Reference Data Science Solution:</span>
              </span>
              <div className="flex items-center gap-1.5">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCopySolution}
                  className="text-[11px] h-7 px-2"
                >
                  {copiedSolution ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-500" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <span>Copy</span>
                  )}
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={handleUseSolution}
                  className="text-[11px] h-7 px-2"
                >
                  Insert into Editor
                </Button>
              </div>
            </div>
            <pre className="p-2.5 bg-editor-bg border border-border rounded font-mono text-[11px] text-editor-text overflow-x-auto leading-relaxed">
              <code>{exercise.solutionCode}</code>
            </pre>
            <p className="text-[11px] text-text-muted leading-relaxed pl-0.5">
              {exercise.explanation}
            </p>
          </div>
        )}
      </Card>

      {/* Split Workspace: Code Editor & Analytics Output / Visualizer */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Editor Column */}
        <div className="space-y-2 flex flex-col">
          {/* Quick Chips */}
          <div className="bg-subtle/70 border border-border rounded-t-md p-2 space-y-1.5">
            <div className="flex items-center justify-between text-[11px] font-semibold text-text-muted px-0.5">
              <span className="flex items-center gap-1.5 text-[#E70488]">
                <BarChart2 className="w-3.5 h-3.5" />
                <span>Quick Analytics Chips (Tap to Insert)</span>
              </span>
              <span className="text-[10px] hidden sm:inline text-text-muted">
                DataFrame &amp; Plot helpers
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto py-0.5 scrollbar-thin">
              {allChips.map((chip) => (
                <button
                  key={chip}
                  type="button"
                  onClick={() => handleInsertSnippet(chip)}
                  className="px-2.5 py-1 text-xs font-mono font-bold bg-surface border border-border text-[#E70488] hover:bg-[#E70488] hover:text-white rounded-md transition-all cursor-pointer active:scale-95 shadow-2xs"
                >
                  {chip}
                </button>
              ))}
            </div>
          </div>

          <JsEditor
            value={code}
            onChange={setCode}
            onRun={handleRunCode}
            minHeight="300px"
            className="flex-1 min-h-[300px]"
          />
          <div className="flex items-center justify-between text-[11px] text-text-muted px-1">
            <span>Press <kbd className="px-1.5 py-0.5 bg-subtle border border-border rounded font-mono text-[10px]">Ctrl</kbd> + <kbd className="px-1.5 py-0.5 bg-subtle border border-border rounded font-mono text-[10px]">Enter</kbd> to Run Analysis</span>
            <span>{code.length} characters</span>
          </div>
        </div>

        {/* Analytics Output & Visualizer Column */}
        <div className="space-y-2 flex flex-col">
          {/* If chart is rendered, show live visualizer */}
          {(result?.chart || exercise.chartOutput) && (
            <DataScienceChart chart={result?.chart || exercise.chartOutput!} />
          )}

          {/* Console / Statistical Output */}
          <div className="border border-border rounded-lg overflow-hidden bg-editor-bg flex flex-col flex-1 shadow-2xs">
            <div className="bg-subtle border-b border-border px-3 py-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Terminal className="w-3.5 h-3.5 text-[#E70488]" />
                <span className="text-xs font-semibold text-text-main font-mono">
                  Analysis Output &amp; Statistical Logs
                </span>
              </div>
              {result && (
                <span className="text-[10px] text-text-muted font-mono">
                  {result.executionTimeMs}ms
                </span>
              )}
            </div>

            <div className="p-3 font-mono text-xs text-editor-text flex-1 overflow-y-auto min-h-[220px] leading-relaxed whitespace-pre-wrap">
              {result ? (
                <>
                  {result.output ? (
                    <div>{result.output}</div>
                  ) : !result.error ? (
                    <div className="text-text-muted italic">
                      [Calculation completed with 0 output logs.]
                    </div>
                  ) : null}

                  {result.error && (
                    <div className="mt-2 p-2.5 rounded bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400">
                      <div className="font-bold flex items-center gap-1.5 mb-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>Computation Error:</span>
                      </div>
                      <div className="text-[11px] leading-relaxed">{result.error}</div>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-text-muted/60 italic flex flex-col items-center justify-center h-full min-h-[180px] text-center gap-2">
                  <BarChart2 className="w-6 h-6 opacity-40 text-[#E70488]" />
                  <span>Click "Run Analysis" to compute metrics &amp; render visualizations.</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Verification Feedback */}
      {isCorrect !== null && (
        <Card
          className={cn(
            'p-4 border transition-all animate-fadeIn',
            isCorrect
              ? 'bg-emerald-500/5 border-emerald-500/30'
              : 'bg-amber-500/5 border-amber-500/30'
          )}
        >
          <div className="flex items-start justify-between gap-3">
            <div className="space-y-1 flex-1">
              <div className="flex items-center gap-2">
                {isCorrect ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
                )}
                <span
                  className={cn(
                    'font-bold text-sm',
                    isCorrect ? 'text-emerald-700 dark:text-emerald-300' : 'text-amber-700 dark:text-amber-300'
                  )}
                >
                  {isCorrect ? 'Analysis Verified Successfully!' : 'Verification Feedback'}
                </span>
              </div>
              <div className="text-xs text-text-muted whitespace-pre-wrap pl-7 leading-relaxed">
                {feedbackMessage}
              </div>
            </div>

            {isCorrect && (
              <div className="shrink-0 self-center">
                {onNextTask ? (
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={onNextTask}
                    className="text-xs bg-emerald-600 hover:bg-emerald-700 text-white font-semibold shadow-sm"
                  >
                    <span>Next Task</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Button>
                ) : onGoToQuiz ? (
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={onGoToQuiz}
                    className="text-xs bg-emerald-600 hover:bg-emerald-700 text-white font-semibold shadow-sm"
                  >
                    <span>Take Lesson Quiz</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Button>
                ) : null}
              </div>
            )}
          </div>
        </Card>
      )}
    </div>
  );
}
