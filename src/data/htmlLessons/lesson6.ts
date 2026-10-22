import { HtmlLessonDefinition } from '../../types/htmlLesson';

export const htmlLesson6: HtmlLessonDefinition = {
  id: 'html-lesson-6',
  number: 6,
  slug: 'ordered-and-unordered-lists',
  title: 'Ordered & Unordered Lists',
  shortDescription: 'Structure bulleted items, sequential step-by-step instructions, and multi-level nested lists.',
  estimatedMinutes: 8,
  learningObjectives: [
    'Create bulleted lists using <ul> and list items <li>',
    'Build numbered sequences using <ol> and list items <li>',
    'Nest lists inside list items for multi-level navigation or outlines',
  ],
  prerequisites: ['Lesson 1: Intro to HTML & Tags.'],
  sections: [
    {
      id: 'sec-6-1',
      title: 'Unordered Lists (<ul>) vs Ordered Lists (<ol>)',
      content: `Lists group related items together:

• **Unordered Lists (\`<ul>\`)**: Used when the order of items does not matter (renders bullet points).
• **Ordered Lists (\`<ol>\`)**: Used for sequences, recipes, or countdowns where sequence matters (renders numbers 1, 2, 3...).
• Every individual entry inside both list types must be wrapped in an \`<li>\` (list item) tag.

\`\`\`html
<!-- Unordered Grocery List -->
<ul>
  <li>Fresh Apples</li>
  <li>Oat Milk</li>
  <li>Whole Wheat Bread</li>
</ul>

<!-- Ordered Recipe Steps -->
<ol>
  <li>Preheat oven to 375 degrees</li>
  <li>Mix ingredients in a large bowl</li>
  <li>Bake for 25 minutes</li>
</ol>
\`\`\``,
    },
    {
      id: 'sec-6-2',
      title: 'Nested Lists (Multi-Level Outlines)',
      content: `To create sub-lists, always place the inner \`<ul>\` or \`<ol>\` **inside** an existing \`<li>\`:

\`\`\`html
<ul>
  <li>Frontend Technologies
    <ul>
      <li>HTML5 Structure</li>
      <li>CSS3 Styling</li>
      <li>JavaScript Interactivity</li>
    </ul>
  </li>
  <li>Backend Databases</li>
</ul>
\`\`\``,
      tagReferences: [
        {
          tag: '<ul>',
          description: 'Unordered bulleted list container.',
          syntax: '<ul><li>Item</li></ul>',
        },
        {
          tag: '<ol>',
          description: 'Ordered numbered sequence container.',
          syntax: '<ol><li>Step 1</li></ol>',
        },
        {
          tag: '<li>',
          description: 'An individual list item inside <ul> or <ol>.',
          syntax: '<li>Content</li>',
        },
      ],
    },
  ],
  exercises: [
    {
      id: 'html-ex-6-1',
      lessonId: 'html-lesson-6',
      order: 1,
      title: 'Build a Recipe Checklist with Nested Lists',
      objective: 'Create an ordered list <ol> with 2 steps, and an unordered list <ul> with at least 3 ingredient <li> items nested inside.',
      initialCode: `<!-- Create your recipe steps and ingredients lists below -->\n\n`,
      solutionCode: `<h2>Pancake Recipe</h2>\n<h3>Ingredients:</h3>\n<ul>\n  <li>Flour</li>\n  <li>Milk</li>\n  <li>Eggs</li>\n</ul>\n\n<h3>Instructions:</h3>\n<ol>\n  <li>Whisk ingredients in a bowl until smooth</li>\n  <li>Cook each pancake on a hot skillet for 2 minutes</li>\n</ol>`,
      validationRules: [
        {
          id: 'v1',
          description: 'Contains an unordered list <ul>',
          selector: 'ul',
          minCount: 1,
        },
        {
          id: 'v2',
          description: 'The unordered list contains at least 3 <li> items',
          selector: 'ul > li',
          minCount: 3,
        },
        {
          id: 'v3',
          description: 'Contains an ordered list <ol>',
          selector: 'ol',
          minCount: 1,
        },
        {
          id: 'v4',
          description: 'The ordered list contains at least 2 <li> items',
          selector: 'ol > li',
          minCount: 2,
        },
      ],
      hint: 'Include a <ul> with 3 <li> tags, and an <ol> with 2 <li> tags.',
      explanation: 'Using appropriate list elements enhances readability and allows assistive devices to announce the total number of items.',
      quickChips: ['<ul></ul>', '<ol></ol>', '<li></li>', '<h3></h3>'],
    },
  ],
  quiz: [
        {
      id: 'q-html-6-1',
      question: "Which tag should you use to create a bulleted list where order does not matter?",
      explanation: "<ul> defines an unordered (bulleted) list.",
      difficulty: 'beginner',
      topicTag: 'html',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: "<ol>", isCorrect: false },
        { id: 'opt-b', text: "<ul>", isCorrect: true },
        { id: 'opt-c', text: "<list>", isCorrect: false },
        { id: 'opt-d', text: "<dl>", isCorrect: false },
      ],
    },
        {
      id: 'q-html-6-2',
      question: "Where should a nested sub-list be placed according to HTML specifications?",
      explanation: "Valid HTML requires child lists to be placed inside a parent <li> item.",
      difficulty: 'beginner',
      topicTag: 'html',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: "Directly between two <ul> tags", isCorrect: false },
        { id: 'opt-b', text: "Inside an <li> element of the parent list", isCorrect: true },
        { id: 'opt-c', text: "Outside the document body", isCorrect: false },
        { id: 'opt-d', text: "Directly inside the <head> tag", isCorrect: false },
      ],
    },
        {
      id: 'q-html-6-3',
      question: "What tag defines each individual item inside an ordered or unordered list?",
      explanation: "<li> stands for list item and represents an entry in any list.",
      difficulty: 'beginner',
      topicTag: 'html',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: "<item>", isCorrect: false },
        { id: 'opt-b', text: "<point>", isCorrect: false },
        { id: 'opt-c', text: "<li>", isCorrect: true },
        { id: 'opt-d', text: "<row>", isCorrect: false },
      ],
    },
    {
      id: 'q_html_6_auto_4',
      question: "What is the primary role of elements introduced in HTML Lesson 6 (Ordered & Unordered Lists)?",
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
      id: 'q_html_6_auto_5',
      question: "Which attribute is essential for accessibility when implementing elements in Lesson 6?",
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
      id: 'q_html_6_auto_6',
      question: "How do modern web browsers parse elements from Lesson 6?",
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
      id: 'q_html_6_auto_7',
      question: "What is the difference between block-level and inline elements in Lesson 6?",
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
      id: 'q_html_6_auto_8',
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
      id: 'q_html_6_auto_9',
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
      id: 'q_html_6_auto_10',
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
