import { PandasLessonDefinition } from '../../types/pandasLesson';

export const lesson2: PandasLessonDefinition = {
  id: 'pandas-lesson-2',
  number: 2,
  slug: 'reading-and-writing-csv-and-tabular-data',
  title: 'Loading & Exporting Tabular Data',
  shortDescription:
    'Load structured datasets from CSV files and strings, inspect schemas with .info(), and export DataFrames to dictionaries and CSV.',
  estimatedMinutes: 25,
  learningObjectives: [
    'Parse comma-separated values using pd.read_csv()',
    'Examine column data types and non-null counts with .info()',
    'Export DataFrames to CSV strings and Python dictionary records with .to_dict()',
    'Work with built-in sandbox datasets like ecommerce and employees',
  ],
  prerequisites: ['Lesson 1: Intro to Series & DataFrames'],
  sections: [
    {
      id: 'p2-1',
      title: 'Ingesting CSV Files with pd.read_csv',
      content:
        'CSV (Comma-Separated Values) is the universal file format for exchanging tabular data.\n\nPandas provides the powerful pd.read_csv() function, which automatically parses headers, detects data types (casting numbers to int64 or float64), and handles missing delimiters.\n\nIn our client-side environment, pd.read_csv() can ingest raw CSV formatted strings or load pre-configured datasets by name, such as pd.read_csv("ecommerce").',
      codeExample: {
        code: `import pandas as pd

raw_csv = """emp_id,name,role,salary
1,Sarah Connor,Leader,95000
2,Kyle Reese,Soldier,72000
3,John Connor,Strategist,110000"""

df = pd.read_csv(raw_csv)
print(df)
print("Columns:", list(df.columns))`,
        explanation: 'pd.read_csv automatically infers columns from line 1 and casts numeric salaries.',
      },
    },
    {
      id: 'p2-2',
      title: 'Inspecting Dataset Health with .info()',
      content:
        'Before performing any data transformations, professional analysts run .info() to inspect:\n1. Total row count\n2. Column names\n3. Non-null counts to spot missing data\n4. Data types per column\n\nWhen ready to export, .to_dict(orient="records") transforms the table into an array of objects for JSON serialization or APIs.',
      codeExample: {
        code: `import pandas as pd

df = pd.read_csv("ecommerce")
print(df.info())
print("Top 2 records:")
print(df.head(2).to_dict('records'))`,
        explanation: 'info() details schema and memory health; to_dict converts rows to JSON-friendly records.',
      },
    },
  ],
  exercises: [
    {
      id: 'p2-ex1',
      lessonId: 'pandas-lesson-2',
      order: 1,
      title: 'Parse a CSV String and Inspect Schema',
      objective:
        'Parse the provided CSV string of student test results using pd.read_csv(). Print the DataFrame and the total number of records.',
      initialCode: `import pandas as pd

csv_text = """id,student,math,physics
101,Maya,94,88
102,Arjun,76,82
103,Chloe,89,95"""

df = pd.read_csv(csv_text)
print(df)
print("Total records:", df.shape[0])`,
      solutionCode: `import pandas as pd

csv_text = """id,student,math,physics
101,Maya,94,88
102,Arjun,76,82
103,Chloe,89,95"""

df = pd.read_csv(csv_text)
print(df)
print("Total records:", df.shape[0])`,
      expectedOutput: `Total records: 3`,
      hint: 'Pass csv_text to pd.read_csv(csv_text) and use df.shape[0] to get the row count.',
      explanation:
        'pd.read_csv parses the header and rows, constructing a fully typed 2D DataFrame.',
      quickChips: ['pd.read_csv(csv_text)', 'df.shape[0]', 'df.head()'],
    },
    {
      id: 'p2-ex2',
      lessonId: 'pandas-lesson-2',
      order: 2,
      title: 'Export Ecommerce Head to Dictionary Records',
      objective:
        'Load the "ecommerce" dataset using pd.read_csv("ecommerce"). Extract the top 2 rows with .head(2) and export them as dictionary records using .to_dict("records"). Print the exported list.',
      initialCode: `import pandas as pd

df = pd.read_csv("ecommerce")
top2 = df.head(2).to_dict('records')
print(top2)`,
      solutionCode: `import pandas as pd

df = pd.read_csv("ecommerce")
top2 = df.head(2).to_dict('records')
print(top2)`,
      expectedOutput: `[
  {
    "order_id": 101,
    "customer_id": "Cust-12",
    "category": "Electronics",
    "unit_price": 899.99,
    "quantity": 1,
    "order_date": "2025-01-15",
    "status": "Delivered"
  },
  {
    "order_id": 102,
    "customer_id": "Cust-45",
    "category": "Furniture",
    "unit_price": 249.5,
    "quantity": 2,
    "order_date": "2025-01-16",
    "status": "Delivered"
  }
]`,
      hint: 'Use df.head(2).to_dict("records") and print the result.',
      explanation:
        'orient="records" formats rows as a list of dictionaries with column names as keys, ideal for web payloads.',
      quickChips: ['pd.read_csv("ecommerce")', 'df.head(2).to_dict("records")'],
    },
  ],
  quiz: [
        {
      id: 'p2-q1',
      question: 'What is the primary function in Pandas used to read comma-separated files into a DataFrame?',
      explanation: 'pd.read_csv() is the standard method for loading CSV files.',
      difficulty: 'intermediate',
      topicTag: 'pandas',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'pd.read_csv()', isCorrect: true },
        { id: 'opt-b', text: 'pd.load_table()', isCorrect: false },
        { id: 'opt-c', text: 'pd.open_csv()', isCorrect: false },
        { id: 'opt-d', text: 'pd.import_file()', isCorrect: false },
      ],
    },
        {
      id: 'p2-q2',
      question: 'What does calling .info() on a DataFrame provide?',
      explanation: '.info() outputs column counts, non-null counts, and inferred data types.',
      difficulty: 'intermediate',
      topicTag: 'pandas',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'A concise summary including column names, non-null counts, and data types', isCorrect: true },
        { id: 'opt-b', text: 'A random sample of 10 rows', isCorrect: false },
        { id: 'opt-c', text: 'Only the names of the columns', isCorrect: false },
        { id: 'opt-d', text: 'A count of all words in string columns', isCorrect: false },
      ],
    },
        {
      id: 'p2-q3',
      question: 'Which method call exports a DataFrame into a list of row objects for JSON serialization?',
      explanation: 'df.to_dict("records") produces an array of object records.',
      difficulty: 'intermediate',
      topicTag: 'pandas',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'df.to_dict(', isCorrect: true },
        { id: 'opt-b', text: ')', isCorrect: false },
        { id: 'opt-c', text: 'df.export_json_array()', isCorrect: false },
        { id: 'opt-d', text: 'df.serialize()', isCorrect: false },
        { id: 'opt-e', text: 'df.convert_objects()', isCorrect: false },
      ],
    },
  ],
};
