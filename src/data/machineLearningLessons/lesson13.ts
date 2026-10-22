import { MLLessonDefinition } from '../../types/machineLearningLesson';

export const mlLesson13: MLLessonDefinition = {
  id: 'ml-lesson-13',
  number: 13,
  slug: 'unsupervised-kmeans-clustering',
  title: 'Unsupervised Learning: K-Means Clustering',
  shortDescription: 'Discover hidden structures and customer cohorts in unlabeled data using iterative centroid assignment, Within-Cluster Sum of Squares (Inertia), and the Elbow Method.',
  estimatedMinutes: 12,
  learningObjectives: [
    'Define the unsupervised learning paradigm where no ground-truth target labels y exist',
    'Trace the iterative two-step EM algorithm: Cluster Assignment and Centroid Update',
    'Calculate Inertia (WCSS) and apply the Elbow Method to choose the optimal number of clusters k',
  ],
  prerequisites: ['Support Vector Machines (SVM) & The Kernel Trick'],
  sections: [
    {
      id: 'sec-ml-13-1',
      title: 'Learning Without Labels',
      content: `In **Unsupervised Learning**, we are given input features $X$ but **no target labels $y$**. The algorithm must independently discover intrinsic groupings, patterns, or anomalies.

Primary applications:
• **Customer Segmentation**: Grouping shoppers by purchasing patterns for personalized marketing.
• **Genomic Clustering**: Grouping genes with similar expression levels.
• **Image Compression / Vector Quantization**: Reducing color palettes to $K$ representative colors.`,
    },
    {
      id: 'sec-ml-13-2',
      title: 'The K-Means Algorithm',
      content: `Given a chosen number of clusters $K$:
1. **Initialize**: Place $K$ centroids randomly in the feature space.
2. **Assignment Step**: Assign each data point $x_i$ to its closest centroid using Euclidean distance:
   $$c_i = \\arg\\min_{j} \\|x_i - \\mu_j\\|^2$$
3. **Update Step**: Move each centroid $\\mu_j$ to the average position of all points currently assigned to it:
   $$\\mu_j = \\frac{1}{|C_j|} \\sum_{i \\in C_j} x_i$$
4. **Repeat** steps 2 and 3 until centroids stabilize (convergence).`,
    },
    {
      id: 'sec-ml-13-3',
      title: 'Evaluating Clusters: Inertia & The Elbow Method',
      content: `• **Inertia (Within-Cluster Sum of Squares - WCSS)**:
$$\\text{Inertia} = \\sum_{j=1}^{K} \\sum_{i \\in C_j} \\|x_i - \\mu_j\\|^2$$
Lower inertia means points are clustered tightly around their centroids.

• **The Elbow Method**:
As $K$ increases, inertia naturally decreases (if $K=n$, inertia is $0$). We plot Inertia vs. $K$ and look for the "elbow"—the inflection point where adding more clusters yields rapidly diminishing returns.`,
    },
  ],
  exercises: [
    {
      id: 'ml-ex-13-1',
      lessonId: 'ml-lesson-13',
      order: 1,
      title: 'Fit K-Means (k = 2) & Inspect Centroids and Inertia',
      objective: 'Fit a KMeans model with k = 2 on the provided unlabeled customer spending dataset, print the centroid count and inertia.',
      dataset: {
        name: 'customer_spending.csv',
        featureNames: ['visits_per_month', 'avg_spend_usd'],
        targetName: 'cluster_placeholder',
        rows: [
          { features: [2, 20], target: 0 },
          { features: [3, 25], target: 0 },
          { features: [2, 30], target: 0 },
          { features: [12, 180], target: 0 },
          { features: [15, 210], target: 0 },
          { features: [14, 195], target: 0 },
        ],
        description: 'Customer store visit frequency and monthly spend without labels',
      },
      initialCode: `// 1. Initialize KMeans with k = 2: const kmeans = new ml.KMeans(2);
// 2. Fit model on ml.X: kmeans.fit(ml.X);
// 3. Print "Centroids count:" followed by kmeans.centroids.length
// 4. Print "Inertia:" followed by kmeans.inertia

`,
      solutionCode: `const kmeans = new ml.KMeans(2);
kmeans.fit(ml.X);
console.log("Centroids count:", kmeans.centroids.length);
console.log("Inertia:", kmeans.inertia);`,
      expectedOutput: `Centroids count: 2
Inertia: 533.34`,
      hint: 'Call new ml.KMeans(2), fit(ml.X), and log kmeans.centroids.length and kmeans.inertia.',
      explanation: 'The algorithm neatly discovered 2 natural customer tiers: casual low-spend shoppers and VIP frequent shoppers with an inertia of 533.34.',
      quickChips: [
        'const kmeans = new ml.KMeans(2);',
        'kmeans.fit(ml.X);',
        'console.log("Centroids count:", kmeans.centroids.length);',
        'console.log("Inertia:", kmeans.inertia);',
      ],
    },
  ],
  quiz: [
    {
      id: 'q-ml-13-1',
      question: 'In the K-Means clustering algorithm, how are the new centroid positions calculated during the Update step?',
      explanation: 'Centroids are recalculated as the arithmetic mean of all data points currently assigned to that cluster.',
      difficulty: 'beginner',
      topicTag: 'data-science',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'The arithmetic average of all data points assigned to that cluster', isCorrect: true },
        { id: 'opt-b', text: 'Random coordinates picked from a Gaussian distribution', isCorrect: false },
        { id: 'opt-c', text: 'The point with the maximum value on feature 1', isCorrect: false },
        { id: 'opt-d', text: 'By calculating the inverse matrix of the target labels', isCorrect: false },
      ],
    },
    {
      id: 'q-ml-13-2',
      question: 'What is the purpose of the "Elbow Method" when training K-Means models?',
      explanation: 'The Elbow Method plots inertia against varying values of k to determine the optimal number of clusters where the rate of improvement slows sharply.',
      difficulty: 'intermediate',
      topicTag: 'data-science',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'To identify the optimal number of clusters (k) by finding the point of diminishing returns', isCorrect: true },
        { id: 'opt-b', text: 'To delete all outliers from the training database', isCorrect: false },
        { id: 'opt-c', text: 'To measure the accuracy of neural network layers', isCorrect: false },
        { id: 'opt-d', text: 'To convert unsupervised clustering into supervised regression', isCorrect: false },
      ],
    },
    {
      id: 'q-ml-13-3',
      question: 'What happens to the Inertia (WCSS) metric if you set k equal to the total number of observations (k = n)?',
      explanation: 'When each point is its own centroid, the distance from every point to its assigned centroid is 0, so inertia becomes exactly 0.',
      difficulty: 'intermediate',
      topicTag: 'data-science',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'Inertia becomes exactly 0 (each point is its own centroid)', isCorrect: true },
        { id: 'opt-b', text: 'Inertia becomes infinite', isCorrect: false },
        { id: 'opt-c', text: 'The computer crashes due to division by zero', isCorrect: false },
        { id: 'opt-d', text: 'All data points are deleted', isCorrect: false },
      ],
    },
    {
      id: 'q_machinelearning_13_auto_4',
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
      id: 'q_machinelearning_13_auto_5',
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
      id: 'q_machinelearning_13_auto_6',
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
      id: 'q_machinelearning_13_auto_7',
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
      id: 'q_machinelearning_13_auto_8',
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
      id: 'q_machinelearning_13_auto_9',
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
      id: 'q_machinelearning_13_auto_10',
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
