import React from 'react';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { APP_NAME, APP_TAGLINE } from '../../lib/constants';
import { Database, ShieldCheck, Zap, Globe } from 'lucide-react';

export function AboutView() {
  return (
    <div className="space-y-6 pb-12 max-w-3xl">
      <div className="border-b border-border pb-6 space-y-2">
        <Badge variant="accent" size="sm">
          Philosophy & Architecture
        </Badge>
        <h1 className="font-raleway text-2xl sm:text-3xl font-bold tracking-tight text-text-main">
          About {APP_NAME}
        </h1>
        <p className="text-sm text-text-muted leading-relaxed">{APP_TAGLINE}</p>
      </div>

      <div className="space-y-6 text-sm text-text-main leading-relaxed">
        <p>
          {APP_NAME} is an independent, student-friendly interactive SQL learning platform built to provide an authentic, calm, and distraction-free educational experience.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <Card className="p-4 space-y-2">
            <Zap className="w-5 h-5 text-primary" />
            <h2 className="text-sm font-bold text-text-main">Authentic In-Browser Execution</h2>
            <p className="text-xs text-text-muted leading-relaxed">
              Instead of running server sandboxes or mocking responses, QueryPath executes real SQLite queries inside your browser using WebAssembly.
            </p>
          </Card>

          <Card className="p-4 space-y-2">
            <ShieldCheck className="w-5 h-5 text-success" />
            <h2 className="text-sm font-bold text-text-main">Zero Tracking & Complete Privacy</h2>
            <p className="text-xs text-text-muted leading-relaxed">
              No queries, answers, or analytics are transmitted to remote servers. All your activity resides exclusively in your browser's IndexedDB.
            </p>
          </Card>

          <Card className="p-4 space-y-2">
            <Globe className="w-5 h-5 text-secondary" />
            <h2 className="text-sm font-bold text-text-main">Offline-First Operation</h2>
            <p className="text-xs text-text-muted leading-relaxed">
              After an initial asset download, the full application — including SQL compilation, quizzes, and notes — operates without an active internet connection.
            </p>
          </Card>

          <Card className="p-4 space-y-2">
            <Database className="w-5 h-5 text-warning" />
            <h2 className="text-sm font-bold text-text-main">Original Educational Materials</h2>
            <p className="text-xs text-text-muted leading-relaxed">
              Every lesson, conceptual explanation, dataset (LibraryBooks, CourseCatalog), and quiz question is created from scratch to maximize conceptual clarity.
            </p>
          </Card>
        </div>

        <section className="space-y-3 pt-4">
          <h2 className="text-base font-bold text-text-main">Database Engine Disclosure</h2>
          <p className="text-xs text-text-muted leading-relaxed">
            QueryPath teaches relational database fundamentals using an embedded SQLite engine. While standard query patterns (such as SELECT, FROM, WHERE, and JOINs) are broadly identical across database management systems, some dialect variations, mathematical operators, and internal functions differ in systems like PostgreSQL, MySQL, Microsoft SQL Server, and Oracle Database.
          </p>
        </section>
      </div>
    </div>
  );
}
