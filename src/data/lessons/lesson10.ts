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
      question: "What is the primary objective taught in Lesson 10: INNER JOIN Multi-Table Queries?",
      explanation: "Lesson 10 focuses specifically on mastering INNER JOIN Multi-Table Queries in relational SQL.",
      difficulty: 'intermediate',
      topicTag: 'SQL',
      type: 'multiple-choice',
      options: [
        { id: 'opt_1', text: "To format CSS styles for web browsers", isCorrect: false },
        { id: 'opt_2', text: "To master INNER JOIN Multi-Table Queries and apply it accurately on relational tables.", isCorrect: true },
        { id: 'opt_3', text: "To configure operating system firewalls", isCorrect: false },
        { id: 'opt_4', text: "To write low-level machine assembly", isCorrect: false },
      ],
    },
    {
      id: 'q_10_2',
      question: "Which SQL clause or construct is introduced in Lesson 10 to manage INNER JOIN?",
      explanation: "This lesson explores standard SQL syntax designed specifically for INNER JOIN.",
      difficulty: 'intermediate',
      topicTag: 'SQL',
      type: 'multiple-choice',
      options: [
        { id: 'opt_1', text: "The INNER JOIN syntax and its associated keywords.", isCorrect: true },
        { id: 'opt_2', text: "The HTML <div> tag", isCorrect: false },
        { id: 'opt_3', text: "The Python def keyword", isCorrect: false },
        { id: 'opt_4', text: "The git commit command", isCorrect: false },
      ],
    },
    {
      id: 'q_10_3',
      question: "On which dataset table are the interactive exercises in Lesson 10 practiced?",
      explanation: "Lesson 10 exercises are executed against the CustomerOrders table in the local SQLite engine.",
      difficulty: 'intermediate',
      topicTag: 'SQL',
      type: 'multiple-choice',
      options: [
        { id: 'opt_1', text: "The CustomerOrders dataset table.", isCorrect: true },
        { id: 'opt_2', text: "A local CSV spreadsheet", isCorrect: false },
        { id: 'opt_3', text: "An external MongoDB cluster", isCorrect: false },
        { id: 'opt_4', text: "A Redis memory cache", isCorrect: false },
      ],
    },
    {
      id: 'q_10_4',
      question: "What is a key rule when writing queries involving INNER JOIN in Lesson 10?",
      explanation: "Syntactical accuracy and edge-case handling are critical for relational query success.",
      difficulty: 'intermediate',
      topicTag: 'SQL',
      type: 'multiple-choice',
      options: [
        { id: 'opt_1', text: "Queries must always be written in lowercase letters only", isCorrect: false },
        { id: 'opt_2', text: "Ensuring proper clause sequence, matching column types, and handling edge cases like NULLs.", isCorrect: true },
        { id: 'opt_3', text: "Never using semicolons at statement end", isCorrect: false },
        { id: 'opt_4', text: "Omitting the FROM clause entirely", isCorrect: false },
      ],
    },
    {
      id: 'q_10_5',
      question: "How does the in-browser SQLite WASM engine execute queries in Lesson 10?",
      explanation: "The platform executes genuine SQLite queries client-side via WebAssembly (WASM).",
      difficulty: 'intermediate',
      topicTag: 'SQL',
      type: 'multiple-choice',
      options: [
        { id: 'opt_1', text: "It simulates results using simple string matching", isCorrect: false },
        { id: 'opt_2', text: "It runs a real SQLite C-engine compiled to WebAssembly locally inside the browser with zero network latency.", isCorrect: true },
        { id: 'opt_3', text: "It sends every query to a remote MySQL server in the cloud", isCorrect: false },
        { id: 'opt_4', text: "It requires a paid license key", isCorrect: false },
      ],
    },
    {
      id: 'q_10_6',
      question: "What happens if a query in Lesson 10 violates SQL syntax rules?",
      explanation: "SQL syntax errors produce informative diagnostic messages explaining the exact failure.",
      difficulty: 'intermediate',
      topicTag: 'SQL',
      type: 'multiple-choice',
      options: [
        { id: 'opt_1', text: "The entire browser crashes permanently", isCorrect: false },
        { id: 'opt_2', text: "The SQLite engine returns a descriptive syntax error pointing out the unexpected keyword or token.", isCorrect: true },
        { id: 'opt_3', text: "The database table is deleted", isCorrect: false },
        { id: 'opt_4', text: "It returns random rows silently", isCorrect: false },
      ],
    },
    {
      id: 'q_10_7',
      question: "In Lesson 10, how does INNER JOIN Multi-Table Queries interact with query filtering?",
      explanation: "SQL features compose harmoniously within the standard query execution pipeline.",
      difficulty: 'intermediate',
      topicTag: 'SQL',
      type: 'multiple-choice',
      options: [
        { id: 'opt_1', text: "It bypasses all WHERE conditions completely", isCorrect: false },
        { id: 'opt_2', text: "It works in conjunction with WHERE and other relational clauses according to SQL execution order.", isCorrect: true },
        { id: 'opt_3', text: "It disables table indexes", isCorrect: false },
        { id: 'opt_4', text: "It only works on tables with fewer than 10 rows", isCorrect: false },
      ],
    },
    {
      id: 'q_10_8',
      question: "Which best practice should be followed when structuring queries in Lesson 10?",
      explanation: "Clean formatting and explicit column naming prevent errors and improve query readability.",
      difficulty: 'intermediate',
      topicTag: 'SQL',
      type: 'multiple-choice',
      options: [
        { id: 'opt_1', text: "Compress all SQL onto a single unformatted line", isCorrect: false },
        { id: 'opt_2', text: "Use explicit column names, clean indentation, and meaningful aliases for clarity and maintainability.", isCorrect: true },
        { id: 'opt_3', text: "Always use SELECT * in production queries", isCorrect: false },
        { id: 'opt_4', text: "Avoid testing queries before deployment", isCorrect: false },
      ],
    },
    {
      id: 'q_10_9',
      question: "What is the expected result set structure from queries in Lesson 10?",
      explanation: "All standard SQL queries return relations (tabular sets of tuples).",
      difficulty: 'intermediate',
      topicTag: 'SQL',
      type: 'multiple-choice',
      options: [
        { id: 'opt_1', text: "A binary compiled file", isCorrect: false },
        { id: 'opt_2', text: "A relational table of rows and columns matching the requested projection and criteria.", isCorrect: true },
        { id: 'opt_3', text: "A plain text string with no structure", isCorrect: false },
        { id: 'opt_4', text: "An operating system process ID", isCorrect: false },
      ],
    },
    {
      id: 'q_10_10',
      question: "Why is mastering INNER JOIN Multi-Table Queries in Lesson 10 essential for data professionals?",
      explanation: "These relational SQL concepts are universally applicable across PostgreSQL, MySQL, SQL Server, and BigQuery.",
      difficulty: 'intermediate',
      topicTag: 'SQL',
      type: 'multiple-choice',
      options: [
        { id: 'opt_1', text: "It allows skipping database design entirely", isCorrect: false },
        { id: 'opt_2', text: "It provides foundational relational capabilities required for analytics, data engineering, and backend development.", isCorrect: true },
        { id: 'opt_3', text: "It replaces the need for any programming language", isCorrect: false },
        { id: 'opt_4', text: "It only applies to SQLite and no other database", isCorrect: false },
      ],
    },
  ],
};
