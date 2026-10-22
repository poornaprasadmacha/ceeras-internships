import { JsLessonDefinition } from '../../types/jsLesson';

export const jsLesson11: JsLessonDefinition = {
  id: 'js-lesson-11',
  number: 11,
  slug: 'dom-manipulation-and-events',
  title: 'DOM Manipulation & Event Listeners',
  shortDescription: 'Interact directly with web pages: query HTML elements, modify text and classes, and respond to user clicks with addEventListener.',
  estimatedMinutes: 9,
  learningObjectives: [
    'Select HTML elements using document.querySelector() with CSS selectors',
    'Update text content safely using .textContent',
    'Listen and respond to user interactions using .addEventListener("click", callback)',
  ],
  prerequisites: ['HTML & CSS fundamentals.'],
  sections: [
    {
      id: 'sec-11-1',
      title: 'The Document Object Model (DOM)',
      content: `The **DOM** is the browser's internal tree representation of your HTML page. JavaScript uses the global \`document\` object to inspect and modify elements on the fly:

\`\`\`javascript
// Select first element matching CSS selector
const title = document.querySelector("h1");
const submitBtn = document.querySelector("#submit-btn");
const cards = document.querySelectorAll(".card"); // Returns NodeList

// Update text content
title.textContent = "Welcome Back, Alex!";
\`\`\``,
    },
    {
      id: 'sec-11-2',
      title: 'Listening to Events (addEventListener)',
      content: `Websites become interactive by reacting to user events (clicks, typing, scrolling):

\`\`\`javascript
const button = document.querySelector("button");

button.addEventListener("click", () => {
  console.log("Button was clicked!");
});
\`\`\`

• First parameter: Event name (\`"click"\`, \`"input"\`, \`"keydown"\`).
• Second parameter: Callback function to run when the event occurs.`,
      syntaxSummary: [
        {
          keyword: 'document.querySelector(sel)',
          description: 'Selects the first matching element in the DOM.',
          example: 'document.querySelector(".btn")',
        },
        {
          keyword: 'el.addEventListener(event, fn)',
          description: 'Attaches an event handler function to an element.',
          example: 'el.addEventListener("click", fn)',
        },
      ],
    },
  ],
  exercises: [
    {
      id: 'js-ex-11-1',
      lessonId: 'js-lesson-11',
      order: 1,
      title: 'Query and Inspect Element Content',
      objective: 'Write a script that creates a mock object element with textContent: "Saved Successfully", updates textContent to "All Changes Synced", and prints it using console.log(element.textContent);',
      initialCode: `// Create mock element, update textContent, and print below:\n\n`,
      solutionCode: `const element = { textContent: "Saved Successfully" };\nelement.textContent = "All Changes Synced";\nconsole.log(element.textContent);`,
      expectedOutput: 'All Changes Synced',
      hint: 'Set element.textContent = "All Changes Synced"; then console.log(element.textContent);',
      explanation: 'Setting textContent updates the text payload of DOM elements in memory.',
      quickChips: ['element.textContent = "All Changes Synced";', 'console.log(element.textContent);'],
    },
  ],
  quiz: [
    {
      id: 'q-js-11-1',
      question: 'Which method uses CSS selectors to find and return the first matching element on a web page?',
      explanation: 'document.querySelector() accepts standard CSS selector syntax to locate elements.',
      difficulty: 'beginner',
      topicTag: 'javascript',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'document.querySelector()', isCorrect: true },
        { id: 'opt-b', text: 'document.find()', isCorrect: false },
        { id: 'opt-c', text: 'document.select()', isCorrect: false },
        { id: 'opt-d', text: 'window.getElement()', isCorrect: false },
      ],
    },
    {
      id: 'q-js-11-2',
      question: 'Why is .textContent preferred over .innerHTML for updating plain text?',
      explanation: '.textContent prevents Cross-Site Scripting (XSS) injection vulnerabilities by treating content strictly as plain text.',
      difficulty: 'beginner',
      topicTag: 'javascript',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'It prevents XSS security vulnerabilities by never parsing HTML tags', isCorrect: true },
        { id: 'opt-b', text: 'It automatically translates the text', isCorrect: false },
        { id: 'opt-c', text: 'It creates database tables', isCorrect: false },
        { id: 'opt-d', text: 'It deletes the element permanently', isCorrect: false },
      ],
    },
    {
      id: 'q-js-11-3',
      question: 'Which method is the standard way to attach an event handler to a button in modern JavaScript?',
      explanation: 'element.addEventListener() is the W3C standard for binding event listeners.',
      difficulty: 'beginner',
      topicTag: 'javascript',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'addEventListener()', isCorrect: true },
        { id: 'opt-b', text: 'attachEvent()', isCorrect: false },
        { id: 'opt-c', text: 'onClick()', isCorrect: false },
        { id: 'opt-d', text: 'bindEvent()', isCorrect: false },
      ],
    },
    {
      id: 'q_js_11_auto_4',
      question: "What fundamental JavaScript concept is demonstrated in Lesson 11 (DOM Manipulation & Event Listeners)?",
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
      id: 'q_js_11_auto_5',
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
      id: 'q_js_11_auto_6',
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
      id: 'q_js_11_auto_7',
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
      id: 'q_js_11_auto_8',
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
      id: 'q_js_11_auto_9',
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
      id: 'q_js_11_auto_10',
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
