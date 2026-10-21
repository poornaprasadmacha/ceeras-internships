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
  ],
};
