import { CssLessonDefinition } from '../../types/cssLesson';

export const cssLesson9: CssLessonDefinition = {
  id: 'css-lesson-9',
  number: 9,
  slug: 'css-grid-architecture',
  title: 'CSS Grid Architecture',
  shortDescription: 'Build two-dimensional layouts with rows and columns simultaneously using CSS Grid and the flexible fractional unit (fr).',
  estimatedMinutes: 9,
  learningObjectives: [
    'Activate CSS Grid using display: grid on a parent container',
    'Define multi-column tracks using grid-template-columns and the repeat() helper',
    'Utilize the fractional unit (1fr) for flexible, proportional column distribution',
  ],
  prerequisites: ['Lesson 8: Flexbox Layout Essentials.'],
  sections: [
    {
      id: 'sec-9-1',
      title: 'Flexbox vs CSS Grid',
      content: `• **Flexbox**: Best for **one-dimensional** components (a single row or column of items).
• **CSS Grid**: Best for **two-dimensional** architectures (controlling both rows and columns at the same time).

\`\`\`css
.card-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 3 equal columns */
  gap: 20px;                             /* Gaps between rows and cols */
}
\`\`\`

• \`1fr\` (Fractional Unit): Represents a fraction of the available space inside the grid container.`,
    },
    {
      id: 'sec-9-2',
      title: 'The repeat() Function',
      content: `Instead of typing \`1fr 1fr 1fr\`, use \`repeat(3, 1fr)\`:

\`\`\`css
/* 2 unequal columns (sidebar + main content) */
.layout {
  display: grid;
  grid-template-columns: 240px 1fr;
  gap: 24px;
}

/* 4 equal columns for dashboard metrics */
.metrics-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}
\`\`\``,
      propertyReferences: [
        {
          property: 'grid-template-columns',
          description: 'Defines the column track sizing of the grid.',
          syntax: 'grid-template-columns: repeat(3, 1fr);',
          commonValues: ['repeat(3, 1fr)', 'repeat(2, 1fr)', '200px 1fr'],
        },
        {
          property: 'gap',
          description: 'Row and column spacing between grid cells.',
          syntax: 'gap: 16px;',
          commonValues: ['12px', '16px', '24px'],
        },
      ],
    },
  ],
  exercises: [
    {
      id: 'css-ex-9-1',
      lessonId: 'css-lesson-9',
      order: 1,
      title: 'Build a 3-Column Responsive Pricing Grid',
      objective: 'Configure .pricing-grid with display: grid;, 3 equal columns using grid-template-columns: repeat(3, 1fr);, and a gap: 16px;.',
      htmlSnippet: `<div class="pricing-grid">\n  <div class="plan">Starter ($9/mo)</div>\n  <div class="plan popular">Pro ($29/mo)</div>\n  <div class="plan">Enterprise ($99/mo)</div>\n</div>`,
      initialCss: `/* Style .pricing-grid with CSS Grid below */\n.pricing-grid {\n\n}\n\n.plan {\n  padding: 20px;\n  background: #ffffff;\n  border: 1px solid #e2e8f0;\n  border-radius: 8px;\n  text-align: center;\n}`,
      solutionCss: `.pricing-grid {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 16px;\n}\n\n.plan {\n  padding: 20px;\n  background: #ffffff;\n  border: 1px solid #e2e8f0;\n  border-radius: 8px;\n  text-align: center;\n}`,
      validationRules: [
        {
          id: 'v1',
          description: 'Activates CSS Grid with display: grid;',
          targetSelector: '.pricing-grid',
          property: 'display',
          expectedValue: 'grid',
        },
        {
          id: 'v2',
          description: 'Defines 3 columns using repeat(3, 1fr) or 3 equal fractional units',
          targetSelector: '.pricing-grid',
          property: 'grid-template-columns',
          customValidator: 'is-grid-layout',
        },
        {
          id: 'v3',
          description: 'Applies gap spacing between grid cards',
          targetSelector: '.pricing-grid',
          property: 'gap',
        },
      ],
      hint: 'Include display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; inside .pricing-grid.',
      explanation: 'CSS Grid repeat(3, 1fr) establishes 3 flexible tracks that divide remaining horizontal space equally.',
      quickChips: ['display: grid;', 'grid-template-columns: repeat(3, 1fr);', 'gap: 16px;', 'grid-template-columns: repeat(2, 1fr);'],
    },
  ],
  quiz: [
    {
      id: 'q-css-9-1',
      question: 'What does the unit "fr" stand for in CSS Grid?',
      explanation: 'fr stands for fractional unit, representing a fraction of the available free space in the grid.',
      difficulty: 'beginner',
      topicTag: 'css',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'Frame Rate', isCorrect: false },
        { id: 'opt-b', text: 'Fractional Unit', isCorrect: true },
        { id: 'opt-c', text: 'Fixed Ratio', isCorrect: false },
        { id: 'opt-d', text: 'Font Resolution', isCorrect: false },
      ],
    },
    {
      id: 'q-css-9-2',
      question: 'What is the shorthand syntax for creating 4 equal 1fr columns in CSS Grid?',
      explanation: 'repeat(4, 1fr) cleanly defines four tracks of 1fr width each.',
      difficulty: 'beginner',
      topicTag: 'css',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'grid-columns: 4;', isCorrect: false },
        { id: 'opt-b', text: 'grid-template-columns: repeat(4, 1fr);', isCorrect: true },
        { id: 'opt-c', text: 'columns: 4 x 1fr;', isCorrect: false },
        { id: 'opt-d', text: 'display: grid(4);', isCorrect: false },
      ],
    },
    {
      id: 'q-css-9-3',
      question: 'When should you choose CSS Grid over Flexbox?',
      explanation: 'CSS Grid is ideal for two-dimensional layouts requiring alignment across both rows and columns simultaneously.',
      difficulty: 'beginner',
      topicTag: 'css',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'When designing two-dimensional layouts with both rows and columns', isCorrect: true },
        { id: 'opt-b', text: 'Only when displaying tabular spreadsheets', isCorrect: false },
        { id: 'opt-c', text: 'Only for mobile devices', isCorrect: false },
        { id: 'opt-d', text: 'Only when using black-and-white color schemes', isCorrect: false },
      ],
    },
    {
      id: 'q_css_9_auto_4',
      question: "What is the core principle taught in CSS Lesson 9 (CSS Grid Architecture)?",
      explanation: "CSS governs the visual representation, responsive layout, and interactive styling of HTML elements.",
      difficulty: 'intermediate',
      topicTag: 'css',
      type: 'multiple-choice',
      options: [
        { id: 'opt_1', text: "Specifying visual rules, layout geometry, colors, typography, or responsive styles for DOM elements", isCorrect: true },
        { id: 'opt_2', text: "Manipulating server-side database tables", isCorrect: false },
        { id: 'opt_3', text: "Compiling backend microservices", isCorrect: false },
        { id: 'opt_4', text: "Writing relational database queries", isCorrect: false },
      ],
    },
    {
      id: 'q_css_9_auto_5',
      question: "How does selector specificity influence rule application in Lesson 9?",
      explanation: "CSS specificity (inline styles > IDs > classes/attributes/pseudo-classes > elements) determines which rule wins.",
      difficulty: 'intermediate',
      topicTag: 'css',
      type: 'multiple-choice',
      options: [
        { id: 'opt_1', text: "Higher specificity rules (e.g. IDs over classes over tags) override lower specificity declarations", isCorrect: true },
        { id: 'opt_2', text: "The first rule in the file always wins regardless of selector type", isCorrect: false },
        { id: 'opt_3', text: "CSS rules are chosen at random by the browser engine", isCorrect: false },
        { id: 'opt_4', text: "Specificity only applies when using CSS Grid", isCorrect: false },
      ],
    },
    {
      id: 'q_css_9_auto_6',
      question: "What are the four components of the standard CSS Box Model?",
      explanation: "Every element is modeled with Content at the center, surrounded by Padding, Border, and outer Margin.",
      difficulty: 'intermediate',
      topicTag: 'css',
      type: 'multiple-choice',
      options: [
        { id: 'opt_1', text: "Content, Padding, Border, and Margin", isCorrect: true },
        { id: 'opt_2', text: "Width, Height, Depth, and Color", isCorrect: false },
        { id: 'opt_3', text: "Top, Right, Bottom, and Left", isCorrect: false },
        { id: 'opt_4', text: "Header, Main, Section, and Footer", isCorrect: false },
      ],
    },
    {
      id: 'q_css_9_auto_7',
      question: "What does 'box-sizing: border-box;' do to element dimension calculations?",
      explanation: "border-box ensures that padding and borders do not expand the element beyond its specified width.",
      difficulty: 'intermediate',
      topicTag: 'css',
      type: 'multiple-choice',
      options: [
        { id: 'opt_1', text: "It includes padding and border in the element's total declared width and height", isCorrect: true },
        { id: 'opt_2', text: "It removes all borders from the element", isCorrect: false },
        { id: 'opt_3', text: "It forces the element to stretch across the full screen", isCorrect: false },
        { id: 'opt_4', text: "It sets margin to zero automatically", isCorrect: false },
      ],
    },
    {
      id: 'q_css_9_auto_8',
      question: "Which CSS property is used to create modern one-dimensional flexible layouts?",
      explanation: "Flexbox (display: flex) provides one-dimensional alignment and distribution along a main and cross axis.",
      difficulty: 'intermediate',
      topicTag: 'css',
      type: 'multiple-choice',
      options: [
        { id: 'opt_1', text: "display: flex", isCorrect: true },
        { id: 'opt_2', text: "display: table", isCorrect: false },
        { id: 'opt_3', text: "float: left", isCorrect: false },
        { id: 'opt_4', text: "position: absolute", isCorrect: false },
      ],
    },
    {
      id: 'q_css_9_auto_9',
      question: "How do media queries enable responsive web design in Lesson 9?",
      explanation: "@media queries inspect viewport properties (e.g., @media (min-width: 768px)) to adapt layouts to screen sizes.",
      difficulty: 'intermediate',
      topicTag: 'css',
      type: 'multiple-choice',
      options: [
        { id: 'opt_1', text: "They apply specific CSS rule sets conditionally based on screen viewport width or device features", isCorrect: true },
        { id: 'opt_2', text: "They compress image files on the fly", isCorrect: false },
        { id: 'opt_3', text: "They convert desktop pages into mobile apps automatically", isCorrect: false },
        { id: 'opt_4', text: "They detect user internet connection speeds", isCorrect: false },
      ],
    },
    {
      id: 'q_css_9_auto_10',
      question: "What is the advantage of using CSS Custom Properties (Variables) like var(--primary)?",
      explanation: "CSS variables defined via --name can be reused and dynamically altered across themes.",
      difficulty: 'intermediate',
      topicTag: 'css',
      type: 'multiple-choice',
      options: [
        { id: 'opt_1', text: "They allow centralizing theme tokens, reducing repetition, and dynamically changing styles at runtime", isCorrect: true },
        { id: 'opt_2', text: "They make web pages run in C++ speed", isCorrect: false },
        { id: 'opt_3', text: "They disable CSS inheritance", isCorrect: false },
        { id: 'opt_4', text: "They replace HTML tags entirely", isCorrect: false },
      ],
    },
  ],
};
