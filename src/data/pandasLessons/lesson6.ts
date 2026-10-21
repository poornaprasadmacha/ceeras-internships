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
  ],
};
