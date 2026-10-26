import React from 'react';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { APP_NAME } from '../../lib/constants';
import { Eye, Keyboard, Monitor, Mail, MessageSquare, ShieldCheck } from 'lucide-react';

export function AccessibilityView() {
  return (
    <div className="space-y-6 pb-12 max-w-3xl">
      <div className="border-b border-border pb-5">
        <h1 className="font-raleway text-2xl sm:text-3xl font-bold tracking-tight text-text-main">
          Accessibility Statement &amp; Student Support
        </h1>
        <p className="text-xs text-text-muted mt-1">
          Committed to inclusive, barrier-free education for learners of all ages.
        </p>
      </div>

      <div className="space-y-6 text-sm text-text-main leading-relaxed">
        <p>
          We aim to conform to the Web Content Accessibility Guidelines (WCAG) 2.2 Level AA standards. Key implementations include:
        </p>

        <div className="space-y-4">
          <Card className="p-4 space-y-2">
            <div className="flex items-center gap-2">
              <Keyboard className="w-5 h-5 text-primary" />
              <h2 className="text-sm font-bold text-text-main">Keyboard Operability</h2>
            </div>
            <p className="text-xs text-text-muted leading-relaxed">
              Every interactive control, button, tab switcher, modal dialog, and code editor can be navigated and activated using standard keyboard commands (Tab, Shift+Tab, Enter, Space, Escape, and Ctrl+Enter). Focus indicators are distinctly visible across all themes.
            </p>
          </Card>

          <Card className="p-4 space-y-2">
            <div className="flex items-center gap-2">
              <Eye className="w-5 h-5 text-primary" />
              <h2 className="text-sm font-bold text-text-main">Color Contrast &amp; Typography</h2>
            </div>
            <p className="text-xs text-text-muted leading-relaxed">
              All text elements and interactive borders meet or exceed WCAG 2.2 AA contrast ratios (4.5:1 for body copy, 3:1 for large headings and UI components). Color is never used as the sole conveyor of information; icons, badges, and textual labels always accompany status messages.
            </p>
          </Card>

          <Card className="p-4 space-y-2">
            <div className="flex items-center gap-2">
              <Monitor className="w-5 h-5 text-primary" />
              <h2 className="text-sm font-bold text-text-main">Reduced Motion &amp; Screen Reader Support</h2>
            </div>
            <p className="text-xs text-text-muted leading-relaxed">
              CEERAS honors the <code>prefers-reduced-motion</code> system setting, eliminating distracting transitions for sensitive users. The layout uses semantic HTML landmarks (<code>main</code>, <code>nav</code>, <code>header</code>, <code>aside</code>, <code>article</code>) with appropriate ARIA roles.
            </p>
          </Card>
        </div>

        {/* Contact Us & Feedback Section */}
        <section id="contact" className="space-y-4 pt-4 border-t border-border scroll-mt-20">
          <div className="flex items-center gap-2">
            <Mail className="w-5 h-5 text-primary" />
            <h2 className="text-base font-bold text-text-main">Contact &amp; Student Support</h2>
          </div>

          <p className="text-xs text-text-muted leading-relaxed">
            Have questions about an exercise, encountered an accessibility issue, or want to suggest an improvement? We welcome feedback from schoolchildren, educators, college students, and independent self-learners.
          </p>

          <Card className="p-5 bg-surface border border-primary/30 space-y-3">
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="text-xs font-bold text-primary uppercase tracking-wider block">
                  Support Email
                </span>
                <a
                  href="mailto:support@ceeras.com"
                  className="text-base font-mono font-bold text-text-main hover:text-primary transition-colors block mt-0.5"
                >
                  support@ceeras.com
                </a>
              </div>
              <Badge variant="accent" size="sm">
                Active Response
              </Badge>
            </div>

            <p className="text-xs text-text-muted leading-relaxed border-t border-border/60 pt-2.5">
              Please include the lesson name, browser version, and screen size if reporting a display or keyboard navigation difficulty. We typically respond within 24 to 48 hours.
            </p>
          </Card>
        </section>
      </div>
    </div>
  );
}
