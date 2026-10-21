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
  ],
};
