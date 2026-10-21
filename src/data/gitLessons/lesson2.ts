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
  ],
};
