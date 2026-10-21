import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { DashboardView } from '../features/dashboard/DashboardView';
import { CourseLessonsView } from '../features/lessons/CourseLessonsView';
import { LessonView } from '../features/lessons/LessonView';
import { PythonCourseView } from '../features/python/PythonCourseView';
import { PythonLessonView } from '../features/python/PythonLessonView';
import { HtmlCourseView } from '../features/html/HtmlCourseView';
import { HtmlLessonView } from '../features/html/HtmlLessonView';
import { CssCourseView } from '../features/css/CssCourseView';
import { CssLessonView } from '../features/css/CssLessonView';
import { JsCourseView } from '../features/javascript/JsCourseView';
import { JsLessonView } from '../features/javascript/JsLessonView';
import { DataScienceCourseView } from '../features/datascience/DataScienceCourseView';
import { DataScienceLessonView } from '../features/datascience/DataScienceLessonView';
import { MachineLearningCourseView } from '../features/machinelearning/MachineLearningCourseView';
import { MachineLearningLessonView } from '../features/machinelearning/MachineLearningLessonView';
import { NumpyCourseView } from '../features/numpy/NumpyCourseView';
import { NumpyLessonView } from '../features/numpy/NumpyLessonView';
import { PandasCourseView } from '../features/pandas/PandasCourseView';
import { PandasLessonView } from '../features/pandas/PandasLessonView';
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
      <Route path="/learn/html" element={<HtmlCourseView />} />
      <Route path="/learn/html/:slug" element={<HtmlLessonView />} />
      <Route path="/learn/css" element={<CssCourseView />} />
      <Route path="/learn/css/:slug" element={<CssLessonView />} />
      <Route path="/learn/javascript" element={<JsCourseView />} />
      <Route path="/learn/javascript/:slug" element={<JsLessonView />} />
      <Route path="/learn/datascience" element={<DataScienceCourseView />} />
      <Route path="/learn/datascience/:slug" element={<DataScienceLessonView />} />
      <Route path="/learn/machinelearning" element={<MachineLearningCourseView />} />
      <Route path="/learn/machinelearning/:slug" element={<MachineLearningLessonView />} />
      <Route path="/learn/numpy" element={<NumpyCourseView />} />
      <Route path="/learn/numpy/:slug" element={<NumpyLessonView />} />
      <Route path="/learn/pandas" element={<PandasCourseView />} />
      <Route path="/learn/pandas/:slug" element={<PandasLessonView />} />
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
