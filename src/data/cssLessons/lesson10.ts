import { CssLessonDefinition } from '../../types/cssLesson';

export const cssLesson10: CssLessonDefinition = {
  id: 'css-lesson-10',
  number: 10,
  slug: 'positioning-and-z-index',
  title: 'Positioning & Layering (Z-Index)',
  shortDescription: 'Pin badges, floating headers, and modals with absolute, relative, fixed, and sticky positioning, and manage stacking with z-index.',
  estimatedMinutes: 9,
  learningObjectives: [
    'Understand normal document flow with position: static and relative',
    'Anchor overlays using position: absolute inside a position: relative parent',
    'Control 3D stacking order using integer z-index values',
  ],
  prerequisites: ['Lesson 4: The CSS Box Model.'],
  sections: [
    {
      id: 'sec-10-1',
      title: 'The CSS Position Values',
      content: `• **\`static\`**: Default. Follows normal document flow.
• **\`relative\`**: Stays in normal flow, but unlocks offset properties (\`top\`, \`right\`, \`bottom\`, \`left\`) and serves as an **anchor parent** for absolute children!
• **\`absolute\`**: Removed from normal flow. Positioned relative to its nearest positioned ancestor.
• **\`fixed\`**: Glued to the viewport screen even when the user scrolls (e.g. chat bubbles).
• **\`sticky\`**: Acts like normal flow until scrolled past a threshold, then sticks like fixed.`,
    },
    {
      id: 'sec-10-2',
      title: 'The Classic Relative-Absolute Pattern',
      content: `To position a badge in the top-right corner of a card:

\`\`\`css
/* Parent Anchor */
.card {
  position: relative;
}

/* Child Overlay */
.badge {
  position: absolute;
  top: 12px;
  right: 12px;
  z-index: 10;
}
\`\`\`

• If the parent is NOT \`position: relative\`, the absolute child flies all the way up to the \`<body>\` tag!
• \`z-index\`: Higher integers sit on top of lower integers.`,
      propertyReferences: [
        {
          property: 'position',
          description: 'Positioning scheme used for an element box.',
          syntax: 'position: relative;',
          commonValues: ['static', 'relative', 'absolute', 'fixed', 'sticky'],
        },
        {
          property: 'z-index',
          description: 'Stacking order of positioned elements.',
          syntax: 'z-index: 10;',
          commonValues: ['1', '10', '50', '100'],
        },
      ],
    },
  ],
  exercises: [
    {
      id: 'css-ex-10-1',
      lessonId: 'css-lesson-10',
      order: 1,
      title: 'Position a "NEW" Badge Inside a Card',
      objective: 'Anchor .card with position: relative;. Then position .badge in the top-right corner using position: absolute;, top: 12px;, right: 12px;, and z-index: 10;.',
      htmlSnippet: `<div class="card">\n  <span class="badge">NEW</span>\n  <h3>Ceeras Python Course</h3>\n  <p>Interactive student track with in-browser terminal.</p>\n</div>`,
      initialCss: `/* Position .card and .badge below */\n.card {\n  padding: 24px;\n  background: #ffffff;\n  border: 1px solid #e2e8f0;\n  border-radius: 8px;\n}\n\n.badge {\n  background: #0E5E77;\n  color: #ffffff;\n  padding: 4px 8px;\n  border-radius: 4px;\n  font-size: 11px;\n}`,
      solutionCss: `.card {\n  position: relative;\n  padding: 24px;\n  background: #ffffff;\n  border: 1px solid #e2e8f0;\n  border-radius: 8px;\n}\n\n.badge {\n  position: absolute;\n  top: 12px;\n  right: 12px;\n  z-index: 10;\n  background: #0E5E77;\n  color: #ffffff;\n  padding: 4px 8px;\n  border-radius: 4px;\n  font-size: 11px;\n}`,
      validationRules: [
        {
          id: 'v1',
          description: 'Sets position: relative on the parent .card',
          targetSelector: '.card',
          property: 'position',
          expectedValue: 'relative',
        },
        {
          id: 'v2',
          description: 'Sets position: absolute on the child .badge',
          targetSelector: '.badge',
          property: 'position',
          expectedValue: 'absolute',
        },
        {
          id: 'v3',
          description: 'Pins the badge with top and right offset declarations',
          targetSelector: '.badge',
          property: 'top',
        },
        {
          id: 'v4',
          description: 'Sets stacking elevation with z-index',
          targetSelector: '.badge',
          property: 'z-index',
        },
      ],
      hint: 'Set position: relative; on .card, and position: absolute; top: 12px; right: 12px; z-index: 10; on .badge.',
      explanation: 'A position: relative parent establishes the local coordinate system for position: absolute children.',
      quickChips: ['position: relative;', 'position: absolute;', 'top: 12px;', 'right: 12px;', 'z-index: 10;', 'position: fixed;'],
    },
  ],
  quiz: [
    {
      id: 'q-css-10-1',
      question: 'What is required on a parent element for a child with position: absolute to position relative to that parent?',
      explanation: 'The parent must have a non-static position (commonly position: relative) to establish the containing block.',
      difficulty: 'beginner',
      topicTag: 'css',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'The parent must have position: relative (or any non-static value)', isCorrect: true },
        { id: 'opt-b', text: 'The parent must be a <table> tag', isCorrect: false },
        { id: 'opt-c', text: 'The parent must have overflow: hidden', isCorrect: false },
        { id: 'opt-d', text: 'The parent must have width: 100%', isCorrect: false },
      ],
    },
    {
      id: 'q-css-10-2',
      question: 'Which position value keeps an element pinned to the screen viewport even when the page is scrolled?',
      explanation: 'position: fixed attaches an element to the browser viewport window.',
      difficulty: 'beginner',
      topicTag: 'css',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'static', isCorrect: false },
        { id: 'opt-b', text: 'fixed', isCorrect: true },
        { id: 'opt-c', text: 'relative', isCorrect: false },
        { id: 'opt-d', text: 'inline', isCorrect: false },
      ],
    },
    {
      id: 'q-css-10-3',
      question: 'Can z-index affect elements that have the default position: static?',
      explanation: 'No, z-index only applies to positioned elements (relative, absolute, fixed, or sticky) and flex/grid items.',
      difficulty: 'beginner',
      topicTag: 'css',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'No, z-index only functions on positioned elements', isCorrect: true },
        { id: 'opt-b', text: 'Yes, it works on every element equally', isCorrect: false },
        { id: 'opt-c', text: 'Only in Firefox', isCorrect: false },
        { id: 'opt-d', text: 'Only on images', isCorrect: false },
      ],
    },
    {
      id: 'q_css_10_auto_4',
      question: "What is the core principle taught in CSS Lesson 10 (Positioning & Layering (Z-Index))?",
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
      id: 'q_css_10_auto_5',
      question: "How does selector specificity influence rule application in Lesson 10?",
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
      id: 'q_css_10_auto_6',
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
      id: 'q_css_10_auto_7',
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
      id: 'q_css_10_auto_8',
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
      id: 'q_css_10_auto_9',
      question: "How do media queries enable responsive web design in Lesson 10?",
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
      id: 'q_css_10_auto_10',
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
