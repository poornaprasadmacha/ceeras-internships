import { VsCodeLessonDefinition } from '../../types/vscodeLesson';

export const lesson8: VsCodeLessonDefinition = {
  id: 'vs-lesson-8',
  number: 8,
  slug: 'extensions-ecosystem-and-profiles',
  title: 'Extensions Ecosystem & Settings Profiles',
  shortDescription:
    'Leverage the VS Code Extension Marketplace (Ctrl+Shift+X), manage workspace recommendations (.vscode/extensions.json), and isolate workflows with Settings Profiles.',
  estimatedMinutes: 20,
  learningObjectives: [
    'Search, install, disable, and configure extensions via the Marketplace (Ctrl+Shift+X)',
    'Define team extension recommendations in .vscode/extensions.json',
    'Understand extension categories: linters, formatters, debuggers, themes, and snippets',
    'Create and switch between Settings Profiles tailored for different tech stacks',
  ],
  prerequisites: ['Lesson 1: VS Code Interface Architecture & Anatomy'],
  sections: [
    {
      id: 'vs8-1',
      title: 'The VS Code Extension Marketplace',
      content:
        'The Extensions Marketplace provides access to tens of thousands of plugins built by Microsoft and the community. Extensions run in a separate extension host process, ensuring that heavy plugins do not freeze editor rendering.\n\nKey extension categories:\n- Formatters & Linters: ESLint, Prettier, Black, Ruff, Stylelint\n- Language Packs: Python, C/C++, Go, Rust, Java\n- Productivity: GitLens, GitHub Copilot, Docker, Thunder Client, Path Intellisense',
      codeExample: {
        title: 'Extensions Search Filter Tags',
        code: `@installed       # Show extensions currently installed
@recommended     # Show workspace recommended extensions
@category:format # Filter by category
@sort:installs   # Sort results by total download counts`,
        language: 'plaintext',
        explanation: 'Typing "@" in the extensions search bar provides quick filtering predicates.',
      },
    },
    {
      id: 'vs8-2',
      title: 'Workspace Recommendations & Settings Profiles',
      content:
        'Commit a `.vscode/extensions.json` file to your Git repository to automatically prompt teammates to install recommended extensions when opening the project.\n\nSettings Profiles allow you to create distinct environment setups (e.g. "Data Science / Python", "Fullstack React", "Minimal Writing") with their own subsets of active extensions, keybindings, and themes.',
      codeExample: {
        title: 'Sample .vscode/extensions.json',
        code: `{
  "recommendations": [
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "bradlc.vscode-tailwindcss"
  ]
}`,
        language: 'json',
        explanation: 'When a developer opens this project for the first time, VS Code displays a notification offering to install these recommendations with one click.',
      },
    },
  ],
  exercises: [
    {
      id: 'vs8-ex1',
      lessonId: 'vs-lesson-8',
      order: 1,
      title: 'Open Extensions View',
      objective:
        'Switch the Primary Side Bar to the Extensions Marketplace view.',
      initialState: {
        activeSidebar: 'explorer',
      },
      solutionAction: 'workbench.view.extensions',
      expectedStateMatch: (state) => state.activeSidebar === 'extensions',
      hint: 'Click the Extensions icon in the Activity Bar or run "workbench.view.extensions".',
      explanation:
        'The Extensions panel allows you to browse and manage installed plugins.',
      quickChips: ['workbench.view.extensions'],
    },
    {
      id: 'vs8-ex2',
      lessonId: 'vs-lesson-8',
      order: 2,
      title: 'Return to File Explorer',
      objective:
        'Switch the Primary Side Bar back to the File Explorer view.',
      initialState: {
        activeSidebar: 'extensions',
      },
      solutionAction: 'workbench.view.explorer',
      expectedStateMatch: (state) => state.activeSidebar === 'explorer',
      hint: 'Click the Explorer icon in the Activity Bar.',
      explanation:
        'Returning to Explorer restores view of your workspace file tree.',
      quickChips: ['workbench.view.explorer'],
    },
  ],
  quiz: [
    {
      id: 'q-vs-8-1',
      question: 'Where can you define a list of recommended extensions that VS Code will prompt collaborators to install?',
      explanation:
        '.vscode/extensions.json contains a "recommendations" array that alerts developers upon opening the repository.',
      difficulty: 'beginner',
      topicTag: 'vscode',
      type: 'multiple-choice',
      options: [
        {
          id: 'opt-a',
          text: '.vscode/extensions.json in the repository root',
          isCorrect: true,
        },
        {
          id: 'opt-b',
          text: 'Within index.html script tag',
          isCorrect: false,
        },
        {
          id: 'opt-c',
          text: 'In the system environment variables',
          isCorrect: false,
        },
        {
          id: 'opt-d',
          text: 'Inside package-lock.json',
          isCorrect: false,
        },
      ],
    },
    {
      id: 'q-vs-8-2',
      question: 'Why do VS Code extensions run in a separate process outside the main renderer?',
      explanation:
        'Isolating extensions prevents heavy CPU calculations or buggy extensions from freezing editor scrolling and UI responsiveness.',
      difficulty: 'intermediate',
      topicTag: 'vscode',
      type: 'multiple-choice',
      options: [
        {
          id: 'opt-a',
          text: 'To ensure extension execution never blocks editor UI rendering and keystrokes',
          isCorrect: true,
        },
        {
          id: 'opt-b',
          text: 'Because extensions cannot run on the same computer as the editor',
          isCorrect: false,
        },
        {
          id: 'opt-c',
          text: 'To require internet connection at all times',
          isCorrect: false,
        },
        {
          id: 'opt-d',
          text: 'To prevent users from modifying source code',
          isCorrect: false,
        },
      ],
    },
    {
      id: 'q_vscode_8_auto_3',
      question: "What is the primary role of the VS Code features explored in Lesson 8 (Extensions Ecosystem & Settings Profiles)?",
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
      id: 'q_vscode_8_auto_4',
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
      id: 'q_vscode_8_auto_5',
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
      id: 'q_vscode_8_auto_6',
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
      id: 'q_vscode_8_auto_7',
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
      id: 'q_vscode_8_auto_8',
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
      id: 'q_vscode_8_auto_9',
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
      id: 'q_vscode_8_auto_10',
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
