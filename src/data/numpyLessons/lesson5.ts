import { NumpyLessonDefinition } from '../../types/numpyLesson';

export const numpyLesson5: NumpyLessonDefinition = {
  id: 'numpy-lesson-5',
  number: 5,
  slug: 'vectorized-arithmetic',
  title: 'Vectorized Operations & Element-Wise Arithmetic',
  shortDescription: 'Eliminate slow, explicit loops with vectorization, perform parallel SIMD element-wise arithmetic, and accelerate numerical pipelines.',
  estimatedMinutes: 10,
  learningObjectives: [
    'Define vectorization and explain how it delegates loops to optimized C-level compiled code',
    'Execute element-wise addition, subtraction, multiplication, and division across ndarrays',
    'Differentiate between element-wise multiplication (*) and linear algebra matrix multiplication (@)',
  ],
  prerequisites: ['Array Reshaping, Transposition & Flattening'],
  sections: [
    {
      id: 'sec-np-5-1',
      title: 'The Magic of Vectorization',
      content: `In standard Python, applying a transformation to every item in a list requires an explicit \`for\` loop:

\`\`\`python
# Slow Python loop (checks object types 1,000,000 times)
result = [x * 2 for x in my_list]
\`\`\`

In NumPy, operations are **vectorized**:
\`\`\`javascript
// Fast NumPy vectorization (C-compiled loop with SIMD parallelism)
const result = np.multiply(arr, 2);
\`\`\`
Vectorization expresses operations on entire arrays at once rather than individual elements, pushing execution to compiled machine code and running up to $100\\times$ faster.`,
    },
    {
      id: 'sec-np-5-2',
      title: 'Element-Wise Math',
      content: `All basic arithmetic operates **element-by-element**:
\`\`\`javascript
const a = np.array([1, 2, 3]);
const b = np.array([10, 20, 30]);

np.add(a, b);      // => array([11, 22, 33])
np.multiply(a, b); // => array([10, 40, 90])
\`\`\`

**Crucial Warning**:
In NumPy, \`np.multiply(A, B)\` (or \`A * B\`) performs **element-wise multiplication** (the Hadamard product). It is NOT matrix multiplication! Matrix multiplication uses \`np.dot(A, B)\` or \`A @ B\`.`,
    },
  ],
  exercises: [
    {
      id: 'np-ex-5-1',
      lessonId: 'numpy-lesson-5',
      order: 1,
      title: 'Execute Element-Wise Vector Arithmetic',
      objective: 'Given vectors a = [1, 2, 3] and b = [10, 20, 30], compute their element-wise sum with np.add(a, b) and product with np.multiply(a, b), and print both.',
      initialCode: `const a = np.array([1, 2, 3]);
const b = np.array([10, 20, 30]);

// 1. Calculate sum: np.add(a, b)
// 2. Calculate product: np.multiply(a, b)
// Print "Sum:" followed by sumArr.toString()
// Print "Product:" followed by prodArr.toString()

`,
      solutionCode: `const a = np.array([1, 2, 3]);
const b = np.array([10, 20, 30]);

const sumArr = np.add(a, b);
const prodArr = np.multiply(a, b);

console.log("Sum:", sumArr.toString());
console.log("Product:", prodArr.toString());`,
      expectedOutput: `Sum: array([11, 22, 33])
Product: array([10, 40, 90])`,
      hint: 'Call np.add(a, b) and np.multiply(a, b). Log both with .toString().',
      explanation: 'Addition yields [1+10, 2+20, 3+30] = [11, 22, 33]. Multiplication yields [1*10, 2*20, 3*30] = [10, 40, 90].',
      quickChips: [
        'const sumArr = np.add(a, b);',
        'const prodArr = np.multiply(a, b);',
        'console.log("Sum:", sumArr.toString());',
        'console.log("Product:", prodArr.toString());',
      ],
    },
  ],
  quiz: [
    {
      id: 'q-np-5-1',
      question: 'In NumPy, what mathematical operation is performed by np.multiply(A, B) or the * operator between two matrices?',
      explanation: 'The * operator and np.multiply perform element-wise multiplication (Hadamard product), multiplying corresponding entries together.',
      difficulty: 'beginner',
      topicTag: 'data-science',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'Element-wise multiplication (Hadamard product)', isCorrect: true },
        { id: 'opt-b', text: 'Linear algebra matrix multiplication', isCorrect: false },
        { id: 'opt-c', text: 'Cross product of 3D vectors', isCorrect: false },
        { id: 'opt-d', text: 'Matrix inversion', isCorrect: false },
      ],
    },
    {
      id: 'q-np-5-2',
      question: 'Why is vectorization in NumPy orders of magnitude faster than a standard Python "for" loop?',
      explanation: 'Vectorized operations execute in compiled C code with optimized memory access patterns and hardware SIMD CPU instructions without Python interpreter overhead.',
      difficulty: 'intermediate',
      topicTag: 'data-science',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'It runs in compiled C with CPU SIMD instructions, eliminating per-element Python interpreter overhead', isCorrect: true },
        { id: 'opt-b', text: 'It ignores decimal places and rounds all numbers to zero', isCorrect: false },
        { id: 'opt-c', text: 'It only computes the first and last numbers in the list', isCorrect: false },
        { id: 'opt-d', text: 'It reduces the array to 1 element', isCorrect: false },
      ],
    },
    {
      id: 'q-np-5-3',
      question: 'What is the result of np.array([2, 4, 6]) + 10?',
      explanation: 'The scalar 10 is added element-wise to each element: [12, 14, 16].',
      difficulty: 'beginner',
      topicTag: 'data-science',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'array([12, 14, 16])', isCorrect: true },
        { id: 'opt-b', text: 'array([2, 4, 6, 10])', isCorrect: false },
        { id: 'opt-c', text: 'An error because dimensions do not match', isCorrect: false },
        { id: 'opt-d', text: 'array([20, 40, 60])', isCorrect: false },
      ],
    },
    {
      id: 'q_numpy_5_auto_4',
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
      id: 'q_numpy_5_auto_5',
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
      id: 'q_numpy_5_auto_6',
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
      id: 'q_numpy_5_auto_7',
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
      id: 'q_numpy_5_auto_8',
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
      id: 'q_numpy_5_auto_9',
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
      id: 'q_numpy_5_auto_10',
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
