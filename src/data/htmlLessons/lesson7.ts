import { HtmlLessonDefinition } from '../../types/htmlLesson';

export const htmlLesson7: HtmlLessonDefinition = {
  id: 'html-lesson-7',
  number: 7,
  slug: 'tables-and-tabular-data',
  title: 'Tables & Tabular Data',
  shortDescription: 'Format two-dimensional data cleanly with table rows, header cells, and proper semantic sections.',
  estimatedMinutes: 9,
  learningObjectives: [
    'Construct structured data tables using <table>, <tr>, <th>, and <td>',
    'Structure tables semantically with <thead> and <tbody>',
    'Merge adjacent cells across columns or rows using colspan and rowspan',
  ],
  prerequisites: ['Lesson 1: Intro to HTML & Tags.'],
  sections: [
    {
      id: 'sec-7-1',
      title: 'The Core Table Elements',
      content: `Tables display rows and columns of structured information:

• \`<table>\`: The outer container.
• \`<tr>\`: A table row (horizontal).
• \`<th>\`: A header cell (bold and centered by default).
• \`<td>\`: A data cell (standard content).

\`\`\`html
<table>
  <tr>
    <th>Student</th>
    <th>Subject</th>
    <th>Grade</th>
  </tr>
  <tr>
    <td>Alex</td>
    <td>Computer Science</td>
    <td>A+</td>
  </tr>
</table>
\`\`\``,
    },
    {
      id: 'sec-7-2',
      title: 'Semantic Sections (<thead> and <tbody>)',
      content: `Grouping rows into \`<thead>\` and \`<tbody>\` gives screen readers and print styles clear boundaries:

\`\`\`html
<table>
  <thead>
    <tr>
      <th>Product</th>
      <th>Quantity</th>
      <th>Price</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Wireless Mouse</td>
      <td>2</td>
      <td>$25.00</td>
    </tr>
    <tr>
      <td>Mechanical Keyboard</td>
      <td>1</td>
      <td>$79.00</td>
    </tr>
  </tbody>
</table>
\`\`\``,
      tagReferences: [
        {
          tag: '<table>',
          description: 'Wrapper element for tabular two-dimensional data.',
          syntax: '<table>...</table>',
        },
        {
          tag: '<tr>',
          description: 'Defines a table row.',
          syntax: '<tr><td>Cell</td></tr>',
        },
        {
          tag: '<th>',
          description: 'Defines a table header cell.',
          syntax: '<th>Header</th>',
        },
        {
          tag: '<td>',
          description: 'Defines a standard table data cell.',
          syntax: '<td>Value</td>',
        },
      ],
    },
  ],
  exercises: [
    {
      id: 'html-ex-7-1',
      lessonId: 'html-lesson-7',
      order: 1,
      title: 'Create a Course Schedule Table',
      objective: 'Build a table containing <thead> with 3 <th> header cells ("Day", "Topic", "Hours"), and a <tbody> with at least 2 <tr> data rows.',
      initialCode: `<!-- Build your table with thead, tbody, th, and td below -->\n\n`,
      solutionCode: `<table>\n  <thead>\n    <tr>\n      <th>Day</th>\n      <th>Topic</th>\n      <th>Hours</th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr>\n      <td>Monday</td>\n      <td>HTML Basics</td>\n      <td>2</td>\n    </tr>\n    <tr>\n      <td>Wednesday</td>\n      <td>CSS Layouts</td>\n      <td>3</td>\n    </tr>\n  </tbody>\n</table>`,
      validationRules: [
        {
          id: 'v1',
          description: 'Contains a <table> element',
          selector: 'table',
          minCount: 1,
        },
        {
          id: 'v2',
          description: 'Contains a <thead> section with <th> header cells',
          selector: 'table thead th',
          minCount: 3,
        },
        {
          id: 'v3',
          description: 'Contains a <tbody> section',
          selector: 'table tbody',
          minCount: 1,
        },
        {
          id: 'v4',
          description: 'The <tbody> section contains at least 2 <tr> rows',
          selector: 'table tbody tr',
          minCount: 2,
        },
        {
          id: 'v5',
          description: 'Contains <td> data cells inside the table body',
          selector: 'table tbody td',
          minCount: 4,
        },
      ],
      hint: 'Include <table>, <thead> with <tr> and 3 <th> cells, and <tbody> with 2 <tr> rows of <td> cells.',
      explanation: 'Organizing table data with <thead> and <tbody> creates structured, highly readable tabular displays.',
      quickChips: ['<table></table>', '<thead></thead>', '<tbody></tbody>', '<tr></tr>', '<th></th>', '<td></td>'],
    },
  ],
  quiz: [
        {
      id: 'q-html-7-1',
      question: "Which element is used to represent an individual row in an HTML table?",
      explanation: "<tr> stands for table row.",
      difficulty: 'beginner',
      topicTag: 'html',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: "<td>", isCorrect: false },
        { id: 'opt-b', text: "<row>", isCorrect: false },
        { id: 'opt-c', text: "<tr>", isCorrect: true },
        { id: 'opt-d', text: "<tb>", isCorrect: false },
      ],
    },
        {
      id: 'q-html-7-2',
      question: "What is the primary difference between a <th> cell and a <td> cell?",
      explanation: "<th> denotes a header cell and has semantic header meaning for accessibility tools.",
      difficulty: 'beginner',
      topicTag: 'html',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: "<th> represents a header cell (semantic and bold)", isCorrect: true },
        { id: 'opt-b', text: "while <td> contains standard data", isCorrect: false },
        { id: 'opt-c', text: "<th> is only used in mobile viewports", isCorrect: false },
        { id: 'opt-d', text: "<td> can only contain numbers", isCorrect: false },
        { id: 'opt-e', text: "<th> requires an image attribute", isCorrect: false },
      ],
    },
        {
      id: 'q-html-7-3',
      question: "Which attribute allows a table cell to span horizontally across multiple columns?",
      explanation: "colspan merges a single cell across multiple adjacent columns.",
      difficulty: 'beginner',
      topicTag: 'html',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: "rowspan", isCorrect: false },
        { id: 'opt-b', text: "colspan", isCorrect: true },
        { id: 'opt-c', text: "spanwidth", isCorrect: false },
        { id: 'opt-d', text: "columns", isCorrect: false },
      ],
    },
    {
      id: 'q_html_7_auto_4',
      question: "What is the primary role of elements introduced in HTML Lesson 7 (Tables & Tabular Data)?",
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
      id: 'q_html_7_auto_5',
      question: "Which attribute is essential for accessibility when implementing elements in Lesson 7?",
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
      id: 'q_html_7_auto_6',
      question: "How do modern web browsers parse elements from Lesson 7?",
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
      id: 'q_html_7_auto_7',
      question: "What is the difference between block-level and inline elements in Lesson 7?",
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
      id: 'q_html_7_auto_8',
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
      id: 'q_html_7_auto_9',
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
      id: 'q_html_7_auto_10',
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
