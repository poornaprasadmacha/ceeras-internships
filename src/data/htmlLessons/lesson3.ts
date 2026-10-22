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
    {
      id: 'q_html_3_auto_4',
      question: "What is the primary role of elements introduced in HTML Lesson 3 (Text Formatting & Semantic Typography)?",
      explanation: "HTML markup defines document object model (DOM) structure, semantic roles, and visual content elements.",
      difficulty: 'intermediate',
      topicTag: 'html',
      type: 'multiple-choice',
      options: [
        { id: 'opt_1', text: "They define the semantic structure, content nodes, or media attributes for web browsers", isCorrect: true },
        { id: 'opt_2', text: "They compile client-side code directly into C machine binaries", isCorrect: false },
        { id: 'opt_3', text: "They define network routing rules between routers", isCorrect: false },
        { id: 'opt_4', text: "They replace the need for an internet connection", isCorrect: false },
      ],
    },
    {
      id: 'q_html_3_auto_5',
      question: "Which attribute is essential for accessibility when implementing elements in Lesson 3?",
      explanation: "Accessibility (a11y) standards require meaningful labels, alt text, and semantic roles.",
      difficulty: 'intermediate',
      topicTag: 'html',
      type: 'multiple-choice',
      options: [
        { id: 'opt_1', text: "Descriptive alt attributes, ARIA attributes, and accessible labels (for screen readers)", isCorrect: true },
        { id: 'opt_2', text: "The deprecated bgcolor attribute", isCorrect: false },
        { id: 'opt_3', text: "A marquee animation tag", isCorrect: false },
        { id: 'opt_4', text: "An inline alert script", isCorrect: false },
      ],
    },
    {
      id: 'q_html_3_auto_6',
      question: "How do modern web browsers parse elements from Lesson 3?",
      explanation: "The HTML parser processes markup top-to-bottom to build the DOM tree representing page nodes.",
      difficulty: 'intermediate',
      topicTag: 'html',
      type: 'multiple-choice',
      options: [
        { id: 'opt_1', text: "Browsers construct a tree-like Document Object Model (DOM) node hierarchy in memory", isCorrect: true },
        { id: 'opt_2', text: "Browsers convert tags into relational SQL tables", isCorrect: false },
        { id: 'opt_3', text: "Browsers execute them only when connected to a Node.js server", isCorrect: false },
        { id: 'opt_4', text: "Browsers require a PDF reader plugin", isCorrect: false },
      ],
    },
    {
      id: 'q_html_3_auto_7',
      question: "What is the difference between block-level and inline elements in Lesson 3?",
      explanation: "Block elements (like div, p, h1) take the full available width, whereas inline elements (span, a, strong) flow inline with text.",
      difficulty: 'intermediate',
      topicTag: 'html',
      type: 'multiple-choice',
      options: [
        { id: 'opt_1', text: "Block elements begin on a new line and take full width, while inline elements only take as much width as necessary", isCorrect: true },
        { id: 'opt_2', text: "Inline elements can contain block elements but not vice-versa", isCorrect: false },
        { id: 'opt_3', text: "Block elements cannot be styled with CSS", isCorrect: false },
        { id: 'opt_4', text: "Inline elements only work inside tables", isCorrect: false },
      ],
    },
    {
      id: 'q_html_3_auto_8',
      question: "Which DOCTYPE declaration is required at the very top of modern HTML5 documents?",
      explanation: "<!DOCTYPE html> is the concise standard declaration for modern HTML5.",
      difficulty: 'intermediate',
      topicTag: 'html',
      type: 'multiple-choice',
      options: [
        { id: 'opt_1', text: "<!DOCTYPE html>", isCorrect: true },
        { id: 'opt_2', text: "<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.01//EN\">", isCorrect: false },
        { id: 'opt_3', text: "<xml version=\"1.0\">", isCorrect: false },
        { id: 'opt_4', text: "<!HTML5>", isCorrect: false },
      ],
    },
    {
      id: 'q_html_3_auto_9',
      question: "Why is semantic HTML preferred over generic <div> containers?",
      explanation: "Semantic tags (<header>, <nav>, <article>, <main>) communicate the purpose and hierarchy of content clearly.",
      difficulty: 'intermediate',
      topicTag: 'html',
      type: 'multiple-choice',
      options: [
        { id: 'opt_1', text: "Semantic tags clarify content structure for search engines, screen readers, and maintainers", isCorrect: true },
        { id: 'opt_2', text: "Semantic tags automatically load external JavaScript libraries", isCorrect: false },
        { id: 'opt_3', text: "Generic divs are deprecated and ignored by browsers", isCorrect: false },
        { id: 'opt_4', text: "Semantic tags require less memory to render", isCorrect: false },
      ],
    },
    {
      id: 'q_html_3_auto_10',
      question: "What is the purpose of the <head> section in an HTML document?",
      explanation: "The <head> element contains metadata (like <title>, <meta charset>, and linked styles) rather than rendered body content.",
      difficulty: 'intermediate',
      topicTag: 'html',
      type: 'multiple-choice',
      options: [
        { id: 'opt_1', text: "It contains document metadata, title, character encoding, and stylesheet links not shown in page body", isCorrect: true },
        { id: 'opt_2', text: "It renders the main hero header on the visible page", isCorrect: false },
        { id: 'opt_3', text: "It stores the user authentication cookies", isCorrect: false },
        { id: 'opt_4', text: "It contains SQL queries for database connections", isCorrect: false },
      ],
    },
  ],
};
