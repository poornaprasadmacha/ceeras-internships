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
    {
      id: 'q_datascience_8_auto_4',
      question: "What is the primary objective of Exploratory Data Analysis (EDA) in Data Science?",
      explanation: "EDA uses summary statistics and visualization to uncover underlying structure and test hypotheses.",
      difficulty: 'intermediate',
      topicTag: 'datascience',
      type: 'multiple-choice',
      options: [
        { id: 'opt_1', text: "Understanding data distributions, patterns, anomalies, and relationships before formal modeling", isCorrect: true },
        { id: 'opt_2', text: "Deploying deep learning models to production clusters", isCorrect: false },
        { id: 'opt_3', text: "Encrypting user passwords", isCorrect: false },
        { id: 'opt_4', text: "Writing low-level hardware device drivers", isCorrect: false },
      ],
    },
    {
      id: 'q_datascience_8_auto_5',
      question: "What is the difference between Mean and Median in skewed distributions?",
      explanation: "Outliers pull the mean toward the tail, making the median a more representative measure of central tendency.",
      difficulty: 'intermediate',
      topicTag: 'datascience',
      type: 'multiple-choice',
      options: [
        { id: 'opt_1', text: "The mean is sensitive to extreme outliers, while the median represents the 50th percentile robustly", isCorrect: true },
        { id: 'opt_2', text: "The median is always larger than the mean", isCorrect: false },
        { id: 'opt_3', text: "The mean only applies to categorical data", isCorrect: false },
        { id: 'opt_4', text: "There is no difference in skewed distributions", isCorrect: false },
      ],
    },
    {
      id: 'q_datascience_8_auto_6',
      question: "What does a p-value less than 0.05 indicate in a standard hypothesis test?",
      explanation: "A p-value below alpha (0.05) indicates that observed results are unlikely under the null hypothesis.",
      difficulty: 'intermediate',
      topicTag: 'datascience',
      type: 'multiple-choice',
      options: [
        { id: 'opt_1', text: "Strong evidence against the null hypothesis, rejecting the null in favor of statistical significance", isCorrect: true },
        { id: 'opt_2', text: "The test was flawed and must be re-run", isCorrect: false },
        { id: 'opt_3', text: "A 5% probability that the null hypothesis is true", isCorrect: false },
        { id: 'opt_4', text: "The data follows a uniform distribution", isCorrect: false },
      ],
    },
    {
      id: 'q_datascience_8_auto_7',
      question: "What does the Pearson correlation coefficient (r) measure?",
      explanation: "Pearson's r ranges from -1 (perfect negative linear correlation) to +1 (perfect positive linear correlation).",
      difficulty: 'intermediate',
      topicTag: 'datascience',
      type: 'multiple-choice',
      options: [
        { id: 'opt_1', text: "The strength and direction of a linear relationship between two continuous variables (-1 to +1)", isCorrect: true },
        { id: 'opt_2', text: "The non-linear curve between categorical labels", isCorrect: false },
        { id: 'opt_3', text: "The probability of an error", isCorrect: false },
        { id: 'opt_4', text: "The variance of the dependent variable", isCorrect: false },
      ],
    },
    {
      id: 'q_datascience_8_auto_8',
      question: "What is the purpose of feature scaling (e.g. Standardisation or Min-Max Normalisation)?",
      explanation: "Scaling prevents features with large numeric scales from dominating distance calculations (KNN, SVM, Gradient Descent).",
      difficulty: 'intermediate',
      topicTag: 'datascience',
      type: 'multiple-choice',
      options: [
        { id: 'opt_1', text: "To bring numerical features to a comparable scale so gradient descent and distance-based algorithms converge efficiently", isCorrect: true },
        { id: 'opt_2', text: "To convert negative numbers to positive numbers", isCorrect: false },
        { id: 'opt_3', text: "To remove missing values", isCorrect: false },
        { id: 'opt_4', text: "To increase the number of columns", isCorrect: false },
      ],
    },
    {
      id: 'q_datascience_8_auto_9',
      question: "What does the R-squared (coefficient of determination) metric represent in regression?",
      explanation: "R-squared indicates the percentage of target variance explained by the regression model (0 to 1).",
      difficulty: 'intermediate',
      topicTag: 'datascience',
      type: 'multiple-choice',
      options: [
        { id: 'opt_1', text: "The proportion of variance in the dependent variable that is predictable from the independent variables", isCorrect: true },
        { id: 'opt_2', text: "The absolute difference between predictions and labels", isCorrect: false },
        { id: 'opt_3', text: "The percentage of missing values", isCorrect: false },
        { id: 'opt_4', text: "The learning rate of the model", isCorrect: false },
      ],
    },
    {
      id: 'q_datascience_8_auto_10',
      question: "What is the Central Limit Theorem?",
      explanation: "The CLT establishes that sample averages approximate a Gaussian bell curve given sufficient sample size (n >= 30).",
      difficulty: 'intermediate',
      topicTag: 'datascience',
      type: 'multiple-choice',
      options: [
        { id: 'opt_1', text: "The sampling distribution of the sample mean approaches a normal distribution as sample size increases, regardless of population distribution", isCorrect: true },
        { id: 'opt_2', text: "All data in nature is normally distributed", isCorrect: false },
        { id: 'opt_3', text: "The mean of any dataset equals the median", isCorrect: false },
        { id: 'opt_4', text: "Sample sizes must always exceed 1,000,000", isCorrect: false },
      ],
    },
  ],
};
