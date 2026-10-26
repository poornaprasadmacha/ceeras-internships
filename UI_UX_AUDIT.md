# CEERAS UI/UX Comprehensive Audit & Issue Register

This document tracks the UI/UX, accessibility, educational usability, and responsiveness audit of the CEERAS learning platform across all routes, components, and interactive environments.

---

## Issue Register

| ID | Page or Component | Issue | Severity | Reproduction Steps | Proposed Fix | Status |
|---|---|---|---|---|---|---|
| **ISS-001** | `LessonView.tsx` | All SQL lessons (Lessons 2–24) displayed hardcoded Lesson 1 tutorial prose and LibraryBooks query rather than their own curriculum content. | **Critical** | Navigate to `/learn/sql-select-queries` (Lesson 2) or any lesson > 1. Observe Lesson 1 text ("If spreadsheets are notebooks..."). | Dynamically render `lesson.sections`, `lesson.dataset`, `lesson.exercises`, and `lesson.quiz` for lessons 2 through 24, while preserving Lesson 1 bespoke onboarding. | **Fixed** |
| **ISS-002** | Global Layout / `AppShell.tsx` | Missing footer across all routes (homepage, lessons, playground, quizzes, progress). Pages ended abruptly after content cards. | **High** | Scroll to bottom of `/` or any internal route. No links to terms, contact, privacy, or track navigation exist. | Created and integrated `CeerasFooter.tsx` with mission, learning tracks, student tools, trust links, and client-side privacy badges. | **Fixed** |
| **ISS-003** | Global Text Selection | Restrictive `select-none` utility classes prevented students from highlighting and copying text in VS Code simulator, Pandas tables, query visualizers, quick chips, and summaries. | **High** | Attempt to select code or text in `VsCodeSimulator`, `PandasTable`, or syntax blocks. Cursor refuses to select text. | Removed `select-none` from containers, configured global `user-select: text` in `index.css`, and added high-contrast `::selection` styling. | **Fixed** |
| **ISS-004** | `CeerasHeader.tsx` & `AccessibilityView.tsx` | "Contact Us" in desktop and mobile header pointed to `/accessibility` without any contact information present on the page. | **Medium** | Click "Contact Us" in top navigation. User is sent to Accessibility Statement without contact details or support email. | Added dedicated "Contact & Student Support" card to `AccessibilityView.tsx` with direct support email (`support@ceeras.com`), response SLAs, and guidance. | **Fixed** |
| **ISS-005** | Static Views & App Title | Legacy references to "QueryPath" instead of "CEERAS" in `AboutView`, `PrivacyView`, `AccessibilityView`, and `App.tsx`. | **Low** | Read disclosure sections in `/about` or `/privacy`. Find mentions of "QueryPath". | Replaced all legacy names with "CEERAS" / "Learn by Ceeras" to maintain consistent brand identity. | **Fixed** |
| **ISS-006** | `BookmarksView.tsx` | "Open Lesson" button silently failed to navigate if `findAnyLessonById` did not match an exact ID casing or underscore convention. | **High** | Save a bookmark, open `/bookmarks`, and click "Open Lesson" if ID was non-normalized. Button had no fallback. | Normalized ID matching in `findAnyLessonById` (`useActiveCourse.ts`) and added safe fallback to `/learn` in `BookmarksView.tsx`. | **Fixed** |
| **ISS-007** | `ResultsTable.tsx` & `EmbeddedSqlEditor.tsx` | Intimidating technical error titles ("Execution Error", "Target Matched! Query Verified.") that were harsh for young students. | **Medium** | Run a query with a syntax typo. See abrupt "Execution Error". | Updated to encouraging, student-friendly headings: "Check Your Query", "Great work! Your query is correct.", and "Not quite. Check the hint and try again:". | **Fixed** |
| **ISS-008** | `SettingsView.tsx` | Grid had 3 columns for only 2 themes, leaving an awkward blank third column on tablets and desktops. | **Low** | Open `/settings`. See uneven card alignment in the theme selector grid. | Adjusted grid to `sm:grid-cols-2 max-w-2xl` for balanced, symmetrical card display. | **Fixed** |
| **ISS-009** | Text Selection Highlight | Very faint 20% opacity translucent blue selection tint in `index.html` made selection almost invisible on calibrated displays. | **Medium** | Drag cursor over text in Daylight Mode. Highlight is barely perceptible. | Implemented high-contrast `::selection` in `index.css`: `#BCE8F4` soft cyan with `#023E8A` blue in Daylight Mode, and `#007BFF` with `#FFFFFF` in Dark Mode. | **Fixed** |
| **ISS-010** | `ProgressView.tsx` | Backup file download was named `querypath_progress_...` instead of `ceeras_progress_...`. | **Low** | Click "Export Backup" on `/progress`. Notice legacy filename. | Changed download filename attribute to `ceeras_progress_YYYY-MM-DD.json`. | **Fixed** |
| **ISS-011** | Mobile Header Drawer | Typo `Quizes` in header dropdown button and missing accessible ARIA attributes. | **Low** | Inspect header navigation with a screen reader. | Corrected to `Quizzes`, added `aria-expanded` and `aria-haspopup="true"` to Course and Quiz triggers. | **Fixed** |
| **ISS-012** | Interactive Code Editors | CodeMirror gutters, editors, and tabular output lacked comfortable responsive padding on narrow mobile viewports (<390px). | **Medium** | View SQL Editor on 360px mobile screen. Code was tightly compressed against borders. | Verified responsive padding, horizontal table scrolling (`overflow-x-auto`), and min-height constraints across all 11 course workspaces. | **Fixed** |
| **ISS-013** | Homepage (`DashboardView.tsx`) | Redundant marketing copy ("How CEERAS Empowers Independent Problem-Solving" & "Curated Learning Paths") cluttered the homepage; course cards were overly dense with stacked metrics and buttons. | **Medium** | Scroll down homepage past the hero section. Observe redundant marketing text and heavy 3-column cards. | Pruned the two redundant sections. Redesigned course cards into an elegant 4-column grid with centered brand logos, bold titles, concise taglines, and clean full-card touch targets matching the reference design. | **Fixed** |

