import { VsCodeLessonDefinition } from '../../types/vscodeLesson';

export const lesson5: VsCodeLessonDefinition = {
  id: 'vs-lesson-5',
  number: 5,
  slug: 'keybindings-and-shortcuts-customization',
  title: 'Custom Keybindings & Keyboard Shortcuts',
  shortDescription:
    'Customize keyboard shortcuts via keybindings.json, configure conditional "when" clauses, and resolve keystroke conflicts.',
  estimatedMinutes: 20,
  learningObjectives: [
    'Open and navigate the Keyboard Shortcuts graphical editor (Ctrl+K Ctrl+S)',
    'Configure custom keybindings inside keybindings.json',
    'Write conditional "when" context clauses to restrict shortcut triggers',
    'Resolve shortcut collisions and remove default conflicting bindings',
  ],
  prerequisites: ['Lesson 2: Command Palette & Lightning Navigation'],
  sections: [
    {
      id: 'vs5-1',
      title: 'The Keyboard Shortcuts Architecture',
      content:
        'VS Code allows deep customization of every keypress. You can view and edit shortcuts through the interactive GUI (File > Preferences > Keyboard Shortcuts or Ctrl+K Ctrl+S), or directly in the underlying `keybindings.json` file.\n\nEach binding consists of three essential properties:\n1. "key": The key combination (e.g. "ctrl+alt+r" or chord "ctrl+k ctrl+m").\n2. "command": The internal VS Code command identifier.\n3. "when": An optional boolean context expression that restricts when the shortcut is active.',
      codeExample: {
        title: 'Sample keybindings.json',
        code: `[
  {
    "key": "ctrl+shift+r",
    "command": "editor.action.rename",
    "when": "editorHasRenameProvider && editorTextFocus && !editorReadonly"
  },
  {
    "key": "ctrl+alt+t",
    "command": "workbench.action.terminal.toggleTerminal"
  }
]`,
        language: 'json',
        explanation: 'The "when" clause prevents the command from firing unless an editor has focus and is not read-only.',
      },
    },
    {
      id: 'vs5-2',
      title: 'Context Keys and "When" Clauses',
      content:
        'Context keys evaluate editor state in real time. Common context keys include:\n- `editorTextFocus`: True when the editor cursor is active.\n- `terminalFocus`: True when the user is typing inside the terminal.\n- `sideBarVisible`: True when the Primary Side Bar is open.\n- `!inDebugMode`: Inverted condition ensuring you are not actively paused in a debug session.\n\nYou can chain conditions with `&&` (AND), `||` (OR), and `!` (NOT).',
      codeExample: {
        title: 'Chaining When Context Keys',
        code: `"when": "editorTextFocus && !suggestWidgetVisible"`,
        language: 'json',
        explanation: 'This ensures the shortcut only triggers when editing text and the autocomplete suggestion popup is not open.',
      },
    },
  ],
  exercises: [
    {
      id: 'vs5-ex1',
      lessonId: 'vs-lesson-5',
      order: 1,
      title: 'Open Keyboard Shortcuts Panel',
      objective:
        'Open the Keyboard Shortcuts configuration interface using the command palette action.',
      initialState: {
        activeSidebar: 'explorer',
        activeFile: 'src/App.tsx',
      },
      solutionAction: 'workbench.action.openGlobalKeybindings',
      expectedStateMatch: (state) => state.terminalOutput.includes('Keybindings') || state.commandPaletteOpen === false,
      hint: 'Run "workbench.action.openGlobalKeybindings".',
      explanation:
        'Accessing Keyboard Shortcuts allows you to audit all active bindings and their when clauses.',
      quickChips: ['workbench.action.openGlobalKeybindings'],
    },
    {
      id: 'vs5-ex2',
      lessonId: 'vs-lesson-5',
      order: 2,
      title: 'Switch Active Editor to Settings',
      objective:
        'Open ".vscode/settings.json" to verify workspace preferences.',
      initialState: {
        activeFile: 'src/App.tsx',
        openTabs: ['src/App.tsx'],
      },
      solutionAction: '.vscode/settings.json',
      expectedStateMatch: (state) => state.activeFile === '.vscode/settings.json',
      hint: 'Click on ".vscode/settings.json" in the file explorer.',
      explanation:
        'Viewing settings allows checking configuration alongside custom keybindings.',
      quickChips: ['.vscode/settings.json'],
    },
  ],
  quiz: [
    {
      id: 'q-vs-5-1',
      question: 'In a keybindings.json file, what is the purpose of the "when" property?',
      explanation:
        'The "when" clause defines conditional context rules determining exactly when the shortcut is enabled.',
      difficulty: 'intermediate',
      topicTag: 'vscode',
      type: 'multiple-choice',
      options: [
        {
          id: 'opt-a',
          text: 'Restricts when the shortcut is active based on current editor context',
          isCorrect: true,
        },
        {
          id: 'opt-b',
          text: 'Sets a timer for how long the key must be held down',
          isCorrect: false,
        },
        {
          id: 'opt-c',
          text: 'Specifies which date and time the keybinding becomes active',
          isCorrect: false,
        },
        {
          id: 'opt-d',
          text: 'Sets the operating system language',
          isCorrect: false,
        },
      ],
    },
    {
      id: 'q-vs-5-2',
      question: 'What is the default two-chord shortcut to open the Keyboard Shortcuts editor in VS Code on Windows/Linux?',
      explanation:
        'Ctrl+K followed by Ctrl+S opens the Keyboard Shortcuts graphical search list.',
      difficulty: 'beginner',
      topicTag: 'vscode',
      type: 'multiple-choice',
      options: [
        {
          id: 'opt-a',
          text: 'Ctrl + K, Ctrl + S',
          isCorrect: true,
        },
        {
          id: 'opt-b',
          text: 'Ctrl + Alt + Shift + K',
          isCorrect: false,
        },
        {
          id: 'opt-c',
          text: 'Ctrl + P',
          isCorrect: false,
        },
        {
          id: 'opt-d',
          text: 'Alt + F2',
          isCorrect: false,
        },
      ],
    },
  ],
};
