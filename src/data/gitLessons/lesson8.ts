import { GitLessonDefinition } from '../../types/gitLesson';

export const lesson8: GitLessonDefinition = {
  id: 'git-lesson-8',
  number: 8,
  slug: 'stashing-and-workspace-hygiene',
  title: 'Stashing & Workspace Hygiene',
  shortDescription:
    'Pause in-progress work with git stash, restore it with git stash pop, and prevent unwanted files from entering Git with .gitignore.',
  estimatedMinutes: 25,
  learningObjectives: [
    'Shelve incomplete dirty working directory changes using git stash',
    'Re-apply stashed changes using git stash pop and inspect stashes with git stash list',
    'Configure .gitignore to prevent secret keys, logs, and dependencies from being tracked',
    'Understand workspace hygiene practices in high-velocity software teams',
  ],
  prerequisites: ['Lesson 7: Undoing Changes Safely'],
  sections: [
    {
      id: 'g8-1',
      title: 'Shelving Work: The Git Stash',
      content:
        'Imagine you are halfway through refactoring a complex component when a critical production bug emerges. You need to switch branches immediately, but your code is broken and not ready for a commit.\n\nGit Stash allows you to "shelve" uncommitted dirty changes into a temporary stack:\n- git stash: Saves your working directory and staging index, reverting your workspace to a clean HEAD state.\n- git stash list: Inspects saved stashes.\n- git stash pop: Re-applies the most recent stashed state and removes it from the stash stack.',
      codeExample: {
        command: `echo "in-progress code" > app.py
git status
git stash
git status
git stash pop`,
        explanation: 'git stash cleans your working directory so you can switch contexts immediately.',
      },
    },
    {
      id: 'g8-2',
      title: 'Ignoring Files with .gitignore',
      content:
        'Never commit compiled artifacts, temporary logs, or secret credentials to version control.\n\nA .gitignore file in the root directory specifies patterns for Git to ignore:\n- node_modules/\n- *.log\n- .env\n- dist/\n- __pycache__/\n\nOnce listed in .gitignore, Git completely omits these files from git status and git add .',
      codeExample: {
        command: `echo ".env\\n*.log" > .gitignore
git status`,
        explanation: '.gitignore keeps your repositories lean and prevents security leaks.',
      },
    },
  ],
  exercises: [
    {
      id: 'g8-ex1',
      lessonId: 'git-lesson-8',
      order: 1,
      title: 'Stash Dirty Changes Away',
      objective:
        'Modify "app.py" with in-progress work using `echo "WIP refactoring" > app.py`, then run `git stash` to clean your workspace. Verify with `git status`.',
      initialCommands: [],
      solutionCommands: [
        'echo "WIP refactoring" > app.py',
        'git stash',
        'git status',
      ],
      expectedOutputSubstring: 'working tree clean',
      expectedBranch: 'main',
      hint: 'Run `echo "WIP refactoring" > app.py`, followed by `git stash` and `git status`.',
      explanation:
        'git stash safely stores modified files and restores HEAD state.',
      quickChips: [
        'echo "WIP refactoring" > app.py',
        'git stash',
        'git status',
      ],
    },
    {
      id: 'g8-ex2',
      lessonId: 'git-lesson-8',
      order: 2,
      title: 'Restore Stashed Work with stash pop',
      objective:
        'Restore the shelved changes back into your working tree by running `git stash pop`. Verify with `git status`.',
      initialCommands: [
        'echo "WIP refactoring" > app.py',
        'git stash',
      ],
      solutionCommands: ['git stash pop', 'git status'],
      expectedOutputSubstring: 'modified:   app.py',
      expectedBranch: 'main',
      hint: 'Type `git stash pop` followed by `git status`.',
      explanation:
        'git stash pop un-shelves changes and re-applies them to your working tree.',
      quickChips: ['git stash pop', 'git status'],
    },
  ],
  quiz: [
    {
      id: 'q-git-8-1',
      question: 'When should you use git stash?',
      explanation:
        'When you have unfinished working tree changes and need a clean workspace to switch branches or pull upstream updates.',
      difficulty: 'beginner',
      topicTag: 'git',
      type: 'multiple-choice',
      options: [
        {
          id: 'opt-a',
          text: 'When you need to switch branches quickly without committing incomplete or broken code',
          isCorrect: true,
        },
        {
          id: 'opt-b',
          text: 'To upload files to a cloud backup drive',
          isCorrect: false,
        },
        {
          id: 'opt-c',
          text: 'To delete your Git commit history',
          isCorrect: false,
        },
        {
          id: 'opt-d',
          text: 'To format code with Prettier',
          isCorrect: false,
        },
      ],
    },
    {
      id: 'q-git-8-2',
      question: 'What command re-applies stashed changes and removes them from the stash stack?',
      explanation: 'git stash pop applies the latest stash and drops it from the stash list.',
      difficulty: 'beginner',
      topicTag: 'git',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'git stash pop', isCorrect: true },
        { id: 'opt-b', text: 'git stash apply --delete', isCorrect: false },
        { id: 'opt-c', text: 'git un-stash', isCorrect: false },
        { id: 'opt-d', text: 'git restore --stash', isCorrect: false },
      ],
    },
    {
      id: 'q-git-8-3',
      question: 'What is the purpose of the .gitignore file?',
      explanation: '.gitignore tells Git which files or directories to ignore and never track.',
      difficulty: 'beginner',
      topicTag: 'git',
      type: 'multiple-choice',
      options: [
        {
          id: 'opt-a',
          text: 'Specifies intentionally untracked files (build artifacts, dependencies, secrets) that Git should ignore',
          isCorrect: true,
        },
        {
          id: 'opt-b',
          text: 'Stores commit author usernames and passwords',
          isCorrect: false,
        },
        {
          id: 'opt-c',
          text: 'Lists git commands that should be disabled',
          isCorrect: false,
        },
        {
          id: 'opt-d',
          text: 'Converts Git commits into PDF reports',
          isCorrect: false,
        },
      ],
    },
    {
      id: 'q_git_8_auto_4',
      question: "What is the fundamental architecture of Git as taught in Lesson 8 (Stashing & Workspace Hygiene)?",
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
      id: 'q_git_8_auto_5',
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
      id: 'q_git_8_auto_6',
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
      id: 'q_git_8_auto_7',
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
      id: 'q_git_8_auto_8',
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
      id: 'q_git_8_auto_9',
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
      id: 'q_git_8_auto_10',
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
