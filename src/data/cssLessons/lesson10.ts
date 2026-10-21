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
  ],
};
