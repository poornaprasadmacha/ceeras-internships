import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { NUMPY_LESSONS } from '../../data/numpyLessons';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { NumpyLogo } from '../../components/ui/LanguageLogos';
import { Clock, ArrowRight, Grid, CheckCircle2, Cpu } from 'lucide-react';

export function NumpyCourseView() {
  const navigate = useNavigate();
  const totalMinutes = NUMPY_LESSONS.reduce((acc, l) => acc + l.estimatedMinutes, 0);

  // Read completed lessons from localStorage
  const [solvedLessons, setSolvedLessons] = useState<string[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('ceeras_numpy_solved');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setSolvedLessons(parsed);
        } else if (typeof parsed === 'object') {
          setSolvedLessons(Object.keys(parsed).filter((k) => parsed[k]));
        }
      }
    } catch {
      // Ignore storage errors
    }
  }, []);

  const completedCount = NUMPY_LESSONS.filter((l) =>
    l.exercises.every((e) => solvedLessons.includes(e.id))
  ).length;

  return (
    <div className="space-y-6 pb-12">
      {/* Course Banner Header */}
      <div className="border-b border-border pb-5 space-y-3">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-subtle/80 border border-border/80 flex items-center justify-center p-2 shadow-xs">
            <NumpyLogo className="w-full h-full object-contain rounded-xl" />
          </div>
          <h1 className="font-raleway text-2xl sm:text-3xl font-bold tracking-tight text-text-main">
            NumPy for Numerical Computing &amp; Linear Algebra
          </h1>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-xs text-text-muted">
          <span>{NUMPY_LESSONS.length} Lessons</span>
          <span>•</span>
          <span>~{totalMinutes} mins</span>
          {completedCount > 0 && (
            <>
              <span>•</span>
              <span className="text-emerald-600 font-medium">
                {completedCount} of {NUMPY_LESSONS.length} Completed
              </span>
            </>
          )}
        </div>
      </div>

      {/* Lesson List */}
      <div className="space-y-4">
        {NUMPY_LESSONS.map((lesson) => {
          const isFullySolved = lesson.exercises.every((e) => solvedLessons.includes(e.id));

          return (
            <Card
              key={lesson.id}
              className="p-6 transition-all hover:border-[#4DABCF]/50 space-y-4 bg-surface"
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
                    {isFullySolved && (
                      <Badge variant="success" size="sm" className="gap-1 text-[11px] py-0.5">
                        <CheckCircle2 className="w-3 h-3" />
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

                  <div className="pt-2">
                    <span className="text-xs font-semibold text-text-muted block mb-1">
                      Key Takeaways:
                    </span>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-xs text-text-main/90">
                      {lesson.learningObjectives.slice(0, 3).map((obj, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <span className="w-1 h-1 rounded-full bg-[#4DABCF] mt-1.5 shrink-0" />
                          <span className="truncate">{obj}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="flex flex-col items-start md:items-end justify-between self-stretch shrink-0 gap-4">
                  <div className="text-xs text-text-muted text-left md:text-right">
                    <span className="font-mono font-medium text-text-main">
                      {lesson.exercises.length} Practical {lesson.exercises.length === 1 ? 'Task' : 'Tasks'}
                    </span>
                    <span className="block text-[11px] text-text-muted">
                      Live Matrix &amp; Vector Diagnostics
                    </span>
                  </div>

                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => navigate(`/learn/numpy/${lesson.slug}`)}
                    className="text-xs bg-[#013243] hover:bg-[#024059] text-white font-bold"
                  >
                    <span>{isFullySolved ? 'Review Lesson' : 'Start Lesson'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
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
