import { LessonDefinition } from '../../types/lesson';
import { inventoryStockDataset } from '../datasets/inventoryStock';

export const lesson13: LessonDefinition = {
  id: 'lesson_13',
  number: 13,
  slug: 'updating-rows',
  title: 'Updating Existing Rows with UPDATE',
  shortDescription:
    'Modify data inside existing database records using the UPDATE statement and protect against accidental overwrites with WHERE.',
  estimatedMinutes: 10,
  learningObjectives: [
    'Modify specific column values using UPDATE ... SET.',
    'Update multiple columns simultaneously with comma-separated assignments.',
    'Understand the critical importance of the WHERE clause to avoid mass updates.',
  ],
  prerequisites: ['Basic WHERE clause filtering and INSERT statements.'],
  dataset: inventoryStockDataset,
  sections: [
    {
      id: 'section-update-syntax',
      title: 'A. Modifying Records with UPDATE',
      content: `The **UPDATE** statement modifies values in existing rows:

\`\`\`sql
UPDATE WarehouseStock
SET price = 110.00, stock_qty = 50
WHERE item_id = 10;
\`\`\`

**CRITICAL WARNING**: If you omit the **WHERE** clause, the UPDATE statement will overwrite **EVERY SINGLE ROW** in the entire table!`,
      codeExample: {
        sql: `UPDATE WarehouseStock\nSET stock_qty = stock_qty + 10\nWHERE aisle_zone = 'Zone-A';`,
        explanation: 'Increments inventory quantities by 10 for all products stored in Zone-A.',
      },
    },
  ],
  exercises: [
    {
      id: 'ex_13_1',
      lessonId: 'lesson_13',
      order: 1,
      title: 'Exercise 1: Update a Product Price',
      objective: 'Update the price of the "Digital Shipping Scale" (item_id = 40) to 79.99.',
      initialQuery: 'UPDATE WarehouseStock SET',
      solutionQuery: 'UPDATE WarehouseStock SET price = 79.99 WHERE item_id = 40;',
      hint: 'Use SET price = 79.99 WHERE item_id = 40;',
      explanation: 'Updates the price specifically for item 40.',
      allowsMutation: true,
      verificationQuery: 'SELECT item_id, price FROM WarehouseStock WHERE item_id = 40;',
      expectedColumns: ['item_id', 'price'],
    },
    {
      id: 'ex_13_2',
      lessonId: 'lesson_13',
      order: 2,
      title: 'Exercise 2: Relocate and Restock',
      objective: 'For the "Thermal Label Printer" (item_id = 20), update aisle_zone to "Zone-C" and stock_qty to 25.',
      initialQuery: 'UPDATE WarehouseStock SET',
      solutionQuery: "UPDATE WarehouseStock SET aisle_zone = 'Zone-C', stock_qty = 25 WHERE item_id = 20;",
      hint: "Set multiple columns separated by a comma: aisle_zone = 'Zone-C', stock_qty = 25.",
      explanation: 'Updates both zone and stock quantity in one atomic operation.',
      allowsMutation: true,
      verificationQuery: 'SELECT item_id, aisle_zone, stock_qty FROM WarehouseStock WHERE item_id = 20;',
      expectedColumns: ['item_id', 'aisle_zone', 'stock_qty'],
    },
  ],
  quiz: [
        {
      id: 'q_13_1',
      question: 'What happens if you execute "UPDATE Users SET is_active = 0" without a WHERE clause?',
      explanation: 'Without a WHERE clause, UPDATE unconditionally modifies every record in the table.',
      difficulty: 'beginner',
      topicTag: 'Concept Check',
      type: 'multiple-choice',
      options: [
        { id: 'opt_1', text: 'The query fails with a missing WHERE error.', isCorrect: false },
        { id: 'opt_2', text: 'Only the first row in the table is updated.', isCorrect: false },
        { id: 'opt_3', text: 'EVERY row in the entire table has is_active set to 0.', isCorrect: true },
        { id: 'opt_4', text: 'The database creates a backup copy first.', isCorrect: false }
      ],
    },
    {
      id: 'q_13_auto_2',
      question: "In SQL Lesson 13 (Updating Existing Rows with UPDATE), what is the primary role of this syntax feature?",
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
      id: 'q_13_auto_3',
      question: "Which keyword or clause in SQL Lesson 13 directly influences which rows or columns are returned?",
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
      id: 'q_13_auto_4',
      question: "How does SQLite handle data type affinity when executing queries in Lesson 13?",
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
      id: 'q_13_auto_5',
      question: "What is the expected behavior if a query in Lesson 13 matches zero rows?",
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
      id: 'q_13_auto_6',
      question: "Which SQL best practice applies when writing queries for Lesson 13?",
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
      id: 'q_13_auto_7',
      question: "Can queries from Lesson 13 be executed offline inside an in-browser SQLite WASM engine?",
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
      id: 'q_13_auto_8',
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
      id: 'q_13_auto_9',
      question: "In relational database design, why is data normalization relevant to Lesson 13?",
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
      id: 'q_13_auto_10',
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
