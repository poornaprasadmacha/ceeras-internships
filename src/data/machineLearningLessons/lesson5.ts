import { MLLessonDefinition } from '../../types/machineLearningLesson';

export const mlLesson5: MLLessonDefinition = {
  id: 'ml-lesson-5',
  number: 5,
  slug: 'regularization-ridge-and-lasso',
  title: 'Regularization: Ridge (L2) & Lasso (L1)',
  shortDescription: 'Combat overfitting and multicollinearity by penalizing large model coefficients with L2 Ridge shrinkage and L1 Lasso sparse feature selection.',
  estimatedMinutes: 12,
  learningObjectives: [
    'Explain the Bias-Variance tradeoff and why complex models overfit',
    'Formulate Ridge (L2) regression and explain how it prevents explosive weight magnitudes',
    'Formulate Lasso (L1) regression and explain how it performs automated feature selection by zeroing out coefficients',
  ],
  prerequisites: ['Linear Regression: OLS & Multivariate Fitting'],
  sections: [
    {
      id: 'sec-ml-5-1',
      title: 'The Overfitting Dilemma',
      content: `When a model has many correlated features or polynomials, Ordinary Least Squares can assign enormous positive and negative weights to collinear variables that cancel out during training but explode on unseen test data.

**Regularization** adds a penalty term to the cost function to favor simpler, smaller weights:
$$\\text{Total Cost} = \\text{Loss (MSE)} + \\lambda \\times \\text{Penalty}(w)$$
• $\\lambda$ (or $\\alpha$): The regularization strength hyperparameter.
  • When $\\lambda = 0$: Standard unregularized OLS regression.
  • As $\\lambda \\to \\infty$: All weights are forced toward zero.`,
    },
    {
      id: 'sec-ml-5-2',
      title: 'Ridge Regression (L2 Penalty)',
      content: `**Ridge Regularization** penalizes the sum of squared weights:
$$\\text{Penalty}_{L2} = \\sum_{j=1}^{m} w_j^2$$
$$J_{\\text{Ridge}} = \\frac{1}{n}\\sum_{i=1}^{n} (y_i - \\hat{y}_i)^2 + \\lambda \\sum_{j=1}^{m} w_j^2$$

• **Behavior**: Shrinks coefficients smoothly toward zero.
• **Key Trait**: Coefficients approach zero but **never become exactly zero**. Every feature remains in the model with reduced influence.`,
    },
    {
      id: 'sec-ml-5-3',
      title: 'Lasso Regression (L1 Penalty) & Feature Selection',
      content: `**Lasso (Least Absolute Shrinkage and Selection Operator)** penalizes the sum of absolute weights:
$$\\text{Penalty}_{L1} = \\sum_{j=1}^{m} |w_j|$$
$$J_{\\text{Lasso}} = \\frac{1}{n}\\sum_{i=1}^{n} (y_i - \\hat{y}_i)^2 + \\lambda \\sum_{j=1}^{m} |w_j|$$

• **Behavior**: Due to the diamond geometry of the $L_1$ norm, Lasso drives uninformative feature weights **strictly to 0.0**!
• **Key Trait**: Acts as an **automated feature selector**, eliminating useless columns from the model.`,
    },
  ],
  exercises: [
    {
      id: 'ml-ex-5-1',
      lessonId: 'ml-lesson-5',
      order: 1,
      title: 'Calculate Ridge (L2) and Lasso (L1) Penalties',
      objective: 'Given model weights w = [3, -4, 0] and regularization parameter lambda = 0.5, calculate the L1 penalty (lambda * sum(|w|)) and L2 penalty (lambda * sum(w^2)), and print them.',
      initialCode: `const weights = [3, -4, 0];
const lambdaParam = 0.5;

// 1. Calculate sum of absolute weights: |3| + |-4| + |0| = 7
// 2. L1 penalty = lambdaParam * sumAbs
// 3. Calculate sum of squared weights: 3^2 + (-4)^2 + 0^2 = 25
// 4. L2 penalty = lambdaParam * sumSq
// Print "L1 penalty:" followed by L1
// Print "L2 penalty:" followed by L2

`,
      solutionCode: `const weights = [3, -4, 0];
const lambdaParam = 0.5;

const sumAbs = weights.reduce((acc, w) => acc + Math.abs(w), 0);
const sumSq = weights.reduce((acc, w) => acc + Math.pow(w, 2), 0);

const l1 = lambdaParam * sumAbs;
const l2 = lambdaParam * sumSq;

console.log("L1 penalty:", l1);
console.log("L2 penalty:", l2);`,
      expectedOutput: `L1 penalty: 3.5
L2 penalty: 12.5`,
      hint: 'sumAbs is 3 + 4 + 0 = 7 (so L1 is 0.5 * 7 = 3.5). sumSq is 9 + 16 + 0 = 25 (so L2 is 0.5 * 25 = 12.5).',
      explanation: 'L1 penalty is 0.5 * 7 = 3.5; L2 penalty is 0.5 * 25 = 12.5.',
      quickChips: [
        'const sumAbs = weights.reduce((acc, w) => acc + Math.abs(w), 0);',
        'const sumSq = weights.reduce((acc, w) => acc + Math.pow(w, 2), 0);',
        'console.log("L1 penalty:", lambdaParam * sumAbs);',
        'console.log("L2 penalty:", lambdaParam * sumSq);',
      ],
    },
  ],
  quiz: [
    {
      id: 'q-ml-5-1',
      question: 'What unique mathematical property distinguishes Lasso (L1) regression from Ridge (L2) regression?',
      explanation: 'Lasso drives unimportant feature coefficients strictly to zero, effectively performing automatic feature selection.',
      difficulty: 'intermediate',
      topicTag: 'data-science',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'Lasso can set coefficients strictly to zero, performing automatic feature selection', isCorrect: true },
        { id: 'opt-b', text: 'Lasso can only be used with image data', isCorrect: false },
        { id: 'opt-c', text: 'Lasso always produces higher training error than 100%', isCorrect: false },
        { id: 'opt-d', text: 'Lasso requires no input features', isCorrect: false },
      ],
    },
    {
      id: 'q-ml-5-2',
      question: 'In Ridge (L2) regression, what happens to the model coefficients as the hyperparameter lambda approaches infinity?',
      explanation: 'As lambda approaches infinity, the penalty dominates, forcing all weight coefficients toward zero (leaving only the bias/intercept).',
      difficulty: 'intermediate',
      topicTag: 'data-science',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'All weight coefficients approach zero', isCorrect: true },
        { id: 'opt-b', text: 'All weight coefficients diverge to infinity', isCorrect: false },
        { id: 'opt-c', text: 'The model becomes identical to unregularized OLS', isCorrect: false },
        { id: 'opt-d', text: 'The learning rate changes to zero automatically', isCorrect: false },
      ],
    },
    {
      id: 'q-ml-5-3',
      question: 'Why is it critical to standardize features (zero mean, unit variance) before applying Ridge or Lasso regularization?',
      explanation: 'Penalties apply directly to coefficient magnitudes; if features have vastly different scales, larger-scale features would be penalized unfairly.',
      difficulty: 'advanced',
      topicTag: 'data-science',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'Features on larger numerical scales would be unfairly penalized more than small-scale features', isCorrect: true },
        { id: 'opt-b', text: 'Without standardization, computer memory will overflow', isCorrect: false },
        { id: 'opt-c', text: 'To convert categorical variables into strings', isCorrect: false },
        { id: 'opt-d', text: 'Because square roots cannot be computed on unscaled numbers', isCorrect: false },
      ],
    },
    {
      id: 'q_machinelearning_5_auto_4',
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
      id: 'q_machinelearning_5_auto_5',
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
      id: 'q_machinelearning_5_auto_6',
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
      id: 'q_machinelearning_5_auto_7',
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
      id: 'q_machinelearning_5_auto_8',
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
      id: 'q_machinelearning_5_auto_9',
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
      id: 'q_machinelearning_5_auto_10',
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
