import { VsCodeLessonDefinition } from '../../types/vscodeLesson';

export const lesson11: VsCodeLessonDefinition = {
  id: 'vs-lesson-11',
  number: 11,
  slug: 'user-snippets-and-code-generation',
  title: 'Custom Code Snippets & Productivity Tools',
  shortDescription:
    'Build reusable custom snippets in JSON format with tabstops ($1, $2), placeholders (${1:default}), choice lists, and built-in variables.',
  estimatedMinutes: 20,
  learningObjectives: [
    'Create and manage language-specific and global snippets via User Snippets editor',
    'Structure snippet JSON with prefix, body array, and description',
    'Incorporate tabstops ($1, $2, $0) and default placeholders (${1:name})',
    'Use built-in variables like $TM_FILENAME, $CURRENT_YEAR, and $CLIPBOARD',
  ],
  prerequisites: ['Lesson 1: VS Code Interface Architecture & Anatomy'],
  sections: [
    {
      id: 'vs11-1',
      title: 'Snippet Anatomy and JSON Structure',
      content:
        'Custom code snippets eliminate boilerplate coding. You can create snippets per language (e.g. `typescript.json`) or globally (`.code-snippets` file in `.vscode/`).\n\nA snippet object defines:\n- "prefix": The trigger text typed into the editor.\n- "body": An array of strings representing output lines.\n- "description": Helpful explanation shown in the IntelliSense popup.\n- "scope": Optional comma-separated language identifiers.',
      codeExample: {
        title: 'Sample Snippet Definition',
        code: `{
  "React Functional Component": {
    "prefix": "rfc",
    "body": [
      "import React from 'react';",
      "",
      "export interface \${1:ComponentName}Props {",
      "  \${2:title}: string;",
      "}",
      "",
      "export const \${1:ComponentName}: React.FC<\${1:ComponentName}Props> = ({ \${2:title} }) => {",
      "  return (",
      "    <div className=\"\${3:p-4}\">",
      "      <h1>{\${2:title}}</h1>",
      "      $0",
      "    </div>",
      "  );",
      "};"
    ],
    "description": "Scaffold a typed React Functional Component"
  }
}`,
        language: 'json',
        explanation: 'Typing "rfc" and pressing Tab expands this entire component template.',
      },
    },
    {
      id: 'vs11-2',
      title: 'Tabstops, Placeholders, and System Variables',
      content:
        'Tabstops determine cursor focus as you cycle through the inserted snippet using Tab:\n- `$1, $2`: Sequential cursor stops.\n- `${1:default}`: A placeholder with default fallback text.\n- `${1|get,post,put,delete|}`: A dropdown choice list.\n- `$0`: The final resting position of the cursor when leaving snippet mode.\n\nVS Code also provides dynamic variables like `$TM_FILENAME_BASE` (file name without extension) and `$CURRENT_YEAR`.',
      codeExample: {
        title: 'Built-in Snippet Variables',
        code: `// Copyright $CURRENT_YEAR Ceeras Inc.
// File: $TM_FILENAME
export const $TM_FILENAME_BASE = () => { $0 };`,
        language: 'typescript',
        explanation: 'Dynamic variables automatically adapt the snippet output to the target file context.',
      },
    },
  ],
  exercises: [
    {
      id: 'vs11-ex1',
      lessonId: 'vs-lesson-11',
      order: 1,
      title: 'Open math.ts for Snippet Usage',
      objective:
        'Open "src/utils/math.ts" to inspect how helper functions and snippets are structured.',
      initialState: {
        activeFile: 'src/App.tsx',
        openTabs: ['src/App.tsx'],
      },
      solutionAction: 'src/utils/math.ts',
      expectedStateMatch: (state) => state.activeFile === 'src/utils/math.ts',
      hint: 'Click on "src/utils/math.ts" in the file explorer.',
      explanation:
        'Testing snippets inside helper modules verifies IntelliSense suggestion integration.',
      quickChips: ['src/utils/math.ts'],
    },
    {
      id: 'vs11-ex2',
      lessonId: 'vs-lesson-11',
      order: 2,
      title: 'Format Code with Prettier',
      objective:
        'Trigger the format document action to clean up snippet indentation.',
      initialState: {
        activeFile: 'src/utils/math.ts',
        openTabs: ['src/utils/math.ts'],
      },
      solutionAction: 'editor.action.formatDocument',
      expectedStateMatch: (state) => state.terminalOutput.includes('Formatted document') || state.statusInfo.errors === 0,
      hint: 'Run "editor.action.formatDocument".',
      explanation:
        'Formatting cleans up snippet expansions to conform strictly to project styling.',
      quickChips: ['editor.action.formatDocument'],
    },
  ],
  quiz: [
    {
      id: 'q-vs-11-1',
      question: 'In a VS Code snippet body, what does the special token "$0" represent?',
      explanation:
        '$0 marks the final cursor position when the user finishes cycling through all tabstops.',
      difficulty: 'intermediate',
      topicTag: 'vscode',
      type: 'multiple-choice',
      options: [
        {
          id: 'opt-a',
          text: 'The final resting position of the cursor after cycling all tabstops',
          isCorrect: true,
        },
        {
          id: 'opt-b',
          text: 'The first placeholder in the snippet',
          isCorrect: false,
        },
        {
          id: 'opt-c',
          text: 'An instruction to delete the file',
          isCorrect: false,
        },
        {
          id: 'opt-d',
          text: 'A variable holding the current price',
          isCorrect: false,
        },
      ],
    },
    {
      id: 'q-vs-11-2',
      question: 'Which syntax creates a placeholder with a fixed dropdown list of selectable choices in a snippet?',
      explanation:
        '${1|apple,banana,orange|} provides a choice list for tabstop 1.',
      difficulty: 'advanced',
      topicTag: 'vscode',
      type: 'multiple-choice',
      options: [
        {
          id: 'opt-a',
          text: '${1|optionA,optionB,optionC|}',
          isCorrect: true,
        },
        {
          id: 'opt-b',
          text: '[[1: optionA || optionB]]',
          isCorrect: false,
        },
        {
          id: 'opt-c',
          text: '$CHOICE(optionA, optionB)',
          isCorrect: false,
        },
        {
          id: 'opt-d',
          text: '<?php select(1) ?>',
          isCorrect: false,
        },
      ],
    },
  ],
};
