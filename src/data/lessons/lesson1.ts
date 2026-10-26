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
      question: "What is the primary function of the SQL SELECT statement?",
      explanation: "SELECT is the fundamental SQL data retrieval command.",
      difficulty: 'intermediate',
      topicTag: 'SQL',
      type: 'multiple-choice',
      options: [
        { id: 'opt_1', text: "To delete obsolete tables from disk", isCorrect: false },
        { id: 'opt_2', text: "To retrieve and display data from one or more database tables.", isCorrect: true },
        { id: 'opt_3', text: "To create user permissions", isCorrect: false },
        { id: 'opt_4', text: "To compile Python code", isCorrect: false },
      ],
    },
    {
      id: 'q_1_2',
      question: "What does the asterisk (*) symbol represent when placed directly after SELECT?",
      explanation: "The asterisk wildcard projects every column in the table.",
      difficulty: 'intermediate',
      topicTag: 'SQL',
      type: 'multiple-choice',
      options: [
        { id: 'opt_1', text: "A mathematical multiplication of all rows", isCorrect: false },
        { id: 'opt_2', text: "A wildcard instructing the engine to return all columns defined on the table.", isCorrect: true },
        { id: 'opt_3', text: "A command to return only the first row", isCorrect: false },
        { id: 'opt_4', text: "A syntax error indicator", isCorrect: false },
      ],
    },
    {
      id: 'q_1_3',
      question: "In the query 'SELECT title, author FROM LibraryBooks;', what are 'title' and 'author'?",
      explanation: "Comma-separated column names specify exactly which attributes to project.",
      difficulty: 'intermediate',
      topicTag: 'SQL',
      type: 'multiple-choice',
      options: [
        { id: 'opt_1', text: "Table aliases", isCorrect: false },
        { id: 'opt_2', text: "Specific column names to be projected in the query result.", isCorrect: true },
        { id: 'opt_3', text: "Database passwords", isCorrect: false },
        { id: 'opt_4', text: "Primary keys", isCorrect: false },
      ],
    },
    {
      id: 'q_1_4',
      question: "What is the role of the FROM keyword in a SELECT query?",
      explanation: "FROM specifies the relational table to query.",
      difficulty: 'intermediate',
      topicTag: 'SQL',
      type: 'multiple-choice',
      options: [
        { id: 'opt_1', text: "It defines where the database file is saved", isCorrect: false },
        { id: 'opt_2', text: "It designates the target table from which records should be read.", isCorrect: true },
        { id: 'opt_3', text: "It names the current logged-in user", isCorrect: false },
        { id: 'opt_4', text: "It sorts the rows in ascending order", isCorrect: false },
      ],
    },
    {
      id: 'q_1_5',
      question: "In relational databases, what is a 'row' (also called a record or tuple)?",
      explanation: "A row represents one unique entity record.",
      difficulty: 'intermediate',
      topicTag: 'SQL',
      type: 'multiple-choice',
      options: [
        { id: 'opt_1', text: "A single horizontal instance of related data across all columns.", isCorrect: true },
        { id: 'opt_2', text: "A vertical list of column names", isCorrect: false },
        { id: 'opt_3', text: "The database file header", isCorrect: false },
        { id: 'opt_4', text: "An index definition", isCorrect: false },
      ],
    },
    {
      id: 'q_1_6',
      question: "In relational databases, what is a 'column' (also called an attribute or field)?",
      explanation: "Columns define the attributes and data types of table entities.",
      difficulty: 'intermediate',
      topicTag: 'SQL',
      type: 'multiple-choice',
      options: [
        { id: 'opt_1', text: "A horizontal data record", isCorrect: false },
        { id: 'opt_2', text: "A vertical structure representing a specific named property of the data.", isCorrect: true },
        { id: 'opt_3', text: "A table backup", isCorrect: false },
        { id: 'opt_4', text: "A query cache", isCorrect: false },
      ],
    },
    {
      id: 'q_1_7',
      question: "What punctuation character is standard in SQL to terminate a complete query?",
      explanation: "The semicolon (;) is the universal statement terminator in SQL.",
      difficulty: 'intermediate',
      topicTag: 'SQL',
      type: 'multiple-choice',
      options: [
        { id: 'opt_1', text: "A colon (:)", isCorrect: false },
        { id: 'opt_2', text: "A period (.)", isCorrect: false },
        { id: 'opt_3', text: "A semicolon (;)", isCorrect: true },
        { id: 'opt_4', text: "A comma (,)", isCorrect: false },
      ],
    },
    {
      id: 'q_1_8',
      question: "If a table has 5 columns and 100 rows, what will 'SELECT title FROM LibraryBooks;' return?",
      explanation: "Projecting one column returns every row for that specific column.",
      difficulty: 'intermediate',
      topicTag: 'SQL',
      type: 'multiple-choice',
      options: [
        { id: 'opt_1', text: "1 row with all 5 columns", isCorrect: false },
        { id: 'opt_2', text: "100 rows containing only the single 'title' column.", isCorrect: true },
        { id: 'opt_3', text: "5 rows with 100 titles", isCorrect: false },
        { id: 'opt_4', text: "An empty table", isCorrect: false },
      ],
    },
    {
      id: 'q_1_9',
      question: "Does the order of column names in the SELECT clause affect the output table?",
      explanation: "The output grid displays columns in the order you list them.",
      difficulty: 'intermediate',
      topicTag: 'SQL',
      type: 'multiple-choice',
      options: [
        { id: 'opt_1', text: "No, database tables always output in alphabetical order", isCorrect: false },
        { id: 'opt_2', text: "Yes, columns appear in the exact left-to-right order specified in SELECT.", isCorrect: true },
        { id: 'opt_3', text: "No, primary key always appears first", isCorrect: false },
        { id: 'opt_4', text: "Only in MySQL", isCorrect: false },
      ],
    },
    {
      id: 'q_1_10',
      question: "Are SQL keywords like SELECT and FROM case-sensitive in standard engines?",
      explanation: "SQL keywords are case-insensitive; uppercase is standard style.",
      difficulty: 'intermediate',
      topicTag: 'SQL',
      type: 'multiple-choice',
      options: [
        { id: 'opt_1', text: "Yes, writing 'select' in lowercase causes a syntax error", isCorrect: false },
        { id: 'opt_2', text: "No, SQL keywords are case-insensitive, though uppercase is conventional.", isCorrect: true },
        { id: 'opt_3', text: "Only in SQLite", isCorrect: false },
        { id: 'opt_4', text: "Only in table names", isCorrect: false },
      ],
    },
  ],
};
