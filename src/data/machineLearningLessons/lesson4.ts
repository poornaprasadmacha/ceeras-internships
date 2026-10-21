import { MLLessonDefinition } from '../../types/machineLearningLesson';

export const mlLesson4: MLLessonDefinition = {
  id: 'ml-lesson-4',
  number: 4,
  slug: 'linear-regression-modeling',
  title: 'Linear Regression: OLS & Multivariate Fitting',
  shortDescription: 'Build and train linear regression models using Ordinary Least Squares, interpret multi-feature weights, and predict continuous target values.',
  estimatedMinutes: 11,
  learningObjectives: [
    'Formulate multivariate linear regression: y_hat = Xw + b',
    'Fit a linear model using new ml.LinearRegression().fit(X, y)',
    'Interpret model coefficients to quantify feature importance and impact on the target',
  ],
  prerequisites: ['Cost Functions & Gradient Descent'],
  sections: [
    {
      id: 'sec-ml-4-1',
      title: 'Multivariate Linear Modeling',
      content: `While simple linear regression considers a single predictor $x$, real-world outcomes depend on multiple simultaneous factors:
$$\\hat{y} = w_1 x_1 + w_2 x_2 + \\dots + w_m x_m + b$$

In compact matrix notation:
$$\\hat{y} = Xw + b$$
• $w_j$: Represents the expected change in target $y$ when feature $x_j$ increases by $1$ unit, holding all other features constant.
• $b$: The bias (intercept) representing baseline output when all inputs equal $0$.`,
    },
    {
      id: 'sec-ml-4-2',
      title: 'Training with ml.LinearRegression()',
      content: `Our engine provides a clean Scikit-Learn-inspired API:
\`\`\`javascript
const model = new ml.LinearRegression();
model.fit(X, y);

// Make predictions for new samples
const predictions = model.predict(XTest);
const error = ml.metrics.mse(yTest, predictions);
\`\`\``,
    },
  ],
  exercises: [
    {
      id: 'ml-ex-4-1',
      lessonId: 'ml-lesson-4',
      order: 1,
      title: 'Fit Linear Regression & Predict Exam Score',
      objective: 'Fit a LinearRegression model on the provided study hours dataset, predict the score for a student who studied 7 hours ([ [7] ]), and print the predicted score.',
      dataset: {
        name: 'student_study_hours.csv',
        featureNames: ['hours_studied'],
        targetName: 'exam_score',
        rows: [
          { features: [2], target: 50 },
          { features: [4], target: 65 },
          { features: [6], target: 80 },
          { features: [8], target: 95 },
        ],
        description: 'Hours studied per week versus final examination grade',
      },
      initialCode: `// 1. Initialize model: const model = new ml.LinearRegression();
// 2. Fit model: model.fit(ml.X, ml.y);
// 3. Predict for 7 hours: const pred = model.predict([[7]]);
// 4. Print "Predicted score:" followed by pred[0]

`,
      solutionCode: `const model = new ml.LinearRegression();
model.fit(ml.X, ml.y);
const pred = model.predict([[7]]);
console.log("Predicted score:", pred[0]);`,
      expectedOutput: `Predicted score: 87.5`,
      hint: 'Instantiate new ml.LinearRegression(), call .fit(ml.X, ml.y), and predict([[7]]).',
      explanation: 'The slope is 7.5 points per hour with intercept 35. For 7 hours: 7.5 * 7 + 35 = 87.5 points.',
      quickChips: [
        'const model = new ml.LinearRegression();',
        'model.fit(ml.X, ml.y);',
        'const pred = model.predict([[7]]);',
        'console.log("Predicted score:", pred[0]);',
      ],
    },
  ],
  quiz: [
    {
      id: 'q-ml-4-1',
      question: 'In a fitted linear regression model y_hat = 4.5 * x1 - 2.0 * x2 + 10, how does an increase of 1 unit in x1 affect the predicted target?',
      explanation: 'Holding x2 constant, a one-unit increase in x1 adds 4.5 to the predicted target.',
      difficulty: 'beginner',
      topicTag: 'data-science',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'Increases the predicted target by 4.5 units', isCorrect: true },
        { id: 'opt-b', text: 'Decreases the predicted target by 2.0 units', isCorrect: false },
        { id: 'opt-c', text: 'Multiplies the target by 10', isCorrect: false },
        { id: 'opt-d', text: 'Causes the model to re-train', isCorrect: false },
      ],
    },
    {
      id: 'q-ml-4-2',
      question: 'Why must input features be passed as a 2D array matrix (e.g. [[2], [4], [6]]) rather than a flat 1D array to the model?',
      explanation: 'Machine learning models expect an (n_samples, n_features) 2D structure to distinguish multiple observations from multiple features.',
      difficulty: 'intermediate',
      topicTag: 'data-science',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'To maintain the (n_samples, n_features) 2D structure expected by ML algorithms', isCorrect: true },
        { id: 'opt-b', text: 'Because computers cannot read 1D arrays', isCorrect: false },
        { id: 'opt-c', text: 'To automatically encrypt the numbers', isCorrect: false },
        { id: 'opt-d', text: 'To force all numbers to be integers', isCorrect: false },
      ],
    },
    {
      id: 'q-ml-4-3',
      question: 'Which of the following metrics is NOT appropriate for evaluating a continuous Linear Regression model?',
      explanation: 'Accuracy is a classification metric measuring percentage of correct discrete class matches, not continuous residual distances.',
      difficulty: 'intermediate',
      topicTag: 'data-science',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'Classification Accuracy (%)', isCorrect: true },
        { id: 'opt-b', text: 'Mean Squared Error (MSE)', isCorrect: false },
        { id: 'opt-c', text: 'Root Mean Squared Error (RMSE)', isCorrect: false },
        { id: 'opt-d', text: 'Mean Absolute Error (MAE)', isCorrect: false },
      ],
    },
  ],
};
