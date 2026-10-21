import { JsLessonDefinition } from '../../types/jsLesson';

export const jsLesson4: JsLessonDefinition = {
  id: 'js-lesson-4',
  number: 4,
  slug: 'operators-and-comparisons',
  title: 'Operators & Comparisons',
  shortDescription: 'Master strict equality (===), arithmetic calculations, remainder modulo (%), and logical operators (&&, ||, !).',
  estimatedMinutes: 8,
  learningObjectives: [
    'Use arithmetic operators: +, -, *, /, %, and ** (exponentiation)',
    'Understand why strict equality (===) is preferred over loose equality (==)',
    'Combine boolean conditions using && (AND), || (OR), and ! (NOT)',
  ],
  prerequisites: ['Lesson 3: Data Types & Template Literals.'],
  sections: [
    {
      id: 'sec-4-1',
      title: 'Strict Equality (===) vs Loose Equality (==)',
      content: `In JavaScript:

• **\`===\` (Strict Equality)**: Compares **both value AND data type**. Always use \`===\`!
• **\`==\` (Loose Equality)**: Attempts type coercion before comparing (leads to subtle bugs).

\`\`\`javascript
5 === "5"; // false (number !== string)
5 == "5";  // true (type coercion bug!)

10 !== 20; // true (strict inequality)
\`\`\``,
    },
    {
      id: 'sec-4-2',
      title: 'Logical Operators (&&, ||, !)',
      content: `• **\`&&\` (AND)**: True only if **both** sides are true.
• **\`||\` (OR)**: True if **at least one** side is true.
• **\`!\` (NOT)**: Flips a boolean value (\`!true\` becomes \`false\`).

\`\`\`javascript
const hasPass = true;
const isPaid = true;

const canEnter = hasPass && isPaid; // true
\`\`\``,
      syntaxSummary: [
        {
          keyword: 'a === b',
          description: 'Strict equality without type coercion.',
          example: '42 === 42',
        },
        {
          keyword: 'a && b',
          description: 'Logical AND (both must be true).',
          example: 'x > 0 && x < 10',
        },
      ],
    },
  ],
  exercises: [
    {
      id: 'js-ex-4-1',
      lessonId: 'js-lesson-4',
      order: 1,
      title: 'Evaluate Logical Eligibility',
      objective: 'Given const age = 18 and const hasLicense = true, evaluate if age >= 18 && hasLicense, and print the resulting boolean.',
      initialCode: `const age = 18;\nconst hasLicense = true;\n\n// Check if eligible and print result:\n`,
      solutionCode: `const age = 18;\nconst hasLicense = true;\nconsole.log(age >= 18 && hasLicense);`,
      expectedOutput: 'true',
      hint: 'Type console.log(age >= 18 && hasLicense);',
      explanation: 'Both age >= 18 and hasLicense evaluate to true, so the && expression resolves to true.',
      quickChips: ['console.log(age >= 18 && hasLicense);', '&&', '===', '||'],
    },
  ],
  quiz: [
    {
      id: 'q-js-4-1',
      question: 'Why do JavaScript style guides recommend === over ==?',
      explanation: '=== checks both type and value without performing unexpected type coercions.',
      difficulty: 'beginner',
      topicTag: 'javascript',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'It checks both type and value without unexpected type coercion', isCorrect: true },
        { id: 'opt-b', text: 'It runs 100 times faster in the browser', isCorrect: false },
        { id: 'opt-c', text: '== is deprecated and deleted in modern browsers', isCorrect: false },
        { id: 'opt-d', text: '=== only compares numbers', isCorrect: false },
      ],
    },
    {
      id: 'q-js-4-2',
      question: 'What is the result of 15 % 4 in JavaScript?',
      explanation: '15 divided by 4 is 3 with a remainder of 3. Modulo (%) returns the remainder.',
      difficulty: 'beginner',
      topicTag: 'javascript',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: '3', isCorrect: true },
        { id: 'opt-b', text: '1', isCorrect: false },
        { id: 'opt-c', text: '3.75', isCorrect: false },
        { id: 'opt-d', text: '0', isCorrect: false },
      ],
    },
    {
      id: 'q-js-4-3',
      question: 'What does the expression !false evaluate to in JavaScript?',
      explanation: '! is the logical NOT operator which inverts false to true.',
      difficulty: 'beginner',
      topicTag: 'javascript',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'false', isCorrect: false },
        { id: 'opt-b', text: 'true', isCorrect: true },
        { id: 'opt-c', text: 'undefined', isCorrect: false },
        { id: 'opt-d', text: 'null', isCorrect: false },
      ],
    },
  ],
};
