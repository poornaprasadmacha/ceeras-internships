import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  getPandasLessonBySlug,
  getNextPandasLesson,
  getPrevPandasLesson,
} from '../../data/pandasLessons';
import { PandasWorkspace } from './PandasWorkspace';
import { QuizRunner } from '../quizzes/QuizRunner';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Tabs } from '../../components/ui/Tabs';
import { PandasLogo } from '../../components/ui/LanguageLogos';
import {
  Clock,
  CheckCircle2,
  ArrowLeft,
  ArrowRight,
  Code2,
  Target,
  Database,
} from 'lucide-react';

export function PandasLessonView() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const lesson = getPandasLessonBySlug(slug || '');
  const [activeTab, setActiveTab] = useState<'learn' | 'exercises' | 'quiz'>('learn');
  const [activeExerciseIndex, setActiveExerciseIndex] = useState(0);
  const [solvedExercises, setSolvedExercises] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('ceeras_pandas_solved');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          const map: Record<string, boolean> = {};
          parsed.forEach((id) => (map[id] = true));
          return map;
        }
        return parsed;
      }
      return {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [lesson?.id]);

  if (!lesson) {
    return (
      <div className="text-center py-16 space-y-4">
        <h2 className="text-xl font-bold text-text-main">Pandas Lesson Not Found</h2>
        <p className="text-sm text-text-muted">The requested lesson does not exist in the curriculum.</p>
        <Button variant="primary" onClick={() => navigate('/learn/pandas')}>
          Browse Pandas Curriculum
        </Button>
      </div>
    );
  }

  const prevLesson = getPrevPandasLesson(lesson.id);
  const nextLesson = getNextPandasLesson(lesson.id);

  const currentExercise = lesson.exercises[activeExerciseIndex];
  const isCurrentExerciseSolved = !!solvedExercises[currentExercise?.id];
  const solvedCountInLesson = lesson.exercises.filter((e) => solvedExercises[e.id]).length;

  const handleSolve = (exId: string, _code: string) => {
    setSolvedExercises((prev) => {
      const updated = { ...prev, [exId]: true };
      try {
        localStorage.setItem('ceeras_pandas_solved', JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Topbar Breadcrumb */}
      <div className="flex items-center justify-between gap-2 text-xs text-text-muted">
        <div className="flex items-center gap-2">
          <Link to="/learn/pandas" className="hover:text-text-main flex items-center gap-1.5 font-medium">
            <PandasLogo className="w-3.5 h-3.5 rounded" />
            <span>Pandas Academy</span>
          </Link>
          <span>/</span>
          <span className="text-text-main font-semibold truncate max-w-[200px] sm:max-w-none">
            Lesson {lesson.number}: {lesson.title}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {prevLesson && (
            <Link
              to={`/learn/pandas/${prevLesson.slug}`}
              className="px-2.5 py-1 rounded bg-subtle hover:bg-subtle/80 text-text-main text-xs border border-border flex items-center gap-1"
            >
              <ArrowLeft className="w-3 h-3" />
              <span className="hidden sm:inline">Prev</span>
            </Link>
          )}
          {nextLesson && (
            <Link
              to={`/learn/pandas/${nextLesson.slug}`}
              className="px-2.5 py-1 rounded bg-subtle hover:bg-subtle/80 text-text-main text-xs border border-border flex items-center gap-1"
            >
              <span className="hidden sm:inline">Next</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          )}
        </div>
      </div>

      {/* Header Card */}
      <div className="p-6 rounded-2xl bg-surface border border-border space-y-4 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Badge variant="accent" size="sm" className="bg-[#130754]/10 text-[#130754] dark:text-[#00D2FF] border-[#130754]/20">
                Lesson {lesson.number} of 12
              </Badge>
              <span className="text-xs text-text-muted flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {lesson.estimatedMinutes} mins
              </span>
            </div>
            <h1 className="font-raleway text-2xl sm:text-3xl font-bold text-text-main tracking-tight">
              {lesson.title}
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-text-muted">
              {solvedCountInLesson} of {lesson.exercises.length} solved
            </span>
            <div className="w-20 h-2 bg-subtle rounded-full overflow-hidden border border-border">
              <div
                className="h-full bg-emerald-500 transition-all duration-300"
                style={{
                  width: `${(solvedCountInLesson / (lesson.exercises.length || 1)) * 100}%`,
                }}
              />
            </div>
          </div>
        </div>

        <p className="text-sm text-text-muted leading-relaxed">
          {lesson.shortDescription}
        </p>

        {/* Tab Controls */}
        <div className="pt-2">
          <Tabs
            tabs={[
              {
                id: 'learn',
                label: '1. Concepts & DataFrames',
              },
              {
                id: 'exercises',
                label: `2. Interactive Tasks (${solvedCountInLesson}/${lesson.exercises.length})`,
              },
              {
                id: 'quiz',
                label: `3. Knowledge Quiz (${lesson.quiz.length} Qs)`,
              },
            ]}
            activeTab={activeTab}
            onChange={(tabId) => setActiveTab(tabId as any)}
          />
        </div>
      </div>

      {/* Tab 1: Learn / Sections */}
      {activeTab === 'learn' && (
        <div className="space-y-8">
          {/* Learning Objectives */}
          <Card className="p-5 bg-surface border-border">
            <h3 className="text-sm font-semibold text-text-main flex items-center gap-2 mb-3">
              <Target className="w-4 h-4 text-[#130754] dark:text-[#00D2FF]" />
              Learning Objectives
            </h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-text-muted">
              {lesson.learningObjectives.map((obj, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#130754] dark:bg-[#00D2FF] mt-1.5 shrink-0" />
                  <span>{obj}</span>
                </li>
              ))}
            </ul>
          </Card>

          {/* Lesson Content Sections */}
          <div className="space-y-6">
            {lesson.sections.map((section, idx) => (
              <Card key={section.id || idx} className="p-6 bg-surface border-border space-y-4">
                <h2 className="text-lg font-bold text-text-main tracking-tight">
                  {section.title}
                </h2>

                <div className="text-sm text-text-muted leading-relaxed whitespace-pre-line space-y-2">
                  {section.content}
                </div>

                {section.formula && (
                  <div className="p-3 bg-subtle rounded-xl border border-border font-mono text-xs text-text-main">
                    {section.formula}
                  </div>
                )}

                {section.codeExample && (
                  <div className="rounded-xl border border-border overflow-hidden bg-[#1E1E1E]">
                    <div className="px-4 py-2 bg-[#181818] border-b border-[#2d2d2d] flex items-center justify-between text-[11px] text-neutral-400 font-mono">
                      <span>example.py</span>
                      <span>pandas v2.2</span>
                    </div>
                    <pre className="p-4 font-mono text-xs text-neutral-200 overflow-x-auto leading-relaxed">
                      {section.codeExample.code}
                    </pre>
                    {section.codeExample.explanation && (
                      <div className="px-4 py-2 bg-[#252526] border-t border-[#2d2d2d] text-[11px] text-neutral-300">
                        {section.codeExample.explanation}
                      </div>
                    )}
                  </div>
                )}
              </Card>
            ))}
          </div>

          {/* Bottom Action */}
          <div className="flex justify-end pt-4">
            <Button
              variant="primary"
              size="lg"
              onClick={() => setActiveTab('exercises')}
              className="bg-[#130754] hover:bg-[#1f0c82] text-white"
            >
              <span>Practice with Code</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      )}

      {/* Tab 2: Exercises & Code Workspace */}
      {activeTab === 'exercises' && currentExercise && (
        <div className="space-y-6">
          {/* Exercise Selector Strip */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            {lesson.exercises.map((ex, idx) => {
              const isExSolved = !!solvedExercises[ex.id];
              const isSelected = activeExerciseIndex === idx;
              return (
                <button
                  key={ex.id}
                  type="button"
                  onClick={() => setActiveExerciseIndex(idx)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium border flex items-center gap-2 whitespace-nowrap transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-primary text-white border-primary shadow-xs'
                      : isExSolved
                      ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/20'
                      : 'bg-surface text-text-muted border-border hover:text-text-main'
                  }`}
                >
                  {isExSolved ? (
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  ) : (
                    <span className="w-3.5 h-3.5 rounded-full border border-current flex items-center justify-center text-[9px]">
                      {idx + 1}
                    </span>
                  )}
                  <span>Task {idx + 1}: {ex.title}</span>
                </button>
              );
            })}
          </div>

          <PandasWorkspace
            exercise={currentExercise}
            isSolved={isCurrentExerciseSolved}
            onSolve={(solvedCode) => handleSolve(currentExercise.id, solvedCode)}
            onNextTask={
              activeExerciseIndex < lesson.exercises.length - 1
                ? () => setActiveExerciseIndex((prev) => prev + 1)
                : undefined
            }
            onGoToQuiz={
              activeExerciseIndex === lesson.exercises.length - 1
                ? () => setActiveTab('quiz')
                : undefined
            }
          />
        </div>
      )}

      {/* Tab 3: Quiz */}
      {activeTab === 'quiz' && (
        <div className="space-y-6">
          <Card className="p-6 bg-surface border-border">
            <h3 className="text-base font-bold text-text-main mb-1">
              Pandas Knowledge Check
            </h3>
            <p className="text-xs text-text-muted mb-6">
              Test your grasp of Series, DataFrames, indexing, and tabular data operations in this lesson.
            </p>

            <QuizRunner
              quizId={lesson.id}
              title={`${lesson.title} - Quiz`}
              questions={lesson.quiz}
              onComplete={(_score) => {
                // Lesson quiz completed
              }}
            />
          </Card>

          {nextLesson && (
            <div className="flex justify-end pt-4">
              <Button
                variant="primary"
                onClick={() => navigate(`/learn/pandas/${nextLesson.slug}`)}
                className="bg-[#130754] hover:bg-[#1f0c82] text-white"
              >
                <span>Continue to Lesson {nextLesson.number}: {nextLesson.title}</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
