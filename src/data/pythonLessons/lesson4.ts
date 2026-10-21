import { PythonLessonDefinition } from '../../types/pythonLesson';

export const pythonLesson4: PythonLessonDefinition = {
  id: 'py-lesson-4',
  number: 4,
  slug: 'string-formatting-and-f-strings',
  title: 'String Formatting & F-Strings',
  shortDescription: 'Format and combine variables inside text strings effortlessly using f-strings.',
  estimatedMinutes: 10,
  learningObjectives: [
    'Insert variables directly inside text strings using f-strings',
    'Transform text with .upper(), .lower(), and .strip() methods',
    'Calculate text length using len()',
  ],
  prerequisites: ['Lesson 2: Variables & Strings.'],
  sections: [
    {
      id: 'sec-4-1',
      title: 'Modern F-Strings in Python',
      content: `In modern Python, you format strings by adding an \`f\` right before the opening quote:

\`\`\`python
name = "Maya"
score = 98
print(f"Student {name} scored {score} points!")
\`\`\`

• Any variable or expression inside \`{curly_braces}\` is evaluated automatically
• Eliminates messy \`+\` string concatenation
• Works with numbers, text, and calculations`,
      codeExample: {
        code: `hero = "Aria"\nlevel = 10\nprint(f"Hero {hero} reached Level {level}!")`,
        explanation: 'Injects variable values cleanly inside the string.',
        output: 'Hero Aria reached Level 10!',
      },
    },
  ],
  exercises: [
    {
      id: 'py-ex-4-1',
      lessonId: 'py-lesson-4',
      order: 1,
      title: 'Task 1: Build an F-String Greeting',
      objective: 'Given city = "Tokyo", print the message: f"Welcome to {city}!"',
      initialCode: 'city = "Tokyo"\n# Print f-string greeting below:\n',
      solutionCode: 'city = "Tokyo"\nprint(f"Welcome to {city}!")',
      expectedOutput: 'Welcome to Tokyo!',
      hint: 'Type: print(f"Welcome to {city}!")',
      explanation: 'F-strings evaluate {city} and replace it with its value "Tokyo".',
      quickChips: ['f"Welcome to {city}!"', 'print()'],
    },
    {
      id: 'py-ex-4-2',
      lessonId: 'py-lesson-4',
      order: 2,
      title: 'Task 2: Convert to Uppercase',
      objective: 'Given word = "python", print word in ALL CAPS using word.upper().',
      initialCode: 'word = "python"\n# Print word.upper() below:\n',
      solutionCode: 'word = "python"\nprint(word.upper())',
      expectedOutput: 'PYTHON',
      hint: 'Use: print(word.upper())',
      explanation: 'The .upper() string method returns an all-uppercase copy of the string.',
      quickChips: ['word.upper()', 'print()'],
    },
  ],
  quiz: [
    {
      id: 'py-q-4-1',
      question: 'What prefix letter is placed before a string to make it an f-string?',
      explanation: 'The lowercase f (or uppercase F) prefix turns a string into an f-string.',
      difficulty: 'beginner',
      topicTag: 'f-strings',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 's', isCorrect: false },
        { id: 'opt-b', text: 'f', isCorrect: true },
        { id: 'opt-c', text: 'str', isCorrect: false },
        { id: 'opt-d', text: '$', isCorrect: false },
      ],
    },
  ],
};
