import { LessonDefinition } from '../../types/lesson';
import { techSalariesDataset } from '../datasets/techSalaries';

export const lesson18: LessonDefinition = {
  id: 'lesson-18-subqueries',
  slug: 'subqueries-and-nested-queries',
  number: 18,
  title: 'Subqueries & Nested Queries',
  shortDescription: 'Nest queries inside other queries to filter against dynamic computed values.',
  estimatedMinutes: 14,
  dataset: techSalariesDataset,
  learningObjectives: [
    'Understand scalar subqueries that return a single calculated value',
    'Filter rows with WHERE column IN (SELECT ...) subqueries',
    'Compare column values against dynamic aggregate benchmarks like AVG()',
  ],
  prerequisites: ['SELECT projection, WHERE filters, and basic aggregate functions.'],
  sections: [
    {
      id: 'subquery-concept',
      title: 'What is a Subquery?',
      content: `A **subquery** is a SQL query nested inside an outer query.

Subqueries are enclosed in parentheses \`(...)\` and execute first to supply data to the outer statement:

• **Scalar Subquery**: Returns exactly one row and one column (a single value)
• **Column Subquery**: Returns a single column with multiple rows (usable with \`IN\`)
• **Derived Table**: Returns rows and columns inside a \`FROM\` clause`,
      codeExample: {
        sql: `SELECT name, salary\nFROM TechEmployees\nWHERE salary > (\n  SELECT AVG(salary) FROM TechEmployees\n);`,
        explanation: 'The inner query computes company-wide average salary. The outer query retrieves employees earning above that benchmark.',
      },
    },
    {
      id: 'subquery-in-clause',
      title: 'Using Subqueries with IN and NOT IN',
      content: `Subqueries let you filter rows against dynamically generated lists instead of hardcoded constants:

• \`WHERE column IN (SELECT ...)\`: Matches any value in the inner result set
• Dynamic updates: If the underlying table changes, the filter updates automatically
• Always test the inner query independently to confirm expected output`,
      codeExample: {
        sql: `SELECT name, department\nFROM TechEmployees\nWHERE department IN (\n  SELECT department FROM TechEmployees GROUP BY department HAVING COUNT(*) >= 2\n);`,
        explanation: 'Filters employees belonging only to departments with 2 or more staff members.',
      },
    },
  ],
  exercises: [
    {
      id: 'ex-18-1',
      lessonId: 'lesson-18-subqueries',
      order: 1,
      title: 'Task 1: Find Employees Earning Above Average',
      objective: 'Select name, department, and salary for employees whose salary is greater than the overall average salary across all employees.',
      initialQuery: 'SELECT name, department, salary\nFROM TechEmployees\nWHERE salary > (\n  -- Write scalar subquery for average salary\n);',
      solutionQuery: 'SELECT name, department, salary FROM TechEmployees WHERE salary > (SELECT AVG(salary) FROM TechEmployees);',
      hint: 'The inner query should be: SELECT AVG(salary) FROM TechEmployees',
      explanation: 'The nested subquery calculates the dynamic average salary against which each employee salary is evaluated.',
      expectedColumns: ['name', 'department', 'salary'],
      requiresOrder: false,
    },
    {
      id: 'ex-18-2',
      lessonId: 'lesson-18-subqueries',
      order: 2,
      title: 'Task 2: Filter by Maximum Hire Year',
      objective: 'Select name, hire_year, and salary for the most recently hired employees (where hire_year equals the maximum hire_year in the table).',
      initialQuery: 'SELECT name, hire_year, salary\nFROM TechEmployees\nWHERE hire_year = (\n  -- Write subquery for MAX hire_year\n);',
      solutionQuery: 'SELECT name, hire_year, salary FROM TechEmployees WHERE hire_year = (SELECT MAX(hire_year) FROM TechEmployees);',
      hint: 'Use (SELECT MAX(hire_year) FROM TechEmployees) inside the WHERE clause.',
      explanation: 'MAX(hire_year) finds the latest year, filtering only newly onboarded teammates.',
      expectedColumns: ['name', 'hire_year', 'salary'],
      requiresOrder: false,
    },
  ],
  quiz: [
    {
      id: 'q_18_1',
      question: "What is the primary objective taught in Lesson 18: Numeric & Math Functions?",
      explanation: "Lesson 18 focuses specifically on mastering Numeric & Math Functions in relational SQL.",
      difficulty: 'intermediate',
      topicTag: 'SQL',
      type: 'multiple-choice',
      options: [
        { id: 'opt_1', text: "To format CSS styles for web browsers", isCorrect: false },
        { id: 'opt_2', text: "To master Numeric & Math Functions and apply it accurately on relational tables.", isCorrect: true },
        { id: 'opt_3', text: "To configure operating system firewalls", isCorrect: false },
        { id: 'opt_4', text: "To write low-level machine assembly", isCorrect: false },
      ],
    },
    {
      id: 'q_18_2',
      question: "Which SQL clause or construct is introduced in Lesson 18 to manage Math Functions?",
      explanation: "This lesson explores standard SQL syntax designed specifically for Math Functions.",
      difficulty: 'intermediate',
      topicTag: 'SQL',
      type: 'multiple-choice',
      options: [
        { id: 'opt_1', text: "The Math Functions syntax and its associated keywords.", isCorrect: true },
        { id: 'opt_2', text: "The HTML <div> tag", isCorrect: false },
        { id: 'opt_3', text: "The Python def keyword", isCorrect: false },
        { id: 'opt_4', text: "The git commit command", isCorrect: false },
      ],
    },
    {
      id: 'q_18_3',
      question: "On which dataset table are the interactive exercises in Lesson 18 practiced?",
      explanation: "Lesson 18 exercises are executed against the StoreCustomers table in the local SQLite engine.",
      difficulty: 'intermediate',
      topicTag: 'SQL',
      type: 'multiple-choice',
      options: [
        { id: 'opt_1', text: "The StoreCustomers dataset table.", isCorrect: true },
        { id: 'opt_2', text: "A local CSV spreadsheet", isCorrect: false },
        { id: 'opt_3', text: "An external MongoDB cluster", isCorrect: false },
        { id: 'opt_4', text: "A Redis memory cache", isCorrect: false },
      ],
    },
    {
      id: 'q_18_4',
      question: "What is a key rule when writing queries involving Math Functions in Lesson 18?",
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
      id: 'q_18_5',
      question: "How does the in-browser SQLite WASM engine execute queries in Lesson 18?",
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
      id: 'q_18_6',
      question: "What happens if a query in Lesson 18 violates SQL syntax rules?",
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
      id: 'q_18_7',
      question: "In Lesson 18, how does Numeric & Math Functions interact with query filtering?",
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
      id: 'q_18_8',
      question: "Which best practice should be followed when structuring queries in Lesson 18?",
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
      id: 'q_18_9',
      question: "What is the expected result set structure from queries in Lesson 18?",
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
      id: 'q_18_10',
      question: "Why is mastering Numeric & Math Functions in Lesson 18 essential for data professionals?",
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
