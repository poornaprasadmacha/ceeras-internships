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
      id: 'q-17-1',
      question: 'What happens if no WHEN condition matches and there is no ELSE clause in a CASE expression?',
      explanation: 'If no condition matches and no ELSE clause is provided, SQL returns NULL as the default fallback.',
      difficulty: 'intermediate',
      topicTag: 'case-when',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'SQLite throws a syntax error', isCorrect: false },
        { id: 'opt-b', text: 'The expression returns NULL', isCorrect: true },
        { id: 'opt-c', text: 'The query returns empty string', isCorrect: false },
        { id: 'opt-d', text: 'The row is omitted from results', isCorrect: false },
      ],
    },
    {
      id: 'q-17-2',
      question: 'Which keyword is strictly required to close a CASE expression?',
      explanation: 'Every CASE expression must be explicitly concluded with the END keyword.',
      difficulty: 'intermediate',
      topicTag: 'case-when',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'STOP', isCorrect: false },
        { id: 'opt-b', text: 'CLOSE', isCorrect: false },
        { id: 'opt-c', text: 'FINISH', isCorrect: false },
        { id: 'opt-d', text: 'END', isCorrect: true },
      ],
    },
    {
      id: 'q_17_auto_3',
      question: "In SQL Lesson 17 (Conditional Logic with CASE WHEN), what is the primary role of this syntax feature?",
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
      id: 'q_17_auto_4',
      question: "Which keyword or clause in SQL Lesson 17 directly influences which rows or columns are returned?",
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
      id: 'q_17_auto_5',
      question: "How does SQLite handle data type affinity when executing queries in Lesson 17?",
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
      id: 'q_17_auto_6',
      question: "What is the expected behavior if a query in Lesson 17 matches zero rows?",
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
      id: 'q_17_auto_7',
      question: "Which SQL best practice applies when writing queries for Lesson 17?",
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
      id: 'q_17_auto_8',
      question: "Can queries from Lesson 17 be executed offline inside an in-browser SQLite WASM engine?",
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
      id: 'q_17_auto_9',
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
      id: 'q_17_auto_10',
      question: "In relational database design, why is data normalization relevant to Lesson 17?",
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
