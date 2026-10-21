import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { VSCODE_LESSONS } from '../../data/vscodeLessons';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { VsCodeLogo } from '../../components/ui/LanguageLogos';
import { Clock, ArrowRight, Code2, CheckCircle2, Sparkles } from 'lucide-react';

export function VsCodeCourseView() {
  const navigate = useNavigate();
  const totalMinutes = VSCODE_LESSONS.reduce((acc, l) => acc + l.estimatedMinutes, 0);

  // Read completed exercises from localStorage
  const [solvedLessons, setSolvedLessons] = useState<string[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('ceeras_vscode_solved');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setSolvedLessons(parsed);
        } else if (typeof parsed === 'object') {
          setSolvedLessons(Object.keys(parsed).filter((k) => parsed[k]));
        }
      }
    } catch {
      // Ignore storage parse errors
    }
  }, []);

  const completedCount = VSCODE_LESSONS.filter((l) =>
    l.exercises.every((e) => solvedLessons.includes(e.id))
  ).length;

  return (
    <div className="space-y-6 pb-12">
      {/* Course Banner Header */}
      <div className="border-b border-border pb-6 space-y-3">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-[#007ACC]/10 border border-[#007ACC]/20 flex items-center justify-center p-2 shadow-xs">
            <VsCodeLogo className="w-full h-full object-contain" />
          </div>
          <div>
            <Badge variant="accent" size="sm" className="bg-[#007ACC]/10 text-[#007ACC] border-[#007ACC]/20 mb-1">
              Active Track • Zero to Hero
            </Badge>
            <h1 className="font-raleway text-2xl sm:text-3xl font-bold tracking-tight text-text-main">
              Visual Studio Code Mastery
            </h1>
          </div>
        </div>
        <p className="text-sm text-text-muted max-w-3xl leading-relaxed">
          Master the world's leading code editor from fundamental interface anatomy to advanced engineering workflows. Master the Command Palette, multi-cursor editing, settings.json, custom keybindings, IntelliSense, integrated terminal, task automation, Git source control, debugging with launch.json, snippets, and Dev Containers.
        </p>

        {/* Course Metrics */}
        <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-text-muted">
          <div className="flex items-center gap-1.5">
            <Code2 className="w-4 h-4 text-[#007ACC]" />
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
          {VSCODE_LESSONS.map((lesson) => {
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
                    onClick={() => navigate(`/learn/vscode/${lesson.slug}`)}
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
