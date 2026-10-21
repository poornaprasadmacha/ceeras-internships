import { NumpyLessonDefinition } from '../../types/numpyLesson';

export const numpyLesson5: NumpyLessonDefinition = {
  id: 'numpy-lesson-5',
  number: 5,
  slug: 'vectorized-arithmetic',
  title: 'Vectorized Operations & Element-Wise Arithmetic',
  shortDescription: 'Eliminate slow, explicit loops with vectorization, perform parallel SIMD element-wise arithmetic, and accelerate numerical pipelines.',
  estimatedMinutes: 10,
  learningObjectives: [
    'Define vectorization and explain how it delegates loops to optimized C-level compiled code',
    'Execute element-wise addition, subtraction, multiplication, and division across ndarrays',
    'Differentiate between element-wise multiplication (*) and linear algebra matrix multiplication (@)',
  ],
  prerequisites: ['Array Reshaping, Transposition & Flattening'],
  sections: [
    {
      id: 'sec-np-5-1',
      title: 'The Magic of Vectorization',
      content: `In standard Python, applying a transformation to every item in a list requires an explicit \`for\` loop:

\`\`\`python
# Slow Python loop (checks object types 1,000,000 times)
result = [x * 2 for x in my_list]
\`\`\`

In NumPy, operations are **vectorized**:
\`\`\`javascript
// Fast NumPy vectorization (C-compiled loop with SIMD parallelism)
const result = np.multiply(arr, 2);
\`\`\`
Vectorization expresses operations on entire arrays at once rather than individual elements, pushing execution to compiled machine code and running up to $100\\times$ faster.`,
    },
    {
      id: 'sec-np-5-2',
      title: 'Element-Wise Math',
      content: `All basic arithmetic operates **element-by-element**:
\`\`\`javascript
const a = np.array([1, 2, 3]);
const b = np.array([10, 20, 30]);

np.add(a, b);      // => array([11, 22, 33])
np.multiply(a, b); // => array([10, 40, 90])
\`\`\`

**Crucial Warning**:
In NumPy, \`np.multiply(A, B)\` (or \`A * B\`) performs **element-wise multiplication** (the Hadamard product). It is NOT matrix multiplication! Matrix multiplication uses \`np.dot(A, B)\` or \`A @ B\`.`,
    },
  ],
  exercises: [
    {
      id: 'np-ex-5-1',
      lessonId: 'numpy-lesson-5',
      order: 1,
      title: 'Execute Element-Wise Vector Arithmetic',
      objective: 'Given vectors a = [1, 2, 3] and b = [10, 20, 30], compute their element-wise sum with np.add(a, b) and product with np.multiply(a, b), and print both.',
      initialCode: `const a = np.array([1, 2, 3]);
const b = np.array([10, 20, 30]);

// 1. Calculate sum: np.add(a, b)
// 2. Calculate product: np.multiply(a, b)
// Print "Sum:" followed by sumArr.toString()
// Print "Product:" followed by prodArr.toString()

`,
      solutionCode: `const a = np.array([1, 2, 3]);
const b = np.array([10, 20, 30]);

const sumArr = np.add(a, b);
const prodArr = np.multiply(a, b);

console.log("Sum:", sumArr.toString());
console.log("Product:", prodArr.toString());`,
      expectedOutput: `Sum: array([11, 22, 33])
Product: array([10, 40, 90])`,
      hint: 'Call np.add(a, b) and np.multiply(a, b). Log both with .toString().',
      explanation: 'Addition yields [1+10, 2+20, 3+30] = [11, 22, 33]. Multiplication yields [1*10, 2*20, 3*30] = [10, 40, 90].',
      quickChips: [
        'const sumArr = np.add(a, b);',
        'const prodArr = np.multiply(a, b);',
        'console.log("Sum:", sumArr.toString());',
        'console.log("Product:", prodArr.toString());',
      ],
    },
  ],
  quiz: [
    {
      id: 'q-np-5-1',
      question: 'In NumPy, what mathematical operation is performed by np.multiply(A, B) or the * operator between two matrices?',
      explanation: 'The * operator and np.multiply perform element-wise multiplication (Hadamard product), multiplying corresponding entries together.',
      difficulty: 'beginner',
      topicTag: 'data-science',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'Element-wise multiplication (Hadamard product)', isCorrect: true },
        { id: 'opt-b', text: 'Linear algebra matrix multiplication', isCorrect: false },
        { id: 'opt-c', text: 'Cross product of 3D vectors', isCorrect: false },
        { id: 'opt-d', text: 'Matrix inversion', isCorrect: false },
      ],
    },
    {
      id: 'q-np-5-2',
      question: 'Why is vectorization in NumPy orders of magnitude faster than a standard Python "for" loop?',
      explanation: 'Vectorized operations execute in compiled C code with optimized memory access patterns and hardware SIMD CPU instructions without Python interpreter overhead.',
      difficulty: 'intermediate',
      topicTag: 'data-science',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'It runs in compiled C with CPU SIMD instructions, eliminating per-element Python interpreter overhead', isCorrect: true },
        { id: 'opt-b', text: 'It ignores decimal places and rounds all numbers to zero', isCorrect: false },
        { id: 'opt-c', text: 'It only computes the first and last numbers in the list', isCorrect: false },
        { id: 'opt-d', text: 'It reduces the array to 1 element', isCorrect: false },
      ],
    },
    {
      id: 'q-np-5-3',
      question: 'What is the result of np.array([2, 4, 6]) + 10?',
      explanation: 'The scalar 10 is added element-wise to each element: [12, 14, 16].',
      difficulty: 'beginner',
      topicTag: 'data-science',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'array([12, 14, 16])', isCorrect: true },
        { id: 'opt-b', text: 'array([2, 4, 6, 10])', isCorrect: false },
        { id: 'opt-c', text: 'An error because dimensions do not match', isCorrect: false },
        { id: 'opt-d', text: 'array([20, 40, 60])', isCorrect: false },
      ],
    },
  ],
};
