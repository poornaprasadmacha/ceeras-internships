import { HtmlLessonDefinition } from '../../types/htmlLesson';

export const htmlLesson2: HtmlLessonDefinition = {
  id: 'html-lesson-2',
  number: 2,
  slug: 'headings-paragraphs-and-separators',
  title: 'Headings, Paragraphs & Separators',
  shortDescription: 'Organize article structure logically using the 6 heading levels, paragraph breaks, and thematic rules.',
  estimatedMinutes: 8,
  learningObjectives: [
    'Use heading hierarchy levels <h1> through <h6> appropriately',
    'Insert single line breaks with <br> and dividers with <hr>',
    'Understand why skipping heading levels hurts accessibility',
  ],
  prerequisites: ['Lesson 1: Intro to HTML & Tags.'],
  sections: [
    {
      id: 'sec-2-1',
      title: 'The Six Heading Levels',
      content: `HTML offers six levels of headings from \`<h1>\` (highest importance) to \`<h6>\` (lowest importance):

\`\`\`html
<h1>Main Page Title</h1>
<h2>Primary Section</h2>
<h3>Sub-topic</h3>
<h4>Detailed subsection</h4>
<h5>Minor point</h5>
<h6>Footnote heading</h6>
\`\`\`

• Best practice: Use only **one** \`<h1>\` per webpage for the primary topic.
• Do not skip levels (e.g. going from \`<h1>\` straight to \`<h4>\`) as this confuses screen readers.`,
    },
    {
      id: 'sec-2-2',
      title: 'Paragraphs, Breaks (<br>), and Horizontal Rules (<hr>)',
      content: `• \`<p>\`: Creates a paragraph with automatic top and bottom margins.
• \`<br>\`: A self-closing line break that forces text to the next line without starting a new paragraph.
• \`<hr>\`: A horizontal rule that renders a subtle divider line to indicate a thematic shift in content.

\`\`\`html
<p>First line of text.<br>Second line of the same paragraph.</p>
<hr>
<p>A fresh topic begins here.</p>
\`\`\``,
      tagReferences: [
        {
          tag: '<br>',
          description: 'Inserts a single carriage line break.',
          syntax: '<br />',
          selfClosing: true,
        },
        {
          tag: '<hr>',
          description: 'Renders a thematic break / horizontal divider line.',
          syntax: '<hr />',
          selfClosing: true,
        },
      ],
    },
  ],
  exercises: [
    {
      id: 'html-ex-2-1',
      lessonId: 'html-lesson-2',
      order: 1,
      title: 'Structure a Clean Magazine Article',
      objective: 'Create an article with an <h1> main title, an <h2> section heading, a <p> paragraph, a horizontal divider <hr>, and an <h3> subtopic.',
      initialCode: `<!-- Build your structured article below -->\n\n`,
      solutionCode: `<h1>Space Exploration News</h1>\n<h2>Mission to Mars</h2>\n<p>Engineers have confirmed that the rover has collected new samples.</p>\n<hr>\n<h3>Geological Analysis</h3>`,
      validationRules: [
        {
          id: 'v1',
          description: 'Contains exactly one <h1> heading',
          selector: 'h1',
          exactCount: 1,
        },
        {
          id: 'v2',
          description: 'Contains at least one <h2> heading',
          selector: 'h2',
          minCount: 1,
        },
        {
          id: 'v3',
          description: 'Contains at least one <p> paragraph',
          selector: 'p',
          minCount: 1,
        },
        {
          id: 'v4',
          description: 'Contains a horizontal rule divider <hr>',
          selector: 'hr',
          minCount: 1,
        },
        {
          id: 'v5',
          description: 'Contains an <h3> subsection heading',
          selector: 'h3',
          minCount: 1,
        },
      ],
      hint: 'Include <h1>Title</h1>, <h2>Section</h2>, <p>Text</p>, <hr>, and <h3>Subheading</h3>.',
      explanation: 'Organizing content with hierarchical headings helps readers and search engines digest page topics quickly.',
      quickChips: ['<h1></h1>', '<h2></h2>', '<h3></h3>', '<p></p>', '<hr />', '<br />'],
    },
  ],
  quiz: [
        {
      id: 'q-html-2-1',
      question: "Which heading tag represents the highest level of structural importance?",
      explanation: "<h1> is the top-level heading on any web page.",
      difficulty: 'beginner',
      topicTag: 'html',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: "<h6>", isCorrect: false },
        { id: 'opt-b', text: "<h1>", isCorrect: true },
        { id: 'opt-c', text: "<header>", isCorrect: false },
        { id: 'opt-d', text: "<top>", isCorrect: false },
      ],
    },
        {
      id: 'q-html-2-2',
      question: "Which tag creates a visual horizontal divider line between sections?",
      explanation: "<hr> represents a thematic break and renders as a horizontal rule.",
      difficulty: 'beginner',
      topicTag: 'html',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: "<divider>", isCorrect: false },
        { id: 'opt-b', text: "<border>", isCorrect: false },
        { id: 'opt-c', text: "<hr>", isCorrect: true },
        { id: 'opt-d', text: "<line>", isCorrect: false },
      ],
    },
        {
      id: 'q-html-2-3',
      question: "Does the line break tag <br> require a separate closing </br> tag in HTML5?",
      explanation: "<br> is a void element and does not require a closing tag.",
      difficulty: 'beginner',
      topicTag: 'html',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: "No", isCorrect: true },
        { id: 'opt-b', text: "<br> is a self-contained void element", isCorrect: false },
        { id: 'opt-c', text: "Yes", isCorrect: false },
        { id: 'opt-d', text: "every HTML element requires an opening and closing tag", isCorrect: false },
        { id: 'opt-e', text: "Only when used inside a paragraph", isCorrect: false },
        { id: 'opt-undefined', text: "Only on mobile devices", isCorrect: false },
      ],
    },
  ],
};
