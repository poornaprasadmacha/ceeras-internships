import { HtmlLessonDefinition } from '../../types/htmlLesson';

export const htmlLesson12: HtmlLessonDefinition = {
  id: 'html-lesson-12',
  number: 12,
  slug: 'page-metadata-head-essentials-and-seo',
  title: 'Page Metadata, Head Essentials & SEO',
  shortDescription: 'Master the document head, mobile responsive viewport configuration, charset definitions, and SEO meta tags.',
  estimatedMinutes: 9,
  learningObjectives: [
    'Define document titles that appear in browser tabs and search results',
    'Configure the responsive viewport tag for mobile devices',
    'Link external stylesheets and define SEO descriptions',
  ],
  prerequisites: ['Lesson 1: Intro to HTML & Tags.'],
  sections: [
    {
      id: 'sec-12-1',
      title: 'The Backstage of the Web: The <head> Tag',
      content: `The \`<head>\` tag contains machine-readable metadata that isn't drawn on the canvas, but is critical for search engines, mobile responsiveness, and browsers:

• \`<meta charset="UTF-8">\`: Specifies character encoding to display all world alphabets and symbols accurately.
• \`<title>\`: The title appearing on the browser tab, in bookmarks, and as the blue clickable title in Google search results.

\`\`\`html
<head>
  <meta charset="UTF-8" />
  <title>Learn Web Development | Ceeras</title>
</head>
\`\`\``,
    },
    {
      id: 'sec-12-2',
      title: 'Mobile Viewport & External Stylesheets',
      content: `• **Mobile Viewport**: Without this tag, mobile phones will display desktop pages shrunk down to microscopic size:
\`\`\`html
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
\`\`\`

• **SEO Description**: Summarizes page content in search snippets:
\`\`\`html
<meta name="description" content="Master modern HTML5, CSS3, and JavaScript with interactive hands-on sandboxes." />
\`\`\`

• **External CSS Linking**: Connects your external styling sheet:
\`\`\`html
<link rel="stylesheet" href="style.css" />
\`\`\``,
      tagReferences: [
        {
          tag: '<meta>',
          description: 'Document-level metadata declaration.',
          syntax: '<meta name="viewport" content="..." />',
          selfClosing: true,
        },
        {
          tag: '<title>',
          description: 'Title of the HTML document displayed in the tab bar.',
          syntax: '<title>Page Title</title>',
        },
        {
          tag: '<link>',
          description: 'Links external resources such as stylesheets.',
          syntax: '<link rel="stylesheet" href="style.css" />',
          selfClosing: true,
        },
      ],
    },
  ],
  exercises: [
    {
      id: 'html-ex-12-1',
      lessonId: 'html-lesson-12',
      order: 1,
      title: 'Engineer a Production-Ready HTML5 Head Block',
      objective: 'Construct a complete <head> block with charset="UTF-8", mobile responsive viewport meta tag, a <title>, and a <link rel="stylesheet">.',
      initialCode: `<!DOCTYPE html>
<html>
  <head>
    <!-- Add your charset, viewport, title, and stylesheet link here -->
  </head>
  <body>
    <h1>Production Ready Site</h1>
  </body>
</html>`,
      solutionCode: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Modern Ceeras Platform</title>
    <link rel="stylesheet" href="styles.css" />
  </head>
  <body>
    <h1>Production Ready Site</h1>
  </body>
</html>`,
      validationRules: [
        {
          id: 'v1',
          description: 'Includes <!DOCTYPE html> and <head>',
          customCheckId: 'has-valid-doctype',
        },
        {
          id: 'v2',
          description: 'Contains a <meta charset="UTF-8"> tag',
          selector: 'meta[charset]',
          minCount: 1,
        },
        {
          id: 'v3',
          description: 'Contains a mobile viewport <meta name="viewport"> tag',
          selector: 'meta[name="viewport"]',
          minCount: 1,
        },
        {
          id: 'v4',
          description: 'Contains a <title> element with descriptive text',
          selector: 'head title',
          minCount: 1,
        },
        {
          id: 'v5',
          description: 'Contains a <link rel="stylesheet"> element',
          selector: 'link[rel="stylesheet"]',
          minCount: 1,
        },
      ],
      hint: 'Include <meta charset="UTF-8">, <meta name="viewport" content="...">, <title>Text</title>, and <link rel="stylesheet" href="...">.',
      explanation: 'Configuring proper head metadata guarantees your pages look sharp on mobile screens, render fonts correctly, and rank well in search.',
      quickChips: [
        '<meta charset="UTF-8" />',
        '<meta name="viewport" content="width=device-width, initial-scale=1.0" />',
        '<title></title>',
        '<link rel="stylesheet" href="style.css" />',
      ],
    },
  ],
  quiz: [
    {
      id: 'q-html-12-1',
      question: 'What is the purpose of the viewport meta tag?',
      explanation: 'The viewport meta tag is essential for responsive design, instructing mobile devices to scale pages to their actual device pixel width.',
      difficulty: 'beginner',
      topicTag: 'html',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'It instructs mobile devices to scale pages to actual device width', isCorrect: true },
        { id: 'opt-b', text: 'It increases the internet connection speed of the user', isCorrect: false },
        { id: 'opt-c', text: 'It translates the webpage into 20 languages', isCorrect: false },
        { id: 'opt-d', text: 'It encrypts the HTML code on disk', isCorrect: false },
      ],
    },
    {
      id: 'q-html-12-2',
      question: 'Where is the text inside the <title> tag displayed?',
      explanation: 'The <title> tag defines the name seen on browser tabs, bookmarks, and search engine link headers.',
      difficulty: 'beginner',
      topicTag: 'html',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'On the browser tab header and search engine results', isCorrect: true },
        { id: 'opt-b', text: 'In the very center of the webpage in bold text', isCorrect: false },
        { id: 'opt-c', text: 'Inside the footer copyright line', isCorrect: false },
        { id: 'opt-d', text: 'Nowhere, it is strictly an internal comment', isCorrect: false },
      ],
    },
    {
      id: 'q-html-12-3',
      question: 'Which tag correctly connects an external CSS stylesheet file to an HTML document?',
      explanation: '<link rel="stylesheet" href="..."> is the standard way to attach external CSS stylesheets.',
      difficulty: 'beginner',
      topicTag: 'html',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: '<link rel="stylesheet" href="styles.css" />', isCorrect: true },
        { id: 'opt-b', text: '<style src="styles.css"></style>', isCorrect: false },
        { id: 'opt-c', text: '<css href="styles.css" />', isCorrect: false },
        { id: 'opt-d', text: '<script href="styles.css"></script>', isCorrect: false },
      ],
    },
    {
      id: 'q_html_12_auto_4',
      question: "What is the primary role of elements introduced in HTML Lesson 12 (Page Metadata, Head Essentials & SEO)?",
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
      id: 'q_html_12_auto_5',
      question: "Which attribute is essential for accessibility when implementing elements in Lesson 12?",
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
      id: 'q_html_12_auto_6',
      question: "How do modern web browsers parse elements from Lesson 12?",
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
      id: 'q_html_12_auto_7',
      question: "What is the difference between block-level and inline elements in Lesson 12?",
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
      id: 'q_html_12_auto_8',
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
      id: 'q_html_12_auto_9',
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
      id: 'q_html_12_auto_10',
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
