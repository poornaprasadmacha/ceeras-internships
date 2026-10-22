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
    {
      id: 'q_git_6_auto_4',
      question: "What is the fundamental architecture of Git as taught in Lesson 6 (Handling & Resolving Merge Conflicts)?",
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
      id: 'q_git_6_auto_5',
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
      id: 'q_git_6_auto_6',
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
      id: 'q_git_6_auto_7',
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
      id: 'q_git_6_auto_8',
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
      id: 'q_git_6_auto_9',
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
      id: 'q_git_6_auto_10',
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
