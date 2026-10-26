import { LessonDefinition } from '../../types/lesson';
import { courseCatalogDataset } from '../datasets/courseCatalog';

export const lesson2: LessonDefinition = {
  id: 'lesson_2',
  number: 2,
  slug: 'sql-select-queries',
  title: 'Your First SQL Queries',
  shortDescription:
    'Learn to retrieve exactly the information you need from a database using SELECT.',
  estimatedMinutes: 18,
  learningObjectives: [
    'Understand the role of the SELECT clause in specifying output columns.',
    'Understand the role of the FROM clause in targeting specific tables.',
    'Retrieve single specific columns without pulling unnecessary data.',
    'Retrieve multiple distinct columns separated by commas.',
    'Retrieve all columns simultaneously using the asterisk (*) wildcard.',
    'Read existing queries and accurately predict the shape of their output.',
    'Diagnose and correct common syntax mistakes such as missing commas and typos.',
  ],
  prerequisites: [
    'Familiarity with tables, rows, and columns from Lesson 1.',
  ],
  dataset: courseCatalogDataset,
  sections: [
    {
      id: 'section-select-overview',
      title: 'A. Selecting an Individual Column',
      content: `In everyday life, you rarely need every detail at once. When checking a catalog, you often just want to know what courses are available, rather than who teaches them or how many hours they last.

To retrieve a single column from a table, place the column name directly after the SELECT keyword:

SELECT course_name
FROM CourseCatalog;

When SQLite executes this statement, it scans the CourseCatalog table and returns a result grid containing only that one vertical column for all 6 courses.`,
      codeExample: {
        sql: 'SELECT course_name\nFROM CourseCatalog;',
        explanation:
          'This returns exactly one column containing the title of each course in the catalog.',
      },
    },
    {
      id: 'section-select-multiple',
      title: 'B. Selecting Multiple Columns',
      content: `When your application or report requires more than one attribute, you can list multiple columns in the SELECT clause, separating each column with a comma (,):

SELECT course_name, level
FROM CourseCatalog;

The database engine returns columns in the exact order you specify in your SELECT list. If you write level before course_name, the result grid displays level as the leftmost column.`,
      codeExample: {
        sql: 'SELECT course_name, instructor, duration_hours\nFROM CourseCatalog;',
        explanation:
          'Commas separate each column name. Do not place a comma after the final column before the FROM keyword.',
      },
    },
    {
      id: 'section-select-all',
      title: 'C. Selecting All Columns with the Asterisk Wildcard',
      content: `If you want to view every column defined on the table without typing out every individual attribute name, use the asterisk (*):

SELECT *
FROM CourseCatalog;

While SELECT * is convenient during exploration and debugging in an interactive sandbox, it is generally considered a best practice in production software to name the exact columns you need. Explicit column lists reduce network bandwidth, prevent unexpected breaking changes if new columns are added later, and make your code self-documenting.`,
    },
    {
      id: 'section-query-and-output',
      title: 'D. How Queries Shape the Output',
      content: `A helpful mental model for SQL is that the SELECT statement defines the shape (or schema) of the returned table:
      
- The columns in your SELECT clause become the columns of your result table.
- The order of names in your SELECT clause defines the horizontal order of columns.
- Unless a WHERE clause or LIMIT clause is applied (which we will explore in upcoming modules), every row in the target table is included in the output.`,
    },
    {
      id: 'section-query-structure',
      title: 'E. Basic Query Structure & Semicolons',
      content: `Every fundamental SQL query requires at least two clauses:

1. The SELECT clause: Specifies what attributes you want to view.
2. The FROM clause: Specifies which table contains those attributes.

SQL keywords such as SELECT and FROM are case-insensitive: select, Select, and SELECT are all understood identically by the engine. However, by widespread convention, SQL keywords are typically written in UPPERCASE to distinguish them clearly from table and column identifiers.

Semicolons (;): In standard SQL syntax, a semicolon marks the end of a complete statement. Although some single-query browser interfaces tolerate omitted semicolons, building the habit of terminating statements with a semicolon is essential for writing robust, multi-query scripts.`,
    },
    {
      id: 'section-common-mistakes',
      title: 'F. Common Pitfalls & How to Avoid Them',
      content: `When learning SQL, almost every student encounters these minor syntax hurdles:

1. Misspelled Column Names: If you write SELECT course_nam FROM CourseCatalog;, SQLite will immediately report "no such column: course_nam". Always double-check your spelling against the table schema.
2. Misspelled Table Names: Writing FROM CourseCatalogs (with an extra 's') results in "no such table: CourseCatalogs".
3. Missing Commas: Writing SELECT course_name instructor FROM CourseCatalog; causes SQLite to treat 'instructor' as an alias for course_name, returning only one column!
4. Trailing Commas: Writing SELECT course_name, instructor, FROM CourseCatalog; causes a syntax error because SQLite expects another column name after the comma.`,
    },
  ],
  exercises: [
    {
      id: 'ex_2_1',
      lessonId: 'lesson_2',
      order: 1,
      title: 'Task 1: Display Every Course Name',
      objective: 'Write a SQL query to retrieve only the course_name column from the CourseCatalog table.',
      initialQuery: '-- Task 1: Select only the course names\nSELECT \nFROM CourseCatalog;',
      solutionQuery: 'SELECT course_name FROM CourseCatalog;',
      hint: 'Place the column name course_name immediately following the SELECT keyword.',
      explanation:
        'SELECT course_name FROM CourseCatalog; requests only the course_name attribute, resulting in a single-column output of 6 rows.',
      requiresOrder: false,
      expectedColumns: ['course_name'],
    },
    {
      id: 'ex_2_2',
      lessonId: 'lesson_2',
      order: 2,
      title: 'Task 2: Display Course Names and Instructors',
      objective:
        'Write a SQL query to retrieve both course_name and instructor from the CourseCatalog table in that order.',
      initialQuery: '-- Task 2: Retrieve course names and instructor names\nSELECT \nFROM CourseCatalog;',
      solutionQuery: 'SELECT course_name, instructor FROM CourseCatalog;',
      hint: 'Separate the two column names with a comma: course_name, instructor.',
      explanation:
        'Listing course_name, instructor produces a 2-column result containing each course alongside its assigned faculty instructor.',
      requiresOrder: false,
      expectedColumns: ['course_name', 'instructor'],
    },
    {
      id: 'ex_2_3',
      lessonId: 'lesson_2',
      order: 3,
      title: 'Task 3: Display Course IDs and Duration Hours',
      objective:
        'Write a SQL query to display course_id and duration_hours from the CourseCatalog table.',
      initialQuery: '-- Task 3: Retrieve course IDs and duration in hours\nSELECT \nFROM CourseCatalog;',
      solutionQuery: 'SELECT course_id, duration_hours FROM CourseCatalog;',
      hint: 'Check the column names in the schema: course_id and duration_hours. Separate them with a comma.',
      explanation:
        'This query extracts the unique numeric identifier and credit duration for every course without loading instructor or name text.',
      requiresOrder: false,
      expectedColumns: ['course_id', 'duration_hours'],
    },
    {
      id: 'ex_2_4',
      lessonId: 'lesson_2',
      order: 4,
      title: 'Task 4: Display Every Column from CourseCatalog',
      objective:
        'Write a SQL query using the asterisk wildcard (*) to display all columns from CourseCatalog.',
      initialQuery: '-- Task 4: Retrieve all columns\nSELECT \nFROM CourseCatalog;',
      solutionQuery: 'SELECT * FROM CourseCatalog;',
      hint: 'Use the asterisk symbol (*) after SELECT to request all columns without naming them individually.',
      explanation:
        'SELECT * retrieves all 5 columns (course_id, course_name, instructor, duration_hours, level) across all 6 records.',
      requiresOrder: false,
      expectedColumns: ['course_id', 'course_name', 'instructor', 'duration_hours', 'level'],
    },
    {
      id: 'ex_2_5',
      lessonId: 'lesson_2',
      order: 5,
      title: 'Task 5: Display Course Names and Difficulty Levels',
      objective:
        'Write a SQL query to display the course_name and level columns from CourseCatalog.',
      initialQuery: '-- Task 5: Retrieve course names and difficulty levels\nSELECT \nFROM CourseCatalog;',
      solutionQuery: 'SELECT course_name, level FROM CourseCatalog;',
      hint: 'Specify course_name followed by a comma, then the column name level.',
      explanation:
        'This query provides students with an overview of available topics and their target experience level (Beginner, Intermediate, or Advanced).',
      requiresOrder: false,
      expectedColumns: ['course_name', 'level'],
    },
  ],
  quiz: [
    {
      id: 'q_2_1',
      question: "What is the fundamental purpose of the WHERE clause in SQL?",
      explanation: "WHERE limits query results to rows that meet a condition.",
      difficulty: 'intermediate',
      topicTag: 'SQL',
      type: 'multiple-choice',
      options: [
        { id: 'opt_1', text: "To sort rows alphabetically", isCorrect: false },
        { id: 'opt_2', text: "To filter rows based on specific conditions before results are returned.", isCorrect: true },
        { id: 'opt_3', text: "To count how many columns exist", isCorrect: false },
        { id: 'opt_4', text: "To delete the database schema", isCorrect: false },
      ],
    },
    {
      id: 'q_2_2',
      question: "Where must the WHERE clause be placed in a basic SQL query?",
      explanation: "Standard clause order: SELECT -> FROM -> WHERE.",
      difficulty: 'intermediate',
      topicTag: 'SQL',
      type: 'multiple-choice',
      options: [
        { id: 'opt_1', text: "Before the SELECT keyword", isCorrect: false },
        { id: 'opt_2', text: "Immediately following the FROM clause.", isCorrect: true },
        { id: 'opt_3', text: "At the very beginning of the query", isCorrect: false },
        { id: 'opt_4', text: "After the semicolon", isCorrect: false },
      ],
    },
    {
      id: 'q_2_3',
      question: "Which comparison operator tests for exact equality in standard SQL?",
      explanation: "In standard SQL, a single equals sign (=) tests for equality.",
      difficulty: 'intermediate',
      topicTag: 'SQL',
      type: 'multiple-choice',
      options: [
        { id: 'opt_1', text: "==", isCorrect: false },
        { id: 'opt_2', text: ":=", isCorrect: false },
        { id: 'opt_3', text: "A single equals sign (=)", isCorrect: true },
        { id: 'opt_4', text: "===", isCorrect: false },
      ],
    },
    {
      id: 'q_2_4',
      question: "How must string values (like names or categories) be enclosed in a WHERE condition?",
      explanation: "SQL string literals must be wrapped in single quotes.",
      difficulty: 'intermediate',
      topicTag: 'SQL',
      type: 'multiple-choice',
      options: [
        { id: 'opt_1', text: "Within double curly braces {{...}}", isCorrect: false },
        { id: 'opt_2', text: "Within square brackets [...]", isCorrect: false },
        { id: 'opt_3', text: "Within single quotation marks ('...')", isCorrect: true },
        { id: 'opt_4', text: "Without any quotes", isCorrect: false },
      ],
    },
    {
      id: 'q_2_5',
      question: "How should numeric values (like age = 45) be written in a WHERE condition?",
      explanation: "Numeric literals in SQL are written plainly without quotes.",
      difficulty: 'intermediate',
      topicTag: 'SQL',
      type: 'multiple-choice',
      options: [
        { id: 'opt_1', text: "Within single quotes '45'", isCorrect: false },
        { id: 'opt_2', text: "Within parentheses (45)", isCorrect: false },
        { id: 'opt_3', text: "As plain numbers without quotation marks.", isCorrect: true },
        { id: 'opt_4', text: "Preceded by a dollar sign $45", isCorrect: false },
      ],
    },
    {
      id: 'q_2_6',
      question: "Which operator checks if a column's value is greater than or equal to a target number?",
      explanation: "Greater-than or equal is represented by >=.",
      difficulty: 'intermediate',
      topicTag: 'SQL',
      type: 'multiple-choice',
      options: [
        { id: 'opt_1', text: "=>", isCorrect: false },
        { id: 'opt_2', text: ">=", isCorrect: true },
        { id: 'opt_3', text: "==", isCorrect: false },
        { id: 'opt_4', text: "=<", isCorrect: false },
      ],
    },
    {
      id: 'q_2_7',
      question: "Which operator tests if two values are NOT equal in standard SQL?",
      explanation: "<> is the ANSI standard inequality operator; != is also widely supported.",
      difficulty: 'intermediate',
      topicTag: 'SQL',
      type: 'multiple-choice',
      options: [
        { id: 'opt_1', text: "<> (or !=)", isCorrect: true },
        { id: 'opt_2', text: "NOT =", isCorrect: false },
        { id: 'opt_3', text: "!==", isCorrect: false },
        { id: 'opt_4', text: "><", isCorrect: false },
      ],
    },
    {
      id: 'q_2_8',
      question: "If no rows in the table meet the condition in the WHERE clause, what is returned?",
      explanation: "Queries with unfulfilled conditions return 0 rows gracefully.",
      difficulty: 'intermediate',
      topicTag: 'SQL',
      type: 'multiple-choice',
      options: [
        { id: 'opt_1', text: "A database crash error", isCorrect: false },
        { id: 'opt_2', text: "An empty result set with column headers and 0 rows.", isCorrect: true },
        { id: 'opt_3', text: "A random row from the table", isCorrect: false },
        { id: 'opt_4', text: "NULL", isCorrect: false },
      ],
    },
    {
      id: 'q_2_9',
      question: "What is the result of 'SELECT * FROM HospitalPatients WHERE age > 60;'?",
      explanation: "The > operator strictly filters for values above 60.",
      difficulty: 'intermediate',
      topicTag: 'SQL',
      type: 'multiple-choice',
      options: [
        { id: 'opt_1', text: "All patients aged 60 and under", isCorrect: false },
        { id: 'opt_2', text: "Only patients whose age is strictly greater than 60.", isCorrect: true },
        { id: 'opt_3', text: "Patients aged exactly 60", isCorrect: false },
        { id: 'opt_4', text: "All patients in the table", isCorrect: false },
      ],
    },
    {
      id: 'q_2_10',
      question: "Can a WHERE clause compare two columns from the same table row against each other?",
      explanation: "SQL supports column-to-column comparisons within the same row.",
      difficulty: 'intermediate',
      topicTag: 'SQL',
      type: 'multiple-choice',
      options: [
        { id: 'opt_1', text: "No, WHERE can only compare columns against literal values", isCorrect: false },
        { id: 'opt_2', text: "Yes, comparisons like WHERE admission_date = discharge_date are valid.", isCorrect: true },
        { id: 'opt_3', text: "Only in PostgreSQL", isCorrect: false },
        { id: 'opt_4', text: "Only with aggregate functions", isCorrect: false },
      ],
    },
  ],
};
