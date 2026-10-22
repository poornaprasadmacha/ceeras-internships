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
    {
      id: 'q_pandas_2_auto_4',
      question: "What is the fundamental difference between a Pandas Series and a DataFrame?",
      explanation: "A Series represents a single labeled column, while a DataFrame is a table composed of multiple Series sharing an index.",
      difficulty: 'intermediate',
      topicTag: 'pandas',
      type: 'multiple-choice',
      options: [
        { id: 'opt_1', text: "A Series is a one-dimensional labeled array, while a DataFrame is a two-dimensional tabular data structure with rows and columns", isCorrect: true },
        { id: 'opt_2', text: "A Series only holds strings, while a DataFrame only holds numbers", isCorrect: false },
        { id: 'opt_3', text: "A DataFrame is an external SQL database", isCorrect: false },
        { id: 'opt_4', text: "There is no difference", isCorrect: false },
      ],
    },
    {
      id: 'q_pandas_2_auto_5',
      question: "What is the primary difference between df.loc and df.iloc in Pandas?",
      explanation: ".loc uses label-based indexing; .iloc uses zero-based positional integer coordinates.",
      difficulty: 'intermediate',
      topicTag: 'pandas',
      type: 'multiple-choice',
      options: [
        { id: 'opt_1', text: ".loc selects by label (index/column names), while .iloc selects by integer position (0-based index)", isCorrect: true },
        { id: 'opt_2', text: ".loc is only for rows, .iloc is only for columns", isCorrect: false },
        { id: 'opt_3', text: ".loc copies data, while .iloc mutates in-place", isCorrect: false },
        { id: 'opt_4', text: ".iloc is deprecated in Pandas 2.0", isCorrect: false },
      ],
    },
    {
      id: 'q_pandas_2_auto_6',
      question: "How do you filter a DataFrame 'df' where the column 'age' is strictly greater than 30?",
      explanation: "Boolean indexing using df[df['col'] > val] is the standard idiomatic way to filter DataFrame rows.",
      difficulty: 'intermediate',
      topicTag: 'pandas',
      type: 'multiple-choice',
      options: [
        { id: 'opt_1', text: "df[df['age'] > 30]", isCorrect: true },
        { id: 'opt_2', text: "df.filter(age > 30)", isCorrect: false },
        { id: 'opt_3', text: "df.where('age > 30')", isCorrect: false },
        { id: 'opt_4', text: "SELECT * FROM df WHERE age > 30", isCorrect: false },
      ],
    },
    {
      id: 'q_pandas_2_auto_7',
      question: "Which method drops rows with missing (NaN/null) values from a DataFrame?",
      explanation: "dropna() removes rows (or columns with axis=1) containing NaN or None values.",
      difficulty: 'intermediate',
      topicTag: 'pandas',
      type: 'multiple-choice',
      options: [
        { id: 'opt_1', text: "df.dropna()", isCorrect: true },
        { id: 'opt_2', text: "df.clean()", isCorrect: false },
        { id: 'opt_3', text: "df.remove_empty()", isCorrect: false },
        { id: 'opt_4', text: "df.isna().delete()", isCorrect: false },
      ],
    },
    {
      id: 'q_pandas_2_auto_8',
      question: "What does df.groupby('category')['sales'].mean() compute?",
      explanation: "groupby() splits the data into category groups, applies the mean() aggregation to 'sales', and combines the results.",
      difficulty: 'intermediate',
      topicTag: 'pandas',
      type: 'multiple-choice',
      options: [
        { id: 'opt_1', text: "The average sales amount calculated independently for each distinct category group", isCorrect: true },
        { id: 'opt_2', text: "The total count of all categories", isCorrect: false },
        { id: 'opt_3', text: "The global average across the whole table", isCorrect: false },
        { id: 'opt_4', text: "A sorted list of unique categories", isCorrect: false },
      ],
    },
    {
      id: 'q_pandas_2_auto_9',
      question: "Which method combines two DataFrames along rows or columns similar to an SQL JOIN?",
      explanation: "pd.merge() joins two DataFrames based on matching keys using inner, left, right, or outer join logic.",
      difficulty: 'intermediate',
      topicTag: 'pandas',
      type: 'multiple-choice',
      options: [
        { id: 'opt_1', text: "pd.merge(df1, df2, on='key', how='inner')", isCorrect: true },
        { id: 'opt_2', text: "df1.append(df2)", isCorrect: false },
        { id: 'opt_3', text: "df1.attach(df2)", isCorrect: false },
        { id: 'opt_4', text: "pd.combine_all(df1, df2)", isCorrect: false },
      ],
    },
    {
      id: 'q_pandas_2_auto_10',
      question: "What does df.describe() return?",
      explanation: "describe() generates descriptive summary statistics for numerical columns in the DataFrame.",
      difficulty: 'intermediate',
      topicTag: 'pandas',
      type: 'multiple-choice',
      options: [
        { id: 'opt_1', text: "Summary statistics (count, mean, std, min, 25%, 50%, 75%, max) for all numerical columns", isCorrect: true },
        { id: 'opt_2', text: "The raw SQL schema of the table", isCorrect: false },
        { id: 'opt_3', text: "A string description written by the author", isCorrect: false },
        { id: 'opt_4', text: "The first 5 rows of the DataFrame", isCorrect: false },
      ],
    },
  ],
};
