# QueryPath — Technical Architecture

## 1. System Overview

QueryPath is structured as a client-side Single Page Application (SPA) designed to function completely offline without calling any backend server.

```
+------------------------------------------------------------------------------+
|                               Browser Client                                 |
|                                                                              |
|  +--------------------+   +-----------------------+   +-------------------+  |
|  |     React UI       |   |      WASM SQLite      |   |    IndexedDB      |  |
|  |  (Tailwind, CM6)   |<->|       (sql.js)        |<->|     (Storage)     |  |
|  +--------------------+   +-----------------------+   +-------------------+  |
|            |                                                    |            |
|            v                                                    v            |
|  +--------------------+                               +-------------------+  |
|  |   Service Worker   |                               |  Export / Import  |  |
|  | (Offline Caching)  |                               |    (JSON Sync)    |  |
|  +--------------------+                               +-------------------+  |
+------------------------------------------------------------------------------+
```

---

## 2. Component Architecture

The interface follows a modular, feature-based architecture:

- **App Shell (`src/components/layout/AppShell.tsx`)**:
  - Handles the responsive layout grid:
    - **Desktop (>= 1024px)**: Left fixed sidebar (260px) + Fluid Main Content + Optional Collapsible Right Learning Companion Panel (340px).
    - **Tablet (768px - 1023px)**: Collapsible sidebar navigation drawer + Full width Main Content + Slide-over learning panel.
    - **Mobile (< 768px)**: Compact top app header + Bottom tab bar or slide-out menu drawer + Single column stacked content.
  - Houses the global notification toast, offline indicator, and keyboard focus trap contexts.

- **SQL Editor (`src/components/editor/SqlEditor.tsx`)**:
  - Encapsulates CodeMirror 6 with SQL language syntax highlighting.
  - Supports standard SQL formatting, bracket matching, line numbering, and keybindings (`Ctrl+Enter` to run).
  - Clean monospace font styling adapting to active theme tokens.

- **Results Table (`src/components/editor/ResultsTable.tsx`)**:
  - Tabular display of SQLite query execution output.
  - Displays returned column headers, row counts, and execution duration in milliseconds.
  - Handles empty result sets gracefully with informative empty states.

- **Verification Engine (`src/database/queryValidator.ts`)**:
  - Analyzes executed result matrix vs expected result matrix.
  - Verifies column count, column names (case-insensitive), and row contents.
  - Handles unordered multiset comparison for queries where order is non-deterministic.

---

## 3. SQL Execution Architecture

### Lifecycle of a Student Query
1. **User Action**: The student writes a query in the CodeMirror editor and triggers "Run Query" (or `Ctrl+Enter`).
2. **Safety Pre-Check**:
   - The query string is trimmed and checked against forbidden statement patterns (`INSERT`, `UPDATE`, `DELETE`, `DROP`, `ALTER`, `CREATE`, `REPLACE`, `ATTACH`, `DETACH`).
   - If an unauthorized mutation statement is detected in a read-only exercise, execution halts immediately with a clear explanation:
     > *"Query rejected: This lesson is read-only. Data modification commands (such as DROP or UPDATE) are restricted in this exercise."*
3. **Database Initialization**:
   - QueryPath checks if an active database instance exists for the current exercise.
   - If missing or dirty, a fresh SQLite database instance is initialized in memory via `new SQL.Database()`.
   - The exercise's seed script (DDL + DML) is executed to create the required tables and insert sample rows.
4. **Execution**:
   - `db.exec(studentQuery)` runs inside the WebAssembly SQLite virtual machine.
   - Time is captured via `performance.now()`.
5. **Output Extraction**:
   - Results are converted into a standardized `QueryResult` structure: `{ columns: string[], values: any[][], executionTimeMs: number }`.
6. **Automatic Verification**:
   - If the query was run inside an exercise context, the output is compared against the exercise's expected results.
   - An event is dispatched to update progress in IndexedDB upon successful verification.

---

## 4. State Management & Data Flow

QueryPath avoids bloated external state managers (e.g. Redux) in favor of React Context + Custom Hooks backed directly by **IndexedDB**:

- **`ThemeContext` / `useTheme`**:
  - Manages active theme (`soft-light`, `warm-paper`, `soft-dark`).
  - Sets `data-theme` attribute on the root `<html>` element.
  - Persists preference across sessions.
- **`ProgressContext` / `useProgress`**:
  - Interfaces with `src/database/storage.ts`.
  - Exposes reactive observables for:
    - Lessons completed & progress percentages.
    - Exercises solved per lesson.
    - Quiz scores and attempt history.
    - Total solved count and current learning streak.
  - Automatically commits changes via IndexedDB transactions.
- **`LessonContext` / `useLessonProgress`**:
  - Maintains the active exercise, user queries, hints revealed, and active tab within the current lesson.

---

## 5. Security & Isolation Model

- **No Remote Code Execution**: All computation occurs entirely inside the client's WebAssembly sandbox.
- **No Access to Storage**: SQLite instances are strictly in-memory (`ArrayBuffer`). The SQLite engine has no access to the browser's DOM, IndexedDB, cookies, or local file system.
- **Content Security**: No user-supplied SQL or inputs are ever rendered as unescaped HTML or passed to `eval()`.
- **Zero External Telemetry**: No third-party analytics, tracking pixels, or remote logging scripts are loaded.
