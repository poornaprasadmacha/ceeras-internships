# Project Context: SQL Interactive Learning Platform

## 1. Project Purpose & Intended Learners
The SQL Interactive Learning Platform is an in-browser, offline-capable, interactive educational application developed by Ceeras. It is designed specifically for:
- Complete beginners with zero programming or database background.
- Students and professionals transitioning into data analysis, backend development, QA, or product management.
- Self-learners seeking a calm, structured, hands-on environment to practice real SQL syntax without complex database server installation.

The platform emphasizes conceptual clarity, immediate execution feedback, touch-friendly mobile navigation, and strict zero-clutter pedagogy.

---

## 2. Existing Technology Stack
- **Framework & Build System**: React 18, TypeScript 5, Vite 5.
- **Styling**: Tailwind CSS 3, custom CSS variables in `src/styles/index.css`.
- **Database Engine**: In-browser SQLite compiled to WebAssembly via `sql.js` (running 100% locally in the browser).
- **Client Persistence**: IndexedDB via `idb` for structured progress, completed exercises, quiz scores, and learner notes; `localStorage` for theme and view preferences.
- **Routing**: `react-router-dom` v6 with HashRouter/BrowserRouter compatibility.
- **Icons**: FontAwesome 6 icons loaded securely via CDN/SVG.

---

## 3. Current Application Architecture
```
SQL/
├── index.html                # Entry HTML with Aboreto & Raleway fonts, favicon
├── src/
│   ├── components/           # Reusable UI elements (Buttons, Badges, Modals, Breadcrumbs, etc.)
│   │   ├── common/           # Navbar, Footer, Breadcrumbs, ConfirmModal
│   │   ├── editor/           # SqlEditor, QuickSqlChips, QueryResultTable
│   │   └── layout/           # MainLayout, Sidebar, Container
│   ├── database/             # SQLite WASM integration & storage
│   │   ├── sqlEngine.ts      # sql.js initialization, query runner, schema introspection
│   │   ├── queryValidator.ts # Semantic SQL query checker & error humanizer
│   │   └── storage.ts        # IndexedDB operations (lessons, notes, quizzes, streaks)
│   ├── data/
│   │   └── lessons/          # Structured lesson curriculum definitions
│   │       ├── lesson1.ts    # Lesson 1: Introduction to Databases & SQL
│   │       ├── lesson2.ts    # Lesson 2: Filtering with WHERE
│   │       └── ...
│   ├── features/
│   │   ├── dashboard/        # Course progress dashboard, streaks, certificate
│   │   ├── lessons/          # LessonView, SqlSyntaxBreakdown, TerminologyMatcher, ElementIdentifier, ExerciseWorkspace
│   │   ├── quizzes/          # QuizRunner, QuestionCard, ScoreSummary
│   │   └── practice/         # Freeform SQL playground & schema explorer
│   ├── hooks/                # Custom React hooks (useProgress, useSqlEngine, useTheme)
│   ├── styles/               # index.css with design tokens and resets
│   └── types/                # TypeScript interfaces for lessons, quizzes, progress, SQL schemas
```

---

## 4. Important Routes & Components
- `/`: Course Curriculum Overview & Lesson Catalog.
- `/lessons/:lessonId`: Main interactive lesson view (`LessonView.tsx`).
- `/practice`: Free SQL Sandbox / Playground (`PlaygroundView.tsx`).
- `/progress`: Personal learning dashboard, quiz history, and notes manager (`DashboardView.tsx`).
- `/quiz/:lessonId`: Dedicated quiz assessment mode (`QuizRunner.tsx`).

Key Components:
- `LessonView.tsx`: Manages the session tabs (Explanation, Interactive Anatomy, Coding Exercises, Knowledge Quiz), mobile bottom navigation, and personal notes.
- `SqlSyntaxBreakdown.tsx`: Interactive SQL anatomy component highlighting keywords, identifiers, and clauses with contextual explanations.
- `ExerciseWorkspace.tsx`: SQL editor, quick chips, table preview, run action, error humanizer, and result verification table.
- `QuizRunner.tsx`: Assessment runner with score calculation, answer review, and passing score validation.
- `QuickSqlChips.tsx`: Contextual SQL token injection chips for touch/mobile devices.

