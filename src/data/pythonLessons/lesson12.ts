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
  ],
};
