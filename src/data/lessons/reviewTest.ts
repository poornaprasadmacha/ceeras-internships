import { QuizQuestion } from '../../types/quiz';

export const REVIEW_TEST_ID = 'review_test_foundation';

export const foundationReviewQuestions: QuizQuestion[] = [
  {
    id: 'rev_1',
    question: 'In relational database theory, what is an individual horizontal record in a table termed?',
    explanation:
      'A horizontal entry representing a single instance of an entity is called a Row (or tuple / record).',
    difficulty: 'beginner',
    topicTag: 'Relational Model',
    type: 'multiple-choice',
    options: [
      { id: 'opt_1', text: 'Column', isCorrect: false },
      { id: 'opt_2', text: 'Row (or tuple)', isCorrect: true },
      { id: 'opt_3', text: 'Schema', isCorrect: false },
      { id: 'opt_4', text: 'Index', isCorrect: false },
    ],
  },
  {
    id: 'rev_2',
    question: 'Which of the following statements about SQL execution is accurate?',
    explanation:
      'SQL is a declarative language: you specify the desired output columns and conditions, and the database engine decides the internal algorithm and scan strategy.',
    difficulty: 'beginner',
    topicTag: 'SQL Fundamentals',
    type: 'multiple-choice',
    options: [
      { id: 'opt_1', text: 'SQL requires manual allocation of RAM pointers for each table row', isCorrect: false },
      { id: 'opt_2', text: 'SQL is declarative: you specify what data to retrieve, and the engine optimizes how', isCorrect: true },
      { id: 'opt_3', text: 'SQL statements can only be run once before the table is destroyed', isCorrect: false },
      { id: 'opt_4', text: 'SQL cannot run without an internet connection to a cloud provider', isCorrect: false },
    ],
  },
  {
    id: 'rev_3',
    question: 'Which of the following is an embedded, serverless SQLite database engine that runs locally in browsers and devices?',
    explanation:
      'SQLite is a serverless, zero-configuration database engine widely embedded into applications, operating systems, and browsers via WebAssembly.',
    difficulty: 'beginner',
    topicTag: 'Database Systems',
    type: 'multiple-choice',
    options: [
      { id: 'opt_1', text: 'SQLite', isCorrect: true },
      { id: 'opt_2', text: 'Oracle Enterprise Cloud', isCorrect: false },
      { id: 'opt_3', text: 'PostgreSQL Server', isCorrect: false },
      { id: 'opt_4', text: 'Microsoft SQL Server Cluster', isCorrect: false },
    ],
  },
  {
    id: 'rev_4',
    question: 'Given the LibraryBooks table, what query retrieves only the title and published_year columns?',
    explanation:
      'SELECT title, published_year FROM LibraryBooks; selects exactly the two requested columns separated by a comma.',
    difficulty: 'beginner',
    topicTag: 'Query Construction',
    type: 'multiple-choice',
    options: [
      { id: 'opt_1', text: 'SELECT title published_year FROM LibraryBooks;', isCorrect: false },
      { id: 'opt_2', text: 'SELECT title, published_year FROM LibraryBooks;', isCorrect: true },
      { id: 'opt_3', text: 'GET title AND published_year IN LibraryBooks;', isCorrect: false },
      { id: 'opt_4', text: 'SELECT * FROM LibraryBooks WHERE title;', isCorrect: false },
    ],
  },
  {
    id: 'rev_5',
    question: 'What is the role of the asterisk (*) symbol in SELECT * FROM CourseCatalog;?',
    explanation:
      'The asterisk (*) acts as a wildcard instructing the database to include all columns defined in the table schema.',
    difficulty: 'beginner',
    topicTag: 'Wildcards',
    type: 'multiple-choice',
    options: [
      { id: 'opt_1', text: 'It creates a new blank column', isCorrect: false },
      { id: 'opt_2', text: 'It returns all columns defined on the target table', isCorrect: true },
      { id: 'opt_3', text: 'It multiplies the row values by 2', isCorrect: false },
      { id: 'opt_4', text: 'It selects only rows with special characters', isCorrect: false },
    ],
  },
  {
    id: 'rev_6',
    question: 'Predict output: If CourseCatalog has 6 rows and 5 columns, what is the shape of the result returned by SELECT level FROM CourseCatalog;?',
    explanation:
      'Selecting a single column without row filtering produces 1 column and all 6 rows.',
    difficulty: 'intermediate',
    topicTag: 'Predict Output',
    type: 'predict-output',
    options: [
      { id: 'opt_1', text: '5 columns and 6 rows', isCorrect: false },
      { id: 'opt_2', text: '1 column and 6 rows', isCorrect: true },
      { id: 'opt_3', text: '1 column and 1 row', isCorrect: false },
      { id: 'opt_4', text: '6 columns and 1 row', isCorrect: false },
    ],
  },
  {
    id: 'rev_7',
    question: 'Identify the syntax error in this statement: SELECT course_id, instructor, FROM CourseCatalog;',
    explanation:
      'There is an illegal trailing comma after instructor before the FROM keyword.',
    difficulty: 'beginner',
    topicTag: 'Identify Error',
    type: 'identify-error',
    options: [
      { id: 'opt_1', text: 'CourseCatalog must be written in lowercase', isCorrect: false },
      { id: 'opt_2', text: 'Trailing comma after instructor before FROM causes a syntax error', isCorrect: true },
      { id: 'opt_3', text: 'SELECT cannot retrieve numeric IDs', isCorrect: false },
      { id: 'opt_4', text: 'The semicolon is misplaced', isCorrect: false },
    ],
  },
  {
    id: 'rev_8',
    question: 'True or False: If you select columns in the order SELECT instructor, course_name, the result displays instructor as the leftmost column.',
    explanation:
      'True. The relational engine constructs the output column headers in the precise left-to-right order specified in the SELECT list.',
    difficulty: 'beginner',
    topicTag: 'Output Shaping',
    type: 'true-false',
    options: [
      { id: 'opt_1', text: 'True', isCorrect: true },
      { id: 'opt_2', text: 'False', isCorrect: false },
    ],
  },
  {
    id: 'rev_9',
    question: 'Why do database systems use tables with keys instead of storing all organizational data in a single massive text file?',
    explanation:
      'Relational structures prevent data duplication, enforce data types, enable rapid indexed lookups, and ensure safe concurrent multi-user transactions.',
    difficulty: 'intermediate',
    topicTag: 'Database Architecture',
    type: 'multiple-choice',
    options: [
      { id: 'opt_1', text: 'Because operating systems do not allow text files larger than 10 lines', isCorrect: false },
      { id: 'opt_2', text: 'Tables avoid redundancy, maintain relational integrity, and support fast indexing and concurrent updates', isCorrect: true },
      { id: 'opt_3', text: 'Because SQL commands cannot read letters of the alphabet', isCorrect: false },
      { id: 'opt_4', text: 'Because single files are automatically encrypted and cannot be opened', isCorrect: false },
    ],
  },
  {
    id: 'rev_10',
    question: 'What is the purpose of the semicolon (;) at the end of a SQL statement?',
    explanation:
      'The semicolon is the standard statement terminator in SQL, signaling to the query parser that the current instruction is complete.',
    difficulty: 'beginner',
    topicTag: 'SQL Syntax',
    type: 'multiple-choice',
    options: [
      { id: 'opt_1', text: 'It commits all uncommitted financial payments', isCorrect: false },
      { id: 'opt_2', text: 'It acts as the standard statement terminator signaling the end of the query', isCorrect: true },
      { id: 'opt_3', text: 'It pauses query execution for 5 seconds', isCorrect: false },
      { id: 'opt_4', text: 'It forces the database to restart', isCorrect: false },
    ],
  },
];
