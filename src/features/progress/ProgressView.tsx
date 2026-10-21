import React, { useState, useRef } from 'react';
import { useProgress } from '../../hooks/useProgress';
import { LESSON_MANIFEST } from '../../data/lessons';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { ProgressBar } from '../../components/ui/ProgressBar';
import { Modal } from '../../components/ui/Modal';
import {
  BarChart2,
  Download,
  Upload,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  Clock,
  ShieldCheck,
  Check,
} from 'lucide-react';
import { formatDate } from '../../lib/utils';
import { ExportData } from '../../types/progress';

export function ProgressView() {
  const {
    stats,
    lessonsProgress,
    exerciseAttempts,
    quizAttempts,
    exportProgressJson,
    importProgressJson,
    resetProgress,
  } = useProgress();

  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [importFeedback, setImportFeedback] = useState<{ success: boolean; message: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleExport = async () => {
    try {
      const data = await exportProgressJson();
      const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(data, null, 2))}`;
      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute('href', jsonString);
      downloadAnchor.setAttribute('download', `querypath_progress_${new Date().toISOString().slice(0, 10)}.json`);
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
    } catch (err: any) {
      console.error('Failed to export progress:', err);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const text = await file.text();
      const parsed: ExportData = JSON.parse(text);
      const res = await importProgressJson(parsed);

      if (res.success) {
        setImportFeedback({ success: true, message: 'Progress successfully restored from backup.' });
      } else {
        setImportFeedback({ success: false, message: res.error || 'Failed to restore progress.' });
      }
    } catch {
      setImportFeedback({ success: false, message: 'Invalid JSON file format.' });
    } finally {
      if (fileInputRef.current) fileInputRef.current.value = '';
      setTimeout(() => setImportFeedback(null), 4000);
    }
  };

  const handleConfirmReset = async () => {
    await resetProgress();
    setIsResetModalOpen(false);
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="border-b border-border pb-6 space-y-2">
        <Badge variant="accent" size="sm">
          Analytics & Backups
        </Badge>
        <h1 className="font-raleway text-2xl sm:text-3xl font-bold tracking-tight text-text-main flex items-center gap-3">
          <BarChart2 className="w-7 h-7 text-primary" />
          <span>Progress & Milestones</span>
        </h1>
        <p className="text-sm text-text-muted max-w-2xl leading-relaxed">
          Detailed metrics calculated dynamically from your local IndexedDB database. Your learning data never leaves your browser.
        </p>
      </div>

      {/* Progress Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-5 space-y-3">
          <span className="text-xs font-semibold text-text-muted uppercase tracking-wider block">
            Course Completion
          </span>
          <div className="text-3xl font-bold font-mono text-text-main">
            {stats.coursePercentage}%
          </div>
          <ProgressBar value={stats.coursePercentage} showPercentage={false} size="sm" />
          <p className="text-xs text-text-muted">
            {stats.completedLessons} of {stats.totalLessons} lessons completed
          </p>
        </Card>

        <Card className="p-5 space-y-3">
          <span className="text-xs font-semibold text-text-muted uppercase tracking-wider block">
            Exercises Solved
          </span>
          <div className="text-3xl font-bold font-mono text-text-main">
            {stats.solvedExercises} / {stats.totalExercises}
          </div>
          <ProgressBar value={stats.exercisePercentage} showPercentage={false} size="sm" />
          <p className="text-xs text-text-muted">
            {stats.exercisePercentage}% of hands-on queries solved
          </p>
        </Card>

        <Card className="p-5 space-y-3">
          <span className="text-xs font-semibold text-text-muted uppercase tracking-wider block">
            Study Streak
          </span>
          <div className="text-3xl font-bold font-mono text-text-main">
            {stats.currentStreakDays} {stats.currentStreakDays === 1 ? 'Day' : 'Days'}
          </div>
          <p className="text-xs text-text-muted pt-2 leading-relaxed">
            Derived from consecutive activity timestamps on this device.
          </p>
        </Card>
      </div>

      {/* Detailed Lesson Breakdown Table */}
      <div className="space-y-4">
        <h2 className="text-base font-bold text-text-main">Curriculum Breakdown</h2>
        <div className="border border-border rounded-lg overflow-x-auto bg-surface shadow-subtle">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-subtle border-b border-border text-text-main font-semibold">
                <th className="py-3 px-4">Lesson</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Tasks Solved</th>
                <th className="py-3 px-4">Quiz Status</th>
                <th className="py-3 px-4">Last Activity</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {LESSON_MANIFEST.map((lesson) => {
                const prog = lessonsProgress[lesson.id];
                const quiz = quizAttempts[`quiz_${lesson.id}`];
                const solvedTasks = lesson.exercises.filter((e) => exerciseAttempts[e.id]?.isSolved).length;

                return (
                  <tr key={lesson.id} className="hover:bg-subtle/40 transition-colors">
                    <td className="py-3 px-4 font-medium text-text-main">
                      Lesson {lesson.number}: {lesson.title}
                    </td>
                    <td className="py-3 px-4">
                      {prog?.isCompleted ? (
                        <Badge variant="success" size="sm">
                          Completed
                        </Badge>
                      ) : prog?.isStarted ? (
                        <Badge variant="accent" size="sm">
                          In Progress
                        </Badge>
                      ) : (
                        <Badge variant="outline" size="sm">
                          Not Started
                        </Badge>
                      )}
                    </td>
                    <td className="py-3 px-4 font-mono">
                      {solvedTasks} / {lesson.exercises.length}
                    </td>
                    <td className="py-3 px-4">
                      {quiz ? (
                        <span className={quiz.passed ? 'text-success font-medium' : 'text-warning font-medium'}>
                          {quiz.percentage}% ({quiz.passed ? 'Passed' : 'Needs Retake'})
                        </span>
                      ) : (
                        <span className="text-text-muted">Not taken</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-text-muted">
                      {formatDate(prog?.lastAccessedAt)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Backup and Data Management */}
      <div className="space-y-4 pt-4 border-t border-border">
        <h2 className="text-base font-bold text-text-main">Data Management & Portability</h2>

        {importFeedback && (
          <div
            className={`p-4 rounded-lg border text-xs leading-relaxed flex items-center gap-2 ${
              importFeedback.success
                ? 'bg-success-subtle border-success/40 text-text-main'
                : 'bg-error-subtle border-error/40 text-text-main'
            }`}
          >
            {importFeedback.success ? (
              <CheckCircle2 className="w-4 h-4 text-success" />
            ) : (
              <AlertTriangle className="w-4 h-4 text-error" />
            )}
            <span>{importFeedback.message}</span>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="p-5 space-y-3">
            <h3 className="text-sm font-bold text-text-main flex items-center gap-2">
              <Download className="w-4 h-4 text-primary" />
              <span>Export Learning Progress</span>
            </h3>
            <p className="text-xs text-text-muted leading-relaxed">
              Download your complete exercise solutions, quiz scores, bookmarks, and notes as a verified JSON file for offline backup or transfer to another device.
            </p>
            <Button variant="outline" size="sm" onClick={handleExport}>
              <Download className="w-3.5 h-3.5" />
              <span>Download Backup (JSON)</span>
            </Button>
          </Card>

          <Card className="p-5 space-y-3">
            <h3 className="text-sm font-bold text-text-main flex items-center gap-2">
              <Upload className="w-4 h-4 text-secondary" />
              <span>Restore from Backup</span>
            </h3>
            <p className="text-xs text-text-muted leading-relaxed">
              Restore your learning progress from an existing QueryPath JSON file. This will replace current progress on this browser.
            </p>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept=".json"
              className="hidden"
            />
            <Button
              variant="outline"
              size="sm"
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Import Progress File</span>
            </Button>
          </Card>
        </div>

        {/* Factory Reset */}
        <div className="p-4 rounded-lg border border-border bg-subtle/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-0.5">
            <span className="text-xs font-semibold text-text-main">Clear Progress</span>
            <p className="text-xs text-text-muted">
              Erase all local exercise attempts, quiz scores, notes, and bookmarks on this device.
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsResetModalOpen(true)}
            className="text-error hover:bg-error-subtle border-border shrink-0 text-xs"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset All Progress</span>
          </Button>
        </div>
      </div>

      {/* Confirmation Modal */}
      <Modal
        isOpen={isResetModalOpen}
        onClose={() => setIsResetModalOpen(false)}
        title="Reset All Learning Progress?"
        description="This action cannot be undone."
        footer={
          <>
            <Button variant="outline" size="sm" onClick={() => setIsResetModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="danger" size="sm" onClick={handleConfirmReset}>
              Yes, Reset Everything
            </Button>
          </>
        }
      >
        <div className="space-y-3 text-xs text-text-muted leading-relaxed">
          <p>
            Are you sure you want to permanently clear your progress? All recorded exercise attempts, completed lessons, quiz scores, bookmarks, and study notes stored in your browser will be deleted.
          </p>
          <p className="font-semibold text-text-main">
            Tip: You can export a JSON backup beforehand if you wish to preserve your answers.
          </p>
        </div>
      </Modal>
    </div>
  );
}
