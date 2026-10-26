import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useParams, useNavigate, Link, useLocation } from 'react-router-dom';
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
  Eye,
  Check,
  ChevronDown,
} from 'lucide-react';
import { cn } from '../../lib/utils';

type SessionId = 'session-visuals' | 'session-coding' | 'session-quiz' | 'session-notes';

export function LessonView() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const location = useLocation();

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

  const [activeSession, setActiveSession] = useState<SessionId>('session-visuals');
  const [activeExerciseIndex, setActiveExerciseIndex] = useState(0);
  const [noteText, setNoteText] = useState('');
  const [noteSavedFeedback, setNoteSavedFeedback] = useState(false);

  // References to the 4 session containers for smooth scrolling
  const visualsRef = useRef<HTMLDivElement>(null);
  const codingRef = useRef<HTMLDivElement>(null);
  const quizRef = useRef<HTMLDivElement>(null);
  const notesRef = useRef<HTMLDivElement>(null);

  // Sync lesson started state
  useEffect(() => {
    if (lesson) {
      markLessonStarted(lesson.id);
    }
  }, [lesson?.id]);

  // Handle URL hash on initial load (e.g. #quiz, #notes, #exercises)
  useEffect(() => {
    const hash = window.location.hash.toLowerCase();
    if (hash === '#quiz' && quizRef.current) {
      quizRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveSession('session-quiz');
    } else if ((hash === '#notes' || hash === '#note') && notesRef.current) {
      notesRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveSession('session-notes');
    } else if ((hash === '#exercises' || hash === '#coding') && codingRef.current) {
      codingRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveSession('session-coding');
    } else {
      window.scrollTo(0, 0);
    }
  }, [lesson?.id, location.hash]);

  // Sync existing note
  useEffect(() => {
    if (lesson && notes[lesson.id]) {
      setNoteText(notes[lesson.id].content);
    } else {
      setNoteText('');
    }
  }, [lesson?.id, notes]);

  // Scroll to a specific session with top offset
  const scrollToSession = useCallback((sessionId: SessionId) => {
    setActiveSession(sessionId);
    let targetEl: HTMLElement | null = null;
    if (sessionId === 'session-visuals') targetEl = visualsRef.current;
    else if (sessionId === 'session-coding') targetEl = codingRef.current;
    else if (sessionId === 'session-quiz') targetEl = quizRef.current;
    else if (sessionId === 'session-notes') targetEl = notesRef.current;

    if (targetEl) {
      const yOffset = -70; // offset for sticky session nav bar
      const y = targetEl.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  }, []);

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
  const allExercisesSolved = solvedCountInLesson === lesson.exercises.length;

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
    <div className="space-y-6 pb-20 max-w-5xl mx-auto px-1 sm:px-2">
      {/* Breadcrumb & Navigation Topbar */}
      <div className="flex items-center justify-between gap-2 text-xs text-text-muted pt-1">
        <div className="flex items-center gap-1.5 sm:gap-2 truncate">
          <Link to="/learn" className="hover:text-text-main shrink-0">
            Curriculum
          </Link>
          <span>/</span>
          <span className="text-text-main font-medium truncate">Lesson {lesson.number}</span>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Button
            variant="outline"
            size="sm"
            onClick={() => toggleBookmarkItem(lesson.id, lesson.title)}
            className="text-xs h-8 px-2.5"
          >
            <Bookmark
              className={cn(
                'w-3.5 h-3.5',
                isBookmarked ? 'fill-primary text-primary' : 'text-text-muted'
              )}
            />
            <span className="hidden sm:inline">{isBookmarked ? 'Saved' : 'Bookmark'}</span>
          </Button>
        </div>
      </div>

      {/* Hero Header */}
      <div className="space-y-2 border-b border-border pb-4">
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

        <h1 className="font-raleway text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-text-main leading-snug">
          {lesson.title}
        </h1>
      </div>

      {/* ========================================================= */}
      {/* STICKY MOBILE-FIRST SESSION NAVIGATOR (TOP BAR)          */}
      {/* ========================================================= */}
      <div className="sticky top-0 z-30 bg-surface/95 backdrop-blur-md border-y sm:border sm:rounded-xl border-border py-2 px-2 shadow-2xs">
        <div className="flex items-center justify-between gap-1 overflow-x-auto scrollbar-none py-0.5">
          {/* Session 1 Pill: Visual Concepts */}
          <button
            type="button"
            onClick={() => scrollToSession('session-visuals')}
            className={cn(
              'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all shrink-0 cursor-pointer',
              activeSession === 'session-visuals'
                ? 'bg-primary text-white shadow-2xs font-bold'
                : 'text-text-muted hover:text-text-main hover:bg-subtle'
            )}
          >
            <Eye className="w-3.5 h-3.5 shrink-0" />
            <span>1. Visuals</span>
          </button>

          {/* Session 2 Pill: Hands-On Coding */}
          <button
            type="button"
            onClick={() => scrollToSession('session-coding')}
            className={cn(
              'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all shrink-0 cursor-pointer',
              activeSession === 'session-coding'
                ? 'bg-primary text-white shadow-2xs font-bold'
                : 'text-text-muted hover:text-text-main hover:bg-subtle'
            )}
          >
            <Code2 className="w-3.5 h-3.5 shrink-0" />
            <span>2. Coding</span>
            <span
              className={cn(
                'text-[10px] px-1 py-0.2 rounded font-mono font-bold',
                allExercisesSolved
                  ? 'bg-success/20 text-success'
                  : activeSession === 'session-coding'
                  ? 'bg-white/20 text-white'
                  : 'bg-subtle text-text-muted'
              )}
            >
              {solvedCountInLesson}/{lesson.exercises.length}
            </span>
          </button>

          {/* Session 3 Pill: Knowledge Quiz */}
          <button
            type="button"
            onClick={() => scrollToSession('session-quiz')}
            className={cn(
              'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all shrink-0 cursor-pointer',
              activeSession === 'session-quiz'
                ? 'bg-primary text-white shadow-2xs font-bold'
                : 'text-text-muted hover:text-text-main hover:bg-subtle'
            )}
          >
            <CheckSquare className="w-3.5 h-3.5 shrink-0" />
            <span>3. Quiz</span>
            <span
              className={cn(
                'text-[10px] px-1 py-0.2 rounded font-mono',
                currentQuizAttempt?.passed
                  ? 'bg-success/20 text-success font-bold'
                  : activeSession === 'session-quiz'
                  ? 'bg-white/20 text-white'
                  : 'bg-subtle text-text-muted'
              )}
            >
              {currentQuizAttempt ? (currentQuizAttempt.passed ? 'Passed' : 'Retake') : '10Q'}
            </span>
          </button>

          {/* Session 4 Pill: Notes */}
          <button
            type="button"
            onClick={() => scrollToSession('session-notes')}
            className={cn(
              'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all shrink-0 cursor-pointer',
              activeSession === 'session-notes'
                ? 'bg-primary text-white shadow-2xs font-bold'
                : 'text-text-muted hover:text-text-main hover:bg-subtle'
            )}
          >
            <FileText className="w-3.5 h-3.5 shrink-0" />
            <span>4. Notes</span>
          </button>
        </div>
      </div>

      {/* ========================================================= */}
      {/* SESSION 1: VISUAL CONCEPTS & SCHEMA                      */}
      {/* ========================================================= */}
      <section
        id="session-visuals"
        ref={visualsRef}
        className="space-y-5 pt-2"
      >
        {/* Session Section Header */}
        <div className="flex items-center justify-between border-b border-border pb-2.5">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-primary/10 text-primary flex items-center justify-center font-bold text-xs">
              1
            </div>
            <h2 className="text-base sm:text-lg font-bold text-text-main flex items-center gap-2">
              <Eye className="w-4 h-4 text-primary" />
              <span>Visual Concepts & Architecture</span>
            </h2>
          </div>
          <span className="text-[11px] text-text-muted font-medium hidden sm:inline">
            Interactive Visual Session
          </span>
        </div>

        {/* Core Objectives Points */}
        <Card className="p-3.5 sm:p-5 space-y-3 bg-surface">
          <div className="flex items-center gap-2">
            <Target className="w-4 h-4 text-primary" />
            <h3 className="text-xs sm:text-sm font-bold text-text-main">
              What You Will Master in This Lesson:
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-text-main">
            {lesson.learningObjectives.map((obj, i) => (
              <div
                key={i}
                className="flex items-start gap-2 p-2 rounded-lg bg-subtle/60 border border-border/50"
              >
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
          description={`Dataset Table: ${lesson.dataset.description}`}
        />

        {/* Lesson 2 Special: Interactive Query Simulator */}
        {lesson.number === 2 && (
          <InteractiveQuerySimulator dataset={lesson.dataset} />
        )}

        {/* Interactive SQL Statement Anatomy */}
        <SqlSyntaxBreakdown tableName={lesson.dataset.tableName} />

        {/* Bite-sized Concept Cards */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-text-main flex items-center gap-2">
            <Zap className="w-4 h-4 text-primary" />
            <span>Key Concept Breakdown</span>
          </h3>

          <div className="grid grid-cols-1 gap-3">
            {lesson.sections.map((section, idx) => (
              <Card key={section.id} className="p-3.5 sm:p-5 space-y-2 bg-surface">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" size="sm">
                    Part {idx + 1}
                  </Badge>
                  <h4 className="text-xs sm:text-sm font-bold text-text-main">
                    {section.title}
                  </h4>
                </div>

                <div className="text-xs sm:text-sm text-text-main/90 leading-relaxed whitespace-pre-line">
                  {section.content}
                </div>

                {section.codeExample && (
                  <div className="p-3 bg-editor-bg border border-border rounded-lg space-y-1 mt-2">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-text-muted block">
                      SQL Code Example
                    </span>
                    <pre className="font-mono text-xs text-editor-text font-semibold whitespace-pre-wrap overflow-x-auto">
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
          <div className="pt-1">
            <TerminologyMatcher items={lesson.terminologyMatching} />
          </div>
        )}

        {/* Interactive Element Identifier (Lesson 1) */}
        {lesson.interactiveCheck && (
          <div className="pt-1">
            <ElementIdentifier check={lesson.interactiveCheck} />
          </div>
        )}

        {/* Glide CTA to Session 2 */}
        <div className="p-3.5 sm:p-4 bg-primary/5 border border-primary/20 rounded-xl flex items-center justify-between gap-3">
          <div className="min-w-0">
            <span className="text-xs font-bold text-text-main block truncate">
              Concepts Understood?
            </span>
            <span className="text-[11px] text-text-muted block truncate">
              Practice live SQL queries in the interactive editor below.
            </span>
          </div>
          <Button
            variant="primary"
            size="sm"
            onClick={() => scrollToSession('session-coding')}
            className="shrink-0 text-xs gap-1.5"
          >
            <span>Start Coding</span>
            <ChevronDown className="w-3.5 h-3.5" />
          </Button>
        </div>
      </section>

      {/* ========================================================= */}
      {/* SESSION 2: HANDS-ON CODING (INTERACTIVE SQL WORKSPACE)    */}
      {/* ========================================================= */}
      <section
        id="session-coding"
        ref={codingRef}
        className="space-y-4 pt-6 border-t border-border"
      >
        {/* Section Header */}
        <div className="flex items-center justify-between border-b border-border pb-2.5">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-secondary/10 text-secondary flex items-center justify-center font-bold text-xs">
              2
            </div>
            <h2 className="text-base sm:text-lg font-bold text-text-main flex items-center gap-2">
              <Code2 className="w-4 h-4 text-secondary" />
              <span>Hands-On Coding & Verification</span>
            </h2>
          </div>
          <span className="text-xs font-mono font-semibold text-text-muted">
            {solvedCountInLesson}/{lesson.exercises.length} Solved
          </span>
        </div>

        {/* Exercise Stepper Pills (if multiple tasks) */}
        {lesson.exercises.length > 1 && (
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-1 select-none">
            <span className="text-xs font-semibold text-text-muted mr-1 shrink-0">Tasks:</span>
            {lesson.exercises.map((ex, idx) => {
              const isSolved = !!exerciseAttempts[ex.id]?.isSolved;
              const isSelected = activeExerciseIndex === idx;

              return (
                <button
                  key={ex.id}
                  type="button"
                  onClick={() => setActiveExerciseIndex(idx)}
                  className={cn(
                    'px-3 py-1.5 rounded-md text-xs font-medium transition-all shrink-0 cursor-pointer flex items-center gap-1.5',
                    isSelected
                      ? 'bg-primary text-white font-semibold shadow-2xs'
                      : isSolved
                      ? 'bg-success-subtle text-success border border-success/30'
                      : 'bg-subtle text-text-main border border-border hover:bg-border'
                  )}
                >
                  <span>Task {idx + 1}</span>
                  {isSolved && <Check className="w-3 h-3 stroke-[3]" />}
                </button>
              );
            })}
          </div>
        )}

        {/* Active SQL Workspace */}
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
            onGoToQuiz={() => scrollToSession('session-quiz')}
          />
        )}

        {/* Task Navigation Controls */}
        <div className="flex items-center justify-between pt-3 border-t border-border gap-2">
          <Button
            variant="outline"
            size="sm"
            disabled={activeExerciseIndex === 0}
            onClick={() => setActiveExerciseIndex((prev) => prev - 1)}
            className="text-xs"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Previous Task</span>
            <span className="sm:hidden">Prev</span>
          </Button>

          {activeExerciseIndex < lesson.exercises.length - 1 ? (
            <Button
              variant="primary"
              size="sm"
              onClick={() => setActiveExerciseIndex((prev) => prev + 1)}
              className="text-xs"
            >
              <span>Next Task</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          ) : (
            <Button
              variant="primary"
              size="sm"
              onClick={() => scrollToSession('session-quiz')}
              className="text-xs bg-primary"
            >
              <span>Proceed to Knowledge Quiz</span>
              <ChevronDown className="w-3.5 h-3.5" />
            </Button>
          )}
        </div>
      </section>

      {/* ========================================================= */}
      {/* SESSION 3: KNOWLEDGE QUIZ (CURRICULUM SPECIFIC)           */}
      {/* ========================================================= */}
      <section
        id="session-quiz"
        ref={quizRef}
        className="space-y-4 pt-6 border-t border-border"
      >
        {/* Section Header */}
        <div className="flex items-center justify-between border-b border-border pb-2.5">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold text-xs">
              3
            </div>
            <h2 className="text-base sm:text-lg font-bold text-text-main flex items-center gap-2">
              <CheckSquare className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              <span>Knowledge Quiz</span>
            </h2>
          </div>
          <span className="text-xs font-mono text-text-muted">
            10 Questions • Pass threshold: 80%
          </span>
        </div>

        {/* Quiz Runner Embedded directly in single window */}
        <QuizRunner
          key={`quiz_${lesson.id}`}
          quizId={`quiz_${lesson.id}`}
          title={`Lesson ${lesson.number}: ${lesson.title} Assessment`}
          description="Test your conceptual and practical understanding of this lesson's topics."
          questions={lesson.quiz}
          onComplete={handleQuizComplete}
          initialAnswers={currentQuizAttempt?.userAnswers}
          initialScore={currentQuizAttempt?.score}
          initialPassed={currentQuizAttempt?.passed}
        />
      </section>

      {/* ========================================================= */}
      {/* SESSION 4: PERSONAL NOTES & KEY TAKEAWAYS                */}
      {/* ========================================================= */}
      <section
        id="session-notes"
        ref={notesRef}
        className="space-y-4 pt-6 border-t border-border"
      >
        {/* Section Header */}
        <div className="flex items-center justify-between border-b border-border pb-2.5">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-xs">
              4
            </div>
            <h2 className="text-base sm:text-lg font-bold text-text-main flex items-center gap-2">
              <FileText className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span>Personal Notes & Cheat Sheet</span>
            </h2>
          </div>
          {noteSavedFeedback && (
            <Badge variant="success" size="sm">
              Saved locally
            </Badge>
          )}
        </div>

        <Card className="p-4 sm:p-5 space-y-3 bg-surface">
          <p className="text-xs text-text-muted leading-relaxed">
            Record key query patterns, syntax nuances, or reminders for this lesson. Notes are saved
            automatically to your local browser storage.
          </p>

          <textarea
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
            placeholder={`Jot down personal takeaways for Lesson ${lesson.number}...`}
            className="w-full h-36 p-3 rounded-lg bg-surface border border-border text-xs sm:text-sm text-text-main focus:outline-none focus:ring-2 focus:ring-primary/40 font-sans leading-relaxed resize-y"
          />

          <div className="flex items-center justify-between pt-1">
            <span className="text-[11px] text-text-muted font-mono">
              {noteText.trim().length} characters
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={handleSaveNote}
              className="text-xs"
            >
              <span>Save Note</span>
            </Button>
          </div>
        </Card>

        {/* Lesson Bottom Navigation Bar */}
        <div className="flex items-center justify-between pt-6 border-t border-border gap-3">
          {prevLesson ? (
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate(`/learn/${prevLesson.slug}`)}
              className="text-xs"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Lesson {prevLesson.number}</span>
            </Button>
          ) : (
            <div />
          )}

          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/learn')}
            className="text-xs text-text-muted"
          >
            All Lessons
          </Button>

          {nextLesson ? (
            <Button
              variant="primary"
              size="sm"
              onClick={() => navigate(`/learn/${nextLesson.slug}`)}
              className="text-xs"
            >
              <span>Lesson {nextLesson.number}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          ) : (
            <Button
              variant="primary"
              size="sm"
              onClick={() => navigate('/quizzes')}
              className="text-xs"
            >
              <span>All Quizzes</span>
              <CheckSquare className="w-3.5 h-3.5" />
            </Button>
          )}
        </div>
      </section>
    </div>
  );
}
