import { PandasLessonDefinition } from '../../types/pandasLesson';

export const lesson11: PandasLessonDefinition = {
  id: 'pandas-lesson-11',
  number: 11,
  slug: 'vectorized-string-and-datetime-operations',
  title: 'Vectorized String & DateTime Operations',
  shortDescription:
    'Clean text columns using the .str accessor and extract temporal features (year, month, day of week) using pd.to_datetime and the .dt accessor.',
  estimatedMinutes: 25,
  learningObjectives: [
    'Clean, normalize, and match text data using the .str vectorized accessor',
    'Parse date strings into timestamps using pd.to_datetime()',
    'Extract calendar components (.year, .month_name, .day_name, .quarter) using .dt',
    'Filter records within specific time intervals',
  ],
  prerequisites: ['Lesson 10: Pivot Tables & Reshaping'],
  sections: [
    {
      id: 'p11-1',
      title: 'Vectorized Text Processing with .str',
      content:
        'Real-world string data is messy: erratic capitalization, leading spaces, and embedded tokens.\n\nPandas provides the .str accessor on Series to perform vectorized text transformations without Python loops:\n- s.str.lower() / s.str.upper(): Case normalization\n- s.str.strip(): Trims whitespace\n- s.str.contains("keyword"): Substring search returning a boolean mask\n- s.str.replace("old", "new"): Text replacement\n- s.str.split(" ", n=0): Token extraction.',
      codeExample: {
        code: `import pandas as pd

df = pd.read_csv("customers")
names = df.get("customer_name")

# Normalizing and searching
print("Lowercased:", names.str.lower().tolist())
print("Contains 'connor':")
print(df.filter(lambda r: 'connor' in r.customer_name.toLowerCase()))`,
        explanation: '.str methods execute vectorized text manipulation across all elements.',
      },
    },
    {
      id: 'p11-2',
      title: 'Time Series Features with .dt',
      content:
        'Dates stored as plain strings ("2025-01-15") prevent temporal sorting and interval math.\n\nConverting them with pd.to_datetime() unlocks the .dt accessor:\n- s.dt.year: Calendar year\n- s.dt.month_name(): Month string ("January", "February")\n- s.dt.day_name(): Day of week ("Monday", "Tuesday")\n- s.dt.quarter: Fiscal quarter (1 to 4).',
      codeExample: {
        code: `import pandas as pd

df = pd.read_csv("ecommerce")
dates = pd.to_datetime(df.get("order_date"))

print("Days of week:")
print(dates.dt.day_name().head(3))
print("Quarters:")
print(dates.dt.quarter().head(3))`,
        explanation: '.dt accessor extracts rich calendar features for trend and seasonal analysis.',
      },
    },
  ],
  exercises: [
    {
      id: 'p11-ex1',
      lessonId: 'pandas-lesson-11',
      order: 1,
      title: 'Normalize Customer Names and Find Connor',
      objective:
        'Extract the "customer_name" column from "customers". Convert it to uppercase using .str.upper() and find customer names that contain "CONNOR". Print the matching customer record(s).',
      initialCode: `import pandas as pd

df = pd.read_csv("customers")

# Normalize to uppercase and filter
upper_names = df.get("customer_name").str.upper()
match = df.filter(lambda r: 'CONNOR' in r.customer_name.toUpperCase())
print(match)`,
      solutionCode: `import pandas as pd

df = pd.read_csv("customers")

upper_names = df.get("customer_name").str.upper()
match = df.filter(lambda r: 'CONNOR' in r.customer_name.toUpperCase())
print(match)`,
      expectedOutput: `idx   customer_id  customer_name  join_date   membership  country
0     Cust-12      Sarah Connor   2023-04-12  Platinum    USA    `,
      hint: 'Use r.customer_name.toUpperCase().includes("CONNOR") inside df.filter().',
      explanation:
        'Case-insensitive text matching is a core data normalization step.',
      quickChips: [
        'df.get("customer_name").str.upper()',
        'r.customer_name.toUpperCase()',
      ],
    },
    {
      id: 'p11-ex2',
      lessonId: 'pandas-lesson-11',
      order: 2,
      title: 'Extract Day Names from Ecommerce Order Dates',
      objective:
        'Convert "order_date" in "ecommerce" to datetime with pd.to_datetime(). Extract the day name for each order using .dt.day_name(). Print the first 4 day names.',
      initialCode: `import pandas as pd

df = pd.read_csv("ecommerce")

# Parse order_date and get day_name
dates = pd.to_datetime(df.get("order_date"))
days = dates.dt.day_name()
print(days.head(4))`,
      solutionCode: `import pandas as pd

df = pd.read_csv("ecommerce")

dates = pd.to_datetime(df.get("order_date"))
days = dates.dt.day_name()
print(days.head(4))`,
      expectedOutput: `0      Wednesday
1      Thursday
2      Saturday
3      Monday
Name: None, dtype: object`,
      hint: 'Call pd.to_datetime(df.get("order_date")).dt.day_name() and use .head(4).',
      explanation:
        'Extracting day names enables day-of-week sales volume analysis and retail staffing optimizations.',
      quickChips: [
        'pd.to_datetime(df.get("order_date"))',
        'dates.dt.day_name()',
        'days.head(4)',
      ],
    },
  ],
  quiz: [
        {
      id: 'p11-q1',
      question: 'Which accessor provides vectorized string operations on a Pandas text Series?',
      explanation: 'The .str accessor unlocks vectorized text functions like lower(), strip(), and contains().',
      difficulty: 'intermediate',
      topicTag: 'pandas',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: '.str', isCorrect: true },
        { id: 'opt-b', text: '.text', isCorrect: false },
        { id: 'opt-c', text: '.string', isCorrect: false },
        { id: 'opt-d', text: '.char', isCorrect: false },
      ],
    },
        {
      id: 'p11-q2',
      question: 'Which function parses string dates into datetime objects in Pandas?',
      explanation: 'pd.to_datetime() parses date strings and timestamp numbers into datetime format.',
      difficulty: 'intermediate',
      topicTag: 'pandas',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'pd.to_datetime()', isCorrect: true },
        { id: 'opt-b', text: 'pd.parse_date()', isCorrect: false },
        { id: 'opt-c', text: 'pd.convert_time()', isCorrect: false },
        { id: 'opt-d', text: 'pd.make_timestamp()', isCorrect: false },
      ],
    },
        {
      id: 'p11-q3',
      question: 'How do you extract the name of the month (e.g. "January") from a datetime Series?',
      explanation: 's.dt.month_name() returns full calendar month names.',
      difficulty: 'intermediate',
      topicTag: 'pandas',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 's.dt.month_name()', isCorrect: true },
        { id: 'opt-b', text: 's.dt.month_string()', isCorrect: false },
        { id: 'opt-c', text: 's.month()', isCorrect: false },
        { id: 'opt-d', text: 's.dt.name()', isCorrect: false },
      ],
    },
  ],
};
