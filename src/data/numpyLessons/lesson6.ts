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
  ],
};
