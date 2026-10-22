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
    {
      id: 'q_python_6_auto_2',
      question: "What is the core principle taught in Python Lesson 6 (Working with Lists (Arrays))?",
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
      id: 'q_python_6_auto_3',
      question: "How does Python manage memory and variable assignments in Lesson 6?",
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
      id: 'q_python_6_auto_4',
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
      id: 'q_python_6_auto_5',
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
      id: 'q_python_6_auto_6',
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
      id: 'q_python_6_auto_7',
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
      id: 'q_python_6_auto_8',
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
      id: 'q_python_6_auto_9',
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
      id: 'q_python_6_auto_10',
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
