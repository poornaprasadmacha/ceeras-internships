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
  ],
};
