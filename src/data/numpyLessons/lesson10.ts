import { NumpyLessonDefinition } from '../../types/numpyLesson';

export const numpyLesson10: NumpyLessonDefinition = {
  id: 'numpy-lesson-10',
  number: 10,
  slug: 'matrix-multiplication-linear-algebra',
  title: 'Linear Algebra: Dot Products & Matrix Multiplication',
  shortDescription: 'Master the mathematical engine of graphics and neural networks: vector dot products, matrix compatibility rules, and matrix multiplication with np.dot() and np.matmul().',
  estimatedMinutes: 12,
  learningObjectives: [
    'Calculate the vector dot product and explain its relationship to cosine similarity and projection',
    'Verify inner dimension compatibility for matrix multiplication: (M x K) @ (K x N) -> (M x N)',
    'Execute matrix products using np.dot(A, B) and contrast with element-wise multiplication (*)',
  ],
  prerequisites: ['Stacking, Splitting & Concatenation'],
  sections: [
    {
      id: 'sec-np-10-1',
      title: 'Vector Dot Product',
      content: `The **dot product** of two vectors $u$ and $v$ is the sum of the products of their corresponding components:
$$u \\cdot v = \\sum_{i=1}^{n} u_i v_i = u_1 v_1 + u_2 v_2 + \\dots + u_n v_n$$

Geometric intuition:
$$u \\cdot v = \\|u\\| \\cdot \\|v\\| \\cos(\\theta)$$
• If vectors are orthogonal ($90^\\circ$): Dot product is **$0$**.
• If vectors point in identical directions: Dot product is maximized.
This makes the dot product the core mathematical operation for **cosine similarity** in recommendation engines and NLP embeddings!`,
    },
    {
      id: 'sec-np-10-2',
      title: 'Matrix Multiplication (Matrix Product)',
      content: `To multiply matrix $A$ by matrix $B$, the **number of columns in $A$ must equal the number of rows in $B$**:
$$(M \\times K) \\times (K \\times N) \\longrightarrow (M \\times N)$$

Each entry $C_{ij}$ in the resulting matrix is the dot product of row $i$ of matrix $A$ with column $j$ of matrix $B$:
$$C_{ij} = \\sum_{k=1}^{K} A_{ik} B_{kj}$$

\`\`\`javascript
const A = np.array([[1, 2], [3, 4]]);
const B = np.array([[2, 0], [1, 2]]);

np.dot(A, B);
// => array([[4, 4],
//           [10, 8]])
\`\`\``,
    },
  ],
  exercises: [
    {
      id: 'np-ex-10-1',
      lessonId: 'numpy-lesson-10',
      order: 1,
      title: 'Multiply Two 2x2 Matrices',
      objective: 'Multiply matrix A = [[1, 2], [3, 4]] by matrix B = [[2, 0], [1, 2]] using np.dot(A, B), print the product matrix and resulting shape.',
      initialCode: `const A = np.array([[1, 2], [3, 4]]);
const B = np.array([[2, 0], [1, 2]]);

// 1. Calculate matrix product: np.dot(A, B)
// 2. Print "Matrix product:" followed by C.toString()
// 3. Print "Product shape:" followed by JSON.stringify(C.shape)

`,
      solutionCode: `const A = np.array([[1, 2], [3, 4]]);
const B = np.array([[2, 0], [1, 2]]);

const C = np.dot(A, B);

console.log("Matrix product:", C.toString());
console.log("Product shape:", JSON.stringify(C.shape));`,
      expectedOutput: `Matrix product: array([[4, 4],
 [10, 8]])
Product shape: [2,2]`,
      hint: 'Compute C = np.dot(A, B). Log C.toString() and JSON.stringify(C.shape).',
      explanation: 'Row 0 dot Col 0: (1*2)+(2*1) = 4. Row 0 dot Col 1: (1*0)+(2*2) = 4. Row 1 dot Col 0: (3*2)+(4*1) = 10. Row 1 dot Col 1: (3*0)+(4*2) = 8.',
      quickChips: [
        'const C = np.dot(A, B);',
        'console.log("Matrix product:", C.toString());',
        'console.log("Product shape:", JSON.stringify(C.shape));',
      ],
    },
  ],
  quiz: [
    {
      id: 'q-np-10-1',
      question: 'Given matrix A of shape (3, 5) and matrix B of shape (5, 2), what is the shape of their matrix product A @ B?',
      explanation: 'Inner dimensions (5 and 5) match, leaving the outer dimensions (3, 2).',
      difficulty: 'beginner',
      topicTag: 'data-science',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: '(3, 2)', isCorrect: true },
        { id: 'opt-b', text: '(5, 5)', isCorrect: false },
        { id: 'opt-c', text: '(3, 5)', isCorrect: false },
        { id: 'opt-d', text: 'An error occurs because dimensions are not equal', isCorrect: false },
      ],
    },
    {
      id: 'q-np-10-2',
      question: 'What is the dot product of two non-zero vectors that are strictly perpendicular (at a 90-degree angle) to each other?',
      explanation: 'Since cos(90°) = 0, the dot product of any two orthogonal (perpendicular) vectors is exactly 0.',
      difficulty: 'beginner',
      topicTag: 'data-science',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: '0', isCorrect: true },
        { id: 'opt-b', text: '1', isCorrect: false },
        { id: 'opt-c', text: '-1', isCorrect: false },
        { id: 'opt-d', text: 'Infinity', isCorrect: false },
      ],
    },
    {
      id: 'q-np-10-3',
      question: 'Why does neural network inference heavily rely on matrix multiplication?',
      explanation: 'Passing inputs through a layer requires computing the weighted sum of all inputs for all neurons simultaneously: Z = XW + B.',
      difficulty: 'intermediate',
      topicTag: 'data-science',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'A single matrix product computes weighted inputs for thousands of neurons simultaneously (Z = XW + B)', isCorrect: true },
        { id: 'opt-b', text: 'Because matrices encrypt neural network weights', isCorrect: false },
        { id: 'opt-c', text: 'To delete biases from the model', isCorrect: false },
        { id: 'opt-d', text: 'Neural networks do not use matrix multiplication', isCorrect: false },
      ],
    },
    {
      id: 'q_numpy_10_auto_4',
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
      id: 'q_numpy_10_auto_5',
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
      id: 'q_numpy_10_auto_6',
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
      id: 'q_numpy_10_auto_7',
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
      id: 'q_numpy_10_auto_8',
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
      id: 'q_numpy_10_auto_9',
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
      id: 'q_numpy_10_auto_10',
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
