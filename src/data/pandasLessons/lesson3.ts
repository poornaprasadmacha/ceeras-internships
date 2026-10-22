import { PandasLessonDefinition } from '../../types/pandasLesson';

export const lesson3: PandasLessonDefinition = {
  id: 'pandas-lesson-3',
  number: 3,
  slug: 'selecting-and-slicing-loc-iloc',
  title: 'Selection & Slicing: loc, iloc & Subsets',
  shortDescription:
    'Master label-based indexing with .loc, integer position-based indexing with .iloc, and column subsetting.',
  estimatedMinutes: 25,
  learningObjectives: [
    'Distinguish between label-based (.loc) and position-based (.iloc) indexing',
    'Extract single columns as Series vs multiple columns as DataFrames',
    'Slice row and column ranges simultaneously',
    'Select scalar cell values at specific matrix coordinates',
  ],
  prerequisites: ['Lesson 1: Intro to Series & DataFrames'],
  sections: [
    {
      id: 'p3-1',
      title: 'Column Subsets: Series vs DataFrame',
      content:
        'In Pandas, the bracket notation behaves differently depending on whether you pass a single column name or a list of names:\n- df["col"] or df.get("col"): Returns a 1D Series.\n- df[["col1", "col2"]] or df.get(["col1", "col2"]): Returns a 2D DataFrame subset.\n\nDouble brackets [[]] are essential whenever you need to retain DataFrame structure.',
      codeExample: {
        code: `import pandas as pd

df = pd.read_csv("employees")

# Single column -> Series
names = df.get("name")
print("Type:", type(names))

# Multiple columns -> DataFrame
sub = df.get(["name", "salary", "department"])
print(sub.head(3))`,
        explanation: 'Single column extraction yields a Series; a list of column names yields a DataFrame.',
      },
    },
    {
      id: 'p3-2',
      title: 'loc vs iloc Indexing',
      content:
        'Pandas has two primary accessors for explicit 2D slicing:\n1. .loc[rows, columns]: Uses explicit labels (row index names and column header strings).\n2. .iloc[rows, columns]: Uses integer positional coordinates (0, 1, 2...) just like standard Python array slices.\n\nFor example:\n- df.iloc([0, 3], [0, 2]): Selects rows at index 0 to 2, and columns at index 0 and 1.',
      codeExample: {
        code: `import pandas as pd

df = pd.read_csv("employees")

# Slicing the first 3 rows and first 2 columns by position
print(df.iloc([0, 3], [0, 2]))`,
        explanation: 'iloc operates strictly on integer coordinates from 0 to N-1.',
      },
    },
  ],
  exercises: [
    {
      id: 'p3-ex1',
      lessonId: 'pandas-lesson-3',
      order: 1,
      title: 'Extract Core Employee Columns',
      objective:
        'Load the "employees" dataset. Extract the columns "name", "department", and "salary" into a new DataFrame. Print the first 4 rows using .head(4).',
      initialCode: `import pandas as pd

df = pd.read_csv("employees")

# Extract name, department, and salary columns
sub = df.get(['name', 'department', 'salary'])
print(sub.head(4))`,
      solutionCode: `import pandas as pd

df = pd.read_csv("employees")

sub = df.get(['name', 'department', 'salary'])
print(sub.head(4))`,
      expectedOutput: `idx   name           department     salary    
0     Alice Smith    Engineering    98000     
1     Bob Jones      Marketing      64000     
2     Charlie Brown  Engineering    115000    
3     Diana Prince   Finance        85000     `,
      hint: 'Use df.get(["name", "department", "salary"]) followed by .head(4).',
      explanation:
        'Passing an array of column names creates a clean projected view containing only the desired dimensions.',
      quickChips: [
        "df.get(['name', 'department', 'salary'])",
        'sub.head(4)',
      ],
    },
    {
      id: 'p3-ex2',
      lessonId: 'pandas-lesson-3',
      order: 2,
      title: 'Position-Based Slicing with iloc',
      objective:
        'Use .iloc([0, 3], [0, 4]) on "employees" to slice rows 0 through 2, and columns 0 through 3 (emp_id, name, department, salary). Print the resulting slice.',
      initialCode: `import pandas as pd

df = pd.read_csv("employees")

# Slice first 3 rows and first 4 columns
sliced = df.iloc([0, 3], [0, 4])
print(sliced)`,
      solutionCode: `import pandas as pd

df = pd.read_csv("employees")

sliced = df.iloc([0, 3], [0, 4])
print(sliced)`,
      expectedOutput: `idx   emp_id  name           department   salary  
0     1       Alice Smith    Engineering  98000   
1     2       Bob Jones      Marketing    64000   
2     3       Charlie Brown  Engineering  115000  `,
      hint: 'Call df.iloc([0, 3], [0, 4]) and print the output.',
      explanation:
        'iloc provides coordinate-based indexing unaffected by custom label strings or reordered indices.',
      quickChips: ['df.iloc([0, 3], [0, 4])', 'df.iloc(0, 1)'],
    },
  ],
  quiz: [
        {
      id: 'p3-q1',
      question: 'What is the key difference between .loc and .iloc?',
      explanation: '.loc is label-based, whereas .iloc is integer position-based.',
      difficulty: 'intermediate',
      topicTag: 'pandas',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: '.loc uses labels (names), while .iloc uses integer positions (indices)', isCorrect: true },
        { id: 'opt-b', text: '.loc only works on columns, while .iloc only works on rows', isCorrect: false },
        { id: 'opt-c', text: '.loc modifies the DataFrame in place, while .iloc returns a copy', isCorrect: false },
        { id: 'opt-d', text: '.loc is deprecated in modern Pandas versions', isCorrect: false },
      ],
    },
        {
      id: 'p3-q2',
      question: 'What data structure is returned when selecting a single column via df["salary"]?',
      explanation: 'Selecting a single column via bracket string returns a 1D Series.',
      difficulty: 'intermediate',
      topicTag: 'pandas',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'A 1D Series', isCorrect: true },
        { id: 'opt-b', text: 'A 2D DataFrame', isCorrect: false },
        { id: 'opt-c', text: 'A Python tuple', isCorrect: false },
        { id: 'opt-d', text: 'A NumPy matrix', isCorrect: false },
      ],
    },
        {
      id: 'p3-q3',
      question: 'Which syntax extracts columns "age" and "salary" as a 2D DataFrame?',
      explanation: 'Double brackets df[["col1", "col2"]] select a DataFrame subset.',
      difficulty: 'intermediate',
      topicTag: 'pandas',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'df[[', isCorrect: true },
        { id: 'opt-b', text: ', ', isCorrect: false },
        { id: 'opt-c', text: ']]', isCorrect: false },
        { id: 'opt-d', text: 'df(', isCorrect: false },
        { id: 'opt-e', text: ', ', isCorrect: false },
        { id: 'opt-undefined', text: ')', isCorrect: false },
        { id: 'opt-undefined', text: 'df[', isCorrect: false },
        { id: 'opt-undefined', text: ':', isCorrect: false },
        { id: 'opt-undefined', text: ']', isCorrect: false },
        { id: 'opt-undefined', text: 'df.columns(', isCorrect: false },
        { id: 'opt-undefined', text: ', ', isCorrect: false },
        { id: 'opt-undefined', text: ')', isCorrect: false },
      ],
    },
    {
      id: 'q_pandas_3_auto_4',
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
      id: 'q_pandas_3_auto_5',
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
      id: 'q_pandas_3_auto_6',
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
      id: 'q_pandas_3_auto_7',
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
      id: 'q_pandas_3_auto_8',
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
      id: 'q_pandas_3_auto_9',
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
      id: 'q_pandas_3_auto_10',
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
