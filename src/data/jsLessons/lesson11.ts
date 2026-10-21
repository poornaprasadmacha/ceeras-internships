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
  ],
};
