import { JsLessonDefinition } from '../../types/jsLesson';

export const jsLesson4: JsLessonDefinition = {
  id: 'js-lesson-4',
  number: 4,
  slug: 'operators-and-comparisons',
  title: 'Operators & Comparisons',
  shortDescription: 'Master strict equality (===), arithmetic calculations, remainder modulo (%), and logical operators (&&, ||, !).',
  estimatedMinutes: 8,
  learningObjectives: [
    'Use arithmetic operators: +, -, *, /, %, and ** (exponentiation)',
    'Understand why strict equality (===) is preferred over loose equality (==)',
    'Combine boolean conditions using && (AND), || (OR), and ! (NOT)',
  ],
  prerequisites: ['Lesson 3: Data Types & Template Literals.'],
  sections: [
    {
      id: 'sec-4-1',
      title: 'Strict Equality (===) vs Loose Equality (==)',
      content: `In JavaScript:

• **\`===\` (Strict Equality)**: Compares **both value AND data type**. Always use \`===\`!
• **\`==\` (Loose Equality)**: Attempts type coercion before comparing (leads to subtle bugs).

\`\`\`javascript
5 === "5"; // false (number !== string)
5 == "5";  // true (type coercion bug!)

10 !== 20; // true (strict inequality)
\`\`\``,
    },
    {
      id: 'sec-4-2',
      title: 'Logical Operators (&&, ||, !)',
      content: `• **\`&&\` (AND)**: True only if **both** sides are true.
• **\`||\` (OR)**: True if **at least one** side is true.
• **\`!\` (NOT)**: Flips a boolean value (\`!true\` becomes \`false\`).

\`\`\`javascript
const hasPass = true;
const isPaid = true;

const canEnter = hasPass && isPaid; // true
\`\`\``,
      syntaxSummary: [
        {
          keyword: 'a === b',
          description: 'Strict equality without type coercion.',
          example: '42 === 42',
        },
        {
          keyword: 'a && b',
          description: 'Logical AND (both must be true).',
          example: 'x > 0 && x < 10',
        },
      ],
    },
  ],
  exercises: [
    {
      id: 'js-ex-4-1',
      lessonId: 'js-lesson-4',
      order: 1,
      title: 'Evaluate Logical Eligibility',
      objective: 'Given const age = 18 and const hasLicense = true, evaluate if age >= 18 && hasLicense, and print the resulting boolean.',
      initialCode: `const age = 18;\nconst hasLicense = true;\n\n// Check if eligible and print result:\n`,
      solutionCode: `const age = 18;\nconst hasLicense = true;\nconsole.log(age >= 18 && hasLicense);`,
      expectedOutput: 'true',
      hint: 'Type console.log(age >= 18 && hasLicense);',
      explanation: 'Both age >= 18 and hasLicense evaluate to true, so the && expression resolves to true.',
      quickChips: ['console.log(age >= 18 && hasLicense);', '&&', '===', '||'],
    },
  ],
  quiz: [
    {
      id: 'q-js-4-1',
      question: 'Why do JavaScript style guides recommend === over ==?',
      explanation: '=== checks both type and value without performing unexpected type coercions.',
      difficulty: 'beginner',
      topicTag: 'javascript',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'It checks both type and value without unexpected type coercion', isCorrect: true },
        { id: 'opt-b', text: 'It runs 100 times faster in the browser', isCorrect: false },
        { id: 'opt-c', text: '== is deprecated and deleted in modern browsers', isCorrect: false },
        { id: 'opt-d', text: '=== only compares numbers', isCorrect: false },
      ],
    },
    {
      id: 'q-js-4-2',
      question: 'What is the result of 15 % 4 in JavaScript?',
      explanation: '15 divided by 4 is 3 with a remainder of 3. Modulo (%) returns the remainder.',
      difficulty: 'beginner',
      topicTag: 'javascript',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: '3', isCorrect: true },
        { id: 'opt-b', text: '1', isCorrect: false },
        { id: 'opt-c', text: '3.75', isCorrect: false },
        { id: 'opt-d', text: '0', isCorrect: false },
      ],
    },
    {
      id: 'q-js-4-3',
      question: 'What does the expression !false evaluate to in JavaScript?',
      explanation: '! is the logical NOT operator which inverts false to true.',
      difficulty: 'beginner',
      topicTag: 'javascript',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'false', isCorrect: false },
        { id: 'opt-b', text: 'true', isCorrect: true },
        { id: 'opt-c', text: 'undefined', isCorrect: false },
        { id: 'opt-d', text: 'null', isCorrect: false },
      ],
    },
    {
      id: 'q_js_4_auto_4',
      question: "What fundamental JavaScript concept is demonstrated in Lesson 4 (Operators & Comparisons)?",
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
      id: 'q_js_4_auto_5',
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
      id: 'q_js_4_auto_6',
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
      id: 'q_js_4_auto_7',
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
      id: 'q_js_4_auto_8',
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
      id: 'q_js_4_auto_9',
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
      id: 'q_js_4_auto_10',
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
