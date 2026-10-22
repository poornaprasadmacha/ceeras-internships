import { HtmlLessonDefinition } from '../../types/htmlLesson';

export const htmlLesson10: HtmlLessonDefinition = {
  id: 'html-lesson-10',
  number: 10,
  slug: 'semantic-html5-layouts',
  title: 'Modern Semantic HTML5 Layouts',
  shortDescription: 'Construct accessible, SEO-friendly page architectures using semantic container landmarks instead of generic divs.',
  estimatedMinutes: 9,
  learningObjectives: [
    'Replace meaningless <div> soup with semantic HTML5 landmark tags',
    'Structure a full webpage with <header>, <nav>, <main>, and <footer>',
    'Understand the distinction between <article>, <section>, and <aside>',
  ],
  prerequisites: ['Lesson 2: Headings & Paragraphs.'],
  sections: [
    {
      id: 'sec-10-1',
      title: 'Why Semantic HTML5 Matters',
      content: `In early web design, pages were built using generic \`<div class="header">\` and \`<div class="footer">\`. 

HTML5 introduced meaningful semantic landmarks:
• **SEO Advantage**: Search engines immediately recognize your primary topic inside \`<main>\` and \`<article>\`.
• **Accessibility**: Screen reader users can jump straight to navigation, main content, or sidebars via keyboard shortcuts.
• **Maintainability**: Code is significantly easier to understand and collaborate on.`,
    },
    {
      id: 'sec-10-2',
      title: 'The Semantic Landmark Tags',
      content: `• \`<header>\`: Introductory banners, logos, and page titles.
• \`<nav>\`: Major navigational link blocks.
• \`<main>\`: The primary, unique content of the page (only one per document).
• \`<article>\`: Self-contained independent content (e.g., blog post, news story).
• \`<section>\`: Thematic grouping of content with its own heading.
• \`<aside>\`: Secondary content (sidebar, related links, author bio).
• \`<footer>\`: Copyright notices, legal disclaimers, and contact details.

\`\`\`html
<header>
  <h1>Tech Chronicles</h1>
  <nav><a href="#home">Home</a></nav>
</header>
<main>
  <article>
    <h2>Understanding Web Components</h2>
    <p>Articles are independently shareable.</p>
  </article>
  <aside>
    <h3>About the Author</h3>
  </aside>
</main>
<footer>
  <p>&copy; 2026 Ceeras. All rights reserved.</p>
</footer>
\`\`\``,
      tagReferences: [
        {
          tag: '<main>',
          description: 'Dominant content of the document body (only one per page).',
          syntax: '<main>...</main>',
        },
        {
          tag: '<nav>',
          description: 'Section of navigation links.',
          syntax: '<nav><a href="...">Link</a></nav>',
        },
        {
          tag: '<article>',
          description: 'Self-contained, reusable composition (post, news story).',
          syntax: '<article><h2>Title</h2><p>Body</p></article>',
        },
      ],
    },
  ],
  exercises: [
    {
      id: 'html-ex-10-1',
      lessonId: 'html-lesson-10',
      order: 1,
      title: 'Construct a Semantic Blog Article Layout',
      objective: 'Build a page skeleton utilizing <header>, <nav>, <main>, <article>, <aside>, and <footer> semantic tags.',
      initialCode: `<!-- Construct your semantic webpage layout below -->\n\n`,
      solutionCode: `<header>\n  <h1>Ceeras Learning Academy</h1>\n  <nav>\n    <a href="#courses">Courses</a>\n    <a href="#about">About</a>\n  </nav>\n</header>\n\n<main>\n  <article>\n    <h2>Modern Web Standards</h2>\n    <p>Semantic markup makes the web accessible to everyone.</p>\n  </article>\n  <aside>\n    <h3>Quick Tip</h3>\n    <p>Always validate your HTML markup.</p>\n  </aside>\n</main>\n\n<footer>\n  <p>Published by Ceeras Education.</p>\n</footer>`,
      validationRules: [
        {
          id: 'v1',
          description: 'Contains a <header> element',
          selector: 'header',
          minCount: 1,
        },
        {
          id: 'v2',
          description: 'Contains a <nav> navigation container',
          selector: 'nav',
          minCount: 1,
        },
        {
          id: 'v3',
          description: 'Contains exactly one <main> element',
          selector: 'main',
          exactCount: 1,
        },
        {
          id: 'v4',
          description: 'Contains an <article> inside main',
          selector: 'main article',
          minCount: 1,
        },
        {
          id: 'v5',
          description: 'Contains an <aside> sidebar element',
          selector: 'aside',
          minCount: 1,
        },
        {
          id: 'v6',
          description: 'Contains a <footer> element',
          selector: 'footer',
          minCount: 1,
        },
      ],
      hint: 'Include <header>, <nav>, <main> wrapping <article> and <aside>, and <footer>.',
      explanation: 'Semantic HTML5 structure gives browsers, bots, and screen readers crystal-clear context about every section of your layout.',
      quickChips: ['<header></header>', '<nav></nav>', '<main></main>', '<article></article>', '<aside></aside>', '<footer></footer>'],
    },
  ],
  quiz: [
        {
      id: 'q-html-10-1',
      question: "How many <main> elements should exist as top-level content on a single HTML document?",
      explanation: "The <main> tag represents the central unique content of the page and must only appear once per document.",
      difficulty: 'beginner',
      topicTag: 'html',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: "Exactly one", isCorrect: true },
        { id: 'opt-b', text: "As many as there are sections", isCorrect: false },
        { id: 'opt-c', text: "At least five", isCorrect: false },
        { id: 'opt-d', text: "None", isCorrect: false },
        { id: 'opt-e', text: "main is deprecated", isCorrect: false },
      ],
    },
        {
      id: 'q-html-10-2',
      question: "Which semantic tag is best suited for secondary content like sidebars, callout boxes, or author biographies?",
      explanation: "<aside> represents content indirectly related to the surrounding document content.",
      difficulty: 'beginner',
      topicTag: 'html',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: "<aside>", isCorrect: true },
        { id: 'opt-b', text: "<sidebar>", isCorrect: false },
        { id: 'opt-c', text: "<secondary>", isCorrect: false },
        { id: 'opt-d', text: "<float>", isCorrect: false },
      ],
    },
        {
      id: 'q-html-10-3',
      question: "What is the key difference between an <article> and a <section>?",
      explanation: "<article> is intended to stand alone (like a news story or blog post), whereas <section> groups related content.",
      difficulty: 'beginner',
      topicTag: 'html',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: "An <article> is self-contained and independently distributable", isCorrect: true },
        { id: 'opt-b', text: "while a <section> groups thematic content", isCorrect: false },
        { id: 'opt-c', text: "<section> can only contain images", isCorrect: false },
        { id: 'opt-d', text: "<article> can only appear inside the footer", isCorrect: false },
        { id: 'opt-e', text: "There is no difference", isCorrect: false },
        { id: 'opt-undefined', text: "they are identical synonyms", isCorrect: false },
      ],
    },
    {
      id: 'q_html_10_auto_4',
      question: "What is the primary role of elements introduced in HTML Lesson 10 (Modern Semantic HTML5 Layouts)?",
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
      id: 'q_html_10_auto_5',
      question: "Which attribute is essential for accessibility when implementing elements in Lesson 10?",
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
      id: 'q_html_10_auto_6',
      question: "How do modern web browsers parse elements from Lesson 10?",
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
      id: 'q_html_10_auto_7',
      question: "What is the difference between block-level and inline elements in Lesson 10?",
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
      id: 'q_html_10_auto_8',
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
      id: 'q_html_10_auto_9',
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
      id: 'q_html_10_auto_10',
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
