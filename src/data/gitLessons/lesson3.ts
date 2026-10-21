import { GitLessonDefinition } from '../../types/gitLesson';

export const lesson3: GitLessonDefinition = {
  id: 'git-lesson-3',
  number: 3,
  slug: 'inspecting-history-and-tracking-changes',
  title: 'Inspecting History & Tracking Diffs',
  shortDescription:
    'Review chronological commit logs with git log and inspect line-by-line differences with git diff and git diff --staged.',
  estimatedMinutes: 25,
  learningObjectives: [
    'Explore commit history using git log and compact git log --oneline',
    'Inspect unstaged modifications in the working tree using git diff',
    'Examine staged changes prepared for commit using git diff --staged',
    'Interpret unified diff notation (+ additions, - deletions)',
  ],
  prerequisites: ['Lesson 2: Initializing Repositories & Staging'],
  sections: [
    {
      id: 'g3-1',
      title: 'Reviewing Commit History with git log',
      content:
        'The commit log is the definitive audit trail of a project.\n- git log: Displays detailed commit author, date, full SHA-1 hash, and commit message.\n- git log --oneline: Compresses each commit to a single line showing short SHA and summary title.\n\nReading compact oneline logs allows developers to quickly identify when specific features or bug fixes were introduced.',
      codeExample: {
        command: `git log --oneline`,
        explanation: 'git log --oneline presents a concise top-down history of commits on the active branch.',
      },
    },
    {
      id: 'g3-2',
      title: 'Comparing Code Diffs: git diff',
      content:
        'Before committing code, reviewing line-by-line diffs prevents accidental debug statements from leaking into production:\n1. git diff: Compares your working directory with the staging area (shows unstaged edits).\n2. git diff --staged (or --cached): Compares staged changes with the last commit (HEAD).\n\nUnified diff format shows deleted lines prefixed with "-" and added lines prefixed with "+".',
      codeExample: {
        command: `echo "Updated content" > README.md
git diff`,
        explanation: 'git diff highlights exact file line changes before staging.',
      },
    },
  ],
  exercises: [
    {
      id: 'g3-ex1',
      lessonId: 'git-lesson-3',
      order: 1,
      title: 'Review Compact Commit History',
      objective:
        'Run "git log --oneline" to inspect the repository history in compact single-line format.',
      initialCommands: [],
      solutionCommands: ['git log --oneline'],
      expectedOutputSubstring: 'Initial project setup',
      expectedBranch: 'main',
      hint: 'Type `git log --oneline` and press Enter.',
      explanation:
        'The oneline view is the most common way engineers scan commit histories on active development branches.',
      quickChips: ['git log --oneline', 'git log', 'git status'],
    },
    {
      id: 'g3-ex2',
      lessonId: 'git-lesson-3',
      order: 2,
      title: 'Inspect Working Directory Diff',
      objective:
        'Modify README.md by running `echo "# Ceeras Project v2" > README.md`, then run `git diff` to view the unstaged changes.',
      initialCommands: [],
      solutionCommands: ['echo "# Ceeras Project v2" > README.md', 'git diff'],
      expectedOutputSubstring: 'diff --git a/README.md b/README.md',
      expectedBranch: 'main',
      hint: 'Run `echo "# Ceeras Project v2" > README.md` and then `git diff`.',
      explanation:
        'git diff compares your current working file against the index/HEAD snapshot.',
      quickChips: [
        'echo "# Ceeras Project v2" > README.md',
        'git diff',
        'git status',
      ],
    },
  ],
  quiz: [
    {
      id: 'q-git-3-1',
      question: 'What does "git diff" without flags display?',
      explanation: 'git diff compares unstaged modifications in the working tree against the staging index.',
      difficulty: 'beginner',
      topicTag: 'git',
      type: 'multiple-choice',
      options: [
        {
          id: 'opt-a',
          text: 'Changes between the working directory and the staging area (unstaged edits)',
          isCorrect: true,
        },
        {
          id: 'opt-b',
          text: 'Changes that have already been pushed to GitHub',
          isCorrect: false,
        },
        {
          id: 'opt-c',
          text: 'Differences between your computer clock and server time',
          isCorrect: false,
        },
        {
          id: 'opt-d',
          text: 'List of all deleted branches',
          isCorrect: false,
        },
      ],
    },
    {
      id: 'q-git-3-2',
      question: 'Which command shows differences for changes that have already been staged with git add?',
      explanation: 'git diff --staged (or --cached) inspects differences staged in the index against HEAD.',
      difficulty: 'beginner',
      topicTag: 'git',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'git diff --staged', isCorrect: true },
        { id: 'opt-b', text: 'git diff --unstaged', isCorrect: false },
        { id: 'opt-c', text: 'git diff --all', isCorrect: false },
        { id: 'opt-d', text: 'git show --diff-only', isCorrect: false },
      ],
    },
    {
      id: 'q-git-3-3',
      question: 'What flag formats git log into single-line summaries showing short hashes and messages?',
      explanation: 'The --oneline flag formats commit history concisely.',
      difficulty: 'beginner',
      topicTag: 'git',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: '--oneline', isCorrect: true },
        { id: 'opt-b', text: '--compact', isCorrect: false },
        { id: 'opt-c', text: '--short-only', isCorrect: false },
        { id: 'opt-d', text: '-1', isCorrect: false },
      ],
    },
  ],
};
