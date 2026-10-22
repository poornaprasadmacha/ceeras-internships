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
    {
      id: 'q_machinelearning_3_auto_4',
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
      id: 'q_machinelearning_3_auto_5',
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
      id: 'q_machinelearning_3_auto_6',
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
      id: 'q_machinelearning_3_auto_7',
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
      id: 'q_machinelearning_3_auto_8',
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
      id: 'q_machinelearning_3_auto_9',
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
      id: 'q_machinelearning_3_auto_10',
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