---

## 5. Existing Lesson Structure
Each lesson in `src/data/lessons/` follows a typed `Lesson` schema:
1. **Metadata**: ID, title, subtitle, difficulty, estimated time, prerequisite.
2. **Sections**: Modular explanation units with Markdown body, diagrams, and callout tips.
3. **Comprehension Questions**: In-line self-check questions before moving to hands-on tasks.
4. **Exercises**: Structured SQL challenges requiring specific schema interactions and query execution.
5. **Quiz**: 10 targeted assessment questions with multiple choice options, explanations, and references.
6. **Summary & Key Takeaways**: High-level recaps reinforcing learned concepts.

---

## 6. Existing SQL Execution Mechanism
- **Initialization**: `initSqlEngine()` loads `sql-wasm.js` and `sql-wasm-browser.wasm` from the public directory.
- **Schema Provisioning**: When a lesson loads, a virtual SQLite database is instantiated in-memory. Initial DDL (tables, rows, constraints) is applied.
- **Execution Pipeline**:
  1. Learner enters SQL query in `SqlEditor` (CodeMirror/monaco or controlled textarea).
  2. Query is passed to `runQuery(sql)`.
  3. Query execution runs in local SQLite WASM instance.
  4. Execution output returns tabular results (`columns`, `values`), row count, execution time, or SQLite error messages.
  5. Semantic validator compares output against expected criteria (columns selected, row counts, filtering logic).
- **Safety**: Fully sandboxed in browser memory; cannot harm external servers or mutate remote state.

---

## 7. Existing Progress-Tracking Logic
- Handled by `src/hooks/useProgress.tsx` interfacing with `src/database/storage.ts` via IndexedDB.
- Tracked properties:
  - `completedLessons`: Array of lesson IDs marked as finished.
  - `completedExercises`: Record of exercise IDs passed with their solved SQL queries.
  - `quizScores`: Best score and attempts per lesson quiz.
  - `notes`: User-written markdown/text notes stored per lesson.
  - `currentStreak` & `lastActiveDate`: Daily streak calculator.

---

## 8. Current Storage & Persistence Mechanisms
- **IndexedDB Store `sql_learning_platform`**:
  - `progress`: User lesson completion, exercise statuses, and dates.
  - `notes`: Key-value store of `lessonId -> noteContent` with timestamps.
  - `quizzes`: Quiz history, percentage scores, and timestamps.
- **LocalStorage**:
  - `theme`: 'soft-light' (default), 'warm-paper', 'soft-dark'.
  - `editor_font_size`: Preference for editor text size.

---

## 9. Design Tokens & Typography
- **Core Palette**:
  - Page Background: `#F7FAFC` (`var(--bg-app)`)
  - Card/Surface: `#FFFFFF` (`var(--bg-surface)`)
  - Action/Primary: `#086781` (`var(--accent-primary)`)
  - Primary Hover: `#064F63` (`var(--accent-primary-hover)`)
  - Text Primary: `#172B33` (`var(--text-primary)`)
  - Text Muted/Secondary: `#526B76` (`var(--text-secondary)`)
  - Borders: `#D7E3E8` (`var(--border-color)`)
  - Success: `#237A57` (`var(--status-success)`)
  - Success Subtle: `#E8F5EE` (`var(--status-success-subtle)`)
  - Error: `#B42318` (`var(--status-error)`)
  - Error Subtle: `#FDE8E8` (`var(--status-error-subtle)`)
  - Editor Background: `#F0F5F7` (`var(--editor-bg)`)
  - Editor Text: `#172B33` (`var(--editor-text)`)
- **Spacing Scale**: 4px, 8px, 16px, 24px, 32px (0.25rem, 0.5rem, 1rem, 1.5rem, 2rem).
- **Typography**:
  - Body: Raleway, sans-serif
  - Brand Logo: Aboreto, cursive
  - Code/Editor: JetBrains Mono, Fira Code, monospace
- **Emoji Policy**: STRICT ZERO EMOJIS in UI, messages, labels, and feedback.

