import React, { useEffect } from 'react';
import { BrowserRouter, useLocation } from 'react-router-dom';
import { ProgressProvider } from '../hooks/useProgress';
import { AppShell } from '../components/layout/AppShell';
import { AppRoutes } from './routes';
import { APP_NAME } from '../lib/constants';
import { ErrorBoundary } from '../components/ui/ErrorBoundary';

function TitleAndMetaUpdater() {
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;

    let pageTitle = `${APP_NAME} — Learn SQL. Practise freely. Build real skills.`;
    let metaDescription =
      'Learn SQL step by step with interactive lessons, real-time in-browser SQLite query execution, instant feedback, and offline learning.';

    if (path === '/') {
      pageTitle = `${APP_NAME} — Student Dashboard & SQL Progress`;
    } else if (path === '/learn') {
      pageTitle = `Course Lessons & Curriculum — ${APP_NAME}`;
      metaDescription =
        'Explore the CEERAS SQL curriculum. From relational database foundations to advanced query syntax.';
    } else if (path === '/learn/sql-basics') {
      pageTitle = `Lesson 1: Introduction to SQL and Relational Databases — ${APP_NAME}`;
      metaDescription =
        'Understand tables, rows, columns, and SQLite execution with interactive exercises using the LibraryBooks dataset.';
    } else if (path === '/learn/sql-select-queries') {
      pageTitle = `Lesson 2: Your First SQL Queries (SELECT & FROM) — ${APP_NAME}`;
      metaDescription =
        'Learn to write SELECT queries, retrieve columns, use wildcards, and execute queries in the browser with CourseCatalog.';
    } else if (path === '/practice') {
      pageTitle = `Practice Playground & SQLite Sandbox — ${APP_NAME}`;
      metaDescription =
        'Write and execute freeform SQL queries against sample datasets directly inside an isolated browser SQLite sandbox.';
    } else if (path === '/quizzes') {
      pageTitle = `SQL Assessments & Knowledge Quizzes — ${APP_NAME}`;
      metaDescription =
        'Test your SQL understanding with topic quizzes and our comprehensive multi-lesson Foundation Review Test.';
    } else if (path === '/progress') {
      pageTitle = `Learning Progress & Milestones — ${APP_NAME}`;
    } else if (path === '/bookmarks') {
      pageTitle = `Bookmarked Lessons — ${APP_NAME}`;
    } else if (path === '/notes') {
      pageTitle = `Personal Study Notes — ${APP_NAME}`;
    } else if (path === '/settings') {
      pageTitle = `Platform Settings & Themes — ${APP_NAME}`;
    } else if (path === '/about') {
      pageTitle = `About ${APP_NAME} — Offline-First SQL Education`;
    } else if (path === '/privacy') {
      pageTitle = `Privacy Policy — ${APP_NAME}`;
    } else if (path === '/accessibility') {
      pageTitle = `Accessibility Commitment — ${APP_NAME}`;
    }

    document.title = pageTitle;

    const metaTag = document.querySelector('meta[name="description"]');
    if (metaTag) {
      metaTag.setAttribute('content', metaDescription);
    }
  }, [location]);

  return null;
}

export function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <ProgressProvider>
          <TitleAndMetaUpdater />
          <AppShell>
            <AppRoutes />
          </AppShell>
        </ProgressProvider>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
