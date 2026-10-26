import { LessonDefinition } from '../../types/lesson';
import { ecommerceOrdersDataset } from '../datasets/ecommerceOrders';

export const lesson11: LessonDefinition = {
  id: 'lesson_11',
  number: 11,
  slug: 'query-order-of-execution',
  title: 'SQL Query Order of Execution',
  shortDescription:
    'Master the sequential mental model of how database engines actually execute SQL clauses under the hood.',
  estimatedMinutes: 12,
  learningObjectives: [
    'Understand the critical difference between query syntax order and execution order.',
    'Memorize the 8-step pipeline: FROM → WHERE → GROUP BY → HAVING → SELECT → DISTINCT → ORDER BY → LIMIT.',
    'Understand why column aliases created in SELECT cannot be referenced in WHERE.',
  ],
  prerequisites: ['All foundational SELECT, JOIN, WHERE, and GROUP BY clauses.'],
  dataset: ecommerceOrdersDataset,
  sections: [
    {
      id: 'section-execution-pipeline',
      title: 'A. How the Database Reads Your Query',
      content: `Even though you *write* queries starting with **SELECT**, the database engine processes clauses in an entirely different logical sequence:

1. **FROM & JOIN**: Locates the base tables and resolves joins.
2. **WHERE**: Filters individual rows before grouping.
3. **GROUP BY**: Collapses remaining rows into groups.
4. **HAVING**: Filters aggregated groups.
5. **SELECT**: Computes expressions, aliases, and selects output columns.
6. **DISTINCT**: Eliminates duplicate rows.
7. **ORDER BY**: Sorts the final output rows.
8. **LIMIT & OFFSET**: Truncates the output to the requested window.`,
      codeExample: {
        sql: `SELECT item_category, COUNT(*) AS order_count\nFROM CustomerOrders\nWHERE status = 'Delivered'\nGROUP BY item_category\nHAVING COUNT(*) >= 2\nORDER BY order_count DESC\nLIMIT 2;`,
        explanation: 'Follows the complete execution sequence from table scan to final pagination.',
      },
    },
  ],
  exercises: [
    {
      id: 'ex_11_1',
      lessonId: 'lesson_11',
      order: 1,
      title: 'Exercise 1: Full Pipeline Query',
      objective: 'Select customer_tier and SUM(gross_amount) AS total_revenue for Delivered orders only, grouped by customer_tier, ordered by total_revenue descending.',
      initialQuery: 'SELECT customer_tier, SUM(gross_amount) AS total_revenue\nFROM CustomerOrders\nWHERE status = \'Delivered\'\nGROUP BY',
      solutionQuery: "SELECT customer_tier, SUM(gross_amount) AS total_revenue FROM CustomerOrders WHERE status = 'Delivered' GROUP BY customer_tier ORDER BY total_revenue DESC;",
      hint: "Group by customer_tier and ORDER BY total_revenue DESC.",
      explanation: 'Notice how WHERE filters for Delivered first, then GROUP BY clusters tiers, and finally ORDER BY sorts.',
      expectedColumns: ['customer_tier', 'total_revenue'],
      requiresOrder: true,
    },
  ],
  quiz: [
    {
      id: 'q_11_1',
      question: "What is the primary objective taught in Lesson 11: LEFT JOIN Outer Queries?",
      explanation: "Lesson 11 focuses specifically on mastering LEFT JOIN Outer Queries in relational SQL.",
      difficulty: 'intermediate',
      topicTag: 'SQL',
      type: 'multiple-choice',
      options: [
        { id: 'opt_1', text: "To format CSS styles for web browsers", isCorrect: false },
        { id: 'opt_2', text: "To master LEFT JOIN Outer Queries and apply it accurately on relational tables.", isCorrect: true },
        { id: 'opt_3', text: "To configure operating system firewalls", isCorrect: false },
        { id: 'opt_4', text: "To write low-level machine assembly", isCorrect: false },
      ],
    },
    {
      id: 'q_11_2',
      question: "Which SQL clause or construct is introduced in Lesson 11 to manage LEFT JOIN?",
      explanation: "This lesson explores standard SQL syntax designed specifically for LEFT JOIN.",
      difficulty: 'intermediate',
      topicTag: 'SQL',
      type: 'multiple-choice',
      options: [
        { id: 'opt_1', text: "The LEFT JOIN syntax and its associated keywords.", isCorrect: true },
        { id: 'opt_2', text: "The HTML <div> tag", isCorrect: false },
        { id: 'opt_3', text: "The Python def keyword", isCorrect: false },
        { id: 'opt_4', text: "The git commit command", isCorrect: false },
      ],
    },
    {
      id: 'q_11_3',
      question: "On which dataset table are the interactive exercises in Lesson 11 practiced?",
      explanation: "Lesson 11 exercises are executed against the FitnessMembers table in the local SQLite engine.",
      difficulty: 'intermediate',
      topicTag: 'SQL',
      type: 'multiple-choice',
      options: [
        { id: 'opt_1', text: "The FitnessMembers dataset table.", isCorrect: true },
        { id: 'opt_2', text: "A local CSV spreadsheet", isCorrect: false },
        { id: 'opt_3', text: "An external MongoDB cluster", isCorrect: false },
        { id: 'opt_4', text: "A Redis memory cache", isCorrect: false },
      ],
    },
    {
      id: 'q_11_4',
      question: "What is a key rule when writing queries involving LEFT JOIN in Lesson 11?",
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
      id: 'q_11_5',
      question: "How does the in-browser SQLite WASM engine execute queries in Lesson 11?",
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
      id: 'q_11_6',
      question: "What happens if a query in Lesson 11 violates SQL syntax rules?",
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
      id: 'q_11_7',
      question: "In Lesson 11, how does LEFT JOIN Outer Queries interact with query filtering?",
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
      id: 'q_11_8',
      question: "Which best practice should be followed when structuring queries in Lesson 11?",
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
      id: 'q_11_9',
      question: "What is the expected result set structure from queries in Lesson 11?",
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
      id: 'q_11_10',
      question: "Why is mastering LEFT JOIN Outer Queries in Lesson 11 essential for data professionals?",
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
