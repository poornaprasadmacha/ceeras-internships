import { PythonLessonDefinition } from '../../types/pythonLesson';

export const pythonLesson1: PythonLessonDefinition = {
  id: 'py-lesson-1',
  number: 1,
  slug: 'hello-python-print',
  title: 'Hello Python & The print() Function',
  shortDescription: 'Write your very first Python program and display text on the computer screen.',
  estimatedMinutes: 8,
  learningObjectives: [
    'Understand how Python executes commands line by line',
    'Display text on the screen using the print() function',
    'Write code comments using the # symbol to document instructions',
  ],
  prerequisites: ['No prior programming experience required!'],
  sections: [
    {
      id: 'sec-1-1',
      title: 'Your First Python Statement',
      content: `Welcome to Python! Python is one of the world's most friendly and powerful programming languages.

To show words on the computer screen, you use the \`print()\` function:

• Words (text) must be wrapped inside quotation marks: \`"Hello"\` or \`'Hello'\`
• Everything inside the parentheses \`(...)\` is displayed in the terminal
• Python runs instructions in order, top to bottom!`,
      codeExample: {
        code: `print("Hello, World!")\nprint("Welcome to Python!")`,
        explanation: 'Displays two friendly greeting lines in the terminal.',
        output: 'Hello, World!\nWelcome to Python!',
      },
    },
    {
      id: 'sec-1-2',
      title: 'Code Comments',
      content: `Comments are notes for human readers. Python completely ignores any line starting with a hash symbol \`#\`:

• Use comments to explain tricky steps
• Helpful when working with classmates or teammates`,
      codeExample: {
        code: `# This is a comment\nprint("Code is running!")`,
        explanation: 'The first line is ignored by the Python engine, and the message is printed.',
      },
    },
  ],
  exercises: [
    {
      id: 'py-ex-1-1',
      lessonId: 'py-lesson-1',
      order: 1,
      title: 'Task 1: Say Hello to Ceeras',
      objective: 'Write a Python program that prints the exact phrase "Hello from Ceeras!" to the terminal.',
      initialCode: '# Use the print function to output "Hello from Ceeras!"\n',
      solutionCode: 'print("Hello from Ceeras!")',
      expectedOutput: 'Hello from Ceeras!',
      hint: 'Type: print("Hello from Ceeras!")',
      explanation: 'The print function displays text placed between quotes in the terminal console.',
      quickChips: ['print()', '"Hello from Ceeras!"'],
    },
    {
      id: 'py-ex-1-2',
      lessonId: 'py-lesson-1',
      order: 2,
      title: 'Task 2: Print Two Lines',
      objective: 'Print "Learning Python" on line 1, and "Building Skills" on line 2.',
      initialCode: '# Print two separate lines below:\n',
      solutionCode: 'print("Learning Python")\nprint("Building Skills")',
      expectedOutput: 'Learning Python\nBuilding Skills',
      hint: 'Use two separate print() calls on two lines.',
      explanation: 'Each print() statement outputs on a fresh line in the terminal.',
      quickChips: ['print()', '"Learning Python"', '"Building Skills"'],
    },
  ],
  quiz: [
    {
      id: 'py-q-1-1',
      question: 'Which symbol begins a single-line comment in Python?',
      explanation: 'The # hash symbol begins a single-line comment in Python.',
      difficulty: 'beginner',
      topicTag: 'syntax',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: '//', isCorrect: false },
        { id: 'opt-b', text: '#', isCorrect: true },
        { id: 'opt-c', text: '/*', isCorrect: false },
        { id: 'opt-d', text: '--', isCorrect: false },
      ],
    },
    {
      id: 'py-q-1-2',
      question: 'What is required around text words when using print()?',
      explanation: 'Text strings must always be enclosed in quotation marks ("..." or \'...\').',
      difficulty: 'beginner',
      topicTag: 'print',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'Quotation marks (" or \')', isCorrect: true },
        { id: 'opt-b', text: 'Square brackets [ ]', isCorrect: false },
        { id: 'opt-c', text: 'Angle brackets < >', isCorrect: false },
        { id: 'opt-d', text: 'Curly braces { }', isCorrect: false },
      ],
    },
    {
      id: 'q_python_1_auto_3',
      question: "What is the core principle taught in Python Lesson 1 (Hello Python & The print() Function)?",
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
      id: 'q_python_1_auto_4',
      question: "How does Python manage memory and variable assignments in Lesson 1?",
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
      id: 'q_python_1_auto_5',
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
      id: 'q_python_1_auto_6',
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
      id: 'q_python_1_auto_7',
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
      id: 'q_python_1_auto_8',
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
      id: 'q_python_1_auto_9',
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
      id: 'q_python_1_auto_10',
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
