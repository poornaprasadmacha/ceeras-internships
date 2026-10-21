import { LessonDefinition } from '../../types/lesson';
import { campusFacilitiesDataset } from '../datasets/campusFacilities';

export const lesson16: LessonDefinition = {
  id: 'lesson_16',
  number: 16,
  slug: 'altering-and-dropping-tables',
  title: 'Altering and Dropping Tables',
  shortDescription:
    'Evolve your schema over time using ALTER TABLE to add columns or rename tables, and delete obsolete schemas with DROP TABLE.',
  estimatedMinutes: 12,
  learningObjectives: [
    'Add new columns to an existing table with ALTER TABLE ... ADD COLUMN.',
    'Rename tables cleanly using ALTER TABLE ... RENAME TO.',
    'Permanently delete entire tables and their contents using DROP TABLE.',
    'Prevent execution errors using the IF EXISTS guard.',
  ],
  prerequisites: ['CREATE TABLE and table lifecycle concepts.'],
  dataset: campusFacilitiesDataset,
  sections: [
    {
      id: 'section-alter-drop',
      title: 'A. Schema Evolution with ALTER and DROP',
      content: `As application requirements grow, database schemas must adapt:

• **Add a Column**:
\`\`\`sql
ALTER TABLE CampusRooms ADD COLUMN floor_level INTEGER DEFAULT 1;
\`\`\`

• **Rename a Table**:
\`\`\`sql
ALTER TABLE CampusRooms RENAME TO UniversityRooms;
\`\`\`

• **Drop an Obsolete Table**:
\`\`\`sql
DROP TABLE IF EXISTS TemporaryStaging;
\`\`\``,
      codeExample: {
        sql: `ALTER TABLE CampusRooms ADD COLUMN has_projector BOOLEAN DEFAULT 1;`,
        explanation: 'Appends a new boolean column to CampusRooms without destroying existing rows.',
      },
    },
  ],
  exercises: [
    {
      id: 'ex_16_1',
      lessonId: 'lesson_16',
      order: 1,
      title: 'Exercise 1: Add a Column to CampusRooms',
      objective: 'Write an ALTER TABLE query to add a new column named building_code of type TEXT with DEFAULT "Main" to CampusRooms.',
      initialQuery: 'ALTER TABLE CampusRooms',
      solutionQuery: 'ALTER TABLE CampusRooms ADD COLUMN building_code TEXT DEFAULT "Main";',
      hint: 'Use ALTER TABLE CampusRooms ADD COLUMN building_code TEXT DEFAULT "Main";',
      explanation: 'Adds the building_code attribute to every existing and future row.',
      allowsMutation: true,
      verificationQuery: 'PRAGMA table_info(CampusRooms);',
      expectedColumns: ['cid', 'name', 'type', 'notnull', 'dflt_value', 'pk'],
    },
    {
      id: 'ex_16_2',
      lessonId: 'lesson_16',
      order: 2,
      title: 'Exercise 2: Drop the Obsolete Staging Table',
      objective: 'Permanently drop the table named TemporaryStaging using the DROP TABLE statement.',
      initialQuery: 'DROP TABLE',
      solutionQuery: 'DROP TABLE TemporaryStaging;',
      hint: 'Use DROP TABLE TemporaryStaging; or DROP TABLE IF EXISTS TemporaryStaging;',
      explanation: 'Permanently destroys the table schema and all its rows.',
      allowsMutation: true,
      verificationQuery: "SELECT name FROM sqlite_master WHERE type='table' AND name='TemporaryStaging';",
      expectedColumns: ['name'],
    },
  ],
  quiz: [
        {
      id: 'q_16_1',
      question: 'What is the main advantage of including "IF EXISTS" when dropping a table (DROP TABLE IF EXISTS table_name)?',
      explanation: 'DROP TABLE IF EXISTS ensures idempotence: if the table was already deleted, no runtime error is raised.',
      difficulty: 'beginner',
      topicTag: 'Concept Check',
      type: 'multiple-choice',
      options: [
        { id: 'opt_1', text: 'It makes the drop operation 100% faster.', isCorrect: false },
        { id: 'opt_2', text: 'It prevents the query from failing with an error if the table does not exist in the database.', isCorrect: true },
        { id: 'opt_3', text: 'It preserves a backup of the table on disk.', isCorrect: false },
        { id: 'opt_4', text: 'It drops all related foreign keys automatically.', isCorrect: false }
      ],
    },
  ],
};
