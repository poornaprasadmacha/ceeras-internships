import { LessonDefinition } from '../../types/lesson';
import { appUserLogsDataset } from '../datasets/appUserLogs';

export const lesson24: LessonDefinition = {
  id: 'lesson-24-indexes-performance',
  slug: 'indexes-and-query-performance',
  number: 24,
  title: 'Indexes & Query Performance Tuning',
  shortDescription: 'Accelerate search queries from slow full-table scans to instant B-Tree lookups.',
  estimatedMinutes: 15,
  dataset: appUserLogsDataset,
  learningObjectives: [
    'Understand how B-Tree indexes speed up WHERE filtering and JOINs',
    'Create single and composite indexes using CREATE INDEX syntax',
    'Evaluate index trade-offs between read acceleration and write overhead',
  ],
  prerequisites: ['Primary keys, WHERE filtering, and query execution efficiency.'],
  sections: [
    {
      id: 'index-concept',
      title: 'How Database Indexes Work',
      content: `Without an index, the database must scan every single row on disk to find matches (called a **Full Table Scan** / \`SCAN TABLE\`).

An **Index** creates an ordered lookup structure (typically a balanced B-Tree) pointing directly to row locations on disk, just like the index at the back of a textbook!

\`\`\`sql
CREATE INDEX idx_logs_action ON AppUserLogs(action_type);
\`\`\`

• Turns full table scans into lightning-fast $O(\\log N)$ lookups
• Accelerates \`WHERE\`, \`JOIN\`, and \`ORDER BY\` operations
• Primary keys automatically receive unique indexes in SQLite!`,
      codeExample: {
        sql: `CREATE INDEX idx_logs_user ON AppUserLogs(user_uuid);`,
        explanation: 'Creates a lookup index on user_uuid to accelerate filtering telemetry by customer.',
      },
    },
    {
      id: 'index-tradeoffs',
      title: 'The Indexing Trade-Off (Reads vs Writes)',
      content: `Indexes are not free:

• **Faster Reads**: \`SELECT\` queries execute in fractions of a millisecond
• **Slower Writes**: Every \`INSERT\`, \`UPDATE\`, and \`DELETE\` must also rewrite the index structure!
• **Storage Overhead**: Indexes occupy additional disk space

**Rule of Thumb**: Index columns frequently used in \`WHERE\` filters and \`JOIN\` conditions, but avoid over-indexing tables with high write volumes.`,
      codeExample: {
        sql: `CREATE INDEX idx_status_action ON AppUserLogs(status_code, action_type);`,
        explanation: 'A composite (multi-column) index optimizing queries that filter on both status and action.',
      },
    },
  ],
  exercises: [
    {
      id: 'ex-24-1',
      lessonId: 'lesson-24-indexes-performance',
      order: 1,
      title: 'Task 1: Create an Index on Action Type',
      objective: 'Create an index named idx_action_type on the AppUserLogs table on the action_type column.',
      initialQuery: '-- Write CREATE INDEX statement\n;',
      solutionQuery: 'CREATE INDEX idx_action_type ON AppUserLogs(action_type);',
      verificationQuery: 'PRAGMA index_list(AppUserLogs);',
      hint: 'Syntax: CREATE INDEX idx_action_type ON AppUserLogs(action_type);',
      explanation: 'Builds a B-Tree lookup index on the action_type column for rapid query execution.',
      expectedColumns: ['seq', 'name', 'unique', 'origin', 'partial'],
      requiresOrder: false,
      allowsMutation: true,
    },
    {
      id: 'ex-24-2',
      lessonId: 'lesson-24-indexes-performance',
      order: 2,
      title: 'Task 2: Query High-Latency Server Logs',
      objective: 'Select log_id, user_uuid, response_time_ms from AppUserLogs where status_code = 500 OR response_time_ms >= 100 ordered by response_time_ms DESC.',
      initialQuery: 'SELECT log_id, user_uuid, response_time_ms\nFROM AppUserLogs\n-- Add WHERE and ORDER BY\n;',
      solutionQuery: 'SELECT log_id, user_uuid, response_time_ms FROM AppUserLogs WHERE status_code = 500 OR response_time_ms >= 100 ORDER BY response_time_ms DESC;',
      hint: 'Use: WHERE status_code = 500 OR response_time_ms >= 100 ORDER BY response_time_ms DESC',
      explanation: 'Combines multi-factor error and latency thresholds with descending sorting.',
      expectedColumns: ['log_id', 'user_uuid', 'response_time_ms'],
      requiresOrder: true,
    },
  ],
  quiz: [
    {
      id: 'q-24-1',
      question: 'What is the primary drawback of adding too many indexes to a database table?',
      explanation: 'Every index must be updated during INSERT, UPDATE, and DELETE operations, slowing down write speeds.',
      difficulty: 'advanced',
      topicTag: 'indexes',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'Queries can no longer use WHERE clauses', isCorrect: false },
        { id: 'opt-b', text: 'INSERT and UPDATE operations become slower', isCorrect: true },
        { id: 'opt-c', text: 'SQLite disables WebAssembly support', isCorrect: false },
        { id: 'opt-d', text: 'Data types are converted to plain text', isCorrect: false },
      ],
    },
    {
      id: 'q-24-2',
      question: 'Which SQL command is used to remove an index from a table?',
      explanation: 'DROP INDEX index_name removes the index structure.',
      difficulty: 'advanced',
      topicTag: 'indexes',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'DELETE INDEX index_name', isCorrect: false },
        { id: 'opt-b', text: 'DROP INDEX index_name', isCorrect: true },
        { id: 'opt-c', text: 'CLEAR INDEX index_name', isCorrect: false },
        { id: 'opt-d', text: 'ALTER TABLE DROP INDEX', isCorrect: false },
      ],
    },
    {
      id: 'q_24_auto_3',
      question: "In SQL Lesson 24 (Indexes & Query Performance Tuning), what is the primary role of this syntax feature?",
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
      id: 'q_24_auto_4',
      question: "Which keyword or clause in SQL Lesson 24 directly influences which rows or columns are returned?",
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
      id: 'q_24_auto_5',
      question: "How does SQLite handle data type affinity when executing queries in Lesson 24?",
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
      id: 'q_24_auto_6',
      question: "What is the expected behavior if a query in Lesson 24 matches zero rows?",
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
      id: 'q_24_auto_7',
      question: "Which SQL best practice applies when writing queries for Lesson 24?",
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
      id: 'q_24_auto_8',
      question: "Can queries from Lesson 24 be executed offline inside an in-browser SQLite WASM engine?",
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
      id: 'q_24_auto_9',
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
      id: 'q_24_auto_10',
      question: "In relational database design, why is data normalization relevant to Lesson 24?",
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
