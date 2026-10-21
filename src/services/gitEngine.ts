import { GitCommitNode, GitGraphData } from '../types/gitLesson';

export interface GitExecutionResult {
  output: string;
  error?: string;
  graph: GitGraphData;
  executionTimeMs: number;
}

export interface InternalCommit {
  id: string;
  message: string;
  author: string;
  timestamp: string;
  parents: string[];
  tree: Record<string, string>;
}

function generateShortHash(): string {
  const chars = '0123456789abcdef';
  let hash = '';
  for (let i = 0; i < 7; i++) {
    hash += chars[Math.floor(Math.random() * chars.length)];
  }
  return hash;
}

export class GitRepo {
  isInitialized: boolean;
  workingFiles: Record<string, string>;
  stagedFiles: Record<string, string>;
  commits: Map<string, InternalCommit>;
  branches: Record<string, string>; // branchName -> commitId
  currentBranch: string;
  remotes: Record<string, { url: string; branches: Record<string, string> }>;
  stashes: { message: string; staged: Record<string, string>; working: Record<string, string> }[];
  tags: Record<string, string>; // tagName -> commitId
  author: string;

  constructor() {
    this.isInitialized = true;
    this.workingFiles = {
      'README.md': '# Project\nCeeras distributed repository initialized.\n',
      'app.py': 'def main():\n    print("Hello from Git Project!")\n',
    };
    this.stagedFiles = {};
    this.commits = new Map();
    this.branches = { main: '' };
    this.currentBranch = 'main';
    this.remotes = {};
    this.stashes = [];
    this.tags = {};
    this.author = 'Developer <dev@ceeras.org>';

    // Initial root commit
    const initialHash = 'a1b2c3d';
    const initCommit: InternalCommit = {
      id: initialHash,
      message: 'Initial project setup with README and app.py',
      author: this.author,
      timestamp: '2026-10-21 10:00:00',
      parents: [],
      tree: { ...this.workingFiles },
    };
    this.commits.set(initialHash, initCommit);
    this.branches.main = initialHash;
  }

  getHeadCommitId(): string {
    return this.branches[this.currentBranch] || '';
  }

  getHeadCommit(): InternalCommit | undefined {
    const headId = this.getHeadCommitId();
    return this.commits.get(headId);
  }

  getGraphData(): GitGraphData {
    const commitNodes: GitCommitNode[] = [];
    const headId = this.getHeadCommitId();

    for (const [id, c] of this.commits.entries()) {
      const branchTags: string[] = [];
      for (const [bName, cId] of Object.entries(this.branches)) {
        if (cId === id) {
          if (bName === this.currentBranch) {
            branchTags.push(`HEAD -> ${bName}`);
          } else {
            branchTags.push(bName);
          }
        }
      }

      for (const [rName, rInfo] of Object.entries(this.remotes)) {
        for (const [rbName, rCommitId] of Object.entries(rInfo.branches)) {
          if (rCommitId === id) {
            branchTags.push(`${rName}/${rbName}`);
          }
        }
      }

      for (const [tName, tCommitId] of Object.entries(this.tags)) {
        if (tCommitId === id) {
          branchTags.push(`tag: ${tName}`);
        }
      }

      commitNodes.push({
        id,
        message: c.message,
        author: c.author,
        timestamp: c.timestamp,
        parents: c.parents,
        branchTags,
        isHead: id === headId,
      });
    }

    const modifiedFiles: string[] = [];
    const untrackedFiles: string[] = [];
    const head = this.getHeadCommit();
    const headTree = head ? head.tree : {};

    for (const [file, content] of Object.entries(this.workingFiles)) {
      if (!headTree[file] && !this.stagedFiles[file]) {
        untrackedFiles.push(file);
      } else if (headTree[file] && headTree[file] !== content && !this.stagedFiles[file]) {
        modifiedFiles.push(file);
      }
    }

    const remotesSummary: Record<string, string> = {};
    for (const [name, info] of Object.entries(this.remotes)) {
      remotesSummary[name] = info.url;
    }

    return {
      commits: commitNodes.reverse(),
      currentBranch: this.currentBranch,
      headCommitId: headId,
      stagedFiles: Object.keys(this.stagedFiles),
      modifiedFiles,
      untrackedFiles,
      remotes: remotesSummary,
    };
  }

