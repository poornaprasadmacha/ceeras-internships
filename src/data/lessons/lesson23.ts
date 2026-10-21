import { LessonDefinition } from '../../types/lesson';
import { medicalClinicsDataset } from '../datasets/medicalClinics';

export const lesson23: LessonDefinition = {
  id: 'lesson-23-database-views',
  slug: 'database-views-virtual-tables',
  number: 23,
  title: 'Database Views (Virtual Tables)',
  shortDescription: 'Encapsulate and reuse complex queries as virtual named tables.',
  estimatedMinutes: 12,
  dataset: medicalClinicsDataset,
  learningObjectives: [
    'Create persistent virtual tables using CREATE VIEW syntax',
    'Simplify complex joins and column projections for end users',
    'Query and filter views using standard SELECT statements',
  ],
  prerequisites: ['Data Definition Language (DDL) and complex SELECT statements.'],
  sections: [
    {
      id: 'view-concept',
      title: 'What is a SQL View?',
      content: `A **View** is a saved, virtual table defined by a SQL query.

Unlike a physical table, a view does **not store duplicate data** on disk; it dynamically runs its underlying query whenever accessed!

\`\`\`sql
CREATE VIEW ViewName AS
SELECT column1, column2
FROM TableName
WHERE condition;
\`\`\`

• **Security**: Hide sensitive columns (like salaries, passwords, SSNs)
• **Simplicity**: Give reporting teams clean, pre-joined interfaces
• **Consistency**: Change business formulas in one view definition`,
      codeExample: {
        sql: `CREATE VIEW ActiveCardiologists AS\nSELECT doctor_name, hospital_branch, consultation_fee\nFROM DoctorRoster\nWHERE specialty = 'Cardiology' AND is_accepting_patients = 1;`,
        explanation: 'Creates a virtual view isolating only cardiology specialists currently taking new appointments.',
      },
    },
    {
      id: 'querying-views',
      title: 'Querying and Dropping Views',
      content: `Once created, you query a view identically to any ordinary table:

\`\`\`sql
SELECT * FROM ActiveCardiologists WHERE consultation_fee < 300;
\`\`\`

To remove a view when no longer needed:
\`\`\`sql
DROP VIEW IF EXISTS ActiveCardiologists;
\`\`\``,
      codeExample: {
        sql: `SELECT doctor_name, consultation_fee\nFROM ActiveCardiologists\nORDER BY consultation_fee ASC;`,
        explanation: 'Filters and sorts directly against the virtual view without re-specifying underlying table filters.',
      },
    },
  ],
  exercises: [
    {
      id: 'ex-23-1',
      lessonId: 'lesson-23-database-views',
      order: 1,
      title: 'Task 1: Create an Available Doctors View',
      objective: 'Create a view named AvailableDoctors that selects doctor_id, doctor_name, specialty, and consultation_fee from DoctorRoster where is_accepting_patients = 1.',
      initialQuery: 'CREATE VIEW AvailableDoctors AS\n-- Write query for doctors where is_accepting_patients = 1\n;',
      solutionQuery: 'CREATE VIEW AvailableDoctors AS SELECT doctor_id, doctor_name, specialty, consultation_fee FROM DoctorRoster WHERE is_accepting_patients = 1;',
      verificationQuery: 'SELECT doctor_id, doctor_name, specialty, consultation_fee FROM AvailableDoctors;',
      hint: 'Syntax: CREATE VIEW AvailableDoctors AS SELECT doctor_id, doctor_name, specialty, consultation_fee FROM DoctorRoster WHERE is_accepting_patients = 1;',
      explanation: 'Creates the virtual view isolating available practitioners.',
      expectedColumns: ['doctor_id', 'doctor_name', 'specialty', 'consultation_fee'],
      requiresOrder: false,
      allowsMutation: true,
    },
    {
      id: 'ex-23-2',
      lessonId: 'lesson-23-database-views',
      order: 2,
      title: 'Task 2: Query the Virtual View',
      objective: 'Query the AvailableDoctors view to select doctor_name and consultation_fee ordered by consultation_fee ASC.',
      initialQuery: '-- First create or query AvailableDoctors\nSELECT doctor_name, consultation_fee FROM AvailableDoctors ORDER BY consultation_fee ASC;',
      solutionQuery: 'SELECT doctor_name, consultation_fee FROM (SELECT doctor_name, consultation_fee FROM DoctorRoster WHERE is_accepting_patients = 1) ORDER BY consultation_fee ASC;',
      hint: 'Select doctor_name and consultation_fee from AvailableDoctors ordered by consultation_fee ASC.',
      explanation: 'Demonstrates querying and sorting directly from the virtual abstraction.',
      expectedColumns: ['doctor_name', 'consultation_fee'],
      requiresOrder: true,
    },
  ],
  quiz: [
    {
      id: 'q-23-1',
      question: 'Does a standard SQL view duplicate and store underlying table data on disk?',
      explanation: 'No, standard SQL views store only the saved query definition, running dynamically whenever called.',
      difficulty: 'intermediate',
      topicTag: 'views',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'Yes, it makes a physical copy of all rows', isCorrect: false },
        { id: 'opt-b', text: 'No, it is a virtual table that executes dynamically', isCorrect: true },
        { id: 'opt-c', text: 'Only if the table has more than 10,000 rows', isCorrect: false },
        { id: 'opt-d', text: 'Yes, but only in binary format', isCorrect: false },
      ],
    },
    {
      id: 'q-23-2',
      question: 'Which SQL command is used to delete a view?',
      explanation: 'DROP VIEW view_name removes the view definition from the schema.',
      difficulty: 'intermediate',
      topicTag: 'views',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'DELETE VIEW view_name', isCorrect: false },
        { id: 'opt-b', text: 'REMOVE VIEW view_name', isCorrect: false },
        { id: 'opt-c', text: 'DROP VIEW view_name', isCorrect: true },
        { id: 'opt-d', text: 'TRUNCATE VIEW view_name', isCorrect: false },
      ],
    },
  ],
};
