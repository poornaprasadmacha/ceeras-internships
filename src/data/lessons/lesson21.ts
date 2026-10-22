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
      id: 'q-21-1',
      question: 'What is the main distinction between GROUP BY and an OVER() window clause?',
      explanation: 'GROUP BY reduces rows into aggregate summaries; window functions compute across windows while keeping each individual row in the output.',
      difficulty: 'advanced',
      topicTag: 'window-functions',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'GROUP BY only works with numbers', isCorrect: false },
        { id: 'opt-b', text: 'GROUP BY collapses rows; window functions preserve individual rows', isCorrect: true },
        { id: 'opt-c', text: 'OVER() can only be used on primary keys', isCorrect: false },
        { id: 'opt-d', text: 'Window functions cannot be sorted', isCorrect: false },
      ],
    },
    {
      id: 'q-21-2',
      question: 'Which clause inside OVER() controls how rows are divided into distinct ranking subgroups?',
      explanation: 'PARTITION BY divides the dataset into logical partitions where calculations reset.',
      difficulty: 'advanced',
      topicTag: 'window-functions',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'SPLIT BY', isCorrect: false },
        { id: 'opt-b', text: 'PARTITION BY', isCorrect: true },
        { id: 'opt-c', text: 'SECTION BY', isCorrect: false },
        { id: 'opt-d', text: 'DIVIDE BY', isCorrect: false },
      ],
    },
    {
      id: 'q_21_auto_3',
      question: "In SQL Lesson 21 (Window Functions (ROW_NUMBER & RANK)), what is the primary role of this syntax feature?",
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
      id: 'q_21_auto_4',
      question: "Which keyword or clause in SQL Lesson 21 directly influences which rows or columns are returned?",
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
      id: 'q_21_auto_5',
      question: "How does SQLite handle data type affinity when executing queries in Lesson 21?",
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
      id: 'q_21_auto_6',
      question: "What is the expected behavior if a query in Lesson 21 matches zero rows?",
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
      id: 'q_21_auto_7',
      question: "Which SQL best practice applies when writing queries for Lesson 21?",
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
      id: 'q_21_auto_8',
      question: "Can queries from Lesson 21 be executed offline inside an in-browser SQLite WASM engine?",
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
      id: 'q_21_auto_9',
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
      id: 'q_21_auto_10',
      question: "In relational database design, why is data normalization relevant to Lesson 21?",
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
