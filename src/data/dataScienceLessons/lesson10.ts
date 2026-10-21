import { DataScienceLessonDefinition } from '../../types/dataScienceLesson';

export const dsLesson10: DataScienceLessonDefinition = {
  id: 'ds-lesson-10',
  number: 10,
  slug: 'exploratory-data-analysis-and-visualizations',
  title: 'Exploratory Data Analysis & Visualizations',
  shortDescription: 'Uncover patterns, anomalies, and distributions using bar charts, scatter plots, and exploratory data visualization workflows.',
  estimatedMinutes: 11,
  learningObjectives: [
    'Execute systematic Exploratory Data Analysis (EDA) on unfamiliar datasets',
    'Select appropriate visualization modalities: Bar charts, Scatter plots, and Line charts',
    'Generate real-time in-browser visualizations using the plot engine',
  ],
  prerequisites: ['Feature Engineering & Normalization'],
  sections: [
    {
      id: 'sec-10-1',
      title: 'The Purpose of EDA',
      content: `**Exploratory Data Analysis (EDA)**, pioneered by John Tukey, emphasizes using visual graphics and summary metrics to uncover data structure before formal modeling.

Goals of EDA:
1. Detect errors, typos, and extreme measurement anomalies.
2. Check underlying assumptions (normality, linearity).
3. Discover hidden relationships and feature interactions.
4. Communicate preliminary insights clearly to stakeholders.`,
    },
    {
      id: 'sec-10-2',
      title: 'Choosing the Right Visualization',
      content: `• **Bar Charts**: Ideal for comparing a numeric metric across discrete categories (e.g. quarterly revenue by region).
• **Scatter Plots**: Ideal for revealing the relationship and correlation between two continuous variables (e.g. ad spend vs. sales).
• **Line Charts**: Ideal for tracking metric trajectories over chronological time.

\`\`\`javascript
// Rendering a bar chart with Ceeras Plot engine
plot.bar(['East', 'West', 'Central'], [450, 620, 380], 'Regional Revenue ($k)');
\`\`\``,
    },
  ],
  exercises: [
    {
      id: 'ds-ex-10-1',
      lessonId: 'ds-lesson-10',
      order: 1,
      title: 'Generate Regional Sales Bar Chart and Total Revenue',
      objective: 'Calculate the total revenue using df.sum("revenue") and render a bar chart of regional revenues using plot.bar().',
      dataset: {
        name: 'quarterly_sales.csv',
        columns: ['region', 'revenue'],
        rows: [
          ['North', 150000],
          ['South', 90000],
          ['East', 210000],
          ['West', 180000],
        ],
        description: 'Quarterly sales revenue by operating region',
      },
      initialCode: `// 1. Calculate total revenue: df.sum("revenue")
// 2. Print "Total revenue:" followed by total
// 3. Render a bar chart: plot.bar(df.col("region"), df.col("revenue"), "Regional Sales");

`,
      solutionCode: `const total = df.sum("revenue");
console.log("Total revenue:", total);
plot.bar(df.col("region"), df.col("revenue"), "Regional Sales");`,
      expectedOutput: `Total revenue: 630000`,
      hint: 'Sum the revenue column and call plot.bar(df.col("region"), df.col("revenue"), "Regional Sales")',
      explanation: 'Total revenue is 150k + 90k + 210k + 180k = 630k. The bar chart provides an instant visual hierarchy.',
      quickChips: [
        'const total = df.sum("revenue");',
        'console.log("Total revenue:", total);',
        'plot.bar(df.col("region"), df.col("revenue"), "Regional Sales");',
      ],
    },
  ],
  quiz: [
    {
      id: 'q-ds-10-1',
      question: 'Which chart type is best suited to inspect the correlation between student study hours and final exam score?',
      explanation: 'A scatter plot visualizes the bivariate relationship between two continuous variables.',
      difficulty: 'beginner',
      topicTag: 'data-science',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'Scatter plot', isCorrect: true },
        { id: 'opt-b', text: 'Pie chart', isCorrect: false },
        { id: 'opt-c', text: 'Radar chart', isCorrect: false },
        { id: 'opt-d', text: 'Tree map', isCorrect: false },
      ],
    },
    {
      id: 'q-ds-10-2',
      question: 'Why should data scientists inspect visualizations rather than relying strictly on summary statistics (e.g. Anscombe\'s Quartet)?',
      explanation: 'Distinctly different datasets can share identical means, variances, and correlations (Anscombe\'s Quartet) that are only revealed through plotting.',
      difficulty: 'intermediate',
      topicTag: 'data-science',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'Different data distributions can produce identical means and variances (Anscombe\'s Quartet)', isCorrect: true },
        { id: 'opt-b', text: 'Statistics cannot be calculated on computers', isCorrect: false },
        { id: 'opt-c', text: 'Visualizations always eliminate all outliers automatically', isCorrect: false },
        { id: 'opt-d', text: 'Charts do not require any raw data', isCorrect: false },
      ],
    },
    {
      id: 'q-ds-10-3',
      question: 'In a bar chart comparing marketing channels, what does the height or length of each bar represent?',
      explanation: 'The bar height represents the magnitude of the aggregated metric (e.g. total revenue, leads, or conversions).',
      difficulty: 'beginner',
      topicTag: 'data-science',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'The magnitude or frequency of the metric for that category', isCorrect: true },
        { id: 'opt-b', text: 'The variance of the entire universe', isCorrect: false },
        { id: 'opt-c', text: 'The alphabetical rank of the category name', isCorrect: false },
        { id: 'opt-d', text: 'The server response ping', isCorrect: false },
      ],
    },
  ],
};
