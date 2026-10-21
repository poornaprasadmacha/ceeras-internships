import { DatasetDefinition } from '../../types/lesson';

export const customerFeedbackDataset: DatasetDefinition = {
  id: 'customer-feedback',
  tableName: 'SupportTickets',
  description: 'Customer service tickets with nullable satisfaction ratings and resolution notes.',
  schemaDDL: `
    CREATE TABLE SupportTickets (
      ticket_id INTEGER PRIMARY KEY,
      customer_name TEXT NOT NULL,
      category TEXT NOT NULL,
      satisfaction_score INTEGER,
      resolution_summary TEXT
    );
  `,
  seedDML: `
    INSERT INTO SupportTickets (ticket_id, customer_name, category, satisfaction_score, resolution_summary) VALUES
      (1001, 'Liam Wright', 'Billing', 5, 'Refund credited to original payment card.'),
      (1002, 'Sophia Diaz', 'Technical', NULL, NULL),
      (1003, 'Aiden Zhang', 'Hardware', 4, 'Replacement power supply dispatched.'),
      (1004, 'Emma Watson', 'Account', NULL, 'Password reset email sent.'),
      (1005, 'Noah Miller', 'Billing', 1, 'Disputed duplicate subscription charge.'),
      (1006, 'Olivia Scott', 'Technical', NULL, NULL),
      (1007, 'Lucas Gray', 'Hardware', 5, 'Firmware updated via remote diagnostics.');
  `,
  sampleColumns: ['ticket_id', 'customer_name', 'category', 'satisfaction_score', 'resolution_summary'],
  sampleRows: [
    [1001, 'Liam Wright', 'Billing', 5, 'Refund credited to original payment card.'],
    [1002, 'Sophia Diaz', 'Technical', null, null],
    [1003, 'Aiden Zhang', 'Hardware', 4, 'Replacement power supply dispatched.'],
    [1004, 'Emma Watson', 'Account', null, 'Password reset email sent.'],
    [1005, 'Noah Miller', 'Billing', 1, 'Disputed duplicate subscription charge.'],
    [1006, 'Olivia Scott', 'Technical', null, null],
    [1007, 'Lucas Gray', 'Hardware', 5, 'Firmware updated via remote diagnostics.'],
  ],
};
