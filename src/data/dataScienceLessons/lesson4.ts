import { DataScienceLessonDefinition } from '../../types/dataScienceLesson';

export const dsLesson4: DataScienceLessonDefinition = {
  id: 'ds-lesson-4',
  number: 4,
  slug: 'data-cleaning-and-missing-values',
  title: 'Data Cleaning & Handling Missing Values',
  shortDescription: 'Identify missingness types (MCAR, MAR, MNAR) and apply cleaning pipelines: listwise dropping, mean/median imputation, and record validation.',
  estimatedMinutes: 10,
  learningObjectives: [
    'Distinguish between null, undefined, empty string, and NaN values in raw data',
    'Recognize the trade-offs of dropping rows versus statistical imputation (mean/median/mode)',
    'Execute df.dropNull() to sanitize datasets for downstream machine learning algorithms',
  ],
  prerequisites: ['Measures of Spread & Variance'],
  sections: [
    {
      id: 'sec-4-1',
      title: 'The Reality of Dirty Data',
      content: `Real-world data is rarely pristine. Sensors disconnect, user surveys have skipped questions, and database migrations leave null values.

Missing values typically appear as \`null\`, \`undefined\`, \`NaN\`, or placeholder values like \`-999\` or \`"N/A"\`.

Before fitting any machine learning model or calculating summary metrics, data scientists must clean and sanitize the dataset.`,
    },
    {
      id: 'sec-4-2',
      title: 'Missing Data Mechanisms',
      content: `• **MCAR (Missing Completely at Random)**: The missingness has no relationship with any observed or unobserved variable (e.g. a dropped network packet). Dropping these causes no statistical bias.
• **MAR (Missing at Random)**: The missingness is systematically related to other observed features (e.g. younger users might skip income fields less often than older users).
• **MNAR (Missing Not at Random)**: The missingness depends on the value of the missing variable itself (e.g. high-income earners refusing to disclose income). Simple dropping can introduce severe bias.`,
    },
    {
      id: 'sec-4-3',
      title: 'Cleaning Strategies: Dropping vs. Imputation',
      content: `• **Listwise Deletion (\`df.dropNull()\` )**:
  Removes any row containing one or more null fields. Safe when missingness is low (< 5%) and MCAR.
• **Mean / Median Imputation**:
  Replaces missing numerical values with the feature's mean or median.
  • *Pro*: Preserves all observations in the dataset.
  • *Con*: Artificially reduces feature variance and can distort covariance.
• **Mode Imputation**:
  Replaces missing categorical features with the most common class.`,
    },
  ],
  exercises: [
    {
      id: 'ds-ex-4-1',
      lessonId: 'ds-lesson-4',
      order: 1,
      title: 'Sanitize Dataset by Dropping Null Records',
      objective: 'Count total original records with df.count(), filter out missing values using df.dropNull(), and print the cleaned record count.',
      dataset: {
        name: 'customer_leads.csv',
        columns: ['lead_id', 'company', 'annual_revenue', 'country'],
        rows: [
          [101, 'Alpha Corp', 120000, 'USA'],
          [102, 'Beta Tech', null, 'UK'],
          [103, 'Gamma Ltd', 450000, 'Germany'],
          [104, 'Delta Inc', null, null],
          [105, 'Epsilon Co', 80000, 'Canada'],
          [106, 'Zeta Global', 310000, 'Japan'],
        ],
        description: 'B2B sales lead pipeline with incomplete records',
      },
      initialCode: `// 1. Print original count: df.count()
// 2. Obtain clean rows: const cleanRows = df.dropNull();
// 3. Print clean count: cleanRows.length

`,
      solutionCode: `console.log("Original records:", df.count());
const cleanRows = df.dropNull();
console.log("Clean records:", cleanRows.length);`,
      expectedOutput: `Original records: 6
Clean records: 4`,
      hint: 'Log "Original records:", df.count() then cleanRows.length as "Clean records:".',
      explanation: 'Two rows contained null fields (Beta Tech and Delta Inc). Listwise deletion drops those 2 rows, leaving 4 completely observed records.',
      quickChips: [
        'console.log("Original records:", df.count());',
        'const cleanRows = df.dropNull();',
        'console.log("Clean records:", cleanRows.length);',
      ],
    },
  ],
  quiz: [
    {
      id: 'q-ds-4-1',
      question: 'What is a potential negative side effect of replacing missing numbers with the column mean (Mean Imputation)?',
      explanation: 'Imputing the exact mean artificially pulls values closer together, diminishing the true variance and standard deviation of the feature.',
      difficulty: 'intermediate',
      topicTag: 'data-science',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'It artificially reduces the variance of the feature', isCorrect: true },
        { id: 'opt-b', text: 'It changes the column data type to text', isCorrect: false },
        { id: 'opt-c', text: 'It increases the number of rows in the dataset', isCorrect: false },
        { id: 'opt-d', text: 'It prevents the dataset from being sorted', isCorrect: false },
      ],
    },
    {
      id: 'q-ds-4-2',
      question: 'When is Listwise Deletion (dropping incomplete rows) most acceptable to apply?',
      explanation: 'When missing data constitutes a tiny fraction of the dataset (<5%) and appears completely at random (MCAR).',
      difficulty: 'beginner',
      topicTag: 'data-science',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'When only a small percentage (<5%) is missing completely at random', isCorrect: true },
        { id: 'opt-b', text: 'When more than 80% of rows have missing entries', isCorrect: false },
        { id: 'opt-c', text: 'When all missing values are concentrated in the target label', isCorrect: false },
        { id: 'opt-d', text: 'When working with financial balances that are intentionally null', isCorrect: false },
      ],
    },
    {
      id: 'q-ds-4-3',
      question: 'Which missingness mechanism occurs when people with very high debt systematically refuse to report their debt amount on a loan application?',
      explanation: 'Because missingness directly relates to the value of the missing variable itself, it is Missing Not at Random (MNAR).',
      difficulty: 'advanced',
      topicTag: 'data-science',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'Missing Not at Random (MNAR)', isCorrect: true },
        { id: 'opt-b', text: 'Missing Completely at Random (MCAR)', isCorrect: false },
        { id: 'opt-c', text: 'Missing at Random (MAR)', isCorrect: false },
        { id: 'opt-d', text: 'Deterministic Zero Fill', isCorrect: false },
      ],
    },
    {
      id: 'q_datascience_4_auto_4',
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
      id: 'q_datascience_4_auto_5',
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
      id: 'q_datascience_4_auto_6',
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
      id: 'q_datascience_4_auto_7',
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
      id: 'q_datascience_4_auto_8',
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
      id: 'q_datascience_4_auto_9',
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
      id: 'q_datascience_4_auto_10',
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
