import { MLLessonDefinition } from '../../types/machineLearningLesson';

export const mlLesson6: MLLessonDefinition = {
  id: 'ml-lesson-6',
  number: 6,
  slug: 'logistic-regression-and-classification',
  title: 'Logistic Regression & The Sigmoid Function',
  shortDescription: 'Transition from regression to classification: map continuous logits to calibrated probabilities using the Sigmoid curve and Binary Cross-Entropy loss.',
  estimatedMinutes: 12,
  learningObjectives: [
    'Understand why linear regression fails when applied to categorical classification labels',
    'Calculate probabilities using the Sigmoid (logistic) function: sigma(z) = 1 / (1 + e^-z)',
    'Establish decision boundaries and minimize Binary Cross-Entropy (Log Loss)',
  ],
  prerequisites: ['Regularization: Ridge (L2) & Lasso (L1)'],
  sections: [
    {
      id: 'sec-ml-6-1',
      title: 'Why Linear Regression Fails on Classification',
      content: `If we encode binary outcomes as $0$ and $1$ and fit a standard regression line, two major problems occur:
1. Predictions are unbounded: The line will predict values $< 0$ and $> 1$, which are nonsensical as probabilities.
2. Sensitivity to outliers: An extreme observation far to the right shifts the line, incorrectly moving the decision boundary for cluster points near the center.`,
    },
    {
      id: 'sec-ml-6-2',
      title: 'The Sigmoid (Logistic) Function',
      content: `**Logistic Regression** wraps the linear logit $z = w^T x + b$ inside the **Sigmoid function**:
$$\\sigma(z) = \\frac{1}{1 + e^{-z}}$$

Key properties:
• When $z = 0$: $\\sigma(0) = 0.5$ (the default decision boundary threshold).
• As $z \\to +\\infty$: $\\sigma(z) \\to 1.0$.
• As $z \\to -\\infty$: $\\sigma(z) \\to 0.0$.
The output $\\hat{y} = \\sigma(z)$ is directly interpretable as the probability $P(y = 1 | x)$.`,
    },
    {
      id: 'sec-ml-6-3',
      title: 'Binary Cross-Entropy Loss (Log Loss)',
      content: `Because the sigmoid curve makes the squared-error loss non-convex (trapping gradient descent in local minima), we use **Binary Cross-Entropy**:
$$J(w, b) = -\\frac{1}{n} \\sum_{i=1}^{n} \\left[ y_i \\ln(\\hat{y}_i) + (1 - y_i) \\ln(1 - \\hat{y}_i) \\right]$$
• When actual $y = 1$: Loss is $-\\ln(\\hat{y})$. If prediction $\\hat{y} \\to 0$, loss explodes toward infinity!
• When actual $y = 0$: Loss is $-\\ln(1 - \\hat{y})$. If prediction $\\hat{y} \\to 1$, loss explodes toward infinity!`,
    },
  ],
  exercises: [
    {
      id: 'ml-ex-6-1',
      lessonId: 'ml-lesson-6',
      order: 1,
      title: 'Compute Sigmoid Probabilities for Logit Values',
      objective: 'Write a sigmoid function sigma(z) = 1 / (1 + Math.exp(-z)), compute the probabilities for z = 0 and z = 2, and print both rounded to 2 decimals.',
      initialCode: `// 1. Define function sigmoid(z): 1 / (1 + Math.exp(-z))
// 2. Compute prob0 = sigmoid(0)
// 3. Compute prob2 = sigmoid(2)
// Print "P(z=0):" followed by prob0.toFixed(2)
// Print "P(z=2):" followed by prob2.toFixed(2)

`,
      solutionCode: `function sigmoid(z) {
  return 1 / (1 + Math.exp(-z));
}

const prob0 = sigmoid(0);
const prob2 = sigmoid(2);

console.log("P(z=0):", prob0.toFixed(2));
console.log("P(z=2):", prob2.toFixed(2));`,
      expectedOutput: `P(z=0): 0.50
P(z=2): 0.88`,
      hint: 'Define sigmoid(z) { return 1 / (1 + Math.exp(-z)); } and log P(z=0): and P(z=2):.',
      explanation: 'At z = 0, probability is exactly 0.50. At z = 2, probability is 1 / (1 + e^-2) = 0.88.',
      quickChips: [
        'function sigmoid(z) { return 1 / (1 + Math.exp(-z)); }',
        'console.log("P(z=0):", sigmoid(0).toFixed(2));',
        'console.log("P(z=2):", sigmoid(2).toFixed(2));',
      ],
    },
  ],
  quiz: [
    {
      id: 'q-ml-6-1',
      question: 'What is the output range of the Sigmoid activation function sigma(z) = 1 / (1 + e^-z)?',
      explanation: 'The sigmoid function strictly maps any real number into the open interval (0, 1).',
      difficulty: 'beginner',
      topicTag: 'data-science',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: '(0, 1)', isCorrect: true },
        { id: 'opt-b', text: '[-1, 1]', isCorrect: false },
        { id: 'opt-c', text: '[0, 100]', isCorrect: false },
        { id: 'opt-d', text: '(-Infinity, +Infinity)', isCorrect: false },
      ],
    },
    {
      id: 'q-ml-6-2',
      question: 'With a standard decision threshold of 0.5, when will a Logistic Regression model predict the positive class y_hat = 1?',
      explanation: 'When probability P >= 0.5, which corresponds to the linear logit z = w^T x + b >= 0.',
      difficulty: 'beginner',
      topicTag: 'data-science',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'When the predicted probability P(y=1|x) >= 0.5 (or z >= 0)', isCorrect: true },
        { id: 'opt-b', text: 'Only when the probability is exactly 1.0', isCorrect: false },
        { id: 'opt-c', text: 'When the loss is greater than 100', isCorrect: false },
        { id: 'opt-d', text: 'Only when all features are negative', isCorrect: false },
      ],
    },
    {
      id: 'q-ml-6-3',
      question: 'Why is Binary Cross-Entropy used as the cost function for Logistic Regression instead of Mean Squared Error?',
      explanation: 'Using MSE with a sigmoid produces a non-convex loss surface riddled with local minima; cross-entropy guarantees a convex surface with a unique global minimum.',
      difficulty: 'advanced',
      topicTag: 'data-science',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'It creates a convex optimization surface, guaranteeing gradient descent can reach the global minimum', isCorrect: true },
        { id: 'opt-b', text: 'Cross-entropy requires no training labels', isCorrect: false },
        { id: 'opt-c', text: 'MSE cannot be calculated on computers', isCorrect: false },
        { id: 'opt-d', text: 'To ensure the error is always equal to zero', isCorrect: false },
      ],
    },
    {
      id: 'q_machinelearning_6_auto_4',
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
      id: 'q_machinelearning_6_auto_5',
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
      id: 'q_machinelearning_6_auto_6',
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
      id: 'q_machinelearning_6_auto_7',
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
      id: 'q_machinelearning_6_auto_8',
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
      id: 'q_machinelearning_6_auto_9',
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
      id: 'q_machinelearning_6_auto_10',
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
