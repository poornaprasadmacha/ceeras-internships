import { HtmlLessonDefinition } from '../../types/htmlLesson';

export const htmlLesson5: HtmlLessonDefinition = {
  id: 'html-lesson-5',
  number: 5,
  slug: 'images-and-media',
  title: 'Images & Visual Media',
  shortDescription: 'Embed photographs and illustrations safely, write accessible alt descriptions, and pair images with figure captions.',
  estimatedMinutes: 8,
  learningObjectives: [
    'Embed images using the self-closing <img> tag and src attribute',
    'Write accessible alt attributes for screen readers and SEO',
    'Package images with descriptive captions using <figure> and <figcaption>',
  ],
  prerequisites: ['Lesson 1: Intro to HTML & Tags.'],
  sections: [
    {
      id: 'sec-5-1',
      title: 'The <img> Element & Required Attributes',
      content: `The \`<img>\` element embeds raster or vector graphics directly onto your page. It is a self-closing void element.

\`\`\`html
<img src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400" 
     alt="A laptop sitting on a wooden desk beside a notebook" 
     width="320" />
\`\`\`

• \`src\`: The path or URL to the image file.
• \`alt\`: Alternative text displayed if the image fails to load, and read aloud by screen readers for visually impaired users. **Always include descriptive alt text!**`,
    },
    {
      id: 'sec-5-2',
      title: 'Figures & Captions (<figure> and <figcaption>)',
      content: `When an image represents an illustration, diagram, or photo accompanied by a caption, wrap it in a \`<figure>\` element:

\`\`\`html
<figure>
  <img src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400" 
       alt="Satellite view of planet Earth from orbit" 
       width="320" />
  <figcaption>Figure 1: Earth captured from the International Space Station.</figcaption>
</figure>
\`\`\`

• \`<figcaption>\` semantically binds the explanatory caption directly to the graphic.`,
      tagReferences: [
        {
          tag: '<img>',
          description: 'Embeds an image from an absolute or relative URL.',
          syntax: '<img src="path.jpg" alt="Description" />',
          attributes: ['src', 'alt', 'width', 'height'],
          selfClosing: true,
        },
        {
          tag: '<figure>',
          description: 'Self-contained content container often paired with a caption.',
          syntax: '<figure>...</figure>',
        },
        {
          tag: '<figcaption>',
          description: 'Caption or legend for the parent <figure>.',
          syntax: '<figcaption>Caption text</figcaption>',
        },
      ],
    },
  ],
  exercises: [
    {
      id: 'html-ex-5-1',
      lessonId: 'html-lesson-5',
      order: 1,
      title: 'Embed a Gallery Photo with Alt Text and Caption',
      objective: 'Create a <figure> containing an <img> with a valid src, non-empty alt text, and a <figcaption> describing the picture.',
      initialCode: `<!-- Add your figure, img, and figcaption below -->\n\n`,
      solutionCode: `<figure>\n  <img src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400" alt="Modern computer coding workspace" width="300" />\n  <figcaption>The modern developer desk setup.</figcaption>\n</figure>`,
      validationRules: [
        {
          id: 'v1',
          description: 'Contains a <figure> container element',
          selector: 'figure',
          minCount: 1,
        },
        {
          id: 'v2',
          description: 'Contains an <img> tag inside the figure',
          selector: 'figure img',
          minCount: 1,
        },
        {
          id: 'v3',
          description: 'The <img> tag has a non-empty alt attribute for accessibility',
          selector: 'img',
          attributeCheck: {
            name: 'alt',
            mustNotBeEmpty: true,
          },
        },
        {
          id: 'v4',
          description: 'Contains a <figcaption> with caption text',
          selector: 'figure figcaption',
          minCount: 1,
        },
      ],
      hint: 'Nest an <img src="..." alt="..." /> and <figcaption>Caption</figcaption> inside a <figure> element.',
      explanation: 'Accessible images with alt attributes and captions provide the best experience for all users and search engines.',
      quickChips: ['<figure></figure>', '<img src="" alt="" />', '<figcaption></figcaption>', 'width="300"'],
    },
  ],
  quiz: [
        {
      id: 'q-html-5-1',
      question: "Why is the alt attribute considered essential for all non-decorative images?",
      explanation: "The alt text serves as an auditory replacement for screen reader users and a fallback when images fail to load.",
      difficulty: 'beginner',
      topicTag: 'html',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: "It speeds up page downloading by 50%", isCorrect: false },
        { id: 'opt-b', text: "It enables screen readers to describe the visual content to visually impaired users", isCorrect: true },
        { id: 'opt-c', text: "It automatically resizes the image resolution", isCorrect: false },
        { id: 'opt-d', text: "It applies a rounded border to the picture", isCorrect: false },
      ],
    },
        {
      id: 'q-html-5-2',
      question: "Which tag is used to attach a semantic caption to an image inside a <figure>?",
      explanation: "<figcaption> is the semantic element for captioning a parent <figure>.",
      difficulty: 'beginner',
      topicTag: 'html',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: "<legend>", isCorrect: false },
        { id: 'opt-b', text: "<title>", isCorrect: false },
        { id: 'opt-c', text: "<figcaption>", isCorrect: true },
        { id: 'opt-d', text: "<label>", isCorrect: false },
      ],
    },
        {
      id: 'q-html-5-3',
      question: "Does the <img> element require a closing </img> tag in standard HTML5?",
      explanation: "<img> is an empty/void element and never has a separate closing tag.",
      difficulty: 'beginner',
      topicTag: 'html',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: "No", isCorrect: true },
        { id: 'opt-b', text: "<img> is a void self-closing element", isCorrect: false },
        { id: 'opt-c', text: "Yes", isCorrect: false },
        { id: 'opt-d', text: "all media tags require closing tags", isCorrect: false },
        { id: 'opt-e', text: "Only when width is not specified", isCorrect: false },
        { id: 'opt-undefined', text: "Only when hosted on remote servers", isCorrect: false },
      ],
    },
    {
      id: 'q_html_5_auto_4',
      question: "What is the primary role of elements introduced in HTML Lesson 5 (Images & Visual Media)?",
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
      id: 'q_html_5_auto_5',
      question: "Which attribute is essential for accessibility when implementing elements in Lesson 5?",
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
      id: 'q_html_5_auto_6',
      question: "How do modern web browsers parse elements from Lesson 5?",
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
      id: 'q_html_5_auto_7',
      question: "What is the difference between block-level and inline elements in Lesson 5?",
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
      id: 'q_html_5_auto_8',
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
      id: 'q_html_5_auto_9',
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
      id: 'q_html_5_auto_10',
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
