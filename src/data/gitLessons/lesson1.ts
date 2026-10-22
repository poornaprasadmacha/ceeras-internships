import { GitLessonDefinition } from '../../types/gitLesson';

export const lesson1: GitLessonDefinition = {
  id: 'git-lesson-1',
  number: 1,
  slug: 'version-control-fundamentals-and-git-architecture',
  title: 'Version Control & Git Architecture',
  shortDescription:
    'Understand distributed version control, the internal 3-stage architecture of Git (Working Tree, Index, Repository), and SHA-1 snapshot hashes.',
  estimatedMinutes: 25,
  learningObjectives: [
    'Differentiate between Centralized (SVN) and Distributed (Git) version control systems',
    'Master the 3 stages: Working Directory, Staging Area (Index), and Local Repository',
    'Understand how Git models project history as a Directed Acyclic Graph (DAG) of immutable snapshots',
    'Inspect initial repository status using git status',
  ],
  prerequisites: ['Basic command line familiarity'],
  sections: [
    {
      id: 'g1-1',
      title: 'Distributed Version Control vs Centralized Systems',
      content:
        'Version Control Systems (VCS) record changes to files over time so specific versions can be recalled later.\n\nOlder systems like Subversion (SVN) were centralized: developers checked out code from a single central server. If the server was down or offline, nobody could commit or view history.\n\nGit is distributed: every developer clones a full copy of the entire repository history locally. Commits, branch creation, diffs, and log reviews happen entirely offline at lightning speed.',
      codeExample: {
        command: `git --version
git status`,
        explanation: 'git status displays the current branch and state of the working directory and index.',
      },
    },
    {
      id: 'g1-2',
      title: 'The Three Stages of Git',
      content:
        'A Git project resides across three distinct stages:\n1. Working Directory: The physical files you edit on your disk.\n2. Staging Area (Index): A binary cache file (.git/index) that stages snapshots ready for the next commit.\n3. Local Repository: The permanent database (.git/objects) where commits are stored as compressed, immutable DAG nodes indexed by cryptographic hashes.',
      codeExample: {
        command: `echo "Release notes" > notes.txt
git status`,
        explanation: 'Creating a file places it in the working tree as an untracked file.',
      },
    },
  ],
  exercises: [
    {
      id: 'g1-ex1',
      lessonId: 'git-lesson-1',
      order: 1,
      title: 'Inspect Initial Repository State',
      objective:
        'Run "git status" to inspect the active branch and verify that the working tree is clean.',
      initialCommands: [],
      solutionCommands: ['git status'],
      expectedOutputSubstring: 'On branch main',
      expectedBranch: 'main',
      hint: 'Type "git status" and hit Enter.',
      explanation:
        'git status is the fundamental diagnostic tool in Git, showing the branch and file tracking status.',
      quickChips: ['git status', 'git log --oneline'],
    },
    {
      id: 'g1-ex2',
      lessonId: 'git-lesson-1',
      order: 2,
      title: 'Create an Untracked File in Working Tree',
      objective:
        'Create a new file named "notes.txt" using echo or touch, and run "git status" to observe the untracked file section.',
      initialCommands: [],
      solutionCommands: ['echo "Sprint notes" > notes.txt', 'git status'],
      expectedOutputSubstring: 'Untracked files:',
      expectedBranch: 'main',
      hint: 'Type `echo "Sprint notes" > notes.txt` followed by `git status`.',
      explanation:
        'New files exist strictly in your working directory until explicitly added to the Git staging index.',
      quickChips: ['echo "Sprint notes" > notes.txt', 'git status'],
    },
  ],
  quiz: [
    {
      id: 'q-git-1-1',
      question: 'What is the key advantage of a Distributed Version Control System like Git over a Centralized VCS?',
      explanation:
        'Every developer holds a complete local copy of the full repository history, allowing offline operations and distributed backups.',
      difficulty: 'beginner',
      topicTag: 'git',
      type: 'multiple-choice',
      options: [
        {
          id: 'opt-a',
          text: 'Every clone contains the complete repository history, allowing full offline commits and branching',
          isCorrect: true,
        },
        {
          id: 'opt-b',
          text: 'It requires continuous high-speed internet connection to record any change',
          isCorrect: false,
        },
        {
          id: 'opt-c',
          text: 'It only works with Python programming language',
          isCorrect: false,
        },
        {
          id: 'opt-d',
          text: 'It automatically deletes older commits after 30 days',
          isCorrect: false,
        },
      ],
    },
    {
      id: 'q-git-1-2',
      question: 'Which of the three Git stages holds changes that have been marked to be included in the next commit?',
      explanation:
        'The Staging Area (or Index) holds snapshots prepared for the next commit.',
      difficulty: 'beginner',
      topicTag: 'git',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'The Staging Area (Index)', isCorrect: true },
        { id: 'opt-b', text: 'The Working Directory', isCorrect: false },
        { id: 'opt-c', text: 'The Remote GitHub Cloud', isCorrect: false },
        { id: 'opt-d', text: 'The Operating System Recycle Bin', isCorrect: false },
      ],
    },
    {
      id: 'q-git-1-3',
      question: 'How does Git internally represent commit versions?',
      explanation:
        'Git stores each commit as an immutable snapshot in a Directed Acyclic Graph (DAG) identified by a hash.',
      difficulty: 'intermediate',
      topicTag: 'git',
      type: 'multiple-choice',
      options: [
        {
          id: 'opt-a',
          text: 'As immutable snapshot nodes in a Directed Acyclic Graph (DAG) indexed by cryptographic hashes',
          isCorrect: true,
        },
        {
          id: 'opt-b',
          text: 'As a single zip file rewritten on every commit',
          isCorrect: false,
        },
        {
          id: 'opt-c',
          text: 'As plain text Word documents',
          isCorrect: false,
        },
        {
          id: 'opt-d',
          text: 'As simple line numbers in a global ledger',
          isCorrect: false,
        },
      ],
    },
    {
      id: 'q_git_1_auto_4',
      question: "What is the fundamental architecture of Git as taught in Lesson 1 (Version Control & Git Architecture)?",
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
      id: 'q_git_1_auto_5',
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
      id: 'q_git_1_auto_6',
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
      id: 'q_git_1_auto_7',
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
      id: 'q_git_1_auto_8',
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
      id: 'q_git_1_auto_9',
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
      id: 'q_git_1_auto_10',
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
