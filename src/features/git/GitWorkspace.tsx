import React, { useState, useEffect, useRef } from 'react';
import { GitExerciseDefinition, GitGraphData } from '../../types/gitLesson';
import { GitRepo } from '../../services/gitEngine';
import { GitGraph } from '../../components/charts/GitGraph';
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
  GitBranch,
  Sparkles,
  Command,
} from 'lucide-react';
import { cn } from '../../lib/utils';

export interface GitWorkspaceProps {
  exercise: GitExerciseDefinition;
  isSolved: boolean;
  onSolve: (commands: string[]) => void;
  savedCommands?: string[];
  onNextTask?: () => void;
  onGoToQuiz?: () => void;
}

export function GitWorkspace({
  exercise,
  isSolved,
  onSolve,
  onNextTask,
  onGoToQuiz,
}: GitWorkspaceProps) {
  const [repo, setRepo] = useState<GitRepo>(() => new GitRepo());
  const [graphData, setGraphData] = useState<GitGraphData>(() => repo.getGraphData());
  const [commandInput, setCommandInput] = useState('');
  const [history, setHistory] = useState<{ cmd: string; output: string }[]>([]);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [feedbackMessage, setFeedbackMessage] = useState<string>('');
  const [showHint, setShowHint] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [copiedSolution, setCopiedSolution] = useState(false);
  const [activeTab, setActiveTab] = useState<'graph' | 'terminal'>('graph');

  const terminalEndRef = useRef<HTMLDivElement>(null);

  // Reinitialize repo when exercise changes
  useEffect(() => {
    const newRepo = new GitRepo();
    setRepo(newRepo);
    setGraphData(newRepo.getGraphData());
    setCommandInput('');
    setHistory([]);
    setIsCorrect(null);
    setFeedbackMessage('');
    setShowHint(false);
    setShowSolution(false);
    setCopiedSolution(false);
    setActiveTab('graph');

    // Run initial setup commands if any
    if (exercise.initialCommands && exercise.initialCommands.length > 0) {
      const initLogs: { cmd: string; output: string }[] = [];
      for (const cmd of exercise.initialCommands) {
        const out = newRepo.execute(cmd);
        initLogs.push({ cmd, output: out });
      }
      setHistory(initLogs);
      setGraphData(newRepo.getGraphData());
    }
  }, [exercise.id]);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const executeCommand = (cmdStr: string) => {
    const trimmed = cmdStr.trim();
    if (!trimmed) return;

    const out = repo.execute(trimmed);
    const updatedHistory = [...history, { cmd: trimmed, output: out }];
    setHistory(updatedHistory);
    setCommandInput('');

    const newGraph = repo.getGraphData();
    setGraphData(newGraph);

    // Verify task requirements
    let passed = true;
    let failReason = '';

    if (exercise.expectedBranch && repo.currentBranch !== exercise.expectedBranch) {
      passed = false;
      failReason = `Expected current branch to be '${exercise.expectedBranch}', but currently on '${repo.currentBranch}'.`;
    }

    if (exercise.expectedCommitCount && newGraph.commits.length < exercise.expectedCommitCount) {
      passed = false;
      failReason = `Expected at least ${exercise.expectedCommitCount} commits, but repository has ${newGraph.commits.length}.`;
    }

    if (exercise.expectedOutputSubstring && !out.toLowerCase().includes(exercise.expectedOutputSubstring.toLowerCase())) {
      const allOutputs = updatedHistory.map((h) => h.output).join('\n').toLowerCase();
      if (!allOutputs.includes(exercise.expectedOutputSubstring.toLowerCase())) {
        passed = false;
        failReason = `Output did not contain expected signature: "${exercise.expectedOutputSubstring}".`;
      }
    }

    if (passed) {
      setIsCorrect(true);
      setFeedbackMessage('Excellent! Git repository state and command output match target requirements.');
      onSolve(updatedHistory.map((h) => h.cmd));
    } else {
      setIsCorrect(false);
      setFeedbackMessage(failReason || 'Keep going! Enter the necessary Git commands to reach the target repository state.');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      executeCommand(commandInput);
    }
  };

  const handleReset = () => {
    const newRepo = new GitRepo();
    setRepo(newRepo);
    setGraphData(newRepo.getGraphData());
    setCommandInput('');
    setHistory([]);
    setIsCorrect(null);
    setFeedbackMessage('');
    setShowHint(false);
    setShowSolution(false);

    if (exercise.initialCommands && exercise.initialCommands.length > 0) {
      const initLogs: { cmd: string; output: string }[] = [];
      for (const cmd of exercise.initialCommands) {
        const out = newRepo.execute(cmd);
        initLogs.push({ cmd, output: out });
      }
      setHistory(initLogs);
      setGraphData(newRepo.getGraphData());
    }
  };

  const handleExecuteSolution = () => {
    for (const cmd of exercise.solutionCommands) {
      executeCommand(cmd);
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
              <span className="font-semibold text-text-main">Reference Command Script:</span>
              <Button
                variant="outline"
                size="sm"
                onClick={handleExecuteSolution}
                className="text-[11px] h-6 py-0 px-2"
              >
                {copiedSolution ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-500 mr-1" />
                    Executed
                  </>
                ) : (
                  'Run All Solution Commands'
                )}
              </Button>
            </div>
            <pre className="p-2 rounded bg-surface border border-border font-mono text-[11px] overflow-x-auto text-text-main">
              {exercise.solutionCommands.join('\n')}
            </pre>
            <p className="text-text-muted text-[11px]">{exercise.explanation}</p>
          </div>
        )}

        {/* Quick Syntax Chips */}
        {exercise.quickChips && exercise.quickChips.length > 0 && (
          <div className="mt-3 pt-3 border-t border-border flex flex-wrap items-center gap-1.5">
            <span className="text-[11px] text-text-muted flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-[#F05032]" />
              Quick Commands:
            </span>
            {exercise.quickChips.map((chip, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => executeCommand(chip)}
                className="px-2 py-0.5 text-[11px] font-mono rounded bg-subtle hover:bg-subtle/80 text-text-main border border-border transition-colors cursor-pointer"
                title={`Execute: ${chip}`}
              >
                {chip}
              </button>
            ))}
          </div>
        )}
      </Card>

      {/* Interactive Terminal Window */}
      <div className="rounded-xl border border-border overflow-hidden bg-[#1E1E1E] shadow-sm">
        {/* Terminal Header */}
        <div className="flex items-center justify-between px-4 py-2 bg-[#181818] border-b border-[#2d2d2d] text-xs text-neutral-400">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
            </div>
            <span className="font-mono text-[11px] text-neutral-300 ml-2">bash: ~/project ({repo.currentBranch})</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleReset}
              className="px-2.5 py-1 text-[11px] text-neutral-400 hover:text-white rounded hover:bg-white/10 transition-colors flex items-center gap-1 cursor-pointer"
              title="Reset Sandbox"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          </div>
        </div>

        {/* Terminal Output History */}
        <div className="p-4 font-mono text-xs text-neutral-200 min-h-[160px] max-h-[260px] overflow-y-auto space-y-2 leading-relaxed">
          <div className="text-neutral-500 text-[11px]">
            Ceeras Client-Side Git v2.44.0 Sandbox Initialized.
            Type git commands or click quick chips above.
          </div>

          {history.map((h, i) => (
            <div key={i} className="space-y-1">
              <div className="flex items-center gap-1.5 text-emerald-400">
                <span className="text-neutral-500">user@ceeras:~/project$</span>
                <span>{h.cmd}</span>
              </div>
              {h.output && (
                <div className="text-neutral-300 whitespace-pre-wrap pl-2 border-l border-neutral-700">
                  {h.output}
                </div>
              )}
            </div>
          ))}
          <div ref={terminalEndRef} />
        </div>

        {/* Interactive CLI Input Bar */}
        <div className="flex items-center px-4 py-2.5 bg-[#181818] border-t border-[#2d2d2d] gap-2">
          <span className="font-mono text-xs text-emerald-400 shrink-0">
            user@ceeras:~/project$
          </span>
          <input
            type="text"
            value={commandInput}
            onChange={(e) => setCommandInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="git status, git add ., git commit -m '...'"
            className="flex-1 bg-transparent font-mono text-xs text-white focus:outline-hidden placeholder:text-neutral-600"
          />
          <Button
            variant="primary"
            size="sm"
            onClick={() => executeCommand(commandInput)}
            className="text-xs bg-[#F05032] hover:bg-[#d44327] text-white font-medium"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Enter</span>
          </Button>
        </div>
      </div>

      {/* Output Panel with Tab Bar */}
      <div className="rounded-xl border border-border overflow-hidden bg-surface shadow-xs">
        <div className="flex items-center justify-between px-3 py-2 bg-subtle border-b border-border">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setActiveTab('graph')}
              className={cn(
                'px-3 py-1 rounded-md text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer',
                activeTab === 'graph'
                  ? 'bg-surface text-primary border border-border shadow-xs'
                  : 'text-text-muted hover:text-text-main'
              )}
            >
              <GitBranch className="w-3.5 h-3.5" />
              <span>Interactive Git Graph &amp; Staging Tree</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('terminal')}
              className={cn(
                'px-3 py-1 rounded-md text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer',
                activeTab === 'terminal'
                  ? 'bg-surface text-primary border border-border shadow-xs'
                  : 'text-text-muted hover:text-text-main'
              )}
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>Full Output Log</span>
            </button>
          </div>

          <span className="text-[11px] font-mono text-text-muted">
            Branch: {repo.currentBranch}
          </span>
        </div>

        {/* Tab Content */}
        <div className="p-3">
          {activeTab === 'graph' ? (
            <GitGraph data={graphData} />
          ) : (
            <div className="font-mono text-xs bg-subtle/50 p-3 rounded-lg border border-border min-h-[140px] max-h-[300px] overflow-y-auto whitespace-pre-wrap text-text-main">
              {history.length > 0 ? (
                history.map((h, i) => `${h.cmd}\n${h.output || '(no output)'}`).join('\n\n')
              ) : (
                <span className="text-text-muted italic">No terminal history. Run a command above...</span>
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
                  {isCorrect ? 'Correct!' : 'Check your repository state:'}
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
