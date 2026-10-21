import { DatasetDefinition } from '../../types/lesson';

export const courseCatalogDataset: DatasetDefinition = {
  id: 'course_catalog',
  tableName: 'CourseCatalog',
  description: 'An academic registry of computer science, data, and design courses.',
  schemaDDL: `
    CREATE TABLE CourseCatalog (
      course_id INTEGER PRIMARY KEY,
      course_name TEXT NOT NULL,
      instructor TEXT NOT NULL,
      duration_hours INTEGER NOT NULL,
      level TEXT NOT NULL
    );
  `,
  seedDML: `
    INSERT INTO CourseCatalog (course_id, course_name, instructor, duration_hours, level) VALUES
      (201, 'Python Foundations', 'Maya Sen', 12, 'Beginner'),
      (202, 'Web Design Basics', 'Arjun Rao', 8, 'Beginner'),
      (203, 'Data Thinking', 'Leena Das', 16, 'Intermediate'),
      (204, 'Database Essentials', 'Kabir Mehta', 14, 'Beginner'),
      (205, 'Applied Statistics', 'Nila Thomas', 18, 'Intermediate'),
      (206, 'API Development', 'Dev Kapoor', 20, 'Advanced');
  `,
  sampleColumns: ['course_id', 'course_name', 'instructor', 'duration_hours', 'level'],
  sampleRows: [
    [201, 'Python Foundations', 'Maya Sen', 12, 'Beginner'],
    [202, 'Web Design Basics', 'Arjun Rao', 8, 'Beginner'],
    [203, 'Data Thinking', 'Leena Das', 16, 'Intermediate'],
    [204, 'Database Essentials', 'Kabir Mehta', 14, 'Beginner'],
    [205, 'Applied Statistics', 'Nila Thomas', 18, 'Intermediate'],
    [206, 'API Development', 'Dev Kapoor', 20, 'Advanced'],
  ],
};
