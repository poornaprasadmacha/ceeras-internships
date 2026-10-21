import { JsLessonDefinition } from '../../types/jsLesson';

export const jsLesson3: JsLessonDefinition = {
  id: 'js-lesson-3',
  number: 3,
  slug: 'data-types-and-template-literals',
  title: 'Data Types & Template Literals',
  shortDescription: 'Work with primitives (strings, numbers, booleans, null, undefined) and format text seamlessly using ES6 template literals.',
  estimatedMinutes: 8,
  learningObjectives: [
    'Identify JavaScript primitive types: string, number, boolean, null, undefined',
    'Inspect variable types using the typeof operator',
    'Interpolate variables inside backtick template literals (`Hello ${name}`)',
  ],
  prerequisites: ['Lesson 2: Variables & Constants.'],
  sections: [
    {
      id: 'sec-3-1',
      title: 'The Core Primitive Types',
      content: `JavaScript has 7 primitive types, but 5 are used daily:

1. **String**: Text data (\`"Alice"\`, \`'Code'\`).
2. **Number**: Integers and decimals (\`42\`, \`3.14\`).
3. **Boolean**: True or false values (\`true\`, \`false\`).
4. **Undefined**: A variable that has been declared but not assigned a value yet.
5. **Null**: Intentional absence of any value.

\`\`\`javascript
typeof "Hello";  // "string"
typeof 99;       // "number"
typeof true;     // "boolean"
\`\`\``,
    },
    {
      id: 'sec-3-2',
      title: 'Modern ES6 Template Literals',
      content: `In early JavaScript, combining strings and variables required messy \`+\` signs. Modern JavaScript uses **backticks** (\`\` \`...\` \`\`) and \`\${expression}\`:

\`\`\`javascript
const name = "Maya";
const age = 17;

// Clean template string
console.log(\`Student \${name} is \${age} years old.\`);
\`\`\`

• Any variable or calculation inside \`\${...}\` evaluates automatically!`,
      syntaxSummary: [
        {
          keyword: '`text ${variable}`',
          description: 'Backtick template literal for dynamic text interpolation.',
          example: '`Score: ${score}`',
        },
        {
          keyword: 'typeof value',
          description: 'Returns the data type of an operand as a string.',
          example: 'typeof 42; // "number"',
        },
      ],
    },
  ],
  exercises: [
    {
      id: 'js-ex-3-1',
      lessonId: 'js-lesson-3',
      order: 1,
      title: 'Format a Student Badge with Template Literals',
      objective: 'Given const student = "Leo" and const grade = "A", use template literals to print: "Student Leo achieved grade A."',
      initialCode: `const student = "Leo";\nconst grade = "A";\n\n// Print the interpolated string below:\n`,
      solutionCode: `const student = "Leo";\nconst grade = "A";\nconsole.log(\`Student \${student} achieved grade \${grade}.\`);`,
      expectedOutput: 'Student Leo achieved grade A.',
      hint: 'Use backticks: console.log(`Student ${student} achieved grade ${grade}.`);',
      explanation: 'Template literals with backticks evaluate ${variables} inline cleanly without concatenation plus signs.',
      quickChips: ['`Student ${student} achieved grade ${grade}.`', 'console.log()'],
    },
  ],
  quiz: [
    {
      id: 'q-js-3-1',
      question: 'Which characters are required to create an ES6 template literal string?',
      explanation: 'Template literals use backticks (`), located under the Esc key on standard keyboards.',
      difficulty: 'beginner',
      topicTag: 'javascript',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'Single quotes (\')', isCorrect: false },
        { id: 'opt-b', text: 'Backticks (`)', isCorrect: true },
        { id: 'opt-c', text: 'Double quotes (")', isCorrect: false },
        { id: 'opt-d', text: 'Parentheses ()', isCorrect: false },
      ],
    },
    {
      id: 'q-js-3-2',
      question: 'What is returned by typeof "42"?',
      explanation: 'Values wrapped in quotation marks are always of type "string".',
      difficulty: 'beginner',
      topicTag: 'javascript',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: '"number"', isCorrect: false },
        { id: 'opt-b', text: '"string"', isCorrect: true },
        { id: 'opt-c', text: '"boolean"', isCorrect: false },
        { id: 'opt-d', text: '"integer"', isCorrect: false },
      ],
    },
    {
      id: 'q-js-3-3',
      question: 'What is the value of a variable declared with let x; before any value is assigned to it?',
      explanation: 'Variables declared without an initial value default to undefined.',
      difficulty: 'beginner',
      topicTag: 'javascript',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'null', isCorrect: false },
        { id: 'opt-b', text: 'undefined', isCorrect: true },
        { id: 'opt-c', text: '0', isCorrect: false },
        { id: 'opt-d', text: 'false', isCorrect: false },
      ],
    },
  ],
};
