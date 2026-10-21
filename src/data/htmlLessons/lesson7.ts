import { HtmlLessonDefinition } from '../../types/htmlLesson';

export const htmlLesson7: HtmlLessonDefinition = {
  id: 'html-lesson-7',
  number: 7,
  slug: 'tables-and-tabular-data',
  title: 'Tables & Tabular Data',
  shortDescription: 'Format two-dimensional data cleanly with table rows, header cells, and proper semantic sections.',
  estimatedMinutes: 9,
  learningObjectives: [
    'Construct structured data tables using <table>, <tr>, <th>, and <td>',
    'Structure tables semantically with <thead> and <tbody>',
    'Merge adjacent cells across columns or rows using colspan and rowspan',
  ],
  prerequisites: ['Lesson 1: Intro to HTML & Tags.'],
  sections: [
    {
      id: 'sec-7-1',
      title: 'The Core Table Elements',
      content: `Tables display rows and columns of structured information:

• \`<table>\`: The outer container.
• \`<tr>\`: A table row (horizontal).
• \`<th>\`: A header cell (bold and centered by default).
• \`<td>\`: A data cell (standard content).

\`\`\`html
<table>
  <tr>
    <th>Student</th>
    <th>Subject</th>
    <th>Grade</th>
  </tr>
  <tr>
    <td>Alex</td>
    <td>Computer Science</td>
    <td>A+</td>
  </tr>
</table>
\`\`\``,
    },
    {
      id: 'sec-7-2',
      title: 'Semantic Sections (<thead> and <tbody>)',
      content: `Grouping rows into \`<thead>\` and \`<tbody>\` gives screen readers and print styles clear boundaries:

\`\`\`html
<table>
  <thead>
    <tr>
      <th>Product</th>
      <th>Quantity</th>
      <th>Price</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Wireless Mouse</td>
      <td>2</td>
      <td>$25.00</td>
    </tr>
    <tr>
      <td>Mechanical Keyboard</td>
      <td>1</td>
      <td>$79.00</td>
    </tr>
  </tbody>
</table>
\`\`\``,
      tagReferences: [
        {
          tag: '<table>',
          description: 'Wrapper element for tabular two-dimensional data.',
          syntax: '<table>...</table>',
        },
        {
          tag: '<tr>',
          description: 'Defines a table row.',
          syntax: '<tr><td>Cell</td></tr>',
        },
        {
          tag: '<th>',
          description: 'Defines a table header cell.',
          syntax: '<th>Header</th>',
        },
        {
          tag: '<td>',
          description: 'Defines a standard table data cell.',
          syntax: '<td>Value</td>',
        },
      ],
    },
  ],
  exercises: [
    {
      id: 'html-ex-7-1',
      lessonId: 'html-lesson-7',
      order: 1,
      title: 'Create a Course Schedule Table',
      objective: 'Build a table containing <thead> with 3 <th> header cells ("Day", "Topic", "Hours"), and a <tbody> with at least 2 <tr> data rows.',
      initialCode: `<!-- Build your table with thead, tbody, th, and td below -->\n\n`,
      solutionCode: `<table>\n  <thead>\n    <tr>\n      <th>Day</th>\n      <th>Topic</th>\n      <th>Hours</th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr>\n      <td>Monday</td>\n      <td>HTML Basics</td>\n      <td>2</td>\n    </tr>\n    <tr>\n      <td>Wednesday</td>\n      <td>CSS Layouts</td>\n      <td>3</td>\n    </tr>\n  </tbody>\n</table>`,
      validationRules: [
        {
          id: 'v1',
          description: 'Contains a <table> element',
          selector: 'table',
          minCount: 1,
        },
        {
          id: 'v2',
          description: 'Contains a <thead> section with <th> header cells',
          selector: 'table thead th',
          minCount: 3,
        },
        {
          id: 'v3',
          description: 'Contains a <tbody> section',
          selector: 'table tbody',
          minCount: 1,
        },
        {
          id: 'v4',
          description: 'The <tbody> section contains at least 2 <tr> rows',
          selector: 'table tbody tr',
          minCount: 2,
        },
        {
          id: 'v5',
          description: 'Contains <td> data cells inside the table body',
          selector: 'table tbody td',
          minCount: 4,
        },
      ],
      hint: 'Include <table>, <thead> with <tr> and 3 <th> cells, and <tbody> with 2 <tr> rows of <td> cells.',
      explanation: 'Organizing table data with <thead> and <tbody> creates structured, highly readable tabular displays.',
      quickChips: ['<table></table>', '<thead></thead>', '<tbody></tbody>', '<tr></tr>', '<th></th>', '<td></td>'],
    },
  ],
  quiz: [
        {
      id: 'q-html-7-1',
      question: "Which element is used to represent an individual row in an HTML table?",
      explanation: "<tr> stands for table row.",
      difficulty: 'beginner',
      topicTag: 'html',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: "<td>", isCorrect: false },
        { id: 'opt-b', text: "<row>", isCorrect: false },
        { id: 'opt-c', text: "<tr>", isCorrect: true },
        { id: 'opt-d', text: "<tb>", isCorrect: false },
      ],
    },
        {
      id: 'q-html-7-2',
      question: "What is the primary difference between a <th> cell and a <td> cell?",
      explanation: "<th> denotes a header cell and has semantic header meaning for accessibility tools.",
      difficulty: 'beginner',
      topicTag: 'html',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: "<th> represents a header cell (semantic and bold)", isCorrect: true },
        { id: 'opt-b', text: "while <td> contains standard data", isCorrect: false },
        { id: 'opt-c', text: "<th> is only used in mobile viewports", isCorrect: false },
        { id: 'opt-d', text: "<td> can only contain numbers", isCorrect: false },
        { id: 'opt-e', text: "<th> requires an image attribute", isCorrect: false },
      ],
    },
        {
      id: 'q-html-7-3',
      question: "Which attribute allows a table cell to span horizontally across multiple columns?",
      explanation: "colspan merges a single cell across multiple adjacent columns.",
      difficulty: 'beginner',
      topicTag: 'html',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: "rowspan", isCorrect: false },
        { id: 'opt-b', text: "colspan", isCorrect: true },
        { id: 'opt-c', text: "spanwidth", isCorrect: false },
        { id: 'opt-d', text: "columns", isCorrect: false },
      ],
    },
  ],
};
