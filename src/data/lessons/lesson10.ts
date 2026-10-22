import { LessonDefinition } from '../../types/lesson';
import { universityStaffDataset } from '../datasets/universityStaff';

export const lesson10: LessonDefinition = {
  id: 'lesson_10',
  number: 10,
  slug: 'grouped-aggregations',
  title: 'Grouped Aggregations with GROUP BY and HAVING',
  shortDescription:
    'Segment data into groups using GROUP BY and filter aggregated groups using the HAVING clause.',
  estimatedMinutes: 14,
  learningObjectives: [
    'Segment rows into logical groups using the GROUP BY clause.',
    'Apply aggregate functions per category (e.g., average salary per department).',
    'Understand why WHERE cannot filter aggregate outputs.',
    'Filter grouped results using the HAVING clause.',
  ],
  prerequisites: ['Aggregate functions (COUNT, SUM, AVG).'],
  dataset: universityStaffDataset,
  sections: [
    {
      id: 'section-group-by',
      title: 'A. Grouping Rows with GROUP BY',
      content: `Instead of aggregating across the entire table, **GROUP BY** clusters rows sharing identical values in specified columns, producing one summary row per group.`,
      codeExample: {
        sql: `SELECT department, COUNT(*) AS faculty_count, AVG(annual_salary) AS avg_salary\nFROM FacultyMembers\nGROUP BY department;`,
        explanation: 'Computes headcount and average salary for each distinct university department.',
      },
    },
    {
      id: 'section-having-vs-where',
      title: 'B. Filtering Groups with HAVING',
      content: `• **WHERE**: Filters individual raw rows *before* grouping occurs.
• **HAVING**: Filters aggregated groups *after* GROUP BY has calculated summaries.

\`\`\`sql
SELECT department, AVG(annual_salary) AS avg_salary
FROM FacultyMembers
GROUP BY department
HAVING AVG(annual_salary) > 95000;
\`\`\``,
      codeExample: {
        sql: `SELECT department, COUNT(*) AS member_count\nFROM FacultyMembers\nGROUP BY department\nHAVING COUNT(*) >= 3;`,
        explanation: 'Filters for departments that employ 3 or more faculty members.',
      },
    },
  ],
  exercises: [
    {
      id: 'ex_10_1',
      lessonId: 'lesson_10',
      order: 1,
      title: 'Exercise 1: Count Faculty by Department',
      objective: 'Write a query to select department and the count of faculty members in each department aliased as total_members. Group by department.',
      initialQuery: 'SELECT department, FROM FacultyMembers GROUP BY',
      solutionQuery: 'SELECT department, COUNT(*) AS total_members FROM FacultyMembers GROUP BY department;',
      hint: 'Use SELECT department, COUNT(*) AS total_members FROM FacultyMembers GROUP BY department;',
      explanation: 'GROUP BY aggregates rows on the department attribute.',
      expectedColumns: ['department', 'total_members'],
    },
    {
      id: 'ex_10_2',
      lessonId: 'lesson_10',
      order: 2,
      title: 'Exercise 2: Filter Departments with HAVING',
      objective: 'Find all departments that have 3 or more faculty members. Select department and COUNT(*) AS total_faculty, and filter using HAVING.',
      initialQuery: 'SELECT department, COUNT(*) AS total_faculty FROM FacultyMembers GROUP BY department HAVING',
      solutionQuery: 'SELECT department, COUNT(*) AS total_faculty FROM FacultyMembers GROUP BY department HAVING COUNT(*) >= 3;',
      hint: 'Use HAVING COUNT(*) >= 3.',
      explanation: 'HAVING filters aggregated grouped results, whereas WHERE filters individual rows.',
      expectedColumns: ['department', 'total_faculty'],
    },
  ],
  quiz: [
        {
      id: 'q_10_1',
      question: 'Why does "WHERE COUNT(*) > 5" trigger a syntax error in SQL?',
      explanation: 'WHERE filters individual input rows before grouping. Aggregates do not exist yet when WHERE runs, so HAVING is required.',
      difficulty: 'beginner',
      topicTag: 'Concept Check',
      type: 'multiple-choice',
      options: [
        { id: 'opt_1', text: 'Because WHERE is executed before rows are aggregated into groups; only HAVING can evaluate aggregate conditions.', isCorrect: true },
        { id: 'opt_2', text: 'Because COUNT cannot be greater than 5.', isCorrect: false },
        { id: 'opt_3', text: 'Because single quotes are required.', isCorrect: false },
        { id: 'opt_4', text: 'Because GROUP BY is only allowed with SUM.', isCorrect: false }
      ],
    },
    {
      id: 'q_10_auto_2',
      question: "In SQL Lesson 10 (Grouped Aggregations with GROUP BY and HAVING), what is the primary role of this syntax feature?",
      explanation: "This syntax feature is part of standard SQL designed for precise data retrieval and table management.",
      difficulty: 'intermediate',
      topicTag: 'SQL',
      type: 'multiple-choice',
      options: [
        { id: 'opt_1', text: "It provides structured capabilities for querying and manipulating data in relational tables", isCorrect: true },
        { id: 'opt_2', text: "It compiles relational data into binary machine code directly", isCorrect: false },
        { id: 'opt_3', text: "It replaces the need for a database schema", isCorrect: false },
        { id: 'opt_4', text: "It converts SQL tables into plain text files on disk", isCorrect: false },
      ],
    },
    {
      id: 'q_10_auto_3',
      question: "Which keyword or clause in SQL Lesson 10 directly influences which rows or columns are returned?",
      explanation: "Standard SQL query clauses dictate the projection, selection criteria, and ordering of results.",
      difficulty: 'intermediate',
      topicTag: 'SQL',
      type: 'multiple-choice',
      options: [
        { id: 'opt_1', text: "Clauses dedicated to filtering, projecting, and structuring relational query results", isCorrect: true },
        { id: 'opt_2', text: "The OS shell terminal prompt", isCorrect: false },
        { id: 'opt_3', text: "The web browser JavaScript engine", isCorrect: false },
        { id: 'opt_4', text: "The CSS stylesheet selector", isCorrect: false },
      ],
    },
    {
      id: 'q_10_auto_4',
      question: "How does SQLite handle data type affinity when executing queries in Lesson 10?",
      explanation: "SQLite uses flexible type affinities, allowing storage of values according to storage classes.",
      difficulty: 'intermediate',
      topicTag: 'SQL',
      type: 'multiple-choice',
      options: [
        { id: 'opt_1', text: "SQLite uses dynamic typing with type affinities (INTEGER, REAL, TEXT, BLOB, NUMERIC)", isCorrect: true },
        { id: 'opt_2', text: "SQLite strictly forbids text in any numerical column", isCorrect: false },
        { id: 'opt_3', text: "SQLite converts all data into 64-bit floating point numbers", isCorrect: false },
        { id: 'opt_4', text: "SQLite requires Java virtual machine types", isCorrect: false },
      ],
    },
    {
      id: 'q_10_auto_5',
      question: "What is the expected behavior if a query in Lesson 10 matches zero rows?",
      explanation: "When no records satisfy the query conditions, an empty result set is returned without an error.",
      difficulty: 'intermediate',
      topicTag: 'SQL',
      type: 'multiple-choice',
      options: [
        { id: 'opt_1', text: "It returns an empty result set with column headers and 0 rows", isCorrect: true },
        { id: 'opt_2', text: "It raises a fatal database crash error", isCorrect: false },
        { id: 'opt_3', text: "It deletes the target table automatically", isCorrect: false },
        { id: 'opt_4', text: "It returns random rows from another database", isCorrect: false },
      ],
    },
    {
      id: 'q_10_auto_6',
      question: "Which SQL best practice applies when writing queries for Lesson 10?",
      explanation: "Best practices emphasize explicit column selection, clear formatting, and testable queries.",
      difficulty: 'intermediate',
      topicTag: 'SQL',
      type: 'multiple-choice',
      options: [
        { id: 'opt_1', text: "Use explicit column names, clean indentation, and meaningful aliases", isCorrect: true },
        { id: 'opt_2', text: "Write all queries on a single unformatted line without spaces", isCorrect: false },
        { id: 'opt_3', text: "Avoid using indexes under all circumstances", isCorrect: false },
        { id: 'opt_4', text: "Never test queries with LIMIT", isCorrect: false },
      ],
    },
    {
      id: 'q_10_auto_7',
      question: "Can queries from Lesson 10 be executed offline inside an in-browser SQLite WASM engine?",
      explanation: "SQLite compiled to WebAssembly (WASM) runs 100% locally in the browser with full transactional fidelity.",
      difficulty: 'intermediate',
      topicTag: 'SQL',
      type: 'multiple-choice',
      options: [
        { id: 'opt_1', text: "Yes, SQLite WebAssembly compiles the complete C database engine to run client-side in the browser", isCorrect: true },
        { id: 'opt_2', text: "No, SQL always requires a dedicated cloud server connection", isCorrect: false },
        { id: 'opt_3', text: "Only if a PostgreSQL backend is running in Docker", isCorrect: false },
        { id: 'opt_4', text: "Only for SELECT queries with fewer than 5 rows", isCorrect: false },
      ],
    },
    {
      id: 'q_10_auto_8',
      question: "What is the return value of an SQL query that executes successfully?",
      explanation: "Relational algebra dictates that the output of an SQL query is itself a relation (table).",
      difficulty: 'intermediate',
      topicTag: 'SQL',
      type: 'multiple-choice',
      options: [
        { id: 'opt_1', text: "A relation (table) containing 0 or more tuples (rows) matching the requested columns", isCorrect: true },
        { id: 'opt_2', text: "A compiled C binary executable", isCorrect: false },
        { id: 'opt_3', text: "A raw JSON string by default in ANSI SQL", isCorrect: false },
        { id: 'opt_4', text: "A boolean integer 1 or 0", isCorrect: false },
      ],
    },
    {
      id: 'q_10_auto_9',
      question: "In relational database design, why is data normalization relevant to Lesson 10?",
      explanation: "Normalization structures tables to minimize redundancy and prevent update/delete anomalies.",
      difficulty: 'intermediate',
      topicTag: 'SQL',
      type: 'multiple-choice',
      options: [
        { id: 'opt_1', text: "It reduces data redundancy and improves data integrity across related tables", isCorrect: true },
        { id: 'opt_2', text: "It increases duplicate records for faster reading", isCorrect: false },
        { id: 'opt_3', text: "It converts numbers to strings for compact storage", isCorrect: false },
        { id: 'opt_4', text: "It prevents the database from using primary keys", isCorrect: false },
      ],
    },
    {
      id: 'q_10_auto_10',
      question: "What happens if you omit the WHERE clause in a query intended to target specific records?",
      explanation: "Without a WHERE clause, operations apply to every record in the table.",
      difficulty: 'intermediate',
      topicTag: 'SQL',
      type: 'multiple-choice',
      options: [
        { id: 'opt_1', text: "The query acts on all rows in the table without restriction", isCorrect: true },
        { id: 'opt_2', text: "The database prompts the user interactively in the console", isCorrect: false },
        { id: 'opt_3', text: "The engine automatically guesses the most recent record", isCorrect: false },
        { id: 'opt_4', text: "The database throws a missing-where syntax error", isCorrect: false },
      ],
    },
  ],
};
