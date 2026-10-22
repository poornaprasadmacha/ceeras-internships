import { LessonDefinition } from '../../types/lesson';
import { campusFacilitiesDataset } from '../datasets/campusFacilities';

export const lesson16: LessonDefinition = {
  id: 'lesson_16',
  number: 16,
  slug: 'altering-and-dropping-tables',
  title: 'Altering and Dropping Tables',
  shortDescription:
    'Evolve your schema over time using ALTER TABLE to add columns or rename tables, and delete obsolete schemas with DROP TABLE.',
  estimatedMinutes: 12,
  learningObjectives: [
    'Add new columns to an existing table with ALTER TABLE ... ADD COLUMN.',
    'Rename tables cleanly using ALTER TABLE ... RENAME TO.',
    'Permanently delete entire tables and their contents using DROP TABLE.',
    'Prevent execution errors using the IF EXISTS guard.',
  ],
  prerequisites: ['CREATE TABLE and table lifecycle concepts.'],
  dataset: campusFacilitiesDataset,
  sections: [
    {
      id: 'section-alter-drop',
      title: 'A. Schema Evolution with ALTER and DROP',
      content: `As application requirements grow, database schemas must adapt:

• **Add a Column**:
\`\`\`sql
ALTER TABLE CampusRooms ADD COLUMN floor_level INTEGER DEFAULT 1;
\`\`\`

• **Rename a Table**:
\`\`\`sql
ALTER TABLE CampusRooms RENAME TO UniversityRooms;
\`\`\`

• **Drop an Obsolete Table**:
\`\`\`sql
DROP TABLE IF EXISTS TemporaryStaging;
\`\`\``,
      codeExample: {
        sql: `ALTER TABLE CampusRooms ADD COLUMN has_projector BOOLEAN DEFAULT 1;`,
        explanation: 'Appends a new boolean column to CampusRooms without destroying existing rows.',
      },
    },
  ],
  exercises: [
    {
      id: 'ex_16_1',
      lessonId: 'lesson_16',
      order: 1,
      title: 'Exercise 1: Add a Column to CampusRooms',
      objective: 'Write an ALTER TABLE query to add a new column named building_code of type TEXT with DEFAULT "Main" to CampusRooms.',
      initialQuery: 'ALTER TABLE CampusRooms',
      solutionQuery: 'ALTER TABLE CampusRooms ADD COLUMN building_code TEXT DEFAULT "Main";',
      hint: 'Use ALTER TABLE CampusRooms ADD COLUMN building_code TEXT DEFAULT "Main";',
      explanation: 'Adds the building_code attribute to every existing and future row.',
      allowsMutation: true,
      verificationQuery: 'PRAGMA table_info(CampusRooms);',
      expectedColumns: ['cid', 'name', 'type', 'notnull', 'dflt_value', 'pk'],
    },
    {
      id: 'ex_16_2',
      lessonId: 'lesson_16',
      order: 2,
      title: 'Exercise 2: Drop the Obsolete Staging Table',
      objective: 'Permanently drop the table named TemporaryStaging using the DROP TABLE statement.',
      initialQuery: 'DROP TABLE',
      solutionQuery: 'DROP TABLE TemporaryStaging;',
      hint: 'Use DROP TABLE TemporaryStaging; or DROP TABLE IF EXISTS TemporaryStaging;',
      explanation: 'Permanently destroys the table schema and all its rows.',
      allowsMutation: true,
      verificationQuery: "SELECT name FROM sqlite_master WHERE type='table' AND name='TemporaryStaging';",
      expectedColumns: ['name'],
    },
  ],
  quiz: [
        {
      id: 'q_16_1',
      question: 'What is the main advantage of including "IF EXISTS" when dropping a table (DROP TABLE IF EXISTS table_name)?',
      explanation: 'DROP TABLE IF EXISTS ensures idempotence: if the table was already deleted, no runtime error is raised.',
      difficulty: 'beginner',
      topicTag: 'Concept Check',
      type: 'multiple-choice',
      options: [
        { id: 'opt_1', text: 'It makes the drop operation 100% faster.', isCorrect: false },
        { id: 'opt_2', text: 'It prevents the query from failing with an error if the table does not exist in the database.', isCorrect: true },
        { id: 'opt_3', text: 'It preserves a backup of the table on disk.', isCorrect: false },
        { id: 'opt_4', text: 'It drops all related foreign keys automatically.', isCorrect: false }
      ],
    },
    {
      id: 'q_16_auto_2',
      question: "In SQL Lesson 16 (Altering and Dropping Tables), what is the primary role of this syntax feature?",
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
      id: 'q_16_auto_3',
      question: "Which keyword or clause in SQL Lesson 16 directly influences which rows or columns are returned?",
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
      id: 'q_16_auto_4',
      question: "How does SQLite handle data type affinity when executing queries in Lesson 16?",
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
      id: 'q_16_auto_5',
      question: "What is the expected behavior if a query in Lesson 16 matches zero rows?",
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
      id: 'q_16_auto_6',
      question: "Which SQL best practice applies when writing queries for Lesson 16?",
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
      id: 'q_16_auto_7',
      question: "Can queries from Lesson 16 be executed offline inside an in-browser SQLite WASM engine?",
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
      id: 'q_16_auto_8',
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
      id: 'q_16_auto_9',
      question: "In relational database design, why is data normalization relevant to Lesson 16?",
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
      id: 'q_16_auto_10',
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
