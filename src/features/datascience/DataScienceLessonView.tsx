import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  getDataScienceLessonBySlug,
  getNextDataScienceLesson,
  getPrevDataScienceLesson,
} from '../../data/dataScienceLessons';
import { DataScienceWorkspace } from './DataScienceWorkspace';
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
  BarChart3,
  Sigma,
} from 'lucide-react';

export function DataScienceLessonView() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const lesson = getDataScienceLessonBySlug(slug || '');
  const [activeTab, setActiveTab] = useState<'learn' | 'exercises' | 'quiz'>('learn');
  const [activeExerciseIndex, setActiveExerciseIndex] = useState(0);
  const [solvedExercises, setSolvedExercises] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('ceeras_ds_solved');
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
        <h2 className="text-xl font-bold text-text-main">Data Science Lesson Not Found</h2>
        <p className="text-sm text-text-muted">The requested lesson does not exist in the curriculum.</p>
        <Button variant="primary" onClick={() => navigate('/learn/datascience')}>
          Browse Data Science Curriculum
        </Button>
      </div>
    );
  }

  const prevLesson = getPrevDataScienceLesson(lesson.id);
  const nextLesson = getNextDataScienceLesson(lesson.id);

  const currentExercise = lesson.exercises[activeExerciseIndex];
  const isCurrentExerciseSolved = !!solvedExercises[currentExercise?.id];
  const solvedCountInLesson = lesson.exercises.filter((e) => solvedExercises[e.id]).length;

  const handleSolve = (exId: string, _code: string) => {
    setSolvedExercises((prev) => {
      const updated = { ...prev, [exId]: true };
      try {
        localStorage.setItem('ceeras_ds_solved', JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Topbar Breadcrumb */}
      <div className="flex items-center justify-between gap-2 text-xs text-text-muted">
        <div className="flex items-center gap-2">
          <Link to="/learn/datascience" className="hover:text-text-main flex items-center gap-1.5 font-medium">
            <PandasLogo className="w-3.5 h-3.5 rounded" />
            <span>Data Science Track</span>
          </Link>
          <span>/</span>
          <span className="text-text-main font-semibold">Lesson {lesson.number}</span>
        </div>
      </div>

      {/* Hero Header */}
      <div className="space-y-3 border-b border-border pb-5">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="accent" size="sm" className="bg-[#130754]/15 text-[#130754] dark:text-[#E70488] border-[#130754]/30">
            Zero to Hero • Lesson {lesson.number}
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

        <p className="text-sm text-text-muted max-w-3xl leading-relaxed">
          {lesson.shortDescription}
        </p>

        {/* Objectives */}
        <div className="pt-2 flex flex-wrap gap-2">
          {lesson.learningObjectives.map((obj, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs bg-subtle text-text-muted border border-border"
            >
              <Target className="w-3 h-3 text-[#E70488]" />
              <span>{obj}</span>
            </span>
          ))}
        </div>
      </div>

      {/* 3-Tab Learning View */}
      <Tabs
        activeTab={activeTab}
        onChange={(val) => setActiveTab(val as any)}
        tabs={[
          {
            id: 'learn',
            label: '1. Concepts & Formulas',
          },
          {
            id: 'exercises',
            label: `2. Interactive Workspace (${solvedCountInLesson}/${lesson.exercises.length})`,
            count: solvedCountInLesson,
          },
          {
            id: 'quiz',
            label: `3. Knowledge Quiz (${lesson.quiz.length} Questions)`,
          },
        ]}
      />

      {/* TAB 1: CONCEPTS & FORMULAS */}
      {activeTab === 'learn' && (
        <div className="space-y-6 animate-fadeIn">
          {lesson.sections.map((section) => (
            <Card key={section.id} className="p-5 sm:p-6 bg-surface border-border space-y-4">
              <div className="flex items-center gap-2">
                <Sigma className="w-4 h-4 text-[#E70488]" />
                <h2 className="font-raleway font-bold text-lg text-text-main">
                  {section.title}
                </h2>
              </div>

              <div className="prose prose-sm dark:prose-invert max-w-none text-text-main/90 leading-relaxed whitespace-pre-line font-normal">
                {section.content}
              </div>

              {/* Code Example Preview */}
              {section.codeExample && (
                <div className="pt-3 space-y-2">
                  <div className="flex items-center justify-between text-xs text-text-muted">
                    <span className="font-semibold flex items-center gap-1.5">
                      <Code2 className="w-3.5 h-3.5 text-[#E70488]" />
                      <span>Data Science Code Example:</span>
                    </span>
                    <span className="text-[11px]">{section.codeExample.explanation}</span>
                  </div>
                  <pre className="p-3 bg-editor-bg border border-border rounded-lg font-mono text-xs text-editor-text overflow-x-auto leading-relaxed">
                    <code>{section.codeExample.code}</code>
                  </pre>
                  {section.codeExample.output && (
                    <div className="p-2.5 bg-subtle border border-border rounded font-mono text-[11px] text-text-muted">
                      <span className="font-bold text-text-main block mb-0.5">Execution Output:</span>
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
              className="gap-2 bg-[#130754] hover:bg-[#1f0c82] text-white font-bold"
            >
              <span>Launch Interactive Data Workspace</span>
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
                    className="px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer border bg-surface text-text-muted border-border hover:bg-subtle"
                  >
                    {isThisSolved && <CheckCircle2 className="w-3 h-3 text-emerald-500" />}
                    <span>Task {ex.order}</span>
                  </button>
                );
              })}
            </div>
          )}

          {currentExercise && (
            <DataScienceWorkspace
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
                Verify your statistical intuition and data science reasoning.
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
              navigate(`/learn/datascience/${prevLesson.slug}`);
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
              navigate(`/learn/datascience/${nextLesson.slug}`);
              setActiveTab('learn');
              setActiveExerciseIndex(0);
            }}
            className="text-xs gap-1.5 bg-[#130754] hover:bg-[#1f0c82] text-white font-bold"
          >
            <span>Lesson {nextLesson.number}: {nextLesson.title}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Button>
        ) : (
          <Button
            variant="primary"
            size="sm"
            onClick={() => navigate('/learn/datascience')}
            className="text-xs gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white"
          >
            <span>Complete Data Science Track</span>
            <CheckCircle2 className="w-3.5 h-3.5" />
          </Button>
        )}
      </div>
    </div>
  );
}
