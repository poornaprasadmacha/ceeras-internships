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
  ],
};
