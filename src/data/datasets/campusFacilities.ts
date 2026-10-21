import { DatasetDefinition } from '../../types/lesson';

export const campusFacilitiesDataset: DatasetDefinition = {
  id: 'campus-facilities',
  tableName: 'CampusRooms',
  description: 'University campus room records and temporary staging tables for practicing ALTER TABLE and DROP TABLE.',
  schemaDDL: `
    CREATE TABLE CampusRooms (
      room_id INTEGER PRIMARY KEY,
      room_number TEXT NOT NULL,
      seating_capacity INTEGER NOT NULL
    );

    CREATE TABLE TemporaryStaging (
      temp_id INTEGER PRIMARY KEY,
      junk_data TEXT
    );
  `,
  seedDML: `
    INSERT INTO CampusRooms (room_id, room_number, seating_capacity) VALUES
      (1, 'Hall-101', 120),
      (2, 'Lab-204', 35),
      (3, 'Auditorium-A', 400);

    INSERT INTO TemporaryStaging (temp_id, junk_data) VALUES
      (1, 'old_import_row_1'),
      (2, 'old_import_row_2');
  `,
  sampleColumns: ['room_id', 'room_number', 'seating_capacity'],
  sampleRows: [
    [1, 'Hall-101', 120],
    [2, 'Lab-204', 35],
    [3, 'Auditorium-A', 400],
  ],
};
