import { NumpyLessonDefinition } from '../../types/numpyLesson';
import { numpyLesson1 } from './lesson1';
import { numpyLesson2 } from './lesson2';
import { numpyLesson3 } from './lesson3';
import { numpyLesson4 } from './lesson4';
import { numpyLesson5 } from './lesson5';
import { numpyLesson6 } from './lesson6';
import { numpyLesson7 } from './lesson7';
import { numpyLesson8 } from './lesson8';
import { numpyLesson9 } from './lesson9';
import { numpyLesson10 } from './lesson10';
import { numpyLesson11 } from './lesson11';
import { numpyLesson12 } from './lesson12';

export const NUMPY_LESSONS: NumpyLessonDefinition[] = [
  numpyLesson1,
  numpyLesson2,
  numpyLesson3,
  numpyLesson4,
  numpyLesson5,
  numpyLesson6,
  numpyLesson7,
  numpyLesson8,
  numpyLesson9,
  numpyLesson10,
  numpyLesson11,
  numpyLesson12,
];

export function getNumpyLessonBySlug(slug: string): NumpyLessonDefinition | undefined {
  return NUMPY_LESSONS.find((l) => l.slug === slug);
}

export function getNextNumpyLesson(currentId: string): NumpyLessonDefinition | undefined {
  const index = NUMPY_LESSONS.findIndex((l) => l.id === currentId);
  if (index >= 0 && index < NUMPY_LESSONS.length - 1) {
    return NUMPY_LESSONS[index + 1];
  }
  return undefined;
}

export function getPrevNumpyLesson(currentId: string): NumpyLessonDefinition | undefined {
  const index = NUMPY_LESSONS.findIndex((l) => l.id === currentId);
  if (index > 0) {
    return NUMPY_LESSONS[index - 1];
  }
  return undefined;
}
