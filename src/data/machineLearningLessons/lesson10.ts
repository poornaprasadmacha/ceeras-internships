import { MLLessonDefinition } from '../../types/machineLearningLesson';

export const mlLesson10: MLLessonDefinition = {
  id: 'ml-lesson-10',
  number: 10,
  slug: 'random-forests-and-bagging',
  title: 'Ensemble Methods: Bagging & Random Forests',
  shortDescription: 'Harness the wisdom of crowds: reduce variance and eliminate overfitting by combining diverse decision trees with Bootstrap Aggregation and Random Forests.',
  estimatedMinutes: 12,
  learningObjectives: [
    'Explain the ensemble philosophy: combining diverse weak learners into a high-performance model',
    'Understand Bootstrap Aggregation (Bagging) with replacement and Out-of-Bag (OOB) validation',
    'Describe how Random Forests decorrelate individual trees using random feature subspace sampling',
  ],
  prerequisites: ['Decision Trees & Information Gain'],
  sections: [
    {
      id: 'sec-ml-10-1',
      title: 'The Ensemble Philosophy',
      content: `A single decision tree is notorious for **high variance**: small changes in training data produce wildly different split hierarchies.

**Ensemble Learning** combines predictions from multiple individual models (base estimators) to achieve lower variance and higher generalization than any single estimator could produce alone.

Core rule: The individual estimators must be **diverse** and have errors that are relatively uncorrelated.`,
    },
    {
      id: 'sec-ml-10-2',
      title: 'Bootstrap Aggregation (Bagging)',
      content: `**Bagging (Bootstrap Aggregating)**:
1. **Bootstrapping**: Given dataset of size $n$, sample $n$ observations **with replacement** to train each tree.
   • Mathematically, roughly $63.2\\%$ of unique observations are included in each bootstrap sample.
   • The remaining $\\approx 36.8\\%$ are **Out-of-Bag (OOB)** samples, providing a built-in validation test!
2. **Aggregating**:
   • Classification: Majority vote across all trees.
   • Regression: Arithmetic average of all predictions.`,
    },
    {
      id: 'sec-ml-10-3',
      title: 'Random Forests: Decorrelating Trees',
      content: `Standard Bagging has a flaw: if one feature is extremely dominant (e.g. Income in credit scoring), almost every bagged tree will select that feature for its root split, producing highly correlated trees.

**Random Forests** introduce a crucial innovation:
At *every split*, the algorithm is only allowed to choose from a **random subset of features** (typically $\\sqrt{m}$ for classification, $m/3$ for regression).

This forces trees to explore alternative pathways, dramatically **decorrelating the ensemble** and slashing overall variance!`,
    },
  ],
  exercises: [
    {
      id: 'ml-ex-10-1',
      lessonId: 'ml-lesson-10',
      order: 1,
      title: 'Compute Ensemble Majority Vote from 5 Trees',
      objective: 'Given individual predictions from 5 diverse decision trees: [1, 0, 1, 1, 0], compute the majority vote and print the final ensemble prediction.',
      initialCode: `const treeVotes = [1, 0, 1, 1, 0];

// 1. Count votes for class 1 and class 0
// 2. Determine majority vote (winner)
// 3. Print "Ensemble prediction:" followed by majority vote

`,
      solutionCode: `const treeVotes = [1, 0, 1, 1, 0];
const ones = treeVotes.filter(v => v === 1).length;
const zeros = treeVotes.filter(v => v === 0).length;
const ensemblePred = ones > zeros ? 1 : 0;
console.log("Ensemble prediction:", ensemblePred);`,
      expectedOutput: `Ensemble prediction: 1`,
      hint: '3 trees voted 1 and 2 trees voted 0. The majority vote is 1.',
      explanation: 'With 3 votes for 1 and 2 votes for 0, the Random Forest ensemble predicts class 1.',
      quickChips: [
        'const ones = treeVotes.filter(v => v === 1).length;',
        'const zeros = treeVotes.filter(v => v === 0).length;',
        'console.log("Ensemble prediction:", ones > zeros ? 1 : 0);',
      ],
    },
  ],
  quiz: [
    {
      id: 'q-ml-10-1',
      question: 'What is the primary mechanism by which Random Forests prevent individual trees from being highly correlated?',
      explanation: 'At every split, Random Forests restrict the candidate split features to a random subset (typically sqrt(m)), preventing a single dominant feature from dictating every tree.',
      difficulty: 'intermediate',
      topicTag: 'data-science',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'Considering only a random subset of features at each split', isCorrect: true },
        { id: 'opt-b', text: 'Using only a single training sample per tree', isCorrect: false },
        { id: 'opt-c', text: 'Forcing all trees to have identical depths', isCorrect: false },
        { id: 'opt-d', text: 'Inverting all negative numbers to positive', isCorrect: false },
      ],
    },
    {
      id: 'q-ml-10-2',
      question: 'In Bootstrap sampling with replacement from a dataset of size n, approximately what percentage of samples are left out (Out-of-Bag)?',
      explanation: 'As n grows, (1 - 1/n)^n converges to 1/e, which is approximately 36.8% (commonly cited as ~37%).',
      difficulty: 'advanced',
      topicTag: 'data-science',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'Approximately 36.8%', isCorrect: true },
        { id: 'opt-b', text: '0% (all samples are included)', isCorrect: false },
        { id: 'opt-c', text: '75%', isCorrect: false },
        { id: 'opt-d', text: '50% exactly', isCorrect: false },
      ],
    },
    {
      id: 'q-ml-10-3',
      question: 'How does an ensemble of decision trees (Random Forest) affect the Bias-Variance tradeoff compared to a single deep decision tree?',
      explanation: 'Averaging predictions across diverse low-bias trees significantly reduces variance without increasing bias.',
      difficulty: 'intermediate',
      topicTag: 'data-science',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'It drastically reduces variance while maintaining low bias', isCorrect: true },
        { id: 'opt-b', text: 'It increases variance to infinity', isCorrect: false },
        { id: 'opt-c', text: 'It converts the model into linear regression', isCorrect: false },
        { id: 'opt-d', text: 'It eliminates the need for any features', isCorrect: false },
      ],
    },
    {
      id: 'q_machinelearning_10_auto_4',
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
      id: 'q_machinelearning_10_auto_5',
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
      id: 'q_machinelearning_10_auto_6',
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
      id: 'q_machinelearning_10_auto_7',
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
      id: 'q_machinelearning_10_auto_8',
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
      id: 'q_machinelearning_10_auto_9',
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
      id: 'q_machinelearning_10_auto_10',
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
