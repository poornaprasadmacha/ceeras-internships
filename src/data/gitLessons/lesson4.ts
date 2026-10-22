import { GitLessonDefinition } from '../../types/gitLesson';

export const lesson4: GitLessonDefinition = {
  id: 'git-lesson-4',
  number: 4,
  slug: 'branching-and-parallel-development',
  title: 'Branching & Parallel Workflows',
  shortDescription:
    'Isolate features using branches with git branch, git checkout, and git switch without impacting the stable main branch.',
  estimatedMinutes: 25,
  learningObjectives: [
    'Understand that a Git branch is simply a lightweight, movable pointer to a commit hash',
    'List, create, and delete branches using git branch',
    'Create and switch to new branches in one step using git checkout -b or git switch -c',
    'Understand how HEAD tracks the active branch pointer',
  ],
  prerequisites: ['Lesson 3: Inspecting History & Tracking Diffs'],
  sections: [
    {
      id: 'g4-1',
      title: 'Lightweight Pointers: What is a Branch?',
      content:
        'In Git, branches are not expensive copies of the whole repository. A branch is merely a 41-byte text file inside .git/refs/heads/ storing a 40-character commit hash.\n\nCreating a branch takes milliseconds because Git merely creates a new reference pointer pointing to the current commit.\n\nThe special reference HEAD indicates which branch pointer you are currently checked out on.',
      codeExample: {
        command: `git branch
git branch feature/navbar
git branch`,
        explanation: 'git branch lists all local branches; the asterisk indicates the current HEAD branch.',
      },
    },
    {
      id: 'g4-2',
      title: 'Switching Contexts: checkout and switch',
      content:
        'To switch between branches:\n- git checkout <branch>: Switches working directory to the target branch.\n- git checkout -b <new-branch>: Creates a new branch and switches to it in a single command.\n- git switch <branch>: Modern alternative introduced in Git 2.23 specifically for switching branches.\n\nCommits made on a feature branch advance that branch pointer while leaving main untouched.',
      codeExample: {
        command: `git checkout -b feature/auth
git status`,
        explanation: 'checkout -b creates the branch and updates HEAD simultaneously.',
      },
    },
  ],
  exercises: [
    {
      id: 'g4-ex1',
      lessonId: 'git-lesson-4',
      order: 1,
      title: 'Create and Switch to a Feature Branch',
      objective:
        'Create a new branch named "feature/auth" and switch to it using `git checkout -b feature/auth`. Verify with `git status`.',
      initialCommands: [],
      solutionCommands: ['git checkout -b feature/auth', 'git status'],
      expectedOutputSubstring: 'On branch feature/auth',
      expectedBranch: 'feature/auth',
      hint: 'Type `git checkout -b feature/auth` and hit Enter.',
      explanation:
        'The checkout -b command creates the new pointer and moves HEAD to feature/auth.',
      quickChips: [
        'git checkout -b feature/auth',
        'git branch',
        'git status',
      ],
    },
    {
      id: 'g4-ex2',
      lessonId: 'git-lesson-4',
      order: 2,
      title: 'Commit Isolated Work on Feature Branch',
      objective:
        'On "feature/auth", create a new file `auth.py` with `echo "def login(): pass" > auth.py`, stage it with `git add auth.py`, and commit it with `git commit -m "feat: add login stub"`.',
      initialCommands: ['git checkout -b feature/auth'],
      solutionCommands: [
        'echo "def login(): pass" > auth.py',
        'git add auth.py',
        'git commit -m "feat: add login stub"',
      ],
      expectedOutputSubstring: 'feat: add login stub',
      expectedBranch: 'feature/auth',
      expectedCommitCount: 2,
      hint: 'Run `echo "def login(): pass" > auth.py`, then `git add auth.py`, then `git commit -m "feat: add login stub"`.',
      explanation:
        'The commit exists only on feature/auth; the main branch pointer remains untouched.',
      quickChips: [
        'echo "def login(): pass" > auth.py',
        'git add auth.py',
        'git commit -m "feat: add login stub"',
      ],
    },
  ],
  quiz: [
    {
      id: 'q-git-4-1',
      question: 'What is a Git branch under the hood?',
      explanation: 'A branch is simply a 41-byte text reference file holding a 40-character commit hash.',
      difficulty: 'beginner',
      topicTag: 'git',
      type: 'multiple-choice',
      options: [
        {
          id: 'opt-a',
          text: 'A lightweight movable pointer to a specific commit hash in the DAG',
          isCorrect: true,
        },
        {
          id: 'opt-b',
          text: 'A duplicate folder containing all files cloned to a new drive partition',
          isCorrect: false,
        },
        {
          id: 'opt-c',
          text: 'A remote server located in a different data center',
          isCorrect: false,
        },
        {
          id: 'opt-d',
          text: 'A compressed zip archive requiring password decryption',
          isCorrect: false,
        },
      ],
    },
    {
      id: 'q-git-4-2',
      question: 'What command creates and switches to a new branch in one step?',
      explanation: 'git checkout -b <branch> (or git switch -c <branch>) creates and activates a new branch.',
      difficulty: 'beginner',
      topicTag: 'git',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'git checkout -b <branch-name>', isCorrect: true },
        { id: 'opt-b', text: 'git branch --new-and-switch', isCorrect: false },
        { id: 'opt-c', text: 'git create <branch-name>', isCorrect: false },
        { id: 'opt-d', text: 'git jump <branch-name>', isCorrect: false },
      ],
    },
    {
      id: 'q-git-4-3',
      question: 'What special pointer identifies your currently active branch and commit in Git?',
      explanation: 'HEAD points to the currently checked out branch or commit.',
      difficulty: 'intermediate',
      topicTag: 'git',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'HEAD', isCorrect: true },
        { id: 'opt-b', text: 'ORIGIN', isCorrect: false },
        { id: 'opt-c', text: 'MASTER', isCorrect: false },
        { id: 'opt-d', text: 'CURRENT', isCorrect: false },
      ],
    },
    {
      id: 'q_git_4_auto_4',
      question: "What is the fundamental architecture of Git as taught in Lesson 4 (Branching & Parallel Workflows)?",
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
      id: 'q_git_4_auto_5',
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
      id: 'q_git_4_auto_6',
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
      id: 'q_git_4_auto_7',
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
      id: 'q_git_4_auto_8',
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
      id: 'q_git_4_auto_9',
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
      id: 'q_git_4_auto_10',
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
