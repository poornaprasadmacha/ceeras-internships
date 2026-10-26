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
      question: "What is the primary objective taught in Lesson 13: Subqueries in WHERE?",
      explanation: "Lesson 13 focuses specifically on mastering Subqueries in WHERE in relational SQL.",
      difficulty: 'intermediate',
      topicTag: 'SQL',
      type: 'multiple-choice',
      options: [
        { id: 'opt_1', text: "To format CSS styles for web browsers", isCorrect: false },
        { id: 'opt_2', text: "To master Subqueries in WHERE and apply it accurately on relational tables.", isCorrect: true },
        { id: 'opt_3', text: "To configure operating system firewalls", isCorrect: false },
        { id: 'opt_4', text: "To write low-level machine assembly", isCorrect: false },
      ],
    },
    {
      id: 'q_13_2',
      question: "Which SQL clause or construct is introduced in Lesson 13 to manage Subqueries?",
      explanation: "This lesson explores standard SQL syntax designed specifically for Subqueries.",
      difficulty: 'intermediate',
      topicTag: 'SQL',
      type: 'multiple-choice',
      options: [
        { id: 'opt_1', text: "The Subqueries syntax and its associated keywords.", isCorrect: true },
        { id: 'opt_2', text: "The HTML <div> tag", isCorrect: false },
        { id: 'opt_3', text: "The Python def keyword", isCorrect: false },
        { id: 'opt_4', text: "The git commit command", isCorrect: false },
      ],
    },
    {
      id: 'q_13_3',
      question: "On which dataset table are the interactive exercises in Lesson 13 practiced?",
      explanation: "Lesson 13 exercises are executed against the AuditLogs table in the local SQLite engine.",
      difficulty: 'intermediate',
      topicTag: 'SQL',
      type: 'multiple-choice',
      options: [
        { id: 'opt_1', text: "The AuditLogs dataset table.", isCorrect: true },
        { id: 'opt_2', text: "A local CSV spreadsheet", isCorrect: false },
        { id: 'opt_3', text: "An external MongoDB cluster", isCorrect: false },
        { id: 'opt_4', text: "A Redis memory cache", isCorrect: false },
      ],
    },
    {
      id: 'q_13_4',
      question: "What is a key rule when writing queries involving Subqueries in Lesson 13?",
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
      id: 'q_13_5',
      question: "How does the in-browser SQLite WASM engine execute queries in Lesson 13?",
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
      id: 'q_13_6',
      question: "What happens if a query in Lesson 13 violates SQL syntax rules?",
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
      id: 'q_13_7',
      question: "In Lesson 13, how does Subqueries in WHERE interact with query filtering?",
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
      id: 'q_13_8',
      question: "Which best practice should be followed when structuring queries in Lesson 13?",
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
      id: 'q_13_9',
      question: "What is the expected result set structure from queries in Lesson 13?",
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
      id: 'q_13_10',
      question: "Why is mastering Subqueries in WHERE in Lesson 13 essential for data professionals?",
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
