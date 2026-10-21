# QueryPath — Changelog

All notable changes to the QueryPath platform will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [0.3.0] - Ultimate SQL Curriculum (24 Lessons Zero to Senior Advanced) - 2026-10-21

### Added
- **Complete Expansion to 24-Lesson Ultimate Curriculum**:
  - Expanded from 16 to 24 comprehensive interactive lessons covering all topics of relational database engineering from zero to senior advanced:
    - **Lesson 17**: Conditional Logic with `CASE WHEN` (`FlightBookings` dataset)
    - **Lesson 18**: Subqueries & Nested Queries (`TechEmployees` dataset - scalar, list, and benchmark queries)
    - **Lesson 19**: Set Operations (`OnlineCustomers` & `RetailCustomers` - `UNION`, `UNION ALL`, `INTERSECT`, `EXCEPT`)
    - **Lesson 20**: Common Table Expressions (`SoftwareProjects` & `ProjectHours` - `WITH ... AS (...)`)
    - **Lesson 21**: Window Functions & Leaderboards (`TrackAthletes` - `ROW_NUMBER()`, `RANK()`, `OVER (PARTITION BY ... ORDER BY ...)`)
    - **Lesson 22**: Window Aggregates & Running Totals (`DailyRevenue` - `SUM() OVER (...)`, chronological running balances)
    - **Lesson 23**: Database Views & Virtual Abstractions (`DoctorRoster` - `CREATE VIEW ... AS SELECT ...`, `DROP VIEW`)
    - **Lesson 24**: Indexes & Query Performance Tuning (`AppUserLogs` - `CREATE INDEX`, B-Trees, latency optimization)
  - 8 new original datasets with clean schemas, sample rows, and isolated in-browser SQLite WebAssembly execution.
  - Interactive exercises, dynamic quick-code chips, and concept quizzes for every new module.

## [0.2.0] - Theme Switcher & Kid-Friendly UI/UX Polish - 2026-10-21

### Added
- **Top-Level Mode Switcher (`ThemeToggle`)**:
  - Integrated an accessible visual mode toggle at the top of the site in both `CeerasHeader` (public homepage) and `Header` (inner learning views).
  - Supports 3 eye-friendly themes: **Soft Light** (Day / ☀️), **Warm Paper** (Cozy / 📖), and **Soft Dark** (Night / 🌙).
  - Responsive design: Segmented pill on tablet/desktop and compact 1-tap cycle button on mobile.
  - Added dedicated appearance mode selector inside the mobile drawer menu.

### Enhanced
- **Kid & Student-Friendly UI/UX Refinements**:
  - **Inline Table Data Preview**: Added "Table Data" button directly inside `ExerciseWorkspace` so students can view columns and sample records without switching tabs.
  - **Contextual Quick SQL Chips**: Expanded SQL building blocks with dynamic contextual keywords (`AND`, `OR`, `LIKE`, `JOIN`, `ORDER BY`, `INSERT INTO`, `VALUES`, `SET`, etc.) for tap-to-type query construction.
  - **Celebration & Guided Next Steps**: Instant celebratory feedback banner upon solving exercises with direct `Next Task →` and `Take Knowledge Quiz →` buttons.
  - **Gentle Guidance on Mistakes**: Friendly clue prompts and direct `Show Hint` buttons rather than harsh error messages.

### Fixed
- **Database Mutation Stale State Bug**:
  - Fixed mutation query execution in `ExerciseWorkspace` so each execution begins from a clean dataset instance, preventing duplicate key or constraint violation errors during repeated student attempts.
  - Added "Reset Table Data" action to reload the pristine SQLite table anytime.
- **Header Lessons Count**:
  - Updated dropdown metadata to accurately state 16 Lessons (Zero to Advanced).
- **QuizRunner Empty State**:
  - Added null guard preventing errors if quiz questions array is undefined or empty.

