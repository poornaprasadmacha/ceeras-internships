import { DataScienceLessonDefinition } from '../../types/dataScienceLesson';

export const dsLesson7: DataScienceLessonDefinition = {
  id: 'ds-lesson-7',
  number: 7,
  slug: 'grouping-and-aggregations',
  title: 'Grouping & Aggregations (Split-Apply-Combine)',
  shortDescription: 'Aggregate data across categories using the Split-Apply-Combine pattern to compare cohort averages, sums, and frequencies.',
  estimatedMinutes: 11,
  learningObjectives: [
    'Implement the Split-Apply-Combine paradigm popularized by Hadley Wickham',
    'Calculate categorical aggregates such as group means, totals, and counts',
    'Use df.groupBy() to uncover segmented patterns across business units',
  ],
  prerequisites: ['Sorting, Ranking & Top-N Analysis'],
  sections: [
    {
      id: 'sec-7-1',
      title: 'The Split-Apply-Combine Paradigm',
      content: `In tabular data analysis, high-level summaries often mask meaningful variations between sub-populations. 

The **Split-Apply-Combine** pattern solves this:
1. **Split**: Break the dataset into distinct groups based on a categorical variable (e.g. Department, Gender, Country).
2. **Apply**: Compute an aggregation metric independently on each group (e.g. \`mean\`, \`sum\`, \`count\`).
3. **Combine**: Assemble the individual results back into a summary table or dictionary.`,
    },
    {
      id: 'sec-7-2',
      title: 'Using df.groupBy()',
      content: `Our engine provides \`df.groupBy(categoryCol, numericCol, operation)\`:
\`\`\`javascript
// Compute average revenue per region
const avgByRegion = df.groupBy("region", "revenue", "mean");
console.log(avgByRegion);
// => { "North": 125000, "South": 98000, "West": 142000 }
\`\`\`
Operations include:
• \`'mean'\`: Group average
• \`'sum'\`: Group total
• \`'count'\`: Frequency count of rows per group`,
    },
  ],
  exercises: [
    {
      id: 'ds-ex-7-1',
      lessonId: 'ds-lesson-7',
      order: 1,
      title: 'Compute Average Salary by Department',
      objective: 'Use df.groupBy("dept", "salary", "mean") to compute department salary averages, and print the resulting object.',
      dataset: {
        name: 'corporate_payroll.csv',
        columns: ['emp_id', 'dept', 'salary'],
        rows: [
          [1, 'Engineering', 120000],
          [2, 'Engineering', 140000],
          [3, 'Marketing', 80000],
          [4, 'Marketing', 90000],
          [5, 'Sales', 95000],
          [6, 'Sales', 105000],
        ],
        description: 'Employee payroll records by department',
      },
      initialCode: `// Compute mean salary per department using df.groupBy:
// Print the resulting object with console.log()

`,
      solutionCode: `const deptAverages = df.groupBy("dept", "salary", "mean");
console.log(deptAverages);`,
      expectedOutput: `{"Engineering":130000,"Marketing":85000,"Sales":100000}`,
      hint: 'Call const deptAverages = df.groupBy("dept", "salary", "mean"); and console.log(deptAverages);',
      explanation: 'Engineering average is (120k+140k)/2 = 130k; Marketing is (80k+90k)/2 = 85k; Sales is (95k+105k)/2 = 100k.',
      quickChips: [
        'const deptAverages = df.groupBy("dept", "salary", "mean");',
        'console.log(deptAverages);',
      ],
    },
  ],
  quiz: [
    {
      id: 'q-ds-7-1',
      question: 'What are the three steps in the Split-Apply-Combine workflow for grouped data?',
      explanation: 'Split the data into groups by key, Apply an aggregation function to each subset, and Combine the results.',
      difficulty: 'beginner',
      topicTag: 'data-science',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'Split, Apply, Combine', isCorrect: true },
        { id: 'opt-b', text: 'Select, Project, Filter', isCorrect: false },
        { id: 'opt-c', text: 'Extract, Transform, Load', isCorrect: false },
        { id: 'opt-d', text: 'Train, Validate, Test', isCorrect: false },
      ],
    },
    {
      id: 'q-ds-7-2',
      question: 'If you want to know how many transactions each store completed, which aggregation operation is needed?',
      explanation: 'Count calculates the number of occurrences or rows per group.',
      difficulty: 'beginner',
      topicTag: 'data-science',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'Count', isCorrect: true },
        { id: 'opt-b', text: 'Mean', isCorrect: false },
        { id: 'opt-c', text: 'Standard Deviation', isCorrect: false },
        { id: 'opt-d', text: 'Median Absolute Deviation', isCorrect: false },
      ],
    },
    {
      id: 'q-ds-7-3',
      question: 'Why can looking only at the overall dataset mean without grouping lead to misleading conclusions (e.g. Simpson\'s Paradox)?',
      explanation: 'An aggregate trend across an entire population can reverse or disappear when disaggregated into sub-groups due to confounding variables.',
      difficulty: 'intermediate',
      topicTag: 'data-science',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'Confounding variables can cause group trends to reverse when aggregated (Simpson\'s Paradox)', isCorrect: true },
        { id: 'opt-b', text: 'Averages can only be calculated on strings', isCorrect: false },
        { id: 'opt-c', text: 'Grouping permanently deletes columns from disk', isCorrect: false },
        { id: 'opt-d', text: 'Computers cannot calculate averages with more than 10 rows', isCorrect: false },
      ],
    },
    {
      id: 'q_datascience_7_auto_4',
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
      id: 'q_datascience_7_auto_5',
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
      id: 'q_datascience_7_auto_6',
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
      id: 'q_datascience_7_auto_7',
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
      id: 'q_datascience_7_auto_8',
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
      id: 'q_datascience_7_auto_9',
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
      id: 'q_datascience_7_auto_10',
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
