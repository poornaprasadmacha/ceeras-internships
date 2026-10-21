import { DataScienceLessonDefinition } from '../../types/dataScienceLesson';

export const dsLesson6: DataScienceLessonDefinition = {
  id: 'ds-lesson-6',
  number: 6,
  slug: 'sorting-ranking-and-top-n-analysis',
  title: 'Sorting, Ranking & Top-N Analysis',
  shortDescription: 'Sort records across numerical and text dimensions, identify top-performing cohorts, and analyze rank distributions.',
  estimatedMinutes: 9,
  learningObjectives: [
    'Sort tabular rows in ascending and descending order using df.sort()',
    'Execute Top-N ranking analyses to identify key performers and outliers',
    'Extract extreme values and compute percentile ranks for competitive benchmarking',
  ],
  prerequisites: ['Filtering & Querying Datasets'],
  sections: [
    {
      id: 'sec-6-1',
      title: 'Sorting Tabular Datasets',
      content: `Sorting rearranges dataset rows based on the values of one or more features:
• **Ascending Order (\`ascending = true\`)**: Lowest to highest (e.g. $1 \\to 100$, $A \\to Z$). Used for fastest lap times, lowest error rates, or chronological dates.
• **Descending Order (\`ascending = false\`)**: Highest to lowest (e.g. $100 \\to 1$, $Z \\to A$). Used for highest sales, top scores, or largest account balances.`,
    },
    {
      id: 'sec-6-2',
      title: 'Top-N Leaderboard Patterns',
      content: `A frequent analytical pattern is finding the "Top 3" or "Top 5" entities:
\`\`\`javascript
// Sort by revenue descending (highest first)
const ranked = df.sort("revenue", false);

// Extract top 3 records
const top3 = ranked.slice(0, 3);
console.log("Top earner:", top3[0][1]); // Name of top earner
\`\`\`
This forms the basis for cohort tiering (e.g., Gold/Silver/Bronze membership tiers) and Pareto analyses ($80/20$ rule).`,
    },
  ],
  exercises: [
    {
      id: 'ds-ex-6-1',
      lessonId: 'ds-lesson-6',
      order: 1,
      title: 'Identify Highest Scoring Student and Top Score',
      objective: 'Sort students by score in descending order (highest first) using df.sort("score", false), then print the top student name and their score.',
      dataset: {
        name: 'exam_results.csv',
        columns: ['id', 'student_name', 'major', 'score'],
        rows: [
          [1, 'Liam', 'CS', 82],
          [2, 'Sophia', 'Physics', 96],
          [3, 'Ethan', 'Math', 89],
          [4, 'Emma', 'CS', 94],
          [5, 'Noah', 'Biology', 78],
        ],
        description: 'Midterm exam scores across departments',
      },
      initialCode: `// 1. Sort descending by score: const ranked = df.sort("score", false);
// 2. Print top student name: ranked[0][1]
// 3. Print top student score: ranked[0][3]

`,
      solutionCode: `const ranked = df.sort("score", false);
console.log("Top student:", ranked[0][1]);
console.log("Highest score:", ranked[0][3]);`,
      expectedOutput: `Top student: Sophia
Highest score: 96`,
      hint: 'Sort descending with df.sort("score", false). Then print ranked[0][1] and ranked[0][3].',
      explanation: 'Sophia achieved the highest score with 96 points, followed by Emma with 94.',
      quickChips: [
        'const ranked = df.sort("score", false);',
        'console.log("Top student:", ranked[0][1]);',
        'console.log("Highest score:", ranked[0][3]);',
      ],
    },
  ],
  quiz: [
    {
      id: 'q-ds-6-1',
      question: 'To find the products with the highest sales volume at the top of the table, what sorting direction should be used?',
      explanation: 'Descending order puts the largest numbers first.',
      difficulty: 'beginner',
      topicTag: 'data-science',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'Descending order (highest to lowest)', isCorrect: true },
        { id: 'opt-b', text: 'Ascending order (lowest to highest)', isCorrect: false },
        { id: 'opt-c', text: 'Random shuffle order', isCorrect: false },
        { id: 'opt-d', text: 'Alphabetical order by product ID', isCorrect: false },
      ],
    },
    {
      id: 'q-ds-6-2',
      question: 'What is the Pareto principle (80/20 rule) in business data analysis?',
      explanation: 'The Pareto principle states that roughly 80% of consequences or revenues come from 20% of causes or customers.',
      difficulty: 'intermediate',
      topicTag: 'data-science',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'Roughly 80% of revenue typically comes from the top 20% of customers', isCorrect: true },
        { id: 'opt-b', text: '80% of all data should be discarded during cleaning', isCorrect: false },
        { id: 'opt-c', text: 'Algorithms run 80% faster in descending order', isCorrect: false },
        { id: 'opt-d', text: 'Every dataset must contain at least 80 rows', isCorrect: false },
      ],
    },
    {
      id: 'q-ds-6-3',
      question: 'After sorting an array of rows, how do you extract the Top 5 rows in JavaScript?',
      explanation: 'The .slice(0, 5) method retrieves elements from index 0 up to (not including) index 5.',
      difficulty: 'beginner',
      topicTag: 'data-science',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'ranked.slice(0, 5)', isCorrect: true },
        { id: 'opt-b', text: 'ranked.drop(5)', isCorrect: false },
        { id: 'opt-c', text: 'ranked.pop(5)', isCorrect: false },
        { id: 'opt-d', text: 'ranked.filter(5)', isCorrect: false },
      ],
    },
  ],
};
