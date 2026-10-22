import { MLLessonDefinition } from '../../types/machineLearningLesson';

export const mlLesson8: MLLessonDefinition = {
  id: 'ml-lesson-8',
  number: 8,
  slug: 'k-nearest-neighbors-algorithm',
  title: 'K-Nearest Neighbors (KNN)',
  shortDescription: 'Implement non-parametric instance-based learning using Euclidean distances, explore the bias-variance trade-off in k selection, and understand the curse of dimensionality.',
  estimatedMinutes: 11,
  learningObjectives: [
    'Explain the mechanics of instance-based "lazy learning" without explicit training phase',
    'Calculate Euclidean distance between multi-dimensional feature vectors',
    'Tune the hyperparameter k to balance overfitting (small k) and oversmoothing (large k)',
  ],
  prerequisites: ['Classification Metrics & ROC Curves'],
  sections: [
    {
      id: 'sec-ml-8-1',
      title: 'Instance-Based Learning',
      content: `Unlike linear models that learn mathematical parameter weights $w$, **K-Nearest Neighbors (KNN)** is a **lazy learner**:
• Training consists solely of storing all feature vectors in memory.
• Inference: Given a new query point $x_q$, the algorithm:
  1. Computes the geometric distance from $x_q$ to all stored training samples.
  2. Identifies the $k$ closest neighbors.
  3. Predicts the majority vote class (classification) or average value (regression).`,
    },
    {
      id: 'sec-ml-8-2',
      title: 'Distance Metrics',
      content: `The most common distance metric is **Euclidean Distance**:
$$d(p, q) = \\sqrt{\\sum_{i=1}^{m} (p_i - q_i)^2}$$

Because distances depend directly on numerical coordinates, **feature scaling is mandatory** for KNN! Without scaling, a feature like Annual Income ($30,000 - 150,000$) completely overwhelms Age ($18 - 80$).`,
    },
    {
      id: 'sec-ml-8-3',
      title: 'Selecting the Optimal k',
      content: `• **$k = 1$**: Nearest neighbor only. Creates jagged decision boundaries that wrap tightly around individual training outliers (**High Variance / Overfitting**).
• **Large $k$ (e.g. $k = 50$)**: Averages over large neighborhoods, masking subtle local boundaries (**High Bias / Underfitting**).
• In binary classification, choosing an **odd number** for $k$ (e.g. $k=3, 5, 7$) eliminates the possibility of voting ties.`,
    },
  ],
  exercises: [
    {
      id: 'ml-ex-8-1',
      lessonId: 'ml-lesson-8',
      order: 1,
      title: 'Classify Query Point with KNN (k = 3)',
      objective: 'Fit a KNN model with k = 3 on the provided 2D dataset and predict the class of query point [5, 5].',
      dataset: {
        name: 'spatial_clusters.csv',
        featureNames: ['x1', 'x2'],
        targetName: 'class_label',
        rows: [
          { features: [1, 2], target: 0 },
          { features: [2, 1], target: 0 },
          { features: [2, 3], target: 0 },
          { features: [6, 5], target: 1 },
          { features: [5, 7], target: 1 },
          { features: [6, 6], target: 1 },
        ],
        description: 'Two spatial clusters in 2D Euclidean space',
      },
      initialCode: `// 1. Initialize KNN with k = 3: const knn = new ml.KNN(3);
// 2. Fit model: knn.fit(ml.X, ml.y);
// 3. Predict for query point [[5, 5]]: const pred = knn.predict([[5, 5]]);
// 4. Print "Predicted class:" followed by pred[0]

`,
      solutionCode: `const knn = new ml.KNN(3);
knn.fit(ml.X, ml.y);
const pred = knn.predict([[5, 5]]);
console.log("Predicted class:", pred[0]);`,
      expectedOutput: `Predicted class: 1`,
      hint: 'Initialize new ml.KNN(3), fit on ml.X and ml.y, then predict for [[5, 5]].',
      explanation: 'The 3 closest neighbors to [5, 5] are [6, 5], [6, 6], and [5, 7], all belonging to class 1. The majority vote is 1.',
      quickChips: [
        'const knn = new ml.KNN(3);',
        'knn.fit(ml.X, ml.y);',
        'const pred = knn.predict([[5, 5]]);',
        'console.log("Predicted class:", pred[0]);',
      ],
    },
  ],
  quiz: [
    {
      id: 'q-ml-8-1',
      question: 'Why is it critical to normalize or standardize numerical features before running the K-Nearest Neighbors algorithm?',
      explanation: 'KNN computes Euclidean distances between coordinate points; features with large ranges will dominate the distance computation unless normalized.',
      difficulty: 'beginner',
      topicTag: 'data-science',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'Features with large numerical ranges will dominate the distance calculation over small features', isCorrect: true },
        { id: 'opt-b', text: 'KNN cannot process positive numbers', isCorrect: false },
        { id: 'opt-c', text: 'To convert 2D coordinates into text', isCorrect: false },
        { id: 'opt-d', text: 'KNN requires all inputs to sum to zero', isCorrect: false },
      ],
    },
    {
      id: 'q-ml-8-2',
      question: 'What is a major computational disadvantage of K-Nearest Neighbors during inference/prediction time on massive datasets?',
      explanation: 'KNN must calculate the distance from the query point to every single observation in the training database, making prediction slow for large n.',
      difficulty: 'intermediate',
      topicTag: 'data-science',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'Inference requires calculating distances to every stored training sample, which is slow for large datasets', isCorrect: true },
        { id: 'opt-b', text: 'KNN can never achieve more than 50% accuracy', isCorrect: false },
        { id: 'opt-c', text: 'KNN models can only predict odd numbers', isCorrect: false },
        { id: 'opt-d', text: 'The model cannot run on CPUs', isCorrect: false },
      ],
    },
    {
      id: 'q-ml-8-3',
      question: 'What is the "Curse of Dimensionality" in the context of distance-based algorithms like KNN?',
      explanation: 'In high-dimensional spaces, data points become exponentially sparse and all pairwise distances converge to roughly the same value.',
      difficulty: 'advanced',
      topicTag: 'data-science',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'As dimensions grow, space expands exponentially and points become equidistant, reducing distance usefulness', isCorrect: true },
        { id: 'opt-b', text: 'Computers cannot store more than 3 dimensions', isCorrect: false },
        { id: 'opt-c', text: 'The loss function becomes infinite at dimension 5', isCorrect: false },
        { id: 'opt-d', text: 'Datasets with more than 2 features cannot be split', isCorrect: false },
      ],
    },
    {
      id: 'q_machinelearning_8_auto_4',
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
      id: 'q_machinelearning_8_auto_5',
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
      id: 'q_machinelearning_8_auto_6',
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
      id: 'q_machinelearning_8_auto_7',
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
      id: 'q_machinelearning_8_auto_8',
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
      id: 'q_machinelearning_8_auto_9',
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
      id: 'q_machinelearning_8_auto_10',
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
