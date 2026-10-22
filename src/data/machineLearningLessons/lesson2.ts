import { MLLessonDefinition } from '../../types/machineLearningLesson';

export const mlLesson2: MLLessonDefinition = {
  id: 'ml-lesson-2',
  number: 2,
  slug: 'train-test-split-and-generalization',
  title: 'Data Splitting & Model Generalization',
  shortDescription: 'Master model generalization, avoid the catastrophic trap of data leakage, and implement the standard Train/Test split pipeline.',
  estimatedMinutes: 10,
  learningObjectives: [
    'Define generalization and explain why evaluating on training data produces deceptive performance',
    'Execute train/test splits using ml.trainTestSplit(X, y, testSize)',
    'Identify and prevent data leakage between training and evaluation pipelines',
  ],
  prerequisites: ['Introduction to Machine Learning & Core Paradigms'],
  sections: [
    {
      id: 'sec-ml-2-1',
      title: 'The Generalization Goal',
      content: `The ultimate objective of machine learning is **generalization**: building a system that performs accurately on **unseen real-world data**, not just the examples it memorized during training.

If a student receives the exact exam questions and answers the night before a test, scoring 100% does not prove they understand the subject—it merely proves they memorized the answer key! 

Similarly, evaluating a model on the same data it learned from yields an unrealistically optimistic benchmark.`,
    },
    {
      id: 'sec-ml-2-2',
      title: 'The Train/Test Split',
      content: `To simulate how the model will perform in production on novel data, we split our raw labeled dataset into distinct partitions:
• **Training Set (typically 70% - 80%)**: Fed to the algorithm to adjust weights and parameters.
• **Test Set (typically 20% - 30%)**: Held out in a "vault" and evaluated only after model training is finalized.

\`\`\`javascript
const { XTrain, XTest, yTrain, yTest } = ml.trainTestSplit(X, y, 0.2);
console.log("Train size:", XTrain.length);
console.log("Test size:", XTest.length);
\`\`\``,
    },
    {
      id: 'sec-ml-2-3',
      title: 'Data Leakage: The Silent Model Killer',
      content: `**Data Leakage** occurs when information from outside the training dataset (such as test labels or future variables) inadvertently leaks into the model training pipeline.

Common causes:
1. Normalizing or scaling features using the mean/variance of the *entire* dataset before splitting.
2. Imputing missing values using the global median rather than the training set median alone.
3. Using future timestamped features to predict past events.`,
    },
  ],
  exercises: [
    {
      id: 'ml-ex-2-1',
      lessonId: 'ml-lesson-2',
      order: 1,
      title: 'Execute an 80/20 Train/Test Partition',
      objective: 'Split the provided 10-observation dataset into 80% training and 20% testing sets using ml.trainTestSplit(ml.X, ml.y, 0.2), and print the sizes.',
      dataset: {
        name: 'loan_applicants.csv',
        featureNames: ['credit_score', 'debt_to_income'],
        targetName: 'approved',
        rows: [
          { features: [720, 0.15], target: 1 },
          { features: [580, 0.45], target: 0 },
          { features: [690, 0.22], target: 1 },
          { features: [610, 0.38], target: 0 },
          { features: [750, 0.10], target: 1 },
          { features: [540, 0.55], target: 0 },
          { features: [800, 0.08], target: 1 },
          { features: [640, 0.30], target: 1 },
          { features: [590, 0.42], target: 0 },
          { features: [710, 0.18], target: 1 },
        ],
        description: 'Loan applicant credit risk evaluations',
      },
      initialCode: `// Use ml.trainTestSplit(ml.X, ml.y, 0.2) to partition data
// Print "Train samples:" followed by XTrain.length
// Print "Test samples:" followed by XTest.length

`,
      solutionCode: `const { XTrain, XTest } = ml.trainTestSplit(ml.X, ml.y, 0.2);
console.log("Train samples:", XTrain.length);
console.log("Test samples:", XTest.length);`,
      expectedOutput: `Train samples: 8
Test samples: 2`,
      hint: 'Call ml.trainTestSplit(ml.X, ml.y, 0.2) and log XTrain.length and XTest.length.',
      explanation: 'With 10 records and a testSize of 0.2, 8 samples go to training and 2 samples are reserved for testing.',
      quickChips: [
        'const { XTrain, XTest, yTrain, yTest } = ml.trainTestSplit(ml.X, ml.y, 0.2);',
        'console.log("Train samples:", XTrain.length);',
        'console.log("Test samples:", XTest.length);',
      ],
    },
  ],
  quiz: [
    {
      id: 'q-ml-2-1',
      question: 'Why must the test dataset never be used during the feature normalization or hyperparameter tuning phase?',
      explanation: 'Using the test set during preprocessing or training causes data leakage, giving an artificially optimistic and unrepresentative evaluation of performance.',
      difficulty: 'intermediate',
      topicTag: 'data-science',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'It creates data leakage, giving false confidence in real-world performance', isCorrect: true },
        { id: 'opt-b', text: 'Because test data uses different math than training data', isCorrect: false },
        { id: 'opt-c', text: 'It converts the test dataset into unreadable binary', isCorrect: false },
        { id: 'opt-d', text: 'Test datasets can only contain zero values', isCorrect: false },
      ],
    },
    {
      id: 'q-ml-2-2',
      question: 'In standard supervised machine learning, what typical ratio is commonly allocated to the Training partition?',
      explanation: 'Common industry splits allocate between 70% and 80% to training and 20% to 30% to testing.',
      difficulty: 'beginner',
      topicTag: 'data-science',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: '70% to 80%', isCorrect: true },
        { id: 'opt-b', text: '5%', isCorrect: false },
        { id: 'opt-c', text: '100% (no test partition needed)', isCorrect: false },
        { id: 'opt-d', text: '50% training, 50% test for all datasets regardless of size', isCorrect: false },
      ],
    },
    {
      id: 'q-ml-2-3',
      question: 'What is overfitting in machine learning?',
      explanation: 'Overfitting occurs when a model learns the detailed noise and specifics of training data too well, failing to generalize to new, unseen data.',
      difficulty: 'beginner',
      topicTag: 'data-science',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'The model memorizes training noise and performs poorly on unseen test data', isCorrect: true },
        { id: 'opt-b', text: 'The model is too simple to capture even basic patterns', isCorrect: false },
        { id: 'opt-c', text: 'The computer runs out of disk storage', isCorrect: false },
        { id: 'opt-d', text: 'The training dataset has zero errors', isCorrect: false },
      ],
    },
    {
      id: 'q_machinelearning_2_auto_4',
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
      id: 'q_machinelearning_2_auto_5',
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
      id: 'q_machinelearning_2_auto_6',
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
      id: 'q_machinelearning_2_auto_7',
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
      id: 'q_machinelearning_2_auto_8',
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
      id: 'q_machinelearning_2_auto_9',
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
      id: 'q_machinelearning_2_auto_10',
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
