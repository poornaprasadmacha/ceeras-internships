import { LessonDefinition } from '../../types/lesson';
import { gymMembersDataset } from '../datasets/gymMembers';

export const lesson12: LessonDefinition = {
  id: 'lesson_12',
  number: 12,
  slug: 'inserting-rows',
  title: 'Inserting New Rows with INSERT INTO',
  shortDescription:
    'Add new records into a database table using the INSERT INTO statement with explicit column lists and values.',
  estimatedMinutes: 12,
  learningObjectives: [
    'Insert single records using INSERT INTO ... VALUES.',
    'Understand why listing explicit column names prevents schema bugs.',
    'Insert multiple records in a single batch statement.',
    'Observe auto-incrementing primary key behavior.',
  ],
  prerequisites: ['Basic SELECT queries and table concepts.'],
  dataset: gymMembersDataset,
  sections: [
    {
      id: 'section-insert-syntax',
      title: 'A. Adding Records with INSERT INTO',
      content: `The **INSERT INTO** command adds new rows to a table. You specify the target table name, list the columns to populate, and provide corresponding values:

\`\`\`sql
INSERT INTO FitnessMembers (member_id, full_name, plan_type, join_year, monthly_fee)
VALUES (5, 'Zoe Saldana', 'Premium', 2024, 59.99);
\`\`\`

Strings are enclosed in single quotes (\`'text'\`), while numbers and booleans are written directly.`,
      codeExample: {
        sql: `INSERT INTO FitnessMembers (member_id, full_name, plan_type, join_year, monthly_fee)\nVALUES (5, 'Zoe Saldana', 'Premium', 2024, 59.99);`,
        explanation: 'Adds a new member record with explicit values for each column.',
      },
    },
  ],
  exercises: [
    {
      id: 'ex_12_1',
      lessonId: 'lesson_12',
      order: 1,
      title: 'Exercise 1: Insert a New Member',
      objective: 'Insert a new member into FitnessMembers with member_id 5, full_name "Maya Lin", plan_type "VIP", join_year 2024, and monthly_fee 89.99.',
      initialQuery: 'INSERT INTO FitnessMembers (member_id, full_name, plan_type, join_year, monthly_fee)\nVALUES',
      solutionQuery: "INSERT INTO FitnessMembers (member_id, full_name, plan_type, join_year, monthly_fee) VALUES (5, 'Maya Lin', 'VIP', 2024, 89.99);",
      hint: "Use VALUES (5, 'Maya Lin', 'VIP', 2024, 89.99);",
      explanation: 'Inserts Maya Lin as a VIP member.',
      allowsMutation: true,
      verificationQuery: 'SELECT * FROM FitnessMembers WHERE member_id = 5;',
      expectedColumns: ['member_id', 'full_name', 'plan_type', 'join_year', 'monthly_fee'],
    },
    {
      id: 'ex_12_2',
      lessonId: 'lesson_12',
      order: 2,
      title: 'Exercise 2: Insert Multiple Members at Once',
      objective: 'Insert two new records in a single statement: (6, "Sam Reed", "Basic", 2024, 29.99) and (7, "Dana Scully", "Premium", 2024, 59.99).',
      initialQuery: 'INSERT INTO FitnessMembers (member_id, full_name, plan_type, join_year, monthly_fee) VALUES\n',
      solutionQuery: "INSERT INTO FitnessMembers (member_id, full_name, plan_type, join_year, monthly_fee) VALUES (6, 'Sam Reed', 'Basic', 2024, 29.99), (7, 'Dana Scully', 'Premium', 2024, 59.99);",
      hint: 'Separate each value tuple with a comma: (...), (...);',
      explanation: 'Multi-row inserts allow high-throughput batch ingestion.',
      allowsMutation: true,
      verificationQuery: 'SELECT * FROM FitnessMembers WHERE member_id IN (6, 7);',
      expectedColumns: ['member_id', 'full_name', 'plan_type', 'join_year', 'monthly_fee'],
    },
  ],
  quiz: [
        {
      id: 'q_12_1',
      question: 'What happens if you omit the column list in an INSERT statement (e.g. INSERT INTO table VALUES (...))?',
      explanation: 'Omitting column lists requires providing values for all table columns in schema order, making queries fragile to schema changes.',
      difficulty: 'beginner',
      topicTag: 'Concept Check',
      type: 'multiple-choice',
      options: [
        { id: 'opt_1', text: 'The query is rejected with a syntax error.', isCorrect: false },
        { id: 'opt_2', text: 'You must provide values for EVERY column in the exact order they are defined in the schema.', isCorrect: true },
        { id: 'opt_3', text: 'The values are randomly distributed.', isCorrect: false },
        { id: 'opt_4', text: 'The database prompts for column names.', isCorrect: false }
      ],
    },
  ],
};
