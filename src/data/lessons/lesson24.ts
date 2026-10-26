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
      id: 'q_24_1',
      question: "What is the primary objective taught in Lesson 24: Database Views & Virtual Tables?",
      explanation: "Lesson 24 focuses specifically on mastering Database Views & Virtual Tables in relational SQL.",
      difficulty: 'intermediate',
      topicTag: 'SQL',
      type: 'multiple-choice',
      options: [
        { id: 'opt_1', text: "To format CSS styles for web browsers", isCorrect: false },
        { id: 'opt_2', text: "To master Database Views & Virtual Tables and apply it accurately on relational tables.", isCorrect: true },
        { id: 'opt_3', text: "To configure operating system firewalls", isCorrect: false },
        { id: 'opt_4', text: "To write low-level machine assembly", isCorrect: false },
      ],
    },
    {
      id: 'q_24_2',
      question: "Which SQL clause or construct is introduced in Lesson 24 to manage Views?",
      explanation: "This lesson explores standard SQL syntax designed specifically for Views.",
      difficulty: 'intermediate',
      topicTag: 'SQL',
      type: 'multiple-choice',
      options: [
        { id: 'opt_1', text: "The Views syntax and its associated keywords.", isCorrect: true },
        { id: 'opt_2', text: "The HTML <div> tag", isCorrect: false },
        { id: 'opt_3', text: "The Python def keyword", isCorrect: false },
        { id: 'opt_4', text: "The git commit command", isCorrect: false },
      ],
    },
    {
      id: 'q_24_3',
      question: "On which dataset table are the interactive exercises in Lesson 24 practiced?",
      explanation: "Lesson 24 exercises are executed against the LibraryBooks table in the local SQLite engine.",
      difficulty: 'intermediate',
      topicTag: 'SQL',
      type: 'multiple-choice',
      options: [
        { id: 'opt_1', text: "The LibraryBooks dataset table.", isCorrect: true },
        { id: 'opt_2', text: "A local CSV spreadsheet", isCorrect: false },
        { id: 'opt_3', text: "An external MongoDB cluster", isCorrect: false },
        { id: 'opt_4', text: "A Redis memory cache", isCorrect: false },
      ],
    },
    {
      id: 'q_24_4',
      question: "What is a key rule when writing queries involving Views in Lesson 24?",
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
      id: 'q_24_5',
      question: "How does the in-browser SQLite WASM engine execute queries in Lesson 24?",
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
      id: 'q_24_6',
      question: "What happens if a query in Lesson 24 violates SQL syntax rules?",
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
      id: 'q_24_7',
      question: "In Lesson 24, how does Database Views & Virtual Tables interact with query filtering?",
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
      id: 'q_24_8',
      question: "Which best practice should be followed when structuring queries in Lesson 24?",
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
      id: 'q_24_9',
      question: "What is the expected result set structure from queries in Lesson 24?",
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
      id: 'q_24_10',
      question: "Why is mastering Database Views & Virtual Tables in Lesson 24 essential for data professionals?",
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
