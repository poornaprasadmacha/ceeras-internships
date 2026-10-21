import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { DashboardView } from '../features/dashboard/DashboardView';
import { CourseLessonsView } from '../features/lessons/CourseLessonsView';
import { LessonView } from '../features/lessons/LessonView';
import { PythonCourseView } from '../features/python/PythonCourseView';
import { PythonLessonView } from '../features/python/PythonLessonView';
import { PlaygroundView } from '../features/playground/PlaygroundView';
import { QuizzesIndexView } from '../features/quizzes/QuizzesIndexView';
import { ProgressView } from '../features/progress/ProgressView';
import { BookmarksView } from '../features/bookmarks/BookmarksView';
import { NotesView } from '../features/notes/NotesView';
import { SettingsView } from '../features/settings/SettingsView';
import { AboutView } from '../features/static/AboutView';
import { PrivacyView } from '../features/static/PrivacyView';
import { AccessibilityView } from '../features/static/AccessibilityView';

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<DashboardView />} />
      <Route path="/learn" element={<CourseLessonsView />} />
      <Route path="/learn/python" element={<PythonCourseView />} />
      <Route path="/learn/python/:slug" element={<PythonLessonView />} />
      <Route path="/learn/:slug" element={<LessonView />} />
      <Route path="/practice" element={<PlaygroundView />} />
      <Route path="/quizzes" element={<QuizzesIndexView />} />
      <Route path="/progress" element={<ProgressView />} />
      <Route path="/bookmarks" element={<BookmarksView />} />
      <Route path="/notes" element={<NotesView />} />
      <Route path="/settings" element={<SettingsView />} />
      <Route path="/about" element={<AboutView />} />
      <Route path="/privacy" element={<PrivacyView />} />
      <Route path="/accessibility" element={<AccessibilityView />} />
      <Route path="*" element={<DashboardView />} />
    </Routes>
  );
}