### Added
- **Comprehensive 16-Lesson Interactive SQL Curriculum (Zero to Advanced)**:
  - Added complete interactive lessons covering the entire SQL curriculum inspired by SQLBolt with original datasets and zero plagiarism:
    - **Lesson 1**: Introduction to SQL and Relational Databases (`LibraryBooks`)
    - **Lesson 2**: Your First SQL Queries (`CourseCatalog`)
    - **Lesson 3**: Queries with Text Constraints (`HospitalPatients` - `LIKE`, wildcards, `IN`)
    - **Lesson 4**: Filtering and Sorting Query Results (`WorldCities` - `DISTINCT`, `ORDER BY`, `LIMIT`, `OFFSET`)
    - **Lesson 5**: Multi-Table Queries with INNER JOIN (`StudentEnrollments` - `INNER JOIN ... ON`)
    - **Lesson 6**: Outer Queries with LEFT JOIN (`EmployeeDepartments` - `LEFT JOIN ... ON`)
    - **Lesson 7**: Working with NULLs and Missing Data (`CustomerFeedback` - `IS NULL`, `IS NOT NULL`)
    - **Lesson 8**: Queries with Expressions and Aliases (`FleetVehicles` - math formulas, `AS` aliases)
    - **Lesson 9**: Queries with Aggregate Functions (`ProductSales` - `COUNT`, `SUM`, `AVG`, `MIN`, `MAX`)
    - **Lesson 10**: Grouped Aggregations with GROUP BY and HAVING (`UniversityStaff` - `GROUP BY`, `HAVING`)
    - **Lesson 11**: SQL Query Order of Execution (`ECommerceOrders` - 8-step pipeline)
    - **Lesson 12**: Inserting New Rows with INSERT INTO (`FitnessMembers` - `INSERT INTO ... VALUES`)
    - **Lesson 13**: Updating Existing Rows with UPDATE (`WarehouseStock` - `UPDATE ... SET ... WHERE`)
    - **Lesson 14**: Deleting Rows with DELETE (`SystemEvents` - `DELETE FROM ... WHERE`)
    - **Lesson 15**: Creating Tables with CREATE TABLE (`SchoolCourses` - schema, types, constraints)
    - **Lesson 16**: Altering and Dropping Tables (`CampusFacilities` - `ALTER TABLE`, `DROP TABLE`)
  - Low-text, visual, example-driven pedagogy for all lessons with bite-sized takeaways, visual syntax anatomy diagrams, and interactive coding exercises.
  - Enabled dual-mode verification supporting both read queries and state-modifying DML/DDL operations.
- **Unified Ceeras Color System & Raleway Typography**:
  - Unified color tokens across all three themes (Soft Light, Warm Paper, Soft Dark) centered around Ceeras Deep Teal (`#0E5E77`) and Cyan Accent (`#008D9B`).
  - Added Google Font **Raleway** (`font-raleway`) bundled locally via `public/fonts/Raleway-Variable.woff2` for offline capability.
  - Redesigned brand logo across top header and sidebars with **LEARN** at top and **by Ceeras** tagline underneath in bold Raleway.
  - Applied consistent heading typography across all pages (Home, Lessons, Playground, Quizzes, Progress, Bookmarks, Notes, Settings).
- **Multi-Course Academy Architecture**:
  - Structured the Home page Course Catalog to support future academy tracks (Python, NumPy, Data Science, JavaScript).
  - Implemented interactive Category Filter tabs (`All Courses`, `Databases & SQL`, `Python & Data Science`, `Web Development`).
  - Added rich syllabus preview modals for upcoming courses detailing modules, estimated durations, and local "Notify Me" interest toggles.
- **Learn by Ceeras Brand & Home Redesign**:
  - Home landing page branded as **Learn by Ceeras** featuring the Google Font **Aboreto**.
  - Integrated custom hero illustration (`/images/ceeras-hero.png`) from downloaded assets.
  - Featured Courses catalog section highlighting the active **SQL & Relational Databases** interactive course alongside upcoming advanced modules.
- **Mobile-First UX & Bottom Navigation**:
  - Dedicated mobile bottom navigation bar (`BottomNav`) for small screens with Home, Lessons, Sandbox, Quizzes, and Menu drawer.
  - Generous touch targets and responsive layouts preventing horizontal overflow.
