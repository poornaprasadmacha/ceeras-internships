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
    {
      id: 'q_git_3_auto_4',
      question: "What is the fundamental architecture of Git as taught in Lesson 3 (Inspecting History & Tracking Diffs)?",
      explanation: "Git models project history as a DAG of cryptographic SHA-1/SHA-256 commit snapshots with distributed repositories.",
      difficulty: 'intermediate',
      topicTag: 'git',
      type: 'multiple-choice',
      options: [
        { id: 'opt_1', text: "A distributed version control system where the complete history is stored as a Directed Acyclic Graph (DAG) of immutable snapshots", isCorrect: true },
        { id: 'opt_2', text: "A centralized SQL database hosted on a single server", isCorrect: false },
        { id: 'opt_3', text: "A backup cloud drive like Dropbox", isCorrect: false },
        { id: 'opt_4', text: "A tool that only runs in web browsers", isCorrect: false },
      ],
    },
    {
      id: 'q_git_3_auto_5',
      question: "What are the three core tree states of a local Git working repository?",
      explanation: "Files transition from modified in the Working Directory to staged in the Index, and finally committed into the Git Directory.",
      difficulty: 'intermediate',
      topicTag: 'git',
      type: 'multiple-choice',
      options: [
        { id: 'opt_1', text: "The Working Directory, the Staging Area (Index), and the Git Repository (.git directory / HEAD)", isCorrect: true },
        { id: 'opt_2', text: "The CPU cache, RAM, and Disk storage", isCorrect: false },
        { id: 'opt_3', text: "The Local branch, Remote branch, and Tag", isCorrect: false },
        { id: 'opt_4', text: "Development, Staging, and Production", isCorrect: false },
      ],
    },
    {
      id: 'q_git_3_auto_6',
      question: "What command moves file modifications from the Working Directory into the Staging Area?",
      explanation: "git add stages changes in the index, preparing them to be packaged in the next commit snapshot.",
      difficulty: 'intermediate',
      topicTag: 'git',
      type: 'multiple-choice',
      options: [
        { id: 'opt_1', text: "git add <file>", isCorrect: true },
        { id: 'opt_2', text: "git commit <file>", isCorrect: false },
        { id: 'opt_3', text: "git push <file>", isCorrect: false },
        { id: 'opt_4', text: "git stage --force", isCorrect: false },
      ],
    },
    {
      id: 'q_git_3_auto_7',
      question: "What is a Git branch under the hood?",
      explanation: "In Git, a branch is merely an 8-byte text file in .git/refs/heads containing the hash of the latest commit.",
      difficulty: 'intermediate',
      topicTag: 'git',
      type: 'multiple-choice',
      options: [
        { id: 'opt_1', text: "A lightweight, movable 40-character pointer referencing a specific commit SHA", isCorrect: true },
        { id: 'opt_2', text: "A complete physical copy of the entire repository on disk", isCorrect: false },
        { id: 'opt_3', text: "A separate user login account", isCorrect: false },
        { id: 'opt_4', text: "A folder inside the operating system Documents directory", isCorrect: false },
      ],
    },
    {
      id: 'q_git_3_auto_8',
      question: "What is the key difference between 'git merge' and 'git rebase'?",
      explanation: "Merge creates a 3-way merge commit; rebase rewrites commit history onto the tip of another branch.",
      difficulty: 'intermediate',
      topicTag: 'git',
      type: 'multiple-choice',
      options: [
        { id: 'opt_1', text: "'git merge' creates a merge commit preserving historical branches; 'git rebase' replays commits on top of a new base for a linear history", isCorrect: true },
        { id: 'opt_2', text: "'git rebase' deletes all previous commits", isCorrect: false },
        { id: 'opt_3', text: "'git merge' cannot be used on remote repositories", isCorrect: false },
        { id: 'opt_4', text: "They are identical commands", isCorrect: false },
      ],
    },
    {
      id: 'q_git_3_auto_9',
      question: "What command temporarily shelves uncommitted local modifications without committing them?",
      explanation: "git stash saves uncommitted changes onto a stack and reverts the working directory back to HEAD.",
      difficulty: 'intermediate',
      topicTag: 'git',
      type: 'multiple-choice',
      options: [
        { id: 'opt_1', text: "git stash", isCorrect: true },
        { id: 'opt_2', text: "git pause", isCorrect: false },
        { id: 'opt_3', text: "git hide", isCorrect: false },
        { id: 'opt_4', text: "git save", isCorrect: false },
      ],
    },
    {
      id: 'q_git_3_auto_10',
      question: "How do you resolve a Git merge conflict when conflicting lines exist in both branches?",
      explanation: "Resolving conflicts requires choosing the correct lines, removing conflict markers, staging (git add), and committing.",
      difficulty: 'intermediate',
      topicTag: 'git',
      type: 'multiple-choice',
      options: [
        { id: 'opt_1', text: "Manually edit the conflicting markers (<<<<<<<, =======, >>>>>>>), stage the resolved file, and commit", isCorrect: true },
        { id: 'opt_2', text: "Delete the .git directory and re-initialize", isCorrect: false },
        { id: 'opt_3', text: "Reboot the computer", isCorrect: false },
        { id: 'opt_4', text: "Run git clean -fxd", isCorrect: false },
      ],
    },
  ],
};
