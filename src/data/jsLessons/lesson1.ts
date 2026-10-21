import { JsLessonDefinition } from '../../types/jsLesson';

export const jsLesson1: JsLessonDefinition = {
  id: 'js-lesson-1',
  number: 1,
  slug: 'hello-javascript-and-console',
  title: 'Hello JavaScript & Console Output',
  shortDescription: 'Execute your very first JavaScript code in the browser terminal using console.log() and understand statement flow.',
  estimatedMinutes: 8,
  learningObjectives: [
    'Understand JavaScript as the dynamic behavior engine of the modern web',
    'Print text, numbers, and expressions using console.log()',
    'Write single-line and multi-line comments',
  ],
  prerequisites: ['No prior programming background required.'],
  sections: [
    {
      id: 'sec-1-1',
      title: 'What is JavaScript?',
      content: `While **HTML** provides structure and **CSS** provides styling, **JavaScript** brings websites to life with dynamic behavior, calculations, and animations.

• JavaScript runs directly in every web browser on Earth without installing any software.
• It powers interactive web applications, games, real-time chats, and servers.`,
    },
    {
      id: 'sec-1-2',
      title: 'Printing with console.log()',
      content: `\`console.log()\` is the primary tool for printing messages and inspecting values in the terminal:

\`\`\`javascript
console.log("Hello, World!");
console.log(42);
console.log("2 + 2 =", 2 + 2);
\`\`\`

• Text strings must be wrapped in quotation marks (\`"..."\` or \`'...' \`).
• Numbers and mathematical calculations do not use quotation marks.
• Semicolons (\`;\`) mark the end of an instruction.`,
      syntaxSummary: [
        {
          keyword: 'console.log(...)',
          description: 'Prints information to the browser console.',
          example: 'console.log("Ready!");',
        },
        {
          keyword: '// comment',
          description: 'Single-line note ignored by JavaScript.',
          example: '// This is a note',
        },
      ],
    },
  ],
  exercises: [
    {
      id: 'js-ex-1-1',
      lessonId: 'js-lesson-1',
      order: 1,
      title: 'Print a Welcome Message',
      objective: 'Use console.log() to print the exact phrase: "Welcome to Ceeras Academy!"',
      initialCode: `// Write your console.log() statement below:\n\n`,
      solutionCode: `console.log("Welcome to Ceeras Academy!");`,
      expectedOutput: 'Welcome to Ceeras Academy!',
      hint: 'Type console.log("Welcome to Ceeras Academy!");',
      explanation: 'console.log() writes standard output to the console terminal.',
      quickChips: ['console.log("Welcome to Ceeras Academy!");', 'console.log()'],
    },
    {
      id: 'js-ex-1-2',
      lessonId: 'js-lesson-1',
      order: 2,
      title: 'Perform a Math Calculation',
      objective: 'Calculate and print the product of 12 multiplied by 8 using console.log(12 * 8);',
      initialCode: `// Print the calculation below:\n\n`,
      solutionCode: `console.log(12 * 8);`,
      expectedOutput: '96',
      hint: 'Type console.log(12 * 8); without quotes around numbers.',
      explanation: 'Omitting quotes instructs JavaScript to evaluate the numbers mathematically rather than treating them as literal text characters.',
      quickChips: ['console.log(12 * 8);', 'console.log(96);'],
    },
  ],
  quiz: [
    {
      id: 'q-js-1-1',
      question: 'Which method prints messages or debug data to the browser console terminal in JavaScript?',
      explanation: 'console.log() is the universal JavaScript logging function.',
      difficulty: 'beginner',
      topicTag: 'javascript',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'print()', isCorrect: false },
        { id: 'opt-b', text: 'console.log()', isCorrect: true },
        { id: 'opt-c', text: 'System.out.println()', isCorrect: false },
        { id: 'opt-d', text: 'echo()', isCorrect: false },
      ],
    },
    {
      id: 'q-js-1-2',
      question: 'Which symbol begins a single-line comment in JavaScript?',
      explanation: '// indicates a single-line comment ignored by the JavaScript engine.',
      difficulty: 'beginner',
      topicTag: 'javascript',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: '#', isCorrect: false },
        { id: 'opt-b', text: '//', isCorrect: true },
        { id: 'opt-c', text: '<!--', isCorrect: false },
        { id: 'opt-d', text: '--', isCorrect: false },
      ],
    },
    {
      id: 'q-js-1-3',
      question: 'What happens when you execute console.log("10" + "20") with quotes in JavaScript?',
      explanation: 'Quotation marks treat values as strings, performing concatenation to produce "1020".',
      difficulty: 'beginner',
      topicTag: 'javascript',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'It concatenates the strings and prints "1020"', isCorrect: true },
        { id: 'opt-b', text: 'It adds them mathematically and prints 30', isCorrect: false },
        { id: 'opt-c', text: 'It throws a SyntaxError', isCorrect: false },
        { id: 'opt-d', text: 'It prints 200', isCorrect: false },
      ],
    },
  ],
};
