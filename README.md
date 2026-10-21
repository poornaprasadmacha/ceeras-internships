# Learn by Ceeras — Interactive SQL & Coding Academy

> **"Learn SQL. Practise freely. Build real skills."**

An interactive, kid-friendly, student-focused educational web application for mastering SQL and relational database engineering from zero to advanced. Powered by an in-browser SQLite WebAssembly engine, zero-backend query evaluation, instant automated feedback, and 100% offline capability.

---

## Features

- **Zero-to-Advanced 16-Lesson Curriculum**: Inspired by interactive learning platforms like SQLBolt, covering:
  1. `SELECT` Queries & Projection
  2. Numerical Filtering & Range Operators
  3. Text Constraints & Pattern Matching (`LIKE`, `IN`)
  4. Deduplication with `DISTINCT`
  5. Sorting with `ORDER BY`
  6. Pagination with `LIMIT` & `OFFSET`
  7. Multi-Table Queries with `INNER JOIN`
  8. Missing Relations with `LEFT JOIN`
  9. Three-Valued Logic & `NULL` Handling
  10. Computed Queries & Expressions with `AS`
  11. Aggregations (`COUNT`, `SUM`, `AVG`, `MIN`, `MAX`)
  12. Grouped Aggregations (`GROUP BY` & `HAVING`)
  13. SQL Query Execution Pipeline
  14. Row Insertion with `INSERT INTO`
  15. Data Modification with `UPDATE` & `DELETE`
  16. Schema Management (`CREATE TABLE`, `ALTER TABLE`, `DROP TABLE`)
- **Kid & Beginner-Friendly UI/UX**:
  - **Quick SQL Chips**: Interactive tap-to-type blocks for SQL keywords, table names, and columns.
  - **Inline Table Data Inspector**: View sample table records and columns without leaving the exercise workspace.
  - **Celebration Feedback**: Congratulatory banners with direct **Next Task →** and **Take Quiz →** progression.
  - **Gentle Hints**: Progressive hint drawer with explanations when queries need adjustment.
- **Top Bar Mode Switcher**:
  - ☀️ **Soft Light**: Daytime study mode.
  - 📖 **Warm Paper**: Parchment mode, gentle for evening study.
  - 🌙 **Soft Dark**: Deep slate charcoal with zero neon glare.
- **100% Client-Side SQLite Execution**:
  - Powered by `sql.js` WebAssembly.
  - Zero queries or datasets sent to external servers.
  - Fully functional offline via IndexedDB local caching and Service Worker.
- **Cloudflare Pages Ready**:
  - Pre-configured SPA redirects (`_redirects`).
  - WebAssembly MIME type headers and immutable asset caching (`_headers`).
  - Single-command deploy: `npm run deploy:cloudflare`.

---

## Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Routing**: React Router v6
- **Database Engine**: SQLite via `sql.js` (WebAssembly)
- **Editor**: CodeMirror 6 with SQL syntax highlighting
- **Storage**: IndexedDB via `idb`
- **Icons**: Lucide React
- **Typography**: Raleway (Brand), Aboreto, Inter, JetBrains Mono

---

## Getting Started

### Prerequisites

- Node.js 18+ or 20+ LTS
- npm or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/poornaprasadmacha/learn.git
cd learn

# Install dependencies
npm install

# Start local development server
npm run dev
```

Visit [http://localhost:5173](http://localhost:5173) in your browser.

### Building for Production

```bash
npm run build
```

The output will be generated in the `dist/` directory.

---

## Cloudflare Pages Deployment

Deploy instantly to Cloudflare Pages:

```bash
npm run deploy:cloudflare
```

Or connect the repository via the Cloudflare Dashboard:
- **Build command**: `npm run build`
- **Build output directory**: `dist`
- **Environment variables**: `NODE_VERSION = 20`

---

## License

MIT License. Designed with care by the Ceeras Team.
