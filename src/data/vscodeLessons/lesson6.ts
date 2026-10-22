import { VsCodeLessonDefinition } from '../../types/vscodeLesson';

export const lesson6: VsCodeLessonDefinition = {
  id: 'vs-lesson-6',
  number: 6,
  slug: 'intellisense-language-servers-and-refactoring',
  title: 'IntelliSense, Language Servers & Refactoring',
  shortDescription:
    'Master Language Server Protocol (LSP), symbol renaming (F2), peek definitions (Alt+F12), quick fixes (Ctrl+.), and safe refactoring.',
  estimatedMinutes: 25,
  learningObjectives: [
    'Leverage Language Server Protocol (LSP) for deep type intelligence and autocompletion',
    'Execute global symbol renames safely across the entire project using F2',
    'Navigate codebases with Go to Definition (F12) and Peek Definition (Alt+F12)',
    'Apply Quick Fix refactorings and code actions using Ctrl+.',
  ],
  prerequisites: ['Lesson 1: VS Code Interface Architecture & Anatomy'],
  sections: [
    {
      id: 'vs6-1',
      title: 'The Language Server Protocol (LSP)',
      content:
        'VS Code invented the Language Server Protocol (LSP), which decouples the editor from language intelligence engines (like TypeScript Server, Pyright, or Rust Analyzer).\n\nThis gives you:\n- Semantic autocomplete suggestions as you type (Ctrl+Space).\n- Type signatures and inline documentation on hover.\n- Instant syntax and type error diagnostics shown in the Problems panel.',
      codeExample: {
        title: 'LSP Navigation Keys',
        code: `F12              # Go to Definition (jumps to source declaration)
Alt + F12        # Peek Definition (opens inline inspection window)
Shift + F12      # Find All References (lists all callers across project)
Ctrl + .         # Quick Fix / Code Actions (import missing modules, fix errors)`,
        language: 'plaintext',
        explanation: 'Peek Definition lets you view and edit referenced function bodies without switching active files.',
      },
    },
    {
      id: 'vs6-2',
      title: 'Safe Symbol Renaming (F2)',
      content:
        'Never use global find-and-replace to rename functions or variables! That can accidentally corrupt unrelated strings or comments.\n\nPressing F2 initiates a semantic rename. The Language Server evaluates the Abstract Syntax Tree (AST) and updates only actual occurrences and imported bindings across every file in your project.',
      codeExample: {
        title: 'Refactoring Actions',
        code: `F2               # Rename Symbol across workspace
Ctrl + Shift + R # Refactor menu (Extract Function, Extract Variable)`,
        language: 'bash',
        explanation: 'F2 ensures that variables with identical names in other scopes remain untouched.',
      },
    },
  ],
  exercises: [
    {
      id: 'vs6-ex1',
      lessonId: 'vs-lesson-6',
      order: 1,
      title: 'Inspect src/utils/math.ts Types',
      objective:
        'Open "src/utils/math.ts" to examine exported helper functions and type diagnostics.',
      initialState: {
        activeFile: 'src/App.tsx',
        openTabs: ['src/App.tsx'],
      },
      solutionAction: 'src/utils/math.ts',
      expectedStateMatch: (state) => state.activeFile === 'src/utils/math.ts',
      hint: 'Click on "src/utils/math.ts" in the Explorer.',
      explanation:
        'Opening typescript modules activates the TypeScript Language Server.',
      quickChips: ['src/utils/math.ts', 'src/App.tsx'],
    },
    {
      id: 'vs6-ex2',
      lessonId: 'vs-lesson-6',
      order: 2,
      title: 'Verify Clean Diagnostics',
      objective:
        'Check that the workspace diagnostics report 0 errors and 0 warnings.',
      initialState: {
        activeFile: 'src/utils/math.ts',
        statusInfo: {
          branch: 'main',
          line: 1,
          col: 1,
          errors: 0,
          warnings: 0,
          language: 'TypeScript',
          spaces: 2,
        },
      },
      solutionAction: 'verify.diagnostics',
      expectedStateMatch: (state) => state.statusInfo.errors === 0,
      hint: 'Verify the Status Bar indicates 0 errors.',
      explanation:
        'IntelliSense continuously runs diagnostics in the background and surfaces clean status.',
      quickChips: ['src/utils/math.ts'],
    },
  ],
  quiz: [
    {
      id: 'q-vs-6-1',
      question: 'Why is pressing F2 preferred over standard Find-and-Replace when renaming a function in VS Code?',
      explanation:
        'F2 performs semantic AST-aware renaming across the workspace, avoiding accidental modifications to unrelated strings or local variables.',
      difficulty: 'beginner',
      topicTag: 'vscode',
      type: 'multiple-choice',
      options: [
        {
          id: 'opt-a',
          text: 'It semantically updates only valid code references without altering strings or comments',
          isCorrect: true,
        },
        {
          id: 'opt-b',
          text: 'It deletes the file and creates a new one',
          isCorrect: false,
        },
        {
          id: 'opt-c',
          text: 'It is the only way to save a file',
          isCorrect: false,
        },
        {
          id: 'opt-d',
          text: 'It compiles the project to C++',
          isCorrect: false,
        },
      ],
    },
    {
      id: 'q-vs-6-2',
      question: 'Which shortcut brings up the Quick Fix and Code Actions menu for an underlined error or warning?',
      explanation:
        'Ctrl+. (Cmd+. on macOS) opens the Quick Fix lightbulb menu proposing automatic fixes and module imports.',
      difficulty: 'beginner',
      topicTag: 'vscode',
      type: 'multiple-choice',
      options: [
        {
          id: 'opt-a',
          text: 'Ctrl + . (or Cmd + . on macOS)',
          isCorrect: true,
        },
        {
          id: 'opt-b',
          text: 'Alt + F4',
          isCorrect: false,
        },
        {
          id: 'opt-c',
          text: 'Ctrl + Alt + Del',
          isCorrect: false,
        },
        {
          id: 'opt-d',
          text: 'Shift + Enter',
          isCorrect: false,
        },
      ],
    },
    {
      id: 'q_vscode_6_auto_3',
      question: "What is the primary role of the VS Code features explored in Lesson 6 (IntelliSense, Language Servers & Refactoring)?",
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
      id: 'q_vscode_6_auto_4',
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
      id: 'q_vscode_6_auto_5',
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
      id: 'q_vscode_6_auto_6',
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
      id: 'q_vscode_6_auto_7',
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
      id: 'q_vscode_6_auto_8',
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
      id: 'q_vscode_6_auto_9',
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
      id: 'q_vscode_6_auto_10',
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
