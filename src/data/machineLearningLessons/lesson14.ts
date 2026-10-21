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
  ],
};
