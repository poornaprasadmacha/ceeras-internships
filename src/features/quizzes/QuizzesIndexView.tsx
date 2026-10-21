import React, { useState } from 'react';
import { LESSON_MANIFEST } from '../../data/lessons';
import { foundationReviewQuestions, REVIEW_TEST_ID } from '../../data/lessons/reviewTest';
import { useProgress } from '../../hooks/useProgress';
import { QuizRunner } from './QuizRunner';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { CheckSquare, CheckCircle2, RotateCcw, ArrowRight, Award } from 'lucide-react';
import { PASSING_PERCENTAGE } from '../../lib/constants';

export function QuizzesIndexView() {
  const { quizAttempts, recordQuizAttempt } = useProgress();
  const [activeReviewTest, setActiveReviewTest] = useState(false);

  const reviewAttempt = quizAttempts[REVIEW_TEST_ID];

  const handleReviewTestComplete = async (
    score: number,
    total: number,
    userAnswers: Record<string, string>
  ) => {
    await recordQuizAttempt(REVIEW_TEST_ID, score, total, userAnswers);
  };

  if (activeReviewTest) {
    return (
      <div className="space-y-6 pb-12">
        <div className="flex items-center justify-between border-b border-border pb-4">
          <Button variant="outline" size="sm" onClick={() => setActiveReviewTest(false)}>
            Back to Assessments List
          </Button>
          <span className="text-xs text-text-muted">
            Foundation Review • 10 Questions
          </span>
        </div>

        <QuizRunner
          quizId={REVIEW_TEST_ID}
          title="Foundation Review Test"
          description="Comprehensive 10-question assessment covering Lessons 1 and 2 relational concepts and SELECT syntax."
          questions={foundationReviewQuestions}
          onComplete={handleReviewTestComplete}
          initialAnswers={reviewAttempt?.userAnswers}
          initialScore={reviewAttempt?.score}
          initialPassed={reviewAttempt?.passed}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="border-b border-border pb-6 space-y-2">
        <Badge variant="accent" size="sm">
          Assessments & Testing
        </Badge>
        <h1 className="font-raleway text-2xl sm:text-3xl font-bold tracking-tight text-text-main flex items-center gap-3">
          <CheckSquare className="w-7 h-7 text-primary" />
          <span>Quizzes & Tests</span>
        </h1>
        <p className="text-sm text-text-muted max-w-2xl leading-relaxed">
          Verify your conceptual comprehension and query prediction abilities. All quizzes require an {PASSING_PERCENTAGE}% score to pass.
        </p>
      </div>

      {/* Comprehensive Multi-Lesson Review Test Card */}
      <Card className="p-6 bg-surface border-border shadow-subtle space-y-4">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2">
              <Badge variant="accent" size="sm">
                Comprehensive Assessment
              </Badge>
              {reviewAttempt && (
                <Badge variant={reviewAttempt.passed ? 'success' : 'warning'} size="sm">
                  {reviewAttempt.passed ? 'Passed' : 'Needs Review'}
                </Badge>
              )}
            </div>

            <h2 className="text-lg font-bold text-text-main">
              Foundation Review Test (Lessons 1 & 2)
            </h2>
            <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
              Consolidate your knowledge across relational models, table/column/row architecture, the SELECT clause, wildcards, and common syntax pitfalls with 10 original test questions.
            </p>

            <div className="flex items-center gap-4 text-xs text-text-muted pt-1">
              <span>10 Questions</span>
              <span>•</span>
              <span>Pass threshold: {PASSING_PERCENTAGE}%</span>
              {reviewAttempt && (
                <>
                  <span>•</span>
                  <span className="font-semibold text-text-main">
                    Best Score: {reviewAttempt.percentage}% ({reviewAttempt.score}/10)
                  </span>
                </>
              )}
            </div>
          </div>

          <div className="shrink-0 flex items-center">
            <Button
              variant="primary"
              size="md"
              onClick={() => setActiveReviewTest(true)}
            >
              <span>{reviewAttempt ? 'Review or Retake Test' : 'Start Assessment'}</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </Card>

      {/* Lesson Quizzes Section */}
      <div className="space-y-4 pt-4">
        <h2 className="text-base font-bold text-text-main">Lesson Knowledge Quizzes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {LESSON_MANIFEST.map((lesson) => {
            const attempt = quizAttempts[`quiz_${lesson.id}`];

            return (
              <Card key={lesson.id} className="p-5 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" size="sm">
                      Lesson {lesson.number}
                    </Badge>
                    {attempt && (
                      <Badge variant={attempt.passed ? 'success' : 'warning'} size="sm">
                        {attempt.passed ? 'Passed' : 'Needs Review'}
                      </Badge>
                    )}
                  </div>

                  <h3 className="text-sm font-bold text-text-main">
                    {lesson.title} Quiz
                  </h3>
                  <p className="text-xs text-text-muted leading-relaxed">
                    5 conceptual questions testing your understanding of the topics taught in Lesson {lesson.number}.
                  </p>
                </div>

                <div className="pt-3 border-t border-border flex items-center justify-between">
                  <span className="text-xs font-mono text-text-muted">
                    {attempt ? `${attempt.percentage}% score` : 'Not attempted'}
                  </span>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      // Navigate directly to the lesson's quiz tab
                      window.location.href = `/learn/${lesson.slug}#quiz`;
                    }}
                  >
                    <span>{attempt ? 'Retake Quiz' : 'Start Quiz'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
