import { DatasetDefinition } from '../../types/lesson';

export const gymMembersDataset: DatasetDefinition = {
  id: 'gym-members',
  tableName: 'FitnessMembers',
  description: 'Community fitness center membership registry for practicing INSERT INTO statements.',
  schemaDDL: `
    CREATE TABLE FitnessMembers (
      member_id INTEGER PRIMARY KEY,
      full_name TEXT NOT NULL,
      plan_type TEXT NOT NULL,
      join_year INTEGER NOT NULL,
      monthly_fee REAL NOT NULL
    );
  `,
  seedDML: `
    INSERT INTO FitnessMembers (member_id, full_name, plan_type, join_year, monthly_fee) VALUES
      (1, 'Lucas Meyer', 'Basic', 2022, 29.99),
      (2, 'Aria Montgomery', 'Premium', 2023, 59.99),
      (3, 'Toby Cavanaugh', 'VIP', 2021, 89.99),
      (4, 'Emily Fields', 'Basic', 2023, 29.99);
  `,
  sampleColumns: ['member_id', 'full_name', 'plan_type', 'join_year', 'monthly_fee'],
  sampleRows: [
    [1, 'Lucas Meyer', 'Basic', 2022, 29.99],
    [2, 'Aria Montgomery', 'Premium', 2023, 59.99],
    [3, 'Toby Cavanaugh', 'VIP', 2021, 89.99],
    [4, 'Emily Fields', 'Basic', 2023, 29.99],
  ],
};
