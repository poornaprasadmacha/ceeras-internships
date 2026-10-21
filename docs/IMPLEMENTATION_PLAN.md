# QueryPath — Implementation Plan

This document establishes the step-by-step phased execution plan for building the QueryPath platform. Each phase includes clear exit gates and validation criteria.

---

## Phase 1: Planning, Context & Documentation Setup
- **Goal**: Establish the persistent source of truth and architectural specifications.
- **Deliverables**:
  - `docs/PROJECT_CONTEXT.md`
  - `docs/IMPLEMENTATION_PLAN.md`
  - `docs/ARCHITECTURE.md`
  - `docs/DESIGN_SYSTEM.md`
  - `docs/LESSON_AUTHORING_GUIDE.md`
  - `docs/OFFLINE_AND_STORAGE.md`
  - `docs/SEO_STRATEGY.md`
  - `docs/PROGRESS_TRACKING.md`
  - `docs/CHANGELOG.md`
  - `docs/TODO.md`
- **Verification Gate**: All 10 documents created and internally consistent.

---

## Phase 2: Application Foundation & Scaffolding
- **Goal**: Scaffold the Vite + React + TypeScript + Tailwind CSS application with responsive shell and theme engine.
- **Steps**:
  1. Initialize Vite project with React and TypeScript.
  2. Install core dependencies: `react-router-dom`, `lucide-react`, `tailwindcss`, `idb`, `clsx`, `tailwind-merge`.
  3. Install editor dependencies: `@uiw/react-codemirror`, `@codemirror/lang-sql`.
  4. Install SQL engine: `sql.js` and types `@types/sql.js`.
  5. Setup Tailwind configuration with CSS custom properties for Soft Light, Warm Paper, and Soft Dark themes.
  6. Implement the responsive application shell:
     - Left Sidebar (Navigation links, Brand mark, Progress summary).
     - Global Header (Route breadcrumbs, Theme selector, Offline indicator, Shortcuts).
     - Collapsible Right Companion Panel (Objectives, Hints, Concept quick-notes).
     - Mobile navigation drawer / bottom tab bar.
  7. Build core UI primitives: Button, Card, Badge, Modal, Tabs, ProgressBar, Skeleton.
  8. Build the Home Dashboard featuring real local statistics, resume CTA, and course roadmap.
- **Verification Gate**: Responsive across desktop (1440px), tablet (768px), and mobile (375px). Dynamic theme switching persists in localStorage / IndexedDB. Zero emojis.

---

## Phase 3: Browser-Based SQL Execution Engine
- **Goal**: Implement zero-server local SQL execution using SQLite WebAssembly (`sql.js`).
- **Steps**:
  1. Copy `sql-wasm.wasm` to `public/` and configure Vite asset handling.
  2. Implement `src/database/sqlEngine.ts` to manage WASM loading, worker/thread isolation, and database initialization.
  3. Implement safety guards in `src/database/queryValidator.ts` to block destructive SQL statements (`DROP`, `ALTER`, `DELETE`, `UPDATE`, `INSERT`) in student read exercises.
  4. Build CodeMirror SQL editor component with syntax highlighting, line numbers, and keyboard shortcuts (`Ctrl+Enter` / `Cmd+Enter` to run).
  5. Build formatted Results Table with column headers, row counts, and execution duration.
  6. Build semantic result verification engine to compare student queries against reference queries (cardinality, column headers, values, unordered row matching).
- **Verification Gate**: Execute `SELECT 1 + 1;` locally without any network request. Verify safe rejection of `DROP TABLE`.

---

