import { LessonDefinition } from '../../types/lesson';
import { customerFeedbackDataset } from '../datasets/customerFeedback';

export const lesson7: LessonDefinition = {
  id: 'lesson_7',
  number: 7,
  slug: 'working-with-nulls',
  title: 'Working with NULLs and Missing Data',
  shortDescription:
    'Learn how SQL represents missing or unknown values using NULL, and test for presence or absence using IS NULL and IS NOT NULL.',
  estimatedMinutes: 10,
  learningObjectives: [
    'Understand that NULL represents missing, inapplicable, or unknown information.',
    'Recognize that comparison operators (= NULL or != NULL) always evaluate to UNKNOWN.',
    'Properly test for missing values using IS NULL and IS NOT NULL.',
  ],
  prerequisites: ['Basic WHERE clause operations.'],
  dataset: customerFeedbackDataset,
  sections: [
    {
      id: 'section-null-semantics',
      title: 'A. What is NULL in SQL?',
      content: `In SQL, **NULL** is a special marker representing the absence of a value. It is neither zero (\`0\`) nor an empty string (\`""\`).

Because NULL means *"unknown"*, comparing anything to NULL with standard equality operators (\`= NULL\` or \`!= NULL\`) yields an **UNKNOWN** truth value, never matching.

• **Correct**: \`WHERE satisfaction_score IS NULL\`
• **Incorrect**: \`WHERE satisfaction_score = NULL\``,
      codeExample: {
        sql: `SELECT customer_name, category\nFROM SupportTickets\nWHERE satisfaction_score IS NULL;`,
        explanation: 'Finds customer tickets where the user has not yet submitted a satisfaction score.',
      },
    },
  ],
  exercises: [
    {
      id: 'ex_7_1',
      lessonId: 'lesson_7',
      order: 1,
      title: 'Exercise 1: Find Tickets with Missing Scores',
      objective: 'Write a query to select ticket_id, customer_name, and category for all tickets where satisfaction_score is missing.',
      initialQuery: 'SELECT ticket_id, customer_name, category FROM SupportTickets WHERE',
      solutionQuery: 'SELECT ticket_id, customer_name, category FROM SupportTickets WHERE satisfaction_score IS NULL;',
      hint: 'Use satisfaction_score IS NULL.',
      explanation: 'IS NULL properly matches empty, unset database fields.',
      expectedColumns: ['ticket_id', 'customer_name', 'category'],
    },
    {
      id: 'ex_7_2',
      lessonId: 'lesson_7',
      order: 2,
      title: 'Exercise 2: Find Fully Resolved Tickets with Notes',
      objective: 'Select ticket_id, customer_name, and resolution_summary for all tickets where resolution_summary IS NOT NULL.',
      initialQuery: 'SELECT ticket_id, customer_name, resolution_summary FROM SupportTickets WHERE',
      solutionQuery: 'SELECT ticket_id, customer_name, resolution_summary FROM SupportTickets WHERE resolution_summary IS NOT NULL;',
      hint: 'Use resolution_summary IS NOT NULL.',
      explanation: 'IS NOT NULL filters for rows that contain documented resolution text.',
      expectedColumns: ['ticket_id', 'customer_name', 'resolution_summary'],
    },
  ],
  quiz: [
    {
      id: 'q_7_1',
      question: 'Why does the condition "WHERE email = NULL" fail to return records with missing emails?',
      explanation: 'In SQL, NULL is unknown, so checking equality with = produces UNKNOWN. You must always use IS NULL.',
      difficulty: 'beginner',
      topicTag: 'Concept Check',
      type: 'multiple-choice',
      options: [
        { id: 'opt_1', text: 'Because email is a reserved word.', isCorrect: false },
        { id: 'opt_2', text: 'Because in three-valued logic, any comparison to NULL using = evaluates to UNKNOWN, not TRUE.', isCorrect: true },
        { id: 'opt_3', text: 'Because NULL can only be used with numbers.', isCorrect: false },
        { id: 'opt_4', text: 'Because NULL is a keyword, not a value.', isCorrect: false },
      ],
    },
  ],
};
