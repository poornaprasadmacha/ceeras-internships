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
    {
      id: 'q_html_2_auto_4',
      question: "What is the primary role of elements introduced in HTML Lesson 2 (Headings, Paragraphs & Separators)?",
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
      id: 'q_html_2_auto_5',
      question: "Which attribute is essential for accessibility when implementing elements in Lesson 2?",
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
      id: 'q_html_2_auto_6',
      question: "How do modern web browsers parse elements from Lesson 2?",
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
      id: 'q_html_2_auto_7',
      question: "What is the difference between block-level and inline elements in Lesson 2?",
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
      id: 'q_html_2_auto_8',
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
      id: 'q_html_2_auto_9',
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
      id: 'q_html_2_auto_10',
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
