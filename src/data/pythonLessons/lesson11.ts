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
  ],
};
