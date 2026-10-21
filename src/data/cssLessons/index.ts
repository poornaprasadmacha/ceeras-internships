import { CssLessonDefinition } from '../../types/cssLesson';
import { cssLesson1 } from './lesson1';
import { cssLesson2 } from './lesson2';
import { cssLesson3 } from './lesson3';
import { cssLesson4 } from './lesson4';
import { cssLesson5 } from './lesson5';
import { cssLesson6 } from './lesson6';
import { cssLesson7 } from './lesson7';
import { cssLesson8 } from './lesson8';
import { cssLesson9 } from './lesson9';
import { cssLesson10 } from './lesson10';
import { cssLesson11 } from './lesson11';
import { cssLesson12 } from './lesson12';

export const CSS_LESSONS: CssLessonDefinition[] = [
  cssLesson1,
  cssLesson2,
  cssLesson3,
  cssLesson4,
  cssLesson5,
  cssLesson6,
  cssLesson7,
  cssLesson8,
  cssLesson9,
  cssLesson10,
  cssLesson11,
  cssLesson12,
];

export function getCssLessonBySlug(slug: string): CssLessonDefinition | undefined {
  return CSS_LESSONS.find((l) => l.slug === slug);
}

export function getCssLessonById(id: string): CssLessonDefinition | undefined {
  return CSS_LESSONS.find((l) => l.id === id);
}

export function getNextCssLesson(currentId: string): CssLessonDefinition | null {
  const idx = CSS_LESSONS.findIndex((l) => l.id === currentId);
  if (idx >= 0 && idx < CSS_LESSONS.length - 1) {
    return CSS_LESSONS[idx + 1];
  }
  return null;
}

export function getPrevCssLesson(currentId: string): CssLessonDefinition | null {
  const idx = CSS_LESSONS.findIndex((l) => l.id === currentId);
  if (idx > 0) {
    return CSS_LESSONS[idx - 1];
  }
  return null;
}
