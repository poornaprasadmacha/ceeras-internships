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
    {
      id: 'q_machinelearning_4_auto_4',
      question: "What is the primary difference between Supervised and Unsupervised Learning?",
      explanation: "Supervised models learn a mapping function from features to known labels; unsupervised models find clusters and representations.",
      difficulty: 'intermediate',
      topicTag: 'machinelearning',
      type: 'multiple-choice',
      options: [
        { id: 'opt_1', text: "Supervised learning trains on labeled input-output pairs; unsupervised learning discovers patterns in unlabeled data", isCorrect: true },
        { id: 'opt_2', text: "Supervised learning does not use algorithms", isCorrect: false },
        { id: 'opt_3', text: "Unsupervised learning requires humans to label every sample", isCorrect: false },
        { id: 'opt_4', text: "Supervised learning only works on images", isCorrect: false },
      ],
    },
    {
      id: 'q_machinelearning_4_auto_5',
      question: "What is overfitting in machine learning?",
      explanation: "Overfitting occurs when high model complexity leads to low bias but excessively high variance on test data.",
      difficulty: 'intermediate',
      topicTag: 'machinelearning',
      type: 'multiple-choice',
      options: [
        { id: 'opt_1', text: "A model memorizes training noise and details, performing exceptionally on training data but failing on unseen test data", isCorrect: true },
        { id: 'opt_2', text: "A model has too few parameters and fails to capture the underlying trend", isCorrect: false },
        { id: 'opt_3', text: "A model runs too quickly during gradient descent", isCorrect: false },
        { id: 'opt_4', text: "A model has 100% test accuracy", isCorrect: false },
      ],
    },
    {
      id: 'q_machinelearning_4_auto_6',
      question: "Why do we split data into Training, Validation, and Test sets?",
      explanation: "Separate sets prevent data leakage and provide realistic estimates of real-world generalization performance.",
      difficulty: 'intermediate',
      topicTag: 'machinelearning',
      type: 'multiple-choice',
      options: [
        { id: 'opt_1', text: "To fit the model on train, tune hyperparameters on validation, and perform unbiased evaluation on test", isCorrect: true },
        { id: 'opt_2', text: "Because algorithms cannot process more than 1,000 rows at once", isCorrect: false },
        { id: 'opt_3', text: "To duplicate data for redundancy", isCorrect: false },
        { id: 'opt_4', text: "To remove outliers", isCorrect: false },
      ],
    },
    {
      id: 'q_machinelearning_4_auto_7',
      question: "In a confusion matrix for binary classification, what is Precision?",
      explanation: "Precision measures how many of the items flagged as positive were actually true positives.",
      difficulty: 'intermediate',
      topicTag: 'machinelearning',
      type: 'multiple-choice',
      options: [
        { id: 'opt_1', text: "True Positives / (True Positives + False Positives): the accuracy of positive predictions", isCorrect: true },
        { id: 'opt_2', text: "True Positives / (True Positives + False Negatives): the ability to find all positive cases", isCorrect: false },
        { id: 'opt_3', text: "(True Positives + True Negatives) / Total Samples", isCorrect: false },
        { id: 'opt_4', text: "The percentage of missing predictions", isCorrect: false },
      ],
    },
    {
      id: 'q_machinelearning_4_auto_8',
      question: "In a confusion matrix for binary classification, what is Recall (Sensitivity)?",
      explanation: "Recall measures the model's ability to capture all positive instances in the population.",
      difficulty: 'intermediate',
      topicTag: 'machinelearning',
      type: 'multiple-choice',
      options: [
        { id: 'opt_1', text: "True Positives / (True Positives + False Negatives): the proportion of actual positives successfully identified", isCorrect: true },
        { id: 'opt_2', text: "True Positives / (True Positives + False Positives)", isCorrect: false },
        { id: 'opt_3', text: "True Negatives / Total", isCorrect: false },
        { id: 'opt_4', text: "The F1 harmonic mean", isCorrect: false },
      ],
    },
    {
      id: 'q_machinelearning_4_auto_9',
      question: "What does the Area Under the ROC Curve (AUC-ROC) measure?",
      explanation: "AUC ranges from 0.5 (random guessing) to 1.0 (perfect separability), invariant to class balance.",
      difficulty: 'intermediate',
      topicTag: 'machinelearning',
      type: 'multiple-choice',
      options: [
        { id: 'opt_1', text: "The model's ability to discriminate between positive and negative classes across all classification thresholds", isCorrect: true },
        { id: 'opt_2', text: "The physical area of the neural network weights", isCorrect: false },
        { id: 'opt_3', text: "The training time in seconds", isCorrect: false },
        { id: 'opt_4', text: "The loss gradient magnitude", isCorrect: false },
      ],
    },
    {
      id: 'q_machinelearning_4_auto_10',
      question: "How does a Random Forest ensemble improve upon a single Decision Tree?",
      explanation: "Random Forests combine bootstrap aggregating (bagging) with random feature selection to reduce model variance.",
      difficulty: 'intermediate',
      topicTag: 'machinelearning',
      type: 'multiple-choice',
      options: [
        { id: 'opt_1', text: "It averages predictions from multiple decorrelated trees trained on bootstrap samples (bagging), drastically reducing variance", isCorrect: true },
        { id: 'opt_2', text: "It trains a single tree for more iterations", isCorrect: false },
        { id: 'opt_3', text: "It removes all leaf nodes", isCorrect: false },
        { id: 'opt_4', text: "It converts decision trees into linear regression", isCorrect: false },
      ],
    },
  ],
};
