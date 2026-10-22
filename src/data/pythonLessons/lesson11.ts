import { PythonLessonDefinition } from '../../types/pythonLesson';

export const pythonLesson11: PythonLessonDefinition = {
  id: 'py-lesson-11',
  number: 11,
  slug: 'exception-handling-try-except',
  title: 'Error Handling with try and except',
  shortDescription: 'Catch runtime exceptions safely and prevent unexpected program crashes.',
  estimatedMinutes: 12,
  learningObjectives: [
    'Protect risky operations with try blocks',
    'Catch specific exceptions with except ExceptionType:',
    'Provide graceful user feedback instead of crash stack traces',
  ],
  prerequisites: ['Lesson 5: Conditionals and Lesson 9: Functions.'],
  sections: [
    {
      id: 'sec-11-1',
      title: 'Graceful Error Recovery',
      content: `When Python encounters an error (like dividing by zero or converting bad text), it raises an **Exception**. If uncaught, the program crashes immediately!

The \`try...except\` block catches exceptions gracefully:

\`\`\`python
try:
    # Code that might cause an error
    number = int("abc")
except ValueError:
    # Runs ONLY if a ValueError occurs
    print("Invalid number format!")
\`\`\`

• Keeps software running smoothly
• Standard exceptions: \`ZeroDivisionError\`, \`ValueError\`, \`KeyError\`, \`IndexError\``,
      codeExample: {
        code: `try:\n    result = 10 / 0\nexcept ZeroDivisionError:\n    print("Cannot divide by zero!")`,
        explanation: 'Catches the division by zero and prints an informative notice without crashing.',
        output: 'Cannot divide by zero!',
      },
    },
  ],
  exercises: [
    {
      id: 'py-ex-11-1',
      lessonId: 'py-lesson-11',
      order: 1,
      title: 'Task 1: Catch ZeroDivisionError',
      objective: 'Write a try-except block that attempts to divide 100 by 0. In the except ZeroDivisionError block, print "Division error caught!".',
      initialCode: '# Write try-except for ZeroDivisionError:\n',
      solutionCode: 'try:\n    x = 100 / 0\nexcept ZeroDivisionError:\n    print("Division error caught!")',
      expectedOutput: 'Division error caught!',
      hint: 'try:\n    x = 100 / 0\nexcept ZeroDivisionError:\n    print("Division error caught!")',
      explanation: 'Prevents the division error from crashing the interpreter.',
      quickChips: ['try:', '    x = 100 / 0', 'except ZeroDivisionError:', '    print("Division error caught!")'],
    },
    {
      id: 'py-ex-11-2',
      lessonId: 'py-lesson-11',
      order: 2,
      title: 'Task 2: Handle Invalid Conversions',
      objective: 'Write a try-except block attempting int("hello"). In except ValueError, print "Not an integer".',
      initialCode: '# Catch ValueError when converting "hello" to int:\n',
      solutionCode: 'try:\n    val = int("hello")\nexcept ValueError:\n    print("Not an integer")',
      expectedOutput: 'Not an integer',
      hint: 'try:\n    val = int("hello")\nexcept ValueError:\n    print("Not an integer")',
      explanation: 'Passing non-numeric strings to int() raises a ValueError, which is caught and handled.',
      quickChips: ['try:', '    val = int("hello")', 'except ValueError:', '    print("Not an integer")'],
    },
  ],
  quiz: [
    {
      id: 'py-q-11-1',
      question: 'Which block executes ONLY if an error occurs inside a try block?',
      explanation: 'The except block handles errors raised inside the corresponding try block.',
      difficulty: 'intermediate',
      topicTag: 'exceptions',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'finally', isCorrect: false },
        { id: 'opt-b', text: 'except', isCorrect: true },
        { id: 'opt-c', text: 'catch', isCorrect: false },
        { id: 'opt-d', text: 'else', isCorrect: false },
      ],
    },
    {
      id: 'q_python_11_auto_2',
      question: "What is the core principle taught in Python Lesson 11 (Error Handling with try and except)?",
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
      id: 'q_python_11_auto_3',
      question: "How does Python manage memory and variable assignments in Lesson 11?",
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
      id: 'q_python_11_auto_4',
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
      id: 'q_python_11_auto_5',
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
      id: 'q_python_11_auto_6',
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
      id: 'q_python_11_auto_7',
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
      id: 'q_python_11_auto_8',
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
      id: 'q_python_11_auto_9',
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
      id: 'q_python_11_auto_10',
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
