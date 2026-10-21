import { DatasetDefinition } from '../../types/lesson';

export const appUserLogsDataset: DatasetDefinition = {
  id: 'app-user-logs-data',
  tableName: 'AppUserLogs',
  description: 'High-frequency telemetry events for indexing, query plan inspection, and optimization.',
  schemaDDL: `
    CREATE TABLE AppUserLogs (
      log_id INTEGER PRIMARY KEY,
      user_uuid TEXT NOT NULL,
      action_type TEXT NOT NULL,
      status_code INTEGER NOT NULL,
      response_time_ms INTEGER NOT NULL
    );
  `,
  seedDML: `
    INSERT INTO AppUserLogs (log_id, user_uuid, action_type, status_code, response_time_ms) VALUES
      (1, 'usr_a1b2', 'login', 200, 42),
      (2, 'usr_c3d4', 'view_item', 200, 18),
      (3, 'usr_a1b2', 'checkout', 200, 124),
      (4, 'usr_e5f6', 'login', 401, 35),
      (5, 'usr_g7h8', 'view_item', 200, 22),
      (6, 'usr_c3d4', 'checkout', 500, 240),
      (7, 'usr_i9j0', 'search', 200, 68),
      (8, 'usr_a1b2', 'logout', 200, 15);
  `,
  sampleColumns: ['log_id', 'user_uuid', 'action_type', 'status_code', 'response_time_ms'],
  sampleRows: [
    [1, 'usr_a1b2', 'login', 200, 42],
    [2, 'usr_c3d4', 'view_item', 200, 18],
    [3, 'usr_a1b2', 'checkout', 200, 124],
    [4, 'usr_e5f6', 'login', 401, 35],
    [5, 'usr_g7h8', 'view_item', 200, 22],
    [6, 'usr_c3d4', 'checkout', 500, 240],
    [7, 'usr_i9j0', 'search', 200, 68],
    [8, 'usr_a1b2', 'logout', 200, 15],
  ],
};
