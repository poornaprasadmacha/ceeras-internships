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
      question: 'What is the recommended practice before executing a production DELETE statement?',
      explanation: 'Previewing with SELECT * WHERE ... guarantees you confirm exactly which rows match before permanently deleting them.',
      difficulty: 'beginner',
      topicTag: 'Concept Check',
      type: 'multiple-choice',
      options: [
        { id: 'opt_1', text: 'Run a SELECT with the exact same WHERE clause to verify which rows will be affected.', isCorrect: true },
        { id: 'opt_2', text: 'Delete the primary key column first.', isCorrect: false },
        { id: 'opt_3', text: 'Convert all data into strings.', isCorrect: false },
        { id: 'opt_4', text: 'Restart the database server.', isCorrect: false }
      ],
    },
    {
      id: 'q_14_auto_2',
      question: "In SQL Lesson 14 (Deleting Rows with DELETE), what is the primary role of this syntax feature?",
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
      id: 'q_14_auto_3',
      question: "Which keyword or clause in SQL Lesson 14 directly influences which rows or columns are returned?",
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
      id: 'q_14_auto_4',
      question: "How does SQLite handle data type affinity when executing queries in Lesson 14?",
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
      id: 'q_14_auto_5',
      question: "What is the expected behavior if a query in Lesson 14 matches zero rows?",
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
      id: 'q_14_auto_6',
      question: "Which SQL best practice applies when writing queries for Lesson 14?",
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
      id: 'q_14_auto_7',
      question: "Can queries from Lesson 14 be executed offline inside an in-browser SQLite WASM engine?",
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
      id: 'q_14_auto_8',
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
      id: 'q_14_auto_9',
      question: "In relational database design, why is data normalization relevant to Lesson 14?",
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
    {
      id: 'q_14_auto_10',
      question: "What happens if you omit the WHERE clause in a query intended to target specific records?",
      explanation: "Without a WHERE clause, operations apply to every record in the table.",
      difficulty: 'intermediate',
      topicTag: 'SQL',
      type: 'multiple-choice',
      options: [
        { id: 'opt_1', text: "The query acts on all rows in the table without restriction", isCorrect: true },
        { id: 'opt_2', text: "The database prompts the user interactively in the console", isCorrect: false },
        { id: 'opt_3', text: "The engine automatically guesses the most recent record", isCorrect: false },
        { id: 'opt_4', text: "The database throws a missing-where syntax error", isCorrect: false },
      ],
    },
  ],
};
