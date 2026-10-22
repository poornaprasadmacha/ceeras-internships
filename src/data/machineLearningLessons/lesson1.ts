import { MLLessonDefinition } from '../../types/machineLearningLesson';

export const mlLesson1: MLLessonDefinition = {
  id: 'ml-lesson-1',
  number: 1,
  slug: 'intro-to-machine-learning-paradigms',
  title: 'Introduction to Machine Learning & Core Paradigms',
  shortDescription: 'Explore the fundamental philosophy of machine learning, how algorithms learn from data, and the three major paradigms: Supervised, Unsupervised, and Reinforcement Learning.',
  estimatedMinutes: 9,
  learningObjectives: [
    'Contrast classical rule-based programming with data-driven machine learning',
    'Distinguish between Supervised Learning, Unsupervised Learning, and Reinforcement Learning',
    'Structure problem spaces into feature matrices (X) and target vectors (y)',
  ],
  prerequisites: ['Basic high-school algebra and enthusiasm for artificial intelligence!'],
  sections: [
    {
      id: 'sec-ml-1-1',
      title: 'Classical Programming vs. Machine Learning',
      content: `In classical programming, human software engineers write explicit rules and algorithms:
$$\\text{Data} + \\text{Rules} \\longrightarrow \\text{Answers}$$

In **Machine Learning (ML)**, we invert this relationship. We provide data along with known answers (labels), and the computer algorithm discovers the underlying statistical rules:
$$\\text{Data} + \\text{Answers} \\longrightarrow \\text{Learned Rules (Model)}$$

Once trained, the learned model accepts new, previously unseen data to make predictions or decisions autonomously.`,
    },
    {
      id: 'sec-ml-1-2',
      title: 'The Three Pillars of Machine Learning',
      content: `1. **Supervised Learning**:
   • The model trains on labeled data $(X, y)$.
   • **Regression**: Predicts continuous numerical values (e.g. house price, temperature).
   • **Classification**: Predicts discrete categories (e.g. spam vs. not spam, fraud vs. legitimate).

2. **Unsupervised Learning**:
   • The data has features $X$ but **no labels $y$**.
   • The goal is discovering inherent groupings or structures (e.g. customer segmentation via K-Means, dimensionality reduction via PCA).

3. **Reinforcement Learning (RL)**:
   • An autonomous agent learns by interacting with an environment, taking actions, and maximizing cumulative numerical rewards (e.g. robotics, game playing agents like AlphaGo).`,
    },
    {
      id: 'sec-ml-1-3',
      title: 'Feature Matrices (X) and Target Vectors (y)',
      content: `By convention in modern machine learning:
• **$X$ (Capitalized)**: A 2D matrix of shape $(n, m)$, where $n$ is the number of observations and $m$ is the number of input features.
• **$y$ (Lowercase)**: A 1D array of shape $(n,)$ containing the target ground-truth label for each observation.`,
    },
  ],
  exercises: [
    {
      id: 'ml-ex-1-1',
      lessonId: 'ml-lesson-1',
      order: 1,
      title: 'Inspect Feature Dimensions & Observation Counts',
      objective: 'Inspect the active housing dataset using ml.X and ml.y. Print the total number of training samples and the number of features per sample.',
      dataset: {
        name: 'house_features.csv',
        featureNames: ['sqft', 'bedrooms', 'age_years'],
        targetName: 'price_usd',
        rows: [
          { features: [1200, 2, 10], target: 240000 },
          { features: [1600, 3, 5], target: 310000 },
          { features: [2100, 4, 2], target: 420000 },
          { features: [950, 1, 25], target: 185000 },
          { features: [1800, 3, 8], target: 350000 },
        ],
        description: 'Sample residential real estate features and market sale prices',
      },
      initialCode: `// 1. Get total observations count: ml.X.length
// 2. Get number of features per sample: ml.X[0].length
// Print "Samples:" followed by observations count
// Print "Features:" followed by feature count

`,
      solutionCode: `console.log("Samples:", ml.X.length);
console.log("Features:", ml.X[0].length);`,
      expectedOutput: `Samples: 5
Features: 3`,
      hint: 'Log ml.X.length and ml.X[0].length.',
      explanation: 'The matrix X contains 5 rows (samples) and 3 columns (sqft, bedrooms, age_years).',
      quickChips: [
        'console.log("Samples:", ml.X.length);',
        'console.log("Features:", ml.X[0].length);',
      ],
    },
  ],
  quiz: [
    {
      id: 'q-ml-1-1',
      question: 'Which paradigm of machine learning is utilized when training a model with historical loan repayment records containing both applicant credit scores and their default status (repaid / defaulted)?',
      explanation: 'Because ground-truth outcome labels (default status) are provided alongside features, this is Supervised Learning.',
      difficulty: 'beginner',
      topicTag: 'data-science',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'Supervised Learning', isCorrect: true },
        { id: 'opt-b', text: 'Unsupervised Learning', isCorrect: false },
        { id: 'opt-c', text: 'Reinforcement Learning', isCorrect: false },
        { id: 'opt-d', text: 'Evolutionary Algorithmic Search', isCorrect: false },
      ],
    },
    {
      id: 'q-ml-1-2',
      question: 'What is the primary difference between a Regression task and a Classification task in supervised learning?',
      explanation: 'Regression predicts continuous numerical quantities; classification predicts discrete categorical labels.',
      difficulty: 'beginner',
      topicTag: 'data-science',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'Regression predicts continuous numbers; classification predicts discrete categories', isCorrect: true },
        { id: 'opt-b', text: 'Regression uses images; classification only uses text', isCorrect: false },
        { id: 'opt-c', text: 'Classification requires no training data', isCorrect: false },
        { id: 'opt-d', text: 'Regression models cannot make errors', isCorrect: false },
      ],
    },
    {
      id: 'q-ml-1-3',
      question: 'In standard mathematical and code notation for machine learning, why is the feature matrix X written in uppercase while the target y is lowercase?',
      explanation: 'X represents a 2D matrix (uppercase by linear algebra convention), whereas y represents a 1D vector (lowercase).',
      difficulty: 'intermediate',
      topicTag: 'data-science',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'X is a 2D matrix of features; y is a 1D vector of labels', isCorrect: true },
        { id: 'opt-b', text: 'X is always encrypted on disk', isCorrect: false },
        { id: 'opt-c', text: 'y is an optional parameter', isCorrect: false },
        { id: 'opt-d', text: 'There is no reason; it is completely arbitrary', isCorrect: false },
      ],
    },
    {
      id: 'q_machinelearning_1_auto_4',
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
      id: 'q_machinelearning_1_auto_5',
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
      id: 'q_machinelearning_1_auto_6',
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
      id: 'q_machinelearning_1_auto_7',
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
      id: 'q_machinelearning_1_auto_8',
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
      id: 'q_machinelearning_1_auto_9',
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
      id: 'q_machinelearning_1_auto_10',
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
