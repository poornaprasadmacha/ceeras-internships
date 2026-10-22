import { CssLessonDefinition } from '../../types/cssLesson';

export const cssLesson8: CssLessonDefinition = {
  id: 'css-lesson-8',
  number: 8,
  slug: 'flexbox-layout-essentials',
  title: 'Flexbox Layout Essentials',
  shortDescription: 'Master modern one-dimensional layouts: align items effortlessly with justify-content, align-items, flex-direction, and gap.',
  estimatedMinutes: 9,
  learningObjectives: [
    'Activate Flexbox using display: flex on a parent container',
    'Align items along the main axis with justify-content (center, space-between)',
    'Align items along the cross axis with align-items (center, stretch)',
    'Space child elements cleanly using the gap property',
  ],
  prerequisites: ['Lesson 7: The Display Property & Flow.'],
  sections: [
    {
      id: 'sec-8-1',
      title: 'The Power of Flexbox',
      content: `Before Flexbox, aligning items horizontally or vertically required awkward float hacks. Flexbox makes one-dimensional layouts intuitive:

\`\`\`css
.flex-container {
  display: flex;
  justify-content: space-between; /* Horizontal spacing */
  align-items: center;            /* Vertical centering */
  gap: 16px;                      /* Clean spacing between children */
}
\`\`\`

• Setting \`display: flex\` transforms all immediate child elements into flexible items.`,
    },
    {
      id: 'sec-8-2',
      title: 'Main Axis vs Cross Axis',
      content: `• **Main Axis (\`justify-content\`)**:
  • \`flex-start\`: Default (starts at the left).
  • \`center\`: Groups all items in the center.
  • \`space-between\`: First item at the start, last at the end, equal space between them.
  • \`space-around\` / \`space-evenly\`: Proportional padding around each item.

• **Cross Axis (\`align-items\`)**:
  • \`center\`: Vertically centers items.
  • \`stretch\`: Default (stretches items to match container height).
  • \`flex-start\` / \`flex-end\`: Aligns to top or bottom.`,
      propertyReferences: [
        {
          property: 'justify-content',
          description: 'Aligns flex items along the primary main axis.',
          syntax: 'justify-content: space-between;',
          commonValues: ['flex-start', 'center', 'space-between', 'space-around'],
        },
        {
          property: 'align-items',
          description: 'Aligns flex items along the perpendicular cross axis.',
          syntax: 'align-items: center;',
          commonValues: ['stretch', 'center', 'flex-start', 'flex-end'],
        },
        {
          property: 'gap',
          description: 'Defines spacing between items without messy child margins.',
          syntax: 'gap: 16px;',
          commonValues: ['8px', '16px', '24px'],
        },
      ],
    },
  ],
  exercises: [
    {
      id: 'css-ex-8-1',
      lessonId: 'css-lesson-8',
      order: 1,
      title: 'Build a Modern Centered Flexbox Toolbar',
      objective: 'Transform .toolbar into display: flex;, space items with justify-content: space-between;, align items vertically with align-items: center;, and set gap: 12px;.',
      htmlSnippet: `<div class="toolbar">\n  <div class="brand">Ceeras Hub</div>\n  <div class="actions">\n    <button class="btn">Search</button>\n    <button class="btn btn-primary">Sign In</button>\n  </div>\n</div>`,
      initialCss: `/* Style .toolbar using Flexbox below */\n.toolbar {\n\n}`,
      solutionCss: `.toolbar {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 12px;\n  padding: 16px;\n  background-color: #ffffff;\n  border-radius: 8px;\n  border: 1px solid #e2e8f0;\n}`,
      validationRules: [
        {
          id: 'v1',
          description: 'Activates Flexbox with display: flex;',
          targetSelector: '.toolbar',
          property: 'display',
          expectedValue: 'flex',
        },
        {
          id: 'v2',
          description: 'Spaces brand and actions apart with justify-content: space-between;',
          targetSelector: '.toolbar',
          property: 'justify-content',
          expectedValue: 'space-between',
        },
        {
          id: 'v3',
          description: 'Centers items vertically with align-items: center;',
          targetSelector: '.toolbar',
          property: 'align-items',
          expectedValue: 'center',
        },
        {
          id: 'v4',
          description: 'Applies gap spacing between child sections',
          targetSelector: '.toolbar',
          property: 'gap',
        },
      ],
      hint: 'Write display: flex; justify-content: space-between; align-items: center; gap: 12px; inside .toolbar.',
      explanation: 'Flexbox allows headers, toolbars, and cards to distribute space and center items across viewport sizes cleanly.',
      quickChips: ['display: flex;', 'justify-content: space-between;', 'align-items: center;', 'gap: 12px;', 'justify-content: center;'],
    },
  ],
  quiz: [
    {
      id: 'q-css-8-1',
      question: 'Which property aligns flex items along the primary main axis (e.g. horizontally in a row)?',
      explanation: 'justify-content distributes space along the main axis of a flex container.',
      difficulty: 'beginner',
      topicTag: 'css',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'align-items', isCorrect: false },
        { id: 'opt-b', text: 'justify-content', isCorrect: true },
        { id: 'opt-c', text: 'flex-direction', isCorrect: false },
        { id: 'opt-d', text: 'align-content', isCorrect: false },
      ],
    },
    {
      id: 'q-css-8-2',
      question: 'How do you center child elements both horizontally and vertically inside a flex container?',
      explanation: 'Combining justify-content: center and align-items: center creates perfect two-axis centering.',
      difficulty: 'beginner',
      topicTag: 'css',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'justify-content: center; align-items: center;', isCorrect: true },
        { id: 'opt-b', text: 'text-align: center; margin: 0 auto;', isCorrect: false },
        { id: 'opt-c', text: 'position: center;', isCorrect: false },
        { id: 'opt-d', text: 'float: center;', isCorrect: false },
      ],
    },
    {
      id: 'q-css-8-3',
      question: 'What is the advantage of using the gap property over individual child margins?',
      explanation: 'gap automatically applies spacing between items only, without adding unwanted space on the outer boundaries.',
      difficulty: 'beginner',
      topicTag: 'css',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'It places space exclusively between adjacent items without outer boundary overflow', isCorrect: true },
        { id: 'opt-b', text: 'It rotates items by 45 degrees', isCorrect: false },
        { id: 'opt-c', text: 'It only works in print mode', isCorrect: false },
        { id: 'opt-d', text: 'It removes the flexbox display', isCorrect: false },
      ],
    },
    {
      id: 'q_css_8_auto_4',
      question: "What is the core principle taught in CSS Lesson 8 (Flexbox Layout Essentials)?",
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
      id: 'q_css_8_auto_5',
      question: "How does selector specificity influence rule application in Lesson 8?",
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
      id: 'q_css_8_auto_6',
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
      id: 'q_css_8_auto_7',
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
      id: 'q_css_8_auto_8',
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
      id: 'q_css_8_auto_9',
      question: "How do media queries enable responsive web design in Lesson 8?",
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
      id: 'q_css_8_auto_10',
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
