import React, { useState, useMemo } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { LESSON_MANIFEST } from '../../data/lessons';
import { PYTHON_LESSONS } from '../../data/pythonLessons';
import { HTML_LESSONS } from '../../data/htmlLessons';
import { CSS_LESSONS } from '../../data/cssLessons';
import { JS_LESSONS } from '../../data/jsLessons';
import { DATA_SCIENCE_LESSONS } from '../../data/dataScienceLessons';
import { MACHINE_LEARNING_LESSONS } from '../../data/machineLearningLessons';
import { NUMPY_LESSONS } from '../../data/numpyLessons';
import { PANDAS_LESSONS } from '../../data/pandasLessons';
import { GIT_LESSONS } from '../../data/gitLessons';
import { VSCODE_LESSONS } from '../../data/vscodeLessons';
import { foundationReviewQuestions, REVIEW_TEST_ID } from '../../data/lessons/reviewTest';
import { useProgress } from '../../hooks/useProgress';
import { useActiveCourse, CourseId } from '../../hooks/useActiveCourse';
import { QuizRunner } from './QuizRunner';
import { QuizQuestion } from '../../types/quiz';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { CheckSquare, ArrowRight, BookOpen } from 'lucide-react';
import { PASSING_PERCENTAGE } from '../../lib/constants';
import { cn } from '../../lib/utils';

interface ActiveQuizState {
  id: string;
  title: string;
  description?: string;
  questions: QuizQuestion[];
}

interface GenericLessonItem {
  id: string;
  number: number;
  title: string;
  slug: string;
  quiz: QuizQuestion[];
  courseLessonPath: string;
}

