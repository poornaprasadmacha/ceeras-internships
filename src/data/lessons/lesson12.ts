import { LessonDefinition } from '../../types/lesson';
import { gymMembersDataset } from '../datasets/gymMembers';

export const lesson12: LessonDefinition = {
  id: 'lesson_12',
  number: 12,
  slug: 'inserting-rows',
  title: 'Inserting New Rows with INSERT INTO',
  shortDescription:
    'Add new records into a database table using the INSERT INTO statement with explicit column lists and values.',
  estimatedMinutes: 12,
  learningObjectives: [
    'Insert single records using INSERT INTO ... VALUES.',
    'Understand why listing explicit column names prevents schema bugs.',
    'Insert multiple records in a single batch statement.',
    'Observe auto-incrementing primary key behavior.',
  ],
  prerequisites: ['Basic SELECT queries and table concepts.'],
  dataset: gymMembersDataset,
  sections: [
    {
      id: 'section-insert-syntax',
      title: 'A. Adding Records with INSERT INTO',
      content: `The **INSERT INTO** command adds new rows to a table. You specify the target table name, list the columns to populate, and provide corresponding values:

\`\`\`sql
INSERT INTO FitnessMembers (member_id, full_name, plan_type, join_year, monthly_fee)
VALUES (5, 'Zoe Saldana', 'Premium', 2024, 59.99);
\`\`\`

Strings are enclosed in single quotes (\`'text'\`), while numbers and booleans are written directly.`,
      codeExample: {
        sql: `INSERT INTO FitnessMembers (member_id, full_name, plan_type, join_year, monthly_fee)\nVALUES (5, 'Zoe Saldana', 'Premium', 2024, 59.99);`,
        explanation: 'Adds a new member record with explicit values for each column.',
      },
    },
  ],
  exercises: [
    {
      id: 'ex_12_1',
      lessonId: 'lesson_12',
      order: 1,
      title: 'Exercise 1: Insert a New Member',
      objective: 'Insert a new member into FitnessMembers with member_id 5, full_name "Maya Lin", plan_type "VIP", join_year 2024, and monthly_fee 89.99.',
      initialQuery: 'INSERT INTO FitnessMembers (member_id, full_name, plan_type, join_year, monthly_fee)\nVALUES',
      solutionQuery: "INSERT INTO FitnessMembers (member_id, full_name, plan_type, join_year, monthly_fee) VALUES (5, 'Maya Lin', 'VIP', 2024, 89.99);",
      hint: "Use VALUES (5, 'Maya Lin', 'VIP', 2024, 89.99);",
      explanation: 'Inserts Maya Lin as a VIP member.',
      allowsMutation: true,
      verificationQuery: 'SELECT * FROM FitnessMembers WHERE member_id = 5;',
      expectedColumns: ['member_id', 'full_name', 'plan_type', 'join_year', 'monthly_fee'],
    },
    {
      id: 'ex_12_2',
      lessonId: 'lesson_12',
      order: 2,
      title: 'Exercise 2: Insert Multiple Members at Once',
      objective: 'Insert two new records in a single statement: (6, "Sam Reed", "Basic", 2024, 29.99) and (7, "Dana Scully", "Premium", 2024, 59.99).',
      initialQuery: 'INSERT INTO FitnessMembers (member_id, full_name, plan_type, join_year, monthly_fee) VALUES\n',
      solutionQuery: "INSERT INTO FitnessMembers (member_id, full_name, plan_type, join_year, monthly_fee) VALUES (6, 'Sam Reed', 'Basic', 2024, 29.99), (7, 'Dana Scully', 'Premium', 2024, 59.99);",
      hint: 'Separate each value tuple with a comma: (...), (...);',
      explanation: 'Multi-row inserts allow high-throughput batch ingestion.',
      allowsMutation: true,
      verificationQuery: 'SELECT * FROM FitnessMembers WHERE member_id IN (6, 7);',
      expectedColumns: ['member_id', 'full_name', 'plan_type', 'join_year', 'monthly_fee'],
    },
  ],
  quiz: [
        {
      id: 'q_12_1',
      question: 'What happens if you omit the column list in an INSERT statement (e.g. INSERT INTO table VALUES (...))?',
      explanation: 'Omitting column lists requires providing values for all table columns in schema order, making queries fragile to schema changes.',
      difficulty: 'beginner',
      topicTag: 'Concept Check',
      type: 'multiple-choice',
      options: [
        { id: 'opt_1', text: 'The query is rejected with a syntax error.', isCorrect: false },
        { id: 'opt_2', text: 'You must provide values for EVERY column in the exact order they are defined in the schema.', isCorrect: true },
        { id: 'opt_3', text: 'The values are randomly distributed.', isCorrect: false },
        { id: 'opt_4', text: 'The database prompts for column names.', isCorrect: false }
      ],
    },
    {
      id: 'q_12_auto_2',
      question: "In SQL Lesson 12 (Inserting New Rows with INSERT INTO), what is the primary role of this syntax feature?",
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
      id: 'q_12_auto_3',
      question: "Which keyword or clause in SQL Lesson 12 directly influences which rows or columns are returned?",
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
      id: 'q_12_auto_4',
      question: "How does SQLite handle data type affinity when executing queries in Lesson 12?",
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
      id: 'q_12_auto_5',
      question: "What is the expected behavior if a query in Lesson 12 matches zero rows?",
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
      id: 'q_12_auto_6',
      question: "Which SQL best practice applies when writing queries for Lesson 12?",
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
      id: 'q_12_auto_7',
      question: "Can queries from Lesson 12 be executed offline inside an in-browser SQLite WASM engine?",
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
      id: 'q_12_auto_8',
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
      id: 'q_12_auto_9',
      question: "In relational database design, why is data normalization relevant to Lesson 12?",
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
      id: 'q_12_auto_10',
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
