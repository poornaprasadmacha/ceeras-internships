import { JsLessonDefinition } from '../../types/jsLesson';

export const jsLesson14: JsLessonDefinition = {
  id: 'js-lesson-14',
  number: 14,
  slug: 'advanced-closures-classes-and-spread',
  title: 'Advanced JavaScript (Closures & Classes)',
  shortDescription: 'Master lexical scoping, closures for private state, ES6 Object-Oriented classes, and the versatile spread/rest operator (...).',
  estimatedMinutes: 10,
  learningObjectives: [
    'Understand lexical scope and function closures that retain outer variable state',
    'Build object-oriented software blueprints using ES6 class and constructor',
    'Clone and merge arrays and objects using the spread operator (...)',
  ],
  prerequisites: ['Lesson 6: Functions & Arrow Syntax.', 'Lesson 9: Objects & Key-Value Pairs.'],
  sections: [
    {
      id: 'sec-14-1',
      title: 'Lexical Scope & Closures',
      content: `A **closure** is a function that remembers and accesses variables from its outer enclosing lexical scope even after that outer function has finished executing:

\`\`\`javascript
function createCounter() {
  let count = 0; // Private enclosed state
  return () => {
    count += 1;
    return count;
  };
}

const counter = createCounter();
console.log(counter()); // 1
console.log(counter()); // 2
\`\`\`

• \`count\` cannot be tampered with directly from outside, providing clean encapsulation!`,
    },
    {
      id: 'sec-14-2',
      title: 'ES6 Classes & Spread Operator (...)',
      content: `• **ES6 Classes**: Provide standard object-oriented blueprints with constructors and methods:

\`\`\`javascript
class Student {
  constructor(name, major) {
    this.name = name;
    this.major = major;
  }

  greet() {
    return \`Hello, I am \${this.name} studying \${this.major}.\`;
  }
}

const student1 = new Student("Aria", "Computer Science");
console.log(student1.greet());
\`\`\`

• **Spread Operator (\`...\`)**: Unpacks elements or properties into new collections:
\`\`\`javascript
const primary = ["HTML", "CSS"];
const fullStack = [...primary, "JS", "SQL"]; // Merged without mutation
\`\`\``,
      syntaxSummary: [
        {
          keyword: 'class Name { constructor() {} }',
          description: 'Defines an object-oriented class blueprint.',
          example: 'class Car { constructor(model) { this.model = model; } }',
        },
        {
          keyword: '...iterable',
          description: 'Spreads array elements or object properties.',
          example: 'const copy = [...orig];',
        },
      ],
    },
  ],
  exercises: [
    {
      id: 'js-ex-14-1',
      lessonId: 'js-lesson-14',
      order: 1,
      title: 'Build a Modern ES6 Class',
      objective: 'Define a class Course with a constructor(title, code) that assigns this.title and this.code, and a method getSummary() returning `${this.code}: ${this.title}`. Instantiate it with ("Modern JavaScript", "CS101") and print getSummary().',
      initialCode: `// Define class Course and test it below:\n\n`,
      solutionCode: `class Course {\n  constructor(title, code) {\n    this.title = title;\n    this.code = code;\n  }\n  getSummary() {\n    return \`\${this.code}: \${this.title}\`;\n  }\n}\nconst c = new Course("Modern JavaScript", "CS101");\nconsole.log(c.getSummary());`,
      expectedOutput: 'CS101: Modern JavaScript',
      hint: 'Declare class Course { constructor(title, code) { this.title = title; this.code = code; } getSummary() { return `${this.code}: ${this.title}`; } }',
      explanation: 'ES6 classes provide clean syntax for building reusable object models with shared prototype methods.',
      quickChips: ['class Course {', 'constructor(title, code) {', 'getSummary() {', 'new Course("Modern JavaScript", "CS101");', 'console.log(c.getSummary());'],
    },
  ],
  quiz: [
    {
      id: 'q-js-14-1',
      question: 'What is a closure in JavaScript?',
      explanation: 'A closure is a function bundled together with references to its surrounding lexical environment.',
      difficulty: 'advanced',
      topicTag: 'javascript',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'A function that retains access to variables from its outer scope even after the outer function has completed', isCorrect: true },
        { id: 'opt-b', text: 'A method that closes database connections', isCorrect: false },
        { id: 'opt-c', text: 'A syntax error where a bracket is missing', isCorrect: false },
        { id: 'opt-d', text: 'An HTML tag that cannot have child tags', isCorrect: false },
      ],
    },
    {
      id: 'q-js-14-2',
      question: 'Which method inside a JavaScript class is automatically executed when a new instance is created with new?',
      explanation: 'The constructor() method is called automatically when instantiating a new class object.',
      difficulty: 'advanced',
      topicTag: 'javascript',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'constructor()', isCorrect: true },
        { id: 'opt-b', text: 'init()', isCorrect: false },
        { id: 'opt-c', text: 'create()', isCorrect: false },
        { id: 'opt-d', text: 'start()', isCorrect: false },
      ],
    },
    {
      id: 'q-js-14-3',
      question: 'What is the effect of using the spread operator (...arr) when creating a new array const copy = [...arr]?',
      explanation: 'The spread operator shallow-copies elements of arr into a new array without mutating the original.',
      difficulty: 'advanced',
      topicTag: 'javascript',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'It creates a shallow copy of arr without mutating the original', isCorrect: true },
        { id: 'opt-b', text: 'It deletes all elements from arr', isCorrect: false },
        { id: 'opt-c', text: 'It reverses the order of elements in place', isCorrect: false },
        { id: 'opt-d', text: 'It sorts the elements alphabetically', isCorrect: false },
      ],
    },
  ],
};
