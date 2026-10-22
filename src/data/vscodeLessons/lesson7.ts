import { VsCodeLessonDefinition } from '../../types/vscodeLesson';

export const lesson7: VsCodeLessonDefinition = {
  id: 'vs-lesson-7',
  number: 7,
  slug: 'integrated-terminal-and-task-automation',
  title: 'Integrated Terminal & Task Automation (tasks.json)',
  shortDescription:
    'Master split terminals, shell profiles (Bash, PowerShell, zsh), background execution, and automated build tasks via .vscode/tasks.json.',
  estimatedMinutes: 25,
  learningObjectives: [
    'Create, split, and switch between multiple integrated terminal sessions (Ctrl+`)',
    'Configure default terminal shell profiles (PowerShell, Git Bash, WSL, zsh)',
    'Define automated build and test tasks in .vscode/tasks.json',
    'Execute default build tasks with Ctrl+Shift+B and parse error output via problem matchers',
  ],
  prerequisites: ['Lesson 1: VS Code Interface Architecture & Anatomy'],
  sections: [
    {
      id: 'vs7-1',
      title: 'The Integrated Terminal Architecture',
      content:
        'VS Code includes a full hardware-accelerated terminal right inside the bottom panel (or side panel).\n\nKey capabilities:\n- Split Terminals: Click the split icon or press Ctrl+Shift+5 to run processes side by side (e.g. frontend dev server on the left, backend API on the right).\n- Terminal Tabs: Multiple named terminal instances run simultaneously in the background.\n- Shell switching: Instantly toggle between PowerShell, Command Prompt, WSL Bash, or Git Bash from the dropdown.',
      codeExample: {
        title: 'Terminal Keystrokes',
        code: `Ctrl + \`              # Toggle terminal panel
Ctrl + Shift + \`      # Create new terminal session
Ctrl + Shift + 5      # Split current terminal pane
Alt + Left / Right    # Switch between terminal tabs`,
        language: 'plaintext',
        explanation: 'Terminal instances persist even when hidden, allowing long-running watch processes to continue.',
      },
    },
    {
      id: 'vs7-2',
      title: 'Automating Workflows with .vscode/tasks.json',
      content:
        'Instead of typing long repetitive terminal commands, define automated tasks in `.vscode/tasks.json`. Mark a task as a `build` group to trigger it directly using Ctrl+Shift+B.',
      codeExample: {
        title: 'Sample .vscode/tasks.json',
        code: `{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "Build Application",
      "type": "shell",
      "command": "npm run build",
      "group": {
        "kind": "build",
        "isDefault": true
      },
      "problemMatcher": ["$tsc"]
    }
  ]
}`,
        language: 'json',
        explanation: 'The problemMatcher property instructs VS Code to capture compiler errors and display them in the Problems panel.',
      },
    },
  ],
  exercises: [
    {
      id: 'vs7-ex1',
      lessonId: 'vs-lesson-7',
      order: 1,
      title: 'Open .vscode/tasks.json',
      objective:
        'Open ".vscode/tasks.json" to inspect workspace automation tasks.',
      initialState: {
        activeFile: 'src/App.tsx',
        openTabs: ['src/App.tsx'],
      },
      solutionAction: '.vscode/tasks.json',
      expectedStateMatch: (state) => state.activeFile === '.vscode/tasks.json',
      hint: 'Click on ".vscode/tasks.json" in the file explorer.',
      explanation:
        'tasks.json defines reusable scripts and project commands.',
      quickChips: ['.vscode/tasks.json'],
    },
    {
      id: 'vs7-ex2',
      lessonId: 'vs-lesson-7',
      order: 2,
      title: 'Run Terminal Command',
      objective:
        'Execute a command in the integrated terminal to simulate a build execution.',
      initialState: {
        terminalOutput: '',
      },
      solutionAction: 'npm run build',
      expectedStateMatch: (state) => state.terminalOutput.length > 0,
      hint: 'Run "npm run build" in the terminal.',
      explanation:
        'Running tasks directly in the integrated terminal maintains context and workflow velocity.',
      quickChips: ['npm run build', 'npm test'],
    },
  ],
  quiz: [
    {
      id: 'q-vs-7-1',
      question: 'Which key combination triggers the default configured build task defined in .vscode/tasks.json?',
      explanation:
        'Ctrl+Shift+B (Cmd+Shift+B on macOS) runs the default build task configured with "kind": "build", "isDefault": true.',
      difficulty: 'beginner',
      topicTag: 'vscode',
      type: 'multiple-choice',
      options: [
        {
          id: 'opt-a',
          text: 'Ctrl + Shift + B (or Cmd + Shift + B on macOS)',
          isCorrect: true,
        },
        {
          id: 'opt-b',
          text: 'F5',
          isCorrect: false,
        },
        {
          id: 'opt-c',
          text: 'Ctrl + P',
          isCorrect: false,
        },
        {
          id: 'opt-d',
          text: 'Ctrl + Alt + Del',
          isCorrect: false,
        },
      ],
    },
    {
      id: 'q-vs-7-2',
      question: 'What is the function of the "problemMatcher" property in a VS Code task definition?',
      explanation:
        'It scans the command output for errors and warnings and surfaces them directly in the Problems view and editor gutters.',
      difficulty: 'intermediate',
      topicTag: 'vscode',
      type: 'multiple-choice',
      options: [
        {
          id: 'opt-a',
          text: 'Parses terminal compiler output to display file line errors in the Problems panel',
          isCorrect: true,
        },
        {
          id: 'opt-b',
          text: 'Automatically fixes all spelling errors in code',
          isCorrect: false,
        },
        {
          id: 'opt-c',
          text: 'Prevents the command from running if errors exist',
          isCorrect: false,
        },
        {
          id: 'opt-d',
          text: 'Emails error logs to project administrators',
          isCorrect: false,
        },
      ],
    },
    {
      id: 'q_vscode_7_auto_3',
      question: "What is the primary role of the VS Code features explored in Lesson 7 (Integrated Terminal & Task Automation (tasks.json))?",
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
      id: 'q_vscode_7_auto_4',
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
      id: 'q_vscode_7_auto_5',
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
      id: 'q_vscode_7_auto_6',
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
      id: 'q_vscode_7_auto_7',
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
      id: 'q_vscode_7_auto_8',
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
      id: 'q_vscode_7_auto_9',
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
      id: 'q_vscode_7_auto_10',
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
