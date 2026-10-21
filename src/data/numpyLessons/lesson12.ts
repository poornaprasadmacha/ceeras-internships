import { NumpyLessonDefinition } from '../../types/numpyLesson';

export const numpyLesson12: NumpyLessonDefinition = {
  id: 'numpy-lesson-12',
  number: 12,
  slug: 'random-sampling-and-distributions',
  title: 'Random Sampling, Distributions & Reproducibility',
  shortDescription: 'Simulate stochastic processes and initialize machine learning models using the numpy.random generator, normal/uniform distributions, and random seeds.',
  estimatedMinutes: 11,
  learningObjectives: [
    'Explain the mechanics of Pseudo-Random Number Generators (PRNGs) and why computers cannot generate true randomness',
    'Ensure scientific reproducibility across runs using random seeds',
    'Sample from uniform and Gaussian normal probability distributions',
  ],
  prerequisites: ['Linear Algebra: Inverses, Determinants & Norms'],
  sections: [
    {
      id: 'sec-np-12-1',
      title: 'Pseudo-Random Number Generation (PRNG)',
      content: `Computers are deterministic machines. When NumPy generates "random" numbers, it uses a mathematical algorithm (such as the Mersenne Twister) that calculates a deterministic sequence of numbers that look statistically random.

Because it is deterministic, you can lock the starting state using a **random seed**:
\`\`\`javascript
// In Python: np.random.seed(42)
\`\`\`

**Why Seeds Are Mandatory in Science**:
Without seeds, your train/test splits, neural network weight initializations, and stochastic experiments will differ on every run, making peer verification impossible. Setting a seed guarantees **100% reproducible results**.`,
    },
    {
      id: 'sec-np-12-2',
      title: 'Distributions: Uniform vs. Normal',
      content: `• **Uniform Random (\`np.random.rand\`)**:
  Every number between $[0, 1)$ has an equal likelihood of being sampled.

• **Standard Normal / Gaussian (\`np.random.randn\`)**:
  Samples follow a bell curve centered at mean $\\mu = 0$ with standard deviation $\\sigma = 1$. Most numbers cluster tightly around zero.

• **Random Integers (\`np.random.randint(low, high, size)\`)**:
  Samples discrete integers within a specified half-open range $[low, high)$.`,
    },
  ],
  exercises: [
    {
      id: 'np-ex-12-1',
      lessonId: 'numpy-lesson-12',
      order: 1,
      title: 'Generate Random Integer Samples',
      objective: 'Generate a 1D array of 5 random integers between 1 and 100 using np.random.randint(1, 100, 5), print its size and ndim.',
      initialCode: `// 1. Generate 5 random integers: np.random.randint(1, 100, 5)
// 2. Print "Sample count:" followed by samples.size
// 3. Print "Sample ndim:" followed by samples.ndim

`,
      solutionCode: `const samples = np.random.randint(1, 100, 5);

console.log("Sample count:", samples.size);
console.log("Sample ndim:", samples.ndim);`,
      expectedOutput: `Sample count: 5
Sample ndim: 1`,
      hint: 'Call np.random.randint(1, 100, 5). Log samples.size and samples.ndim.',
      explanation: 'np.random.randint(1, 100, 5) produces a 1D array of 5 discrete random integers within [1, 100).',
      quickChips: [
        'const samples = np.random.randint(1, 100, 5);',
        'console.log("Sample count:", samples.size);',
        'console.log("Sample ndim:", samples.ndim);',
      ],
    },
  ],
  quiz: [
    {
      id: 'q-np-12-1',
      question: 'Why is setting np.random.seed(42) considered a best practice at the start of a machine learning workflow?',
      explanation: 'Setting a random seed ensures that pseudo-random operations (like train/test splits and weight initialization) produce identical, reproducible results every time.',
      difficulty: 'beginner',
      topicTag: 'data-science',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'It ensures repeatable, reproducible results across different computers and experimental runs', isCorrect: true },
        { id: 'opt-b', text: 'It speeds up CPU clock cycles', isCorrect: false },
        { id: 'opt-c', text: 'It automatically turns off all warnings in the code', isCorrect: false },
        { id: 'opt-d', text: 'It converts integers to floating point numbers', isCorrect: false },
      ],
    },
    {
      id: 'q-np-12-2',
      question: 'What distribution do numbers sampled from np.random.randn() follow?',
      explanation: 'np.random.randn samples from the standard normal (Gaussian) distribution with mean = 0 and standard deviation = 1.',
      difficulty: 'intermediate',
      topicTag: 'data-science',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'Standard Normal (Gaussian) distribution with mean 0 and variance 1', isCorrect: true },
        { id: 'opt-b', text: 'Uniform distribution between 0 and 100', isCorrect: false },
        { id: 'opt-c', text: 'Binomial distribution of coin flips', isCorrect: false },
        { id: 'opt-d', text: 'Poisson arrival distribution', isCorrect: false },
      ],
    },
    {
      id: 'q-np-12-3',
      question: 'What is the upper bound value for np.random.randint(0, 10, 5)?',
      explanation: 'The upper bound is exclusive in np.random.randint, meaning the maximum possible integer generated is 9.',
      difficulty: 'beginner',
      topicTag: 'data-science',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: '9 (the high parameter is exclusive [low, high))', isCorrect: true },
        { id: 'opt-b', text: '10', isCorrect: false },
        { id: 'opt-c', text: '5', isCorrect: false },
        { id: 'opt-d', text: '100', isCorrect: false },
      ],
    },
  ],
};
