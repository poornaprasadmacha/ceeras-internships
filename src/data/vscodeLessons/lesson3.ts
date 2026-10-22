import { VsCodeLessonDefinition } from '../../types/vscodeLesson';

export const lesson3: VsCodeLessonDefinition = {
  id: 'vs-lesson-3',
  number: 3,
  slug: 'multi-cursor-editing-and-selection-mastery',
  title: 'Multi-Cursor Editing & Selection Mastery',
  shortDescription:
    'Work at 10x speed with simultaneous multi-cursor insertion (Ctrl+Alt+Up/Down), occurrence matching (Ctrl+D), and document formatting.',
  estimatedMinutes: 25,
  learningObjectives: [
    'Place multiple active insertion cursors with Alt+Click or Ctrl+Alt+Up/Down',
    'Select and edit next matching occurrences with Ctrl+D (and skip with Ctrl+K Ctrl+D)',
    'Select all matching occurrences across the file with Ctrl+Shift+L',
    'Execute document formatting with editor.action.formatDocument',
  ],
  prerequisites: ['Lesson 2: Command Palette & Lightning Navigation'],
  sections: [
    {
      id: 'vs3-1',
      title: 'Simultaneous Multi-Cursor Insertion',
      content:
        'Multi-cursor editing allows you to type, delete, and copy text across multiple lines simultaneously.\n\nWays to spawn multi-cursors:\n- Alt + Click: Adds a new insertion cursor at any clicked location.\n- Ctrl + Alt + Up / Down: Extends a vertical column of cursors above or below the current line.\n- Ctrl + D: Selects the current word, then hitting Ctrl+D again adds the next matching word occurrence to your active selections.\n- Ctrl + Shift + L: Instantly selects all occurrences of the highlighted text across the entire file.',
      codeExample: {
        title: 'Multi-Cursor Shortcuts',
        code: `Ctrl + D               # Select next matching word
Ctrl + K, Ctrl + D     # Skip current match and move to next
Ctrl + Shift + L       # Select all matching occurrences in file
Shift + Alt + I        # Insert cursor at end of each selected line
Shift + Alt + Drag     # Column (box) selection mode`,
        language: 'plaintext',
        explanation: 'Multi-cursor transformations turn repetitive manual changes into single simultaneous keystrokes.',
      },
    },
    {
      id: 'vs3-2',
      title: 'Automatic Document Formatting',
      content:
        'VS Code integrates formatting engines (like Prettier or language-specific formatters). Pressing Shift+Alt+F (or running `editor.action.formatDocument`) cleans up spacing, indentations, semicolons, and quotes according to your workspace formatting rules.',
      codeExample: {
        title: 'Formatting Command',
        code: `Shift + Alt + F        # Format Document
Ctrl + K, Ctrl + F     # Format Selection only`,
        language: 'bash',
        explanation: 'Enabling "editor.formatOnSave": true in settings automates this on every file save.',
      },
    },
  ],
  exercises: [
    {
      id: 'vs3-ex1',
      lessonId: 'vs-lesson-3',
      order: 1,
      title: 'Open math.ts for Refactoring',
      objective:
        'Open "src/utils/math.ts" to prepare for multi-cursor editing.',
      initialState: {
        activeFile: 'src/App.tsx',
        openTabs: ['src/App.tsx'],
      },
      solutionAction: 'workbench.action.openMathTs',
      expectedStateMatch: (state) => state.activeFile === 'src/utils/math.ts',
      hint: 'Click on "src/utils/math.ts" in the file explorer.',
      explanation:
        'Opening target modules lets you inspect and edit function exports directly.',
      quickChips: ['src/utils/math.ts'],
    },
    {
      id: 'vs3-ex2',
      lessonId: 'vs-lesson-3',
      order: 2,
      title: 'Trigger Document Formatting',
      objective:
        'Run the format document command "editor.action.formatDocument" to format the active file.',
      initialState: {
        activeFile: 'src/utils/math.ts',
        openTabs: ['src/utils/math.ts'],
      },
      solutionAction: 'editor.action.formatDocument',
      expectedStateMatch: (state) => state.terminalOutput.includes('Formatted document') || state.statusInfo.errors === 0,
      hint: 'Run "editor.action.formatDocument" from the quick chips or command runner.',
      explanation:
        'Document formatting enforces clean, standardized indentation and line breaks across your codebase.',
      quickChips: ['editor.action.formatDocument'],
    },
  ],
  quiz: [
    {
      id: 'q-vs-3-1',
      question: 'Which key shortcut selects the next matching occurrence of the current word in VS Code?',
      explanation:
        'Ctrl+D highlights the next occurrence and places an additional cursor on it.',
      difficulty: 'beginner',
      topicTag: 'vscode',
      type: 'multiple-choice',
      options: [
        {
          id: 'opt-a',
          text: 'Ctrl + D (or Cmd + D on macOS)',
          isCorrect: true,
        },
        {
          id: 'opt-b',
          text: 'Ctrl + Shift + F',
          isCorrect: false,
        },
        {
          id: 'opt-c',
          text: 'Alt + F4',
          isCorrect: false,
        },
        {
          id: 'opt-d',
          text: 'Ctrl + R',
          isCorrect: false,
        },
      ],
    },
    {
      id: 'q-vs-3-2',
      question: 'How can you place cursors at the ends of every line across an entire highlighted block of text?',
      explanation:
        'Shift+Alt+I places a cursor at the end of each line within the currently selected text range.',
      difficulty: 'intermediate',
      topicTag: 'vscode',
      type: 'multiple-choice',
      options: [
        {
          id: 'opt-a',
          text: 'Shift + Alt + I',
          isCorrect: true,
        },
        {
          id: 'opt-b',
          text: 'Ctrl + Shift + P',
          isCorrect: false,
        },
        {
          id: 'opt-c',
          text: 'Ctrl + Alt + Down',
          isCorrect: false,
        },
        {
          id: 'opt-d',
          text: 'Ctrl + Tab',
          isCorrect: false,
        },
      ],
    },
    {
      id: 'q_vscode_3_auto_3',
      question: "What is the primary role of the VS Code features explored in Lesson 3 (Multi-Cursor Editing & Selection Mastery)?",
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
      id: 'q_vscode_3_auto_4',
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
      id: 'q_vscode_3_auto_5',
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
      id: 'q_vscode_3_auto_6',
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
      id: 'q_vscode_3_auto_7',
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
      id: 'q_vscode_3_auto_8',
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
      id: 'q_vscode_3_auto_9',
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
      id: 'q_vscode_3_auto_10',
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
