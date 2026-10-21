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
  ],
};
