import { NumpyLessonDefinition } from '../../types/numpyLesson';

export const numpyLesson7: NumpyLessonDefinition = {
  id: 'numpy-lesson-7',
  number: 7,
  slug: 'boolean-masking-and-filtering',
  title: 'Boolean Masking & Conditional Filtering',
  shortDescription: 'Query and subset ndarrays using vectorized comparisons, boolean index masks, bitwise logical operators (&, |), and the ternary np.where() routine.',
  estimatedMinutes: 10,
  learningObjectives: [
    'Generate boolean masks using vectorized comparison operators (>, <, ==, !=)',
    'Filter ndarray elements based on boolean criteria without writing iterative loops',
    'Combine compound logical queries using bitwise operators (&, |) and apply np.where()',
  ],
  prerequisites: ['The Golden Rule of NumPy: Broadcasting'],
  sections: [
    {
      id: 'sec-np-7-1',
      title: 'Vectorized Boolean Masks',
      content: `When you apply a comparison operator to a NumPy array, it evaluates element-by-element, returning an array of boolean flags:

\`\`\`javascript
const scores = np.array([55, 82, 94, 60, 45]);
// In Python: scores >= 70
// Returns: array([False, True, True, False, False])
\`\`\`

You can use this boolean array as an **index mask** to extract only the matching elements:
\`\`\`javascript
// In Python: passing_scores = scores[scores >= 70]
// Returns: array([82, 94])
\`\`\``,
    },
    {
      id: 'sec-np-7-2',
      title: 'The Ternary Operator: np.where()',
      content: `**\`np.where(condition, x, y)\`** is a vectorized if-else construct:
• If \`condition\` is True, yield \`x\`.
• If \`condition\` is False, yield \`y\`.

\`\`\`javascript
// Categorize grades as "Pass" (1) or "Fail" (0)
// np.where(scores >= 70, 1, 0)
\`\`\`
This forms the basis of thresholding in signal processing and feature binarization in machine learning.`,
    },
  ],
  exercises: [
    {
      id: 'np-ex-7-1',
      lessonId: 'numpy-lesson-7',
      order: 1,
      title: 'Filter Passing Test Scores',
      objective: 'Filter the array [45, 88, 72, 95, 30, 84] for values >= 70, print the passing count and the passing array.',
      initialCode: `const scores = np.array([45, 88, 72, 95, 30, 84]);

// 1. Filter elements >= 70: scores.data.filter(x => x >= 70)
// const passing = np.array(scores.data.filter(x => x >= 70));
// 2. Print "Passing count:" followed by passing.size
// 3. Print "Passing scores:" followed by passing.toString()

`,
      solutionCode: `const scores = np.array([45, 88, 72, 95, 30, 84]);
const passing = np.array((scores.data as number[]).filter(x => x >= 70));

console.log("Passing count:", passing.size);
console.log("Passing scores:", passing.toString());`,
      expectedOutput: `Passing count: 4
Passing scores: array([88, 72, 95, 84])`,
      hint: 'Filter elements >= 70 using .filter(x => x >= 70). Log passing.size and passing.toString().',
      explanation: 'Four scores are >= 70: 88, 72, 95, and 84.',
      quickChips: [
        'const passing = np.array((scores.data as number[]).filter(x => x >= 70));',
        'console.log("Passing count:", passing.size);',
        'console.log("Passing scores:", passing.toString());',
      ],
    },
  ],
  quiz: [
    {
      id: 'q-np-7-1',
      question: 'In Python NumPy, why must you use bitwise & and | rather than Python\'s "and" and "or" when combining multiple conditions on arrays?',
      explanation: 'The keywords "and" and "or" evaluate truth value of an entire object at once, whereas & and | operate element-by-element across boolean arrays.',
      difficulty: 'intermediate',
      topicTag: 'data-science',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: '& and | operate element-by-element across arrays, whereas "and" and "or" evaluate truthiness of the whole array', isCorrect: true },
        { id: 'opt-b', text: 'Python "and" and "or" are reserved for quantum computing', isCorrect: false },
        { id: 'opt-c', text: 'Bitwise operators automatically invert matrices', isCorrect: false },
        { id: 'opt-d', text: 'There is no difference; they are interchangeable', isCorrect: false },
      ],
    },
    {
      id: 'q-np-7-2',
      question: 'What is the return value of np.where(arr > 0, 1, -1)?',
      explanation: 'An array where positive values are replaced by 1 and non-positive values are replaced by -1.',
      difficulty: 'beginner',
      topicTag: 'data-science',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'An array replacing elements > 0 with 1, and all others with -1', isCorrect: true },
        { id: 'opt-b', text: 'A single boolean flag True or False', isCorrect: false },
        { id: 'opt-c', text: 'The indices where elements equal 0', isCorrect: false },
        { id: 'opt-d', text: 'An empty array of size 0', isCorrect: false },
      ],
    },
    {
      id: 'q-np-7-3',
      question: 'When indexing a 1D array with a boolean mask array of the exact same length, what is the shape of the output?',
      explanation: 'A 1D array containing only the elements where the mask was True.',
      difficulty: 'beginner',
      topicTag: 'data-science',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'A 1D array containing only the elements corresponding to True in the mask', isCorrect: true },
        { id: 'opt-b', text: 'A 2D matrix filled with True and False values', isCorrect: false },
        { id: 'opt-c', text: 'An array of the exact same size with zeros in place of False', isCorrect: false },
        { id: 'opt-d', text: 'An error occurs unless the array contains only integers', isCorrect: false },
      ],
    },
    {
      id: 'q_numpy_7_auto_4',
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
      id: 'q_numpy_7_auto_5',
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
      id: 'q_numpy_7_auto_6',
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
      id: 'q_numpy_7_auto_7',
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
      id: 'q_numpy_7_auto_8',
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
      id: 'q_numpy_7_auto_9',
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
      id: 'q_numpy_7_auto_10',
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
