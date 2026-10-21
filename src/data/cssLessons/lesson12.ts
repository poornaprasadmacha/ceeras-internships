import { CssLessonDefinition } from '../../types/cssLesson';

export const cssLesson12: CssLessonDefinition = {
  id: 'css-lesson-12',
  number: 12,
  slug: 'responsive-design-and-media-queries',
  title: 'Responsive Design & Media Queries',
  shortDescription: 'Build adaptive websites that look stunning on smartphones, tablets, and desktop displays using CSS @media queries.',
  estimatedMinutes: 9,
  learningObjectives: [
    'Understand the mobile-first philosophy of modern front-end engineering',
    'Write conditional CSS blocks using @media queries based on screen width',
    'Stack multi-column flex and grid layouts vertically on compact mobile screens',
  ],
  prerequisites: ['Lesson 8: Flexbox Layout Essentials.', 'Lesson 9: CSS Grid Architecture.'],
  sections: [
    {
      id: 'sec-12-1',
      title: 'What is Responsive Web Design?',
      content: `Over 60% of modern web traffic originates from smartphones. Responsive design ensures your layouts dynamically adapt to whatever screen dimensions the visitor is using:

• Never use rigid fixed widths (like \`width: 960px\`).
• Combine flexible percentages and modern layout containers (\`display: flex\`, \`display: grid\`).
• Re-arrange columns into vertical stacks when screen width narrows.`,
    },
    {
      id: 'sec-12-2',
      title: 'Writing @media Queries',
      content: `A media query applies CSS rules only when the screen matches specific physical constraints:

\`\`\`css
/* Base styles (Desktop / Large screen) */
.card-container {
  display: flex;
  flex-direction: row;
  gap: 20px;
}

/* On tablets and mobile phones (screen width under 768px) */
@media (max-width: 768px) {
  .card-container {
    flex-direction: column; /* Stack vertically */
  }
}
\`\`\`

• Common breakpoints:
  • \`640px\`: Small smartphones.
  • \`768px\`: Tablets and large phones.
  • \`1024px\`: Laptops and standard desktop displays.`,
      propertyReferences: [
        {
          property: '@media',
          description: 'Conditional CSS rule applied when media conditions match.',
          syntax: '@media (max-width: 768px) { ... }',
          commonValues: ['(max-width: 768px)', '(min-width: 1024px)'],
        },
        {
          property: 'flex-direction',
          description: 'Direction flex items are placed (row or column).',
          syntax: 'flex-direction: column;',
          commonValues: ['row', 'column', 'row-reverse'],
        },
      ],
    },
  ],
  exercises: [
    {
      id: 'css-ex-12-1',
      lessonId: 'css-lesson-12',
      order: 1,
      title: 'Create a Mobile-Adaptive Column Stack',
      objective: 'Configure .responsive-deck with display: flex; and flex-direction: row;. Then write an @media (max-width: 768px) query that switches .responsive-deck to flex-direction: column; on mobile screens.',
      htmlSnippet: `<div class="responsive-deck">\n  <div class="col">Left Column Content</div>\n  <div class="col">Right Column Content</div>\n</div>`,
      initialCss: `/* Write desktop styles and mobile @media query below */\n.responsive-deck {\n\n}\n\n.col {\n  flex: 1;\n  padding: 20px;\n  background: #ffffff;\n  border: 1px solid #e2e8f0;\n  border-radius: 8px;\n}`,
      solutionCss: `.responsive-deck {\n  display: flex;\n  flex-direction: row;\n  gap: 16px;\n}\n\n@media (max-width: 768px) {\n  .responsive-deck {\n    flex-direction: column;\n  }\n}\n\n.col {\n  flex: 1;\n  padding: 20px;\n  background: #ffffff;\n  border: 1px solid #e2e8f0;\n  border-radius: 8px;\n}`,
      validationRules: [
        {
          id: 'v1',
          description: 'Applies display: flex on .responsive-deck',
          targetSelector: '.responsive-deck',
          property: 'display',
          expectedValue: 'flex',
        },
        {
          id: 'v2',
          description: 'Includes a responsive @media (max-width: 768px) query block',
          targetSelector: '.responsive-deck',
          property: '@media',
          customValidator: 'has-media-query',
        },
        {
          id: 'v3',
          description: 'Changes flex-direction inside the media query',
          targetSelector: '.responsive-deck',
          property: 'flex-direction',
        },
      ],
      hint: 'Include display: flex; flex-direction: row; on .responsive-deck, and @media (max-width: 768px) { .responsive-deck { flex-direction: column; } }',
      explanation: 'Media queries allow multi-column horizontal layouts to stack comfortably into accessible single-column mobile flows.',
      quickChips: ['display: flex;', 'flex-direction: row;', '@media (max-width: 768px) {', 'flex-direction: column;', '}'],
    },
  ],
  quiz: [
    {
      id: 'q-css-12-1',
      question: 'What is the primary role of a CSS @media query in modern web development?',
      explanation: 'Media queries apply conditional CSS styles based on device capabilities and viewport screen dimensions.',
      difficulty: 'beginner',
      topicTag: 'css',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'To conditionally apply styles based on device viewport width or screen features', isCorrect: true },
        { id: 'opt-b', text: 'To download video and music files in the background', isCorrect: false },
        { id: 'opt-c', text: 'To connect to social media websites', isCorrect: false },
        { id: 'opt-d', text: 'To convert HTML into PDF documents', isCorrect: false },
      ],
    },
    {
      id: 'q-css-12-2',
      question: 'Which flex-direction value stacks horizontal row items vertically into a single column?',
      explanation: 'flex-direction: column aligns flex items vertically from top to bottom.',
      difficulty: 'beginner',
      topicTag: 'css',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'row', isCorrect: false },
        { id: 'opt-b', text: 'column', isCorrect: true },
        { id: 'opt-c', text: 'vertical-align', isCorrect: false },
        { id: 'opt-d', text: 'stack', isCorrect: false },
      ],
    },
    {
      id: 'q-css-12-3',
      question: 'What does the "Mobile-First" design philosophy advocate?',
      explanation: 'Mobile-first means writing baseline styles for small mobile screens first, then progressively enhancing for larger desktop viewports.',
      difficulty: 'beginner',
      topicTag: 'css',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'Designing the mobile smartphone layout first, then layering desktop enhancements via min-width queries', isCorrect: true },
        { id: 'opt-b', text: 'Never displaying web pages on desktop computers', isCorrect: false },
        { id: 'opt-c', text: 'Charging mobile users for viewing websites', isCorrect: false },
        { id: 'opt-d', text: 'Using only black and white colors on phones', isCorrect: false },
      ],
    },
  ],
};
