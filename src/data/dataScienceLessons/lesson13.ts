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
  ],
};
