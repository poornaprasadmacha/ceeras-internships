import { JsLessonDefinition } from '../../types/jsLesson';

export const jsLesson8: JsLessonDefinition = {
  id: 'js-lesson-8',
  number: 8,
  slug: 'loops-and-iteration',
  title: 'Loops & Iteration',
  shortDescription: 'Automate repetitive workflows using classic for loops, while conditions, and modern for...of array iteration.',
  estimatedMinutes: 8,
  learningObjectives: [
    'Construct standard 3-part for loops (initializer, condition, increment)',
    'Iterate through collections cleanly using modern for...of syntax',
    'Understand loop termination conditions to avoid infinite loops',
  ],
  prerequisites: ['Lesson 7: Working with Arrays.'],
  sections: [
    {
      id: 'sec-8-1',
      title: 'The Classic for Loop',
      content: `A standard \`for\` loop runs a set number of times:

\`\`\`javascript
for (let i = 1; i <= 3; i++) {
  console.log(\`Iteration: \${i}\`);
}
\`\`\`

1. \`let i = 1\`: Counter initialized once.
2. \`i <= 3\`: Condition checked before every loop cycle.
3. \`i++\`: Increments counter after each cycle.`,
    },
    {
      id: 'sec-8-2',
      title: 'Modern for...of Iteration',
      content: `When looping through items in an array, \`for...of\` is cleaner than tracking index numbers manually:

\`\`\`javascript
const courses = ["Python", "HTML", "CSS", "JS"];

for (const course of courses) {
  console.log(course);
}
\`\`\`

• Automatically retrieves each item in order until reaching the end.`,
      syntaxSummary: [
        {
          keyword: 'for (const item of array)',
          description: 'Iterates through array elements directly.',
          example: 'for (const x of list) { ... }',
        },
      ],
    },
  ],
  exercises: [
    {
      id: 'js-ex-8-1',
      lessonId: 'js-lesson-8',
      order: 1,
      title: 'Sum Numbers in an Array with for...of',
      objective: 'Given const numbers = [10, 20, 30];, calculate the sum using a let total = 0; accumulator and a for...of loop, then print total.',
      initialCode: `const numbers = [10, 20, 30];\nlet total = 0;\n\n// Loop and accumulate total below:\n`,
      solutionCode: `const numbers = [10, 20, 30];\nlet total = 0;\nfor (const n of numbers) {\n  total += n;\n}\nconsole.log(total);`,
      expectedOutput: '60',
      hint: 'Use for (const n of numbers) { total += n; } then console.log(total);',
      explanation: 'Accumulators start at 0 and add each item sequentially through the array.',
      quickChips: ['for (const n of numbers) {', 'total += n;', '}', 'console.log(total);'],
    },
  ],
  quiz: [
    {
      id: 'q-js-8-1',
      question: 'Which looping construct is specifically designed to iterate through values of an array without tracking index integers?',
      explanation: 'for...of iterates directly over the values of an iterable like an array.',
      difficulty: 'beginner',
      topicTag: 'javascript',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'for...in', isCorrect: false },
        { id: 'opt-b', text: 'for...of', isCorrect: true },
        { id: 'opt-c', text: 'while...do', isCorrect: false },
        { id: 'opt-d', text: 'switch...case', isCorrect: false },
      ],
    },
    {
      id: 'q-js-8-2',
      question: 'What does i++ do in the third expression of a standard for loop?',
      explanation: 'i++ is shorthand for i = i + 1, incrementing the variable by one.',
      difficulty: 'beginner',
      topicTag: 'javascript',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'Increments the variable i by 1', isCorrect: true },
        { id: 'opt-b', text: 'Multiplies i by 2', isCorrect: false },
        { id: 'opt-c', text: 'Checks if i is equal to 0', isCorrect: false },
        { id: 'opt-d', text: 'Stops the loop immediately', isCorrect: false },
      ],
    },
    {
      id: 'q-js-8-3',
      question: 'Which keyword immediately exits a loop early before its condition becomes false?',
      explanation: 'The break statement terminates the enclosing loop immediately.',
      difficulty: 'beginner',
      topicTag: 'javascript',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'exit', isCorrect: false },
        { id: 'opt-b', text: 'break', isCorrect: true },
        { id: 'opt-c', text: 'continue', isCorrect: false },
        { id: 'opt-d', text: 'stop', isCorrect: false },
      ],
    },
  ],
};
