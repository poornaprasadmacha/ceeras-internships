import { MLLessonDefinition } from '../../types/machineLearningLesson';

export const mlLesson11: MLLessonDefinition = {
  id: 'ml-lesson-11',
  number: 11,
  slug: 'gradient-boosting-and-xgboost',
  title: 'Gradient Boosting & Sequential Ensembles',
  shortDescription: 'Master sequential error correction: train weak learners to predict residual mistakes, apply learning rate shrinkage, and understand the power of XGBoost and LightGBM.',
  estimatedMinutes: 13,
  learningObjectives: [
    'Distinguish Boosting (sequential error correction) from Bagging (independent parallel trees)',
    'Calculate residual errors: r_i = y_i - y_hat_i and understand pseudo-residuals',
    'Explain the role of the shrinkage rate (learning rate eta) in preventing gradient boosting ensembles from overfitting',
  ],
  prerequisites: ['Ensemble Methods: Bagging & Random Forests'],
  sections: [
    {
      id: 'sec-ml-11-1',
      title: 'Bagging vs. Boosting',
      content: `While **Bagging** builds a committee of independent trees in parallel and averages their votes, **Boosting** builds trees **sequentially in series**:

• Model 1 makes predictions on the training data.
• Some observations have large errors (residuals).
• Model 2 is trained specifically to **predict the residual errors** of Model 1.
• Model 3 predicts the remaining errors of Model 2, and so forth.

Each new learner focuses computational effort directly on the hardest, most error-prone samples.`,
    },
    {
      id: 'sec-ml-11-2',
      title: 'The Gradient Boosting Algorithm',
      content: `1. Initialize the ensemble with a constant baseline prediction (e.g. the average $\\bar{y}$):
$$F_0(x) = \\bar{y}$$
2. For each iteration $m = 1$ to $M$:
   • Compute residual errors for all samples:
     $$r_i = y_i - F_{m-1}(x_i)$$
   • Fit a shallow decision tree $h_m(x)$ to predict these residuals $r_i$.
   • Update the ensemble with a **shrinkage rate $\\eta$**:
     $$F_m(x) = F_{m-1}(x) + \\eta \\cdot h_m(x)$$

The shrinkage parameter $\\eta \\in (0, 1]$ (typically $0.05 - 0.2$) acts as a learning rate, ensuring no single tree overreacts to sample anomalies.`,
    },
    {
      id: 'sec-ml-11-3',
      title: 'Why XGBoost Dominates Tabular Competitions',
      content: `Frameworks like **XGBoost (Extreme Gradient Boosting)**, **LightGBM**, and **CatBoost** dominate real-world competitions and production tabular systems because they incorporate:
• Second-order Taylor series approximations (Hessian gradients) for optimal tree splits.
• Built-in $L_1$ and $L_2$ regularization on tree leaf weights.
• Native handling of missing values without imputation.
• Column sub-sampling and hardware cache optimization.`,
    },
  ],
  exercises: [
    {
      id: 'ml-ex-11-1',
      lessonId: 'ml-lesson-11',
      order: 1,
      title: 'Calculate Residuals & Update Prediction with Shrinkage',
      objective: 'Given actual target y = 100, initial baseline prediction F0 = 70, residual tree prediction h1 = 30, and learning rate eta = 0.1, compute the residual and updated prediction F1.',
      initialCode: `const y = 100;
const F0 = 70;
const h1 = 30; // Tree fit to residual
const eta = 0.1; // Shrinkage learning rate

// 1. Calculate residual r = y - F0
// 2. Calculate updated prediction: F1 = F0 + eta * h1
// Print "Residual:" followed by r
// Print "Updated prediction:" followed by F1

`,
      solutionCode: `const y = 100;
const F0 = 70;
const h1 = 30;
const eta = 0.1;

const r = y - F0;
const F1 = F0 + eta * h1;

console.log("Residual:", r);
console.log("Updated prediction:", F1);`,
      expectedOutput: `Residual: 30
Updated prediction: 73`,
      hint: 'r is 100 - 70 = 30. F1 is 70 + (0.1 * 30) = 73.',
      explanation: 'The residual error is 30. Shrinkage rate eta = 0.1 scales the correction to +3, nudging the prediction from 70 to 73.',
      quickChips: [
        'const r = y - F0;',
        'const F1 = F0 + eta * h1;',
        'console.log("Residual:", r);',
        'console.log("Updated prediction:", F1);',
      ],
    },
  ],
  quiz: [
    {
      id: 'q-ml-11-1',
      question: 'In Gradient Boosting, what target value is each subsequent tree trained to predict?',
      explanation: 'Each subsequent tree is trained to predict the residual errors (pseudo-residuals) left behind by the existing ensemble.',
      difficulty: 'intermediate',
      topicTag: 'data-science',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'The residual errors (mistakes) of the previous ensemble', isCorrect: true },
        { id: 'opt-b', text: 'The original raw target without modifications', isCorrect: false },
        { id: 'opt-c', text: 'Random Gaussian noise', isCorrect: false },
        { id: 'opt-d', text: 'The average of all input features', isCorrect: false },
      ],
    },
    {
      id: 'q-ml-11-2',
      question: 'What is the role of the shrinkage hyperparameter (learning rate eta) in Gradient Boosting?',
      explanation: 'Shrinkage scales each tree\'s contribution down, requiring more trees to learn patterns smoothly and preventing early trees from dominating and overfitting.',
      difficulty: 'intermediate',
      topicTag: 'data-science',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'It scales down the contribution of each tree to prevent overfitting and ensure smooth learning', isCorrect: true },
        { id: 'opt-b', text: 'It reduces the number of rows in the dataset', isCorrect: false },
        { id: 'opt-c', text: 'It disables all decision tree branches', isCorrect: false },
        { id: 'opt-d', text: 'It converts gradient boosting into unsupervised clustering', isCorrect: false },
      ],
    },
    {
      id: 'q-ml-11-3',
      question: 'Which of the following describes the difference in building trees between Random Forests and Gradient Boosted Trees?',
      explanation: 'Random Forests build deep trees in parallel independently; Gradient Boosting builds shallow trees sequentially in series.',
      difficulty: 'intermediate',
      topicTag: 'data-science',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'Random Forests train in parallel independently; Gradient Boosting trains sequentially in series', isCorrect: true },
        { id: 'opt-b', text: 'Random Forests use neural networks; Gradient Boosting uses linear equations', isCorrect: false },
        { id: 'opt-c', text: 'Gradient Boosting can only be run on quantum computers', isCorrect: false },
        { id: 'opt-d', text: 'Random Forests cannot be used for classification', isCorrect: false },
      ],
    },
    {
      id: 'q_machinelearning_11_auto_4',
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
      id: 'q_machinelearning_11_auto_5',
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
      id: 'q_machinelearning_11_auto_6',
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
      id: 'q_machinelearning_11_auto_7',
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
      id: 'q_machinelearning_11_auto_8',
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
      id: 'q_machinelearning_11_auto_9',
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
      id: 'q_machinelearning_11_auto_10',
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
