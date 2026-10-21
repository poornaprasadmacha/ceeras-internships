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
  ],
};
