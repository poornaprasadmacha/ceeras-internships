import { DataScienceLessonDefinition } from '../../types/dataScienceLesson';
import { dsLesson1 } from './lesson1';
import { dsLesson2 } from './lesson2';
import { dsLesson3 } from './lesson3';
import { dsLesson4 } from './lesson4';
import { dsLesson5 } from './lesson5';
import { dsLesson6 } from './lesson6';
import { dsLesson7 } from './lesson7';
import { dsLesson8 } from './lesson8';
import { dsLesson9 } from './lesson9';
import { dsLesson10 } from './lesson10';
import { dsLesson11 } from './lesson11';
import { dsLesson12 } from './lesson12';
import { dsLesson13 } from './lesson13';
import { dsLesson14 } from './lesson14';

export const DATA_SCIENCE_LESSONS: DataScienceLessonDefinition[] = [
  dsLesson1,
  dsLesson2,
  dsLesson3,
  dsLesson4,
  dsLesson5,
  dsLesson6,
  dsLesson7,
  dsLesson8,
  dsLesson9,
  dsLesson10,
  dsLesson11,
  dsLesson12,
  dsLesson13,
  dsLesson14,
];

export function getDataScienceLessonBySlug(slug: string): DataScienceLessonDefinition | undefined {
  return DATA_SCIENCE_LESSONS.find((l) => l.slug === slug);
}

export function getNextDataScienceLesson(currentId: string): DataScienceLessonDefinition | undefined {
  const index = DATA_SCIENCE_LESSONS.findIndex((l) => l.id === currentId);
  if (index >= 0 && index < DATA_SCIENCE_LESSONS.length - 1) {
    return DATA_SCIENCE_LESSONS[index + 1];
  }
  return undefined;
}

export function getPrevDataScienceLesson(currentId: string): DataScienceLessonDefinition | undefined {
  const index = DATA_SCIENCE_LESSONS.findIndex((l) => l.id === currentId);
  if (index > 0) {
    return DATA_SCIENCE_LESSONS[index - 1];
  }
  return undefined;
}
