import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  getPythonLessonBySlug,
  getNextPythonLesson,
  getPrevPythonLesson,
} from '../../data/pythonLessons';
import { PythonWorkspace } from './PythonWorkspace';
import { QuizRunner } from '../quizzes/QuizRunner';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Tabs } from '../../components/ui/Tabs';
import { PythonLogo } from '../../components/ui/LanguageLogos';
import {
  Clock,
  CheckCircle2,
  ArrowLeft,
  ArrowRight,
  Code2,
  Sparkles,
  Target,
  Terminal,
} from 'lucide-react';
import { cn } from '../../lib/utils';

export function PythonLessonView() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const lesson = getPythonLessonBySlug(slug || '');
  const [activeTab, setActiveTab] = useState<'learn' | 'exercises' | 'quiz'>('learn');
  const [activeExerciseIndex, setActiveExerciseIndex] = useState(0);
  const [solvedExercises, setSolvedExercises] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('ceeras_python_solved');
      return saved ? JSON.parse(saved) : {};
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
        <h2 className="text-xl font-bold text-text-main">Python Lesson Not Found</h2>
        <p className="text-sm text-text-muted">The requested lesson does not exist in the curriculum.</p>
        <Button variant="primary" onClick={() => navigate('/learn/python')}>
          Browse Python Curriculum
        </Button>
      </div>
    );
  }

  const prevLesson = getPrevPythonLesson(lesson.id);
  const nextLesson = getNextPythonLesson(lesson.id);

  const currentExercise = lesson.exercises[activeExerciseIndex];
  const isCurrentExerciseSolved = !!solvedExercises[currentExercise?.id];
  const solvedCountInLesson = lesson.exercises.filter((e) => solvedExercises[e.id]).length;

  const handleSolve = (exId: string, _code: string) => {
    setSolvedExercises((prev) => {
      const updated = { ...prev, [exId]: true };
      try {
        localStorage.setItem('ceeras_python_solved', JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Topbar Breadcrumb */}
      <div className="flex items-center justify-between gap-2 text-xs text-text-muted">
        <div className="flex items-center gap-2">
          <Link to="/learn/python" className="hover:text-text-main flex items-center gap-1.5 font-medium">
            <PythonLogo className="w-3.5 h-3.5" />
            <span>Python Academy</span>
          </Link>
          <span>/</span>
          <span className="text-text-main font-semibold">Lesson {lesson.number}</span>
        </div>
      </div>

      {/* Hero Header */}
      <div className="space-y-3 border-b border-border pb-5">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="accent" size="sm" className="bg-[#3776AB]/15 text-[#3776AB] border-[#3776AB]/30">
            Python 3 • Lesson {lesson.number}
          </Badge>
          <span className="flex items-center gap-1 text-xs text-text-muted font-medium">
            <Clock className="w-3.5 h-3.5" />
            <span>{lesson.estimatedMinutes} mins</span>
          </span>
          {solvedCountInLesson === lesson.exercises.length && (
            <Badge variant="success" size="sm">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Completed</span>
            </Badge>
          )}
        </div>

        <h1 className="font-raleway text-2xl sm:text-3xl font-bold tracking-tight text-text-main">
          {lesson.title}
        </h1>
      </div>

      {/* Tabs */}
      <Tabs
        activeTab={activeTab}
        onChange={(tabId) => setActiveTab(tabId as any)}
        tabs={[
          { id: 'learn', label: '1. Concepts & Examples' },
          {
            id: 'exercises',
            label: '2. Hands-On Coding',
            count: `${solvedCountInLesson}/${lesson.exercises.length}` as any,
          },
          {
            id: 'quiz',
            label: '3. Knowledge Quiz',
          },
        ]}
      />

      {/* TAB 1: Visual Concepts */}
      {activeTab === 'learn' && (
        <div className="space-y-6 max-w-4xl">
          <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-xs font-bold uppercase tracking-wider text-primary">
                  Interactive Python Learning
                </span>
              </div>
              <p className="text-xs sm:text-sm text-text-main font-medium">
                Short bite-sized explanations with real executable Python code examples below.
              </p>
            </div>
            <Button
              variant="primary"
              size="md"
              onClick={() => setActiveTab('exercises')}
              className="shrink-0 text-xs"
            >
              <Code2 className="w-4 h-4" />
              <span>Start Coding Tasks ({lesson.exercises.length})</span>
            </Button>
          </div>

          {/* Objectives */}
          <Card className="p-4 sm:p-5 space-y-3">
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4 text-primary" />
              <h2 className="text-sm font-bold text-text-main">What You Will Master:</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-text-main">
              {lesson.learningObjectives.map((obj, i) => (
                <div key={i} className="flex items-start gap-2 bg-subtle/50 p-2.5 rounded-lg border border-border/40">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                  <span className="leading-relaxed">{obj}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Sections */}
          <div className="space-y-4">
            {lesson.sections.map((section, idx) => (
              <Card key={section.id} className="p-5 space-y-3 border-border">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" size="sm">
                    Part {idx + 1}
                  </Badge>
                  <h3 className="text-sm font-bold text-text-main">{section.title}</h3>
                </div>

                <div className="text-xs sm:text-sm text-text-main/90 leading-relaxed whitespace-pre-line">
                  {section.content}
                </div>

                {section.codeExample && (
                  <div className="p-3 bg-editor-bg border border-border rounded-lg space-y-2 mt-2">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-text-muted block">
                      Python Example
                    </span>
                    <pre className="font-mono text-xs text-editor-text font-semibold whitespace-pre-wrap">
                      {section.codeExample.code}
                    </pre>
                    {section.codeExample.output && (
                      <div className="pt-2 border-t border-border/40">
                        <span className="text-[10px] text-text-muted font-mono block">Output:</span>
                        <pre className="font-mono text-xs text-primary font-bold">
                          {section.codeExample.output}
                        </pre>
                      </div>
                    )}
                    <p className="text-[11px] text-text-muted leading-relaxed pt-1 border-t border-border/40">
                      {section.codeExample.explanation}
                    </p>
                  </div>
                )}
              </Card>
            ))}
          </div>

          {/* Forward CTA */}
          <div className="flex items-center justify-between p-4 bg-surface border border-border rounded-xl shadow-subtle">
            <div>
              <span className="text-xs font-bold text-text-main block">Ready to Write Python?</span>
              <p className="text-[11px] text-text-muted">
                Run your code instantly in the browser terminal with automated output verification.
              </p>
            </div>
            <Button variant="primary" size="md" onClick={() => setActiveTab('exercises')}>
              <span>Start Tasks</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}

      {/* TAB 2: Exercises */}
      {activeTab === 'exercises' && (
        <div className="space-y-6">
          {lesson.exercises.length > 1 && (
            <div className="flex flex-wrap items-center gap-2 border-b border-border pb-3">
              <span className="text-xs font-semibold text-text-muted mr-1">Tasks:</span>
              {lesson.exercises.map((ex, idx) => {
                const isSolved = !!solvedExercises[ex.id];
                const isSelected = activeExerciseIndex === idx;

                return (
                  <button
                    key={ex.id}
                    type="button"
                    onClick={() => setActiveExerciseIndex(idx)}
                    className={cn(
                      'px-3 py-1.5 rounded-md text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5',
                      isSelected
                        ? 'bg-primary text-white font-semibold shadow-subtle scale-105'
                        : isSolved
                        ? 'bg-success-subtle text-success border border-success/30'
                        : 'bg-subtle text-text-main border border-border hover:bg-border'
                    )}
                  >
                    <span>Task {idx + 1}</span>
                    {isSolved && <CheckCircle2 className="w-3.5 h-3.5" />}
                  </button>
                );
              })}
            </div>
          )}

          {currentExercise && (
            <PythonWorkspace
              key={currentExercise.id}
              exercise={currentExercise}
              isSolved={isCurrentExerciseSolved}
              onSolve={(c) => handleSolve(currentExercise.id, c)}
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
          )}

          <div className="flex items-center justify-between pt-4 border-t border-border">
            <Button
              variant="outline"
              size="sm"
              disabled={activeExerciseIndex === 0}
              onClick={() => setActiveExerciseIndex((prev) => prev - 1)}
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Previous Task</span>
            </Button>

            {activeExerciseIndex < lesson.exercises.length - 1 ? (
              <Button
                variant="primary"
                size="sm"
                onClick={() => setActiveExerciseIndex((prev) => prev + 1)}
              >
                <span>Next Task</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            ) : (
              <Button variant="primary" size="sm" onClick={() => setActiveTab('quiz')}>
                <span>Take Knowledge Quiz</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            )}
          </div>
        </div>
      )}

      {/* TAB 3: Quiz */}
      {activeTab === 'quiz' && (
        <div className="space-y-6">
          <QuizRunner
            key={`quiz_${lesson.id}`}
            quizId={`quiz_${lesson.id}`}
            title={`Lesson ${lesson.number} Knowledge Quiz`}
            description="Test your conceptual understanding of this Python lesson. Pass score: 80%."
            questions={lesson.quiz}
            onComplete={() => {}}
          />
        </div>
      )}

      {/* Footer Nav between Lessons */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-border">
        {prevLesson ? (
          <Button
            variant="outline"
            size="md"
            onClick={() => navigate(`/learn/python/${prevLesson.slug}`)}
            className="w-full sm:w-auto"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Lesson {prevLesson.number}: {prevLesson.title}</span>
          </Button>
        ) : (
          <div />
        )}

        {nextLesson && (
          <Button
            variant="primary"
            size="md"
            onClick={() => navigate(`/learn/python/${nextLesson.slug}`)}
            className="w-full sm:w-auto"
          >
            <span>Lesson {nextLesson.number}: {nextLesson.title}</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
