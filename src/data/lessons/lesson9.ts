import { LessonDefinition } from '../../types/lesson';
import { productSalesDataset } from '../datasets/productSales';

export const lesson9: LessonDefinition = {
  id: 'lesson_9',
  number: 9,
  slug: 'aggregate-functions',
  title: 'Queries with Aggregate Functions',
  shortDescription:
    'Summarize entire datasets into single scalar statistics using COUNT, SUM, AVG, MIN, and MAX.',
  estimatedMinutes: 12,
  learningObjectives: [
    'Count total rows using COUNT(*).',
    'Calculate numeric totals using SUM(column).',
    'Compute mathematical averages using AVG(column).',
    'Find minimum and maximum boundaries using MIN and MAX.',
    'Combine multiple aggregate functions in a single query.',
  ],
  prerequisites: ['Basic SELECT queries and expressions.'],
  dataset: productSalesDataset,
  sections: [
    {
      id: 'section-aggregates-intro',
      title: 'A. Summary Metrics with SQL Aggregates',
      content: `Aggregate functions collapse multiple rows into a single scalar summary value:

• **COUNT(*)**: Counts the total number of rows.
• **SUM(col)**: Sums all numerical values in the column.
• **AVG(col)**: Calculates the arithmetic mean.
• **MIN(col)**: Returns the smallest value.
• **MAX(col)**: Returns the largest value.`,
      codeExample: {
        sql: `SELECT COUNT(*) AS total_orders, AVG(unit_price) AS average_price\nFROM ProductSales;`,
        explanation: 'Calculates the overall number of orders and the average unit price across all products.',
      },
    },
  ],
  exercises: [
    {
      id: 'ex_9_1',
      lessonId: 'lesson_9',
      order: 1,
      title: 'Exercise 1: Count Total Sales Records',
      objective: 'Count the total number of sales orders in the ProductSales table and alias the result as total_orders.',
      initialQuery: 'SELECT FROM ProductSales;',
      solutionQuery: 'SELECT COUNT(*) AS total_orders FROM ProductSales;',
      hint: 'Use COUNT(*) AS total_orders.',
      explanation: 'COUNT(*) returns the exact row count of the table.',
      expectedColumns: ['total_orders'],
    },
    {
      id: 'ex_9_2',
      lessonId: 'lesson_9',
      order: 2,
      title: 'Exercise 2: Total Units Sold and Max Price',
      objective: 'Calculate the total units sold using SUM(units_sold) AS total_units, and the highest unit_price using MAX(unit_price) AS max_price.',
      initialQuery: 'SELECT FROM ProductSales;',
      solutionQuery: 'SELECT SUM(units_sold) AS total_units, MAX(unit_price) AS max_price FROM ProductSales;',
      hint: 'Use SUM(units_sold) AS total_units, MAX(unit_price) AS max_price.',
      explanation: 'Multiple aggregate functions can be queried side by side.',
      expectedColumns: ['total_units', 'max_price'],
    },
  ],
  quiz: [
        {
      id: 'q_9_1',
      question: 'What is the key difference between COUNT(*) and COUNT(column_name)?',
      explanation: 'COUNT(col) skips rows where col is NULL, while COUNT(*) counts every matching row.',
      difficulty: 'beginner',
      topicTag: 'Concept Check',
      type: 'multiple-choice',
      options: [
        { id: 'opt_1', text: 'There is no difference.', isCorrect: false },
        { id: 'opt_2', text: 'COUNT(*) counts all rows including those with NULLs, whereas COUNT(column_name) ignores NULL values.', isCorrect: true },
        { id: 'opt_3', text: 'COUNT(*) is only allowed on numbers.', isCorrect: false },
        { id: 'opt_4', text: 'COUNT(column_name) returns the sum of the column.', isCorrect: false }
      ],
    },
  ],
};
