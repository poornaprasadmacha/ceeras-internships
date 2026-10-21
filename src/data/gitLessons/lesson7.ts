import { GitLessonDefinition } from '../../types/gitLesson';

export const lesson7: GitLessonDefinition = {
  id: 'git-lesson-7',
  number: 7,
  slug: 'undoing-changes-safely',
  title: 'Undoing Changes Safely',
  shortDescription:
    'Discard working tree edits with git restore, unstage files with git reset, and perform non-destructive rollbacks with git revert.',
  estimatedMinutes: 25,
  learningObjectives: [
    'Discard unstaged working directory changes using git restore <file>',
    'Unstage files from the index using git restore --staged <file> or git reset',
    'Understand git reset modes: --soft, --mixed, and --hard',
    'Perform collaborative, non-destructive rollbacks using git revert',
  ],
  prerequisites: ['Lesson 6: Handling & Resolving Merge Conflicts'],
  sections: [
    {
      id: 'g7-1',
      title: 'Restoring Files and Unstaging',
      content:
        'Accidents happen: you might edit a file and realize you want to discard your changes, or stage a secret key that should never be committed.\n\nGit provides modern restore commands:\n- git restore <file>: Discards unstaged modifications in your working directory, reverting the file back to HEAD.\n- git restore --staged <file>: Unstages a file from the index while keeping your changes intact in your working tree.\n\nLegacy command git reset HEAD <file> achieves the same unstaging behavior.',
      codeExample: {
        command: `echo "accidental edit" > app.py
git add app.py
git reset
git status`,
        explanation: 'git reset unstages files from the index back into the working directory.',
      },
    },
    {
      id: 'g7-2',
      title: 'Undoing Commits: reset vs revert',
      content:
        'When a commit has already been recorded:\n1. git reset --hard <commit>: Moves the branch pointer backward. Warning: Discards all working directory changes! Never use on public branches shared with teammates.\n\n2. git revert <commit>: Creates a NEW commit that applies the exact inverse diff of the target commit. This is completely safe for public shared branches because it preserves linear history without rewriting the past.',
      codeExample: {
        command: `git revert HEAD`,
        explanation: 'git revert is the gold standard for undoing commits in collaborative teams.',
      },
    },
  ],
  exercises: [
    {
      id: 'g7-ex1',
      lessonId: 'git-lesson-7',
      order: 1,
      title: 'Unstage Accidentally Added File',
      objective:
        'A secret file "secrets.env" was staged by mistake. Run `git reset` to unstage it, then verify with `git status`.',
      initialCommands: [
        'echo "API_KEY=secret_123" > secrets.env',
        'git add secrets.env',
      ],
      solutionCommands: ['git reset', 'git status'],
      expectedOutputSubstring: 'Untracked files:',
      expectedBranch: 'main',
      hint: 'Type `git reset` and then `git status`.',
      explanation:
        'git reset clears the staged index while keeping the physical file intact on disk.',
      quickChips: ['git reset', 'git status'],
    },
    {
      id: 'g7-ex2',
      lessonId: 'git-lesson-7',
      order: 2,
      title: 'Hard Reset to Clean Working Directory',
      objective:
        'Discard all working directory modifications and match HEAD exactly by running `git reset --hard`. Verify with `git status`.',
      initialCommands: [
        'echo "corrupted data" > app.py',
      ],
      solutionCommands: ['git reset --hard', 'git status'],
      expectedOutputSubstring: 'working tree clean',
      expectedBranch: 'main',
      hint: 'Type `git reset --hard` followed by `git status`.',
      explanation:
        'git reset --hard restores working files and the index to the exact state of the latest commit.',
      quickChips: ['git reset --hard', 'git status'],
    },
  ],
  quiz: [
    {
      id: 'q-git-7-1',
      question: 'Why is git revert preferred over git reset --hard when undoing commits on a shared public branch?',
      explanation:
        'git revert creates a new commit that inverts changes without rewriting history or breaking other developers clones.',
      difficulty: 'intermediate',
      topicTag: 'git',
      type: 'multiple-choice',
      options: [
        {
          id: 'opt-a',
          text: 'It creates a new commit that inverts the changes without rewriting shared branch history',
          isCorrect: true,
        },
        {
          id: 'opt-b',
          text: 'It is 10 times faster to execute',
          isCorrect: false,
        },
        {
          id: 'opt-c',
          text: 'It deletes the repository from your laptop',
          isCorrect: false,
        },
        {
          id: 'opt-d',
          text: 'It only works for JavaScript files',
          isCorrect: false,
        },
      ],
    },
    {
      id: 'q-git-7-2',
      question: 'What command discards unstaged modifications in a file, reverting it to the latest committed state?',
      explanation: 'git restore <file> discards unstaged working tree changes.',
      difficulty: 'beginner',
      topicTag: 'git',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'git restore <file>', isCorrect: true },
        { id: 'opt-b', text: 'git delete <file>', isCorrect: false },
        { id: 'opt-c', text: 'git remove --force', isCorrect: false },
        { id: 'opt-d', text: 'git push --undo', isCorrect: false },
      ],
    },
    {
      id: 'q-git-7-3',
      question: 'What does git reset (with no arguments) do?',
      explanation: 'It unstages all files from the staging index without deleting your working directory edits.',
      difficulty: 'intermediate',
      topicTag: 'git',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'Unstages all files currently in the index', isCorrect: true },
        { id: 'opt-b', text: 'Permanently deletes all files on your hard drive', isCorrect: false },
        { id: 'opt-c', text: 'Switches to the main branch', isCorrect: false },
        { id: 'opt-d', text: 'Creates a brand new GitHub account', isCorrect: false },
      ],
    },
  ],
};
