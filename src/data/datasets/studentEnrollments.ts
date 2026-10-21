import { DatasetDefinition } from '../../types/lesson';

export const studentEnrollmentsDataset: DatasetDefinition = {
  id: 'student-enrollments',
  tableName: 'Students',
  description: 'Two relational tables: Students and CourseEnrollments linked by student_id.',
  schemaDDL: `
    CREATE TABLE Students (
      student_id INTEGER PRIMARY KEY,
      student_name TEXT NOT NULL,
      major TEXT NOT NULL,
      enrollment_year INTEGER NOT NULL
    );

    CREATE TABLE CourseEnrollments (
      enrollment_id INTEGER PRIMARY KEY,
      student_id INTEGER NOT NULL,
      course_code TEXT NOT NULL,
      grade_letter TEXT NOT NULL,
      credits INTEGER NOT NULL
    );
  `,
  seedDML: `
    INSERT INTO Students (student_id, student_name, major, enrollment_year) VALUES
      (1, 'Alice Morgan', 'Computer Science', 2022),
      (2, 'Bob Ramirez', 'Mathematics', 2023),
      (3, 'Chloe Dubois', 'Data Science', 2022),
      (4, 'Daniel Kim', 'Computer Science', 2024),
      (5, 'Evelyn Brooks', 'Economics', 2023);

    INSERT INTO CourseEnrollments (enrollment_id, student_id, course_code, grade_letter, credits) VALUES
      (101, 1, 'CS101', 'A', 4),
      (102, 1, 'MATH201', 'B', 3),
      (103, 2, 'MATH201', 'A', 3),
      (104, 3, 'CS101', 'A', 4),
      (105, 3, 'DS301', 'A', 4),
      (106, 4, 'CS101', 'B', 4);
  `,
  sampleColumns: ['student_id', 'student_name', 'major', 'enrollment_year'],
  sampleRows: [
    [1, 'Alice Morgan', 'Computer Science', 2022],
    [2, 'Bob Ramirez', 'Mathematics', 2023],
    [3, 'Chloe Dubois', 'Data Science', 2022],
    [4, 'Daniel Kim', 'Computer Science', 2024],
    [5, 'Evelyn Brooks', 'Economics', 2023],
  ],
};
