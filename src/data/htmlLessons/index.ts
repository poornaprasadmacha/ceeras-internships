import { HtmlLessonDefinition } from '../../types/htmlLesson';
import { htmlLesson1 } from './lesson1';
import { htmlLesson2 } from './lesson2';
import { htmlLesson3 } from './lesson3';
import { htmlLesson4 } from './lesson4';
import { htmlLesson5 } from './lesson5';
import { htmlLesson6 } from './lesson6';
import { htmlLesson7 } from './lesson7';
import { htmlLesson8 } from './lesson8';
import { htmlLesson9 } from './lesson9';
import { htmlLesson10 } from './lesson10';
import { htmlLesson11 } from './lesson11';
import { htmlLesson12 } from './lesson12';

export const HTML_LESSONS: HtmlLessonDefinition[] = [
  htmlLesson1,
  htmlLesson2,
  htmlLesson3,
  htmlLesson4,
  htmlLesson5,
  htmlLesson6,
  htmlLesson7,
  htmlLesson8,
  htmlLesson9,
  htmlLesson10,
  htmlLesson11,
  htmlLesson12,
];

export function getHtmlLessonBySlug(slug: string): HtmlLessonDefinition | undefined {
  return HTML_LESSONS.find((l) => l.slug === slug);
}

export function getHtmlLessonById(id: string): HtmlLessonDefinition | undefined {
  return HTML_LESSONS.find((l) => l.id === id);
}

export function getNextHtmlLesson(currentId: string): HtmlLessonDefinition | null {
  const idx = HTML_LESSONS.findIndex((l) => l.id === currentId);
  if (idx >= 0 && idx < HTML_LESSONS.length - 1) {
    return HTML_LESSONS[idx + 1];
  }
  return null;
}

export function getPrevHtmlLesson(currentId: string): HtmlLessonDefinition | null {
  const idx = HTML_LESSONS.findIndex((l) => l.id === currentId);
  if (idx > 0) {
    return HTML_LESSONS[idx - 1];
  }
  return null;
}
