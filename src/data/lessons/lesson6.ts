import { LessonDefinition } from '../../types/lesson';
import { employeeDepartmentsDataset } from '../datasets/employeeDepartments';

export const lesson6: LessonDefinition = {
  id: 'lesson_6',
  number: 6,
  slug: 'outer-queries-left-join',
  title: 'Outer Queries with LEFT JOIN',
  shortDescription:
    'Preserve all rows from the primary table even when no corresponding record exists in the joined table using LEFT JOIN.',
  estimatedMinutes: 14,
  learningObjectives: [
    'Understand the difference between INNER JOIN and LEFT OUTER JOIN.',
    'Retain all left-table records while populating missing right-table columns with NULL.',
    'Identify records with no foreign associations using LEFT JOIN and IS NULL.',
  ],
  prerequisites: ['INNER JOIN and primary/foreign keys.'],
  dataset: employeeDepartmentsDataset,
  sections: [
    {
      id: 'section-left-join-concept',
      title: 'A. Retaining Unmatched Left Rows',
      content: `In an **INNER JOIN**, an employee without an assigned department would vanish from the result set.

A **LEFT JOIN** (or LEFT OUTER JOIN) guarantees that **every row from the left table** appears in the output. If there is no matching department, SQL fills the department columns with **NULL**.`,
      codeExample: {
        sql: `SELECT e.emp_name, e.role_title, d.dept_name\nFROM Employees e\nLEFT JOIN Departments d\n  ON e.dept_id = d.dept_id;`,
        explanation: 'Lists all employees. Employees without a department show NULL for dept_name rather than disappearing.',
      },
    },
  ],
  exercises: [
    {
      id: 'ex_6_1',
      lessonId: 'lesson_6',
      order: 1,
      title: 'Exercise 1: List All Employees and Their Departments',
      objective: 'Write a LEFT JOIN query selecting emp_name, role_title, and dept_name for all employees, ensuring unassigned employees are not lost.',
      initialQuery: 'SELECT e.emp_name, e.role_title, d.dept_name\nFROM Employees e\nLEFT JOIN Departments d\n  ON',
      solutionQuery: 'SELECT e.emp_name, e.role_title, d.dept_name FROM Employees e LEFT JOIN Departments d ON e.dept_id = d.dept_id;',
      hint: 'Join ON e.dept_id = d.dept_id.',
      explanation: 'LEFT JOIN keeps Chrisjen and Amos in the results with NULL for dept_name.',
      expectedColumns: ['emp_name', 'role_title', 'dept_name'],
    },
    {
      id: 'ex_6_2',
      lessonId: 'lesson_6',
      order: 2,
      title: 'Exercise 2: Find Employees with No Department Assigned',
      objective: 'Find all employees who have no matching department by checking where d.dept_id IS NULL.',
      initialQuery: 'SELECT e.emp_name, e.role_title\nFROM Employees e\nLEFT JOIN Departments d ON e.dept_id = d.dept_id\nWHERE',
      solutionQuery: 'SELECT e.emp_name, e.role_title FROM Employees e LEFT JOIN Departments d ON e.dept_id = d.dept_id WHERE d.dept_id IS NULL;',
      hint: 'Use WHERE d.dept_id IS NULL or WHERE e.dept_id IS NULL.',
      explanation: 'This anti-join pattern identifies orphan records lacking relationships.',
      expectedColumns: ['emp_name', 'role_title'],
    },
  ],
  quiz: [
        {
      id: 'q_6_1',
      question: 'What value appears in right-table columns when a LEFT JOIN finds no matching record?',
      explanation: 'SQL populates unmatched outer join columns with NULL to indicate the absence of data.',
      difficulty: 'beginner',
      topicTag: 'Concept Check',
      type: 'multiple-choice',
      options: [
        { id: 'opt_1', text: '0', isCorrect: false },
        { id: 'opt_2', text: 'An empty string ""', isCorrect: false },
        { id: 'opt_3', text: 'NULL', isCorrect: true },
        { id: 'opt_4', text: 'UNDEFINED', isCorrect: false }
      ],
    },
        {
      id: 'q_6_2',
      question: 'Table A has 10 rows and Table B has 5 rows. What is the minimum number of rows a LEFT JOIN (A LEFT JOIN B) can return?',
      explanation: 'A LEFT JOIN always returns at least as many rows as exist in the left table (Table A), which is 10.',
      difficulty: 'beginner',
      topicTag: 'Concept Check',
      type: 'multiple-choice',
      options: [
        { id: 'opt_1', text: '0', isCorrect: false },
        { id: 'opt_2', text: '5', isCorrect: false },
        { id: 'opt_3', text: '10', isCorrect: true },
        { id: 'opt_4', text: '15', isCorrect: false }
      ],
    },
  ],
};
