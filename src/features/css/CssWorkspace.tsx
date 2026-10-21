import React, { useState, useEffect, useMemo, useRef } from 'react';
import { CssExerciseDefinition } from '../../types/cssLesson';
import { validateCssCode, CssValidationResult } from '../../services/cssValidator';
import { CssEditor } from '../../components/editor/CssEditor';
import { CssQuickChips } from '../../components/editor/CssQuickChips';
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
  RefreshCw,
  Palette,
  ArrowRight,
  Code2,
} from 'lucide-react';
import { cn } from '../../lib/utils';

export interface CssWorkspaceProps {
  exercise: CssExerciseDefinition;
  isSolved: boolean;
  onSolve: (css: string) => void;
  savedCss?: string;
  onNextTask?: () => void;
  onGoToQuiz?: () => void;
}

export function CssWorkspace({
  exercise,
  isSolved,
  onSolve,
  savedCss,
  onNextTask,
  onGoToQuiz,
}: CssWorkspaceProps) {
  const [cssCode, setCssCode] = useState(savedCss || exercise.initialCss);
  const [isValidating, setIsValidating] = useState(false);
  const [validationResult, setValidationResult] = useState<CssValidationResult | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [copiedSolution, setCopiedSolution] = useState(false);
  const [editorTab, setEditorTab] = useState<'css' | 'html'>('css');
  const [previewKey, setPreviewKey] = useState(0);

  useEffect(() => {
    setCssCode(savedCss || exercise.initialCss);
    setValidationResult(null);
    setShowHint(false);
    setShowSolution(false);
    setCopiedSolution(false);
    setEditorTab('css');
  }, [exercise.id, savedCss, exercise.initialCss]);

  // Combined HTML + CSS rendered document
  const previewDoc = useMemo(() => {
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    *, *::before, *::after { box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      margin: 0;
      padding: 20px;
      background: #f8fafc;
      color: #0f172a;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
    }
    /* Default resets for target container */
    #target-canvas {
      width: 100%;
      max-width: 540px;
    }
  </style>
  <style id="student-live-css">
${cssCode}
  </style>
</head>
<body>
  <div id="target-canvas">
${exercise.htmlSnippet}
  </div>
</body>
</html>`;
  }, [cssCode, exercise.htmlSnippet]);

  const handleRunValidation = () => {
    setIsValidating(true);
    setPreviewKey((k) => k + 1);

    setTimeout(() => {
      const res = validateCssCode(cssCode, exercise.htmlSnippet, exercise.validationRules);
      setValidationResult(res);

      if (res.allPassed) {
        onSolve(cssCode);
      }
      setIsValidating(false);
    }, 100);
  };

  const handleReset = () => {
    setCssCode(exercise.initialCss);
    setValidationResult(null);
    setShowHint(false);
    setShowSolution(false);
  };

  const handleInsertSnippet = (snippet: string) => {
    setCssCode((prev) => prev + snippet);
  };

  const handleCopySolution = () => {
    navigator.clipboard.writeText(exercise.solutionCss);
    setCopiedSolution(true);
    setTimeout(() => setCopiedSolution(false), 2000);
  };

  const handleUseSolution = () => {
    setCssCode(exercise.solutionCss);
  };

  return (
    <div className="space-y-4">
      {/* Exercise Objective Header */}
      <Card className="p-4 sm:p-5 bg-surface border-border">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-border/70">
          <div>
            <div className="flex items-center gap-2">
              <Badge variant="accent" className="text-xs bg-[#1572B6]/10 text-[#1572B6] border-[#1572B6]/30">
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
              onClick={handleRunValidation}
              disabled={isValidating}
              className="text-xs bg-[#1572B6] hover:bg-[#10568a] font-semibold text-white px-4"
            >
              {isValidating ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Checking...</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Run &amp; Apply Styles</span>
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Hint Box */}
        {showHint && (
          <div className="mt-3 p-3 bg-amber-500/10 border border-amber-500/30 rounded-lg text-xs text-amber-900 dark:text-amber-200 animate-fadeIn space-y-1">
            <div className="flex items-center gap-1.5 font-bold">
              <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
              <span>Styling Hint:</span>
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
                <span>Reference CSS Solution:</span>
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
                  Apply into Editor
                </Button>
              </div>
            </div>
            <pre className="p-2.5 bg-editor-bg border border-border rounded font-mono text-[11px] text-editor-text overflow-x-auto leading-relaxed">
              <code>{exercise.solutionCss}</code>
            </pre>
            <p className="text-[11px] text-text-muted leading-relaxed pl-0.5">
              {exercise.explanation}
            </p>
          </div>
        )}
      </Card>

      {/* Split Workspace: CSS Editor on Left / Live Styled Component on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Left Column: CSS Editor with HTML Preview Toggle */}
        <div className="space-y-2 flex flex-col">
          {/* Sub-tabs: Edit CSS vs View HTML Snippet */}
          <div className="flex items-center justify-between bg-subtle px-2 py-1 rounded-t-md border border-border border-b-0">
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setEditorTab('css')}
                className={cn(
                  'px-3 py-1 rounded text-xs font-semibold transition-colors cursor-pointer',
                  editorTab === 'css'
                    ? 'bg-surface text-[#1572B6] shadow-2xs'
                    : 'text-text-muted hover:text-text-main'
                )}
              >
                styles.css
              </button>
              <button
                type="button"
                onClick={() => setEditorTab('html')}
                className={cn(
                  'px-3 py-1 rounded text-xs font-semibold transition-colors cursor-pointer',
                  editorTab === 'html'
                    ? 'bg-surface text-text-main shadow-2xs'
                    : 'text-text-muted hover:text-text-main'
                )}
              >
                Target HTML Snippet
              </button>
            </div>
            <span className="text-[10px] text-text-muted font-mono hidden sm:inline">
              {editorTab === 'css' ? `${cssCode.length} chars` : 'Read-only context'}
            </span>
          </div>

          {editorTab === 'css' ? (
            <>
              <CssQuickChips
                onInsert={handleInsertSnippet}
                customChips={exercise.quickChips}
              />
              <CssEditor
                value={cssCode}
                onChange={setCssCode}
                onRun={handleRunValidation}
                minHeight="300px"
                className="flex-1 min-h-[300px]"
              />
            </>
          ) : (
            <div className="p-3 bg-editor-bg border border-border rounded-b-lg font-mono text-xs text-editor-text overflow-x-auto min-h-[350px] leading-relaxed">
              <div className="text-[11px] text-text-muted mb-2 font-sans italic">
                Target HTML structure rendered in the live visualizer:
              </div>
              <pre>
                <code>{exercise.htmlSnippet}</code>
              </pre>
            </div>
          )}

          <div className="flex items-center justify-between text-[11px] text-text-muted px-1">
            <span>Press <kbd className="px-1.5 py-0.5 bg-subtle border border-border rounded font-mono text-[10px]">Ctrl</kbd> + <kbd className="px-1.5 py-0.5 bg-subtle border border-border rounded font-mono text-[10px]">Enter</kbd> to Run &amp; Test</span>
            <span>Real-time CSS execution</span>
          </div>
        </div>

        {/* Right Column: Live Styled Component Preview */}
        <div className="space-y-2 flex flex-col">
          <div className="border border-border rounded-lg overflow-hidden bg-surface flex flex-col flex-1 shadow-2xs">
            {/* Visual Canvas Topbar */}
            <div className="bg-subtle border-b border-border px-3 py-2 flex items-center justify-between gap-2 select-none">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-400 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block" />
              </div>

              <div className="flex items-center gap-1.5 text-xs font-semibold text-text-main">
                <Palette className="w-3.5 h-3.5 text-[#1572B6]" />
                <span>Live Component Visualizer</span>
              </div>

              <button
                type="button"
                onClick={() => setPreviewKey((k) => k + 1)}
                className="p-1 rounded text-text-muted hover:text-text-main hover:bg-surface transition-colors cursor-pointer"
                title="Refresh preview canvas"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Iframe Styled Canvas */}
            <div className="flex-1 bg-[#f8fafc] min-h-[320px] relative">
              <iframe
                key={previewKey}
                srcDoc={previewDoc}
                title="CSS Live Visual Preview"
                sandbox="allow-scripts"
                className="w-full h-full min-h-[320px] border-0"
              />
            </div>
          </div>

          <div className="flex items-center justify-between text-[11px] text-text-muted px-1">
            <span>Instant visual reactivity</span>
            <span className="text-[#1572B6] font-medium">Rendered in-browser</span>
          </div>
        </div>
      </div>

      {/* Validation Checklist / Results */}
      {validationResult && (
        <Card
          className={cn(
            'p-4 border transition-all animate-fadeIn',
            validationResult.allPassed
              ? 'bg-emerald-500/5 border-emerald-500/30'
              : 'bg-amber-500/5 border-amber-500/30'
          )}
        >
          <div className="flex items-start justify-between gap-3">
            <div className="space-y-2 flex-1">
              <div className="flex items-center gap-2">
                {validationResult.allPassed ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
                )}
                <span
                  className={cn(
                    'font-bold text-sm',
                    validationResult.allPassed ? 'text-emerald-700 dark:text-emerald-300' : 'text-amber-700 dark:text-amber-300'
                  )}
                >
                  {validationResult.summary}
                </span>
              </div>

              {/* Checklist items */}
              <div className="space-y-1.5 pt-1 pl-1">
                {validationResult.results.map((r) => (
                  <div key={r.ruleId} className="flex items-start gap-2 text-xs">
                    {r.passed ? (
                      <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    ) : (
                      <div className="w-4 h-4 rounded-full border border-amber-400 shrink-0 mt-0.5 flex items-center justify-center text-[10px] text-amber-500 font-bold">
                        !
                      </div>
                    )}
                    <div>
                      <span
                        className={cn(
                          'leading-tight',
                          r.passed
                            ? 'text-text-main line-through opacity-80'
                            : 'text-amber-800 dark:text-amber-200 font-medium'
                        )}
                      >
                        {r.description}
                      </span>
                      {!r.passed && r.message && (
                        <p className="text-[11px] text-amber-600 dark:text-amber-400 mt-0.5 pl-0.5">
                          {r.message}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Next Step Action Button */}
            {validationResult.allPassed && (
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
