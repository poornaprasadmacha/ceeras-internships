import { NumpyLessonDefinition } from '../../types/numpyLesson';

export const numpyLesson11: NumpyLessonDefinition = {
  id: 'numpy-lesson-11',
  number: 11,
  slug: 'linalg-inverses-determinants-norms',
  title: 'Linear Algebra: Inverses, Determinants & Norms',
  shortDescription: 'Solve linear systems and measure geometric magnitudes using the numpy.linalg submodule: compute determinants, matrix inverses, and L1/L2 vector norms.',
  estimatedMinutes: 12,
  learningObjectives: [
    'Calculate the matrix determinant and explain its geometric interpretation as an area scaling factor',
    'Identify singular (non-invertible) matrices where det(A) = 0',
    'Calculate L2 Euclidean norms using np.linalg.norm() to quantify vector magnitude',
  ],
  prerequisites: ['Linear Algebra: Dot Products & Matrix Multiplication'],
  sections: [
    {
      id: 'sec-np-11-1',
      title: 'Matrix Determinants',
      content: `The **determinant** of a square matrix describes the scaling factor of the transformation on geometric volume or area.

For a $2 \\times 2$ matrix:
$$\\det \\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix} = ad - bc$$

• If $\\det(A) = 1$: The transformation preserves area exactly.
• If $\\det(A) < 0$: The transformation inverts orientation (flips space like a mirror).
• If $\\det(A) = 0$: The matrix is **singular**! It squashes space into a lower dimension (e.g. 2D plane into a 1D line), meaning its inverse **does not exist**.`,
    },
    {
      id: 'sec-np-11-2',
      title: 'Matrix Inverse & Systems of Equations',
      content: `The inverse $A^{-1}$ satisfies:
$$A A^{-1} = A^{-1} A = I$$

To solve the system of linear equations $Ax = b$:
$$x = A^{-1} b$$

In NumPy:
\`\`\`javascript
const det = np.linalg.det(A);
const inv = np.linalg.inv(A);
\`\`\``,
    },
    {
      id: 'sec-np-11-3',
      title: 'Vector Norms (L1 & L2)',
      content: `A **norm** measures the length or magnitude of a vector from the origin:
• **$L_2$ (Euclidean) Norm**:
  $$\\|v\\|_2 = \\sqrt{\\sum_{i=1}^{n} v_i^2}$$
  The straight-line geometric distance (e.g. for vector $[3, 4]$, $\\sqrt{3^2 + 4^2} = 5$).
• **$L_1$ (Manhattan) Norm**:
  $$\\|v\\|_1 = \\sum_{i=1}^{n} |v_i|$$`,
    },
  ],
  exercises: [
    {
      id: 'np-ex-11-1',
      lessonId: 'numpy-lesson-11',
      order: 1,
      title: 'Compute Matrix Determinant and Vector Norm',
      objective: 'Calculate the determinant of matrix A = [[4, 2], [1, 3]] using np.linalg.det(A), and compute the L2 norm of vector v = [3, 4] using np.linalg.norm(v).',
      initialCode: `const A = np.array([[4, 2], [1, 3]]);
const v = np.array([3, 4]);

// 1. Calculate determinant: np.linalg.det(A)
// 2. Calculate vector norm: np.linalg.norm(v)
// Print "Determinant:" followed by det
// Print "L2 Norm:" followed by norm

`,
      solutionCode: `const A = np.array([[4, 2], [1, 3]]);
const v = np.array([3, 4]);

const det = np.linalg.det(A);
const norm = np.linalg.norm(v);

console.log("Determinant:", det);
console.log("L2 Norm:", norm);`,
      expectedOutput: `Determinant: 10
L2 Norm: 5`,
      hint: 'Call np.linalg.det(A) and np.linalg.norm(v). Print "Determinant:" and "L2 Norm:".',
      explanation: 'Determinant is (4*3) - (2*1) = 12 - 2 = 10. Vector norm is sqrt(3^2 + 4^2) = sqrt(9 + 16) = 5.',
      quickChips: [
        'const det = np.linalg.det(A);',
        'const norm = np.linalg.norm(v);',
        'console.log("Determinant:", det);',
        'console.log("L2 Norm:", norm);',
      ],
    },
  ],
  quiz: [
    {
      id: 'q-np-11-1',
      question: 'What is true about a square matrix whose determinant is equal to 0 (det(A) = 0)?',
      explanation: 'A matrix with det = 0 is singular and non-invertible, meaning its inverse matrix does not exist.',
      difficulty: 'intermediate',
      topicTag: 'data-science',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'It is singular and has no matrix inverse', isCorrect: true },
        { id: 'opt-b', text: 'It is the identity matrix', isCorrect: false },
        { id: 'opt-c', text: 'All its eigenvalues are equal to 10', isCorrect: false },
        { id: 'opt-d', text: 'It can only store positive integers', isCorrect: false },
      ],
    },
    {
      id: 'q-np-11-2',
      question: 'What is the L2 (Euclidean) norm of the 3D vector [0, 6, 8]?',
      explanation: 'sqrt(0^2 + 6^2 + 8^2) = sqrt(0 + 36 + 64) = sqrt(100) = 10.',
      difficulty: 'beginner',
      topicTag: 'data-science',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: '10', isCorrect: true },
        { id: 'opt-b', text: '14', isCorrect: false },
        { id: 'opt-c', text: '48', isCorrect: false },
        { id: 'opt-d', text: '100', isCorrect: false },
      ],
    },
    {
      id: 'q-np-11-3',
      question: 'In the equation Ax = b, what linear algebra operation computes the solution vector x if matrix A is invertible?',
      explanation: 'Multiplying both sides by the inverse A^-1 gives x = A^-1 * b.',
      difficulty: 'beginner',
      topicTag: 'data-science',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'x = A^-1 * b (Matrix inverse multiplied by b)', isCorrect: true },
        { id: 'opt-b', text: 'x = A + b', isCorrect: false },
        { id: 'opt-c', text: 'x = b / A.shape', isCorrect: false },
        { id: 'opt-d', text: 'x = det(A) * b^2', isCorrect: false },
      ],
    },
    {
      id: 'q_numpy_11_auto_4',
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
      id: 'q_numpy_11_auto_5',
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
      id: 'q_numpy_11_auto_6',
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
      id: 'q_numpy_11_auto_7',
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
      id: 'q_numpy_11_auto_8',
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
      id: 'q_numpy_11_auto_9',
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
      id: 'q_numpy_11_auto_10',
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
