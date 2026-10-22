import { JsLessonDefinition } from '../../types/jsLesson';

export const jsLesson13: JsLessonDefinition = {
  id: 'js-lesson-13',
  number: 13,
  slug: 'error-handling-and-exceptions',
  title: 'Error Handling (try, catch & throw)',
  shortDescription: 'Defend your code against fatal crashes using try...catch blocks, throw custom exceptions, and execute finally cleanup code.',
  estimatedMinutes: 9,
  learningObjectives: [
    'Catch runtime errors gracefully using try...catch blocks',
    'Generate intentional errors using throw new Error("message")',
    'Execute guaranteed cleanup logic using the finally block',
  ],
  prerequisites: ['Lesson 5: Decisions with if, else & Ternary Operators.'],
  sections: [
    {
      id: 'sec-13-1',
      title: 'The try...catch Safety Net',
      content: `Uncaught errors crash JavaScript programs immediately. \`try...catch\` intercepts the error, allowing your application to show a helpful message and keep running:

\`\`\`javascript
try {
  // Risky operation (e.g. parsing user JSON)
  const result = JSON.parse("invalid-json");
} catch (error) {
  console.log("Caught an error safely:", error.message);
}
\`\`\``,
    },
    {
      id: 'sec-13-2',
      title: 'Throwing Custom Errors & finally',
      content: `You can trigger intentional validation errors using \`throw\`:

\`\`\`javascript
function withdraw(amount, balance) {
  if (amount > balance) {
    throw new Error("Insufficient funds available.");
  }
  return balance - amount;
}

try {
  withdraw(500, 100);
} catch (err) {
  console.log(err.message);
} finally {
  console.log("Transaction session ended."); // Always runs!
}
\`\`\``,
      syntaxSummary: [
        {
          keyword: 'try { ... } catch (err) { ... }',
          description: 'Catches runtime exceptions to prevent application crashes.',
          example: 'try { doTask(); } catch (e) { log(e); }',
        },
        {
          keyword: 'throw new Error(...)',
          description: 'Creates and throws a custom error object.',
          example: 'throw new Error("Invalid id");',
        },
      ],
    },
  ],
  exercises: [
    {
      id: 'js-ex-13-1',
      lessonId: 'js-lesson-13',
      order: 1,
      title: 'Catch and Recover from a JSON Parse Error',
      objective: 'Wrap JSON.parse("invalid{") inside a try...catch block. In the catch(err) block, print "Handled error gracefully".',
      initialCode: `// Write your try...catch block below:\n\n`,
      solutionCode: `try {\n  JSON.parse("invalid{");\n} catch (err) {\n  console.log("Handled error gracefully");\n}`,
      expectedOutput: 'Handled error gracefully',
      hint: 'Type try { JSON.parse("invalid{"); } catch(err) { console.log("Handled error gracefully"); }',
      explanation: 'try...catch intercepts the SyntaxError thrown by JSON.parse and redirects execution to the catch handler.',
      quickChips: ['try {', 'catch (err) {', 'console.log("Handled error gracefully");', '}'],
    },
  ],
  quiz: [
    {
      id: 'q-js-13-1',
      question: 'Which block in a try...catch statement is GUARANTEED to execute regardless of whether an error was thrown or not?',
      explanation: 'The finally block always runs after try and catch have completed execution.',
      difficulty: 'beginner',
      topicTag: 'javascript',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'finally', isCorrect: true },
        { id: 'opt-b', text: 'catch', isCorrect: false },
        { id: 'opt-c', text: 'then', isCorrect: false },
        { id: 'opt-d', text: 'rescue', isCorrect: false },
      ],
    },
    {
      id: 'q-js-13-2',
      question: 'How do you create and trigger an intentional custom error in JavaScript?',
      explanation: 'throw new Error("message") constructs a standard Error object and triggers the exception mechanism.',
      difficulty: 'beginner',
      topicTag: 'javascript',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'throw new Error("message")', isCorrect: true },
        { id: 'opt-b', text: 'catch Error("message")', isCorrect: false },
        { id: 'opt-c', text: 'return Error("message")', isCorrect: false },
        { id: 'opt-d', text: 'stop "message"', isCorrect: false },
      ],
    },
    {
      id: 'q-js-13-3',
      question: 'What property on a caught error object contains the human-readable explanation of the error?',
      explanation: 'error.message provides the descriptive text string associated with the exception.',
      difficulty: 'beginner',
      topicTag: 'javascript',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'error.message', isCorrect: true },
        { id: 'opt-b', text: 'error.text', isCorrect: false },
        { id: 'opt-c', text: 'error.title', isCorrect: false },
        { id: 'opt-d', text: 'error.reason', isCorrect: false },
      ],
    },
    {
      id: 'q_js_13_auto_4',
      question: "What fundamental JavaScript concept is demonstrated in Lesson 13 (Error Handling (try, catch & throw))?",
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
      id: 'q_js_13_auto_5',
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
      id: 'q_js_13_auto_6',
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
      id: 'q_js_13_auto_7',
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
      id: 'q_js_13_auto_8',
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
      id: 'q_js_13_auto_9',
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
      id: 'q_js_13_auto_10',
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
