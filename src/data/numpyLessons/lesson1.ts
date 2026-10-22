import { NumpyLessonDefinition } from '../../types/numpyLesson';

export const numpyLesson1: NumpyLessonDefinition = {
  id: 'numpy-lesson-1',
  number: 1,
  slug: 'intro-to-numpy-and-ndarrays',
  title: 'Introduction to NumPy & The ndarray',
  shortDescription: 'Discover why NumPy forms the foundational bedrock of scientific computing, machine learning, and data science, and explore the core ndarray data structure.',
  estimatedMinutes: 9,
  learningObjectives: [
    'Explain why contiguous C-memory ndarrays outperform standard Python lists by 50x-100x',
    'Construct 1D and 2D arrays using np.array()',
    'Inspect critical array attributes: .shape, .ndim, .size, and .dtype',
  ],
  prerequisites: ['Basic Python programming fundamentals'],
  sections: [
    {
      id: 'sec-np-1-1',
      title: 'Why NumPy Matters',
      content: `**NumPy (Numerical Python)** is the fundamental library for numerical computing in Python. Virtually every data science, analytics, and deep learning framework—including **Pandas, SciPy, Scikit-learn, PyTorch, and TensorFlow**—relies on NumPy under the hood.

**The Performance Gap**:
Standard Python lists store references (pointers) to Python objects scattered across system memory, requiring pointer-chasing and dynamic type verification on every single operation.

In contrast, NumPy\'s **ndarray (N-dimensional array)** stores homogenous data in **contiguous blocks of C-memory**, unlocking:
• CPU cache locality (L1/L2/L3 cache acceleration).
• SIMD (Single Instruction, Multiple Data) parallel vector instructions.
• Memory compactness (no object overhead per number).`,
    },
    {
      id: 'sec-np-1-2',
      title: 'Creating and Inspecting ndarrays',
      content: `To create an array, pass a list or nested list to \`np.array()\`:

\`\`\`javascript
const arr = np.array([[1, 2, 3], [4, 5, 6]]);
console.log(arr);
// => array([[1, 2, 3],
//           [4, 5, 6]])
\`\`\`

**Essential Attributes**:
• \`.shape\`: A tuple indicating the size along each dimension (e.g. \`[2, 3]\` for 2 rows and 3 columns).
• \`.ndim\`: The number of axes / dimensions (e.g. \`1\` for vectors, \`2\` for matrices).
• \`.size\`: Total number of elements in the array ($rows \\times cols$).
• \`.dtype\`: Data type of elements (e.g. \`'float64'\`, \`'int32'\`).`,
    },
  ],
  exercises: [
    {
      id: 'np-ex-1-1',
      lessonId: 'numpy-lesson-1',
      order: 1,
      title: 'Create a 2D ndarray and Inspect Attributes',
      objective: 'Create a 2D array of [[10, 20, 30], [40, 50, 60]] using np.array(), print its shape, size, and ndim.',
      initialCode: `// 1. Create 2D array using np.array()
// const arr = np.array([[10, 20, 30], [40, 50, 60]]);
// 2. Print "Shape:" followed by JSON.stringify(arr.shape)
// 3. Print "Size:" followed by arr.size
// 4. Print "Dimensions:" followed by arr.ndim

`,
      solutionCode: `const arr = np.array([[10, 20, 30], [40, 50, 60]]);
console.log("Shape:", JSON.stringify(arr.shape));
console.log("Size:", arr.size);
console.log("Dimensions:", arr.ndim);`,
      expectedOutput: `Shape: [2,3]
Size: 6
Dimensions: 2`,
      hint: 'Define arr = np.array([[10, 20, 30], [40, 50, 60]]). Print arr.shape, arr.size, and arr.ndim.',
      explanation: 'The matrix has 2 rows and 3 columns (shape [2, 3]), total size 6 elements, and 2 dimensions.',
      quickChips: [
        'const arr = np.array([[10, 20, 30], [40, 50, 60]]);',
        'console.log("Shape:", JSON.stringify(arr.shape));',
        'console.log("Size:", arr.size);',
        'console.log("Dimensions:", arr.ndim);',
      ],
    },
  ],
  quiz: [
    {
      id: 'q-np-1-1',
      question: 'Why are NumPy arrays dramatically faster than standard Python lists for large mathematical calculations?',
      explanation: 'NumPy stores elements in contiguous memory blocks with homogenous types, allowing CPU cache optimization and SIMD vectorization.',
      difficulty: 'beginner',
      topicTag: 'data-science',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'They store homogenous data in contiguous C-memory blocks with SIMD hardware optimization', isCorrect: true },
        { id: 'opt-b', text: 'They automatically send computations to cloud supercomputers', isCorrect: false },
        { id: 'opt-c', text: 'They convert all numbers into text strings', isCorrect: false },
        { id: 'opt-d', text: 'They delete half of the numbers to run faster', isCorrect: false },
      ],
    },
    {
      id: 'q-np-1-2',
      question: 'What does the .shape attribute of a 2D NumPy array return?',
      explanation: 'The .shape attribute returns a tuple/array with the number of rows and columns [rows, cols].',
      difficulty: 'beginner',
      topicTag: 'data-science',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'An array/tuple indicating the count of elements along each axis [rows, cols]', isCorrect: true },
        { id: 'opt-b', text: 'The physical file size on the hard drive in kilobytes', isCorrect: false },
        { id: 'opt-c', text: 'The memory address of the first item', isCorrect: false },
        { id: 'opt-d', text: 'The sum of all numbers in the array', isCorrect: false },
      ],
    },
    {
      id: 'q-np-1-3',
      question: 'What is a core constraint of NumPy ndarrays compared to Python lists?',
      explanation: 'NumPy arrays are homogenous: all elements must share the exact same data type.',
      difficulty: 'intermediate',
      topicTag: 'data-science',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'All elements must be of the same homogenous data type', isCorrect: true },
        { id: 'opt-b', text: 'They can never store more than 10 numbers', isCorrect: false },
        { id: 'opt-c', text: 'They only work on Tuesdays', isCorrect: false },
        { id: 'opt-d', text: 'They cannot store negative numbers', isCorrect: false },
      ],
    },
    {
      id: 'q_numpy_1_auto_4',
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
      id: 'q_numpy_1_auto_5',
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
      id: 'q_numpy_1_auto_6',
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
      id: 'q_numpy_1_auto_7',
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
      id: 'q_numpy_1_auto_8',
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
      id: 'q_numpy_1_auto_9',
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
      id: 'q_numpy_1_auto_10',
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
