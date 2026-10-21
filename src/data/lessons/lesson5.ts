import { LessonDefinition } from '../../types/lesson';
import { studentEnrollmentsDataset } from '../datasets/studentEnrollments';

export const lesson5: LessonDefinition = {
  id: 'lesson_5',
  number: 5,
  slug: 'multi-table-inner-join',
  title: 'Multi-Table Queries with INNER JOIN',
  shortDescription:
    'Combine data across normalized tables by matching foreign keys using the INNER JOIN clause and ON condition.',
  estimatedMinutes: 15,
  learningObjectives: [
    'Understand why relational databases split data across multiple tables.',
    'Use primary and foreign keys to relate records.',
    'Connect tables using INNER JOIN and specify join predicates with ON.',
    'Disambiguate column names using table name or alias prefixes (e.g., s.student_name).',
  ],
  prerequisites: ['Basic SELECT, WHERE, and sorting operations.'],
  dataset: studentEnrollmentsDataset,
  sections: [
    {
      id: 'section-why-joins',
      title: 'A. Why Split Data into Multiple Tables?',
      content: `In relational database design, data is normalized into dedicated tables to prevent redundant duplication.
      
For example, student details (name, major) live in **Students**, while individual course registrations live in **CourseEnrollments**. They connect through a shared identifier: **student_id**.`,
    },
    {
      id: 'section-inner-join-syntax',
      title: 'B. The INNER JOIN Syntax',
      content: `An **INNER JOIN** compares rows from two tables and outputs only rows where the join condition in the **ON** clause is satisfied on both sides.

\`\`\`sql
SELECT Students.student_name, CourseEnrollments.course_code
FROM Students
INNER JOIN CourseEnrollments
  ON Students.student_id = CourseEnrollments.student_id;
\`\`\``,
      codeExample: {
        sql: `SELECT s.student_name, e.course_code, e.grade_letter\nFROM Students AS s\nINNER JOIN CourseEnrollments AS e\n  ON s.student_id = e.student_id;`,
        explanation: 'Combines student names with their registered courses and awarded grades.',
      },
    },
  ],
  exercises: [
    {
      id: 'ex_5_1',
      lessonId: 'lesson_5',
      order: 1,
      title: 'Exercise 1: Match Students with Course Codes',
      objective: 'Write a query using an INNER JOIN to return student_name and course_code for all enrolled students.',
      initialQuery: 'SELECT Students.student_name, CourseEnrollments.course_code\nFROM Students\nINNER JOIN CourseEnrollments\n  ON',
      solutionQuery: 'SELECT Students.student_name, CourseEnrollments.course_code FROM Students INNER JOIN CourseEnrollments ON Students.student_id = CourseEnrollments.student_id;',
      hint: 'Join on Students.student_id = CourseEnrollments.student_id.',
      explanation: 'INNER JOIN combines matching rows where the student_id matches in both tables.',
      expectedColumns: ['student_name', 'course_code'],
    },
    {
      id: 'ex_5_2',
      lessonId: 'lesson_5',
      order: 2,
      title: 'Exercise 2: Filter Joined Results with WHERE',
      objective: 'Select student_name, course_code, and grade_letter for enrollments where the grade_letter is "A".',
      initialQuery: 'SELECT s.student_name, e.course_code, e.grade_letter\nFROM Students s\nINNER JOIN CourseEnrollments e ON s.student_id = e.student_id\nWHERE',
      solutionQuery: "SELECT s.student_name, e.course_code, e.grade_letter FROM Students s INNER JOIN CourseEnrollments e ON s.student_id = e.student_id WHERE e.grade_letter = 'A';",
      hint: "Add WHERE e.grade_letter = 'A' at the end of the query.",
      explanation: 'WHERE clauses filter the combined joined dataset just like single-table queries.',
      expectedColumns: ['student_name', 'course_code', 'grade_letter'],
    },
    {
      id: 'ex_5_3',
      lessonId: 'lesson_5',
      order: 3,
      title: 'Exercise 3: Joined Results for CS101',
      objective: 'Select student_name, major, and credits for all students enrolled in the course_code "CS101".',
      initialQuery: 'SELECT s.student_name, s.major, e.credits\nFROM Students s\nINNER JOIN CourseEnrollments e ON s.student_id = e.student_id\nWHERE',
      solutionQuery: "SELECT s.student_name, s.major, e.credits FROM Students s INNER JOIN CourseEnrollments e ON s.student_id = e.student_id WHERE e.course_code = 'CS101';",
      hint: "Filter with e.course_code = 'CS101'.",
      explanation: 'This identifies which students from what majors took CS101.',
      expectedColumns: ['student_name', 'major', 'credits'],
    },
  ],
  quiz: [
        {
      id: 'q_5_1',
      question: 'What happens to rows in an INNER JOIN if there is no matching record in the second table?',
      explanation: 'INNER JOIN only returns rows where the ON condition evaluates to true on both sides; unmatched rows are discarded.',
      difficulty: 'beginner',
      topicTag: 'Concept Check',
      type: 'multiple-choice',
      options: [
        { id: 'opt_1', text: 'They are omitted entirely from the query output.', isCorrect: true },
        { id: 'opt_2', text: 'They are included with NULL values in the missing columns.', isCorrect: false },
        { id: 'opt_3', text: 'The database throws an execution error.', isCorrect: false },
        { id: 'opt_4', text: 'They replace the matching rows.', isCorrect: false }
      ],
    },
        {
      id: 'q_5_2',
      question: 'Why are table aliases (e.g., FROM Students s) commonly used with JOINs?',
      explanation: 'Aliases improve readability and allow unambiguous references like s.student_id vs e.student_id.',
      difficulty: 'beginner',
      topicTag: 'Concept Check',
      type: 'multiple-choice',
      options: [
        { id: 'opt_1', text: 'They are mandatory by the SQL standard.', isCorrect: false },
        { id: 'opt_2', text: 'They shorten queries and resolve ambiguity when column names are identical across tables.', isCorrect: true },
        { id: 'opt_3', text: 'They make queries run 10x faster.', isCorrect: false },
        { id: 'opt_4', text: 'They automatically create new indexes.', isCorrect: false }
      ],
    },
  ],
};
