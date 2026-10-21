import { QuizQuestion } from './quiz';

export interface JsCodeExample {
  code: string;
  explanation: string;
  output?: string;
}

export interface JsLessonSection {
  id: string;
  title: string;
  content: string;
  codeExample?: JsCodeExample;
  syntaxSummary?: {
    keyword: string;
    description: string;
    example: string;
  }[];
}

export interface JsExerciseDefinition {
  id: string;
  lessonId: string;
  order: number;
  title: string;
  objective: string;
  initialCode: string;
  solutionCode: string;
  expectedOutput?: string; // Terminal output comparison
  returnMatcher?: string; // Or function test
  hint: string;
  explanation: string;
  quickChips?: string[];
}

export interface JsLessonDefinition {
  id: string;
  number: number;
  slug: string;
  title: string;
  shortDescription: string;
  estimatedMinutes: number;
  learningObjectives: string[];
  prerequisites: string[];
  sections: JsLessonSection[];
  exercises: JsExerciseDefinition[];
  quiz: QuizQuestion[];
}
