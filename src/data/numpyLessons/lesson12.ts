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
    {
      id: 'q_numpy_12_auto_4',
      question: "What is the primary advantage of NumPy's ndarray over standard Python lists?",
      explanation: "NumPy arrays use contiguous memory blocks and pre-compiled C routines, eliminating Python loop overhead.",
      difficulty: 'intermediate',
      topicTag: 'numpy',
      type: 'multiple-choice',
      options: [
        { id: 'opt_1', text: "Homogeneous memory layout and vectorized C implementations that execute mathematical operations orders of magnitude faster", isCorrect: true },
        { id: 'opt_2', text: "ndarrays can only store text strings", isCorrect: false },
        { id: 'opt_3', text: "ndarrays do not use any computer RAM", isCorrect: false },
        { id: 'opt_4', text: "ndarrays are permanently stored on disk", isCorrect: false },
      ],
    },
    {
      id: 'q_numpy_12_auto_5',
      question: "What is 'broadcasting' in NumPy?",
      explanation: "Broadcasting enables element-wise operations on arrays of differing shapes when trailing dimensions match or equal 1.",
      difficulty: 'intermediate',
      topicTag: 'numpy',
      type: 'multiple-choice',
      options: [
        { id: 'opt_1', text: "Rules allowing arithmetic operations between arrays of different shapes by conceptually expanding dimensions without data copies", isCorrect: true },
        { id: 'opt_2', text: "Sending array data over a Wi-Fi network socket", isCorrect: false },
        { id: 'opt_3', text: "Converting 2D matrices into 3D images", isCorrect: false },
        { id: 'opt_4', text: "Printing all array values to the console", isCorrect: false },
      ],
    },
    {
      id: 'q_numpy_12_auto_6',
      question: "Which NumPy function creates an array of evenly spaced numbers over a specified interval?",
      explanation: "np.linspace generates a specified number of evenly spaced values between start and stop (inclusive).",
      difficulty: 'intermediate',
      topicTag: 'numpy',
      type: 'multiple-choice',
      options: [
        { id: 'opt_1', text: "np.linspace(start, stop, num)", isCorrect: true },
        { id: 'opt_2', text: "np.zeros()", isCorrect: false },
        { id: 'opt_3', text: "np.ones()", isCorrect: false },
        { id: 'opt_4', text: "np.random()", isCorrect: false },
      ],
    },
    {
      id: 'q_numpy_12_auto_7',
      question: "How do you reshape an array 'arr' of 12 elements into a 3x4 2D matrix?",
      explanation: "reshape(3, 4) returns a new view of the array with dimensions 3 rows by 4 columns without copying data.",
      difficulty: 'intermediate',
      topicTag: 'numpy',
      type: 'multiple-choice',
      options: [
        { id: 'opt_1', text: "arr.reshape(3, 4)", isCorrect: true },
        { id: 'opt_2', text: "arr.resize((3, 4), force=True)", isCorrect: false },
        { id: 'opt_3', text: "arr.matrix(3, 4)", isCorrect: false },
        { id: 'opt_4', text: "arr.transpose(3, 4)", isCorrect: false },
      ],
    },
    {
      id: 'q_numpy_12_auto_8',
      question: "What does the 'axis' parameter represent in aggregation functions like np.sum(arr, axis=0)?",
      explanation: "In NumPy, axis=0 operates along the row dimension (collapsing vertically), while axis=1 operates horizontally.",
      difficulty: 'intermediate',
      topicTag: 'numpy',
      type: 'multiple-choice',
      options: [
        { id: 'opt_1', text: "axis=0 collapses rows, aggregating along columns (vertical collapse)", isCorrect: true },
        { id: 'opt_2', text: "axis=0 aggregates across columns (horizontal collapse)", isCorrect: false },
        { id: 'opt_3', text: "axis=0 only calculates the diagonal values", isCorrect: false },
        { id: 'opt_4', text: "axis=0 transposes the array", isCorrect: false },
      ],
    },
    {
      id: 'q_numpy_12_auto_9',
      question: "Which operator performs matrix multiplication between two NumPy 2D arrays in Python 3.5+?",
      explanation: "The @ operator denotes matrix multiplication, whereas * performs element-wise Hadamard multiplication.",
      difficulty: 'intermediate',
      topicTag: 'numpy',
      type: 'multiple-choice',
      options: [
        { id: 'opt_1', text: "The @ operator (or np.matmul / np.dot)", isCorrect: true },
        { id: 'opt_2', text: "The * operator (which performs element-wise multiplication)", isCorrect: false },
        { id: 'opt_3', text: "The % operator", isCorrect: false },
        { id: 'opt_4', text: "The & operator", isCorrect: false },
      ],
    },
    {
      id: 'q_numpy_12_auto_10',
      question: "How does boolean masking work in NumPy (e.g. arr[arr > 5])?",
      explanation: "Boolean masking filters array elements matching a condition, returning a flattened array of matching values.",
      difficulty: 'intermediate',
      topicTag: 'numpy',
      type: 'multiple-choice',
      options: [
        { id: 'opt_1', text: "It evaluates the condition element-wise to create a boolean mask, then extracts only true elements into a 1D array", isCorrect: true },
        { id: 'opt_2', text: "It replaces all numbers greater than 5 with True", isCorrect: false },
        { id: 'opt_3', text: "It throws a syntax error", isCorrect: false },
        { id: 'opt_4', text: "It deletes elements smaller than 5 from disk", isCorrect: false },
      ],
    },
  ],
};
