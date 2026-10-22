import { GitLessonDefinition } from '../../types/gitLesson';

export const lesson12: GitLessonDefinition = {
  id: 'git-lesson-12',
  number: 12,
  slug: 'production-git-workflows-and-releases',
  title: 'Production Workflows, Releases & Tags',
  shortDescription:
    'Adopt industry release models (GitHub Flow vs GitFlow), mark releases with semantic versioning tags using git tag, and automate CI/CD deployments.',
  estimatedMinutes: 35,
  learningObjectives: [
    'Contrast enterprise branching models: GitFlow vs lightweight GitHub Flow',
    'Apply Semantic Versioning (SemVer: MAJOR.MINOR.PATCH) conventions',
    'Create lightweight and annotated release tags using git tag',
    'Trigger automated GitHub Actions CI/CD release builds on tag pushes',
  ],
  prerequisites: [
    'Lesson 1-11: Complete Version Control, Branching, Merging, Remotes, and PR foundations',
  ],
  sections: [
    {
      id: 'g12-1',
      title: 'Branching Workflows: GitHub Flow vs GitFlow',
      content:
        'Software teams rely on standardized branching workflows to coordinate releases:\n\n1. GitHub Flow (Lightweight & Continuous Delivery):\n   - Anything on main is always deployable.\n   - Developers branch off main for all tasks (feature/xyz).\n   - Open a Pull Request for discussion and CI test passes.\n   - Merge into main and deploy immediately.\n\n2. GitFlow (Scheduled Releases & Enterprise):\n   - Uses permanent "main" (production) and "develop" branches.\n   - Supports explicit "release/" and "hotfix/" branches for scheduled release cadences.',
      codeExample: {
        command: `git tag -a v1.0.0 -m "Release version 1.0.0"
git tag`,
        explanation: 'git tag assigns memorable human-readable release version labels to commit hashes.',
      },
    },
    {
      id: 'g12-2',
      title: 'Semantic Versioning & Release Tagging',
      content:
        'Semantic Versioning (SemVer) follows the format MAJOR.MINOR.PATCH (e.g. v2.4.1):\n- MAJOR: Incompatible breaking API changes\n- MINOR: Backwards-compatible new features\n- PATCH: Backwards-compatible bug fixes\n\nTagging releases:\n- git tag <tagname>: Lightweight tag pointing to current commit.\n- git tag -a <tagname> -m "notes": Annotated tag storing tagger name, date, and release notes.\n- git push origin --tags: Pushes tags to GitHub, which automatically generates downloadable release tarballs and triggers CI/CD deployment pipelines.',
      codeExample: {
        command: `git tag v1.0.0
git tag`,
        explanation: 'Tags create permanent reference anchors for QA, deployments, and rollbacks.',
      },
    },
  ],
  exercises: [
    {
      id: 'g12-ex1',
      lessonId: 'git-lesson-12',
      order: 1,
      title: 'Tag the Production Release v1.0.0',
      objective:
        'Create a release tag named "v1.0.0" on the current commit using `git tag v1.0.0`, then list all tags with `git tag`.',
      initialCommands: [],
      solutionCommands: ['git tag v1.0.0', 'git tag'],
      expectedOutputSubstring: 'v1.0.0',
      expectedBranch: 'main',
      hint: 'Type `git tag v1.0.0` followed by `git tag`.',
      explanation:
        'Release tags mark milestone commits for continuous integration and semantic version tracking.',
      quickChips: ['git tag v1.0.0', 'git tag', 'git status'],
    },
    {
      id: 'g12-ex2',
      lessonId: 'git-lesson-12',
      order: 2,
      title: 'Complete Full Production Cycle and Push',
      objective:
        'Add a remote `origin`, create a patch file `release_notes.md` with `echo "Production Ready" > release_notes.md`, stage and commit it with `chore: release notes`, tag it `v1.0.1`, and push `main` to `origin`.',
      initialCommands: [],
      solutionCommands: [
        'git remote add origin https://github.com/ceeras/project.git',
        'echo "Production Ready" > release_notes.md',
        'git add release_notes.md',
        'git commit -m "chore: release notes"',
        'git tag v1.0.1',
        'git push origin main',
      ],
      expectedOutputSubstring: 'main -> main',
      expectedBranch: 'main',
      expectedCommitCount: 2,
      hint: 'Follow the steps: remote add, echo to release_notes.md, git add, git commit, git tag v1.0.1, and git push origin main.',
      explanation:
        'Congratulations on completing the entire 12-lesson Git & GitHub Curriculum!',
      quickChips: [
        'git remote add origin https://github.com/ceeras/project.git',
        'echo "Production Ready" > release_notes.md',
        'git add release_notes.md',
        'git commit -m "chore: release notes"',
        'git tag v1.0.1',
        'git push origin main',
      ],
    },
  ],
  quiz: [
    {
      id: 'q-git-12-1',
      question: 'In Semantic Versioning (SemVer: MAJOR.MINOR.PATCH), when should the MAJOR version number be incremented?',
      explanation:
        'MAJOR increments indicate breaking changes that are not backwards-compatible with existing consumers.',
      difficulty: 'intermediate',
      topicTag: 'git',
      type: 'multiple-choice',
      options: [
        {
          id: 'opt-a',
          text: 'When making incompatible, breaking API or behavioral changes',
          isCorrect: true,
        },
        {
          id: 'opt-b',
          text: 'When fixing a small typo in documentation',
          isCorrect: false,
        },
        {
          id: 'opt-c',
          text: 'Every single Monday morning',
          isCorrect: false,
        },
        {
          id: 'opt-d',
          text: 'Only when the lead architect resigns',
          isCorrect: false,
        },
      ],
    },
    {
      id: 'q-git-12-2',
      question: 'What is a core tenet of the lightweight GitHub Flow branching strategy?',
      explanation:
        'In GitHub Flow, the main branch is always production-ready and deployable at any moment.',
      difficulty: 'beginner',
      topicTag: 'git',
      type: 'multiple-choice',
      options: [
        {
          id: 'opt-a',
          text: 'Anything on the main branch is always tested, stable, and deployable to production',
          isCorrect: true,
        },
        {
          id: 'opt-b',
          text: 'Developers never write unit tests',
          isCorrect: false,
        },
        {
          id: 'opt-c',
          text: 'Code is only merged once a year',
          isCorrect: false,
        },
        {
          id: 'opt-d',
          text: 'Pull Requests are strictly prohibited',
          isCorrect: false,
        },
      ],
    },
    {
      id: 'q-git-12-3',
      question: 'Which Git command pushes all local release tags to the remote GitHub repository?',
      explanation: 'git push origin --tags transmits all created tags upstream.',
      difficulty: 'beginner',
      topicTag: 'git',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'git push origin --tags', isCorrect: true },
        { id: 'opt-b', text: 'git publish-all-tags', isCorrect: false },
        { id: 'opt-c', text: 'git tag --send-cloud', isCorrect: false },
        { id: 'opt-d', text: 'git upload tags', isCorrect: false },
      ],
    },
    {
      id: 'q_git_12_auto_4',
      question: "What is the fundamental architecture of Git as taught in Lesson 12 (Production Workflows, Releases & Tags)?",
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
      id: 'q_git_12_auto_5',
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
      id: 'q_git_12_auto_6',
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
      id: 'q_git_12_auto_7',
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
      id: 'q_git_12_auto_8',
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
      id: 'q_git_12_auto_9',
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
      id: 'q_git_12_auto_10',
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
