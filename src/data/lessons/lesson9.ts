import { LessonDefinition } from '../../types/lesson';
import { productSalesDataset } from '../datasets/productSales';

export const lesson9: LessonDefinition = {
  id: 'lesson_9',
  number: 9,
  slug: 'aggregate-functions',
  title: 'Queries with Aggregate Functions',
  shortDescription:
    'Summarize entire datasets into single scalar statistics using COUNT, SUM, AVG, MIN, and MAX.',
  estimatedMinutes: 12,
  learningObjectives: [
    'Count total rows using COUNT(*).',
    'Calculate numeric totals using SUM(column).',
    'Compute mathematical averages using AVG(column).',
    'Find minimum and maximum boundaries using MIN and MAX.',
    'Combine multiple aggregate functions in a single query.',
  ],
  prerequisites: ['Basic SELECT queries and expressions.'],
  dataset: productSalesDataset,
  sections: [
    {
      id: 'section-aggregates-intro',
      title: 'A. Summary Metrics with SQL Aggregates',
      content: `Aggregate functions collapse multiple rows into a single scalar summary value:

• **COUNT(*)**: Counts the total number of rows.
• **SUM(col)**: Sums all numerical values in the column.
• **AVG(col)**: Calculates the arithmetic mean.
• **MIN(col)**: Returns the smallest value.
• **MAX(col)**: Returns the largest value.`,
      codeExample: {
        sql: `SELECT COUNT(*) AS total_orders, AVG(unit_price) AS average_price\nFROM ProductSales;`,
        explanation: 'Calculates the overall number of orders and the average unit price across all products.',
      },
    },
  ],
  exercises: [
    {
      id: 'ex_9_1',
      lessonId: 'lesson_9',
      order: 1,
      title: 'Exercise 1: Count Total Sales Records',
      objective: 'Count the total number of sales orders in the ProductSales table and alias the result as total_orders.',
      initialQuery: 'SELECT FROM ProductSales;',
      solutionQuery: 'SELECT COUNT(*) AS total_orders FROM ProductSales;',
      hint: 'Use COUNT(*) AS total_orders.',
      explanation: 'COUNT(*) returns the exact row count of the table.',
      expectedColumns: ['total_orders'],
    },
    {
      id: 'ex_9_2',
      lessonId: 'lesson_9',
      order: 2,
      title: 'Exercise 2: Total Units Sold and Max Price',
      objective: 'Calculate the total units sold using SUM(units_sold) AS total_units, and the highest unit_price using MAX(unit_price) AS max_price.',
      initialQuery: 'SELECT FROM ProductSales;',
      solutionQuery: 'SELECT SUM(units_sold) AS total_units, MAX(unit_price) AS max_price FROM ProductSales;',
      hint: 'Use SUM(units_sold) AS total_units, MAX(unit_price) AS max_price.',
      explanation: 'Multiple aggregate functions can be queried side by side.',
      expectedColumns: ['total_units', 'max_price'],
    },
  ],
  quiz: [
        {
      id: 'q_9_1',
      question: 'What is the key difference between COUNT(*) and COUNT(column_name)?',
      explanation: 'COUNT(col) skips rows where col is NULL, while COUNT(*) counts every matching row.',
      difficulty: 'beginner',
      topicTag: 'Concept Check',
      type: 'multiple-choice',
      options: [
        { id: 'opt_1', text: 'There is no difference.', isCorrect: false },
        { id: 'opt_2', text: 'COUNT(*) counts all rows including those with NULLs, whereas COUNT(column_name) ignores NULL values.', isCorrect: true },
        { id: 'opt_3', text: 'COUNT(*) is only allowed on numbers.', isCorrect: false },
        { id: 'opt_4', text: 'COUNT(column_name) returns the sum of the column.', isCorrect: false }
      ],
    },
    {
      id: 'q_9_auto_2',
      question: "In SQL Lesson 9 (Queries with Aggregate Functions), what is the primary role of this syntax feature?",
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
      id: 'q_9_auto_3',
      question: "Which keyword or clause in SQL Lesson 9 directly influences which rows or columns are returned?",
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
      id: 'q_9_auto_4',
      question: "How does SQLite handle data type affinity when executing queries in Lesson 9?",
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
      id: 'q_9_auto_5',
      question: "What is the expected behavior if a query in Lesson 9 matches zero rows?",
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
      id: 'q_9_auto_6',
      question: "Which SQL best practice applies when writing queries for Lesson 9?",
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
      id: 'q_9_auto_7',
      question: "Can queries from Lesson 9 be executed offline inside an in-browser SQLite WASM engine?",
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
      id: 'q_9_auto_8',
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
      id: 'q_9_auto_9',
      question: "In relational database design, why is data normalization relevant to Lesson 9?",
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
      id: 'q_9_auto_10',
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
