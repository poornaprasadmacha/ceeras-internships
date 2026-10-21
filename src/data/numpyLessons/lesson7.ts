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
  ],
};
