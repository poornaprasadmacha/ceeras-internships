import { VsCodeLessonDefinition } from '../../types/vscodeLesson';

export const lesson1: VsCodeLessonDefinition = {
  id: 'vs-lesson-1',
  number: 1,
  slug: 'vscode-interface-architecture-and-anatomy',
  title: 'VS Code Interface Architecture & Anatomy',
  shortDescription:
    'Master the 5 core structural regions of Visual Studio Code: Activity Bar, Side Bar, Editor Groups, Panels, and Status Bar.',
  estimatedMinutes: 20,
  learningObjectives: [
    'Navigate the 5 foundational UI regions of Visual Studio Code',
    'Understand Activity Bar switches: Explorer, Search, Source Control, Run/Debug, and Extensions',
    'Manage editor groups, split layouts, and tabbed file navigation',
    'Control the integrated bottom panel: Terminal, Output, Problems, and Debug Console',
  ],
  prerequisites: ['Basic understanding of files and folders'],
  sections: [
    {
      id: 'vs1-1',
      title: 'The Five Anatomical Pillars of VS Code',
      content:
        'Visual Studio Code is structured into five distinct, customizable UI regions designed to maximize code visibility while keeping essential tools a keystroke away.\n\n1. Activity Bar: The vertical icon strip on the far edge. It allows you to toggle primary tool views.\n2. Primary Side Bar: Displays the contextual pane corresponding to the active Activity Bar icon (e.g. File Explorer tree, Search, Source Control).\n3. Editor Area: The central workspace where you write and edit files. It supports grid splits, side-by-side comparisons, and sticky tabs.\n4. Bottom Panel: Hosts output utilities including the Integrated Terminal, Diagnostics/Problems panel, Output logs, and Debug Console.\n5. Status Bar: The horizontal strip at the bottom showing active Git branch, encoding (UTF-8), indentation settings, cursor position, and language mode.',
      codeExample: {
        title: 'VS Code Interface Shortcuts',
        code: `Ctrl + B          # Toggle Primary Side Bar visibility
Ctrl + \`          # Toggle Integrated Terminal panel
Ctrl + \\          # Split active editor into two side-by-side groups
Ctrl + W          # Close active editor tab`,
        language: 'bash',
        explanation: 'These standard keystrokes allow rapid toggling of sidebars and panels without breaking flow.',
      },
    },
    {
      id: 'vs1-2',
      title: 'Managing Editor Groups & Layouts',
      content:
        'VS Code allows you to hold up to hundreds of open files organized into Editor Groups.\n\nYou can split editor panes horizontally or vertically by pressing Ctrl+\\ or dragging tabs. You can lock tabs to prevent automatic closure, and utilize Grid Layouts (2x2, 1x3) via the View -> Editor Layout menu.\n\nThe Status Bar at the bottom right allows you to click and immediately reconfigure indentation (spaces vs tabs) or switch the language syntax engine.',
      codeExample: {
        title: 'Common Status Bar Indicators',
        code: `Ln 12, Col 4    # Line number and column coordinates of cursor
Spaces: 2       # Soft tabs configuration (2 spaces per indent)
UTF-8           # Character encoding format
TypeScript JSX  # Active language mode providing syntax highlighting`,
        language: 'plaintext',
        explanation: 'Clicking any item in the Status Bar opens an interactive configuration picker in the Command Palette.',
      },
    },
  ],
  exercises: [
    {
      id: 'vs1-ex1',
      lessonId: 'vs-lesson-1',
      order: 1,
      title: 'Open File in Explorer',
      objective:
        'Navigate the File Explorer in the Primary Side Bar and open the "src/index.ts" file in the central editor.',
      initialState: {
        activeSidebar: 'explorer',
        activeFile: 'src/App.tsx',
        openTabs: ['src/App.tsx'],
      },
      solutionAction: 'workbench.action.openIndexTs',
      expectedStateMatch: (state) => state.activeFile === 'src/index.ts',
      hint: 'Click on "src/index.ts" in the Explorer file tree or open it via the tab header.',
      explanation:
        'Selecting a file in the Explorer tree loads it into an active editor group.',
      quickChips: ['src/index.ts', 'src/App.tsx'],
    },
    {
      id: 'vs1-ex2',
      lessonId: 'vs-lesson-1',
      order: 2,
      title: 'Toggle the Integrated Terminal',
      objective:
        'Open the integrated terminal panel by triggering the toggle terminal command.',
      initialState: {
        activeSidebar: 'explorer',
        terminalOutput: '',
      },
      solutionAction: 'workbench.action.terminal.toggleTerminal',
      expectedStateMatch: (state) => state.terminalOutput.length > 0,
      hint: 'Click the "Toggle Terminal" action chip or run the terminal command.',
      explanation:
        'The integrated terminal (Ctrl+`) provides immediate access to your shell without leaving the editor.',
      quickChips: ['workbench.action.terminal.toggleTerminal'],
    },
  ],
  quiz: [
    {
      id: 'q-vs-1-1',
      question: 'Which visual region of VS Code houses the File Explorer, Global Search, and Git Source Control tabs?',
      explanation:
        'The Primary Side Bar displays the active panel selected from the Activity Bar on the far edge.',
      difficulty: 'beginner',
      topicTag: 'vscode',
      type: 'multiple-choice',
      options: [
        {
          id: 'opt-a',
          text: 'Primary Side Bar',
          isCorrect: true,
        },
        {
          id: 'opt-b',
          text: 'Status Bar',
          isCorrect: false,
        },
        {
          id: 'opt-c',
          text: 'Breadcrumbs Bar',
          isCorrect: false,
        },
        {
          id: 'opt-d',
          text: 'Debug Console',
          isCorrect: false,
        },
      ],
    },
    {
      id: 'q-vs-1-2',
      question: 'What is the default shortcut to toggle the visibility of the Primary Side Bar in VS Code?',
      explanation:
        'Ctrl+B (Cmd+B on macOS) shows or hides the Primary Side Bar to expand available editor real estate.',
      difficulty: 'beginner',
      topicTag: 'vscode',
      type: 'multiple-choice',
      options: [
        {
          id: 'opt-a',
          text: 'Ctrl + B (or Cmd + B on macOS)',
          isCorrect: true,
        },
        {
          id: 'opt-b',
          text: 'Ctrl + Shift + P',
          isCorrect: false,
        },
        {
          id: 'opt-c',
          text: 'Ctrl + Alt + Del',
          isCorrect: false,
        },
        {
          id: 'opt-d',
          text: 'Alt + F4',
          isCorrect: false,
        },
      ],
    },
  ],
};
