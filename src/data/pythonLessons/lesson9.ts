import { PythonLessonDefinition } from '../../types/pythonLesson';

export const pythonLesson9: PythonLessonDefinition = {
  id: 'py-lesson-9',
  number: 9,
  slug: 'defining-custom-functions',
  title: 'Defining Functions with def',
  shortDescription: 'Package reusable blocks of logic into clean, modular functions.',
  estimatedMinutes: 12,
  learningObjectives: [
    'Define custom functions using the def keyword',
    'Pass arguments to function parameters',
    'Return calculated values using the return statement',
  ],
  prerequisites: ['Lesson 2: Variables and Lesson 3: Arithmetic.'],
  sections: [
    {
      id: 'sec-9-1',
      title: 'Why Functions Matter',
      content: `A **function** is a reusable block of code that performs a specific action:

\`\`\`python
def greet(name):
    return f"Hello, {name}!"
\`\`\`

Key Rules of Functions:
• Starts with \`def\` followed by the function name and parameters \`(x, y)\`
• End the header line with a colon \`:\`
• The function body must be **indented**
• Use \`return\` to send a result back to the caller
• Call the function using its name: \`result = greet("Alex")\``,
      codeExample: {
        code: `def add(a, b):\n    return a + b\n\ntotal = add(10, 25)\nprint(total)`,
        explanation: 'Defines an add function, passes 10 and 25, and prints 35.',
        output: '35',
      },
    },
  ],
  exercises: [
    {
      id: 'py-ex-9-1',
      lessonId: 'py-lesson-9',
      order: 1,
      title: 'Task 1: Create a Greeting Function',
      objective: 'Define a function say_hello() that prints "Hello, Learner!". Then call say_hello().',
      initialCode: '# Define say_hello() and call it:\n',
      solutionCode: 'def say_hello():\n    print("Hello, Learner!")\n\nsay_hello()',
      expectedOutput: 'Hello, Learner!',
      hint: 'def say_hello():\n    print("Hello, Learner!")\n\nsay_hello()',
      explanation: 'Defining the function stores the logic; calling say_hello() executes it.',
      quickChips: ['def say_hello():', '    print("Hello, Learner!")', 'say_hello()'],
    },
    {
      id: 'py-ex-9-2',
      lessonId: 'py-lesson-9',
      order: 2,
      title: 'Task 2: Function with Return Value',
      objective: 'Define square(n) that returns n * n. Call square(6) and print the result.',
      initialCode: '# Define square(n) and print square(6):\n',
      solutionCode: 'def square(n):\n    return n * n\n\nprint(square(6))',
      expectedOutput: '36',
      hint: 'def square(n):\n    return n * n\n\nprint(square(6))',
      explanation: 'The return statement sends 36 back, which print() displays.',
      quickChips: ['def square(n):', '    return n * n', 'print(square(6))'],
    },
  ],
  quiz: [
    {
      id: 'py-q-9-1',
      question: 'Which keyword is used to define a new function in Python?',
      explanation: 'The def keyword defines a function in Python.',
      difficulty: 'beginner',
      topicTag: 'functions',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'function', isCorrect: false },
        { id: 'opt-b', text: 'def', isCorrect: true },
        { id: 'opt-c', text: 'func', isCorrect: false },
        { id: 'opt-d', text: 'create', isCorrect: false },
      ],
    },
    {
      id: 'q_python_9_auto_2',
      question: "What is the core principle taught in Python Lesson 9 (Defining Functions with def)?",
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
      id: 'q_python_9_auto_3',
      question: "How does Python manage memory and variable assignments in Lesson 9?",
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
      id: 'q_python_9_auto_4',
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
      id: 'q_python_9_auto_5',
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
      id: 'q_python_9_auto_6',
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
      id: 'q_python_9_auto_7',
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
      id: 'q_python_9_auto_8',
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
      id: 'q_python_9_auto_9',
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
    {
      id: 'q_python_9_auto_10',
      question: "What happens when accessing a non-existent key in a standard Python dictionary using dict[key]?",
      explanation: "Direct subscripting with a missing key raises a KeyError; dict.get(key, default) should be used for safe retrieval.",
      difficulty: 'intermediate',
      topicTag: 'python',
      type: 'multiple-choice',
      options: [
        { id: 'opt_1', text: "It raises a KeyError exception", isCorrect: true },
        { id: 'opt_2', text: "It silently returns None", isCorrect: false },
        { id: 'opt_3', text: "It creates the key automatically with value 0", isCorrect: false },
        { id: 'opt_4', text: "It deletes the dictionary", isCorrect: false },
      ],
    },
  ],
};
