import { NumpyLessonDefinition } from '../../types/numpyLesson';

export const numpyLesson4: NumpyLessonDefinition = {
  id: 'numpy-lesson-4',
  number: 4,
  slug: 'reshaping-transposing-flattening',
  title: 'Array Reshaping, Transposition & Flattening',
  shortDescription: 'Restructure array dimensions without copying data using .reshape(), swap axes with transposition (.T), and flatten multi-dimensional tensors.',
  estimatedMinutes: 10,
  learningObjectives: [
    'Reshape 1D arrays into 2D matrices and vice-versa using .reshape()',
    'Transpose matrices using .T to interchange rows and columns',
    'Flatten multi-dimensional arrays into 1D vectors for input into dense machine learning layers',
  ],
  prerequisites: ['Array Indexing, Slicing & Strides'],
  sections: [
    {
      id: 'sec-np-4-1',
      title: 'Reshaping ndarrays',
      content: `In deep learning and computer vision, images (e.g. $28 \\times 28$ pixels) are reshaped into flat $784$-element feature vectors before entering neural network layers.

The \`.reshape(rows, cols)\` method changes dimensions without altering the underlying data elements:
\`\`\`javascript
const arr = np.arange(1, 7); // [1, 2, 3, 4, 5, 6] (size 6)
const mat = arr.reshape(2, 3);
// => array([[1, 2, 3],
//           [4, 5, 6]])
\`\`\`

**Rule**: The product of the new shape dimensions ($r \\times c$) **must exactly equal** the original array size ($N$).`,
    },
    {
      id: 'sec-np-4-2',
      title: 'Matrix Transposition (.T)',
      content: `Transposing swaps rows and columns:
If matrix $A$ has shape $(M, N)$, then $A^T$ has shape $(N, M)$:
$$(A^T)_{ij} = A_{ji}$$

\`\`\`javascript
const mat = np.array([[1, 2, 3], [4, 5, 6]]); // shape (2, 3)
const transposed = mat.T; // shape (3, 2)
// => array([[1, 4],
//           [2, 5],
//           [3, 6]])
\`\`\``,
    },
  ],
  exercises: [
    {
      id: 'np-ex-4-1',
      lessonId: 'numpy-lesson-4',
      order: 1,
      title: 'Reshape and Transpose a 6-Element Array',
      objective: 'Create a 1D array of [1, 2, 3, 4, 5, 6], reshape it into a (2, 3) matrix, transpose it to (3, 2), and print the transposed shape.',
      initialCode: `const arr = np.array([1, 2, 3, 4, 5, 6]);

// 1. Reshape to 2 rows, 3 cols: arr.reshape(2, 3)
// 2. Transpose the matrix: mat.T
// 3. Print "Transposed shape:" followed by JSON.stringify(transposed.shape)
// 4. Render transposed matrix: plot.matrix(transposed, "Transposed 3x2 Matrix");

`,
      solutionCode: `const arr = np.array([1, 2, 3, 4, 5, 6]);
const mat = arr.reshape(2, 3);
const transposed = mat.T;

console.log("Transposed shape:", JSON.stringify(transposed.shape));
plot.matrix(transposed, "Transposed 3x2 Matrix");`,
      expectedOutput: `Transposed shape: [3,2]`,
      hint: 'Reshape arr to (2, 3) with arr.reshape(2, 3), get mat.T, and log JSON.stringify(transposed.shape).',
      explanation: 'The 2x3 matrix [[1, 2, 3], [4, 5, 6]] transposes into a 3x2 matrix [[1, 4], [2, 5], [3, 6]] with shape [3, 2].',
      quickChips: [
        'const mat = arr.reshape(2, 3);',
        'const transposed = mat.T;',
        'console.log("Transposed shape:", JSON.stringify(transposed.shape));',
        'plot.matrix(transposed, "Transposed 3x2 Matrix");',
      ],
    },
  ],
  quiz: [
    {
      id: 'q-np-4-1',
      question: 'Which of the following reshape operations will throw an error on an array with 12 total elements?',
      explanation: '3 * 5 = 15 elements, which does not equal the array size of 12 elements.',
      difficulty: 'beginner',
      topicTag: 'data-science',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'arr.reshape(3, 5)', isCorrect: true },
        { id: 'opt-b', text: 'arr.reshape(3, 4)', isCorrect: false },
        { id: 'opt-c', text: 'arr.reshape(2, 6)', isCorrect: false },
        { id: 'opt-d', text: 'arr.reshape(1, 12)', isCorrect: false },
      ],
    },
    {
      id: 'q-np-4-2',
      question: 'If a matrix has shape (4, 7), what is the shape of its transpose (.T)?',
      explanation: 'Transposition interchanges rows and columns, turning a (4, 7) matrix into a (7, 4) matrix.',
      difficulty: 'beginner',
      topicTag: 'data-science',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: '(7, 4)', isCorrect: true },
        { id: 'opt-b', text: '(4, 7)', isCorrect: false },
        { id: 'opt-c', text: '(1, 28)', isCorrect: false },
        { id: 'opt-d', text: '(14, 2)', isCorrect: false },
      ],
    },
    {
      id: 'q-np-4-3',
      question: 'In deep learning neural networks, why are 2D image matrices flattened into 1D vectors before entering dense (fully-connected) layers?',
      explanation: 'Dense neural layers compute dot products with 1D weight vectors, requiring input samples to be structured as flat 1D feature arrays.',
      difficulty: 'intermediate',
      topicTag: 'data-science',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'Dense layers expect a 1D input feature vector per sample for matrix dot products', isCorrect: true },
        { id: 'opt-b', text: 'Because 2D matrices cannot be stored in RAM', isCorrect: false },
        { id: 'opt-c', text: 'To delete color information from the picture', isCorrect: false },
        { id: 'opt-d', text: 'To force all pixel values to equal zero', isCorrect: false },
      ],
    },
  ],
};
