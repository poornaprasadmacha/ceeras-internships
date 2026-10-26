import React, { useState, useEffect, useMemo, useRef } from 'react';
import { HtmlExerciseDefinition } from '../../types/htmlLesson';
import { validateHtmlCode, HtmlValidationResult } from '../../services/htmlValidator';
import { HtmlEditor } from '../../components/editor/HtmlEditor';
import { HtmlQuickChips } from '../../components/editor/HtmlQuickChips';
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
  Globe,
  ArrowRight,
  Code2,
  RefreshCw,
  ExternalLink,
  HelpCircle,
} from 'lucide-react';
import { cn } from '../../lib/utils';

export interface HtmlWorkspaceProps {
  exercise: HtmlExerciseDefinition;
  isSolved: boolean;
  onSolve: (code: string) => void;
  savedCode?: string;
  onNextTask?: () => void;
  onGoToQuiz?: () => void;
}

export function HtmlWorkspace({
  exercise,
  isSolved,
  onSolve,
  savedCode,
  onNextTask,
  onGoToQuiz,
}: HtmlWorkspaceProps) {
  const [code, setCode] = useState(savedCode || exercise.initialCode);
  const [isValidating, setIsValidating] = useState(false);
  const [validationResult, setValidationResult] = useState<HtmlValidationResult | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [copiedSolution, setCopiedSolution] = useState(false);
  const [previewKey, setPreviewKey] = useState(0);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    setCode(savedCode || exercise.initialCode);
    setValidationResult(null);
    setShowHint(false);
    setShowSolution(false);
    setCopiedSolution(false);
  }, [exercise.id, savedCode, exercise.initialCode]);

  // Construct styled iframe preview HTML
  const previewDoc = useMemo(() => {
    const isFullDoc = /<!doctype\s+html>/i.test(code) || /<html[\s>]/i.test(code);
    if (isFullDoc) {
      return code;
    }

    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    *, *::before, *::after { box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      line-height: 1.6;
      padding: 16px;
      color: #1e293b;
      background: #ffffff;
      margin: 0;
    }
    h1, h2, h3, h4, h5, h6 { color: #0f172a; margin-top: 0.6em; margin-bottom: 0.3em; line-height: 1.25; }
    h1 { font-size: 1.6rem; border-bottom: 1px solid #e2e8f0; padding-bottom: 6px; }
    h2 { font-size: 1.35rem; }
    h3 { font-size: 1.15rem; }
    p { margin-top: 0; margin-bottom: 0.8em; }
    a { color: #0284c7; text-decoration: underline; text-underline-offset: 2px; }
    a:hover { color: #0369a1; }
    img { max-width: 100%; height: auto; border-radius: 6px; display: inline-block; }
    ul, ol { padding-left: 1.4rem; margin-top: 0.4em; margin-bottom: 0.8em; }
    li { margin-bottom: 0.25em; }
    blockquote { border-left: 4px solid #0284c7; margin: 0 0 1em; padding-left: 12px; color: #475569; font-style: italic; }
    table { border-collapse: collapse; width: 100%; margin: 12px 0; font-size: 14px; }
    th, td { border: 1px solid #cbd5e1; padding: 8px 12px; text-align: left; }
    th { background: #f1f5f9; font-weight: 600; color: #334155; }
    tr:nth-child(even) td { background: #f8fafc; }
    form { display: flex; flex-direction: column; gap: 8px; max-width: 380px; }
    label { font-weight: 600; font-size: 13px; color: #334155; }
    input, select, textarea {
      width: 100%;
      border: 1px solid #cbd5e1;
      padding: 8px 10px;
      border-radius: 6px;
      font-size: 14px;
      font-family: inherit;
    }
    input[type="checkbox"], input[type="radio"] { width: auto; margin-right: 6px; }
    button {
      background: #E44D26;
      color: #ffffff;
      border: none;
      padding: 8px 16px;
      border-radius: 6px;
      cursor: pointer;
      font-weight: 600;
      font-size: 14px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      transition: background 0.15s;
    }
    button:hover { background: #c83d19; }
    hr { border: none; border-top: 1px solid #e2e8f0; margin: 16px 0; }
    mark { background-color: #fef08a; padding: 2px 4px; border-radius: 3px; }
    code { font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; background: #f1f5f9; padding: 2px 6px; border-radius: 4px; font-size: 13px; }
  </style>
</head>
<body>
${code}
</body>
</html>`;
  }, [code]);

  const handleRunValidation = () => {
    setIsValidating(true);
    setPreviewKey((k) => k + 1);

    setTimeout(() => {
      const res = validateHtmlCode(code, exercise.validationRules);
      setValidationResult(res);

      if (res.allPassed) {
        onSolve(code);
      }
      setIsValidating(false);
    }, 100);
  };

  const handleReset = () => {
    setCode(exercise.initialCode);
    setValidationResult(null);
    setShowHint(false);
    setShowSolution(false);
  };

  const handleInsertTag = (snippet: string) => {
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

  return (
    <div className="space-y-4">
      {/* Exercise Objective Header */}
      <Card className="p-4 sm:p-5 bg-surface border-border">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-border/70">
          <div>
            <div className="flex items-center gap-2">
              <Badge variant="accent" className="text-xs bg-[#E44D26]/10 text-[#E44D26] border-[#E44D26]/30">
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
              className="text-xs bg-[#E44D26] hover:bg-[#c83d19] font-semibold text-white px-4"
            >
              {isValidating ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Validating...</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Run &amp; Check Code</span>
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
              <span>Helpful Hint:</span>
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
                <span>Reference Solution:</span>
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

      {/* Split Workspace: HTML Code Editor & Live Browser Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Left Column: Code Editor */}
        <div className="space-y-2 flex flex-col">
          <HtmlQuickChips
            onInsert={handleInsertTag}
            customChips={exercise.quickChips}
          />
          <HtmlEditor
            value={code}
            onChange={setCode}
            onRun={handleRunValidation}
            minHeight="320px"
            className="flex-1 min-h-[320px]"
          />
          <div className="flex items-center justify-between text-[11px] text-text-muted px-1">
            <span>Press <kbd className="px-1.5 py-0.5 bg-subtle border border-border rounded font-mono text-[10px]">Ctrl</kbd> + <kbd className="px-1.5 py-0.5 bg-subtle border border-border rounded font-mono text-[10px]">Enter</kbd> to Run &amp; Validate</span>
            <span>{code.length} characters</span>
          </div>
        </div>

        {/* Right Column: Live Browser Sandbox Preview */}
        <div className="space-y-2 flex flex-col">
          {/* Simulated Browser Chrome */}
          <div className="border border-border rounded-lg overflow-hidden bg-surface flex flex-col flex-1 shadow-2xs">
            {/* Browser Top Bar */}
            <div className="bg-subtle border-b border-border px-3 py-2 flex items-center justify-between gap-2">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-400 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block" />
              </div>

              {/* Mock Address Bar */}
              <div className="flex-1 max-w-xs mx-auto flex items-center gap-1.5 bg-surface border border-border/80 px-2.5 py-1 rounded-md text-[11px] text-text-muted font-mono truncate">
                <Globe className="w-3 h-3 text-[#E44D26] shrink-0" />
                <span className="truncate">https://my-first-site.ceeras.dev</span>
              </div>

              {/* Refresh Preview */}
              <button
                type="button"
                onClick={() => setPreviewKey((k) => k + 1)}
                className="p-1 rounded text-text-muted hover:text-text-main hover:bg-surface transition-colors cursor-pointer"
                title="Refresh preview"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Iframe Preview Container */}
            <div className="flex-1 bg-white min-h-[320px] relative">
              <iframe
                key={previewKey}
                ref={iframeRef}
                srcDoc={previewDoc}
                title="HTML Live Webpage Preview"
                sandbox="allow-scripts"
                className="w-full h-full min-h-[320px] border-0 bg-white"
              />
            </div>
          </div>

          <div className="flex items-center justify-between text-[11px] text-text-muted px-1">
            <span className="flex items-center gap-1">
              <Globe className="w-3 h-3 text-[#E44D26]" />
              <span>Live sandboxed HTML rendering</span>
            </span>
            <span>Real-time client-side preview</span>
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
                  <div
                    key={r.ruleId}
                    className="flex items-start gap-2 text-xs"
                  >
                    {r.passed ? (
                      <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    ) : (
                      <div className="w-4 h-4 rounded-full border border-amber-400 shrink-0 mt-0.5 flex items-center justify-center text-[10px] text-amber-500">
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
