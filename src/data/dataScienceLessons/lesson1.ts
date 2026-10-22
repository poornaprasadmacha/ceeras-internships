import { DataScienceLessonDefinition } from '../../types/dataScienceLesson';

export const dsLesson1: DataScienceLessonDefinition = {
  id: 'ds-lesson-1',
  number: 1,
  slug: 'intro-to-data-science-and-datasets',
  title: 'Introduction to Data Science & Tabular Datasets',
  shortDescription: 'Explore the foundations of data science, tabular datasets, features, records, and inspecting dataset shapes.',
  estimatedMinutes: 8,
  learningObjectives: [
    'Understand data science as the intersection of domain knowledge, statistics, and programming',
    'Navigate tabular datasets structured in rows (observations) and columns (features)',
    'Inspect dataset dimensions and preview the first few rows',
  ],
  prerequisites: ['Basic computer literacy and enthusiasm for data!'],
  sections: [
    {
      id: 'sec-1-1',
      title: 'What is Data Science?',
      content: `**Data Science** is the discipline of extracting actionable knowledge, patterns, and predictions from raw data.

• **Tabular Datasets**: Two-dimensional grids where:
  • **Rows (Records / Observations)**: Each represents an individual entity (e.g. one student, one transaction).
  • **Columns (Features / Variables)**: Each represents an attribute measured (e.g. \`age\`, \`salary\`, \`gpa\`).`,
    },
    {
      id: 'sec-1-2',
      title: 'Inspecting Datasets with df.count() and df.head()',
      content: `Before modeling, data scientists inspect the dataset shape:

\`\`\`javascript
// Count total observations
console.log("Total records:", df.count());

// Inspect first 3 rows
console.log(df.head(3));
\`\`\`

• \`df.count()\`: Returns the total number of records in the dataset.
• \`df.head(n)\`: Displays the top \`n\` rows to verify column alignments.`,
    },
  ],
  exercises: [
    {
      id: 'ds-ex-1-1',
      lessonId: 'ds-lesson-1',
      order: 1,
      title: 'Inspect Student Enrollment Dataset Count',
      objective: 'Use console.log(df.count()); to print the total number of enrolled student records in the active dataset.',
      dataset: {
        name: 'students_cohort.csv',
        columns: ['student_id', 'name', 'track', 'score'],
        rows: [
          [101, 'Maya', 'Python', 92],
          [102, 'Alex', 'SQL', 88],
          [103, 'Jordan', 'Data Science', 95],
          [104, 'Leo', 'JavaScript', 84],
          [105, 'Chloe', 'Data Science', 91],
        ],
        description: 'Cohort enrollment and initial scores',
      },
      initialCode: `// Print the total record count using df.count() below:\n\n`,
      solutionCode: `console.log(df.count());`,
      expectedOutput: '5',
      hint: 'Type console.log(df.count());',
      explanation: 'df.count() computes the total number of row observations in the dataset.',
      quickChips: ['console.log(df.count());', 'console.log(df.head(3));'],
    },
  ],
  quiz: [
    {
      id: 'q-ds-1-1',
      question: 'In a tabular dataset, what does each horizontal row represent?',
      explanation: 'Each row corresponds to an individual observation, record, or entity.',
      difficulty: 'beginner',
      topicTag: 'data-science',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'An individual observation or record', isCorrect: true },
        { id: 'opt-b', text: 'A mathematical formula', isCorrect: false },
        { id: 'opt-c', text: 'A database index table', isCorrect: false },
        { id: 'opt-d', text: 'A graph axis', isCorrect: false },
      ],
    },
    {
      id: 'q-ds-1-2',
      question: 'What are the vertical columns in a dataset commonly referred to in data science and machine learning?',
      explanation: 'Columns represent attributes, properties, or features of the data.',
      difficulty: 'beginner',
      topicTag: 'data-science',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'Features or Variables', isCorrect: true },
        { id: 'opt-b', text: 'Observations', isCorrect: false },
        { id: 'opt-c', text: 'Records', isCorrect: false },
        { id: 'opt-d', text: 'Indexes only', isCorrect: false },
      ],
    },
    {
      id: 'q-ds-1-3',
      question: 'What does the .head(n) method return when exploring a DataFrame?',
      explanation: '.head(n) previews the first n rows of the dataset.',
      difficulty: 'beginner',
      topicTag: 'data-science',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'The first n rows of the dataset', isCorrect: true },
        { id: 'opt-b', text: 'The column headers only', isCorrect: false },
        { id: 'opt-c', text: 'The average of all columns', isCorrect: false },
        { id: 'opt-d', text: 'The last row of the dataset', isCorrect: false },
      ],
    },
    {
      id: 'q_datascience_1_auto_4',
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
      id: 'q_datascience_1_auto_5',
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
      id: 'q_datascience_1_auto_6',
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
      id: 'q_datascience_1_auto_7',
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
      id: 'q_datascience_1_auto_8',
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
      id: 'q_datascience_1_auto_9',
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
      id: 'q_datascience_1_auto_10',
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
