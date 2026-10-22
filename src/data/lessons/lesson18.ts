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
      id: 'q-18-1',
      question: 'What must a subquery return when used with a comparison operator like ">" or "="?',
      explanation: 'Comparison operators like >, <, = require a scalar subquery (exactly one row and one column).',
      difficulty: 'advanced',
      topicTag: 'subqueries',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'Multiple tables', isCorrect: false },
        { id: 'opt-b', text: 'A single scalar value', isCorrect: true },
        { id: 'opt-c', text: 'At least 10 rows', isCorrect: false },
        { id: 'opt-d', text: 'A boolean TRUE string', isCorrect: false },
      ],
    },
    {
      id: 'q-18-2',
      question: 'Which syntax rule must always be followed when writing a subquery in SQL?',
      explanation: 'Every subquery must be wrapped in enclosing parentheses (...).',
      difficulty: 'advanced',
      topicTag: 'subqueries',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'It must end with a semicolon', isCorrect: false },
        { id: 'opt-b', text: 'It must be enclosed in parentheses', isCorrect: true },
        { id: 'opt-c', text: 'It cannot contain WHERE clauses', isCorrect: false },
        { id: 'opt-d', text: 'It must have an alias starting with sub_', isCorrect: false },
      ],
    },
    {
      id: 'q_18_auto_3',
      question: "In SQL Lesson 18 (Subqueries & Nested Queries), what is the primary role of this syntax feature?",
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
      id: 'q_18_auto_4',
      question: "Which keyword or clause in SQL Lesson 18 directly influences which rows or columns are returned?",
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
      id: 'q_18_auto_5',
      question: "How does SQLite handle data type affinity when executing queries in Lesson 18?",
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
      id: 'q_18_auto_6',
      question: "What is the expected behavior if a query in Lesson 18 matches zero rows?",
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
      id: 'q_18_auto_7',
      question: "Which SQL best practice applies when writing queries for Lesson 18?",
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
      id: 'q_18_auto_8',
      question: "Can queries from Lesson 18 be executed offline inside an in-browser SQLite WASM engine?",
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
      id: 'q_18_auto_9',
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
      id: 'q_18_auto_10',
      question: "In relational database design, why is data normalization relevant to Lesson 18?",
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
