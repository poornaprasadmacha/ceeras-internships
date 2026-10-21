import { CssLessonDefinition } from '../../types/cssLesson';

export const cssLesson1: CssLessonDefinition = {
  id: 'css-lesson-1',
  number: 1,
  slug: 'intro-to-css-syntax-and-selectors',
  title: 'Introduction to CSS & Syntax Rules',
  shortDescription: 'Discover how CSS styles HTML elements using selectors, properties, and declaration blocks.',
  estimatedMinutes: 8,
  learningObjectives: [
    'Understand how CSS separates design and presentation from HTML structure',
    'Write standard CSS declaration blocks with selectors, properties, and values',
    'Target elements using tag names, class selectors (.name), and ID selectors (#name)',
  ],
  prerequisites: ['HTML fundamentals (tags and attributes).'],
  sections: [
    {
      id: 'sec-1-1',
      title: 'What is CSS?',
      content: `**CSS** stands for **C**ascading **S**tyle **S**heets. While HTML provides the skeleton of a web page, CSS provides the visual styling: colors, fonts, spacing, and layouts.

\`\`\`css
h1 {
  color: #0E5E77;
  text-align: center;
}
\`\`\`

• **Selector (\`h1\`)**: Identifies which HTML element to style.
• **Property (\`color\`)**: The characteristic you want to change.
• **Value (\`#0E5E77\` / \`center\`)**: The styling setting applied.
• Every declaration ends with a semicolon (\`;\`).`,
    },
    {
      id: 'sec-1-2',
      title: 'Targeting Elements, Classes, and IDs',
      content: `CSS offers three primary selector levels:

1. **Element Selector**: Targets all tags of that type (e.g. \`p { ... }\`).
2. **Class Selector (\`.class-name\`)**: Targets elements with a specific class attribute (reusable anywhere).
3. **ID Selector (\`#id-name\`)**: Targets a single unique element with that ID.

\`\`\`css
/* Styles all buttons */
button {
  cursor: pointer;
}

/* Styles elements with class="primary-card" */
.primary-card {
  background-color: #f8fafc;
}

/* Styles the single element with id="main-banner" */
#main-banner {
  text-align: center;
}
\`\`\``,
      propertyReferences: [
        {
          property: 'color',
          description: 'Sets the foreground text color of an element.',
          syntax: 'color: #0E5E77;',
          commonValues: ['#0E5E77', 'rgb(14, 94, 119)', 'navy', 'inherit'],
        },
        {
          property: 'text-align',
          description: 'Aligns horizontal text inside a block element.',
          syntax: 'text-align: center;',
          commonValues: ['left', 'center', 'right', 'justify'],
        },
      ],
    },
  ],
  exercises: [
    {
      id: 'css-ex-1-1',
      lessonId: 'css-lesson-1',
      order: 1,
      title: 'Style a Welcome Card with Colors and Alignment',
      objective: 'Target the .card container to set background-color: #f1f5f9;, and style the h2 title with color: #0E5E77; and text-align: center;.',
      htmlSnippet: `<div class="card">\n  <h2>Welcome to Ceeras</h2>\n  <p>Learn interactive CSS styling step by step.</p>\n</div>`,
      initialCss: `/* Add your CSS rules for .card and h2 below */\n\n`,
      solutionCss: `.card {\n  background-color: #f1f5f9;\n  padding: 16px;\n}\n\nh2 {\n  color: #0E5E77;\n  text-align: center;\n}`,
      validationRules: [
        {
          id: 'v1',
          description: 'Targets the .card class with a light background-color',
          targetSelector: '.card',
          property: 'background-color',
        },
        {
          id: 'v2',
          description: 'Sets the h2 title text color to #0E5E77',
          targetSelector: 'h2',
          property: 'color',
          expectedValue: '#0E5E77',
        },
        {
          id: 'v3',
          description: 'Centers the h2 title using text-align: center;',
          targetSelector: 'h2',
          property: 'text-align',
          expectedValue: 'center',
        },
      ],
      hint: 'Write .card { background-color: #f1f5f9; } and h2 { color: #0E5E77; text-align: center; }',
      explanation: 'Class selectors start with a period (.) and element selectors target standard HTML tag names directly.',
      quickChips: ['.card {', 'background-color: #f1f5f9;', 'h2 {', 'color: #0E5E77;', 'text-align: center;', '}'],
    },
  ],
  quiz: [
    {
      id: 'q-css-1-1',
      question: 'Which symbol is used in CSS to target elements by their class name?',
      explanation: 'Class selectors begin with a period (dot), such as .button or .card.',
      difficulty: 'beginner',
      topicTag: 'css',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'A hashtag (#)', isCorrect: false },
        { id: 'opt-b', text: 'A period / dot (.)', isCorrect: true },
        { id: 'opt-c', text: 'An ampersand (&)', isCorrect: false },
        { id: 'opt-d', text: 'An exclamation mark (!)', isCorrect: false },
      ],
    },
    {
      id: 'q-css-1-2',
      question: 'What punctuation character must follow every individual CSS declaration?',
      explanation: 'Every CSS declaration must end with a semicolon (;) to separate properties.',
      difficulty: 'beginner',
      topicTag: 'css',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'A semicolon (;)', isCorrect: true },
        { id: 'opt-b', text: 'A comma (,)', isCorrect: false },
        { id: 'opt-c', text: 'A colon (:)', isCorrect: false },
        { id: 'opt-d', text: 'A period (.)', isCorrect: false },
      ],
    },
    {
      id: 'q-css-1-3',
      question: 'Which selector has the highest specificity between an element, class, and ID?',
      explanation: 'ID selectors (#id) have higher specificity than class selectors (.class) and element selectors.',
      difficulty: 'beginner',
      topicTag: 'css',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'Element selector (e.g. h1)', isCorrect: false },
        { id: 'opt-b', text: 'Class selector (e.g. .title)', isCorrect: false },
        { id: 'opt-c', text: 'ID selector (e.g. #title)', isCorrect: true },
        { id: 'opt-d', text: 'Universal selector (*)', isCorrect: false },
      ],
    },
  ],
};
