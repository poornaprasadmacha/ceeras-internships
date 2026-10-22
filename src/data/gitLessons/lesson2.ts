import { GitLessonDefinition } from '../../types/gitLesson';

export const lesson2: GitLessonDefinition = {
  id: 'git-lesson-2',
  number: 2,
  slug: 'initializing-repositories-and-first-commits',
  title: 'Initializing Repositories & Staging',
  shortDescription:
    'Initialize new repositories with git init, stage files with git add, and record atomic history with git commit.',
  estimatedMinutes: 25,
  learningObjectives: [
    'Initialize a local repository using git init',
    'Stage specific files vs all modified files using git add <file> and git add .',
    'Write concise, conventional commit messages using git commit -m',
    'Understand atomic commits and how staged files transition into permanent history',
  ],
  prerequisites: ['Lesson 1: Version Control Fundamentals & Git Architecture'],
  sections: [
    {
      id: 'g2-1',
      title: 'Staging Changes: git add',
      content:
        'When you modify or create files in your project, Git does not automatically commit them. You must explicitly stage the exact changes you want to include in your next snapshot.\n\n- git add <filename>: Stages a single file.\n- git add .: Stages all modified and new files in the current directory.\n- git add -A: Stages all additions, modifications, and deletions repository-wide.\n\nThis two-step process (add then commit) lets you curate clean, focused commits even if you touched multiple unrelated files during development.',
      codeExample: {
        command: `echo "print('v1')" > main.py
git status
git add main.py
git status`,
        explanation: 'git add moves the file from untracked to "Changes to be committed".',
      },
    },
    {
      id: 'g2-2',
      title: 'Recording Snapshots: git commit',
      content:
        'A commit permanently records the staged snapshot into the repository object database.\n\nEvery commit records:\n1. The full tree snapshot of files\n2. Author and committer metadata\n3. Timestamp\n4. Parent commit hash\n5. The commit message\n\nBest practices for commit messages:\n- Use imperative mood: "Add user login" instead of "Added user login"\n- Follow conventional prefixes: feat:, fix:, docs:, refactor:.',
      codeExample: {
        command: `git commit -m "feat: add application entrypoint"`,
        explanation: 'git commit bundles staged changes into an immutable snapshot node.',
      },
    },
  ],
  exercises: [
    {
      id: 'g2-ex1',
      lessonId: 'git-lesson-2',
      order: 1,
      title: 'Stage a New Configuration File',
      objective:
        'Create a file named "config.json" containing `{"env": "development"}` using echo, then stage it using `git add config.json`. Verify using `git status`.',
      initialCommands: [],
      solutionCommands: [
        'echo "{\\"env\\": \\"development\\"}" > config.json',
        'git add config.json',
        'git status',
      ],
      expectedOutputSubstring: 'Changes to be committed:',
      expectedBranch: 'main',
      hint: 'Run `echo "{\\"env\\": \\"development\\"}" > config.json`, then `git add config.json`, and finally `git status`.',
      explanation:
        'Staging marks the file to be included in the snapshot when git commit is called.',
      quickChips: [
        'echo "{\\"env\\": \\"development\\"}" > config.json',
        'git add config.json',
        'git status',
      ],
    },
    {
      id: 'g2-ex2',
      lessonId: 'git-lesson-2',
      order: 2,
      title: 'Commit the Staged Configuration',
      objective:
        'Commit the staged configuration file with the message "feat: add development config" using `git commit -m "feat: add development config"`.',
      initialCommands: [
        'echo "{\\"env\\": \\"development\\"}" > config.json',
        'git add config.json',
      ],
      solutionCommands: ['git commit -m "feat: add development config"'],
      expectedOutputSubstring: 'feat: add development config',
      expectedCommitCount: 2,
      expectedBranch: 'main',
      hint: 'Type `git commit -m "feat: add development config"` and press Enter.',
      explanation:
        'The commit clears the staging index and advances the branch pointer to the newly generated commit SHA.',
      quickChips: [
        'git commit -m "feat: add development config"',
        'git status',
        'git log --oneline',
      ],
    },
  ],
  quiz: [
    {
      id: 'q-git-2-1',
      question: 'Why does Git require a staging step (git add) before committing (git commit)?',
      explanation:
        'The staging area allows developers to curate and bundle only related changes into logical atomic commits.',
      difficulty: 'beginner',
      topicTag: 'git',
      type: 'multiple-choice',
      options: [
        {
          id: 'opt-a',
          text: 'It allows developers to selectively review and group specific changes into focused, atomic commits',
          isCorrect: true,
        },
        {
          id: 'opt-b',
          text: 'It compiles the Python code into C++ binaries',
          isCorrect: false,
        },
        {
          id: 'opt-c',
          text: 'It uploads files directly to GitHub cloud servers',
          isCorrect: false,
        },
        {
          id: 'opt-d',
          text: 'It encrypts the disk with a master password',
          isCorrect: false,
        },
      ],
    },
    {
      id: 'q-git-2-2',
      question: 'Which flag allows passing a commit message directly in the terminal command line?',
      explanation: 'The -m flag specifies the commit message inline.',
      difficulty: 'beginner',
      topicTag: 'git',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: '-m ("message")', isCorrect: true },
        { id: 'opt-b', text: '-msg', isCorrect: false },
        { id: 'opt-c', text: '--text', isCorrect: false },
        { id: 'opt-d', text: '-c', isCorrect: false },
      ],
    },
    {
      id: 'q-git-2-3',
      question: 'What does "git add ." do?',
      explanation: 'git add . stages all modified, new, and deleted files in the current directory and subdirectories.',
      difficulty: 'beginner',
      topicTag: 'git',
      type: 'multiple-choice',
      options: [
        {
          id: 'opt-a',
          text: 'Stages all new and modified files in the current working directory tree',
          isCorrect: true,
        },
        {
          id: 'opt-b',
          text: 'Deletes all files in the current directory',
          isCorrect: false,
        },
        {
          id: 'opt-c',
          text: 'Prints the current system time',
          isCorrect: false,
        },
        {
          id: 'opt-d',
          text: 'Reverts the last commit',
          isCorrect: false,
        },
      ],
    },
    {
      id: 'q_git_2_auto_4',
      question: "What is the fundamental architecture of Git as taught in Lesson 2 (Initializing Repositories & Staging)?",
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
      id: 'q_git_2_auto_5',
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
      id: 'q_git_2_auto_6',
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
      id: 'q_git_2_auto_7',
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
      id: 'q_git_2_auto_8',
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
      id: 'q_git_2_auto_9',
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
      id: 'q_git_2_auto_10',
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
