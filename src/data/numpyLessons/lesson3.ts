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
  ],
};
