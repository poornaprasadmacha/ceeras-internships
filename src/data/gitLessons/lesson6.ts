import { GitLessonDefinition } from '../../types/gitLesson';

export const lesson6: GitLessonDefinition = {
  id: 'git-lesson-6',
  number: 6,
  slug: 'handling-and-resolving-merge-conflicts',
  title: 'Handling & Resolving Merge Conflicts',
  shortDescription:
    'Demystify merge conflicts, understand conflict delimiters (<<<<<<<, =======, >>>>>>>), and learn the standard resolution workflow.',
  estimatedMinutes: 30,
  learningObjectives: [
    'Understand why merge conflicts occur (concurrent edits to identical lines)',
    'Read and interpret standard conflict markers (<<<<<<< HEAD, =======, >>>>>>> branch)',
    'Resolve conflicts manually by editing files and removing delimiters',
    'Finalize conflict resolution by staging with git add and completing the merge with git commit',
  ],
  prerequisites: ['Lesson 5: Merging Strategies & Fast-Forward'],
  sections: [
    {
      id: 'g6-1',
      title: 'The Anatomy of a Merge Conflict',
      content:
        'When two developers edit different files, or even different sections of the same file, Git merges them automatically.\n\nHowever, if both branches modify the EXACT same line of code in conflicting ways, Git stops and asks the human developer to decide which version to keep.\n\nGit pauses the merge and injects conflict markers directly into the file:\n\n<<<<<<< HEAD\nprint("Welcome to Ceeras v1")\n=======\nprint("Welcome to Ceeras v2 - Cloud Edition")\n>>>>>>> feature/branding\n\n- <<<<<<< HEAD: The code that exists on your current branch.\n- =======: The dividing line between the two conflicting versions.\n- >>>>>>> branch: The incoming code from the branch being merged.',
      codeExample: {
        command: `git status`,
        explanation: 'git status will list "both modified" files that contain conflict markers.',
      },
    },
    {
      id: 'g6-2',
      title: 'The 4-Step Resolution Workflow',
      content:
        'Resolving any merge conflict always follows 4 systematic steps:\n1. Open the conflicted file(s) and review the markers.\n2. Choose or combine the correct code and delete all markers (<<<<<<<, =======, >>>>>>>).\n3. Stage the resolved file with git add <file> to tell Git the conflict is settled.\n4. Complete the merge with git commit.\n\nIf you ever want to abort a confusing merge and return to the pre-merge state: git merge --abort.',
      codeExample: {
        command: `echo "print('Welcome to Ceeras v2 Unified')" > app.py
git add app.py
git commit -m "fix: resolve landing text conflict"`,
        explanation: 'Staging the cleaned file signals that the conflict has been resolved.',
      },
    },
  ],
  exercises: [
    {
      id: 'g6-ex1',
      lessonId: 'git-lesson-6',
      order: 1,
      title: 'Resolve Conflict and Stage Clean File',
      objective:
        'A conflict marker was introduced into "app.py". Overwrite "app.py" with the unified code `print("Resolved version")` using echo, then stage it with `git add app.py` and run `git status`.',
      initialCommands: [
        'echo "<<<<<<< HEAD\\nprint(\\"v1\\")\\n=======\\nprint(\\"v2\\")\\n>>>>>>> feature/update" > app.py',
      ],
      solutionCommands: [
        'echo "print(\\"Resolved version\\")" > app.py',
        'git add app.py',
        'git status',
      ],
      expectedOutputSubstring: 'Changes to be committed:',
      expectedBranch: 'main',
      hint: 'Run `echo "print(\\"Resolved version\\")" > app.py`, followed by `git add app.py` and `git status`.',
      explanation:
        'Removing conflict delimiters and staging the file marks the file as resolved in the index.',
      quickChips: [
        'echo "print(\\"Resolved version\\")" > app.py',
        'git add app.py',
        'git status',
      ],
    },
    {
      id: 'g6-ex2',
      lessonId: 'git-lesson-6',
      order: 2,
      title: 'Finalize Conflict Resolution Commit',
      objective:
        'With "app.py" staged, commit the resolved state with message `fix: resolve merge conflict in app.py` using git commit.',
      initialCommands: [
        'echo "print(\\"Resolved version\\")" > app.py',
        'git add app.py',
      ],
      solutionCommands: [
        'git commit -m "fix: resolve merge conflict in app.py"',
      ],
      expectedOutputSubstring: 'fix: resolve merge conflict',
      expectedBranch: 'main',
      expectedCommitCount: 2,
      hint: 'Run `git commit -m "fix: resolve merge conflict in app.py"`.',
      explanation:
        'Committing completes the merge and records the clean unified resolution.',
      quickChips: [
        'git commit -m "fix: resolve merge conflict in app.py"',
        'git log --oneline',
      ],
    },
  ],
  quiz: [
    {
      id: 'q-git-6-1',
      question: 'What do the conflict markers "<<<<<<< HEAD" and ">>>>>>> branch" signify in a conflicted file?',
      explanation:
        '<<<<<<< HEAD demarcates your active branch code, while >>>>>>> branch demarcates incoming changes from the merged branch.',
      difficulty: 'intermediate',
      topicTag: 'git',
      type: 'multiple-choice',
      options: [
        {
          id: 'opt-a',
          text: 'The boundaries between your current branch code (HEAD) and the incoming merged branch code',
          isCorrect: true,
        },
        {
          id: 'opt-b',
          text: 'Syntax errors generated by the Python interpreter',
          isCorrect: false,
        },
        {
          id: 'opt-c',
          text: 'HTML tags used to render headers in Markdown',
          isCorrect: false,
        },
        {
          id: 'opt-d',
          text: 'Network IP addresses of remote collaborators',
          isCorrect: false,
        },
      ],
    },
    {
      id: 'q-git-6-2',
      question: 'How do you tell Git that a conflict in a file has been resolved?',
      explanation: 'After removing markers and editing the file, running git add <file> informs Git the conflict is resolved.',
      difficulty: 'intermediate',
      topicTag: 'git',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'By running git add <file> on the cleaned file', isCorrect: true },
        { id: 'opt-b', text: 'By deleting the .git folder', isCorrect: false },
        { id: 'opt-c', text: 'By closing and reopening the terminal', isCorrect: false },
        { id: 'opt-d', text: 'By running git clear-conflicts', isCorrect: false },
      ],
    },
    {
      id: 'q-git-6-3',
      question: 'What command safely cancels an in-progress merge and restores your repository to its pre-merge state?',
      explanation: 'git merge --abort resets the working tree and index back to the commit before merge began.',
      difficulty: 'beginner',
      topicTag: 'git',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'git merge --abort', isCorrect: true },
        { id: 'opt-b', text: 'git cancel', isCorrect: false },
        { id: 'opt-c', text: 'git stop', isCorrect: false },
        { id: 'opt-d', text: 'git undo --merge', isCorrect: false },
      ],
    },
  ],
};
