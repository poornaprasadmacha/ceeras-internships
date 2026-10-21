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
  ],
};
