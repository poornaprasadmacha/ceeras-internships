import { VsCodeLessonDefinition } from '../../types/vscodeLesson';

export const lesson2: VsCodeLessonDefinition = {
  id: 'vs-lesson-2',
  number: 2,
  slug: 'command-palette-and-keyboard-navigation',
  title: 'Command Palette & Lightning Navigation',
  shortDescription:
    'Harness the Command Palette (Ctrl+Shift+P), Quick Open file jump (Ctrl+P), symbol jumping (@), and line jumps (:).',
  estimatedMinutes: 20,
  learningObjectives: [
    'Execute editor commands rapidly via the Command Palette (Ctrl+Shift+P)',
    'Instantly jump across project files with Quick Open (Ctrl+P)',
    'Navigate symbol declarations across files (@ and @:)',
    'Jump to exact line and column numbers (:line:col)',
  ],
  prerequisites: ['Lesson 1: VS Code Interface Architecture & Anatomy'],
  sections: [
    {
      id: 'vs2-1',
      title: 'The Universal Command Palette (Ctrl+Shift+P)',
      content:
        'The Command Palette is the single most powerful navigation control in Visual Studio Code. It provides complete keyboard-driven access to every internal command, extension action, and configuration option.\n\nOpening it with Ctrl+Shift+P (or F1) prepends a ">" character. From there, typing fuzzy match keywords surfaces matching actions, accompanied by their associated keybindings.',
      codeExample: {
        title: 'Command Palette Modifiers in Quick Open',
        code: `>           # Run internal VS Code commands (e.g. >Format Document)
@           # Go to symbol in active file (functions, classes, interfaces)
@:          # Group symbols by category (variables, methods, properties)
:42         # Jump directly to line 42 in active document
#term       # Search workspace symbols across all indexed files
?           # View help list of all available navigation prefixes`,
        language: 'plaintext',
        explanation: 'The initial symbol typed into the Quick Open bar controls the mode of navigation.',
      },
    },
    {
      id: 'vs2-2',
      title: 'Fuzzy File Search with Quick Open (Ctrl+P)',
      content:
        'Pressing Ctrl+P opens Quick Open without the ">" prefix. You can type any fuzzy fragment of a file path (for example, "pkg" matches "package.json", "idx" matches "src/index.ts").\n\nPressing Alt+Enter on a search result opens the file in a new split editor group beside your active file. Pressing Tab auto-completes directory paths.',
      codeExample: {
        title: 'Quick Open Examples',
        code: `settings.json    # Jumps straight to VS Code configuration
math             # Matches src/utils/math.ts
src/app          # Matches src/App.tsx`,
        language: 'bash',
        explanation: 'Fuzzy matching scores directory and file name sub-sequences, so complete paths are unnecessary.',
      },
    },
  ],
  exercises: [
    {
      id: 'vs2-ex1',
      lessonId: 'vs-lesson-2',
      order: 1,
      title: 'Open Command Palette',
      objective:
        'Trigger the Command Palette modal using the quick command action.',
      initialState: {
        commandPaletteOpen: false,
        activeFile: 'src/index.ts',
      },
      solutionAction: 'workbench.action.showCommands',
      expectedStateMatch: (state) => state.commandPaletteOpen === true,
      hint: 'Run the "workbench.action.showCommands" command.',
      explanation:
        'Triggering the command palette allows instant access to all editor functionality without menus.',
      quickChips: ['workbench.action.showCommands'],
    },
    {
      id: 'vs2-ex2',
      lessonId: 'vs-lesson-2',
      order: 2,
      title: 'Quick Open package.json',
      objective:
        'Use Quick Open navigation to switch the active editor to "package.json".',
      initialState: {
        activeFile: 'src/index.ts',
        openTabs: ['src/index.ts'],
      },
      solutionAction: 'workbench.action.openPackageJson',
      expectedStateMatch: (state) => state.activeFile === 'package.json',
      hint: 'Open "package.json" to make it the active file.',
      explanation:
        'Quick Open lets you switch between project files in fractions of a second.',
      quickChips: ['package.json', 'src/utils/math.ts'],
    },
  ],
  quiz: [
    {
      id: 'q-vs-2-1',
      question: 'Which prefix in the Quick Open bar (Ctrl+P) filters and lists symbols (functions, classes) in the current file?',
      explanation:
        'Typing "@" lists document symbols, while "@:" groups them by classification like Methods and Properties.',
      difficulty: 'beginner',
      topicTag: 'vscode',
      type: 'multiple-choice',
      options: [
        {
          id: 'opt-a',
          text: '@',
          isCorrect: true,
        },
        {
          id: 'opt-b',
          text: '>',
          isCorrect: false,
        },
        {
          id: 'opt-c',
          text: ':',
          isCorrect: false,
        },
        {
          id: 'opt-d',
          text: '#',
          isCorrect: false,
        },
      ],
    },
    {
      id: 'q-vs-2-2',
      question: 'How do you directly jump to line 125 in the current file using Quick Open?',
      explanation:
        'Typing ":125" into the Quick Open box prompts VS Code to immediately jump cursor focus to line 125.',
      difficulty: 'beginner',
      topicTag: 'vscode',
      type: 'multiple-choice',
      options: [
        {
          id: 'opt-a',
          text: 'Press Ctrl+P and type ":125"',
          isCorrect: true,
        },
        {
          id: 'opt-b',
          text: 'Press Ctrl+Shift+P and type "line 125"',
          isCorrect: false,
        },
        {
          id: 'opt-c',
          text: 'Press Ctrl+F and search for number 125',
          isCorrect: false,
        },
        {
          id: 'opt-d',
          text: 'Manually scroll down until line 125 appears',
          isCorrect: false,
        },
      ],
    },
  ],
};
