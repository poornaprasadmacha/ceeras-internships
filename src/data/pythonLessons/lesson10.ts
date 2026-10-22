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
    {
      id: 'q_python_10_auto_2',
      question: "What is the core principle taught in Python Lesson 10 (List Comprehensions)?",
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
      id: 'q_python_10_auto_3',
      question: "How does Python manage memory and variable assignments in Lesson 10?",
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
      id: 'q_python_10_auto_4',
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
      id: 'q_python_10_auto_5',
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
      id: 'q_python_10_auto_6',
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
      id: 'q_python_10_auto_7',
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
      id: 'q_python_10_auto_8',
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
      id: 'q_python_10_auto_9',
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
      id: 'q_python_10_auto_10',
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
