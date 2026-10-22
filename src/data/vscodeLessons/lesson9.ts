import { VsCodeLessonDefinition } from '../../types/vscodeLesson';

export const lesson9: VsCodeLessonDefinition = {
  id: 'vs-lesson-9',
  number: 9,
  slug: 'built-in-git-and-source-control',
  title: 'Source Control & Built-in Git Workflow',
  shortDescription:
    'Master VS Code built-in Git integration: Source Control view (Ctrl+Shift+G), gutter diff indicators, side-by-side diffing, and visual 3-way merge conflict resolution.',
  estimatedMinutes: 25,
  learningObjectives: [
    'Navigate the Source Control side bar (Ctrl+Shift+G) and review staged/unstaged changes',
    'Interpret editor gutter indicators: green (added), blue (modified), and red (deleted)',
    'Review side-by-side visual diffs and stage selective line ranges',
    'Resolve Git merge conflicts using the visual 3-Way Merge Editor',
  ],
  prerequisites: ['Lesson 1: VS Code Interface Architecture & Anatomy'],
  sections: [
    {
      id: 'vs9-1',
      title: 'The Source Control View & Gutter Indicators',
      content:
        'VS Code natively includes deep Git integration without requiring any external GUI tools.\n\nKey UI elements:\n- Source Control Panel (Ctrl+Shift+G): Lists all untracked, modified, and staged files. You can stage individual files or lines with a single click.\n- Gutter Indicators: Next to line numbers in the editor, colored bars show line modifications: green indicates newly added lines, blue indicates modified lines, and red triangles indicate deleted lines. Clicking any bar pops up an inline mini-diff with revert and stage buttons.',
      codeExample: {
        title: 'Git Gutter Colors',
        code: `Green bar   # Lines inserted relative to HEAD
Blue bar    # Lines edited relative to HEAD
Red arrow   # Lines deleted relative to HEAD`,
        language: 'plaintext',
        explanation: 'Clicking a gutter indicator lets you stage or roll back individual hunks without touching the command line.',
      },
    },
    {
      id: 'vs9-2',
      title: 'Side-by-Side Diffs and 3-Way Merge Editor',
      content:
        'Clicking any modified file in the Source Control panel opens an interactive side-by-side diff comparing working tree against index or HEAD.\n\nWhen a merge conflict occurs, VS Code highlights conflict blocks and offers instant "Accept Current Change", "Accept Incoming Change", or "Accept Both". Clicking "Resolve in Merge Editor" opens the 3-Way Merge Editor: Current on the left, Incoming on the right, and Resulting code at the bottom.',
      codeExample: {
        title: 'Conflict Markers in VS Code',
        code: `<<<<<<< HEAD (Current Change)
const API_URL = "https://api.v1.ceeras.internal";
=======
const API_URL = "https://api.v2.ceeras.com";
>>>>>>> main (Incoming Change)`,
        language: 'typescript',
        explanation: 'VS Code provides one-click action buttons above these markers to resolve conflicts with zero manual typing.',
      },
    },
  ],
  exercises: [
    {
      id: 'vs9-ex1',
      lessonId: 'vs-lesson-9',
      order: 1,
      title: 'Open Source Control View',
      objective:
        'Switch the Primary Side Bar to the Git Source Control view.',
      initialState: {
        activeSidebar: 'explorer',
      },
      solutionAction: 'workbench.view.scm',
      expectedStateMatch: (state) => state.activeSidebar === 'git',
      hint: 'Click the Source Control icon in the Activity Bar or run "workbench.view.scm".',
      explanation:
        'The Source Control view provides full visibility over staged and unstaged Git files.',
      quickChips: ['workbench.view.scm'],
    },
    {
      id: 'vs9-ex2',
      lessonId: 'vs-lesson-9',
      order: 2,
      title: 'Inspect Current Branch in Status Bar',
      objective:
        'Verify that the active Git branch is set to "main".',
      initialState: {
        activeSidebar: 'git',
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
      solutionAction: 'verify.branch',
      expectedStateMatch: (state) => state.statusInfo.branch === 'main',
      hint: 'Notice the branch name in the bottom left corner of the Status Bar.',
      explanation:
        'Clicking the branch indicator in the Status Bar lets you switch or checkout branches instantly.',
      quickChips: ['workbench.view.scm'],
    },
  ],
  quiz: [
    {
      id: 'q-vs-9-1',
      question: 'What does a blue indicator bar in the VS Code editor gutter (beside line numbers) signify?',
      explanation:
        'A blue bar indicates that those lines have been modified since the last Git commit.',
      difficulty: 'beginner',
      topicTag: 'vscode',
      type: 'multiple-choice',
      options: [
        {
          id: 'opt-a',
          text: 'Lines that have been modified compared to HEAD',
          isCorrect: true,
        },
        {
          id: 'opt-b',
          text: 'Lines containing critical syntax errors',
          isCorrect: false,
        },
        {
          id: 'opt-c',
          text: 'Lines that have been locked from editing',
          isCorrect: false,
        },
        {
          id: 'opt-d',
          text: 'Lines that are currently running on production',
          isCorrect: false,
        },
      ],
    },
    {
      id: 'q-vs-9-2',
      question: 'Which tool does VS Code provide to systematically resolve complex Git merge conflicts with visual previews?',
      explanation:
        'The 3-Way Merge Editor displays Current on the left, Incoming on the right, and the resultant file at the bottom.',
      difficulty: 'intermediate',
      topicTag: 'vscode',
      type: 'multiple-choice',
      options: [
        {
          id: 'opt-a',
          text: 'The 3-Way Merge Editor',
          isCorrect: true,
        },
        {
          id: 'opt-b',
          text: 'The Hex Editor',
          isCorrect: false,
        },
        {
          id: 'opt-c',
          text: 'The Task Runner',
          isCorrect: false,
        },
        {
          id: 'opt-d',
          text: 'The Output Panel',
          isCorrect: false,
        },
      ],
    },
    {
      id: 'q_vscode_9_auto_3',
      question: "What is the primary role of the VS Code features explored in Lesson 9 (Source Control & Built-in Git Workflow)?",
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
      id: 'q_vscode_9_auto_4',
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
      id: 'q_vscode_9_auto_5',
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
      id: 'q_vscode_9_auto_6',
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
      id: 'q_vscode_9_auto_7',
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
      id: 'q_vscode_9_auto_8',
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
      id: 'q_vscode_9_auto_9',
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
      id: 'q_vscode_9_auto_10',
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
