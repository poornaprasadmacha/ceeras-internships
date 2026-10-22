import { MLLessonDefinition } from '../../types/machineLearningLesson';

export const mlLesson14: MLLessonDefinition = {
  id: 'ml-lesson-14',
  number: 14,
  slug: 'dimensionality-reduction-pca',
  title: 'Dimensionality Reduction: PCA',
  shortDescription: 'Compress high-dimensional datasets into principal components using Principal Component Analysis (PCA), maximize preserved variance, and enable 2D/3D visualizations.',
  estimatedMinutes: 13,
  learningObjectives: [
    'Explain the geometric motivation for dimensionality reduction and data compression',
    'Understand how Principal Components identify axes of maximum statistical variance',
    'Standardize multi-feature spaces with ml.StandardScaler() and evaluate Explained Variance Ratios',
  ],
  prerequisites: ['Unsupervised Learning: K-Means Clustering'],
  sections: [
    {
      id: 'sec-ml-14-1',
      title: 'The Challenge of High Dimensions',
      content: `Datasets in genomics, finance, and computer vision can easily contain hundreds or thousands of features ($m > 1000$):
• Humans cannot visualize data beyond 3 dimensions.
• Highly correlated features cause multicollinearity in linear models.
• Models suffer from the curse of dimensionality, requiring exponential samples to avoid overfitting.

**Dimensionality Reduction** projects data into a lower-dimensional subspace while preserving as much meaningful statistical variation as possible.`,
    },
    {
      id: 'sec-ml-14-2',
      title: 'Principal Component Analysis (PCA)',
      content: `**PCA** is an unsupervised linear technique:
1. **Center and Standardize**: Subtract mean $\\mu$ and divide by standard deviation $\\sigma$ for each feature.
2. **Covariance Matrix**: Calculate pairwise feature correlations:
   $$\\Sigma = \\frac{1}{n} X^T X$$
3. **Eigen-decomposition**:
   • **Eigenvectors**: Point in the directions of maximum spread (Principal Components $PC_1, PC_2, \\dots$).
   • **Eigenvalues**: Represent the magnitude of variance captured along each component.
4. **Projection**: Rotate and project raw observations onto the top $K$ principal axes.`,
    },
    {
      id: 'sec-ml-14-3',
      title: 'Explained Variance Ratio',
      content: `The **Explained Variance Ratio** indicates what percentage of the total information in the original $m$ features is captured by each principal component:
$$\\text{EVR}_j = \\frac{\\lambda_j}{\\sum_{i=1}^{m} \\lambda_i}$$

For instance, if $PC_1$ captures $72\\%$ of total variance and $PC_2$ captures $18\\%$, a 2D scatter plot using just these two components preserves a remarkable **$90\\%$ of the complete dataset information**!`,
    },
  ],
  exercises: [
    {
      id: 'ml-ex-14-1',
      lessonId: 'ml-lesson-14',
      order: 1,
      title: 'Standardize Features for PCA Projection',
      objective: 'Using ml.StandardScaler(), standardize the provided 2D dataset so that features have mean = 0, and print the standardized values of the first sample.',
      dataset: {
        name: 'sensor_metrics.csv',
        featureNames: ['temperature_c', 'pressure_psi'],
        targetName: 'status',
        rows: [
          { features: [20, 100], target: 'Normal' },
          { features: [25, 150], target: 'Normal' },
          { features: [30, 200], target: 'Warning' },
        ],
        description: 'Industrial sensor readings on different numerical scales',
      },
      initialCode: `// 1. Initialize scaler: const scaler = new ml.StandardScaler();
// 2. Standardize features: const scaledX = scaler.fitTransform(ml.X);
// 3. Print "Sample 1 scaled:" followed by scaledX[0]

`,
      solutionCode: `const scaler = new ml.StandardScaler();
const scaledX = scaler.fitTransform(ml.X);
console.log("Sample 1 scaled:", scaledX[0]);`,
      expectedOutput: `Sample 1 scaled: [-1.225,-1.225]`,
      hint: 'Call new ml.StandardScaler(), fitTransform(ml.X), and log scaledX[0].',
      explanation: 'The scaler shifted the first sample (20°C, 100psi) to -1.225 standard deviations below the mean on both axes, equalizing feature scales.',
      quickChips: [
        'const scaler = new ml.StandardScaler();',
        'const scaledX = scaler.fitTransform(ml.X);',
        'console.log("Sample 1 scaled:", scaledX[0]);',
      ],
    },
  ],
  quiz: [
    {
      id: 'q-ml-14-1',
      question: 'What defines the direction of the First Principal Component (PC1) in PCA?',
      explanation: 'The first principal component is the linear combination of features that accounts for the maximum possible variance in the dataset.',
      difficulty: 'intermediate',
      topicTag: 'data-science',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'The axis along which the dataset exhibits the maximum variance', isCorrect: true },
        { id: 'opt-b', text: 'The horizontal X axis of the computer screen', isCorrect: false },
        { id: 'opt-c', text: 'The line that passes through the largest number of zeros', isCorrect: false },
        { id: 'opt-d', text: 'The direction that minimizes total data variance', isCorrect: false },
      ],
    },
    {
      id: 'q-ml-14-2',
      question: 'Why are Principal Components guaranteed to be orthogonal (at 90-degree right angles) to one another?',
      explanation: 'Orthogonality ensures that each successive principal component captures completely distinct, uncorrelated variance from the previous ones.',
      difficulty: 'advanced',
      topicTag: 'data-science',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'To ensure each component captures independent, mutually uncorrelated information', isCorrect: true },
        { id: 'opt-b', text: 'Because computer screens can only draw right angles', isCorrect: false },
        { id: 'opt-c', text: 'To prevent the dataset from using floating point numbers', isCorrect: false },
        { id: 'opt-d', text: 'To delete negative numbers from the matrix', isCorrect: false },
      ],
    },
    {
      id: 'q-ml-14-3',
      question: 'If the top 2 principal components of a 50-feature dataset have an Explained Variance Ratio sum of 0.88, what does this tell us?',
      explanation: 'A 2D projection using PC1 and PC2 preserves 88% of the total variance and statistical information contained in the original 50 features.',
      difficulty: 'beginner',
      topicTag: 'data-science',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'A 2D plot preserves 88% of the statistical information from the original 50 features', isCorrect: true },
        { id: 'opt-b', text: 'The model has an error rate of 88%', isCorrect: false },
        { id: 'opt-c', text: 'Only 12 rows of data can be processed', isCorrect: false },
        { id: 'opt-d', text: 'The dataset has 88 duplicate columns', isCorrect: false },
      ],
    },
    {
      id: 'q_machinelearning_14_auto_4',
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
      id: 'q_machinelearning_14_auto_5',
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
      id: 'q_machinelearning_14_auto_6',
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
      id: 'q_machinelearning_14_auto_7',
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
      id: 'q_machinelearning_14_auto_8',
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
      id: 'q_machinelearning_14_auto_9',
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
      id: 'q_machinelearning_14_auto_10',
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
