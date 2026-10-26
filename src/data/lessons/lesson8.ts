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
      question: "What is the primary objective taught in Lesson 8: GROUP BY Aggregations?",
      explanation: "Lesson 8 focuses specifically on mastering GROUP BY Aggregations in relational SQL.",
      difficulty: 'intermediate',
      topicTag: 'SQL',
      type: 'multiple-choice',
      options: [
        { id: 'opt_1', text: "To format CSS styles for web browsers", isCorrect: false },
        { id: 'opt_2', text: "To master GROUP BY Aggregations and apply it accurately on relational tables.", isCorrect: true },
        { id: 'opt_3', text: "To configure operating system firewalls", isCorrect: false },
        { id: 'opt_4', text: "To write low-level machine assembly", isCorrect: false },
      ],
    },
    {
      id: 'q_8_2',
      question: "Which SQL clause or construct is introduced in Lesson 8 to manage GROUP BY?",
      explanation: "This lesson explores standard SQL syntax designed specifically for GROUP BY.",
      difficulty: 'intermediate',
      topicTag: 'SQL',
      type: 'multiple-choice',
      options: [
        { id: 'opt_1', text: "The GROUP BY syntax and its associated keywords.", isCorrect: true },
        { id: 'opt_2', text: "The HTML <div> tag", isCorrect: false },
        { id: 'opt_3', text: "The Python def keyword", isCorrect: false },
        { id: 'opt_4', text: "The git commit command", isCorrect: false },
      ],
    },
    {
      id: 'q_8_3',
      question: "On which dataset table are the interactive exercises in Lesson 8 practiced?",
      explanation: "Lesson 8 exercises are executed against the ProductSales table in the local SQLite engine.",
      difficulty: 'intermediate',
      topicTag: 'SQL',
      type: 'multiple-choice',
      options: [
        { id: 'opt_1', text: "The ProductSales dataset table.", isCorrect: true },
        { id: 'opt_2', text: "A local CSV spreadsheet", isCorrect: false },
        { id: 'opt_3', text: "An external MongoDB cluster", isCorrect: false },
        { id: 'opt_4', text: "A Redis memory cache", isCorrect: false },
      ],
    },
    {
      id: 'q_8_4',
      question: "What is a key rule when writing queries involving GROUP BY in Lesson 8?",
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
      id: 'q_8_5',
      question: "How does the in-browser SQLite WASM engine execute queries in Lesson 8?",
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
      id: 'q_8_6',
      question: "What happens if a query in Lesson 8 violates SQL syntax rules?",
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
      id: 'q_8_7',
      question: "In Lesson 8, how does GROUP BY Aggregations interact with query filtering?",
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
      id: 'q_8_8',
      question: "Which best practice should be followed when structuring queries in Lesson 8?",
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
      id: 'q_8_9',
      question: "What is the expected result set structure from queries in Lesson 8?",
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
      id: 'q_8_10',
      question: "Why is mastering GROUP BY Aggregations in Lesson 8 essential for data professionals?",
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
