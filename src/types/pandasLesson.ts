import { QuizQuestion } from './quiz';

export interface PandasTableData {
  columns: string[];
  index: (string | number)[];
  data: (string | number | boolean | null)[][];
  dtypes?: Record<string, string>;
  shape: [number, number];
  title?: string;
}

export interface PandasCodeExample {
  code: string;
  explanation: string;
  output?: string;
  table?: PandasTableData;
}

export interface PandasLessonSection {
  id: string;
  title: string;
  content: string;
  formula?: string;
  codeExample?: PandasCodeExample;
  tablePreview?: PandasTableData;
}

export interface PandasExerciseDefinition {
  id: string;
  lessonId: string;
  order: number;
  title: string;
  objective: string;
  initialCode: string;
  solutionCode: string;
  expectedOutput?: string;
  expectedTable?: PandasTableData;
  hint: string;
  explanation: string;
  quickChips?: string[];
}

export interface PandasLessonDefinition {
  id: string;
  number: number;
  slug: string;
  title: string;
  shortDescription: string;
  estimatedMinutes: number;
  learningObjectives: string[];
  prerequisites: string[];
  sections: PandasLessonSection[];
  exercises: PandasExerciseDefinition[];
  quiz: QuizQuestion[];
}
