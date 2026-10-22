import { JsLessonDefinition } from '../../types/jsLesson';

export const jsLesson8: JsLessonDefinition = {
  id: 'js-lesson-8',
  number: 8,
  slug: 'loops-and-iteration',
  title: 'Loops & Iteration',
  shortDescription: 'Automate repetitive workflows using classic for loops, while conditions, and modern for...of array iteration.',
  estimatedMinutes: 8,
  learningObjectives: [
    'Construct standard 3-part for loops (initializer, condition, increment)',
    'Iterate through collections cleanly using modern for...of syntax',
    'Understand loop termination conditions to avoid infinite loops',
  ],
  prerequisites: ['Lesson 7: Working with Arrays.'],
  sections: [
    {
      id: 'sec-8-1',
      title: 'The Classic for Loop',
      content: `A standard \`for\` loop runs a set number of times:

\`\`\`javascript
for (let i = 1; i <= 3; i++) {
  console.log(\`Iteration: \${i}\`);
}
\`\`\`

1. \`let i = 1\`: Counter initialized once.
2. \`i <= 3\`: Condition checked before every loop cycle.
3. \`i++\`: Increments counter after each cycle.`,
    },
    {
      id: 'sec-8-2',
      title: 'Modern for...of Iteration',
      content: `When looping through items in an array, \`for...of\` is cleaner than tracking index numbers manually:

\`\`\`javascript
const courses = ["Python", "HTML", "CSS", "JS"];

for (const course of courses) {
  console.log(course);
}
\`\`\`

• Automatically retrieves each item in order until reaching the end.`,
      syntaxSummary: [
        {
          keyword: 'for (const item of array)',
          description: 'Iterates through array elements directly.',
          example: 'for (const x of list) { ... }',
        },
      ],
    },
  ],
  exercises: [
    {
      id: 'js-ex-8-1',
      lessonId: 'js-lesson-8',
      order: 1,
      title: 'Sum Numbers in an Array with for...of',
      objective: 'Given const numbers = [10, 20, 30];, calculate the sum using a let total = 0; accumulator and a for...of loop, then print total.',
      initialCode: `const numbers = [10, 20, 30];\nlet total = 0;\n\n// Loop and accumulate total below:\n`,
      solutionCode: `const numbers = [10, 20, 30];\nlet total = 0;\nfor (const n of numbers) {\n  total += n;\n}\nconsole.log(total);`,
      expectedOutput: '60',
      hint: 'Use for (const n of numbers) { total += n; } then console.log(total);',
      explanation: 'Accumulators start at 0 and add each item sequentially through the array.',
      quickChips: ['for (const n of numbers) {', 'total += n;', '}', 'console.log(total);'],
    },
  ],
  quiz: [
    {
      id: 'q-js-8-1',
      question: 'Which looping construct is specifically designed to iterate through values of an array without tracking index integers?',
      explanation: 'for...of iterates directly over the values of an iterable like an array.',
      difficulty: 'beginner',
      topicTag: 'javascript',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'for...in', isCorrect: false },
        { id: 'opt-b', text: 'for...of', isCorrect: true },
        { id: 'opt-c', text: 'while...do', isCorrect: false },
        { id: 'opt-d', text: 'switch...case', isCorrect: false },
      ],
    },
    {
      id: 'q-js-8-2',
      question: 'What does i++ do in the third expression of a standard for loop?',
      explanation: 'i++ is shorthand for i = i + 1, incrementing the variable by one.',
      difficulty: 'beginner',
      topicTag: 'javascript',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'Increments the variable i by 1', isCorrect: true },
        { id: 'opt-b', text: 'Multiplies i by 2', isCorrect: false },
        { id: 'opt-c', text: 'Checks if i is equal to 0', isCorrect: false },
        { id: 'opt-d', text: 'Stops the loop immediately', isCorrect: false },
      ],
    },
    {
      id: 'q-js-8-3',
      question: 'Which keyword immediately exits a loop early before its condition becomes false?',
      explanation: 'The break statement terminates the enclosing loop immediately.',
      difficulty: 'beginner',
      topicTag: 'javascript',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'exit', isCorrect: false },
        { id: 'opt-b', text: 'break', isCorrect: true },
        { id: 'opt-c', text: 'continue', isCorrect: false },
        { id: 'opt-d', text: 'stop', isCorrect: false },
      ],
    },
    {
      id: 'q_js_8_auto_4',
      question: "What fundamental JavaScript concept is demonstrated in Lesson 8 (Loops & Iteration)?",
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
      id: 'q_js_8_auto_5',
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
      id: 'q_js_8_auto_6',
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
      id: 'q_js_8_auto_7',
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
      id: 'q_js_8_auto_8',
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
      id: 'q_js_8_auto_9',
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
      id: 'q_js_8_auto_10',
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
