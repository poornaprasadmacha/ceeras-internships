import { LessonDefinition } from '../../types/lesson';
import { storeCustomersDataset } from '../datasets/storeCustomers';

export const lesson19: LessonDefinition = {
  id: 'lesson-19-set-operations',
  slug: 'set-operations-union-intersect-except',
  number: 19,
  title: 'Set Operations (UNION, INTERSECT, EXCEPT)',
  shortDescription: 'Combine, intersect, and differentiate results across separate SELECT queries.',
  estimatedMinutes: 13,
  dataset: storeCustomersDataset,
  learningObjectives: [
    'Combine distinct results across multiple tables using UNION',
    'Retain duplicate records across query sets with UNION ALL',
    'Identify shared common records using INTERSECT and differences using EXCEPT',
  ],
  prerequisites: ['Independent SELECT statements and column alignment rules.'],
  sections: [
    {
      id: 'set-operations-overview',
      title: 'Combining Results with Set Operators',
      content: `Set operators combine the outputs of two or more independent SELECT queries into a single unified result:

• **UNION**: Combines results and **removes duplicate rows**
• **UNION ALL**: Combines results and **preserves all rows (faster)**
• **INTERSECT**: Returns only rows present in **both** queries
• **EXCEPT**: Returns rows from query 1 that are **not** in query 2

**Prerequisite Rule**: Both queries must select the **exact same number of columns** with compatible data types.`,
      codeExample: {
        sql: `SELECT name, city FROM OnlineCustomers\nUNION\nSELECT name, city FROM RetailCustomers;`,
        explanation: 'Merges online and retail customer directories into a single deduplicated roster.',
      },
    },
    {
      id: 'intersect-except-usage',
      title: 'Finding Overlaps and Gaps',
      content: `Use set theory to analyze customer engagement across channels:

• **Omnichannel Customers (INTERSECT)**: Shoppers who buy both online AND in retail stores
• **Online-Exclusive Customers (EXCEPT)**: Shoppers active online but NEVER seen in retail stores`,
      codeExample: {
        sql: `SELECT email FROM OnlineCustomers\nINTERSECT\nSELECT email FROM RetailCustomers;`,
        explanation: 'Pinpoints customers who have active profiles in both retail and online databases.',
      },
    },
  ],
  exercises: [
    {
      id: 'ex-19-1',
      lessonId: 'lesson-19-set-operations',
      order: 1,
      title: 'Task 1: Generate Master City List with UNION',
      objective: 'Write a UNION query to get a distinct list of all cities present in either OnlineCustomers or RetailCustomers.',
      initialQuery: 'SELECT city FROM OnlineCustomers\n-- Combine with RetailCustomers\n;',
      solutionQuery: 'SELECT city FROM OnlineCustomers UNION SELECT city FROM RetailCustomers;',
      hint: 'Use: SELECT city FROM OnlineCustomers UNION SELECT city FROM RetailCustomers;',
      explanation: 'UNION combines both city lists and removes duplicate entries automatically.',
      expectedColumns: ['city'],
      requiresOrder: false,
    },
    {
      id: 'ex-19-2',
      lessonId: 'lesson-19-set-operations',
      order: 2,
      title: 'Task 2: Find Customers Who Shop Both Online and Retail',
      objective: 'Use INTERSECT to find the emails of customers who exist in both OnlineCustomers and RetailCustomers.',
      initialQuery: 'SELECT email FROM OnlineCustomers\n-- Find intersection\n;',
      solutionQuery: 'SELECT email FROM OnlineCustomers INTERSECT SELECT email FROM RetailCustomers;',
      hint: 'Use: SELECT email FROM OnlineCustomers INTERSECT SELECT email FROM RetailCustomers;',
      explanation: 'INTERSECT keeps only records that appear in both query results.',
      expectedColumns: ['email'],
      requiresOrder: false,
    },
  ],
  quiz: [
    {
      id: 'q-19-1',
      question: 'What is the primary operational difference between UNION and UNION ALL?',
      explanation: 'UNION deduplicates the result set before returning, whereas UNION ALL retains all rows and is faster.',
      difficulty: 'intermediate',
      topicTag: 'set-operations',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'UNION requires numbers while UNION ALL requires text', isCorrect: false },
        { id: 'opt-b', text: 'UNION eliminates duplicates; UNION ALL preserves all rows', isCorrect: true },
        { id: 'opt-c', text: 'UNION ALL can only combine two tables maximum', isCorrect: false },
        { id: 'opt-d', text: 'UNION ALL ignores NULL values completely', isCorrect: false },
      ],
    },
    {
      id: 'q-19-2',
      question: 'What happens if Query 1 selects 3 columns and Query 2 selects 2 columns in a UNION?',
      explanation: 'Set operations strictly require both queries to project the exact same number of columns.',
      difficulty: 'intermediate',
      topicTag: 'set-operations',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'The missing column defaults to NULL', isCorrect: false },
        { id: 'opt-b', text: 'SQLite throws a query error', isCorrect: true },
        { id: 'opt-c', text: 'The third column is automatically ignored', isCorrect: false },
        { id: 'opt-d', text: 'The second query duplicates its first column', isCorrect: false },
      ],
    },
    {
      id: 'q_19_auto_3',
      question: "In SQL Lesson 19 (Set Operations (UNION, INTERSECT, EXCEPT)), what is the primary role of this syntax feature?",
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
      id: 'q_19_auto_4',
      question: "Which keyword or clause in SQL Lesson 19 directly influences which rows or columns are returned?",
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
      id: 'q_19_auto_5',
      question: "How does SQLite handle data type affinity when executing queries in Lesson 19?",
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
      id: 'q_19_auto_6',
      question: "What is the expected behavior if a query in Lesson 19 matches zero rows?",
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
      id: 'q_19_auto_7',
      question: "Which SQL best practice applies when writing queries for Lesson 19?",
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
      id: 'q_19_auto_8',
      question: "Can queries from Lesson 19 be executed offline inside an in-browser SQLite WASM engine?",
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
      id: 'q_19_auto_9',
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
      id: 'q_19_auto_10',
      question: "In relational database design, why is data normalization relevant to Lesson 19?",
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
