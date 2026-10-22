import { DataScienceLessonDefinition } from '../../types/dataScienceLesson';

export const dsLesson12: DataScienceLessonDefinition = {
  id: 'ds-lesson-12',
  number: 12,
  slug: 'probability-and-normal-distributions',
  title: 'Probability & Normal Distributions',
  shortDescription: 'Master the Gaussian Bell Curve, the 68-95-99.7 Empirical Rule, and the Central Limit Theorem foundation of statistical inference.',
  estimatedMinutes: 12,
  learningObjectives: [
    'Understand the properties of the Gaussian (Normal) Distribution and probability density',
    'Apply the 68-95-99.7 Empirical Rule to calculate confidence bands',
    'Appreciate how the Central Limit Theorem allows normal approximations for sample means',
  ],
  prerequisites: ['Correlation & Bivariate Analysis'],
  sections: [
    {
      id: 'sec-12-1',
      title: 'The Normal (Gaussian) Distribution',
      content: `The **Normal Distribution** (bell curve) is the most ubiquitous probability distribution in nature and data science, characterized by its mean $\\mu$ and standard deviation $\\sigma$:
$$f(x) = \\frac{1}{\\sigma \\sqrt{2\\pi}} e^{-\\frac{1}{2}\\left(\\frac{x - \\mu}{\\sigma}\\right)^2}$$

Key properties:
• Perfectly symmetric about the center $\\mu$.
• $\\text{Mean} = \\text{Median} = \\text{Mode}$.
• Total area under the curve equals $1.0$ (100% total probability).`,
    },
    {
      id: 'sec-12-2',
      title: 'The 68 - 95 - 99.7 Empirical Rule',
      content: `For any normally distributed feature:
• **$\\approx 68.27\\%$** of observations fall within $1$ standard deviation of the mean: $[\\mu - \\sigma, \\mu + \\sigma]$
• **$\\approx 95.45\\%$** of observations fall within $2$ standard deviations: $[\\mu - 2\\sigma, \\mu + 2\\sigma]$
• **$\\approx 99.73\\%$** of observations fall within $3$ standard deviations: $[\\mu - 3\\sigma, \\mu + 3\\sigma]$

Observations beyond $3\\sigma$ occur less than $0.3\\%$ of the time and are classic candidates for anomaly investigation.`,
    },
    {
      id: 'sec-12-3',
      title: 'The Central Limit Theorem (CLT)',
      content: `The **Central Limit Theorem** states that the sum or average of a large number of independent random variables will be approximately normally distributed, **regardless of the underlying distribution of the individual variables**!

This fundamental theorem enables A/B testing, hypothesis tests ($Z$-tests, $t$-tests), and margin-of-error polling.`,
    },
  ],
  exercises: [
    {
      id: 'ds-ex-12-1',
      lessonId: 'ds-lesson-12',
      order: 1,
      title: 'Calculate 68% Empirical Confidence Interval for Battery Life',
      objective: 'Calculate the mean (mu) and standard deviation (sigma) of smartphone battery life in hours, compute the 68% interval [mu - sigma, mu + sigma], and print the bounds.',
      dataset: {
        name: 'battery_longevity.csv',
        columns: ['device_id', 'battery_hours'],
        rows: [
          [1, 18],
          [2, 20],
          [3, 22],
          [4, 19],
          [5, 21],
        ],
        description: 'Smartphone battery test longevity in continuous video playback hours',
      },
      initialCode: `// 1. Calculate mean mu: df.mean("battery_hours")
// 2. Calculate std sigma: df.std("battery_hours")
// 3. Lower bound: mu - sigma
// 4. Upper bound: mu + sigma
// Print "68% interval:" followed by lower and upper rounded to 2 decimals

`,
      solutionCode: `const mu = df.mean("battery_hours");
const sigma = df.std("battery_hours");
const lower = Number((mu - sigma).toFixed(2));
const upper = Number((mu + sigma).toFixed(2));
console.log("68% interval:", lower, "to", upper);`,
      expectedOutput: `68% interval: 18.42 to 21.58`,
      hint: 'mu is 20, sigma is 1.58. 20 - 1.58 = 18.42 and 20 + 1.58 = 21.58.',
      explanation: 'With a mean of 20 hours and standard deviation of 1.58 hours, approximately 68% of manufactured phones will last between 18.42 and 21.58 hours.',
      quickChips: [
        'const mu = df.mean("battery_hours");',
        'const sigma = df.std("battery_hours");',
        'const lower = Number((mu - sigma).toFixed(2));',
        'const upper = Number((mu + sigma).toFixed(2));',
        'console.log("68% interval:", lower, "to", upper);',
      ],
    },
  ],
  quiz: [
    {
      id: 'q-ds-12-1',
      question: 'According to the Empirical Rule, approximately what percentage of data points in a normal distribution lie within 2 standard deviations of the mean?',
      explanation: 'Approximately 95.4% (commonly rounded to 95%) of values lie within [mean - 2*std, mean + 2*std].',
      difficulty: 'beginner',
      topicTag: 'data-science',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'Approximately 95%', isCorrect: true },
        { id: 'opt-b', text: 'Approximately 68%', isCorrect: false },
        { id: 'opt-c', text: 'Approximately 50%', isCorrect: false },
        { id: 'opt-d', text: '100%', isCorrect: false },
      ],
    },
    {
      id: 'q-ds-12-2',
      question: 'What is the primary breakthrough granted by the Central Limit Theorem (CLT) to applied statisticians?',
      explanation: 'CLT guarantees that sample means approximate a normal distribution even if the original population distribution is skewed or uniform.',
      difficulty: 'advanced',
      topicTag: 'data-science',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'Sample averages tend to a normal distribution regardless of the underlying population shape', isCorrect: true },
        { id: 'opt-b', text: 'All datasets automatically have a standard deviation equal to 0', isCorrect: false },
        { id: 'opt-c', text: 'Outliers are completely deleted from sample datasets', isCorrect: false },
        { id: 'opt-d', text: 'Machine learning models never overfit on large datasets', isCorrect: false },
      ],
    },
    {
      id: 'q-ds-12-3',
      question: 'In a Standard Normal Distribution, what are the values of the mean (mu) and variance (sigma^2)?',
      explanation: 'A standard normal distribution has mu = 0 and sigma = 1 (so variance sigma^2 = 1).',
      difficulty: 'intermediate',
      topicTag: 'data-science',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'Mean = 0, Variance = 1', isCorrect: true },
        { id: 'opt-b', text: 'Mean = 1, Variance = 0', isCorrect: false },
        { id: 'opt-c', text: 'Mean = 100, Variance = 15', isCorrect: false },
        { id: 'opt-d', text: 'Mean = 0.5, Variance = 0.5', isCorrect: false },
      ],
    },
    {
      id: 'q_datascience_12_auto_4',
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
      id: 'q_datascience_12_auto_5',
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
      id: 'q_datascience_12_auto_6',
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
      id: 'q_datascience_12_auto_7',
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
      id: 'q_datascience_12_auto_8',
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
      id: 'q_datascience_12_auto_9',
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
      id: 'q_datascience_12_auto_10',
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
