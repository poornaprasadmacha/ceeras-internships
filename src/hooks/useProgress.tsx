import { useState, useEffect, useCallback, createContext, useContext, ReactNode } from 'react';
import React from 'react';
import {
  getAllLessonsProgress,
  getAllExerciseAttempts,
  getAllQuizAttempts,
  getAllBookmarks,
  getAllNotes,
  saveLessonProgress,
  saveExerciseAttempt,
  saveQuizAttempt,
  saveNote,
  deleteNote,
  toggleBookmark,
  clearAllData,
  exportAllData,
  importAllData,
  getLessonProgress,
} from '../database/storage';
import {
  LessonProgressRecord,
  ExerciseAttemptRecord,
  NoteRecord,
  BookmarkRecord,
  OverallStats,
  ExportData,
} from '../types/progress';
import { QuizAttemptRecord } from '../types/quiz';
import { LESSON_MANIFEST } from '../data/lessons';
import { PASSING_PERCENTAGE } from '../lib/constants';

interface ProgressContextType {
  lessonsProgress: Record<string, LessonProgressRecord>;
  exerciseAttempts: Record<string, ExerciseAttemptRecord>;
  quizAttempts: Record<string, QuizAttemptRecord>;
  notes: Record<string, NoteRecord>;
  bookmarks: BookmarkRecord[];
  stats: OverallStats;
  loading: boolean;
  refreshProgress: () => Promise<void>;
  markLessonStarted: (lessonId: string) => Promise<void>;
  recordExerciseSolved: (exerciseId: string, lessonId: string, query: string) => Promise<void>;
  recordQuizAttempt: (
    quizId: string,
    score: number,
    totalQuestions: number,
    userAnswers: Record<string, string>,
    lessonId?: string
  ) => Promise<boolean>;
  saveLessonNote: (lessonId: string, content: string) => Promise<void>;
  removeLessonNote: (lessonId: string) => Promise<void>;
  toggleBookmarkItem: (lessonId: string, title: string) => Promise<boolean>;
  resetProgress: () => Promise<void>;
  exportProgressJson: () => Promise<ExportData>;
  importProgressJson: (data: ExportData) => Promise<{ success: boolean; error?: string }>;
}

const ProgressContext = createContext<ProgressContextType | null>(null);

