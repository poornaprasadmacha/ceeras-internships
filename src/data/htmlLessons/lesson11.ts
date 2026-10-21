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
  ],
};
