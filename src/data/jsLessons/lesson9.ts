import { JsLessonDefinition } from '../../types/jsLesson';

export const jsLesson9: JsLessonDefinition = {
  id: 'js-lesson-9',
  number: 9,
  slug: 'objects-and-key-value-pairs',
  title: 'Objects & Key-Value Dictionaries',
  shortDescription: 'Model real-world entities with JavaScript objects, access properties with dot and bracket notation, and use ES6 destructuring.',
  estimatedMinutes: 8,
  learningObjectives: [
    'Create structured data objects using curly brace literal syntax {}',
    'Read and update properties using dot notation (obj.prop) and bracket notation (obj["prop"])',
    'Unpack object properties quickly using ES6 object destructuring',
  ],
  prerequisites: ['Lesson 7: Working with Arrays.'],
  sections: [
    {
      id: 'sec-9-1',
      title: 'JavaScript Object Literals',
      content: `Objects store collections of labeled key-value pairs:

\`\`\`javascript
const user = {
  name: "Sarah",
  role: "Lead Engineer",
  active: true,
  skills: ["JavaScript", "SQL"]
};

// Dot notation (preferred)
console.log(user.name); // "Sarah"

// Bracket notation (useful for dynamic keys)
console.log(user["role"]); // "Lead Engineer"
\`\`\``,
    },
    {
      id: 'sec-9-2',
      title: 'ES6 Object Destructuring',
      content: `Destructuring extracts properties into independent variables with zero boilerplate:

\`\`\`javascript
const course = { title: "JavaScript Core", lessons: 14 };

// Unpacks title and lessons directly
const { title, lessons } = course;
console.log(title); // "JavaScript Core"
\`\`\``,
      syntaxSummary: [
        {
          keyword: 'const { a, b } = obj',
          description: 'Extracts properties from an object into local variables.',
          example: 'const { name } = person;',
        },
      ],
    },
  ],
  exercises: [
    {
      id: 'js-ex-9-1',
      lessonId: 'js-lesson-9',
      order: 1,
      title: 'Create and Unpack a Student Object',
      objective: 'Create an object named course with title: "JavaScript" and level: "Advanced". Use destructuring const { title, level } = course; and print `${title}: ${level}`.',
      initialCode: `// Create object and destructure below:\n\n`,
      solutionCode: `const course = {\n  title: "JavaScript",\n  level: "Advanced"\n};\nconst { title, level } = course;\nconsole.log(\`\${title}: \${level}\`);`,
      expectedOutput: 'JavaScript: Advanced',
      hint: 'Define const course = { title: "JavaScript", level: "Advanced" }; const { title, level } = course; console.log(`${title}: ${level}`);',
      explanation: 'Object destructuring unpacks values directly from keys into concise variables.',
      quickChips: ['const course = { title: "JavaScript", level: "Advanced" };', 'const { title, level } = course;', 'console.log(`${title}: ${level}`);'],
    },
  ],
  quiz: [
    {
      id: 'q-js-9-1',
      question: 'Which notation is typically used to access a property on an object when the property name is known and fixed?',
      explanation: 'Dot notation (e.g. user.name) is the standard and most readable property accessor in JavaScript.',
      difficulty: 'beginner',
      topicTag: 'javascript',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'Dot notation (user.name)', isCorrect: true },
        { id: 'opt-b', text: 'Arrow notation (user->name)', isCorrect: false },
        { id: 'opt-c', text: 'Colon notation (user::name)', isCorrect: false },
        { id: 'opt-d', text: 'Hash notation (user#name)', isCorrect: false },
      ],
    },
    {
      id: 'q-js-9-2',
      question: 'What happens if you attempt to access a property that does not exist on an object (e.g. user.salary)?',
      explanation: 'Accessing a non-existent property on an object evaluates to undefined.',
      difficulty: 'beginner',
      topicTag: 'javascript',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'It returns undefined', isCorrect: true },
        { id: 'opt-b', text: 'It throws a ReferenceError', isCorrect: false },
        { id: 'opt-c', text: 'It returns null', isCorrect: false },
        { id: 'opt-d', text: 'It returns 0', isCorrect: false },
      ],
    },
    {
      id: 'q-js-9-3',
      question: 'Which built-in method returns an array of all key names in an object?',
      explanation: 'Object.keys(obj) returns an array containing all enumerable property names.',
      difficulty: 'beginner',
      topicTag: 'javascript',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'Object.keys(obj)', isCorrect: true },
        { id: 'opt-b', text: 'obj.getKeys()', isCorrect: false },
        { id: 'opt-c', text: 'Array.fromKeys(obj)', isCorrect: false },
        { id: 'opt-d', text: 'Object.entriesList(obj)', isCorrect: false },
      ],
    },
    {
      id: 'q_js_9_auto_4',
      question: "What fundamental JavaScript concept is demonstrated in Lesson 9 (Objects & Key-Value Dictionaries)?",
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
      id: 'q_js_9_auto_5',
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
      id: 'q_js_9_auto_6',
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
      id: 'q_js_9_auto_7',
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
      id: 'q_js_9_auto_8',
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
      id: 'q_js_9_auto_9',
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
      id: 'q_js_9_auto_10',
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
