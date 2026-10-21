import { PythonLessonDefinition } from '../../types/pythonLesson';

export const pythonLesson1: PythonLessonDefinition = {
  id: 'py-lesson-1',
  number: 1,
  slug: 'hello-python-print',
  title: 'Hello Python & The print() Function',
  shortDescription: 'Write your very first Python program and display text on the computer screen.',
  estimatedMinutes: 8,
  learningObjectives: [
    'Understand how Python executes commands line by line',
    'Display text on the screen using the print() function',
    'Write code comments using the # symbol to document instructions',
  ],
  prerequisites: ['No prior programming experience required!'],
  sections: [
    {
      id: 'sec-1-1',
      title: 'Your First Python Statement',
      content: `Welcome to Python! Python is one of the world's most friendly and powerful programming languages.

To show words on the computer screen, you use the \`print()\` function:

• Words (text) must be wrapped inside quotation marks: \`"Hello"\` or \`'Hello'\`
• Everything inside the parentheses \`(...)\` is displayed in the terminal
• Python runs instructions in order, top to bottom!`,
      codeExample: {
        code: `print("Hello, World!")\nprint("Welcome to Python!")`,
        explanation: 'Displays two friendly greeting lines in the terminal.',
        output: 'Hello, World!\nWelcome to Python!',
      },
    },
    {
      id: 'sec-1-2',
      title: 'Code Comments',
      content: `Comments are notes for human readers. Python completely ignores any line starting with a hash symbol \`#\`:

• Use comments to explain tricky steps
• Helpful when working with classmates or teammates`,
      codeExample: {
        code: `# This is a comment\nprint("Code is running!")`,
        explanation: 'The first line is ignored by the Python engine, and the message is printed.',
      },
    },
  ],
  exercises: [
    {
      id: 'py-ex-1-1',
      lessonId: 'py-lesson-1',
      order: 1,
      title: 'Task 1: Say Hello to Ceeras',
      objective: 'Write a Python program that prints the exact phrase "Hello from Ceeras!" to the terminal.',
      initialCode: '# Use the print function to output "Hello from Ceeras!"\n',
      solutionCode: 'print("Hello from Ceeras!")',
      expectedOutput: 'Hello from Ceeras!',
      hint: 'Type: print("Hello from Ceeras!")',
      explanation: 'The print function displays text placed between quotes in the terminal console.',
      quickChips: ['print()', '"Hello from Ceeras!"'],
    },
    {
      id: 'py-ex-1-2',
      lessonId: 'py-lesson-1',
      order: 2,
      title: 'Task 2: Print Two Lines',
      objective: 'Print "Learning Python" on line 1, and "Building Skills" on line 2.',
      initialCode: '# Print two separate lines below:\n',
      solutionCode: 'print("Learning Python")\nprint("Building Skills")',
      expectedOutput: 'Learning Python\nBuilding Skills',
      hint: 'Use two separate print() calls on two lines.',
      explanation: 'Each print() statement outputs on a fresh line in the terminal.',
      quickChips: ['print()', '"Learning Python"', '"Building Skills"'],
    },
  ],
  quiz: [
    {
      id: 'py-q-1-1',
      question: 'Which symbol begins a single-line comment in Python?',
      explanation: 'The # hash symbol begins a single-line comment in Python.',
      difficulty: 'beginner',
      topicTag: 'syntax',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: '//', isCorrect: false },
        { id: 'opt-b', text: '#', isCorrect: true },
        { id: 'opt-c', text: '/*', isCorrect: false },
        { id: 'opt-d', text: '--', isCorrect: false },
      ],
    },
    {
      id: 'py-q-1-2',
      question: 'What is required around text words when using print()?',
      explanation: 'Text strings must always be enclosed in quotation marks ("..." or \'...\').',
      difficulty: 'beginner',
      topicTag: 'print',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'Quotation marks (" or \')', isCorrect: true },
        { id: 'opt-b', text: 'Square brackets [ ]', isCorrect: false },
        { id: 'opt-c', text: 'Angle brackets < >', isCorrect: false },
        { id: 'opt-d', text: 'Curly braces { }', isCorrect: false },
      ],
    },
  ],
};
