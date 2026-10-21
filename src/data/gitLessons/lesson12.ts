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
  ],
};
