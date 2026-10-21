import { PythonLessonDefinition } from '../../types/pythonLesson';

export const pythonLesson10: PythonLessonDefinition = {
  id: 'py-lesson-10',
  number: 10,
  slug: 'list-comprehensions',
  title: 'List Comprehensions',
  shortDescription: 'Write elegant, concise one-line transformations over lists.',
  estimatedMinutes: 12,
  learningObjectives: [
    'Construct list comprehensions using [expression for item in iterable]',
    'Filter items conditionally with [x for x in list if condition]',
    'Replace multi-line accumulator loops with readable one-liners',
  ],
  prerequisites: ['Lesson 6: Lists and Lesson 7: Loops.'],
  sections: [
    {
      id: 'sec-10-1',
      title: 'Pythonic One-Line Lists',
      content: `A **list comprehension** offers a shorter, more readable syntax when you want to create a new list based on the values of an existing list.

Traditional Loop:
\`\`\`python
squares = []
for x in [1, 2, 3]:
    squares.append(x * x)
\`\`\`

List Comprehension (One Line):
\`\`\`python
squares = [x * x for x in [1, 2, 3]]
\`\`\`

• Faster execution in Python
• Clean, declarative code favored by top Python engineers`,
      codeExample: {
        code: `numbers = [1, 2, 3, 4, 5]\ndoubled = [n * 2 for n in numbers]\nprint(doubled)`,
        explanation: 'Multiplies each number in the list by 2 in a single readable line.',
        output: '[2, 4, 6, 8, 10]',
      },
    },
  ],
  exercises: [
    {
      id: 'py-ex-10-1',
      lessonId: 'py-lesson-10',
      order: 1,
      title: 'Task 1: Double List Elements',
      objective: 'Given nums = [2, 4, 6]. Create a new list called doubled containing each number multiplied by 2 using a list comprehension. Print doubled.',
      initialCode: 'nums = [2, 4, 6]\n# Use list comprehension for doubled, then print:\n',
      solutionCode: 'nums = [2, 4, 6]\ndoubled = [n * 2 for n in nums]\nprint(doubled)',
      expectedOutput: '[4, 8, 12]',
      hint: 'doubled = [n * 2 for n in nums]\nprint(doubled)',
      explanation: 'Applies n * 2 to every item in nums.',
      quickChips: ['[n * 2 for n in nums]', 'print(doubled)'],
    },
    {
      id: 'py-ex-10-2',
      lessonId: 'py-lesson-10',
      order: 2,
      title: 'Task 2: Filter Even Numbers',
      objective: 'Given vals = [1, 2, 3, 4, 5, 6]. Create evens = [x for x in vals if x % 2 == 0]. Print evens.',
      initialCode: 'vals = [1, 2, 3, 4, 5, 6]\n# Filter evens and print:\n',
      solutionCode: 'vals = [1, 2, 3, 4, 5, 6]\nevens = [x for x in vals if x % 2 == 0]\nprint(evens)',
      expectedOutput: '[2, 4, 6]',
      hint: 'evens = [x for x in vals if x % 2 == 0]\nprint(evens)',
      explanation: 'The trailing if condition filters out numbers where x % 2 != 0.',
      quickChips: ['[x for x in vals if x % 2 == 0]', 'print(evens)'],
    },
  ],
  quiz: [
    {
      id: 'py-q-10-1',
      question: 'What is the primary benefit of using a list comprehension over an explicit for-loop?',
      explanation: 'List comprehensions provide a more concise, readable, and often faster one-line syntax.',
      difficulty: 'intermediate',
      topicTag: 'comprehensions',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'They allow variables to be deleted', isCorrect: false },
        { id: 'opt-b', text: 'They are more concise and readable for creating transformed lists', isCorrect: true },
        { id: 'opt-c', text: 'They convert integers to text automatically', isCorrect: false },
        { id: 'opt-d', text: 'They only work on strings', isCorrect: false },
      ],
    },
  ],
};
