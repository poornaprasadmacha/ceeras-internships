import { DataScienceLessonDefinition } from '../../types/dataScienceLesson';

export const dsLesson11: DataScienceLessonDefinition = {
  id: 'ds-lesson-11',
  number: 11,
  slug: 'correlation-and-bivariate-analysis',
  title: 'Correlation & Bivariate Analysis',
  shortDescription: 'Quantify linear relationships between variables using Pearson r, interpret correlation strength, and separate correlation from causation.',
  estimatedMinutes: 11,
  learningObjectives: [
    'Calculate and interpret Pearson\'s correlation coefficient r between -1 and +1',
    'Recognize strong, moderate, weak, and non-linear bivariate associations',
    'Understand why correlation does not imply causation and identify lurking variables',
  ],
  prerequisites: ['Exploratory Data Analysis & Visualizations'],
  sections: [
    {
      id: 'sec-11-1',
      title: 'Pearson Correlation Coefficient (r)',
      content: `The **Pearson correlation coefficient ($r$)** measures the strength and direction of the linear association between two continuous variables:
$$r = \\frac{\\sum (x_i - \\bar{x})(y_i - \\bar{y})}{\\sqrt{\\sum (x_i - \\bar{x})^2 \\sum (y_i - \\bar{y})^2}}$$

• **$r = +1.0$**: Perfect positive linear relationship (as $X$ increases, $Y$ increases proportionally).
• **$r = 0.0$**: No linear relationship.
• **$r = -1.0$**: Perfect negative linear relationship (as $X$ increases, $Y$ decreases proportionally).

**Rules of Thumb**:
• $|r| \\ge 0.7$: Strong correlation
• $0.4 \\le |r| < 0.7$: Moderate correlation
• $|r| < 0.4$: Weak or negligible correlation`,
    },
    {
      id: 'sec-11-2',
      title: 'Correlation vs. Causation',
      content: `A fundamental rule of scientific inquiry is: **Correlation does not imply causation**.

Two variables may show a high correlation due to:
1. **Confounding (Lurking) Variable**: Ice cream sales and drowning rates both spike in summer due to temperature, not because ice cream causes drowning.
2. **Reverse Causality**: Does happiness increase productivity, or does high productivity increase happiness?
3. **Spurious Correlation**: Pure coincidence in sample data that fails to replicate.`,
    },
  ],
  exercises: [
    {
      id: 'ds-ex-11-1',
      lessonId: 'ds-lesson-11',
      order: 1,
      title: 'Calculate Pearson Correlation Between Study Hours and Score',
      objective: 'Calculate the Pearson correlation between study_hours and exam_score using df.corr("study_hours", "exam_score"), print the r-value, and render a scatter plot.',
      dataset: {
        name: 'study_performance.csv',
        columns: ['student_id', 'study_hours', 'exam_score'],
        rows: [
          [1, 2, 60],
          [2, 4, 70],
          [3, 6, 80],
          [4, 8, 85],
          [5, 10, 95],
        ],
        description: 'Weekly self-study hours versus final exam grade',
      },
      initialCode: `// 1. Calculate correlation: df.corr("study_hours", "exam_score")
// 2. Print "Pearson r:" followed by the r value
// 3. Render scatter plot:
// const points = df.rows.map(r => ({ x: r[1], y: r[2], label: "Hours vs Score" }));
// plot.scatter(points, "Study Hours vs Exam Score");

`,
      solutionCode: `const r = df.corr("study_hours", "exam_score");
console.log("Pearson r:", r);
const points = df.rows.map(r => ({ x: r[1], y: r[2], label: "Hours vs Score" }));
plot.scatter(points, "Study Hours vs Exam Score");`,
      expectedOutput: `Pearson r: 0.993`,
      hint: 'Compute r with df.corr("study_hours", "exam_score"), log "Pearson r:", r, and call plot.scatter().',
      explanation: 'The correlation coefficient of 0.993 indicates a virtually perfect positive linear relationship between study hours and exam performance.',
      quickChips: [
        'const r = df.corr("study_hours", "exam_score");',
        'console.log("Pearson r:", r);',
        'const points = df.rows.map(r => ({ x: r[1], y: r[2] }));',
        'plot.scatter(points, "Study Hours vs Score");',
      ],
    },
  ],
  quiz: [
    {
      id: 'q-ds-11-1',
      question: 'What does a Pearson correlation coefficient of r = -0.85 indicate between advertising cost and return on investment?',
      explanation: 'Negative values signify an inverse relationship, and magnitude > 0.7 signifies strong association.',
      difficulty: 'intermediate',
      topicTag: 'data-science',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'A strong negative (inverse) linear relationship', isCorrect: true },
        { id: 'opt-b', text: 'A weak positive relationship', isCorrect: false },
        { id: 'opt-c', text: 'No linear association exists', isCorrect: false },
        { id: 'opt-d', text: 'An 85% probability that the cost caused the return', isCorrect: false },
      ],
    },
    {
      id: 'q-ds-11-2',
      question: 'Why does Pearson correlation fail to capture relationships like y = x^2 (a perfect parabola)?',
      explanation: 'Pearson correlation only measures linear relationships; non-linear curves can have r = 0 despite a deterministic formula.',
      difficulty: 'intermediate',
      topicTag: 'data-science',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'Pearson r measures only linear relationships, not curves or parabolas', isCorrect: true },
        { id: 'opt-b', text: 'Parabolas cannot be represented by numbers', isCorrect: false },
        { id: 'opt-c', text: 'Negative numbers cannot be squared in statistics', isCorrect: false },
        { id: 'opt-d', text: 'The formula requires at least 1,000,000 observations', isCorrect: false },
      ],
    },
    {
      id: 'q-ds-11-3',
      question: 'If variable X and variable Y have a high correlation of 0.92, which statement is scientifically true?',
      explanation: 'Correlation alone does not prove causation without controlled experimental evidence or causal inference.',
      difficulty: 'beginner',
      topicTag: 'data-science',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'X and Y vary together, but X does not necessarily cause Y', isCorrect: true },
        { id: 'opt-b', text: 'X definitely causes Y directly', isCorrect: false },
        { id: 'opt-c', text: 'Y definitely causes X directly', isCorrect: false },
        { id: 'opt-d', text: 'Both variables must have an identical mean', isCorrect: false },
      ],
    },
  ],
};
