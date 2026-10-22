import { JsLessonDefinition } from '../../types/jsLesson';

export const jsLesson10: JsLessonDefinition = {
  id: 'js-lesson-10',
  number: 10,
  slug: 'higher-order-array-methods',
  title: 'Higher-Order Array Methods (map, filter, reduce)',
  shortDescription: 'Master modern functional array transformations using map() for 1-to-1 conversion, filter() for subsets, and reduce() for aggregations.',
  estimatedMinutes: 9,
  learningObjectives: [
    'Transform array elements without mutating original data using .map()',
    'Filter elements based on boolean predicate conditions with .filter()',
    'Aggregate array elements into a single value using .reduce()',
  ],
  prerequisites: ['Lesson 6: Functions & Arrow Syntax.', 'Lesson 7: Working with Arrays.'],
  sections: [
    {
      id: 'sec-10-1',
      title: 'The Modern Array Trio: map and filter',
      content: `Instead of writing manual \`for\` loops with accumulators, modern JavaScript uses functional array methods:

• **\`.map()\`**: Transforms every item and returns a **brand new array of identical length**:
\`\`\`javascript
const prices = [10, 20, 30];
const withTax = prices.map(p => p * 1.1);
// [11, 22, 33]
\`\`\`

• **\`.filter()\`**: Returns a new array containing only elements that pass a test (\`true\`):
\`\`\`javascript
const scores = [45, 88, 92, 59];
const passing = scores.filter(s => s >= 70);
// [88, 92]
\`\`\``,
    },
    {
      id: 'sec-10-2',
      title: 'Aggregating with reduce()',
      content: `\`reduce()\` combines all elements into a single accumulated result (such as a sum, total, or map):

\`\`\`javascript
const numbers = [1, 2, 3, 4];
const sum = numbers.reduce((acc, curr) => acc + curr, 0);
console.log(sum); // 10
\`\`\`

• \`acc\`: The running total (accumulator).
• \`curr\`: The current item being processed.
• \`0\`: The initial starting value.`,
      syntaxSummary: [
        {
          keyword: 'array.map(fn)',
          description: 'Transforms every item into a new array.',
          example: 'nums.map(n => n * 2)',
        },
        {
          keyword: 'array.filter(fn)',
          description: 'Extracts matching elements into a new array.',
          example: 'nums.filter(n => n > 10)',
        },
        {
          keyword: 'array.reduce(fn, initial)',
          description: 'Boils an array down to a single value.',
          example: 'nums.reduce((sum, n) => sum + n, 0)',
        },
      ],
    },
  ],
  exercises: [
    {
      id: 'js-ex-10-1',
      lessonId: 'js-lesson-10',
      order: 1,
      title: 'Filter and Double Even Numbers',
      objective: 'Given const nums = [1, 2, 3, 4, 5, 6];, use .filter(n => n % 2 === 0) to get evens, then .map(n => n * 2) to double them, and print the resulting array.',
      initialCode: `const nums = [1, 2, 3, 4, 5, 6];\n\n// Filter evens and double them below:\n`,
      solutionCode: `const nums = [1, 2, 3, 4, 5, 6];\nconst result = nums.filter(n => n % 2 === 0).map(n => n * 2);\nconsole.log(JSON.stringify(result));`,
      expectedOutput: '[4,8,12]',
      hint: 'Chain .filter(n => n % 2 === 0).map(n => n * 2) and print JSON.stringify(result);',
      explanation: 'Chaining higher-order array methods creates declarative, highly readable data pipelines.',
      quickChips: ['.filter(n => n % 2 === 0)', '.map(n => n * 2)', 'console.log(JSON.stringify(result));'],
    },
  ],
  quiz: [
    {
      id: 'q-js-10-1',
      question: 'Which method returns a new array with the exact same number of elements as the original array, but transformed?',
      explanation: '.map() transforms each element one-to-one, maintaining the original array length.',
      difficulty: 'beginner',
      topicTag: 'javascript',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'filter()', isCorrect: false },
        { id: 'opt-b', text: 'map()', isCorrect: true },
        { id: 'opt-c', text: 'reduce()', isCorrect: false },
        { id: 'opt-d', text: 'find()', isCorrect: false },
      ],
    },
    {
      id: 'q-js-10-2',
      question: 'Do .map() and .filter() mutate (change) the original array in place?',
      explanation: 'No, map and filter are non-mutating; they return brand new arrays, leaving the original intact.',
      difficulty: 'beginner',
      topicTag: 'javascript',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'No, they return a new array and preserve the original', isCorrect: true },
        { id: 'opt-b', text: 'Yes, they alter the original array elements permanently', isCorrect: false },
        { id: 'opt-c', text: 'Only when used on numbers', isCorrect: false },
        { id: 'opt-d', text: 'Only if declared with let', isCorrect: false },
      ],
    },
    {
      id: 'q-js-10-3',
      question: 'What is the second argument passed to .reduce() (e.g. [1, 2].reduce((a, b) => a + b, 0))?',
      explanation: 'The second argument specifies the initial value of the accumulator.',
      difficulty: 'beginner',
      topicTag: 'javascript',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'The initial accumulator value', isCorrect: true },
        { id: 'opt-b', text: 'The maximum loop iteration count', isCorrect: false },
        { id: 'opt-c', text: 'The step size', isCorrect: false },
        { id: 'opt-d', text: 'The sort order', isCorrect: false },
      ],
    },
    {
      id: 'q_js_10_auto_4',
      question: "What fundamental JavaScript concept is demonstrated in Lesson 10 (Higher-Order Array Methods (map, filter, reduce))?",
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
      id: 'q_js_10_auto_5',
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
      id: 'q_js_10_auto_6',
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
      id: 'q_js_10_auto_7',
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
      id: 'q_js_10_auto_8',
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
      id: 'q_js_10_auto_9',
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
      id: 'q_js_10_auto_10',
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
