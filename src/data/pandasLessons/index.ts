import { PandasLessonDefinition } from '../../types/pandasLesson';
import { lesson1 } from './lesson1';
import { lesson2 } from './lesson2';
import { lesson3 } from './lesson3';
import { lesson4 } from './lesson4';
import { lesson5 } from './lesson5';
import { lesson6 } from './lesson6';
import { lesson7 } from './lesson7';
import { lesson8 } from './lesson8';
import { lesson9 } from './lesson9';
import { lesson10 } from './lesson10';
import { lesson11 } from './lesson11';
import { lesson12 } from './lesson12';

export const PANDAS_LESSONS: PandasLessonDefinition[] = [
  lesson1,
  lesson2,
  lesson3,
  lesson4,
  lesson5,
  lesson6,
  lesson7,
  lesson8,
  lesson9,
  lesson10,
  lesson11,
  lesson12,
];

export function getPandasLessonBySlug(slug: string): PandasLessonDefinition | undefined {
  return PANDAS_LESSONS.find((l) => l.slug === slug);
}

export function getPandasLessonById(id: string): PandasLessonDefinition | undefined {
  return PANDAS_LESSONS.find((l) => l.id === id);
}

export function getNextPandasLesson(currentId: string): PandasLessonDefinition | undefined {
  const idx = PANDAS_LESSONS.findIndex((l) => l.id === currentId);
  if (idx !== -1 && idx < PANDAS_LESSONS.length - 1) {
    return PANDAS_LESSONS[idx + 1];
  }
  return undefined;
}

export function getPrevPandasLesson(currentId: string): PandasLessonDefinition | undefined {
  const idx = PANDAS_LESSONS.findIndex((l) => l.id === currentId);
  if (idx > 0) {
    return PANDAS_LESSONS[idx - 1];
  }
  return undefined;
}
