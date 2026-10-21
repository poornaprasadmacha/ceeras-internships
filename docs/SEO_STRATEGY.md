# QueryPath — SEO Strategy & Discoverability

## 1. Search Engine Discoverability Principles

Although QueryPath operates as an offline-first Web application with local WebAssembly query execution, public web crawlers must be able to index its educational content without executing JavaScript or SQL queries.

### Guiding Standards
- **Authentic Content Only**: No keyword stuffing, hidden blocks, or fake reviews.
- **Indexable HTML**: Lesson explanations, learning objectives, conceptual examples, and sample tables are rendered as semantic HTML elements in the DOM.
- **Clean Semantic URLs**: Flat, lowercase routes with descriptive slugs (`/learn/sql-basics`, `/learn/sql-select-queries`).

---

## 2. Page Metadata Matrix

| Route | Page Title | Meta Description | Canonical URL |
|---|---|---|---|
| `/` | QueryPath — Learn SQL step by step with interactive lessons | Learn SQL with real-time browser execution, instant feedback, quizzes, and offline support. Zero server dependencies. | `https://querypath.dev/` |
| `/learn` | SQL Course Curriculum & Modules — QueryPath | Comprehensive beginner to advanced SQL modules. Learn relational databases, SELECT queries, filtering, and joins. | `https://querypath.dev/learn` |
| `/learn/sql-basics` | Introduction to SQL and Relational Databases — QueryPath | Master the core concepts of relational databases, tables, rows, columns, and SQLite fundamentals with interactive exercises. | `https://querypath.dev/learn/sql-basics` |
| `/learn/sql-select-queries` | SQL SELECT Queries: Selecting Columns & Wildcards — QueryPath | Learn to query databases using SELECT and FROM statements. Interactive SQL exercises with immediate browser verification. | `https://querypath.dev/learn/sql-select-queries` |
| `/practice` | Freeform SQL Playground & Sandbox — QueryPath | Write and run SQL queries in an isolated browser SQLite sandbox. Inspect tables and test query ideas safely. | `https://querypath.dev/practice` |
| `/quizzes` | SQL Knowledge Quizzes & Assessment Tests — QueryPath | Test your SQL knowledge with conceptual questions, query prediction tests, and comprehensive review exams. | `https://querypath.dev/quizzes` |
| `/progress` | Learning Analytics & Progress — QueryPath | Review your completed lessons, solved exercises, quiz scores, and learning milestones. | `https://querypath.dev/progress` |
| `/about` | About QueryPath — Offline-First SQL Education | Discover the philosophy behind QueryPath: privacy-first, zero-tracking, client-side SQL learning for everyone. | `https://querypath.dev/about` |
| `/privacy` | Privacy Policy — QueryPath | QueryPath processes and stores 100% of queries, code, and progress locally on your device. Zero telemetry. | `https://querypath.dev/privacy` |
| `/accessibility` | Accessibility Commitment — QueryPath | Conformance statement for WCAG 2.2 AA accessibility standards across keyboard navigation, contrast, and screen readers. | `https://querypath.dev/accessibility` |

---

## 3. Structured Data (JSON-LD)

Each lesson page includes JSON-LD markup declaring educational schema:

```json
{
  "@context": "https://schema.org",
  "@type": "Course",
  "name": "Introduction to SQL and Relational Databases",
  "description": "Understand how relational databases organize information and how SQL helps you query structured data.",
  "provider": {
    "@type": "Organization",
    "name": "QueryPath",
    "sameAs": "https://querypath.dev"
  },
  "educationalLevel": "Beginner",
  "teaches": [
    "Relational databases",
    "Tables, rows, and columns",
    "SQL syntax fundamentals",
    "SQLite query execution"
  ],
  "isAccessibleForFree": true,
  "inLanguage": "en"
}
```

---

## 4. Crawl Assets

### robots.txt
```
User-agent: *
Allow: /
Disallow: /settings
Disallow: /notes

Sitemap: https://querypath.dev/sitemap.xml
```

### sitemap.xml
Included in `public/sitemap.xml` with priority levels:
- `1.0`: `/`
- `0.9`: `/learn`, `/learn/sql-basics`, `/learn/sql-select-queries`
- `0.8`: `/practice`, `/quizzes`
- `0.6`: `/about`, `/privacy`, `/accessibility`
