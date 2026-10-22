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
    {
      id: 'q_python_2_auto_3',
      question: "What is the core principle taught in Python Lesson 2 (Variables & Data Types)?",
      explanation: "Python emphasizes readable, expressive code with dynamic typing and powerful built-in structures.",
      difficulty: 'intermediate',
      topicTag: 'python',
      type: 'multiple-choice',
      options: [
        { id: 'opt_1', text: "Mastering Python's readable syntax, core data structures, control flow, or standard library", isCorrect: true },
        { id: 'opt_2', text: "Compiling Python into native x86 machine instructions before execution", isCorrect: false },
        { id: 'opt_3', text: "Designing hardware microcontrollers", isCorrect: false },
        { id: 'opt_4', text: "Creating SQL database schemas directly", isCorrect: false },
      ],
    },
    {
      id: 'q_python_2_auto_4',
      question: "How does Python manage memory and variable assignments in Lesson 2?",
      explanation: "In Python, variables are names referencing objects in heap memory, tracked automatically by the garbage collector.",
      difficulty: 'intermediate',
      topicTag: 'python',
      type: 'multiple-choice',
      options: [
        { id: 'opt_1', text: "Variables are references pointing to objects in memory; memory is managed via reference counting and garbage collection", isCorrect: true },
        { id: 'opt_2', text: "Variables store raw memory pointers that must be manually freed using free()", isCorrect: false },
        { id: 'opt_3', text: "Variables cannot be reassigned once defined", isCorrect: false },
        { id: 'opt_4', text: "Python writes all variables directly to the hard drive", isCorrect: false },
      ],
    },
    {
      id: 'q_python_2_auto_5',
      question: "What is the difference between mutable and immutable types in Python?",
      explanation: "Lists and dictionaries are mutable, while integers, floats, strings, and tuples are immutable.",
      difficulty: 'intermediate',
      topicTag: 'python',
      type: 'multiple-choice',
      options: [
        { id: 'opt_1', text: "Mutable objects (like lists, dicts) can be changed in-place; immutable objects (strings, tuples, ints) cannot be altered after creation", isCorrect: true },
        { id: 'opt_2', text: "Immutable objects take twice as much RAM", isCorrect: false },
        { id: 'opt_3', text: "Mutable objects can only contain numbers", isCorrect: false },
        { id: 'opt_4', text: "Python has no immutable types", isCorrect: false },
      ],
    },
    {
      id: 'q_python_2_auto_6',
      question: "What does a Python list comprehension do?",
      explanation: "List comprehensions offer a declarative, readable, and performant idiom for mapping and filtering iterables.",
      difficulty: 'intermediate',
      topicTag: 'python',
      type: 'multiple-choice',
      options: [
        { id: 'opt_1', text: "It provides a concise syntax [expr for item in iterable if cond] to create new lists from existing sequences", isCorrect: true },
        { id: 'opt_2', text: "It compresses the list to take less disk space", isCorrect: false },
        { id: 'opt_3', text: "It permanently sorts the list in descending order", isCorrect: false },
        { id: 'opt_4', text: "It converts the list to a dictionary", isCorrect: false },
      ],
    },
    {
      id: 'q_python_2_auto_7',
      question: "Which keyword is used to handle exceptions gracefully in Python?",
      explanation: "Python uses try blocks followed by except clauses to intercept and handle runtime exceptions.",
      difficulty: 'intermediate',
      topicTag: 'python',
      type: 'multiple-choice',
      options: [
        { id: 'opt_1', text: "try ... except ... finally", isCorrect: true },
        { id: 'opt_2', text: "catch ... throw ... error", isCorrect: false },
        { id: 'opt_3', text: "test ... handle", isCorrect: false },
        { id: 'opt_4', text: "guard ... rescue", isCorrect: false },
      ],
    },
    {
      id: 'q_python_2_auto_8',
      question: "What does the 'self' parameter represent in a Python class method?",
      explanation: "By convention, 'self' is the first parameter of an instance method, referencing the instance object itself.",
      difficulty: 'intermediate',
      topicTag: 'python',
      type: 'multiple-choice',
      options: [
        { id: 'opt_1', text: "The specific instance of the class on which the method is called", isCorrect: true },
        { id: 'opt_2', text: "The parent superclass definition", isCorrect: false },
        { id: 'opt_3', text: "A global variable accessible everywhere", isCorrect: false },
        { id: 'opt_4', text: "A reserved system keyword that cannot be named anything else", isCorrect: false },
      ],
    },
    {
      id: 'q_python_2_auto_9',
      question: "How do f-strings (f\"...\") format strings in modern Python?",
      explanation: "Formatted string literals (f-strings) evaluate expressions inside { } and insert the string representations.",
      difficulty: 'intermediate',
      topicTag: 'python',
      type: 'multiple-choice',
      options: [
        { id: 'opt_1', text: "They interpolate expressions enclosed in curly braces {expr} directly into the string at runtime", isCorrect: true },
        { id: 'opt_2', text: "They convert the string into a binary file", isCorrect: false },
        { id: 'opt_3', text: "They only accept float numbers", isCorrect: false },
        { id: 'opt_4', text: "They encrypt the text using SHA-256", isCorrect: false },
      ],
    },
    {
      id: 'q_python_2_auto_10',
      question: "Which function returns the number of items in a Python collection?",
      explanation: "The built-in len() function returns the length of lists, strings, dictionaries, tuples, and sets.",
      difficulty: 'intermediate',
      topicTag: 'python',
      type: 'multiple-choice',
      options: [
        { id: 'opt_1', text: "len()", isCorrect: true },
        { id: 'opt_2', text: "size()", isCorrect: false },
        { id: 'opt_3', text: "count()", isCorrect: false },
        { id: 'opt_4', text: "length()", isCorrect: false },
      ],
    },
  ],
};
