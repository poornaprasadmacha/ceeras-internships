import { PythonLessonDefinition } from '../../types/pythonLesson';
import { pythonLesson1 } from './lesson1';
import { pythonLesson2 } from './lesson2';
import { pythonLesson3 } from './lesson3';
import { pythonLesson4 } from './lesson4';
import { pythonLesson5 } from './lesson5';
import { pythonLesson6 } from './lesson6';
import { pythonLesson7 } from './lesson7';
import { pythonLesson8 } from './lesson8';
import { pythonLesson9 } from './lesson9';
import { pythonLesson10 } from './lesson10';
import { pythonLesson11 } from './lesson11';
import { pythonLesson12 } from './lesson12';

export const PYTHON_LESSONS: PythonLessonDefinition[] = [
  pythonLesson1,
  pythonLesson2,
  pythonLesson3,
  pythonLesson4,
  pythonLesson5,
  pythonLesson6,
  pythonLesson7,
  pythonLesson8,
  pythonLesson9,
  pythonLesson10,
  pythonLesson11,
  pythonLesson12,
];

export function getPythonLessonBySlug(slug: string): PythonLessonDefinition | undefined {
  return PYTHON_LESSONS.find((l) => l.slug === slug);
}

export function getPythonLessonById(id: string): PythonLessonDefinition | undefined {
  return PYTHON_LESSONS.find((l) => l.id === id);
}

export function getNextPythonLesson(currentId: string): PythonLessonDefinition | null {
  const idx = PYTHON_LESSONS.findIndex((l) => l.id === currentId);
  if (idx >= 0 && idx < PYTHON_LESSONS.length - 1) {
    return PYTHON_LESSONS[idx + 1];
  }
  return null;
}

export function getPrevPythonLesson(currentId: string): PythonLessonDefinition | null {
  const idx = PYTHON_LESSONS.findIndex((l) => l.id === currentId);
  if (idx > 0) {
    return PYTHON_LESSONS[idx - 1];
  }
  return null;
}
