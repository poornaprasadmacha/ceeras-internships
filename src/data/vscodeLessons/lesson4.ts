import { VsCodeLessonDefinition } from '../../types/vscodeLesson';

export const lesson4: VsCodeLessonDefinition = {
  id: 'vs-lesson-4',
  number: 4,
  slug: 'settings-and-workspace-configuration',
  title: 'Settings & Workspace Configuration (settings.json)',
  shortDescription:
    'Master VS Code configuration scopes: User global settings vs .vscode/settings.json workspace overrides.',
  estimatedMinutes: 25,
  learningObjectives: [
    'Understand the configuration hierarchy: User settings vs Workspace settings (.vscode/settings.json)',
    'Configure critical editor preferences: editor.formatOnSave, editor.tabSize, files.autoSave',
    'Enable bracket pair colorization and visual indentation guides',
    'Share standardized project settings with team members via version control',
  ],
  prerequisites: ['Lesson 1: VS Code Interface Architecture & Anatomy'],
  sections: [
    {
      id: 'vs4-1',
      title: 'Configuration Scopes: User vs Workspace',
      content:
        'VS Code provides two primary configuration scopes:\n\n1. User Settings: Global defaults that apply to every project opened on your machine. Stored in your user application data directory.\n2. Workspace Settings: Stored inside the `.vscode/settings.json` file in the root of your project directory. Workspace settings override User settings, ensuring all developers on the team share identical linting, formatting, and tab rules.',
      codeExample: {
        title: 'Sample .vscode/settings.json',
        code: `{
  "editor.tabSize": 2,
  "editor.insertSpaces": true,
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.bracketPairColorization.enabled": true,
  "files.autoSave": "onFocusChange"
}`,
        language: 'json',
        explanation: 'Committing .vscode/settings.json to Git ensures everyone on the repository uses consistent tab sizes and formatting rules.',
      },
    },
    {
      id: 'vs4-2',
      title: 'Language-Specific Overrides',
      content:
        'You can define language-specific blocks in settings.json to override settings solely for specific languages like Python, Markdown, or TypeScript.',
      codeExample: {
        title: 'Language Specific Settings',
        code: `{
  "[python]": {
    "editor.tabSize": 4,
    "editor.defaultFormatter": "ms-python.black-formatter"
  },
  "[json]": {
    "editor.quickSuggestions": {
      "strings": true
    }
  }
}`,
        language: 'json',
        explanation: 'Enclosing the language identifier in square brackets limits rules exclusively to files of that type.',
      },
    },
  ],
  exercises: [
    {
      id: 'vs4-ex1',
      lessonId: 'vs-lesson-4',
      order: 1,
      title: 'Open .vscode/settings.json',
      objective:
        'Open the workspace settings file ".vscode/settings.json" to inspect project configuration.',
      initialState: {
        activeFile: 'src/App.tsx',
        openTabs: ['src/App.tsx'],
      },
      solutionAction: '.vscode/settings.json',
      expectedStateMatch: (state) => state.activeFile === '.vscode/settings.json',
      hint: 'Click on ".vscode/settings.json" in the explorer file tree.',
      explanation:
        'Workspace settings allow project-specific overrides that can be committed to source control.',
      quickChips: ['.vscode/settings.json', 'src/App.tsx'],
    },
    {
      id: 'vs4-ex2',
      lessonId: 'vs-lesson-4',
      order: 2,
      title: 'Verify formatOnSave Setting',
      objective:
        'Ensure that ".vscode/settings.json" contains the configuration setting "editor.formatOnSave": true.',
      initialState: {
        activeFile: '.vscode/settings.json',
        openTabs: ['.vscode/settings.json'],
        files: {
          '.vscode/settings.json': `{\n  "editor.tabSize": 2,\n  "editor.formatOnSave": true\n}`,
        },
      },
      solutionAction: 'verify.settings',
      expectedStateMatch: (state) =>
        (state.files['.vscode/settings.json'] || '').includes('"editor.formatOnSave": true'),
      hint: 'Verify that .vscode/settings.json includes "editor.formatOnSave": true.',
      explanation:
        'Enabling formatOnSave triggers automatic code formatting every time a file is saved.',
      quickChips: ['.vscode/settings.json'],
    },
  ],
  quiz: [
    {
      id: 'q-vs-4-1',
      question: 'Where should project-specific settings that need to be shared across a Git team be stored?',
      explanation:
        '.vscode/settings.json in the repository root overrides global user settings and can be committed to Git.',
      difficulty: 'beginner',
      topicTag: 'vscode',
      type: 'multiple-choice',
      options: [
        {
          id: 'opt-a',
          text: '.vscode/settings.json in the project root',
          isCorrect: true,
        },
        {
          id: 'opt-b',
          text: 'Global User Settings directory',
          isCorrect: false,
        },
        {
          id: 'opt-c',
          text: 'package.json dependencies section',
          isCorrect: false,
        },
        {
          id: 'opt-d',
          text: 'Within Windows Registry',
          isCorrect: false,
        },
      ],
    },
    {
      id: 'q-vs-4-2',
      question: 'What does the setting "editor.formatOnSave": true do in VS Code?',
      explanation:
        'It automatically invokes the active document formatter whenever you save a file.',
      difficulty: 'beginner',
      topicTag: 'vscode',
      type: 'multiple-choice',
      options: [
        {
          id: 'opt-a',
          text: 'Automatically runs the code formatter whenever a file is saved',
          isCorrect: true,
        },
        {
          id: 'opt-b',
          text: 'Deletes all comments in code on save',
          isCorrect: false,
        },
        {
          id: 'opt-c',
          text: 'Compresses files into ZIP archives on save',
          isCorrect: false,
        },
        {
          id: 'opt-d',
          text: 'Prevents the user from saving syntax errors',
          isCorrect: false,
        },
      ],
    },
    {
      id: 'q_vscode_4_auto_3',
      question: "What is the primary role of the VS Code features explored in Lesson 4 (Settings & Workspace Configuration (settings.json))?",
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
      id: 'q_vscode_4_auto_4',
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
      id: 'q_vscode_4_auto_5',
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
      id: 'q_vscode_4_auto_6',
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
      id: 'q_vscode_4_auto_7',
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
      id: 'q_vscode_4_auto_8',
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
      id: 'q_vscode_4_auto_9',
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
      id: 'q_vscode_4_auto_10',
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
