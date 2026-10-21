import { LessonDefinition } from '../../types/lesson';
import { cleanDatabaseDataset } from '../datasets/cleanDatabase';

export const lesson15: LessonDefinition = {
  id: 'lesson_15',
  number: 15,
  slug: 'creating-tables',
  title: 'Creating Tables with CREATE TABLE',
  shortDescription:
    'Define new database tables, choose proper data types (INTEGER, TEXT, REAL), and enforce integrity with constraints (PRIMARY KEY, NOT NULL, DEFAULT).',
  estimatedMinutes: 14,
  learningObjectives: [
    'Define new tables using the CREATE TABLE statement.',
    'Select appropriate SQLite data types: INTEGER, TEXT, REAL, and BLOB.',
    'Enforce entity integrity with PRIMARY KEY.',
    'Prevent missing entries with NOT NULL and supply fallback values with DEFAULT.',
  ],
  prerequisites: ['All foundational DML and querying lessons.'],
  dataset: cleanDatabaseDataset,
  sections: [
    {
      id: 'section-create-table-syntax',
      title: 'A. Designing Schemas with CREATE TABLE',
      content: `The **CREATE TABLE** statement establishes the blueprint for storing new data entities:

\`\`\`sql
CREATE TABLE SchoolCourses (
  course_id INTEGER PRIMARY KEY,
  title TEXT NOT NULL,
  credits INTEGER DEFAULT 3,
  tuition_rate REAL NOT NULL
);
\`\`\`

• **PRIMARY KEY**: Uniquely identifies each record and prevents duplicates.
• **NOT NULL**: Guarantees the column must never be left blank.
• **DEFAULT value**: Automatically provides a value when omitted during insertion.`,
      codeExample: {
        sql: `CREATE TABLE Students (\n  id INTEGER PRIMARY KEY,\n  full_name TEXT NOT NULL,\n  gpa REAL DEFAULT 4.0\n);`,
        explanation: 'Declares a Students table with id as primary key and a default GPA of 4.0.',
      },
    },
  ],
  exercises: [
    {
      id: 'ex_15_1',
      lessonId: 'lesson_15',
      order: 1,
      title: 'Exercise 1: Create a SchoolCourses Table',
      objective: 'Write a statement to create a table named SchoolCourses with three columns: course_id INTEGER PRIMARY KEY, title TEXT NOT NULL, and credits INTEGER DEFAULT 3.',
      initialQuery: 'CREATE TABLE SchoolCourses (\n',
      solutionQuery: 'CREATE TABLE SchoolCourses (course_id INTEGER PRIMARY KEY, title TEXT NOT NULL, credits INTEGER DEFAULT 3);',
      hint: 'Include course_id INTEGER PRIMARY KEY, title TEXT NOT NULL, credits INTEGER DEFAULT 3.',
      explanation: 'Creates the new structured table in SQLite.',
      allowsMutation: true,
      verificationQuery: "SELECT name FROM sqlite_master WHERE type='table' AND name='SchoolCourses';",
      expectedColumns: ['name'],
    },
  ],
  quiz: [
        {
      id: 'q_15_1',
      question: 'Which constraint ensures that a column cannot store NULL values?',
      explanation: 'The NOT NULL constraint strictly enforces that every inserted record must provide a valid value for that column.',
      difficulty: 'beginner',
      topicTag: 'Concept Check',
      type: 'multiple-choice',
      options: [
        { id: 'opt_1', text: 'UNIQUE', isCorrect: false },
        { id: 'opt_2', text: 'NOT NULL', isCorrect: true },
        { id: 'opt_3', text: 'CHECK', isCorrect: false },
        { id: 'opt_4', text: 'FOREIGN KEY', isCorrect: false }
      ],
    },
  ],
};
