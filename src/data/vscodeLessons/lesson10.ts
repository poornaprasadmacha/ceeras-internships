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
  ],
};
