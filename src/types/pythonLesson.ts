import { QuizQuestion } from './quiz';

export interface PythonCodeExample {
  code: string;
  explanation: string;
  output?: string;
}

export interface PythonLessonSection {
  id: string;
  title: string;
  content: string;
  codeExample?: PythonCodeExample;
}

export interface PythonExerciseDefinition {
  id: string;
  lessonId: string;
  order: number;
  title: string;
  objective: string;
  initialCode: string;
  solutionCode: string;
  expectedOutput: string;
  hint: string;
  explanation: string;
  quickChips?: string[];
}

export interface PythonLessonDefinition {
  id: string;
  number: number;
  slug: string;
  title: string;
  shortDescription: string;
  estimatedMinutes: number;
  learningObjectives: string[];
  prerequisites: string[];
  sections: PythonLessonSection[];
  exercises: PythonExerciseDefinition[];
  quiz: QuizQuestion[];
}
