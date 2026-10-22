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
      id: 'q-22-1',
      question: 'What happens to SUM(revenue) when you include ORDER BY inside the OVER() clause?',
      explanation: 'When ORDER BY is present in OVER(), SQL treats it as a running cumulative window from the first row to the current row.',
      difficulty: 'advanced',
      topicTag: 'window-aggregates',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'It sorts the final query without computing sums', isCorrect: false },
        { id: 'opt-b', text: 'It calculates a cumulative running total up to the current row', isCorrect: true },
        { id: 'opt-c', text: 'It throws an error because aggregates cannot be sorted', isCorrect: false },
        { id: 'opt-d', text: 'It calculates the average instead of the sum', isCorrect: false },
      ],
    },
    {
      id: 'q-22-2',
      question: 'Which window aggregate would you use to compute a running count of transactions?',
      explanation: 'COUNT(*) OVER (ORDER BY date) provides an incremental counter row by row.',
      difficulty: 'advanced',
      topicTag: 'window-aggregates',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'COUNT(*) OVER (ORDER BY ...)', isCorrect: true },
        { id: 'opt-b', text: 'INCREMENT(*) FROM ...', isCorrect: false },
        { id: 'opt-c', text: 'RUNNING_COUNT(...)', isCorrect: false },
        { id: 'opt-d', text: 'SUM(COUNT) OVER (...)', isCorrect: false },
      ],
    },
    {
      id: 'q_22_auto_3',
      question: "In SQL Lesson 22 (Window Aggregates & Running Totals), what is the primary role of this syntax feature?",
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
      id: 'q_22_auto_4',
      question: "Which keyword or clause in SQL Lesson 22 directly influences which rows or columns are returned?",
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
      id: 'q_22_auto_5',
      question: "How does SQLite handle data type affinity when executing queries in Lesson 22?",
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
      id: 'q_22_auto_6',
      question: "What is the expected behavior if a query in Lesson 22 matches zero rows?",
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
      id: 'q_22_auto_7',
      question: "Which SQL best practice applies when writing queries for Lesson 22?",
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
      id: 'q_22_auto_8',
      question: "Can queries from Lesson 22 be executed offline inside an in-browser SQLite WASM engine?",
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
      id: 'q_22_auto_9',
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
      id: 'q_22_auto_10',
      question: "In relational database design, why is data normalization relevant to Lesson 22?",
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
