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
      id: 'q-20-1',
      question: 'Which clause begins the definition of a Common Table Expression?',
      explanation: 'Every Common Table Expression begins with the WITH keyword.',
      difficulty: 'advanced',
      topicTag: 'ctes',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'CREATE TEMPORARY', isCorrect: false },
        { id: 'opt-b', text: 'WITH', isCorrect: true },
        { id: 'opt-c', text: 'DECLARE TABLE', isCorrect: false },
        { id: 'opt-d', text: 'SET CTE', isCorrect: false },
      ],
    },
    {
      id: 'q-20-2',
      question: 'How long does a Common Table Expression persist in the database?',
      explanation: 'A CTE exists solely for the duration of the query in which it is declared.',
      difficulty: 'advanced',
      topicTag: 'ctes',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'Until the database server restarts', isCorrect: false },
        { id: 'opt-b', text: 'Permanently as a disk table', isCorrect: false },
        { id: 'opt-c', text: 'Only during the execution of that single query statement', isCorrect: true },
        { id: 'opt-d', text: '24 hours in local cache', isCorrect: false },
      ],
    },
    {
      id: 'q_20_auto_3',
      question: "In SQL Lesson 20 (Common Table Expressions (WITH Clauses)), what is the primary role of this syntax feature?",
      explanation: "This syntax feature is part of standard SQL designed for precise data retrieval and table management.",
      difficulty: 'intermediate',
      topicTag: 'SQL',
      type: 'multiple-choice',
      options: [
        { id: 'opt_1', text: "It provides structured capabilities for querying and manipulating data in relational tables", isCorrect: true },
        { id: 'opt_2', text: "It compiles relational data into binary machine code directly", isCorrect: false },
        { id: 'opt_3', text: "It replaces the need for a database schema", isCorrect: false },
        { id: 'opt_4', text: "It converts SQL tables into plain text files on disk", isCorrect: false },
      ],
    },
    {
      id: 'q_20_auto_4',
      question: "Which keyword or clause in SQL Lesson 20 directly influences which rows or columns are returned?",
      explanation: "Standard SQL query clauses dictate the projection, selection criteria, and ordering of results.",
      difficulty: 'intermediate',
      topicTag: 'SQL',
      type: 'multiple-choice',
      options: [
        { id: 'opt_1', text: "Clauses dedicated to filtering, projecting, and structuring relational query results", isCorrect: true },
        { id: 'opt_2', text: "The OS shell terminal prompt", isCorrect: false },
        { id: 'opt_3', text: "The web browser JavaScript engine", isCorrect: false },
        { id: 'opt_4', text: "The CSS stylesheet selector", isCorrect: false },
      ],
    },
    {
      id: 'q_20_auto_5',
      question: "How does SQLite handle data type affinity when executing queries in Lesson 20?",
      explanation: "SQLite uses flexible type affinities, allowing storage of values according to storage classes.",
      difficulty: 'intermediate',
      topicTag: 'SQL',
      type: 'multiple-choice',
      options: [
        { id: 'opt_1', text: "SQLite uses dynamic typing with type affinities (INTEGER, REAL, TEXT, BLOB, NUMERIC)", isCorrect: true },
        { id: 'opt_2', text: "SQLite strictly forbids text in any numerical column", isCorrect: false },
        { id: 'opt_3', text: "SQLite converts all data into 64-bit floating point numbers", isCorrect: false },
        { id: 'opt_4', text: "SQLite requires Java virtual machine types", isCorrect: false },
      ],
    },
    {
      id: 'q_20_auto_6',
      question: "What is the expected behavior if a query in Lesson 20 matches zero rows?",
      explanation: "When no records satisfy the query conditions, an empty result set is returned without an error.",
      difficulty: 'intermediate',
      topicTag: 'SQL',
      type: 'multiple-choice',
      options: [
        { id: 'opt_1', text: "It returns an empty result set with column headers and 0 rows", isCorrect: true },
        { id: 'opt_2', text: "It raises a fatal database crash error", isCorrect: false },
        { id: 'opt_3', text: "It deletes the target table automatically", isCorrect: false },
        { id: 'opt_4', text: "It returns random rows from another database", isCorrect: false },
      ],
    },
    {
      id: 'q_20_auto_7',
      question: "Which SQL best practice applies when writing queries for Lesson 20?",
      explanation: "Best practices emphasize explicit column selection, clear formatting, and testable queries.",
      difficulty: 'intermediate',
      topicTag: 'SQL',
      type: 'multiple-choice',
      options: [
        { id: 'opt_1', text: "Use explicit column names, clean indentation, and meaningful aliases", isCorrect: true },
        { id: 'opt_2', text: "Write all queries on a single unformatted line without spaces", isCorrect: false },
        { id: 'opt_3', text: "Avoid using indexes under all circumstances", isCorrect: false },
        { id: 'opt_4', text: "Never test queries with LIMIT", isCorrect: false },
      ],
    },
    {
      id: 'q_20_auto_8',
      question: "Can queries from Lesson 20 be executed offline inside an in-browser SQLite WASM engine?",
      explanation: "SQLite compiled to WebAssembly (WASM) runs 100% locally in the browser with full transactional fidelity.",
      difficulty: 'intermediate',
      topicTag: 'SQL',
      type: 'multiple-choice',
      options: [
        { id: 'opt_1', text: "Yes, SQLite WebAssembly compiles the complete C database engine to run client-side in the browser", isCorrect: true },
        { id: 'opt_2', text: "No, SQL always requires a dedicated cloud server connection", isCorrect: false },
        { id: 'opt_3', text: "Only if a PostgreSQL backend is running in Docker", isCorrect: false },
        { id: 'opt_4', text: "Only for SELECT queries with fewer than 5 rows", isCorrect: false },
      ],
    },
    {
      id: 'q_20_auto_9',
      question: "What is the return value of an SQL query that executes successfully?",
      explanation: "Relational algebra dictates that the output of an SQL query is itself a relation (table).",
      difficulty: 'intermediate',
      topicTag: 'SQL',
      type: 'multiple-choice',
      options: [
        { id: 'opt_1', text: "A relation (table) containing 0 or more tuples (rows) matching the requested columns", isCorrect: true },
        { id: 'opt_2', text: "A compiled C binary executable", isCorrect: false },
        { id: 'opt_3', text: "A raw JSON string by default in ANSI SQL", isCorrect: false },
        { id: 'opt_4', text: "A boolean integer 1 or 0", isCorrect: false },
      ],
    },
    {
      id: 'q_20_auto_10',
      question: "In relational database design, why is data normalization relevant to Lesson 20?",
      explanation: "Normalization structures tables to minimize redundancy and prevent update/delete anomalies.",
      difficulty: 'intermediate',
      topicTag: 'SQL',
      type: 'multiple-choice',
      options: [
        { id: 'opt_1', text: "It reduces data redundancy and improves data integrity across related tables", isCorrect: true },
        { id: 'opt_2', text: "It increases duplicate records for faster reading", isCorrect: false },
        { id: 'opt_3', text: "It converts numbers to strings for compact storage", isCorrect: false },
        { id: 'opt_4', text: "It prevents the database from using primary keys", isCorrect: false },
      ],
    },
  ],
};
