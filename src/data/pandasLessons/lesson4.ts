import { PandasLessonDefinition } from '../../types/pandasLesson';

export const lesson4: PandasLessonDefinition = {
  id: 'pandas-lesson-4',
  number: 4,
  slug: 'boolean-indexing-and-conditional-filtering',
  title: 'Boolean Indexing & Filtering',
  shortDescription:
    'Filter rows conditionally using boolean masks, compound bitwise operators (&, |), and query expressions.',
  estimatedMinutes: 25,
  learningObjectives: [
    'Create boolean Series masks based on comparisons (>, <, ==)',
    'Combine multiple conditions using bitwise & (AND), | (OR), and ~ (NOT)',
    'Apply predicate filtering with df.filter() and express conditions with df.query()',
    'Filter for categorical membership using .isin()',
  ],
  prerequisites: ['Lesson 3: Selection & Indexing'],
  sections: [
    {
      id: 'p4-1',
      title: 'Boolean Masks and Bitwise Operators',
      content:
        'Filtering tabular data in Pandas relies on boolean masks: Series arrays of true/false values.\n\nWhen evaluating conditions in Pandas:\n- Always wrap each comparison in parentheses: (df["salary"] > 70000)\n- Use bitwise & instead of "and"\n- Use bitwise | instead of "or"\n- Use bitwise ~ instead of "not"\n\nThis is because standard Python keywords evaluate the whole truthiness of the container, while bitwise operators perform element-by-element vector evaluations.',
      codeExample: {
        code: `import pandas as pd

df = pd.read_csv("employees")

# Employees in Engineering earning more than 90,000
high_tech = df.filter(lambda row: row.department == 'Engineering' and row.salary > 90000)
print(high_tech.get(['name', 'department', 'salary']))`,
        explanation: 'Predicate filtering evaluates each record against relational conditions.',
      },
    },
    {
      id: 'p4-2',
      title: 'Declarative Filtering with df.query',
      content:
        'Pandas provides the .query() method, allowing you to write expressive string expressions where column names are referenced directly without repetitive df["col"] syntax.\n\nFor example:\ndf.query("salary > 80000 and office_city == \'San Francisco\'")',
      codeExample: {
        code: `import pandas as pd

df = pd.read_csv("employees")

# Using query string
res = df.query("performance_rating >= 4.5 and salary > 85000")
print(res.get(['name', 'salary', 'performance_rating']))`,
        explanation: 'df.query evaluates SQL-like conditions on column identifiers cleanly.',
      },
    },
  ],
  exercises: [
    {
      id: 'p4-ex1',
      lessonId: 'pandas-lesson-4',
      order: 1,
      title: 'Filter Senior High Earners in Engineering',
      objective:
        'From "employees", filter for employees in "Engineering" who have a salary strictly greater than 90,000. Extract their "name", "salary", and "experience_years".',
      initialCode: `import pandas as pd

df = pd.read_csv("employees")

# Filter Engineering employees earning > 90000
eng_high = df.filter(lambda row: row.department == 'Engineering' and row.salary > 90000)
result = eng_high.get(['name', 'salary', 'experience_years'])
print(result)`,
      solutionCode: `import pandas as pd

df = pd.read_csv("employees")

eng_high = df.filter(lambda row: row.department == 'Engineering' and row.salary > 90000)
result = eng_high.get(['name', 'salary', 'experience_years'])
print(result)`,
      expectedOutput: `idx   name           salary  experience_years
0     Alice Smith    98000   5               
2     Charlie Brown  115000  8               
8     Ian Malcolm    130000  10              `,
      hint: 'Use df.filter(lambda row: row.department == "Engineering" and row.salary > 90000).',
      explanation:
        'Rows matching both conditions are retained with their original row index preserved.',
      quickChips: [
        'df.filter(lambda row: row.department == "Engineering" and row.salary > 90000)',
        "eng_high.get(['name', 'salary', 'experience_years'])",
      ],
    },
    {
      id: 'p4-ex2',
      lessonId: 'pandas-lesson-4',
      order: 2,
      title: 'Filter Delivered Electronics Orders',
      objective:
        'From the "ecommerce" dataset, filter orders where category is "Electronics" and status is "Delivered". Print the order_id, customer_id, and unit_price.',
      initialCode: `import pandas as pd

df = pd.read_csv("ecommerce")

# Filter category == 'Electronics' and status == 'Delivered'
delivered_elec = df.filter(lambda r: r.category == 'Electronics' and r.status == 'Delivered')
print(delivered_elec.get(['order_id', 'customer_id', 'unit_price']))`,
      solutionCode: `import pandas as pd

df = pd.read_csv("ecommerce")

delivered_elec = df.filter(lambda r: r.category == 'Electronics' and r.status == 'Delivered')
print(delivered_elec.get(['order_id', 'customer_id', 'unit_price']))`,
      expectedOutput: `idx   order_id  customer_id  unit_price
0     101       Cust-12      899.99    
8     109       Cust-77      210       `,
      hint: 'Combine both conditions in filter() or query() and project the three required columns.',
      explanation:
        'Boolean filtering isolates target transaction records effortlessly.',
      quickChips: [
        "df.filter(lambda r: r.category == 'Electronics' and r.status == 'Delivered')",
        "delivered_elec.get(['order_id', 'customer_id', 'unit_price'])",
      ],
    },
  ],
  quiz: [
        {
      id: 'p4-q1',
      question: 'Why must you use & instead of "and" when combining multiple conditions in standard Pandas series indexing?',
      explanation: 'Standard Python "and" evaluates truthiness on the whole Series, raising an error; bitwise & computes vectorized boolean comparisons.',
      difficulty: 'intermediate',
      topicTag: 'pandas',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: '& operates element-wise across arrays, while "and" checks truth value of whole array', isCorrect: true },
        { id: 'opt-b', text: '& is faster to compile in CPython', isCorrect: false },
        { id: 'opt-c', text: 'The "and" keyword is reserved only for strings', isCorrect: false },
        { id: 'opt-d', text: 'There is no difference between them', isCorrect: false },
      ],
    },
        {
      id: 'p4-q2',
      question: 'Which method allows SQL-like string queries on column names without repeating df["col"]?',
      explanation: 'df.query() parses and evaluates boolean filter strings on DataFrame columns.',
      difficulty: 'intermediate',
      topicTag: 'pandas',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'df.query()', isCorrect: true },
        { id: 'opt-b', text: 'df.sql()', isCorrect: false },
        { id: 'opt-c', text: 'df.where()', isCorrect: false },
        { id: 'opt-d', text: 'df.search()', isCorrect: false },
      ],
    },
        {
      id: 'p4-q3',
      question: 'Which operator performs element-wise logical negation (NOT) on a boolean series?',
      explanation: 'The tilde ~ operator flips True/False in Pandas boolean masks.',
      difficulty: 'intermediate',
      topicTag: 'pandas',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: '~', isCorrect: true },
        { id: 'opt-b', text: '!', isCorrect: false },
        { id: 'opt-c', text: 'not', isCorrect: false },
        { id: 'opt-d', text: '^', isCorrect: false },
      ],
    },
  ],
};
