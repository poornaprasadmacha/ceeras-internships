import { HtmlLessonDefinition } from '../../types/htmlLesson';

export const htmlLesson12: HtmlLessonDefinition = {
  id: 'html-lesson-12',
  number: 12,
  slug: 'page-metadata-head-essentials-and-seo',
  title: 'Page Metadata, Head Essentials & SEO',
  shortDescription: 'Master the document head, mobile responsive viewport configuration, charset definitions, and SEO meta tags.',
  estimatedMinutes: 9,
  learningObjectives: [
    'Define document titles that appear in browser tabs and search results',
    'Configure the responsive viewport tag for mobile devices',
    'Link external stylesheets and define SEO descriptions',
  ],
  prerequisites: ['Lesson 1: Intro to HTML & Tags.'],
  sections: [
    {
      id: 'sec-12-1',
      title: 'The Backstage of the Web: The <head> Tag',
      content: `The \`<head>\` tag contains machine-readable metadata that isn't drawn on the canvas, but is critical for search engines, mobile responsiveness, and browsers:

• \`<meta charset="UTF-8">\`: Specifies character encoding to display all world alphabets and symbols accurately.
• \`<title>\`: The title appearing on the browser tab, in bookmarks, and as the blue clickable title in Google search results.

\`\`\`html
<head>
  <meta charset="UTF-8" />
  <title>Learn Web Development | Ceeras</title>
</head>
\`\`\``,
    },
    {
      id: 'sec-12-2',
      title: 'Mobile Viewport & External Stylesheets',
      content: `• **Mobile Viewport**: Without this tag, mobile phones will display desktop pages shrunk down to microscopic size:
\`\`\`html
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
\`\`\`

• **SEO Description**: Summarizes page content in search snippets:
\`\`\`html
<meta name="description" content="Master modern HTML5, CSS3, and JavaScript with interactive hands-on sandboxes." />
\`\`\`

• **External CSS Linking**: Connects your external styling sheet:
\`\`\`html
<link rel="stylesheet" href="style.css" />
\`\`\``,
      tagReferences: [
        {
          tag: '<meta>',
          description: 'Document-level metadata declaration.',
          syntax: '<meta name="viewport" content="..." />',
          selfClosing: true,
        },
        {
          tag: '<title>',
          description: 'Title of the HTML document displayed in the tab bar.',
          syntax: '<title>Page Title</title>',
        },
        {
          tag: '<link>',
          description: 'Links external resources such as stylesheets.',
          syntax: '<link rel="stylesheet" href="style.css" />',
          selfClosing: true,
        },
      ],
    },
  ],
  exercises: [
    {
      id: 'html-ex-12-1',
      lessonId: 'html-lesson-12',
      order: 1,
      title: 'Engineer a Production-Ready HTML5 Head Block',
      objective: 'Construct a complete <head> block with charset="UTF-8", mobile responsive viewport meta tag, a <title>, and a <link rel="stylesheet">.',
      initialCode: `<!DOCTYPE html>
<html>
  <head>
    <!-- Add your charset, viewport, title, and stylesheet link here -->
  </head>
  <body>
    <h1>Production Ready Site</h1>
  </body>
</html>`,
      solutionCode: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Modern Ceeras Platform</title>
    <link rel="stylesheet" href="styles.css" />
  </head>
  <body>
    <h1>Production Ready Site</h1>
  </body>
</html>`,
      validationRules: [
        {
          id: 'v1',
          description: 'Includes <!DOCTYPE html> and <head>',
          customCheckId: 'has-valid-doctype',
        },
        {
          id: 'v2',
          description: 'Contains a <meta charset="UTF-8"> tag',
          selector: 'meta[charset]',
          minCount: 1,
        },
        {
          id: 'v3',
          description: 'Contains a mobile viewport <meta name="viewport"> tag',
          selector: 'meta[name="viewport"]',
          minCount: 1,
        },
        {
          id: 'v4',
          description: 'Contains a <title> element with descriptive text',
          selector: 'head title',
          minCount: 1,
        },
        {
          id: 'v5',
          description: 'Contains a <link rel="stylesheet"> element',
          selector: 'link[rel="stylesheet"]',
          minCount: 1,
        },
      ],
      hint: 'Include <meta charset="UTF-8">, <meta name="viewport" content="...">, <title>Text</title>, and <link rel="stylesheet" href="...">.',
      explanation: 'Configuring proper head metadata guarantees your pages look sharp on mobile screens, render fonts correctly, and rank well in search.',
      quickChips: [
        '<meta charset="UTF-8" />',
        '<meta name="viewport" content="width=device-width, initial-scale=1.0" />',
        '<title></title>',
        '<link rel="stylesheet" href="style.css" />',
      ],
    },
  ],
  quiz: [
    {
      id: 'q-html-12-1',
      question: 'What is the purpose of the viewport meta tag?',
      explanation: 'The viewport meta tag is essential for responsive design, instructing mobile devices to scale pages to their actual device pixel width.',
      difficulty: 'beginner',
      topicTag: 'html',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'It instructs mobile devices to scale pages to actual device width', isCorrect: true },
        { id: 'opt-b', text: 'It increases the internet connection speed of the user', isCorrect: false },
        { id: 'opt-c', text: 'It translates the webpage into 20 languages', isCorrect: false },
        { id: 'opt-d', text: 'It encrypts the HTML code on disk', isCorrect: false },
      ],
    },
    {
      id: 'q-html-12-2',
      question: 'Where is the text inside the <title> tag displayed?',
      explanation: 'The <title> tag defines the name seen on browser tabs, bookmarks, and search engine link headers.',
      difficulty: 'beginner',
      topicTag: 'html',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'On the browser tab header and search engine results', isCorrect: true },
        { id: 'opt-b', text: 'In the very center of the webpage in bold text', isCorrect: false },
        { id: 'opt-c', text: 'Inside the footer copyright line', isCorrect: false },
        { id: 'opt-d', text: 'Nowhere, it is strictly an internal comment', isCorrect: false },
      ],
    },
    {
      id: 'q-html-12-3',
      question: 'Which tag correctly connects an external CSS stylesheet file to an HTML document?',
      explanation: '<link rel="stylesheet" href="..."> is the standard way to attach external CSS stylesheets.',
      difficulty: 'beginner',
      topicTag: 'html',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: '<link rel="stylesheet" href="styles.css" />', isCorrect: true },
        { id: 'opt-b', text: '<style src="styles.css"></style>', isCorrect: false },
        { id: 'opt-c', text: '<css href="styles.css" />', isCorrect: false },
        { id: 'opt-d', text: '<script href="styles.css"></script>', isCorrect: false },
      ],
    },
  ],
};
