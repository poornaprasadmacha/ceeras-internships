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
      id: 'q-23-1',
      question: 'Does a standard SQL view duplicate and store underlying table data on disk?',
      explanation: 'No, standard SQL views store only the saved query definition, running dynamically whenever called.',
      difficulty: 'intermediate',
      topicTag: 'views',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'Yes, it makes a physical copy of all rows', isCorrect: false },
        { id: 'opt-b', text: 'No, it is a virtual table that executes dynamically', isCorrect: true },
        { id: 'opt-c', text: 'Only if the table has more than 10,000 rows', isCorrect: false },
        { id: 'opt-d', text: 'Yes, but only in binary format', isCorrect: false },
      ],
    },
    {
      id: 'q-23-2',
      question: 'Which SQL command is used to delete a view?',
      explanation: 'DROP VIEW view_name removes the view definition from the schema.',
      difficulty: 'intermediate',
      topicTag: 'views',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'DELETE VIEW view_name', isCorrect: false },
        { id: 'opt-b', text: 'REMOVE VIEW view_name', isCorrect: false },
        { id: 'opt-c', text: 'DROP VIEW view_name', isCorrect: true },
        { id: 'opt-d', text: 'TRUNCATE VIEW view_name', isCorrect: false },
      ],
    },
    {
      id: 'q_23_auto_3',
      question: "In SQL Lesson 23 (Database Views (Virtual Tables)), what is the primary role of this syntax feature?",
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
      id: 'q_23_auto_4',
      question: "Which keyword or clause in SQL Lesson 23 directly influences which rows or columns are returned?",
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
      id: 'q_23_auto_5',
      question: "How does SQLite handle data type affinity when executing queries in Lesson 23?",
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
      id: 'q_23_auto_6',
      question: "What is the expected behavior if a query in Lesson 23 matches zero rows?",
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
      id: 'q_23_auto_7',
      question: "Which SQL best practice applies when writing queries for Lesson 23?",
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
      id: 'q_23_auto_8',
      question: "Can queries from Lesson 23 be executed offline inside an in-browser SQLite WASM engine?",
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
      id: 'q_23_auto_9',
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
      id: 'q_23_auto_10',
      question: "In relational database design, why is data normalization relevant to Lesson 23?",
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
