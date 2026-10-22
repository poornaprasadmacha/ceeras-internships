import { GitLessonDefinition } from '../../types/gitLesson';

export const lesson5: GitLessonDefinition = {
  id: 'git-lesson-5',
  number: 5,
  slug: 'merging-strategies-and-fast-forward',
  title: 'Merging Strategies & Fast-Forward',
  shortDescription:
    'Integrate branch histories back into main using git merge, contrasting Fast-Forward pointer moves with 3-way merge commits.',
  estimatedMinutes: 25,
  learningObjectives: [
    'Integrate completed features using git merge <branch>',
    'Understand Fast-Forward merges when main has not progressed',
    'Recognize 3-Way Merge commits generated when both branches have diverged',
    'Inspect merge commit nodes with multiple parent hashes',
  ],
  prerequisites: ['Lesson 4: Branching & Parallel Workflows'],
  sections: [
    {
      id: 'g5-1',
      title: 'Fast-Forward vs 3-Way Merge',
      content:
        'When you finish work on a feature branch and want to integrate it back into main, you run git merge while checked out on main.\n\nTwo primary merge strategies occur:\n1. Fast-Forward: If main has not had any new commits since the feature branched off, Git simply moves the main pointer forward to the tip of the feature branch. No new merge commit is required.\n\n2. 3-Way Merge: If main has also received new commits while you worked on the feature, the branches have diverged. Git identifies the Common Ancestor commit, combines changes from both tips, and creates a special Merge Commit with two parent hashes.',
      codeExample: {
        command: `git checkout main
git merge feature/auth`,
        explanation: 'Always check out the receiving branch (main) before running git merge.',
      },
    },
    {
      id: 'g5-2',
      title: 'The Merge Commit Structure',
      content:
        'Merge commits are unique because they have two parents:\nParent 1: The previous HEAD on main\nParent 2: The tip of the merged feature branch\n\nThis permanently preserves the historical record of when a feature was conceived, developed in isolation, and integrated.',
      codeExample: {
        command: `git log --oneline`,
        explanation: 'The merge commit appears with a default message: Merge branch "feature/auth" into main.',
      },
    },
  ],
  exercises: [
    {
      id: 'g5-ex1',
      lessonId: 'git-lesson-5',
      order: 1,
      title: 'Prepare to Merge Feature into Main',
      objective:
        'A feature branch "feature/search" has been created and committed to. Switch back to "main" using `git checkout main` and verify with `git branch`.',
      initialCommands: [
        'git checkout -b feature/search',
        'echo "def search(): return []" > search.py',
        'git add search.py',
        'git commit -m "feat: implement search function"',
      ],
      solutionCommands: ['git checkout main', 'git branch'],
      expectedOutputSubstring: '* main',
      expectedBranch: 'main',
      hint: 'Type `git checkout main` and run `git branch`.',
      explanation:
        'You must always be checked out on the destination branch (main) before running git merge.',
      quickChips: ['git checkout main', 'git branch', 'git status'],
    },
    {
      id: 'g5-ex2',
      lessonId: 'git-lesson-5',
      order: 2,
      title: 'Execute the Branch Merge',
      objective:
        'While on "main", merge "feature/search" using `git merge feature/search`. Verify that the commit log includes the merge.',
      initialCommands: [
        'git checkout -b feature/search',
        'echo "def search(): return []" > search.py',
        'git add search.py',
        'git commit -m "feat: implement search function"',
        'git checkout main',
      ],
      solutionCommands: ['git merge feature/search', 'git log --oneline'],
      expectedOutputSubstring: 'Merge branch',
      expectedBranch: 'main',
      expectedCommitCount: 3,
      hint: 'Type `git merge feature/search` followed by `git log --oneline`.',
      explanation:
        'Git combines histories and updates the main pointer to include search.py.',
      quickChips: [
        'git merge feature/search',
        'git log --oneline',
        'git status',
      ],
    },
  ],
  quiz: [
    {
      id: 'q-git-5-1',
      question: 'Before merging a feature branch into main, which branch must you be currently checked out on?',
      explanation: 'You must check out the target branch (main) that will receive the merged changes.',
      difficulty: 'beginner',
      topicTag: 'git',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'The target branch (main)', isCorrect: true },
        { id: 'opt-b', text: 'The feature branch', isCorrect: false },
        { id: 'opt-c', text: 'It does not matter', isCorrect: false },
        { id: 'opt-d', text: 'The remote origin repository', isCorrect: false },
      ],
    },
    {
      id: 'q-git-5-2',
      question: 'When does a Fast-Forward merge occur?',
      explanation: 'When the target branch has not advanced since the feature branched off, Git simply slides the pointer forward.',
      difficulty: 'intermediate',
      topicTag: 'git',
      type: 'multiple-choice',
      options: [
        {
          id: 'opt-a',
          text: 'When no new commits have occurred on the target branch since the branch point',
          isCorrect: true,
        },
        {
          id: 'opt-b',
          text: 'Only when merging code on a Friday afternoon',
          isCorrect: false,
        },
        {
          id: 'opt-c',
          text: 'When both branches have conflicts on every line',
          isCorrect: false,
        },
        {
          id: 'opt-d',
          text: 'When all developers delete their accounts',
          isCorrect: false,
        },
      ],
    },
    {
      id: 'q-git-5-3',
      question: 'How many parent commits does a standard 3-Way Merge commit have?',
      explanation: 'A merge commit ties two historical branches together, giving it two parent hashes.',
      difficulty: 'intermediate',
      topicTag: 'git',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'Two parent commits', isCorrect: true },
        { id: 'opt-b', text: 'Zero parents', isCorrect: false },
        { id: 'opt-c', text: 'Exactly one parent', isCorrect: false },
        { id: 'opt-d', text: 'Ten parents', isCorrect: false },
      ],
    },
    {
      id: 'q_git_5_auto_4',
      question: "What is the fundamental architecture of Git as taught in Lesson 5 (Merging Strategies & Fast-Forward)?",
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
      id: 'q_git_5_auto_5',
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
      id: 'q_git_5_auto_6',
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
      id: 'q_git_5_auto_7',
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
      id: 'q_git_5_auto_8',
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
      id: 'q_git_5_auto_9',
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
      id: 'q_git_5_auto_10',
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
