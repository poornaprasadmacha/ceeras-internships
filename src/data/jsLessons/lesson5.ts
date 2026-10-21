import { JsLessonDefinition } from '../../types/jsLesson';

export const jsLesson5: JsLessonDefinition = {
  id: 'js-lesson-5',
  number: 5,
  slug: 'conditionals-and-branching',
  title: 'Decisions with if, else & Ternary Operators',
  shortDescription: 'Direct application flow using if, else if, else branches and concise ternary expressions (condition ? a : b).',
  estimatedMinutes: 8,
  learningObjectives: [
    'Execute branching logic using if, else if, and else blocks',
    'Write concise inline one-line decisions using the ternary operator',
    'Understand truthy and falsy values in JavaScript conditions',
  ],
  prerequisites: ['Lesson 4: Operators & Comparisons.'],
  sections: [
    {
      id: 'sec-5-1',
      title: 'Branching with if, else if, and else',
      content: `Conditionals allow programs to execute different code depending on input:

\`\`\`javascript
const score = 85;

if (score >= 90) {
  console.log("Grade: A");
} else if (score >= 80) {
  console.log("Grade: B");
} else {
  console.log("Grade: C");
}
\`\`\``,
    },
    {
      id: 'sec-5-2',
      title: 'The Ternary Operator (? :)',
      content: `For simple binary assignments, the **ternary operator** provides a clean one-liner:

\`\`\`javascript
// condition ? valueIfTrue : valueIfFalse
const status = score >= 50 ? "Passed" : "Needs Review";
console.log(status);
\`\`\`

• Reads naturally: "Is score >= 50? If yes, 'Passed', otherwise 'Needs Review'."`,
      syntaxSummary: [
        {
          keyword: 'if (condition) { }',
          description: 'Executes block if condition resolves truthy.',
          example: 'if (isReady) { start(); }',
        },
        {
          keyword: 'cond ? val1 : val2',
          description: 'Ternary conditional expression.',
          example: 'age >= 18 ? "Adult" : "Minor"',
        },
      ],
    },
  ],
  exercises: [
    {
      id: 'js-ex-5-1',
      lessonId: 'js-lesson-5',
      order: 1,
      title: 'Determine Member Access Level',
      objective: 'Given const hoursLearned = 45, if hoursLearned >= 40 print "Honor Student", otherwise print "Regular Student".',
      initialCode: `const hoursLearned = 45;\n\n// Write your if / else logic below:\n`,
      solutionCode: `const hoursLearned = 45;\nif (hoursLearned >= 40) {\n  console.log("Honor Student");\n} else {\n  console.log("Regular Student");\n}`,
      expectedOutput: 'Honor Student',
      hint: 'Use if (hoursLearned >= 40) { console.log("Honor Student"); } else { console.log("Regular Student"); }',
      explanation: '45 is greater than or equal to 40, so the first if block executes.',
      quickChips: ['if () {}', 'else {}', 'console.log("Honor Student");', 'console.log("Regular Student");'],
    },
  ],
  quiz: [
    {
      id: 'q-js-5-1',
      question: 'Which of the following values is treated as "falsy" in a JavaScript conditional check?',
      explanation: '0, "", null, undefined, NaN, and false are the standard falsy values in JavaScript.',
      difficulty: 'beginner',
      topicTag: 'javascript',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: '0', isCorrect: true },
        { id: 'opt-b', text: '"0" (string with zero)', isCorrect: false },
        { id: 'opt-c', text: '[] (empty array)', isCorrect: false },
        { id: 'opt-d', text: '{} (empty object)', isCorrect: false },
      ],
    },
    {
      id: 'q-js-5-2',
      question: 'What is the syntax structure of the ternary conditional operator?',
      explanation: 'condition ? expressionIfTrue : expressionIfFalse',
      difficulty: 'beginner',
      topicTag: 'javascript',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'condition ? ifTrue : ifFalse', isCorrect: true },
        { id: 'opt-b', text: 'condition : ifTrue ? ifFalse', isCorrect: false },
        { id: 'opt-c', text: 'if (condition) -> then', isCorrect: false },
        { id: 'opt-d', text: 'condition ?? ifTrue !! ifFalse', isCorrect: false },
      ],
    },
    {
      id: 'q-js-5-3',
      question: 'What gets printed by: console.log(true ? "Yes" : "No")?',
      explanation: 'Since the condition is true, the first expression ("Yes") is selected.',
      difficulty: 'beginner',
      topicTag: 'javascript',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: '"Yes"', isCorrect: true },
        { id: 'opt-b', text: '"No"', isCorrect: false },
        { id: 'opt-c', text: 'undefined', isCorrect: false },
        { id: 'opt-d', text: 'null', isCorrect: false },
      ],
    },
  ],
};
