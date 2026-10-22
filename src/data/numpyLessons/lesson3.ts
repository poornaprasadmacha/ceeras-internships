import { NumpyLessonDefinition } from '../../types/numpyLesson';

export const numpyLesson3: NumpyLessonDefinition = {
  id: 'numpy-lesson-3',
  number: 3,
  slug: 'indexing-slicing-and-strides',
  title: 'Array Indexing, Slicing & Strides',
  shortDescription: 'Navigate multi-dimensional coordinate grids with pythonic slicing, extract rows and columns, and understand the critical difference between Memory Views and Copies.',
  estimatedMinutes: 11,
  learningObjectives: [
    'Slice multi-dimensional arrays across rows and columns using [start:stop:step] syntax',
    'Extract isolated rows, columns, and submatrices from 2D coordinate spaces',
    'Explain why NumPy slices return Memory Views rather than copies and how to use .copy() safely',
  ],
  prerequisites: ['Array Creation Routines & Sequences'],
  sections: [
    {
      id: 'sec-np-3-1',
      title: '2D Matrix Slicing',
      content: `In 2D NumPy arrays, indexing takes comma-separated row and column coordinates:
\`matrix[row_index, col_index]\`

\`\`\`javascript
const mat = np.array([
  [10, 20, 30],
  [40, 50, 60],
  [70, 80, 90]
]);

// Single element at row 1, col 2
mat.data[1][2]; // => 60

// Extracting top-left 2x2 submatrix
// Rows 0 to 2, Cols 0 to 2
\`\`\``,
    },
    {
      id: 'sec-np-3-2',
      title: 'Views vs. Copies',
      content: `This is one of the most critical concepts in high-performance computing:

• **Python Lists**: Slicing a list \`my_list[1:3]\` creates an entirely new copy in memory.
• **NumPy ndarrays**: Slicing an array creates a **VIEW** pointing to the **exact same memory buffer**!
  • If you modify an element in the slice, **the original array changes too**!
  • This design makes slicing instantaneous ($O(1)$ time and memory), regardless of whether the array contains 10 numbers or 10 billion numbers.

If you need an independent duplicate, call \`.copy()\`.`,
    },
  ],
  exercises: [
    {
      id: 'np-ex-3-1',
      lessonId: 'numpy-lesson-3',
      order: 1,
      title: 'Extract 2x2 Submatrix and Plot Grid',
      objective: 'From the 3x3 matrix [[1, 2, 3], [4, 5, 6], [7, 8, 9]], extract the top-left 2x2 submatrix [[1, 2], [4, 5]], print its size, and plot the matrix.',
      initialCode: `const mat = np.array([
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
]);

// 1. Extract submatrix [[1, 2], [4, 5]]
// const sub = np.array([mat.data[0].slice(0, 2), mat.data[1].slice(0, 2)]);
// 2. Print "Submatrix size:" followed by sub.size
// 3. Render grid: plot.matrix(sub, "Top-Left 2x2 Slice");

`,
      solutionCode: `const mat = np.array([
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
]);

const sub = np.array([mat.data[0].slice(0, 2), mat.data[1].slice(0, 2)]);
console.log("Submatrix size:", sub.size);
plot.matrix(sub, "Top-Left 2x2 Slice");`,
      expectedOutput: `Submatrix size: 4`,
      hint: 'Extract the submatrix with rows 0 and 1 sliced to 2 columns. Log sub.size and call plot.matrix(sub, "Top-Left 2x2 Slice").',
      explanation: 'The extracted 2x2 submatrix contains 4 elements: 1, 2, 4, and 5.',
      quickChips: [
        'const sub = np.array([mat.data[0].slice(0, 2), mat.data[1].slice(0, 2)]);',
        'console.log("Submatrix size:", sub.size);',
        'plot.matrix(sub, "Top-Left 2x2 Slice");',
      ],
    },
  ],
  quiz: [
    {
      id: 'q-np-3-1',
      question: 'What happens when you modify an element in a sliced NumPy array view without calling .copy()?',
      explanation: 'Slices in NumPy are views sharing the original memory buffer, so mutating the slice directly mutates the original array.',
      difficulty: 'intermediate',
      topicTag: 'data-science',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'The element in the original parent array is also modified', isCorrect: true },
        { id: 'opt-b', text: 'An exception is thrown by the Python runtime', isCorrect: false },
        { id: 'opt-c', text: 'The slice is converted to a string', isCorrect: false },
        { id: 'opt-d', text: 'Nothing happens to either array', isCorrect: false },
      ],
    },
    {
      id: 'q-np-3-2',
      question: 'Why does NumPy default to returning views rather than copies when slicing arrays?',
      explanation: 'Views avoid allocating new memory and copying data, giving O(1) instantaneous slicing performance even for gigabyte-scale datasets.',
      difficulty: 'intermediate',
      topicTag: 'data-science',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'To achieve O(1) speed and zero memory overhead on large arrays', isCorrect: true },
        { id: 'opt-b', text: 'Because computers cannot allocate memory twice', isCorrect: false },
        { id: 'opt-c', text: 'To encrypt sensitive array numbers', isCorrect: false },
        { id: 'opt-d', text: 'Because views are required for sorting', isCorrect: false },
      ],
    },
    {
      id: 'q-np-3-3',
      question: 'In a 2D array of shape (5, 5), which syntax extracts all rows for column index 2?',
      explanation: 'arr[:, 2] selects all rows (denoted by :) and column index 2.',
      difficulty: 'beginner',
      topicTag: 'data-science',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'arr[:, 2]', isCorrect: true },
        { id: 'opt-b', text: 'arr[2, :]', isCorrect: false },
        { id: 'opt-c', text: 'arr[2, 2]', isCorrect: false },
        { id: 'opt-d', text: 'arr[all, 2]', isCorrect: false },
      ],
    },
    {
      id: 'q_numpy_3_auto_4',
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
      id: 'q_numpy_3_auto_5',
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
      id: 'q_numpy_3_auto_6',
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
      id: 'q_numpy_3_auto_7',
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
      id: 'q_numpy_3_auto_8',
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
      id: 'q_numpy_3_auto_9',
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
      id: 'q_numpy_3_auto_10',
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
