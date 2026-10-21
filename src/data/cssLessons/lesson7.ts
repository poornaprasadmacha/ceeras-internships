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
  ],
};
