import { VsCodeLessonDefinition } from '../../types/vscodeLesson';

export const lesson3: VsCodeLessonDefinition = {
  id: 'vs-lesson-3',
  number: 3,
  slug: 'multi-cursor-editing-and-selection-mastery',
  title: 'Multi-Cursor Editing & Selection Mastery',
  shortDescription:
    'Work at 10x speed with simultaneous multi-cursor insertion (Ctrl+Alt+Up/Down), occurrence matching (Ctrl+D), and document formatting.',
  estimatedMinutes: 25,
  learningObjectives: [
    'Place multiple active insertion cursors with Alt+Click or Ctrl+Alt+Up/Down',
    'Select and edit next matching occurrences with Ctrl+D (and skip with Ctrl+K Ctrl+D)',
    'Select all matching occurrences across the file with Ctrl+Shift+L',
    'Execute document formatting with editor.action.formatDocument',
  ],
  prerequisites: ['Lesson 2: Command Palette & Lightning Navigation'],
  sections: [
    {
      id: 'vs3-1',
      title: 'Simultaneous Multi-Cursor Insertion',
      content:
        'Multi-cursor editing allows you to type, delete, and copy text across multiple lines simultaneously.\n\nWays to spawn multi-cursors:\n- Alt + Click: Adds a new insertion cursor at any clicked location.\n- Ctrl + Alt + Up / Down: Extends a vertical column of cursors above or below the current line.\n- Ctrl + D: Selects the current word, then hitting Ctrl+D again adds the next matching word occurrence to your active selections.\n- Ctrl + Shift + L: Instantly selects all occurrences of the highlighted text across the entire file.',
      codeExample: {
        title: 'Multi-Cursor Shortcuts',
        code: `Ctrl + D               # Select next matching word
Ctrl + K, Ctrl + D     # Skip current match and move to next
Ctrl + Shift + L       # Select all matching occurrences in file
Shift + Alt + I        # Insert cursor at end of each selected line
Shift + Alt + Drag     # Column (box) selection mode`,
        language: 'plaintext',
        explanation: 'Multi-cursor transformations turn repetitive manual changes into single simultaneous keystrokes.',
      },
    },
    {
      id: 'vs3-2',
      title: 'Automatic Document Formatting',
      content:
        'VS Code integrates formatting engines (like Prettier or language-specific formatters). Pressing Shift+Alt+F (or running `editor.action.formatDocument`) cleans up spacing, indentations, semicolons, and quotes according to your workspace formatting rules.',
      codeExample: {
        title: 'Formatting Command',
        code: `Shift + Alt + F        # Format Document
Ctrl + K, Ctrl + F     # Format Selection only`,
        language: 'bash',
        explanation: 'Enabling "editor.formatOnSave": true in settings automates this on every file save.',
      },
    },
  ],
  exercises: [
    {
      id: 'vs3-ex1',
      lessonId: 'vs-lesson-3',
      order: 1,
      title: 'Open math.ts for Refactoring',
      objective:
        'Open "src/utils/math.ts" to prepare for multi-cursor editing.',
      initialState: {
        activeFile: 'src/App.tsx',
        openTabs: ['src/App.tsx'],
      },
      solutionAction: 'workbench.action.openMathTs',
      expectedStateMatch: (state) => state.activeFile === 'src/utils/math.ts',
      hint: 'Click on "src/utils/math.ts" in the file explorer.',
      explanation:
        'Opening target modules lets you inspect and edit function exports directly.',
      quickChips: ['src/utils/math.ts'],
    },
    {
      id: 'vs3-ex2',
      lessonId: 'vs-lesson-3',
      order: 2,
      title: 'Trigger Document Formatting',
      objective:
        'Run the format document command "editor.action.formatDocument" to format the active file.',
      initialState: {
        activeFile: 'src/utils/math.ts',
        openTabs: ['src/utils/math.ts'],
      },
      solutionAction: 'editor.action.formatDocument',
      expectedStateMatch: (state) => state.terminalOutput.includes('Formatted document') || state.statusInfo.errors === 0,
      hint: 'Run "editor.action.formatDocument" from the quick chips or command runner.',
      explanation:
        'Document formatting enforces clean, standardized indentation and line breaks across your codebase.',
      quickChips: ['editor.action.formatDocument'],
    },
  ],
  quiz: [
    {
      id: 'q-vs-3-1',
      question: 'Which key shortcut selects the next matching occurrence of the current word in VS Code?',
      explanation:
        'Ctrl+D highlights the next occurrence and places an additional cursor on it.',
      difficulty: 'beginner',
      topicTag: 'vscode',
      type: 'multiple-choice',
      options: [
        {
          id: 'opt-a',
          text: 'Ctrl + D (or Cmd + D on macOS)',
          isCorrect: true,
        },
        {
          id: 'opt-b',
          text: 'Ctrl + Shift + F',
          isCorrect: false,
        },
        {
          id: 'opt-c',
          text: 'Alt + F4',
          isCorrect: false,
        },
        {
          id: 'opt-d',
          text: 'Ctrl + R',
          isCorrect: false,
        },
      ],
    },
    {
      id: 'q-vs-3-2',
      question: 'How can you place cursors at the ends of every line across an entire highlighted block of text?',
      explanation:
        'Shift+Alt+I places a cursor at the end of each line within the currently selected text range.',
      difficulty: 'intermediate',
      topicTag: 'vscode',
      type: 'multiple-choice',
      options: [
        {
          id: 'opt-a',
          text: 'Shift + Alt + I',
          isCorrect: true,
        },
        {
          id: 'opt-b',
          text: 'Ctrl + Shift + P',
          isCorrect: false,
        },
        {
          id: 'opt-c',
          text: 'Ctrl + Alt + Down',
          isCorrect: false,
        },
        {
          id: 'opt-d',
          text: 'Ctrl + Tab',
          isCorrect: false,
        },
      ],
    },
  ],
};
