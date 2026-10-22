import { JsLessonDefinition } from '../../types/jsLesson';

export const jsLesson3: JsLessonDefinition = {
  id: 'js-lesson-3',
  number: 3,
  slug: 'data-types-and-template-literals',
  title: 'Data Types & Template Literals',
  shortDescription: 'Work with primitives (strings, numbers, booleans, null, undefined) and format text seamlessly using ES6 template literals.',
  estimatedMinutes: 8,
  learningObjectives: [
    'Identify JavaScript primitive types: string, number, boolean, null, undefined',
    'Inspect variable types using the typeof operator',
    'Interpolate variables inside backtick template literals (`Hello ${name}`)',
  ],
  prerequisites: ['Lesson 2: Variables & Constants.'],
  sections: [
    {
      id: 'sec-3-1',
      title: 'The Core Primitive Types',
      content: `JavaScript has 7 primitive types, but 5 are used daily:

1. **String**: Text data (\`"Alice"\`, \`'Code'\`).
2. **Number**: Integers and decimals (\`42\`, \`3.14\`).
3. **Boolean**: True or false values (\`true\`, \`false\`).
4. **Undefined**: A variable that has been declared but not assigned a value yet.
5. **Null**: Intentional absence of any value.

\`\`\`javascript
typeof "Hello";  // "string"
typeof 99;       // "number"
typeof true;     // "boolean"
\`\`\``,
    },
    {
      id: 'sec-3-2',
      title: 'Modern ES6 Template Literals',
      content: `In early JavaScript, combining strings and variables required messy \`+\` signs. Modern JavaScript uses **backticks** (\`\` \`...\` \`\`) and \`\${expression}\`:

\`\`\`javascript
const name = "Maya";
const age = 17;

// Clean template string
console.log(\`Student \${name} is \${age} years old.\`);
\`\`\`

• Any variable or calculation inside \`\${...}\` evaluates automatically!`,
      syntaxSummary: [
        {
          keyword: '`text ${variable}`',
          description: 'Backtick template literal for dynamic text interpolation.',
          example: '`Score: ${score}`',
        },
        {
          keyword: 'typeof value',
          description: 'Returns the data type of an operand as a string.',
          example: 'typeof 42; // "number"',
        },
      ],
    },
  ],
  exercises: [
    {
      id: 'js-ex-3-1',
      lessonId: 'js-lesson-3',
      order: 1,
      title: 'Format a Student Badge with Template Literals',
      objective: 'Given const student = "Leo" and const grade = "A", use template literals to print: "Student Leo achieved grade A."',
      initialCode: `const student = "Leo";\nconst grade = "A";\n\n// Print the interpolated string below:\n`,
      solutionCode: `const student = "Leo";\nconst grade = "A";\nconsole.log(\`Student \${student} achieved grade \${grade}.\`);`,
      expectedOutput: 'Student Leo achieved grade A.',
      hint: 'Use backticks: console.log(`Student ${student} achieved grade ${grade}.`);',
      explanation: 'Template literals with backticks evaluate ${variables} inline cleanly without concatenation plus signs.',
      quickChips: ['`Student ${student} achieved grade ${grade}.`', 'console.log()'],
    },
  ],
  quiz: [
    {
      id: 'q-js-3-1',
      question: 'Which characters are required to create an ES6 template literal string?',
      explanation: 'Template literals use backticks (`), located under the Esc key on standard keyboards.',
      difficulty: 'beginner',
      topicTag: 'javascript',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'Single quotes (\')', isCorrect: false },
        { id: 'opt-b', text: 'Backticks (`)', isCorrect: true },
        { id: 'opt-c', text: 'Double quotes (")', isCorrect: false },
        { id: 'opt-d', text: 'Parentheses ()', isCorrect: false },
      ],
    },
    {
      id: 'q-js-3-2',
      question: 'What is returned by typeof "42"?',
      explanation: 'Values wrapped in quotation marks are always of type "string".',
      difficulty: 'beginner',
      topicTag: 'javascript',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: '"number"', isCorrect: false },
        { id: 'opt-b', text: '"string"', isCorrect: true },
        { id: 'opt-c', text: '"boolean"', isCorrect: false },
        { id: 'opt-d', text: '"integer"', isCorrect: false },
      ],
    },
    {
      id: 'q-js-3-3',
      question: 'What is the value of a variable declared with let x; before any value is assigned to it?',
      explanation: 'Variables declared without an initial value default to undefined.',
      difficulty: 'beginner',
      topicTag: 'javascript',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'null', isCorrect: false },
        { id: 'opt-b', text: 'undefined', isCorrect: true },
        { id: 'opt-c', text: '0', isCorrect: false },
        { id: 'opt-d', text: 'false', isCorrect: false },
      ],
    },
    {
      id: 'q_js_3_auto_4',
      question: "What fundamental JavaScript concept is demonstrated in Lesson 3 (Data Types & Template Literals)?",
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
      id: 'q_js_3_auto_5',
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
      id: 'q_js_3_auto_6',
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
      id: 'q_js_3_auto_7',
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
      id: 'q_js_3_auto_8',
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
      id: 'q_js_3_auto_9',
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
      id: 'q_js_3_auto_10',
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
