import { MLLessonDefinition } from '../../types/machineLearningLesson';

export const mlLesson12: MLLessonDefinition = {
  id: 'ml-lesson-12',
  number: 12,
  slug: 'support-vector-machines-svm',
  title: 'Support Vector Machines (SVM) & The Kernel Trick',
  shortDescription: 'Construct maximum margin hyperplanes, identify support vectors, balance soft-margin violations with C, and project non-linear boundaries using the Kernel Trick.',
  estimatedMinutes: 13,
  learningObjectives: [
    'Define the Maximum Margin Hyperplane and explain how it maximizes robustness to noise',
    'Identify support vectors as the critical boundary points that dictate the decision boundary',
    'Explain how the Kernel Trick (e.g. RBF kernel) projects non-linear data into higher dimensions without coordinate explosions',
  ],
  prerequisites: ['Gradient Boosting & Sequential Ensembles'],
  sections: [
    {
      id: 'sec-ml-12-1',
      title: 'Maximum Margin Hyperplanes',
      content: `Given two linearly separable classes, infinitely many linear boundaries could separate them. Which one is best?

**Support Vector Machines (SVM)** select the unique hyperplane that maximizes the **margin**—the geometric distance between the separating hyperplane and the closest data points of either class.

The width of this street (margin) is:
$$\\text{Margin Width} = \\frac{2}{\\|w\\|}$$
Maximizing the margin minimizes generalization error because it leaves the largest possible buffer for noisy, borderline test cases.`,
    },
    {
      id: 'sec-ml-12-2',
      title: 'Support Vectors & Soft Margins (C)',
      content: `• **Support Vectors**: The subset of training points that lie directly on the edge of the margin. Remarkably, if you remove all other training points from the dataset, **the decision boundary remains completely unchanged**!

• **The Soft Margin Hyperparameter ($C$)**:
Real-world data is rarely perfectly separable. The parameter $C$ controls the penalty for points violating the margin:
  • **Large $C$**: Penalizes violations heavily; yields a narrower margin with few mistakes on training data (High Variance).
  • **Small $C$**: Tolerates more margin violations; yields a wider, more forgiving margin that generalizes better to noisy real-world data (Low Variance).`,
    },
    {
      id: 'sec-ml-12-3',
      title: 'The Kernel Trick',
      content: `What if classes cannot be separated by a straight line (e.g. concentric circles)?

The **Kernel Trick** maps data into a higher-dimensional space where it becomes linearly separable, **without ever having to compute the high-dimensional coordinates explicitly**:
$$K(x, x') = \\langle \\phi(x), \\phi(x') \\rangle$$

The most popular non-linear kernel is the **Radial Basis Function (RBF)**:
$$K(x, x') = \\exp(-\\gamma \\|x - x'\\|^2)$$
This effectively measures similarity between points as a Gaussian bell curve, creating smooth, enclosed non-linear decision boundaries!`,
    },
  ],
  exercises: [
    {
      id: 'ml-ex-12-1',
      lessonId: 'ml-lesson-12',
      order: 1,
      title: 'Compute Geometric Margin Width and Class Prediction',
      objective: 'Given weight vector norm ||w|| = 2.0, calculate the margin width (2 / ||w||). Then evaluate the decision function sign(w*x + b) for logit z = 1.5.',
      initialCode: `const normW = 2.0;
const z = 1.5; // Decision logit w^T x + b

// 1. Calculate margin width: 2 / normW
// 2. Class prediction: z >= 0 ? 1 : -1
// Print "Margin width:" followed by margin
// Print "Predicted class:" followed by pred

`,
      solutionCode: `const normW = 2.0;
const z = 1.5;

const margin = 2 / normW;
const pred = z >= 0 ? 1 : -1;

console.log("Margin width:", margin);
console.log("Predicted class:", pred);`,
      expectedOutput: `Margin width: 1
Predicted class: 1`,
      hint: 'Compute 2 / normW = 2 / 2.0 = 1. Since z = 1.5 >= 0, predicted class is 1.',
      explanation: 'The geometric margin width is 1.0. Because z = 1.5 is positive, the observation falls on the positive side of the hyperplane.',
      quickChips: [
        'const margin = 2 / normW;',
        'const pred = z >= 0 ? 1 : -1;',
        'console.log("Margin width:", margin);',
        'console.log("Predicted class:", pred);',
      ],
    },
  ],
  quiz: [
    {
      id: 'q-ml-12-1',
      question: 'Which training points directly define the position and orientation of the decision boundary in a Support Vector Machine?',
      explanation: 'Only the support vectors (points sitting on the margin boundary) influence the position of the separating hyperplane.',
      difficulty: 'beginner',
      topicTag: 'data-science',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'Only the support vectors located on the margin boundaries', isCorrect: true },
        { id: 'opt-b', text: 'Every single training point equally', isCorrect: false },
        { id: 'opt-c', text: 'Only the data point closest to the origin (0, 0)', isCorrect: false },
        { id: 'opt-d', text: 'Points that were deleted during preprocessing', isCorrect: false },
      ],
    },
    {
      id: 'q-ml-12-2',
      question: 'In Support Vector Machines, what is the revolutionary advantage of the "Kernel Trick"?',
      explanation: 'It computes inner products in a high-dimensional feature space without ever transforming or calculating the coordinates explicitly.',
      difficulty: 'advanced',
      topicTag: 'data-science',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'It enables non-linear separation in high dimensions without explicitly calculating coordinate transformations', isCorrect: true },
        { id: 'opt-b', text: 'It speeds up sorting algorithms by converting numbers into letters', isCorrect: false },
        { id: 'opt-c', text: 'It eliminates the need for computing test accuracy', isCorrect: false },
        { id: 'opt-d', text: 'It restricts all outputs to positive integers', isCorrect: false },
      ],
    },
    {
      id: 'q-ml-12-3',
      question: 'In an SVM with a soft margin, what is the effect of setting the regularization parameter C to an extremely large value?',
      explanation: 'A very large C heavily penalizes misclassifications, forcing a narrower margin that tries to fit every training point, increasing the risk of overfitting.',
      difficulty: 'intermediate',
      topicTag: 'data-science',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'A narrower margin with few training violations, risking overfitting', isCorrect: true },
        { id: 'opt-b', text: 'A very wide margin with many violations, risking underfitting', isCorrect: false },
        { id: 'opt-c', text: 'The model switches automatically to a decision tree', isCorrect: false },
        { id: 'opt-d', text: 'All data points are classified as zero', isCorrect: false },
      ],
    },
  ],
};
