import { LessonDefinition } from '../../types/lesson';
import { dailyRevenueDataset } from '../datasets/dailyRevenue';

export const lesson22: LessonDefinition = {
  id: 'lesson-22-window-aggregates',
  slug: 'window-aggregates-running-totals',
  number: 22,
  title: 'Window Aggregates & Running Totals',
  shortDescription: 'Compute cumulative running totals and moving metrics across time intervals.',
  estimatedMinutes: 14,
  dataset: dailyRevenueDataset,
  learningObjectives: [
    'Calculate cumulative running totals using SUM(...) OVER (ORDER BY ...)',
    'Compute running totals reset by branch using PARTITION BY',
    'Calculate overall department totals alongside individual daily sales',
  ],
  prerequisites: ['Window functions and cumulative aggregate foundations.'],
  sections: [
    {
      id: 'running-totals-concept',
      title: 'How Running Totals Work in SQL',
      content: `A **running total** (or cumulative sum) calculates the accumulated sum of values from the start of a period up to the current row.

In modern SQL, standard aggregates become window aggregates simply by adding an \`OVER()\` clause:

• \`SUM(revenue) OVER (ORDER BY sale_date)\`:
  Sums revenue chronologically from row 1 to current row!
• No temporary variables, self-joins, or subqueries needed.`,
      codeExample: {
        sql: `SELECT branch, sale_date, revenue,\n  SUM(revenue) OVER (\n    ORDER BY sale_date\n  ) AS running_total\nFROM DailyRevenue;`,
        explanation: 'Each row displays that day revenue alongside the accumulated company revenue to date.',
      },
    },
    {
      id: 'partitioned-running-totals',
      title: 'Resetting Totals by Branch or Category',
      content: `Combine \`PARTITION BY\` with an ordered aggregate to track cumulative growth per department or branch independently:

• For each branch, the cumulative sum starts at 0
• Accumulates daily earnings chronologically
• Automatically resets when encountering a new branch!`,
      codeExample: {
        sql: `SELECT branch, sale_date, revenue,\n  SUM(revenue) OVER (\n    PARTITION BY branch\n    ORDER BY sale_date\n  ) AS branch_running_revenue\nFROM DailyRevenue;`,
        explanation: 'Maintains independent cumulative balance ledgers for each individual store branch.',
      },
    },
  ],
  exercises: [
    {
      id: 'ex-22-1',
      lessonId: 'lesson-22-window-aggregates',
      order: 1,
      title: 'Task 1: Calculate Overall Cumulative Revenue',
      objective: 'Select id, sale_date, revenue, and a running total of revenue ordered by id ASC aliased as cumulative_revenue.',
      initialQuery: 'SELECT id, sale_date, revenue,\n  -- Write SUM(revenue) OVER (ORDER BY id ASC)\nFROM DailyRevenue;',
      solutionQuery: 'SELECT id, sale_date, revenue, SUM(revenue) OVER (ORDER BY id ASC) AS cumulative_revenue FROM DailyRevenue;',
      hint: 'Use: SUM(revenue) OVER (ORDER BY id ASC) AS cumulative_revenue',
      explanation: 'Calculates the cumulative sum of revenue row by row ordered by id.',
      expectedColumns: ['id', 'sale_date', 'revenue', 'cumulative_revenue'],
      requiresOrder: true,
    },
    {
      id: 'ex-22-2',
      lessonId: 'lesson-22-window-aggregates',
      order: 2,
      title: 'Task 2: Partitioned Cumulative Sum per Branch',
      objective: 'Select branch, sale_date, revenue, and a running total of revenue partitioned by branch and ordered by sale_date ASC aliased as branch_total.',
      initialQuery: 'SELECT branch, sale_date, revenue,\n  -- Write SUM() OVER (PARTITION BY branch ORDER BY sale_date ASC)\nFROM DailyRevenue;',
      solutionQuery: 'SELECT branch, sale_date, revenue, SUM(revenue) OVER (PARTITION BY branch ORDER BY sale_date ASC) AS branch_total FROM DailyRevenue;',
      hint: 'Use: SUM(revenue) OVER (PARTITION BY branch ORDER BY sale_date ASC) AS branch_total',
      explanation: 'PARTITION BY resets the cumulative revenue calculation for each store location.',
      expectedColumns: ['branch', 'sale_date', 'revenue', 'branch_total'],
      requiresOrder: false,
    },
  ],
  quiz: [
    {
      id: 'q-22-1',
      question: 'What happens to SUM(revenue) when you include ORDER BY inside the OVER() clause?',
      explanation: 'When ORDER BY is present in OVER(), SQL treats it as a running cumulative window from the first row to the current row.',
      difficulty: 'advanced',
      topicTag: 'window-aggregates',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'It sorts the final query without computing sums', isCorrect: false },
        { id: 'opt-b', text: 'It calculates a cumulative running total up to the current row', isCorrect: true },
        { id: 'opt-c', text: 'It throws an error because aggregates cannot be sorted', isCorrect: false },
        { id: 'opt-d', text: 'It calculates the average instead of the sum', isCorrect: false },
      ],
    },
    {
      id: 'q-22-2',
      question: 'Which window aggregate would you use to compute a running count of transactions?',
      explanation: 'COUNT(*) OVER (ORDER BY date) provides an incremental counter row by row.',
      difficulty: 'advanced',
      topicTag: 'window-aggregates',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'COUNT(*) OVER (ORDER BY ...)', isCorrect: true },
        { id: 'opt-b', text: 'INCREMENT(*) FROM ...', isCorrect: false },
        { id: 'opt-c', text: 'RUNNING_COUNT(...)', isCorrect: false },
        { id: 'opt-d', text: 'SUM(COUNT) OVER (...)', isCorrect: false },
      ],
    },
  ],
};
