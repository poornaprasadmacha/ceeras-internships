import { DataScienceLessonDefinition } from '../../types/dataScienceLesson';

export const dsLesson1: DataScienceLessonDefinition = {
  id: 'ds-lesson-1',
  number: 1,
  slug: 'intro-to-data-science-and-datasets',
  title: 'Introduction to Data Science & Tabular Datasets',
  shortDescription: 'Explore the foundations of data science, tabular datasets, features, records, and inspecting dataset shapes.',
  estimatedMinutes: 8,
  learningObjectives: [
    'Understand data science as the intersection of domain knowledge, statistics, and programming',
    'Navigate tabular datasets structured in rows (observations) and columns (features)',
    'Inspect dataset dimensions and preview the first few rows',
  ],
  prerequisites: ['Basic computer literacy and enthusiasm for data!'],
  sections: [
    {
      id: 'sec-1-1',
      title: 'What is Data Science?',
      content: `**Data Science** is the discipline of extracting actionable knowledge, patterns, and predictions from raw data.

• **Tabular Datasets**: Two-dimensional grids where:
  • **Rows (Records / Observations)**: Each represents an individual entity (e.g. one student, one transaction).
  • **Columns (Features / Variables)**: Each represents an attribute measured (e.g. \`age\`, \`salary\`, \`gpa\`).`,
    },
    {
      id: 'sec-1-2',
      title: 'Inspecting Datasets with df.count() and df.head()',
      content: `Before modeling, data scientists inspect the dataset shape:

\`\`\`javascript
// Count total observations
console.log("Total records:", df.count());

// Inspect first 3 rows
console.log(df.head(3));
\`\`\`

• \`df.count()\`: Returns the total number of records in the dataset.
• \`df.head(n)\`: Displays the top \`n\` rows to verify column alignments.`,
    },
  ],
  exercises: [
    {
      id: 'ds-ex-1-1',
      lessonId: 'ds-lesson-1',
      order: 1,
      title: 'Inspect Student Enrollment Dataset Count',
      objective: 'Use console.log(df.count()); to print the total number of enrolled student records in the active dataset.',
      dataset: {
        name: 'students_cohort.csv',
        columns: ['student_id', 'name', 'track', 'score'],
        rows: [
          [101, 'Maya', 'Python', 92],
          [102, 'Alex', 'SQL', 88],
          [103, 'Jordan', 'Data Science', 95],
          [104, 'Leo', 'JavaScript', 84],
          [105, 'Chloe', 'Data Science', 91],
        ],
        description: 'Cohort enrollment and initial scores',
      },
      initialCode: `// Print the total record count using df.count() below:\n\n`,
      solutionCode: `console.log(df.count());`,
      expectedOutput: '5',
      hint: 'Type console.log(df.count());',
      explanation: 'df.count() computes the total number of row observations in the dataset.',
      quickChips: ['console.log(df.count());', 'console.log(df.head(3));'],
    },
  ],
  quiz: [
    {
      id: 'q-ds-1-1',
      question: 'In a tabular dataset, what does each horizontal row represent?',
      explanation: 'Each row corresponds to an individual observation, record, or entity.',
      difficulty: 'beginner',
      topicTag: 'data-science',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'An individual observation or record', isCorrect: true },
        { id: 'opt-b', text: 'A mathematical formula', isCorrect: false },
        { id: 'opt-c', text: 'A database index table', isCorrect: false },
        { id: 'opt-d', text: 'A graph axis', isCorrect: false },
      ],
    },
    {
      id: 'q-ds-1-2',
      question: 'What are the vertical columns in a dataset commonly referred to in data science and machine learning?',
      explanation: 'Columns represent attributes, properties, or features of the data.',
      difficulty: 'beginner',
      topicTag: 'data-science',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'Features or Variables', isCorrect: true },
        { id: 'opt-b', text: 'Observations', isCorrect: false },
        { id: 'opt-c', text: 'Records', isCorrect: false },
        { id: 'opt-d', text: 'Indexes only', isCorrect: false },
      ],
    },
    {
      id: 'q-ds-1-3',
      question: 'What does the .head(n) method return when exploring a DataFrame?',
      explanation: '.head(n) previews the first n rows of the dataset.',
      difficulty: 'beginner',
      topicTag: 'data-science',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'The first n rows of the dataset', isCorrect: true },
        { id: 'opt-b', text: 'The column headers only', isCorrect: false },
        { id: 'opt-c', text: 'The average of all columns', isCorrect: false },
        { id: 'opt-d', text: 'The last row of the dataset', isCorrect: false },
      ],
    },
  ],
};
