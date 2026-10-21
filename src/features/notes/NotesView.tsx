import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useProgress } from '../../hooks/useProgress';
import { getLessonById } from '../../data/lessons';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { FileText, ArrowRight, Trash2 } from 'lucide-react';
import { formatDateTime } from '../../lib/utils';

export function NotesView() {
  const navigate = useNavigate();
  const { notes, removeLessonNote } = useProgress();

  const noteList = Object.values(notes).filter((n) => n.content.trim().length > 0);

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="border-b border-border pb-5">
        <h1 className="font-raleway text-2xl sm:text-3xl font-bold tracking-tight text-text-main flex items-center gap-3">
          <FileText className="w-7 h-7 text-primary" />
          <span>My Notes</span>
        </h1>
      </div>

      {noteList.length === 0 ? (
        <Card className="p-12 text-center space-y-3 max-w-md mx-auto">
          <FileText className="w-8 h-8 text-text-muted/60 mx-auto" />
          <h2 className="text-base font-bold text-text-main">No notes saved yet</h2>
          <p className="text-xs text-text-muted leading-relaxed">
            While working through any lesson, switch to the "My Notes" tab to record syntax tips and observations. They will appear here.
          </p>
          <Button variant="primary" size="sm" onClick={() => navigate('/learn')}>
            Browse Lessons
          </Button>
        </Card>
      ) : (
        <div className="space-y-4">
          {noteList.map((note) => {
            const lesson = getLessonById(note.lessonId);
            return (
              <Card key={note.lessonId} className="p-5 space-y-3">
                <div className="flex items-center justify-between border-b border-border pb-2.5">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" size="sm">
                      {lesson ? `Lesson ${lesson.number}` : 'Lesson'}
                    </Badge>
                    <span className="font-semibold text-sm text-text-main">
                      {lesson ? lesson.title : note.lessonId}
                    </span>
                  </div>

                  <span className="text-[11px] text-text-muted font-mono">
                    Updated {formatDateTime(note.updatedAt)}
                  </span>
                </div>

                <div className="p-3 bg-subtle rounded-md border border-border/60 text-xs text-text-main whitespace-pre-wrap leading-relaxed font-sans">
                  {note.content}
                </div>

                <div className="flex items-center justify-between pt-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeLessonNote(note.lessonId)}
                    className="text-xs text-text-muted hover:text-error"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Delete Note</span>
                  </Button>

                  {lesson && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigate(`/learn/${lesson.slug}#notes`)}
                    >
                      <span>Open in Lesson</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Button>
                  )}
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
