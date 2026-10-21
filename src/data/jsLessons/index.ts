import { JsLessonDefinition } from '../../types/jsLesson';
import { jsLesson1 } from './lesson1';
import { jsLesson2 } from './lesson2';
import { jsLesson3 } from './lesson3';
import { jsLesson4 } from './lesson4';
import { jsLesson5 } from './lesson5';
import { jsLesson6 } from './lesson6';
import { jsLesson7 } from './lesson7';
import { jsLesson8 } from './lesson8';
import { jsLesson9 } from './lesson9';
import { jsLesson10 } from './lesson10';
import { jsLesson11 } from './lesson11';
import { jsLesson12 } from './lesson12';
import { jsLesson13 } from './lesson13';
import { jsLesson14 } from './lesson14';

export const JS_LESSONS: JsLessonDefinition[] = [
  jsLesson1,
  jsLesson2,
  jsLesson3,
  jsLesson4,
  jsLesson5,
  jsLesson6,
  jsLesson7,
  jsLesson8,
  jsLesson9,
  jsLesson10,
  jsLesson11,
  jsLesson12,
  jsLesson13,
  jsLesson14,
];

export function getJsLessonBySlug(slug: string): JsLessonDefinition | undefined {
  return JS_LESSONS.find((l) => l.slug === slug);
}

export function getJsLessonById(id: string): JsLessonDefinition | undefined {
  return JS_LESSONS.find((l) => l.id === id);
}

export function getNextJsLesson(currentId: string): JsLessonDefinition | null {
  const idx = JS_LESSONS.findIndex((l) => l.id === currentId);
  if (idx >= 0 && idx < JS_LESSONS.length - 1) {
    return JS_LESSONS[idx + 1];
  }
  return null;
}

export function getPrevJsLesson(currentId: string): JsLessonDefinition | null {
  const idx = JS_LESSONS.findIndex((l) => l.id === currentId);
  if (idx > 0) {
    return JS_LESSONS[idx - 1];
  }
  return null;
}
