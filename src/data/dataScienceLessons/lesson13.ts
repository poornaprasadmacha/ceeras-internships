import { DataScienceLessonDefinition } from '../../types/dataScienceLesson';

export const dsLesson13: DataScienceLessonDefinition = {
  id: 'ds-lesson-13',
  number: 13,
  slug: 'machine-learning-linear-regression',
  title: 'Machine Learning: Simple Linear Regression',
  shortDescription: 'Train your first supervised learning model using Ordinary Least Squares (OLS), calculate slope and intercept, and minimize Mean Squared Error (MSE).',
  estimatedMinutes: 13,
  learningObjectives: [
    'Formulate supervised learning problems with predictor features (X) and continuous target (y)',
    'Fit a linear model using Ordinary Least Squares (OLS): y_hat = mx + b',
    'Quantify residual errors using the Mean Squared Error (MSE) cost function',
  ],
  prerequisites: ['Probability & Normal Distributions'],
  sections: [
    {
      id: 'sec-13-1',
      title: 'Supervised Learning & Regression',
      content: `In **supervised learning**, we train models on paired data $(X, y)$ to predict continuous target values $y$ for new, unseen inputs $X$.

**Simple Linear Regression** models the relationship between a single independent variable $x$ and dependent target $y$ as a straight line:
$$\\hat{y} = mx + b$$
• $m$: The slope (rate of change in $y$ per unit increase in $x$).
• $b$: The $y$-intercept (predicted value of $y$ when $x = 0$).`,
    },
    {
      id: 'sec-13-2',
      title: 'Ordinary Least Squares (OLS) Closed Form',
      content: `The optimal slope $m$ and intercept $b$ minimize the sum of squared differences between observed values $y_i$ and predicted values $\\hat{y}_i$:
$$m = \\frac{\\sum (x_i - \\bar{x})(y_i - \\bar{y})}{\\sum (x_i - \\bar{x})^2}$$
$$b = \\bar{y} - m\\bar{x}$$

Once $m$ and $b$ are determined, making a prediction for any new input $x_{\\text{new}}$ is simply evaluating $m \\cdot x_{\\text{new}} + b$.`,
    },
    {
      id: 'sec-13-3',
      title: 'Mean Squared Error (MSE)',
      content: `To evaluate regression model accuracy, we compute the **Mean Squared Error (MSE)**:
$$\\text{MSE} = \\frac{1}{n}\\sum_{i=1}^{n} (y_i - \\hat{y}_i)^2$$
Squaring residuals penalizes large errors heavily and ensures negative and positive errors do not cancel each other out. Taking the square root yields **Root Mean Squared Error (RMSE)**, expressed in original target units.`,
    },
  ],
  exercises: [
    {
      id: 'ds-ex-13-1',
      lessonId: 'ds-lesson-13',
      order: 1,
      title: 'Fit Linear Regression & Predict House Price',
      objective: 'Using the fitted model parameters m = 150 (dollars per sq ft) and b = 50000 (base land value), calculate the predicted price for a house with 2000 sq ft.',
      dataset: {
        name: 'real_estate_sales.csv',
        columns: ['house_id', 'sqft', 'price'],
        rows: [
          [1, 1000, 200000],
          [2, 1400, 260000],
          [3, 1600, 290000],
          [4, 2200, 380000],
          [5, 2500, 425000],
        ],
        description: 'Residential property sales with square footage and sale price in USD',
      },
      initialCode: `// Slope m = 150, Intercept b = 50000
// Calculate predicted price for 2000 sqft: price = m * 2000 + b
// Print "Predicted price:" followed by the price

`,
      solutionCode: `const m = 150;
const b = 50000;
const predictedPrice = m * 2000 + b;
console.log("Predicted price:", predictedPrice);`,
      expectedOutput: `Predicted price: 350000`,
      hint: 'Compute m * 2000 + b where m = 150 and b = 50000. 150 * 2000 + 50000 = 350000.',
      explanation: 'Evaluating the linear equation 150 * 2000 + 50000 produces an estimated property value of $350,000.',
      quickChips: [
        'const m = 150;',
        'const b = 50000;',
        'const predictedPrice = m * 2000 + b;',
        'console.log("Predicted price:", predictedPrice);',
      ],
    },
  ],
  quiz: [
    {
      id: 'q-ds-13-1',
      question: 'In the simple linear regression formula y = mx + b, what does the slope (m) signify?',
      explanation: 'The slope represents the expected change in the dependent variable (y) for each one-unit increase in the independent predictor (x).',
      difficulty: 'beginner',
      topicTag: 'data-science',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'The change in y for each one-unit increase in x', isCorrect: true },
        { id: 'opt-b', text: 'The value of y when x is at its maximum', isCorrect: false },
        { id: 'opt-c', text: 'The total number of rows in the training set', isCorrect: false },
        { id: 'opt-d', text: 'The correlation coefficient multiplied by infinity', isCorrect: false },
      ],
    },
    {
      id: 'q-ds-13-2',
      question: 'Why do regression loss functions like Mean Squared Error (MSE) square the residuals (y - y_hat)?',
      explanation: 'Squaring turns negative errors positive (so they do not cancel out) and heavily penalizes large errors.',
      difficulty: 'intermediate',
      topicTag: 'data-science',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'To prevent positive and negative errors from cancelling out and penalize large mistakes', isCorrect: true },
        { id: 'opt-b', text: 'Because computer processors cannot perform addition', isCorrect: false },
        { id: 'opt-c', text: 'To convert numbers into text strings', isCorrect: false },
        { id: 'opt-d', text: 'To reduce the number of features in the dataset', isCorrect: false },
      ],
    },
    {
      id: 'q-ds-13-3',
      question: 'What is a major risk when a machine learning model fits noise and random fluctuations in the training set rather than the underlying pattern?',
      explanation: 'Overfitting occurs when a model memorizes training noise and fails to generalize to new, unseen test data.',
      difficulty: 'intermediate',
      topicTag: 'data-science',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'Overfitting (poor test generalization)', isCorrect: true },
        { id: 'opt-b', text: 'Underfitting', isCorrect: false },
        { id: 'opt-c', text: 'Data leakage prevention', isCorrect: false },
        { id: 'opt-d', text: 'Dimensionality reduction', isCorrect: false },
      ],
    },
    {
      id: 'q_datascience_13_auto_4',
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
      id: 'q_datascience_13_auto_5',
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
      id: 'q_datascience_13_auto_6',
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
      id: 'q_datascience_13_auto_7',
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
      id: 'q_datascience_13_auto_8',
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
      id: 'q_datascience_13_auto_9',
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
      id: 'q_datascience_13_auto_10',
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
