import { VsCodeLessonDefinition } from '../../types/vscodeLesson';

export const lesson10: VsCodeLessonDefinition = {
  id: 'vs-lesson-10',
  number: 10,
  slug: 'debugging-and-launch-configurations',
  title: 'Debugging & Launch Configurations (launch.json)',
  shortDescription:
    'Master interactive debugging: Run & Debug view (Ctrl+Shift+D), Breakpoints, Watch expressions, Call Stack, and .vscode/launch.json.',
  estimatedMinutes: 25,
  learningObjectives: [
    'Navigate the Run & Debug view (Ctrl+Shift+D) and control execution with the Debug toolbar',
    'Set standard breakpoints, conditional breakpoints, and logpoints',
    'Inspect Variables, evaluate Watch expressions, and analyze the Call Stack',
    'Create and configure launch targets in .vscode/launch.json for Node.js, Python, or Web browsers',
  ],
  prerequisites: ['Lesson 1: VS Code Interface Architecture & Anatomy'],
  sections: [
    {
      id: 'vs10-1',
      title: 'The Debugging Toolbar & Stepping Commands',
      content:
        'VS Code features an industrial-grade debugger with full runtime inspection capabilities.\n\nKey stepping controls:\n- Continue / Pause (F5): Resumes execution until the next breakpoint.\n- Step Over (F10): Executes the current line of code and stops on the next line without entering function calls.\n- Step Into (F11): Steps directly inside the function call on the current line.\n- Step Out (Shift+F11): Completes execution of the current function and returns to the caller.\n- Restart (Ctrl+Shift+F5): Restarts the debugging session with fresh memory state.\n- Stop (Shift+F5): Terminates the active debug process.',
      codeExample: {
        title: 'Types of Breakpoints in VS Code',
        code: `Standard Breakpoint: Click editor gutter (red dot)
Conditional Breakpoint: Right-click gutter -> "Expression" (e.g. counter > 100)
Hit Count Breakpoint: Breaks only after being triggered N times
Logpoint: Logs a message to Debug Console without pausing execution`,
        language: 'plaintext',
        explanation: 'Logpoints allow non-invasive production debugging without cluttering your code with temporary console.log statements.',
      },
    },
    {
      id: 'vs10-2',
      title: 'Configuring .vscode/launch.json',
      content:
        'VS Code reads debug targets from `.vscode/launch.json`. You can define configurations to launch local processes, attach to running containers, or launch headless browsers with sourcemap support.',
      codeExample: {
        title: 'Sample .vscode/launch.json',
        code: `{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Launch Program",
      "skipFiles": ["<node_internals>/**"],
      "program": "\${workspaceFolder}/src/index.ts",
      "preLaunchTask": "npm: build"
    }
  ]
}`,
        language: 'json',
        explanation: 'The \${workspaceFolder} variable resolves to the absolute root directory of your project at runtime.',
      },
    },
  ],
  exercises: [
    {
      id: 'vs10-ex1',
      lessonId: 'vs-lesson-10',
      order: 1,
      title: 'Open .vscode/launch.json',
      objective:
        'Open ".vscode/launch.json" to examine debugging targets.',
      initialState: {
        activeFile: 'src/App.tsx',
        openTabs: ['src/App.tsx'],
      },
      solutionAction: '.vscode/launch.json',
      expectedStateMatch: (state) => state.activeFile === '.vscode/launch.json',
      hint: 'Click on ".vscode/launch.json" in the file explorer.',
      explanation:
        'launch.json contains configurations for debug run targets.',
      quickChips: ['.vscode/launch.json'],
    },
    {
      id: 'vs10-ex2',
      lessonId: 'vs-lesson-10',
      order: 2,
      title: 'Open Run and Debug Panel',
      objective:
        'Switch the Primary Side Bar to the Run and Debug view.',
      initialState: {
        activeSidebar: 'explorer',
      },
      solutionAction: 'workbench.view.debug',
      expectedStateMatch: (state) => state.activeSidebar === 'debug',
      hint: 'Click the Run & Debug icon in the Activity Bar or run "workbench.view.debug".',
      explanation:
        'The Debug panel exposes Variables, Watch expressions, Call Stack, and active Breakpoints.',
      quickChips: ['workbench.view.debug'],
    },
  ],
  quiz: [
    {
      id: 'q-vs-10-1',
      question: 'What is a "Logpoint" in VS Code, and why is it useful?',
      explanation:
        'A Logpoint outputs messages to the Debug Console without interrupting process execution or leaving temporary console.log calls in source code.',
      difficulty: 'intermediate',
      topicTag: 'vscode',
      type: 'multiple-choice',
      options: [
        {
          id: 'opt-a',
          text: 'It logs output to the Debug Console without pausing execution or modifying source code',
          isCorrect: true,
        },
        {
          id: 'opt-b',
          text: 'It deletes all log files on disk',
          isCorrect: false,
        },
        {
          id: 'opt-c',
          text: 'It locks the computer when a specific line is hit',
          isCorrect: false,
        },
        {
          id: 'opt-d',
          text: 'It encrypts the active file',
          isCorrect: false,
        },
      ],
    },
    {
      id: 'q-vs-10-2',
      question: 'Which key shortcut steps inside the highlighted function invocation during a debug pause?',
      explanation:
        'F11 is Step Into, which steps inside the called function.',
      difficulty: 'beginner',
      topicTag: 'vscode',
      type: 'multiple-choice',
      options: [
        {
          id: 'opt-a',
          text: 'F11 (Step Into)',
          isCorrect: true,
        },
        {
          id: 'opt-b',
          text: 'F10 (Step Over)',
          isCorrect: false,
        },
        {
          id: 'opt-c',
          text: 'Shift + F11 (Step Out)',
          isCorrect: false,
        },
        {
          id: 'opt-d',
          text: 'Ctrl + F4',
          isCorrect: false,
        },
      ],
    },
    {
      id: 'q_vscode_10_auto_3',
      question: "What is the primary role of the VS Code features explored in Lesson 10 (Debugging & Launch Configurations (launch.json))?",
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
      id: 'q_vscode_10_auto_4',
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
      id: 'q_vscode_10_auto_5',
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
      id: 'q_vscode_10_auto_6',
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
      id: 'q_vscode_10_auto_7',
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
      id: 'q_vscode_10_auto_8',
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
      id: 'q_vscode_10_auto_9',
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
      id: 'q_vscode_10_auto_10',
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
