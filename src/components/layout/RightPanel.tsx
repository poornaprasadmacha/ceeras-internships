import React from 'react';
import { X, CheckCircle, Lightbulb, Target, Table } from 'lucide-react';
import { LessonDefinition } from '../../types/lesson';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { ProgressBar } from '../ui/ProgressBar';

export interface RightPanelProps {
  lesson?: LessonDefinition;
  activeExerciseIndex?: number;
  solvedExerciseIds?: Set<string>;
  isOpen: boolean;
  onClose: () => void;
}

export function RightPanel({
  lesson,
  activeExerciseIndex = 0,
  solvedExerciseIds = new Set(),
  isOpen,
  onClose,
}: RightPanelProps) {
  if (!isOpen || !lesson) return null;

  const currentExercise = lesson.exercises[activeExerciseIndex];
  const totalExercises = lesson.exercises.length;
  const solvedCount = lesson.exercises.filter((e) => solvedExerciseIds.has(e.id)).length;
  const completionPct = totalExercises > 0 ? Math.round((solvedCount / totalExercises) * 100) : 0;

  return (
    <aside className="w-80 border-l border-border bg-surface flex flex-col h-[calc(100vh-3.5rem)] sticky top-14 overflow-y-auto shrink-0 shadow-subtle p-4 space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border pb-3">
        <div className="flex items-center gap-2">
          <Target className="w-4 h-4 text-primary" />
          <h3 className="text-sm font-semibold text-text-main">Learning Companion</h3>
        </div>
        <button
          onClick={onClose}
          className="p-1 text-text-muted hover:text-text-main cursor-pointer"
          aria-label="Close companion guide"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Lesson Progress */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-xs font-medium text-text-muted">
          <span>Exercise Progress</span>
          <span className="font-mono text-text-main">
            {solvedCount} / {totalExercises} Solved
          </span>
        </div>
        <ProgressBar value={completionPct} showPercentage={false} size="sm" />
      </div>

      {/* Target Dataset Schema Overview */}
      <div className="space-y-2">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-text-main">
          <Table className="w-3.5 h-3.5 text-secondary" />
          <span>Table Schema: {lesson.dataset.tableName}</span>
        </div>
        <Card variant="subtle" className="p-3 space-y-2">
          <div className="text-[11px] font-mono text-text-main divide-y divide-border/60">
            {lesson.dataset.sampleColumns.map((col) => (
              <div key={col} className="py-1 flex items-center justify-between">
                <span className="font-semibold text-text-main">{col}</span>
                <span className="text-[10px] text-text-muted">attribute</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Current Exercise Hint */}
      {currentExercise && (
        <div className="space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-text-main">
            <Lightbulb className="w-3.5 h-3.5 text-warning" />
            <span>Task Guidance</span>
          </div>
          <Card variant="subtle" className="p-3 text-xs text-text-muted leading-relaxed">
            <p className="font-medium text-text-main mb-1">{currentExercise.title}</p>
            <p>{currentExercise.hint}</p>
          </Card>
        </div>
      )}

      {/* Learning Objectives */}
      <div className="space-y-2">
        <span className="text-xs font-semibold text-text-main block">Learning Objectives</span>
        <ul className="space-y-2 text-xs text-text-muted">
          {lesson.learningObjectives.map((obj, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
              <span>{obj}</span>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
