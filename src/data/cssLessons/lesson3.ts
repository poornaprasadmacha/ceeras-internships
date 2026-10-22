import { CssLessonDefinition } from '../../types/cssLesson';

export const cssLesson3: CssLessonDefinition = {
  id: 'css-lesson-3',
  number: 3,
  slug: 'typography-fonts-and-text-styling',
  title: 'Typography, Fonts & Text Styling',
  shortDescription: 'Format text for optimal legibility using font-family stacks, font-size, line-height, letter-spacing, and text-transform.',
  estimatedMinutes: 8,
  learningObjectives: [
    'Define fallback font families using font-family',
    'Control typographic scale using font-size and font-weight',
    'Improve reading ergonomics with line-height and letter-spacing',
  ],
  prerequisites: ['Lesson 1: Intro to CSS & Selectors.'],
  sections: [
    {
      id: 'sec-3-1',
      title: 'Font Families & Fallbacks',
      content: `Always provide a fallback stack in case a specific font isn't installed on the visitor's device:

\`\`\`css
body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
}
\`\`\`

• If the browser can't load the first font, it tries each subsequent one in order until finding an available system font.`,
    },
    {
      id: 'sec-3-2',
      title: 'Typographic Ergonomics',
      content: `• \`font-size\`: Sets the text scale (e.g. \`24px\`, \`1.5rem\`).
• \`font-weight\`: Controls boldness (\`400\` regular, \`600\` semibold, \`700\` bold).
• \`line-height\`: Space between lines of text (ideal reading range is \`1.5\` to \`1.7\`).
• \`letter-spacing\`: Tracking space between characters (e.g. \`0.05em\`).
• \`text-transform\`: Converts case (\`uppercase\`, \`lowercase\`, \`capitalize\`).

\`\`\`css
.eyebrow {
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #0E5E77;
}
\`\`\``,
      propertyReferences: [
        {
          property: 'line-height',
          description: 'Vertical spacing between lines of wrapped text.',
          syntax: 'line-height: 1.6;',
          commonValues: ['1.4', '1.5', '1.6', '1.8'],
        },
        {
          property: 'font-weight',
          description: 'Thickness of glyph strokes.',
          syntax: 'font-weight: 700;',
          commonValues: ['400 (normal)', '500 (medium)', '600 (semibold)', '700 (bold)'],
        },
      ],
    },
  ],
  exercises: [
    {
      id: 'css-ex-3-1',
      lessonId: 'css-lesson-3',
      order: 1,
      title: 'Style a Clean Editorial Article Header',
      objective: 'Style the .eyebrow tag with uppercase text and font-weight: 700;, and style the .article-body with line-height: 1.6; and color: #334155;.',
      htmlSnippet: `<article>\n  <span class="eyebrow">Front-End Engineering</span>\n  <h1>Mastering CSS Architecture</h1>\n  <p class="article-body">Clean typography makes content pleasant and effortless to digest across screen sizes.</p>\n</article>`,
      initialCss: `/* Style .eyebrow and .article-body below */\n\n`,
      solutionCss: `.eyebrow {\n  text-transform: uppercase;\n  font-weight: 700;\n  letter-spacing: 0.08em;\n  color: #0E5E77;\n}\n\n.article-body {\n  line-height: 1.6;\n  color: #334155;\n  font-size: 16px;\n}`,
      validationRules: [
        {
          id: 'v1',
          description: 'Transforms .eyebrow text to uppercase',
          targetSelector: '.eyebrow',
          property: 'text-transform',
          expectedValue: 'uppercase',
        },
        {
          id: 'v2',
          description: 'Sets font-weight of .eyebrow to bold or 700',
          targetSelector: '.eyebrow',
          property: 'font-weight',
          pattern: '700|bold',
        },
        {
          id: 'v3',
          description: 'Sets line-height of .article-body to at least 1.5 for comfortable reading',
          targetSelector: '.article-body',
          property: 'line-height',
          pattern: '1\\.[5-9]|2',
        },
      ],
      hint: 'Apply text-transform: uppercase; font-weight: 700; to .eyebrow, and line-height: 1.6; to .article-body.',
      explanation: 'Proper line-height and text transformations establish clear visual hierarchy between headers, metadata, and body text.',
      quickChips: ['text-transform: uppercase;', 'font-weight: 700;', 'line-height: 1.6;', 'letter-spacing: 0.05em;'],
    },
  ],
  quiz: [
    {
      id: 'q-css-3-1',
      question: 'Which property controls the vertical spacing between lines of paragraph text?',
      explanation: 'line-height sets the distance between baselines of text, ensuring readability.',
      difficulty: 'beginner',
      topicTag: 'css',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'letter-spacing', isCorrect: false },
        { id: 'opt-b', text: 'line-height', isCorrect: true },
        { id: 'opt-c', text: 'text-indent', isCorrect: false },
        { id: 'opt-d', text: 'word-spacing', isCorrect: false },
      ],
    },
    {
      id: 'q-css-3-2',
      question: 'What numerical value represents standard bold text in the font-weight property?',
      explanation: 'font-weight: 700 corresponds to standard bold font styling.',
      difficulty: 'beginner',
      topicTag: 'css',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: '400', isCorrect: false },
        { id: 'opt-b', text: '700', isCorrect: true },
        { id: 'opt-c', text: '100', isCorrect: false },
        { id: 'opt-d', text: '900', isCorrect: false },
      ],
    },
    {
      id: 'q-css-3-3',
      question: 'Which value for text-transform converts all text letters into capital letters?',
      explanation: 'text-transform: uppercase converts every character to upper case.',
      difficulty: 'beginner',
      topicTag: 'css',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'capitalize', isCorrect: false },
        { id: 'opt-b', text: 'uppercase', isCorrect: true },
        { id: 'opt-c', text: 'all-caps', isCorrect: false },
        { id: 'opt-d', text: 'bold', isCorrect: false },
      ],
    },
    {
      id: 'q_css_3_auto_4',
      question: "What is the core principle taught in CSS Lesson 3 (Typography, Fonts & Text Styling)?",
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
      id: 'q_css_3_auto_5',
      question: "How does selector specificity influence rule application in Lesson 3?",
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
      id: 'q_css_3_auto_6',
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
      id: 'q_css_3_auto_7',
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
      id: 'q_css_3_auto_8',
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
      id: 'q_css_3_auto_9',
      question: "How do media queries enable responsive web design in Lesson 3?",
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
      id: 'q_css_3_auto_10',
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
