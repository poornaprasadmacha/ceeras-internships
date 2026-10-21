import { DataScienceLessonDefinition } from '../../types/dataScienceLesson';

export const dsLesson2: DataScienceLessonDefinition = {
  id: 'ds-lesson-2',
  number: 2,
  slug: 'summary-statistics-and-central-tendency',
  title: 'Summary Statistics & Central Tendency',
  shortDescription: 'Master the three pillars of central tendency: Mean, Median, and Mode, and understand how skewness affects each metric.',
  estimatedMinutes: 10,
  learningObjectives: [
    'Calculate arithmetic mean and understand sensitivity to extreme outliers',
    'Determine the median as a robust central measure for skewed distributions',
    'Identify the mode as the most frequently occurring value in categorical and discrete data',
  ],
  prerequisites: ['Introduction to Data Science & Tabular Datasets'],
  sections: [
    {
      id: 'sec-2-1',
      title: 'Arithmetic Mean (Average)',
      content: `The **arithmetic mean** is the sum of all observed values divided by the total number of observations.
Formula:
$$\\bar{x} = \\frac{1}{n}\\sum_{i=1}^{n} x_i$$

While intuitive and mathematically convenient, the mean is **highly sensitive to outliers** (extreme values). A single multi-millionaire in a room of workers will drastically skew the average salary upwards.`,
    },
    {
      id: 'sec-2-2',
      title: 'Median: Robust Central Measure',
      content: `The **median** is the exact middle value when a dataset is sorted from lowest to highest.
• If $n$ is odd: The value at position $(n+1)/2$.
• If $n$ is even: The average of the two middle values.

Because the median only depends on rank order rather than magnitudes of extremes, it is **resistant (robust) to outliers**. This makes it the preferred metric for household income, home prices, and latency distributions.`,
    },
    {
      id: 'sec-2-3',
      title: 'Mode & Skewness',
      content: `• **Mode**: The value that occurs with the highest frequency in a feature. A distribution can be unimodal, bimodal, or multimodal.
• **Skewness**:
  • **Normal (Symmetric)**: $\\text{Mean} \\approx \\text{Median} \\approx \\text{Mode}$
  • **Right-Skewed (Positive)**: $\\text{Mean} > \\text{Median} > \\text{Mode}$ (long tail to the right)
  • **Left-Skewed (Negative)**: $\\text{Mean} < \\text{Median} < \\text{Mode}$ (long tail to the left)`,
    },
  ],
  exercises: [
    {
      id: 'ds-ex-2-1',
      lessonId: 'ds-lesson-2',
      order: 1,
      title: 'Calculate Mean and Median Salary',
      objective: 'Calculate the average (mean) and median salary for the engineering team using df.mean("salary") and df.median("salary").',
      dataset: {
        name: 'engineer_salaries.csv',
        columns: ['emp_id', 'role', 'experience_yrs', 'salary'],
        rows: [
          [1, 'Junior SWE', 1, 70000],
          [2, 'Mid SWE', 3, 95000],
          [3, 'Mid SWE', 4, 100000],
          [4, 'Senior SWE', 7, 135000],
          [5, 'Staff SWE', 10, 190000],
        ],
        description: 'Software engineering team salaries in USD',
      },
      initialCode: `// 1. Calculate and print the mean salary
// 2. Calculate and print the median salary

`,
      solutionCode: `console.log("Mean:", df.mean("salary"));
console.log("Median:", df.median("salary"));`,
      expectedOutput: `Mean: 118000
Median: 100000`,
      hint: 'Use console.log("Mean:", df.mean("salary")); followed by console.log("Median:", df.median("salary"));',
      explanation: 'The mean is (70000 + 95000 + 100000 + 135000 + 190000) / 5 = 118,000, while the sorted middle observation is 100,000.',
      quickChips: [
        'console.log("Mean:", df.mean("salary"));',
        'console.log("Median:", df.median("salary"));',
      ],
    },
  ],
  quiz: [
    {
      id: 'q-ds-2-1',
      question: 'Which measure of central tendency is least affected by extreme outliers in a salary dataset?',
      explanation: 'The median depends solely on the order and middle ranking of values, not extreme magnitudes.',
      difficulty: 'beginner',
      topicTag: 'data-science',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'Median', isCorrect: true },
        { id: 'opt-b', text: 'Arithmetic Mean', isCorrect: false },
        { id: 'opt-c', text: 'Range', isCorrect: false },
        { id: 'opt-d', text: 'Variance', isCorrect: false },
      ],
    },
    {
      id: 'q-ds-2-2',
      question: 'If a salary distribution is heavily right-skewed (positive skew), what relationship typically holds?',
      explanation: 'In a right-skewed distribution, extreme high values pull the mean higher than the median.',
      difficulty: 'intermediate',
      topicTag: 'data-science',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'Mean > Median > Mode', isCorrect: true },
        { id: 'opt-b', text: 'Mode > Median > Mean', isCorrect: false },
        { id: 'opt-c', text: 'Mean = Median = Mode', isCorrect: false },
        { id: 'opt-d', text: 'Median > Mean > Mode', isCorrect: false },
      ],
    },
    {
      id: 'q-ds-2-3',
      question: 'What is the mode of the dataset: [12, 15, 12, 19, 21, 15, 12]?',
      explanation: '12 appears 3 times, which is more frequent than any other number.',
      difficulty: 'beginner',
      topicTag: 'data-science',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: '12', isCorrect: true },
        { id: 'opt-b', text: '15', isCorrect: false },
        { id: 'opt-c', text: '17', isCorrect: false },
        { id: 'opt-d', text: '19', isCorrect: false },
      ],
    },
  ],
};
