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
    {
      id: 'q_python_8_auto_2',
      question: "What is the core principle taught in Python Lesson 8 (Key-Value Dictionaries)?",
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
      id: 'q_python_8_auto_3',
      question: "How does Python manage memory and variable assignments in Lesson 8?",
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
      id: 'q_python_8_auto_4',
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
      id: 'q_python_8_auto_5',
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
      id: 'q_python_8_auto_6',
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
      id: 'q_python_8_auto_7',
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
      id: 'q_python_8_auto_8',
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
      id: 'q_python_8_auto_9',
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
      id: 'q_python_8_auto_10',
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
