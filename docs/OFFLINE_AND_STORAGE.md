# QueryPath — Offline Architecture & Storage Strategy

## 1. Offline Philosophy & Guarantee

QueryPath is engineered from the ground up to be **offline-first**.
- After the initial page load has downloaded the core bundle, SQL WebAssembly engine, and lesson assets, the application is completely functional without an active network connection.
- No network requests are made during query execution, exercise verification, quiz taking, note taking, or progress updates.

---

## 2. Service Worker Strategy

The service worker (`public/sw.js`) manages caching via a versioned cache identifier (`querypath-cache-v1`).

### Caching Layers

1. **Pre-Cached Core Assets (Cache-First)**:
   - Root index HTML (`/`, `/index.html`)
   - Bundled JavaScript and CSS assets (`/assets/*`)
   - SQLite WebAssembly binary (`/sql-wasm.wasm`)
   - SQLite JavaScript loader (`/sql-wasm.js`)
   - Web application manifest (`/manifest.webmanifest`)
   - Favicons and SVG icons (`/favicon.svg`)

2. **Dynamic Navigation Strategy (Network-First with Cache Fallback)**:
   - When the user navigates between routes, the Service Worker serves the cached app shell if the network is unavailable.

3. **Cache Invalidation & Updates**:
   - Cache versioning is bumped upon release (`querypath-cache-v2`).
   - The `activate` event clears obsolete cache buckets.
   - The UI displays an "Update Available" notification if a new service worker enters the `installed` state.

---

## 3. Storage Layer: IndexedDB Specification

All student data is stored locally in IndexedDB under database name `querypath_db`.

### Object Stores & Indices

```typescript
const DB_NAME = 'querypath_db';
const DB_VERSION = 1;

// Object Store: lessons_progress
// Key: lessonId (string)
interface LessonProgressRecord {
  lessonId: string;
  isStarted: boolean;
  isCompleted: boolean;
  completedAt: string | null;
  lastAccessedAt: string;
  exercisesCompletedCount: number;
}

// Object Store: exercise_attempts
// Key: exerciseId (string)
interface ExerciseAttemptRecord {
  exerciseId: string;
  lessonId: string;
  isSolved: boolean;
  userQuery: string;
  attemptsCount: number;
  solvedAt: string | null;
  lastExecutedAt: string;
}

// Object Store: quiz_attempts
// Key: quizId (string)
interface QuizAttemptRecord {
  quizId: string; // e.g. 'quiz_lesson_1', 'review_test_1'
  lessonId?: string;
  score: number;
  totalQuestions: number;
  percentage: number;
  passed: boolean;
  completedAt: string;
  userAnswers: Record<string, string>; // questionId -> optionId
}

// Object Store: notes
// Key: lessonId (string)
interface NoteRecord {
  lessonId: string;
  content: string;
  updatedAt: string;
}

// Object Store: bookmarks
// Key: id (string)
interface BookmarkRecord {
  id: string;
  lessonId: string;
  title: string;
  createdAt: string;
}

// Object Store: user_settings
// Key: key (string)
interface UserSettingRecord {
  key: string;
  value: any;
}
```

---

## 4. Export & Import Protocol

To prevent data lock-in and enable migration across browsers:

### JSON Export Format
```json
{
  "version": 1,
  "exportedAt": "2026-10-21T15:30:00.000Z",
  "app": "QueryPath",
  "progress": {
    "lessons": [...],
    "exercises": [...],
    "quizzes": [...],
    "notes": [...],
    "bookmarks": [...],
    "settings": {...}
  }
}
```

### Import Validation Protocol
1. **Schema Check**: Verifies that the JSON document contains `"app": "QueryPath"` and `"version": 1`.
2. **Sanitization**: Validates data types of each record before insertion.
3. **User Confirmation**: Displays a warning modal:
   > *"Importing progress will replace existing progress on this browser. Proceed?"*
4. **Atomic Transaction**: Writes all records in a single transactional batch.
