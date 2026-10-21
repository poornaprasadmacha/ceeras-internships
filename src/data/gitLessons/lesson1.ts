import { GitLessonDefinition } from '../../types/gitLesson';

export const lesson1: GitLessonDefinition = {
  id: 'git-lesson-1',
  number: 1,
  slug: 'version-control-fundamentals-and-git-architecture',
  title: 'Version Control & Git Architecture',
  shortDescription:
    'Understand distributed version control, the internal 3-stage architecture of Git (Working Tree, Index, Repository), and SHA-1 snapshot hashes.',
  estimatedMinutes: 25,
  learningObjectives: [
    'Differentiate between Centralized (SVN) and Distributed (Git) version control systems',
    'Master the 3 stages: Working Directory, Staging Area (Index), and Local Repository',
    'Understand how Git models project history as a Directed Acyclic Graph (DAG) of immutable snapshots',
    'Inspect initial repository status using git status',
  ],
  prerequisites: ['Basic command line familiarity'],
  sections: [
    {
      id: 'g1-1',
      title: 'Distributed Version Control vs Centralized Systems',
      content:
        'Version Control Systems (VCS) record changes to files over time so specific versions can be recalled later.\n\nOlder systems like Subversion (SVN) were centralized: developers checked out code from a single central server. If the server was down or offline, nobody could commit or view history.\n\nGit is distributed: every developer clones a full copy of the entire repository history locally. Commits, branch creation, diffs, and log reviews happen entirely offline at lightning speed.',
      codeExample: {
        command: `git --version
git status`,
        explanation: 'git status displays the current branch and state of the working directory and index.',
      },
    },
    {
      id: 'g1-2',
      title: 'The Three Stages of Git',
      content:
        'A Git project resides across three distinct stages:\n1. Working Directory: The physical files you edit on your disk.\n2. Staging Area (Index): A binary cache file (.git/index) that stages snapshots ready for the next commit.\n3. Local Repository: The permanent database (.git/objects) where commits are stored as compressed, immutable DAG nodes indexed by cryptographic hashes.',
      codeExample: {
        command: `echo "Release notes" > notes.txt
git status`,
        explanation: 'Creating a file places it in the working tree as an untracked file.',
      },
    },
  ],
  exercises: [
    {
      id: 'g1-ex1',
      lessonId: 'git-lesson-1',
      order: 1,
      title: 'Inspect Initial Repository State',
      objective:
        'Run "git status" to inspect the active branch and verify that the working tree is clean.',
      initialCommands: [],
      solutionCommands: ['git status'],
      expectedOutputSubstring: 'On branch main',
      expectedBranch: 'main',
      hint: 'Type "git status" and hit Enter.',
      explanation:
        'git status is the fundamental diagnostic tool in Git, showing the branch and file tracking status.',
      quickChips: ['git status', 'git log --oneline'],
    },
    {
      id: 'g1-ex2',
      lessonId: 'git-lesson-1',
      order: 2,
      title: 'Create an Untracked File in Working Tree',
      objective:
        'Create a new file named "notes.txt" using echo or touch, and run "git status" to observe the untracked file section.',
      initialCommands: [],
      solutionCommands: ['echo "Sprint notes" > notes.txt', 'git status'],
      expectedOutputSubstring: 'Untracked files:',
      expectedBranch: 'main',
      hint: 'Type `echo "Sprint notes" > notes.txt` followed by `git status`.',
      explanation:
        'New files exist strictly in your working directory until explicitly added to the Git staging index.',
      quickChips: ['echo "Sprint notes" > notes.txt', 'git status'],
    },
  ],
  quiz: [
    {
      id: 'q-git-1-1',
      question: 'What is the key advantage of a Distributed Version Control System like Git over a Centralized VCS?',
      explanation:
        'Every developer holds a complete local copy of the full repository history, allowing offline operations and distributed backups.',
      difficulty: 'beginner',
      topicTag: 'git',
      type: 'multiple-choice',
      options: [
        {
          id: 'opt-a',
          text: 'Every clone contains the complete repository history, allowing full offline commits and branching',
          isCorrect: true,
        },
        {
          id: 'opt-b',
          text: 'It requires continuous high-speed internet connection to record any change',
          isCorrect: false,
        },
        {
          id: 'opt-c',
          text: 'It only works with Python programming language',
          isCorrect: false,
        },
        {
          id: 'opt-d',
          text: 'It automatically deletes older commits after 30 days',
          isCorrect: false,
        },
      ],
    },
    {
      id: 'q-git-1-2',
      question: 'Which of the three Git stages holds changes that have been marked to be included in the next commit?',
      explanation:
        'The Staging Area (or Index) holds snapshots prepared for the next commit.',
      difficulty: 'beginner',
      topicTag: 'git',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'The Staging Area (Index)', isCorrect: true },
        { id: 'opt-b', text: 'The Working Directory', isCorrect: false },
        { id: 'opt-c', text: 'The Remote GitHub Cloud', isCorrect: false },
        { id: 'opt-d', text: 'The Operating System Recycle Bin', isCorrect: false },
      ],
    },
    {
      id: 'q-git-1-3',
      question: 'How does Git internally represent commit versions?',
      explanation:
        'Git stores each commit as an immutable snapshot in a Directed Acyclic Graph (DAG) identified by a hash.',
      difficulty: 'intermediate',
      topicTag: 'git',
      type: 'multiple-choice',
      options: [
        {
          id: 'opt-a',
          text: 'As immutable snapshot nodes in a Directed Acyclic Graph (DAG) indexed by cryptographic hashes',
          isCorrect: true,
        },
        {
          id: 'opt-b',
          text: 'As a single zip file rewritten on every commit',
          isCorrect: false,
        },
        {
          id: 'opt-c',
          text: 'As plain text Word documents',
          isCorrect: false,
        },
        {
          id: 'opt-d',
          text: 'As simple line numbers in a global ledger',
          isCorrect: false,
        },
      ],
    },
  ],
};
