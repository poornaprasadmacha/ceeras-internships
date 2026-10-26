import React, { useState, useRef, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useProgress } from '../../hooks/useProgress';
import { useActiveCourse, CourseId } from '../../hooks/useActiveCourse';
import { LESSON_MANIFEST } from '../../data/lessons';
import { PYTHON_LESSONS } from '../../data/pythonLessons';
import { HTML_LESSONS } from '../../data/htmlLessons';
import { CSS_LESSONS } from '../../data/cssLessons';
import { JS_LESSONS } from '../../data/jsLessons';
import { DATA_SCIENCE_LESSONS } from '../../data/dataScienceLessons';
import { MACHINE_LEARNING_LESSONS } from '../../data/machineLearningLessons';
import { NUMPY_LESSONS } from '../../data/numpyLessons';
import { PANDAS_LESSONS } from '../../data/pandasLessons';
import { GIT_LESSONS } from '../../data/gitLessons';
import { VSCODE_LESSONS } from '../../data/vscodeLessons';
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
import { formatDate, cn } from '../../lib/utils';
import { ExportData } from '../../types/progress';

interface GenericProgressLesson {
  id: string;
  number: number;
  title: string;
  tasksCount: number;
  quizId: string;
}

export function ProgressView() {
  const [searchParams, setSearchParams] = useSearchParams();
  const {
    stats,
    lessonsProgress,
    exerciseAttempts,
    quizAttempts,
    exportProgressJson,
    importProgressJson,
    resetProgress,
  } = useProgress();

  const { activeCourse, allCourses, setActiveCourseId, getCourseProgress } = useActiveCourse();

  // Selected course tab
  const paramCourse = searchParams.get('course')?.toLowerCase() as CourseId | undefined;
  const initialCourseId: CourseId = useMemo(() => {
    if (paramCourse && allCourses.some((c) => c.id === paramCourse)) {
      return paramCourse;
    }
    return activeCourse.id;
  }, [paramCourse, activeCourse.id]);

  const [selectedCourseId, setSelectedCourseId] = useState<CourseId>(initialCourseId);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [importFeedback, setImportFeedback] = useState<{ success: boolean; message: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const selectedCourse = useMemo(() => {
    return allCourses.find((c) => c.id === selectedCourseId) || allCourses[0];
  }, [selectedCourseId, allCourses]);

  const currentCourseProgress = useMemo(() => {
    return getCourseProgress(selectedCourse, stats);
  }, [selectedCourse, stats, getCourseProgress]);

  const handleSelectCourse = (id: CourseId) => {
    setSelectedCourseId(id);
    setActiveCourseId(id);
    setSearchParams({ course: id });
  };

  const courseLessons: GenericProgressLesson[] = useMemo(() => {
    switch (selectedCourseId) {
      case 'sql':
        return LESSON_MANIFEST.map((l) => ({
          id: l.id,
          number: l.number,
          title: l.title,
          tasksCount: l.exercises.length,
          quizId: `quiz_${l.id}`,
        }));
      case 'python':
        return PYTHON_LESSONS.map((l) => ({
          id: l.id,
          number: l.number,
          title: l.title,
          tasksCount: l.exercises.length,
          quizId: `quiz_python_${l.id}`,
        }));
      case 'html':
        return HTML_LESSONS.map((l) => ({
          id: l.id,
          number: l.number,
          title: l.title,
          tasksCount: l.exercises.length,
          quizId: `quiz_html_${l.id}`,
        }));
      case 'css':
        return CSS_LESSONS.map((l) => ({
          id: l.id,
          number: l.number,
          title: l.title,
          tasksCount: l.exercises.length,
          quizId: `quiz_css_${l.id}`,
        }));
      case 'javascript':
        return JS_LESSONS.map((l) => ({
          id: l.id,
          number: l.number,
          title: l.title,
          tasksCount: l.exercises.length,
          quizId: `quiz_js_${l.id}`,
        }));
      case 'datascience':
        return DATA_SCIENCE_LESSONS.map((l) => ({
          id: l.id,
          number: l.number,
          title: l.title,
          tasksCount: l.exercises.length,
          quizId: `quiz_ds_${l.id}`,
        }));
      case 'machinelearning':
        return MACHINE_LEARNING_LESSONS.map((l) => ({
          id: l.id,
          number: l.number,
          title: l.title,
          tasksCount: l.exercises.length,
          quizId: `quiz_ml_${l.id}`,
        }));
      case 'numpy':
        return NUMPY_LESSONS.map((l) => ({
          id: l.id,
          number: l.number,
          title: l.title,
          tasksCount: l.exercises.length,
          quizId: `quiz_numpy_${l.id}`,
        }));
      case 'pandas':
        return PANDAS_LESSONS.map((l) => ({
          id: l.id,
          number: l.number,
          title: l.title,
          tasksCount: l.exercises.length,
          quizId: `quiz_pandas_${l.id}`,
        }));
      case 'git':
        return GIT_LESSONS.map((l) => ({
          id: l.id,
          number: l.number,
          title: l.title,
          tasksCount: l.exercises.length,
          quizId: `quiz_git_${l.id}`,
        }));
      case 'vscode':
        return VSCODE_LESSONS.map((l) => ({
          id: l.id,
          number: l.number,
          title: l.title,
          tasksCount: l.exercises.length,
          quizId: `quiz_vscode_${l.id}`,
        }));
      default:
        return [];
    }
  }, [selectedCourseId]);

  // Read saved completion map for current course
  const courseSolvedMap = useMemo(() => {
    if (selectedCourseId === 'sql') return {};
    try {
      const raw = localStorage.getItem(selectedCourse.storageKey);
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  }, [selectedCourseId, selectedCourse.storageKey]);

  const handleExport = async () => {
    try {
      const data = await exportProgressJson();
      const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(data, null, 2))}`;
      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute('href', jsonString);
      downloadAnchor.setAttribute('download', `ceeras_progress_${new Date().toISOString().slice(0, 10)}.json`);
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
      <div className="border-b border-border pb-5">
        <h1 className="font-raleway text-2xl sm:text-3xl font-bold tracking-tight text-text-main flex items-center gap-3">
          <BarChart2 className="w-7 h-7 text-primary" />
          <span>Progress & Milestones</span>
        </h1>
      </div>

      {/* Course Switcher Tabs */}
      <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-subtle border border-border rounded-xl overflow-x-auto scrollbar-thin">
        {allCourses.map((c) => {
          const Logo = c.logo;
          const isSelected = c.id === selectedCourseId;
          return (
            <button
              key={c.id}
              type="button"
              onClick={() => handleSelectCourse(c.id)}
              className={cn(
                'flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap',
                isSelected
                  ? 'bg-surface text-primary shadow-2xs border border-border font-bold'
                  : 'text-text-muted hover:text-text-main hover:bg-surface/50'
              )}
            >
              <div className="w-4 h-4 rounded bg-subtle border border-border/60 flex items-center justify-center p-0.5 shrink-0">
                <Logo className="w-full h-full object-contain" />
              </div>
              <span>{c.shortTitle}</span>
              <span className="text-[10px] opacity-75 font-mono">({c.totalLessons})</span>
            </button>
          );
        })}
      </div>

      {/* Progress Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-5 space-y-3 bg-surface">
          <span className="text-xs font-semibold text-text-muted uppercase tracking-wider block">
            {selectedCourse.shortTitle} Completion
          </span>
          <div className="text-3xl font-bold font-mono text-text-main">
            {currentCourseProgress.percentage}%
          </div>
          <ProgressBar value={currentCourseProgress.percentage} showPercentage={false} size="sm" />
          <p className="text-xs text-text-muted">
            {currentCourseProgress.completedLessons} of {currentCourseProgress.totalLessons} lessons completed
          </p>
        </Card>

        <Card className="p-5 space-y-3 bg-surface">
          <span className="text-xs font-semibold text-text-muted uppercase tracking-wider block">
            {selectedCourseId === 'sql' ? 'SQL Tasks Solved' : 'Course Curriculum Units'}
          </span>
          <div className="text-3xl font-bold font-mono text-text-main">
            {selectedCourseId === 'sql'
              ? `${stats.solvedExercises} / ${stats.totalExercises}`
              : `${courseLessons.length} Lessons`}
          </div>
          <ProgressBar
            value={selectedCourseId === 'sql' ? stats.exercisePercentage : currentCourseProgress.percentage}
            showPercentage={false}
            size="sm"
          />
          <p className="text-xs text-text-muted">
            {selectedCourseId === 'sql'
              ? `${stats.exercisePercentage}% of hands-on queries solved`
              : `${currentCourseProgress.completedLessons} completed on this device`}
          </p>
        </Card>

        <Card className="p-5 space-y-3 bg-surface">
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
        <h2 className="text-base font-bold text-text-main">
          {selectedCourse.title} Curriculum Breakdown
        </h2>
        <div className="border border-border rounded-lg overflow-x-auto bg-surface shadow-subtle">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-subtle border-b border-border text-text-main font-semibold">
                <th className="py-3 px-4">Lesson</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Tasks</th>
                <th className="py-3 px-4">Quiz Status</th>
                <th className="py-3 px-4">Environment</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {courseLessons.map((lesson) => {
                const quiz = quizAttempts[lesson.quizId];
                let isCompleted = false;
                let isStarted = false;

                if (selectedCourseId === 'sql') {
                  const prog = lessonsProgress[lesson.id];
                  isCompleted = !!prog?.isCompleted;
                  isStarted = !!prog?.isStarted;
                } else {
                  isCompleted = !!courseSolvedMap[lesson.id];
                  isStarted = isCompleted;
                }

                return (
                  <tr key={lesson.id} className="hover:bg-subtle/40 transition-colors">
                    <td className="py-3 px-4 font-medium text-text-main">
                      Lesson {lesson.number}: {lesson.title}
                    </td>
                    <td className="py-3 px-4">
                      {isCompleted ? (
                        <Badge variant="success" size="sm">
                          Completed
                        </Badge>
                      ) : isStarted ? (
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
                      {lesson.tasksCount} Interactive Tasks
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
                    <td className="py-3 px-4 text-text-muted font-mono">
                      {selectedCourse.playgroundTab.toUpperCase()}
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
          <Card className="p-5 space-y-3 bg-surface">
            <h3 className="text-sm font-bold text-text-main flex items-center gap-2">
              <Download className="w-4 h-4 text-primary" />
              <span>Export Learning Progress</span>
            </h3>
            <p className="text-xs text-text-muted leading-relaxed">
              Download an encrypted JSON file containing your lesson completion history, quiz scores, and solution snapshots.
            </p>
            <div className="pt-2">
              <Button variant="outline" size="sm" onClick={handleExport} className="text-xs">
                <Download className="w-3.5 h-3.5" />
                <span>Export Progress JSON</span>
              </Button>
            </div>
          </Card>

          <Card className="p-5 space-y-3 bg-surface">
            <h3 className="text-sm font-bold text-text-main flex items-center gap-2">
              <Upload className="w-4 h-4 text-primary" />
              <span>Restore from Backup</span>
            </h3>
            <p className="text-xs text-text-muted leading-relaxed">
              Upload a previously exported progress file to restore your learning state across devices without an account.
            </p>
            <div className="pt-2">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept=".json"
                className="hidden"
                id="progress-file-import"
              />
              <Button
                variant="outline"
                size="sm"
                onClick={() => fileInputRef.current?.click()}
                className="text-xs"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Import Progress JSON</span>
              </Button>
            </div>
          </Card>
        </div>

        {/* Reset Progress Section */}
        <div className="pt-2">
          <Card variant="subtle" className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-error/20 bg-error/5">
            <div className="space-y-1">
              <span className="text-xs font-bold text-error block">Reset Learning Data</span>
              <p className="text-xs text-text-muted">
                Permanently erase all local progress, quiz attempts, and bookmarks on this device.
              </p>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsResetModalOpen(true)}
              className="text-xs text-error border-error/40 hover:bg-error hover:text-white shrink-0"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset All Progress</span>
            </Button>
          </Card>
        </div>
      </div>

      {/* Confirmation Modal */}
      <Modal
        isOpen={isResetModalOpen}
        onClose={() => setIsResetModalOpen(false)}
        title="Confirm Reset of Learning Progress"
      >
        <div className="space-y-4">
          <div className="p-3 bg-error/10 border border-error/30 rounded-lg text-xs text-text-main flex items-start gap-2.5">
            <AlertTriangle className="w-4 h-4 text-error shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="font-bold text-error block">This action cannot be undone.</span>
              <p className="text-text-muted">
                All solved tasks, quiz records, and learning streak timestamps will be completely wiped from your browser.
              </p>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-3">
            <Button variant="ghost" size="sm" onClick={() => setIsResetModalOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={handleConfirmReset}
              className="bg-error hover:bg-error/90 text-white"
            >
              Confirm Full Reset
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
