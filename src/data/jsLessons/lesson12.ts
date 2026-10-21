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
  ],
};