---

## 10. Known Limitations
- Initial Lesson 1 had 7 verbose sections with nested sub-cards causing excessive scrolling.
- "Popular Relational Database Systems" occupied prominent reading space before learners even saw a query.
- Terminology matching and row/column classification were separated into two disconnected cards.
- Quick SQL chips exposed keywords like `JOIN`, `LIKE`, and `GROUP BY` that were not yet taught in Lesson 1.
- Personal notes had an unnecessary manual save button despite having an auto-save hook.
- Mobile touch targets in some buttons were under the 44px threshold.

---

## 11. Planned Improvements (Mobile-First UX Refactor)
1. **Consolidate Design Tokens**: Update `index.css` to exact calm corporate colors (`#F7FAFC`, `#086781`, `#172B33`, etc.).
2. **Reorganize Lesson 1 Flow**:
   - What is a database
   - What is a relational database
   - Tables, rows, columns, and cells
   - A simple SQL query
   - Optional expandable section for popular database systems (PostgreSQL, MySQL, SQLite, etc.)
3. **Streamline Interactive SQL Anatomy**: Single unified query card with tap-to-inspect keyword tokens, eliminating duplicated explanation cards.
4. **Unify Practice Exercises**: Merge `TerminologyMatcher` and `ElementIdentifier` into a single, cohesive `ConceptPractice` activity.
5. **Beginner 3-Step Exercise Progression in Lesson 1**:
   - Task 1: Inspect entire catalog (`SELECT * FROM LibraryBooks;`) with pre-filled working query.
   - Task 2: Guided column selection (`SELECT title, published_year FROM LibraryBooks;`).
   - Task 3: Independent query creation (`SELECT book_id, title, category FROM LibraryBooks;`).
6. **Dynamic Quick Chips**: Filter quick chips to only display relevant keywords and identifiers for the current lesson.
7. **Beginner-Friendly Error Categorization**: Provide clear guidance for syntax errors, missing keywords, and column/table typos.
8. **Personal Notes Optimization**: Collapsed by default, auto-saving with clear status badge and no redundant save button.
9. **Quiz Runner Polish**: Clear 10-question flow, 80% pass threshold, detailed explanations, and review state.
10. **Touch-Target & Accessibility Compliance**: Ensure all interactive controls meet $\ge 44$px touch targets with no horizontal page scroll.

---

## 12. Completed Changes
- **Phase 1: Project Documentation (`PROJECT_CONTEXT.md`)**: Created comprehensive architecture, design tokens, route registry, state, and decision records.
- **Phase 2: Consolidate Design Tokens (`src/styles/index.css`)**:
  - Configured exact required token palette: Page `#F7FAFC`, Card `#FFFFFF`, Action `#086781`, Action Hover `#064F63`, Text `#172B33`, Muted `#526B76`, Borders `#D7E3E8`, Success `#237A57`, Error `#B42318`, Editor `#F0F5F7`.
  - Maintained accessibility focus outlines and zero-emoji compliance.
- **Phase 3: Introductory Lesson Reorganization (`src/data/lessons/lesson1.ts`)**:
  - Reorganized curriculum flow into: 1. What is a Database -> 2. What is a Relational Database -> 3. Tables, Rows, Columns, and Cells -> 4. A Simple SQL Query.
  - Converted the database engines overview (SQLite, Postgres, MySQL, SQL Server, Oracle) into an optional, clean expandable section (`isCollapsible: true`).
  - Added 3-step beginner exercise progression:
    - Task 1: Inspect Library Catalog with working pre-filled query `SELECT * FROM LibraryBooks;`.
    - Task 2: Guided column selection `SELECT title, published_year FROM LibraryBooks;`.
    - Task 3: Independent query creation `SELECT book_id, title, category FROM LibraryBooks;`.
