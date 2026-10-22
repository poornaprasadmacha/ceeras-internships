import { CssLessonDefinition } from '../../types/cssLesson';

export const cssLesson4: CssLessonDefinition = {
  id: 'css-lesson-4',
  number: 4,
  slug: 'the-css-box-model',
  title: 'The CSS Box Model',
  shortDescription: 'Master the four core layers of every element: Content, Padding, Border, and Margin, plus box-sizing: border-box.',
  estimatedMinutes: 9,
  learningObjectives: [
    'Distinguish between inner padding (inside border) and outer margin (outside border)',
    'Use shorthand padding and margin notations (1, 2, and 4 values)',
    'Understand why box-sizing: border-box prevents accidental element overflow',
  ],
  prerequisites: ['Lesson 1: Intro to CSS & Selectors.'],
  sections: [
    {
      id: 'sec-4-1',
      title: 'The Four Layers of the Box Model',
      content: `In CSS, every single element on the page is treated as a rectangular box with four concentric layers:

1. **Content**: Where your text, images, or child elements live.
2. **Padding**: Clears an area around the content (inside the border, inherits background color).
3. **Border**: A border wrapping around the padding and content.
4. **Margin**: Clears an area outside the border (pushes neighboring elements away).

\`\`\`css
.card {
  padding: 20px;       /* Internal breathing room */
  border: 1px solid #cbd5e1;
  margin: 16px;        /* External space from other elements */
}
\`\`\``,
    },
    {
      id: 'sec-4-2',
      title: 'The Golden Rule: box-sizing: border-box',
      content: `By default (\`content-box\`), adding padding increases the total width of an element. Setting \`box-sizing: border-box\` makes \`width\` include the padding and border:

\`\`\`css
*, *::before, *::after {
  box-sizing: border-box;
}
\`\`\`

• Shorthand syntax:
  • \`padding: 10px;\` (All 4 sides)
  • \`padding: 10px 20px;\` (Top/Bottom, Left/Right)
  • \`padding: 10px 15px 20px 25px;\` (Clockwise: Top, Right, Bottom, Left)`,
      propertyReferences: [
        {
          property: 'padding',
          description: 'Inner whitespace between content and border.',
          syntax: 'padding: 16px 24px;',
          commonValues: ['8px', '16px', '24px', '1rem'],
        },
        {
          property: 'margin',
          description: 'Outer spacing pushing adjacent elements away.',
          syntax: 'margin: 0 auto;',
          commonValues: ['0 auto', '16px', '24px'],
        },
      ],
    },
  ],
  exercises: [
    {
      id: 'css-ex-4-1',
      lessonId: 'css-lesson-4',
      order: 1,
      title: 'Build a Notification Card with Proper Box Model Spacing',
      objective: 'Style the .notification box with padding: 16px;, a border of 1px solid #cbd5e1;, and an external margin: 12px; to create balanced whitespace.',
      htmlSnippet: `<div class="notification">\n  <h4>System Update Completed</h4>\n  <p>All database instances were migrated successfully.</p>\n</div>`,
      initialCss: `/* Style .notification below */\n.notification {\n\n}`,
      solutionCss: `.notification {\n  padding: 16px 20px;\n  border: 1px solid #cbd5e1;\n  margin: 12px;\n  background-color: #ffffff;\n  border-radius: 8px;\n}`,
      validationRules: [
        {
          id: 'v1',
          description: 'Adds internal padding of at least 12px',
          targetSelector: '.notification',
          property: 'padding',
          pattern: '1[2-9]px|2[0-9]px|1rem',
        },
        {
          id: 'v2',
          description: 'Adds an external margin to push surrounding elements away',
          targetSelector: '.notification',
          property: 'margin',
        },
        {
          id: 'v3',
          description: 'Defines a solid border on .notification',
          targetSelector: '.notification',
          property: 'border',
          pattern: 'solid',
        },
      ],
      hint: 'Include padding: 16px; border: 1px solid #cbd5e1; margin: 12px; inside .notification { }',
      explanation: 'Padding expands internal whitespace while margin pushes away neighboring cards and layout boundaries.',
      quickChips: ['padding: 16px;', 'margin: 12px;', 'border: 1px solid #cbd5e1;', 'background-color: #ffffff;'],
    },
  ],
  quiz: [
    {
      id: 'q-css-4-1',
      question: 'Which layer of the box model creates space INSIDE an element, between the content and the border?',
      explanation: 'Padding creates interior breathing room between the element content and its border.',
      difficulty: 'beginner',
      topicTag: 'css',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'Margin', isCorrect: false },
        { id: 'opt-b', text: 'Padding', isCorrect: true },
        { id: 'opt-c', text: 'Outline', isCorrect: false },
        { id: 'opt-d', text: 'Spread', isCorrect: false },
      ],
    },
    {
      id: 'q-css-4-2',
      question: 'When using 4 values in a shorthand like padding: 10px 20px 30px 40px;, in what order are sides applied?',
      explanation: 'Shorthand properties follow a clockwise direction: Top, Right, Bottom, Left (TRBL).',
      difficulty: 'beginner',
      topicTag: 'css',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'Top, Right, Bottom, Left (Clockwise)', isCorrect: true },
        { id: 'opt-b', text: 'Top, Left, Bottom, Right (Counter-clockwise)', isCorrect: false },
        { id: 'opt-c', text: 'Left, Right, Top, Bottom', isCorrect: false },
        { id: 'opt-d', text: 'Bottom, Top, Left, Right', isCorrect: false },
      ],
    },
    {
      id: 'q-css-4-3',
      question: 'Why is box-sizing: border-box universally recommended by professional web developers?',
      explanation: 'With border-box, the declared width includes both padding and border, preventing unexpected layout overflows.',
      difficulty: 'beginner',
      topicTag: 'css',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'It prevents elements from expanding beyond their specified width when padding is added', isCorrect: true },
        { id: 'opt-b', text: 'It automatically turns on dark mode', isCorrect: false },
        { id: 'opt-c', text: 'It hides all scrollbars permanently', isCorrect: false },
        { id: 'opt-d', text: 'It converts block elements into tables', isCorrect: false },
      ],
    },
    {
      id: 'q_css_4_auto_4',
      question: "What is the core principle taught in CSS Lesson 4 (The CSS Box Model)?",
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
      id: 'q_css_4_auto_5',
      question: "How does selector specificity influence rule application in Lesson 4?",
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
      id: 'q_css_4_auto_6',
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
      id: 'q_css_4_auto_7',
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
      id: 'q_css_4_auto_8',
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
      id: 'q_css_4_auto_9',
      question: "How do media queries enable responsive web design in Lesson 4?",
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
      id: 'q_css_4_auto_10',
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
