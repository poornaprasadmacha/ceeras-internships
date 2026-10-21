import { MLLessonDefinition } from '../../types/machineLearningLesson';

export const mlLesson3: MLLessonDefinition = {
  id: 'ml-lesson-3',
  number: 3,
  slug: 'cost-functions-and-gradient-descent',
  title: 'Cost Functions & Gradient Descent',
  shortDescription: 'Unpack the optimization engine of machine learning: define loss functions, calculate partial derivatives, and navigate parameter surfaces using Gradient Descent.',
  estimatedMinutes: 12,
  learningObjectives: [
    'Formulate the Mean Squared Error (MSE) cost function J(w, b)',
    'Explain the geometric intuition of gradient vectors pointing in the direction of steepest ascent',
    'Tune the learning rate alpha to ensure stable convergence without overshooting or divergence',
  ],
  prerequisites: ['Data Splitting & Model Generalization'],
  sections: [
    {
      id: 'sec-ml-3-1',
      title: 'Measuring Error with Cost Functions',
      content: `To teach an algorithm how to improve, we must mathematically quantify its mistakes. A **Cost Function** $J(\\theta)$ aggregates the discrepancy between model predictions $\\hat{y}$ and actual labels $y$ across all training samples.

For regression, the standard benchmark is **Mean Squared Error (MSE)**:
$$J(w, b) = \\frac{1}{2n}\\sum_{i=1}^{n} (\\hat{y}_i - y_i)^2$$
The constant $\\frac{1}{2}$ is included for mathematical convenience, cancelling out cleanly when we compute derivatives!`,
    },
    {
      id: 'sec-ml-3-2',
      title: 'Gradient Descent Optimization',
      content: `Imagine standing blindfolded on a foggy mountain ridge. To reach the valley floor (the point of minimum error), you feel the slope beneath your feet and step in the steepest downward direction.

This is **Gradient Descent**:
$$w := w - \\alpha \\frac{\\partial J}{\\partial w}$$
$$b := b - \\alpha \\frac{\\partial J}{\\partial b}$$

• $\\frac{\\partial J}{\\partial w}$: The partial derivative (gradient) indicating the slope of the loss surface with respect to weight $w$.
• $\\alpha$ (**Learning Rate**): The step size taken on each iteration.`,
    },
    {
      id: 'sec-ml-3-3',
      title: 'Choosing the Learning Rate (alpha)',
      content: `• **Too Small**: The model takes microscopic steps, requiring thousands of epochs to converge.
• **Too Large**: The model overshoots the minimum, oscillating erratically or even diverging to infinity.
• **Optimal**: Rapid, smooth descent into the global minimum.`,
    },
  ],
  exercises: [
    {
      id: 'ml-ex-3-1',
      lessonId: 'ml-lesson-3',
      order: 1,
      title: 'Simulate Loss Convergence & Plot Curve',
      objective: 'Calculate the loss across 4 optimization iterations given the simulated loss array [100, 45, 18, 5], print the initial and final loss, and plot the loss curve.',
      initialCode: `// Given loss values over 4 gradient descent iterations:
const losses = [100, 45, 18, 5];

// 1. Print "Initial loss:" followed by losses[0]
// 2. Print "Final loss:" followed by losses[losses.length - 1]
// 3. Render loss curve: plot.lossCurve(losses, "Training Loss Convergence");

`,
      solutionCode: `const losses = [100, 45, 18, 5];
console.log("Initial loss:", losses[0]);
console.log("Final loss:", losses[losses.length - 1]);
plot.lossCurve(losses, "Training Loss Convergence");`,
      expectedOutput: `Initial loss: 100
Final loss: 5`,
      hint: 'Log losses[0] and losses[losses.length - 1] and call plot.lossCurve(losses, "Training Loss Convergence").',
      explanation: 'Loss dropped from 100 to 5 as the parameters updated along the negative gradient.',
      quickChips: [
        'const losses = [100, 45, 18, 5];',
        'console.log("Initial loss:", losses[0]);',
        'console.log("Final loss:", losses[losses.length - 1]);',
        'plot.lossCurve(losses, "Training Loss Convergence");',
      ],
    },
  ],
  quiz: [
    {
      id: 'q-ml-3-1',
      question: 'What happens during gradient descent if the learning rate alpha is set too large?',
      explanation: 'An excessively large learning rate causes steps that overshoot the valley, leading to oscillation or divergence away from the minimum.',
      difficulty: 'beginner',
      topicTag: 'data-science',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'The steps overshoot the minimum, potentially oscillating or diverging', isCorrect: true },
        { id: 'opt-b', text: 'The model converges instantly on iteration 1', isCorrect: false },
        { id: 'opt-c', text: 'The weights automatically freeze at zero', isCorrect: false },
        { id: 'opt-d', text: 'The dataset deletes all test labels', isCorrect: false },
      ],
    },
    {
      id: 'q-ml-3-2',
      question: 'In the gradient descent update equation w := w - alpha * (dJ/dw), why is there a minus sign?',
      explanation: 'The gradient points in the direction of steepest increase; moving in the negative gradient direction decreases the loss.',
      difficulty: 'intermediate',
      topicTag: 'data-science',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'Because we want to move in the opposite direction of the gradient to minimize loss', isCorrect: true },
        { id: 'opt-b', text: 'Because weights must always be negative numbers', isCorrect: false },
        { id: 'opt-c', text: 'To cancel out imaginary numbers', isCorrect: false },
        { id: 'opt-d', text: 'It is a typographical convention with no mathematical meaning', isCorrect: false },
      ],
    },
    {
      id: 'q-ml-3-3',
      question: 'When the parameter w reaches the exact bottom of a smooth convex bowl (the local or global minimum), what is the value of the gradient dJ/dw?',
      explanation: 'At the bottom of a curve, the slope (derivative) is flat, meaning the gradient is exactly 0.',
      difficulty: 'intermediate',
      topicTag: 'data-science',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: '0 (the slope is completely flat)', isCorrect: true },
        { id: 'opt-b', text: '1', isCorrect: false },
        { id: 'opt-c', text: 'Infinity', isCorrect: false },
        { id: 'opt-d', text: '-1', isCorrect: false },
      ],
    },
  ],
};
