import { DataScienceLessonDefinition } from '../../types/dataScienceLesson';

export const dsLesson7: DataScienceLessonDefinition = {
  id: 'ds-lesson-7',
  number: 7,
  slug: 'grouping-and-aggregations',
  title: 'Grouping & Aggregations (Split-Apply-Combine)',
  shortDescription: 'Aggregate data across categories using the Split-Apply-Combine pattern to compare cohort averages, sums, and frequencies.',
  estimatedMinutes: 11,
  learningObjectives: [
    'Implement the Split-Apply-Combine paradigm popularized by Hadley Wickham',
    'Calculate categorical aggregates such as group means, totals, and counts',
    'Use df.groupBy() to uncover segmented patterns across business units',
  ],
  prerequisites: ['Sorting, Ranking & Top-N Analysis'],
  sections: [
    {
      id: 'sec-7-1',
      title: 'The Split-Apply-Combine Paradigm',
      content: `In tabular data analysis, high-level summaries often mask meaningful variations between sub-populations. 

The **Split-Apply-Combine** pattern solves this:
1. **Split**: Break the dataset into distinct groups based on a categorical variable (e.g. Department, Gender, Country).
2. **Apply**: Compute an aggregation metric independently on each group (e.g. \`mean\`, \`sum\`, \`count\`).
3. **Combine**: Assemble the individual results back into a summary table or dictionary.`,
    },
    {
      id: 'sec-7-2',
      title: 'Using df.groupBy()',
      content: `Our engine provides \`df.groupBy(categoryCol, numericCol, operation)\`:
\`\`\`javascript
// Compute average revenue per region
const avgByRegion = df.groupBy("region", "revenue", "mean");
console.log(avgByRegion);
// => { "North": 125000, "South": 98000, "West": 142000 }
\`\`\`
Operations include:
• \`'mean'\`: Group average
• \`'sum'\`: Group total
• \`'count'\`: Frequency count of rows per group`,
    },
  ],
  exercises: [
    {
      id: 'ds-ex-7-1',
      lessonId: 'ds-lesson-7',
      order: 1,
      title: 'Compute Average Salary by Department',
      objective: 'Use df.groupBy("dept", "salary", "mean") to compute department salary averages, and print the resulting object.',
      dataset: {
        name: 'corporate_payroll.csv',
        columns: ['emp_id', 'dept', 'salary'],
        rows: [
          [1, 'Engineering', 120000],
          [2, 'Engineering', 140000],
          [3, 'Marketing', 80000],
          [4, 'Marketing', 90000],
          [5, 'Sales', 95000],
          [6, 'Sales', 105000],
        ],
        description: 'Employee payroll records by department',
      },
      initialCode: `// Compute mean salary per department using df.groupBy:
// Print the resulting object with console.log()

`,
      solutionCode: `const deptAverages = df.groupBy("dept", "salary", "mean");
console.log(deptAverages);`,
      expectedOutput: `{"Engineering":130000,"Marketing":85000,"Sales":100000}`,
      hint: 'Call const deptAverages = df.groupBy("dept", "salary", "mean"); and console.log(deptAverages);',
      explanation: 'Engineering average is (120k+140k)/2 = 130k; Marketing is (80k+90k)/2 = 85k; Sales is (95k+105k)/2 = 100k.',
      quickChips: [
        'const deptAverages = df.groupBy("dept", "salary", "mean");',
        'console.log(deptAverages);',
      ],
    },
  ],
  quiz: [
    {
      id: 'q-ds-7-1',
      question: 'What are the three steps in the Split-Apply-Combine workflow for grouped data?',
      explanation: 'Split the data into groups by key, Apply an aggregation function to each subset, and Combine the results.',
      difficulty: 'beginner',
      topicTag: 'data-science',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'Split, Apply, Combine', isCorrect: true },
        { id: 'opt-b', text: 'Select, Project, Filter', isCorrect: false },
        { id: 'opt-c', text: 'Extract, Transform, Load', isCorrect: false },
        { id: 'opt-d', text: 'Train, Validate, Test', isCorrect: false },
      ],
    },
    {
      id: 'q-ds-7-2',
      question: 'If you want to know how many transactions each store completed, which aggregation operation is needed?',
      explanation: 'Count calculates the number of occurrences or rows per group.',
      difficulty: 'beginner',
      topicTag: 'data-science',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'Count', isCorrect: true },
        { id: 'opt-b', text: 'Mean', isCorrect: false },
        { id: 'opt-c', text: 'Standard Deviation', isCorrect: false },
        { id: 'opt-d', text: 'Median Absolute Deviation', isCorrect: false },
      ],
    },
    {
      id: 'q-ds-7-3',
      question: 'Why can looking only at the overall dataset mean without grouping lead to misleading conclusions (e.g. Simpson\'s Paradox)?',
      explanation: 'An aggregate trend across an entire population can reverse or disappear when disaggregated into sub-groups due to confounding variables.',
      difficulty: 'intermediate',
      topicTag: 'data-science',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'Confounding variables can cause group trends to reverse when aggregated (Simpson\'s Paradox)', isCorrect: true },
        { id: 'opt-b', text: 'Averages can only be calculated on strings', isCorrect: false },
        { id: 'opt-c', text: 'Grouping permanently deletes columns from disk', isCorrect: false },
        { id: 'opt-d', text: 'Computers cannot calculate averages with more than 10 rows', isCorrect: false },
      ],
    },
  ],
};
