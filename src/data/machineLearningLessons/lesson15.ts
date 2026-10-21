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
  ],
};
