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
  ],
};
