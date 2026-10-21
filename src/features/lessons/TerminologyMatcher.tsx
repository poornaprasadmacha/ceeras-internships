import React, { useState } from 'react';
import { TerminologyItem } from '../../types/lesson';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { CheckCircle2, RotateCcw } from 'lucide-react';
import { cn } from '../../lib/utils';

export interface TerminologyMatcherProps {
  items: TerminologyItem[];
}

export function TerminologyMatcher({ items }: TerminologyMatcherProps) {
  const [selectedTermId, setSelectedTermId] = useState<string | null>(null);
  const [matches, setMatches] = useState<Record<string, string>>({}); // definitionId -> termId
  const [isCompleted, setIsCompleted] = useState(false);

  // Scramble definitions deterministically or statically for matching
  const definitions = items.map((i) => ({ id: i.id, definition: i.definition }));

  const handleSelectTerm = (termId: string) => {
    // If already matched, allow re-matching
    setSelectedTermId(termId);
  };

  const handleSelectDefinition = (defId: string) => {
    if (!selectedTermId) return;

    const newMatches = { ...matches, [defId]: selectedTermId };
    setMatches(newMatches);
    setSelectedTermId(null);

    // Check if all correct
    const allMatched = items.every((item) => newMatches[item.id] === item.id);
    if (allMatched && Object.keys(newMatches).length === items.length) {
      setIsCompleted(true);
    }
  };

  const handleReset = () => {
    setMatches({});
    setSelectedTermId(null);
    setIsCompleted(false);
  };

  return (
    <Card className="p-5 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-sm font-semibold text-text-main">
            Interactive Check: Match SQL Terminology
          </h4>
          <p className="text-xs text-text-muted mt-0.5">
            Click a term on the left, then click its corresponding definition on the right.
          </p>
        </div>
        {isCompleted && (
          <Badge variant="success" size="sm">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>All Matched</span>
          </Badge>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
        {/* Terms column */}
        <div className="space-y-2">
          <span className="text-xs font-semibold text-text-muted block">Terms</span>
          {items.map((item) => {
            const isSelected = selectedTermId === item.id;
            const isMatchedCorrectly = Object.entries(matches).some(
              ([defId, tId]) => defId === item.id && tId === item.id
            );

            return (
              <button
                key={item.id}
                onClick={() => handleSelectTerm(item.id)}
                className={cn(
                  'w-full text-left p-2.5 rounded-md border text-xs font-medium transition-colors cursor-pointer flex items-center justify-between',
                  isMatchedCorrectly
                    ? 'border-success bg-success-subtle text-text-main font-semibold'
                    : isSelected
                    ? 'border-primary bg-primary/10 text-primary font-semibold'
                    : 'border-border bg-subtle hover:bg-border text-text-main'
                )}
              >
                <span>{item.term}</span>
                {isMatchedCorrectly && <CheckCircle2 className="w-3.5 h-3.5 text-success" />}
              </button>
            );
          })}
        </div>

        {/* Definitions column */}
        <div className="space-y-2">
          <span className="text-xs font-semibold text-text-muted block">Definitions</span>
          {definitions.map((def) => {
            const matchedTermId = matches[def.id];
            const isCorrect = matchedTermId === def.id;

            return (
              <button
                key={def.id}
                onClick={() => handleSelectDefinition(def.id)}
                className={cn(
                  'w-full text-left p-2.5 rounded-md border text-xs transition-colors cursor-pointer leading-relaxed',
                  isCorrect
                    ? 'border-success bg-success-subtle text-text-main'
                    : matchedTermId
                    ? 'border-error bg-error-subtle text-text-main'
                    : 'border-border bg-surface hover:bg-subtle text-text-main'
                )}
              >
                {def.definition}
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex items-center justify-between pt-2">
        <span className="text-xs text-text-muted">
          {Object.keys(matches).filter((k) => matches[k] === k).length} of {items.length} matched
        </span>
        <Button variant="ghost" size="sm" onClick={handleReset}>
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Matching</span>
        </Button>
      </div>
    </Card>
  );
}
