import { HtmlLessonDefinition } from '../../types/htmlLesson';

export const htmlLesson1: HtmlLessonDefinition = {
  id: 'html-lesson-1',
  number: 1,
  slug: 'intro-to-html-and-tags',
  title: 'Introduction to HTML & The Anatomy of a Tag',
  shortDescription: 'Discover how web pages are built using HTML tags, elements, and the basic document skeleton.',
  estimatedMinutes: 8,
  learningObjectives: [
    'Understand what HTML is and why every webpage uses it',
    'Identify opening tags, closing tags, and element content',
    'Construct the classic HTML document boilerplate',
  ],
  prerequisites: ['No prior programming experience required.'],
  sections: [
    {
      id: 'sec-1-1',
      title: 'What is HTML?',
      content: `**HTML** stands for **H**yper**T**ext **M**arkup **L**anguage. It provides the core structure and skeleton for all websites.

• **HyperText**: Text that links to other texts or pages.
• **Markup**: Special markers (tags) that tell web browsers how to format and display content.
• Every browser (Chrome, Safari, Firefox, Edge) reads HTML code and turns it into visual pages.`,
    },
    {
      id: 'sec-1-2',
      title: 'The Anatomy of an HTML Tag',
      content: `Most HTML elements consist of three parts:

1. **Opening tag**: \`<p>\` (tells the browser where an element starts)
2. **Content**: Text or elements nestled inside
3. **Closing tag**: \`</p>\` (has a forward slash to mark the end)

\`\`\`html
<p>Welcome to Learn by Ceeras!</p>
\`\`\`

• Missing a closing tag can break the layout of subsequent elements on your page.`,
      tagReferences: [
        {
          tag: '<p>',
          description: 'Defines a paragraph of text.',
          syntax: '<p>Your text here</p>',
        },
        {
          tag: '<h1>',
          description: 'Top-level primary page heading.',
          syntax: '<h1>Main Title</h1>',
        },
      ],
    },
    {
      id: 'sec-1-3',
      title: 'The Essential HTML Document Skeleton',
      content: `Every standard web page contains four fundamental structural tags:

\`\`\`html
<!DOCTYPE html>
<html>
  <head>
    <title>My First Webpage</title>
  </head>
  <body>
    <h1>Hello World</h1>
    <p>This is my very first web page!</p>
  </body>
</html>
\`\`\`

• \`<!DOCTYPE html>\`: Informs the browser that this is modern HTML5.
• \`<html>\`: The root container that wraps all content.
• \`<head>\`: Holds backstage data (title, styles, metadata).
• \`<body>\`: Holds all visible elements shown to website visitors.`,
    },
  ],
  exercises: [
    {
      id: 'html-ex-1-1',
      lessonId: 'html-lesson-1',
      order: 1,
      title: 'Create Your First Heading and Paragraph',
      objective: 'Write a primary heading <h1> with the title "Welcome to Ceeras" and a paragraph <p> describing your goal.',
      initialCode: `<!-- Add your <h1> heading and <p> paragraph below -->\n\n`,
      solutionCode: `<h1>Welcome to Ceeras</h1>\n<p>I am learning modern web development step by step.</p>`,
      validationRules: [
        {
          id: 'v1',
          description: 'Contains a primary heading <h1> element',
          selector: 'h1',
          minCount: 1,
        },
        {
          id: 'v2',
          description: 'The <h1> heading contains the word "Welcome" or "Ceeras"',
          selector: 'h1',
          textContains: 'Ceeras',
        },
        {
          id: 'v3',
          description: 'Contains at least one paragraph <p> element with text',
          selector: 'p',
          minCount: 1,
        },
      ],
      hint: 'Use <h1>Welcome to Ceeras</h1> followed by <p>Your message here</p>.',
      explanation: 'Headings (<h1>) introduce main topics, while paragraphs (<p>) contain body sentences.',
      quickChips: ['<h1></h1>', '<p></p>', '<strong></strong>'],
    },
    {
      id: 'html-ex-1-2',
      lessonId: 'html-lesson-1',
      order: 2,
      title: 'Build the Full HTML5 Document Skeleton',
      objective: 'Wrap a heading and paragraph inside proper <!DOCTYPE html>, <html>, <head>, and <body> tags.',
      initialCode: `<!DOCTYPE html>
<html>
  <head>
    <!-- Add title here -->
  </head>
  <body>
    <!-- Add h1 and p elements here -->
  </body>
</html>`,
      solutionCode: `<!DOCTYPE html>
<html>
  <head>
    <title>My Portfolio</title>
  </head>
  <body>
    <h1>My Creative Journey</h1>
    <p>Exploring the fundamentals of HTML structure.</p>
  </body>
</html>`,
      validationRules: [
        {
          id: 'v1',
          description: 'Includes modern <!DOCTYPE html> declaration',
          customCheckId: 'has-valid-doctype',
        },
        {
          id: 'v2',
          description: 'Contains both <head> and <body> inside <html>',
          customCheckId: 'head-and-body',
        },
        {
          id: 'v3',
          description: 'Contains an <h1> heading inside the body',
          selector: 'body h1',
          minCount: 1,
        },
        {
          id: 'v4',
          description: 'Contains a <p> paragraph inside the body',
          selector: 'body p',
          minCount: 1,
        },
      ],
      hint: 'Make sure your <h1> and <p> elements are nested inside the <body> element.',
      explanation: 'The <body> tag acts as the visible canvas of any webpage, containing all readable text and images.',
      quickChips: ['<!DOCTYPE html>', '<html></html>', '<head></head>', '<body></body>', '<h1></h1>', '<p></p>'],
    },
  ],
  quiz: [
        {
      id: 'q-html-1-1',
      question: "What does HTML stand for in modern computing?",
      explanation: "HTML stands for HyperText Markup Language, the standard formatting language of the web.",
      difficulty: 'beginner',
      topicTag: 'html',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: "HyperText Markup Language", isCorrect: true },
        { id: 'opt-b', text: "High Tech Multi Language", isCorrect: false },
        { id: 'opt-c', text: "Home Tool Markup List", isCorrect: false },
        { id: 'opt-d', text: "Hyper Transfer Machine Logic", isCorrect: false },
      ],
    },
        {
      id: 'q-html-1-2',
      question: "Which tag houses all the visible content displayed to website visitors?",
      explanation: "The <body> element contains all visible content such as text, images, buttons, and tables.",
      difficulty: 'beginner',
      topicTag: 'html',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: "<head>", isCorrect: false },
        { id: 'opt-b', text: "<body>", isCorrect: true },
        { id: 'opt-c', text: "<title>", isCorrect: false },
        { id: 'opt-d', text: "<meta>", isCorrect: false },
      ],
    },
        {
      id: 'q-html-1-3',
      question: "What is the correct syntax for a closing paragraph tag?",
      explanation: "Closing tags in HTML begin with a forward slash immediately following the opening angle bracket (e.g., </p>).",
      difficulty: 'beginner',
      topicTag: 'html',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: "</p>", isCorrect: true },
        { id: 'opt-b', text: "<p/>", isCorrect: false },
        { id: 'opt-c', text: "<\\\\p>", isCorrect: false },
        { id: 'opt-d', text: "<end p>", isCorrect: false },
      ],
    },
    {
      id: 'q_html_1_auto_4',
      question: "What is the primary role of elements introduced in HTML Lesson 1 (Introduction to HTML & The Anatomy of a Tag)?",
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
      id: 'q_html_1_auto_5',
      question: "Which attribute is essential for accessibility when implementing elements in Lesson 1?",
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
      id: 'q_html_1_auto_6',
      question: "How do modern web browsers parse elements from Lesson 1?",
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
      id: 'q_html_1_auto_7',
      question: "What is the difference between block-level and inline elements in Lesson 1?",
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
      id: 'q_html_1_auto_8',
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
      id: 'q_html_1_auto_9',
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
      id: 'q_html_1_auto_10',
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
