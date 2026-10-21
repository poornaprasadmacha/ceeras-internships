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
  ],
};
