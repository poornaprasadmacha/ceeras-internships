import { DataScienceLessonDefinition } from '../../types/dataScienceLesson';

export const dsLesson11: DataScienceLessonDefinition = {
  id: 'ds-lesson-11',
  number: 11,
  slug: 'correlation-and-bivariate-analysis',
  title: 'Correlation & Bivariate Analysis',
  shortDescription: 'Quantify linear relationships between variables using Pearson r, interpret correlation strength, and separate correlation from causation.',
  estimatedMinutes: 11,
  learningObjectives: [
    'Calculate and interpret Pearson\'s correlation coefficient r between -1 and +1',
    'Recognize strong, moderate, weak, and non-linear bivariate associations',
    'Understand why correlation does not imply causation and identify lurking variables',
  ],
  prerequisites: ['Exploratory Data Analysis & Visualizations'],
  sections: [
    {
      id: 'sec-11-1',
      title: 'Pearson Correlation Coefficient (r)',
      content: `The **Pearson correlation coefficient ($r$)** measures the strength and direction of the linear association between two continuous variables:
$$r = \\frac{\\sum (x_i - \\bar{x})(y_i - \\bar{y})}{\\sqrt{\\sum (x_i - \\bar{x})^2 \\sum (y_i - \\bar{y})^2}}$$

• **$r = +1.0$**: Perfect positive linear relationship (as $X$ increases, $Y$ increases proportionally).
• **$r = 0.0$**: No linear relationship.
• **$r = -1.0$**: Perfect negative linear relationship (as $X$ increases, $Y$ decreases proportionally).

**Rules of Thumb**:
• $|r| \\ge 0.7$: Strong correlation
• $0.4 \\le |r| < 0.7$: Moderate correlation
• $|r| < 0.4$: Weak or negligible correlation`,
    },
    {
      id: 'sec-11-2',
      title: 'Correlation vs. Causation',
      content: `A fundamental rule of scientific inquiry is: **Correlation does not imply causation**.

Two variables may show a high correlation due to:
1. **Confounding (Lurking) Variable**: Ice cream sales and drowning rates both spike in summer due to temperature, not because ice cream causes drowning.
2. **Reverse Causality**: Does happiness increase productivity, or does high productivity increase happiness?
3. **Spurious Correlation**: Pure coincidence in sample data that fails to replicate.`,
    },
  ],
  exercises: [
    {
      id: 'ds-ex-11-1',
      lessonId: 'ds-lesson-11',
      order: 1,
      title: 'Calculate Pearson Correlation Between Study Hours and Score',
      objective: 'Calculate the Pearson correlation between study_hours and exam_score using df.corr("study_hours", "exam_score"), print the r-value, and render a scatter plot.',
      dataset: {
        name: 'study_performance.csv',
        columns: ['student_id', 'study_hours', 'exam_score'],
        rows: [
          [1, 2, 60],
          [2, 4, 70],
          [3, 6, 80],
          [4, 8, 85],
          [5, 10, 95],
        ],
        description: 'Weekly self-study hours versus final exam grade',
      },
      initialCode: `// 1. Calculate correlation: df.corr("study_hours", "exam_score")
// 2. Print "Pearson r:" followed by the r value
// 3. Render scatter plot:
// const points = df.rows.map(r => ({ x: r[1], y: r[2], label: "Hours vs Score" }));
// plot.scatter(points, "Study Hours vs Exam Score");

`,
      solutionCode: `const r = df.corr("study_hours", "exam_score");
console.log("Pearson r:", r);
const points = df.rows.map(r => ({ x: r[1], y: r[2], label: "Hours vs Score" }));
plot.scatter(points, "Study Hours vs Exam Score");`,
      expectedOutput: `Pearson r: 0.993`,
      hint: 'Compute r with df.corr("study_hours", "exam_score"), log "Pearson r:", r, and call plot.scatter().',
      explanation: 'The correlation coefficient of 0.993 indicates a virtually perfect positive linear relationship between study hours and exam performance.',
      quickChips: [
        'const r = df.corr("study_hours", "exam_score");',
        'console.log("Pearson r:", r);',
        'const points = df.rows.map(r => ({ x: r[1], y: r[2] }));',
        'plot.scatter(points, "Study Hours vs Score");',
      ],
    },
  ],
  quiz: [
    {
      id: 'q-ds-11-1',
      question: 'What does a Pearson correlation coefficient of r = -0.85 indicate between advertising cost and return on investment?',
      explanation: 'Negative values signify an inverse relationship, and magnitude > 0.7 signifies strong association.',
      difficulty: 'intermediate',
      topicTag: 'data-science',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'A strong negative (inverse) linear relationship', isCorrect: true },
        { id: 'opt-b', text: 'A weak positive relationship', isCorrect: false },
        { id: 'opt-c', text: 'No linear association exists', isCorrect: false },
        { id: 'opt-d', text: 'An 85% probability that the cost caused the return', isCorrect: false },
      ],
    },
    {
      id: 'q-ds-11-2',
      question: 'Why does Pearson correlation fail to capture relationships like y = x^2 (a perfect parabola)?',
      explanation: 'Pearson correlation only measures linear relationships; non-linear curves can have r = 0 despite a deterministic formula.',
      difficulty: 'intermediate',
      topicTag: 'data-science',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'Pearson r measures only linear relationships, not curves or parabolas', isCorrect: true },
        { id: 'opt-b', text: 'Parabolas cannot be represented by numbers', isCorrect: false },
        { id: 'opt-c', text: 'Negative numbers cannot be squared in statistics', isCorrect: false },
        { id: 'opt-d', text: 'The formula requires at least 1,000,000 observations', isCorrect: false },
      ],
    },
    {
      id: 'q-ds-11-3',
      question: 'If variable X and variable Y have a high correlation of 0.92, which statement is scientifically true?',
      explanation: 'Correlation alone does not prove causation without controlled experimental evidence or causal inference.',
      difficulty: 'beginner',
      topicTag: 'data-science',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'X and Y vary together, but X does not necessarily cause Y', isCorrect: true },
        { id: 'opt-b', text: 'X definitely causes Y directly', isCorrect: false },
        { id: 'opt-c', text: 'Y definitely causes X directly', isCorrect: false },
        { id: 'opt-d', text: 'Both variables must have an identical mean', isCorrect: false },
      ],
    },
    {
      id: 'q_datascience_11_auto_4',
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
      id: 'q_datascience_11_auto_5',
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
      id: 'q_datascience_11_auto_6',
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
      id: 'q_datascience_11_auto_7',
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
      id: 'q_datascience_11_auto_8',
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
      id: 'q_datascience_11_auto_9',
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
      id: 'q_datascience_11_auto_10',
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
