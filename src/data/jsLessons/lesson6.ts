import { JsLessonDefinition } from '../../types/jsLesson';

export const jsLesson6: JsLessonDefinition = {
  id: 'js-lesson-6',
  number: 6,
  slug: 'functions-and-arrow-syntax',
  title: 'Functions & ES6 Arrow Syntax',
  shortDescription: 'Package reusable logic into functions, pass parameters, return values, and write concise modern arrow functions.',
  estimatedMinutes: 8,
  learningObjectives: [
    'Define reusable functions using standard function declarations and return statements',
    'Write concise modern ES6 arrow functions with implicit returns',
    'Assign default parameter values to prevent undefined errors',
  ],
  prerequisites: ['Lesson 2: Variables & Constants.'],
  sections: [
    {
      id: 'sec-6-1',
      title: 'Standard Function Declarations',
      content: `Functions encapsulate reusable blocks of code that can be executed on demand:

\`\`\`javascript
function calculateTotal(price, taxRate = 0.05) {
  return price + (price * taxRate);
}

const finalPrice = calculateTotal(100);
console.log(finalPrice); // 105
\`\`\`

• Functions accept **parameters** and send back results with the **\`return\`** keyword.
• If a function omits \`return\`, it returns \`undefined\` by default.`,
    },
    {
      id: 'sec-6-2',
      title: 'Modern ES6 Arrow Functions',
      content: `Arrow functions (\`=>\`) provide a shorter syntax:

\`\`\`javascript
// Standard syntax
const square = (n) => {
  return n * n;
};

// Concise one-line implicit return
const multiply = (a, b) => a * b;
console.log(multiply(4, 5)); // 20
\`\`\`

• When there is only one expression, curly braces and \`return\` can be omitted!`,
      syntaxSummary: [
        {
          keyword: 'const f = (a, b) => a + b',
          description: 'Arrow function with implicit return.',
          example: 'const double = (x) => x * 2;',
        },
      ],
    },
  ],
  exercises: [
    {
      id: 'js-ex-6-1',
      lessonId: 'js-lesson-6',
      order: 1,
      title: 'Write an Arrow Function to Calculate Perimeter',
      objective: 'Create an arrow function named getPerimeter that takes width and height, and returns 2 * (width + height). Then invoke it with 5 and 10 and print the result.',
      initialCode: `// Write your arrow function getPerimeter below:\n\n`,
      solutionCode: `const getPerimeter = (width, height) => 2 * (width + height);\nconsole.log(getPerimeter(5, 10));`,
      expectedOutput: '30',
      hint: 'Define const getPerimeter = (width, height) => 2 * (width + height); then console.log(getPerimeter(5, 10));',
      explanation: 'Arrow functions with implicit returns evaluate expressions directly and return the calculated value.',
      quickChips: ['const getPerimeter = (width, height) =>', 'console.log(getPerimeter(5, 10));'],
    },
  ],
  quiz: [
    {
      id: 'q-js-6-1',
      question: 'What is the default return value of a JavaScript function that does not include an explicit return statement?',
      explanation: 'Functions without return statements return undefined by default.',
      difficulty: 'beginner',
      topicTag: 'javascript',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: '0', isCorrect: false },
        { id: 'opt-b', text: 'undefined', isCorrect: true },
        { id: 'opt-c', text: 'null', isCorrect: false },
        { id: 'opt-d', text: 'false', isCorrect: false },
      ],
    },
    {
      id: 'q-js-6-2',
      question: 'Which syntax represents a valid single-line ES6 arrow function with an implicit return?',
      explanation: 'const add = (a, b) => a + b is the standard concise arrow syntax.',
      difficulty: 'beginner',
      topicTag: 'javascript',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'const add = (a, b) => a + b;', isCorrect: true },
        { id: 'opt-b', text: 'const add = (a, b) -> a + b;', isCorrect: false },
        { id: 'opt-c', text: 'function add = (a, b) => return a + b;', isCorrect: false },
        { id: 'opt-d', text: 'def add(a, b) => a + b;', isCorrect: false },
      ],
    },
    {
      id: 'q-js-6-3',
      question: 'What are values passed into a function when calling it known as?',
      explanation: 'When calling a function, values passed in are called arguments (which populate the function parameters).',
      difficulty: 'beginner',
      topicTag: 'javascript',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'Arguments', isCorrect: true },
        { id: 'opt-b', text: 'Attributes', isCorrect: false },
        { id: 'opt-c', text: 'Tags', isCorrect: false },
        { id: 'opt-d', text: 'Selects', isCorrect: false },
      ],
    },
  ],
};
