import { LessonDefinition } from '../../types/lesson';
import { auditLogsDataset } from '../datasets/auditLogs';

export const lesson14: LessonDefinition = {
  id: 'lesson_14',
  number: 14,
  slug: 'deleting-rows',
  title: 'Deleting Rows with DELETE',
  shortDescription:
    'Permanently remove records from a table using DELETE FROM and safeguard data integrity with precise WHERE filters.',
  estimatedMinutes: 10,
  learningObjectives: [
    'Delete specific rows matching targeted conditions using DELETE FROM ... WHERE.',
    'Understand why running DELETE without WHERE deletes all rows in the table.',
    'Differentiate between row deletion and table dropping.',
  ],
  prerequisites: ['UPDATE and WHERE clause filtering.'],
  dataset: auditLogsDataset,
  sections: [
    {
      id: 'section-delete-syntax',
      title: 'A. Removing Records with DELETE',
      content: `The **DELETE** command permanently purges records matching a criteria:

\`\`\`sql
DELETE FROM SystemEvents
WHERE status = 'INVALID';
\`\`\`

**CRITICAL WARNING**: Running \`DELETE FROM SystemEvents;\` without a **WHERE** clause wipes all rows from the table! Always test your WHERE condition with a \`SELECT * WHERE ...\` first.`,
      codeExample: {
        sql: `DELETE FROM SystemEvents\nWHERE event_type = 'SPAM_BOT'\n  AND log_year < 2022;`,
        explanation: 'Safely purges historical spam bot entries logged prior to 2022.',
      },
    },
  ],
  exercises: [
    {
      id: 'ex_14_1',
      lessonId: 'lesson_14',
      order: 1,
      title: 'Exercise 1: Delete Specific Event Record',
      objective: 'Delete the record with event_id = 4 from SystemEvents.',
      initialQuery: 'DELETE FROM SystemEvents WHERE',
      solutionQuery: 'DELETE FROM SystemEvents WHERE event_id = 4;',
      hint: 'Use WHERE event_id = 4;',
      explanation: 'Targeting a primary key ensures exactly one specific record is purged.',
      allowsMutation: true,
      verificationQuery: 'SELECT * FROM SystemEvents WHERE event_id = 4;',
      expectedColumns: ['event_id', 'user_email', 'event_type', 'status', 'log_year'],
    },
    {
      id: 'ex_14_2',
      lessonId: 'lesson_14',
      order: 2,
      title: 'Exercise 2: Purge All Invalid Status Records',
      objective: 'Delete all rows from SystemEvents where status is "INVALID".',
      initialQuery: 'DELETE FROM SystemEvents WHERE',
      solutionQuery: "DELETE FROM SystemEvents WHERE status = 'INVALID';",
      hint: "Use WHERE status = 'INVALID';",
      explanation: 'Deletes all spam/invalid log records in bulk.',
      allowsMutation: true,
      verificationQuery: "SELECT * FROM SystemEvents WHERE status = 'INVALID';",
      expectedColumns: ['event_id', 'user_email', 'event_type', 'status', 'log_year'],
    },
  ],
  quiz: [
    {
      id: 'q_14_1',
      question: "What is the primary objective taught in Lesson 14: Subqueries in SELECT & FROM?",
      explanation: "Lesson 14 focuses specifically on mastering Subqueries in SELECT & FROM in relational SQL.",
      difficulty: 'intermediate',
      topicTag: 'SQL',
      type: 'multiple-choice',
      options: [
        { id: 'opt_1', text: "To format CSS styles for web browsers", isCorrect: false },
        { id: 'opt_2', text: "To master Subqueries in SELECT & FROM and apply it accurately on relational tables.", isCorrect: true },
        { id: 'opt_3', text: "To configure operating system firewalls", isCorrect: false },
        { id: 'opt_4', text: "To write low-level machine assembly", isCorrect: false },
      ],
    },
    {
      id: 'q_14_2',
      question: "Which SQL clause or construct is introduced in Lesson 14 to manage Derived Tables?",
      explanation: "This lesson explores standard SQL syntax designed specifically for Derived Tables.",
      difficulty: 'intermediate',
      topicTag: 'SQL',
      type: 'multiple-choice',
      options: [
        { id: 'opt_1', text: "The Derived Tables syntax and its associated keywords.", isCorrect: true },
        { id: 'opt_2', text: "The HTML <div> tag", isCorrect: false },
        { id: 'opt_3', text: "The Python def keyword", isCorrect: false },
        { id: 'opt_4', text: "The git commit command", isCorrect: false },
      ],
    },
    {
      id: 'q_14_3',
      question: "On which dataset table are the interactive exercises in Lesson 14 practiced?",
      explanation: "Lesson 14 exercises are executed against the CleanDatabase table in the local SQLite engine.",
      difficulty: 'intermediate',
      topicTag: 'SQL',
      type: 'multiple-choice',
      options: [
        { id: 'opt_1', text: "The CleanDatabase dataset table.", isCorrect: true },
        { id: 'opt_2', text: "A local CSV spreadsheet", isCorrect: false },
        { id: 'opt_3', text: "An external MongoDB cluster", isCorrect: false },
        { id: 'opt_4', text: "A Redis memory cache", isCorrect: false },
      ],
    },
    {
      id: 'q_14_4',
      question: "What is a key rule when writing queries involving Derived Tables in Lesson 14?",
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
      id: 'q_14_5',
      question: "How does the in-browser SQLite WASM engine execute queries in Lesson 14?",
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
      id: 'q_14_6',
      question: "What happens if a query in Lesson 14 violates SQL syntax rules?",
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
      id: 'q_14_7',
      question: "In Lesson 14, how does Subqueries in SELECT & FROM interact with query filtering?",
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
      id: 'q_14_8',
      question: "Which best practice should be followed when structuring queries in Lesson 14?",
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
      id: 'q_14_9',
      question: "What is the expected result set structure from queries in Lesson 14?",
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
      id: 'q_14_10',
      question: "Why is mastering Subqueries in SELECT & FROM in Lesson 14 essential for data professionals?",
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
