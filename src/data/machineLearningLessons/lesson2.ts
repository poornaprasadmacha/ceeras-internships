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
  ],
};
