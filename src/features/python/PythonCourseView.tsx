import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PYTHON_LESSONS } from '../../data/pythonLessons';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { PythonLogo } from '../../components/ui/LanguageLogos';
import { Clock, ArrowRight, BookOpen, Terminal } from 'lucide-react';

export function PythonCourseView() {
  const navigate = useNavigate();
  const totalMinutes = PYTHON_LESSONS.reduce((acc, l) => acc + l.estimatedMinutes, 0);

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="border-b border-border pb-6 space-y-3">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-subtle/80 border border-border/80 flex items-center justify-center p-2 shadow-xs">
            <PythonLogo className="w-full h-full object-contain" />
          </div>
          <div>
            <Badge variant="accent" size="sm" className="bg-[#3776AB]/15 text-[#3776AB] border-[#3776AB]/30 mb-1">
              Active Course • Beginner &amp; Student Friendly
            </Badge>
            <h1 className="font-raleway text-2xl sm:text-3xl font-bold tracking-tight text-text-main">
              Python Programming Fundamentals
            </h1>
          </div>
        </div>

        <p className="text-sm text-text-muted max-w-2xl leading-relaxed">
          Learn Python 3 from scratch. Write real code, execute it in the browser terminal, and master variables, loops, data structures, functions, and object-oriented programming.
        </p>

        <div className="flex items-center gap-4 text-xs text-text-muted pt-1">
          <span>{PYTHON_LESSONS.length} Structured Lessons (Zero to OOP)</span>
          <span>•</span>
          <span>~{totalMinutes} mins total interactive practice</span>
          <span>•</span>
          <span className="text-primary font-medium">In-Browser Terminal Engine</span>
        </div>
      </div>

      {/* Lesson List */}
      <div className="space-y-4">
        {PYTHON_LESSONS.map((lesson) => (
          <Card
            key={lesson.id}
            className="p-6 transition-all hover:border-[#3776AB]/50 space-y-4 bg-surface"
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
                        <span className="w-1 h-1 rounded-full bg-[#3776AB] mt-1.5 shrink-0" />
                        <span className="truncate">{obj}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="flex flex-col items-start md:items-end justify-between self-stretch shrink-0 gap-4">
                <div className="text-xs text-text-muted text-left md:text-right">
                  <span className="font-mono font-medium text-text-main">
                    {lesson.exercises.length} Interactive Tasks
                  </span>
                  <span className="block text-[11px] text-text-muted">
                    Terminal Output Validation
                  </span>
                </div>

                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => navigate(`/learn/python/${lesson.slug}`)}
                  className="text-xs"
                >
                  <span>Start Lesson</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
