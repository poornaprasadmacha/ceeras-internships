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
  ],
};
