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
    {
      id: 'q_css_12_auto_4',
      question: "What is the core principle taught in CSS Lesson 12 (Responsive Design & Media Queries)?",
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
      id: 'q_css_12_auto_5',
      question: "How does selector specificity influence rule application in Lesson 12?",
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
      id: 'q_css_12_auto_6',
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
      id: 'q_css_12_auto_7',
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
      id: 'q_css_12_auto_8',
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
      id: 'q_css_12_auto_9',
      question: "How do media queries enable responsive web design in Lesson 12?",
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
      id: 'q_css_12_auto_10',
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
