import { DataScienceLessonDefinition } from '../../types/dataScienceLesson';

export const dsLesson5: DataScienceLessonDefinition = {
  id: 'ds-lesson-5',
  number: 5,
  slug: 'filtering-and-querying-datasets',
  title: 'Filtering & Querying Datasets',
  shortDescription: 'Subset observations with boolean predicates, multi-condition logic (AND/OR), and conditional criteria on numerical and categorical features.',
  estimatedMinutes: 10,
  learningObjectives: [
    'Filter rows using boolean conditions and predicate functions with df.filter()',
    'Combine compound logical expressions using logical AND (&&) and logical OR (||)',
    'Extract target cohorts to isolate specific business segments for analysis',
  ],
  prerequisites: ['Data Cleaning & Handling Missing Values'],
  sections: [
    {
      id: 'sec-5-1',
      title: 'Boolean Subsetting',
      content: `In exploratory analysis, data scientists frequently isolate segments of interest—such as premium subscribers, high-risk transactions, or regional cohorts.

Filtering operates by testing every row against a boolean predicate:
\`\`\`javascript
const highEarners = df.filter(row => row.salary >= 100000);
console.log("Count:", highEarners.length);
\`\`\`
Only rows where the predicate evaluates to \`true\` are retained in the result.`,
    },
    {
      id: 'sec-5-2',
      title: 'Compound Conditions (AND / OR)',
      content: `Real-world queries combine multiple criteria across different feature dimensions:

• **Logical AND (\`&&\`)**: Both conditions must evaluate to true:
\`\`\`javascript
const activeMembers = df.filter(row => row.active === true && row.score > 80);
\`\`\`

• **Logical OR (\`||\`)**: At least one condition must evaluate to true:
\`\`\`javascript
const flagged = df.filter(row => row.risk_score > 90 || row.failed_logins > 3);
\`\`\`

Grouping with parentheses \`( ... )\` ensures proper evaluation order in complex boolean expressions.`,
    },
  ],
  exercises: [
    {
      id: 'ds-ex-5-1',
      lessonId: 'ds-lesson-5',
      order: 1,
      title: 'Filter Affordable In-Stock Electronics',
      objective: 'Filter the catalog for items in the "Electronics" category with a price under 100 and print the number of matching items.',
      dataset: {
        name: 'inventory_catalog.csv',
        columns: ['item_id', 'product_name', 'category', 'price', 'in_stock'],
        rows: [
          [201, 'Wireless Mouse', 'Electronics', 25, true],
          [202, 'Mechanical Keyboard', 'Electronics', 85, true],
          [203, 'Gaming Monitor', 'Electronics', 280, true],
          [204, 'Desk Lamp', 'Home', 45, true],
          [205, 'USB-C Cable', 'Electronics', 15, false],
          [206, 'Bluetooth Speaker', 'Electronics', 60, true],
        ],
        description: 'E-commerce warehouse inventory',
      },
      initialCode: `// Filter for category === 'Electronics' AND price < 100
// Print "Matching items:" followed by the length of the filtered array

`,
      solutionCode: `const matches = df.filter(row => row.category === 'Electronics' && row.price < 100);
console.log("Matching items:", matches.length);`,
      expectedOutput: `Matching items: 4`,
      hint: 'Use df.filter(row => row.category === "Electronics" && row.price < 100) and log matches.length',
      explanation: 'Four electronics items have price < 100: Wireless Mouse ($25), Mechanical Keyboard ($85), USB-C Cable ($15), and Bluetooth Speaker ($60).',
      quickChips: [
        'const matches = df.filter(row => row.category === \'Electronics\' && row.price < 100);',
        'console.log("Matching items:", matches.length);',
      ],
    },
  ],
  quiz: [
    {
      id: 'q-ds-5-1',
      question: 'Which logical operator ensures that BOTH criteria must be satisfied for a row to be included?',
      explanation: 'The logical AND operator (&&) returns true only if all connected expressions are true.',
      difficulty: 'beginner',
      topicTag: 'data-science',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: '&& (Logical AND)', isCorrect: true },
        { id: 'opt-b', text: '|| (Logical OR)', isCorrect: false },
        { id: 'opt-c', text: '! (Logical NOT)', isCorrect: false },
        { id: 'opt-d', text: '== (Loose Equality)', isCorrect: false },
      ],
    },
    {
      id: 'q-ds-5-2',
      question: 'Given an e-commerce dataset, why is filtering an essential step before training predictive models?',
      explanation: 'Filtering removes irrelevant, anomalous, or out-of-scope rows (e.g. testing accounts or cancelled orders) that could misguide model learning.',
      difficulty: 'intermediate',
      topicTag: 'data-science',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'It isolates relevant cohorts and eliminates noise or out-of-scope data', isCorrect: true },
        { id: 'opt-b', text: 'It automatically normalizes all numbers to decimals', isCorrect: false },
        { id: 'opt-c', text: 'It converts tabular data into an uncompressed image', isCorrect: false },
        { id: 'opt-d', text: 'It guarantees 100% test accuracy on unseen data', isCorrect: false },
      ],
    },
    {
      id: 'q-ds-5-3',
      question: 'What will df.filter(row => row.age >= 18 || row.has_consent === true) include?',
      explanation: 'The logical OR (||) includes any row where age is 18+ OR where has_consent is true (or both).',
      difficulty: 'beginner',
      topicTag: 'data-science',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'Rows where age is at least 18 OR has_consent is true', isCorrect: true },
        { id: 'opt-b', text: 'Only rows where both age >= 18 and has_consent is true', isCorrect: false },
        { id: 'opt-c', text: 'Only rows where neither condition is met', isCorrect: false },
        { id: 'opt-d', text: 'Only the very first row in the dataset', isCorrect: false },
      ],
    },
    {
      id: 'q_datascience_5_auto_4',
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
      id: 'q_datascience_5_auto_5',
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
      id: 'q_datascience_5_auto_6',
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
      id: 'q_datascience_5_auto_7',
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
      id: 'q_datascience_5_auto_8',
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
      id: 'q_datascience_5_auto_9',
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
      id: 'q_datascience_5_auto_10',
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
