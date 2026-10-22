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
    {
      id: 'q_machinelearning_12_auto_4',
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
      id: 'q_machinelearning_12_auto_5',
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
      id: 'q_machinelearning_12_auto_6',
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
      id: 'q_machinelearning_12_auto_7',
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
      id: 'q_machinelearning_12_auto_8',
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
      id: 'q_machinelearning_12_auto_9',
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
      id: 'q_machinelearning_12_auto_10',
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
