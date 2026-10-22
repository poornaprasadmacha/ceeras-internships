import { NumpyLessonDefinition } from '../../types/numpyLesson';

export const numpyLesson2: NumpyLessonDefinition = {
  id: 'numpy-lesson-2',
  number: 2,
  slug: 'array-creation-routines',
  title: 'Array Creation Routines & Sequences',
  shortDescription: 'Initialize structured arrays without manual data entry using np.zeros(), np.ones(), np.arange(), np.linspace(), and the identity matrix np.eye().',
  estimatedMinutes: 10,
  learningObjectives: [
    'Initialize memory buffers using np.zeros(), np.ones(), and np.full()',
    'Generate numeric step intervals using np.arange(start, stop, step)',
    'Generate smooth continuous coordinate grids using np.linspace(start, stop, num)',
  ],
  prerequisites: ['Introduction to NumPy & The ndarray'],
  sections: [
    {
      id: 'sec-np-2-1',
      title: 'Pre-allocating Memory: zeros, ones & full',
      content: `In data science and machine learning, we frequently initialize empty arrays or weights before iterative calculations:

\`\`\`javascript
// 1D array of 4 zeros
np.zeros(4); // => array([0, 0, 0, 0])

// 2D 2x3 matrix of ones
np.ones([2, 3]); // => array([[1, 1, 1], [1, 1, 1]])

// Constant fill with 7
np.full([2, 2], 7); // => array([[7, 7], [7, 7]])
\`\`\`
Pre-allocating memory up front is significantly faster than dynamically appending elements inside loops.`,
    },
    {
      id: 'sec-np-2-2',
      title: 'Sequences: arange vs. linspace',
      content: `When generating sequences:

• **\`np.arange(start, stop, step)\`**:
  • Works like Python\'s \`range()\`, stepping by a defined increment.
  • *Excludes* the stop value: \`np.arange(0, 10, 2)\` $\\to [0, 2, 4, 6, 8]$.

• **\`np.linspace(start, stop, num)\`**:
  • Generates \`num\` evenly spaced points between start and stop.
  • *Includes* the stop value: \`np.linspace(0, 1, 5)\` $\\to [0.0, 0.25, 0.5, 0.75, 1.0]$.
  • Essential for plotting mathematical curves (e.g. $y = \\sin(x)$).`,
    },
    {
      id: 'sec-np-2-3',
      title: 'The Identity Matrix: np.eye(n)',
      content: `The identity matrix $I_n$ contains $1$s on the main diagonal and $0$s everywhere else:
\`\`\`javascript
np.eye(3);
// => array([[1, 0, 0],
//           [0, 1, 0],
//           [0, 0, 1]])
\`\`\`
Multiplying any matrix $A$ by the identity matrix leaves it unchanged: $A \\cdot I = A$.`,
    },
  ],
  exercises: [
    {
      id: 'np-ex-2-1',
      lessonId: 'numpy-lesson-2',
      order: 1,
      title: 'Generate Step Sequences with arange and linspace',
      objective: 'Generate an arange from 0 to 10 with step 2, and a linspace from 0 to 1 with 5 points. Print both arrays.',
      initialCode: `// 1. Create arange: np.arange(0, 10, 2)
// 2. Create linspace: np.linspace(0, 1, 5)
// Print "Arange:" followed by arangeArr.toString()
// Print "Linspace:" followed by linspaceArr.toString()

`,
      solutionCode: `const arangeArr = np.arange(0, 10, 2);
const linspaceArr = np.linspace(0, 1, 5);

console.log("Arange:", arangeArr.toString());
console.log("Linspace:", linspaceArr.toString());`,
      expectedOutput: `Arange: array([0, 2, 4, 6, 8])
Linspace: array([0, 0.25, 0.5, 0.75, 1])`,
      hint: 'Call np.arange(0, 10, 2) and np.linspace(0, 1, 5). Log both with .toString().',
      explanation: 'np.arange steps by 2 stopping before 10. np.linspace divides the [0, 1] interval into 5 evenly spaced points.',
      quickChips: [
        'const arangeArr = np.arange(0, 10, 2);',
        'const linspaceArr = np.linspace(0, 1, 5);',
        'console.log("Arange:", arangeArr.toString());',
        'console.log("Linspace:", linspaceArr.toString());',
      ],
    },
  ],
  quiz: [
    {
      id: 'q-np-2-1',
      question: 'What is the primary difference between np.arange() and np.linspace()?',
      explanation: 'np.arange specifies the step size between points, whereas np.linspace specifies the total number of evenly spaced points desired.',
      difficulty: 'beginner',
      topicTag: 'data-science',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'arange specifies step size; linspace specifies the total number of points desired', isCorrect: true },
        { id: 'opt-b', text: 'arange only works with negative numbers', isCorrect: false },
        { id: 'opt-c', text: 'linspace converts numbers to complex fractions', isCorrect: false },
        { id: 'opt-d', text: 'arange cannot be called in Python', isCorrect: false },
      ],
    },
    {
      id: 'q-np-2-2',
      question: 'What will np.eye(3) generate?',
      explanation: 'np.eye(3) creates a 3x3 identity matrix with 1s on the main diagonal and 0s elsewhere.',
      difficulty: 'beginner',
      topicTag: 'data-science',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'A 3x3 Identity matrix with 1s on the diagonal and 0s elsewhere', isCorrect: true },
        { id: 'opt-b', text: 'A 1D vector of 3 random numbers', isCorrect: false },
        { id: 'opt-c', text: 'A 3x3 matrix filled with all 3s', isCorrect: false },
        { id: 'opt-d', text: 'An empty matrix with 0 columns', isCorrect: false },
      ],
    },
    {
      id: 'q-np-2-3',
      question: 'Why is pre-allocating an array with np.zeros(1000000) preferred over appending to an empty list inside a loop?',
      explanation: 'Pre-allocation reserves the exact contiguous memory block once, avoiding repeated expensive memory re-allocations and copying during loop growth.',
      difficulty: 'intermediate',
      topicTag: 'data-science',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'It avoids repeated memory reallocations and array copying during loop iterations', isCorrect: true },
        { id: 'opt-b', text: 'Loops cannot be run in Python', isCorrect: false },
        { id: 'opt-c', text: 'zeros always compresses data to 0 bytes on disk', isCorrect: false },
        { id: 'opt-d', text: 'It prevents the CPU from heating up', isCorrect: false },
      ],
    },
    {
      id: 'q_numpy_2_auto_4',
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
      id: 'q_numpy_2_auto_5',
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
      id: 'q_numpy_2_auto_6',
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
      id: 'q_numpy_2_auto_7',
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
      id: 'q_numpy_2_auto_8',
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
      id: 'q_numpy_2_auto_9',
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
      id: 'q_numpy_2_auto_10',
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
