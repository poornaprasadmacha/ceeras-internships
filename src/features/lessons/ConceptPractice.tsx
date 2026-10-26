import React, { useState } from 'react';
import { TerminologyItem, InteractiveCheck } from '../../types/lesson';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { CheckCircle2, RotateCcw, Check, BookOpen, Layers } from 'lucide-react';
import { cn } from '../../lib/utils';

export interface ConceptPracticeProps {
  terminologyItems?: TerminologyItem[];
  interactiveCheck?: InteractiveCheck;
}

export function ConceptPractice({
  terminologyItems,
  interactiveCheck,
}: ConceptPracticeProps) {
  const [activeTab, setActiveTab] = useState<'terminology' | 'classification'>(
    terminologyItems ? 'terminology' : 'classification'
  );

  // Terminology matching state
  const [selectedTermId, setSelectedTermId] = useState<string | null>(null);
  const [matches, setMatches] = useState<Record<string, string>>({}); // defId -> termId
  const [isTerminologyDone, setIsTerminologyDone] = useState(false);

  // Element classification state
  const [choices, setChoices] = useState<Record<string, 'column' | 'row'>>({});
  const [checkedClassification, setCheckedClassification] = useState(false);

  // Handlers for terminology
  const handleSelectTerm = (termId: string) => {
    setSelectedTermId(termId);
  };

  const handleSelectDefinition = (defId: string) => {
    if (!selectedTermId || !terminologyItems) return;

    const newMatches = { ...matches, [defId]: selectedTermId };
    setMatches(newMatches);
    setSelectedTermId(null);

    const allMatched = terminologyItems.every((item) => newMatches[item.id] === item.id);
    if (allMatched && Object.keys(newMatches).length === terminologyItems.length) {
      setIsTerminologyDone(true);
    }
  };

  const handleResetTerminology = () => {
    setMatches({});
    setSelectedTermId(null);
    setIsTerminologyDone(false);
  };

  // Handlers for element classification
  const handleSelectChoice = (itemId: string, choice: 'column' | 'row') => {
    if (checkedClassification) return;
    setChoices((prev) => ({ ...prev, [itemId]: choice }));
  };

  const handleCheckClassification = () => {
    setCheckedClassification(true);
  };

  const handleResetClassification = () => {
    setChoices({});
    setCheckedClassification(false);
  };

  const isClassificationDone =
    checkedClassification &&
    !!interactiveCheck &&
    interactiveCheck.options.every((opt) => {
      const choice = choices[opt.id];
      return (choice === 'column' && opt.isColumn) || (choice === 'row' && opt.isRow);
    });

  const allCompleted =
    (!terminologyItems || isTerminologyDone) &&
    (!interactiveCheck || isClassificationDone);

  return (
    <Card className="p-3.5 sm:p-5 border-border shadow-subtle space-y-4 bg-surface">
      {/* Header with Title and Mode Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 border-b border-border pb-3">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-bold text-text-main">
              Concept Practice & Self-Check
            </h3>
            {allCompleted && (
              <Badge variant="success" size="sm">
                <Check className="w-3 h-3" />
                <span>Verified</span>
              </Badge>
            )}
          </div>
          <p className="text-xs text-text-muted mt-0.5">
            Test your understanding of core relational terms and data structures before coding.
          </p>
        </div>

        {terminologyItems && interactiveCheck && (
          <div className="flex items-center gap-1 bg-subtle p-1 rounded-lg border border-border shrink-0 self-start sm:self-auto">
            <button
              type="button"
              onClick={() => setActiveTab('terminology')}
              className={cn(
                'min-h-[36px] flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-all cursor-pointer',
                activeTab === 'terminology'
                  ? 'bg-surface text-primary shadow-2xs font-bold'
                  : 'text-text-muted hover:text-text-main'
              )}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Terminology</span>
              {isTerminologyDone && (
                <Check className="w-3 h-3 text-success stroke-[3]" />
              )}
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('classification')}
              className={cn(
                'min-h-[36px] flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-all cursor-pointer',
                activeTab === 'classification'
                  ? 'bg-surface text-primary shadow-2xs font-bold'
                  : 'text-text-muted hover:text-text-main'
              )}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Row vs Column</span>
              {isClassificationDone && (
                <Check className="w-3 h-3 text-success stroke-[3]" />
              )}
            </button>
          </div>
        )}
      </div>

      {/* Part 1: Terminology Matching */}
      {activeTab === 'terminology' && terminologyItems && (
        <div className="space-y-3.5">
          <div className="flex items-center justify-between text-xs text-text-muted">
            <span>Tap a term on the left, then tap its matching definition on the right:</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleResetTerminology}
              className="text-[11px] h-7 px-2 text-text-muted hover:text-text-main gap-1"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
            {/* Terms list */}
            <div className="space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-text-muted block">
                Terms
              </span>
              {terminologyItems.map((item) => {
                const isSelected = selectedTermId === item.id;
                const isMatched = Object.entries(matches).some(
                  ([defId, tId]) => defId === item.id && tId === item.id
                );

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleSelectTerm(item.id)}
                    className={cn(
                      'w-full min-h-[44px] text-left px-3 py-2.5 rounded-lg border text-xs font-medium transition-all cursor-pointer flex items-center justify-between',
                      isMatched
                        ? 'border-success bg-success-subtle text-text-main font-semibold'
                        : isSelected
                        ? 'border-primary bg-primary/10 text-primary font-semibold ring-1 ring-primary'
                        : 'border-border bg-subtle/70 hover:bg-subtle text-text-main'
                    )}
                  >
                    <span>{item.term}</span>
                    {isMatched && <CheckCircle2 className="w-4 h-4 text-success shrink-0" />}
                  </button>
                );
              })}
            </div>

            {/* Definitions list */}
            <div className="space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-text-muted block">
                Definitions
              </span>
              {terminologyItems.map((item) => {
                const matchedTermId = matches[item.id];
                const isCorrect = matchedTermId === item.id;
                const isWrong = matchedTermId && matchedTermId !== item.id;

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleSelectDefinition(item.id)}
                    className={cn(
                      'w-full min-h-[44px] text-left px-3 py-2.5 rounded-lg border text-xs transition-all cursor-pointer flex items-center justify-between gap-2',
                      isCorrect
                        ? 'border-success bg-success-subtle text-text-main font-medium'
                        : isWrong
                        ? 'border-error bg-error-subtle text-text-main'
                        : selectedTermId
                        ? 'border-border/80 bg-surface hover:border-primary/60 text-text-main'
                        : 'border-border/60 bg-surface text-text-main/80'
                    )}
                  >
                    <span className="leading-relaxed">{item.definition}</span>
                    {isCorrect && <CheckCircle2 className="w-4 h-4 text-success shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Part 2: Element Classification */}
      {activeTab === 'classification' && interactiveCheck && (
        <div className="space-y-3.5">
          <div className="flex items-center justify-between text-xs text-text-muted">
            <span>{interactiveCheck.instructions}</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleResetClassification}
              className="text-[11px] h-7 px-2 text-text-muted hover:text-text-main gap-1"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </Button>
          </div>

          <div className="space-y-2.5 pt-1">
            {interactiveCheck.options.map((opt) => {
              const userChoice = choices[opt.id];
              const isCorrect =
                checkedClassification &&
                ((userChoice === 'column' && opt.isColumn) || (userChoice === 'row' && opt.isRow));
              const isWrong = checkedClassification && !isCorrect;

              return (
                <div
                  key={opt.id}
                  className={cn(
                    'p-3 rounded-lg border flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-xs transition-all',
                    isCorrect
                      ? 'bg-success-subtle/50 border-success/40'
                      : isWrong
                      ? 'bg-error-subtle/50 border-error/40'
                      : 'bg-subtle/50 border-border'
                  )}
                >
                  <span className="font-mono text-text-main flex-1 leading-snug">
                    {opt.label}
                  </span>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      disabled={checkedClassification}
                      onClick={() => handleSelectChoice(opt.id, 'column')}
                      className={cn(
                        'min-h-[40px] px-3.5 py-1.5 rounded-md text-xs font-semibold border transition-all cursor-pointer',
                        userChoice === 'column'
                          ? 'border-primary bg-primary text-white shadow-2xs'
                          : 'border-border bg-surface text-text-main hover:bg-subtle'
                      )}
                    >
                      Column
                    </button>
                    <button
                      type="button"
                      disabled={checkedClassification}
                      onClick={() => handleSelectChoice(opt.id, 'row')}
                      className={cn(
                        'min-h-[40px] px-3.5 py-1.5 rounded-md text-xs font-semibold border transition-all cursor-pointer',
                        userChoice === 'row'
                          ? 'border-primary bg-primary text-white shadow-2xs'
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

          {!checkedClassification && (
            <div className="flex justify-end pt-1">
              <Button
                variant="primary"
                size="sm"
                onClick={handleCheckClassification}
                disabled={
                  !interactiveCheck.options.every((opt) => !!choices[opt.id])
                }
                className="text-xs"
              >
                <span>Check Answers</span>
              </Button>
            </div>
          )}
        </div>
      )}
    </Card>
  );
}
