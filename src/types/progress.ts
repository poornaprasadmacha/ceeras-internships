export interface LessonProgressRecord {
  lessonId: string;
  isStarted: boolean;
  isCompleted: boolean;
  completedAt: string | null;
  lastAccessedAt: string;
  exercisesCompletedCount: number;
}

export interface ExerciseAttemptRecord {
  exerciseId: string;
  lessonId: string;
  isSolved: boolean;
  userQuery: string;
  attemptsCount: number;
  solvedAt: string | null;
  lastExecutedAt: string;
}

export interface NoteRecord {
  lessonId: string;
  content: string;
  updatedAt: string;
}

export interface BookmarkRecord {
  id: string;
  lessonId: string;
  title: string;
  createdAt: string;
}

export interface OverallStats {
  totalLessons: number;
  completedLessons: number;
  coursePercentage: number;
  totalExercises: number;
  solvedExercises: number;
  exercisePercentage: number;
  currentStreakDays: number;
  quizzesTaken: number;
  averageQuizScore: number;
  recentlyAccessedLessonId: string | null;
}

export interface ExportData {
  version: number;
  exportedAt: string;
  app: string;
  lessons: LessonProgressRecord[];
  exercises: ExerciseAttemptRecord[];
  quizzes: any[];
  notes: NoteRecord[];
  bookmarks: BookmarkRecord[];
  settings: Record<string, any>;
}