## Phase 4: Lessons & Educational Content
- **Goal**: Author and verify Lesson 1 and Lesson 2 with original content and datasets.
- **Steps**:
  1. **Dataset 1 (`LibraryBooks`)**:
     - Define `src/data/datasets/libraryBooks.ts`.
     - Seed 5 original fictional books.
  2. **Lesson 1: Introduction to SQL and Relational Databases**:
     - Fictional library university analogies.
     - Narrative sections: What is a DB, Relational DBs, Tables/Rows/Columns, Popular RDBMS, Why SQL.
     - 3 comprehension checkpoints.
     - Terminology matching interactive activity.
     - 1 row/column identification exercise.
     - 5-question knowledge quiz with detailed answer feedback.
     - Completion criteria.
  3. **Dataset 2 (`CourseCatalog`)**:
     - Define `src/data/datasets/courseCatalog.ts`.
     - Seed 6 original fictional courses.
  4. **Lesson 2: Your First SQL Queries**:
     - Narrative: SELECT, FROM, single column, multiple columns, asterisk wildcard, semicolon conventions, syntax pitfalls.
     - 5 interactive coding tasks:
       1. Display every course name (`SELECT course_name FROM CourseCatalog;`).
       2. Display course names and instructors (`SELECT course_name, instructor FROM CourseCatalog;`).
       3. Display course IDs and duration hours (`SELECT course_id, duration_hours FROM CourseCatalog;`).
       4. Display every column from CourseCatalog (`SELECT * FROM CourseCatalog;`).
       5. Display course names and difficulty levels (`SELECT course_name, level FROM CourseCatalog;`).
     - Hints, progressive solutions, execution verification.
     - 5-question knowledge quiz.
  5. **Review Test**:
     - Comprehensive 10-question assessment covering Lessons 1 and 2.
     - 80% passing grade requirement.
  6. **Lesson Manifest**:
     - Register in `src/data/lessons/index.ts`.
- **Verification Gate**: All exercises execute and verify correctly against SQLite. All quizzes report accurate scores.

---

## Phase 5: Storage Layer & Progress Persistence
- **Goal**: Implement resilient IndexedDB persistence with versioning and migration.
- **Steps**:
  1. Implement `src/database/storage.ts` using `idb`.
  2. Define object stores: `lessons_progress`, `exercise_attempts`, `quiz_attempts`, `notes`, `bookmarks`, `user_settings`.
  3. Implement automatic progress calculation hook (`useProgress`).
  4. Add student Notes feature with auto-save per lesson.
  5. Add Bookmarks feature with instant toggling.
  6. Implement JSON Progress Export & Schema-Validated Import with confirmation modal.
- **Verification Gate**: Reload browser page and close/re-open tab; verify progress, notes, and theme remain intact.

---

## Phase 6: Offline-First Architecture & Service Worker
- **Goal**: Ensure the entire application works offline after the initial visit.
- **Steps**:
  1. Create `public/sw.js` Service Worker with Cache-First strategy for WASM and static assets.
  2. Register Service Worker in `src/app/main.tsx`.
  3. Cache `sql-wasm.wasm`, local scripts, stylesheets, and icons.
  4. Provide offline indicator banner in the UI.
  5. Add `public/manifest.webmanifest`.
- **Verification Gate**: Toggle "Offline" mode in browser DevTools Network tab; refresh page; run queries and complete quizzes successfully.

---

## Phase 7: SEO, Discoverability & Accessibility
- **Goal**: Full search discoverability, indexable semantic markup, and WCAG 2.2 AA accessibility.
- **Steps**:
  1. Add semantic metadata (title, description, canonical link, OpenGraph) per route.
  2. Generate static `public/robots.txt` and `public/sitemap.xml`.
  3. Ensure all lesson text is present in semantic HTML tags (`<main>`, `<article>`, `<section>`, `<h1>`-`<h3>`, `<p>`).
  4. Verify contrast ratios across all 3 themes.
  5. Ensure keyboard navigation across all buttons, inputs, editors, and dialogs.
  6. Test with `prefers-reduced-motion`.
- **Verification Gate**: Validate sitemap format, robots.txt, and keyboard focus states.

---

## Phase 8: Final Validation & Delivery
- **Goal**: End-to-end verification and documentation update.
- **Steps**:
  1. Run `npm run build` and `npm run preview`.
  2. Resolve any TypeScript compiler or bundling warnings.
  3. Verify all routes: `/`, `/learn`, `/learn/sql-basics`, `/learn/sql-select-queries`, `/practice`, `/quizzes`, `/progress`, `/bookmarks`, `/notes`, `/settings`, `/about`, `/privacy`, `/accessibility`.
  4. Update `docs/CHANGELOG.md` and `docs/TODO.md`.
  5. Generate final handoff report.
- **Verification Gate**: Zero runtime console errors, clean build, 100% acceptance criteria satisfied.
