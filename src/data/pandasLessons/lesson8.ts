import { PandasLessonDefinition } from '../../types/pandasLesson';

export const lesson8: PandasLessonDefinition = {
  id: 'pandas-lesson-8',
  number: 8,
  slug: 'groupby-and-split-apply-combine',
  title: 'The GroupBy Engine: Split-Apply-Combine',
  shortDescription:
    'Master the Split-Apply-Combine paradigm. Group data by categorical variables and compute multi-metric aggregations with .agg().',
  estimatedMinutes: 30,
  learningObjectives: [
    'Understand the 3 phases of the Split-Apply-Combine paradigm',
    'Group tabular data by one or more categorical columns',
    'Compute standard group-level aggregations (.mean(), .sum(), .count())',
    'Apply custom multi-column aggregations using .agg()',
  ],
  prerequisites: ['Lesson 7: Summary Statistics & Aggregations'],
  sections: [
    {
      id: 'p8-1',
      title: 'The Split-Apply-Combine Pattern',
      content:
        'The GroupBy concept is one of the most powerful tools in data analytics. Coined by Hadley Wickham, it consists of 3 distinct stages:\n1. Split: The original DataFrame is partitioned into discrete groups based on unique keys in the grouping column(s).\n2. Apply: An aggregation function (mean, sum, count, std) is computed independently across each group partition.\n3. Combine: The individual group results are stitched back together into a clean, cohesive summary DataFrame.',
      codeExample: {
        code: `import pandas as pd

df = pd.read_csv("employees")

# Average salary and experience by department
dept_group = df.groupby("department")
print(dept_group.mean())`,
        explanation: 'groupby("department").mean() calculates averages for all numeric features by department.',
      },
    },
    {
      id: 'p8-2',
      title: 'Targeted Multi-Metric Aggregation with .agg()',
      content:
        'Instead of calculating the same metric across all columns, real-world reporting requires specific operations per column:\n- Total revenue (sum) and order volume (count)\n- Maximum salary and average experience\n\nThe .agg() method accepts a dictionary mapping column names to target aggregations:\ndf.groupby("department").agg({\n    "salary": ["mean", "max"],\n    "performance_rating": "mean"\n})',
      codeExample: {
        code: `import pandas as pd

df = pd.read_csv("ecommerce")

# Aggregate total quantity and average unit price per category
res = df.groupby("category").agg({
    "quantity": "sum",
    "unit_price": "mean"
})
print(res)`,
        explanation: '.agg() builds granular KPI reporting tables in a single operation.',
      },
    },
  ],
  exercises: [
    {
      id: 'p8-ex1',
      lessonId: 'pandas-lesson-8',
      order: 1,
      title: 'Average Salary and Experience by Department',
      objective:
        'Group "employees" by "department" and calculate the group means for numeric columns using .groupby("department").mean(). Print the resulting table.',
      initialCode: `import pandas as pd

df = pd.read_csv("employees")

# Group by department and compute means
dept_means = df.groupby("department").mean()
print(dept_means)`,
      solutionCode: `import pandas as pd

df = pd.read_csv("employees")

dept_means = df.groupby("department").mean()
print(dept_means)`,
      expectedOutput: `idx           department   salary    experience_years  performance_rating
Engineering   Engineering  107750    6.25              4.8               
Marketing     Marketing    68000     3.5               4.05              
Finance       Finance      85333.33  5.67              4.2               
HR            HR           58000     3                 4.3               `,
      hint: 'Call df.groupby("department").mean() and print the result.',
      explanation:
        'The output groups employees by department, calculating independent averages for salary, experience, and ratings.',
      quickChips: [
        'df.groupby("department").mean()',
        'df.groupby("department").count()',
      ],
    },
    {
      id: 'p8-ex2',
      lessonId: 'pandas-lesson-8',
      order: 2,
      title: 'Multi-Aggregation on Ecommerce Categories',
      objective:
        'Group "ecommerce" by "category" and use .agg() to compute total order volume ("quantity": "sum") and mean item price ("unit_price": "mean"). Print the aggregated DataFrame.',
      initialCode: `import pandas as pd

df = pd.read_csv("ecommerce")

# Group by category with specific aggregations
summary = df.groupby("category").agg({
    'quantity': 'sum',
    'unit_price': 'mean'
})
print(summary)`,
      solutionCode: `import pandas as pd

df = pd.read_csv("ecommerce")

summary = df.groupby("category").agg({
    'quantity': 'sum',
    'unit_price': 'mean'
})
print(summary)`,
      expectedOutput: `idx          category     quantity_sum  unit_price_mean
Electronics  Electronics  7             614.74         
Furniture    Furniture    3             349.75         
Apparel      Apparel      6             102.75         
Office       Office       15            24.75          `,
      hint: 'Pass {"quantity": "sum", "unit_price": "mean"} into df.groupby("category").agg(...).',
      explanation:
        'Multi-column aggregation provides instant executive summary metrics across categories.',
      quickChips: [
        'df.groupby("category").agg({"quantity": "sum", "unit_price": "mean"})',
      ],
    },
  ],
  quiz: [
        {
      id: 'p8-q1',
      question: 'What are the three steps in the Split-Apply-Combine pattern?',
      explanation: 'Split partitions rows, Apply computes operations, and Combine aggregates the output.',
      difficulty: 'intermediate',
      topicTag: 'pandas',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'Split data into groups, Apply an aggregation function to each group, Combine results into a new DataFrame', isCorrect: true },
        { id: 'opt-b', text: 'Sort rows, Filter outliers, Save to CSV', isCorrect: false },
        { id: 'opt-c', text: 'Convert to strings, Parse JSON, Output to HTML', isCorrect: false },
        { id: 'opt-d', text: 'Normalize numbers, Compute z-scores, Standardize', isCorrect: false },
      ],
    },
        {
      id: 'p8-q2',
      question: 'Which method on a GroupBy object allows defining different aggregation functions for different columns?',
      explanation: '.agg() takes a dictionary specifying exact operations per column.',
      difficulty: 'intermediate',
      topicTag: 'pandas',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: '.agg()', isCorrect: true },
        { id: 'opt-b', text: '.combine()', isCorrect: false },
        { id: 'opt-c', text: '.multi()', isCorrect: false },
        { id: 'opt-d', text: '.pivot()', isCorrect: false },
      ],
    },
        {
      id: 'p8-q3',
      question: 'Can you group by multiple columns simultaneously (e.g. region and department)?',
      explanation: 'Passing a list of columns partitions records by all unique combinations of those keys.',
      difficulty: 'intermediate',
      topicTag: 'pandas',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'Yes, by passing a list of column names: df.groupby([', isCorrect: true },
        { id: 'opt-b', text: ', ', isCorrect: false },
        { id: 'opt-c', text: '])', isCorrect: false },
        { id: 'opt-d', text: 'No, Pandas only supports 1 grouping column at a time', isCorrect: false },
        { id: 'opt-e', text: 'Only if all columns are boolean', isCorrect: false },
        { id: 'opt-undefined', text: 'Only when using SQL databases', isCorrect: false },
      ],
    },
  ],
};
