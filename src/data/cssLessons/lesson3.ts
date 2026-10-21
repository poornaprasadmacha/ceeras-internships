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
  ],
};
