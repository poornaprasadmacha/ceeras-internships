import { PythonLessonDefinition } from '../../types/pythonLesson';

export const pythonLesson12: PythonLessonDefinition = {
  id: 'py-lesson-12',
  number: 12,
  slug: 'classes-and-object-oriented-programming',
  title: 'Classes & Objects (OOP)',
  shortDescription: 'Build real-world software models with classes, constructors, methods, and attributes.',
  estimatedMinutes: 15,
  learningObjectives: [
    'Define reusable blueprint classes using the class keyword',
    'Initialize object attributes with the __init__ constructor',
    'Understand the self parameter and define custom methods',
  ],
  prerequisites: ['Lesson 9: Defining Functions.'],
  sections: [
    {
      id: 'sec-12-1',
      title: 'What is a Class?',
      content: `In Object-Oriented Programming (OOP), a **Class** is a blueprint for creating objects:

\`\`\`python
class Dog:
    def __init__(self, name):
        self.name = name

    def bark(self):
        return f"{self.name} says Woof!"
\`\`\`

Key Rules:
• **class Name**: Begins the class definition (capitalized by convention)
• **__init__(self, ...)**: Constructor that runs whenever a new object is created
• **self**: Refers to the specific object instance being created
• **methods**: Functions defined inside a class that operate on its data`,
      codeExample: {
        code: `class Robot:\n    def __init__(self, model):\n        self.model = model\n    def greet(self):\n        return f"Robot {self.model} online."\n\nbot = Robot("R2")\nprint(bot.greet())`,
        explanation: 'Instantiates a Robot object and calls its greet method.',
        output: 'Robot R2 online.',
      },
    },
  ],
  exercises: [
    {
      id: 'py-ex-12-1',
      lessonId: 'py-lesson-12',
      order: 1,
      title: 'Task 1: Create a Simple Class',
      objective: 'Define a Student class with __init__(self, name) setting self.name = name. Instantiate s = Student("Maya") and print s.name.',
      initialCode: '# Define Student class, instantiate s = Student("Maya"), print s.name:\n',
      solutionCode: 'class Student:\n    def __init__(self, name):\n        self.name = name\n\ns = Student("Maya")\nprint(s.name)',
      expectedOutput: 'Maya',
      hint: 'class Student:\n    def __init__(self, name):\n        self.name = name\ns = Student("Maya")\nprint(s.name)',
      explanation: 'The constructor binds "Maya" to the s instance, accessed as s.name.',
      quickChips: ['class Student:', '    def __init__(self, name):', '        self.name = name', 's = Student("Maya")', 'print(s.name)'],
    },
    {
      id: 'py-ex-12-2',
      lessonId: 'py-lesson-12',
      order: 2,
      title: 'Task 2: Define and Call a Method',
      objective: 'Define class Greeter with method hello(self) returning "Hello World!". Create g = Greeter() and print g.hello().',
      initialCode: '# Define class Greeter with method hello(self) and call it:\n',
      solutionCode: 'class Greeter:\n    def hello(self):\n        return "Hello World!"\n\ng = Greeter()\nprint(g.hello())',
      expectedOutput: 'Hello World!',
      hint: 'class Greeter:\n    def hello(self):\n        return "Hello World!"\ng = Greeter()\nprint(g.hello())',
      explanation: 'Methods defined inside classes operate when invoked on an instance.',
      quickChips: ['class Greeter:', '    def hello(self):', '        return "Hello World!"', 'g = Greeter()', 'print(g.hello())'],
    },
  ],
  quiz: [
    {
      id: 'py-q-12-1',
      question: 'What special method is automatically called when a new object is instantiated in Python?',
      explanation: '__init__ is the initializer constructor method called during object instantiation.',
      difficulty: 'intermediate',
      topicTag: 'oop',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: '__start__', isCorrect: false },
        { id: 'opt-b', text: '__init__', isCorrect: true },
        { id: 'opt-c', text: '__new_object__', isCorrect: false },
        { id: 'opt-d', text: '__build__', isCorrect: false },
      ],
    },
    {
      id: 'q_python_12_auto_2',
      question: "What is the core principle taught in Python Lesson 12 (Classes & Objects (OOP))?",
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
      id: 'q_python_12_auto_3',
      question: "How does Python manage memory and variable assignments in Lesson 12?",
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
      id: 'q_python_12_auto_4',
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
      id: 'q_python_12_auto_5',
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
      id: 'q_python_12_auto_6',
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
      id: 'q_python_12_auto_7',
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
      id: 'q_python_12_auto_8',
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
      id: 'q_python_12_auto_9',
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
      id: 'q_python_12_auto_10',
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
