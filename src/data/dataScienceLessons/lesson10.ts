import { DataScienceLessonDefinition } from '../../types/dataScienceLesson';

export const dsLesson10: DataScienceLessonDefinition = {
  id: 'ds-lesson-10',
  number: 10,
  slug: 'exploratory-data-analysis-and-visualizations',
  title: 'Exploratory Data Analysis & Visualizations',
  shortDescription: 'Uncover patterns, anomalies, and distributions using bar charts, scatter plots, and exploratory data visualization workflows.',
  estimatedMinutes: 11,
  learningObjectives: [
    'Execute systematic Exploratory Data Analysis (EDA) on unfamiliar datasets',
    'Select appropriate visualization modalities: Bar charts, Scatter plots, and Line charts',
    'Generate real-time in-browser visualizations using the plot engine',
  ],
  prerequisites: ['Feature Engineering & Normalization'],
  sections: [
    {
      id: 'sec-10-1',
      title: 'The Purpose of EDA',
      content: `**Exploratory Data Analysis (EDA)**, pioneered by John Tukey, emphasizes using visual graphics and summary metrics to uncover data structure before formal modeling.

Goals of EDA:
1. Detect errors, typos, and extreme measurement anomalies.
2. Check underlying assumptions (normality, linearity).
3. Discover hidden relationships and feature interactions.
4. Communicate preliminary insights clearly to stakeholders.`,
    },
    {
      id: 'sec-10-2',
      title: 'Choosing the Right Visualization',
      content: `• **Bar Charts**: Ideal for comparing a numeric metric across discrete categories (e.g. quarterly revenue by region).
• **Scatter Plots**: Ideal for revealing the relationship and correlation between two continuous variables (e.g. ad spend vs. sales).
• **Line Charts**: Ideal for tracking metric trajectories over chronological time.

\`\`\`javascript
// Rendering a bar chart with Ceeras Plot engine
plot.bar(['East', 'West', 'Central'], [450, 620, 380], 'Regional Revenue ($k)');
\`\`\``,
    },
  ],
  exercises: [
    {
      id: 'ds-ex-10-1',
      lessonId: 'ds-lesson-10',
      order: 1,
      title: 'Generate Regional Sales Bar Chart and Total Revenue',
      objective: 'Calculate the total revenue using df.sum("revenue") and render a bar chart of regional revenues using plot.bar().',
      dataset: {
        name: 'quarterly_sales.csv',
        columns: ['region', 'revenue'],
        rows: [
          ['North', 150000],
          ['South', 90000],
          ['East', 210000],
          ['West', 180000],
        ],
        description: 'Quarterly sales revenue by operating region',
      },
      initialCode: `// 1. Calculate total revenue: df.sum("revenue")
// 2. Print "Total revenue:" followed by total
// 3. Render a bar chart: plot.bar(df.col("region"), df.col("revenue"), "Regional Sales");

`,
      solutionCode: `const total = df.sum("revenue");
console.log("Total revenue:", total);
plot.bar(df.col("region"), df.col("revenue"), "Regional Sales");`,
      expectedOutput: `Total revenue: 630000`,
      hint: 'Sum the revenue column and call plot.bar(df.col("region"), df.col("revenue"), "Regional Sales")',
      explanation: 'Total revenue is 150k + 90k + 210k + 180k = 630k. The bar chart provides an instant visual hierarchy.',
      quickChips: [
        'const total = df.sum("revenue");',
        'console.log("Total revenue:", total);',
        'plot.bar(df.col("region"), df.col("revenue"), "Regional Sales");',
      ],
    },
  ],
  quiz: [
    {
      id: 'q-ds-10-1',
      question: 'Which chart type is best suited to inspect the correlation between student study hours and final exam score?',
      explanation: 'A scatter plot visualizes the bivariate relationship between two continuous variables.',
      difficulty: 'beginner',
      topicTag: 'data-science',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'Scatter plot', isCorrect: true },
        { id: 'opt-b', text: 'Pie chart', isCorrect: false },
        { id: 'opt-c', text: 'Radar chart', isCorrect: false },
        { id: 'opt-d', text: 'Tree map', isCorrect: false },
      ],
    },
    {
      id: 'q-ds-10-2',
      question: 'Why should data scientists inspect visualizations rather than relying strictly on summary statistics (e.g. Anscombe\'s Quartet)?',
      explanation: 'Distinctly different datasets can share identical means, variances, and correlations (Anscombe\'s Quartet) that are only revealed through plotting.',
      difficulty: 'intermediate',
      topicTag: 'data-science',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'Different data distributions can produce identical means and variances (Anscombe\'s Quartet)', isCorrect: true },
        { id: 'opt-b', text: 'Statistics cannot be calculated on computers', isCorrect: false },
        { id: 'opt-c', text: 'Visualizations always eliminate all outliers automatically', isCorrect: false },
        { id: 'opt-d', text: 'Charts do not require any raw data', isCorrect: false },
      ],
    },
    {
      id: 'q-ds-10-3',
      question: 'In a bar chart comparing marketing channels, what does the height or length of each bar represent?',
      explanation: 'The bar height represents the magnitude of the aggregated metric (e.g. total revenue, leads, or conversions).',
      difficulty: 'beginner',
      topicTag: 'data-science',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'The magnitude or frequency of the metric for that category', isCorrect: true },
        { id: 'opt-b', text: 'The variance of the entire universe', isCorrect: false },
        { id: 'opt-c', text: 'The alphabetical rank of the category name', isCorrect: false },
        { id: 'opt-d', text: 'The server response ping', isCorrect: false },
      ],
    },
    {
      id: 'q_datascience_10_auto_4',
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
      id: 'q_datascience_10_auto_5',
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
      id: 'q_datascience_10_auto_6',
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
      id: 'q_datascience_10_auto_7',
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
      id: 'q_datascience_10_auto_8',
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
      id: 'q_datascience_10_auto_9',
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
      id: 'q_datascience_10_auto_10',
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
