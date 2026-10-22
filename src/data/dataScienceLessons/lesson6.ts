import { DataScienceLessonDefinition } from '../../types/dataScienceLesson';

export const dsLesson6: DataScienceLessonDefinition = {
  id: 'ds-lesson-6',
  number: 6,
  slug: 'sorting-ranking-and-top-n-analysis',
  title: 'Sorting, Ranking & Top-N Analysis',
  shortDescription: 'Sort records across numerical and text dimensions, identify top-performing cohorts, and analyze rank distributions.',
  estimatedMinutes: 9,
  learningObjectives: [
    'Sort tabular rows in ascending and descending order using df.sort()',
    'Execute Top-N ranking analyses to identify key performers and outliers',
    'Extract extreme values and compute percentile ranks for competitive benchmarking',
  ],
  prerequisites: ['Filtering & Querying Datasets'],
  sections: [
    {
      id: 'sec-6-1',
      title: 'Sorting Tabular Datasets',
      content: `Sorting rearranges dataset rows based on the values of one or more features:
• **Ascending Order (\`ascending = true\`)**: Lowest to highest (e.g. $1 \\to 100$, $A \\to Z$). Used for fastest lap times, lowest error rates, or chronological dates.
• **Descending Order (\`ascending = false\`)**: Highest to lowest (e.g. $100 \\to 1$, $Z \\to A$). Used for highest sales, top scores, or largest account balances.`,
    },
    {
      id: 'sec-6-2',
      title: 'Top-N Leaderboard Patterns',
      content: `A frequent analytical pattern is finding the "Top 3" or "Top 5" entities:
\`\`\`javascript
// Sort by revenue descending (highest first)
const ranked = df.sort("revenue", false);

// Extract top 3 records
const top3 = ranked.slice(0, 3);
console.log("Top earner:", top3[0][1]); // Name of top earner
\`\`\`
This forms the basis for cohort tiering (e.g., Gold/Silver/Bronze membership tiers) and Pareto analyses ($80/20$ rule).`,
    },
  ],
  exercises: [
    {
      id: 'ds-ex-6-1',
      lessonId: 'ds-lesson-6',
      order: 1,
      title: 'Identify Highest Scoring Student and Top Score',
      objective: 'Sort students by score in descending order (highest first) using df.sort("score", false), then print the top student name and their score.',
      dataset: {
        name: 'exam_results.csv',
        columns: ['id', 'student_name', 'major', 'score'],
        rows: [
          [1, 'Liam', 'CS', 82],
          [2, 'Sophia', 'Physics', 96],
          [3, 'Ethan', 'Math', 89],
          [4, 'Emma', 'CS', 94],
          [5, 'Noah', 'Biology', 78],
        ],
        description: 'Midterm exam scores across departments',
      },
      initialCode: `// 1. Sort descending by score: const ranked = df.sort("score", false);
// 2. Print top student name: ranked[0][1]
// 3. Print top student score: ranked[0][3]

`,
      solutionCode: `const ranked = df.sort("score", false);
console.log("Top student:", ranked[0][1]);
console.log("Highest score:", ranked[0][3]);`,
      expectedOutput: `Top student: Sophia
Highest score: 96`,
      hint: 'Sort descending with df.sort("score", false). Then print ranked[0][1] and ranked[0][3].',
      explanation: 'Sophia achieved the highest score with 96 points, followed by Emma with 94.',
      quickChips: [
        'const ranked = df.sort("score", false);',
        'console.log("Top student:", ranked[0][1]);',
        'console.log("Highest score:", ranked[0][3]);',
      ],
    },
  ],
  quiz: [
    {
      id: 'q-ds-6-1',
      question: 'To find the products with the highest sales volume at the top of the table, what sorting direction should be used?',
      explanation: 'Descending order puts the largest numbers first.',
      difficulty: 'beginner',
      topicTag: 'data-science',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'Descending order (highest to lowest)', isCorrect: true },
        { id: 'opt-b', text: 'Ascending order (lowest to highest)', isCorrect: false },
        { id: 'opt-c', text: 'Random shuffle order', isCorrect: false },
        { id: 'opt-d', text: 'Alphabetical order by product ID', isCorrect: false },
      ],
    },
    {
      id: 'q-ds-6-2',
      question: 'What is the Pareto principle (80/20 rule) in business data analysis?',
      explanation: 'The Pareto principle states that roughly 80% of consequences or revenues come from 20% of causes or customers.',
      difficulty: 'intermediate',
      topicTag: 'data-science',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'Roughly 80% of revenue typically comes from the top 20% of customers', isCorrect: true },
        { id: 'opt-b', text: '80% of all data should be discarded during cleaning', isCorrect: false },
        { id: 'opt-c', text: 'Algorithms run 80% faster in descending order', isCorrect: false },
        { id: 'opt-d', text: 'Every dataset must contain at least 80 rows', isCorrect: false },
      ],
    },
    {
      id: 'q-ds-6-3',
      question: 'After sorting an array of rows, how do you extract the Top 5 rows in JavaScript?',
      explanation: 'The .slice(0, 5) method retrieves elements from index 0 up to (not including) index 5.',
      difficulty: 'beginner',
      topicTag: 'data-science',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'ranked.slice(0, 5)', isCorrect: true },
        { id: 'opt-b', text: 'ranked.drop(5)', isCorrect: false },
        { id: 'opt-c', text: 'ranked.pop(5)', isCorrect: false },
        { id: 'opt-d', text: 'ranked.filter(5)', isCorrect: false },
      ],
    },
    {
      id: 'q_datascience_6_auto_4',
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
      id: 'q_datascience_6_auto_5',
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
      id: 'q_datascience_6_auto_6',
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
      id: 'q_datascience_6_auto_7',
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
      id: 'q_datascience_6_auto_8',
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
      id: 'q_datascience_6_auto_9',
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
      id: 'q_datascience_6_auto_10',
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
