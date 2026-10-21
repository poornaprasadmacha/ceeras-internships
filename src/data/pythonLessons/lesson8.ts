import { PythonLessonDefinition } from '../../types/pythonLesson';

export const pythonLesson8: PythonLessonDefinition = {
  id: 'py-lesson-8',
  number: 8,
  slug: 'key-value-dictionaries',
  title: 'Key-Value Dictionaries',
  shortDescription: 'Store and retrieve associated data pairs quickly using Python dictionaries.',
  estimatedMinutes: 12,
  learningObjectives: [
    'Define dictionaries using curly braces {key: value}',
    'Look up values by their unique key name',
    'Add and update key-value pairs in dictionaries',
  ],
  prerequisites: ['Lesson 6: Working with Lists.'],
  sections: [
    {
      id: 'sec-8-1',
      title: 'What is a Dictionary?',
      content: `A **dictionary** stores information in **key-value pairs**, just like words and their definitions in a real dictionary:

\`\`\`python
user = {
    "name": "Sarah",
    "role": "Admin",
    "points": 450
}
\`\`\`

• Created with curly braces \`{ }\`
• Access values using their key: \`user["name"]\` gives \`"Sarah"\`
• Add or modify keys: \`user["level"] = 2\`
• Fast $O(1)$ lookups by key name`,
      codeExample: {
        code: `car = {"brand": "Tesla", "model": "Model 3"}\nprint(car["brand"])\n\ncar["color"] = "Red"\nprint(car["color"])`,
        explanation: 'Retrieves the brand and adds a new color key to the car dictionary.',
        output: 'Tesla\nRed',
      },
    },
  ],
  exercises: [
    {
      id: 'py-ex-8-1',
      lessonId: 'py-lesson-8',
      order: 1,
      title: 'Task 1: Look Up a Dictionary Value',
      objective: 'Given profile = {"username": "coder99", "level": 12}. Print the value of the "username" key.',
      initialCode: 'profile = {"username": "coder99", "level": 12}\n# Print the username below:\n',
      solutionCode: 'profile = {"username": "coder99", "level": 12}\nprint(profile["username"])',
      expectedOutput: 'coder99',
      hint: 'Use: print(profile["username"])',
      explanation: 'Bracket notation profile["username"] retrieves the associated value.',
      quickChips: ['print(profile["username"])'],
    },
    {
      id: 'py-ex-8-2',
      lessonId: 'py-lesson-8',
      order: 2,
      title: 'Task 2: Add a Key-Value Pair',
      objective: 'Given book = {"title": "Python 101"}. Add key "author" with value "Guido", then print book["author"].',
      initialCode: 'book = {"title": "Python 101"}\n# Add "author" and print it:\n',
      solutionCode: 'book = {"title": "Python 101"}\nbook["author"] = "Guido"\nprint(book["author"])',
      expectedOutput: 'Guido',
      hint: 'Type book["author"] = "Guido" on line 2, then print(book["author"]) on line 3.',
      explanation: 'Assigning to book["author"] inserts the new pair into the dictionary.',
      quickChips: ['book["author"] = "Guido"', 'print(book["author"])'],
    },
  ],
  quiz: [
    {
      id: 'py-q-8-1',
      question: 'Which bracket type is used to define a Python dictionary literal?',
      explanation: 'Curly braces { } define dictionaries in Python.',
      difficulty: 'beginner',
      topicTag: 'dictionaries',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'Square brackets [ ]', isCorrect: false },
        { id: 'opt-b', text: 'Curly braces { }', isCorrect: true },
        { id: 'opt-c', text: 'Parentheses ( )', isCorrect: false },
        { id: 'opt-d', text: 'Angle brackets < >', isCorrect: false },
      ],
    },
  ],
};
