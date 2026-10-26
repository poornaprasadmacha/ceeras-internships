import React from 'react';
import { Link } from 'react-router-dom';
import {
  BookOpen,
  Terminal,
  CheckSquare,
  BarChart2,
  Bookmark,
  FileText,
  Settings,
  ShieldCheck,
  Globe,
  Sparkles,
  Heart,
} from 'lucide-react';

export function CeerasFooter() {
  return (
    <footer className="border-t border-border bg-surface text-text-main mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10">
          {/* Brand & Mission Column */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="logo shrink-0 inline-block" aria-label="Ceeras Home">
              CEERAS
            </Link>

            <p className="text-sm font-semibold text-primary">
              Spreading knowledge to ignite global change.
            </p>

            <p className="text-xs text-text-muted leading-relaxed max-w-sm">
              An open-access, browser-powered learning platform designed for complete clarity. Master
              relational databases, programming, web architecture, and machine learning with zero
              installation and real-time execution.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-2 text-xs text-text-muted">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-subtle border border-border">
                <Globe className="w-3.5 h-3.5 text-primary shrink-0" />
                <span>100% Client-Side WASM</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-subtle border border-border">
                <ShieldCheck className="w-3.5 h-3.5 text-success shrink-0" />
                <span>Zero Tracking &amp; Private</span>
              </span>
            </div>
          </div>

          {/* Curriculum Tracks */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-text-muted uppercase tracking-wider">
              Curriculum Tracks
            </h3>
            <ul className="space-y-2 text-xs text-text-main/90">
              <li>
                <Link to="/learn" className="hover:text-primary transition-colors block py-0.5">
                  SQL &amp; Relational Databases
                </Link>
              </li>
              <li>
                <Link to="/learn/python" className="hover:text-primary transition-colors block py-0.5">
                  Python Fundamentals
                </Link>
              </li>
              <li>
                <Link to="/learn/html" className="hover:text-primary transition-colors block py-0.5">
                  HTML5 Web Architecture
                </Link>
              </li>
              <li>
                <Link to="/learn/css" className="hover:text-primary transition-colors block py-0.5">
                  CSS3 Responsive Design
                </Link>
              </li>
              <li>
                <Link to="/learn/javascript" className="hover:text-primary transition-colors block py-0.5">
                  Modern JavaScript (ES6+)
                </Link>
              </li>
              <li>
                <Link to="/learn/datascience" className="hover:text-primary transition-colors block py-0.5">
                  Data Science &amp; EDA
                </Link>
              </li>
              <li>
                <Link to="/learn/machinelearning" className="hover:text-primary transition-colors block py-0.5">
                  Machine Learning Models
                </Link>
              </li>
              <li>
                <Link to="/learn/git" className="hover:text-primary transition-colors block py-0.5">
                  Git &amp; Distributed Control
                </Link>
              </li>
              <li>
                <Link to="/learn/vscode" className="hover:text-primary transition-colors block py-0.5">
                  VS Code Productivity
                </Link>
              </li>
            </ul>
          </div>

          {/* Learning Tools */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-text-muted uppercase tracking-wider">
              Student Tools
            </h3>
            <ul className="space-y-2 text-xs text-text-main/90">
              <li>
                <Link
                  to="/practice"
                  className="hover:text-primary transition-colors flex items-center gap-1.5 py-0.5"
                >
                  <Terminal className="w-3.5 h-3.5 text-primary shrink-0" />
                  <span>Practice Playground</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/quizzes"
                  className="hover:text-primary transition-colors flex items-center gap-1.5 py-0.5"
                >
                  <CheckSquare className="w-3.5 h-3.5 text-secondary shrink-0" />
                  <span>Quizzes &amp; Tests</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/progress"
                  className="hover:text-primary transition-colors flex items-center gap-1.5 py-0.5"
                >
                  <BarChart2 className="w-3.5 h-3.5 text-primary shrink-0" />
                  <span>Progress &amp; Stats</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/bookmarks"
                  className="hover:text-primary transition-colors flex items-center gap-1.5 py-0.5"
                >
                  <Bookmark className="w-3.5 h-3.5 text-warning shrink-0" />
                  <span>Saved Bookmarks</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/notes"
                  className="hover:text-primary transition-colors flex items-center gap-1.5 py-0.5"
                >
                  <FileText className="w-3.5 h-3.5 text-primary shrink-0" />
                  <span>Personal Study Notes</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/settings"
                  className="hover:text-primary transition-colors flex items-center gap-1.5 py-0.5"
                >
                  <Settings className="w-3.5 h-3.5 text-text-muted shrink-0" />
                  <span>Appearance &amp; Themes</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Educational Trust & Support */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-text-muted uppercase tracking-wider">
              Trust &amp; Access
            </h3>
            <ul className="space-y-2 text-xs text-text-main/90">
              <li>
                <Link to="/about" className="hover:text-primary transition-colors block py-0.5">
                  About CEERAS
                </Link>
              </li>
              <li>
                <Link
                  to="/accessibility"
                  className="hover:text-primary transition-colors block py-0.5"
                >
                  Accessibility Statement
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-primary transition-colors block py-0.5">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/accessibility#contact"
                  className="hover:text-primary transition-colors block py-0.5"
                >
                  Contact &amp; Student Support
                </Link>
              </li>
            </ul>

            <div className="pt-3">
              <span className="text-[11px] text-text-muted block leading-relaxed">
                Empowering learners of all ages: schoolchildren, college students, and self-learners.
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Attribution */}
        <div className="mt-10 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-text-muted">
          <p>
            &copy; 2026 CEERAS. All rights reserved. 100% Free, open, and offline-capable education.
          </p>

          <p className="flex items-center gap-1 text-[11px]">
            <span>Designed for student understanding and problem-solving.</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
