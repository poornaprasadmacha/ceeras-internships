import { JsLessonDefinition } from '../../types/jsLesson';

export const jsLesson9: JsLessonDefinition = {
  id: 'js-lesson-9',
  number: 9,
  slug: 'objects-and-key-value-pairs',
  title: 'Objects & Key-Value Dictionaries',
  shortDescription: 'Model real-world entities with JavaScript objects, access properties with dot and bracket notation, and use ES6 destructuring.',
  estimatedMinutes: 8,
  learningObjectives: [
    'Create structured data objects using curly brace literal syntax {}',
    'Read and update properties using dot notation (obj.prop) and bracket notation (obj["prop"])',
    'Unpack object properties quickly using ES6 object destructuring',
  ],
  prerequisites: ['Lesson 7: Working with Arrays.'],
  sections: [
    {
      id: 'sec-9-1',
      title: 'JavaScript Object Literals',
      content: `Objects store collections of labeled key-value pairs:

\`\`\`javascript
const user = {
  name: "Sarah",
  role: "Lead Engineer",
  active: true,
  skills: ["JavaScript", "SQL"]
};

// Dot notation (preferred)
console.log(user.name); // "Sarah"

// Bracket notation (useful for dynamic keys)
console.log(user["role"]); // "Lead Engineer"
\`\`\``,
    },
    {
      id: 'sec-9-2',
      title: 'ES6 Object Destructuring',
      content: `Destructuring extracts properties into independent variables with zero boilerplate:

\`\`\`javascript
const course = { title: "JavaScript Core", lessons: 14 };

// Unpacks title and lessons directly
const { title, lessons } = course;
console.log(title); // "JavaScript Core"
\`\`\``,
      syntaxSummary: [
        {
          keyword: 'const { a, b } = obj',
          description: 'Extracts properties from an object into local variables.',
          example: 'const { name } = person;',
        },
      ],
    },
  ],
  exercises: [
    {
      id: 'js-ex-9-1',
      lessonId: 'js-lesson-9',
      order: 1,
      title: 'Create and Unpack a Student Object',
      objective: 'Create an object named course with title: "JavaScript" and level: "Advanced". Use destructuring const { title, level } = course; and print `${title}: ${level}`.',
      initialCode: `// Create object and destructure below:\n\n`,
      solutionCode: `const course = {\n  title: "JavaScript",\n  level: "Advanced"\n};\nconst { title, level } = course;\nconsole.log(\`\${title}: \${level}\`);`,
      expectedOutput: 'JavaScript: Advanced',
      hint: 'Define const course = { title: "JavaScript", level: "Advanced" }; const { title, level } = course; console.log(`${title}: ${level}`);',
      explanation: 'Object destructuring unpacks values directly from keys into concise variables.',
      quickChips: ['const course = { title: "JavaScript", level: "Advanced" };', 'const { title, level } = course;', 'console.log(`${title}: ${level}`);'],
    },
  ],
  quiz: [
    {
      id: 'q-js-9-1',
      question: 'Which notation is typically used to access a property on an object when the property name is known and fixed?',
      explanation: 'Dot notation (e.g. user.name) is the standard and most readable property accessor in JavaScript.',
      difficulty: 'beginner',
      topicTag: 'javascript',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'Dot notation (user.name)', isCorrect: true },
        { id: 'opt-b', text: 'Arrow notation (user->name)', isCorrect: false },
        { id: 'opt-c', text: 'Colon notation (user::name)', isCorrect: false },
        { id: 'opt-d', text: 'Hash notation (user#name)', isCorrect: false },
      ],
    },
    {
      id: 'q-js-9-2',
      question: 'What happens if you attempt to access a property that does not exist on an object (e.g. user.salary)?',
      explanation: 'Accessing a non-existent property on an object evaluates to undefined.',
      difficulty: 'beginner',
      topicTag: 'javascript',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'It returns undefined', isCorrect: true },
        { id: 'opt-b', text: 'It throws a ReferenceError', isCorrect: false },
        { id: 'opt-c', text: 'It returns null', isCorrect: false },
        { id: 'opt-d', text: 'It returns 0', isCorrect: false },
      ],
    },
    {
      id: 'q-js-9-3',
      question: 'Which built-in method returns an array of all key names in an object?',
      explanation: 'Object.keys(obj) returns an array containing all enumerable property names.',
      difficulty: 'beginner',
      topicTag: 'javascript',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'Object.keys(obj)', isCorrect: true },
        { id: 'opt-b', text: 'obj.getKeys()', isCorrect: false },
        { id: 'opt-c', text: 'Array.fromKeys(obj)', isCorrect: false },
        { id: 'opt-d', text: 'Object.entriesList(obj)', isCorrect: false },
      ],
    },
  ],
};
