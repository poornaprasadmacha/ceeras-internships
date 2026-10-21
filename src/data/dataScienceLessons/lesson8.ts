import { DataScienceLessonDefinition } from '../../types/dataScienceLesson';

export const dsLesson8: DataScienceLessonDefinition = {
  id: 'ds-lesson-8',
  number: 8,
  slug: 'merging-and-joining-datasets',
  title: 'Merging & Joining Relational Datasets',
  shortDescription: 'Combine disparate tabular datasets using Primary/Foreign keys, Inner Joins, and Left Joins to enrich analytical features.',
  estimatedMinutes: 10,
  learningObjectives: [
    'Understand Primary Keys and Foreign Keys in relational and tabular data architectures',
    'Differentiate between Inner Join, Left Join, Right Join, and Full Outer Join',
    'Merge transactional logs with customer demographic dimensions to enrich feature spaces',
  ],
  prerequisites: ['Grouping & Aggregations (Split-Apply-Combine)'],
  sections: [
    {
      id: 'sec-8-1',
      title: 'Relational Tabular Structures',
      content: `In production systems, data is normalized across multiple tables to avoid redundancy:
• **Fact / Transaction Table**: High-volume events (e.g. \`orders\`, \`clicks\`, \`sensor_readings\`).
• **Dimension Table**: Descriptive metadata (e.g. \`users\`, \`products\`, \`stores\`).

To build predictive features or compute user-level metrics, data scientists **merge (join)** these tables using a shared identifier known as a **join key** (Primary Key / Foreign Key).`,
    },
    {
      id: 'sec-8-2',
      title: 'Join Types Demystified',
      content: `• **Inner Join**: Keeps only rows that have matching keys in *both* tables.
• **Left Join**: Keeps all rows from the primary (left) table and attaches matching records from the secondary (right) table; fills with null if no match exists.
• **Right Join**: Keeps all rows from the right table and matching from left.
• **Full Outer Join**: Keeps all rows from both tables, populating nulls wherever keys do not align.

In 90% of data science pipelines, **Left Joins** are used to augment a base cohort without dropping cohort members who lack secondary features.`,
    },
  ],
  exercises: [
    {
      id: 'ds-ex-8-1',
      lessonId: 'ds-lesson-8',
      order: 1,
      title: 'Enrich Orders with Customer Names (Left Join)',
      objective: 'Look up the customer name for each order using the customer_id key and print the total order amount associated with customer "Alice".',
      dataset: {
        name: 'orders_and_customers.csv',
        columns: ['order_id', 'cust_id', 'customer_name', 'amount'],
        rows: [
          [501, 1, 'Alice', 120],
          [502, 2, 'Bob', 250],
          [503, 1, 'Alice', 180],
          [504, 3, 'Charlie', 90],
          [505, 2, 'Bob', 110],
        ],
        description: 'Joined orders with corresponding customer profile dimensions',
      },
      initialCode: `// 1. Filter rows where customer_name === 'Alice'
// 2. Sum the amounts for Alice: reduce or loop over amount
// 3. Print "Alice total:" followed by the sum

`,
      solutionCode: `const aliceOrders = df.filter(row => row.customer_name === 'Alice');
const total = aliceOrders.reduce((sum, row) => sum + row.amount, 0);
console.log("Alice total:", total);`,
      expectedOutput: `Alice total: 300`,
      hint: 'Filter for Alice with df.filter(row => row.customer_name === "Alice") and sum row.amount.',
      explanation: 'Alice placed two orders: $120 and $180, totaling $300.',
      quickChips: [
        'const aliceOrders = df.filter(row => row.customer_name === \'Alice\');',
        'const total = aliceOrders.reduce((sum, row) => sum + row.amount, 0);',
        'console.log("Alice total:", total);',
      ],
    },
  ],
  quiz: [
    {
      id: 'q-ds-8-1',
      question: 'Which join type retains all observations from the original cohort table, even if some users have no match in the demographic table?',
      explanation: 'A Left Join preserves every row from the left table and inserts nulls where no match is found on the right.',
      difficulty: 'beginner',
      topicTag: 'data-science',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'Left Join', isCorrect: true },
        { id: 'opt-b', text: 'Inner Join', isCorrect: false },
        { id: 'opt-c', text: 'Cross Join', isCorrect: false },
        { id: 'opt-d', text: 'Right Exclusion Join', isCorrect: false },
      ],
    },
    {
      id: 'q-ds-8-2',
      question: 'What occurs during an Inner Join if a customer ID exists in the orders table but NOT in the customers lookup table?',
      explanation: 'An Inner Join requires keys to exist in both tables, so unmatched rows are discarded from the output.',
      difficulty: 'intermediate',
      topicTag: 'data-science',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'That order row is excluded from the final result', isCorrect: true },
        { id: 'opt-b', text: 'An error crashes the database server', isCorrect: false },
        { id: 'opt-c', text: 'The customer name is automatically guessed', isCorrect: false },
        { id: 'opt-d', text: 'The order is duplicated 10 times', isCorrect: false },
      ],
    },
    {
      id: 'q-ds-8-3',
      question: 'In relational modeling, what is the role of a Primary Key?',
      explanation: 'A Primary Key is a unique identifier ensuring that every row in a table can be uniquely identified.',
      difficulty: 'beginner',
      topicTag: 'data-science',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'Uniquely identifies each record within its table', isCorrect: true },
        { id: 'opt-b', text: 'Stores encrypted passwords only', isCorrect: false },
        { id: 'opt-c', text: 'Automatically computes the row average', isCorrect: false },
        { id: 'opt-d', text: 'Locks the database during backups', isCorrect: false },
      ],
    },
  ],
};
