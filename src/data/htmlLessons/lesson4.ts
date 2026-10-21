import { HtmlLessonDefinition } from '../../types/htmlLesson';

export const htmlLesson4: HtmlLessonDefinition = {
  id: 'html-lesson-4',
  number: 4,
  slug: 'links-and-hypertext-navigation',
  title: 'Links & Hypertext Navigation',
  shortDescription: 'Connect web pages using hyperlinks, target new browser tabs, and create smooth on-page bookmark jumps.',
  estimatedMinutes: 8,
  learningObjectives: [
    'Create external and internal hyperlinks with the <a> tag',
    'Open links in a new window using target="_blank" and rel="noopener"',
    'Build page jump links using HTML id attributes',
  ],
  prerequisites: ['Lesson 1: Intro to HTML & Tags.'],
  sections: [
    {
      id: 'sec-4-1',
      title: 'The Anchor Tag (<a>) & href Attribute',
      content: `Hyperlinks are what turn isolated pages into the World Wide Web. The \`<a>\` (anchor) tag creates a link, and the \`href\` attribute specifies the destination URL:

\`\`\`html
<a href="https://ceeras.com">Visit Ceeras</a>
\`\`\`

• If you leave out the \`href\` attribute, the tag will not behave as a clickable link.`,
    },
    {
      id: 'sec-4-2',
      title: 'Opening Links in New Tabs',
      content: `To open a link in a separate tab, add \`target="_blank"\`:

\`\`\`html
<a href="https://example.com" target="_blank" rel="noopener noreferrer">
  Open in New Tab
</a>
\`\`\`

• Always pair \`target="_blank"\` with \`rel="noopener noreferrer"\` to prevent security vulnerabilities and memory leaks in the browser.`,
    },
    {
      id: 'sec-4-3',
      title: 'Internal Bookmark Links',
      content: `You can link directly to a specific section on the same page by referencing an element's unique \`id\`:

\`\`\`html
<!-- Link at the top -->
<a href="#contact">Jump to Contact</a>

<!-- Destination lower down the page -->
<h2 id="contact">Contact Information</h2>
\`\`\``,
      tagReferences: [
        {
          tag: '<a>',
          description: 'Defines a hyperlink to external pages or internal sections.',
          syntax: '<a href="URL">Link Text</a>',
          attributes: ['href', 'target', 'rel'],
        },
      ],
    },
  ],
  exercises: [
    {
      id: 'html-ex-4-1',
      lessonId: 'html-lesson-4',
      order: 1,
      title: 'Build a Website Navigation Bar with Anchor Links',
      objective: 'Create a navigation block with an external link that opens in a new tab, and an internal link pointing to a section with id="about".',
      initialCode: `<!-- Create your navigation links and target section below -->\n\n`,
      solutionCode: `<nav>\n  <a href="https://ceeras.com" target="_blank" rel="noopener">Visit Ceeras</a>\n  <a href="#about">About Us</a>\n</nav>\n\n<h2 id="about">About Our Mission</h2>\n<p>We build accessible educational software for every student.</p>`,
      validationRules: [
        {
          id: 'v1',
          description: 'Contains at least two <a> anchor link elements',
          selector: 'a',
          minCount: 2,
        },
        {
          id: 'v2',
          description: 'Has a link with target="_blank" to open in a new tab',
          selector: 'a[target="_blank"]',
          minCount: 1,
        },
        {
          id: 'v3',
          description: 'Has an internal link pointing to an id with href="#about"',
          selector: 'a[href="#about"]',
          minCount: 1,
        },
        {
          id: 'v4',
          description: 'Contains an element with the corresponding id="about"',
          selector: '#about',
          minCount: 1,
        },
      ],
      hint: 'Include <a href="https://..." target="_blank">External</a> and <a href="#about">About</a> with a matching <h2 id="about">.',
      explanation: 'Anchor tags with href and target attributes provide seamless navigation across the web and within documents.',
      quickChips: ['<a href=""></a>', 'target="_blank"', 'rel="noopener"', 'href="#about"', 'id="about"'],
    },
  ],
  quiz: [
        {
      id: 'q-html-4-1',
      question: "Which attribute defines the destination address of an anchor link?",
      explanation: "The href (Hypertext Reference) attribute points to the link destination.",
      difficulty: 'beginner',
      topicTag: 'html',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: "src", isCorrect: false },
        { id: 'opt-b', text: "link", isCorrect: false },
        { id: 'opt-c', text: "href", isCorrect: true },
        { id: 'opt-d', text: "to", isCorrect: false },
      ],
    },
    {
      id: 'q-html-4-2',
      question: 'What value should be assigned to the target attribute to launch a link in a new tab?',
      explanation: 'target="_blank" is the standard value for opening links in a separate browser tab.',
      difficulty: 'beginner',
      topicTag: 'html',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: '_new', isCorrect: false },
        { id: 'opt-b', text: '_blank', isCorrect: true },
        { id: 'opt-c', text: '_window', isCorrect: false },
        { id: 'opt-d', text: '_tab', isCorrect: false },
      ],
    },
    {
      id: 'q-html-4-3',
      question: 'How do you target an element with id="team" using an anchor link on the same page?',
      explanation: 'A hashtag followed by the ID name (e.g. href="#team") creates an internal page bookmark.',
      difficulty: 'beginner',
      topicTag: 'html',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: '<a href=".team">', isCorrect: false },
        { id: 'opt-b', text: '<a href="#team">', isCorrect: true },
        { id: 'opt-c', text: '<a link="team">', isCorrect: false },
        { id: 'opt-d', text: '<a target="team">', isCorrect: false },
      ],
    },
  ],
};
