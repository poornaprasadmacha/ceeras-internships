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
  ],
};
