import { PandasLessonDefinition } from '../../types/pandasLesson';

export const lesson9: PandasLessonDefinition = {
  id: 'pandas-lesson-9',
  number: 9,
  slug: 'merging-joining-and-concatenation',
  title: 'Merging, Joining & Concatenation',
  shortDescription:
    'Combine multiple datasets using database-style joins with pd.merge() and stack DataFrames along rows or columns with pd.concat().',
  estimatedMinutes: 30,
  learningObjectives: [
    'Perform SQL-style joins (inner, left, right, outer) using pd.merge()',
    'Match records on single or multiple foreign keys',
    'Stack tabular datasets vertically or horizontally using pd.concat()',
    'Handle key name mismatches with left_on and right_on',
  ],
  prerequisites: ['Lesson 8: The GroupBy Engine'],
  sections: [
    {
      id: 'p9-1',
      title: 'Database-Style Joins with pd.merge',
      content:
        'In relational databases, entities are normalized into separate tables (e.g., Orders and Customers) linked by primary and foreign keys.\n\nPandas implements relational algebra through pd.merge():\n- how="inner": Retains only records where keys exist in both tables.\n- how="left": Retains all records from the left table, filling missing right attributes with null/NaN.\n- how="right": Retains all right records.\n- how="outer": Full union of both tables.',
      codeExample: {
        code: `import pandas as pd

orders = pd.read_csv("ecommerce")
customers = pd.read_csv("customers")

# Merge orders with customer profile data
merged = pd.merge(orders, customers, on="customer_id", how="inner")
print(merged.get(["order_id", "customer_name", "membership", "category", "unit_price"]).head(3))`,
        explanation: 'pd.merge combines columns from both datasets by matching customer_id values.',
      },
    },
    {
      id: 'p9-2',
      title: 'Concatenation with pd.concat',
      content:
        'When you have multiple tables with identical or overlapping schemas (e.g., quarterly sales or regional logs), use pd.concat():\n- axis=0 (default): Stacks tables vertically (row-wise union).\n- axis=1: Appends tables side-by-side (column-wise).\n- ignore_index=True: Resets the resulting row index sequentially.',
      codeExample: {
        code: `import pandas as pd

q1 = pd.DataFrame([['Jan', 12000], ['Feb', 15000]], columns=['month', 'revenue'])
q2 = pd.DataFrame([['Mar', 18000], ['Apr', 21000]], columns=['month', 'revenue'])

# Stack quarters vertically
full_year = pd.concat([q1, q2], axis=0)
print(full_year)`,
        explanation: 'concat stacks records from multiple sources into a single unified DataFrame.',
      },
    },
  ],
  exercises: [
    {
      id: 'p9-ex1',
      lessonId: 'pandas-lesson-9',
      order: 1,
      title: 'Join Ecommerce Orders with Customer Profiles',
      objective:
        'Merge the "ecommerce" orders with "customers" using customer_id as the join key with an inner join. Print the first 3 rows showing order_id, customer_name, membership, category, and unit_price.',
      initialCode: `import pandas as pd

orders = pd.read_csv("ecommerce")
customers = pd.read_csv("customers")

# Inner join on customer_id
joined = pd.merge(orders, customers, on='customer_id', how='inner')
print(joined.get(['order_id', 'customer_name', 'membership', 'category', 'unit_price']).head(3))`,
      solutionCode: `import pandas as pd

orders = pd.read_csv("ecommerce")
customers = pd.read_csv("customers")

joined = pd.merge(orders, customers, on='customer_id', how='inner')
print(joined.get(['order_id', 'customer_name', 'membership', 'category', 'unit_price']).head(3))`,
      expectedOutput: `idx   order_id  customer_name  membership  category     unit_price
0     101       Sarah Connor   Platinum    Electronics  899.99    
1     102       Tony Stark     Platinum    Furniture    249.5     
2     103       Sarah Connor   Platinum    Electronics  49.99     `,
      hint: 'Use pd.merge(orders, customers, on="customer_id", how="inner") and project the required columns.',
      explanation:
        'Relational joins combine transaction lines with customer tier metadata seamlessly.',
      quickChips: [
        'pd.merge(orders, customers, on="customer_id", how="inner")',
        "joined.get(['order_id', 'customer_name', 'membership'])",
      ],
    },
    {
      id: 'p9-ex2',
      lessonId: 'pandas-lesson-9',
      order: 2,
      title: 'Concatenate Regional Sales Batches',
      objective:
        'Combine the provided east_df and west_df regional sales batches vertically into a single DataFrame using pd.concat(). Print the concatenated table and its total row count.',
      initialCode: `import pandas as pd

east_df = pd.DataFrame([
    ['E-1', 'New York', 45000],
    ['E-2', 'Boston', 32000]
], columns=['store_id', 'city', 'sales'])

west_df = pd.DataFrame([
    ['W-1', 'San Francisco', 58000],
    ['W-2', 'Seattle', 41000]
], columns=['store_id', 'city', 'sales'])

# Stack both regions
combined = pd.concat([east_df, west_df], axis=0)
print(combined)
print("Total stores:", combined.shape[0])`,
      solutionCode: `import pandas as pd

east_df = pd.DataFrame([
    ['E-1', 'New York', 45000],
    ['E-2', 'Boston', 32000]
], columns=['store_id', 'city', 'sales'])

west_df = pd.DataFrame([
    ['W-1', 'San Francisco', 58000],
    ['W-2', 'Seattle', 41000]
], columns=['store_id', 'city', 'sales'])

combined = pd.concat([east_df, west_df], axis=0)
print(combined)
print("Total stores:", combined.shape[0])`,
      expectedOutput: `idx   store_id  city           sales 
0     E-1       New York       45000 
1     E-2       Boston         32000 
0     W-1       San Francisco  58000 
1     W-2       Seattle        41000 
Total stores: 4`,
      hint: 'Call pd.concat([east_df, west_df], axis=0) and print combined.shape[0].',
      explanation:
        'pd.concat vertically unites records matching common column headers across data partitions.',
      quickChips: [
        'pd.concat([east_df, west_df], axis=0)',
        'combined.shape[0]',
      ],
    },
  ],
  quiz: [
        {
      id: 'p9-q1',
      question: 'Which join type preserves all records from the left DataFrame even if there are no matching keys in the right DataFrame?',
      explanation: 'A left join retains all left records, filling absent right columns with nulls.',
      difficulty: 'intermediate',
      topicTag: 'pandas',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'Left Join (how=', isCorrect: true },
        { id: 'opt-b', text: ')', isCorrect: false },
        { id: 'opt-c', text: 'Inner Join (how=', isCorrect: false },
        { id: 'opt-d', text: ')', isCorrect: false },
        { id: 'opt-e', text: 'Cross Join', isCorrect: false },
        { id: 'opt-undefined', text: 'Right Join', isCorrect: false },
      ],
    },
        {
      id: 'p9-q2',
      question: 'What parameter in pd.concat specifies whether to stack rows (vertically) or columns (horizontally)?',
      explanation: 'axis=0 concatenates rows vertically; axis=1 concatenates columns horizontally.',
      difficulty: 'intermediate',
      topicTag: 'pandas',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'axis (0 for rows, 1 for columns)', isCorrect: true },
        { id: 'opt-b', text: 'direction', isCorrect: false },
        { id: 'opt-c', text: 'orientation', isCorrect: false },
        { id: 'opt-d', text: 'stack_mode', isCorrect: false },
      ],
    },
        {
      id: 'p9-q3',
      question: 'When column names differ between two tables during a merge (e.g. "emp_id" vs "employee_id"), what arguments should you specify?',
      explanation: 'left_on and right_on map distinct column identifiers across datasets.',
      difficulty: 'intermediate',
      topicTag: 'pandas',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'left_on="emp_id" and right_on="employee_id"', isCorrect: true },
        { id: 'opt-b', text: 'keys=("emp_id", "employee_id")', isCorrect: false },
        { id: 'opt-c', text: 'join_cols=["emp_id", "employee_id"]', isCorrect: false },
        { id: 'opt-d', text: 'match_keys="all"', isCorrect: false },
      ],
    },
  ],
};
