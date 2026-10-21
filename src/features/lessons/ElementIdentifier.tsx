import React, { useState } from 'react';
import { InteractiveCheck } from '../../types/lesson';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { CheckCircle2, RotateCcw } from 'lucide-react';
import { cn } from '../../lib/utils';

export interface ElementIdentifierProps {
  check: InteractiveCheck;
}

export function ElementIdentifier({ check }: ElementIdentifierProps) {
  const [choices, setChoices] = useState<Record<string, 'column' | 'row'>>({});
  const [checked, setChecked] = useState(false);

  const handleSelect = (itemId: string, choice: 'column' | 'row') => {
    if (checked) return;
    setChoices((prev) => ({ ...prev, [itemId]: choice }));
  };

  const handleCheck = () => {
    setChecked(true);
  };

  const handleReset = () => {
    setChoices({});
    setChecked(false);
  };

  const allSelected = check.options.every((opt) => !!choices[opt.id]);
  const correctCount = check.options.filter((opt) => {
    const choice = choices[opt.id];
    return (choice === 'column' && opt.isColumn) || (choice === 'row' && opt.isRow);
  }).length;

  return (
    <Card className="p-5 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-sm font-semibold text-text-main">{check.title}</h4>
          <p className="text-xs text-text-muted mt-0.5">{check.instructions}</p>
        </div>
        {checked && correctCount === check.options.length && (
          <Badge variant="success" size="sm">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>All Correct</span>
          </Badge>
        )}
      </div>

      <div className="space-y-2.5 pt-2">
        {check.options.map((opt) => {
          const userChoice = choices[opt.id];
          const isCorrect =
            checked &&
            ((userChoice === 'column' && opt.isColumn) || (userChoice === 'row' && opt.isRow));
          const isWrong = checked && !isCorrect;

          return (
            <div
              key={opt.id}
              className={cn(
                'p-3 rounded-lg border flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs',
                isCorrect
                  ? 'bg-success-subtle/40 border-success/40'
                  : isWrong
                  ? 'bg-error-subtle/40 border-error/40'
                  : 'bg-subtle/50 border-border'
              )}
            >
              <span className="font-mono text-text-main flex-1">{opt.label}</span>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  disabled={checked}
                  onClick={() => handleSelect(opt.id, 'column')}
                  className={cn(
                    'px-3 py-1 rounded text-xs font-medium border transition-colors cursor-pointer',
                    userChoice === 'column'
                      ? 'border-primary bg-primary text-white'
                      : 'border-border bg-surface text-text-main hover:bg-subtle'
                  )}
                >
                  Column
                </button>
                <button
                  type="button"
                  disabled={checked}
                  onClick={() => handleSelect(opt.id, 'row')}
                  className={cn(
                    'px-3 py-1 rounded text-xs font-medium border transition-colors cursor-pointer',
                    userChoice === 'row'
                      ? 'border-primary bg-primary text-white'
                      : 'border-border bg-surface text-text-main hover:bg-subtle'
                  )}
                >
                  Row
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex items-center justify-between pt-2">
        <span className="text-xs text-text-muted">
          {checked
            ? `${correctCount} of ${check.options.length} correct`
            : `${Object.keys(choices).length} of ${check.options.length} classified`}
        </span>

        <div className="flex items-center gap-2">
          {checked ? (
            <Button variant="outline" size="sm" onClick={handleReset}>
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Try Again</span>
            </Button>
          ) : (
            <Button
              variant="primary"
              size="sm"
              onClick={handleCheck}
              disabled={!allSelected}
            >
              Check Answers
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}
