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
  ],
};
