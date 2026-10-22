import { CssLessonDefinition } from '../../types/cssLesson';

export const cssLesson7: CssLessonDefinition = {
  id: 'css-lesson-7',
  number: 7,
  slug: 'the-display-property-and-flow',
  title: 'The Display Property & Element Flow',
  shortDescription: 'Understand standard document flow: block vs inline elements, inline-block hybrids, and hiding elements with display: none.',
  estimatedMinutes: 8,
  learningObjectives: [
    'Contrast block-level elements (take full width) with inline elements (fit content only)',
    'Use inline-block to apply width, height, and vertical padding to inline items',
    'Understand the difference between display: none and visibility: hidden',
  ],
  prerequisites: ['Lesson 4: The CSS Box Model.'],
  sections: [
    {
      id: 'sec-7-1',
      title: 'Block vs Inline Elements',
      content: `Every HTML tag has a default \`display\` value:

• **\`block\`** (\`<div>\`, \`<p>\`, \`<h1>\`, \`<section>\`):
  • Starts on a brand new line.
  • Stretches to fill the entire available width.
  • Respects \`width\`, \`height\`, \`margin\`, and \`padding\`.

• **\`inline\`** (\`<span>\`, \`<a>\`, \`<strong>\`, \`<em>\`):
  • Sits alongside neighboring words on the same line.
  • Width and height properties **have no effect**.
  • Vertical padding and margins will not push other lines away properly.`,
    },
    {
      id: 'sec-7-2',
      title: 'The Best of Both Worlds: inline-block',
      content: `\`inline-block\` allows elements to sit side-by-side like text words, but **fully respect** width, height, and box-model padding:

\`\`\`css
.nav-link {
  display: inline-block;
  padding: 8px 16px;
  background-color: #0E5E77;
  color: white;
}
\`\`\`

• **\`display: none\`**: Completely removes the element from visual flow (takes up 0 space).
• **\`visibility: hidden\`**: Hides the element, but its empty bounding box still occupies space on the page.`,
      propertyReferences: [
        {
          property: 'display',
          description: 'Specifies the display rendering behavior of an element box.',
          syntax: 'display: inline-block;',
          commonValues: ['block', 'inline', 'inline-block', 'none', 'flex', 'grid'],
        },
      ],
    },
  ],
  exercises: [
    {
      id: 'css-ex-7-1',
      lessonId: 'css-lesson-7',
      order: 1,
      title: 'Convert Navigation Links into Clickable Button Pills',
      objective: 'Anchor links (<a>) are inline by default and ignore vertical padding. Change .nav-item to display: inline-block; with padding: 8px 16px; and a background-color: #0E5E77;.',
      htmlSnippet: `<nav class="nav-bar">\n  <a href="#" class="nav-item">Dashboard</a>\n  <a href="#" class="nav-item">Curriculum</a>\n  <a href="#" class="nav-item">Settings</a>\n</nav>`,
      initialCss: `/* Style .nav-item below */\n.nav-item {\n\n}`,
      solutionCss: `.nav-item {\n  display: inline-block;\n  padding: 8px 16px;\n  background-color: #0E5E77;\n  color: #ffffff;\n  text-decoration: none;\n  border-radius: 6px;\n  margin-right: 8px;\n}`,
      validationRules: [
        {
          id: 'v1',
          description: 'Sets display: inline-block on .nav-item',
          targetSelector: '.nav-item',
          property: 'display',
          expectedValue: 'inline-block',
        },
        {
          id: 'v2',
          description: 'Applies comfortable clickable padding (at least 8px)',
          targetSelector: '.nav-item',
          property: 'padding',
        },
        {
          id: 'v3',
          description: 'Sets background-color on .nav-item',
          targetSelector: '.nav-item',
          property: 'background-color',
        },
      ],
      hint: 'Include display: inline-block; padding: 8px 16px; background-color: #0E5E77; color: white; inside .nav-item.',
      explanation: 'display: inline-block gives links full box model support while keeping them side by side in navigation bars.',
      quickChips: ['display: inline-block;', 'padding: 8px 16px;', 'background-color: #0E5E77;', 'color: #ffffff;', 'border-radius: 6px;'],
    },
  ],
  quiz: [
    {
      id: 'q-css-7-1',
      question: 'Which default display value causes an element to begin on a new line and stretch across full width?',
      explanation: 'Block-level elements (like <div> and <p>) automatically take 100% available width and begin on new lines.',
      difficulty: 'beginner',
      topicTag: 'css',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'inline', isCorrect: false },
        { id: 'opt-b', text: 'block', isCorrect: true },
        { id: 'opt-c', text: 'relative', isCorrect: false },
        { id: 'opt-d', text: 'static', isCorrect: false },
      ],
    },
    {
      id: 'q-css-7-2',
      question: 'Why do developers switch inline elements to inline-block?',
      explanation: 'inline-block allows setting explicit width, height, and vertical padding while remaining on the same line.',
      difficulty: 'beginner',
      topicTag: 'css',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'To enable width, height, and vertical padding while staying on the same horizontal line', isCorrect: true },
        { id: 'opt-b', text: 'To make fonts bold automatically', isCorrect: false },
        { id: 'opt-c', text: 'To convert them into 3D animations', isCorrect: false },
        { id: 'opt-d', text: 'To hide them on mobile', isCorrect: false },
      ],
    },
    {
      id: 'q-css-7-3',
      question: 'What happens to element layout space when display: none is applied?',
      explanation: 'display: none removes the element from rendering completely, leaving no empty space behind.',
      difficulty: 'beginner',
      topicTag: 'css',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'The element is completely removed from document flow with zero space taken', isCorrect: true },
        { id: 'opt-b', text: 'An invisible blank placeholder remains on the page', isCorrect: false },
        { id: 'opt-c', text: 'The element turns half-transparent', isCorrect: false },
        { id: 'opt-d', text: 'The element shrinks to 1px width', isCorrect: false },
      ],
    },
    {
      id: 'q_css_7_auto_4',
      question: "What is the core principle taught in CSS Lesson 7 (The Display Property & Element Flow)?",
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
      id: 'q_css_7_auto_5',
      question: "How does selector specificity influence rule application in Lesson 7?",
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
      id: 'q_css_7_auto_6',
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
      id: 'q_css_7_auto_7',
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
      id: 'q_css_7_auto_8',
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
      id: 'q_css_7_auto_9',
      question: "How do media queries enable responsive web design in Lesson 7?",
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
      id: 'q_css_7_auto_10',
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
