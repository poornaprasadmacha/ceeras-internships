import { PandasLessonDefinition } from '../../types/pandasLesson';

export const lesson12: PandasLessonDefinition = {
  id: 'pandas-lesson-12',
  number: 12,
  slug: 'end-to-end-eda-pipeline',
  title: 'End-to-End EDA & Business Pipelines',
  shortDescription:
    'Integrate all Pandas competencies into a complete end-to-end analytics pipeline: data ingestion, cleaning, feature engineering, cohort aggregations, and business KPI reporting.',
  estimatedMinutes: 35,
  learningObjectives: [
    'Synthesize end-to-end data pipelines from raw ingest to final KPI dashboard',
    'Perform multi-step data cleaning, imputation, and column reshaping',
    'Calculate critical business metrics: Total Gross Revenue, Average Order Value (AOV), and customer cohort spend',
    'Package reproducible analysis workflows for production deployment',
  ],
  prerequisites: [
    'Lesson 1-11: Complete Series, DataFrame, Filtering, GroupBy, Merging, and DateTime foundations',
  ],
  sections: [
    {
      id: 'p12-1',
      title: 'Architecting an End-to-End Analytics Pipeline',
      content:
        'A production analytics pipeline consists of sequential, deterministic transformations:\n\n1. Ingestion: Load raw transactional records and dimension lookups.\n2. Validation & Cleaning: Verify schemas, detect and impute null values, standardize text headers.\n3. Feature Engineering: Compute derived transaction metrics (line totals, net discounts, order day of week).\n4. Enrichment: Join transactions with customer tiers and location attributes.\n5. Aggregation: Group by cohorts (e.g., membership tier or product category) to compute executive KPIs.',
      codeExample: {
        code: `import pandas as pd

# 1. Ingestion
orders = pd.read_csv("ecommerce")
customers = pd.read_csv("customers")

# 2. Enrichment via Join
full_df = pd.merge(orders, customers, on="customer_id", how="inner")

# 3. Feature Engineering
records = full_df.to_dict('records')
totals = [round(r['unit_price'] * r['quantity'], 2) for r in records]
full_df = full_df.assign({'revenue': totals})

# 4. Cohort Aggregations
kpi = full_df.groupby("membership").agg({
    "revenue": "sum",
    "quantity": "sum"
})
print(kpi)`,
        explanation: 'The full analytics lifecycle executed smoothly in a few lines of declarative Pandas code.',
      },
    },
    {
      id: 'p12-2',
      title: 'Executive KPI Reporting',
      content:
        'Key Performance Indicators (KPIs) translate raw records into business decisions:\n- Total Gross Revenue: sum(revenue)\n- Average Order Value (AOV): mean(revenue)\n- High-Value Customer Share: Proportion of revenue driven by top tiers\n\nHaving mastered Pandas, you can now analyze, clean, and model any tabular dataset with speed and confidence.',
      codeExample: {
        code: `import pandas as pd

orders = pd.read_csv("ecommerce")
records = orders.to_dict('records')
totals = [r['unit_price'] * r['quantity'] for r in records]
orders = orders.assign({'revenue': totals})

total_rev = orders.get("revenue").sum()
aov = orders.get("revenue").mean()

print("Total Gross Revenue: $" + str(round(total_rev, 2)))
print("Average Order Value: $" + str(round(aov, 2)))`,
        explanation: 'Descriptive metrics provide vital business intelligence.',
      },
    },
  ],
  exercises: [
    {
      id: 'p12-ex1',
      lessonId: 'pandas-lesson-12',
      order: 1,
      title: 'Build Complete Revenue by Membership Pipeline',
      objective:
        'Execute a full pipeline on "ecommerce" and "customers":\n1. Merge orders with customers on "customer_id".\n2. Add a computed column "revenue" equal to unit_price * quantity.\n3. Group by "membership" and compute total revenue ("revenue": "sum"). Print the resulting KPI table.',
      initialCode: `import pandas as pd

orders = pd.read_csv("ecommerce")
customers = pd.read_csv("customers")

# Merge orders with customers
merged = pd.merge(orders, customers, on='customer_id', how='inner')

# Calculate revenue
records = merged.to_dict('records')
revs = [round(r['unit_price'] * r['quantity'], 2) for r in records]
merged = merged.assign({'revenue': revs})

# Group by membership tier
kpi = merged.groupby("membership").agg({'revenue': 'sum'})
print(kpi)`,
      solutionCode: `import pandas as pd

orders = pd.read_csv("ecommerce")
customers = pd.read_csv("customers")

merged = pd.merge(orders, customers, on='customer_id', how='inner')

records = merged.to_dict('records')
revs = [round(r['unit_price'] * r['quantity'], 2) for r in records]
merged = merged.assign({'revenue': revs})

kpi = merged.groupby("membership").agg({'revenue': 'sum'})
print(kpi)`,
      expectedOutput: `idx         membership  revenue_sum
Platinum    Platinum    1719.95    
Bronze      Bronze      480        
Gold        Gold        1904       
Silver      Silver      420        `,
      hint: 'Merge on customer_id, assign computed revenue, and call .groupby("membership").agg({"revenue": "sum"}).',
      explanation:
        'Gold and Platinum membership tiers drive over 75% of total gross revenue.',
      quickChips: [
        'pd.merge(orders, customers, on="customer_id", how="inner")',
        "merged.assign({'revenue': revs})",
        'merged.groupby("membership").agg({"revenue": "sum"})',
      ],
    },
    {
      id: 'p12-ex2',
      lessonId: 'pandas-lesson-12',
      order: 2,
      title: 'Executive Summary: Overall Gross Revenue and AOV',
      objective:
        'Compute overall Total Gross Revenue and Average Order Value (AOV) across all orders in "ecommerce". Add column "revenue" = unit_price * quantity, then print total revenue and AOV rounded to 2 decimals.',
      initialCode: `import pandas as pd

df = pd.read_csv("ecommerce")

records = df.to_dict('records')
revs = [round(r['unit_price'] * r['quantity'], 2) for r in records]
df = df.assign({'revenue': revs})

rev_series = df.get("revenue")
total_revenue = round(rev_series.sum(), 2)
aov = round(rev_series.mean(), 2)

print("Total Revenue:", total_revenue)
print("AOV:", aov)`,
      solutionCode: `import pandas as pd

df = pd.read_csv("ecommerce")

records = df.to_dict('records')
revs = [round(r['unit_price'] * r['quantity'], 2) for r in records]
df = df.assign({'revenue': revs})

rev_series = df.get("revenue")
total_revenue = round(rev_series.sum(), 2)
aov = round(rev_series.mean(), 2)

print("Total Revenue:", total_revenue)
print("AOV:", aov)`,
      expectedOutput: `Total Revenue: 4523.95
AOV: 452.4`,
      hint: 'Calculate revenue per line item, sum across all records for total revenue, and compute mean for AOV.',
      explanation:
        'Congratulations on completing the entire 12-lesson Pandas curriculum!',
      quickChips: [
        'round(rev_series.sum(), 2)',
        'round(rev_series.mean(), 2)',
      ],
    },
  ],
  quiz: [
        {
      id: 'p12-q1',
      question: 'What is the recommended sequence of stages in a robust data processing pipeline?',
      explanation: 'Ingesting, cleaning, feature engineering, and joining before aggregating ensures high quality metrics.',
      difficulty: 'intermediate',
      topicTag: 'pandas',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'Ingestion -> Validation & Imputation -> Feature Engineering -> Enrichment (Joins) -> Aggregation & Reporting', isCorrect: true },
        { id: 'opt-b', text: 'Plotting -> Deleting files -> Merging -> Ingestion', isCorrect: false },
        { id: 'opt-c', text: 'Model training -> Data ingestion -> Data cleaning', isCorrect: false },
        { id: 'opt-d', text: 'Exporting CSV -> Reading CSV -> Writing SQL', isCorrect: false },
      ],
    },
        {
      id: 'p12-q2',
      question: 'How is Average Order Value (AOV) calculated from transactional data?',
      explanation: 'AOV is the mean total value per completed customer order.',
      difficulty: 'intermediate',
      topicTag: 'pandas',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'Total gross revenue divided by the total number of orders (mean order revenue)', isCorrect: true },
        { id: 'opt-b', text: 'Total quantity multiplied by 100', isCorrect: false },
        { id: 'opt-c', text: 'The highest price item in the store', isCorrect: false },
        { id: 'opt-d', text: 'The median unit price of unsold inventory', isCorrect: false },
      ],
    },
        {
      id: 'p12-q3',
      question: 'Why is vectorization in Pandas vastly superior to writing standard Python for-loops over rows?',
      explanation: 'Vectorization leverages continuous C-level memory structures, avoiding Python object overhead and yielding massive speedups.',
      difficulty: 'intermediate',
      topicTag: 'pandas',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'Vectorized operations execute underlying loops in highly optimized C/Fortran code, running 50x-100x faster and using less memory', isCorrect: true },
        { id: 'opt-b', text: 'For-loops are illegal in Python 3', isCorrect: false },
        { id: 'opt-c', text: 'Vectorized code automatically converts all numbers to integers', isCorrect: false },
        { id: 'opt-d', text: 'There is no performance difference', isCorrect: false },
      ],
    },
    {
      id: 'q_pandas_12_auto_4',
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
      id: 'q_pandas_12_auto_5',
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
      id: 'q_pandas_12_auto_6',
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
      id: 'q_pandas_12_auto_7',
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
      id: 'q_pandas_12_auto_8',
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
      id: 'q_pandas_12_auto_9',
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
      id: 'q_pandas_12_auto_10',
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
