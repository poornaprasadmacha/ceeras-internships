import { LessonDefinition } from '../../types/lesson';
import { universityStaffDataset } from '../datasets/universityStaff';

export const lesson10: LessonDefinition = {
  id: 'lesson_10',
  number: 10,
  slug: 'grouped-aggregations',
  title: 'Grouped Aggregations with GROUP BY and HAVING',
  shortDescription:
    'Segment data into groups using GROUP BY and filter aggregated groups using the HAVING clause.',
  estimatedMinutes: 14,
  learningObjectives: [
    'Segment rows into logical groups using the GROUP BY clause.',
    'Apply aggregate functions per category (e.g., average salary per department).',
    'Understand why WHERE cannot filter aggregate outputs.',
    'Filter grouped results using the HAVING clause.',
  ],
  prerequisites: ['Aggregate functions (COUNT, SUM, AVG).'],
  dataset: universityStaffDataset,
  sections: [
    {
      id: 'section-group-by',
      title: 'A. Grouping Rows with GROUP BY',
      content: `Instead of aggregating across the entire table, **GROUP BY** clusters rows sharing identical values in specified columns, producing one summary row per group.`,
      codeExample: {
        sql: `SELECT department, COUNT(*) AS faculty_count, AVG(annual_salary) AS avg_salary\nFROM FacultyMembers\nGROUP BY department;`,
        explanation: 'Computes headcount and average salary for each distinct university department.',
      },
    },
    {
      id: 'section-having-vs-where',
      title: 'B. Filtering Groups with HAVING',
      content: `• **WHERE**: Filters individual raw rows *before* grouping occurs.
• **HAVING**: Filters aggregated groups *after* GROUP BY has calculated summaries.

\`\`\`sql
SELECT department, AVG(annual_salary) AS avg_salary
FROM FacultyMembers
GROUP BY department
HAVING AVG(annual_salary) > 95000;
\`\`\``,
      codeExample: {
        sql: `SELECT department, COUNT(*) AS member_count\nFROM FacultyMembers\nGROUP BY department\nHAVING COUNT(*) >= 3;`,
        explanation: 'Filters for departments that employ 3 or more faculty members.',
      },
    },
  ],
  exercises: [
    {
      id: 'ex_10_1',
      lessonId: 'lesson_10',
      order: 1,
      title: 'Exercise 1: Count Faculty by Department',
      objective: 'Write a query to select department and the count of faculty members in each department aliased as total_members. Group by department.',
      initialQuery: 'SELECT department, FROM FacultyMembers GROUP BY',
      solutionQuery: 'SELECT department, COUNT(*) AS total_members FROM FacultyMembers GROUP BY department;',
      hint: 'Use SELECT department, COUNT(*) AS total_members FROM FacultyMembers GROUP BY department;',
      explanation: 'GROUP BY aggregates rows on the department attribute.',
      expectedColumns: ['department', 'total_members'],
    },
    {
      id: 'ex_10_2',
      lessonId: 'lesson_10',
      order: 2,
      title: 'Exercise 2: Filter Departments with HAVING',
      objective: 'Find all departments that have 3 or more faculty members. Select department and COUNT(*) AS total_faculty, and filter using HAVING.',
      initialQuery: 'SELECT department, COUNT(*) AS total_faculty FROM FacultyMembers GROUP BY department HAVING',
      solutionQuery: 'SELECT department, COUNT(*) AS total_faculty FROM FacultyMembers GROUP BY department HAVING COUNT(*) >= 3;',
      hint: 'Use HAVING COUNT(*) >= 3.',
      explanation: 'HAVING filters aggregated grouped results, whereas WHERE filters individual rows.',
      expectedColumns: ['department', 'total_faculty'],
    },
  ],
  quiz: [
        {
      id: 'q_10_1',
      question: 'Why does "WHERE COUNT(*) > 5" trigger a syntax error in SQL?',
      explanation: 'WHERE filters individual input rows before grouping. Aggregates do not exist yet when WHERE runs, so HAVING is required.',
      difficulty: 'beginner',
      topicTag: 'Concept Check',
      type: 'multiple-choice',
      options: [
        { id: 'opt_1', text: 'Because WHERE is executed before rows are aggregated into groups; only HAVING can evaluate aggregate conditions.', isCorrect: true },
        { id: 'opt_2', text: 'Because COUNT cannot be greater than 5.', isCorrect: false },
        { id: 'opt_3', text: 'Because single quotes are required.', isCorrect: false },
        { id: 'opt_4', text: 'Because GROUP BY is only allowed with SUM.', isCorrect: false }
      ],
    },
  ],
};
