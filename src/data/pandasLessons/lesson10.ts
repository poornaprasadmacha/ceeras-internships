import { PandasLessonDefinition } from '../../types/pandasLesson';

export const lesson10: PandasLessonDefinition = {
  id: 'pandas-lesson-10',
  number: 10,
  slug: 'pivot-tables-crosstabs-and-reshaping',
  title: 'Pivot Tables, Crosstabs & Reshaping',
  shortDescription:
    'Transform data multidimensionally using pivot tables, compute contingency frequencies with pd.crosstab(), and melt wide tables into long format.',
  estimatedMinutes: 30,
  learningObjectives: [
    'Construct 2D summary matrix grids using df.pivot_table()',
    'Generate bivariate frequency distributions using pd.crosstab()',
    'Unpivot wide DataFrames into tidy long format using df.melt()',
    'Compare long vs wide data representations for analytics and plotting',
  ],
  prerequisites: ['Lesson 9: Merging & Joining'],
  sections: [
    {
      id: 'p10-1',
      title: 'Multidimensional Aggregations: Pivot Tables',
      content:
        'A pivot table reorganizes tabular data into an executive 2D grid:\n- index: Dimension plotted along the vertical rows\n- columns: Dimension plotted along the horizontal columns\n- values: Numeric metric being aggregated\n- aggfunc: Function applied (mean, sum, count)\n\nThis format is standard in financial reporting and spreadsheet executive dashboards.',
      codeExample: {
        code: `import pandas as pd

df = pd.read_csv("employees")

# Average salary by department across office cities
pivot = df.pivot_table({
    "index": "department",
    "columns": "office_city",
    "values": "salary",
    "aggfunc": "mean"
})
print(pivot)`,
        explanation: 'pivot_table reorganizes records into a clean cross-sectional grid.',
      },
    },
    {
      id: 'p10-2',
      title: 'Contingency Frequencies with pd.crosstab',
      content:
        'When analyzing relationships between two categorical variables (e.g. Passenger Class vs Survival in Titanic), pd.crosstab() computes the frequency matrix directly without requiring a numeric value column.',
      codeExample: {
        code: `import pandas as pd

df = pd.read_csv("titanic")

# Passenger class vs Survival contingency table
ct = pd.crosstab(df.get("pclass"), df.get("survived"))
print("Survival frequency by Class:")
print(ct)`,
        explanation: 'crosstab computes counts across intersections of two categorical factors.',
      },
    },
  ],
  exercises: [
    {
      id: 'p10-ex1',
      lessonId: 'pandas-lesson-10',
      order: 1,
      title: 'Compute Titanic Survival Contingency Table',
      objective:
        'From "titanic", use pd.crosstab() to compute the frequency table between "pclass" (rows) and "survived" (columns). Print the contingency table.',
      initialCode: `import pandas as pd

df = pd.read_csv("titanic")

# Compute crosstab of pclass vs survived
ct = pd.crosstab(df.get("pclass"), df.get("survived"))
print(ct)`,
      solutionCode: `import pandas as pd

df = pd.read_csv("titanic")

ct = pd.crosstab(df.get("pclass"), df.get("survived"))
print(ct)`,
      expectedOutput: `idx   0     1   
1     0     2   
2     0     1   
3     4     3   `,
      hint: 'Pass df.get("pclass") and df.get("survived") to pd.crosstab() and print the result.',
      explanation:
        'Cross-tabulation reveals how survival outcomes were distributed across passenger classes.',
      quickChips: [
        'pd.crosstab(df.get("pclass"), df.get("survived"))',
      ],
    },
    {
      id: 'p10-ex2',
      lessonId: 'pandas-lesson-10',
      order: 2,
      title: 'Build Department Salary Pivot Table',
      objective:
        'Using "employees", construct a pivot table showing mean salary with "department" as index and "office_city" as columns. Print the resulting pivot table.',
      initialCode: `import pandas as pd

df = pd.read_csv("employees")

# Pivot table: department x office_city
pivot = df.pivot_table({
    'index': 'department',
    'columns': 'office_city',
    'values': 'salary',
    'aggfunc': 'mean'
})
print(pivot)`,
      solutionCode: `import pandas as pd

df = pd.read_csv("employees")

pivot = df.pivot_table({
    'index': 'department',
    'columns': 'office_city',
    'values': 'salary',
    'aggfunc': 'mean'
})
print(pivot)`,
      expectedOutput: `idx           Austin  Chicago  New York  San Francisco  Seattle
Engineering   NaN     NaN      NaN       93000          122500 
Finance       NaN     82000    92000     NaN            NaN    
HR            58000   NaN      NaN       NaN            NaN    
Marketing     72000   NaN      64000     NaN            NaN    `,
      hint: 'Pass index="department", columns="office_city", values="salary", and aggfunc="mean" to df.pivot_table().',
      explanation:
        'Cells with no matching employees in that city/department combination naturally display as NaN.',
      quickChips: [
        "df.pivot_table({'index': 'department', 'columns': 'office_city', 'values': 'salary', 'aggfunc': 'mean'})",
      ],
    },
  ],
  quiz: [
        {
      id: 'p10-q1',
      question: 'What is the purpose of df.pivot_table() in Pandas?',
      explanation: 'Pivot tables summarize values across row and column intersections.',
      difficulty: 'intermediate',
      topicTag: 'pandas',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'To aggregate numeric values into a 2D grid indexed by one dimension and columnarized by another', isCorrect: true },
        { id: 'opt-b', text: 'To rotate a 3D image', isCorrect: false },
        { id: 'opt-c', text: 'To export data to SQLite', isCorrect: false },
        { id: 'opt-d', text: 'To filter out duplicate rows', isCorrect: false },
      ],
    },
        {
      id: 'p10-q2',
      question: 'Which function is specifically designed to calculate bivariate frequency counts for categorical variables?',
      explanation: 'pd.crosstab() generates contingency tables showing joint category frequencies.',
      difficulty: 'intermediate',
      topicTag: 'pandas',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'pd.crosstab()', isCorrect: true },
        { id: 'opt-b', text: 'pd.frequency()', isCorrect: false },
        { id: 'opt-c', text: 'pd.counter()', isCorrect: false },
        { id: 'opt-d', text: 'pd.matrix_count()', isCorrect: false },
      ],
    },
        {
      id: 'p10-q3',
      question: 'What is the inverse operation of pivoting (converting wide columns back into key-value rows)?',
      explanation: 'df.melt() unpivots a DataFrame from wide format to tidy long format.',
      difficulty: 'intermediate',
      topicTag: 'pandas',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'Melting (df.melt())', isCorrect: true },
        { id: 'opt-b', text: 'Freezing', isCorrect: false },
        { id: 'opt-c', text: 'Filtering', isCorrect: false },
        { id: 'opt-d', text: 'Concatenating', isCorrect: false },
      ],
    },
  ],
};
