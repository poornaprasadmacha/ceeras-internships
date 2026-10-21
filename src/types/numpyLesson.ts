import { QuizQuestion } from './quiz';

export interface NumpyChartData {
  type: 'matrix' | 'vector' | 'heatmap' | 'line' | 'bar';
  title: string;
  matrix?: number[][];
  vector?: number[];
  labels?: string[];
  values?: number[];
  rowLabels?: string[];
  colLabels?: string[];
  highlightIndices?: [number, number][];
}

export interface NumpyCodeExample {
  code: string;
  explanation: string;
  output?: string;
}

export interface NumpyLessonSection {
  id: string;
  title: string;
  content: string;
  formula?: string;
  codeExample?: NumpyCodeExample;
  chartPreview?: NumpyChartData;
}

export interface NumpyExerciseDefinition {
  id: string;
  lessonId: string;
  order: number;
  title: string;
  objective: string;
  initialCode: string;
  solutionCode: string;
  expectedOutput?: string;
  chartOutput?: NumpyChartData;
  hint: string;
  explanation: string;
  quickChips?: string[];
}

export interface NumpyLessonDefinition {
  id: string;
  number: number;
  slug: string;
  title: string;
  shortDescription: string;
  estimatedMinutes: number;
  learningObjectives: string[];
  prerequisites: string[];
  sections: NumpyLessonSection[];
  exercises: NumpyExerciseDefinition[];
  quiz: QuizQuestion[];
}
