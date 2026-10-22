import { JsLessonDefinition } from '../../types/jsLesson';

export const jsLesson7: JsLessonDefinition = {
  id: 'js-lesson-7',
  number: 7,
  slug: 'working-with-arrays',
  title: 'Working with Arrays',
  shortDescription: 'Store ordered lists of data, access elements by index, and modify lists using push(), pop(), and includes().',
  estimatedMinutes: 8,
  learningObjectives: [
    'Create arrays using square bracket syntax []',
    'Access and update items using zero-based index numbers',
    'Add and remove elements using .push() and .pop()',
  ],
  prerequisites: ['Lesson 2: Variables & Constants.'],
  sections: [
    {
      id: 'sec-7-1',
      title: 'Array Basics & Zero-Based Indexing',
      content: `Arrays hold ordered lists of items:

\`\`\`javascript
const languages = ["SQL", "Python", "HTML", "CSS"];

console.log(languages[0]); // "SQL" (First item)
console.log(languages[1]); // "Python"
console.log(languages.length); // 4
\`\`\`

• Array indexes start at **0**, not 1!
• The last element is located at \`languages[languages.length - 1]\`.`,
    },
    {
      id: 'sec-7-2',
      title: 'Common Array Methods',
      content: `• \`.push(item)\`: Appends an item to the **end** of the array.
• \`.pop()\`: Removes and returns the **last** item.
• \`.shift()\`: Removes the first item.
• \`.unshift(item)\`: Inserts an item at the beginning.
• \`.includes(item)\`: Returns \`true\` if the item exists in the array.

\`\`\`javascript
const tools = ["VS Code", "Terminal"];
tools.push("Git");
console.log(tools.includes("Git")); // true
\`\`\``,
      syntaxSummary: [
        {
          keyword: 'array.push(val)',
          description: 'Adds item to the end of an array.',
          example: 'list.push("New");',
        },
        {
          keyword: 'array.includes(val)',
          description: 'Checks if an array contains a value.',
          example: 'list.includes("SQL")',
        },
      ],
    },
  ],
  exercises: [
    {
      id: 'js-ex-7-1',
      lessonId: 'js-lesson-7',
      order: 1,
      title: 'Append and Inspect an Array',
      objective: 'Start with const stack = ["HTML", "CSS"];. Append "JavaScript" using stack.push("JavaScript"); and print stack.length.',
      initialCode: `const stack = ["HTML", "CSS"];\n\n// Append "JavaScript" and print stack.length below:\n`,
      solutionCode: `const stack = ["HTML", "CSS"];\nstack.push("JavaScript");\nconsole.log(stack.length);`,
      expectedOutput: '3',
      hint: 'Use stack.push("JavaScript"); then console.log(stack.length);',
      explanation: 'push adds an element to the end, increasing length from 2 to 3.',
      quickChips: ['stack.push("JavaScript");', 'console.log(stack.length);'],
    },
  ],
  quiz: [
    {
      id: 'q-js-7-1',
      question: 'What is the index of the first item in any JavaScript array?',
      explanation: 'JavaScript arrays use zero-based indexing, meaning the first element is at index 0.',
      difficulty: 'beginner',
      topicTag: 'javascript',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: '0', isCorrect: true },
        { id: 'opt-b', text: '1', isCorrect: false },
        { id: 'opt-c', text: '-1', isCorrect: false },
        { id: 'opt-d', text: 'first', isCorrect: false },
      ],
    },
    {
      id: 'q-js-7-2',
      question: 'Which method adds one or more elements to the very end of an array?',
      explanation: '.push() appends new elements to the end of an array.',
      difficulty: 'beginner',
      topicTag: 'javascript',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'push()', isCorrect: true },
        { id: 'opt-b', text: 'pop()', isCorrect: false },
        { id: 'opt-c', text: 'shift()', isCorrect: false },
        { id: 'opt-d', text: 'appendEnd()', isCorrect: false },
      ],
    },
    {
      id: 'q-js-7-3',
      question: 'What does [10, 20, 30].includes(20) evaluate to?',
      explanation: '.includes() returns true if the tested value is present in the array.',
      difficulty: 'beginner',
      topicTag: 'javascript',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'true', isCorrect: true },
        { id: 'opt-b', text: 'false', isCorrect: false },
        { id: 'opt-c', text: '1', isCorrect: false },
        { id: 'opt-d', text: '20', isCorrect: false },
      ],
    },
    {
      id: 'q_js_7_auto_4',
      question: "What fundamental JavaScript concept is demonstrated in Lesson 7 (Working with Arrays)?",
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
      id: 'q_js_7_auto_5',
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
      id: 'q_js_7_auto_6',
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
      id: 'q_js_7_auto_7',
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
      id: 'q_js_7_auto_8',
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
      id: 'q_js_7_auto_9',
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
      id: 'q_js_7_auto_10',
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
