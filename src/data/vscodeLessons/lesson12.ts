import { VsCodeLessonDefinition } from '../../types/vscodeLesson';

export const lesson12: VsCodeLessonDefinition = {
  id: 'vs-lesson-12',
  number: 12,
  slug: 'remote-development-ssh-wsl-and-containers',
  title: 'Remote Development: SSH, WSL & Dev Containers',
  shortDescription:
    'Develop anywhere with VS Code Remote architecture: Remote - SSH, WSL, Dev Containers (.devcontainer/devcontainer.json), and cloud-hosted environments.',
  estimatedMinutes: 25,
  learningObjectives: [
    'Understand client-server architecture: local UI vs remote VS Code Server backend',
    'Develop seamlessly inside Linux on Windows with the WSL extension',
    'Connect to remote cloud VMs and headless compute instances via Remote - SSH',
    'Configure reproducible Dockerized toolchains using .devcontainer/devcontainer.json',
  ],
  prerequisites: [
    'Lesson 1: VS Code Interface Architecture & Anatomy',
    'Lesson 4: Settings & Workspace Configuration (settings.json)',
  ],
  sections: [
    {
      id: 'vs12-1',
      title: 'The VS Code Client-Server Architecture',
      content:
        'Unlike traditional desktop IDEs, VS Code splits its architecture into two distinct components:\n\n1. VS Code Client (UI): Runs locally on your laptop (Electron), handling keyboard input, window rendering, and editor graphics.\n2. VS Code Server: Runs remotely (inside WSL, a Docker container, an SSH server, or cloud VM). It executes language servers, linters, debuggers, and terminal shells directly where your code lives.\n\nThis architecture eliminates "it works on my machine" issues by allowing you to code against native Linux environments without leaving your local OS.',
      codeExample: {
        title: 'Remote Connection Modes',
        code: `Remote - SSH          # Connects to remote Linux/macOS/Windows servers over SSH
Remote - WSL          # Seamless execution inside Windows Subsystem for Linux
Dev Containers        # Spins up isolated Docker container with all SDKs installed
VS Code for the Web   # Runs client entirely in browser (vscode.dev, GitHub Codespaces)`,
        language: 'plaintext',
        explanation: 'All four modes use identical UI shortcuts and full IntelliSense debugging capabilities.',
      },
    },
    {
      id: 'vs12-2',
      title: 'Dev Containers (.devcontainer/devcontainer.json)',
      content:
        'Dev Containers allow development teams to define their entire runtime environment—including Node.js, Python, PostgreSQL, and VS Code extensions—inside a version-controlled configuration file.\n\nWhen a developer opens the project, VS Code launches Docker, installs dependencies, mounts the repository, and connects the editor automatically.',
      codeExample: {
        title: 'Sample .devcontainer/devcontainer.json',
        code: `{
  "name": "Node.js & TypeScript Container",
  "image": "mcr.microsoft.com/devcontainers/typescript-node:1-20",
  "customizations": {
    "vscode": {
      "extensions": [
        "dbaeumer.vscode-eslint",
        "esbenp.prettier-vscode"
      ],
      "settings": {
        "editor.formatOnSave": true
      }
    }
  },
  "forwardPorts": [3000, 5173],
  "postCreateCommand": "npm install"
}`,
        language: 'json',
        explanation: 'Team members can clone the repo and start working immediately without installing Node or compilers on their host machine.',
      },
    },
  ],
  exercises: [
    {
      id: 'vs12-ex1',
      lessonId: 'vs-lesson-12',
      order: 1,
      title: 'Inspect Package Dependencies',
      objective:
        'Open "package.json" to examine build scripts and dependencies for containerized deployment.',
      initialState: {
        activeFile: 'src/App.tsx',
        openTabs: ['src/App.tsx'],
      },
      solutionAction: 'package.json',
      expectedStateMatch: (state) => state.activeFile === 'package.json',
      hint: 'Click on "package.json" in the file explorer.',
      explanation:
        'package.json defines the dependencies and start scripts executed within the container.',
      quickChips: ['package.json', 'src/App.tsx'],
    },
    {
      id: 'vs12-ex2',
      lessonId: 'vs-lesson-12',
      order: 2,
      title: 'Check Workspace Status Bar Indicators',
      objective:
        'Verify that the workspace status info shows clean diagnostic status and active branch.',
      initialState: {
        activeFile: 'package.json',
        statusInfo: {
          branch: 'main',
          line: 1,
          col: 1,
          errors: 0,
          warnings: 0,
          language: 'JSON',
          spaces: 2,
        },
      },
      solutionAction: 'verify.remote',
      expectedStateMatch: (state) => state.statusInfo.errors === 0 && state.statusInfo.branch === 'main',
      hint: 'Notice the bottom status indicators confirming healthy workspace state.',
      explanation:
        'Remote environments surface live status in the bottom Status Bar just like local projects.',
      quickChips: ['package.json'],
    },
  ],
  quiz: [
    {
      id: 'q-vs-12-1',
      question: 'How does VS Code achieve full IntelliSense, terminal execution, and debugging inside a remote container or SSH server?',
      explanation:
        'VS Code runs a lightweight headless server process on the remote machine while rendering the editor UI locally.',
      difficulty: 'intermediate',
      topicTag: 'vscode',
      type: 'multiple-choice',
      options: [
        {
          id: 'opt-a',
          text: 'It installs a headless VS Code Server on the remote host while running the UI locally',
          isCorrect: true,
        },
        {
          id: 'opt-b',
          text: 'It sends screenshots of the screen over VNC',
          isCorrect: false,
        },
        {
          id: 'opt-c',
          text: 'It converts all code to HTML before transmitting',
          isCorrect: false,
        },
        {
          id: 'opt-d',
          text: 'It only operates when both computers are physically in the same room',
          isCorrect: false,
        },
      ],
    },
    {
      id: 'q-vs-12-2',
      question: 'What is the primary configuration file used to define a Dockerized development container in VS Code?',
      explanation:
        '.devcontainer/devcontainer.json specifies the Docker image, installed extensions, port forwarding, and post-creation commands.',
      difficulty: 'beginner',
      topicTag: 'vscode',
      type: 'multiple-choice',
      options: [
        {
          id: 'opt-a',
          text: '.devcontainer/devcontainer.json',
          isCorrect: true,
        },
        {
          id: 'opt-b',
          text: 'docker-compose.lock',
          isCorrect: false,
        },
        {
          id: 'opt-c',
          text: '.vscode/remote.txt',
          isCorrect: false,
        },
        {
          id: 'opt-d',
          text: 'kubernetes.yaml',
          isCorrect: false,
        },
      ],
    },
    {
      id: 'q_vscode_12_auto_3',
      question: "What is the primary role of the VS Code features explored in Lesson 12 (Remote Development: SSH, WSL & Dev Containers)?",
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
      id: 'q_vscode_12_auto_4',
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
      id: 'q_vscode_12_auto_5',
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
      id: 'q_vscode_12_auto_6',
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
      id: 'q_vscode_12_auto_7',
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
      id: 'q_vscode_12_auto_8',
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
      id: 'q_vscode_12_auto_9',
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
      id: 'q_vscode_12_auto_10',
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
