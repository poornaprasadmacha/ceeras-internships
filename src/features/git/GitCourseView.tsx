import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GIT_LESSONS } from '../../data/gitLessons';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { GitLogo } from '../../components/ui/LanguageLogos';
import { Clock, ArrowRight, GitBranch, CheckCircle2 } from 'lucide-react';

export function GitCourseView() {
  const navigate = useNavigate();
  const totalMinutes = GIT_LESSONS.reduce((acc, l) => acc + l.estimatedMinutes, 0);

  // Read completed lessons from localStorage
  const [solvedLessons, setSolvedLessons] = useState<string[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('ceeras_git_solved');
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

  const completedCount = GIT_LESSONS.filter((l) =>
    l.exercises.every((e) => solvedLessons.includes(e.id))
  ).length;

  return (
    <div className="space-y-6 pb-12">
      {/* Course Banner Header */}
      <div className="border-b border-border pb-6 space-y-3">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-subtle/80 border border-border/80 flex items-center justify-center p-2 shadow-xs">
            <GitLogo className="w-full h-full object-contain rounded-xl" />
          </div>
          <div>
            <Badge variant="accent" size="sm" className="bg-[#F05032]/10 text-[#F05032] border-[#F05032]/20 mb-1">
              Active Track • Zero to Hero
            </Badge>
            <h1 className="font-raleway text-2xl sm:text-3xl font-bold tracking-tight text-text-main">
              Git &amp; GitHub Mastery
            </h1>
          </div>
        </div>
        <p className="text-sm text-text-muted max-w-3xl leading-relaxed">
          Master industry-standard distributed version control. From working trees and staging indices to branching, merge conflicts, stashing, rebasing, remotes, Pull Requests, and collaborative GitHub release pipelines.
        </p>

        {/* Course Metrics */}
        <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-text-muted">
          <div className="flex items-center gap-1.5">
            <GitBranch className="w-4 h-4 text-[#F05032]" />
            <span>12 Core Lessons</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-text-muted" />
            <span>{Math.round(totalMinutes / 60)} Hours Total ({totalMinutes} mins)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            <span>{completedCount} of 12 Lessons Completed</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-2 bg-subtle rounded-full overflow-hidden border border-border mt-3">
          <div
            className="h-full bg-emerald-500 transition-all duration-300"
            style={{ width: `${(completedCount / 12) * 100}%` }}
          />
        </div>
      </div>

      {/* Lesson List Grid */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-text-main tracking-tight">Curriculum Syllabus</h2>

        <div className="grid grid-cols-1 gap-3">
          {GIT_LESSONS.map((lesson) => {
            const isFinished = lesson.exercises.every((e) => solvedLessons.includes(e.id));
            const solvedInThisLesson = lesson.exercises.filter((e) =>
              solvedLessons.includes(e.id)
            ).length;

            return (
              <Card
                key={lesson.id}
                className="p-5 bg-surface border-border hover:border-primary/50 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-2xs group"
              >
                <div className="space-y-2 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-xs px-2 py-0.5 rounded bg-subtle text-text-main font-semibold border border-border">
                      Lesson {lesson.number}
                    </span>
                    <span className="text-xs text-text-muted flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {lesson.estimatedMinutes} mins
                    </span>
                    {isFinished ? (
                      <Badge variant="success" size="sm" className="gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        Completed
                      </Badge>
                    ) : solvedInThisLesson > 0 ? (
                      <Badge variant="accent" size="sm">
                        In Progress ({solvedInThisLesson}/{lesson.exercises.length})
                      </Badge>
                    ) : null}
                  </div>

                  <h3 className="font-raleway text-base font-bold text-text-main group-hover:text-primary transition-colors">
                    {lesson.title}
                  </h3>

                  <p className="text-xs text-text-muted leading-relaxed line-clamp-2">
                    {lesson.shortDescription}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {lesson.learningObjectives.slice(0, 3).map((obj, i) => (
                      <span
                        key={i}
                        className="text-[11px] px-2 py-0.5 rounded-full bg-subtle/80 text-text-muted border border-border"
                      >
                        {obj}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0 self-end md:self-center">
                  <Button
                    variant={isFinished ? 'outline' : 'primary'}
                    size="sm"
                    onClick={() => navigate(`/learn/git/${lesson.slug}`)}
                    className="text-xs"
                  >
                    <span>{isFinished ? 'Review Lesson' : 'Start Lesson'}</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