- **Phase 4: Component Consolidation & Dynamic Quick Chips**:
  - **SQL Syntax Anatomy (`SqlSyntaxBreakdown.tsx`)**: Upgraded to interactive clickable query builder with touch targets $\ge 44$px and concise active inspector without duplicated cards.
  - **Concept Practice (`ConceptPractice.tsx`)**: Created unified practice component integrating Terminology Matching and Element Classification into one cohesive card with tabbed navigation and reset controls.
  - **Dynamic Quick Chips (`QuickSqlChips.tsx`)**: Added `allowedKeywords` prop support so Lesson 1 displays only relevant keywords (`SELECT`, `*`, `FROM`, `;`, `,`) without overwhelming beginners with `JOIN`, `LIKE`, or `COUNT(*)`.
  - **Error Categorization (`src/database/sqlEngine.ts`)**: Added clear pedagogical error prefixes (`[Syntax Error]`, `[Table Error]`, `[Column Error]`, `[Incomplete Statement]`) with actionable debugging tips.
- **Phase 5: Mobile-First UX & Personal Notes in `LessonView.tsx`**:
  - Made Personal Notes collapsed by default with one-click expansion.
  - Added debounced auto-save directly to IndexedDB with a subtle status badge (`Saving...` / `Saved locally`), eliminating the redundant manual save button.
  - Enforced touch targets $\ge 44$px on all navigation buttons, session pills, and option cards.
  - Added clear End-of-Lesson Summary card with primary "Continue to Next Lesson" and secondary "Course Lessons".
