import { CssLessonDefinition } from '../../types/cssLesson';

export const cssLesson5: CssLessonDefinition = {
  id: 'css-lesson-5',
  number: 5,
  slug: 'borders-rounded-corners-and-shadows',
  title: 'Borders, Rounded Corners & Shadows',
  shortDescription: 'Elevate flat elements into modern tactile UI cards using border-radius, pill tags, and soft ambient box-shadows.',
  estimatedMinutes: 8,
  learningObjectives: [
    'Define border width, style (solid, dashed, dotted), and color',
    'Round corners with border-radius (subtle 8px, circular 50%, and pill 9999px)',
    'Simulate realistic physical elevation using multi-layer box-shadows',
  ],
  prerequisites: ['Lesson 4: The CSS Box Model.'],
  sections: [
    {
      id: 'sec-5-1',
      title: 'Borders & Rounded Corners (border-radius)',
      content: `• \`border\`: Combines width, style, and color (\`1px solid #e2e8f0\`).
• \`border-radius\`: Rounds the corners of elements:
  • \`8px\` or \`12px\`: Modern card rounded aesthetic.
  • \`9999px\`: Creates a smooth pill-shaped badge or button.
  • \`50%\`: Turns a square element into a circle (perfect for avatars!).

\`\`\`css
.avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%; /* Perfect circle */
}

.pill-badge {
  border-radius: 9999px; /* Pill shape */
  padding: 4px 12px;
}
\`\`\``,
    },
    {
      id: 'sec-5-2',
      title: 'Elevation with box-shadow',
      content: `\`box-shadow\` lifts elements off the page by casting realistic shadows:

\`\`\`css
.card {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.05);
}
\`\`\`

• \`offset-x\`: Horizontal position.
• \`offset-y\`: Vertical drop.
• \`blur-radius\`: Softness / diffusion of the shadow.
• \`spread-radius\`: Expansion or shrinkage.
• \`color\`: Typically a translucent black (\`rgba(0,0,0,0.1)\`).`,
      propertyReferences: [
        {
          property: 'border-radius',
          description: 'Defines the curvature of element corners.',
          syntax: 'border-radius: 12px;',
          commonValues: ['4px', '8px', '12px', '50%', '9999px'],
        },
        {
          property: 'box-shadow',
          description: 'Casts a shadow effect around an element frame.',
          syntax: 'box-shadow: 0 4px 12px rgba(0,0,0,0.08);',
          commonValues: ['0 1px 3px rgba(0,0,0,0.1)', '0 4px 6px rgba(0,0,0,0.1)'],
        },
      ],
    },
  ],
  exercises: [
    {
      id: 'css-ex-5-1',
      lessonId: 'css-lesson-5',
      order: 1,
      title: 'Design an Elevated Modern Product Card',
      objective: 'Style the .product-card with border-radius: 12px;, a subtle border: 1px solid #e2e8f0;, padding: 20px;, and an elevation box-shadow.',
      htmlSnippet: `<div class="product-card">\n  <h3>Cloud Computing Suite</h3>\n  <p>Scalable serverless infrastructure on demand.</p>\n  <button class="pill-btn">Get Started</button>\n</div>`,
      initialCss: `/* Style .product-card and .pill-btn below */\n\n`,
      solutionCss: `.product-card {\n  background-color: #ffffff;\n  border-radius: 12px;\n  border: 1px solid #e2e8f0;\n  padding: 24px;\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);\n}\n\n.pill-btn {\n  border-radius: 9999px;\n  padding: 8px 16px;\n  background-color: #1572B6;\n  color: #ffffff;\n  border: none;\n}`,
      validationRules: [
        {
          id: 'v1',
          description: 'Applies border-radius to curve .product-card corners (at least 8px)',
          targetSelector: '.product-card',
          property: 'border-radius',
          pattern: '[8-9]px|1[0-9]px',
        },
        {
          id: 'v2',
          description: 'Applies a box-shadow to .product-card for elevation',
          targetSelector: '.product-card',
          property: 'box-shadow',
        },
        {
          id: 'v3',
          description: 'Sets a pill border-radius on the .pill-btn button',
          targetSelector: '.pill-btn',
          property: 'border-radius',
          pattern: '9999px|50px|24px',
        },
      ],
      hint: 'Apply border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.08); to .product-card and border-radius: 9999px; to .pill-btn.',
      explanation: 'Curved radii paired with subtle box-shadows give user interfaces a soft, tactile, modern aesthetic.',
      quickChips: ['border-radius: 12px;', 'box-shadow: 0 4px 12px rgba(0,0,0,0.08);', 'border-radius: 9999px;', 'padding: 20px;'],
    },
  ],
  quiz: [
    {
      id: 'q-css-5-1',
      question: 'What value of border-radius transforms a square image into a perfect circle?',
      explanation: 'Setting border-radius: 50% turns any square element into a circle.',
      difficulty: 'beginner',
      topicTag: 'css',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: '100px', isCorrect: false },
        { id: 'opt-b', text: '50%', isCorrect: true },
        { id: 'opt-c', text: 'circle', isCorrect: false },
        { id: 'opt-d', text: 'round', isCorrect: false },
      ],
    },
    {
      id: 'q-css-5-2',
      question: 'In box-shadow: 0 4px 6px rgba(0,0,0,0.1);, what does the 6px value control?',
      explanation: 'The third numerical argument in box-shadow specifies the blur radius (how soft the shadow appears).',
      difficulty: 'beginner',
      topicTag: 'css',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'Horizontal offset', isCorrect: false },
        { id: 'opt-b', text: 'Blur radius (softness)', isCorrect: true },
        { id: 'opt-c', text: 'Spread expansion', isCorrect: false },
        { id: 'opt-d', text: 'Opacity percentage', isCorrect: false },
      ],
    },
    {
      id: 'q-css-5-3',
      question: 'Which border-radius value is standard for creating pill-shaped button components?',
      explanation: 'Using a large value like 9999px ensures fully rounded pill capsules regardless of element width.',
      difficulty: 'beginner',
      topicTag: 'css',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: '9999px or full pill curve', isCorrect: true },
        { id: 'opt-b', text: '1px', isCorrect: false },
        { id: 'opt-c', text: '0px', isCorrect: false },
        { id: 'opt-d', text: 'none', isCorrect: false },
      ],
    },
  ],
};
