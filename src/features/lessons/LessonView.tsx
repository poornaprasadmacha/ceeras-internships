import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getLessonBySlug, getNextLesson, getPrevLesson } from '../../data/lessons';
import { useProgress } from '../../hooks/useProgress';
import { ExerciseWorkspace } from './ExerciseWorkspace';
import { TerminologyMatcher } from './TerminologyMatcher';
import { ElementIdentifier } from './ElementIdentifier';
import { InteractiveTableVisualizer } from './InteractiveTableVisualizer';
import { SqlSyntaxBreakdown } from './SqlSyntaxBreakdown';
import { InteractiveQuerySimulator } from './InteractiveQuerySimulator';
import { QuizRunner } from '../quizzes/QuizRunner';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Tabs } from '../../components/ui/Tabs';
import {
  Bookmark,
  CheckCircle2,
  Clock,
  ArrowLeft,
  ArrowRight,
  FileText,
  Sparkles,
  Zap,
  Target,
  Code2,
  CheckSquare,
} from 'lucide-react';
import { cn } from '../../lib/utils';

export function LessonView() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const lesson = getLessonBySlug(slug || '');
  const {
    lessonsProgress,
    exerciseAttempts,
    quizAttempts,
    notes,
    bookmarks,
    markLessonStarted,
    recordExerciseSolved,
    recordQuizAttempt,
    saveLessonNote,
    toggleBookmarkItem,
  } = useProgress();

  const [activeTab, setActiveTab] = useState<'learn' | 'exercises' | 'quiz' | 'notes'>('learn');
  const [activeExerciseIndex, setActiveExerciseIndex] = useState(0);
  const [noteText, setNoteText] = useState('');
  const [noteSavedFeedback, setNoteSavedFeedback] = useState(false);

  // Sync lesson started state
  useEffect(() => {
    if (lesson) {
      markLessonStarted(lesson.id);
      window.scrollTo(0, 0);
    }
  }, [lesson?.id]);

  // Sync existing note
  useEffect(() => {
    if (lesson && notes[lesson.id]) {
      setNoteText(notes[lesson.id].content);
    } else {
      setNoteText('');
    }
  }, [lesson?.id, notes]);

  if (!lesson) {
    return (
      <div className="text-center py-16 space-y-4">
        <h2 className="text-xl font-bold text-text-main">Lesson Not Found</h2>
        <p className="text-sm text-text-muted">The requested lesson does not exist in the curriculum.</p>
        <Button variant="primary" onClick={() => navigate('/learn')}>
          Browse All Lessons
        </Button>
      </div>
    );
  }

  const prevLesson = getPrevLesson(lesson.id);
  const nextLesson = getNextLesson(lesson.id);

  const lessonProgressRecord = lessonsProgress[lesson.id];
  const isLessonCompleted = lessonProgressRecord?.isCompleted || false;
  const isBookmarked = bookmarks.some((b) => b.lessonId === lesson.id);

  const currentExercise = lesson.exercises[activeExerciseIndex];
  const isCurrentExerciseSolved = !!exerciseAttempts[currentExercise?.id]?.isSolved;
  const currentQuizAttempt = quizAttempts[`quiz_${lesson.id}`];

  // Solved exercises in this lesson
  const solvedCountInLesson = lesson.exercises.filter((e) => exerciseAttempts[e.id]?.isSolved).length;

  const handleSaveNote = async () => {
    await saveLessonNote(lesson.id, noteText);
    setNoteSavedFeedback(true);
    setTimeout(() => setNoteSavedFeedback(false), 2000);
  };

  const handleQuizComplete = async (
    score: number,
    total: number,
    userAnswers: Record<string, string>
  ) => {
    await recordQuizAttempt(`quiz_${lesson.id}`, score, total, userAnswers, lesson.id);
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Breadcrumb & Navigation Topbar */}
      <div className="flex items-center justify-between gap-2 text-xs text-text-muted">
        <div className="flex items-center gap-2">
          <Link to="/learn" className="hover:text-text-main">
            Curriculum
          </Link>
          <span>/</span>
          <span className="text-text-main font-medium">Lesson {lesson.number}</span>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => toggleBookmarkItem(lesson.id, lesson.title)}
            className="text-xs"
          >
            <Bookmark
              className={cn(
                'w-3.5 h-3.5',
                isBookmarked ? 'fill-primary text-primary' : 'text-text-muted'
              )}
            />
            <span>{isBookmarked ? 'Saved' : 'Bookmark'}</span>
          </Button>
        </div>
      </div>

      {/* Hero Header */}
      <div className="space-y-3 border-b border-border pb-5">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="accent" size="sm">
            Lesson {lesson.number}
          </Badge>
          <span className="flex items-center gap-1 text-xs text-text-muted font-medium">
            <Clock className="w-3.5 h-3.5" />
            <span>{lesson.estimatedMinutes} mins</span>
          </span>
          {isLessonCompleted && (
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
          { id: 'learn', label: '1. Visual Concepts' },
          {
            id: 'exercises',
            label: '2. Hands-On Coding',
            count: `${solvedCountInLesson}/${lesson.exercises.length}` as any,
          },
          {
            id: 'quiz',
            label: '3. Knowledge Quiz',
            count: currentQuizAttempt ? (currentQuizAttempt.passed ? 'Passed' : 'Retake') : undefined,
          },
          { id: 'notes', label: 'Notes' },
        ]}
      />

      {/* TAB 1: Visual Concepts & Interactive Elements */}
      {activeTab === 'learn' && (
        <div className="space-y-6 max-w-4xl">
          {/* Action CTA Hero Box */}
          <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-xs font-bold uppercase tracking-wider text-primary">
                  Interactive Learning Experience
                </span>
              </div>
              <p className="text-xs sm:text-sm text-text-main font-medium">
                Learn with visual breakdown cards, interactive table inspectors, and live query simulators below.
              </p>
            </div>
            <Button
              variant="primary"
              size="md"
              onClick={() => setActiveTab('exercises')}
              className="shrink-0 text-xs"
            >
              <Code2 className="w-4 h-4" />
              <span>Jump to Coding Tasks ({lesson.exercises.length})</span>
            </Button>
          </div>

          {/* Core Objectives Points */}
          <Card className="p-4 sm:p-5 space-y-3">
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4 text-primary" />
              <h2 className="text-sm font-bold text-text-main">What You Will Master:</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-text-main">
              {lesson.learningObjectives.map((obj, i) => (
                <div key={i} className="flex items-start gap-2 p-2 rounded bg-subtle/50 border border-border/50">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                  <span className="leading-snug">{obj}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Interactive Visual Table Inspector */}
          <InteractiveTableVisualizer
            tableName={lesson.dataset.tableName}
            columns={lesson.dataset.sampleColumns}
            rows={lesson.dataset.sampleRows}
            description={`Dataset: ${lesson.dataset.description}`}
          />

          {/* Lesson 2 Special: Interactive Query Simulator */}
          {lesson.number === 2 && (
            <InteractiveQuerySimulator dataset={lesson.dataset} />
          )}

          {/* Interactive SQL Statement Anatomy */}
          <SqlSyntaxBreakdown
            tableName={lesson.dataset.tableName}
          />

          {/* Bite-sized Concept Cards */}
          <div className="space-y-4">
            <h2 className="text-base font-bold text-text-main flex items-center gap-2">
              <Zap className="w-4 h-4 text-primary" />
              <span>Key Concept Takeaways</span>
            </h2>

            <div className="grid grid-cols-1 gap-4">
              {lesson.sections.map((section, idx) => (
                <Card key={section.id} className="p-4 sm:p-5 space-y-2.5">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" size="sm">
                      Part {idx + 1}
                    </Badge>
                    <h3 className="text-sm font-bold text-text-main">
                      {section.title}
                    </h3>
                  </div>

                  <div className="text-xs sm:text-sm text-text-main/90 leading-relaxed space-y-2 whitespace-pre-line">
                    {section.content}
                  </div>

                  {section.codeExample && (
                    <div className="p-3 bg-editor-bg border border-border rounded-lg space-y-1.5 mt-2">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-text-muted block">
                        SQL Example
                      </span>
                      <pre className="font-mono text-xs text-editor-text font-semibold whitespace-pre-wrap">
                        {section.codeExample.sql}
                      </pre>
                      <p className="text-[11px] text-text-muted leading-relaxed pt-1 border-t border-border/40">
                        {section.codeExample.explanation}
                      </p>
                    </div>
                  )}
                </Card>
              ))}
            </div>
          </div>

          {/* Interactive Check / Terminology Matching (Lesson 1) */}
          {lesson.terminologyMatching && (
            <div className="pt-2">
              <TerminologyMatcher items={lesson.terminologyMatching} />
            </div>
          )}

          {/* Interactive Element Identifier (Lesson 1) */}
          {lesson.interactiveCheck && (
            <div className="pt-2">
              <ElementIdentifier check={lesson.interactiveCheck} />
            </div>
          )}

          {/* Forward CTA to exercises */}
          <div className="flex items-center justify-between p-4 bg-surface border border-border rounded-xl shadow-subtle">
            <div>
              <span className="text-xs font-bold text-text-main block">Ready for Practice?</span>
              <p className="text-[11px] text-text-muted">
                Execute queries in our local SQLite engine with instant automated verification.
              </p>
            </div>
            <Button variant="primary" size="md" onClick={() => setActiveTab('exercises')}>
              <span>Start Exercises</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}

      {/* TAB 2: Interactive Exercises (Code Editor with Quick Chips) */}
      {activeTab === 'exercises' && (
        <div className="space-y-6">
          {/* Exercise Stepper Pills */}
          {lesson.exercises.length > 1 && (
            <div className="flex flex-wrap items-center gap-2 border-b border-border pb-3 select-none">
              <span className="text-xs font-semibold text-text-muted mr-1">Tasks:</span>
              {lesson.exercises.map((ex, idx) => {
                const isSolved = !!exerciseAttempts[ex.id]?.isSolved;
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

          {/* Active Workspace */}
          {currentExercise && (
            <ExerciseWorkspace
              key={currentExercise.id}
              exercise={currentExercise}
              dataset={lesson.dataset}
              isSolved={isCurrentExerciseSolved}
              onSolve={(q) => recordExerciseSolved(currentExercise.id, lesson.id, q)}
              savedQuery={exerciseAttempts[currentExercise.id]?.userQuery}
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

          {/* Navigation between exercises */}
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
              <Button
                variant="primary"
                size="sm"
                onClick={() => setActiveTab('quiz')}
              >
                <span>Take Knowledge Quiz</span>
                <CheckSquare className="w-3.5 h-3.5" />
              </Button>
            )}
          </div>
        </div>
      )}

      {/* TAB 3: Knowledge Quiz */}
      {activeTab === 'quiz' && (
        <div className="space-y-6">
          <QuizRunner
            key={`quiz_${lesson.id}`}
            quizId={`quiz_${lesson.id}`}
            title={`Lesson ${lesson.number} Knowledge Quiz`}
            description="Test your conceptual understanding of this lesson. Pass mark: 80%."
            questions={lesson.quiz}
            onComplete={handleQuizComplete}
            initialAnswers={currentQuizAttempt?.userAnswers}
            initialScore={currentQuizAttempt?.score}
            initialPassed={currentQuizAttempt?.passed}
          />
        </div>
      )}

      {/* TAB 4: Notes */}
      {activeTab === 'notes' && (
        <Card className="p-6 max-w-2xl mx-auto space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-primary" />
              <h3 className="text-base font-semibold text-text-main">
                Personal Lesson Notes
              </h3>
            </div>
            {noteSavedFeedback && (
              <Badge variant="success" size="sm">
                Saved locally
              </Badge>
            )}
          </div>

          <p className="text-xs text-text-muted">
            Write personal key takeaways, syntax reminders, or query patterns. Notes are stored
            locally on your device.
          </p>

          <textarea
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
            placeholder="Type your notes for this lesson here..."
            className="w-full h-48 p-3 rounded-md bg-surface border border-border text-sm text-text-main focus:outline-none focus:ring-1 focus:ring-primary font-sans leading-relaxed resize-y"
          />

          <div className="flex items-center justify-end">
            <Button variant="primary" size="sm" onClick={handleSaveNote}>
              Save Notes
            </Button>
          </div>
        </Card>
      )}

      {/* Footer Nav between Lessons */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-border">
        {prevLesson ? (
          <Button
            variant="outline"
            size="md"
            onClick={() => navigate(`/learn/${prevLesson.slug}`)}
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
            variant={isLessonCompleted ? 'primary' : 'outline'}
            size="md"
            onClick={() => navigate(`/learn/${nextLesson.slug}`)}
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