- **Phase 6: Reference-Aligned Interactive Tutorial UX (User Request)**:
  - Removed "Course Outcomes" / "What you will master" box completely to eliminate unnecessary reading clutter.
  - Eliminated bloated session titles and sticky tab navigator in favor of a clean, linear tutorial flow (`Step 1: ...`, `Step 2: ...`, `Step 3: ...`, `Step 4: ...`) with crisp blue underlines (`border-b-2 border-[#0066cc]`).
  - Created [`src/features/lessons/TutorialCallouts.tsx`](file:///c:/Users/poorn/OneDrive/Desktop/SQL/src/features/lessons/TutorialCallouts.tsx):
    - Light blue `ConceptBox` (`bg-[#eef6ff] border-l-4 border-[#0284c7]`).
    - Light green `ProTipBox` (`bg-[#f0fdf4] border-l-4 border-[#16a34a]`).
    - Warm yellow `KnowledgeCheck` card (`bg-[#fffbeb] border-[#fde68a] text-[#ea580c]`) with interactive answer reveal.
    - Light gray `OutputBox` (`bg-[#f8fafc] border-[#e2e8f0]`) for structured data samples.
  - Created [`src/features/lessons/EmbeddedSqlEditor.tsx`](file:///c:/Users/poorn/OneDrive/Desktop/SQL/src/features/lessons/EmbeddedSqlEditor.tsx):
    - Embedded the live interactive SQL editor directly within the tutorial narrative (under Step 2 and Step 3).
    - Upgraded CodeMirror styling in [`src/components/editor/SqlEditor.tsx`](file:///c:/Users/poorn/OneDrive/Desktop/SQL/src/components/editor/SqlEditor.tsx) to dark charcoal `#1e293b` with SQL syntax highlighting (`SELECT`, `FROM`, numbers, strings).
    - Integrated quick chips, run execution against in-browser SQLite WASM, and live tabular output matching the reference design.
  - Embedded the full 10-question Knowledge Assessment Quiz directly at the bottom of the course page so learners never leave the tutorial context.
- **Phase 7: Unified White Background, 2-Theme Mode & W3Schools Dark Theme**:
  - Unified daylight mode background to pure white `#FFFFFF` across the application shell, container, header, and tutorial content, eliminating two-tone gray/white container borders.
  - Reduced theme options to strictly two modes: **Daylight Mode** (pure white) and **Dark Mode** (deep slate navy), removing the warm paper mode.
  - Implemented the dark mode palette matching the provided W3Schools reference screenshot:
    - Background: Deep slate navy `#15202B`
    - Cards and surfaces: `#1B2A38`
    - Borders: `#283B4D`
    - Main text & headings: `#FFFFFF`
    - Secondary/muted text: `#99AAB8`
    - Action blue button: `#007BFF`
  - Added full dark mode support to all in-line tutorial callouts:
    - `ConceptBox`: `dark:bg-[#1a2e40] dark:border-[#38bdf8] dark:text-[#e2e8f0]`
    - `ProTipBox`: `dark:bg-[#162f22] dark:border-[#22c55e] dark:text-[#e2e8f0]`
    - `KnowledgeCheck`: `dark:bg-[#1f261e]/90 dark:border-[#4d401a] dark:text-[#e6edf3]`
    - `OutputBox`: `dark:bg-[#0f172a] dark:border-[#283b4d] dark:text-[#cbd5e1]`
    - `EmbeddedSqlEditor`: `dark:bg-[#1b2a38] dark:border-[#283b4d]`
  - Configured the dark mode logo styling so that in Dark Mode the CEERAS brand logo renders in crisp solid pure white (`#FFFFFF`), with gradient styling cleanly active during Daylight Mode.
  - Verified with `npx tsc --noEmit` (exit code 0), `npm run build` (exit code 0), and zero-emoji scan (exit code 0).
- **Phase 8: Complete Homepage UI/UX Optimization**:
  - Conducted full audit of the existing homepage (`DashboardView.tsx`), top navigation (`CeerasHeader.tsx`), and digital rotating globe (`RotatingGlobe.tsx`).
  - Architecture & Student State Logic:
    - Returning Students: Personalized welcome greeting, prominent "Continue Learning" hero card displaying the next incomplete lesson from real data, active curriculum progress bar, Study Analytics (completed lessons, exercises solved, quiz average, streak), and bookmarked lessons.
    - New / Unauthenticated Visitors: Mission headline ("Spreading knowledge to ignite global change."), comprehensive value propositions (100% in-browser WASM runtime, zero installation, practical query verification), curated Career Learning Paths (Data Analyst, Web Developer, AI/ML Specialist), and direct "Explore Courses" action.
  - Standardized Course Card Grid: Uniform card anatomy across all 11 courses with official technology icons, categorized tags, clear descriptions, lesson counts, real progress tracking, and contextual action buttons ("Start Course", "Continue Learning", "Review Course").
  - Course Discovery & Filtering: Added instant category filter pills (All Tracks, Databases & SQL, Programming & Python, Web Development, Data Science & AI, Developer Tools) and real-time title/technology search.
  - Assessments & Bookmarks: Integrated Foundation Review Test card with score status and pass criteria, plus direct bookmark management.
  - Theme & Accessibility: Full WCAG 2.2 AA compliance across pure Daylight `#FFFFFF` and W3Schools Dark `#15202B` palettes, responsive layout without clipping or horizontal overflow, strictly zero emojis.
- **Phase 9: Comprehensive Text Selection & High-Contrast Highlight Support**:
  - Removed restrictive `select-none` classes across interactive simulators, tables, visualizers, syntax tokens, quick code chips, and lesson summaries (`VsCodeSimulator`, `PandasTable`, `InteractiveTableVisualizer`, `SqlSyntaxBreakdown`, `InteractiveQuerySimulator`, `QuickSqlChips`, workspaces).
  - Configured global `-webkit-user-select: text` and `user-select: text` in `src/styles/index.css` across `html` and `body`.
  - Replaced the low-opacity selection tint in `index.html` with explicit, high-contrast, accessible `::selection` rules:
    - Daylight Mode: Soft cyan `#BCE8F4` background with deep Ceeras blue `#023E8A` text.
    - Dark Mode: Solid blue `#007BFF` background with pure white `#FFFFFF` text.
  - Verified with `npx tsc --noEmit` (exit code 0), `npm run build` (exit code 0), and zero-emoji verification.
- **Phase 10: Comprehensive UI/UX Audit, Bug Detection & Student-Friendly Experience**:
  - Conducted full multi-page audit across all routes (`/`, `/learn`, `/learn/:slug`, `/quizzes`, `/progress`, `/practice`, `/bookmarks`, `/notes`, `/settings`, `/about`, `/accessibility`, `/privacy`).
  - Created structured issue register in `UI_UX_AUDIT.md` (tracking 12 verified issues).
  - Fixed Critical Bug ISS-001 in `LessonView.tsx`: All SQL lessons 2–24 previously rendered hardcoded Lesson 1 tutorial prose; updated to dynamically render authentic sections, dataset previews, embedded coding exercises, and knowledge quizzes for each lesson.
  - Fixed High Bug ISS-002: Created and integrated `CeerasFooter.tsx` across both the homepage and internal learning shell in `AppShell.tsx`, adding curriculum tracks, student tools, trust links, and client-side privacy badges.
  - Fixed Medium Bug ISS-004: Added direct "Contact & Student Support" card to `AccessibilityView.tsx` with email (`support@ceeras.com`) and response SLAs, aligning with the header navigation link.
  - Replaced legacy "QueryPath" references with "CEERAS" in `AboutView`, `PrivacyView`, `AccessibilityView`, and `App.tsx`.
  - Enhanced student-friendly copy across `ResultsTable.tsx`, `EmbeddedSqlEditor.tsx`, and `QuizRunner.tsx` ("Check Your Query", "Great work! Your query is correct.", "Not quite. Check the hint and try again:").
  - Fixed card balance in `SettingsView.tsx` (`sm:grid-cols-2 max-w-2xl`).
  - Strengthened `findAnyLessonById` in `useActiveCourse.ts` with case-insensitive and slug fallbacks.
  - Confirmed 0 TypeScript errors (`npx tsc --noEmit`) and successful production build (`npm run build`).
- **Phase 11: Homepage Section Pruning & Reference Course Card Grid Redesign**:
  - Pruned redundant informational sections from the homepage (`DashboardView.tsx`) per user specification:
    - Removed "How CEERAS Empowers Independent Problem-Solving" (and its 3 sub-cards: In-Browser Sandbox Engines, Hands-On First Pedagogy, Private, Offline & Persistent).
    - Removed "Curated Learning Paths / Structured Roadmaps" (and its 3 career tracks: Data Analyst & BI Specialist, Modern Web Developer, AI & Machine Learning Engineer).
  - Redesigned the Course Cards on the Homepage to faithfully match the user's uploaded reference screenshot:
    - 4-column responsive grid on desktop (`grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5`).
    - Clean, rounded card container (`rounded-2xl`, dark slate `#1B2A38` / `#15202B` in dark mode, pure white `#FFFFFF` in daylight mode, border `border-border`, smooth hover lift and primary border glow).
    - Centered official technology brand logos at the top (`w-12 h-12 sm:w-14 sm:h-14 mb-3 sm:mb-4`).
    - Centered bold technology titles and concise 1-2 line descriptions directly underneath.
    - Whole card is a clickable, accessible interactive tile (`tabIndex={0}`, keyboard navigation, hover states, zero visual clutter).
    - Added 7 new official vector logos in `LanguageLogos.tsx`: `JavaLogo`, `CLogo`, `CppLogo`, `CSharpLogo`, `PhpLogo`, `ReactLogo`, `MySqlLogo`.
    - Refined `HtmlLogo`, `CssLogo`, and `SqlLogo` to match the exact badge-free and 3-disk cylinder aesthetic from the reference screenshot.
    - Subtle bottom accent line indicators for returning students with course completion progress.
    - Accessible coming-soon modal for preview tracks with direct links to active Python, SQL, and Web tracks.
    - Preserved instant category filtering (All, Web, Programming, Databases, Data Science, Tools) and instant real-time search.
  - Verified with `npx tsc --noEmit` (exit code 0), `npm run build` (exit code 0), and zero-emoji verification (0 emojis found).
- **Phase 13: Hero Tag Pill Removal**:
  - Removed decorative rounded pill tags (`Welcome Back to CEERAS` with Sparkles and `Open-Access Interactive Curriculum` with Compass) from the homepage hero banners in [`DashboardView.tsx`](file:///c:/Users/poorn/OneDrive/Desktop/SQL/src/features/dashboard/DashboardView.tsx).
  - Cleaned up unused icon imports (`Sparkles`, `Compass`).
  - Verified with `npx tsc --noEmit` (exit code 0), `npm run build` (exit code 0), and zero-emoji verification.
- **Phase 14: Restricting Footer Exclusively to Landing / Home Page**:
  - Removed `<CeerasFooter />` from the inner learning shell in [`AppShell.tsx`](file:///c:/Users/poorn/OneDrive/Desktop/SQL/src/components/layout/AppShell.tsx).
  - Ensured the corporate blueprint footer is rendered exclusively on the public Landing/Home page (`isHome`), freeing up vertical space for focused coding, lessons, quizzes, and workspaces across all other routes.
  - Verified with `npx tsc --noEmit` (exit code 0), `npm run build` (exit code 0), and zero-emoji verification.
- **Phase 12: Reference Footer Realignment & Course Card Hover Shadow Removal**:
  - Rebuilt [`CeerasFooter.tsx`](file:///c:/Users/poorn/OneDrive/Desktop/SQL/src/components/layout/CeerasFooter.tsx) to match the official corporate reference design:
    - Added mathematical/engineering blueprint grid background pattern (`.ceeras-footer-grid`) rendered with CSS linear gradients.
    - Left brand column: CEERAS tracked logo with tagline *"Precision Engineering for Scalable Software."*
    - Column 1 (**QUICK LINKS**): Home (`/`), Capabilities (`/learn`), About (`/about`).
    - Column 2 (**SUPPORT**): Privacy Policy (`/privacy`), Start a Project (`mailto:support@ceeras.in?subject=Start%20a%20Project`), Jobs (`mailto:support@ceeras.in?subject=Careers%20at%20Ceeras`).
    - Column 3 (**CONTACT**): Clickable telephone (`+91 75699 33433`), clickable email (`support@ceeras.in`), physical location (*Cuddapah, Andhra Pradesh, India*), and social action buttons for LinkedIn and WhatsApp.
    - Minimalist, unobtrusive copyright bar at bottom.
  - Removed all box-shadows on hover (`shadow-card hover:shadow-lg`) for course catalog cards on the Home Page (`DashboardView.tsx`), keeping a clean, flat aesthetic with smooth elevation and subtle border accenting.
  - Verified with `npx tsc --noEmit` (exit code 0), `npm run build` (exit code 0), and zero-emoji verification (0 emojis found).
- **Phase 13: Hero Tag Pill Removal**:
  - Removed decorative rounded pill tags (`Welcome Back to CEERAS` with Sparkles and `Open-Access Interactive Curriculum` with Compass) from the homepage hero banners in [`DashboardView.tsx`](file:///c:/Users/poorn/OneDrive/Desktop/SQL/src/features/dashboard/DashboardView.tsx).
  - Cleaned up unused icon imports (`Sparkles`, `Compass`).
  - Verified with `npx tsc --noEmit` (exit code 0), `npm run build` (exit code 0), and zero-emoji verification.
- **Phase 14: Restricting Footer Exclusively to Landing / Home Page**:
  - Removed `<CeerasFooter />` from the inner learning shell in [`AppShell.tsx`](file:///c:/Users/poorn/OneDrive/Desktop/SQL/src/components/layout/AppShell.tsx).
  - Ensured the corporate blueprint footer is rendered exclusively on the public Landing/Home page (`isHome`), freeing up vertical space for focused coding, lessons, quizzes, and workspaces across all other routes.
  - Verified with `npx tsc --noEmit` (exit code 0), `npm run build` (exit code 0), and zero-emoji verification.

---

## 13. Important Implementation Decisions
- **Decision 1**: Retain `sql.js` SQLite WASM as the offline engine because it avoids backend dependencies and guarantees zero latency.
- **Decision 2**: Keep IndexedDB via `idb` for persistence to ensure learner progress, exercise solutions, and notes survive page reloads and browser restarts without clearing.
- **Decision 3**: Standardize on FontAwesome SVG/CSS icons and remove any emoji icons across all UI components for a calm, professional tone.

---

## 14. Known Bugs & Regression Risks
- Risk of breaking existing completed exercise states if exercise IDs change: Exercise IDs for Lesson 1 should be backward-compatible (`ex_1_1`, `ex_1_2`, `ex_1_3`).
- Risk of layout shifts on mobile keyboard open when editing SQL: Code editor must handle dynamic viewport heights without breaking navigation.
