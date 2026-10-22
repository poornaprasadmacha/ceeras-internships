import { CssLessonDefinition } from '../../types/cssLesson';

export const cssLesson11: CssLessonDefinition = {
  id: 'css-lesson-11',
  number: 11,
  slug: 'transitions-pseudo-classes-and-hover-states',
  title: 'Transitions, Pseudo-Classes & Hover States',
  shortDescription: 'Add polish, tactile interactivity, and smooth animations using :hover pseudo-classes, transitions, and 2D transforms.',
  estimatedMinutes: 9,
  learningObjectives: [
    'Create interactive states using pseudo-classes (:hover, :focus, :active)',
    'Smoothly animate property changes with transition: all 0.3s ease',
    'Apply 2D geometric changes with transform: scale() and translateY()',
  ],
  prerequisites: ['Lesson 5: Borders, Rounded Corners & Shadows.'],
  sections: [
    {
      id: 'sec-11-1',
      title: 'Interactive Pseudo-Classes',
      content: `Pseudo-classes style elements based on user interaction:

• **\`:hover\`**: Triggered when the mouse cursor rests over an element.
• **\`:focus\`**: Triggered when a keyboard user tabs to a button or inputs text.
• **\`:active\`**: Triggered while an element is being clicked or pressed down.

\`\`\`css
.btn {
  background-color: #0E5E77;
  color: white;
}

.btn:hover {
  background-color: #083c4c;
}
\`\`\``,
    },
    {
      id: 'sec-11-2',
      title: 'Smooth Transitions & Transforms',
      content: `Without transitions, hover changes happen abruptly like an electric switch. Adding \`transition\` animates the change smoothly:

\`\`\`css
.card {
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.card:hover {
  transform: translateY(-4px); /* Gently floats upward */
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.12);
}
\`\`\`

• Always place the \`transition\` declaration on the **base rule** (\`.card\`), not the \`:hover\` rule, so the return animation plays smoothly when the mouse leaves!`,
      propertyReferences: [
        {
          property: 'transition',
          description: 'Shorthand for animating CSS property changes over time.',
          syntax: 'transition: all 0.3s ease;',
          commonValues: ['all 0.2s ease', 'transform 0.3s ease', 'color 0.15s'],
        },
        {
          property: 'transform',
          description: 'Applies 2D rotation, scaling, or translation to an element.',
          syntax: 'transform: translateY(-4px);',
          commonValues: ['translateY(-4px)', 'scale(1.05)', 'rotate(5deg)'],
        },
      ],
    },
  ],
  exercises: [
    {
      id: 'css-ex-11-1',
      lessonId: 'css-lesson-11',
      order: 1,
      title: 'Add a Smooth Hover Lift Effect to a Button',
      objective: 'Apply transition: all 0.25s ease; to .btn-interactive. Then create a .btn-interactive:hover rule with background-color: #083c4c; and transform: translateY(-3px);.',
      htmlSnippet: `<div class="cta-box">\n  <h3>Ready to start coding?</h3>\n  <button class="btn-interactive">Enroll Free Today</button>\n</div>`,
      initialCss: `/* Style .btn-interactive and hover state below */\n.btn-interactive {\n  padding: 12px 24px;\n  background-color: #0E5E77;\n  color: #ffffff;\n  border: none;\n  border-radius: 6px;\n  cursor: pointer;\n}`,
      solutionCss: `.btn-interactive {\n  padding: 12px 24px;\n  background-color: #0E5E77;\n  color: #ffffff;\n  border: none;\n  border-radius: 6px;\n  cursor: pointer;\n  transition: all 0.25s ease;\n}\n\n.btn-interactive:hover {\n  background-color: #083c4c;\n  transform: translateY(-3px);\n  box-shadow: 0 4px 12px rgba(14, 94, 119, 0.3);\n}`,
      validationRules: [
        {
          id: 'v1',
          description: 'Adds a transition declaration to .btn-interactive',
          targetSelector: '.btn-interactive',
          property: 'transition',
          customValidator: 'has-transition',
        },
        {
          id: 'v2',
          description: 'Creates a .btn-interactive:hover pseudo-class rule',
          targetSelector: '.btn-interactive:hover',
          property: 'background-color',
          customValidator: 'has-hover-state',
        },
        {
          id: 'v3',
          description: 'Applies a 2D transform (e.g. translateY or scale) on hover',
          targetSelector: '.btn-interactive:hover',
          property: 'transform',
        },
      ],
      hint: 'Add transition: all 0.25s ease; inside .btn-interactive, and create .btn-interactive:hover { transform: translateY(-3px); background-color: #083c4c; }',
      explanation: 'Placing transitions on the root selector ensures bidirectional fluid movement when hovering on and off interactive controls.',
      quickChips: ['transition: all 0.25s ease;', '.btn-interactive:hover {', 'transform: translateY(-3px);', 'transform: scale(1.05);', '}'],
    },
  ],
  quiz: [
    {
      id: 'q-css-11-1',
      question: 'Where should the transition property ideally be placed for smooth entry AND exit animations?',
      explanation: 'Declaring transition on the base element selector ensures smooth animation in both directions (hover on and hover off).',
      difficulty: 'beginner',
      topicTag: 'css',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'On the base selector rule (.button)', isCorrect: true },
        { id: 'opt-b', text: 'Only inside the :hover pseudo-class', isCorrect: false },
        { id: 'opt-c', text: 'Directly inside the HTML body tag', isCorrect: false },
        { id: 'opt-d', text: 'Inside a media query only', isCorrect: false },
      ],
    },
    {
      id: 'q-css-11-2',
      question: 'Which transform function gently shifts an element 4 pixels upward on the screen?',
      explanation: 'translateY(-4px) moves an element up along the vertical Y-axis (negative values go up in browser coordinates).',
      difficulty: 'beginner',
      topicTag: 'css',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'translateY(-4px)', isCorrect: true },
        { id: 'opt-b', text: 'translateX(4px)', isCorrect: false },
        { id: 'opt-c', text: 'scaleY(4)', isCorrect: false },
        { id: 'opt-d', text: 'rotate(-4deg)', isCorrect: false },
      ],
    },
    {
      id: 'q-css-11-3',
      question: 'Which pseudo-class styles a form input or button when selected via keyboard tab navigation?',
      explanation: ':focus represents an element currently focused and ready to accept input or keyboard activation.',
      difficulty: 'beginner',
      topicTag: 'css',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: ':hover', isCorrect: false },
        { id: 'opt-b', text: ':focus', isCorrect: true },
        { id: 'opt-c', text: ':visited', isCorrect: false },
        { id: 'opt-d', text: ':target', isCorrect: false },
      ],
    },
    {
      id: 'q_css_11_auto_4',
      question: "What is the core principle taught in CSS Lesson 11 (Transitions, Pseudo-Classes & Hover States)?",
      explanation: "CSS governs the visual representation, responsive layout, and interactive styling of HTML elements.",
      difficulty: 'intermediate',
      topicTag: 'css',
      type: 'multiple-choice',
      options: [
        { id: 'opt_1', text: "Specifying visual rules, layout geometry, colors, typography, or responsive styles for DOM elements", isCorrect: true },
        { id: 'opt_2', text: "Manipulating server-side database tables", isCorrect: false },
        { id: 'opt_3', text: "Compiling backend microservices", isCorrect: false },
        { id: 'opt_4', text: "Writing relational database queries", isCorrect: false },
      ],
    },
    {
      id: 'q_css_11_auto_5',
      question: "How does selector specificity influence rule application in Lesson 11?",
      explanation: "CSS specificity (inline styles > IDs > classes/attributes/pseudo-classes > elements) determines which rule wins.",
      difficulty: 'intermediate',
      topicTag: 'css',
      type: 'multiple-choice',
      options: [
        { id: 'opt_1', text: "Higher specificity rules (e.g. IDs over classes over tags) override lower specificity declarations", isCorrect: true },
        { id: 'opt_2', text: "The first rule in the file always wins regardless of selector type", isCorrect: false },
        { id: 'opt_3', text: "CSS rules are chosen at random by the browser engine", isCorrect: false },
        { id: 'opt_4', text: "Specificity only applies when using CSS Grid", isCorrect: false },
      ],
    },
    {
      id: 'q_css_11_auto_6',
      question: "What are the four components of the standard CSS Box Model?",
      explanation: "Every element is modeled with Content at the center, surrounded by Padding, Border, and outer Margin.",
      difficulty: 'intermediate',
      topicTag: 'css',
      type: 'multiple-choice',
      options: [
        { id: 'opt_1', text: "Content, Padding, Border, and Margin", isCorrect: true },
        { id: 'opt_2', text: "Width, Height, Depth, and Color", isCorrect: false },
        { id: 'opt_3', text: "Top, Right, Bottom, and Left", isCorrect: false },
        { id: 'opt_4', text: "Header, Main, Section, and Footer", isCorrect: false },
      ],
    },
    {
      id: 'q_css_11_auto_7',
      question: "What does 'box-sizing: border-box;' do to element dimension calculations?",
      explanation: "border-box ensures that padding and borders do not expand the element beyond its specified width.",
      difficulty: 'intermediate',
      topicTag: 'css',
      type: 'multiple-choice',
      options: [
        { id: 'opt_1', text: "It includes padding and border in the element's total declared width and height", isCorrect: true },
        { id: 'opt_2', text: "It removes all borders from the element", isCorrect: false },
        { id: 'opt_3', text: "It forces the element to stretch across the full screen", isCorrect: false },
        { id: 'opt_4', text: "It sets margin to zero automatically", isCorrect: false },
      ],
    },
    {
      id: 'q_css_11_auto_8',
      question: "Which CSS property is used to create modern one-dimensional flexible layouts?",
      explanation: "Flexbox (display: flex) provides one-dimensional alignment and distribution along a main and cross axis.",
      difficulty: 'intermediate',
      topicTag: 'css',
      type: 'multiple-choice',
      options: [
        { id: 'opt_1', text: "display: flex", isCorrect: true },
        { id: 'opt_2', text: "display: table", isCorrect: false },
        { id: 'opt_3', text: "float: left", isCorrect: false },
        { id: 'opt_4', text: "position: absolute", isCorrect: false },
      ],
    },
    {
      id: 'q_css_11_auto_9',
      question: "How do media queries enable responsive web design in Lesson 11?",
      explanation: "@media queries inspect viewport properties (e.g., @media (min-width: 768px)) to adapt layouts to screen sizes.",
      difficulty: 'intermediate',
      topicTag: 'css',
      type: 'multiple-choice',
      options: [
        { id: 'opt_1', text: "They apply specific CSS rule sets conditionally based on screen viewport width or device features", isCorrect: true },
        { id: 'opt_2', text: "They compress image files on the fly", isCorrect: false },
        { id: 'opt_3', text: "They convert desktop pages into mobile apps automatically", isCorrect: false },
        { id: 'opt_4', text: "They detect user internet connection speeds", isCorrect: false },
      ],
    },
    {
      id: 'q_css_11_auto_10',
      question: "What is the advantage of using CSS Custom Properties (Variables) like var(--primary)?",
      explanation: "CSS variables defined via --name can be reused and dynamically altered across themes.",
      difficulty: 'intermediate',
      topicTag: 'css',
      type: 'multiple-choice',
      options: [
        { id: 'opt_1', text: "They allow centralizing theme tokens, reducing repetition, and dynamically changing styles at runtime", isCorrect: true },
        { id: 'opt_2', text: "They make web pages run in C++ speed", isCorrect: false },
        { id: 'opt_3', text: "They disable CSS inheritance", isCorrect: false },
        { id: 'opt_4', text: "They replace HTML tags entirely", isCorrect: false },
      ],
    },
  ],
};
