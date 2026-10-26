import { LessonDefinition } from '../../types/lesson';
import { libraryBooksDataset } from '../datasets/libraryBooks';

export const lesson1: LessonDefinition = {
  id: 'lesson_1',
  number: 1,
  slug: 'sql-basics',
  title: 'Introduction to SQL and Relational Databases',
  shortDescription:
    'Understand how relational databases organize information and how SQL helps you inspect structured data.',
  estimatedMinutes: 10,
  learningObjectives: [
    'Understand what a database is and why organizations rely on them.',
    'Understand what makes a database relational.',
    'Distinguish clearly between tables, rows, columns, and individual cells.',
    'Inspect and execute your first SQL statement: SELECT * FROM LibraryBooks;',
    'Select specific columns to shape your output table.',
  ],
  prerequisites: [
    'No previous coding or database knowledge required.',
  ],
  dataset: libraryBooksDataset,
  sections: [
    {
      id: 'section-what-is-a-database',
      title: '1. What is a Database?',
      content: `A database is an organized, persistent repository of information managed by dedicated software.
      
Unlike paper ledgers or fragmented spreadsheets that become slow, prone to conflicting duplicates, and vulnerable to accidental deletion, a database is engineered for:
- High-speed searching and filtering across millions of records.
- Safe concurrent access by thousands of users simultaneously.
- Data integrity rules that prevent corrupted or inconsistent entries.`,
    },
    {
      id: 'section-what-is-relational',
      title: '2. What is a Relational Database?',
      content: `A relational database organizes data into structured two-dimensional grids called tables.
      
What makes it "relational" is that different tables can connect to one another through shared identifier values (called keys). For example, a student record with student ID 408 can link directly to enrollment and exam records that also reference student ID 408, without repeatedly typing the student's name, email, or address across multiple files.`,
    },
    {
      id: 'section-tables-rows-columns',
      title: '3. Tables, Rows, Columns, and Cells',
      content: `Every relational table is constructed from four fundamental components:

- Table: A named collection of related data describing a single entity (such as books, students, or orders).
- Column (Attribute): A vertical field holding a specific property of each entity (such as title or year). Every column has an enforced data type (e.g. integer, text, date).
- Row (Record): A horizontal entry representing one individual instance of an entity (e.g. one specific book).
- Cell: The single intersection of one row and one column, holding exactly one data value.`,
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
      id: 'section-simple-query',
      title: '4. A Simple SQL Query',
      content: `SQL (Structured Query Language) is the universal declarative language for working with relational databases.
      
Declarative means you specify WHAT data you want, rather than writing sequential programming loops on HOW to fetch it. The database engine calculates the fastest search path automatically.
      
The simplest and most common query retrieves data from a table:`,
      codeExample: {
        sql: 'SELECT *\nFROM LibraryBooks;',
        explanation: `How this query works:
- SELECT *: Specifies which columns to retrieve. The asterisk (*) is a wildcard that means "return every column".
- FROM LibraryBooks: Identifies the target table to read.
- Semicolon (;): Terminates the SQL statement.`,
      },
    },
    {
      id: 'section-database-engines',
      title: 'Optional: Popular Relational Database Engines',
      isCollapsible: true,
      defaultCollapsed: true,
      collapsedSummary: 'Learn about SQLite, PostgreSQL, MySQL, SQL Server, and Oracle (tap to expand)',
      content: `Relational Database Management Systems (RDBMS) share the same core SQL standards (ANSI/ISO SQL), but each has specialized strengths:

- SQLite: Lightweight and serverless. Runs directly inside applications, mobile phones, and web browsers via WebAssembly. (Used right here inside this learning platform!)
- PostgreSQL: Advanced, open-source object-relational database favored for complex analytics, extensibility, and strict data integrity.
- MySQL: Widely deployed open-source relational engine powering millions of web applications and content management systems.
- Microsoft SQL Server: Enterprise-grade database deeply integrated with Windows and Azure cloud services.
- Oracle Database: High-throughput database system commonly used in large financial institutions and telecommunications.

Core SQL statements (SELECT, FROM, WHERE, JOIN) work identically across all of these engines.`,
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
      definition: 'A named two-dimensional grid of rows and columns storing a single entity type.',
    },
    {
      id: 'term_column',
      term: 'Column',
      definition: 'A vertical structure holding a specific named attribute with an enforced data type across all records.',
    },
    {
      id: 'term_row',
      term: 'Row',
      definition: 'A horizontal entry representing one complete individual instance of an entity.',
    },
    {
      id: 'term_rdbms',
      term: 'RDBMS',
      definition: 'Relational Database Management System — software that stores, retrieves, and safeguards data tables.',
    },
  ],
  interactiveCheck: {
    id: 'identify_elements',
    title: 'Classify Table Elements',
    instructions:
      'Indicate whether each element from the LibraryBooks table represents a Column (attribute) or a Row (individual record).',
    type: 'identify-elements',
    options: [
      { id: 'item_1', label: '"category" (e.g. Science, Fiction)', isColumn: true, isRow: false },
      { id: 'item_2', label: 'Book 103: "The Copper Lighthouse", Fiction, 2019', isColumn: false, isRow: true },
      { id: 'item_3', label: '"published_year" (e.g. 2020, 2022)', isColumn: true, isRow: false },
      { id: 'item_4', label: 'Book 101: "The Silent Orbit", Science, 2020', isColumn: false, isRow: true },
    ],
  },
  exercises: [
    {
      id: 'ex_1_1',
      lessonId: 'lesson_1',
      order: 1,
      title: 'Inspect the Library Catalog (Working Query)',
      objective:
        'Run this working SQL query to inspect the complete LibraryBooks table. Observe how SELECT * retrieves all columns and all rows.',
      initialQuery: 'SELECT * FROM LibraryBooks;',
      solutionQuery: 'SELECT * FROM LibraryBooks;',
      hint: 'The query is already prepared. Press "Run Query" (or Ctrl+Enter) to execute it against the in-browser SQLite engine.',
      explanation:
        'SELECT * FROM LibraryBooks; retrieves all 4 columns (book_id, title, category, published_year) for every book record in the table.',
      requiresOrder: false,
      expectedColumns: ['book_id', 'title', 'category', 'published_year'],
      allowedKeywords: ['SELECT', '*', 'FROM', ';'],
    },
    {
      id: 'ex_1_2',
      lessonId: 'lesson_1',
      order: 2,
      title: 'Select Specific Columns (Guided)',
      objective:
        'Modify your query to retrieve only the title and published_year columns from the LibraryBooks table.',
      initialQuery: 'SELECT title, published_year\nFROM LibraryBooks;',
      solutionQuery: 'SELECT title, published_year FROM LibraryBooks;',
      hint: 'Specify the column names separated by a comma: title, published_year after SELECT, followed by FROM LibraryBooks;',
      explanation:
        'By replacing the wildcard (*) with explicit column names, the database engine returns only the requested attributes, reducing network transfer and focusing results.',
      requiresOrder: false,
      expectedColumns: ['title', 'published_year'],
      allowedKeywords: ['SELECT', 'FROM', ',', ';'],
    },
    {
      id: 'ex_1_3',
      lessonId: 'lesson_1',
      order: 3,
      title: 'Write a Query from Scratch (Independent)',
      objective:
        'Write a complete SQL query from scratch to retrieve book_id, title, and category from the LibraryBooks table.',
      initialQuery: '-- Write your query below to retrieve book_id, title, and category\n',
      solutionQuery: 'SELECT book_id, title, category FROM LibraryBooks;',
      hint: 'Type SELECT book_id, title, category FROM LibraryBooks; then click Run Query.',
      explanation:
        'Excellent! You have written an independent SQL query to select three specific columns in order from a relational table.',
      requiresOrder: false,
      expectedColumns: ['book_id', 'title', 'category'],
      allowedKeywords: ['SELECT', 'FROM', ',', ';'],
    },
  ],
  quiz: [
    {
      id: 'q_1_1',
      question: 'What is the primary function of the SQL SELECT statement?',
      explanation: 'SELECT is the fundamental SQL command used to retrieve and display data.',
      difficulty: 'beginner',
      topicTag: 'SQL',
      type: 'multiple-choice',
      options: [
        { id: 'opt_1', text: 'To delete obsolete tables from disk', isCorrect: false },
        { id: 'opt_2', text: 'To retrieve and display data from one or more database tables.', isCorrect: true },
        { id: 'opt_3', text: 'To create user passwords and permissions', isCorrect: false },
        { id: 'opt_4', text: 'To compile application software', isCorrect: false },
      ],
    },
    {
      id: 'q_1_2',
      question: 'What does the asterisk (*) symbol represent when placed directly after SELECT?',
      explanation: 'The asterisk wildcard instructs the database engine to project every column defined in the table.',
      difficulty: 'beginner',
      topicTag: 'SQL',
      type: 'multiple-choice',
      options: [
        { id: 'opt_1', text: 'A mathematical multiplication of all rows', isCorrect: false },
        { id: 'opt_2', text: 'A wildcard instructing the engine to return all columns defined on the table.', isCorrect: true },
        { id: 'opt_3', text: 'A command to return only the first row', isCorrect: false },
        { id: 'opt_4', text: 'A syntax error indicator', isCorrect: false },
      ],
    },
    {
      id: 'q_1_3',
      question: "In the query 'SELECT title, category FROM LibraryBooks;', what are 'title' and 'category'?",
      explanation: 'Comma-separated names after SELECT specify exactly which columns to return.',
      difficulty: 'beginner',
      topicTag: 'SQL',
      type: 'multiple-choice',
      options: [
        { id: 'opt_1', text: 'Table aliases', isCorrect: false },
        { id: 'opt_2', text: 'Specific column names to be projected in the output table.', isCorrect: true },
        { id: 'opt_3', text: 'Database passwords', isCorrect: false },
        { id: 'opt_4', text: 'Row identifiers', isCorrect: false },
      ],
    },
    {
      id: 'q_1_4',
      question: 'What is the role of the FROM keyword in a SELECT query?',
      explanation: 'FROM designates the target data source or relational table to read.',
      difficulty: 'beginner',
      topicTag: 'SQL',
      type: 'multiple-choice',
      options: [
        { id: 'opt_1', text: 'It defines where the file is stored on the hard drive', isCorrect: false },
        { id: 'opt_2', text: 'It designates the target table from which records should be read.', isCorrect: true },
        { id: 'opt_3', text: 'It authenticates the current database user', isCorrect: false },
        { id: 'opt_4', text: 'It sorts the results in ascending order', isCorrect: false },
      ],
    },
    {
      id: 'q_1_5',
      question: "In relational databases, what is a 'row' (also called a record or tuple)?",
      explanation: 'A row is one horizontal entry containing all attribute values for one individual entity instance.',
      difficulty: 'beginner',
      topicTag: 'Data Modeling',
      type: 'multiple-choice',
      options: [
        { id: 'opt_1', text: 'A single horizontal instance of related data representing one entity.', isCorrect: true },
        { id: 'opt_2', text: 'A vertical list of column headers', isCorrect: false },
        { id: 'opt_3', text: 'The database schema configuration', isCorrect: false },
        { id: 'opt_4', text: 'An index structure', isCorrect: false },
      ],
    },
    {
      id: 'q_1_6',
      question: "In relational databases, what is a 'column' (also called an attribute or field)?",
      explanation: 'Columns represent vertical data properties with defined names and types.',
      difficulty: 'beginner',
      topicTag: 'Data Modeling',
      type: 'multiple-choice',
      options: [
        { id: 'opt_1', text: 'A horizontal data record', isCorrect: false },
        { id: 'opt_2', text: 'A vertical structure representing a specific named property of the data.', isCorrect: true },
        { id: 'opt_3', text: 'A database backup file', isCorrect: false },
        { id: 'opt_4', text: 'A temporary cache entry', isCorrect: false },
      ],
    },
    {
      id: 'q_1_7',
      question: 'What punctuation character is standard in SQL to terminate a complete query statement?',
      explanation: 'The semicolon (;) is the standard SQL statement terminator.',
      difficulty: 'beginner',
      topicTag: 'SQL',
      type: 'multiple-choice',
      options: [
        { id: 'opt_1', text: 'A colon (:)', isCorrect: false },
        { id: 'opt_2', text: 'A period (.)', isCorrect: false },
        { id: 'opt_3', text: 'A semicolon (;)', isCorrect: true },
        { id: 'opt_4', text: 'A comma (,)', isCorrect: false },
      ],
    },
    {
      id: 'q_1_8',
      question: "If a table has 5 columns and 100 rows, what will 'SELECT title FROM LibraryBooks;' return?",
      explanation: 'Projecting one column returns that single column for every matching row.',
      difficulty: 'beginner',
      topicTag: 'SQL',
      type: 'multiple-choice',
      options: [
        { id: 'opt_1', text: '1 row with all 5 columns', isCorrect: false },
        { id: 'opt_2', text: '100 rows containing only the single title column.', isCorrect: true },
        { id: 'opt_3', text: '5 rows with 100 titles', isCorrect: false },
        { id: 'opt_4', text: 'An empty table', isCorrect: false },
      ],
    },
    {
      id: 'q_1_9',
      question: 'Does the order of column names in the SELECT clause affect the output table?',
      explanation: 'Yes, the engine returns columns left-to-right matching the exact sequence in your SELECT statement.',
      difficulty: 'beginner',
      topicTag: 'SQL',
      type: 'multiple-choice',
      options: [
        { id: 'opt_1', text: 'No, database tables always output in alphabetical order', isCorrect: false },
        { id: 'opt_2', text: 'Yes, columns appear in the exact left-to-right order specified in SELECT.', isCorrect: true },
        { id: 'opt_3', text: 'No, the primary key column always appears first', isCorrect: false },
        { id: 'opt_4', text: 'Only in commercial databases', isCorrect: false },
      ],
    },
    {
      id: 'q_1_10',
      question: 'Are SQL keywords like SELECT and FROM case-sensitive in standard engines?',
      explanation: 'SQL keywords are case-insensitive, though uppercase is conventional for readability.',
      difficulty: 'beginner',
      topicTag: 'SQL',
      type: 'multiple-choice',
      options: [
        { id: 'opt_1', text: "Yes, typing 'select' in lowercase causes an immediate syntax error", isCorrect: false },
        { id: 'opt_2', text: 'No, SQL keywords are case-insensitive, though uppercase is conventional style.', isCorrect: true },
        { id: 'opt_3', text: 'Only in SQLite', isCorrect: false },
        { id: 'opt_4', text: 'Only when running on Windows', isCorrect: false },
      ],
    },
  ],
};
