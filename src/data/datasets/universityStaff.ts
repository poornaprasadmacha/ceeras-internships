import { DatasetDefinition } from '../../types/lesson';

export const universityStaffDataset: DatasetDefinition = {
  id: 'university-staff',
  tableName: 'FacultyMembers',
  description: 'Academic university faculty roster with departmental affiliations and salary levels.',
  schemaDDL: `
    CREATE TABLE FacultyMembers (
      faculty_id INTEGER PRIMARY KEY,
      name TEXT NOT NULL,
      department TEXT NOT NULL,
      title TEXT NOT NULL,
      annual_salary INTEGER NOT NULL,
      hire_year INTEGER NOT NULL
    );
  `,
  seedDML: `
    INSERT INTO FacultyMembers (faculty_id, name, department, title, annual_salary, hire_year) VALUES
      (1, 'Dr. Aris Thorne', 'Computer Science', 'Professor', 115000, 2012),
      (2, 'Dr. Beatrice Lin', 'Computer Science', 'Associate Professor', 95000, 2017),
      (3, 'Dr. Clara Vance', 'Mathematics', 'Professor', 108000, 2014),
      (4, 'Dr. Derek Shaw', 'Physics', 'Assistant Professor', 82000, 2021),
      (5, 'Dr. Evelyn Ward', 'Physics', 'Professor', 112000, 2011),
      (6, 'Dr. Fiona Gallagher', 'Computer Science', 'Assistant Professor', 88000, 2022),
      (7, 'Dr. George Santos', 'Mathematics', 'Associate Professor', 91000, 2018),
      (8, 'Dr. Helena Roy', 'Physics', 'Associate Professor', 94000, 2016),
      (9, 'Dr. Ian Bell', 'Biology', 'Professor', 105000, 2015),
      (10, 'Dr. Julia Cho', 'Mathematics', 'Assistant Professor', 79000, 2023);
  `,
  sampleColumns: ['faculty_id', 'name', 'department', 'title', 'annual_salary', 'hire_year'],
  sampleRows: [
    [1, 'Dr. Aris Thorne', 'Computer Science', 'Professor', 115000, 2012],
    [2, 'Dr. Beatrice Lin', 'Computer Science', 'Associate Professor', 95000, 2017],
    [3, 'Dr. Clara Vance', 'Mathematics', 'Professor', 108000, 2014],
    [4, 'Dr. Derek Shaw', 'Physics', 'Assistant Professor', 82000, 2021],
    [5, 'Dr. Evelyn Ward', 'Physics', 'Professor', 112000, 2011],
    [6, 'Dr. Fiona Gallagher', 'Computer Science', 'Assistant Professor', 88000, 2022],
    [7, 'Dr. George Santos', 'Mathematics', 'Associate Professor', 91000, 2018],
    [8, 'Dr. Helena Roy', 'Physics', 'Associate Professor', 94000, 2016],
    [9, 'Dr. Ian Bell', 'Biology', 'Professor', 105000, 2015],
    [10, 'Dr. Julia Cho', 'Mathematics', 'Assistant Professor', 79000, 2023],
  ],
};
