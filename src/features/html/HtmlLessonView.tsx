import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  getHtmlLessonBySlug,
  getNextHtmlLesson,
  getPrevHtmlLesson,
} from '../../data/htmlLessons';
import { HtmlWorkspace } from './HtmlWorkspace';
import { QuizRunner } from '../quizzes/QuizRunner';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Tabs } from '../../components/ui/Tabs';
import { HtmlLogo } from '../../components/ui/LanguageLogos';
import {
  Clock,
  CheckCircle2,
  ArrowLeft,
  ArrowRight,
  Code2,
  Sparkles,
  Target,
  Globe,
  Tag,
} from 'lucide-react';
import { cn } from '../../lib/utils';

export function HtmlLessonView() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const lesson = getHtmlLessonBySlug(slug || '');
  const [activeTab, setActiveTab] = useState<'learn' | 'exercises' | 'quiz'>('learn');
  const [activeExerciseIndex, setActiveExerciseIndex] = useState(0);
  const [solvedExercises, setSolvedExercises] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('ceeras_html_solved');
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
        <h2 className="text-xl font-bold text-text-main">HTML Lesson Not Found</h2>
        <p className="text-sm text-text-muted">The requested lesson does not exist in the curriculum.</p>
        <Button variant="primary" onClick={() => navigate('/learn/html')}>
          Browse HTML Curriculum
        </Button>
      </div>
    );
  }

  const prevLesson = getPrevHtmlLesson(lesson.id);
  const nextLesson = getNextHtmlLesson(lesson.id);

  const currentExercise = lesson.exercises[activeExerciseIndex];
  const isCurrentExerciseSolved = !!solvedExercises[currentExercise?.id];
  const solvedCountInLesson = lesson.exercises.filter((e) => solvedExercises[e.id]).length;

  const handleSolve = (exId: string, _code: string) => {
    setSolvedExercises((prev) => {
      const updated = { ...prev, [exId]: true };
      try {
        localStorage.setItem('ceeras_html_solved', JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Topbar Breadcrumb */}
      <div className="flex items-center justify-between gap-2 text-xs text-text-muted">
        <div className="flex items-center gap-2">
          <Link to="/learn/html" className="hover:text-text-main flex items-center gap-1.5 font-medium">
            <HtmlLogo className="w-3.5 h-3.5" />
            <span>HTML5 Academy</span>
          </Link>
          <span>/</span>
          <span className="text-text-main font-semibold">Lesson {lesson.number}</span>
        </div>
      </div>

      {/* Hero Header */}
      <div className="space-y-3 border-b border-border pb-5">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="accent" size="sm" className="bg-[#E44D26]/15 text-[#E44D26] border-[#E44D26]/30">
            HTML5 • Lesson {lesson.number}
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
            label: '1. Concepts & Tag Anatomy',
          },
          {
            id: 'exercises',
            label: `2. Coding & Live Preview (${solvedCountInLesson}/${lesson.exercises.length})`,
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

              {/* Tag References Box if any */}
              {section.tagReferences && section.tagReferences.length > 0 && (
                <div className="pt-2 space-y-2">
                  <span className="text-xs font-semibold text-text-muted flex items-center gap-1.5">
                    <Tag className="w-3.5 h-3.5 text-[#E44D26]" />
                    <span>Tag Reference &amp; Syntax:</span>
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {section.tagReferences.map((ref, idx) => (
                      <div
                        key={idx}
                        className="p-3 bg-subtle border border-border rounded-lg space-y-1 text-xs"
                      >
                        <div className="flex items-center justify-between">
                          <code className="font-mono font-bold text-[#E44D26] bg-[#E44D26]/10 px-1.5 py-0.5 rounded">
                            {ref.tag}
                          </code>
                          {ref.selfClosing && (
                            <span className="text-[10px] text-text-muted italic">Self-closing void</span>
                          )}
                        </div>
                        <p className="text-text-muted text-[11px] leading-relaxed">
                          {ref.description}
                        </p>
                        <div className="font-mono text-[10px] text-text-muted bg-surface p-1.5 rounded border border-border/60">
                          {ref.syntax}
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
                      <Code2 className="w-3.5 h-3.5 text-[#E44D26]" />
                      <span>Code Example:</span>
                    </span>
                    <span className="text-[11px]">{section.codeExample.explanation}</span>
                  </div>
                  <pre className="p-3 bg-editor-bg border border-border rounded-lg font-mono text-xs text-editor-text overflow-x-auto leading-relaxed">
                    <code>{section.codeExample.code}</code>
                  </pre>
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
              className="gap-2 bg-[#E44D26] hover:bg-[#c83d19] text-white"
            >
              <span>Start Live Practice Exercises</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}

      {/* TAB 2: HANDS-ON CODING & LIVE PREVIEW WORKSPACE */}
      {activeTab === 'exercises' && (
        <div className="space-y-4 animate-fadeIn">
          {/* Multiple tasks selector tabs if more than 1 exercise */}
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
                        ? 'bg-[#E44D26] text-white border-[#E44D26] shadow-2xs'
                        : 'bg-surface text-text-muted border-border hover:bg-subtle'
                    )}
                  >
                    {isThisSolved && <CheckCircle2 className="w-3 h-3 text-emerald-400" />}
                    <span>Task {ex.order}</span>
                  </button>
                );
              })}
            </div>
          )}

          {currentExercise && (
            <HtmlWorkspace
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
                Test your understanding of HTML tags and document rules.
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
              navigate(`/learn/html/${prevLesson.slug}`);
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
              navigate(`/learn/html/${nextLesson.slug}`);
              setActiveTab('learn');
              setActiveExerciseIndex(0);
            }}
            className="text-xs gap-1.5 bg-[#E44D26] hover:bg-[#c83d19] text-white"
          >
            <span>Lesson {nextLesson.number}: {nextLesson.title}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Button>
        ) : (
          <Button
            variant="primary"
            size="sm"
            onClick={() => navigate('/learn/html')}
            className="text-xs gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white"
          >
            <span>Complete HTML Track</span>
            <CheckCircle2 className="w-3.5 h-3.5" />
          </Button>
        )}
      </div>
    </div>
  );
}
