# QueryPath — Task Roadmap (TODO)

## Phase 1: Planning and Documentation
- [x] Create `PROJECT_CONTEXT.md` as primary source of truth.
- [x] Create `IMPLEMENTATION_PLAN.md`.
- [x] Create `ARCHITECTURE.md`.
- [x] Create `DESIGN_SYSTEM.md`.
- [x] Create `LESSON_AUTHORING_GUIDE.md`.
- [x] Create `OFFLINE_AND_STORAGE.md`.
- [x] Create `SEO_STRATEGY.md`.
- [x] Create `PROGRESS_TRACKING.md`.
- [x] Create `CHANGELOG.md`.
- [x] Create `TODO.md`.

## Phase 2: Application Scaffolding & Foundation
- [x] Initialize Vite + React + TypeScript configuration.
- [x] Configure Tailwind CSS with CSS variables for Soft Light, Warm Paper, Soft Dark themes.
- [x] Setup React Router with routes (`/`, `/learn`, `/learn/sql-basics`, `/learn/sql-select-queries`, `/practice`, `/quizzes`, `/progress`, `/bookmarks`, `/notes`, `/settings`, `/about`, `/privacy`, `/accessibility`).
- [x] Build responsive layout shell (`AppShell`, `Sidebar`, `Header`, `RightPanel`).
- [x] Implement theme manager hook and context (`useTheme`).
- [x] Implement UI primitives: `Button`, `Card`, `Badge`, `Modal`, `ProgressBar`, `Tabs`.
- [x] Build Home Dashboard view with real metrics and empty state.

## Phase 3: SQL Execution Engine & Editor
- [x] Copy `sql-wasm.wasm` and configure SQLite WebAssembly module loader.
- [x] Implement query safety validator (reject `DROP`, `UPDATE`, `DELETE`, `INSERT` during read-only lessons).
- [x] Integrate CodeMirror 6 SQL editor with syntax highlighting, line numbers, and keyboard shortcuts (`Ctrl+Enter`).
- [x] Build results table component with execution time in ms, row counts, and numeric alignment.
- [x] Implement automatic exercise verification engine (cardinality, column headers, unordered multiset comparison).

## Phase 4: Curricula & Lessons Implementation
- [x] Define dataset `LibraryBooks` (schema + 5 sample records).
- [x] Implement Lesson 1: Introduction to SQL and Relational Databases:
  - [x] Concept sections with analogies and diagrams.
  - [x] 3 comprehension questions.
  - [x] Terminology matching interactive activity.
  - [x] Row and column identification exercise.
  - [x] 5-question knowledge quiz.
- [x] Define dataset `CourseCatalog` (schema + 6 sample records).
- [x] Implement Lesson 2: Your First SQL Queries:
  - [x] Concept sections on `SELECT`, `FROM`, columns, wildcards, semicolons.
  - [x] 5 interactive SQL exercises with editor, run button, hints, and progressive solutions.
  - [x] 5-question knowledge quiz.
- [x] Implement multi-lesson Review Test (10 questions, 80% passing threshold).
- [x] Implement Freeform Practice Playground with dataset selector and schema inspector.

## Phase 5: Persistence & Progress Engine
- [x] Setup IndexedDB database `querypath_db` (version 1) using `idb`.
- [x] Implement store schema: `lessons_progress`, `exercise_attempts`, `quiz_attempts`, `notes`, `bookmarks`, `user_settings`.
- [x] Implement reactive progress hook (`useProgress`).
- [x] Implement student notes interface per lesson.
- [x] Implement bookmark toggling.
- [x] Implement JSON progress export and schema-validated import.

## Phase 6: Offline Support & Service Worker
- [x] Create `public/sw.js` with Cache-First strategy for WASM and static bundles.
- [x] Register Service Worker in application entrypoint.
- [x] Provide visual offline status indicator badge.
- [x] Create `public/manifest.webmanifest`.

## Phase 7: SEO & Accessibility
- [x] Ensure all lesson content is rendered in semantic HTML.
- [x] Configure dynamic document title and meta description updates.
- [x] Create `public/robots.txt` and `public/sitemap.xml`.
- [x] Audit keyboard focus styles, contrast ratios, and reduced motion settings.

## Phase 8: Final Validation & Delivery
- [x] Run production build (`npm run build`).
- [x] Verify zero TypeScript, lint, or console errors.
- [x] Test offline query execution in SQLite WASM engine.
- [x] Update project documentation.
- [x] Streamline Home page to include only necessary options:
  - [x] Bold `CEERAS` logo in Raleway font matching user reference design.
  - [x] Clean header navigation (`Home`, `Verify`, `About Us`, `Contact Us`, `Courses ˅`, `Quizes ˅`, Search, Theme switcher).
  - [x] Exact hero typography in `#0E5E77`, subtitle, and cyan "Register Now" pill.
  - [x] Featured Courses section presenting the active interactive SQL course with live progress tracking, plus clean previews of future tracks.
- [x] Ensure full Cloudflare Pages & Workers deployment eligibility:
  - [x] Created `public/_redirects` (`/* /index.html 200`) for seamless client-side SPA routing on all deep links.
  - [x] Created `public/_headers` specifying `application/wasm` MIME type and immutable edge caching.
  - [x] Created `.node-version` (`20.18.0`) for Cloudflare Pages build runners.
  - [x] Created `wrangler.toml` for 1-click Wrangler CLI deployments (`npm run deploy:cloudflare`).
  - [x] Verified full production build into `dist/` with zero server runtime dependencies.

---

## Future Scope (Post-Foundation Scope)
- [ ] Future Lesson 3: WHERE clause filtering and comparison operators (`=`, `<>`, `<`, `>`, `BETWEEN`, `IN`).
- [ ] Future Lesson 4: Logical operators (`AND`, `OR`, `NOT`).
- [ ] Future Lesson 5: Sorting output with `ORDER BY` (`ASC`, `DESC`).
- [ ] Future Lesson 6: Limiting results with `LIMIT` and `OFFSET`.
- [ ] Future Lesson 7: Aggregations with `COUNT`, `SUM`, `AVG`, `MIN`, `MAX`, and `GROUP BY`.
- [ ] Future Lesson 8: Multi-table relational joins (`INNER JOIN`, `LEFT JOIN`).
