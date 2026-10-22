import { LessonDefinition } from '../../types/lesson';
import { fleetVehiclesDataset } from '../datasets/fleetVehicles';

export const lesson8: LessonDefinition = {
  id: 'lesson_8',
  number: 8,
  slug: 'expressions-and-aliases',
  title: 'Queries with Expressions and Aliases',
  shortDescription:
    'Compute new dynamic columns on the fly using mathematical arithmetic (+, -, *, /) and assign readable column names using AS.',
  estimatedMinutes: 12,
  learningObjectives: [
    'Write arithmetic expressions (+, -, *, /) directly inside the SELECT clause.',
    'Assign clear, student-friendly column aliases using the AS keyword.',
    'Combine string columns with concatenation.',
    'Filter computed expressions using WHERE.',
  ],
  prerequisites: ['Basic SELECT queries.'],
  dataset: fleetVehiclesDataset,
  sections: [
    {
      id: 'section-expressions-as',
      title: 'A. Computing Values on the Fly with AS',
      content: `SQL can perform arithmetic on numbers in every row. For example, multiplying **tank_gallons** by **miles_per_gallon** calculates the vehicle's total estimated range:

\`\`\`sql
SELECT model_name, tank_gallons * miles_per_gallon AS total_range_miles
FROM FleetVehicles;
\`\`\`

The **AS** keyword renames the resulting calculation so your query output has an intuitive header instead of a raw formula.`,
      codeExample: {
        sql: `SELECT model_name, daily_rate_dollars * 7 AS weekly_rental_cost\nFROM FleetVehicles;`,
        explanation: 'Multiplies daily rate by 7 to project the total weekly rental price.',
      },
    },
  ],
  exercises: [
    {
      id: 'ex_8_1',
      lessonId: 'lesson_8',
      order: 1,
      title: 'Exercise 1: Calculate Maximum Driving Range',
      objective: 'Select model_name and calculate the maximum range in miles by multiplying tank_gallons by miles_per_gallon. Name the calculated column total_range.',
      initialQuery: 'SELECT model_name, FROM FleetVehicles;',
      solutionQuery: 'SELECT model_name, tank_gallons * miles_per_gallon AS total_range FROM FleetVehicles;',
      hint: 'Multiply tank_gallons * miles_per_gallon AS total_range.',
      explanation: 'Expressions compute per-row values dynamically during query execution.',
      expectedColumns: ['model_name', 'total_range'],
    },
    {
      id: 'ex_8_2',
      lessonId: 'lesson_8',
      order: 2,
      title: 'Exercise 2: Calculate 3-Day Rental Total',
      objective: 'Select model_name, vehicle_type, and compute the cost for a 3-day rental (daily_rate_dollars * 3) aliased as rental_three_days.',
      initialQuery: 'SELECT model_name, vehicle_type, FROM FleetVehicles;',
      solutionQuery: 'SELECT model_name, vehicle_type, daily_rate_dollars * 3 AS rental_three_days FROM FleetVehicles;',
      hint: 'Multiply daily_rate_dollars * 3 AS rental_three_days.',
      explanation: 'Aliases rename formula outputs for clean, student-friendly display.',
      expectedColumns: ['model_name', 'vehicle_type', 'rental_three_days'],
    },
  ],
  quiz: [
        {
      id: 'q_8_1',
      question: 'What is the purpose of the AS keyword in the SELECT clause?',
      explanation: 'AS creates a temporary alias for the column in the returned result set; it does not change the disk schema.',
      difficulty: 'beginner',
      topicTag: 'Concept Check',
      type: 'multiple-choice',
      options: [
        { id: 'opt_1', text: 'To sort the output automatically.', isCorrect: false },
        { id: 'opt_2', text: 'To assign a custom, descriptive name (alias) to a column or calculated expression.', isCorrect: true },
        { id: 'opt_3', text: 'To convert a string into a number.', isCorrect: false },
        { id: 'opt_4', text: 'To permanently alter the schema of the underlying database table.', isCorrect: false }
      ],
    },
    {
      id: 'q_8_auto_2',
      question: "In SQL Lesson 8 (Queries with Expressions and Aliases), what is the primary role of this syntax feature?",
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
      id: 'q_8_auto_3',
      question: "Which keyword or clause in SQL Lesson 8 directly influences which rows or columns are returned?",
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
      id: 'q_8_auto_4',
      question: "How does SQLite handle data type affinity when executing queries in Lesson 8?",
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
      id: 'q_8_auto_5',
      question: "What is the expected behavior if a query in Lesson 8 matches zero rows?",
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
      id: 'q_8_auto_6',
      question: "Which SQL best practice applies when writing queries for Lesson 8?",
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
      id: 'q_8_auto_7',
      question: "Can queries from Lesson 8 be executed offline inside an in-browser SQLite WASM engine?",
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
      id: 'q_8_auto_8',
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
      id: 'q_8_auto_9',
      question: "In relational database design, why is data normalization relevant to Lesson 8?",
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
      id: 'q_8_auto_10',
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
