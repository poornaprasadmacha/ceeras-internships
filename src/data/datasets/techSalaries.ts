import { DatasetDefinition } from '../../types/lesson';

export const techSalariesDataset: DatasetDefinition = {
  id: 'tech-salaries-data',
  tableName: 'TechEmployees',
  description: 'Employee compensation and department information for nested subquery exploration.',
  schemaDDL: `
    CREATE TABLE TechEmployees (
      id INTEGER PRIMARY KEY,
      name TEXT NOT NULL,
      department TEXT NOT NULL,
      salary INTEGER NOT NULL,
      hire_year INTEGER NOT NULL
    );
  `,
  seedDML: `
    INSERT INTO TechEmployees (id, name, department, salary, hire_year) VALUES
      (1, 'Alice Chen', 'Engineering', 125000, 2021),
      (2, 'Bob Smith', 'Engineering', 110000, 2022),
      (3, 'Charlie Brown', 'Design', 95000, 2020),
      (4, 'Diana Prince', 'Product', 130000, 2019),
      (5, 'Evan Wright', 'Engineering', 145000, 2018),
      (6, 'Fiona Gallagher', 'Marketing', 88000, 2023),
      (7, 'George Clark', 'Product', 105000, 2022),
      (8, 'Hannah Abbott', 'Design', 92000, 2021);
  `,
  sampleColumns: ['id', 'name', 'department', 'salary', 'hire_year'],
  sampleRows: [
    [1, 'Alice Chen', 'Engineering', 125000, 2021],
    [2, 'Bob Smith', 'Engineering', 110000, 2022],
    [3, 'Charlie Brown', 'Design', 95000, 2020],
    [4, 'Diana Prince', 'Product', 130000, 2019],
    [5, 'Evan Wright', 'Engineering', 145000, 2018],
    [6, 'Fiona Gallagher', 'Marketing', 88000, 2023],
    [7, 'George Clark', 'Product', 105000, 2022],
    [8, 'Hannah Abbott', 'Design', 92000, 2021],
  ],
};
