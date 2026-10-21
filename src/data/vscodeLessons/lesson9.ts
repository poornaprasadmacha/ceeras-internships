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
  ],
};
