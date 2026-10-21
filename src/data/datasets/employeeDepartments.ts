import { DatasetDefinition } from '../../types/lesson';

export const employeeDepartmentsDataset: DatasetDefinition = {
  id: 'employee-departments',
  tableName: 'Employees',
  description: 'Company workforce and official organizational departments, demonstrating unmatched rows in LEFT JOIN.',
  schemaDDL: `
    CREATE TABLE Departments (
      dept_id INTEGER PRIMARY KEY,
      dept_name TEXT NOT NULL,
      building TEXT NOT NULL
    );

    CREATE TABLE Employees (
      emp_id INTEGER PRIMARY KEY,
      emp_name TEXT NOT NULL,
      role_title TEXT NOT NULL,
      dept_id INTEGER,
      monthly_salary INTEGER NOT NULL
    );
  `,
  seedDML: `
    INSERT INTO Departments (dept_id, dept_name, building) VALUES
      (10, 'Engineering', 'Building A'),
      (20, 'Design', 'Building B'),
      (30, 'Marketing', 'Building A'),
      (40, 'Legal', 'Building C');

    INSERT INTO Employees (emp_id, emp_name, role_title, dept_id, monthly_salary) VALUES
      (1, 'Sarah Connor', 'Senior Architect', 10, 8500),
      (2, 'James Holden', 'Lead Designer', 20, 7200),
      (3, 'Naomi Nagata', 'Systems Engineer', 10, 8100),
      (4, 'Alex Kamal', 'Marketing Analyst', 30, 5800),
      (5, 'Chrisjen Avasarala', 'Executive Advisor', NULL, 11000),
      (6, 'Amos Burton', 'Security Specialist', NULL, 6400);
  `,
  sampleColumns: ['emp_id', 'emp_name', 'role_title', 'dept_id', 'monthly_salary'],
  sampleRows: [
    [1, 'Sarah Connor', 'Senior Architect', 10, 8500],
    [2, 'James Holden', 'Lead Designer', 20, 7200],
    [3, 'Naomi Nagata', 'Systems Engineer', 10, 8100],
    [4, 'Alex Kamal', 'Marketing Analyst', 30, 5800],
    [5, 'Chrisjen Avasarala', 'Executive Advisor', null, 11000],
    [6, 'Amos Burton', 'Security Specialist', null, 6400],
  ],
};
