import { CssLessonDefinition } from '../../types/cssLesson';

export const cssLesson6: CssLessonDefinition = {
  id: 'css-lesson-6',
  number: 6,
  slug: 'css-units-and-responsive-sizing',
  title: 'CSS Units & Responsive Sizing',
  shortDescription: 'Understand the difference between absolute pixels (px) and relative units (rem, em, %, vh, vw) for scalable web layouts.',
  estimatedMinutes: 8,
  learningObjectives: [
    'Contrast fixed absolute units (px) with user-accessible relative units (rem, em)',
    'Use viewport percentage units (vh, vw) for full-screen hero designs',
    'Constrain content width responsibly using max-width and margin: 0 auto',
  ],
  prerequisites: ['Lesson 4: The CSS Box Model.'],
  sections: [
    {
      id: 'sec-6-1',
      title: 'Absolute (px) vs Relative Units (rem & em)',
      content: `• **\`px\` (Pixels)**: Fixed, absolute size. Does not scale if a visually impaired user increases default browser font sizes.
• **\`rem\` (Root EM)**: Relative to the root (\`<html>\`) font size (typically \`16px\`).
  • \`1rem = 16px\`, \`1.5rem = 24px\`, \`2rem = 32px\`.
  • **Accessibility Best Practice**: Always use \`rem\` for font sizes!
• **\`em\`**: Relative to the parent element font size. Useful for buttons where padding scales proportionally with font size.`,
    },
    {
      id: 'sec-6-2',
      title: 'Viewport Units & max-width',
      content: `• **\`vw\` (Viewport Width)**: \`100vw = 100%\` of browser window width.
• **\`vh\` (Viewport Height)**: \`100vh = 100%\` of browser window height.
• **\`max-width\`**: Caps an element's growth so lines of text don't stretch painfully wide on ultra-wide desktop monitors:

\`\`\`css
.container {
  width: 100%;
  max-width: 800px; /* Never exceeds 800px */
  margin: 0 auto;    /* Centers horizontally */
}
\`\`\``,
      propertyReferences: [
        {
          property: 'max-width',
          description: 'Maximum width threshold an element can expand to.',
          syntax: 'max-width: 600px;',
          commonValues: ['600px', '800px', '1200px', '100%'],
        },
      ],
    },
  ],
  exercises: [
    {
      id: 'css-ex-6-1',
      lessonId: 'css-lesson-6',
      order: 1,
      title: 'Build a Centered Responsive Container',
      objective: 'Style the .reading-container with a responsive width: 90%;, a max-width of 500px;, horizontal centering using margin: 0 auto;, and font-size: 1.125rem; on paragraph text.',
      htmlSnippet: `<div class="reading-container">\n  <h2>Accessible Typography</h2>\n  <p class="body-text">Using rem units allows users with custom browser font preferences to read your content comfortably.</p>\n</div>`,
      initialCss: `/* Style .reading-container and .body-text below */\n\n`,
      solutionCss: `.reading-container {\n  width: 90%;\n  max-width: 500px;\n  margin: 0 auto;\n  padding: 24px;\n  background: #ffffff;\n  border-radius: 8px;\n}\n\n.body-text {\n  font-size: 1.125rem;\n  line-height: 1.6;\n}`,
      validationRules: [
        {
          id: 'v1',
          description: 'Constrains width with max-width: 500px;',
          targetSelector: '.reading-container',
          property: 'max-width',
          expectedValue: '500px',
        },
        {
          id: 'v2',
          description: 'Centers container horizontally using margin: 0 auto; or auto margins',
          targetSelector: '.reading-container',
          property: 'margin',
          pattern: 'auto',
        },
        {
          id: 'v3',
          description: 'Sets accessible relative font size on .body-text using rem',
          targetSelector: '.body-text',
          property: 'font-size',
          pattern: 'rem',
        },
      ],
      hint: 'Include max-width: 500px; margin: 0 auto; in .reading-container, and font-size: 1.125rem; in .body-text.',
      explanation: 'Combining max-width with auto margins and rem units creates scalable, highly accessible reading layouts.',
      quickChips: ['max-width: 500px;', 'margin: 0 auto;', 'width: 90%;', 'font-size: 1.125rem;', 'font-size: 1rem;'],
    },
  ],
  quiz: [
    {
      id: 'q-css-6-1',
      question: 'What is 1rem equal to in a standard browser default configuration?',
      explanation: 'By default, browser root font size is 16px, so 1rem equals 16px.',
      difficulty: 'beginner',
      topicTag: 'css',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: '10px', isCorrect: false },
        { id: 'opt-b', text: '16px', isCorrect: true },
        { id: 'opt-c', text: '24px', isCorrect: false },
        { id: 'opt-d', text: '32px', isCorrect: false },
      ],
    },
    {
      id: 'q-css-6-2',
      question: 'Which unit is relative to the total height of the browser viewport window?',
      explanation: 'vh stands for viewport height (where 100vh equals 100% of the visible browser window height).',
      difficulty: 'beginner',
      topicTag: 'css',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'vw', isCorrect: false },
        { id: 'opt-b', text: 'vh', isCorrect: true },
        { id: 'opt-c', text: 'em', isCorrect: false },
        { id: 'opt-d', text: 'pt', isCorrect: false },
      ],
    },
    {
      id: 'q-css-6-3',
      question: 'How do you center a block element with a fixed or max-width horizontally on the page?',
      explanation: 'margin: 0 auto sets left and right margins to automatically share remaining space, centering the element.',
      difficulty: 'beginner',
      topicTag: 'css',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'margin: 0 auto;', isCorrect: true },
        { id: 'opt-b', text: 'text-align: center;', isCorrect: false },
        { id: 'opt-c', text: 'padding: center;', isCorrect: false },
        { id: 'opt-d', text: 'float: center;', isCorrect: false },
      ],
    },
    {
      id: 'q_css_6_auto_4',
      question: "What is the core principle taught in CSS Lesson 6 (CSS Units & Responsive Sizing)?",
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
      id: 'q_css_6_auto_5',
      question: "How does selector specificity influence rule application in Lesson 6?",
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
      id: 'q_css_6_auto_6',
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
      id: 'q_css_6_auto_7',
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
      id: 'q_css_6_auto_8',
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
      id: 'q_css_6_auto_9',
      question: "How do media queries enable responsive web design in Lesson 6?",
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
      id: 'q_css_6_auto_10',
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
