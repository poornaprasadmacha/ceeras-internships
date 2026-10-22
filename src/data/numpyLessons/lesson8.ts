import { NumpyLessonDefinition } from '../../types/numpyLesson';

export const numpyLesson8: NumpyLessonDefinition = {
  id: 'numpy-lesson-8',
  number: 8,
  slug: 'aggregations-and-axis-math',
  title: 'Aggregations & Axis Operations',
  shortDescription: 'Master multidimensional reductions using .sum(), .mean(), .std(), and master the critical distinction between axis=0 (along columns) and axis=1 (along rows).',
  estimatedMinutes: 11,
  learningObjectives: [
    'Compute global summary statistics (.sum, .mean, .std, .min, .max) across ndarrays',
    'Visualize how axis=0 collapses rows to compute column-wise metrics',
    'Visualize how axis=1 collapses columns to compute row-wise metrics',
  ],
  prerequisites: ['Boolean Masking & Conditional Filtering'],
  sections: [
    {
      id: 'sec-np-8-1',
      title: 'Global Reductions',
      content: `By default, calling an aggregation on an ndarray reduces all elements across all dimensions into a single scalar value:

\`\`\`javascript
const mat = np.array([
  [1, 2, 3],
  [4, 5, 6]
]);

mat.sum();  // => 21
mat.mean(); // => 3.5
mat.max();  // => 6
\`\`\``,
    },
    {
      id: 'sec-np-8-2',
      title: 'The "axis" Dimension: 0 vs. 1',
      content: `In 2D data science tables, rows usually represent individual observations (e.g. students or houses) while columns represent features (e.g. scores or prices).

The **\`axis\`** parameter specifies which dimension is collapsed:
• **\`axis=0\` (Collapse Rows)**:
  Aggregates downwards across rows to produce **per-column metrics** (e.g. average score for each exam subject).
  Returns an array of length equal to the number of columns.

• **\`axis=1\` (Collapse Columns)**:
  Aggregates horizontally across columns to produce **per-row metrics** (e.g. total score for each individual student).
  Returns an array of length equal to the number of rows.`,
    },
  ],
  exercises: [
    {
      id: 'np-ex-8-1',
      lessonId: 'numpy-lesson-8',
      order: 1,
      title: 'Calculate Column-Wise and Row-Wise Sums',
      objective: 'For the 2x3 matrix [[1, 2, 3], [4, 5, 6]], calculate overall sum, column sums (axis=0), and row sums (axis=1). Print all three.',
      initialCode: `const mat = np.array([
  [1, 2, 3],
  [4, 5, 6]
]);

// 1. Overall sum: mat.sum()
// 2. Column sums: mat.sum(0)
// 3. Row sums: mat.sum(1)
// Print "Total sum:" followed by total
// Print "Col sums:" followed by colSums.toString()
// Print "Row sums:" followed by rowSums.toString()

`,
      solutionCode: `const mat = np.array([
  [1, 2, 3],
  [4, 5, 6]
]);

const total = mat.sum();
const colSums = mat.sum(0);
const rowSums = mat.sum(1);

console.log("Total sum:", total);
console.log("Col sums:", colSums.toString());
console.log("Row sums:", rowSums.toString());`,
      expectedOutput: `Total sum: 21
Col sums: array([5, 7, 9])
Row sums: array([6, 15])`,
      hint: 'Call mat.sum(), mat.sum(0), and mat.sum(1). Print Total sum:, Col sums:, and Row sums:.',
      explanation: 'Column sums down axis 0: [1+4, 2+5, 3+6] = [5, 7, 9]. Row sums across axis 1: [1+2+3, 4+5+6] = [6, 15]. Total sum = 21.',
      quickChips: [
        'const total = mat.sum();',
        'const colSums = mat.sum(0);',
        'const rowSums = mat.sum(1);',
        'console.log("Total sum:", total);',
      ],
    },
  ],
  quiz: [
    {
      id: 'q-np-8-1',
      question: 'When computing an aggregation on a 2D matrix of shape (100, 5), what is the shape of the output when specifying axis=0?',
      explanation: 'axis=0 collapses the 100 rows, returning an aggregation across the 5 columns with shape (5,).',
      difficulty: 'intermediate',
      topicTag: 'data-science',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: '(5,) (per-column summary across rows)', isCorrect: true },
        { id: 'opt-b', text: '(100,) (per-row summary across columns)', isCorrect: false },
        { id: 'opt-c', text: 'A single scalar number', isCorrect: false },
        { id: 'opt-d', text: '(100, 5)', isCorrect: false },
      ],
    },
    {
      id: 'q-np-8-2',
      question: 'In a dataset where each row is a customer and columns are purchase totals, which axis should you sum over to find the total spend per customer?',
      explanation: 'Summing across columns horizontally along axis=1 produces the row-wise total per customer.',
      difficulty: 'beginner',
      topicTag: 'data-science',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'axis=1', isCorrect: true },
        { id: 'opt-b', text: 'axis=0', isCorrect: false },
        { id: 'opt-c', text: 'axis=-2', isCorrect: false },
        { id: 'opt-d', text: 'axis=None', isCorrect: false },
      ],
    },
    {
      id: 'q-np-8-3',
      question: 'What do the functions np.argmin() and np.argmax() return?',
      explanation: 'np.argmin and np.argmax return the index position of the minimum or maximum element rather than the value itself.',
      difficulty: 'beginner',
      topicTag: 'data-science',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'The index location of the minimum or maximum value', isCorrect: true },
        { id: 'opt-b', text: 'The square root of the average', isCorrect: false },
        { id: 'opt-c', text: 'A boolean True or False', isCorrect: false },
        { id: 'opt-d', text: 'The array sorted in reverse order', isCorrect: false },
      ],
    },
    {
      id: 'q_numpy_8_auto_4',
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
      id: 'q_numpy_8_auto_5',
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
      id: 'q_numpy_8_auto_6',
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
      id: 'q_numpy_8_auto_7',
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
      id: 'q_numpy_8_auto_8',
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
      id: 'q_numpy_8_auto_9',
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
      id: 'q_numpy_8_auto_10',
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
