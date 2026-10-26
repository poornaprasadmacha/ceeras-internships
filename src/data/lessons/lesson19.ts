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
      id: 'q_19_1',
      question: "What is the primary objective taught in Lesson 19: Date & Time Functions?",
      explanation: "Lesson 19 focuses specifically on mastering Date & Time Functions in relational SQL.",
      difficulty: 'intermediate',
      topicTag: 'SQL',
      type: 'multiple-choice',
      options: [
        { id: 'opt_1', text: "To format CSS styles for web browsers", isCorrect: false },
        { id: 'opt_2', text: "To master Date & Time Functions and apply it accurately on relational tables.", isCorrect: true },
        { id: 'opt_3', text: "To configure operating system firewalls", isCorrect: false },
        { id: 'opt_4', text: "To write low-level machine assembly", isCorrect: false },
      ],
    },
    {
      id: 'q_19_2',
      question: "Which SQL clause or construct is introduced in Lesson 19 to manage Date Functions?",
      explanation: "This lesson explores standard SQL syntax designed specifically for Date Functions.",
      difficulty: 'intermediate',
      topicTag: 'SQL',
      type: 'multiple-choice',
      options: [
        { id: 'opt_1', text: "The Date Functions syntax and its associated keywords.", isCorrect: true },
        { id: 'opt_2', text: "The HTML <div> tag", isCorrect: false },
        { id: 'opt_3', text: "The Python def keyword", isCorrect: false },
        { id: 'opt_4', text: "The git commit command", isCorrect: false },
      ],
    },
    {
      id: 'q_19_3',
      question: "On which dataset table are the interactive exercises in Lesson 19 practiced?",
      explanation: "Lesson 19 exercises are executed against the SoftwareProjects table in the local SQLite engine.",
      difficulty: 'intermediate',
      topicTag: 'SQL',
      type: 'multiple-choice',
      options: [
        { id: 'opt_1', text: "The SoftwareProjects dataset table.", isCorrect: true },
        { id: 'opt_2', text: "A local CSV spreadsheet", isCorrect: false },
        { id: 'opt_3', text: "An external MongoDB cluster", isCorrect: false },
        { id: 'opt_4', text: "A Redis memory cache", isCorrect: false },
      ],
    },
    {
      id: 'q_19_4',
      question: "What is a key rule when writing queries involving Date Functions in Lesson 19?",
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
      id: 'q_19_5',
      question: "How does the in-browser SQLite WASM engine execute queries in Lesson 19?",
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
      id: 'q_19_6',
      question: "What happens if a query in Lesson 19 violates SQL syntax rules?",
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
      id: 'q_19_7',
      question: "In Lesson 19, how does Date & Time Functions interact with query filtering?",
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
      id: 'q_19_8',
      question: "Which best practice should be followed when structuring queries in Lesson 19?",
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
      id: 'q_19_9',
      question: "What is the expected result set structure from queries in Lesson 19?",
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
      id: 'q_19_10',
      question: "Why is mastering Date & Time Functions in Lesson 19 essential for data professionals?",
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
