import { LessonDefinition } from '../../types/lesson';
import { cleanDatabaseDataset } from '../datasets/cleanDatabase';

export const lesson15: LessonDefinition = {
  id: 'lesson_15',
  number: 15,
  slug: 'creating-tables',
  title: 'Creating Tables with CREATE TABLE',
  shortDescription:
    'Define new database tables, choose proper data types (INTEGER, TEXT, REAL), and enforce integrity with constraints (PRIMARY KEY, NOT NULL, DEFAULT).',
  estimatedMinutes: 14,
  learningObjectives: [
    'Define new tables using the CREATE TABLE statement.',
    'Select appropriate SQLite data types: INTEGER, TEXT, REAL, and BLOB.',
    'Enforce entity integrity with PRIMARY KEY.',
    'Prevent missing entries with NOT NULL and supply fallback values with DEFAULT.',
  ],
  prerequisites: ['All foundational DML and querying lessons.'],
  dataset: cleanDatabaseDataset,
  sections: [
    {
      id: 'section-create-table-syntax',
      title: 'A. Designing Schemas with CREATE TABLE',
      content: `The **CREATE TABLE** statement establishes the blueprint for storing new data entities:

\`\`\`sql
CREATE TABLE SchoolCourses (
  course_id INTEGER PRIMARY KEY,
  title TEXT NOT NULL,
  credits INTEGER DEFAULT 3,
  tuition_rate REAL NOT NULL
);
\`\`\`

• **PRIMARY KEY**: Uniquely identifies each record and prevents duplicates.
• **NOT NULL**: Guarantees the column must never be left blank.
• **DEFAULT value**: Automatically provides a value when omitted during insertion.`,
      codeExample: {
        sql: `CREATE TABLE Students (\n  id INTEGER PRIMARY KEY,\n  full_name TEXT NOT NULL,\n  gpa REAL DEFAULT 4.0\n);`,
        explanation: 'Declares a Students table with id as primary key and a default GPA of 4.0.',
      },
    },
  ],
  exercises: [
    {
      id: 'ex_15_1',
      lessonId: 'lesson_15',
      order: 1,
      title: 'Exercise 1: Create a SchoolCourses Table',
      objective: 'Write a statement to create a table named SchoolCourses with three columns: course_id INTEGER PRIMARY KEY, title TEXT NOT NULL, and credits INTEGER DEFAULT 3.',
      initialQuery: 'CREATE TABLE SchoolCourses (\n',
      solutionQuery: 'CREATE TABLE SchoolCourses (course_id INTEGER PRIMARY KEY, title TEXT NOT NULL, credits INTEGER DEFAULT 3);',
      hint: 'Include course_id INTEGER PRIMARY KEY, title TEXT NOT NULL, credits INTEGER DEFAULT 3.',
      explanation: 'Creates the new structured table in SQLite.',
      allowsMutation: true,
      verificationQuery: "SELECT name FROM sqlite_master WHERE type='table' AND name='SchoolCourses';",
      expectedColumns: ['name'],
    },
  ],
  quiz: [
        {
      id: 'q_15_1',
      question: 'Which constraint ensures that a column cannot store NULL values?',
      explanation: 'The NOT NULL constraint strictly enforces that every inserted record must provide a valid value for that column.',
      difficulty: 'beginner',
      topicTag: 'Concept Check',
      type: 'multiple-choice',
      options: [
        { id: 'opt_1', text: 'UNIQUE', isCorrect: false },
        { id: 'opt_2', text: 'NOT NULL', isCorrect: true },
        { id: 'opt_3', text: 'CHECK', isCorrect: false },
        { id: 'opt_4', text: 'FOREIGN KEY', isCorrect: false }
      ],
    },
    {
      id: 'q_15_auto_2',
      question: "In SQL Lesson 15 (Creating Tables with CREATE TABLE), what is the primary role of this syntax feature?",
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
      id: 'q_15_auto_3',
      question: "Which keyword or clause in SQL Lesson 15 directly influences which rows or columns are returned?",
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
      id: 'q_15_auto_4',
      question: "How does SQLite handle data type affinity when executing queries in Lesson 15?",
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
      id: 'q_15_auto_5',
      question: "What is the expected behavior if a query in Lesson 15 matches zero rows?",
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
      id: 'q_15_auto_6',
      question: "Which SQL best practice applies when writing queries for Lesson 15?",
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
      id: 'q_15_auto_7',
      question: "Can queries from Lesson 15 be executed offline inside an in-browser SQLite WASM engine?",
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
      id: 'q_15_auto_8',
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
      id: 'q_15_auto_9',
      question: "In relational database design, why is data normalization relevant to Lesson 15?",
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
      id: 'q_15_auto_10',
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
