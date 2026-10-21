import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { HTML_LESSONS } from '../../data/htmlLessons';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { HtmlLogo } from '../../components/ui/LanguageLogos';
import { Clock, ArrowRight, BookOpen, Globe, CheckCircle2 } from 'lucide-react';

export function HtmlCourseView() {
  const navigate = useNavigate();
  const totalMinutes = HTML_LESSONS.reduce((acc, l) => acc + l.estimatedMinutes, 0);

  // Read completed lessons from localStorage
  const [solvedLessons, setSolvedLessons] = useState<string[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('ceeras_html_solved');
      if (stored) {
        setSolvedLessons(JSON.parse(stored));
      }
    } catch {
      // Ignore storage errors
    }
  }, []);

  const completedCount = HTML_LESSONS.filter((l) =>
    l.exercises.every((e) => solvedLessons.includes(e.id))
  ).length;

  return (
    <div className="space-y-6 pb-12">
      {/* Course Banner Header */}
      <div className="border-b border-border pb-6 space-y-3">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-subtle/80 border border-border/80 flex items-center justify-center p-2 shadow-xs">
            <HtmlLogo className="w-full h-full object-contain" />
          </div>
          <div>
            <Badge variant="accent" size="sm" className="bg-[#E44D26]/15 text-[#E44D26] border-[#E44D26]/30 mb-1">
              Active Track • Interactive &amp; Hands-on
            </Badge>
            <h1 className="font-raleway text-2xl sm:text-3xl font-bold tracking-tight text-text-main">
              HTML5 &amp; Modern Web Architecture
            </h1>
          </div>
        </div>

        <p className="text-sm text-text-muted max-w-2xl leading-relaxed">
          Build genuine web pages with live real-time sandboxed previews. Learn HTML tags, document structure, typography, links, multimedia, tabular data, accessible forms, and semantic HTML5 landmarks.
        </p>

        <div className="flex flex-wrap items-center gap-4 text-xs text-text-muted pt-1">
          <span>{HTML_LESSONS.length} Structured Lessons (Zero to HTML5 Master)</span>
          <span>•</span>
          <span>~{totalMinutes} mins total interactive practice</span>
          <span>•</span>
          <span className="text-[#E44D26] font-medium flex items-center gap-1">
            <Globe className="w-3.5 h-3.5" />
            <span>Live Sandboxed Web Preview</span>
          </span>
          {completedCount > 0 && (
            <>
              <span>•</span>
              <span className="text-emerald-600 font-medium">
                {completedCount} of {HTML_LESSONS.length} Completed
              </span>
            </>
          )}
        </div>
      </div>

      {/* Lesson List */}
      <div className="space-y-4">
        {HTML_LESSONS.map((lesson) => {
          const isFullySolved = lesson.exercises.every((e) => solvedLessons.includes(e.id));

          return (
            <Card
              key={lesson.id}
              className="p-6 transition-all hover:border-[#E44D26]/50 space-y-4 bg-surface"
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
                          <span className="w-1 h-1 rounded-full bg-[#E44D26] mt-1.5 shrink-0" />
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
                      Live DOM Verification
                    </span>
                  </div>

                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => navigate(`/learn/html/${lesson.slug}`)}
                    className="text-xs bg-[#E44D26] hover:bg-[#c83d19] text-white"
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
