import { JsLessonDefinition } from '../../types/jsLesson';

export const jsLesson5: JsLessonDefinition = {
  id: 'js-lesson-5',
  number: 5,
  slug: 'conditionals-and-branching',
  title: 'Decisions with if, else & Ternary Operators',
  shortDescription: 'Direct application flow using if, else if, else branches and concise ternary expressions (condition ? a : b).',
  estimatedMinutes: 8,
  learningObjectives: [
    'Execute branching logic using if, else if, and else blocks',
    'Write concise inline one-line decisions using the ternary operator',
    'Understand truthy and falsy values in JavaScript conditions',
  ],
  prerequisites: ['Lesson 4: Operators & Comparisons.'],
  sections: [
    {
      id: 'sec-5-1',
      title: 'Branching with if, else if, and else',
      content: `Conditionals allow programs to execute different code depending on input:

\`\`\`javascript
const score = 85;

if (score >= 90) {
  console.log("Grade: A");
} else if (score >= 80) {
  console.log("Grade: B");
} else {
  console.log("Grade: C");
}
\`\`\``,
    },
    {
      id: 'sec-5-2',
      title: 'The Ternary Operator (? :)',
      content: `For simple binary assignments, the **ternary operator** provides a clean one-liner:

\`\`\`javascript
// condition ? valueIfTrue : valueIfFalse
const status = score >= 50 ? "Passed" : "Needs Review";
console.log(status);
\`\`\`

• Reads naturally: "Is score >= 50? If yes, 'Passed', otherwise 'Needs Review'."`,
      syntaxSummary: [
        {
          keyword: 'if (condition) { }',
          description: 'Executes block if condition resolves truthy.',
          example: 'if (isReady) { start(); }',
        },
        {
          keyword: 'cond ? val1 : val2',
          description: 'Ternary conditional expression.',
          example: 'age >= 18 ? "Adult" : "Minor"',
        },
      ],
    },
  ],
  exercises: [
    {
      id: 'js-ex-5-1',
      lessonId: 'js-lesson-5',
      order: 1,
      title: 'Determine Member Access Level',
      objective: 'Given const hoursLearned = 45, if hoursLearned >= 40 print "Honor Student", otherwise print "Regular Student".',
      initialCode: `const hoursLearned = 45;\n\n// Write your if / else logic below:\n`,
      solutionCode: `const hoursLearned = 45;\nif (hoursLearned >= 40) {\n  console.log("Honor Student");\n} else {\n  console.log("Regular Student");\n}`,
      expectedOutput: 'Honor Student',
      hint: 'Use if (hoursLearned >= 40) { console.log("Honor Student"); } else { console.log("Regular Student"); }',
      explanation: '45 is greater than or equal to 40, so the first if block executes.',
      quickChips: ['if () {}', 'else {}', 'console.log("Honor Student");', 'console.log("Regular Student");'],
    },
  ],
  quiz: [
    {
      id: 'q-js-5-1',
      question: 'Which of the following values is treated as "falsy" in a JavaScript conditional check?',
      explanation: '0, "", null, undefined, NaN, and false are the standard falsy values in JavaScript.',
      difficulty: 'beginner',
      topicTag: 'javascript',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: '0', isCorrect: true },
        { id: 'opt-b', text: '"0" (string with zero)', isCorrect: false },
        { id: 'opt-c', text: '[] (empty array)', isCorrect: false },
        { id: 'opt-d', text: '{} (empty object)', isCorrect: false },
      ],
    },
    {
      id: 'q-js-5-2',
      question: 'What is the syntax structure of the ternary conditional operator?',
      explanation: 'condition ? expressionIfTrue : expressionIfFalse',
      difficulty: 'beginner',
      topicTag: 'javascript',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'condition ? ifTrue : ifFalse', isCorrect: true },
        { id: 'opt-b', text: 'condition : ifTrue ? ifFalse', isCorrect: false },
        { id: 'opt-c', text: 'if (condition) -> then', isCorrect: false },
        { id: 'opt-d', text: 'condition ?? ifTrue !! ifFalse', isCorrect: false },
      ],
    },
    {
      id: 'q-js-5-3',
      question: 'What gets printed by: console.log(true ? "Yes" : "No")?',
      explanation: 'Since the condition is true, the first expression ("Yes") is selected.',
      difficulty: 'beginner',
      topicTag: 'javascript',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: '"Yes"', isCorrect: true },
        { id: 'opt-b', text: '"No"', isCorrect: false },
        { id: 'opt-c', text: 'undefined', isCorrect: false },
        { id: 'opt-d', text: 'null', isCorrect: false },
      ],
    },
    {
      id: 'q_js_5_auto_4',
      question: "What fundamental JavaScript concept is demonstrated in Lesson 5 (Decisions with if, else & Ternary Operators)?",
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
      id: 'q_js_5_auto_5',
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
      id: 'q_js_5_auto_6',
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
      id: 'q_js_5_auto_7',
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
      id: 'q_js_5_auto_8',
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
      id: 'q_js_5_auto_9',
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
      id: 'q_js_5_auto_10',
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
