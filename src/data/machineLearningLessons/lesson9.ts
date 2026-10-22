import { MLLessonDefinition } from '../../types/machineLearningLesson';

export const mlLesson9: MLLessonDefinition = {
  id: 'ml-lesson-9',
  number: 9,
  slug: 'decision-trees-and-entropy',
  title: 'Decision Trees & Information Gain',
  shortDescription: 'Construct interpretable hierarchical models using recursive binary splitting, quantify impurity with Shannon Entropy and Gini Index, and prevent overfitting through pruning.',
  estimatedMinutes: 12,
  learningObjectives: [
    'Explain how decision trees partition feature spaces via orthogonal splits',
    'Calculate Shannon Entropy and Gini Impurity for binary and multi-class nodes',
    'Evaluate Information Gain to select the optimal feature threshold at each split',
  ],
  prerequisites: ['K-Nearest Neighbors (KNN)'],
  sections: [
    {
      id: 'sec-ml-9-1',
      title: 'Hierarchical Tree Structures',
      content: `A **Decision Tree** models decisions as an intuitive flowchart of sequential binary tests:
• **Root Node**: The initial feature test at the top of the tree.
• **Internal (Decision) Nodes**: Intermediate questions (e.g. $\\text{Age} > 30?$).
• **Leaf (Terminal) Nodes**: Final predicted class or value (e.g. "Approve Loan").

Because decisions follow human-readable logic rules, decision trees are among the most **interpretable** algorithms in artificial intelligence.`,
    },
    {
      id: 'sec-ml-9-2',
      title: 'Measuring Impurity: Entropy & Gini',
      content: `To determine which feature to split on at each step, algorithms measure the "impurity" (disorder) of candidate child nodes:

1. **Shannon Entropy**:
$$H(S) = -\\sum_{i=1}^{C} p_i \\log_2(p_i)$$
• If a node contains an even 50/50 mix: $H(S) = -0.5 \\log_2(0.5) - 0.5 \\log_2(0.5) = 1.0$ (maximum impurity).
• If a node contains only one class (100% pure): $H(S) = 0.0$ (perfect purity).

2. **Gini Impurity** (used by default in Scikit-Learn CART):
$$\\text{Gini}(S) = 1 - \\sum_{i=1}^{C} p_i^2$$
Gini requires no expensive logarithm computations, making tree building significantly faster.`,
    },
    {
      id: 'sec-ml-9-3',
      title: 'Information Gain & Tree Pruning',
      content: `• **Information Gain**: The reduction in entropy achieved by a split:
$$IG(S, A) = H(S) - \\sum_{v} \\frac{|S_v|}{|S|} H(S_v)$$
The algorithm greedily selects the feature and threshold that yields the largest $IG$.

• **Overfitting & Pruning**: An unconstrained tree will continue splitting until every leaf contains a single observation, achieving 100% training accuracy but memorizing noise. Restricting \`maxDepth\` or pruning leaves prevents overfitting.`,
    },
  ],
  exercises: [
    {
      id: 'ml-ex-9-1',
      lessonId: 'ml-lesson-9',
      order: 1,
      title: 'Calculate Shannon Entropy for Mixed and Pure Nodes',
      objective: 'Calculate Shannon Entropy for an even split (p1 = 0.5, p2 = 0.5) and a pure split (p1 = 1.0, p2 = 0.0), and print both entropy values.',
      initialCode: `function entropy(p1, p2) {
  if (p1 === 0 || p1 === 1) return 0;
  return -(p1 * Math.log2(p1) + p2 * Math.log2(p2));
}

// 1. Calculate entropy for even 50/50 mix: entropy(0.5, 0.5)
// 2. Calculate entropy for pure node: entropy(1.0, 0.0)
// Print "Even mix entropy:" followed by evenEnt
// Print "Pure node entropy:" followed by pureEnt

`,
      solutionCode: `function entropy(p1, p2) {
  if (p1 === 0 || p1 === 1) return 0;
  return -(p1 * Math.log2(p1) + p2 * Math.log2(p2));
}

const evenEnt = entropy(0.5, 0.5);
const pureEnt = entropy(1.0, 0.0);

console.log("Even mix entropy:", evenEnt);
console.log("Pure node entropy:", pureEnt);`,
      expectedOutput: `Even mix entropy: 1
Pure node entropy: 0`,
      hint: 'Run entropy(0.5, 0.5) and entropy(1.0, 0.0). Print "Even mix entropy:" and "Pure node entropy:".',
      explanation: 'An even 50/50 binary mix has maximum entropy (1.0). A completely homogeneous (pure) node has zero entropy (0.0).',
      quickChips: [
        'const evenEnt = entropy(0.5, 0.5);',
        'const pureEnt = entropy(1.0, 0.0);',
        'console.log("Even mix entropy:", evenEnt);',
        'console.log("Pure node entropy:", pureEnt);',
      ],
    },
  ],
  quiz: [
    {
      id: 'q-ml-9-1',
      question: 'What is the entropy value of a decision tree node where 100% of the observations belong to the exact same class?',
      explanation: 'A node with zero uncertainty or disorder is completely pure, giving an entropy of exactly 0.',
      difficulty: 'beginner',
      topicTag: 'data-science',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: '0 (Maximum purity)', isCorrect: true },
        { id: 'opt-b', text: '1', isCorrect: false },
        { id: 'opt-c', text: '0.5', isCorrect: false },
        { id: 'opt-d', text: 'Infinity', isCorrect: false },
      ],
    },
    {
      id: 'q-ml-9-2',
      question: 'Why does an unconstrained decision tree without depth limits often suffer from severe overfitting?',
      explanation: 'Without stopping criteria, the tree will keep splitting until individual noisy outliers are isolated in single-sample leaf nodes.',
      difficulty: 'intermediate',
      topicTag: 'data-science',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'It creates tiny, over-specialized branches that isolate and memorize training noise', isCorrect: true },
        { id: 'opt-b', text: 'Decision trees can only predict straight lines', isCorrect: false },
        { id: 'opt-c', text: 'The logarithm function breaks down when depth exceeds 2', isCorrect: false },
        { id: 'opt-d', text: 'It converts numbers into negative values', isCorrect: false },
      ],
    },
    {
      id: 'q-ml-9-3',
      question: 'What is the goal of Information Gain when evaluating candidate feature splits in a decision tree?',
      explanation: 'Information Gain measures the reduction in entropy; the algorithm selects the split that maximizes this reduction.',
      difficulty: 'intermediate',
      topicTag: 'data-science',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'To maximize the reduction in entropy/impurity from parent node to child nodes', isCorrect: true },
        { id: 'opt-b', text: 'To increase the computational runtime of the computer', isCorrect: false },
        { id: 'opt-c', text: 'To ensure all features have identical names', isCorrect: false },
        { id: 'opt-d', text: 'To delete half the training dataset automatically', isCorrect: false },
      ],
    },
    {
      id: 'q_machinelearning_9_auto_4',
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
      id: 'q_machinelearning_9_auto_5',
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
      id: 'q_machinelearning_9_auto_6',
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
      id: 'q_machinelearning_9_auto_7',
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
      id: 'q_machinelearning_9_auto_8',
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
      id: 'q_machinelearning_9_auto_9',
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
      id: 'q_machinelearning_9_auto_10',
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
