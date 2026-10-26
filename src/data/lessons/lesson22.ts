import { LessonDefinition } from '../../types/lesson';
import { dailyRevenueDataset } from '../datasets/dailyRevenue';

export const lesson22: LessonDefinition = {
  id: 'lesson-22-window-aggregates',
  slug: 'window-aggregates-running-totals',
  number: 22,
  title: 'Window Aggregates & Running Totals',
  shortDescription: 'Compute cumulative running totals and moving metrics across time intervals.',
  estimatedMinutes: 14,
  dataset: dailyRevenueDataset,
  learningObjectives: [
    'Calculate cumulative running totals using SUM(...) OVER (ORDER BY ...)',
    'Compute running totals reset by branch using PARTITION BY',
    'Calculate overall department totals alongside individual daily sales',
  ],
  prerequisites: ['Window functions and cumulative aggregate foundations.'],
  sections: [
    {
      id: 'running-totals-concept',
      title: 'How Running Totals Work in SQL',
      content: `A **running total** (or cumulative sum) calculates the accumulated sum of values from the start of a period up to the current row.

In modern SQL, standard aggregates become window aggregates simply by adding an \`OVER()\` clause:

• \`SUM(revenue) OVER (ORDER BY sale_date)\`:
  Sums revenue chronologically from row 1 to current row!
• No temporary variables, self-joins, or subqueries needed.`,
      codeExample: {
        sql: `SELECT branch, sale_date, revenue,\n  SUM(revenue) OVER (\n    ORDER BY sale_date\n  ) AS running_total\nFROM DailyRevenue;`,
        explanation: 'Each row displays that day revenue alongside the accumulated company revenue to date.',
      },
    },
    {
      id: 'partitioned-running-totals',
      title: 'Resetting Totals by Branch or Category',
      content: `Combine \`PARTITION BY\` with an ordered aggregate to track cumulative growth per department or branch independently:

• For each branch, the cumulative sum starts at 0
• Accumulates daily earnings chronologically
• Automatically resets when encountering a new branch!`,
      codeExample: {
        sql: `SELECT branch, sale_date, revenue,\n  SUM(revenue) OVER (\n    PARTITION BY branch\n    ORDER BY sale_date\n  ) AS branch_running_revenue\nFROM DailyRevenue;`,
        explanation: 'Maintains independent cumulative balance ledgers for each individual store branch.',
      },
    },
  ],
  exercises: [
    {
      id: 'ex-22-1',
      lessonId: 'lesson-22-window-aggregates',
      order: 1,
      title: 'Task 1: Calculate Overall Cumulative Revenue',
      objective: 'Select id, sale_date, revenue, and a running total of revenue ordered by id ASC aliased as cumulative_revenue.',
      initialQuery: 'SELECT id, sale_date, revenue,\n  -- Write SUM(revenue) OVER (ORDER BY id ASC)\nFROM DailyRevenue;',
      solutionQuery: 'SELECT id, sale_date, revenue, SUM(revenue) OVER (ORDER BY id ASC) AS cumulative_revenue FROM DailyRevenue;',
      hint: 'Use: SUM(revenue) OVER (ORDER BY id ASC) AS cumulative_revenue',
      explanation: 'Calculates the cumulative sum of revenue row by row ordered by id.',
      expectedColumns: ['id', 'sale_date', 'revenue', 'cumulative_revenue'],
      requiresOrder: true,
    },
    {
      id: 'ex-22-2',
      lessonId: 'lesson-22-window-aggregates',
      order: 2,
      title: 'Task 2: Partitioned Cumulative Sum per Branch',
      objective: 'Select branch, sale_date, revenue, and a running total of revenue partitioned by branch and ordered by sale_date ASC aliased as branch_total.',
      initialQuery: 'SELECT branch, sale_date, revenue,\n  -- Write SUM() OVER (PARTITION BY branch ORDER BY sale_date ASC)\nFROM DailyRevenue;',
      solutionQuery: 'SELECT branch, sale_date, revenue, SUM(revenue) OVER (PARTITION BY branch ORDER BY sale_date ASC) AS branch_total FROM DailyRevenue;',
      hint: 'Use: SUM(revenue) OVER (PARTITION BY branch ORDER BY sale_date ASC) AS branch_total',
      explanation: 'PARTITION BY resets the cumulative revenue calculation for each store location.',
      expectedColumns: ['branch', 'sale_date', 'revenue', 'branch_total'],
      requiresOrder: false,
    },
  ],
  quiz: [
    {
      id: 'q_22_1',
      question: "What is the primary objective taught in Lesson 22: INSERT, UPDATE & DELETE (DML)?",
      explanation: "Lesson 22 focuses specifically on mastering INSERT, UPDATE & DELETE (DML) in relational SQL.",
      difficulty: 'intermediate',
      topicTag: 'SQL',
      type: 'multiple-choice',
      options: [
        { id: 'opt_1', text: "To format CSS styles for web browsers", isCorrect: false },
        { id: 'opt_2', text: "To master INSERT, UPDATE & DELETE (DML) and apply it accurately on relational tables.", isCorrect: true },
        { id: 'opt_3', text: "To configure operating system firewalls", isCorrect: false },
        { id: 'opt_4', text: "To write low-level machine assembly", isCorrect: false },
      ],
    },
    {
      id: 'q_22_2',
      question: "Which SQL clause or construct is introduced in Lesson 22 to manage DML?",
      explanation: "This lesson explores standard SQL syntax designed specifically for DML.",
      difficulty: 'intermediate',
      topicTag: 'SQL',
      type: 'multiple-choice',
      options: [
        { id: 'opt_1', text: "The DML syntax and its associated keywords.", isCorrect: true },
        { id: 'opt_2', text: "The HTML <div> tag", isCorrect: false },
        { id: 'opt_3', text: "The Python def keyword", isCorrect: false },
        { id: 'opt_4', text: "The git commit command", isCorrect: false },
      ],
    },
    {
      id: 'q_22_3',
      question: "On which dataset table are the interactive exercises in Lesson 22 practiced?",
      explanation: "Lesson 22 exercises are executed against the MedicalClinics table in the local SQLite engine.",
      difficulty: 'intermediate',
      topicTag: 'SQL',
      type: 'multiple-choice',
      options: [
        { id: 'opt_1', text: "The MedicalClinics dataset table.", isCorrect: true },
        { id: 'opt_2', text: "A local CSV spreadsheet", isCorrect: false },
        { id: 'opt_3', text: "An external MongoDB cluster", isCorrect: false },
        { id: 'opt_4', text: "A Redis memory cache", isCorrect: false },
      ],
    },
    {
      id: 'q_22_4',
      question: "What is a key rule when writing queries involving DML in Lesson 22?",
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
      id: 'q_22_5',
      question: "How does the in-browser SQLite WASM engine execute queries in Lesson 22?",
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
      id: 'q_22_6',
      question: "What happens if a query in Lesson 22 violates SQL syntax rules?",
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
      id: 'q_22_7',
      question: "In Lesson 22, how does INSERT, UPDATE & DELETE (DML) interact with query filtering?",
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
      id: 'q_22_8',
      question: "Which best practice should be followed when structuring queries in Lesson 22?",
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
      id: 'q_22_9',
      question: "What is the expected result set structure from queries in Lesson 22?",
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
      id: 'q_22_10',
      question: "Why is mastering INSERT, UPDATE & DELETE (DML) in Lesson 22 essential for data professionals?",
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
