import { DataScienceLessonDefinition } from '../../types/dataScienceLesson';

export const dsLesson9: DataScienceLessonDefinition = {
  id: 'ds-lesson-9',
  number: 9,
  slug: 'feature-engineering-and-transformations',
  title: 'Feature Engineering & Normalization',
  shortDescription: 'Transform raw data into optimized machine learning features using Min-Max scaling, Z-score standardization, and One-Hot encoding.',
  estimatedMinutes: 12,
  learningObjectives: [
    'Apply Min-Max scaling to compress numerical ranges into the [0, 1] interval',
    'Standardize features using Z-score transformations (mean = 0, std = 1)',
    'Convert categorical variables into binary flags via One-Hot Encoding',
  ],
  prerequisites: ['Merging & Joining Relational Datasets'],
  sections: [
    {
      id: 'sec-9-1',
      title: 'Why Feature Scaling Matters',
      content: `Machine learning algorithms calculate Euclidean distances or optimize loss functions using gradient descent. 

If Feature A is **Age** ($20 - 70$) and Feature B is **Annual Salary** ($30,000 - 300,000$), the algorithm will treat Salary as thousands of times more important simply due to unit magnitude!

Scaling equalizes feature contributions so models learn patterns rather than arbitrary unit sizes.`,
    },
    {
      id: 'sec-9-2',
      title: 'Min-Max Normalization',
      content: `**Min-Max Normalization** linearly rescales feature values to a bounded interval, typically between $[0, 1]$:
$$x_{\\text{norm}} = \\frac{x - x_{\\min}}{x_{\\max} - x_{\\min}}$$

• A value equal to $x_{\\min}$ becomes $0.0$
• A value equal to $x_{\\max}$ becomes $1.0$
• All intermediate values map proportionally between $0$ and $1$.`,
    },
    {
      id: 'sec-9-3',
      title: 'Standardization (Z-Score) & One-Hot Encoding',
      content: `• **Standardization (Z-Score)**:
$$z = \\frac{x - \\mu}{\\sigma}$$
Centers features at mean $\\mu = 0$ with unit variance $\\sigma = 1$. Unlike Min-Max scaling, standardization does not bound outliers to an artificial range.

• **One-Hot Encoding**:
Converts non-numerical categories into binary columns:
\`\`\`
Role: ["Engineer", "Designer", "Manager"]
=> is_engineer: [1, 0, 0]
=> is_designer: [0, 1, 0]
=> is_manager:  [0, 0, 1]
\`\`\``,
    },
  ],
  exercises: [
    {
      id: 'ds-ex-9-1',
      lessonId: 'ds-lesson-9',
      order: 1,
      title: 'Min-Max Normalize Test Scores to [0, 1]',
      objective: 'Calculate min and max score using df.min("score") and df.max("score"), then normalize student 1\'s score (90) to the [0, 1] interval and print it.',
      dataset: {
        name: 'student_grades.csv',
        columns: ['id', 'name', 'score'],
        rows: [
          [1, 'Maya', 90],
          [2, 'Alex', 70],
          [3, 'Jordan', 100],
          [4, 'Chloe', 80],
        ],
        description: 'Student test scores out of 100',
      },
      initialCode: `// 1. Get min score: df.min("score")
// 2. Get max score: df.max("score")
// 3. Normalize score 90: (90 - min) / (max - min)
// 4. Print "Normalized 90:" followed by the normalized value

`,
      solutionCode: `const minScore = df.min("score");
const maxScore = df.max("score");
const normMaya = (90 - minScore) / (maxScore - minScore);
console.log("Normalized 90:", Number(normMaya.toFixed(2)));`,
      expectedOutput: `Normalized 90: 0.67`,
      hint: 'min is 70, max is 100. (90 - 70) / (100 - 70) = 20 / 30 = 0.67.',
      explanation: 'With min 70 and max 100, a score of 90 is 20 points above min over a 30 point range, yielding 0.67.',
      quickChips: [
        'const minScore = df.min("score");',
        'const maxScore = df.max("score");',
        'const normMaya = (90 - minScore) / (maxScore - minScore);',
        'console.log("Normalized 90:", Number(normMaya.toFixed(2)));',
      ],
    },
  ],
  quiz: [
    {
      id: 'q-ds-9-1',
      question: 'What is the resulting range of a feature transformed via Min-Max normalization?',
      explanation: 'Min-Max scaling compresses values strictly between 0 and 1.',
      difficulty: 'beginner',
      topicTag: 'data-science',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: '[0, 1]', isCorrect: true },
        { id: 'opt-b', text: '[-1, 1]', isCorrect: false },
        { id: 'opt-c', text: '[-Infinity, +Infinity]', isCorrect: false },
        { id: 'opt-d', text: '[0, 100]', isCorrect: false },
      ],
    },
    {
      id: 'q-ds-9-2',
      question: 'Why is One-Hot Encoding used instead of simply assigning arbitrary integers (1, 2, 3) to categories like ["Apple", "Banana", "Cherry"]?',
      explanation: 'Arbitrary integers impose an unintended artificial ordering or numerical distance (e.g. Cherry > Apple) that does not exist.',
      difficulty: 'intermediate',
      topicTag: 'data-science',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'To avoid imposing an artificial order or distance between categories', isCorrect: true },
        { id: 'opt-b', text: 'Because computers cannot store numbers greater than 1', isCorrect: false },
        { id: 'opt-c', text: 'It reduces the total number of columns in the dataset', isCorrect: false },
        { id: 'opt-d', text: 'To encrypt sensitive text attributes', isCorrect: false },
      ],
    },
    {
      id: 'q-ds-9-3',
      question: 'What are the mean and standard deviation of a feature after Z-Score standardization?',
      explanation: 'Z-score standardization produces a mean of 0 and a standard deviation of 1.',
      difficulty: 'intermediate',
      topicTag: 'data-science',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'Mean = 0, Standard Deviation = 1', isCorrect: true },
        { id: 'opt-b', text: 'Mean = 1, Standard Deviation = 0', isCorrect: false },
        { id: 'opt-c', text: 'Mean = 100, Standard Deviation = 15', isCorrect: false },
        { id: 'opt-d', text: 'Mean = 0.5, Standard Deviation = 0.5', isCorrect: false },
      ],
    },
    {
      id: 'q_datascience_9_auto_4',
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
      id: 'q_datascience_9_auto_5',
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
      id: 'q_datascience_9_auto_6',
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
      id: 'q_datascience_9_auto_7',
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
      id: 'q_datascience_9_auto_8',
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
      id: 'q_datascience_9_auto_9',
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
      id: 'q_datascience_9_auto_10',
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
