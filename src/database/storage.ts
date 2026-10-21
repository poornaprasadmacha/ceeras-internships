import { openDB, IDBPDatabase } from 'idb';
import {
  LessonProgressRecord,
  ExerciseAttemptRecord,
  NoteRecord,
  BookmarkRecord,
  ExportData,
} from '../types/progress';
import { QuizAttemptRecord } from '../types/quiz';

const DB_NAME = 'querypath_db';
const DB_VERSION = 1;

let dbPromise: Promise<IDBPDatabase> | null = null;

export function getDatabase(): Promise<IDBPDatabase> {
  if (!dbPromise) {
    dbPromise = openDB(DB_NAME, DB_VERSION, {
      upgrade(db) {
        if (!db.objectStoreNames.contains('lessons_progress')) {
          db.createObjectStore('lessons_progress', { keyPath: 'lessonId' });
        }
        if (!db.objectStoreNames.contains('exercise_attempts')) {
          db.createObjectStore('exercise_attempts', { keyPath: 'exerciseId' });
        }
        if (!db.objectStoreNames.contains('quiz_attempts')) {
          db.createObjectStore('quiz_attempts', { keyPath: 'quizId' });
        }
        if (!db.objectStoreNames.contains('notes')) {
          db.createObjectStore('notes', { keyPath: 'lessonId' });
        }
        if (!db.objectStoreNames.contains('bookmarks')) {
          db.createObjectStore('bookmarks', { keyPath: 'id' });
        }
        if (!db.objectStoreNames.contains('user_settings')) {
          db.createObjectStore('user_settings', { keyPath: 'key' });
        }
      },
    });
  }
  return dbPromise;
}

// Lessons Progress
export async function getLessonProgress(lessonId: string): Promise<LessonProgressRecord | undefined> {
  const db = await getDatabase();
  return db.get('lessons_progress', lessonId);
}

export async function getAllLessonsProgress(): Promise<LessonProgressRecord[]> {
  const db = await getDatabase();
  return db.getAll('lessons_progress');
}

export async function saveLessonProgress(record: LessonProgressRecord): Promise<void> {
  const db = await getDatabase();
  await db.put('lessons_progress', record);
}

// Exercise Attempts
export async function getExerciseAttempt(exerciseId: string): Promise<ExerciseAttemptRecord | undefined> {
  const db = await getDatabase();
  return db.get('exercise_attempts', exerciseId);
}

export async function getAllExerciseAttempts(): Promise<ExerciseAttemptRecord[]> {
  const db = await getDatabase();
  return db.getAll('exercise_attempts');
}

export async function saveExerciseAttempt(record: ExerciseAttemptRecord): Promise<void> {
  const db = await getDatabase();
  await db.put('exercise_attempts', record);
}

// Quiz Attempts
export async function getQuizAttempt(quizId: string): Promise<QuizAttemptRecord | undefined> {
  const db = await getDatabase();
  return db.get('quiz_attempts', quizId);
}

export async function getAllQuizAttempts(): Promise<QuizAttemptRecord[]> {
  const db = await getDatabase();
  return db.getAll('quiz_attempts');
}

export async function saveQuizAttempt(record: QuizAttemptRecord): Promise<void> {
  const db = await getDatabase();
  await db.put('quiz_attempts', record);
}

// Notes
export async function getNote(lessonId: string): Promise<NoteRecord | undefined> {
  const db = await getDatabase();
  return db.get('notes', lessonId);
}

export async function getAllNotes(): Promise<NoteRecord[]> {
  const db = await getDatabase();
  return db.getAll('notes');
}

export async function saveNote(record: NoteRecord): Promise<void> {
  const db = await getDatabase();
  await db.put('notes', record);
}

export async function deleteNote(lessonId: string): Promise<void> {
  const db = await getDatabase();
  await db.delete('notes', lessonId);
}

// Bookmarks
export async function getAllBookmarks(): Promise<BookmarkRecord[]> {
  const db = await getDatabase();
  return db.getAll('bookmarks');
}

