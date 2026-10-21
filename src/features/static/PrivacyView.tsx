import React from 'react';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { APP_NAME } from '../../lib/constants';
import { ShieldCheck } from 'lucide-react';

export function PrivacyView() {
  return (
    <div className="space-y-6 pb-12 max-w-3xl">
      <div className="border-b border-border pb-6 space-y-2">
        <Badge variant="accent" size="sm">
          Privacy Policy
        </Badge>
        <h1 className="font-raleway text-2xl sm:text-3xl font-bold tracking-tight text-text-main flex items-center gap-3">
          <ShieldCheck className="w-7 h-7 text-primary" />
          <span>Local-First Privacy Policy</span>
        </h1>
        <p className="text-sm text-text-muted leading-relaxed">
          Effective Date: October 2026 • QueryPath Foundation Release
        </p>
      </div>

      <div className="space-y-6 text-sm text-text-main leading-relaxed">
        <Card variant="subtle" className="p-5 border-l-4 border-l-success space-y-1">
          <p className="font-semibold text-text-main">
            Summary: {APP_NAME} does not collect, transmit, or monetize any personal data.
          </p>
          <p className="text-xs text-text-muted">
            All SQL queries, exercise completions, quiz scores, notes, and preferences are stored exclusively on your device via client-side IndexedDB.
          </p>
        </Card>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-text-main">1. Information We Do Not Collect</h2>
          <p className="text-xs text-text-muted leading-relaxed">
            QueryPath does not require user accounts, email addresses, passwords, or payment credentials. We do not load advertising networks, third-party analytics scripts, tracking cookies, or browser fingerprinting mechanisms.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-text-main">2. Local Storage Usage</h2>
          <p className="text-xs text-text-muted leading-relaxed">
            The application uses browser-based IndexedDB storage strictly to remember:
          </p>
          <ul className="list-disc list-inside text-xs text-text-muted space-y-1 pl-2">
            <li>Lessons started and completed</li>
            <li>Interactive SQL exercise attempts and solutions</li>
            <li>Quiz scores and completed attempts</li>
            <li>Personal study notes and bookmarks</li>
            <li>Selected color theme (Soft Light, Warm Paper, Soft Dark)</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-text-main">3. Data Portability & Erasure</h2>
          <p className="text-xs text-text-muted leading-relaxed">
            You maintain 100% ownership of your learning data. At any time, you may export your progress as a plain JSON file via the Progress screen or erase all local records using the "Reset All Progress" action.
          </p>
        </section>
      </div>
    </div>
  );
}
