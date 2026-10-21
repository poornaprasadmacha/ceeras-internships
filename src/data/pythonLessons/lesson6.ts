import { PythonLessonDefinition } from '../../types/pythonLesson';

export const pythonLesson6: PythonLessonDefinition = {
  id: 'py-lesson-6',
  number: 6,
  slug: 'working-with-lists',
  title: 'Working with Lists (Arrays)',
  shortDescription: 'Store, index, append, and manipulate ordered sequences of items in Python lists.',
  estimatedMinutes: 12,
  learningObjectives: [
    'Create and initialize ordered lists with square brackets [ ]',
    'Access items using zero-based indexing (e.g. list[0])',
    'Add items with .append() and measure list size with len()',
  ],
  prerequisites: ['Lesson 2: Variables & Data Types.'],
  sections: [
    {
      id: 'sec-6-1',
      title: 'What is a Python List?',
      content: `A **list** stores multiple items in an ordered sequence:

\`\`\`python
fruits = ["apple", "banana", "cherry"]
\`\`\`

Key Rules of Lists:
• Items are separated by commas inside square brackets \`[ ]\`
• **Zero-Based Indexing**: The first item is at index \`0\`, the second at \`1\`
• **Negative Indexing**: \`list[-1]\` gets the very last item
• Add new items to the end using \`.append("item")\`
• Find count using \`len(list)\``,
      codeExample: {
        code: `colors = ["red", "green", "blue"]\nprint(colors[0])\nprint(colors[-1])\n\ncolors.append("yellow")\nprint(len(colors))`,
        explanation: 'Accesses first and last items, appends a new item, and prints list length.',
        output: 'red\nblue\n4',
      },
    },
  ],
  exercises: [
    {
      id: 'py-ex-6-1',
      lessonId: 'py-lesson-6',
      order: 1,
      title: 'Task 1: Accessing List Items',
      objective: 'Given animals = ["cat", "dog", "fox"]. Print the second item ("dog") using animals[1].',
      initialCode: 'animals = ["cat", "dog", "fox"]\n# Print the second animal:\n',
      solutionCode: 'animals = ["cat", "dog", "fox"]\nprint(animals[1])',
      expectedOutput: 'dog',
      hint: 'Remember: index 0 is "cat", index 1 is "dog".',
      explanation: 'Zero-based indexing means item #2 is at index 1.',
      quickChips: ['print(animals[1])'],
    },
    {
      id: 'py-ex-6-2',
      lessonId: 'py-lesson-6',
      order: 2,
      title: 'Task 2: Appending and Measuring Length',
      objective: 'Given nums = [10, 20, 30]. Append 40 to nums, then print len(nums).',
      initialCode: 'nums = [10, 20, 30]\n# Append 40 and print len(nums):\n',
      solutionCode: 'nums = [10, 20, 30]\nnums.append(40)\nprint(len(nums))',
      expectedOutput: '4',
      hint: 'Call nums.append(40) on line 2, then print(len(nums)) on line 3.',
      explanation: 'append() adds an item to the end, increasing the list length to 4.',
      quickChips: ['nums.append(40)', 'print(len(nums))'],
    },
  ],
  quiz: [
    {
      id: 'py-q-6-1',
      question: 'What index accesses the first element of any non-empty Python list?',
      explanation: 'Python uses zero-based indexing, so the first element is always index 0.',
      difficulty: 'beginner',
      topicTag: 'lists',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: '1', isCorrect: false },
        { id: 'opt-b', text: '0', isCorrect: true },
        { id: 'opt-c', text: '-0', isCorrect: false },
        { id: 'opt-d', text: 'first', isCorrect: false },
      ],
    },
  ],
};
