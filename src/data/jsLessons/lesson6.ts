import { JsLessonDefinition } from '../../types/jsLesson';

export const jsLesson6: JsLessonDefinition = {
  id: 'js-lesson-6',
  number: 6,
  slug: 'functions-and-arrow-syntax',
  title: 'Functions & ES6 Arrow Syntax',
  shortDescription: 'Package reusable logic into functions, pass parameters, return values, and write concise modern arrow functions.',
  estimatedMinutes: 8,
  learningObjectives: [
    'Define reusable functions using standard function declarations and return statements',
    'Write concise modern ES6 arrow functions with implicit returns',
    'Assign default parameter values to prevent undefined errors',
  ],
  prerequisites: ['Lesson 2: Variables & Constants.'],
  sections: [
    {
      id: 'sec-6-1',
      title: 'Standard Function Declarations',
      content: `Functions encapsulate reusable blocks of code that can be executed on demand:

\`\`\`javascript
function calculateTotal(price, taxRate = 0.05) {
  return price + (price * taxRate);
}

const finalPrice = calculateTotal(100);
console.log(finalPrice); // 105
\`\`\`

• Functions accept **parameters** and send back results with the **\`return\`** keyword.
• If a function omits \`return\`, it returns \`undefined\` by default.`,
    },
    {
      id: 'sec-6-2',
      title: 'Modern ES6 Arrow Functions',
      content: `Arrow functions (\`=>\`) provide a shorter syntax:

\`\`\`javascript
// Standard syntax
const square = (n) => {
  return n * n;
};

// Concise one-line implicit return
const multiply = (a, b) => a * b;
console.log(multiply(4, 5)); // 20
\`\`\`

• When there is only one expression, curly braces and \`return\` can be omitted!`,
      syntaxSummary: [
        {
          keyword: 'const f = (a, b) => a + b',
          description: 'Arrow function with implicit return.',
          example: 'const double = (x) => x * 2;',
        },
      ],
    },
  ],
  exercises: [
    {
      id: 'js-ex-6-1',
      lessonId: 'js-lesson-6',
      order: 1,
      title: 'Write an Arrow Function to Calculate Perimeter',
      objective: 'Create an arrow function named getPerimeter that takes width and height, and returns 2 * (width + height). Then invoke it with 5 and 10 and print the result.',
      initialCode: `// Write your arrow function getPerimeter below:\n\n`,
      solutionCode: `const getPerimeter = (width, height) => 2 * (width + height);\nconsole.log(getPerimeter(5, 10));`,
      expectedOutput: '30',
      hint: 'Define const getPerimeter = (width, height) => 2 * (width + height); then console.log(getPerimeter(5, 10));',
      explanation: 'Arrow functions with implicit returns evaluate expressions directly and return the calculated value.',
      quickChips: ['const getPerimeter = (width, height) =>', 'console.log(getPerimeter(5, 10));'],
    },
  ],
  quiz: [
    {
      id: 'q-js-6-1',
      question: 'What is the default return value of a JavaScript function that does not include an explicit return statement?',
      explanation: 'Functions without return statements return undefined by default.',
      difficulty: 'beginner',
      topicTag: 'javascript',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: '0', isCorrect: false },
        { id: 'opt-b', text: 'undefined', isCorrect: true },
        { id: 'opt-c', text: 'null', isCorrect: false },
        { id: 'opt-d', text: 'false', isCorrect: false },
      ],
    },
    {
      id: 'q-js-6-2',
      question: 'Which syntax represents a valid single-line ES6 arrow function with an implicit return?',
      explanation: 'const add = (a, b) => a + b is the standard concise arrow syntax.',
      difficulty: 'beginner',
      topicTag: 'javascript',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'const add = (a, b) => a + b;', isCorrect: true },
        { id: 'opt-b', text: 'const add = (a, b) -> a + b;', isCorrect: false },
        { id: 'opt-c', text: 'function add = (a, b) => return a + b;', isCorrect: false },
        { id: 'opt-d', text: 'def add(a, b) => a + b;', isCorrect: false },
      ],
    },
    {
      id: 'q-js-6-3',
      question: 'What are values passed into a function when calling it known as?',
      explanation: 'When calling a function, values passed in are called arguments (which populate the function parameters).',
      difficulty: 'beginner',
      topicTag: 'javascript',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'Arguments', isCorrect: true },
        { id: 'opt-b', text: 'Attributes', isCorrect: false },
        { id: 'opt-c', text: 'Tags', isCorrect: false },
        { id: 'opt-d', text: 'Selects', isCorrect: false },
      ],
    },
    {
      id: 'q_js_6_auto_4',
      question: "What fundamental JavaScript concept is demonstrated in Lesson 6 (Functions & ES6 Arrow Syntax)?",
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
      id: 'q_js_6_auto_5',
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
      id: 'q_js_6_auto_6',
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
      id: 'q_js_6_auto_7',
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
      id: 'q_js_6_auto_8',
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
      id: 'q_js_6_auto_9',
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
      id: 'q_js_6_auto_10',
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
