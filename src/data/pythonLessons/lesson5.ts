import { PythonLessonDefinition } from '../../types/pythonLesson';

export const pythonLesson5: PythonLessonDefinition = {
  id: 'py-lesson-5',
  number: 5,
  slug: 'conditionals-if-elif-else',
  title: 'Decisions with if, elif, and else',
  shortDescription: 'Make decisions in your code using conditional branching and comparisons.',
  estimatedMinutes: 12,
  learningObjectives: [
    'Write conditional statements using if, elif, and else',
    'Compare values with ==, !=, >, <, >=, and <=',
    'Understand Python indentation rules for code blocks',
  ],
  prerequisites: ['Lesson 2: Variables & Booleans.'],
  sections: [
    {
      id: 'sec-5-1',
      title: 'How if Statements Work',
      content: `In programming, decisions are made with **if statements**:

\`\`\`python
if condition:
    # Indented code block runs ONLY if condition is True
\`\`\`

Comparison Operators:
• \`==\`: Equals
• \`!=\`: Not equals
• \`>\`, \`<\`: Greater / less than
• \`>=\`, \`<=\`: Greater / less than or equal to

**Crucial Rule**: The lines of code inside the \`if\` block **must be indented** (usually 4 spaces or a tab)!`,
      codeExample: {
        code: `age = 16\nif age >= 18:\n    print("Eligible to vote")\nelse:\n    print("Too young to vote")`,
        explanation: 'Tests if age meets the threshold and prints the matching branch.',
        output: 'Too young to vote',
      },
    },
  ],
  exercises: [
    {
      id: 'py-ex-5-1',
      lessonId: 'py-lesson-5',
      order: 1,
      title: 'Task 1: Basic if-else Statement',
      objective: 'Given temperature = 32, write an if-else block: if temperature >= 30 print "Hot", else print "Cool".',
      initialCode: 'temperature = 32\n# Write if-else below:\n',
      solutionCode: 'temperature = 32\nif temperature >= 30:\n    print("Hot")\nelse:\n    print("Cool")',
      expectedOutput: 'Hot',
      hint: 'if temperature >= 30:\n    print("Hot")\nelse:\n    print("Cool")',
      explanation: 'Since 32 is >= 30, the first branch executes and outputs "Hot".',
      quickChips: ['if temperature >= 30:', 'else:', 'print("Hot")', 'print("Cool")'],
    },
    {
      id: 'py-ex-5-2',
      lessonId: 'py-lesson-5',
      order: 2,
      title: 'Task 2: Three-Way Decision with elif',
      objective: 'Given score = 85. If score >= 90 print "Grade A", elif score >= 80 print "Grade B", else print "Grade C".',
      initialCode: 'score = 85\n# Write if-elif-else below:\n',
      solutionCode: 'score = 85\nif score >= 90:\n    print("Grade A")\nelif score >= 80:\n    print("Grade B")\nelse:\n    print("Grade C")',
      expectedOutput: 'Grade B',
      hint: 'Use if score >= 90:, elif score >= 80:, and else:',
      explanation: 'Evaluates conditions in sequence; stops at the first matching branch.',
      quickChips: ['if score >= 90:', 'elif score >= 80:', 'else:', 'print("Grade B")'],
    },
  ],
  quiz: [
    {
      id: 'py-q-5-1',
      question: 'How does Python determine which lines belong inside an if statement block?',
      explanation: 'Python uses indentation (spaces) to delineate code blocks.',
      difficulty: 'beginner',
      topicTag: 'conditionals',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'Curly braces { }', isCorrect: false },
        { id: 'opt-b', text: 'Indentation (whitespace)', isCorrect: true },
        { id: 'opt-c', text: 'Parentheses ( )', isCorrect: false },
        { id: 'opt-d', text: 'Semicolons ;', isCorrect: false },
      ],
    },
    {
      id: 'q_python_5_auto_2',
      question: "What is the core principle taught in Python Lesson 5 (Decisions with if, elif, and else)?",
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
      id: 'q_python_5_auto_3',
      question: "How does Python manage memory and variable assignments in Lesson 5?",
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
      id: 'q_python_5_auto_4',
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
      id: 'q_python_5_auto_5',
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
      id: 'q_python_5_auto_6',
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
      id: 'q_python_5_auto_7',
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
      id: 'q_python_5_auto_8',
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
      id: 'q_python_5_auto_9',
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
      id: 'q_python_5_auto_10',
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
