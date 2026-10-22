import { HtmlLessonDefinition } from '../../types/htmlLesson';

export const htmlLesson9: HtmlLessonDefinition = {
  id: 'html-lesson-9',
  number: 9,
  slug: 'form-choices-and-multi-line-text',
  title: 'Form Choices & Multi-Line Text',
  shortDescription: 'Incorporate radio groups, multiple checkboxes, dropdown select menus, and multi-line textareas.',
  estimatedMinutes: 9,
  learningObjectives: [
    'Group mutually exclusive radio buttons using identical name attributes',
    'Capture multiple independent selections with checkboxes',
    'Build dropdown select menus with <select> and <option>',
    'Accept paragraph-length inputs with <textarea>',
  ],
  prerequisites: ['Lesson 8: Forms & Text Inputs.'],
  sections: [
    {
      id: 'sec-9-1',
      title: 'Radio Buttons vs Checkboxes',
      content: `• **Radio Buttons (\`type="radio"\`)**: Choose **one** option among mutually exclusive choices. They **must share the same \`name\` attribute** to form a connected group.
• **Checkboxes (\`type="checkbox"\`)**: Choose zero, one, or several options independently.

\`\`\`html
<!-- Radio Group: Only one can be picked -->
<p>Choose your preferred track:</p>
<input type="radio" id="sql" name="track" value="sql" checked />
<label for="sql">SQL</label>

<input type="radio" id="py" name="track" value="python" />
<label for="py">Python</label>

<!-- Checkbox: Can pick both -->
<input type="checkbox" id="terms" name="agree" />
<label for="terms">I agree to terms</label>
\`\`\``,
    },
    {
      id: 'sec-9-2',
      title: 'Dropdowns (<select>) and Textareas (<textarea>)',
      content: `• \`<select>\`: Creates a dropdown picker holding multiple \`<option>\` entries.
• \`<textarea>\`: Expands beyond single-line inputs to accommodate multi-line reviews or messages.

\`\`\`html
<!-- Dropdown -->
<label for="skill">Skill Level:</label>
<select id="skill" name="experience">
  <option value="beginner">Beginner</option>
  <option value="intermediate">Intermediate</option>
  <option value="advanced">Advanced</option>
</select>

<!-- Multi-line input -->
<label for="msg">Comments:</label>
<textarea id="msg" name="comments" rows="4" placeholder="Your thoughts..."></textarea>
\`\`\``,
      tagReferences: [
        {
          tag: '<select>',
          description: 'A drop-down selection list.',
          syntax: '<select><option>Item</option></select>',
        },
        {
          tag: '<textarea>',
          description: 'Multi-line text input control.',
          syntax: '<textarea rows="4"></textarea>',
        },
      ],
    },
  ],
  exercises: [
    {
      id: 'html-ex-9-1',
      lessonId: 'html-lesson-9',
      order: 1,
      title: 'Construct a Feedback Survey Form',
      objective: 'Create a form containing a radio group of 2 choices sharing name="rating", a <select> dropdown with at least 3 <option> items, and a <textarea rows="3">.',
      initialCode: `<!-- Build your survey form below -->\n\n`,
      solutionCode: `<form>\n  <fieldset>\n    <legend>Experience Rating</legend>\n    <input type="radio" id="good" name="rating" value="good" checked />\n    <label for="good">Great</label>\n    <input type="radio" id="ok" name="rating" value="ok" />\n    <label for="ok">Average</label>\n  </fieldset>\n\n  <label for="topic">Favorite Subject:</label>\n  <select id="topic" name="topic">\n    <option value="sql">SQL Databases</option>\n    <option value="python">Python Programming</option>\n    <option value="html">HTML5 Frontend</option>\n  </select>\n\n  <label for="feedback">Additional Feedback:</label>\n  <textarea id="feedback" name="feedback" rows="3" placeholder="Share your experience..."></textarea>\n\n  <button type="submit">Submit Feedback</button>\n</form>`,
      validationRules: [
        {
          id: 'v1',
          description: 'Contains a <form> container',
          selector: 'form',
          minCount: 1,
        },
        {
          id: 'v2',
          description: 'Contains at least 2 radio inputs sharing the same name',
          selector: 'input[type="radio"]',
          minCount: 2,
        },
        {
          id: 'v3',
          description: 'Contains a <select> dropdown',
          selector: 'select',
          minCount: 1,
        },
        {
          id: 'v4',
          description: 'The <select> contains at least 3 <option> elements',
          selector: 'select option',
          minCount: 3,
        },
        {
          id: 'v5',
          description: 'Contains a <textarea> element',
          selector: 'textarea',
          minCount: 1,
        },
      ],
      hint: 'Include radio inputs with matching name attributes, a <select> with 3 <option> tags, and a <textarea>.',
      explanation: 'Radio buttons, select menus, and textareas allow web developers to design clean, structured data collection interfaces.',
      quickChips: ['<input type="radio" name="r" />', '<select></select>', '<option></option>', '<textarea rows="3"></textarea>', '<button type="submit"></button>'],
    },
  ],
  quiz: [
        {
      id: 'q-html-9-1',
      question: "How do you ensure only ONE radio button can be selected at a time in a group?",
      explanation: "Radio buttons with matching name attributes automatically act as a mutually exclusive set.",
      difficulty: 'beginner',
      topicTag: 'html',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: "Give all radio buttons in the group the exact same name attribute", isCorrect: true },
        { id: 'opt-b', text: "Give each radio button the exact same id attribute", isCorrect: false },
        { id: 'opt-c', text: "Add the singular=\"true\" attribute", isCorrect: false },
        { id: 'opt-d', text: "Place them on separate rows", isCorrect: false },
      ],
    },
        {
      id: 'q-html-9-2',
      question: "Which tag defines individual selectable choices inside a <select> dropdown?",
      explanation: "<option> represents each individual selectable item in a <select> list.",
      difficulty: 'beginner',
      topicTag: 'html',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: "<choice>", isCorrect: false },
        { id: 'opt-b', text: "<option>", isCorrect: true },
        { id: 'opt-c', text: "<item>", isCorrect: false },
        { id: 'opt-d', text: "<entry>", isCorrect: false },
      ],
    },
        {
      id: 'q-html-9-3',
      question: "What is the correct element for capturing multi-line user comments or paragraphs?",
      explanation: "<textarea> is the dedicated HTML control for multi-line user text input.",
      difficulty: 'beginner',
      topicTag: 'html',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: "<input type=\"paragraph\">", isCorrect: false },
        { id: 'opt-b', text: "<input type=\"multiline\">", isCorrect: false },
        { id: 'opt-c', text: "<textarea>", isCorrect: true },
        { id: 'opt-d', text: "<textbox>", isCorrect: false },
      ],
    },
    {
      id: 'q_html_9_auto_4',
      question: "What is the primary role of elements introduced in HTML Lesson 9 (Form Choices & Multi-Line Text)?",
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
      id: 'q_html_9_auto_5',
      question: "Which attribute is essential for accessibility when implementing elements in Lesson 9?",
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
      id: 'q_html_9_auto_6',
      question: "How do modern web browsers parse elements from Lesson 9?",
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
      id: 'q_html_9_auto_7',
      question: "What is the difference between block-level and inline elements in Lesson 9?",
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
      id: 'q_html_9_auto_8',
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
      id: 'q_html_9_auto_9',
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
      id: 'q_html_9_auto_10',
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
