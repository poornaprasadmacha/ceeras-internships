import { JsLessonDefinition } from '../../types/jsLesson';

export const jsLesson2: JsLessonDefinition = {
  id: 'js-lesson-2',
  number: 2,
  slug: 'variables-and-constants',
  title: 'Variables & Constants (let & const)',
  shortDescription: 'Store, update, and protect data values in memory using modern ES6 variable declarations.',
  estimatedMinutes: 8,
  learningObjectives: [
    'Store reassignable values with let',
    'Store immutable constant references with const',
    'Understand why modern JavaScript avoids legacy var',
  ],
  prerequisites: ['Lesson 1: Hello JavaScript & Console Output.'],
  sections: [
    {
      id: 'sec-2-1',
      title: 'Declaring Variables with let and const',
      content: `Variables act as labeled boxes in computer memory to store data:

• **\`const\`**: For values that will **never** be reassigned. (Default to \`const\` unless you know a variable must change!).
• **\`let\`**: For values that will be updated or changed later.
• **\`var\`**: Old pre-2015 keyword. Has confusing scoping quirks and is avoided in modern code.

\`\`\`javascript
const schoolName = "Ceeras";
let currentStudents = 120;

currentStudents = 121; // Valid with let!
// schoolName = "Other"; // TypeError! Cannot reassign a const
\`\`\``,
    },
    {
      id: 'sec-2-2',
      title: 'Naming Conventions (camelCase)',
      content: `In JavaScript, variables use **camelCase**:

• Start with a lowercase letter.
• Capitalize the first letter of each subsequent word: \`userScore\`, \`maxScoreThreshold\`, \`isOnline\`.
• Names cannot start with numbers and cannot contain hyphens.`,
      syntaxSummary: [
        {
          keyword: 'const name = value',
          description: 'Declares an unchangeable constant binding.',
          example: 'const PI = 3.14159;',
        },
        {
          keyword: 'let name = value',
          description: 'Declares a reassignable variable.',
          example: 'let count = 0;',
        },
      ],
    },
  ],
  exercises: [
    {
      id: 'js-ex-2-1',
      lessonId: 'js-lesson-2',
      order: 1,
      title: 'Declare a Constant and Print It',
      objective: 'Declare a const named appName with the value "Ceeras Learn" and print it using console.log(appName);',
      initialCode: `// Declare const appName and print it:\n\n`,
      solutionCode: `const appName = "Ceeras Learn";\nconsole.log(appName);`,
      expectedOutput: 'Ceeras Learn',
      hint: 'Type const appName = "Ceeras Learn"; followed by console.log(appName);',
      explanation: 'const binds a value to an identifier that cannot be reassigned.',
      quickChips: ['const appName = "Ceeras Learn";', 'console.log(appName);'],
    },
    {
      id: 'js-ex-2-2',
      lessonId: 'js-lesson-2',
      order: 2,
      title: 'Update a let Variable',
      objective: 'Declare a let variable named score set to 10, add 5 to score, and print score.',
      initialCode: `// Declare let score = 10, increment it by 5, and print it:\n\n`,
      solutionCode: `let score = 10;\nscore = score + 5;\nconsole.log(score);`,
      expectedOutput: '15',
      hint: 'Declare let score = 10; then score = score + 5; then console.log(score);',
      explanation: 'Variables declared with let can be freely updated throughout your program.',
      quickChips: ['let score = 10;', 'score = score + 5;', 'console.log(score);'],
    },
  ],
  quiz: [
    {
      id: 'q-js-2-1',
      question: 'Which keyword should you use by default in modern JavaScript for values that will never be reassigned?',
      explanation: 'const is the industry standard default choice to prevent accidental variable reassignment bugs.',
      difficulty: 'beginner',
      topicTag: 'javascript',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'var', isCorrect: false },
        { id: 'opt-b', text: 'const', isCorrect: true },
        { id: 'opt-c', text: 'let', isCorrect: false },
        { id: 'opt-d', text: 'fixed', isCorrect: false },
      ],
    },
    {
      id: 'q-js-2-2',
      question: 'What error occurs if you attempt to reassign a const variable?',
      explanation: 'Reassigning a const variable triggers a TypeError: Assignment to constant variable.',
      difficulty: 'beginner',
      topicTag: 'javascript',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'TypeError: Assignment to constant variable', isCorrect: true },
        { id: 'opt-b', text: 'SyntaxError', isCorrect: false },
        { id: 'opt-c', text: 'No error, it silently overwrites', isCorrect: false },
        { id: 'opt-d', text: 'RangeError', isCorrect: false },
      ],
    },
    {
      id: 'q-js-2-3',
      question: 'Which of the following variable names follows proper JavaScript camelCase convention?',
      explanation: 'camelCase begins with a lowercase letter and capitalizes each subsequent concatenated word.',
      difficulty: 'beginner',
      topicTag: 'javascript',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'user_login_count', isCorrect: false },
        { id: 'opt-b', text: 'userLoginCount', isCorrect: true },
        { id: 'opt-c', text: 'UserLoginCount', isCorrect: false },
        { id: 'opt-d', text: 'user-login-count', isCorrect: false },
      ],
    },
  ],
};
