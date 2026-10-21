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
  ],
};
