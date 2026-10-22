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
    {
      id: 'q_vscode_5_auto_3',
      question: "What is the primary role of the VS Code features explored in Lesson 5 (Custom Keybindings & Keyboard Shortcuts)?",
      explanation: "VS Code combines a lightweight text editor with rich extensibility, language servers, and developer tooling.",
      difficulty: 'intermediate',
      topicTag: 'vscode',
      type: 'multiple-choice',
      options: [
        { id: 'opt_1', text: "Maximizing developer productivity through intelligent editor customization, navigation, debugging, or tooling workflows", isCorrect: true },
        { id: 'opt_2', text: "Formatting hard disk partitions", isCorrect: false },
        { id: 'opt_3', text: "Serving web pages on port 80", isCorrect: false },
        { id: 'opt_4', text: "Replacing the operating system kernel", isCorrect: false },
      ],
    },
    {
      id: 'q_vscode_5_auto_4',
      question: "What is the universal keyboard shortcut to open the VS Code Command Palette?",
      explanation: "Ctrl+Shift+P / Cmd+Shift+P opens the Command Palette, providing access to all editor commands and extension actions.",
      difficulty: 'intermediate',
      topicTag: 'vscode',
      type: 'multiple-choice',
      options: [
        { id: 'opt_1', text: "Ctrl+Shift+P (or Cmd+Shift+P on macOS)", isCorrect: true },
        { id: 'opt_2', text: "Ctrl+Alt+Del", isCorrect: false },
        { id: 'opt_3', text: "Ctrl+C", isCorrect: false },
        { id: 'opt_4', text: "Alt+F4", isCorrect: false },
      ],
    },
    {
      id: 'q_vscode_5_auto_5',
      question: "What is the difference between User Settings and Workspace Settings in VS Code?",
      explanation: "Workspace settings (.vscode/settings.json) override global User settings to share team configurations.",
      difficulty: 'intermediate',
      topicTag: 'vscode',
      type: 'multiple-choice',
      options: [
        { id: 'opt_1', text: "User settings apply globally to all projects; Workspace settings apply only to the current opened repository in .vscode/settings.json", isCorrect: true },
        { id: 'opt_2', text: "Workspace settings cannot be checked into Git", isCorrect: false },
        { id: 'opt_3', text: "User settings override workspace settings", isCorrect: false },
        { id: 'opt_4', text: "There is no difference", isCorrect: false },
      ],
    },
    {
      id: 'q_vscode_5_auto_6',
      question: "What protocol allows VS Code to provide intelligent autocomplete, go-to-definition, and diagnostics across 50+ languages?",
      explanation: "The Language Server Protocol (LSP) decouples language intelligence tools from the editor UI.",
      difficulty: 'intermediate',
      topicTag: 'vscode',
      type: 'multiple-choice',
      options: [
        { id: 'opt_1', text: "Language Server Protocol (LSP)", isCorrect: true },
        { id: 'opt_2', text: "Simple Mail Transfer Protocol (SMTP)", isCorrect: false },
        { id: 'opt_3', text: "Hypertext Transfer Protocol (HTTP)", isCorrect: false },
        { id: 'opt_4', text: "File Transfer Protocol (FTP)", isCorrect: false },
      ],
    },
    {
      id: 'q_vscode_5_auto_7',
      question: "Which file in the .vscode folder configures debugging launch targets and breakpoints?",
      explanation: ".vscode/launch.json defines debugger configurations, program entry points, runtime arguments, and environment variables.",
      difficulty: 'intermediate',
      topicTag: 'vscode',
      type: 'multiple-choice',
      options: [
        { id: 'opt_1', text: "launch.json", isCorrect: true },
        { id: 'opt_2', text: "tasks.json", isCorrect: false },
        { id: 'opt_3', text: "settings.json", isCorrect: false },
        { id: 'opt_4', text: "extensions.json", isCorrect: false },
      ],
    },
    {
      id: 'q_vscode_5_auto_8',
      question: "Which file in the .vscode folder automates build commands, test runners, and script execution?",
      explanation: ".vscode/tasks.json configures integrated tasks for build systems, compilers, linters, and test runners.",
      difficulty: 'intermediate',
      topicTag: 'vscode',
      type: 'multiple-choice',
      options: [
        { id: 'opt_1', text: "tasks.json", isCorrect: true },
        { id: 'opt_2', text: "launch.json", isCorrect: false },
        { id: 'opt_3', text: "settings.json", isCorrect: false },
        { id: 'opt_4', text: "keybindings.json", isCorrect: false },
      ],
    },
    {
      id: 'q_vscode_5_auto_9',
      question: "What feature in VS Code allows placing multiple cursors simultaneously to edit matching text?",
      explanation: "Alt+Click adds individual cursors; Ctrl+D / Cmd+D selects matching words for multi-cursor batch editing.",
      difficulty: 'intermediate',
      topicTag: 'vscode',
      type: 'multiple-choice',
      options: [
        { id: 'opt_1', text: "Alt+Click (or Ctrl+D / Cmd+D to select next occurrence)", isCorrect: true },
        { id: 'opt_2', text: "Right-click and copy", isCorrect: false },
        { id: 'opt_3', text: "Caps Lock key", isCorrect: false },
        { id: 'opt_4', text: "F12 navigation", isCorrect: false },
      ],
    },
    {
      id: 'q_vscode_5_auto_10',
      question: "What technology powers VS Code Dev Containers to reproduce identical developer environments?",
      explanation: "Dev Containers utilize Docker containers defined by devcontainer.json to run isolated, reproducible developer setups.",
      difficulty: 'intermediate',
      topicTag: 'vscode',
      type: 'multiple-choice',
      options: [
        { id: 'opt_1', text: "Docker containers configured with devcontainer.json", isCorrect: true },
        { id: 'opt_2', text: "VirtualBox virtual machine images", isCorrect: false },
        { id: 'opt_3', text: "Chrome browser extensions", isCorrect: false },
        { id: 'opt_4', text: "Node.js npm packages only", isCorrect: false },
      ],
    },
  ],
};
