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
  ],
};
