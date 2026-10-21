import { LessonDefinition } from '../../types/lesson';
import { trackAthletesDataset } from '../datasets/trackAthletes';

export const lesson21: LessonDefinition = {
  id: 'lesson-21-window-functions',
  slug: 'window-functions-ranking',
  number: 21,
  title: 'Window Functions (ROW_NUMBER & RANK)',
  shortDescription: 'Calculate rankings and row positions across partitions without collapsing query rows.',
  estimatedMinutes: 15,
  dataset: trackAthletesDataset,
  learningObjectives: [
    'Distinguish between aggregate functions (collapsing rows) and window functions (preserving rows)',
    'Generate sequential numbering using ROW_NUMBER() OVER (...)',
    'Calculate competitive rankings partitioned by category with RANK()',
  ],
  prerequisites: ['ORDER BY sorting and GROUP BY aggregation concepts.'],
  sections: [
    {
      id: 'window-function-concept',
      title: 'Aggregates vs. Window Functions',
      content: `Standard aggregate functions like \`SUM()\` or \`AVG()\` collapse multiple rows into a single summary row.

**Window functions** calculate values across a related set of rows **while keeping every individual row intact** in the output!

Key components of the \`OVER()\` clause:
• **PARTITION BY column**: Divides rows into distinct processing groups (like event categories)
• **ORDER BY column**: Sorts rows inside each partition to determine ranking sequence`,
      codeExample: {
        sql: `SELECT athlete_name, event_category, finish_time,\n  ROW_NUMBER() OVER (\n    PARTITION BY event_category\n    ORDER BY finish_time ASC\n  ) AS position\nFROM TrackAthletes;`,
        explanation: 'Assigns 1st, 2nd, 3rd, 4th positions independently within each athletic event.',
      },
    },
    {
      id: 'ranking-variants',
      title: 'ROW_NUMBER vs. RANK vs. DENSE_RANK',
      content: `SQL provides 3 standard ranking functions:

• **ROW_NUMBER()**: Always assigns strictly sequential integers (1, 2, 3, 4) with no ties
• **RANK()**: Leaves gaps when ties occur (e.g. 1, 2, 2, 4)
• **DENSE_RANK()**: Never leaves gaps after ties (e.g. 1, 2, 2, 3)`,
      codeExample: {
        sql: `SELECT athlete_name, finish_time,\n  RANK() OVER (ORDER BY finish_time ASC) AS overall_rank\nFROM TrackAthletes;`,
        explanation: 'Generates global leaderboard rankings across all events ordered by fastest completion times.',
      },
    },
  ],
  exercises: [
    {
      id: 'ex-21-1',
      lessonId: 'lesson-21-window-functions',
      order: 1,
      title: 'Task 1: Generate Sequential Row Numbers',
      objective: 'Select athlete_name, finish_time, and a ROW_NUMBER() window function ordered by finish_time ASC aliased as speed_rank.',
      initialQuery: 'SELECT athlete_name, finish_time,\n  -- Write ROW_NUMBER() OVER () clause\nFROM TrackAthletes;',
      solutionQuery: 'SELECT athlete_name, finish_time, ROW_NUMBER() OVER (ORDER BY finish_time ASC) AS speed_rank FROM TrackAthletes;',
      hint: 'Use: ROW_NUMBER() OVER (ORDER BY finish_time ASC) AS speed_rank',
      explanation: 'Assigns sequential integers from 1 upwards sorted by fastest finish time.',
      expectedColumns: ['athlete_name', 'finish_time', 'speed_rank'],
      requiresOrder: true,
    },
    {
      id: 'ex-21-2',
      lessonId: 'lesson-21-window-functions',
      order: 2,
      title: 'Task 2: Partition Rankings by Event Category',
      objective: 'Select athlete_name, event_category, finish_time, and a RANK() function partitioned by event_category and ordered by finish_time ASC aliased as event_rank.',
      initialQuery: 'SELECT athlete_name, event_category, finish_time,\n  -- Write RANK() OVER (PARTITION BY ... ORDER BY ...)\nFROM TrackAthletes;',
      solutionQuery: 'SELECT athlete_name, event_category, finish_time, RANK() OVER (PARTITION BY event_category ORDER BY finish_time ASC) AS event_rank FROM TrackAthletes;',
      hint: 'Use: RANK() OVER (PARTITION BY event_category ORDER BY finish_time ASC) AS event_rank',
      explanation: 'PARTITION BY resets the ranking counter for each athletic division.',
      expectedColumns: ['athlete_name', 'event_category', 'finish_time', 'event_rank'],
      requiresOrder: false,
    },
  ],
  quiz: [
    {
      id: 'q-21-1',
      question: 'What is the main distinction between GROUP BY and an OVER() window clause?',
      explanation: 'GROUP BY reduces rows into aggregate summaries; window functions compute across windows while keeping each individual row in the output.',
      difficulty: 'advanced',
      topicTag: 'window-functions',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'GROUP BY only works with numbers', isCorrect: false },
        { id: 'opt-b', text: 'GROUP BY collapses rows; window functions preserve individual rows', isCorrect: true },
        { id: 'opt-c', text: 'OVER() can only be used on primary keys', isCorrect: false },
        { id: 'opt-d', text: 'Window functions cannot be sorted', isCorrect: false },
      ],
    },
    {
      id: 'q-21-2',
      question: 'Which clause inside OVER() controls how rows are divided into distinct ranking subgroups?',
      explanation: 'PARTITION BY divides the dataset into logical partitions where calculations reset.',
      difficulty: 'advanced',
      topicTag: 'window-functions',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'SPLIT BY', isCorrect: false },
        { id: 'opt-b', text: 'PARTITION BY', isCorrect: true },
        { id: 'opt-c', text: 'SECTION BY', isCorrect: false },
        { id: 'opt-d', text: 'DIVIDE BY', isCorrect: false },
      ],
    },
  ],
};
