import { DatasetDefinition } from '../../types/lesson';

export const cleanDatabaseDataset: DatasetDefinition = {
  id: 'clean-database',
  tableName: 'SchoolCourses',
  description: 'Clean sandbox schema environment for authoring new tables using CREATE TABLE.',
  schemaDDL: `
    -- Initially blank sandbox schema for students to create SchoolCourses table
    CREATE TABLE ExistingMetadata (
      db_version TEXT PRIMARY KEY,
      initialized_at TEXT NOT NULL
    );
    INSERT INTO ExistingMetadata VALUES ('v1.0', '2026-10-21');
  `,
  seedDML: '',
  sampleColumns: ['db_version', 'initialized_at'],
  sampleRows: [['v1.0', '2026-10-21']],
};
