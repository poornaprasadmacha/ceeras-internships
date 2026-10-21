import { PythonLessonDefinition } from '../../types/pythonLesson';

export const pythonLesson3: PythonLessonDefinition = {
  id: 'py-lesson-3',
  number: 3,
  slug: 'math-operators-and-arithmetic',
  title: 'Arithmetic & Math Operations',
  shortDescription: 'Calculate math expressions, powers, and remainders with Python.',
  estimatedMinutes: 10,
  learningObjectives: [
    'Use standard math operators: +, -, *, and /',
    'Calculate remainders with modulo (%) and powers with exponentiation (**)',
    'Use floor division (//) to truncate decimals',
  ],
  prerequisites: ['Lesson 2: Variables and integers.'],
  sections: [
    {
      id: 'sec-3-1',
      title: 'Python as a Calculator',
      content: `Python is phenomenal at math calculations:

• **Addition (+)**: \`5 + 3\` gives \`8\`
• **Subtraction (-)**: \`10 - 4\` gives \`6\`
• **Multiplication (*)**: \`6 * 7\` gives \`42\`
• **Division (/)**: \`15 / 3\` gives \`5.0\` (always returns float)
• **Floor Division (//)**: \`7 // 2\` gives \`3\` (chops off decimal)
• **Modulo (%)**: \`7 % 2\` gives \`1\` (gives remainder)
• **Power (**)**: \`2 ** 3\` gives \`8\` (2 to the power 3)`,
      codeExample: {
        code: `total = 50 + 25\ndiscount = total * 0.1\nfinal_price = total - discount\nprint(final_price)`,
        explanation: 'Performs arithmetic calculation and displays the discounted price.',
        output: '67.5',
      },
    },
  ],
  exercises: [
    {
      id: 'py-ex-3-1',
      lessonId: 'py-lesson-3',
      order: 1,
      title: 'Task 1: Basic Math',
      objective: 'Calculate 15 multiplied by 4, assign it to a variable called result, and print result.',
      initialCode: '# Calculate 15 * 4 and print the result\n',
      solutionCode: 'result = 15 * 4\nprint(result)',
      expectedOutput: '60',
      hint: 'Type: result = 15 * 4, then print(result)',
      explanation: 'Asterisk (*) performs multiplication in Python.',
      quickChips: ['result = 15 * 4', 'print(result)'],
    },
    {
      id: 'py-ex-3-2',
      lessonId: 'py-lesson-3',
      order: 2,
      title: 'Task 2: Exponentiation (Powers)',
      objective: 'Calculate 2 to the 5th power using the ** operator, assign to power_val, and print power_val.',
      initialCode: '# Calculate 2 ** 5 and print power_val\n',
      solutionCode: 'power_val = 2 ** 5\nprint(power_val)',
      expectedOutput: '32',
      hint: 'Use: power_val = 2 ** 5, then print(power_val)',
      explanation: 'The double asterisk ** calculates exponents in Python.',
      quickChips: ['power_val = 2 ** 5', 'print(power_val)'],
    },
  ],
  quiz: [
    {
      id: 'py-q-3-1',
      question: 'What is the result of 17 % 5 in Python?',
      explanation: '17 divided by 5 is 3 with a remainder of 2. Modulo (%) returns the remainder (2).',
      difficulty: 'beginner',
      topicTag: 'math',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: '3', isCorrect: false },
        { id: 'opt-b', text: '2', isCorrect: true },
        { id: 'opt-c', text: '3.4', isCorrect: false },
        { id: 'opt-d', text: '5', isCorrect: false },
      ],
    },
  ],
};
