import { LessonDefinition } from '../../types/lesson';
import { ecommerceOrdersDataset } from '../datasets/ecommerceOrders';

export const lesson11: LessonDefinition = {
  id: 'lesson_11',
  number: 11,
  slug: 'query-order-of-execution',
  title: 'SQL Query Order of Execution',
  shortDescription:
    'Master the sequential mental model of how database engines actually execute SQL clauses under the hood.',
  estimatedMinutes: 12,
  learningObjectives: [
    'Understand the critical difference between query syntax order and execution order.',
    'Memorize the 8-step pipeline: FROM → WHERE → GROUP BY → HAVING → SELECT → DISTINCT → ORDER BY → LIMIT.',
    'Understand why column aliases created in SELECT cannot be referenced in WHERE.',
  ],
  prerequisites: ['All foundational SELECT, JOIN, WHERE, and GROUP BY clauses.'],
  dataset: ecommerceOrdersDataset,
  sections: [
    {
      id: 'section-execution-pipeline',
      title: 'A. How the Database Reads Your Query',
      content: `Even though you *write* queries starting with **SELECT**, the database engine processes clauses in an entirely different logical sequence:

1. **FROM & JOIN**: Locates the base tables and resolves joins.
2. **WHERE**: Filters individual rows before grouping.
3. **GROUP BY**: Collapses remaining rows into groups.
4. **HAVING**: Filters aggregated groups.
5. **SELECT**: Computes expressions, aliases, and selects output columns.
6. **DISTINCT**: Eliminates duplicate rows.
7. **ORDER BY**: Sorts the final output rows.
8. **LIMIT & OFFSET**: Truncates the output to the requested window.`,
      codeExample: {
        sql: `SELECT item_category, COUNT(*) AS order_count\nFROM CustomerOrders\nWHERE status = 'Delivered'\nGROUP BY item_category\nHAVING COUNT(*) >= 2\nORDER BY order_count DESC\nLIMIT 2;`,
        explanation: 'Follows the complete execution sequence from table scan to final pagination.',
      },
    },
  ],
  exercises: [
    {
      id: 'ex_11_1',
      lessonId: 'lesson_11',
      order: 1,
      title: 'Exercise 1: Full Pipeline Query',
      objective: 'Select customer_tier and SUM(gross_amount) AS total_revenue for Delivered orders only, grouped by customer_tier, ordered by total_revenue descending.',
      initialQuery: 'SELECT customer_tier, SUM(gross_amount) AS total_revenue\nFROM CustomerOrders\nWHERE status = \'Delivered\'\nGROUP BY',
      solutionQuery: "SELECT customer_tier, SUM(gross_amount) AS total_revenue FROM CustomerOrders WHERE status = 'Delivered' GROUP BY customer_tier ORDER BY total_revenue DESC;",
      hint: "Group by customer_tier and ORDER BY total_revenue DESC.",
      explanation: 'Notice how WHERE filters for Delivered first, then GROUP BY clusters tiers, and finally ORDER BY sorts.',
      expectedColumns: ['customer_tier', 'total_revenue'],
      requiresOrder: true,
    },
  ],
  quiz: [
        {
      id: 'q_11_1',
      question: 'Why can you NOT use a column alias defined in SELECT (e.g. "AS total_price") inside the WHERE clause?',
      explanation: 'WHERE runs in Step 2, while SELECT and its aliases run in Step 5. Hence, aliases are unknown to WHERE.',
      difficulty: 'beginner',
      topicTag: 'Concept Check',
      type: 'multiple-choice',
      options: [
        { id: 'opt_1', text: 'Because SQL prohibits aliases containing underscores.', isCorrect: false },
        { id: 'opt_2', text: 'Because the WHERE clause executes before the SELECT clause; the alias does not exist yet when WHERE runs.', isCorrect: true },
        { id: 'opt_3', text: 'Because WHERE only accepts table names.', isCorrect: false },
        { id: 'opt_4', text: 'Because aliases can only be used with numbers.', isCorrect: false }
      ],
    },
  ],
};
