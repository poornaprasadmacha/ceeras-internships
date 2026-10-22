import { PandasLessonDefinition } from '../../types/pandasLesson';

export const lesson6: PandasLessonDefinition = {
  id: 'pandas-lesson-6',
  number: 6,
  slug: 'handling-missing-data-cleaning',
  title: 'Handling Missing Data & Imputation',
  shortDescription:
    'Detect missing null values with .isna(), drop incomplete records with .dropna(), and impute missing data using .fillna().',
  estimatedMinutes: 25,
  learningObjectives: [
    'Identify null, NaN, and undefined values using .isna() and .isnull()',
    'Calculate missing value counts per column',
    'Drop incomplete rows selectively using .dropna(subset=...)',
    'Impute missing values with statistical measures (mean, median, constants) using .fillna()',
  ],
  prerequisites: ['Lesson 5: Modifying DataFrames'],
  sections: [
    {
      id: 'p6-1',
      title: 'Detecting Null and NaN Values',
      content:
        'Missing data is omnipresent in real-world pipelines: sensor dropouts, optional user profile inputs, or legacy database merges.\n\nPandas treats missing values as NaN (Not a Number) or None.\n- df.isna() / df.isnull(): Returns a boolean mask of identical shape where True indicates missing data.\n- df.get("col").count(): Returns the number of non-null records.\n\nRunning checks across columns immediately reveals which features require imputation before model training.',
      codeExample: {
        code: `import pandas as pd

df = pd.read_csv("titanic")
print("Missing values in Age column:")
age_series = df.get("age")
null_count = len(age_series.values) - age_series.count()
print("Null count:", null_count)`,
        explanation: 'Comparing total length with count() exposes how many nulls exist.',
      },
    },
    {
      id: 'p6-2',
      title: 'Dropping vs Imputing Missing Values',
      content:
        'You have two primary strategies when dealing with missing data:\n1. Dropping: When a record cannot be trusted without a primary key:\n   df.dropna(subset=["critical_column"])\n\n2. Imputing: Replacing nulls with constants or statistics so rows are retained:\n   mean_val = df.get("age").mean()\n   df = df.fillna({"age": mean_val})\n\nImputation ensures you do not discard entire observations when only one feature is absent.',
      codeExample: {
        code: `import pandas as pd

df = pd.read_csv("titanic")

# Impute missing ages with the median age
median_age = df.get("age").median()
print("Median age:", median_age)

cleaned = df.fillna({"age": median_age})
print(cleaned.get(["passenger_id", "name", "age"]).head(6))`,
        explanation: 'fillna replaces nulls without discarding passengers.',
      },
    },
  ],
  exercises: [
    {
      id: 'p6-ex1',
      lessonId: 'pandas-lesson-6',
      order: 1,
      title: 'Count Missing Age Values in Titanic',
      objective:
        'From "titanic", count the number of missing values in the "age" column. Print the non-null count and the missing count.',
      initialCode: `import pandas as pd

df = pd.read_csv("titanic")
age_col = df.get("age")

total_rows = len(age_col.values)
valid_count = age_col.count()
missing_count = total_rows - valid_count

print("Valid ages:", valid_count)
print("Missing ages:", missing_count)`,
      solutionCode: `import pandas as pd

df = pd.read_csv("titanic")
age_col = df.get("age")

total_rows = len(age_col.values)
valid_count = age_col.count()
missing_count = total_rows - valid_count

print("Valid ages:", valid_count)
print("Missing ages:", missing_count)`,
      expectedOutput: `Valid ages: 9
Missing ages: 1`,
      hint: 'len(age_col.values) is the total rows; age_col.count() is non-null rows.',
      explanation:
        'In the 10-row Titanic sample, passenger 6 (James Moran) has a missing age.',
      quickChips: ['age_col.count()', 'len(age_col.values) - age_col.count()'],
    },
    {
      id: 'p6-ex2',
      lessonId: 'pandas-lesson-6',
      order: 2,
      title: 'Impute Missing Age with Average',
      objective:
        'Impute missing values in "titanic" by filling nulls in the "age" column with the mean age (rounded to 1 decimal place). Print row index 5 to verify the filled value.',
      initialCode: `import pandas as pd

df = pd.read_csv("titanic")
mean_age = round(df.get("age").mean(), 1)

df_filled = df.fillna({'age': mean_age})
print("Imputed mean age:", mean_age)
print(df_filled.iloc(5, [0, 3, 5]))`,
      solutionCode: `import pandas as pd

df = pd.read_csv("titanic")
mean_age = round(df.get("age").mean(), 1)

df_filled = df.fillna({'age': mean_age})
print("Imputed mean age:", mean_age)
print(df_filled.iloc(5, [0, 3, 5]))`,
      expectedOutput: `Imputed mean age: 24.8
idx   passenger_id  name               age   
5     6             Moran, Mr. James   24.8  `,
      hint: 'Compute mean_age with round(df.get("age").mean(), 1) and pass to df.fillna({"age": mean_age}).',
      explanation:
        'Mean imputation fills in unobserved values smoothly, preserving row count for downstream models.',
      quickChips: [
        'df.get("age").mean()',
        "df.fillna({'age': mean_age})",
        'df_filled.iloc(5, [0, 3, 5])',
      ],
    },
  ],
  quiz: [
        {
      id: 'p6-q1',
      question: 'Which method returns True for every cell that contains a missing value?',
      explanation: 'df.isna() and df.isnull() are aliases that identify missing values.',
      difficulty: 'intermediate',
      topicTag: 'pandas',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'df.isna() or df.isnull()', isCorrect: true },
        { id: 'opt-b', text: 'df.empty()', isCorrect: false },
        { id: 'opt-c', text: 'df.void()', isCorrect: false },
        { id: 'opt-d', text: 'df.zero()', isCorrect: false },
      ],
    },
        {
      id: 'p6-q2',
      question: 'What is the risk of calling df.dropna() without specifying a subset?',
      explanation: 'Default dropna() discards any observation with even one missing attribute.',
      difficulty: 'intermediate',
      topicTag: 'pandas',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'It drops every row that has even a single missing value across any column, potentially discarding too much data', isCorrect: true },
        { id: 'opt-b', text: 'It converts all numbers to strings', isCorrect: false },
        { id: 'opt-c', text: 'It permanently deletes files on the disk', isCorrect: false },
        { id: 'opt-d', text: 'It converts all data to lowercase', isCorrect: false },
      ],
    },
        {
      id: 'p6-q3',
      question: 'What method is used to substitute missing values with a specified number or statistic?',
      explanation: 'df.fillna() replaces null elements with given constants or dictionary mappings.',
      difficulty: 'intermediate',
      topicTag: 'pandas',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'df.fillna()', isCorrect: true },
        { id: 'opt-b', text: 'df.replace_empty()', isCorrect: false },
        { id: 'opt-c', text: 'df.impute()', isCorrect: false },
        { id: 'opt-d', text: 'df.patch()', isCorrect: false },
      ],
    },
    {
      id: 'q_pandas_6_auto_4',
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
      id: 'q_pandas_6_auto_5',
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
      id: 'q_pandas_6_auto_6',
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
      id: 'q_pandas_6_auto_7',
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
      id: 'q_pandas_6_auto_8',
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
      id: 'q_pandas_6_auto_9',
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
      id: 'q_pandas_6_auto_10',
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
