import React, { useState, useEffect } from 'react';
import { MLExerciseDefinition } from '../../types/machineLearningLesson';
import { executeMachineLearningCode, MLExecutionResult } from '../../services/machineLearningEngine';
import { JsEditor } from '../../components/editor/JsEditor';
import { MachineLearningChart } from '../../components/charts/MachineLearningChart';
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
  Sparkles,
} from 'lucide-react';
import { cn } from '../../lib/utils';

export interface MachineLearningWorkspaceProps {
  exercise: MLExerciseDefinition;
  isSolved: boolean;
  onSolve: (code: string) => void;
  savedCode?: string;
  onNextTask?: () => void;
  onGoToQuiz?: () => void;
}

export function MachineLearningWorkspace({
  exercise,
  isSolved,
  onSolve,
  savedCode,
  onNextTask,
  onGoToQuiz,
}: MachineLearningWorkspaceProps) {
  const [code, setCode] = useState(savedCode || exercise.initialCode);
  const [isRunning, setIsRunning] = useState(false);
  const [result, setResult] = useState<MLExecutionResult | null>(null);
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
      const res = await executeMachineLearningCode(code, exercise.dataset);
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
          setFeedbackMessage('Great job! Model trained and calculations match the expected objective.');
          onSolve(code);
        } else {
          setIsCorrect(false);
          setFeedbackMessage(
            `Output mismatch.\nExpected:\n"${cleanExpected}"\n\nYour model produced:\n"${cleanActual}"`
          );
        }
      } else {
        setIsCorrect(true);
        setFeedbackMessage('Model executed successfully.');
        onSolve(code);
      }
    } catch (err: any) {
      setResult({
        output: '',
        error: err?.message || String(err),
        executionTimeMs: 0,
      });
      setIsCorrect(false);
      setFeedbackMessage(err?.message || 'Error executing Machine Learning calculation.');
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

  const handleApplyChip = (chip: string) => {
    setCode((prev) => (prev ? `${prev.trim()}\n${chip}\n` : `${chip}\n`));
  };

  const handleCopySolution = () => {
    navigator.clipboard.writeText(exercise.solutionCode);
    setCopiedSolution(true);
    setTimeout(() => setCopiedSolution(false), 2000);
  };

  const handleLoadSolution = () => {
    setCode(exercise.solutionCode);
    setShowSolution(false);
  };

  return (
    <div className="space-y-4">
      {/* Task Objective Card */}
      <Card className="p-4 sm:p-5 bg-surface border-border space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Badge variant="outline" size="sm" className="font-mono text-xs">
              Task {exercise.order}
            </Badge>
            <h2 className="font-raleway font-bold text-base text-text-main">
              {exercise.title}
            </h2>
          </div>

          <div className="flex items-center gap-2">
            {exercise.dataset && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowDatasetTable((prev) => !prev)}
                className="text-xs gap-1.5"
              >
                <Database className="w-3.5 h-3.5 text-[#3499CD]" />
                <span>{showDatasetTable ? 'Hide Dataset' : 'Inspect Features (X, y)'}</span>
              </Button>
            )}

            {isSolved && (
              <Badge variant="success" size="sm" className="gap-1 text-xs">
                <CheckCircle2 className="w-3 h-3" />
                <span>Solved</span>
              </Badge>
            )}
          </div>
        </div>

        <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
          {exercise.objective}
        </p>

        {/* Dataset Preview Drawer */}
        {showDatasetTable && exercise.dataset && (
          <div className="pt-2 border-t border-border/60 animate-fadeIn">
            <div className="flex items-center justify-between pb-2 text-xs text-text-muted font-medium">
              <span>{exercise.dataset.name} ({exercise.dataset.rows.length} observations)</span>
              <span>Target: {exercise.dataset.targetName}</span>
            </div>
            <div className="max-h-48 overflow-y-auto overflow-x-auto border border-border rounded-lg">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-subtle text-text-main border-b border-border sticky top-0">
                  <tr>
                    <th className="p-2 border-r border-border">#</th>
                    {exercise.dataset.featureNames.map((col, idx) => (
                      <th key={idx} className="p-2 border-r border-border">
                        {col}
                      </th>
                    ))}
                    <th className="p-2 text-[#F89939] font-bold">
                      {exercise.dataset.targetName}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/50">
                  {exercise.dataset.rows.map((row, rIdx) => (
                    <tr key={rIdx} className="hover:bg-subtle/50 transition-colors">
                      <td className="p-2 text-text-muted border-r border-border">{rIdx + 1}</td>
                      {row.features.map((f, fIdx) => (
                        <td key={fIdx} className="p-2 border-r border-border">
                          {f}
                        </td>
                      ))}
                      <td className="p-2 font-semibold text-text-main">{row.target}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Quick Helper Chips */}
        {exercise.quickChips && exercise.quickChips.length > 0 && (
          <div className="pt-1 flex flex-wrap items-center gap-1.5">
            <span className="text-[11px] text-text-muted font-medium flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-[#F89939]" />
              <span>Quick Syntax:</span>
            </span>
            {exercise.quickChips.map((chip, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleApplyChip(chip)}
                className="px-2 py-0.5 rounded text-[11px] font-mono bg-subtle text-text-main hover:bg-[#3499CD]/15 hover:text-[#3499CD] border border-border transition-all cursor-pointer"
                title="Click to insert into editor"
              >
                + {chip}
              </button>
            ))}
          </div>
        )}
      </Card>

      {/* Editor & Execution Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Code Editor Column */}
        <div className="lg:col-span-7 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-text-muted flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-[#3499CD]" />
                <span>Machine Learning Code Editor</span>
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleReset}
                className="text-xs gap-1 text-text-muted hover:text-text-main"
                title="Reset code to initial boilerplate"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowHint((prev) => !prev)}
                className={cn('text-xs gap-1', showHint && 'text-[#F89939] border-[#F89939]/40')}
              >
                <Lightbulb className="w-3.5 h-3.5" />
                <span>Hint</span>
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowSolution((prev) => !prev)}
                className={cn('text-xs gap-1', showSolution && 'text-primary border-primary/40')}
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Solution</span>
              </Button>
            </div>
          </div>

          <div className="border border-border rounded-lg overflow-hidden shadow-2xs">
            <JsEditor
              value={code}
              onChange={setCode}
              minHeight="240px"
            />
          </div>

          {/* Hint Dropdown */}
          {showHint && (
            <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-lg text-xs space-y-1 animate-fadeIn">
              <div className="flex items-center gap-1.5 font-bold text-amber-700 dark:text-amber-400">
                <Lightbulb className="w-3.5 h-3.5" />
                <span>Hint</span>
              </div>
              <p className="text-text-main leading-relaxed">{exercise.hint}</p>
            </div>
          )}

          {/* Solution Modal/Dropdown */}
          {showSolution && (
            <div className="p-3 bg-subtle border border-border rounded-lg text-xs space-y-2 animate-fadeIn">
              <div className="flex items-center justify-between">
                <span className="font-bold text-text-main flex items-center gap-1.5">
                  <Eye className="w-3.5 h-3.5 text-primary" />
                  <span>Model Solution:</span>
                </span>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleCopySolution}
                    className="text-[11px] h-7 gap-1"
                  >
                    {copiedSolution ? <Check className="w-3 h-3 text-emerald-500" /> : null}
                    <span>{copiedSolution ? 'Copied' : 'Copy'}</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleLoadSolution}
                    className="text-[11px] h-7 gap-1"
                  >
                    <span>Insert into Editor</span>
                  </Button>
                </div>
              </div>
              <pre className="p-2.5 bg-editor-bg border border-border rounded font-mono text-[11px] text-editor-text overflow-x-auto">
                <code>{exercise.solutionCode}</code>
              </pre>
              <p className="text-[11px] text-text-muted">{exercise.explanation}</p>
            </div>
          )}

          {/* Action Row */}
          <div className="flex items-center justify-between pt-1">
            <span className="text-[11px] text-text-muted">
              Press Run to fit model and evaluate outputs
            </span>

            <Button
              variant="primary"
              size="sm"
              onClick={handleRunCode}
              disabled={isRunning}
              className="gap-2 bg-[#1E293B] hover:bg-[#334155] text-white font-bold px-4"
            >
              <Play className={cn('w-3.5 h-3.5 fill-current', isRunning && 'animate-spin')} />
              <span>{isRunning ? 'Fitting Model...' : 'Run Code'}</span>
            </Button>
          </div>
        </div>

        {/* Output & Visualizer Column */}
        <div className="lg:col-span-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-text-muted flex items-center gap-1.5">
              <BarChart2 className="w-3.5 h-3.5 text-[#F89939]" />
              <span>Model Output &amp; Diagnostics</span>
            </span>

            {result && (
              <span className="text-[11px] font-mono text-text-muted">
                {result.executionTimeMs}ms
              </span>
            )}
          </div>

          {/* Visual Chart Area */}
          {result?.chart && (
            <div className="animate-fadeIn">
              <MachineLearningChart chart={result.chart} />
            </div>
          )}

          {/* Terminal Console Output */}
          <div className="bg-editor-bg border border-border rounded-lg p-3 font-mono text-xs text-editor-text min-h-[140px] max-h-[260px] overflow-y-auto space-y-1">
            <div className="text-[10px] uppercase font-bold text-text-muted/60 tracking-wider pb-1 border-b border-border/40 flex items-center justify-between">
              <span>Console Stream</span>
              {result && !result.error && (
                <span className="text-emerald-400 font-normal">Active</span>
              )}
            </div>

            {result ? (
              result.output ? (
                <pre className="whitespace-pre-wrap leading-relaxed">{result.output}</pre>
              ) : (
                <span className="text-text-muted italic block py-4 text-center">
                  (Program executed without console.log output)
                </span>
              )
            ) : (
              <span className="text-text-muted italic block py-6 text-center">
                Click "Run Code" to inspect machine learning parameters and metrics.
              </span>
            )}

            {result?.error && (
              <div className="p-2 bg-rose-500/10 border border-rose-500/30 rounded text-rose-400 text-xs">
                {result.error}
              </div>
            )}
          </div>

          {/* Verification Feedback Banner */}
          {isCorrect !== null && (
            <div
              className={cn(
                'p-3 rounded-lg border text-xs flex items-start gap-2 animate-fadeIn',
                isCorrect
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-800 dark:text-emerald-300'
                  : 'bg-rose-500/10 border-rose-500/30 text-rose-800 dark:text-rose-300'
              )}
            >
              {isCorrect ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
              )}
              <div className="space-y-1">
                <span className="font-bold block">
                  {isCorrect ? 'Verification Passed!' : 'Requires Adjustment'}
                </span>
                <p className="whitespace-pre-line text-[11px] leading-relaxed">
                  {feedbackMessage}
                </p>

                {isCorrect && onNextTask && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={onNextTask}
                    className="mt-2 text-xs gap-1 border-emerald-500/40 hover:bg-emerald-500/10"
                  >
                    <span>Proceed to Next Task</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Button>
                )}

                {isCorrect && !onNextTask && onGoToQuiz && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={onGoToQuiz}
                    className="mt-2 text-xs gap-1 border-emerald-500/40 hover:bg-emerald-500/10"
                  >
                    <span>Proceed to Concept Quiz</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
