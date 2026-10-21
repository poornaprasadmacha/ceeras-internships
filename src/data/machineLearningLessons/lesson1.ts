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
  ],
};
