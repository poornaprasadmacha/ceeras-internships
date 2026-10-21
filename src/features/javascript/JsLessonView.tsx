import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  getJsLessonBySlug,
  getNextJsLesson,
  getPrevJsLesson,
} from '../../data/jsLessons';
import { JsWorkspace } from './JsWorkspace';
import { QuizRunner } from '../quizzes/QuizRunner';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Tabs } from '../../components/ui/Tabs';
import { JavaScriptLogo } from '../../components/ui/LanguageLogos';
import {
  Clock,
  CheckCircle2,
  ArrowLeft,
  ArrowRight,
  Code2,
  Target,
  Terminal,
  FileCode2,
} from 'lucide-react';
import { cn } from '../../lib/utils';

export function JsLessonView() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const lesson = getJsLessonBySlug(slug || '');
  const [activeTab, setActiveTab] = useState<'learn' | 'exercises' | 'quiz'>('learn');
  const [activeExerciseIndex, setActiveExerciseIndex] = useState(0);
  const [solvedExercises, setSolvedExercises] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('ceeras_js_solved');
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
        <h2 className="text-xl font-bold text-text-main">JavaScript Lesson Not Found</h2>
        <p className="text-sm text-text-muted">The requested lesson does not exist in the curriculum.</p>
        <Button variant="primary" onClick={() => navigate('/learn/javascript')}>
          Browse JavaScript Curriculum
        </Button>
      </div>
    );
  }

  const prevLesson = getPrevJsLesson(lesson.id);
  const nextLesson = getNextJsLesson(lesson.id);

  const currentExercise = lesson.exercises[activeExerciseIndex];
  const isCurrentExerciseSolved = !!solvedExercises[currentExercise?.id];
  const solvedCountInLesson = lesson.exercises.filter((e) => solvedExercises[e.id]).length;

  const handleSolve = (exId: string, _code: string) => {
    setSolvedExercises((prev) => {
      const updated = { ...prev, [exId]: true };
      try {
        localStorage.setItem('ceeras_js_solved', JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Topbar Breadcrumb */}
      <div className="flex items-center justify-between gap-2 text-xs text-text-muted">
        <div className="flex items-center gap-2">
          <Link to="/learn/javascript" className="hover:text-text-main flex items-center gap-1.5 font-medium">
            <JavaScriptLogo className="w-3.5 h-3.5 rounded" />
            <span>JavaScript Academy</span>
          </Link>
          <span>/</span>
          <span className="text-text-main font-semibold">Lesson {lesson.number}</span>
        </div>
      </div>

      {/* Hero Header */}
      <div className="space-y-3 border-b border-border pb-5">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="accent" size="sm" className="bg-amber-500/15 text-amber-700 dark:text-amber-400 border-amber-500/30">
            ES6+ • Lesson {lesson.number}
          </Badge>
          <span className="flex items-center gap-1 text-xs text-text-muted font-medium">
            <Clock className="w-3.5 h-3.5" />
            <span>{lesson.estimatedMinutes} mins</span>
          </span>
          {solvedCountInLesson === lesson.exercises.length && (
            <Badge variant="success" size="sm" className="gap-1 text-xs py-0.5">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>All Tasks Solved</span>
            </Badge>
          )}
        </div>

        <h1 className="font-raleway text-2xl sm:text-3xl font-bold tracking-tight text-text-main">
          {lesson.title}
        </h1>
      </div>

      {/* 3-Tab Learning View */}
      <Tabs
        activeTab={activeTab}
        onChange={(val) => setActiveTab(val as any)}
        tabs={[
          {
            id: 'learn',
            label: '1. Concepts & Code Examples',
          },
          {
            id: 'exercises',
            label: `2. Interactive Coding (${solvedCountInLesson}/${lesson.exercises.length})`,
            count: solvedCountInLesson,
          },
          {
            id: 'quiz',
            label: `3. Knowledge Quiz (${lesson.quiz.length} Questions)`,
          },
        ]}
      />

      {/* TAB 1: CONCEPTS & EXAMPLES */}
      {activeTab === 'learn' && (
        <div className="space-y-6 animate-fadeIn">
          {lesson.sections.map((section) => (
            <Card key={section.id} className="p-5 sm:p-6 bg-surface border-border space-y-4">
              <h2 className="font-raleway font-bold text-lg text-text-main">
                {section.title}
              </h2>

              <div className="prose prose-sm dark:prose-invert max-w-none text-text-main/90 leading-relaxed whitespace-pre-line">
                {section.content}
              </div>

              {/* Syntax Summary Box if any */}
              {section.syntaxSummary && section.syntaxSummary.length > 0 && (
                <div className="pt-2 space-y-2">
                  <span className="text-xs font-semibold text-text-muted flex items-center gap-1.5">
                    <FileCode2 className="w-3.5 h-3.5 text-amber-500" />
                    <span>Key Syntax Reference:</span>
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {section.syntaxSummary.map((ref, idx) => (
                      <div
                        key={idx}
                        className="p-3 bg-subtle border border-border rounded-lg space-y-1 text-xs"
                      >
                        <code className="font-mono font-bold text-amber-600 dark:text-amber-400 bg-amber-500/10 px-1.5 py-0.5 rounded">
                          {ref.keyword}
                        </code>
                        <p className="text-text-muted text-[11px] leading-relaxed">
                          {ref.description}
                        </p>
                        <div className="font-mono text-[10px] text-text-muted bg-surface p-1.5 rounded border border-border/60">
                          {ref.example}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Code Example Preview */}
              {section.codeExample && (
                <div className="pt-3 space-y-2">
                  <div className="flex items-center justify-between text-xs text-text-muted">
                    <span className="font-semibold flex items-center gap-1.5">
                      <Code2 className="w-3.5 h-3.5 text-amber-500" />
                      <span>Code Example:</span>
                    </span>
                    <span className="text-[11px]">{section.codeExample.explanation}</span>
                  </div>
                  <pre className="p-3 bg-editor-bg border border-border rounded-lg font-mono text-xs text-editor-text overflow-x-auto leading-relaxed">
                    <code>{section.codeExample.code}</code>
                  </pre>
                  {section.codeExample.output && (
                    <div className="p-2.5 bg-subtle border border-border rounded font-mono text-[11px] text-text-muted">
                      <span className="font-bold text-text-main block mb-0.5">Terminal Output:</span>
                      <code>{section.codeExample.output}</code>
                    </div>
                  )}
                </div>
              )}
            </Card>
          ))}

          {/* Call to action to jump to interactive exercises */}
          <div className="flex justify-end pt-2">
            <Button
              variant="primary"
              size="md"
              onClick={() => setActiveTab('exercises')}
              className="gap-2 bg-amber-500 hover:bg-amber-600 text-black font-bold"
            >
              <span>Start Interactive Coding Exercises</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}

      {/* TAB 2: HANDS-ON CODING & LIVE PREVIEW WORKSPACE */}
      {activeTab === 'exercises' && (
        <div className="space-y-4 animate-fadeIn">
          {lesson.exercises.length > 1 && (
            <div className="flex items-center gap-2 pb-1 overflow-x-auto">
              {lesson.exercises.map((ex, idx) => {
                const isThisSolved = !!solvedExercises[ex.id];
                const isSelected = idx === activeExerciseIndex;
                return (
                  <button
                    key={ex.id}
                    type="button"
                    onClick={() => setActiveExerciseIndex(idx)}
                    className={cn(
                      'px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer border',
                      isSelected
                        ? 'bg-amber-500 text-black border-amber-500 shadow-2xs font-bold'
                        : 'bg-surface text-text-muted border-border hover:bg-subtle'
                    )}
                  >
                    {isThisSolved && <CheckCircle2 className="w-3 h-3 text-emerald-500" />}
                    <span>Task {ex.order}</span>
                  </button>
                );
              })}
            </div>
          )}

          {currentExercise && (
            <JsWorkspace
              key={currentExercise.id}
              exercise={currentExercise}
              isSolved={isCurrentExerciseSolved}
              onSolve={(code) => handleSolve(currentExercise.id, code)}
              onNextTask={
                activeExerciseIndex < lesson.exercises.length - 1
                  ? () => setActiveExerciseIndex((i) => i + 1)
                  : undefined
              }
              onGoToQuiz={() => setActiveTab('quiz')}
            />
          )}
        </div>
      )}

      {/* TAB 3: KNOWLEDGE QUIZ */}
      {activeTab === 'quiz' && (
        <div className="animate-fadeIn">
          <Card className="p-6 bg-surface border-border">
            <div className="mb-4 pb-3 border-b border-border">
              <h2 className="font-raleway font-bold text-lg text-text-main">
                Lesson {lesson.number} Concept Check
              </h2>
              <p className="text-xs text-text-muted mt-0.5">
                Verify your understanding of modern JavaScript runtime behavior and syntax.
              </p>
            </div>

            <QuizRunner
              quizId={lesson.id}
              title={`${lesson.title} - Quiz`}
              questions={lesson.quiz}
              onComplete={(score, total, answers) => {
                // Completed quiz
              }}
            />
          </Card>
        </div>
      )}

      {/* Bottom Course Flow Navigation */}
      <div className="flex items-center justify-between pt-6 border-t border-border">
        {prevLesson ? (
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              navigate(`/learn/javascript/${prevLesson.slug}`);
              setActiveTab('learn');
              setActiveExerciseIndex(0);
            }}
            className="text-xs gap-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Lesson {prevLesson.number}: {prevLesson.title}</span>
          </Button>
        ) : (
          <div />
        )}

        {nextLesson ? (
          <Button
            variant="primary"
            size="sm"
            onClick={() => {
              navigate(`/learn/javascript/${nextLesson.slug}`);
              setActiveTab('learn');
              setActiveExerciseIndex(0);
            }}
            className="text-xs gap-1.5 bg-amber-500 hover:bg-amber-600 text-black font-bold"
          >
            <span>Lesson {nextLesson.number}: {nextLesson.title}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Button>
        ) : (
          <Button
            variant="primary"
            size="sm"
            onClick={() => navigate('/learn/javascript')}
            className="text-xs gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white"
          >
            <span>Complete JavaScript Track</span>
            <CheckCircle2 className="w-3.5 h-3.5" />
          </Button>
        )}
      </div>
    </div>
  );
}