function calculateStreak(
  exercises: ExerciseAttemptRecord[],
  quizzes: QuizAttemptRecord[],
  lessons: LessonProgressRecord[]
): number {
  const dates = new Set<string>();

  for (const ex of exercises) {
    if (ex.lastExecutedAt) {
      dates.add(ex.lastExecutedAt.slice(0, 10));
    }
  }
  for (const q of quizzes) {
    if (q.completedAt) {
      dates.add(q.completedAt.slice(0, 10));
    }
  }
  for (const l of lessons) {
    if (l.lastAccessedAt) {
      dates.add(l.lastAccessedAt.slice(0, 10));
    }
  }

  if (dates.size === 0) return 0;

  const sortedDates = Array.from(dates).sort().reverse();
  const todayStr = new Date().toISOString().slice(0, 10);
  const yesterdayStr = new Date(Date.now() - 86400000).toISOString().slice(0, 10);

  // If no activity today or yesterday, streak is broken
  if (!sortedDates.includes(todayStr) && !sortedDates.includes(yesterdayStr)) {
    return 0;
  }

  let streak = 0;
  let checkDate = sortedDates.includes(todayStr) ? new Date() : new Date(Date.now() - 86400000);

  while (true) {
    const checkStr = checkDate.toISOString().slice(0, 10);
    if (dates.has(checkStr)) {
      streak++;
      checkDate = new Date(checkDate.getTime() - 86400000);
    } else {
      break;
    }
  }

  return streak;
}

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [lessonsProgress, setLessonsProgress] = useState<Record<string, LessonProgressRecord>>({});
  const [exerciseAttempts, setExerciseAttempts] = useState<Record<string, ExerciseAttemptRecord>>({});
  const [quizAttempts, setQuizAttempts] = useState<Record<string, QuizAttemptRecord>>({});
  const [notes, setNotes] = useState<Record<string, NoteRecord>>({});
  const [bookmarks, setBookmarks] = useState<BookmarkRecord[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const [stats, setStats] = useState<OverallStats>({
    totalLessons: LESSON_MANIFEST.length,
    completedLessons: 0,
    coursePercentage: 0,
    totalExercises: LESSON_MANIFEST.reduce((sum, l) => sum + l.exercises.length, 0),
    solvedExercises: 0,
    exercisePercentage: 0,
    currentStreakDays: 0,
    quizzesTaken: 0,
    averageQuizScore: 0,
    recentlyAccessedLessonId: null,
  });

  const refreshProgress = useCallback(async () => {
    try {
      const [rawLessons, rawExercises, rawQuizzes, rawNotes, rawBookmarks] = await Promise.all([
        getAllLessonsProgress(),
        getAllExerciseAttempts(),
        getAllQuizAttempts(),
        getAllNotes(),
        getAllBookmarks(),
      ]);

      const lMap: Record<string, LessonProgressRecord> = {};
      for (const l of rawLessons) lMap[l.lessonId] = l;

      const eMap: Record<string, ExerciseAttemptRecord> = {};
      for (const e of rawExercises) eMap[e.exerciseId] = e;

      const qMap: Record<string, QuizAttemptRecord> = {};
      for (const q of rawQuizzes) qMap[q.quizId] = q;

      const nMap: Record<string, NoteRecord> = {};
      for (const n of rawNotes) nMap[n.lessonId] = n;

      setLessonsProgress(lMap);
      setExerciseAttempts(eMap);
      setQuizAttempts(qMap);
      setNotes(nMap);
      setBookmarks(rawBookmarks);

      // Evaluate lesson completions and recalculate stats
      let completedLessonsCount = 0;
      let solvedExCount = 0;

      for (const lesson of LESSON_MANIFEST) {
        const allExercisesSolved =
          lesson.exercises.length > 0 &&
          lesson.exercises.every((ex) => eMap[ex.id]?.isSolved);

        const quizRecord = qMap[`quiz_${lesson.id}`];
        const quizPassed = quizRecord ? quizRecord.passed : false;

        const isCompleted = allExercisesSolved && quizPassed;

        if (isCompleted) {
          completedLessonsCount++;
        }

        const countSolvedInLesson = lesson.exercises.filter((ex) => eMap[ex.id]?.isSolved).length;
        solvedExCount += countSolvedInLesson;

        // Auto update lesson progress record if needed
        const currentRecord = lMap[lesson.id];
        if (
          !currentRecord ||
          currentRecord.isCompleted !== isCompleted ||
          currentRecord.exercisesCompletedCount !== countSolvedInLesson
        ) {
          const updated: LessonProgressRecord = {
            lessonId: lesson.id,
            isStarted: currentRecord?.isStarted ?? false,
            isCompleted,
            completedAt: isCompleted ? currentRecord?.completedAt || new Date().toISOString() : null,
            lastAccessedAt: currentRecord?.lastAccessedAt || new Date().toISOString(),
            exercisesCompletedCount: countSolvedInLesson,
          };
          lMap[lesson.id] = updated;
          await saveLessonProgress(updated);
        }
      }

      // Calculate recent lesson
      let latestAccess: { lessonId: string; time: number } | null = null;
      for (const l of Object.values(lMap)) {
        if (l.lastAccessedAt) {
          const t = new Date(l.lastAccessedAt).getTime();
          if (!latestAccess || t > latestAccess.time) {
            latestAccess = { lessonId: l.lessonId, time: t };
          }
        }
      }

      // Quiz statistics
      const quizRecords = Object.values(qMap);
      const quizzesTaken = quizRecords.length;
      const avgScore =
        quizzesTaken > 0
          ? Math.round(
              quizRecords.reduce((acc, cur) => acc + cur.percentage, 0) / quizzesTaken
            )
          : 0;

      const totalExercises = LESSON_MANIFEST.reduce((sum, l) => sum + l.exercises.length, 0);
      const coursePct = Math.round((completedLessonsCount / LESSON_MANIFEST.length) * 100);
      const exercisePct =
        totalExercises > 0 ? Math.round((solvedExCount / totalExercises) * 100) : 0;
      const streak = calculateStreak(rawExercises, rawQuizzes, rawLessons);

      setStats({
        totalLessons: LESSON_MANIFEST.length,
        completedLessons: completedLessonsCount,
        coursePercentage: coursePct,
        totalExercises,
        solvedExercises: solvedExCount,
        exercisePercentage: exercisePct,
        currentStreakDays: streak,
        quizzesTaken,
        averageQuizScore: avgScore,
        recentlyAccessedLessonId: latestAccess?.lessonId || null,
      });
    } catch (err) {
      console.error('Failed to load progress from IndexedDB:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshProgress();
  }, [refreshProgress]);

  const markLessonStarted = async (lessonId: string) => {
    const existing = await getLessonProgress(lessonId);
    const updated: LessonProgressRecord = {
      lessonId,
      isStarted: true,
      isCompleted: existing?.isCompleted ?? false,
      completedAt: existing?.completedAt ?? null,
      lastAccessedAt: new Date().toISOString(),
      exercisesCompletedCount: existing?.exercisesCompletedCount ?? 0,
    };
    await saveLessonProgress(updated);
    await refreshProgress();
  };

  const recordExerciseSolved = async (
    exerciseId: string,
    lessonId: string,
    query: string
  ) => {
    const prev = exerciseAttempts[exerciseId];
    const updated: ExerciseAttemptRecord = {
      exerciseId,
      lessonId,
      isSolved: true,
      userQuery: query,
      attemptsCount: (prev?.attemptsCount || 0) + 1,
      solvedAt: prev?.solvedAt || new Date().toISOString(),
      lastExecutedAt: new Date().toISOString(),
    };
    await saveExerciseAttempt(updated);
    await refreshProgress();
  };

  const recordQuizAttempt = async (
    quizId: string,
    score: number,
    totalQuestions: number,
    userAnswers: Record<string, string>,
    lessonId?: string
  ): Promise<boolean> => {
    const percentage = Math.round((score / totalQuestions) * 100);
    const passed = percentage >= PASSING_PERCENTAGE;

    const record: QuizAttemptRecord = {
      quizId,
      lessonId,
      score,
      totalQuestions,
      percentage,
      passed,
      completedAt: new Date().toISOString(),
      userAnswers,
    };

    await saveQuizAttempt(record);
    await refreshProgress();
    return passed;
  };

  const saveLessonNote = async (lessonId: string, content: string) => {
    const record: NoteRecord = {
      lessonId,
      content,
      updatedAt: new Date().toISOString(),
    };
    await saveNote(record);
    await refreshProgress();
  };

  const removeLessonNote = async (lessonId: string) => {
    await deleteNote(lessonId);
    await refreshProgress();
  };

  const toggleBookmarkItem = async (lessonId: string, title: string): Promise<boolean> => {
    const result = await toggleBookmark(lessonId, title);
    await refreshProgress();
    return result;
  };

  const resetProgress = async () => {
    await clearAllData();
    await refreshProgress();
  };

  const exportProgressJson = async () => {
    return exportAllData();
  };

  const importProgressJson = async (data: ExportData) => {
    const res = await importAllData(data);
    if (res.success) {
      await refreshProgress();
    }
    return res;
  };

  return (
    <ProgressContext.Provider
      value={{
        lessonsProgress,
        exerciseAttempts,
        quizAttempts,
        notes,
        bookmarks,
        stats,
        loading,
        refreshProgress,
        markLessonStarted,
        recordExerciseSolved,
        recordQuizAttempt,
        saveLessonNote,
        removeLessonNote,
        toggleBookmarkItem,
        resetProgress,
        exportProgressJson,
        importProgressJson,
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  const ctx = useContext(ProgressContext);
  if (!ctx) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return ctx;
}
