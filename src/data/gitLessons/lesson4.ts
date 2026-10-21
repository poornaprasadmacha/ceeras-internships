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
  ],
};
