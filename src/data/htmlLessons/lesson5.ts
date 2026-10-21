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
  ],
};
