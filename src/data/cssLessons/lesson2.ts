import { CssLessonDefinition } from '../../types/cssLesson';

export const cssLesson2: CssLessonDefinition = {
  id: 'css-lesson-2',
  number: 2,
  slug: 'colors-backgrounds-and-gradients',
  title: 'Colors, Backgrounds & Gradients',
  shortDescription: 'Master color representations (Hex, RGB, HSL) and design striking backgrounds with multi-color linear gradients.',
  estimatedMinutes: 8,
  learningObjectives: [
    'Define colors using Hex codes (#ffffff), RGB, and RGBA with alpha transparency',
    'Set solid background colors and control contrast against text',
    'Create multi-color smooth transitions using linear-gradient()',
  ],
  prerequisites: ['Lesson 1: Intro to CSS & Selectors.'],
  sections: [
    {
      id: 'sec-2-1',
      title: 'Modern Color Notations in CSS',
      content: `CSS supports multiple color notations:

• **Hexadecimal (Hex)**: \`#0E5E77\` (6 digits: Red, Green, Blue from \`00\` to \`ff\`).
• **RGB**: \`rgb(14, 94, 119)\` (numbers from 0 to 255).
• **RGBA (with Opacity)**: \`rgba(14, 94, 119, 0.85)\` (alpha channel from 0.0 transparent to 1.0 fully opaque).
• **HSL**: \`hsl(194, 79%, 26%)\` (Hue, Saturation, Lightness).`,
    },
    {
      id: 'sec-2-2',
      title: 'Linear Gradients (Smooth Color Transitions)',
      content: `A gradient creates a smooth progression between two or more colors:

\`\`\`css
.gradient-banner {
  background: linear-gradient(135deg, #0E5E77, #33A9DC);
  color: #ffffff;
}
\`\`\`

• The first parameter specifies direction (e.g. \`to right\`, \`135deg\`, \`to bottom\`).
• Subsequent parameters list color stops in order.`,
      propertyReferences: [
        {
          property: 'background',
          description: 'Shorthand for setting background colors, images, and gradients.',
          syntax: 'background: linear-gradient(to right, #0E5E77, #33A9DC);',
          commonValues: ['#ffffff', 'linear-gradient(...)', 'transparent'],
        },
      ],
    },
  ],
  exercises: [
    {
      id: 'css-ex-2-1',
      lessonId: 'css-lesson-2',
      order: 1,
      title: 'Build a Modern Gradient Hero Banner',
      objective: 'Style the .hero banner with a linear-gradient background from #0E5E77 to #33A9DC, white text color (#ffffff), and centered text alignment.',
      htmlSnippet: `<div class="hero">\n  <h1>Design Systems with CSS</h1>\n  <p>Learn modern gradients and visual hierarchy.</p>\n</div>`,
      initialCss: `/* Style the .hero banner below */\n.hero {\n\n}`,
      solutionCss: `.hero {\n  background: linear-gradient(135deg, #0E5E77, #33A9DC);\n  color: #ffffff;\n  text-align: center;\n  padding: 32px;\n  border-radius: 12px;\n}`,
      validationRules: [
        {
          id: 'v1',
          description: 'Applies a linear-gradient background on .hero',
          targetSelector: '.hero',
          property: 'background',
          customValidator: 'has-gradient',
        },
        {
          id: 'v2',
          description: 'Sets text color to white (#ffffff)',
          targetSelector: '.hero',
          property: 'color',
          pattern: '#ffffff|rgb\\(255,\\s*255,\\s*255\\)|white',
        },
        {
          id: 'v3',
          description: 'Centers the text using text-align: center;',
          targetSelector: '.hero',
          property: 'text-align',
          expectedValue: 'center',
        },
      ],
      hint: 'Include background: linear-gradient(135deg, #0E5E77, #33A9DC); color: #ffffff; text-align: center;',
      explanation: 'Linear gradients elevate modern hero components and cards without requiring heavy image downloads.',
      quickChips: ['background: linear-gradient(135deg, #0E5E77, #33A9DC);', 'color: #ffffff;', 'text-align: center;', 'padding: 24px;'],
    },
  ],
  quiz: [
    {
      id: 'q-css-2-1',
      question: 'What does the "A" in the RGBA color function represent?',
      explanation: 'The A in RGBA stands for Alpha, which controls the transparency of the color from 0.0 to 1.0.',
      difficulty: 'beginner',
      topicTag: 'css',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'Accent', isCorrect: false },
        { id: 'opt-b', text: 'Alpha (transparency)', isCorrect: true },
        { id: 'opt-c', text: 'Alignment', isCorrect: false },
        { id: 'opt-d', text: 'Altitude', isCorrect: false },
      ],
    },
    {
      id: 'q-css-2-2',
      question: 'Which function produces a smooth transition between two or more colors?',
      explanation: 'linear-gradient() generates a progressive color blend across an element.',
      difficulty: 'beginner',
      topicTag: 'css',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'color-mix()', isCorrect: false },
        { id: 'opt-b', text: 'linear-gradient()', isCorrect: true },
        { id: 'opt-c', text: 'transition-color()', isCorrect: false },
        { id: 'opt-d', text: 'shadow-blend()', isCorrect: false },
      ],
    },
    {
      id: 'q-css-2-3',
      question: 'How many hexadecimal digits are typically used to represent an RGB color in CSS?',
      explanation: 'A full hex color code consists of 6 hexadecimal digits preceded by a hash symbol (e.g. #0E5E77).',
      difficulty: 'beginner',
      topicTag: 'css',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: '3 or 6', isCorrect: true },
        { id: 'opt-b', text: '10', isCorrect: false },
        { id: 'opt-c', text: '12', isCorrect: false },
        { id: 'opt-d', text: '4 only', isCorrect: false },
      ],
    },
    {
      id: 'q_css_2_auto_4',
      question: "What is the core principle taught in CSS Lesson 2 (Colors, Backgrounds & Gradients)?",
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
      id: 'q_css_2_auto_5',
      question: "How does selector specificity influence rule application in Lesson 2?",
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
      id: 'q_css_2_auto_6',
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
      id: 'q_css_2_auto_7',
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
      id: 'q_css_2_auto_8',
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
      id: 'q_css_2_auto_9',
      question: "How do media queries enable responsive web design in Lesson 2?",
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
      id: 'q_css_2_auto_10',
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
