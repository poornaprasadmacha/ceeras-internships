import { LessonDefinition } from '../../types/lesson';
import { appUserLogsDataset } from '../datasets/appUserLogs';

export const lesson24: LessonDefinition = {
  id: 'lesson-24-indexes-performance',
  slug: 'indexes-and-query-performance',
  number: 24,
  title: 'Indexes & Query Performance Tuning',
  shortDescription: 'Accelerate search queries from slow full-table scans to instant B-Tree lookups.',
  estimatedMinutes: 15,
  dataset: appUserLogsDataset,
  learningObjectives: [
    'Understand how B-Tree indexes speed up WHERE filtering and JOINs',
    'Create single and composite indexes using CREATE INDEX syntax',
    'Evaluate index trade-offs between read acceleration and write overhead',
  ],
  prerequisites: ['Primary keys, WHERE filtering, and query execution efficiency.'],
  sections: [
    {
      id: 'index-concept',
      title: 'How Database Indexes Work',
      content: `Without an index, the database must scan every single row on disk to find matches (called a **Full Table Scan** / \`SCAN TABLE\`).

An **Index** creates an ordered lookup structure (typically a balanced B-Tree) pointing directly to row locations on disk, just like the index at the back of a textbook!

\`\`\`sql
CREATE INDEX idx_logs_action ON AppUserLogs(action_type);
\`\`\`

• Turns full table scans into lightning-fast $O(\\log N)$ lookups
• Accelerates \`WHERE\`, \`JOIN\`, and \`ORDER BY\` operations
• Primary keys automatically receive unique indexes in SQLite!`,
      codeExample: {
        sql: `CREATE INDEX idx_logs_user ON AppUserLogs(user_uuid);`,
        explanation: 'Creates a lookup index on user_uuid to accelerate filtering telemetry by customer.',
      },
    },
    {
      id: 'index-tradeoffs',
      title: 'The Indexing Trade-Off (Reads vs Writes)',
      content: `Indexes are not free:

• **Faster Reads**: \`SELECT\` queries execute in fractions of a millisecond
• **Slower Writes**: Every \`INSERT\`, \`UPDATE\`, and \`DELETE\` must also rewrite the index structure!
• **Storage Overhead**: Indexes occupy additional disk space

**Rule of Thumb**: Index columns frequently used in \`WHERE\` filters and \`JOIN\` conditions, but avoid over-indexing tables with high write volumes.`,
      codeExample: {
        sql: `CREATE INDEX idx_status_action ON AppUserLogs(status_code, action_type);`,
        explanation: 'A composite (multi-column) index optimizing queries that filter on both status and action.',
      },
    },
  ],
  exercises: [
    {
      id: 'ex-24-1',
      lessonId: 'lesson-24-indexes-performance',
      order: 1,
      title: 'Task 1: Create an Index on Action Type',
      objective: 'Create an index named idx_action_type on the AppUserLogs table on the action_type column.',
      initialQuery: '-- Write CREATE INDEX statement\n;',
      solutionQuery: 'CREATE INDEX idx_action_type ON AppUserLogs(action_type);',
      verificationQuery: 'PRAGMA index_list(AppUserLogs);',
      hint: 'Syntax: CREATE INDEX idx_action_type ON AppUserLogs(action_type);',
      explanation: 'Builds a B-Tree lookup index on the action_type column for rapid query execution.',
      expectedColumns: ['seq', 'name', 'unique', 'origin', 'partial'],
      requiresOrder: false,
      allowsMutation: true,
    },
    {
      id: 'ex-24-2',
      lessonId: 'lesson-24-indexes-performance',
      order: 2,
      title: 'Task 2: Query High-Latency Server Logs',
      objective: 'Select log_id, user_uuid, response_time_ms from AppUserLogs where status_code = 500 OR response_time_ms >= 100 ordered by response_time_ms DESC.',
      initialQuery: 'SELECT log_id, user_uuid, response_time_ms\nFROM AppUserLogs\n-- Add WHERE and ORDER BY\n;',
      solutionQuery: 'SELECT log_id, user_uuid, response_time_ms FROM AppUserLogs WHERE status_code = 500 OR response_time_ms >= 100 ORDER BY response_time_ms DESC;',
      hint: 'Use: WHERE status_code = 500 OR response_time_ms >= 100 ORDER BY response_time_ms DESC',
      explanation: 'Combines multi-factor error and latency thresholds with descending sorting.',
      expectedColumns: ['log_id', 'user_uuid', 'response_time_ms'],
      requiresOrder: true,
    },
  ],
  quiz: [
    {
      id: 'q-24-1',
      question: 'What is the primary drawback of adding too many indexes to a database table?',
      explanation: 'Every index must be updated during INSERT, UPDATE, and DELETE operations, slowing down write speeds.',
      difficulty: 'advanced',
      topicTag: 'indexes',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'Queries can no longer use WHERE clauses', isCorrect: false },
        { id: 'opt-b', text: 'INSERT and UPDATE operations become slower', isCorrect: true },
        { id: 'opt-c', text: 'SQLite disables WebAssembly support', isCorrect: false },
        { id: 'opt-d', text: 'Data types are converted to plain text', isCorrect: false },
      ],
    },
    {
      id: 'q-24-2',
      question: 'Which SQL command is used to remove an index from a table?',
      explanation: 'DROP INDEX index_name removes the index structure.',
      difficulty: 'advanced',
      topicTag: 'indexes',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'DELETE INDEX index_name', isCorrect: false },
        { id: 'opt-b', text: 'DROP INDEX index_name', isCorrect: true },
        { id: 'opt-c', text: 'CLEAR INDEX index_name', isCorrect: false },
        { id: 'opt-d', text: 'ALTER TABLE DROP INDEX', isCorrect: false },
      ],
    },
  ],
};
