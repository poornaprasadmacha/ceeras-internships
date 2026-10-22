import { LessonDefinition } from '../../types/lesson';
import { libraryBooksDataset } from '../datasets/libraryBooks';

export const lesson1: LessonDefinition = {
  id: 'lesson_1',
  number: 1,
  slug: 'sql-basics',
  title: 'Introduction to SQL and Relational Databases',
  shortDescription:
    'Understand how relational databases organize information and how SQL helps you work with structured data.',
  estimatedMinutes: 10,
  learningObjectives: [
    'Understand what a database is and why organizations rely on them.',
    'Understand what makes a database relational.',
    'Distinguish clearly between tables, rows, and columns.',
    'Understand the role of SQL as a declarative query language.',
    'Recognize leading relational database engines and their commonalities.',
    'Inspect your first SQL statement and understand its structure.',
  ],
  prerequisites: [
    'No previous coding or database knowledge required.',
  ],
  dataset: libraryBooksDataset,
  sections: [
    {
      id: 'section-what-is-a-database',
      title: 'A. What is a Database?',
      content: `Imagine a university that tracks thousands of enrolled students, course schedules, examination scores, and dormitory assignments.
      
If this information were kept on paper notebooks or fragmented spreadsheets, finding a specific student record would be slow, prone to conflicting duplicates, and insecure against accidental loss or overwriting.

A database is an organized, persistent repository of information managed by dedicated software designed for rapid searching, concurrent multi-user access, integrity enforcement, and dependable security.`,
    },
    {
      id: 'section-what-is-relational',
      title: 'B. What is a Relational Database?',
      content: `In the 1970s, computer scientist Edgar F. Codd introduced the relational model. Rather than scattering data in ad-hoc lists or unstructured documents, a relational database organizes data into structured two-dimensional grids called tables.

These tables can relate to one another through shared identifier values (keys). For example, a student record with student ID 408 can connect to an enrollment record that also references student ID 408, without duplicating the student's name, email, or address across multiple files.`,
    },
    {
      id: 'section-tables-rows-columns',
      title: 'C. Tables, Rows, and Columns',
      content: `Every relational table is composed of three foundational elements:

1. Table: An organized collection of data describing a single entity (such as books, students, or orders).
2. Column (or Attribute): A vertical specification that holds a specific piece of information with a designated data type (such as an integer, text string, or date).
3. Row (or Record / Tuple): A horizontal entry representing one individual instance of that entity.

Consider the fictional LibraryBooks table below. It models a collection of books stored in a campus library:`,
      sampleTable: {
        title: 'LibraryBooks Table',
        columns: ['book_id', 'title', 'category', 'published_year'],
        rows: [
          [101, 'The Silent Orbit', 'Science', 2020],
          [102, 'Gardens of Tomorrow', 'Nature', 2022],
          [103, 'The Copper Lighthouse', 'Fiction', 2019],
          [104, 'Patterns of Discovery', 'Science', 2023],
          [105, 'Rivers and Roots', 'Nature', 2021],
        ],
      },
    },
    {
      id: 'section-what-is-sql',
      title: 'D. What is SQL?',
      content: `SQL stands for Structured Query Language. It was created specifically to interact with relational database management systems (RDBMS).

Unlike imperative languages such as Python or Java where you describe every sequential step the computer must take to find an answer, SQL is declarative: you describe what data you need, and the database engine plans the most efficient execution path behind the scenes.`,
    },
    {
      id: 'section-popular-systems',
      title: 'E. Popular Relational Database Systems',
      content: `Multiple relational database engines exist across commercial and open-source ecosystems. The most prominent include:

- SQLite: A lightweight, serverless database embedded directly into client applications and browsers. (QueryPath uses an in-browser WebAssembly SQLite engine to run your queries locally!)
- PostgreSQL: An advanced, highly extensible open-source object-relational database.
- MySQL: A widely used open-source relational database popular in web hosting and applications.
- Microsoft SQL Server: An enterprise database system integrated deeply with Windows and Azure environments.
- Oracle Database: A high-performance enterprise database platform common in banking and heavy industry.

Important Note: These systems all adhere to ISO/ANSI SQL standards for core queries, but each database has proprietary dialect differences, custom functions, and distinct performance tuning features. The fundamentals you learn in QueryPath are broadly transferable across all major platforms.`,
    },
    {
      id: 'section-why-learn-sql',
      title: 'F. Why Learn SQL?',
      content: `SQL is one of the most durable and valuable skills in technology:

- Software Development: Backing web, desktop, and mobile applications with transactional persistence.
- Data Analysis & Science: Querying millions of records to extract insights and metrics.
- Business Operations: Extracting invoices, tracking inventory, and auditing compliance.
- System Administration: Inspecting performance logs and managing infrastructure inventories.`,
    },
    {
      id: 'section-first-example',
      title: 'G. Your First SQL Query',
      content: `Here is the simplest query you can run to view every book in the library collection:`,
      codeExample: {
        sql: 'SELECT *\nFROM LibraryBooks;',
        explanation: `Let's break this down line by line:
- SELECT *: The SELECT keyword specifies which columns to retrieve. The asterisk (*) is a wildcard symbol that means "all columns".
- FROM LibraryBooks: The FROM keyword specifies which table the database should look inside.
- Semicolon (;): In SQL standards, the semicolon indicates the termination of a query statement.`,
      },
    },
  ],
  comprehensionQuestions: [
    {
      id: 'comp_1_1',
      question: 'What is the primary difference between a spreadsheet and a relational database?',
      explanation:
        'Relational databases enforce structured schemas, handle concurrent multi-user access reliably, and link separate tables via relational keys without redundant data duplication.',
      difficulty: 'beginner',
      topicTag: 'Database Concepts',
      type: 'multiple-choice',
      options: [
        {
          id: 'opt_1',
          text: 'Spreadsheets store tables, but databases can only store unstructured text files.',
          isCorrect: false,
        },
        {
          id: 'opt_2',
          text: 'Relational databases enforce structured schema relationships, transactional safety, and concurrent multi-user access.',
          isCorrect: true,
        },
        {
          id: 'opt_3',
          text: 'Spreadsheets are faster than relational databases for querying millions of records.',
          isCorrect: false,
        },
      ],
    },
    {
      id: 'comp_1_2',
      question: 'In the LibraryBooks table, what does each single row represent?',
      explanation:
        'A row in a relational database represents an individual entity instance — in this case, one specific book in the collection.',
      difficulty: 'beginner',
      topicTag: 'Data Modeling',
      type: 'multiple-choice',
      options: [
        {
          id: 'opt_1',
          text: 'A specific property, such as published year or category.',
          isCorrect: false,
        },
        {
          id: 'opt_2',
          text: 'An individual book record with all its associated attributes.',
          isCorrect: true,
        },
        {
          id: 'opt_3',
          text: 'The entire library catalog as a whole.',
          isCorrect: false,
        },
      ],
    },
    {
      id: 'comp_1_3',
      question: 'What does it mean that SQL is a "declarative" language?',
      explanation:
        'In declarative languages, you state what result you want (e.g. which columns and rows), and the database engine decides how to retrieve it.',
      difficulty: 'beginner',
      topicTag: 'SQL Fundamentals',
      type: 'multiple-choice',
      options: [
        {
          id: 'opt_1',
          text: 'You specify step-by-step memory pointers and CPU loops.',
          isCorrect: false,
        },
        {
          id: 'opt_2',
          text: 'You declare what information you want, leaving execution optimization to the engine.',
          isCorrect: true,
        },
        {
          id: 'opt_3',
          text: 'It only runs on one specific operating system.',
          isCorrect: false,
        },
      ],
    },
  ],
  terminologyMatching: [
    {
      id: 'term_table',
      term: 'Table',
      definition: 'A named two-dimensional grid consisting of columns and rows storing a single entity type.',
    },
    {
      id: 'term_column',
      term: 'Column',
      definition: 'A vertical field that represents an attribute and holds data of a specific type across all rows.',
    },
    {
      id: 'term_row',
      term: 'Row',
      definition: 'A horizontal record representing one complete individual item or entity in the table.',
    },
    {
      id: 'term_rdbms',
      term: 'RDBMS',
      definition: 'Relational Database Management System — software that stores, retrieves, and secures data tables.',
    },
  ],
  interactiveCheck: {
    id: 'identify_elements',
    title: 'Interactive Verification: Identify Columns and Rows',
    instructions:
      'In the LibraryBooks table, select whether the listed element represents a Column (attribute) or a Row (individual record).',
    type: 'identify-elements',
    options: [
      { id: 'item_1', label: '"category" (e.g., Science, Fiction)', isColumn: true, isRow: false },
      { id: 'item_2', label: 'Book 103: "The Copper Lighthouse", Fiction, 2019', isColumn: false, isRow: true },
      { id: 'item_3', label: '"published_year" (e.g., 2020, 2022)', isColumn: true, isRow: false },
      { id: 'item_4', label: 'Book 101: "The Silent Orbit", Science, 2020', isColumn: false, isRow: true },
    ],
  },
  exercises: [
    {
      id: 'ex_1_1',
      lessonId: 'lesson_1',
      order: 1,
      title: 'Inspect the LibraryBooks Table',
      objective:
        'Write a SQL statement to retrieve all columns from the LibraryBooks table using the wildcard asterisk (*).',
      initialQuery: '-- Write your first query to inspect all library books\nSELECT \nFROM ',
      solutionQuery: 'SELECT * FROM LibraryBooks;',
      hint: 'Remember: Use the asterisk (*) after SELECT to choose all columns, and specify LibraryBooks after the FROM keyword.',
      explanation:
        'The query SELECT * FROM LibraryBooks; instructs the SQLite engine to return all 4 columns (book_id, title, category, published_year) for every row stored in the table.',
      requiresOrder: false,
      expectedColumns: ['book_id', 'title', 'category', 'published_year'],
    },
  ],
  quiz: [
    {
      id: 'q_1_1',
      question: 'Which of the following best defines a relational database table?',
      explanation:
        'A relational database table is a two-dimensional grid of named columns (attributes) and horizontal rows (records).',
      difficulty: 'beginner',
      topicTag: 'Relational Model',
      type: 'multiple-choice',
      options: [
        { id: 'opt_1', text: 'A single text document without columns or rows', isCorrect: false },
        { id: 'opt_2', text: 'A two-dimensional grid made of columns (attributes) and rows (records)', isCorrect: true },
        { id: 'opt_3', text: 'A folder containing image files', isCorrect: false },
        { id: 'opt_4', text: 'A collection of unlinked bullet points', isCorrect: false },
      ],
    },
    {
      id: 'q_1_2',
      question: 'What does the asterisk (*) signify when placed immediately after SELECT?',
      explanation:
        'In SQL, the asterisk (*) is a wildcard shorthand that instructs the engine to return every column defined on the table.',
      difficulty: 'beginner',
      topicTag: 'SQL Syntax',
      type: 'multiple-choice',
      options: [
        { id: 'opt_1', text: 'Multiply two numeric columns together', isCorrect: false },
        { id: 'opt_2', text: 'Select only the first row of data', isCorrect: false },
        { id: 'opt_3', text: 'Select all columns defined on the target table', isCorrect: true },
        { id: 'opt_4', text: 'Filter out duplicate records', isCorrect: false },
      ],
    },
    {
      id: 'q_1_3',
      question: 'True or False: Every relational database engine uses 100% identical syntax with zero dialect differences.',
      explanation:
        'False. While major RDBMS platforms follow ANSI/ISO SQL standards for core queries, each engine (SQLite, PostgreSQL, MySQL, SQL Server) has distinct functions, types, and dialect extensions.',
      difficulty: 'beginner',
      topicTag: 'Database Systems',
      type: 'true-false',
      options: [
        { id: 'opt_1', text: 'True', isCorrect: false },
        { id: 'opt_2', text: 'False', isCorrect: true },
      ],
    },
    {
      id: 'q_1_4',
      question: 'What is the purpose of the FROM keyword in a SQL SELECT statement?',
      explanation:
        'The FROM clause designates the target table (or tables) from which rows and columns should be queried.',
      difficulty: 'beginner',
      topicTag: 'SQL Syntax',
      type: 'multiple-choice',
      options: [
        { id: 'opt_1', text: 'To name the user running the query', isCorrect: false },
        { id: 'opt_2', text: 'To designate which table or data source to query', isCorrect: true },
        { id: 'opt_3', text: 'To specify the order in which rows are sorted', isCorrect: false },
        { id: 'opt_4', text: 'To delete old rows from the database', isCorrect: false },
      ],
    },
    {
      id: 'q_1_5',
      question: 'In the LibraryBooks table, what type of element is "published_year"?',
      explanation:
        '"published_year" is a vertical attribute that holds data for each book — making it a Column.',
      difficulty: 'beginner',
      topicTag: 'Data Modeling',
      type: 'multiple-choice',
      options: [
        { id: 'opt_1', text: 'A row', isCorrect: false },
        { id: 'opt_2', text: 'A column', isCorrect: true },
        { id: 'opt_3', text: 'A table', isCorrect: false },
        { id: 'opt_4', text: 'A database server', isCorrect: false },
      ],
    },
    {
      id: 'q_1_auto_6',
      question: "What does SQL stand for in database systems?",
      explanation: "SQL stands for Structured Query Language, the ANSI/ISO standard language for relational databases.",
      difficulty: 'intermediate',
      topicTag: 'SQL',
      type: 'multiple-choice',
      options: [
        { id: 'opt_1', text: "Structured Query Language", isCorrect: true },
        { id: 'opt_2', text: "Sequential Query Logic", isCorrect: false },
        { id: 'opt_3', text: "Standard Question Language", isCorrect: false },
        { id: 'opt_4', text: "System Query Link", isCorrect: false },
      ],
    },
    {
      id: 'q_1_auto_7',
      question: "Which SQL clause is mandatory when selecting data from an existing table?",
      explanation: "The FROM clause is required to identify the source table containing the records.",
      difficulty: 'intermediate',
      topicTag: 'SQL',
      type: 'multiple-choice',
      options: [
        { id: 'opt_1', text: "WHERE", isCorrect: false },
        { id: 'opt_2', text: "FROM", isCorrect: true },
        { id: 'opt_3', text: "ORDER BY", isCorrect: false },
        { id: 'opt_4', text: "HAVING", isCorrect: false },
      ],
    },
    {
      id: 'q_1_auto_8',
      question: "What is a primary key in a relational database table?",
      explanation: "A primary key uniquely identifies each record in a database table and cannot contain NULL values.",
      difficulty: 'intermediate',
      topicTag: 'SQL',
      type: 'multiple-choice',
      options: [
        { id: 'opt_1', text: "A column that uniquely identifies every row", isCorrect: true },
        { id: 'opt_2', text: "A column that allows duplicate numbers", isCorrect: false },
        { id: 'opt_3', text: "A foreign table reference", isCorrect: false },
        { id: 'opt_4', text: "A temporary table alias", isCorrect: false },
      ],
    },
    {
      id: 'q_1_auto_9',
      question: "Which command terminates an SQL query in standard clients and scripts?",
      explanation: "The semicolon (;) is the standard statement terminator in SQL.",
      difficulty: 'intermediate',
      topicTag: 'SQL',
      type: 'multiple-choice',
      options: [
        { id: 'opt_1', text: "Colon (:)", isCorrect: false },
        { id: 'opt_2', text: "Semicolon (;)", isCorrect: true },
        { id: 'opt_3', text: "Period (.)", isCorrect: false },
        { id: 'opt_4', text: "Forward slash (/)", isCorrect: false },
      ],
    },
    {
      id: 'q_1_auto_10',
      question: "Which data type in SQLite is best suited for storing text strings?",
      explanation: "TEXT is the SQLite storage class used for textual string values.",
      difficulty: 'intermediate',
      topicTag: 'SQL',
      type: 'multiple-choice',
      options: [
        { id: 'opt_1', text: "INTEGER", isCorrect: false },
        { id: 'opt_2', text: "TEXT", isCorrect: true },
        { id: 'opt_3', text: "BLOB", isCorrect: false },
        { id: 'opt_4', text: "REAL", isCorrect: false },
      ],
    },
  ],
};
