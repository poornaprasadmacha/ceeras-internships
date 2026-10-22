import { NumpyLessonDefinition } from '../../types/numpyLesson';

export const numpyLesson6: NumpyLessonDefinition = {
  id: 'numpy-lesson-6',
  number: 6,
  slug: 'broadcasting-rules',
  title: 'The Golden Rule of NumPy: Broadcasting',
  shortDescription: 'Master NumPy\'s most powerful feature: compute seamlessly between arrays of differing shapes without allocating duplicate memory.',
  estimatedMinutes: 12,
  learningObjectives: [
    'Define the concept of broadcasting and explain why it saves gigabytes of RAM',
    'State and apply the two universal broadcasting rules to predict shape compatibility',
    'Add a 1D row vector across every row of a 2D matrix without explicit copying',
  ],
  prerequisites: ['Vectorized Operations & Element-Wise Arithmetic'],
  sections: [
    {
      id: 'sec-np-6-1',
      title: 'What is Broadcasting?',
      content: `In strict linear algebra, adding a $1 \\times 3$ vector to a $3 \\times 3$ matrix is undefined because their dimensions mismatch.

NumPy solves this through **Broadcasting**:
It automatically stretches the smaller array along the missing dimension so their shapes match, **without actually copying data in memory**!

\`\`\`javascript
const mat = np.array([
  [1, 2, 3],
  [4, 5, 6]
]); // shape (2, 3)

const row = np.array([10, 20, 30]); // shape (3,)

np.add(mat, row);
// => array([[11, 22, 33],
//           [14, 25, 36]])
\`\`\``,
    },
    {
      id: 'sec-np-6-2',
      title: 'The Two Universal Broadcasting Rules',
      content: `When operating on two arrays, NumPy compares their shapes element-wise **starting from the trailing (rightmost) dimension and working backwards**:

1. Two dimensions are **compatible** if:
   • They are **equal**, OR
   • One of them is **1**.

2. If a dimension has size $1$, the array is conceptually stretched along that axis to match the larger shape.

**Compatible Examples**:
• $(4, 3)$ and $(3,) \\to (4, 3) + (1, 3) \\to$ **Compatible!**
• $(5, 1)$ and $(1, 4) \\to$ **Compatible!** (Yields a $(5, 4)$ matrix).

**Incompatible Example**:
• $(3, 3)$ and $(2,) \\to 3 \\ne 2$ and neither is $1 \\to$ **ValueError: operands could not be broadcast together!**`,
    },
  ],
  exercises: [
    {
      id: 'np-ex-6-1',
      lessonId: 'numpy-lesson-6',
      order: 1,
      title: 'Broadcast a Row Vector Across a 2x3 Matrix',
      objective: 'Add a 1D vector [10, 20, 30] to a 2x3 matrix [[1, 2, 3], [4, 5, 6]] using broadcasting, print the result and its shape.',
      initialCode: `const mat = np.array([
  [1, 2, 3],
  [4, 5, 6]
]);
const vec = np.array([10, 20, 30]);

// 1. Add vec to mat using np.add(mat, vec)
// 2. Print "Broadcasted:" followed by res.toString()
// 3. Print "Result shape:" followed by JSON.stringify(res.shape)

`,
      solutionCode: `const mat = np.array([
  [1, 2, 3],
  [4, 5, 6]
]);
const vec = np.array([10, 20, 30]);

const res = np.add(mat, vec);
console.log("Broadcasted:", res.toString());
console.log("Result shape:", JSON.stringify(res.shape));`,
      expectedOutput: `Broadcasted: array([[11, 22, 33],
 [14, 25, 36]])
Result shape: [2,3]`,
      hint: 'Call np.add(mat, vec) and log res.toString() and JSON.stringify(res.shape).',
      explanation: 'The 1D vector [10, 20, 30] is broadcasted across both rows of the matrix, producing a (2, 3) result without allocating new duplicate memory.',
      quickChips: [
        'const res = np.add(mat, vec);',
        'console.log("Broadcasted:", res.toString());',
        'console.log("Result shape:", JSON.stringify(res.shape));',
      ],
    },
  ],
  quiz: [
    {
      id: 'q-np-6-1',
      question: 'Which of the following pairs of array shapes CANNOT be broadcast together under NumPy rules?',
      explanation: 'Comparing trailing dimensions from right to left: 3 and 2 are not equal and neither is 1, causing a broadcast shape mismatch.',
      difficulty: 'intermediate',
      topicTag: 'data-science',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: '(4, 3) and (2,)', isCorrect: true },
        { id: 'opt-b', text: '(4, 3) and (3,)', isCorrect: false },
        { id: 'opt-c', text: '(5, 1) and (1, 6)', isCorrect: false },
        { id: 'opt-d', text: '(3, 3) and (1, 3)', isCorrect: false },
      ],
    },
    {
      id: 'q-np-6-2',
      question: 'How does NumPy achieve broadcasting without consuming massive amounts of system RAM?',
      explanation: 'NumPy changes array strides to 0 along the broadcast dimension, repeatedly reading the same memory address rather than duplicating rows in physical RAM.',
      difficulty: 'advanced',
      topicTag: 'data-science',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'It sets dimension stride to 0, reading the same memory address repeatedly without copying data', isCorrect: true },
        { id: 'opt-b', text: 'It writes the data to the hard drive temporary cache', isCorrect: false },
        { id: 'opt-c', text: 'It converts floats to 8-bit integers', isCorrect: false },
        { id: 'opt-d', text: 'It deletes half of the columns', isCorrect: false },
      ],
    },
    {
      id: 'q-np-6-3',
      question: 'What is the resulting shape when broadcasting array A of shape (6, 1) with array B of shape (1, 4)?',
      explanation: 'Each axis stretches to the maximum size: 6 on axis 0 and 4 on axis 1, yielding a shape of (6, 4).',
      difficulty: 'intermediate',
      topicTag: 'data-science',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: '(6, 4)', isCorrect: true },
        { id: 'opt-b', text: '(1, 1)', isCorrect: false },
        { id: 'opt-c', text: '(24,)', isCorrect: false },
        { id: 'opt-d', text: '(6, 1, 4)', isCorrect: false },
      ],
    },
    {
      id: 'q_numpy_6_auto_4',
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
      id: 'q_numpy_6_auto_5',
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
      id: 'q_numpy_6_auto_6',
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
      id: 'q_numpy_6_auto_7',
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
      id: 'q_numpy_6_auto_8',
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
      id: 'q_numpy_6_auto_9',
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
      id: 'q_numpy_6_auto_10',
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
