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
    {
      id: 'q_js_2_auto_4',
      question: "What fundamental JavaScript concept is demonstrated in Lesson 2 (Variables & Constants (let & const))?",
      explanation: "JavaScript provides imperative, functional, and asynchronous logic for dynamic applications.",
      difficulty: 'intermediate',
      topicTag: 'js',
      type: 'multiple-choice',
      options: [
        { id: 'opt_1', text: "Core ECMAScript language syntax, data manipulation, or asynchronous runtime execution", isCorrect: true },
        { id: 'opt_2', text: "Styling visual borders and margins", isCorrect: false },
        { id: 'opt_3', text: "Writing SQL table definitions", isCorrect: false },
        { id: 'opt_4', text: "Compiling operating system drivers", isCorrect: false },
      ],
    },
    {
      id: 'q_js_2_auto_5',
      question: "What is the difference between 'let' and 'const' variable declarations?",
      explanation: "Both let and const are block-scoped; const bindings cannot be reassigned, whereas let bindings can.",
      difficulty: 'intermediate',
      topicTag: 'js',
      type: 'multiple-choice',
      options: [
        { id: 'opt_1', text: "'let' allows variable reassignment, while 'const' prevents reassignment of the variable binding", isCorrect: true },
        { id: 'opt_2', text: "'const' variables can only store numbers", isCorrect: false },
        { id: 'opt_3', text: "'let' is globally scoped, while 'const' is block scoped", isCorrect: false },
        { id: 'opt_4', text: "There is no difference between them", isCorrect: false },
      ],
    },
    {
      id: 'q_js_2_auto_6',
      question: "Which comparison operator performs strict equality checking without type coercion in JavaScript?",
      explanation: "Strict equality (===) checks both value and type without performing implicit type coercion.",
      difficulty: 'intermediate',
      topicTag: 'js',
      type: 'multiple-choice',
      options: [
        { id: 'opt_1', text: "===", isCorrect: true },
        { id: 'opt_2', text: "==", isCorrect: false },
        { id: 'opt_3', text: "=", isCorrect: false },
        { id: 'opt_4', text: "!==", isCorrect: false },
      ],
    },
    {
      id: 'q_js_2_auto_7',
      question: "What does Array.prototype.map() return in JavaScript?",
      explanation: "map() transforms each element and returns a brand-new array of identical length without mutating the original.",
      difficulty: 'intermediate',
      topicTag: 'js',
      type: 'multiple-choice',
      options: [
        { id: 'opt_1', text: "A new array containing the results of calling a provided function on every element in the calling array", isCorrect: true },
        { id: 'opt_2', text: "The original array mutated in-place", isCorrect: false },
        { id: 'opt_3', text: "A single aggregated numeric total", isCorrect: false },
        { id: 'opt_4', text: "A boolean indicating if elements exist", isCorrect: false },
      ],
    },
    {
      id: 'q_js_2_auto_8',
      question: "How does the JavaScript event loop handle asynchronous tasks (e.g. Promises, setTimeout)?",
      explanation: "JavaScript is single-threaded; the event loop processes microtasks (Promises) and macrotasks when the call stack empties.",
      difficulty: 'intermediate',
      topicTag: 'js',
      type: 'multiple-choice',
      options: [
        { id: 'opt_1', text: "Asynchronous operations run in the background and their callbacks enter the microtask/task queues to execute when the call stack is clear", isCorrect: true },
        { id: 'opt_2', text: "JavaScript spawns a brand new thread for every function call", isCorrect: false },
        { id: 'opt_3', text: "Asynchronous code freezes the browser until finished", isCorrect: false },
        { id: 'opt_4', text: "Promises execute synchronously before any other line of code", isCorrect: false },
      ],
    },
    {
      id: 'q_js_2_auto_9',
      question: "What is a closure in JavaScript?",
      explanation: "A closure gives a function access to its outer scope even after the outer function has finished executing.",
      difficulty: 'intermediate',
      topicTag: 'js',
      type: 'multiple-choice',
      options: [
        { id: 'opt_1', text: "A function bundled together with references to its surrounding lexical environment", isCorrect: true },
        { id: 'opt_2', text: "A method that closes database connections", isCorrect: false },
        { id: 'opt_3', text: "A syntax error caused by unclosed brackets", isCorrect: false },
        { id: 'opt_4', text: "A keyword that stops loop execution", isCorrect: false },
      ],
    },
    {
      id: 'q_js_2_auto_10',
      question: "What does the async/await syntax provide over raw Promise chains (.then())?",
      explanation: "async/await is syntactic sugar over Promises that enhances readability and simplifies error handling.",
      difficulty: 'intermediate',
      topicTag: 'js',
      type: 'multiple-choice',
      options: [
        { id: 'opt_1', text: "It allows writing asynchronous code with clean, readable, synchronous-like structure and try/catch error handling", isCorrect: true },
        { id: 'opt_2', text: "It makes asynchronous functions run twice as fast", isCorrect: false },
        { id: 'opt_3', text: "It converts asynchronous code into multithreaded C++", isCorrect: false },
        { id: 'opt_4', text: "It removes the need for Promises entirely", isCorrect: false },
      ],
    },
  ],
};
