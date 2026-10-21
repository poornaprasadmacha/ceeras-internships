import React, { useState } from 'react';
import { QuizQuestion } from '../../types/quiz';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { ProgressBar } from '../../components/ui/ProgressBar';
import { CheckCircle2, XCircle, AlertCircle, RotateCcw, ArrowRight } from 'lucide-react';
import { PASSING_PERCENTAGE } from '../../lib/constants';
import { cn } from '../../lib/utils';

export interface QuizRunnerProps {
  quizId: string;
  title: string;
  description?: string;
  questions: QuizQuestion[];
  onComplete: (score: number, total: number, answers: Record<string, string>) => void;
  initialAnswers?: Record<string, string>;
  initialScore?: number;
  initialPassed?: boolean;
}

export function QuizRunner({
  quizId,
  title,
  description,
  questions,
  onComplete,
  initialAnswers,
  initialScore,
  initialPassed,
}: QuizRunnerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>(
    initialAnswers || {}
  );
  const [submittedAnswers, setSubmittedAnswers] = useState<Record<string, boolean>>(() => {
    // If already answered, mark as checked
    const map: Record<string, boolean> = {};
    if (initialAnswers) {
      for (const qId of Object.keys(initialAnswers)) {
        map[qId] = true;
      }
    }
    return map;
  });
  const [isFinished, setIsFinished] = useState(initialScore !== undefined);
  const [finalScore, setFinalScore] = useState(initialScore || 0);

  if (!questions || questions.length === 0) {
    return (
      <Card className="p-6 max-w-2xl mx-auto text-center space-y-3">
        <h3 className="font-semibold text-text-main">No questions available</h3>
        <p className="text-xs text-text-muted">This quiz is being prepared.</p>
      </Card>
    );
  }

  const currentQ = questions[currentIndex];
  const isChecked = submittedAnswers[currentQ?.id];
  const selectedOptionId = selectedAnswers[currentQ?.id];

  const handleSelectOption = (optId: string) => {
    if (isChecked) return; // Locked once checked
    setSelectedAnswers((prev) => ({ ...prev, [currentQ.id]: optId }));
  };

  const handleCheckAnswer = () => {
    if (!selectedOptionId) return;
    setSubmittedAnswers((prev) => ({ ...prev, [currentQ.id]: true }));
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      // Calculate final score
      let score = 0;
      for (const q of questions) {
        const userChoice = selectedAnswers[q.id];
        const correctOpt = q.options.find((o) => o.isCorrect);
        if (userChoice && correctOpt && userChoice === correctOpt.id) {
          score++;
        }
      }
      setFinalScore(score);
      setIsFinished(true);
      onComplete(score, questions.length, selectedAnswers);
    }
  };

  const handleRetry = () => {
    setSelectedAnswers({});
    setSubmittedAnswers({});
    setCurrentIndex(0);
    setIsFinished(false);
  };

  if (isFinished) {
    const percentage = Math.round((finalScore / questions.length) * 100);
    const passed = percentage >= PASSING_PERCENTAGE;

    return (
      <Card className="p-6 max-w-2xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <Badge
            variant={passed ? 'success' : 'warning'}
            size="md"
            className="px-3 py-1 text-sm font-semibold inline-flex"
          >
            {passed ? 'Assessment Passed' : 'Review Needed'}
          </Badge>
          <h2 className="text-2xl font-bold text-text-main">{title} Summary</h2>
          <p className="text-sm text-text-muted">
            {passed
              ? 'Congratulations! You have demonstrated a strong understanding of these core SQL concepts.'
              : `You scored ${percentage}%. The pass mark is ${PASSING_PERCENTAGE}%. Review the explanations below and try again.`}
          </p>
        </div>

        {/* Score Box */}
        <div className="bg-subtle p-5 rounded-lg border border-border flex items-center justify-around text-center">
          <div>
            <span className="text-xs text-text-muted block font-medium">Final Score</span>
            <span className="text-2xl font-bold font-mono text-text-main">
              {finalScore} / {questions.length}
            </span>
          </div>
          <div className="w-px h-10 bg-border" />
          <div>
            <span className="text-xs text-text-muted block font-medium">Percentage</span>
            <span
              className={cn(
                'text-2xl font-bold font-mono',
                passed ? 'text-success' : 'text-warning'
              )}
            >
              {percentage}%
            </span>
          </div>
          <div className="w-px h-10 bg-border" />
          <div>
            <span className="text-xs text-text-muted block font-medium">Status</span>
            <span className="text-sm font-semibold text-text-main block mt-1">
              {passed ? 'Passed' : 'Not Yet Passed'}
            </span>
          </div>
        </div>

        {/* Question Review List */}
        <div className="space-y-4 pt-2">
          <h3 className="text-sm font-semibold text-text-main">Question Review</h3>
          <div className="space-y-3">
            {questions.map((q, idx) => {
              const userChoiceId = selectedAnswers[q.id];
              const correctOpt = q.options.find((o) => o.isCorrect);
              const isCorrect = userChoiceId === correctOpt?.id;
              const userOpt = q.options.find((o) => o.id === userChoiceId);

              return (
                <div
                  key={q.id}
                  className={cn(
                    'p-4 rounded-lg border text-sm',
                    isCorrect
                      ? 'bg-success-subtle/40 border-success/30'
                      : 'bg-error-subtle/40 border-error/30'
                  )}
                >
                  <div className="flex items-start gap-2.5">
                    {isCorrect ? (
                      <CheckCircle2 className="w-4 h-4 text-success shrink-0 mt-0.5" />
                    ) : (
                      <XCircle className="w-4 h-4 text-error shrink-0 mt-0.5" />
                    )}
                    <div className="space-y-1.5 flex-1">
                      <p className="font-semibold text-text-main">
                        {idx + 1}. {q.question}
                      </p>
                      {!isCorrect && (
                        <p className="text-xs text-error font-medium">
                          Your answer: {userOpt ? userOpt.text : 'Unanswered'}
                        </p>
                      )}
                      <p className="text-xs text-text-muted">
                        Correct answer:{' '}
                        <span className="font-medium text-text-main">
                          {correctOpt?.text}
                        </span>
                      </p>
                      <p className="text-xs text-text-muted/90 italic pt-1 border-t border-border/40">
                        Explanation: {q.explanation}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Action button */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-border">
          <Button variant="outline" size="md" onClick={handleRetry}>
            <RotateCcw className="w-4 h-4" />
            <span>Retake Quiz</span>
          </Button>
        </div>
      </Card>
    );
  }

  // Active quiz in progress
  const progressPercent = Math.round(((currentIndex + 1) / questions.length) * 100);

  return (
    <Card className="p-6 max-w-2xl mx-auto space-y-5">
      {/* Quiz Progress header */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs text-text-muted font-medium">
          <span>
            Question {currentIndex + 1} of {questions.length}
          </span>
          <Badge variant="outline" size="sm">
            {currentQ.topicTag}
          </Badge>
        </div>
        <ProgressBar value={progressPercent} showPercentage={false} size="sm" />
      </div>

      {/* Question Prompt */}
      <div className="space-y-2 pt-2">
        <h3 className="text-base font-semibold text-text-main leading-snug">
          {currentQ.question}
        </h3>
        {currentQ.codeSnippet && (
          <pre className="p-3 bg-editor-bg border border-border rounded-md font-mono text-xs text-editor-text overflow-x-auto">
            {currentQ.codeSnippet}
          </pre>
        )}
      </div>

      {/* Options List */}
      <div className="space-y-2.5 pt-1" role="radiogroup" aria-label={currentQ.question}>
        {currentQ.options.map((opt) => {
          const isSelected = selectedOptionId === opt.id;
          let optionStyles = 'border-border bg-surface hover:bg-subtle/60 text-text-main';

          if (isChecked) {
            if (opt.isCorrect) {
              optionStyles = 'border-success bg-success-subtle text-text-main font-medium';
            } else if (isSelected && !opt.isCorrect) {
              optionStyles = 'border-error bg-error-subtle text-text-main';
            } else {
              optionStyles = 'border-border bg-surface/50 text-text-muted opacity-60';
            }
          } else if (isSelected) {
            optionStyles = 'border-primary bg-primary/5 text-primary font-medium';
          }

          return (
            <button
              key={opt.id}
              role="radio"
              aria-checked={isSelected}
              disabled={isChecked}
              onClick={() => handleSelectOption(opt.id)}
              className={cn(
                'w-full text-left p-3.5 rounded-lg border transition-colors flex items-start gap-3 cursor-pointer text-sm',
                optionStyles
              )}
            >
              <span
                className={cn(
                  'w-4 h-4 rounded-full border mt-0.5 flex items-center justify-center shrink-0',
                  isSelected ? 'border-primary' : 'border-border',
                  isChecked && opt.isCorrect && 'border-success bg-success'
                )}
              >
                {isSelected && (
                  <span
                    className={cn(
                      'w-2 h-2 rounded-full',
                      isChecked && opt.isCorrect ? 'bg-white' : 'bg-primary'
                    )}
                  />
                )}
              </span>
              <span className="flex-1 leading-relaxed">{opt.text}</span>
            </button>
          );
        })}
      </div>

      {/* Explanation Feedback once checked */}
      {isChecked && (
        <div
          className={cn(
            'p-4 rounded-lg border text-xs leading-relaxed space-y-1',
            selectedOptionId &&
              currentQ.options.find((o) => o.id === selectedOptionId)?.isCorrect
              ? 'bg-success-subtle border-success/40'
              : 'bg-warning-subtle border-warning/40'
          )}
        >
          <div className="flex items-center gap-1.5 font-semibold">
            {selectedOptionId &&
            currentQ.options.find((o) => o.id === selectedOptionId)?.isCorrect ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-success" />
                <span className="text-success">Correct</span>
              </>
            ) : (
              <>
                <AlertCircle className="w-4 h-4 text-warning" />
                <span className="text-warning">Review Insight</span>
              </>
            )}
          </div>
          <p className="text-text-main pt-1">{currentQ.explanation}</p>
        </div>
      )}

      {/* Action Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-border">
        <span className="text-xs text-text-muted">
          Pass mark: {PASSING_PERCENTAGE}%
        </span>

        <div className="flex items-center gap-2">
          {!isChecked ? (
            <Button
              variant="primary"
              size="md"
              onClick={handleCheckAnswer}
              disabled={!selectedOptionId}
            >
              Check Answer
            </Button>
          ) : (
            <Button variant="primary" size="md" onClick={handleNext}>
              <span>{currentIndex === questions.length - 1 ? 'Finish Assessment' : 'Next Question'}</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}
