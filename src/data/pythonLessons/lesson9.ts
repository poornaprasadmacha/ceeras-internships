import { PythonLessonDefinition } from '../../types/pythonLesson';

export const pythonLesson9: PythonLessonDefinition = {
  id: 'py-lesson-9',
  number: 9,
  slug: 'defining-custom-functions',
  title: 'Defining Functions with def',
  shortDescription: 'Package reusable blocks of logic into clean, modular functions.',
  estimatedMinutes: 12,
  learningObjectives: [
    'Define custom functions using the def keyword',
    'Pass arguments to function parameters',
    'Return calculated values using the return statement',
  ],
  prerequisites: ['Lesson 2: Variables and Lesson 3: Arithmetic.'],
  sections: [
    {
      id: 'sec-9-1',
      title: 'Why Functions Matter',
      content: `A **function** is a reusable block of code that performs a specific action:

\`\`\`python
def greet(name):
    return f"Hello, {name}!"
\`\`\`

Key Rules of Functions:
• Starts with \`def\` followed by the function name and parameters \`(x, y)\`
• End the header line with a colon \`:\`
• The function body must be **indented**
• Use \`return\` to send a result back to the caller
• Call the function using its name: \`result = greet("Alex")\``,
      codeExample: {
        code: `def add(a, b):\n    return a + b\n\ntotal = add(10, 25)\nprint(total)`,
        explanation: 'Defines an add function, passes 10 and 25, and prints 35.',
        output: '35',
      },
    },
  ],
  exercises: [
    {
      id: 'py-ex-9-1',
      lessonId: 'py-lesson-9',
      order: 1,
      title: 'Task 1: Create a Greeting Function',
      objective: 'Define a function say_hello() that prints "Hello, Learner!". Then call say_hello().',
      initialCode: '# Define say_hello() and call it:\n',
      solutionCode: 'def say_hello():\n    print("Hello, Learner!")\n\nsay_hello()',
      expectedOutput: 'Hello, Learner!',
      hint: 'def say_hello():\n    print("Hello, Learner!")\n\nsay_hello()',
      explanation: 'Defining the function stores the logic; calling say_hello() executes it.',
      quickChips: ['def say_hello():', '    print("Hello, Learner!")', 'say_hello()'],
    },
    {
      id: 'py-ex-9-2',
      lessonId: 'py-lesson-9',
      order: 2,
      title: 'Task 2: Function with Return Value',
      objective: 'Define square(n) that returns n * n. Call square(6) and print the result.',
      initialCode: '# Define square(n) and print square(6):\n',
      solutionCode: 'def square(n):\n    return n * n\n\nprint(square(6))',
      expectedOutput: '36',
      hint: 'def square(n):\n    return n * n\n\nprint(square(6))',
      explanation: 'The return statement sends 36 back, which print() displays.',
      quickChips: ['def square(n):', '    return n * n', 'print(square(6))'],
    },
  ],
  quiz: [
    {
      id: 'py-q-9-1',
      question: 'Which keyword is used to define a new function in Python?',
      explanation: 'The def keyword defines a function in Python.',
      difficulty: 'beginner',
      topicTag: 'functions',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'function', isCorrect: false },
        { id: 'opt-b', text: 'def', isCorrect: true },
        { id: 'opt-c', text: 'func', isCorrect: false },
        { id: 'opt-d', text: 'create', isCorrect: false },
      ],
    },
  ],
};
