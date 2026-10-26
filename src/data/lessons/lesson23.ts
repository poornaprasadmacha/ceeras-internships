import { LessonDefinition } from '../../types/lesson';
import { medicalClinicsDataset } from '../datasets/medicalClinics';

export const lesson23: LessonDefinition = {
  id: 'lesson-23-database-views',
  slug: 'database-views-virtual-tables',
  number: 23,
  title: 'Database Views (Virtual Tables)',
  shortDescription: 'Encapsulate and reuse complex queries as virtual named tables.',
  estimatedMinutes: 12,
  dataset: medicalClinicsDataset,
  learningObjectives: [
    'Create persistent virtual tables using CREATE VIEW syntax',
    'Simplify complex joins and column projections for end users',
    'Query and filter views using standard SELECT statements',
  ],
  prerequisites: ['Data Definition Language (DDL) and complex SELECT statements.'],
  sections: [
    {
      id: 'view-concept',
      title: 'What is a SQL View?',
      content: `A **View** is a saved, virtual table defined by a SQL query.

Unlike a physical table, a view does **not store duplicate data** on disk; it dynamically runs its underlying query whenever accessed!

\`\`\`sql
CREATE VIEW ViewName AS
SELECT column1, column2
FROM TableName
WHERE condition;
\`\`\`

• **Security**: Hide sensitive columns (like salaries, passwords, SSNs)
• **Simplicity**: Give reporting teams clean, pre-joined interfaces
• **Consistency**: Change business formulas in one view definition`,
      codeExample: {
        sql: `CREATE VIEW ActiveCardiologists AS\nSELECT doctor_name, hospital_branch, consultation_fee\nFROM DoctorRoster\nWHERE specialty = 'Cardiology' AND is_accepting_patients = 1;`,
        explanation: 'Creates a virtual view isolating only cardiology specialists currently taking new appointments.',
      },
    },
    {
      id: 'querying-views',
      title: 'Querying and Dropping Views',
      content: `Once created, you query a view identically to any ordinary table:

\`\`\`sql
SELECT * FROM ActiveCardiologists WHERE consultation_fee < 300;
\`\`\`

To remove a view when no longer needed:
\`\`\`sql
DROP VIEW IF EXISTS ActiveCardiologists;
\`\`\``,
      codeExample: {
        sql: `SELECT doctor_name, consultation_fee\nFROM ActiveCardiologists\nORDER BY consultation_fee ASC;`,
        explanation: 'Filters and sorts directly against the virtual view without re-specifying underlying table filters.',
      },
    },
  ],
  exercises: [
    {
      id: 'ex-23-1',
      lessonId: 'lesson-23-database-views',
      order: 1,
      title: 'Task 1: Create an Available Doctors View',
      objective: 'Create a view named AvailableDoctors that selects doctor_id, doctor_name, specialty, and consultation_fee from DoctorRoster where is_accepting_patients = 1.',
      initialQuery: 'CREATE VIEW AvailableDoctors AS\n-- Write query for doctors where is_accepting_patients = 1\n;',
      solutionQuery: 'CREATE VIEW AvailableDoctors AS SELECT doctor_id, doctor_name, specialty, consultation_fee FROM DoctorRoster WHERE is_accepting_patients = 1;',
      verificationQuery: 'SELECT doctor_id, doctor_name, specialty, consultation_fee FROM AvailableDoctors;',
      hint: 'Syntax: CREATE VIEW AvailableDoctors AS SELECT doctor_id, doctor_name, specialty, consultation_fee FROM DoctorRoster WHERE is_accepting_patients = 1;',
      explanation: 'Creates the virtual view isolating available practitioners.',
      expectedColumns: ['doctor_id', 'doctor_name', 'specialty', 'consultation_fee'],
      requiresOrder: false,
      allowsMutation: true,
    },
    {
      id: 'ex-23-2',
      lessonId: 'lesson-23-database-views',
      order: 2,
      title: 'Task 2: Query the Virtual View',
      objective: 'Query the AvailableDoctors view to select doctor_name and consultation_fee ordered by consultation_fee ASC.',
      initialQuery: '-- First create or query AvailableDoctors\nSELECT doctor_name, consultation_fee FROM AvailableDoctors ORDER BY consultation_fee ASC;',
      solutionQuery: 'SELECT doctor_name, consultation_fee FROM (SELECT doctor_name, consultation_fee FROM DoctorRoster WHERE is_accepting_patients = 1) ORDER BY consultation_fee ASC;',
      hint: 'Select doctor_name and consultation_fee from AvailableDoctors ordered by consultation_fee ASC.',
      explanation: 'Demonstrates querying and sorting directly from the virtual abstraction.',
      expectedColumns: ['doctor_name', 'consultation_fee'],
      requiresOrder: true,
    },
  ],
  quiz: [
    {
      id: 'q_23_1',
      question: "What is the primary objective taught in Lesson 23: Indexing & Query Performance?",
      explanation: "Lesson 23 focuses specifically on mastering Indexing & Query Performance in relational SQL.",
      difficulty: 'intermediate',
      topicTag: 'SQL',
      type: 'multiple-choice',
      options: [
        { id: 'opt_1', text: "To format CSS styles for web browsers", isCorrect: false },
        { id: 'opt_2', text: "To master Indexing & Query Performance and apply it accurately on relational tables.", isCorrect: true },
        { id: 'opt_3', text: "To configure operating system firewalls", isCorrect: false },
        { id: 'opt_4', text: "To write low-level machine assembly", isCorrect: false },
      ],
    },
    {
      id: 'q_23_2',
      question: "Which SQL clause or construct is introduced in Lesson 23 to manage Indexing?",
      explanation: "This lesson explores standard SQL syntax designed specifically for Indexing.",
      difficulty: 'intermediate',
      topicTag: 'SQL',
      type: 'multiple-choice',
      options: [
        { id: 'opt_1', text: "The Indexing syntax and its associated keywords.", isCorrect: true },
        { id: 'opt_2', text: "The HTML <div> tag", isCorrect: false },
        { id: 'opt_3', text: "The Python def keyword", isCorrect: false },
        { id: 'opt_4', text: "The git commit command", isCorrect: false },
      ],
    },
    {
      id: 'q_23_3',
      question: "On which dataset table are the interactive exercises in Lesson 23 practiced?",
      explanation: "Lesson 23 exercises are executed against the AppUserLogs table in the local SQLite engine.",
      difficulty: 'intermediate',
      topicTag: 'SQL',
      type: 'multiple-choice',
      options: [
        { id: 'opt_1', text: "The AppUserLogs dataset table.", isCorrect: true },
        { id: 'opt_2', text: "A local CSV spreadsheet", isCorrect: false },
        { id: 'opt_3', text: "An external MongoDB cluster", isCorrect: false },
        { id: 'opt_4', text: "A Redis memory cache", isCorrect: false },
      ],
    },
    {
      id: 'q_23_4',
      question: "What is a key rule when writing queries involving Indexing in Lesson 23?",
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
      id: 'q_23_5',
      question: "How does the in-browser SQLite WASM engine execute queries in Lesson 23?",
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
      id: 'q_23_6',
      question: "What happens if a query in Lesson 23 violates SQL syntax rules?",
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
      id: 'q_23_7',
      question: "In Lesson 23, how does Indexing & Query Performance interact with query filtering?",
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
      id: 'q_23_8',
      question: "Which best practice should be followed when structuring queries in Lesson 23?",
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
      id: 'q_23_9',
      question: "What is the expected result set structure from queries in Lesson 23?",
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
      id: 'q_23_10',
      question: "Why is mastering Indexing & Query Performance in Lesson 23 essential for data professionals?",
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
