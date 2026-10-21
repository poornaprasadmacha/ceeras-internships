import { DataScienceLessonDefinition } from '../../types/dataScienceLesson';

export const dsLesson3: DataScienceLessonDefinition = {
  id: 'ds-lesson-3',
  number: 3,
  slug: 'measures-of-spread-and-variance',
  title: 'Measures of Spread & Variance',
  shortDescription: 'Quantify variability, dispersion, and consistency using Range, Variance, Standard Deviation, and the 1.5 x IQR outlier rule.',
  estimatedMinutes: 10,
  learningObjectives: [
    'Compute Range, Variance, and Standard Deviation to assess data dispersion',
    'Understand why standard deviation is expressed in the same physical units as the original feature',
    'Detect anomalies and statistical outliers using the Interquartile Range (IQR) technique',
  ],
  prerequisites: ['Summary Statistics & Central Tendency'],
  sections: [
    {
      id: 'sec-3-1',
      title: 'Range and Dispersion',
      content: `While central tendency tells us where the center of the data lies, **dispersion** (spread) tells us how much the observations fluctuate around that center.

• **Range**: The simplest metric of spread:
$$\\text{Range} = x_{\\max} - x_{\\min}$$
Range is quick to compute but only considers the two most extreme values, ignoring the distribution in between.`,
    },
    {
      id: 'sec-3-2',
      title: 'Variance & Standard Deviation',
      content: `• **Sample Variance ($s^2$)**: The average squared deviation from the sample mean:
$$s^2 = \\frac{1}{n-1}\\sum_{i=1}^{n} (x_i - \\bar{x})^2$$

• **Sample Standard Deviation ($s$)**: The square root of variance:
$$s = \\sqrt{s^2}$$
Taking the square root brings the metric back into the **original units of measurement** (e.g., dollars, milliseconds, kilograms), making it intuitive to interpret. A small $s$ indicates data clustered tightly near the mean; a large $s$ indicates wide dispersion.`,
    },
    {
      id: 'sec-3-3',
      title: 'Interquartile Range (IQR) & Outliers',
      content: `• **Quartiles**:
  • $Q_1$ (25th percentile): 25% of data falls below this value.
  • $Q_2$ (50th percentile): The median.
  • $Q_3$ (75th percentile): 75% of data falls below this value.
• **$IQR = Q_3 - Q_1$**: Represents the spread of the middle 50% of the dataset.
• **Tukey\'s Outlier Fence**:
  • Lower Bound: $Q_1 - 1.5 \\times IQR$
  • Upper Bound: $Q_3 + 1.5 \\times IQR$
Any observation falling outside these fences is flagged as a potential statistical outlier.`,
    },
  ],
  exercises: [
    {
      id: 'ds-ex-3-1',
      lessonId: 'ds-lesson-3',
      order: 1,
      title: 'Calculate API Latency Spread (Range and Std Dev)',
      objective: 'Calculate the range (max - min) and standard deviation of API response latency in milliseconds using df.min(), df.max(), and df.std().',
      dataset: {
        name: 'server_latency.csv',
        columns: ['request_id', 'endpoint', 'latency_ms'],
        rows: [
          [1, '/api/users', 45],
          [2, '/api/checkout', 55],
          [3, '/api/products', 50],
          [4, '/api/search', 60],
          [5, '/api/auth', 40],
        ],
        description: 'Server endpoint latency metrics in milliseconds',
      },
      initialCode: `// 1. Calculate range: df.max("latency_ms") - df.min("latency_ms")
// 2. Calculate standard deviation: df.std("latency_ms")
// Print both with "Range:" and "Std:"

`,
      solutionCode: `const range = df.max("latency_ms") - df.min("latency_ms");
const stdDev = df.std("latency_ms");
console.log("Range:", range);
console.log("Std:", stdDev);`,
      expectedOutput: `Range: 20
Std: 7.91`,
      hint: 'Compute range as df.max("latency_ms") - df.min("latency_ms") and std as df.std("latency_ms"). Print Range: and Std:',
      explanation: 'Max latency is 60ms and min is 40ms, giving a range of 20ms. The sample standard deviation is 7.91ms.',
      quickChips: [
        'const range = df.max("latency_ms") - df.min("latency_ms");',
        'const stdDev = df.std("latency_ms");',
        'console.log("Range:", range);',
        'console.log("Std:", stdDev);',
      ],
    },
  ],
  quiz: [
    {
      id: 'q-ds-3-1',
      question: 'Why do data scientists frequently prefer Standard Deviation over Variance when reporting results?',
      explanation: 'Standard deviation is in the exact same physical unit of measurement as the original data feature, whereas variance is squared.',
      difficulty: 'intermediate',
      topicTag: 'data-science',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'It is expressed in the same units as the original data', isCorrect: true },
        { id: 'opt-b', text: 'It is always an integer', isCorrect: false },
        { id: 'opt-c', text: 'It ignores negative values completely', isCorrect: false },
        { id: 'opt-d', text: 'It does not require calculating the mean', isCorrect: false },
      ],
    },
    {
      id: 'q-ds-3-2',
      question: 'In Tukey\'s box plot rule, an observation is considered an upper outlier if it exceeds which threshold?',
      explanation: 'Upper fence = Q3 + 1.5 * IQR.',
      difficulty: 'intermediate',
      topicTag: 'data-science',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'Q3 + 1.5 * IQR', isCorrect: true },
        { id: 'opt-b', text: 'Q1 + 2.0 * IQR', isCorrect: false },
        { id: 'opt-c', text: 'Mean + 1.5 * Std', isCorrect: false },
        { id: 'opt-d', text: 'Q3 + Median', isCorrect: false },
      ],
    },
    {
      id: 'q-ds-3-3',
      question: 'If all observations in a dataset are identical (e.g. [50, 50, 50, 50]), what is the standard deviation?',
      explanation: 'When there is zero variation around the mean, the standard deviation is exactly 0.',
      difficulty: 'beginner',
      topicTag: 'data-science',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: '0', isCorrect: true },
        { id: 'opt-b', text: '1', isCorrect: false },
        { id: 'opt-c', text: '50', isCorrect: false },
        { id: 'opt-d', text: 'Undefined', isCorrect: false },
      ],
    },
  ],
};
