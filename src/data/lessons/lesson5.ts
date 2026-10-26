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
      question: "Which SQL clause sorts the rows returned by a query?",
      explanation: "ORDER BY sorts the returned query rows.",
      difficulty: 'intermediate',
      topicTag: 'SQL',
      type: 'multiple-choice',
      options: [
        { id: 'opt_1', text: "SORT BY", isCorrect: false },
        { id: 'opt_2', text: "ORDER BY", isCorrect: true },
        { id: 'opt_3', text: "GROUP BY", isCorrect: false },
        { id: 'opt_4', text: "ARRANGE BY", isCorrect: false },
      ],
    },
    {
      id: 'q_5_2',
      question: "Where does ORDER BY appear in a standard SELECT query?",
      explanation: "Clause order: SELECT -> FROM -> WHERE -> ORDER BY.",
      difficulty: 'intermediate',
      topicTag: 'SQL',
      type: 'multiple-choice',
      options: [
        { id: 'opt_1', text: "Before the SELECT clause", isCorrect: false },
        { id: 'opt_2', text: "Immediately after the FROM clause", isCorrect: false },
        { id: 'opt_3', text: "After the WHERE clause (near the end of the query).", isCorrect: true },
        { id: 'opt_4', text: "Inside the WHERE clause", isCorrect: false },
      ],
    },
    {
      id: 'q_5_3',
      question: "What is the default sort direction if neither ASC nor DESC is specified?",
      explanation: "ASC is the default ordering direction.",
      difficulty: 'intermediate',
      topicTag: 'SQL',
      type: 'multiple-choice',
      options: [
        { id: 'opt_1', text: "DESC (Descending)", isCorrect: false },
        { id: 'opt_2', text: "ASC (Ascending)", isCorrect: true },
        { id: 'opt_3', text: "Random order", isCorrect: false },
        { id: 'opt_4', text: "Primary key order", isCorrect: false },
      ],
    },
    {
      id: 'q_5_4',
      question: "What does the DESC keyword stand for and how does it sort?",
      explanation: "DESC sorts in reverse order (high-to-low / Z-to-A).",
      difficulty: 'intermediate',
      topicTag: 'SQL',
      type: 'multiple-choice',
      options: [
        { id: 'opt_1', text: "Description; it describes the column", isCorrect: false },
        { id: 'opt_2', text: "Descending; it sorts from highest to lowest or Z to A.", isCorrect: true },
        { id: 'opt_3', text: "Distinct; it removes duplicate rows", isCorrect: false },
        { id: 'opt_4', text: "Decrease; it subtracts 1", isCorrect: false },
      ],
    },
    {
      id: 'q_5_5',
      question: "How do you sort by department ascending, then by salary descending within each department?",
      explanation: "Comma-separated columns specify secondary sort criteria.",
      difficulty: 'intermediate',
      topicTag: 'SQL',
      type: 'multiple-choice',
      options: [
        { id: 'opt_1', text: "ORDER BY department AND salary DESC", isCorrect: false },
        { id: 'opt_2', text: "ORDER BY department ASC, salary DESC", isCorrect: true },
        { id: 'opt_3', text: "ORDER BY department, salary", isCorrect: false },
        { id: 'opt_4', text: "SORT department, DESC salary", isCorrect: false },
      ],
    },
    {
      id: 'q_5_6',
      question: "How does ORDER BY sort numerical values when ASC is used?",
      explanation: "Ascending order sorts numbers from minimum to maximum.",
      difficulty: 'intermediate',
      topicTag: 'SQL',
      type: 'multiple-choice',
      options: [
        { id: 'opt_1', text: "From highest to lowest", isCorrect: false },
        { id: 'opt_2', text: "From the lowest number to the highest number.", isCorrect: true },
        { id: 'opt_3', text: "By number of digits", isCorrect: false },
        { id: 'opt_4', text: "Randomly", isCorrect: false },
      ],
    },
    {
      id: 'q_5_7',
      question: "How does ORDER BY sort string values when ASC is used?",
      explanation: "Ascending sorts text in standard lexicographical A-to-Z order.",
      difficulty: 'intermediate',
      topicTag: 'SQL',
      type: 'multiple-choice',
      options: [
        { id: 'opt_1', text: "Alphabetically from Z to A", isCorrect: false },
        { id: 'opt_2', text: "Alphabetically from A to Z.", isCorrect: true },
        { id: 'opt_3', text: "By string length only", isCorrect: false },
        { id: 'opt_4', text: "By vowel count", isCorrect: false },
      ],
    },
    {
      id: 'q_5_8',
      question: "Can you sort by a column that is not present in the SELECT column list?",
      explanation: "Tables can be sorted by attributes not included in the projection.",
      difficulty: 'intermediate',
      topicTag: 'SQL',
      type: 'multiple-choice',
      options: [
        { id: 'opt_1', text: "No, sorted columns must always be in the SELECT list", isCorrect: false },
        { id: 'opt_2', text: "Yes, standard SQL allows sorting by any valid column in the queried table.", isCorrect: true },
        { id: 'opt_3', text: "Only in MySQL", isCorrect: false },
        { id: 'opt_4', text: "Only if it is a primary key", isCorrect: false },
      ],
    },
    {
      id: 'q_5_9',
      question: "In SQLite, where do NULL values appear by default in an ASC sort?",
      explanation: "SQLite considers NULL to be smaller than any other value.",
      difficulty: 'intermediate',
      topicTag: 'SQL',
      type: 'multiple-choice',
      options: [
        { id: 'opt_1', text: "At the very top (first).", isCorrect: true },
        { id: 'opt_2', text: "At the very bottom (last)", isCorrect: false },
        { id: 'opt_3', text: "They are filtered out", isCorrect: false },
        { id: 'opt_4', text: "In the exact middle", isCorrect: false },
      ],
    },
    {
      id: 'q_5_10',
      question: "What does 'ORDER BY 2 DESC' mean in an SQL query?",
      explanation: "Integers in ORDER BY reference 1-based column positions in SELECT.",
      difficulty: 'intermediate',
      topicTag: 'SQL',
      type: 'multiple-choice',
      options: [
        { id: 'opt_1', text: "Sort by the number 2", isCorrect: false },
        { id: 'opt_2', text: "Sort descending by the 2nd column listed in the SELECT clause.", isCorrect: true },
        { id: 'opt_3', text: "Sort only the first 2 rows", isCorrect: false },
        { id: 'opt_4', text: "Repeat the query 2 times", isCorrect: false },
      ],
    },
  ],
};
