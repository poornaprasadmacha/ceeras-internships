import { LessonDefinition } from '../../types/lesson';
import { trackAthletesDataset } from '../datasets/trackAthletes';

export const lesson21: LessonDefinition = {
  id: 'lesson-21-window-functions',
  slug: 'window-functions-ranking',
  number: 21,
  title: 'Window Functions (ROW_NUMBER & RANK)',
  shortDescription: 'Calculate rankings and row positions across partitions without collapsing query rows.',
  estimatedMinutes: 15,
  dataset: trackAthletesDataset,
  learningObjectives: [
    'Distinguish between aggregate functions (collapsing rows) and window functions (preserving rows)',
    'Generate sequential numbering using ROW_NUMBER() OVER (...)',
    'Calculate competitive rankings partitioned by category with RANK()',
  ],
  prerequisites: ['ORDER BY sorting and GROUP BY aggregation concepts.'],
  sections: [
    {
      id: 'window-function-concept',
      title: 'Aggregates vs. Window Functions',
      content: `Standard aggregate functions like \`SUM()\` or \`AVG()\` collapse multiple rows into a single summary row.

**Window functions** calculate values across a related set of rows **while keeping every individual row intact** in the output!

Key components of the \`OVER()\` clause:
• **PARTITION BY column**: Divides rows into distinct processing groups (like event categories)
• **ORDER BY column**: Sorts rows inside each partition to determine ranking sequence`,
      codeExample: {
        sql: `SELECT athlete_name, event_category, finish_time,\n  ROW_NUMBER() OVER (\n    PARTITION BY event_category\n    ORDER BY finish_time ASC\n  ) AS position\nFROM TrackAthletes;`,
        explanation: 'Assigns 1st, 2nd, 3rd, 4th positions independently within each athletic event.',
      },
    },
    {
      id: 'ranking-variants',
      title: 'ROW_NUMBER vs. RANK vs. DENSE_RANK',
      content: `SQL provides 3 standard ranking functions:

• **ROW_NUMBER()**: Always assigns strictly sequential integers (1, 2, 3, 4) with no ties
• **RANK()**: Leaves gaps when ties occur (e.g. 1, 2, 2, 4)
• **DENSE_RANK()**: Never leaves gaps after ties (e.g. 1, 2, 2, 3)`,
      codeExample: {
        sql: `SELECT athlete_name, finish_time,\n  RANK() OVER (ORDER BY finish_time ASC) AS overall_rank\nFROM TrackAthletes;`,
        explanation: 'Generates global leaderboard rankings across all events ordered by fastest completion times.',
      },
    },
  ],
  exercises: [
    {
      id: 'ex-21-1',
      lessonId: 'lesson-21-window-functions',
      order: 1,
      title: 'Task 1: Generate Sequential Row Numbers',
      objective: 'Select athlete_name, finish_time, and a ROW_NUMBER() window function ordered by finish_time ASC aliased as speed_rank.',
      initialQuery: 'SELECT athlete_name, finish_time,\n  -- Write ROW_NUMBER() OVER () clause\nFROM TrackAthletes;',
      solutionQuery: 'SELECT athlete_name, finish_time, ROW_NUMBER() OVER (ORDER BY finish_time ASC) AS speed_rank FROM TrackAthletes;',
      hint: 'Use: ROW_NUMBER() OVER (ORDER BY finish_time ASC) AS speed_rank',
      explanation: 'Assigns sequential integers from 1 upwards sorted by fastest finish time.',
      expectedColumns: ['athlete_name', 'finish_time', 'speed_rank'],
      requiresOrder: true,
    },
    {
      id: 'ex-21-2',
      lessonId: 'lesson-21-window-functions',
      order: 2,
      title: 'Task 2: Partition Rankings by Event Category',
      objective: 'Select athlete_name, event_category, finish_time, and a RANK() function partitioned by event_category and ordered by finish_time ASC aliased as event_rank.',
      initialQuery: 'SELECT athlete_name, event_category, finish_time,\n  -- Write RANK() OVER (PARTITION BY ... ORDER BY ...)\nFROM TrackAthletes;',
      solutionQuery: 'SELECT athlete_name, event_category, finish_time, RANK() OVER (PARTITION BY event_category ORDER BY finish_time ASC) AS event_rank FROM TrackAthletes;',
      hint: 'Use: RANK() OVER (PARTITION BY event_category ORDER BY finish_time ASC) AS event_rank',
      explanation: 'PARTITION BY resets the ranking counter for each athletic division.',
      expectedColumns: ['athlete_name', 'event_category', 'finish_time', 'event_rank'],
      requiresOrder: false,
    },
  ],
  quiz: [
    {
      id: 'q_21_1',
      question: "What is the primary objective taught in Lesson 21: CREATE TABLE & Schema DDL?",
      explanation: "Lesson 21 focuses specifically on mastering CREATE TABLE & Schema DDL in relational SQL.",
      difficulty: 'intermediate',
      topicTag: 'SQL',
      type: 'multiple-choice',
      options: [
        { id: 'opt_1', text: "To format CSS styles for web browsers", isCorrect: false },
        { id: 'opt_2', text: "To master CREATE TABLE & Schema DDL and apply it accurately on relational tables.", isCorrect: true },
        { id: 'opt_3', text: "To configure operating system firewalls", isCorrect: false },
        { id: 'opt_4', text: "To write low-level machine assembly", isCorrect: false },
      ],
    },
    {
      id: 'q_21_2',
      question: "Which SQL clause or construct is introduced in Lesson 21 to manage DDL?",
      explanation: "This lesson explores standard SQL syntax designed specifically for DDL.",
      difficulty: 'intermediate',
      topicTag: 'SQL',
      type: 'multiple-choice',
      options: [
        { id: 'opt_1', text: "The DDL syntax and its associated keywords.", isCorrect: true },
        { id: 'opt_2', text: "The HTML <div> tag", isCorrect: false },
        { id: 'opt_3', text: "The Python def keyword", isCorrect: false },
        { id: 'opt_4', text: "The git commit command", isCorrect: false },
      ],
    },
    {
      id: 'q_21_3',
      question: "On which dataset table are the interactive exercises in Lesson 21 practiced?",
      explanation: "Lesson 21 exercises are executed against the DailyRevenue table in the local SQLite engine.",
      difficulty: 'intermediate',
      topicTag: 'SQL',
      type: 'multiple-choice',
      options: [
        { id: 'opt_1', text: "The DailyRevenue dataset table.", isCorrect: true },
        { id: 'opt_2', text: "A local CSV spreadsheet", isCorrect: false },
        { id: 'opt_3', text: "An external MongoDB cluster", isCorrect: false },
        { id: 'opt_4', text: "A Redis memory cache", isCorrect: false },
      ],
    },
    {
      id: 'q_21_4',
      question: "What is a key rule when writing queries involving DDL in Lesson 21?",
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
      id: 'q_21_5',
      question: "How does the in-browser SQLite WASM engine execute queries in Lesson 21?",
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
      id: 'q_21_6',
      question: "What happens if a query in Lesson 21 violates SQL syntax rules?",
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
      id: 'q_21_7',
      question: "In Lesson 21, how does CREATE TABLE & Schema DDL interact with query filtering?",
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
      id: 'q_21_8',
      question: "Which best practice should be followed when structuring queries in Lesson 21?",
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
      id: 'q_21_9',
      question: "What is the expected result set structure from queries in Lesson 21?",
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
      id: 'q_21_10',
      question: "Why is mastering CREATE TABLE & Schema DDL in Lesson 21 essential for data professionals?",
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
