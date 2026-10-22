import { HtmlLessonDefinition } from '../../types/htmlLesson';

export const htmlLesson8: HtmlLessonDefinition = {
  id: 'html-lesson-8',
  number: 8,
  slug: 'forms-and-text-inputs',
  title: 'Forms & Text Inputs',
  shortDescription: 'Collect user data with interactive forms, accessible labels, specialized input types, and submit buttons.',
  estimatedMinutes: 9,
  learningObjectives: [
    'Create interactive input forms using the <form> container',
    'Associate accessible <label> elements to inputs via the "for" and "id" attributes',
    'Utilize specialized input types: text, email, password, and number',
  ],
  prerequisites: ['Lesson 1: Intro to HTML & Tags.'],
  sections: [
    {
      id: 'sec-8-1',
      title: 'The Form Container & Accessible Labels',
      content: `Forms allow website visitors to submit feedback, login, or place orders:

• \`<form>\`: Wraps all input controls.
• \`<label>\`: Provides a descriptive label for an input. Connecting them with \`for="id"\` enables clicking the label to focus the input box automatically!

\`\`\`html
<form>
  <label for="full-name">Full Name:</label>
  <input type="text" id="full-name" name="fullName" placeholder="Ada Lovelace" required />
</form>
\`\`\``,
    },
    {
      id: 'sec-8-2',
      title: 'Essential Input Types & Submit Buttons',
      content: `The \`type\` attribute changes how browsers validate and render the field:

• \`type="text"\`: Single-line standard text.
• \`type="email"\`: Validates email syntax (requires an @ sign).
• \`type="password"\`: Masks keystrokes for confidentiality.
• \`type="number"\`: Restricts entry to numerical values.
• \`<button type="submit">\`: Submits the form data.

\`\`\`html
<form>
  <label for="user-email">Email Address:</label>
  <input type="email" id="user-email" required />

  <label for="user-pass">Password:</label>
  <input type="password" id="user-pass" required />

  <button type="submit">Sign In</button>
</form>
\`\`\``,
      tagReferences: [
        {
          tag: '<form>',
          description: 'Interactive container for collecting user inputs.',
          syntax: '<form>...</form>',
        },
        {
          tag: '<label>',
          description: 'Caption for an input element, linked via for="inputId".',
          syntax: '<label for="id">Name</label>',
        },
        {
          tag: '<input>',
          description: 'Interactive data entry field.',
          syntax: '<input type="text" id="id" />',
          selfClosing: true,
        },
      ],
    },
  ],
  exercises: [
    {
      id: 'html-ex-8-1',
      lessonId: 'html-lesson-8',
      order: 1,
      title: 'Build a Complete User Registration Form',
      objective: 'Create a <form> containing a text input with id="username", an email input with id="email", matching <label> tags, and a <button type="submit">.',
      initialCode: `<!-- Build your registration form below -->\n\n`,
      solutionCode: `<form>\n  <label for="username">Username:</label>\n  <input type="text" id="username" name="username" placeholder="Enter username" required />\n\n  <label for="email">Email Address:</label>\n  <input type="email" id="email" name="email" placeholder="you@domain.com" required />\n\n  <button type="submit">Create Account</button>\n</form>`,
      validationRules: [
        {
          id: 'v1',
          description: 'Contains a <form> element',
          selector: 'form',
          minCount: 1,
        },
        {
          id: 'v2',
          description: 'Contains an input with type="text" and id="username"',
          selector: 'input[type="text"]#username',
          minCount: 1,
        },
        {
          id: 'v3',
          description: 'Contains an input with type="email" and id="email"',
          selector: 'input[type="email"]#email',
          minCount: 1,
        },
        {
          id: 'v4',
          description: 'Contains a <label> with for="username"',
          selector: 'label[for="username"]',
          minCount: 1,
        },
        {
          id: 'v5',
          description: 'Contains a <label> with for="email"',
          selector: 'label[for="email"]',
          minCount: 1,
        },
        {
          id: 'v6',
          description: 'Contains a <button> with type="submit"',
          selector: 'button[type="submit"]',
          minCount: 1,
        },
      ],
      hint: 'Pair <label for="username"> with <input id="username" type="text" /> and <label for="email"> with <input id="email" type="email" />.',
      explanation: 'Explicitly associating labels with inputs ensures screen readers can identify fields clearly and makes touch targets easier to tap.',
      quickChips: ['<form></form>', '<label for=""></label>', '<input type="text" />', '<input type="email" />', '<button type="submit"></button>'],
    },
  ],
  quiz: [
        {
      id: 'q-html-8-1',
      question: "How do you bind an HTML <label> to a specific <input> element?",
      explanation: "The label for attribute must match the input id attribute to establish an accessible binding.",
      difficulty: 'beginner',
      topicTag: 'html',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: "By matching the label \"for\" attribute to the input \"id\" attribute", isCorrect: true },
        { id: 'opt-b', text: "By giving them the exact same CSS class name", isCorrect: false },
        { id: 'opt-c', text: "By enclosing them both in an <h1> tag", isCorrect: false },
        { id: 'opt-d', text: "By placing them on line 1 of the file", isCorrect: false },
      ],
    },
    {
      id: 'q-html-8-2',
      question: 'Which input type automatically checks for a valid email structure before submission?',
      explanation: 'type="email" triggers automatic client-side email format validation.',
      difficulty: 'beginner',
      topicTag: 'html',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'type="text"', isCorrect: false },
        { id: 'opt-b', text: 'type="email"', isCorrect: true },
        { id: 'opt-c', text: 'type="url"', isCorrect: false },
        { id: 'opt-d', text: 'type="account"', isCorrect: false },
      ],
    },
    {
      id: 'q-html-8-3',
      question: 'What is the default behavior of clicking a <button type="submit"> inside a <form>?',
      explanation: 'A button with type="submit" sends the enclosed form fields to the target handler.',
      difficulty: 'beginner',
      topicTag: 'html',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'It submits the form data', isCorrect: true },
        { id: 'opt-b', text: 'It deletes all text in the document', isCorrect: false },
        { id: 'opt-c', text: 'It closes the browser window', isCorrect: false },
        { id: 'opt-d', text: 'It downloads a PDF copy of the webpage', isCorrect: false },
      ],
    },
    {
      id: 'q_html_8_auto_4',
      question: "What is the primary role of elements introduced in HTML Lesson 8 (Forms & Text Inputs)?",
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
      id: 'q_html_8_auto_5',
      question: "Which attribute is essential for accessibility when implementing elements in Lesson 8?",
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
      id: 'q_html_8_auto_6',
      question: "How do modern web browsers parse elements from Lesson 8?",
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
      id: 'q_html_8_auto_7',
      question: "What is the difference between block-level and inline elements in Lesson 8?",
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
      id: 'q_html_8_auto_8',
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
      id: 'q_html_8_auto_9',
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
      id: 'q_html_8_auto_10',
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
