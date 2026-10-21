import { LessonDefinition } from '../../types/lesson';
import { softwareProjectsDataset } from '../datasets/softwareProjects';

export const lesson20: LessonDefinition = {
  id: 'lesson-20-ctes',
  slug: 'common-table-expressions-ctes',
  number: 20,
  title: 'Common Table Expressions (WITH Clauses)',
  shortDescription: 'Write clean, maintainable modular queries using temporary named result sets.',
  estimatedMinutes: 14,
  dataset: softwareProjectsDataset,
  learningObjectives: [
    'Define temporary named query blocks using WITH ... AS syntax',
    'Break complex nested subqueries into readable linear steps',
    'Join and aggregate CTE outputs just like physical database tables',
  ],
  prerequisites: ['Multi-table JOIN operations and subquery fundamentals.'],
  sections: [
    {
      id: 'cte-fundamentals',
      title: 'What is a Common Table Expression?',
      content: `A **Common Table Expression (CTE)** defines a temporary named result set that exists only during the execution of a single query.

Instead of messy deeply nested subqueries, CTEs let you organize queries sequentially:

\`\`\`sql
WITH TemporaryName AS (
  SELECT ...
)
SELECT * FROM TemporaryName;
\`\`\`

• Begins with the \`WITH\` keyword
• Provides clean names for intermediate calculations
• Can be referenced multiple times within the main statement`,
      codeExample: {
        sql: `WITH TotalHours AS (\n  SELECT project_id, SUM(hours_spent) AS total_hours\n  FROM ProjectHours\n  GROUP BY project_id\n)\nSELECT p.project_name, p.budget, t.total_hours\nFROM SoftwareProjects p\nJOIN TotalHours t ON p.project_id = t.project_id;`,
        explanation: 'The CTE aggregates hours spent by project, which the outer query seamlessly joins to project budgets.',
      },
    },
    {
      id: 'cte-advantages',
      title: 'Why Top Database Engineers Prefer CTEs',
      content: `• **Readability**: Code reads top-to-bottom rather than inside-out
• **Maintenance**: Modify business logic in one place without touching outer joins
• **Debugging**: Test intermediate CTEs independently before assembling the full pipeline`,
      codeExample: {
        sql: `WITH HighBudgetProjects AS (\n  SELECT * FROM SoftwareProjects WHERE budget >= 40000\n)\nSELECT project_name, hourly_rate FROM HighBudgetProjects;`,
        explanation: 'Isolates high-tier projects in a clean temporary scope for immediate downstream querying.',
      },
    },
  ],
  exercises: [
    {
      id: 'ex-20-1',
      lessonId: 'lesson-20-ctes',
      order: 1,
      title: 'Task 1: Build a Project Spending CTE',
      objective: 'Write a CTE named AggregatedHours that sums hours_spent grouped by project_id as total_hours. In the main query, select project_id and total_hours from AggregatedHours.',
      initialQuery: '-- Define CTE named AggregatedHours\n-- SELECT project_id, total_hours FROM AggregatedHours;',
      solutionQuery: 'WITH AggregatedHours AS (SELECT project_id, SUM(hours_spent) AS total_hours FROM ProjectHours GROUP BY project_id) SELECT project_id, total_hours FROM AggregatedHours;',
      hint: 'Structure: WITH AggregatedHours AS (SELECT project_id, SUM(hours_spent) AS total_hours FROM ProjectHours GROUP BY project_id) SELECT project_id, total_hours FROM AggregatedHours;',
      explanation: 'Defines the temporary CTE and queries its calculated sums directly.',
      expectedColumns: ['project_id', 'total_hours'],
      requiresOrder: false,
    },
    {
      id: 'ex-20-2',
      lessonId: 'lesson-20-ctes',
      order: 2,
      title: 'Task 2: Join CTE with Main Table',
      objective: 'Using a CTE named DevHours (selecting project_id, SUM(hours_spent) AS total_hours FROM ProjectHours GROUP BY project_id), select SoftwareProjects.project_name and DevHours.total_hours by joining on project_id.',
      initialQuery: 'WITH DevHours AS (\n  SELECT project_id, SUM(hours_spent) AS total_hours\n  FROM ProjectHours\n  GROUP BY project_id\n)\n-- Join SoftwareProjects with DevHours on project_id',
      solutionQuery: 'WITH DevHours AS (SELECT project_id, SUM(hours_spent) AS total_hours FROM ProjectHours GROUP BY project_id) SELECT SoftwareProjects.project_name, DevHours.total_hours FROM SoftwareProjects JOIN DevHours ON SoftwareProjects.project_id = DevHours.project_id;',
      hint: 'Complete the main SELECT: SELECT SoftwareProjects.project_name, DevHours.total_hours FROM SoftwareProjects JOIN DevHours ON SoftwareProjects.project_id = DevHours.project_id;',
      explanation: 'Seamlessly joins the temporary named result set with physical table data.',
      expectedColumns: ['project_name', 'total_hours'],
      requiresOrder: false,
    },
  ],
  quiz: [
    {
      id: 'q-20-1',
      question: 'Which clause begins the definition of a Common Table Expression?',
      explanation: 'Every Common Table Expression begins with the WITH keyword.',
      difficulty: 'advanced',
      topicTag: 'ctes',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'CREATE TEMPORARY', isCorrect: false },
        { id: 'opt-b', text: 'WITH', isCorrect: true },
        { id: 'opt-c', text: 'DECLARE TABLE', isCorrect: false },
        { id: 'opt-d', text: 'SET CTE', isCorrect: false },
      ],
    },
    {
      id: 'q-20-2',
      question: 'How long does a Common Table Expression persist in the database?',
      explanation: 'A CTE exists solely for the duration of the query in which it is declared.',
      difficulty: 'advanced',
      topicTag: 'ctes',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'Until the database server restarts', isCorrect: false },
        { id: 'opt-b', text: 'Permanently as a disk table', isCorrect: false },
        { id: 'opt-c', text: 'Only during the execution of that single query statement', isCorrect: true },
        { id: 'opt-d', text: '24 hours in local cache', isCorrect: false },
      ],
    },
  ],
};