export async function isBookmarked(lessonId: string): Promise<boolean> {
  const db = await getDatabase();
  const item = await db.get('bookmarks', lessonId);
  return !!item;
}

export async function toggleBookmark(lessonId: string, title: string): Promise<boolean> {
  const db = await getDatabase();
  const existing = await db.get('bookmarks', lessonId);
  if (existing) {
    await db.delete('bookmarks', lessonId);
    return false;
  } else {
    await db.put('bookmarks', {
      id: lessonId,
      lessonId,
      title,
      createdAt: new Date().toISOString(),
    });
    return true;
  }
}

// User Settings
export async function getUserSetting<T>(key: string, defaultValue: T): Promise<T> {
  try {
    const db = await getDatabase();
    const item = await db.get('user_settings', key);
    return item ? (item.value as T) : defaultValue;
  } catch {
    return defaultValue;
  }
}

export async function setUserSetting<T>(key: string, value: T): Promise<void> {
  const db = await getDatabase();
  await db.put('user_settings', { key, value });
}

// Export / Import / Clear
export async function exportAllData(): Promise<ExportData> {
  const db = await getDatabase();
  const lessons = await db.getAll('lessons_progress');
  const exercises = await db.getAll('exercise_attempts');
  const quizzes = await db.getAll('quiz_attempts');
  const notes = await db.getAll('notes');
  const bookmarks = await db.getAll('bookmarks');
  const rawSettings = await db.getAll('user_settings');

  const settings: Record<string, any> = {};
  for (const s of rawSettings) {
    settings[s.key] = s.value;
  }

  return {
    version: 1,
    exportedAt: new Date().toISOString(),
    app: 'QueryPath',
    lessons,
    exercises,
    quizzes,
    notes,
    bookmarks,
    settings,
  };
}

export async function importAllData(data: ExportData): Promise<{ success: boolean; error?: string }> {
  if (!data || data.app !== 'QueryPath' || !data.version) {
    return { success: false, error: 'Invalid progress backup file. Missing QueryPath metadata signature.' };
  }

  const db = await getDatabase();
  const tx = db.transaction(
    ['lessons_progress', 'exercise_attempts', 'quiz_attempts', 'notes', 'bookmarks', 'user_settings'],
    'readwrite'
  );

  try {
    await tx.objectStore('lessons_progress').clear();
    for (const item of data.lessons || []) {
      await tx.objectStore('lessons_progress').put(item);
    }

    await tx.objectStore('exercise_attempts').clear();
    for (const item of data.exercises || []) {
      await tx.objectStore('exercise_attempts').put(item);
    }

    await tx.objectStore('quiz_attempts').clear();
    for (const item of data.quizzes || []) {
      await tx.objectStore('quiz_attempts').put(item);
    }

    await tx.objectStore('notes').clear();
    for (const item of data.notes || []) {
      await tx.objectStore('notes').put(item);
    }

    await tx.objectStore('bookmarks').clear();
    for (const item of data.bookmarks || []) {
      await tx.objectStore('bookmarks').put(item);
    }

    if (data.settings) {
      await tx.objectStore('user_settings').clear();
      for (const [key, value] of Object.entries(data.settings)) {
        await tx.objectStore('user_settings').put({ key, value });
      }
    }

    await tx.done;
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err?.message || 'Failed to import progress data' };
  }
}

export async function clearAllData(): Promise<void> {
  const db = await getDatabase();
  const tx = db.transaction(
    ['lessons_progress', 'exercise_attempts', 'quiz_attempts', 'notes', 'bookmarks'],
    'readwrite'
  );
  await tx.objectStore('lessons_progress').clear();
  await tx.objectStore('exercise_attempts').clear();
  await tx.objectStore('quiz_attempts').clear();
  await tx.objectStore('notes').clear();
  await tx.objectStore('bookmarks').clear();
  await tx.done;
}
