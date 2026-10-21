import { MLLessonDefinition } from '../../types/machineLearningLesson';
import { mlLesson1 } from './lesson1';
import { mlLesson2 } from './lesson2';
import { mlLesson3 } from './lesson3';
import { mlLesson4 } from './lesson4';
import { mlLesson5 } from './lesson5';
import { mlLesson6 } from './lesson6';
import { mlLesson7 } from './lesson7';
import { mlLesson8 } from './lesson8';
import { mlLesson9 } from './lesson9';
import { mlLesson10 } from './lesson10';
import { mlLesson11 } from './lesson11';
import { mlLesson12 } from './lesson12';
import { mlLesson13 } from './lesson13';
import { mlLesson14 } from './lesson14';
import { mlLesson15 } from './lesson15';

export const MACHINE_LEARNING_LESSONS: MLLessonDefinition[] = [
  mlLesson1,
  mlLesson2,
  mlLesson3,
  mlLesson4,
  mlLesson5,
  mlLesson6,
  mlLesson7,
  mlLesson8,
  mlLesson9,
  mlLesson10,
  mlLesson11,
  mlLesson12,
  mlLesson13,
  mlLesson14,
  mlLesson15,
];

export function getMLLessonBySlug(slug: string): MLLessonDefinition | undefined {
  return MACHINE_LEARNING_LESSONS.find((l) => l.slug === slug);
}

export function getNextMLLesson(currentId: string): MLLessonDefinition | undefined {
  const index = MACHINE_LEARNING_LESSONS.findIndex((l) => l.id === currentId);
  if (index >= 0 && index < MACHINE_LEARNING_LESSONS.length - 1) {
    return MACHINE_LEARNING_LESSONS[index + 1];
  }
  return undefined;
}

export function getPrevMLLesson(currentId: string): MLLessonDefinition | undefined {
  const index = MACHINE_LEARNING_LESSONS.findIndex((l) => l.id === currentId);
  if (index > 0) {
    return MACHINE_LEARNING_LESSONS[index - 1];
  }
  return undefined;
}
