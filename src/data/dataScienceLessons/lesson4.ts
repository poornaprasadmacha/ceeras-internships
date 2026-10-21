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
  ],
};
