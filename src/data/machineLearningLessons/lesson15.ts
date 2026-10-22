import { MLLessonDefinition } from '../../types/machineLearningLesson';

export const mlLesson15: MLLessonDefinition = {
  id: 'ml-lesson-15',
  number: 15,
  slug: 'neural-networks-and-deep-learning',
  title: 'Neural Networks: Perceptrons & Deep Learning Foundations',
  shortDescription: 'Bridge traditional machine learning and deep learning: construct artificial neurons, apply non-linear activations (ReLU, Sigmoid), and understand forward and backward propagation.',
  estimatedMinutes: 14,
  learningObjectives: [
    'Trace the mathematical architecture of the Artificial Neuron (Perceptron)',
    'Explain why non-linear activation functions (ReLU, Sigmoid) are essential to prevent deep networks from collapsing into linear models',
    'Understand the two-phase learning cycle: Forward Propagation (inference) and Backpropagation (gradient chain rule updates)',
  ],
  prerequisites: ['Dimensionality Reduction: PCA'],
  sections: [
    {
      id: 'sec-ml-15-1',
      title: 'The Artificial Neuron (Perceptron)',
      content: `Inspired by biological brain synapses, the **Artificial Neuron** forms the elementary building block of deep learning:
1. **Inputs ($x$)**: Incoming numerical signals $[x_1, x_2, \\dots, x_m]$.
2. **Weights ($w$)**: Strength/importance of each connection.
3. **Linear Accumulation**: Weighted sum plus bias:
   $$z = \\sum_{i=1}^{m} w_i x_i + b = w^T x + b$$
4. **Activation Function ($f$)**: Produces the final activation output $a = f(z)$.`,
    },
    {
      id: 'sec-ml-15-2',
      title: 'Why Non-Linear Activations Are Mandatory',
      content: `If we do not include a non-linear activation function between layers:
$$y = W_3(W_2(W_1 x)) = (W_3 W_2 W_1) x = W_{\\text{combined}} x$$
A 100-layer deep network would collapse into a trivial single-layer linear regression!

Non-linear activations allow networks to learn arbitrary, complex continuous functions (**Universal Approximation Theorem**):
• **ReLU (Rectified Linear Unit)**:
  $$f(z) = \\max(0, z)$$
  Computationally fast, avoids vanishing gradients, and serves as the modern deep learning default.
• **Sigmoid**: $\\sigma(z) = \\frac{1}{1 + e^{-z}}$ (used in output layers for binary probabilities).
• **Softmax**: Generalizes sigmoid to multiclass probability distributions summing to $1.0$.`,
    },
    {
      id: 'sec-ml-15-3',
      title: 'Forward Propagation & Backpropagation',
      content: `A **Multilayer Perceptron (MLP)** organizes neurons into layers:
• **Input Layer $\\longrightarrow$ Hidden Layer(s) $\\longrightarrow$ Output Layer**

The learning cycle operates in two phases:
1. **Forward Propagation**: Input data flows through weights and activations layer-by-layer to generate a final prediction $\\hat{y}$ and compute loss $L$.
2. **Backpropagation**: Uses the calculus **Chain Rule** to compute the gradient of loss with respect to every weight in the network ($\\frac{\\partial L}{\\partial w_{ij}}$), updating all parameters via Gradient Descent:
   $$w_{ij} := w_{ij} - \\alpha \\frac{\\partial L}{\\partial w_{ij}}$$`,
    },
  ],
  exercises: [
    {
      id: 'ml-ex-15-1',
      lessonId: 'ml-lesson-15',
      order: 1,
      title: 'Compute Forward Pass of an Artificial Neuron with ReLU',
      objective: 'Given inputs x = [2, 3], weights w = [0.5, -0.2], bias b = 0.1, calculate the linear sum z = w^T x + b and output activation a = Math.max(0, z).',
      initialCode: `const x = [2, 3];
const w = [0.5, -0.2];
const b = 0.1;

// 1. Calculate linear sum: z = (x[0] * w[0]) + (x[1] * w[1]) + b
// 2. Apply ReLU activation: a = Math.max(0, z)
// Print "Linear sum z:" followed by Number(z.toFixed(2))
// Print "ReLU activation a:" followed by Number(a.toFixed(2))

`,
      solutionCode: `const x = [2, 3];
const w = [0.5, -0.2];
const b = 0.1;

const z = x[0] * w[0] + x[1] * w[1] + b;
const a = Math.max(0, z);

console.log("Linear sum z:", Number(z.toFixed(2)));
console.log("ReLU activation a:", Number(a.toFixed(2)));`,
      expectedOutput: `Linear sum z: 0.5
ReLU activation a: 0.5`,
      hint: 'z is (2 * 0.5) + (3 * -0.2) + 0.1 = 1.0 - 0.6 + 0.1 = 0.5. Since 0.5 > 0, ReLU(0.5) = 0.5.',
      explanation: 'The linear accumulation produces 0.5, and the ReLU activation passes positive values through unchanged.',
      quickChips: [
        'const z = x[0] * w[0] + x[1] * w[1] + b;',
        'const a = Math.max(0, z);',
        'console.log("Linear sum z:", Number(z.toFixed(2)));',
        'console.log("ReLU activation a:", Number(a.toFixed(2)));',
      ],
    },
  ],
  quiz: [
    {
      id: 'q-ml-15-1',
      question: 'Why are non-linear activation functions like ReLU or Sigmoid essential between layers in deep neural networks?',
      explanation: 'Without non-linear activations, stacking multiple layers mathematically collapses into a single linear regression, preventing the network from learning complex curves or non-linear patterns.',
      difficulty: 'intermediate',
      topicTag: 'data-science',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'Without them, stacking multiple layers collapses mathematically into a single linear model', isCorrect: true },
        { id: 'opt-b', text: 'To ensure all weights become negative numbers', isCorrect: false },
        { id: 'opt-c', text: 'Because computers cannot calculate matrix multiplication', isCorrect: false },
        { id: 'opt-d', text: 'To automatically delete half the neurons', isCorrect: false },
      ],
    },
    {
      id: 'q-ml-15-2',
      question: 'What mathematical rule from calculus serves as the foundational engine of Backpropagation in neural networks?',
      explanation: 'The Chain Rule of calculus enables the computation of gradients across composite, multi-layered functions from output back to input.',
      difficulty: 'advanced',
      topicTag: 'data-science',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'The Chain Rule of Calculus', isCorrect: true },
        { id: 'opt-b', text: 'Pythagorean Theorem', isCorrect: false },
        { id: 'opt-c', text: 'Bayes Theorem alone', isCorrect: false },
        { id: 'opt-d', text: 'Fibonacci recurrence', isCorrect: false },
      ],
    },
    {
      id: 'q-ml-15-3',
      question: 'What is the output of the ReLU activation function f(z) = max(0, z) when the input logit z is -4.5?',
      explanation: 'ReLU outputs 0 for any negative input value (max(0, -4.5) = 0).',
      difficulty: 'beginner',
      topicTag: 'data-science',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: '0', isCorrect: true },
        { id: 'opt-b', text: '-4.5', isCorrect: false },
        { id: 'opt-c', text: '4.5', isCorrect: false },
        { id: 'opt-d', text: '1', isCorrect: false },
      ],
    },
    {
      id: 'q_machinelearning_15_auto_4',
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
      id: 'q_machinelearning_15_auto_5',
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
      id: 'q_machinelearning_15_auto_6',
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
      id: 'q_machinelearning_15_auto_7',
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
      id: 'q_machinelearning_15_auto_8',
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
      id: 'q_machinelearning_15_auto_9',
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
      id: 'q_machinelearning_15_auto_10',
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
