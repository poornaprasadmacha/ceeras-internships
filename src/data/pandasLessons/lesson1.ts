import { PandasLessonDefinition } from '../../types/pandasLesson';

export const lesson1: PandasLessonDefinition = {
  id: 'pandas-lesson-1',
  number: 1,
  slug: 'intro-to-pandas-series-and-dataframes',
  title: 'Introduction to Pandas: Series & DataFrames',
  shortDescription:
    'Understand the two fundamental data structures of Pandas: the 1D labeled Series and the 2D tabular DataFrame.',
  estimatedMinutes: 25,
  learningObjectives: [
    'Differentiate between 1D Series and 2D DataFrames',
    'Create Series from Python lists and dictionaries with custom indices',
    'Construct DataFrames from dictionaries of lists, records, and arrays',
    'Inspect tabular dimensions using .shape, .columns, .dtypes, and .head()',
  ],
  prerequisites: ['Python syntax basics', 'Understanding of tabular row-column layouts'],
  sections: [
    {
      id: 'p1-1',
      title: 'The Anatomy of Pandas Data Structures',
      content:
        'Pandas is the premier data manipulation and analysis library in Python. It builds upon NumPy by adding labeled indices and heterogeneous column types.\n\nWhile NumPy arrays require all elements to have the exact same data type, real-world data is inherently mixed: customer IDs are integers, names are strings, transaction totals are floats, and dates are timestamps.\n\nPandas provides two primary data structures:\n1. Series: A one-dimensional labeled array capable of holding any data type.\n2. DataFrame: A two-dimensional labeled data structure with columns of potentially different types, resembling an SQL table or spreadsheet.',
      codeExample: {
        code: `import pandas as pd

# Creating a 1D Series
scores = pd.Series([92, 85, 78, 96], index=['Alice', 'Bob', 'Charlie', 'Diana'], name='ExamScore')
print(scores)

# Creating a 2D DataFrame
data = {
    'product': ['Laptop', 'Mouse', 'Keyboard'],
    'price': [1200.0, 25.5, 75.0],
    'in_stock': [True, True, False]
}
df = pd.DataFrame(data)
print(df)
print("Shape:", df.shape)`,
        explanation:
          'Series has an index and values. DataFrame has row indices, column labels, and a 2D grid of values.',
      },
    },
    {
      id: 'p1-2',
      title: 'Inspecting Dimensions and Data Types',
      content:
        'When working with tabular data, the first step is always inspecting structure:\n- df.shape: Returns a tuple (num_rows, num_columns)\n- df.columns: The list of column headers\n- df.dtypes: The data type inferred for each column (int64, float64, object, bool)\n- df.head(n): Returns the first n rows (defaults to 5)\n- df.tail(n): Returns the last n rows.',
      codeExample: {
        code: `import pandas as pd

df = pd.DataFrame({
    'city': ['Tokyo', 'Delhi', 'Shanghai', 'Sao Paulo', 'Mexico City'],
    'population_millions': [37.4, 29.3, 26.3, 21.8, 21.6],
    'is_capital': [True, True, False, False, True]
})

print("Shape:", df.shape)
print("Columns:", list(df.columns))
print(df.head(3))`,
        explanation: 'df.head(3) returns the first three rows of the table.',
      },
    },
  ],
  exercises: [
    {
      id: 'p1-ex1',
      lessonId: 'pandas-lesson-1',
      order: 1,
      title: 'Build a Custom Labeled Series',
      objective:
        'Create a Series named "temperatures" containing [28.5, 32.0, 24.5, 19.0] with index ["Mon", "Tue", "Wed", "Thu"]. Print the Series and its mean temperature.',
      initialCode: `import pandas as pd

# Create temperatures Series with custom day indices
temps = pd.Series([28.5, 32.0, 24.5, 19.0], index=['Mon', 'Tue', 'Wed', 'Thu'], name='temperatures')

print(temps)
print("Mean temp:", temps.mean())`,
      solutionCode: `import pandas as pd

temps = pd.Series([28.5, 32.0, 24.5, 19.0], index=['Mon', 'Tue', 'Wed', 'Thu'], name='temperatures')

print(temps)
print("Mean temp:", temps.mean())`,
      expectedOutput: `Mon    28.5
Tue    32
Wed    24.5
Thu    19
Name: temperatures, dtype: float64
Mean temp: 26`,
      hint: 'Use pd.Series(values, index=days, name="temperatures") and call temps.mean().',
      explanation:
        'Series encapsulates data along with axis labels, allowing label-aware mathematical operations.',
      quickChips: [
        "pd.Series([28.5, 32.0, 24.5, 19.0], index=['Mon', 'Tue', 'Wed', 'Thu'])",
        'temps.mean()',
      ],
    },
    {
      id: 'p1-ex2',
      lessonId: 'pandas-lesson-1',
      order: 2,
      title: 'Construct a Products DataFrame',
      objective:
        'Create a DataFrame with columns "sku", "category", and "price". Print the DataFrame and its shape.',
      initialCode: `import pandas as pd

catalog = {
    'sku': ['SKU-001', 'SKU-002', 'SKU-003'],
    'category': ['Audio', 'Video', 'Audio'],
    'price': [149.99, 399.00, 89.50]
}

df = pd.DataFrame(catalog)
print(df)
print("Dimensions:", df.shape)`,
      solutionCode: `import pandas as pd

catalog = {
    'sku': ['SKU-001', 'SKU-002', 'SKU-003'],
    'category': ['Audio', 'Video', 'Audio'],
    'price': [149.99, 399.00, 89.50]
}

df = pd.DataFrame(catalog)
print(df)
print("Dimensions:", df.shape)`,
      expectedOutput: `Dimensions: [3, 3]`,
      hint: 'Pass the dictionary of lists directly into pd.DataFrame(catalog) and print df.shape.',
      explanation:
        'Keys in the dictionary become column headers, and each list forms the values of a column.',
      quickChips: ['pd.DataFrame(catalog)', 'df.shape', 'df.head()'],
    },
  ],
  quiz: [
        {
      id: 'p1-q1',
      question: 'What is the primary architectural difference between a NumPy ndarray and a Pandas DataFrame?',
      explanation: 'Pandas DataFrames support heterogeneous types across columns (e.g. string, float, bool) and provide labeled row/column indexing.',
      difficulty: 'intermediate',
      topicTag: 'pandas',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'A DataFrame can store columns with different data types and maintains explicit row and column labels', isCorrect: true },
        { id: 'opt-b', text: 'NumPy arrays can only store 1D data while DataFrames can only store 3D data', isCorrect: false },
        { id: 'opt-c', text: 'DataFrames are written in C while NumPy arrays are written in pure Python', isCorrect: false },
        { id: 'opt-d', text: 'There is no difference; DataFrame is simply an alias for ndarray', isCorrect: false },
      ],
    },
        {
      id: 'p1-q2',
      question: 'What does the .shape attribute return on a DataFrame with 100 rows and 5 columns?',
      explanation: 'The shape property returns a 2-element tuple or array [rows, columns].',
      difficulty: 'intermediate',
      topicTag: 'pandas',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: '[100, 5]', isCorrect: true },
        { id: 'opt-b', text: '500', isCorrect: false },
        { id: 'opt-c', text: 'rows: 100, cols: 5', isCorrect: false },
        { id: 'opt-d', text: '(5, 100)', isCorrect: false },
      ],
    },
        {
      id: 'p1-q3',
      question: 'Which method returns the first 5 records of a DataFrame by default?',
      explanation: '.head() defaults to 5 rows, or takes n as an argument.',
      difficulty: 'intermediate',
      topicTag: 'pandas',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: '.head()', isCorrect: true },
        { id: 'opt-b', text: '.top()', isCorrect: false },
        { id: 'opt-c', text: '.first()', isCorrect: false },
        { id: 'opt-d', text: '.slice()', isCorrect: false },
      ],
    },
    {
      id: 'q_pandas_1_auto_4',
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
      id: 'q_pandas_1_auto_5',
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
      id: 'q_pandas_1_auto_6',
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
      id: 'q_pandas_1_auto_7',
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
      id: 'q_pandas_1_auto_8',
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
      id: 'q_pandas_1_auto_9',
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
      id: 'q_pandas_1_auto_10',
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
