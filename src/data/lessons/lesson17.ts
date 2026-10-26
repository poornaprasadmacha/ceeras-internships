import { LessonDefinition } from '../../types/lesson';
import { flightBookingsDataset } from '../datasets/flightBookings';

export const lesson17: LessonDefinition = {
  id: 'lesson-17-case-when',
  slug: 'conditional-logic-case-when',
  number: 17,
  title: 'Conditional Logic with CASE WHEN',
  shortDescription: 'Write IF-THEN-ELSE conditional logic directly inside SQL query projections.',
  estimatedMinutes: 12,
  dataset: flightBookingsDataset,
  learningObjectives: [
    'Add conditional logic to output columns using CASE WHEN expressions',
    'Assign custom categorical labels based on numeric threshold ranges',
    'Provide fallback default values using the optional ELSE clause',
  ],
  prerequisites: ['Basic SELECT queries and boolean comparison operators.'],
  sections: [
    {
      id: 'case-when-anatomy',
      title: 'The Anatomy of CASE Expressions',
      content: `SQL is declarative, but you often need conditional branching similar to IF-ELSE in programming.

The \`CASE\` expression evaluates conditions in sequence and returns the first value where the condition is true:

• **CASE**: Begins the conditional expression
• **WHEN condition THEN value**: Tests a boolean condition and supplies result
• **ELSE default_value**: Fallback when no WHEN condition matches
• **END**: Terminates the expression
• **AS alias**: Renames the resulting calculated column`,
      codeExample: {
        sql: `SELECT passenger_name, ticket_price,\n  CASE\n    WHEN ticket_price > 1000 THEN 'Premium Tier'\n    WHEN ticket_price > 500 THEN 'Mid Tier'\n    ELSE 'Standard Tier'\n  END AS fare_category\nFROM FlightBookings;`,
        explanation: 'Evaluates each ticket price and dynamically classifies passengers into fare categories.',
      },
    },
    {
      id: 'case-when-in-select',
      title: 'Using CASE to Standardize or Recode Data',
      content: `CASE expressions are essential for transforming raw codes into readable business descriptions:

• Map single-letter status codes ('C', 'P') to human words ('Confirmed', 'Pending')
• Group continuous values into discrete buckets (e.g. pricing, age groups, grades)
• Works anywhere expressions are allowed: SELECT, WHERE, and ORDER BY`,
      codeExample: {
        sql: `SELECT flight_number, passenger_name,\n  CASE status\n    WHEN 'Confirmed' THEN 'Seat Assigned'\n    WHEN 'Pending' THEN 'Awaiting Payment'\n    ELSE 'Seat Released'\n  END AS booking_status\nFROM FlightBookings;`,
        explanation: 'Standardizes technical booking statuses into user-friendly passenger notifications.',
      },
    },
  ],
  exercises: [
    {
      id: 'ex-17-1',
      lessonId: 'lesson-17-case-when',
      order: 1,
      title: 'Task 1: Categorize Ticket Fares',
      objective: 'Select passenger_name, ticket_price, and a CASE expression aliased as price_tier that outputs "High" when ticket_price >= 800, and "Regular" otherwise.',
      initialQuery: 'SELECT passenger_name, ticket_price,\n  -- Write CASE expression here\nFROM FlightBookings;',
      solutionQuery: "SELECT passenger_name, ticket_price, CASE WHEN ticket_price >= 800 THEN 'High' ELSE 'Regular' END AS price_tier FROM FlightBookings;",
      hint: 'Use: CASE WHEN ticket_price >= 800 THEN \'High\' ELSE \'Regular\' END AS price_tier',
      explanation: 'CASE WHEN evaluates the price threshold and aliases the resulting category as price_tier.',
      expectedColumns: ['passenger_name', 'ticket_price', 'price_tier'],
      requiresOrder: false,
    },
    {
      id: 'ex-17-2',
      lessonId: 'lesson-17-case-when',
      order: 2,
      title: 'Task 2: Flag Confirmed First Class Travelers',
      objective: 'Select flight_number, passenger_name, and a CASE expression aliased as vip_alert that returns "VIP Active" when seat_class = "First" AND status = "Confirmed", else "Standard".',
      initialQuery: 'SELECT flight_number, passenger_name,\n  -- Write multi-condition CASE here\nFROM FlightBookings;',
      solutionQuery: "SELECT flight_number, passenger_name, CASE WHEN seat_class = 'First' AND status = 'Confirmed' THEN 'VIP Active' ELSE 'Standard' END AS vip_alert FROM FlightBookings;",
      hint: 'Combine conditions using AND inside WHEN: WHEN seat_class = \'First\' AND status = \'Confirmed\' THEN \'VIP Active\'',
      explanation: 'Compound boolean conditions inside WHEN clauses allow multi-factor classification.',
      expectedColumns: ['flight_number', 'passenger_name', 'vip_alert'],
      requiresOrder: false,
    },
  ],
  quiz: [
    {
      id: 'q_17_1',
      question: "What is the primary objective taught in Lesson 17: String Functions (SUBSTR, UPPER)?",
      explanation: "Lesson 17 focuses specifically on mastering String Functions (SUBSTR, UPPER) in relational SQL.",
      difficulty: 'intermediate',
      topicTag: 'SQL',
      type: 'multiple-choice',
      options: [
        { id: 'opt_1', text: "To format CSS styles for web browsers", isCorrect: false },
        { id: 'opt_2', text: "To master String Functions (SUBSTR, UPPER) and apply it accurately on relational tables.", isCorrect: true },
        { id: 'opt_3', text: "To configure operating system firewalls", isCorrect: false },
        { id: 'opt_4', text: "To write low-level machine assembly", isCorrect: false },
      ],
    },
    {
      id: 'q_17_2',
      question: "Which SQL clause or construct is introduced in Lesson 17 to manage String Functions?",
      explanation: "This lesson explores standard SQL syntax designed specifically for String Functions.",
      difficulty: 'intermediate',
      topicTag: 'SQL',
      type: 'multiple-choice',
      options: [
        { id: 'opt_1', text: "The String Functions syntax and its associated keywords.", isCorrect: true },
        { id: 'opt_2', text: "The HTML <div> tag", isCorrect: false },
        { id: 'opt_3', text: "The Python def keyword", isCorrect: false },
        { id: 'opt_4', text: "The git commit command", isCorrect: false },
      ],
    },
    {
      id: 'q_17_3',
      question: "On which dataset table are the interactive exercises in Lesson 17 practiced?",
      explanation: "Lesson 17 exercises are executed against the TechSalaries table in the local SQLite engine.",
      difficulty: 'intermediate',
      topicTag: 'SQL',
      type: 'multiple-choice',
      options: [
        { id: 'opt_1', text: "The TechSalaries dataset table.", isCorrect: true },
        { id: 'opt_2', text: "A local CSV spreadsheet", isCorrect: false },
        { id: 'opt_3', text: "An external MongoDB cluster", isCorrect: false },
        { id: 'opt_4', text: "A Redis memory cache", isCorrect: false },
      ],
    },
    {
      id: 'q_17_4',
      question: "What is a key rule when writing queries involving String Functions in Lesson 17?",
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
      id: 'q_17_5',
      question: "How does the in-browser SQLite WASM engine execute queries in Lesson 17?",
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
      id: 'q_17_6',
      question: "What happens if a query in Lesson 17 violates SQL syntax rules?",
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
      id: 'q_17_7',
      question: "In Lesson 17, how does String Functions (SUBSTR, UPPER) interact with query filtering?",
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
      id: 'q_17_8',
      question: "Which best practice should be followed when structuring queries in Lesson 17?",
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
      id: 'q_17_9',
      question: "What is the expected result set structure from queries in Lesson 17?",
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
      id: 'q_17_10',
      question: "Why is mastering String Functions (SUBSTR, UPPER) in Lesson 17 essential for data professionals?",
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
