import React, { useState, useEffect } from 'react';
import { VsCodeExerciseDefinition, VsCodeIdeState } from '../../types/vscodeLesson';
import { VsCodeEngine } from '../../services/vscodeEngine';
import { VsCodeSimulator } from '../../components/charts/VsCodeSimulator';
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
  ArrowRight,
  Code2,
  Sparkles,
} from 'lucide-react';
import { cn } from '../../lib/utils';

export interface VsCodeWorkspaceProps {
  exercise: VsCodeExerciseDefinition;
  isSolved: boolean;
  onSolve: (state: VsCodeIdeState) => void;
  onNextTask?: () => void;
  onGoToQuiz?: () => void;
}

export function VsCodeWorkspace({
  exercise,
  isSolved,
  onSolve,
  onNextTask,
  onGoToQuiz,
}: VsCodeWorkspaceProps) {
  const [engine, setEngine] = useState<VsCodeEngine>(() => new VsCodeEngine(exercise.initialState));
  const [ideState, setIdeState] = useState<VsCodeIdeState>(() => engine.getState());
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [feedbackMessage, setFeedbackMessage] = useState<string>('');
  const [showHint, setShowHint] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [copiedSolution, setCopiedSolution] = useState(false);

  useEffect(() => {
    const newEngine = new VsCodeEngine(exercise.initialState);
    setEngine(newEngine);
    setIdeState(newEngine.getState());
    setIsCorrect(null);
    setFeedbackMessage('');
    setShowHint(false);
    setShowSolution(false);
  }, [exercise.id]);

  const verifyState = (currentState: VsCodeIdeState) => {
    try {
      const passed = exercise.expectedStateMatch(currentState);
      if (passed) {
        setIsCorrect(true);
        setFeedbackMessage('Great job! The VS Code workspace matches the required configuration and state.');
        onSolve(currentState);
      } else {
        setIsCorrect(false);
        setFeedbackMessage('Workspace state does not match the target objective yet. Review the hint or instructions.');
      }
    } catch (err: any) {
      setIsCorrect(false);
      setFeedbackMessage(err?.message || 'Verification error encountered.');
    }
  };

  const handleOpenFile = (path: string) => {
    engine.openFile(path);
    const updated = engine.getState();
    setIdeState(updated);
    verifyState(updated);
  };

  const handleCloseTab = (path: string) => {
    engine.closeTab(path);
    const updated = engine.getState();
    setIdeState(updated);
    verifyState(updated);
  };

  const handleSwitchSidebar = (sidebar: VsCodeIdeState['activeSidebar']) => {
    engine.switchSidebar(sidebar);
    const updated = engine.getState();
    setIdeState(updated);
    verifyState(updated);
  };

  const handleUpdateContent = (path: string, content: string) => {
    engine.updateContent(path, content);
    const updated = engine.getState();
    setIdeState(updated);
    verifyState(updated);
  };

  const handleRunCommand = (cmd: string) => {
    engine.runCommand(cmd);
    const updated = engine.getState();
    setIdeState(updated);
    verifyState(updated);
  };

  const handleReset = () => {
    const newEngine = new VsCodeEngine(exercise.initialState);
    setEngine(newEngine);
    const s = newEngine.getState();
    setIdeState(s);
    setIsCorrect(null);
    setFeedbackMessage('');
    setShowHint(false);
    setShowSolution(false);
  };

  const handleExecuteSolutionAction = () => {
    // Perform standard solution resolution
    if (exercise.solutionAction.includes('settings.json')) {
      handleOpenFile('.vscode/settings.json');
    } else if (exercise.solutionAction.includes('format')) {
      handleRunCommand('editor.action.formatDocument');
    } else if (exercise.solutionAction.includes('terminal')) {
      handleRunCommand('workbench.action.terminal.toggleTerminal');
    } else if (exercise.solutionAction.includes('explorer')) {
      handleSwitchSidebar('explorer');
    } else if (exercise.solutionAction.includes('launch.json')) {
      handleOpenFile('.vscode/launch.json');
    } else {
      handleRunCommand(exercise.solutionAction);
    }
    setCopiedSolution(true);
    setTimeout(() => setCopiedSolution(false), 2000);
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
              <span className="font-semibold text-text-main">Model Action:</span>
              <Button
                variant="outline"
                size="sm"
                onClick={handleExecuteSolutionAction}
                className="text-[11px] h-6 py-0 px-2"
              >
                {copiedSolution ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-500 mr-1" />
                    Applied
                  </>
                ) : (
                  'Apply Solution'
                )}
              </Button>
            </div>
            <pre className="p-2 rounded bg-surface border border-border font-mono text-[11px] overflow-x-auto text-text-main">
              {exercise.solutionAction}
            </pre>
            <p className="text-text-muted text-[11px]">{exercise.explanation}</p>
          </div>
        )}

        {/* Quick Action Chips */}
        {exercise.quickChips && exercise.quickChips.length > 0 && (
          <div className="mt-3 pt-3 border-t border-border flex flex-wrap items-center gap-1.5">
            <span className="text-[11px] text-text-muted flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-[#007ACC]" />
              Quick Actions:
            </span>
            {exercise.quickChips.map((chip, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  if (chip.includes('settings.json')) handleOpenFile('.vscode/settings.json');
                  else if (chip.includes('launch.json')) handleOpenFile('.vscode/launch.json');
                  else if (chip.includes('format')) handleRunCommand('editor.action.formatDocument');
                  else if (chip.includes('terminal')) handleRunCommand('workbench.action.terminal.toggleTerminal');
                  else if (chip.includes('explorer')) handleSwitchSidebar('explorer');
                  else handleOpenFile(chip);
                }}
                className="px-2 py-0.5 text-[11px] font-mono rounded bg-subtle hover:bg-subtle/80 text-text-main border border-border transition-colors cursor-pointer"
                title={`Trigger: ${chip}`}
              >
                {chip}
              </button>
            ))}
          </div>
        )}
      </Card>

      {/* Interactive VS Code Simulator View */}
      <VsCodeSimulator
        state={ideState}
        onOpenFile={handleOpenFile}
        onCloseTab={handleCloseTab}
        onSwitchSidebar={handleSwitchSidebar}
        onUpdateContent={handleUpdateContent}
        onRunCommand={handleRunCommand}
      />

      {/* Control Strip & Verification Banner */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-3 bg-surface rounded-xl border border-border">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleReset}
            className="text-xs"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Workspace</span>
          </Button>

          <Button
            variant="primary"
            size="sm"
            onClick={() => verifyState(ideState)}
            className="text-xs bg-[#007ACC] hover:bg-[#005A9E] text-white"
          >
            <Play className="w-3.5 h-3.5" />
            <span>Check Solution</span>
          </Button>
        </div>

        {isCorrect !== null && (
          <div className="flex items-center gap-2">
            {isCorrect ? (
              <div className="flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
                <CheckCircle2 className="w-4 h-4" />
                <span>{feedbackMessage}</span>
              </div>
            ) : (
              <div className="flex items-center gap-1.5 text-xs text-rose-600 dark:text-rose-400 font-semibold">
                <AlertCircle className="w-4 h-4" />
                <span>{feedbackMessage}</span>
              </div>
            )}

            {isCorrect && (
              <div className="ml-2">
                {onNextTask ? (
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={onNextTask}
                    className="text-xs bg-emerald-600 hover:bg-emerald-700 text-white"
                  >
                    <span>Next Task</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </Button>
                ) : onGoToQuiz ? (
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={onGoToQuiz}
                    className="text-xs bg-emerald-600 hover:bg-emerald-700 text-white"
                  >
                    <span>Take Quiz</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1" />
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
