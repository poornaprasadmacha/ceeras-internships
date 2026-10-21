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
  ],
};
