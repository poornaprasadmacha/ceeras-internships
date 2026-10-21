import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LESSON_MANIFEST } from '../../data/lessons';
import { useProgress } from '../../hooks/useProgress';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Clock, CheckCircle2, ArrowRight, BookOpen } from 'lucide-react';

export function CourseLessonsView() {
  const navigate = useNavigate();
  const { lessonsProgress, exerciseAttempts } = useProgress();

  const totalTime = LESSON_MANIFEST.reduce((sum, l) => sum + l.estimatedMinutes, 0);

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="border-b border-border pb-6 space-y-2">
        <Badge variant="accent" size="sm">
          Curriculum Syllabus
        </Badge>
        <h1 className="font-raleway text-2xl sm:text-3xl font-bold tracking-tight text-text-main">
          Course Lessons
        </h1>
        <p className="text-sm text-text-muted max-w-2xl leading-relaxed">
          Step-by-step interactive SQL curriculum. Learn core theory, write real queries in isolated SQLite sandboxes, and verify your answers immediately.
        </p>
        <div className="flex items-center gap-4 text-xs text-text-muted pt-1">
          <span>{LESSON_MANIFEST.length} Comprehensive Lessons (Zero to Advanced)</span>
          <span>•</span>
          <span>~{totalTime} minutes total study time</span>
        </div>
      </div>

      {/* Lesson List */}
      <div className="space-y-4">
        {LESSON_MANIFEST.map((lesson) => {
          const isCompleted = lessonsProgress[lesson.id]?.isCompleted;
          const isStarted = lessonsProgress[lesson.id]?.isStarted;
          const solvedInLesson = lesson.exercises.filter((e) => exerciseAttempts[e.id]?.isSolved).length;

          return (
            <Card
              key={lesson.id}
              className="p-6 transition-all hover:border-primary/50 space-y-4"
            >
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div className="space-y-2 max-w-2xl">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" size="sm">
                      Lesson {lesson.number}
                    </Badge>
                    <span className="flex items-center gap-1 text-xs text-text-muted">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{lesson.estimatedMinutes} mins</span>
                    </span>
                    {isCompleted && (
                      <Badge variant="success" size="sm">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Completed</span>
                      </Badge>
                    )}
                  </div>

                  <h2 className="font-raleway text-lg font-bold text-text-main">
                    {lesson.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
                    {lesson.shortDescription}
                  </p>

                  {/* Objectives summary */}
                  <div className="pt-2">
                    <span className="text-xs font-semibold text-text-muted block mb-1">
                      Key Objectives:
                    </span>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-xs text-text-main/90">
                      {lesson.learningObjectives.slice(0, 4).map((obj, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <span className="w-1 h-1 rounded-full bg-primary mt-1.5 shrink-0" />
                          <span className="truncate">{obj}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="flex flex-col items-start md:items-end justify-between self-stretch shrink-0 gap-4">
                  <div className="text-xs text-text-muted text-left md:text-right">
                    <span className="font-mono font-medium text-text-main">
                      {solvedInLesson} / {lesson.exercises.length} Tasks
                    </span>
                    <span className="block text-[11px]">
                      Target: {lesson.dataset.tableName}
                    </span>
                  </div>

                  <Button
                    variant={isCompleted ? 'outline' : 'primary'}
                    size="md"
                    onClick={() => navigate(`/learn/${lesson.slug}`)}
                  >
                    <span>{isCompleted ? 'Review Lesson' : isStarted ? 'Resume Lesson' : 'Start Lesson'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
