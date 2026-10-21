import { VsCodeIdeState } from '../types/vscodeLesson';

export const DEFAULT_VSCODE_FILES: Record<string, string> = {
  'src/index.ts': `import { calculateMetrics } from './utils/math';

console.log("Starting Ceeras App...");
const metrics = calculateMetrics([10, 20, 30, 40]);
console.log("Calculated metrics:", metrics);
`,
  'src/App.tsx': `import React from 'react';

export function App() {
  return (
    <div className="container">
      <h1>Welcome to Visual Studio Code Mastery</h1>
      <p>Configure shortcuts, debuggers, and extensions.</p>
    </div>
  );
}
`,
  'src/utils/math.ts': `export function calculateMetrics(nums: number[]): { sum: number; avg: number } {
  const sum = nums.reduce((a, b) => a + b, 0);
  const avg = nums.length > 0 ? sum / nums.length : 0;
  return { sum, avg };
}
`,
  'package.json': `{
  "name": "ceeras-vscode-project",
  "version": "1.0.0",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "lint": "eslint src"
  },
  "dependencies": {
    "react": "^19.0.0"
  }
}
`,
  '.vscode/settings.json': `{
  "editor.tabSize": 2,
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "files.autoSave": "onFocusChange",
  "workbench.colorTheme": "Default Dark Modern"
}
`,
  '.vscode/launch.json': `{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Debug Current File",
      "program": "\${file}",
      "skipFiles": ["<node_internals>/**"]
    }
  ]
}
`,
  '.vscode/tasks.json': `{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "npm: build",
      "type": "npm",
      "script": "build",
      "group": {
        "kind": "build",
        "isDefault": true
      }
    }
  ]
}
`,
};

export class VsCodeEngine {
  files: Record<string, string>;
  openTabs: string[];
  activeFile: string;
  activeSidebar: 'explorer' | 'search' | 'git' | 'debug' | 'extensions' | 'settings';
  terminalOutput: string;
  terminalOpen: boolean;
  commandPaletteOpen: boolean;
  statusInfo: {
    branch: string;
    line: number;
    col: number;
    errors: number;
    warnings: number;
    language: string;
    spaces: number;
  };

  constructor(initialState?: Partial<VsCodeIdeState>) {
    this.files = { ...DEFAULT_VSCODE_FILES, ...(initialState?.files || {}) };
    this.openTabs = initialState?.openTabs || ['src/index.ts', 'src/App.tsx'];
    this.activeFile = initialState?.activeFile || 'src/index.ts';
    this.activeSidebar = initialState?.activeSidebar || 'explorer';
    this.terminalOutput =
      initialState?.terminalOutput ||
      'node v20.11.0\nceeras@dev-box:~/project$ npm run dev\n[vite] ready in 142ms at http://localhost:5173/\n';
    this.terminalOpen = true;
    this.commandPaletteOpen = initialState?.commandPaletteOpen || false;
    this.statusInfo = {
      branch: 'main',
      line: 1,
      col: 1,
      errors: 0,
      warnings: 0,
      language: this.inferLanguage(this.activeFile),
      spaces: 2,
      ...(initialState?.statusInfo || {}),
    };
  }

  private inferLanguage(path: string): string {
    if (path.endsWith('.ts')) return 'TypeScript';
    if (path.endsWith('.tsx')) return 'TypeScript JSX';
    if (path.endsWith('.js')) return 'JavaScript';
    if (path.endsWith('.json')) return 'JSON';
    if (path.endsWith('.html')) return 'HTML';
    if (path.endsWith('.css')) return 'CSS';
    if (path.endsWith('.py')) return 'Python';
    if (path.endsWith('.md')) return 'Markdown';
    return 'Plain Text';
  }

  openFile(path: string): void {
    if (this.files[path] === undefined) {
      this.files[path] = '';
    }
    if (!this.openTabs.includes(path)) {
      this.openTabs.push(path);
    }
    this.activeFile = path;
    this.statusInfo.language = this.inferLanguage(path);
  }

  closeTab(path: string): void {
    this.openTabs = this.openTabs.filter((t) => t !== path);
    if (this.activeFile === path) {
      this.activeFile = this.openTabs.length > 0 ? this.openTabs[this.openTabs.length - 1] : '';
      if (this.activeFile) {
        this.statusInfo.language = this.inferLanguage(this.activeFile);
      }
    }
  }

  updateContent(path: string, content: string): void {
    this.files[path] = content;
  }

  switchSidebar(sidebar: 'explorer' | 'search' | 'git' | 'debug' | 'extensions' | 'settings'): void {
    this.activeSidebar = sidebar;
  }

  toggleTerminal(): void {
    this.terminalOpen = !this.terminalOpen;
  }

  toggleCommandPalette(force?: boolean): void {
    this.commandPaletteOpen = force !== undefined ? force : !this.commandPaletteOpen;
  }

  formatDocument(): void {
    const content = this.files[this.activeFile] || '';
    if (this.activeFile.endsWith('.json')) {
      try {
        const parsed = JSON.parse(content);
        this.files[this.activeFile] = JSON.stringify(parsed, null, 2);
      } catch {}
    } else {
      // Basic indentation format
      const lines = content.split('\n').map((l) => l.trimEnd());
      this.files[this.activeFile] = lines.join('\n');
    }
  }

  runCommand(commandId: string): string {
    switch (commandId) {
      case 'workbench.action.terminal.toggleTerminal':
        this.toggleTerminal();
        return 'Toggled Integrated Terminal';
      case 'workbench.view.explorer':
        this.switchSidebar('explorer');
        return 'Opened File Explorer';
      case 'workbench.view.search':
        this.switchSidebar('search');
        return 'Opened Global Search';
      case 'workbench.view.scm':
        this.switchSidebar('git');
        return 'Opened Source Control';
      case 'workbench.view.debug':
        this.switchSidebar('debug');
        return 'Opened Run & Debug';
      case 'workbench.view.extensions':
        this.switchSidebar('extensions');
        return 'Opened Extension Marketplace';
      case 'editor.action.formatDocument':
        this.formatDocument();
        return 'Formatted Document with Prettier';
      case 'workbench.action.quickOpen':
        this.toggleCommandPalette(true);
        return 'Opened Quick Open Palette';
      default:
        return `Executed command: ${commandId}`;
    }
  }

  getState(): VsCodeIdeState {
    return {
      files: { ...this.files },
      openTabs: [...this.openTabs],
      activeFile: this.activeFile,
      activeSidebar: this.activeSidebar,
      terminalOutput: this.terminalOutput,
      statusInfo: { ...this.statusInfo },
      commandPaletteOpen: this.commandPaletteOpen,
    };
  }
}