- **Quick SQL Keyboard Chips**:
  - Touch-friendly tap-to-insert pill buttons for core keywords (`SELECT`, `FROM`, `*`, `,`, `;`) and table-specific column names.
  - Greatly reduces mobile keyboard friction when typing SQL punctuation and identifiers.
- **High-Engagement Interactive Learning Tools (Low-Text)**:
  - `InteractiveTableVisualizer`: Tap any column header or row index to see instant visual highlighting explaining relational structures.
  - `SqlSyntaxBreakdown`: Interactive block diagram breaking down SQL statements (`SELECT`, `[columns]`, `FROM`, `[table]`, `;`).
  - `InteractiveQuerySimulator`: Toggle column checkboxes to watch the returned table shape dynamically adapt in real-time.
  - Replaced dense paragraphs with bite-sized, bulleted takeaway cards.
- **Code Editor Enhancements**:
  - Enabled CodeMirror `EditorView.lineWrapping` for mobile responsiveness.
  - Pre-bundled `sql.js` properly via Vite for zero-configuration browser execution.
- **Architectural Documentation**:
  - `PROJECT_CONTEXT.md` acting as the persistent source of truth.
  - `IMPLEMENTATION_PLAN.md`, `ARCHITECTURE.md`, `DESIGN_SYSTEM.md`, `LESSON_AUTHORING_GUIDE.md`.
  - `OFFLINE_AND_STORAGE.md`, `SEO_STRATEGY.md`, `PROGRESS_TRACKING.md`, `CHANGELOG.md`, `TODO.md`.
- **Brand Identity**:
  - Original brand "QueryPath" with tagline "Learn SQL. Practise freely. Build real skills."
  - Configurable brand constant in code.
  - Completely original visual identity, typography, and color tokens.
- **Visual Design System**:
  - Three switchable themes: Soft Light (default), Warm Paper, and Soft Dark.
  - Custom CSS variables for theme swapping without page refresh.
  - Zero emojis throughout the interface.
- **Application Shell & Navigation**:
  - Responsive layout (Desktop 3-column with collapsible right panel, Tablet responsive navigation, Mobile bottom/drawer navigation).
  - Main navigation: Dashboard, Lessons, Practice Playground, Quizzes, Progress, Bookmarks, Notes, Settings.
- **WASM SQLite Execution Engine**:
  - Client-side SQLite execution powered by `sql.js` WebAssembly.
  - Read-only execution safety guard rejecting data-modifying statements (`DROP`, `ALTER`, `DELETE`, etc.).
  - Isolated database instances populated per exercise.
- **Code Editor & Results Table**:
  - CodeMirror SQL editor with line numbers, syntax highlighting, and keyboard shortcuts (`Ctrl+Enter`).
  - Formatted results table with column headers, row counts, and execution metrics.
- **Lessons & Curricula**:
  - **Lesson 1**: *Introduction to SQL and Relational Databases* (Dataset: `LibraryBooks`). Includes conceptual walkthroughs, 3 comprehension questions, terminology matching, row/column identification, and a 5-question knowledge quiz.
  - **Lesson 2**: *Your First SQL Queries* (Dataset: `CourseCatalog`). Covers `SELECT`, `FROM`, column selection, wildcards, and 5 interactive coding exercises with real-time verification and progressive hints. Includes a 5-question knowledge quiz.
  - **Review Test**: Multi-lesson 10-question assessment covering Lessons 1 and 2 with an 80% passing threshold.
  - **Practice Playground**: Freeform SQL sandbox with dataset selection and schema inspector.
- **Storage & Offline Capabilities**:
  - IndexedDB storage engine (`querypath_db`) tracking lessons, exercise attempts, quiz scores, notes, bookmarks, and user settings.
  - JSON progress export and validated import.
  - Service Worker caching core assets and WebAssembly binaries for offline access.
  - Offline status indicator badge.
- **SEO & Accessibility**:
  - Semantic HTML, unique meta titles, descriptions, canonical URLs.
  - `sitemap.xml`, `robots.txt`, and web app manifest.
  - WCAG 2.2 AA accessibility with visible focus rings and keyboard-friendly controls.