export function QuizzesIndexView() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { quizAttempts, recordQuizAttempt } = useProgress();
  const { activeCourse, allCourses, setActiveCourseId } = useActiveCourse();

  // Determine selected course tab
  const paramCourse = searchParams.get('course')?.toLowerCase() as CourseId | undefined;
  const initialCourseId: CourseId = useMemo(() => {
    if (paramCourse && allCourses.some((c) => c.id === paramCourse)) {
      return paramCourse;
    }
    return activeCourse.id;
  }, [paramCourse, activeCourse.id]);

  const [selectedCourseId, setSelectedCourseId] = useState<CourseId>(initialCourseId);
  const [activeQuiz, setActiveQuiz] = useState<ActiveQuizState | null>(null);

  const selectedCourse = useMemo(() => {
    return allCourses.find((c) => c.id === selectedCourseId) || allCourses[0];
  }, [selectedCourseId, allCourses]);

  const handleSelectCourse = (id: CourseId) => {
    setSelectedCourseId(id);
    setActiveCourseId(id);
    setSearchParams({ course: id });
    setActiveQuiz(null);
  };

  // Convert current course lessons into a standardized list
  const currentLessons: GenericLessonItem[] = useMemo(() => {
    switch (selectedCourseId) {
      case 'sql':
        return LESSON_MANIFEST.map((l) => ({
          id: `quiz_${l.id}`,
          number: l.number,
          title: l.title,
          slug: l.slug,
          quiz: l.quiz,
          courseLessonPath: `/learn/${l.slug}#quiz`,
        }));
      case 'python':
        return PYTHON_LESSONS.map((l) => ({
          id: `quiz_python_${l.id}`,
          number: l.number,
          title: l.title,
          slug: l.slug,
          quiz: l.quiz,
          courseLessonPath: `/learn/python/${l.slug}`,
        }));
      case 'html':
        return HTML_LESSONS.map((l) => ({
          id: `quiz_html_${l.id}`,
          number: l.number,
          title: l.title,
          slug: l.slug,
          quiz: l.quiz,
          courseLessonPath: `/learn/html/${l.slug}`,
        }));
      case 'css':
        return CSS_LESSONS.map((l) => ({
          id: `quiz_css_${l.id}`,
          number: l.number,
          title: l.title,
          slug: l.slug,
          quiz: l.quiz,
          courseLessonPath: `/learn/css/${l.slug}`,
        }));
      case 'javascript':
        return JS_LESSONS.map((l) => ({
          id: `quiz_js_${l.id}`,
          number: l.number,
          title: l.title,
          slug: l.slug,
          quiz: l.quiz,
          courseLessonPath: `/learn/javascript/${l.slug}`,
        }));
      case 'datascience':
        return DATA_SCIENCE_LESSONS.map((l) => ({
          id: `quiz_ds_${l.id}`,
          number: l.number,
          title: l.title,
          slug: l.slug,
          quiz: l.quiz,
          courseLessonPath: `/learn/datascience/${l.slug}`,
        }));
      case 'machinelearning':
        return MACHINE_LEARNING_LESSONS.map((l) => ({
          id: `quiz_ml_${l.id}`,
          number: l.number,
          title: l.title,
          slug: l.slug,
          quiz: l.quiz,
          courseLessonPath: `/learn/machinelearning/${l.slug}`,
        }));
      case 'numpy':
        return NUMPY_LESSONS.map((l) => ({
          id: `quiz_numpy_${l.id}`,
          number: l.number,
          title: l.title,
          slug: l.slug,
          quiz: l.quiz,
          courseLessonPath: `/learn/numpy/${l.slug}`,
        }));
      case 'pandas':
        return PANDAS_LESSONS.map((l) => ({
          id: `quiz_pandas_${l.id}`,
          number: l.number,
          title: l.title,
          slug: l.slug,
          quiz: l.quiz,
          courseLessonPath: `/learn/pandas/${l.slug}`,
        }));
      case 'git':
        return GIT_LESSONS.map((l) => ({
          id: `quiz_git_${l.id}`,
          number: l.number,
          title: l.title,
          slug: l.slug,
          quiz: l.quiz,
          courseLessonPath: `/learn/git/${l.slug}`,
        }));
      case 'vscode':
        return VSCODE_LESSONS.map((l) => ({
          id: `quiz_vscode_${l.id}`,
          number: l.number,
          title: l.title,
          slug: l.slug,
          quiz: l.quiz,
          courseLessonPath: `/learn/vscode/${l.slug}`,
        }));
      default:
        return [];
    }
  }, [selectedCourseId]);

  const sqlReviewAttempt = quizAttempts[REVIEW_TEST_ID];

  // If a quiz is actively running, render QuizRunner
  if (activeQuiz) {
    const attempt = quizAttempts[activeQuiz.id];
    return (
      <div className="space-y-6 pb-12">
        <div className="flex items-center justify-between border-b border-border pb-4">
          <Button variant="outline" size="sm" onClick={() => setActiveQuiz(null)}>
            Back to Assessments List
          </Button>
          <span className="text-xs text-text-muted">
            {activeQuiz.title} • {activeQuiz.questions.length} Questions
          </span>
        </div>

        <QuizRunner
          quizId={activeQuiz.id}
          title={activeQuiz.title}
          description={activeQuiz.description}
          questions={activeQuiz.questions}
          onComplete={async (score, total, userAnswers) => {
            await recordQuizAttempt(activeQuiz.id, score, total, userAnswers);
          }}
          initialAnswers={attempt?.userAnswers}
          initialScore={attempt?.score}
          initialPassed={attempt?.passed}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="border-b border-border pb-5">
        <h1 className="font-raleway text-2xl sm:text-3xl font-bold tracking-tight text-text-main flex items-center gap-3">
          <CheckSquare className="w-7 h-7 text-primary" />
          <span>Quizzes & Tests</span>
        </h1>
      </div>

      {/* Course Switcher Tabs */}
      <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-subtle border border-border rounded-xl overflow-x-auto scrollbar-thin">
        {allCourses.map((c) => {
          const Logo = c.logo;
          const isSelected = c.id === selectedCourseId;
          return (
            <button
              key={c.id}
              type="button"
              onClick={() => handleSelectCourse(c.id)}
              className={cn(
                'flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap',
                isSelected
                  ? 'bg-surface text-primary shadow-2xs border border-border font-bold'
                  : 'text-text-muted hover:text-text-main hover:bg-surface/50'
              )}
            >
              <div className="w-4 h-4 rounded bg-subtle border border-border/60 flex items-center justify-center p-0.5 shrink-0">
                <Logo className="w-full h-full object-contain" />
              </div>
              <span>{c.shortTitle}</span>
              <span className="text-[10px] opacity-75 font-mono">({c.totalLessons})</span>
            </button>
          );
        })}
      </div>

      {/* Multi-Lesson Comprehensive Review Test (for SQL) */}
      {selectedCourseId === 'sql' && (
        <Card className="p-6 bg-surface border-border shadow-subtle space-y-4">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
            <div className="space-y-2 max-w-2xl">
              <div className="flex items-center gap-2">
                {sqlReviewAttempt && (
                  <Badge variant={sqlReviewAttempt.passed ? 'success' : 'warning'} size="sm">
                    {sqlReviewAttempt.passed ? 'Passed' : 'Needs Review'}
                  </Badge>
                )}
              </div>

              <h2 className="text-lg font-bold text-text-main">
                Foundation Review Test (Lessons 1 & 2)
              </h2>

              <div className="flex items-center gap-4 text-xs text-text-muted pt-1">
                <span>10 Questions</span>
                <span>•</span>
                <span>Pass threshold: {PASSING_PERCENTAGE}%</span>
                {sqlReviewAttempt && (
                  <>
                    <span>•</span>
                    <span className="font-semibold text-text-main">
                      Best Score: {sqlReviewAttempt.percentage}% ({sqlReviewAttempt.score}/10)
                    </span>
                  </>
                )}
              </div>
            </div>

            <div className="shrink-0 flex items-center">
              <Button
                variant="primary"
                size="md"
                onClick={() =>
                  setActiveQuiz({
                    id: REVIEW_TEST_ID,
                    title: 'Foundation Review Test',
                    description:
                      'Comprehensive 10-question assessment covering Lessons 1 and 2 relational concepts and SELECT syntax.',
                    questions: foundationReviewQuestions,
                  })
                }
              >
                <span>{sqlReviewAttempt ? 'Review or Retake Test' : 'Start Assessment'}</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Lesson Quizzes Section for Active Course */}
      <div className="space-y-4 pt-2">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-text-main">
            {selectedCourse.title} Quizzes ({currentLessons.length})
          </h2>
          <span className="text-xs text-text-muted">10 Questions Per Quiz</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {currentLessons.map((item) => {
            const attempt = quizAttempts[item.id];
            const questionsCount = item.quiz.length;

            return (
              <Card key={item.id} className="p-5 flex flex-col justify-between space-y-4 bg-surface">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" size="sm">
                      Lesson {item.number}
                    </Badge>
                    {attempt && (
                      <Badge variant={attempt.passed ? 'success' : 'warning'} size="sm">
                        {attempt.passed ? 'Passed' : 'Needs Review'}
                      </Badge>
                    )}
                  </div>

                  <h3 className="text-sm font-bold text-text-main leading-snug">
                    {item.title} Quiz
                  </h3>
                  <p className="text-xs text-text-muted leading-relaxed">
                    {questionsCount} questions assessing core concepts, syntax, and problem-solving from Lesson {item.number}.
                  </p>
                </div>

                <div className="pt-3 border-t border-border flex items-center justify-between gap-2">
                  <span className="text-xs font-mono text-text-muted">
                    {attempt ? `${attempt.percentage}% score (${attempt.score}/${attempt.totalQuestions})` : 'Not attempted'}
                  </span>

                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => navigate(item.courseLessonPath)}
                      title="View Lesson"
                      className="text-xs"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                    </Button>

                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() =>
                        setActiveQuiz({
                          id: item.id,
                          title: `Lesson ${item.number}: ${item.title} Quiz`,
                          description: `10-question assessment covering Lesson ${item.number}.`,
                          questions: item.quiz,
                        })
                      }
                      className="text-xs"
                    >
                      <span>{attempt ? 'Retake Quiz' : 'Start Quiz'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
