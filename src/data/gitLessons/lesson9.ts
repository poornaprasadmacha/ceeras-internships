import { GitLessonDefinition } from '../../types/gitLesson';

export const lesson9: GitLessonDefinition = {
  id: 'git-lesson-9',
  number: 9,
  slug: 'remotes-and-github-synchronization',
  title: 'Remotes & GitHub Synchronization',
  shortDescription:
    'Link local repositories to remote GitHub servers, publish commits with git push, and synchronize changes with git fetch and git pull.',
  estimatedMinutes: 30,
  learningObjectives: [
    'Add and inspect remote server URLs using git remote add and git remote -v',
    'Publish local branch commits to GitHub using git push -u origin <branch>',
    'Download remote commits without merging using git fetch',
    'Fetch and merge remote updates in a single step using git pull',
  ],
  prerequisites: ['Lesson 8: Stashing & Workspace Hygiene'],
  sections: [
    {
      id: 'g9-1',
      title: 'Connecting Local Git to Remote GitHub',
      content:
        'A remote repository is an instance of your project hosted on the internet (such as GitHub, GitLab, or Bitbucket).\n\nConnecting a local project to GitHub:\n1. git remote add <name> <url>: Links a remote name (conventionally "origin") to a repository URL.\n2. git remote -v: Lists registered remotes and their fetch/push endpoints.\n\nRemote repositories enable distributed collaboration across global engineering teams.',
      codeExample: {
        command: `git remote add origin https://github.com/ceeras/project.git
git remote -v`,
        explanation: 'The remote URL provides the destination endpoint for pushing and pulling commits.',
      },
    },
    {
      id: 'g9-2',
      title: 'Pushing and Pulling: push, fetch, and pull',
      content:
        'Synchronizing with remotes:\n- git push origin <branch>: Sends your local commits to the remote branch.\n- git fetch origin: Downloads new commits, branches, and tags from the remote without modifying your working tree.\n- git pull origin <branch>: Shorthand for git fetch followed by git merge, updating your current branch with remote changes.',
      codeExample: {
        command: `git push origin main
git pull`,
        explanation: 'push sends your work upstream; pull downloads teammates commits.',
      },
    },
  ],
  exercises: [
    {
      id: 'g9-ex1',
      lessonId: 'git-lesson-9',
      order: 1,
      title: 'Add a GitHub Remote Origin',
      objective:
        'Link your repository to GitHub by adding a remote named "origin" with URL "https://github.com/ceeras/project.git". Verify with `git remote -v`.',
      initialCommands: [],
      solutionCommands: [
        'git remote add origin https://github.com/ceeras/project.git',
        'git remote -v',
      ],
      expectedOutputSubstring: 'origin\thttps://github.com/ceeras/project.git',
      expectedBranch: 'main',
      hint: 'Type `git remote add origin https://github.com/ceeras/project.git` followed by `git remote -v`.',
      explanation:
        'The remote is now registered and ready to receive pushed commits.',
      quickChips: [
        'git remote add origin https://github.com/ceeras/project.git',
        'git remote -v',
      ],
    },
    {
      id: 'g9-ex2',
      lessonId: 'git-lesson-9',
      order: 2,
      title: 'Push Main Branch to Origin Remote',
      objective:
        'Push the local "main" branch to the remote repository using `git push origin main`.',
      initialCommands: [
        'git remote add origin https://github.com/ceeras/project.git',
      ],
      solutionCommands: ['git push origin main'],
      expectedOutputSubstring: 'main -> main',
      expectedBranch: 'main',
      hint: 'Run `git push origin main` and press Enter.',
      explanation:
        'Pushed commits are transmitted upstream, updating the origin/main remote tracking reference.',
      quickChips: ['git push origin main', 'git status'],
    },
  ],
  quiz: [
    {
      id: 'q-git-9-1',
      question: 'What is the default conventional name given to the primary remote server repository?',
      explanation: 'origin is the standard default alias Git uses for primary remotes.',
      difficulty: 'beginner',
      topicTag: 'git',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'origin', isCorrect: true },
        { id: 'opt-b', text: 'upstream_cloud', isCorrect: false },
        { id: 'opt-c', text: 'github_server', isCorrect: false },
        { id: 'opt-d', text: 'root', isCorrect: false },
      ],
    },
    {
      id: 'q-git-9-2',
      question: 'What is the crucial difference between git fetch and git pull?',
      explanation:
        'git fetch only downloads objects from the remote without touching your working tree; git pull downloads AND merges them immediately.',
      difficulty: 'intermediate',
      topicTag: 'git',
      type: 'multiple-choice',
      options: [
        {
          id: 'opt-a',
          text: 'git fetch downloads commits without altering your working tree, while git pull downloads and automatically merges them',
          isCorrect: true,
        },
        {
          id: 'opt-b',
          text: 'git fetch is only for audio files',
          isCorrect: false,
        },
        {
          id: 'opt-c',
          text: 'git pull deletes local branches',
          isCorrect: false,
        },
        {
          id: 'opt-d',
          text: 'There is no difference; they are exact aliases',
          isCorrect: false,
        },
      ],
    },
    {
      id: 'q-git-9-3',
      question: 'Which command uploads local commits to the remote repository on GitHub?',
      explanation: 'git push transmits commits to the remote server.',
      difficulty: 'beginner',
      topicTag: 'git',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'git push', isCorrect: true },
        { id: 'opt-b', text: 'git upload', isCorrect: false },
        { id: 'opt-c', text: 'git transmit', isCorrect: false },
        { id: 'opt-d', text: 'git sync --up', isCorrect: false },
      ],
    },
    {
      id: 'q_git_9_auto_4',
      question: "What is the fundamental architecture of Git as taught in Lesson 9 (Remotes & GitHub Synchronization)?",
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
      id: 'q_git_9_auto_5',
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
      id: 'q_git_9_auto_6',
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
      id: 'q_git_9_auto_7',
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
      id: 'q_git_9_auto_8',
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
      id: 'q_git_9_auto_9',
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
      id: 'q_git_9_auto_10',
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
