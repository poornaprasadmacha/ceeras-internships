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
  ],
};
