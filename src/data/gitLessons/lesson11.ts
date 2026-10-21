import { GitLessonDefinition } from '../../types/gitLesson';

export const lesson11: GitLessonDefinition = {
  id: 'git-lesson-11',
  number: 11,
  slug: 'rebasing-cherry-picking-and-clean-history',
  title: 'Rebasing, Cherry-Picking & Clean History',
  shortDescription:
    'Maintain a clean linear commit graph with git rebase, understand the Golden Rule of Rebasing, and selectively port commits with git cherry-pick.',
  estimatedMinutes: 30,
  learningObjectives: [
    'Understand how git rebase rewrites the base of a feature branch onto another commit',
    'Compare linear rebase histories vs branched merge bubble graphs',
    'Memorize the Golden Rule of Rebasing: Never rebase public shared branches',
    'Apply specific isolated commits across branches using git cherry-pick <hash>',
  ],
  prerequisites: ['Lesson 10: Pull Requests & Reviews'],
  sections: [
    {
      id: 'g11-1',
      title: 'Linear History: git rebase',
      content:
        'When working on a feature branch while main advances, you can integrate upstream changes in two ways:\n1. git merge main: Creates a merge commit, preserving the branch divergency bubbles.\n2. git rebase main: Replays your feature commits directly on top of the newest main commit, rewriting commit hashes to create a clean, linear, straight-line history.\n\nLinear histories make git bisect (debugging which commit broke a build) and changelog generation significantly simpler.',
      codeExample: {
        command: `git checkout feature/api
git rebase main`,
        explanation: 'rebase moves the entire feature branch starting point to the tip of main.',
      },
    },
    {
      id: 'g11-2',
      title: 'The Golden Rule of Rebasing & Cherry-Pick',
      content:
        'The Golden Rule of Rebasing:\n"Never rebase a branch that has been pushed to a public repository and is shared with other developers."\nBecause rebasing rewrites commit hashes, teammates who branched off old hashes will experience painful reconciliation errors.\n\nSelective Porting with git cherry-pick:\ngit cherry-pick <commit-hash> applies the exact changes from one specific commit onto your current HEAD branch without merging the rest of the branch.',
      codeExample: {
        command: `git checkout main
git cherry-pick a1b2c3d`,
        explanation: 'cherry-pick duplicates and applies a single isolated bug fix or feature commit.',
      },
    },
  ],
  exercises: [
    {
      id: 'g11-ex1',
      lessonId: 'git-lesson-11',
      order: 1,
      title: 'Create Divergent Branch History',
      objective:
        'Create a branch "feature/hotfix" with `git checkout -b feature/hotfix`. Create `patch.py` with `echo "HOTFIX" > patch.py`, stage and commit it with `fix: urgent patch`. Verify with `git log --oneline`.',
      initialCommands: [],
      solutionCommands: [
        'git checkout -b feature/hotfix',
        'echo "HOTFIX" > patch.py',
        'git add patch.py',
        'git commit -m "fix: urgent patch"',
        'git log --oneline',
      ],
      expectedOutputSubstring: 'fix: urgent patch',
      expectedBranch: 'feature/hotfix',
      expectedCommitCount: 2,
      hint: 'Create and checkout feature/hotfix, write patch.py, stage and commit.',
      explanation:
        'The patch commit is now isolated on the hotfix branch.',
      quickChips: [
        'git checkout -b feature/hotfix',
        'echo "HOTFIX" > patch.py',
        'git add patch.py',
        'git commit -m "fix: urgent patch"',
      ],
    },
    {
      id: 'g11-ex2',
      lessonId: 'git-lesson-11',
      order: 2,
      title: 'Merge Hotfix into Main Line',
      objective:
        'Switch back to "main" using `git checkout main`, and merge the "feature/hotfix" branch with `git merge feature/hotfix`.',
      initialCommands: [
        'git checkout -b feature/hotfix',
        'echo "HOTFIX" > patch.py',
        'git add patch.py',
        'git commit -m "fix: urgent patch"',
      ],
      solutionCommands: [
        'git checkout main',
        'git merge feature/hotfix',
      ],
      expectedOutputSubstring: 'Merge branch',
      expectedBranch: 'main',
      expectedCommitCount: 3,
      hint: 'Run `git checkout main` followed by `git merge feature/hotfix`.',
      explanation:
        'The hotfix is integrated into main, updating production code.',
      quickChips: [
        'git checkout main',
        'git merge feature/hotfix',
        'git log --oneline',
      ],
    },
  ],
  quiz: [
    {
      id: 'q-git-11-1',
      question: 'What is the Golden Rule of Rebasing?',
      explanation:
        'Never rebase branches that have been pushed publicly and are being used by other collaborators, as it rewrites commit hashes.',
      difficulty: 'intermediate',
      topicTag: 'git',
      type: 'multiple-choice',
      options: [
        {
          id: 'opt-a',
          text: 'Never rebase public, shared branches because it rewrites commit history',
          isCorrect: true,
        },
        {
          id: 'opt-b',
          text: 'Always rebase every 5 minutes',
          isCorrect: false,
        },
        {
          id: 'opt-c',
          text: 'Never use git rebase on Linux operating systems',
          isCorrect: false,
        },
        {
          id: 'opt-d',
          text: 'Only rebase files larger than 100 megabytes',
          isCorrect: false,
        },
      ],
    },
    {
      id: 'q-git-11-2',
      question: 'What is the primary benefit of rebasing a feature branch instead of merging?',
      explanation:
        'Rebasing creates a clean, linear, straight-line commit history without unnecessary merge bubbles.',
      difficulty: 'intermediate',
      topicTag: 'git',
      type: 'multiple-choice',
      options: [
        {
          id: 'opt-a',
          text: 'It produces a clean, linear commit history without merge commit bubbles',
          isCorrect: true,
        },
        {
          id: 'opt-b',
          text: 'It automatically fixes syntax errors in Python code',
          isCorrect: false,
        },
        {
          id: 'opt-c',
          text: 'It compresses image files',
          isCorrect: false,
        },
        {
          id: 'opt-d',
          text: 'It bypasses all GitHub security rules',
          isCorrect: false,
        },
      ],
    },
    {
      id: 'q-git-11-3',
      question: 'What does git cherry-pick <commit-hash> do?',
      explanation: 'It applies the changes introduced by a specific single commit onto your currently checked-out HEAD branch.',
      difficulty: 'advanced',
      topicTag: 'git',
      type: 'multiple-choice',
      options: [
        {
          id: 'opt-a',
          text: 'Applies the changes from a single specific commit onto your current branch',
          isCorrect: true,
        },
        {
          id: 'opt-b',
          text: 'Deletes the specified commit from history permanently',
          isCorrect: false,
        },
        {
          id: 'opt-c',
          text: 'Creates a fruit diagram in SVG format',
          isCorrect: false,
        },
        {
          id: 'opt-d',
          text: 'Restores all deleted branches',
          isCorrect: false,
        },
      ],
    },
  ],
};
