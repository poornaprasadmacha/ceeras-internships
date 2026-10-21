import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useProgress } from '../../hooks/useProgress';
import { getLessonById } from '../../data/lessons';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Bookmark, ArrowRight, Trash2 } from 'lucide-react';
import { formatDate } from '../../lib/utils';

export function BookmarksView() {
  const navigate = useNavigate();
  const { bookmarks, toggleBookmarkItem } = useProgress();

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="border-b border-border pb-5">
        <h1 className="font-raleway text-2xl sm:text-3xl font-bold tracking-tight text-text-main flex items-center gap-3">
          <Bookmark className="w-7 h-7 text-primary" />
          <span>Bookmarked Lessons</span>
        </h1>
      </div>

      {bookmarks.length === 0 ? (
        <Card className="p-12 text-center space-y-3 max-w-md mx-auto">
          <Bookmark className="w-8 h-8 text-text-muted/60 mx-auto" />
          <h2 className="text-base font-bold text-text-main">No bookmarks yet</h2>
          <p className="text-xs text-text-muted leading-relaxed">
            While working through any lesson, click the "Bookmark" button at the top to save it here for fast retrieval.
          </p>
          <Button variant="primary" size="sm" onClick={() => navigate('/learn')}>
            Browse Lessons
          </Button>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {bookmarks.map((b) => {
            const lesson = getLessonById(b.lessonId);
            return (
              <Card
                key={b.id}
                className="p-5 flex flex-col justify-between hover:border-primary/50 transition-colors space-y-4"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" size="sm">
                      {lesson ? `Lesson ${lesson.number}` : 'Lesson'}
                    </Badge>
                    <span className="text-[11px] text-text-muted">
                      Saved {formatDate(b.createdAt)}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-text-main">
                    {b.title}
                  </h3>
                  {lesson && (
                    <p className="text-xs text-text-muted line-clamp-2">
                      {lesson.shortDescription}
                    </p>
                  )}
                </div>

                <div className="pt-3 border-t border-border flex items-center justify-between">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleBookmarkItem(b.lessonId, b.title)}
                    className="text-xs text-text-muted hover:text-error"
                    title="Remove bookmark"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Remove</span>
                  </Button>

                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => {
                      if (lesson) navigate(`/learn/${lesson.slug}`);
                    }}
                  >
                    <span>Open Lesson</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
