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
    {
      id: 'q_python_4_auto_2',
      question: "What is the core principle taught in Python Lesson 4 (String Formatting & F-Strings)?",
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
      id: 'q_python_4_auto_3',
      question: "How does Python manage memory and variable assignments in Lesson 4?",
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
      id: 'q_python_4_auto_4',
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
      id: 'q_python_4_auto_5',
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
      id: 'q_python_4_auto_6',
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
      id: 'q_python_4_auto_7',
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
      id: 'q_python_4_auto_8',
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
      id: 'q_python_4_auto_9',
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
      id: 'q_python_4_auto_10',
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
