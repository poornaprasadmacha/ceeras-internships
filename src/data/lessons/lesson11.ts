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
      question: 'Why can you NOT use a column alias defined in SELECT (e.g. "AS total_price") inside the WHERE clause?',
      explanation: 'WHERE runs in Step 2, while SELECT and its aliases run in Step 5. Hence, aliases are unknown to WHERE.',
      difficulty: 'beginner',
      topicTag: 'Concept Check',
      type: 'multiple-choice',
      options: [
        { id: 'opt_1', text: 'Because SQL prohibits aliases containing underscores.', isCorrect: false },
        { id: 'opt_2', text: 'Because the WHERE clause executes before the SELECT clause; the alias does not exist yet when WHERE runs.', isCorrect: true },
        { id: 'opt_3', text: 'Because WHERE only accepts table names.', isCorrect: false },
        { id: 'opt_4', text: 'Because aliases can only be used with numbers.', isCorrect: false }
      ],
    },
    {
      id: 'q_11_auto_2',
      question: "In SQL Lesson 11 (SQL Query Order of Execution), what is the primary role of this syntax feature?",
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
      id: 'q_11_auto_3',
      question: "Which keyword or clause in SQL Lesson 11 directly influences which rows or columns are returned?",
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
      id: 'q_11_auto_4',
      question: "How does SQLite handle data type affinity when executing queries in Lesson 11?",
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
      id: 'q_11_auto_5',
      question: "What is the expected behavior if a query in Lesson 11 matches zero rows?",
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
      id: 'q_11_auto_6',
      question: "Which SQL best practice applies when writing queries for Lesson 11?",
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
      id: 'q_11_auto_7',
      question: "Can queries from Lesson 11 be executed offline inside an in-browser SQLite WASM engine?",
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
      id: 'q_11_auto_8',
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
      id: 'q_11_auto_9',
      question: "In relational database design, why is data normalization relevant to Lesson 11?",
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
      id: 'q_11_auto_10',
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
