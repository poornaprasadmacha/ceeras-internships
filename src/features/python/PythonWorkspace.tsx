import React, { useState, useEffect } from 'react';
import { PythonExerciseDefinition } from '../../types/pythonLesson';
import { executePythonCode, PythonExecutionResult } from '../../services/pythonEngine';
import { PythonEditor } from '../../components/editor/PythonEditor';
import { PythonQuickChips } from '../../components/editor/PythonQuickChips';
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
  Sparkles,
  HelpCircle,
} from 'lucide-react';
import { cn } from '../../lib/utils';

export interface PythonWorkspaceProps {
  exercise: PythonExerciseDefinition;
  isSolved: boolean;
  onSolve: (code: string) => void;
  savedCode?: string;
  onNextTask?: () => void;
  onGoToQuiz?: () => void;
}

export function PythonWorkspace({
  exercise,
  isSolved,
  onSolve,
  savedCode,
  onNextTask,
  onGoToQuiz,
}: PythonWorkspaceProps) {
  const [code, setCode] = useState(savedCode || exercise.initialCode);
  const [isRunning, setIsRunning] = useState(false);
  const [result, setResult] = useState<PythonExecutionResult | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [feedbackMessage, setFeedbackMessage] = useState<string>('');
  const [showHint, setShowHint] = useState(false);
  const [showSolution, setShowSolution] = useState(false);

  useEffect(() => {
    setCode(savedCode || exercise.initialCode);
    setResult(null);
    setIsCorrect(null);
    setFeedbackMessage('');
    setShowHint(false);
    setShowSolution(false);
  }, [exercise.id, savedCode, exercise.initialCode]);

  const handleRunCode = async () => {
    setIsRunning(true);
    setIsCorrect(null);
    setFeedbackMessage('');

    // Brief timeout so UI registers the running state
    await new Promise((r) => setTimeout(r, 40));

    try {
      const res = await executePythonCode(code);
      setResult(res);

      if (res.error) {
        setIsCorrect(false);
        setFeedbackMessage(res.error);
        return;
      }

      // Output matching verification
      const cleanActual = res.output.trim().replace(/\r\n/g, '\n');
      const cleanExpected = exercise.expectedOutput.trim().replace(/\r\n/g, '\n');

      if (cleanActual === cleanExpected) {
        setIsCorrect(true);
        setFeedbackMessage('Great job! Your program output matches the target perfectly.');
        onSolve(code);
      } else {
        setIsCorrect(false);
        setFeedbackMessage(
          `Output mismatch. Expected:\n"${cleanExpected}"\n\nYour program printed:\n"${cleanActual}"`
        );
      }
    } catch (err: any) {
      setResult({
        output: '',
        error: err?.message || String(err),
        executionTimeMs: 0,
      });
      setIsCorrect(false);
      setFeedbackMessage(err?.message || 'Error executing Python code.');
    } finally {
      setIsRunning(false);
    }
  };

  const handleReset = () => {
    setCode(exercise.initialCode);
    setResult(null);
    setIsCorrect(null);
    setFeedbackMessage('');
  };

  const handleApplySolution = () => {
    setCode(exercise.solutionCode);
    setShowSolution(false);
  };

  const handleInsertSnippet = (snippet: string) => {
    setCode((prev) => {
      if (!prev || prev.trim() === '') return snippet;
      if (/\s$/.test(prev) || prev.endsWith('\n')) return prev + snippet;
      return prev + ' ' + snippet;
    });
  };

  return (
    <div className="space-y-4">
      {/* Objective Card */}
      <Card className="p-4 bg-surface border-border shadow-subtle">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-primary uppercase tracking-wide">
                Python Goal
              </span>
              {isSolved && (
                <Badge variant="success" size="sm">
                  <Check className="w-3 h-3" />
                  <span>Solved</span>
                </Badge>
              )}
            </div>
            <p className="text-sm font-semibold text-text-main leading-relaxed">
              {exercise.objective}
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
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

        {/* Expected Output Target */}
        <div className="mt-3 p-2.5 bg-subtle/80 border border-border/70 rounded-lg text-xs space-y-1">
          <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider block">
            Target Terminal Output:
          </span>
          <pre className="font-mono text-xs text-text-main font-semibold whitespace-pre-wrap">
            {exercise.expectedOutput}
          </pre>
        </div>

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
                Copy into Editor
              </Button>
            </div>
            <pre className="p-2.5 bg-editor-bg border border-border rounded-lg font-mono text-xs text-editor-text font-bold overflow-x-auto whitespace-pre-wrap">
              {exercise.solutionCode}
            </pre>
            <p className="text-text-muted leading-relaxed">{exercise.explanation}</p>
          </div>
        )}
      </Card>

      {/* Code Editor */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs text-text-muted px-1">
          <span className="font-semibold text-text-main">Python 3 Workspace</span>
          <span className="font-mono text-[11px] text-text-muted">Ctrl + Enter to Run</span>
        </div>

        <div className="rounded-xl border border-border overflow-hidden bg-surface shadow-subtle">
          <PythonQuickChips
            onInsert={handleInsertSnippet}
            customChips={exercise.quickChips}
          />

          <PythonEditor
            value={code}
            onChange={setCode}
            onRun={handleRunCode}
            disabled={isRunning}
            minHeight="140px"
            className="border-0 rounded-none"
          />

          <div className="p-2.5 bg-subtle/50 border-t border-border flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <Button
                variant="primary"
                size="sm"
                onClick={handleRunCode}
                disabled={isRunning}
                className="text-xs"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>{isRunning ? 'Running...' : 'Run Python'}</span>
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={handleReset}
                disabled={isRunning}
                className="text-xs text-text-muted"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </Button>
            </div>

            {result && !result.error && (
              <span className="text-[11px] text-text-muted font-mono">
                Executed in {result.executionTimeMs} ms
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Feedback Banner */}
      {isCorrect !== null && (
        <div
          className={cn(
            'p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all text-xs leading-relaxed animate-fadeIn',
            isCorrect
              ? 'bg-success-subtle border-success/40 text-text-main'
              : 'bg-warning-subtle border-warning/40 text-text-main'
          )}
        >
          <div className="flex items-start gap-3">
            {isCorrect ? (
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
                  {isCorrect ? 'Output Matched! Awesome Work!' : 'Not Quite There Yet'}
                </p>
                {isCorrect && (
                  <Badge variant="success" size="sm">
                    Verified
                  </Badge>
                )}
              </div>
              <pre className="font-mono text-xs whitespace-pre-wrap">{feedbackMessage}</pre>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
            {isCorrect ? (
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

      {/* Terminal Output Console */}
      <div className="space-y-1.5">
        <div className="flex items-center gap-1.5 text-xs text-text-muted px-1">
          <Terminal className="w-3.5 h-3.5 text-primary" />
          <span className="font-semibold text-text-main">Standard Output (Console)</span>
        </div>

        <div className="p-3 bg-editor-bg border border-border rounded-xl font-mono text-xs min-h-[80px] max-h-60 overflow-y-auto scrollbar-thin text-editor-text">
          {result?.error ? (
            <span className="text-error font-semibold whitespace-pre-wrap">{result.error}</span>
          ) : result?.output ? (
            <span className="whitespace-pre-wrap">{result.output}</span>
          ) : (
            <span className="text-text-muted italic">
              Click &quot;Run Python&quot; to execute code and view terminal output.
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
