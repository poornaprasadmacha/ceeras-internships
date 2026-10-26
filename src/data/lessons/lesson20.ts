import { LessonDefinition } from '../../types/lesson';
import { softwareProjectsDataset } from '../datasets/softwareProjects';

export const lesson20: LessonDefinition = {
  id: 'lesson-20-ctes',
  slug: 'common-table-expressions-ctes',
  number: 20,
  title: 'Common Table Expressions (WITH Clauses)',
  shortDescription: 'Write clean, maintainable modular queries using temporary named result sets.',
  estimatedMinutes: 14,
  dataset: softwareProjectsDataset,
  learningObjectives: [
    'Define temporary named query blocks using WITH ... AS syntax',
    'Break complex nested subqueries into readable linear steps',
    'Join and aggregate CTE outputs just like physical database tables',
  ],
  prerequisites: ['Multi-table JOIN operations and subquery fundamentals.'],
  sections: [
    {
      id: 'cte-fundamentals',
      title: 'What is a Common Table Expression?',
      content: `A **Common Table Expression (CTE)** defines a temporary named result set that exists only during the execution of a single query.

Instead of messy deeply nested subqueries, CTEs let you organize queries sequentially:

\`\`\`sql
WITH TemporaryName AS (
  SELECT ...
)
SELECT * FROM TemporaryName;
\`\`\`

• Begins with the \`WITH\` keyword
• Provides clean names for intermediate calculations
• Can be referenced multiple times within the main statement`,
      codeExample: {
        sql: `WITH TotalHours AS (\n  SELECT project_id, SUM(hours_spent) AS total_hours\n  FROM ProjectHours\n  GROUP BY project_id\n)\nSELECT p.project_name, p.budget, t.total_hours\nFROM SoftwareProjects p\nJOIN TotalHours t ON p.project_id = t.project_id;`,
        explanation: 'The CTE aggregates hours spent by project, which the outer query seamlessly joins to project budgets.',
      },
    },
    {
      id: 'cte-advantages',
      title: 'Why Top Database Engineers Prefer CTEs',
      content: `• **Readability**: Code reads top-to-bottom rather than inside-out
• **Maintenance**: Modify business logic in one place without touching outer joins
• **Debugging**: Test intermediate CTEs independently before assembling the full pipeline`,
      codeExample: {
        sql: `WITH HighBudgetProjects AS (\n  SELECT * FROM SoftwareProjects WHERE budget >= 40000\n)\nSELECT project_name, hourly_rate FROM HighBudgetProjects;`,
        explanation: 'Isolates high-tier projects in a clean temporary scope for immediate downstream querying.',
      },
    },
  ],
  exercises: [
    {
      id: 'ex-20-1',
      lessonId: 'lesson-20-ctes',
      order: 1,
      title: 'Task 1: Build a Project Spending CTE',
      objective: 'Write a CTE named AggregatedHours that sums hours_spent grouped by project_id as total_hours. In the main query, select project_id and total_hours from AggregatedHours.',
      initialQuery: '-- Define CTE named AggregatedHours\n-- SELECT project_id, total_hours FROM AggregatedHours;',
      solutionQuery: 'WITH AggregatedHours AS (SELECT project_id, SUM(hours_spent) AS total_hours FROM ProjectHours GROUP BY project_id) SELECT project_id, total_hours FROM AggregatedHours;',
      hint: 'Structure: WITH AggregatedHours AS (SELECT project_id, SUM(hours_spent) AS total_hours FROM ProjectHours GROUP BY project_id) SELECT project_id, total_hours FROM AggregatedHours;',
      explanation: 'Defines the temporary CTE and queries its calculated sums directly.',
      expectedColumns: ['project_id', 'total_hours'],
      requiresOrder: false,
    },
    {
      id: 'ex-20-2',
      lessonId: 'lesson-20-ctes',
      order: 2,
      title: 'Task 2: Join CTE with Main Table',
      objective: 'Using a CTE named DevHours (selecting project_id, SUM(hours_spent) AS total_hours FROM ProjectHours GROUP BY project_id), select SoftwareProjects.project_name and DevHours.total_hours by joining on project_id.',
      initialQuery: 'WITH DevHours AS (\n  SELECT project_id, SUM(hours_spent) AS total_hours\n  FROM ProjectHours\n  GROUP BY project_id\n)\n-- Join SoftwareProjects with DevHours on project_id',
      solutionQuery: 'WITH DevHours AS (SELECT project_id, SUM(hours_spent) AS total_hours FROM ProjectHours GROUP BY project_id) SELECT SoftwareProjects.project_name, DevHours.total_hours FROM SoftwareProjects JOIN DevHours ON SoftwareProjects.project_id = DevHours.project_id;',
      hint: 'Complete the main SELECT: SELECT SoftwareProjects.project_name, DevHours.total_hours FROM SoftwareProjects JOIN DevHours ON SoftwareProjects.project_id = DevHours.project_id;',
      explanation: 'Seamlessly joins the temporary named result set with physical table data.',
      expectedColumns: ['project_name', 'total_hours'],
      requiresOrder: false,
    },
  ],
  quiz: [
    {
      id: 'q_20_1',
      question: "What is the primary objective taught in Lesson 20: NULL Handling & COALESCE?",
      explanation: "Lesson 20 focuses specifically on mastering NULL Handling & COALESCE in relational SQL.",
      difficulty: 'intermediate',
      topicTag: 'SQL',
      type: 'multiple-choice',
      options: [
        { id: 'opt_1', text: "To format CSS styles for web browsers", isCorrect: false },
        { id: 'opt_2', text: "To master NULL Handling & COALESCE and apply it accurately on relational tables.", isCorrect: true },
        { id: 'opt_3', text: "To configure operating system firewalls", isCorrect: false },
        { id: 'opt_4', text: "To write low-level machine assembly", isCorrect: false },
      ],
    },
    {
      id: 'q_20_2',
      question: "Which SQL clause or construct is introduced in Lesson 20 to manage NULL Handling?",
      explanation: "This lesson explores standard SQL syntax designed specifically for NULL Handling.",
      difficulty: 'intermediate',
      topicTag: 'SQL',
      type: 'multiple-choice',
      options: [
        { id: 'opt_1', text: "The NULL Handling syntax and its associated keywords.", isCorrect: true },
        { id: 'opt_2', text: "The HTML <div> tag", isCorrect: false },
        { id: 'opt_3', text: "The Python def keyword", isCorrect: false },
        { id: 'opt_4', text: "The git commit command", isCorrect: false },
      ],
    },
    {
      id: 'q_20_3',
      question: "On which dataset table are the interactive exercises in Lesson 20 practiced?",
      explanation: "Lesson 20 exercises are executed against the TrackAthletes table in the local SQLite engine.",
      difficulty: 'intermediate',
      topicTag: 'SQL',
      type: 'multiple-choice',
      options: [
        { id: 'opt_1', text: "The TrackAthletes dataset table.", isCorrect: true },
        { id: 'opt_2', text: "A local CSV spreadsheet", isCorrect: false },
        { id: 'opt_3', text: "An external MongoDB cluster", isCorrect: false },
        { id: 'opt_4', text: "A Redis memory cache", isCorrect: false },
      ],
    },
    {
      id: 'q_20_4',
      question: "What is a key rule when writing queries involving NULL Handling in Lesson 20?",
      explanation: "Syntactical accuracy and edge-case handling are critical for relational query success.",
      difficulty: 'intermediate',
      topicTag: 'SQL',
      type: 'multiple-choice',
      options: [
        { id: 'opt_1', text: "Queries must always be written in lowercase letters only", isCorrect: false },
        { id: 'opt_2', text: "Ensuring proper clause sequence, matching column types, and handling edge cases like NULLs.", isCorrect: true },
        { id: 'opt_3', text: "Never using semicolons at statement end", isCorrect: false },
        { id: 'opt_4', text: "Omitting the FROM clause entirely", isCorrect: false },
      ],
    },
    {
      id: 'q_20_5',
      question: "How does the in-browser SQLite WASM engine execute queries in Lesson 20?",
      explanation: "The platform executes genuine SQLite queries client-side via WebAssembly (WASM).",
      difficulty: 'intermediate',
      topicTag: 'SQL',
      type: 'multiple-choice',
      options: [
        { id: 'opt_1', text: "It simulates results using simple string matching", isCorrect: false },
        { id: 'opt_2', text: "It runs a real SQLite C-engine compiled to WebAssembly locally inside the browser with zero network latency.", isCorrect: true },
        { id: 'opt_3', text: "It sends every query to a remote MySQL server in the cloud", isCorrect: false },
        { id: 'opt_4', text: "It requires a paid license key", isCorrect: false },
      ],
    },
    {
      id: 'q_20_6',
      question: "What happens if a query in Lesson 20 violates SQL syntax rules?",
      explanation: "SQL syntax errors produce informative diagnostic messages explaining the exact failure.",
      difficulty: 'intermediate',
      topicTag: 'SQL',
      type: 'multiple-choice',
      options: [
        { id: 'opt_1', text: "The entire browser crashes permanently", isCorrect: false },
        { id: 'opt_2', text: "The SQLite engine returns a descriptive syntax error pointing out the unexpected keyword or token.", isCorrect: true },
        { id: 'opt_3', text: "The database table is deleted", isCorrect: false },
        { id: 'opt_4', text: "It returns random rows silently", isCorrect: false },
      ],
    },
    {
      id: 'q_20_7',
      question: "In Lesson 20, how does NULL Handling & COALESCE interact with query filtering?",
      explanation: "SQL features compose harmoniously within the standard query execution pipeline.",
      difficulty: 'intermediate',
      topicTag: 'SQL',
      type: 'multiple-choice',
      options: [
        { id: 'opt_1', text: "It bypasses all WHERE conditions completely", isCorrect: false },
        { id: 'opt_2', text: "It works in conjunction with WHERE and other relational clauses according to SQL execution order.", isCorrect: true },
        { id: 'opt_3', text: "It disables table indexes", isCorrect: false },
        { id: 'opt_4', text: "It only works on tables with fewer than 10 rows", isCorrect: false },
      ],
    },
    {
      id: 'q_20_8',
      question: "Which best practice should be followed when structuring queries in Lesson 20?",
      explanation: "Clean formatting and explicit column naming prevent errors and improve query readability.",
      difficulty: 'intermediate',
      topicTag: 'SQL',
      type: 'multiple-choice',
      options: [
        { id: 'opt_1', text: "Compress all SQL onto a single unformatted line", isCorrect: false },
        { id: 'opt_2', text: "Use explicit column names, clean indentation, and meaningful aliases for clarity and maintainability.", isCorrect: true },
        { id: 'opt_3', text: "Always use SELECT * in production queries", isCorrect: false },
        { id: 'opt_4', text: "Avoid testing queries before deployment", isCorrect: false },
      ],
    },
    {
      id: 'q_20_9',
      question: "What is the expected result set structure from queries in Lesson 20?",
      explanation: "All standard SQL queries return relations (tabular sets of tuples).",
      difficulty: 'intermediate',
      topicTag: 'SQL',
      type: 'multiple-choice',
      options: [
        { id: 'opt_1', text: "A binary compiled file", isCorrect: false },
        { id: 'opt_2', text: "A relational table of rows and columns matching the requested projection and criteria.", isCorrect: true },
        { id: 'opt_3', text: "A plain text string with no structure", isCorrect: false },
        { id: 'opt_4', text: "An operating system process ID", isCorrect: false },
      ],
    },
    {
      id: 'q_20_10',
      question: "Why is mastering NULL Handling & COALESCE in Lesson 20 essential for data professionals?",
      explanation: "These relational SQL concepts are universally applicable across PostgreSQL, MySQL, SQL Server, and BigQuery.",
      difficulty: 'intermediate',
      topicTag: 'SQL',
      type: 'multiple-choice',
      options: [
        { id: 'opt_1', text: "It allows skipping database design entirely", isCorrect: false },
        { id: 'opt_2', text: "It provides foundational relational capabilities required for analytics, data engineering, and backend development.", isCorrect: true },
        { id: 'opt_3', text: "It replaces the need for any programming language", isCorrect: false },
        { id: 'opt_4', text: "It only applies to SQLite and no other database", isCorrect: false },
      ],
    },
  ],
};
