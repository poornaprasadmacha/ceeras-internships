import { PandasLessonDefinition } from '../../types/pandasLesson';

export const lesson5: PandasLessonDefinition = {
  id: 'pandas-lesson-5',
  number: 5,
  slug: 'modifying-dataframes-add-drop-rename',
  title: 'DataFrame Mutation: Add, Drop & Rename',
  shortDescription:
    'Derive new computed columns with vectorized arithmetic, drop unneeded dimensions, rename headers, and manipulate indices.',
  estimatedMinutes: 25,
  learningObjectives: [
    'Add derived feature columns using vectorized arithmetic operations',
    'Drop columns and rows using .drop()',
    'Rename column headers and row labels with .rename()',
    'Set custom index columns using .set_index() and revert them with .reset_index()',
  ],
  prerequisites: ['Lesson 4: Boolean Indexing & Filtering'],
  sections: [
    {
      id: 'p5-1',
      title: 'Adding Computed Columns',
      content:
        'In data pipelines, feature engineering involves calculating new columns from existing ones:\n\nFor example, calculating line-item total:\ndf["line_total"] = df["price"] * df["quantity"]\n\nOr using df.assign():\ndf = df.assign(total_revenue = lambda d: d["unit_price"] * d["quantity"])\n\nBecause Pandas operations are vectorized, operations run concurrently without explicit Python for-loops.',
      codeExample: {
        code: `import pandas as pd

df = pd.read_csv("ecommerce")

# Calculate line total
df = df.assign({
    'line_total': [r.unit_price * r.quantity for r in df.to_dict('records')]
})

print(df.get(['order_id', 'unit_price', 'quantity', 'line_total']).head(3))`,
        explanation: 'assign() computes and appends new columns while returning a clean transformed DataFrame.',
      },
    },
    {
      id: 'p5-2',
      title: 'Dropping, Renaming & Index Management',
      content:
        'Cleaning data requires pruning irrelevant columns and standardizing headers:\n- df.drop(columns=["unneeded_col"]): Drops one or more columns.\n- df.rename(columns={"old": "new"}): Changes column header names.\n- df.set_index("emp_id"): Designates a unique identifier as row index.\n- df.reset_index(drop=True): Resets back to 0-indexed integers.',
      codeExample: {
        code: `import pandas as pd

df = pd.read_csv("employees")

# Rename columns
df = df.rename({
    'columns': {'name': 'employee_name', 'salary': 'annual_salary'}
})

# Drop rating column
df = df.drop({'columns': ['performance_rating']})
print(df.head(2))`,
        explanation: 'drop() and rename() transform the schema while keeping the underlying dataset clean.',
      },
    },
  ],
  exercises: [
    {
      id: 'p5-ex1',
      lessonId: 'pandas-lesson-5',
      order: 1,
      title: 'Calculate Order Gross Amount',
      objective:
        'Using "ecommerce", add a new column "gross_total" equal to unit_price * quantity for each order. Print the first 3 rows showing order_id, unit_price, quantity, and gross_total.',
      initialCode: `import pandas as pd

df = pd.read_csv("ecommerce")

# Add gross_total column
records = df.to_dict('records')
gross_totals = [round(r['unit_price'] * r['quantity'], 2) for r in records]

df = df.assign({'gross_total': gross_totals})
print(df.get(['order_id', 'unit_price', 'quantity', 'gross_total']).head(3))`,
      solutionCode: `import pandas as pd

df = pd.read_csv("ecommerce")

records = df.to_dict('records')
gross_totals = [round(r['unit_price'] * r['quantity'], 2) for r in records]

df = df.assign({'gross_total': gross_totals})
print(df.get(['order_id', 'unit_price', 'quantity', 'gross_total']).head(3))`,
      expectedOutput: `idx   order_id  unit_price  quantity  gross_total
0     101       899.99      1         899.99     
1     102       249.5       2         499        
2     103       49.99       3         149.97     `,
      hint: 'Multiply unit_price by quantity for each record and pass it to df.assign({"gross_total": ...}).',
      explanation:
        'Vectorized column assignment enables rapid feature creation for analytics and business reporting.',
      quickChips: [
        "df.assign({'gross_total': gross_totals})",
        "df.get(['order_id', 'unit_price', 'quantity', 'gross_total'])",
      ],
    },
    {
      id: 'p5-ex2',
      lessonId: 'pandas-lesson-5',
      order: 2,
      title: 'Rename and Drop Employee Columns',
      objective:
        'In "employees", rename "department" to "team", and drop "experience_years". Print the first 3 rows of the modified DataFrame.',
      initialCode: `import pandas as pd

df = pd.read_csv("employees")

# Rename department -> team
df = df.rename({'columns': {'department': 'team'}})

# Drop experience_years
df = df.drop({'columns': ['experience_years']})

print(df.head(3))`,
      solutionCode: `import pandas as pd

df = pd.read_csv("employees")

df = df.rename({'columns': {'department': 'team'}})
df = df.drop({'columns': ['experience_years']})

print(df.head(3))`,
      expectedOutput: `idx   emp_id  name           team         salary  performance_rating  office_city  
0     1       Alice Smith    Engineering  98000   4.8                 San Francisco
1     2       Bob Jones      Marketing    64000   4.2                 New York     
2     3       Charlie Brown  Engineering  115000  4.9                 Seattle      `,
      hint: 'Use df.rename({"columns": {"department": "team"}}) and df.drop({"columns": ["experience_years"]}).',
      explanation:
        'Schema reshaping operations allow teams to normalize column vocabularies and remove sensitive or redundant data.',
      quickChips: [
        "df.rename({'columns': {'department': 'team'}})",
        "df.drop({'columns': ['experience_years']})",
      ],
    },
  ],
  quiz: [
        {
      id: 'p5-q1',
      question: 'Which method is used to remove specified columns from a DataFrame?',
      explanation: 'df.drop(columns=[...]) removes specified columns.',
      difficulty: 'intermediate',
      topicTag: 'pandas',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'df.drop()', isCorrect: true },
        { id: 'opt-b', text: 'df.remove()', isCorrect: false },
        { id: 'opt-c', text: 'df.delete()', isCorrect: false },
        { id: 'opt-d', text: 'df.pop_column()', isCorrect: false },
      ],
    },
        {
      id: 'p5-q2',
      question: 'How do you rename a column from "old_col" to "new_col"?',
      explanation: 'df.rename(columns={...}) accepts a dictionary mapping old names to new names.',
      difficulty: 'intermediate',
      topicTag: 'pandas',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'df.rename(columns={', isCorrect: true },
        { id: 'opt-b', text: ': ', isCorrect: false },
        { id: 'opt-c', text: '})', isCorrect: false },
        { id: 'opt-d', text: 'df.change_name(', isCorrect: false },
        { id: 'opt-e', text: ', ', isCorrect: false },
        { id: 'opt-undefined', text: ')', isCorrect: false },
        { id: 'opt-undefined', text: 'df.columns.replace(', isCorrect: false },
        { id: 'opt-undefined', text: ', ', isCorrect: false },
        { id: 'opt-undefined', text: ')', isCorrect: false },
        { id: 'opt-undefined', text: 'df.set_column_title(', isCorrect: false },
        { id: 'opt-undefined', text: ', ', isCorrect: false },
        { id: 'opt-undefined', text: ')', isCorrect: false },
      ],
    },
        {
      id: 'p5-q3',
      question: 'What does df.reset_index(drop=True) do?',
      explanation: 'reset_index(drop=True) restores the default integer index without keeping the old index as a column.',
      difficulty: 'intermediate',
      topicTag: 'pandas',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'Resets the row index to standard 0, 1, 2... and discards the old index', isCorrect: true },
        { id: 'opt-b', text: 'Deletes the first row of data', isCorrect: false },
        { id: 'opt-c', text: 'Sorts the table in reverse chronological order', isCorrect: false },
        { id: 'opt-d', text: 'Drops all columns that have null values', isCorrect: false },
      ],
    },
    {
      id: 'q_pandas_5_auto_4',
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
      id: 'q_pandas_5_auto_5',
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
      id: 'q_pandas_5_auto_6',
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
      id: 'q_pandas_5_auto_7',
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
      id: 'q_pandas_5_auto_8',
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
      id: 'q_pandas_5_auto_9',
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
      id: 'q_pandas_5_auto_10',
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
