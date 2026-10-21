import { DatasetDefinition } from '../../types/lesson';

export const softwareProjectsDataset: DatasetDefinition = {
  id: 'software-projects-data',
  tableName: 'SoftwareProjects',
  description: 'Project budgets and team hour allocations for modular CTE pipeline analysis.',
  schemaDDL: `
    CREATE TABLE SoftwareProjects (
      project_id INTEGER PRIMARY KEY,
      project_name TEXT NOT NULL,
      department TEXT NOT NULL,
      budget INTEGER NOT NULL,
      hourly_rate INTEGER NOT NULL
    );

    CREATE TABLE ProjectHours (
      log_id INTEGER PRIMARY KEY,
      project_id INTEGER NOT NULL,
      developer_name TEXT NOT NULL,
      hours_spent REAL NOT NULL
    );
  `,
  seedDML: `
    INSERT INTO SoftwareProjects (project_id, project_name, department, budget, hourly_rate) VALUES
      (1, 'Mobile App v2', 'Engineering', 45000, 95),
      (2, 'Cloud Migration', 'Infrastructure', 60000, 110),
      (3, 'Analytics Engine', 'Data', 35000, 100),
      (4, 'Design System', 'Design', 20000, 85);

    INSERT INTO ProjectHours (log_id, project_id, developer_name, hours_spent) VALUES
      (1, 1, 'Liam Torres', 120.0),
      (2, 1, 'Maya Patel', 145.0),
      (3, 2, 'Kavita Nair', 210.0),
      (4, 2, 'Owen Wilson', 180.0),
      (5, 3, 'Zara Abbas', 160.0),
      (6, 4, 'Leo Rossi', 90.0);
  `,
  sampleColumns: ['project_id', 'project_name', 'department', 'budget', 'hourly_rate'],
  sampleRows: [
    [1, 'Mobile App v2', 'Engineering', 45000, 95],
    [2, 'Cloud Migration', 'Infrastructure', 60000, 110],
    [3, 'Analytics Engine', 'Data', 35000, 100],
    [4, 'Design System', 'Design', 20000, 85],
  ],
};