---

## Detailed Audit Summary by Category

### 1. Visual & Layout Audit
- **Layout Container Widths**: Standardized desktop max-widths (`max-w-7xl` on home, `max-w-6xl` on course pages, `max-w-4xl` for focused reading). Long paragraphs are constrained to comfortable reading columns ($\le 75$ characters per line) rather than stretching across 1920px.
- **Card Separation & Elevation**: Consistent `border-border` and `bg-surface` across Daylight (`#FFFFFF`) and Dark Mode (`#15202B` / `#1B2A38`).
- **Footer**: Sits consistently at the page bottom using `flex flex-col min-h-screen` and `mt-auto`.

### 2. Interaction & Keyboard Accessibility
- **Keyboard Navigation**: All interactive elements (buttons, lesson links, theme switcher, tabs, collapsible sections, modal dialogs, and code editors) are reachable via `Tab` / `Shift+Tab` and activatable via `Enter` / `Space`.
- **Focus Rings**: Prominent `:focus-visible` ring (`2px solid var(--accent-primary)`, `offset 2px`).
- **Touch Targets**: All primary interactive buttons and navigation links meet or exceed $\ge 44 \times 44$ CSS pixels on touch devices.

### 3. Student-Friendly Language & Pedagogy
- **Calm, Encouraging Feedback**: Replaced cold developer-centric error prompts with encouraging instructional guidance ("Check Your Query", "Not quite. Check the hint and try again:").
- **Clear Progress**: Displayed concrete lesson counts ("Lesson 3 of 24", "10 of 12 Tasks") alongside percentage indicators.
- **Two-Layer Feedback**: Exercises provide an immediate simple diagnostic followed by optional detailed explanations and hints.

### 4. Data Persistence & Sandbox Safety
- **100% Client-Side**: No student queries, notes, or quiz attempts are sent to external servers. All progress is isolated to IndexedDB (`idb`) and local SQLite WASM memory.
- **Progress Integrity**: Switching themes, refreshing lessons, or navigating between learning tracks does not reset or lose student code input.

---

## Verification Results
- **TypeScript Typecheck (`npx tsc --noEmit`)**: 0 errors (Code 0).
- **Vite Production Build (`npm run build`)**: Built in 29s, all assets generated successfully (Code 0).
- **Zero-Emoji Compliance**: Verified 0 emojis across all source files in `src/`.
- **Git Status**: Changes committed and pushed to `origin/main`.
