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
  ],
};
