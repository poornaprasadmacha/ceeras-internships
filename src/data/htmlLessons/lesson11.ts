import { HtmlLessonDefinition } from '../../types/htmlLesson';

export const htmlLesson11: HtmlLessonDefinition = {
  id: 'html-lesson-11',
  number: 11,
  slug: 'audio-video-and-embedded-media',
  title: 'Audio, Video & Embedded Media',
  shortDescription: 'Deliver rich native multimedia with video and audio players, and embed third-party services using iframes.',
  estimatedMinutes: 9,
  learningObjectives: [
    'Embed native HTML5 video with controls, width, and fallback text',
    'Include audio playback using <audio> and <source> elements',
    'Embed external interactive widgets with <iframe> and accessible title attributes',
  ],
  prerequisites: ['Lesson 5: Images & Media.'],
  sections: [
    {
      id: 'sec-11-1',
      title: 'HTML5 Native Video & Audio Players',
      content: `Before HTML5, websites relied on clunky third-party plugins (like Flash) to play media. Today, browsers play video and audio natively:

• The \`controls\` attribute displays play, pause, volume, and progress bars.
• Always include fallback text for ancient devices.

\`\`\`html
<!-- Native Video Player -->
<video controls width="400">
  <source src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4" type="video/mp4" />
  Your browser does not support HTML5 video.
</video>

<!-- Native Audio Player -->
<audio controls>
  <source src="https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3" type="audio/mpeg" />
  Your browser does not support audio playback.
</audio>
\`\`\``,
    },
    {
      id: 'sec-11-2',
      title: 'Embedding Content with <iframe>',
      content: `The \`<iframe>\` (inline frame) embeds another HTML page, video, map, or code sandbox inside your document:

\`\`\`html
<iframe 
  src="https://example.com" 
  title="Interactive Map Preview" 
  width="100%" 
  height="300" 
  loading="lazy">
</iframe>
\`\`\`

• Always add a descriptive \`title\` attribute so screen readers can identify what is inside the iframe!`,
      tagReferences: [
        {
          tag: '<video>',
          description: 'Embeds a media player for video playback.',
          syntax: '<video controls width="320"><source src="..." /></video>',
        },
        {
          tag: '<audio>',
          description: 'Embeds audio content like podcasts or music.',
          syntax: '<audio controls><source src="..." /></audio>',
        },
        {
          tag: '<iframe>',
          description: 'Embeds an external webpage or media frame.',
          syntax: '<iframe src="..." title="..."></iframe>',
        },
      ],
    },
  ],
  exercises: [
    {
      id: 'html-ex-11-1',
      lessonId: 'html-lesson-11',
      order: 1,
      title: 'Build a Multimedia Showcase Section',
      objective: 'Create a section containing a <video controls> element with a <source>, an <audio controls> player, and an <iframe> with a title attribute.',
      initialCode: `<!-- Add your video, audio, and iframe players below -->\n\n`,
      solutionCode: `<section>\n  <h2>Media Player Studio</h2>\n  <video controls width="320">\n    <source src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4" type="video/mp4" />\n    Video not supported.\n  </video>\n\n  <audio controls>\n    <source src="https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3" type="audio/mpeg" />\n  </audio>\n\n  <iframe src="about:blank" title="Interactive demo canvas" width="300" height="150"></iframe>\n</section>`,
      validationRules: [
        {
          id: 'v1',
          description: 'Contains a <video> element with controls attribute',
          selector: 'video[controls]',
          minCount: 1,
        },
        {
          id: 'v2',
          description: 'The <video> contains a <source> tag',
          selector: 'video source',
          minCount: 1,
        },
        {
          id: 'v3',
          description: 'Contains an <audio> element with controls attribute',
          selector: 'audio[controls]',
          minCount: 1,
        },
        {
          id: 'v4',
          description: 'Contains an <iframe> with an accessible title attribute',
          selector: 'iframe[title]',
          minCount: 1,
        },
      ],
      hint: 'Include <video controls><source ... /></video>, <audio controls><source ... /></audio>, and <iframe title="..." />.',
      explanation: 'Native multimedia elements provide high performance without third-party plugins and maintain accessibility through title and fallback markup.',
      quickChips: ['<video controls width="320"></video>', '<source src="" type="video/mp4" />', '<audio controls></audio>', '<iframe title="" src=""></iframe>'],
    },
  ],
  quiz: [
        {
      id: 'q-html-11-1',
      question: "Which boolean attribute must be present on a <video> tag so users can play, pause, and adjust volume?",
      explanation: "The controls attribute instructs the browser to display its built-in media controls.",
      difficulty: 'beginner',
      topicTag: 'html',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: "play", isCorrect: false },
        { id: 'opt-b', text: "buttons", isCorrect: false },
        { id: 'opt-c', text: "controls", isCorrect: true },
        { id: 'opt-d', text: "interactive", isCorrect: false },
      ],
    },
        {
      id: 'q-html-11-2',
      question: "Why is the title attribute required for accessible <iframe> elements?",
      explanation: "Screen readers read the title attribute to let users know the purpose of the iframe.",
      difficulty: 'beginner',
      topicTag: 'html',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: "It tells screen reader users what content the embedded frame contains", isCorrect: true },
        { id: 'opt-b', text: "It changes the browser tab color", isCorrect: false },
        { id: 'opt-c', text: "It sets the frame border thickness", isCorrect: false },
        { id: 'opt-d', text: "It prevents ads from rendering", isCorrect: false },
      ],
    },
        {
      id: 'q-html-11-3',
      question: "Where should child <source> tags be placed when providing multiple video formats?",
      explanation: "<source> tags are placed inside the <video> or <audio> element in order of format preference.",
      difficulty: 'beginner',
      topicTag: 'html',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: "Directly nested between the opening <video> and closing </video> tags", isCorrect: true },
        { id: 'opt-b', text: "In the document <head>", isCorrect: false },
        { id: 'opt-c', text: "Inside an <a> link tag", isCorrect: false },
        { id: 'opt-d', text: "At the bottom of the page in the footer", isCorrect: false },
      ],
    },
    {
      id: 'q_html_11_auto_4',
      question: "What is the primary role of elements introduced in HTML Lesson 11 (Audio, Video & Embedded Media)?",
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
      id: 'q_html_11_auto_5',
      question: "Which attribute is essential for accessibility when implementing elements in Lesson 11?",
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
      id: 'q_html_11_auto_6',
      question: "How do modern web browsers parse elements from Lesson 11?",
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
      id: 'q_html_11_auto_7',
      question: "What is the difference between block-level and inline elements in Lesson 11?",
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
      id: 'q_html_11_auto_8',
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
      id: 'q_html_11_auto_9',
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
      id: 'q_html_11_auto_10',
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
