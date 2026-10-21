import { LessonDefinition } from '../../types/lesson';
import { auditLogsDataset } from '../datasets/auditLogs';

export const lesson14: LessonDefinition = {
  id: 'lesson_14',
  number: 14,
  slug: 'deleting-rows',
  title: 'Deleting Rows with DELETE',
  shortDescription:
    'Permanently remove records from a table using DELETE FROM and safeguard data integrity with precise WHERE filters.',
  estimatedMinutes: 10,
  learningObjectives: [
    'Delete specific rows matching targeted conditions using DELETE FROM ... WHERE.',
    'Understand why running DELETE without WHERE deletes all rows in the table.',
    'Differentiate between row deletion and table dropping.',
  ],
  prerequisites: ['UPDATE and WHERE clause filtering.'],
  dataset: auditLogsDataset,
  sections: [
    {
      id: 'section-delete-syntax',
      title: 'A. Removing Records with DELETE',
      content: `The **DELETE** command permanently purges records matching a criteria:

\`\`\`sql
DELETE FROM SystemEvents
WHERE status = 'INVALID';
\`\`\`

**CRITICAL WARNING**: Running \`DELETE FROM SystemEvents;\` without a **WHERE** clause wipes all rows from the table! Always test your WHERE condition with a \`SELECT * WHERE ...\` first.`,
      codeExample: {
        sql: `DELETE FROM SystemEvents\nWHERE event_type = 'SPAM_BOT'\n  AND log_year < 2022;`,
        explanation: 'Safely purges historical spam bot entries logged prior to 2022.',
      },
    },
  ],
  exercises: [
    {
      id: 'ex_14_1',
      lessonId: 'lesson_14',
      order: 1,
      title: 'Exercise 1: Delete Specific Event Record',
      objective: 'Delete the record with event_id = 4 from SystemEvents.',
      initialQuery: 'DELETE FROM SystemEvents WHERE',
      solutionQuery: 'DELETE FROM SystemEvents WHERE event_id = 4;',
      hint: 'Use WHERE event_id = 4;',
      explanation: 'Targeting a primary key ensures exactly one specific record is purged.',
      allowsMutation: true,
      verificationQuery: 'SELECT * FROM SystemEvents WHERE event_id = 4;',
      expectedColumns: ['event_id', 'user_email', 'event_type', 'status', 'log_year'],
    },
    {
      id: 'ex_14_2',
      lessonId: 'lesson_14',
      order: 2,
      title: 'Exercise 2: Purge All Invalid Status Records',
      objective: 'Delete all rows from SystemEvents where status is "INVALID".',
      initialQuery: 'DELETE FROM SystemEvents WHERE',
      solutionQuery: "DELETE FROM SystemEvents WHERE status = 'INVALID';",
      hint: "Use WHERE status = 'INVALID';",
      explanation: 'Deletes all spam/invalid log records in bulk.',
      allowsMutation: true,
      verificationQuery: "SELECT * FROM SystemEvents WHERE status = 'INVALID';",
      expectedColumns: ['event_id', 'user_email', 'event_type', 'status', 'log_year'],
    },
  ],
  quiz: [
        {
      id: 'q_14_1',
      question: 'What is the recommended practice before executing a production DELETE statement?',
      explanation: 'Previewing with SELECT * WHERE ... guarantees you confirm exactly which rows match before permanently deleting them.',
      difficulty: 'beginner',
      topicTag: 'Concept Check',
      type: 'multiple-choice',
      options: [
        { id: 'opt_1', text: 'Run a SELECT with the exact same WHERE clause to verify which rows will be affected.', isCorrect: true },
        { id: 'opt_2', text: 'Delete the primary key column first.', isCorrect: false },
        { id: 'opt_3', text: 'Convert all data into strings.', isCorrect: false },
        { id: 'opt_4', text: 'Restart the database server.', isCorrect: false }
      ],
    },
  ],
};
