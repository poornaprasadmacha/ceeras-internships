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
  ],
};
