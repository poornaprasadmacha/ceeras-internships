import { LessonDefinition } from '../../types/lesson';
import { inventoryStockDataset } from '../datasets/inventoryStock';

export const lesson13: LessonDefinition = {
  id: 'lesson_13',
  number: 13,
  slug: 'updating-rows',
  title: 'Updating Existing Rows with UPDATE',
  shortDescription:
    'Modify data inside existing database records using the UPDATE statement and protect against accidental overwrites with WHERE.',
  estimatedMinutes: 10,
  learningObjectives: [
    'Modify specific column values using UPDATE ... SET.',
    'Update multiple columns simultaneously with comma-separated assignments.',
    'Understand the critical importance of the WHERE clause to avoid mass updates.',
  ],
  prerequisites: ['Basic WHERE clause filtering and INSERT statements.'],
  dataset: inventoryStockDataset,
  sections: [
    {
      id: 'section-update-syntax',
      title: 'A. Modifying Records with UPDATE',
      content: `The **UPDATE** statement modifies values in existing rows:

\`\`\`sql
UPDATE WarehouseStock
SET price = 110.00, stock_qty = 50
WHERE item_id = 10;
\`\`\`

**CRITICAL WARNING**: If you omit the **WHERE** clause, the UPDATE statement will overwrite **EVERY SINGLE ROW** in the entire table!`,
      codeExample: {
        sql: `UPDATE WarehouseStock\nSET stock_qty = stock_qty + 10\nWHERE aisle_zone = 'Zone-A';`,
        explanation: 'Increments inventory quantities by 10 for all products stored in Zone-A.',
      },
    },
  ],
  exercises: [
    {
      id: 'ex_13_1',
      lessonId: 'lesson_13',
      order: 1,
      title: 'Exercise 1: Update a Product Price',
      objective: 'Update the price of the "Digital Shipping Scale" (item_id = 40) to 79.99.',
      initialQuery: 'UPDATE WarehouseStock SET',
      solutionQuery: 'UPDATE WarehouseStock SET price = 79.99 WHERE item_id = 40;',
      hint: 'Use SET price = 79.99 WHERE item_id = 40;',
      explanation: 'Updates the price specifically for item 40.',
      allowsMutation: true,
      verificationQuery: 'SELECT item_id, price FROM WarehouseStock WHERE item_id = 40;',
      expectedColumns: ['item_id', 'price'],
    },
    {
      id: 'ex_13_2',
      lessonId: 'lesson_13',
      order: 2,
      title: 'Exercise 2: Relocate and Restock',
      objective: 'For the "Thermal Label Printer" (item_id = 20), update aisle_zone to "Zone-C" and stock_qty to 25.',
      initialQuery: 'UPDATE WarehouseStock SET',
      solutionQuery: "UPDATE WarehouseStock SET aisle_zone = 'Zone-C', stock_qty = 25 WHERE item_id = 20;",
      hint: "Set multiple columns separated by a comma: aisle_zone = 'Zone-C', stock_qty = 25.",
      explanation: 'Updates both zone and stock quantity in one atomic operation.',
      allowsMutation: true,
      verificationQuery: 'SELECT item_id, aisle_zone, stock_qty FROM WarehouseStock WHERE item_id = 20;',
      expectedColumns: ['item_id', 'aisle_zone', 'stock_qty'],
    },
  ],
  quiz: [
        {
      id: 'q_13_1',
      question: 'What happens if you execute "UPDATE Users SET is_active = 0" without a WHERE clause?',
      explanation: 'Without a WHERE clause, UPDATE unconditionally modifies every record in the table.',
      difficulty: 'beginner',
      topicTag: 'Concept Check',
      type: 'multiple-choice',
      options: [
        { id: 'opt_1', text: 'The query fails with a missing WHERE error.', isCorrect: false },
        { id: 'opt_2', text: 'Only the first row in the table is updated.', isCorrect: false },
        { id: 'opt_3', text: 'EVERY row in the entire table has is_active set to 0.', isCorrect: true },
        { id: 'opt_4', text: 'The database creates a backup copy first.', isCorrect: false }
      ],
    },
  ],
};
