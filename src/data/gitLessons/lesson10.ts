import { GitLessonDefinition } from '../../types/gitLesson';

export const lesson10: GitLessonDefinition = {
  id: 'git-lesson-10',
  number: 10,
  slug: 'pull-requests-code-reviews-and-collaboration',
  title: 'Pull Requests, Reviews & Collaboration',
  shortDescription:
    'Master the GitHub Pull Request (PR) workflow, peer code reviews, CI/CD automated checks, and branch protection rules.',
  estimatedMinutes: 30,
  learningObjectives: [
    'Understand the Pull Request (PR) lifecycle: compare branch vs base branch',
    'Write informative PR descriptions with screenshots, context, and issue references (#123)',
    'Conduct peer code reviews with inline comments and change requests',
    'Understand merge strategies on GitHub: Create a Merge Commit, Squash and Merge, and Rebase and Merge',
  ],
  prerequisites: ['Lesson 9: Remotes & GitHub Synchronization'],
  sections: [
    {
      id: 'g10-1',
      title: 'The Pull Request (PR) Paradigm',
      content:
        'A Pull Request (PR) is a collaborative GitHub mechanism where a developer proposes that changes from a feature branch be merged into the base branch (usually main).\n\nA PR provides:\n1. A dedicated diff viewer highlighting exact line changes.\n2. A discussion timeline for teammates to ask questions and suggest revisions.\n3. Automated CI/CD check integration (unit tests, linters, security scanners).\n\nNever push directly to main in team environments; always propose changes through a PR.',
      codeExample: {
        command: `git checkout -b feature/user-profile
echo "profile code" > profile.py
git add profile.py
git commit -m "feat: user profile screen"
git push origin feature/user-profile`,
        explanation: 'Pushing the feature branch upstream enables opening a Pull Request on GitHub.',
      },
    },
    {
      id: 'g10-2',
      title: 'Merging Pull Requests on GitHub',
      content:
        'GitHub offers three ways to merge an approved PR:\n\n1. Create a Merge Commit: Preserves every individual commit made on the branch, tying them together with a merge commit node.\n\n2. Squash and Merge: Combines all commits on the feature branch into a single clean commit on main, keeping main history compact.\n\n3. Rebase and Merge: Re-applies individual feature commits directly onto the tip of main without a merge commit, creating a linear history.',
      codeExample: {
        command: `git checkout main
git pull origin main`,
        explanation: 'Once merged on GitHub, teammates pull down the latest merged main branch.',
      },
    },
  ],
  exercises: [
    {
      id: 'g10-ex1',
      lessonId: 'git-lesson-10',
      order: 1,
      title: 'Prepare Feature Branch for Pull Request',
      objective:
        'Create a new branch "feature/billing", commit a new file "billing.py" with `echo "def bill(): pass" > billing.py`, stage and commit it with `feat: add billing module`.',
      initialCommands: [
        'git remote add origin https://github.com/ceeras/project.git',
      ],
      solutionCommands: [
        'git checkout -b feature/billing',
        'echo "def bill(): pass" > billing.py',
        'git add billing.py',
        'git commit -m "feat: add billing module"',
      ],
      expectedOutputSubstring: 'feat: add billing module',
      expectedBranch: 'feature/billing',
      expectedCommitCount: 2,
      hint: 'Run `git checkout -b feature/billing`, then create, stage, and commit billing.py.',
      explanation:
        'Branch isolation ensures features are fully reviewed before merging into the main branch.',
      quickChips: [
        'git checkout -b feature/billing',
        'echo "def bill(): pass" > billing.py',
        'git add billing.py',
        'git commit -m "feat: add billing module"',
      ],
    },
    {
      id: 'g10-ex2',
      lessonId: 'git-lesson-10',
      order: 2,
      title: 'Push Feature Branch to Remote for PR',
      objective:
        'Publish the "feature/billing" branch to the remote origin using `git push origin feature/billing`.',
      initialCommands: [
        'git remote add origin https://github.com/ceeras/project.git',
        'git checkout -b feature/billing',
        'echo "def bill(): pass" > billing.py',
        'git add billing.py',
        'git commit -m "feat: add billing module"',
      ],
      solutionCommands: ['git push origin feature/billing'],
      expectedOutputSubstring: 'feature/billing -> feature/billing',
      expectedBranch: 'feature/billing',
      hint: 'Type `git push origin feature/billing` and press Enter.',
      explanation:
        'Pushing the branch upstream allows collaborators to review the diff and open a Pull Request.',
      quickChips: [
        'git push origin feature/billing',
        'git status',
      ],
    },
  ],
  quiz: [
    {
      id: 'q-git-10-1',
      question: 'What is the primary objective of a GitHub Pull Request (PR)?',
      explanation:
        'A PR facilitates code review, automated testing, and team discussion before integrating code into main.',
      difficulty: 'beginner',
      topicTag: 'git',
      type: 'multiple-choice',
      options: [
        {
          id: 'opt-a',
          text: 'To propose, review, and discuss code changes before merging them into a target branch',
          isCorrect: true,
        },
        {
          id: 'opt-b',
          text: 'To request financial donations for open source projects',
          isCorrect: false,
        },
        {
          id: 'opt-c',
          text: 'To delete unused repositories automatically',
          isCorrect: false,
        },
        {
          id: 'opt-d',
          text: 'To convert Python code to Markdown documentation',
          isCorrect: false,
        },
      ],
    },
    {
      id: 'q-git-10-2',
      question: 'What does "Squash and Merge" do on GitHub?',
      explanation:
        'It condenses all commits from a feature branch into a single unified commit on the base branch.',
      difficulty: 'intermediate',
      topicTag: 'git',
      type: 'multiple-choice',
      options: [
        {
          id: 'opt-a',
          text: 'Combines all commits from the PR into a single commit on the base branch',
          isCorrect: true,
        },
        {
          id: 'opt-b',
          text: 'Deletes all tests in the repository',
          isCorrect: false,
        },
        {
          id: 'opt-c',
          text: 'Splits each line of code into a separate commit',
          isCorrect: false,
        },
        {
          id: 'opt-d',
          text: 'Encrypts the branch with SSL certificates',
          isCorrect: false,
        },
      ],
    },
    {
      id: 'q-git-10-3',
      question: 'What is a GitHub Branch Protection Rule?',
      explanation:
        'A security policy requiring passing tests, approvals, and preventing direct pushes or force pushes to critical branches.',
      difficulty: 'intermediate',
      topicTag: 'git',
      type: 'multiple-choice',
      options: [
        {
          id: 'opt-a',
          text: 'A policy enforcing peer approvals and passing CI tests before code can merge into main',
          isCorrect: true,
        },
        {
          id: 'opt-b',
          text: 'A physical lock on the server rack',
          isCorrect: false,
        },
        {
          id: 'opt-c',
          text: 'A feature that prevents developers from typing comments',
          isCorrect: false,
        },
        {
          id: 'opt-d',
          text: 'A firewall blocking internet access',
          isCorrect: false,
        },
      ],
    },
    {
      id: 'q_git_10_auto_4',
      question: "What is the fundamental architecture of Git as taught in Lesson 10 (Pull Requests, Reviews & Collaboration)?",
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
      id: 'q_git_10_auto_5',
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
      id: 'q_git_10_auto_6',
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
      id: 'q_git_10_auto_7',
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
      id: 'q_git_10_auto_8',
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
      id: 'q_git_10_auto_9',
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
      id: 'q_git_10_auto_10',
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
