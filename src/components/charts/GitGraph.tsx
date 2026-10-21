import React, { useState } from 'react';
import { GitGraphData, GitCommitNode } from '../../types/gitLesson';
import {
  GitBranch,
  GitCommit,
  Layers,
  FileText,
  FolderGit2,
  CheckCircle2,
  Clock,
  ArrowRight,
  Info,
} from 'lucide-react';

interface GitGraphProps {
  data: GitGraphData;
  className?: string;
}

export function GitGraph({ data, className = '' }: GitGraphProps) {
  const [selectedCommit, setSelectedCommit] = useState<GitCommitNode | null>(null);

  const { commits, currentBranch, stagedFiles, modifiedFiles, untrackedFiles, remotes } = data;

  return (
    <div className={`flex flex-col bg-subtle/50 rounded-xl border border-border overflow-hidden shadow-xs ${className}`}>
      {/* 3-Stage Architecture Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-border bg-surface/70 border-b border-border text-xs">
        {/* Stage 1: Working Directory */}
        <div className="p-3 space-y-1.5">
          <div className="flex items-center justify-between text-text-muted">
            <span className="font-semibold text-text-main flex items-center gap-1.5">
              <FolderGit2 className="w-3.5 h-3.5 text-amber-500" />
              Working Directory
            </span>
            <span className="font-mono text-[11px]">
              {modifiedFiles.length + untrackedFiles.length} dirty
            </span>
          </div>

          <div className="flex flex-wrap gap-1">
            {modifiedFiles.map((f) => (
              <span
                key={f}
                className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20"
                title="Modified in working tree"
              >
                M: {f}
              </span>
            ))}
            {untrackedFiles.map((f) => (
              <span
                key={f}
                className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20"
                title="Untracked file"
              >
                ?: {f}
              </span>
            ))}
            {modifiedFiles.length === 0 && untrackedFiles.length === 0 && (
              <span className="text-[11px] text-text-muted italic">Working tree clean</span>
            )}
          </div>
        </div>

        {/* Stage 2: Staging Area (Index) */}
        <div className="p-3 space-y-1.5">
          <div className="flex items-center justify-between text-text-muted">
            <span className="font-semibold text-text-main flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-emerald-500" />
              Staging Area (Index)
            </span>
            <span className="font-mono text-[11px] text-emerald-600 dark:text-emerald-400 font-bold">
              {stagedFiles.length} staged
            </span>
          </div>

          <div className="flex flex-wrap gap-1">
            {stagedFiles.map((f) => (
              <span
                key={f}
                className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
                title="Staged in index for commit"
              >
                + {f}
              </span>
            ))}
            {stagedFiles.length === 0 && (
              <span className="text-[11px] text-text-muted italic">No staged changes</span>
            )}
          </div>
        </div>

        {/* Stage 3: Current Branch & Remote */}
        <div className="p-3 space-y-1.5">
          <div className="flex items-center justify-between text-text-muted">
            <span className="font-semibold text-text-main flex items-center gap-1.5">
              <GitBranch className="w-3.5 h-3.5 text-[#F05032]" />
              Active Branch
            </span>
            <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-mono font-bold border border-primary/20">
              {currentBranch}
            </span>
          </div>

          <div className="text-[11px] text-text-muted truncate">
            {remotes && Object.keys(remotes).length > 0 ? (
              <span>Remote: origin ({remotes.origin || 'linked'})</span>
            ) : (
              <span className="italic">Local repository (no remotes)</span>
            )}
          </div>
        </div>
      </div>

      {/* Commit History Timeline Graph */}
      <div className="p-4 space-y-3 overflow-x-auto max-h-[380px] overflow-y-auto">
        <div className="flex items-center justify-between text-xs text-text-muted pb-1 border-b border-border">
          <span className="font-semibold text-text-main flex items-center gap-1.5">
            <GitCommit className="w-3.5 h-3.5 text-primary" />
            Commit History DAG ({commits.length} commits)
          </span>
          <span className="text-[11px]">Click a commit to inspect details</span>
        </div>

        <div className="space-y-2.5 relative pl-4 border-l-2 border-primary/30">
          {commits.map((c, idx) => {
            const isSelected = selectedCommit?.id === c.id;
            return (
              <div
                key={c.id || idx}
                onClick={() => setSelectedCommit(isSelected ? null : c)}
                className={`p-3 rounded-lg border transition-all cursor-pointer relative group ${
                  isSelected
                    ? 'bg-primary/10 border-primary shadow-xs'
                    : c.isHead
                    ? 'bg-surface border-border hover:border-primary/50'
                    : 'bg-surface/60 border-border/70 hover:border-border'
                }`}
              >
                {/* Visual node anchor circle on timeline line */}
                <div
                  className={`absolute -left-[23px] top-4 w-3.5 h-3.5 rounded-full border-2 border-surface transition-colors ${
                    c.isHead
                      ? 'bg-emerald-500 ring-2 ring-emerald-500/30'
                      : 'bg-primary'
                  }`}
                />

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="font-mono text-xs font-bold text-text-main px-1.5 py-0.5 rounded bg-subtle border border-border">
                        {c.id}
                      </span>

                      {/* Branch & Head Tags */}
                      {c.branchTags.map((tag) => {
                        const isHeadTag = tag.startsWith('HEAD');
                        const isRemoteTag = tag.includes('/');
                        return (
                          <span
                            key={tag}
                            className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold border flex items-center gap-1 ${
                              isHeadTag
                                ? 'bg-[#F05032]/10 text-[#F05032] border-[#F05032]/30'
                                : isRemoteTag
                                ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30'
                                : 'bg-primary/10 text-primary border-primary/30'
                            }`}
                          >
                            <GitBranch className="w-2.5 h-2.5" />
                            {tag}
                          </span>
                        );
                      })}
                    </div>

                    <p className="text-xs text-text-main font-medium leading-relaxed">
                      {c.message}
                    </p>
                  </div>

                  <div className="text-[11px] font-mono text-text-muted shrink-0 text-right">
                    <div>{c.author.split('<')[0].trim()}</div>
                    <div className="text-[10px] text-text-muted/70 flex items-center gap-1 justify-end">
                      <Clock className="w-2.5 h-2.5" />
                      {c.timestamp.split(' ')[0]}
                    </div>
                  </div>
                </div>

                {/* Expanded Details */}
                {isSelected && (
                  <div className="mt-3 pt-3 border-t border-border/80 text-xs space-y-2 animate-fadeIn">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-text-muted">
                      <div>
                        <span className="font-semibold text-text-main">Author:</span> {c.author}
                      </div>
                      <div>
                        <span className="font-semibold text-text-main">Parent Commit:</span>{' '}
                        {c.parents.length > 0 ? c.parents.join(', ') : 'None (Root Commit)'}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer Info */}
      <div className="flex items-center justify-between px-4 py-2 bg-surface/50 border-t border-border text-[11px] text-text-muted">
        <div className="flex items-center gap-1.5">
          <Info className="w-3.5 h-3.5 text-primary" />
          <span>Interactive Git State • Working Tree &amp; DAG synchronized</span>
        </div>
        <div className="text-[10px] font-mono">
          HEAD -&gt; refs/heads/{currentBranch}
        </div>
      </div>
    </div>
  );
}
