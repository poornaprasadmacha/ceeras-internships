import { PythonLessonDefinition } from '../../types/pythonLesson';

export const pythonLesson2: PythonLessonDefinition = {
  id: 'py-lesson-2',
  number: 2,
  slug: 'variables-and-data-types',
  title: 'Variables & Data Types',
  shortDescription: 'Store and manipulate text, whole numbers, decimals, and true/false values.',
  estimatedMinutes: 10,
  learningObjectives: [
    'Create variables using assignment with the = operator',
    'Understand fundamental data types: str, int, float, and bool',
    'Print variables and combine text values',
  ],
  prerequisites: ['Lesson 1: print() function basics.'],
  sections: [
    {
      id: 'sec-2-1',
      title: 'Storing Values in Variables',
      content: `A **variable** is a labeled box that holds information in computer memory:

• Create a variable by picking a name and using \`=\` to assign a value
• Python automatically figures out the data type!

Common Python Data Types:
• **str (string)**: Text inside quotes, e.g. \`"Python"\`
• **int (integer)**: Whole numbers, e.g. \`42\`, \`-5\`
• **float**: Decimal numbers, e.g. \`3.14\`, \`9.99\`
• **bool (boolean)**: True or False, e.g. \`True\`, \`False\``,
      codeExample: {
        code: `student_name = "Alex"\nage = 14\nis_enrolled = True\n\nprint(student_name)\nprint(age)`,
        explanation: 'Stores name and age into variables and outputs their contents.',
        output: 'Alex\n14',
      },
    },
  ],
  exercises: [
    {
      id: 'py-ex-2-1',
      lessonId: 'py-lesson-2',
      order: 1,
      title: 'Task 1: Assign and Print a Variable',
      objective: 'Create a variable named language and set it equal to "Python". Then print language.',
      initialCode: '# Assign the variable and print it\n',
      solutionCode: 'language = "Python"\nprint(language)',
      expectedOutput: 'Python',
      hint: 'Type: language = "Python" on line 1, and print(language) on line 2.',
      explanation: 'Variables hold values that can be passed directly to print().',
      quickChips: ['language = "Python"', 'print(language)'],
    },
    {
      id: 'py-ex-2-2',
      lessonId: 'py-lesson-2',
      order: 2,
      title: 'Task 2: Integer and Boolean Variables',
      objective: 'Create score = 100 on line 1, level = 5 on line 2. Print score, then print level.',
      initialCode: '# Create score and level variables, then print them:\n',
      solutionCode: 'score = 100\nlevel = 5\nprint(score)\nprint(level)',
      expectedOutput: '100\n5',
      hint: 'Assign score = 100 and level = 5, then call print() on each.',
      explanation: 'Numbers do not need quotation marks.',
      quickChips: ['score = 100', 'level = 5', 'print(score)', 'print(level)'],
    },
  ],
  quiz: [
    {
      id: 'py-q-2-1',
      question: 'Which of the following is a valid integer in Python?',
      explanation: 'Whole numbers without decimal points or quotes are integers.',
      difficulty: 'beginner',
      topicTag: 'data-types',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: '"25"', isCorrect: false },
        { id: 'opt-b', text: '25', isCorrect: true },
        { id: 'opt-c', text: '25.0', isCorrect: false },
        { id: 'opt-d', text: 'int(25.5)', isCorrect: false },
      ],
    },
    {
      id: 'py-q-2-2',
      question: 'Which operator is used to assign a value to a variable?',
      explanation: 'The single equal sign = is the assignment operator in Python.',
      difficulty: 'beginner',
      topicTag: 'variables',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: '==', isCorrect: false },
        { id: 'opt-b', text: '=', isCorrect: true },
        { id: 'opt-c', text: ':=', isCorrect: false },
        { id: 'opt-d', text: '->', isCorrect: false },
      ],
    },
  ],
};
