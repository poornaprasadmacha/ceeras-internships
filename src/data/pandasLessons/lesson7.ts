import { PandasLessonDefinition } from '../../types/pandasLesson';

export const lesson7: PandasLessonDefinition = {
  id: 'pandas-lesson-7',
  number: 7,
  slug: 'summary-statistics-and-aggregations',
  title: 'Descriptive Statistics & Aggregations',
  shortDescription:
    'Compute univariate summary statistics, examine categorical distributions with .value_counts(), and generate comprehensive statistical tables with .describe().',
  estimatedMinutes: 25,
  learningObjectives: [
    'Calculate central tendency and dispersion metrics (.mean, .median, .std, .min, .max)',
    'Analyze category frequency and relative percentages with .value_counts()',
    'Generate comprehensive 5-number statistical summaries with .describe()',
    'Evaluate unique cardinalities with .nunique()',
  ],
  prerequisites: ['Lesson 6: Handling Missing Data'],
  sections: [
    {
      id: 'p7-1',
      title: 'Descriptive Metrics: Mean, Median, and Std',
      content:
        'Understanding numeric distributions is vital for exploratory data analysis:\n- .mean(): Arithmetic average; sensitive to outliers.\n- .median(): 50th percentile midpoint; robust against extreme values.\n- .std(): Standard deviation measuring dispersion around the mean.\n- .min() / .max(): Boundary range.\n\nPandas skips missing values automatically when computing these aggregations.',
      codeExample: {
        code: `import pandas as pd

df = pd.read_csv("employees")
salary = df.get("salary")

print("Mean salary:", salary.mean())
print("Median salary:", salary.median())
print("Std Dev:", salary.std())
print("Range:", salary.min(), "to", salary.max())`,
        explanation: 'Descriptive metrics provide immediate insight into spread and skewness.',
      },
    },
    {
      id: 'p7-2',
      title: 'Categorical Distributions & .describe()',
      content:
        'For categorical columns, .value_counts() tabulates occurrences of each distinct label. Passing normalize=True yields relative percentages.\n\nTo view all statistics at once across all numeric features, df.describe() creates a standard summary table with count, mean, std, min, 25%, 50%, 75%, and max.',
      codeExample: {
        code: `import pandas as pd

df = pd.read_csv("ecommerce")

# Distribution of categories
print("Category counts:")
print(df.get("category").value_counts())

# Full descriptive table
print(df.describe())`,
        explanation: 'describe() quickly highlights outliers, ranges, and sample counts.',
      },
    },
  ],
  exercises: [
    {
      id: 'p7-ex1',
      lessonId: 'pandas-lesson-7',
      order: 1,
      title: 'Inspect Numeric Distribution of Employees',
      objective:
        'Call .describe() on "employees" to generate the 8-row statistical summary for salary, experience_years, and performance_rating. Print the describe table.',
      initialCode: `import pandas as pd

df = pd.read_csv("employees")

# Generate summary table
stats = df.describe()
print(stats)`,
      solutionCode: `import pandas as pd

df = pd.read_csv("employees")

stats = df.describe()
print(stats)`,
      expectedOutput: `idx   salary    experience_years  performance_rating
count 10        10                10                
mean  88100     5.2               4.52              
std   22786.20  2.39              0.38              
min   58000     2                 3.9               
25%   72000     3                 4.1               
50%   85000     5                 4.5               
75%   98000     7                 4.8               
max   130000    10                4.9               `,
      hint: 'Call df.describe() and print the result directly.',
      explanation:
        'describe() summarizes counts, means, quartiles, and boundaries in one unified matrix.',
      quickChips: ['df.describe()', 'df.get("salary").mean()'],
    },
    {
      id: 'p7-ex2',
      lessonId: 'pandas-lesson-7',
      order: 2,
      title: 'Frequency Analysis of Ecommerce Order Categories',
      objective:
        'From "ecommerce", extract the "category" column and call .value_counts() to determine order frequency by category. Print the resulting Series.',
      initialCode: `import pandas as pd

df = pd.read_csv("ecommerce")

# Compute category frequency
cat_counts = df.get("category").value_counts()
print(cat_counts)`,
      solutionCode: `import pandas as pd

df = pd.read_csv("ecommerce")

cat_counts = df.get("category").value_counts()
print(cat_counts)`,
      expectedOutput: `Electronics 4
Furniture 2
Apparel 2
Office 2
Name: category, dtype: int64`,
      hint: 'Extract the category column with df.get("category") and call .value_counts().',
      explanation:
        'value_counts ranks categories from most frequent to least frequent, essential for cohort analysis.',
      quickChips: [
        'df.get("category").value_counts()',
        'df.get("category").value_counts(True)',
      ],
    },
  ],
  quiz: [
        {
      id: 'p7-q1',
      question: 'Which method provides an instant 8-row summary (count, mean, std, percentiles) for numeric columns?',
      explanation: 'df.describe() generates the standard 8-row descriptive statistics table.',
      difficulty: 'intermediate',
      topicTag: 'pandas',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'df.describe()', isCorrect: true },
        { id: 'opt-b', text: 'df.summary()', isCorrect: false },
        { id: 'opt-c', text: 'df.stats()', isCorrect: false },
        { id: 'opt-d', text: 'df.aggregate_all()', isCorrect: false },
      ],
    },
        {
      id: 'p7-q2',
      question: 'How do you obtain the percentage proportions of categories instead of raw counts with .value_counts()?',
      explanation: '.value_counts(normalize=True) converts counts into fractions summing to 1.0.',
      difficulty: 'intermediate',
      topicTag: 'pandas',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'Pass normalize=True to .value_counts(normalize=True)', isCorrect: true },
        { id: 'opt-b', text: 'Pass percent=True', isCorrect: false },
        { id: 'opt-c', text: 'Divide by 100 manually', isCorrect: false },
        { id: 'opt-d', text: 'Use .value_percents()', isCorrect: false },
      ],
    },
        {
      id: 'p7-q3',
      question: 'Which aggregation is generally preferred over the mean when analyzing skewed data (like income or house prices) with heavy outliers?',
      explanation: 'The median (50th percentile) is resistant to extreme outliers.',
      difficulty: 'intermediate',
      topicTag: 'pandas',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'Median', isCorrect: true },
        { id: 'opt-b', text: 'Mean', isCorrect: false },
        { id: 'opt-c', text: 'Variance', isCorrect: false },
        { id: 'opt-d', text: 'Maximum', isCorrect: false },
      ],
    },
  ],
};
