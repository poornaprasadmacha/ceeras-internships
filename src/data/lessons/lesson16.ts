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
      question: "What is the primary objective taught in Lesson 16: CASE WHEN Logic?",
      explanation: "Lesson 16 focuses specifically on mastering CASE WHEN Logic in relational SQL.",
      difficulty: 'intermediate',
      topicTag: 'SQL',
      type: 'multiple-choice',
      options: [
        { id: 'opt_1', text: "To format CSS styles for web browsers", isCorrect: false },
        { id: 'opt_2', text: "To master CASE WHEN Logic and apply it accurately on relational tables.", isCorrect: true },
        { id: 'opt_3', text: "To configure operating system firewalls", isCorrect: false },
        { id: 'opt_4', text: "To write low-level machine assembly", isCorrect: false },
      ],
    },
    {
      id: 'q_16_2',
      question: "Which SQL clause or construct is introduced in Lesson 16 to manage CASE Expression?",
      explanation: "This lesson explores standard SQL syntax designed specifically for CASE Expression.",
      difficulty: 'intermediate',
      topicTag: 'SQL',
      type: 'multiple-choice',
      options: [
        { id: 'opt_1', text: "The CASE Expression syntax and its associated keywords.", isCorrect: true },
        { id: 'opt_2', text: "The HTML <div> tag", isCorrect: false },
        { id: 'opt_3', text: "The Python def keyword", isCorrect: false },
        { id: 'opt_4', text: "The git commit command", isCorrect: false },
      ],
    },
    {
      id: 'q_16_3',
      question: "On which dataset table are the interactive exercises in Lesson 16 practiced?",
      explanation: "Lesson 16 exercises are executed against the FlightBookings table in the local SQLite engine.",
      difficulty: 'intermediate',
      topicTag: 'SQL',
      type: 'multiple-choice',
      options: [
        { id: 'opt_1', text: "The FlightBookings dataset table.", isCorrect: true },
        { id: 'opt_2', text: "A local CSV spreadsheet", isCorrect: false },
        { id: 'opt_3', text: "An external MongoDB cluster", isCorrect: false },
        { id: 'opt_4', text: "A Redis memory cache", isCorrect: false },
      ],
    },
    {
      id: 'q_16_4',
      question: "What is a key rule when writing queries involving CASE Expression in Lesson 16?",
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
      id: 'q_16_5',
      question: "How does the in-browser SQLite WASM engine execute queries in Lesson 16?",
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
      id: 'q_16_6',
      question: "What happens if a query in Lesson 16 violates SQL syntax rules?",
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
      id: 'q_16_7',
      question: "In Lesson 16, how does CASE WHEN Logic interact with query filtering?",
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
      id: 'q_16_8',
      question: "Which best practice should be followed when structuring queries in Lesson 16?",
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
      id: 'q_16_9',
      question: "What is the expected result set structure from queries in Lesson 16?",
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
      id: 'q_16_10',
      question: "Why is mastering CASE WHEN Logic in Lesson 16 essential for data professionals?",
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
