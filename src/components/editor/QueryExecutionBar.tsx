import React, { useState } from 'react';
import { Play, RotateCcw, Copy, Check } from 'lucide-react';
import { Button } from '../ui/Button';

export interface QueryExecutionBarProps {
  onRun: () => void;
  onReset: () => void;
  query: string;
  isRunning?: boolean;
}

export function QueryExecutionBar({
  onRun,
  onReset,
  query,
  isRunning = false,
}: QueryExecutionBarProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(query);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  return (
    <div className="flex items-center justify-between gap-2 pt-2">
      <div className="flex items-center gap-2">
        <Button
          variant="primary"
          size="sm"
          onClick={onRun}
          disabled={isRunning}
          isLoading={isRunning}
        >
          <Play className="w-3.5 h-3.5 fill-current" />
          <span>Run Query</span>
          <span className="hidden sm:inline text-[11px] opacity-75 font-mono ml-1">
            (Ctrl+Enter)
          </span>
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={onReset}
          disabled={isRunning}
          title="Reset query to starting state"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset</span>
        </Button>
      </div>

      <div className="flex items-center gap-1.5">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleCopy}
          title="Copy query to clipboard"
          className="text-text-muted hover:text-text-main"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-success" />
              <span className="text-xs text-success">Copied</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span className="text-xs">Copy</span>
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
