import { DatasetDefinition } from '../../types/lesson';

export const auditLogsDataset: DatasetDefinition = {
  id: 'audit-logs',
  tableName: 'SystemEvents',
  description: 'Application server authentication and session logs for practicing DELETE statements.',
  schemaDDL: `
    CREATE TABLE SystemEvents (
      event_id INTEGER PRIMARY KEY,
      user_email TEXT NOT NULL,
      event_type TEXT NOT NULL,
      status TEXT NOT NULL,
      log_year INTEGER NOT NULL
    );
  `,
  seedDML: `
    INSERT INTO SystemEvents (event_id, user_email, event_type, status, log_year) VALUES
      (1, 'alice@acme.org', 'LOGIN_SUCCESS', 'VALID', 2024),
      (2, 'guest_99@temp.net', 'SPAM_BOT', 'INVALID', 2021),
      (3, 'bob@work.co', 'PASSWORD_RESET', 'VALID', 2024),
      (4, 'spammer@malicious.io', 'SPAM_BOT', 'INVALID', 2020),
      (5, 'carol@lab.edu', 'LOGIN_SUCCESS', 'VALID', 2024),
      (6, 'bot_404@crawler.biz', 'SPAM_BOT', 'INVALID', 2022);
  `,
  sampleColumns: ['event_id', 'user_email', 'event_type', 'status', 'log_year'],
  sampleRows: [
    [1, 'alice@acme.org', 'LOGIN_SUCCESS', 'VALID', 2024],
    [2, 'guest_99@temp.net', 'SPAM_BOT', 'INVALID', 2021],
    [3, 'bob@work.co', 'PASSWORD_RESET', 'VALID', 2024],
    [4, 'spammer@malicious.io', 'SPAM_BOT', 'INVALID', 2020],
    [5, 'carol@lab.edu', 'LOGIN_SUCCESS', 'VALID', 2024],
    [6, 'bot_404@crawler.biz', 'SPAM_BOT', 'INVALID', 2022],
  ],
};
