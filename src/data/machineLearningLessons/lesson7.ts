import { MLLessonDefinition } from '../../types/machineLearningLesson';

export const mlLesson7: MLLessonDefinition = {
  id: 'ml-lesson-7',
  number: 7,
  slug: 'classification-evaluation-metrics',
  title: 'Classification Metrics & ROC Curves',
  shortDescription: 'Assess classification performance beyond misleading raw accuracy using Confusion Matrices, Precision, Recall, F1-Scores, and ROC-AUC curves.',
  estimatedMinutes: 12,
  learningObjectives: [
    'Construct and interpret a complete 2x2 Confusion Matrix',
    'Calculate Accuracy, Precision, Recall, and the harmonic F1-Score',
    'Interpret Receiver Operating Characteristic (ROC) curves and Area Under the Curve (AUC)',
  ],
  prerequisites: ['Logistic Regression & The Sigmoid Function'],
  sections: [
    {
      id: 'sec-ml-7-1',
      title: 'The Accuracy Paradox',
      content: `Consider a credit card fraud detection system where only $0.1\\%$ of transactions are fraudulent. A naive "dummy" model that predicts every single transaction is legitimate achieves **$99.9\\%$ raw accuracy**—while completely failing to catch a single fraud!

In real-world applications with imbalanced classes, raw accuracy is deeply misleading. We must inspect detailed error topologies using the **Confusion Matrix**.`,
    },
    {
      id: 'sec-ml-7-2',
      title: 'The Confusion Matrix Topology',
      content: `| | Predicted Positive | Predicted Negative |
|---|---|---|
| **Actual Positive** | **True Positive (TP)** | **False Negative (FN)** *(Type II)* |
| **Actual Negative** | **False Positive (FP)** *(Type I)* | **True Negative (TN)** |

• **Precision**: $\\frac{TP}{TP + FP}$ (Quality of positive alerts; reduces false alarms).
• **Recall (Sensitivity)**: $\\frac{TP}{TP + FN}$ (Coverage of actual cases; vital for cancer screening).
• **F1-Score**: Harmonic mean:
$$F_1 = 2 \\times \\frac{\\text{Precision} \\times \\text{Recall}}{\\text{Precision} + \\text{Recall}}$$`,
    },
    {
      id: 'sec-ml-7-3',
      title: 'ROC Curves and AUC',
      content: `A **Receiver Operating Characteristic (ROC) curve** plots:
• **True Positive Rate (Recall)** on the $Y$-axis.
• **False Positive Rate (FPR = FP / (FP + TN))** on the $X$-axis.

As the classification threshold sweeps from $1.0$ down to $0.0$, the curve traces model discriminative ability:
• **$\\text{AUC} = 0.5$**: Equivalent to random coin flipping.
• **$\\text{AUC} = 1.0$**: Perfect separation between classes with zero overlap.`,
    },
  ],
  exercises: [
    {
      id: 'ml-ex-7-1',
      lessonId: 'ml-lesson-7',
      order: 1,
      title: 'Compute Precision, Recall and Render Confusion Matrix',
      objective: 'Using ml.metrics on yTrue = [1, 1, 1, 0, 0, 0] and yPred = [1, 1, 0, 0, 0, 1], compute Precision, Recall, and plot the confusion matrix.',
      initialCode: `const yTrue = [1, 1, 1, 0, 0, 0];
const yPred = [1, 1, 0, 0, 0, 1];

// 1. Calculate Precision: ml.metrics.precision(yTrue, yPred)
// 2. Calculate Recall: ml.metrics.recall(yTrue, yPred)
// Print "Precision:" followed by precision
// Print "Recall:" followed by recall
// 3. Render heatmap: plot.confusionMatrix([[2, 1], [1, 2]], ["Positive", "Negative"]);

`,
      solutionCode: `const yTrue = [1, 1, 1, 0, 0, 0];
const yPred = [1, 1, 0, 0, 0, 1];

const precision = ml.metrics.precision(yTrue, yPred);
const recall = ml.metrics.recall(yTrue, yPred);

console.log("Precision:", precision);
console.log("Recall:", recall);
plot.confusionMatrix([[2, 1], [1, 2]], ["Positive", "Negative"]);`,
      expectedOutput: `Precision: 0.667
Recall: 0.667`,
      hint: 'Call ml.metrics.precision(yTrue, yPred) and ml.metrics.recall(yTrue, yPred). Then call plot.confusionMatrix().',
      explanation: 'TP = 2, FP = 1, FN = 1, TN = 2. Precision = 2/(2+1) = 0.667. Recall = 2/(2+1) = 0.667.',
      quickChips: [
        'const precision = ml.metrics.precision(yTrue, yPred);',
        'const recall = ml.metrics.recall(yTrue, yPred);',
        'console.log("Precision:", precision);',
        'console.log("Recall:", recall);',
        'plot.confusionMatrix([[2, 1], [1, 2]], ["Positive", "Negative"]);',
      ],
    },
  ],
  quiz: [
    {
      id: 'q-ml-7-1',
      question: 'In an airport security screening scanner, what kind of error occurs if a harmless bottle of shampoo is mistakenly flagged as a threat?',
      explanation: 'A false alarm on a benign object is a False Positive (Type I error).',
      difficulty: 'beginner',
      topicTag: 'data-science',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'False Positive (Type I error)', isCorrect: true },
        { id: 'opt-b', text: 'False Negative (Type II error)', isCorrect: false },
        { id: 'opt-c', text: 'True Negative', isCorrect: false },
        { id: 'opt-d', text: 'Overfitting exception', isCorrect: false },
      ],
    },
    {
      id: 'q-ml-7-2',
      question: 'What does an Area Under the ROC Curve (AUC) of 0.5 indicate about a binary classification model?',
      explanation: 'An AUC of 0.5 represents performance no better than random guessing (e.g. flipping an unbiased coin).',
      difficulty: 'intermediate',
      topicTag: 'data-science',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'The model has no discriminative ability, performing like random guessing', isCorrect: true },
        { id: 'opt-b', text: 'The model has perfect 100% accuracy', isCorrect: false },
        { id: 'opt-c', text: 'The model is overfitting by exactly 50%', isCorrect: false },
        { id: 'opt-d', text: 'The training set has an equal number of rows and columns', isCorrect: false },
      ],
    },
    {
      id: 'q-ml-7-3',
      question: 'Which metric measures the fraction of relevant instances that were actually retrieved out of all positive instances in the population?',
      explanation: 'Recall (also known as Sensitivity or True Positive Rate) measures TP / (TP + FN).',
      difficulty: 'intermediate',
      topicTag: 'data-science',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'Recall (Sensitivity)', isCorrect: true },
        { id: 'opt-b', text: 'Precision', isCorrect: false },
        { id: 'opt-c', text: 'Specificity', isCorrect: false },
        { id: 'opt-d', text: 'Mean Squared Error', isCorrect: false },
      ],
    },
    {
      id: 'q_machinelearning_7_auto_4',
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
      id: 'q_machinelearning_7_auto_5',
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
      id: 'q_machinelearning_7_auto_6',
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
      id: 'q_machinelearning_7_auto_7',
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
      id: 'q_machinelearning_7_auto_8',
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
      id: 'q_machinelearning_7_auto_9',
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
      id: 'q_machinelearning_7_auto_10',
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
