import { JsLessonDefinition } from '../../types/jsLesson';

export const jsLesson12: JsLessonDefinition = {
  id: 'js-lesson-12',
  number: 12,
  slug: 'asynchronous-javascript-and-async-await',
  title: 'Asynchronous JavaScript & async/await',
  shortDescription: 'Handle asynchronous operations without callback hell using modern Promises and clean async/await syntax.',
  estimatedMinutes: 9,
  learningObjectives: [
    'Understand why network fetches and file reads are asynchronous in JavaScript',
    'Understand Promise lifecycle states (pending, fulfilled, rejected)',
    'Write clean, readable sequential code using async and await',
  ],
  prerequisites: ['Lesson 6: Functions & Arrow Syntax.'],
  sections: [
    {
      id: 'sec-12-1',
      title: 'Synchronous vs Asynchronous Execution',
      content: `JavaScript runs on a single thread. If downloading a 10MB file stopped the entire thread, the browser would freeze completely.

• **Asynchronous operations** (network requests, timers, file access) are handed off in the background while the rest of your script keeps executing!
• When the background task finishes, a **Promise** resolves with the result.`,
    },
    {
      id: 'sec-12-2',
      title: 'Modern async and await',
      content: `ES2017 introduced \`async/await\`, making asynchronous code read just like traditional synchronous lines:

\`\`\`javascript
async function loadUserData() {
  console.log("Loading started...");
  
  // Pauses execution of this function until the promise completes
  const data = await fetchMockData();
  
  console.log("Data loaded:", data.name);
}
\`\`\`

• Any function marked with \`async\` automatically returns a Promise.
• \`await\` can only be used inside \`async\` functions.`,
      syntaxSummary: [
        {
          keyword: 'async function () { ... }',
          description: 'Defines an asynchronous function returning a Promise.',
          example: 'async function getData() { ... }',
        },
        {
          keyword: 'await promise',
          description: 'Pauses async execution until the promise resolves.',
          example: 'const res = await fetch(url);',
        },
      ],
    },
  ],
  exercises: [
    {
      id: 'js-ex-12-1',
      lessonId: 'js-lesson-12',
      order: 1,
      title: 'Resolve an Asynchronous Promise with await',
      objective: 'Define an async function fetchData that returns "Data received: 200 OK". Await and print its result using console.log(await fetchData());',
      initialCode: `// Write async function fetchData and print its awaited result below:\n\n`,
      solutionCode: `async function fetchData() {\n  return "Data received: 200 OK";\n}\nconsole.log(await fetchData());`,
      expectedOutput: 'Data received: 200 OK',
      hint: 'Define async function fetchData() { return "Data received: 200 OK"; } and console.log(await fetchData());',
      explanation: 'Marking a function as async wraps return values in a resolved Promise, which await unwraps cleanly.',
      quickChips: ['async function fetchData() {', 'return "Data received: 200 OK";', 'console.log(await fetchData());'],
    },
  ],
  quiz: [
    {
      id: 'q-js-12-1',
      question: 'What does a function marked with the async keyword always return?',
      explanation: 'Async functions always return a Promise (wrapping any return value in a resolved Promise).',
      difficulty: 'beginner',
      topicTag: 'javascript',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'A Promise', isCorrect: true },
        { id: 'opt-b', text: 'An array', isCorrect: false },
        { id: 'opt-c', text: 'A string', isCorrect: false },
        { id: 'opt-d', text: 'A number', isCorrect: false },
      ],
    },
    {
      id: 'q-js-12-2',
      question: 'What are the three possible states of a JavaScript Promise?',
      explanation: 'A Promise begins in the Pending state, and transitions into either Fulfilled (resolved) or Rejected (error).',
      difficulty: 'beginner',
      topicTag: 'javascript',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'Pending, Fulfilled, Rejected', isCorrect: true },
        { id: 'opt-b', text: 'Start, Pause, Stop', isCorrect: false },
        { id: 'opt-c', text: 'Active, Inactive, Deleted', isCorrect: false },
        { id: 'opt-d', text: 'Open, Closed, Reopened', isCorrect: false },
      ],
    },
    {
      id: 'q-js-12-3',
      question: 'Where can the await keyword be used in standard JavaScript?',
      explanation: 'The await keyword can only be used inside async functions or in top-level ES modules.',
      difficulty: 'beginner',
      topicTag: 'javascript',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'Inside async functions or top-level modules', isCorrect: true },
        { id: 'opt-b', text: 'Inside standard for loops only', isCorrect: false },
        { id: 'opt-c', text: 'Only in HTML script tags', isCorrect: false },
        { id: 'opt-d', text: 'Only in CSS files', isCorrect: false },
      ],
    },
    {
      id: 'q_js_12_auto_4',
      question: "What fundamental JavaScript concept is demonstrated in Lesson 12 (Asynchronous JavaScript & async/await)?",
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
      id: 'q_js_12_auto_5',
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
      id: 'q_js_12_auto_6',
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
      id: 'q_js_12_auto_7',
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
      id: 'q_js_12_auto_8',
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
      id: 'q_js_12_auto_9',
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
      id: 'q_js_12_auto_10',
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
