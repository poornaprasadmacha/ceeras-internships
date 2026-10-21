import { HtmlLessonDefinition } from '../../types/htmlLesson';

export const htmlLesson3: HtmlLessonDefinition = {
  id: 'html-lesson-3',
  number: 3,
  slug: 'text-formatting-and-semantic-typography',
  title: 'Text Formatting & Semantic Typography',
  shortDescription: 'Add emphasis, importance, quotations, and inline code formatting to your textual content.',
  estimatedMinutes: 8,
  learningObjectives: [
    'Differentiate between semantic <strong> (importance) and <em> (emphasis)',
    'Highlight key phrases using <mark> and render inline code with <code>',
    'Structure extended quotes using <blockquote>',
  ],
  prerequisites: ['Lesson 2: Headings & Paragraphs.'],
  sections: [
    {
      id: 'sec-3-1',
      title: 'Semantic Importance vs Emphasis',
      content: `In modern HTML5, typography tags carry real semantic meaning for screen readers:

• \`<strong>\`: Indicates strong importance or urgency (displays bold).
• \`<em>\`: Indicates stress emphasis (displays in italics).
• \`<mark>\`: Highlights text with a soft yellow background to indicate relevance.

\`\`\`html
<p>Always keep your password <strong>strictly secret</strong>.</p>
<p>I <em>really</em> enjoy writing HTML code!</p>
<p>Today's featured topic is <mark>Web Accessibility</mark>.</p>
\`\`\``,
    },
    {
      id: 'sec-3-2',
      title: 'Code Snippets and Blockquotes',
      content: `• \`<code>\`: Renders monospace text for programming keywords and functions.
• \`<blockquote>\`: Indicates a section quoted from another source, indented with a left border.

\`\`\`html
<p>To print in Python, invoke the <code>print()</code> function.</p>

<blockquote>
  Simplicity is prerequisite for reliability. — Edsger Dijkstra
</blockquote>
\`\`\``,
      tagReferences: [
        {
          tag: '<code>',
          description: 'Formats computer code with monospace font.',
          syntax: '<code>var x = 10;</code>',
        },
        {
          tag: '<blockquote>',
          description: 'Indents and styles an extended quotation.',
          syntax: '<blockquote>Quoted text</blockquote>',
        },
      ],
    },
  ],
  exercises: [
    {
      id: 'html-ex-3-1',
      lessonId: 'html-lesson-3',
      order: 1,
      title: 'Format a Tech Advisory Note',
      objective: 'Write a paragraph containing <strong> for a warning, <em> for emphasis, <mark> for a highlighted term, <code> for a command, and a <blockquote> quote.',
      initialCode: `<!-- Write your formatted text below -->\n\n`,
      solutionCode: `<p><strong>Warning:</strong> Always check your <em>syntax</em> before deploying <mark>production</mark> code.</p>\n<p>Execute the <code>git status</code> command in your terminal.</p>\n<blockquote>Knowledge is power.</blockquote>`,
      validationRules: [
        {
          id: 'v1',
          description: 'Contains a <strong> element for strong importance',
          selector: 'strong',
          minCount: 1,
        },
        {
          id: 'v2',
          description: 'Contains an <em> element for emphasis',
          selector: 'em',
          minCount: 1,
        },
        {
          id: 'v3',
          description: 'Contains a <mark> element for highlighting',
          selector: 'mark',
          minCount: 1,
        },
        {
          id: 'v4',
          description: 'Contains a <code> element for technical syntax',
          selector: 'code',
          minCount: 1,
        },
        {
          id: 'v5',
          description: 'Contains a <blockquote> element',
          selector: 'blockquote',
          minCount: 1,
        },
      ],
      hint: 'Include at least one each of <strong>, <em>, <mark>, <code>, and <blockquote>.',
      explanation: 'Semantic markup gives screen readers auditory inflections and provides clear styling cues to browsers.',
      quickChips: ['<strong></strong>', '<em></em>', '<mark></mark>', '<code></code>', '<blockquote></blockquote>', '<p></p>'],
    },
  ],
  quiz: [
        {
      id: 'q-html-3-1',
      question: "Which tag should you use to denote strong importance or urgency in text?",
      explanation: "<strong> conveys semantic importance, whereas <b> is purely visual presentation.",
      difficulty: 'beginner',
      topicTag: 'html',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: "<b>", isCorrect: false },
        { id: 'opt-b', text: "<strong>", isCorrect: true },
        { id: 'opt-c', text: "<bold>", isCorrect: false },
        { id: 'opt-d', text: "<urgent>", isCorrect: false },
      ],
    },
        {
      id: 'q-html-3-2',
      question: "Which element is designed to display inline computer code and function names?",
      explanation: "The <code> element is the semantic standard for inline code snippets.",
      difficulty: 'beginner',
      topicTag: 'html',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: "<program>", isCorrect: false },
        { id: 'opt-b', text: "<pre>", isCorrect: false },
        { id: 'opt-c', text: "<code>", isCorrect: true },
        { id: 'opt-d', text: "<kbd>", isCorrect: false },
      ],
    },
        {
      id: 'q-html-3-3',
      question: "What default visual style does the <mark> tag apply in standard browsers?",
      explanation: "Browsers render <mark> elements with a yellow marker-style highlight.",
      difficulty: 'beginner',
      topicTag: 'html',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: "A yellow background highlight", isCorrect: true },
        { id: 'opt-b', text: "Italic red text", isCorrect: false },
        { id: 'opt-c', text: "Underlined blue font", isCorrect: false },
        { id: 'opt-d', text: "A thick black border", isCorrect: false },
      ],
    },
  ],
};