  execute(cmdLine: string): string {
    const trimmed = cmdLine.trim();
    if (!trimmed) return '';

    // Split words honoring quotes
    const parts: string[] = Array.from(trimmed.match(/(?:[^\s"']+|"[^"]*"|'[^']*')+/g) || []);
    const mainCmd = parts[0];
    const subCmd = parts[1];

    // Shell helpers
    if (mainCmd === 'ls') {
      return Object.keys(this.workingFiles).join('  ');
    }
    if (mainCmd === 'cat' && parts[1]) {
      const fileName = parts[1].replace(/['"]/g, '');
      return this.workingFiles[fileName] !== undefined
        ? this.workingFiles[fileName]
        : `cat: ${fileName}: No such file or directory`;
    }
    if (mainCmd === 'touch' && parts[1]) {
      const fileName = parts[1].replace(/['"]/g, '');
      if (this.workingFiles[fileName] === undefined) {
        this.workingFiles[fileName] = '';
      }
      return '';
    }
    if (mainCmd === 'echo') {
      // echo "hello" > file.txt
      const redirectIdx = parts.indexOf('>');
      if (redirectIdx !== -1 && parts[redirectIdx + 1]) {
        const textParts = parts.slice(1, redirectIdx);
        const text = textParts.join(' ').replace(/^["']|["']$/g, '');
        const targetFile = parts[redirectIdx + 1].replace(/['"]/g, '');
        this.workingFiles[targetFile] = text + '\n';
        return '';
      }
      return parts.slice(1).join(' ').replace(/^["']|["']$/g, '');
    }
    if (mainCmd === 'rm' && parts[1]) {
      const fileName = parts[1].replace(/['"]/g, '');
      delete this.workingFiles[fileName];
      return '';
    }
    if (mainCmd === 'clear') {
      return '__CLEAR__';
    }

    // Git commands
    if (mainCmd !== 'git') {
      return `bash: ${mainCmd}: command not found`;
    }

    if (!subCmd || subCmd === 'help') {
      return `usage: git [--version] [--help] <command> [<args>]

These are common Git commands used in various situations:
   init       Create an empty Git repository or reinitialize an existing one
   status     Show the working tree status
   add        Add file contents to the staging index
   commit     Record changes to the repository
   branch     List, create, or delete branches
   checkout   Switch branches or restore working tree files
   merge      Join two or more development histories together
   log        Show commit logs
   diff       Show changes between commits, commit and working tree, etc
   remote     Manage set of tracked repositories
   push       Update remote refs along with associated objects
   pull       Fetch from and integrate with another repository or a local branch
   stash      Stash the changes in a dirty working directory away`;
    }

    // git init
    if (subCmd === 'init') {
      this.isInitialized = true;
      return `Initialized empty Git repository in /home/user/project/.git/`;
    }

    // git status
    if (subCmd === 'status') {
      const lines = [`On branch ${this.currentBranch}`];
      const head = this.getHeadCommit();
      const headTree = head ? head.tree : {};

      // Check remote tracking
      const originRemote = this.remotes.origin;
      if (originRemote && originRemote.branches[this.currentBranch]) {
        if (originRemote.branches[this.currentBranch] === this.getHeadCommitId()) {
          lines.push(`Your branch is up to date with 'origin/${this.currentBranch}'.`);
        } else {
          lines.push(`Your branch is ahead of 'origin/${this.currentBranch}' by 1 commit.`);
        }
      }

      // Changes to be committed (staged)
      const stagedKeys = Object.keys(this.stagedFiles);
      if (stagedKeys.length > 0) {
        lines.push(`\nChanges to be committed:`);
        lines.push(`  (use "git restore --staged <file>..." to unstage)`);
        for (const f of stagedKeys) {
          const isNew = headTree[f] === undefined;
          lines.push(`\t${isNew ? 'new file:  ' : 'modified:  '}${f}`);
        }
      }

      // Changes not staged for commit (modified in working tree)
      const unstagedMod: string[] = [];
      const untracked: string[] = [];
      for (const [f, content] of Object.entries(this.workingFiles)) {
        if (headTree[f] && headTree[f] !== content && !this.stagedFiles[f]) {
          unstagedMod.push(f);
        } else if (!headTree[f] && !this.stagedFiles[f]) {
          untracked.push(f);
        }
      }

      if (unstagedMod.length > 0) {
        lines.push(`\nChanges not staged for commit:`);
        lines.push(`  (use "git add <file>..." to update what will be committed)`);
        for (const f of unstagedMod) {
          lines.push(`\tmodified:   ${f}`);
        }
      }

      if (untracked.length > 0) {
        lines.push(`\nUntracked files:`);
        lines.push(`  (use "git add <file>..." to include in what will be committed)`);
        for (const f of untracked) {
          lines.push(`\t${f}`);
        }
      }

      if (stagedKeys.length === 0 && unstagedMod.length === 0 && untracked.length === 0) {
        lines.push(`nothing to commit, working tree clean`);
      }

      return lines.join('\n');
    }

    // git add <files>
    if (subCmd === 'add') {
      const targets = parts.slice(2);
      if (targets.length === 0) {
        return `Nothing specified, nothing added.\nMaybe you wanted to say 'git add .'?`;
      }

      if (targets.includes('.') || targets.includes('-A') || targets.includes('--all')) {
        for (const [f, content] of Object.entries(this.workingFiles)) {
          this.stagedFiles[f] = content;
        }
        return '';
      }

      for (const t of targets) {
        const cleanTarget = t.replace(/['"]/g, '');
        if (this.workingFiles[cleanTarget] !== undefined) {
          this.stagedFiles[cleanTarget] = this.workingFiles[cleanTarget];
        } else {
          return `fatal: pathspec '${cleanTarget}' did not match any files`;
        }
      }
      return '';
    }

    // git commit -m "message"
    if (subCmd === 'commit') {
      if (Object.keys(this.stagedFiles).length === 0) {
        return `On branch ${this.currentBranch}\nnothing to commit, working tree clean`;
      }

      let message = 'Update commit';
      const mIdx = parts.indexOf('-m');
      if (mIdx !== -1 && parts[mIdx + 1]) {
        message = parts.slice(mIdx + 1).join(' ').replace(/^["']|["']$/g, '');
      }

      const newHash = generateShortHash();
      const parentId = this.getHeadCommitId();
      const parentCommit = this.commits.get(parentId);
      const newTree: Record<string, string> = parentCommit ? { ...parentCommit.tree } : {};

      for (const [f, c] of Object.entries(this.stagedFiles)) {
        newTree[f] = c;
      }

      const commitObj: InternalCommit = {
        id: newHash,
        message,
        author: this.author,
        timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
        parents: parentId ? [parentId] : [],
        tree: newTree,
      };

      this.commits.set(newHash, commitObj);
      this.branches[this.currentBranch] = newHash;
      this.stagedFiles = {}; // clear index

      return `[${this.currentBranch} ${newHash}] ${message}\n ${Object.keys(newTree).length} files changed`;
    }

    // git branch [name]
    if (subCmd === 'branch') {
      const branchName = parts[2];
      if (!branchName) {
        // List branches
        const lines: string[] = [];
        for (const b of Object.keys(this.branches)) {
          if (b === this.currentBranch) {
            lines.push(`* ${b}`);
          } else {
            lines.push(`  ${b}`);
          }
        }
        return lines.join('\n');
      }

      if (parts[2] === '-d' || parts[2] === '-D') {
        const delBranch = parts[3];
        if (!delBranch) return `error: branch name required`;
        if (delBranch === this.currentBranch) {
          return `error: Cannot delete branch '${delBranch}' checked out at current directory`;
        }
        if (this.branches[delBranch]) {
          delete this.branches[delBranch];
          return `Deleted branch ${delBranch} (was ${this.branches[delBranch] || 'HEAD'}).`;
        }
        return `error: branch '${delBranch}' not found.`;
      }

      // Create branch
      const cleanBranch = branchName.replace(/['"]/g, '');
      if (this.branches[cleanBranch]) {
        return `fatal: A branch named '${cleanBranch}' already exists.`;
      }
      this.branches[cleanBranch] = this.getHeadCommitId();
      return '';
    }

    // git checkout <branch> / git checkout -b <branch>
    if (subCmd === 'checkout' || subCmd === 'switch') {
      const isCreate = parts.includes('-b') || parts.includes('-c');
      const targetBranch = isCreate ? parts[3] : parts[2];

      if (!targetBranch) {
        return `fatal: you must specify a branch to checkout`;
      }

      const cleanBranch = targetBranch.replace(/['"]/g, '');

      if (isCreate) {
        if (this.branches[cleanBranch]) {
          return `fatal: a branch named '${cleanBranch}' already exists`;
        }
        this.branches[cleanBranch] = this.getHeadCommitId();
        this.currentBranch = cleanBranch;
        return `Switched to a new branch '${cleanBranch}'`;
      }

      if (!this.branches[cleanBranch]) {
        return `error: pathspec '${cleanBranch}' did not match any file(s) known to git`;
      }

      this.currentBranch = cleanBranch;
      const commit = this.commits.get(this.branches[cleanBranch]);
      if (commit) {
        this.workingFiles = { ...commit.tree };
      }
      return `Switched to branch '${cleanBranch}'`;
    }

    // git merge <branch>
    if (subCmd === 'merge') {
      const sourceBranch = parts[2];
      if (!sourceBranch) return `fatal: specify a branch to merge`;

      const cleanSource = sourceBranch.replace(/['"]/g, '');
      if (!this.branches[cleanSource]) {
        return `merge: ${cleanSource} - not something we can merge`;
      }

      if (cleanSource === this.currentBranch) {
        return `Already up to date.`;
      }

      const currentHeadId = this.getHeadCommitId();
      const sourceHeadId = this.branches[cleanSource];

      if (currentHeadId === sourceHeadId) {
        return `Already up to date.`;
      }

      const sourceCommit = this.commits.get(sourceHeadId);
      const currentCommit = this.commits.get(currentHeadId);

      // Create merge commit
      const newHash = generateShortHash();
      const mergedTree = { ...currentCommit?.tree, ...sourceCommit?.tree };

      const mergeCommitObj: InternalCommit = {
        id: newHash,
        message: `Merge branch '${cleanSource}' into ${this.currentBranch}`,
        author: this.author,
        timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
        parents: [currentHeadId, sourceHeadId],
        tree: mergedTree,
      };

      this.commits.set(newHash, mergeCommitObj);
      this.branches[this.currentBranch] = newHash;
      this.workingFiles = { ...mergedTree };

      return `Merge made by the 'ort' strategy.\n [${this.currentBranch} ${newHash}] Merge branch '${cleanSource}' into ${this.currentBranch}`;
    }

    // git log
    if (subCmd === 'log') {
      const isOneLine = parts.includes('--oneline');
      const lines: string[] = [];

      for (const [, c] of this.commits.entries()) {
        if (isOneLine) {
          lines.push(`${c.id} ${c.message}`);
        } else {
          lines.push(`commit ${c.id}`);
          lines.push(`Author: ${c.author}`);
          lines.push(`Date:   ${c.timestamp}`);
          lines.push(`\n    ${c.message}\n`);
        }
      }
      return lines.reverse().join('\n');
    }

    // git diff
    if (subCmd === 'diff') {
      const isStaged = parts.includes('--staged') || parts.includes('--cached');
      const head = this.getHeadCommit();
      const headTree = head ? head.tree : {};
      const diffLines: string[] = [];

      if (isStaged) {
        for (const [f, content] of Object.entries(this.stagedFiles)) {
          const old = headTree[f] || '';
          diffLines.push(`diff --git a/${f} b/${f}`);
          diffLines.push(`--- a/${f}`);
          diffLines.push(`+++ b/${f}`);
          diffLines.push(`- ${old.trim()}`);
          diffLines.push(`+ ${content.trim()}`);
        }
      } else {
        for (const [f, content] of Object.entries(this.workingFiles)) {
          const staged = this.stagedFiles[f] !== undefined ? this.stagedFiles[f] : headTree[f] || '';
          if (staged !== content) {
            diffLines.push(`diff --git a/${f} b/${f}`);
            diffLines.push(`--- a/${f}`);
            diffLines.push(`+++ b/${f}`);
            diffLines.push(`- ${staged.trim()}`);
            diffLines.push(`+ ${content.trim()}`);
          }
        }
      }

      return diffLines.length > 0 ? diffLines.join('\n') : '';
    }

    // git remote
    if (subCmd === 'remote') {
      if (parts[2] === 'add') {
        const remoteName = parts[3];
        const remoteUrl = parts[4];
        if (!remoteName || !remoteUrl) return `usage: git remote add <name> <url>`;
        this.remotes[remoteName] = { url: remoteUrl, branches: {} };
        return '';
      }
      if (parts.includes('-v')) {
        const lines: string[] = [];
        for (const [name, info] of Object.entries(this.remotes)) {
          lines.push(`${name}\t${info.url} (fetch)`);
          lines.push(`${name}\t${info.url} (push)`);
        }
        return lines.join('\n');
      }
      return Object.keys(this.remotes).join('\n');
    }

    // git push
    if (subCmd === 'push') {
      const remoteName = parts[2] || 'origin';
      const branchName = parts[3] || this.currentBranch;

      if (!this.remotes[remoteName]) {
        return `fatal: '${remoteName}' does not appear to be a git repository`;
      }

      const headId = this.branches[branchName];
      if (!headId) {
        return `error: src refspec ${branchName} does not match any`;
      }

      this.remotes[remoteName].branches[branchName] = headId;
      return `Enumerating objects: 5, done.\nCounting objects: 100% (5/5), done.\nWriting objects: 100% (3/3), done.\nTo ${this.remotes[remoteName].url}\n * [new branch]      ${branchName} -> ${branchName}`;
    }

    // git pull
    if (subCmd === 'pull') {
      return `Already up to date.`;
    }

    // git stash
    if (subCmd === 'stash') {
      if (parts[2] === 'pop') {
        const st = this.stashes.pop();
        if (!st) return `No stash entries found.`;
        this.workingFiles = { ...this.workingFiles, ...st.working };
        this.stagedFiles = { ...this.stagedFiles, ...st.staged };
        return `Dropped stash@{0} (${st.message})`;
      }
      if (parts[2] === 'list') {
        return this.stashes.map((s, i) => `stash@{${i}}: ${s.message}`).join('\n');
      }

      // Save to stash
      const stashMsg = `WIP on ${this.currentBranch}: ${this.getHeadCommitId()}`;
      this.stashes.push({
        message: stashMsg,
        working: { ...this.workingFiles },
        staged: { ...this.stagedFiles },
      });
      // Revert working tree to HEAD
      const head = this.getHeadCommit();
      if (head) {
        this.workingFiles = { ...head.tree };
        this.stagedFiles = {};
      }
      return `Saved working directory and index state ${stashMsg}`;
    }

    // git tag
    if (subCmd === 'tag') {
      const tagName = parts[2];
      if (!tagName) {
        return Object.keys(this.tags).join('\n');
      }
      this.tags[tagName] = this.getHeadCommitId();
      return '';
    }

    // git reset
    if (subCmd === 'reset') {
      if (parts.includes('--hard')) {
        const head = this.getHeadCommit();
        if (head) {
          this.workingFiles = { ...head.tree };
          this.stagedFiles = {};
        }
        return `HEAD is now at ${this.getHeadCommitId()}`;
      }
      this.stagedFiles = {};
      return `Unstaged changes after reset:`;
    }

    return `git: '${subCmd}' is not a git command. See 'git --help'.`;
  }
}

/**
 * Execute a series of commands inside a Git repository sandbox
 */
export function executeGitScript(commandLines: string | string[], repoInstance?: GitRepo): GitExecutionResult {
  const startTime = performance.now();
  const repo = repoInstance || new GitRepo();
  const lines = Array.isArray(commandLines) ? commandLines : commandLines.trim().split('\n');

  const outputs: string[] = [];

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;

    const res = repo.execute(trimmed);
    if (res === '__CLEAR__') {
      outputs.length = 0;
    } else if (res) {
      outputs.push(res);
    }
  }

  const elapsed = Math.round(performance.now() - startTime);

  return {
    output: outputs.join('\n'),
    graph: repo.getGraphData(),
    executionTimeMs: elapsed,
  };
}
