import { NumpyLessonDefinition } from '../../types/numpyLesson';

export const numpyLesson9: NumpyLessonDefinition = {
  id: 'numpy-lesson-9',
  number: 9,
  slug: 'stacking-and-concatenation',
  title: 'Stacking, Splitting & Concatenation',
  shortDescription: 'Assemble composite datasets and batch inputs by vertically (np.vstack) and horizontally (np.hstack) combining arrays and splitting tensors.',
  estimatedMinutes: 10,
  learningObjectives: [
    'Stack arrays vertically along axis 0 using np.vstack() to append new observations',
    'Stack arrays horizontally along axis 1 using np.hstack() to attach new feature columns',
    'Verify dimension compatibility before executing concatenation routines',
  ],
  prerequisites: ['Aggregations & Axis Operations'],
  sections: [
    {
      id: 'sec-np-9-1',
      title: 'Vertical Stacking (np.vstack)',
      content: `In data pipelines, we regularly append new data records (rows) to an existing dataset:

\`\`\`javascript
const a = np.array([1, 2, 3]);
const b = np.array([4, 5, 6]);

const stacked = np.vstack([a, b]);
// => array([[1, 2, 3],
//           [4, 5, 6]])
\`\`\`

**Rule**: All arrays passed to \`np.vstack()\` must have the **exact same number of columns**.`,
    },
    {
      id: 'sec-np-9-2',
      title: 'Horizontal Stacking (np.hstack)',
      content: `To append additional feature columns to existing observations:

\`\`\`javascript
const A = np.array([[1], [2], [3]]);
const B = np.array([[10], [20], [30]]);

const combined = np.hstack([A, B]);
// => array([[1, 10],
//           [2, 20],
//           [3, 30]])
\`\`\`

**Rule**: All matrices passed to \`np.hstack()\` must have the **exact same number of rows**.`,
    },
  ],
  exercises: [
    {
      id: 'np-ex-9-1',
      lessonId: 'numpy-lesson-9',
      order: 1,
      title: 'Vertically Stack Rows into a 2D Matrix',
      objective: 'Stack vector a = [10, 20, 30] and vector b = [40, 50, 60] vertically using np.vstack([a, b]), print the stacked matrix and shape.',
      initialCode: `const a = np.array([10, 20, 30]);
const b = np.array([40, 50, 60]);

// 1. Stack arrays: np.vstack([a, b])
// 2. Print "Stacked:" followed by res.toString()
// 3. Print "Shape:" followed by JSON.stringify(res.shape)

`,
      solutionCode: `const a = np.array([10, 20, 30]);
const b = np.array([40, 50, 60]);

const res = np.vstack([a, b]);

console.log("Stacked:", res.toString());
console.log("Shape:", JSON.stringify(res.shape));`,
      expectedOutput: `Stacked: array([[10, 20, 30],
 [40, 50, 60]])
Shape: [2,3]`,
      hint: 'Call np.vstack([a, b]) and log res.toString() and JSON.stringify(res.shape).',
      explanation: 'np.vstack combines two 1D vectors of length 3 into a 2D matrix of shape [2, 3].',
      quickChips: [
        'const res = np.vstack([a, b]);',
        'console.log("Stacked:", res.toString());',
        'console.log("Shape:", JSON.stringify(res.shape));',
      ],
    },
  ],
  quiz: [
    {
      id: 'q-np-9-1',
      question: 'To vertically stack two 2D matrices using np.vstack([A, B]), what dimension must strictly match between them?',
      explanation: 'Vertical stacking stacks rows on top of each other, requiring both matrices to have the exact same number of columns.',
      difficulty: 'beginner',
      topicTag: 'data-science',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'The number of columns must match', isCorrect: true },
        { id: 'opt-b', text: 'The number of rows must match', isCorrect: false },
        { id: 'opt-c', text: 'Both matrices must be square (NxN)', isCorrect: false },
        { id: 'opt-d', text: 'All numbers must be odd integers', isCorrect: false },
      ],
    },
    {
      id: 'q-np-9-2',
      question: 'What is the resulting shape if you horizontally stack (np.hstack) two matrices with shapes (4, 3) and (4, 5)?',
      explanation: 'Horizontal stacking joins along columns (axis 1), yielding (4, 3 + 5) = (4, 8).',
      difficulty: 'intermediate',
      topicTag: 'data-science',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: '(4, 8)', isCorrect: true },
        { id: 'opt-b', text: '(8, 8)', isCorrect: false },
        { id: 'opt-c', text: '(4, 15)', isCorrect: false },
        { id: 'opt-d', text: 'An error occurs because columns are not equal', isCorrect: false },
      ],
    },
    {
      id: 'q-np-9-3',
      question: 'In deep learning mini-batch training, which stacking function is commonly used to assemble a batch of individual sample vectors into a 2D feature matrix?',
      explanation: 'np.vstack stacks individual 1D sample vectors into rows of a 2D batch matrix.',
      difficulty: 'intermediate',
      topicTag: 'data-science',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'np.vstack (vertical stacking)', isCorrect: true },
        { id: 'opt-b', text: 'np.eye', isCorrect: false },
        { id: 'opt-c', text: 'np.ravel', isCorrect: false },
        { id: 'opt-d', text: 'np.arange', isCorrect: false },
      ],
    },
    {
      id: 'q_numpy_9_auto_4',
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
      id: 'q_numpy_9_auto_5',
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
      id: 'q_numpy_9_auto_6',
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
      id: 'q_numpy_9_auto_7',
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
      id: 'q_numpy_9_auto_8',
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
      id: 'q_numpy_9_auto_9',
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
      id: 'q_numpy_9_auto_10',
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
