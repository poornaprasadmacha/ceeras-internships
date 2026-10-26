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
      question: "What is the primary objective taught in Lesson 15: UNION & Set Operations?",
      explanation: "Lesson 15 focuses specifically on mastering UNION & Set Operations in relational SQL.",
      difficulty: 'intermediate',
      topicTag: 'SQL',
      type: 'multiple-choice',
      options: [
        { id: 'opt_1', text: "To format CSS styles for web browsers", isCorrect: false },
        { id: 'opt_2', text: "To master UNION & Set Operations and apply it accurately on relational tables.", isCorrect: true },
        { id: 'opt_3', text: "To configure operating system firewalls", isCorrect: false },
        { id: 'opt_4', text: "To write low-level machine assembly", isCorrect: false },
      ],
    },
    {
      id: 'q_15_2',
      question: "Which SQL clause or construct is introduced in Lesson 15 to manage UNION?",
      explanation: "This lesson explores standard SQL syntax designed specifically for UNION.",
      difficulty: 'intermediate',
      topicTag: 'SQL',
      type: 'multiple-choice',
      options: [
        { id: 'opt_1', text: "The UNION syntax and its associated keywords.", isCorrect: true },
        { id: 'opt_2', text: "The HTML <div> tag", isCorrect: false },
        { id: 'opt_3', text: "The Python def keyword", isCorrect: false },
        { id: 'opt_4', text: "The git commit command", isCorrect: false },
      ],
    },
    {
      id: 'q_15_3',
      question: "On which dataset table are the interactive exercises in Lesson 15 practiced?",
      explanation: "Lesson 15 exercises are executed against the CampusFacilities table in the local SQLite engine.",
      difficulty: 'intermediate',
      topicTag: 'SQL',
      type: 'multiple-choice',
      options: [
        { id: 'opt_1', text: "The CampusFacilities dataset table.", isCorrect: true },
        { id: 'opt_2', text: "A local CSV spreadsheet", isCorrect: false },
        { id: 'opt_3', text: "An external MongoDB cluster", isCorrect: false },
        { id: 'opt_4', text: "A Redis memory cache", isCorrect: false },
      ],
    },
    {
      id: 'q_15_4',
      question: "What is a key rule when writing queries involving UNION in Lesson 15?",
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
      id: 'q_15_5',
      question: "How does the in-browser SQLite WASM engine execute queries in Lesson 15?",
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
      id: 'q_15_6',
      question: "What happens if a query in Lesson 15 violates SQL syntax rules?",
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
      id: 'q_15_7',
      question: "In Lesson 15, how does UNION & Set Operations interact with query filtering?",
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
      id: 'q_15_8',
      question: "Which best practice should be followed when structuring queries in Lesson 15?",
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
      id: 'q_15_9',
      question: "What is the expected result set structure from queries in Lesson 15?",
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
      id: 'q_15_10',
      question: "Why is mastering UNION & Set Operations in Lesson 15 essential for data professionals?",
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
