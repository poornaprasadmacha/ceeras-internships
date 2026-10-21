import { JsLessonDefinition } from '../../types/jsLesson';

export const jsLesson7: JsLessonDefinition = {
  id: 'js-lesson-7',
  number: 7,
  slug: 'working-with-arrays',
  title: 'Working with Arrays',
  shortDescription: 'Store ordered lists of data, access elements by index, and modify lists using push(), pop(), and includes().',
  estimatedMinutes: 8,
  learningObjectives: [
    'Create arrays using square bracket syntax []',
    'Access and update items using zero-based index numbers',
    'Add and remove elements using .push() and .pop()',
  ],
  prerequisites: ['Lesson 2: Variables & Constants.'],
  sections: [
    {
      id: 'sec-7-1',
      title: 'Array Basics & Zero-Based Indexing',
      content: `Arrays hold ordered lists of items:

\`\`\`javascript
const languages = ["SQL", "Python", "HTML", "CSS"];

console.log(languages[0]); // "SQL" (First item)
console.log(languages[1]); // "Python"
console.log(languages.length); // 4
\`\`\`

• Array indexes start at **0**, not 1!
• The last element is located at \`languages[languages.length - 1]\`.`,
    },
    {
      id: 'sec-7-2',
      title: 'Common Array Methods',
      content: `• \`.push(item)\`: Appends an item to the **end** of the array.
• \`.pop()\`: Removes and returns the **last** item.
• \`.shift()\`: Removes the first item.
• \`.unshift(item)\`: Inserts an item at the beginning.
• \`.includes(item)\`: Returns \`true\` if the item exists in the array.

\`\`\`javascript
const tools = ["VS Code", "Terminal"];
tools.push("Git");
console.log(tools.includes("Git")); // true
\`\`\``,
      syntaxSummary: [
        {
          keyword: 'array.push(val)',
          description: 'Adds item to the end of an array.',
          example: 'list.push("New");',
        },
        {
          keyword: 'array.includes(val)',
          description: 'Checks if an array contains a value.',
          example: 'list.includes("SQL")',
        },
      ],
    },
  ],
  exercises: [
    {
      id: 'js-ex-7-1',
      lessonId: 'js-lesson-7',
      order: 1,
      title: 'Append and Inspect an Array',
      objective: 'Start with const stack = ["HTML", "CSS"];. Append "JavaScript" using stack.push("JavaScript"); and print stack.length.',
      initialCode: `const stack = ["HTML", "CSS"];\n\n// Append "JavaScript" and print stack.length below:\n`,
      solutionCode: `const stack = ["HTML", "CSS"];\nstack.push("JavaScript");\nconsole.log(stack.length);`,
      expectedOutput: '3',
      hint: 'Use stack.push("JavaScript"); then console.log(stack.length);',
      explanation: 'push adds an element to the end, increasing length from 2 to 3.',
      quickChips: ['stack.push("JavaScript");', 'console.log(stack.length);'],
    },
  ],
  quiz: [
    {
      id: 'q-js-7-1',
      question: 'What is the index of the first item in any JavaScript array?',
      explanation: 'JavaScript arrays use zero-based indexing, meaning the first element is at index 0.',
      difficulty: 'beginner',
      topicTag: 'javascript',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: '0', isCorrect: true },
        { id: 'opt-b', text: '1', isCorrect: false },
        { id: 'opt-c', text: '-1', isCorrect: false },
        { id: 'opt-d', text: 'first', isCorrect: false },
      ],
    },
    {
      id: 'q-js-7-2',
      question: 'Which method adds one or more elements to the very end of an array?',
      explanation: '.push() appends new elements to the end of an array.',
      difficulty: 'beginner',
      topicTag: 'javascript',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'push()', isCorrect: true },
        { id: 'opt-b', text: 'pop()', isCorrect: false },
        { id: 'opt-c', text: 'shift()', isCorrect: false },
        { id: 'opt-d', text: 'appendEnd()', isCorrect: false },
      ],
    },
    {
      id: 'q-js-7-3',
      question: 'What does [10, 20, 30].includes(20) evaluate to?',
      explanation: '.includes() returns true if the tested value is present in the array.',
      difficulty: 'beginner',
      topicTag: 'javascript',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'true', isCorrect: true },
        { id: 'opt-b', text: 'false', isCorrect: false },
        { id: 'opt-c', text: '1', isCorrect: false },
        { id: 'opt-d', text: '20', isCorrect: false },
      ],
    },
  ],
};
