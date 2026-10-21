import { QuizQuestion } from './quiz';

export interface MLDataset {
  name: string;
  featureNames: string[];
  targetName: string;
  rows: { features: number[]; target: number | string }[];
  description?: string;
}

export interface MLChartData {
  type: 'scatter-boundary' | 'regression-fit' | 'loss-curve' | 'bar' | 'confusion-matrix';
  title: string;
  xLabel?: string;
  yLabel?: string;
  points?: { x: number; y: number; class?: number | string; label?: string }[];
  line?: { slope: number; intercept: number };
  curve?: { x: number; y: number }[];
  matrix?: {
    labels: string[];
    matrix: number[][];
  };
  labels?: string[];
  values?: number[];
}

export interface MLCodeExample {
  code: string;
  explanation: string;
  output?: string;
}

export interface MLLessonSection {
  id: string;
  title: string;
  content: string;
  formula?: string;
  codeExample?: MLCodeExample;
  chartPreview?: MLChartData;
}

export interface MLExerciseDefinition {
  id: string;
  lessonId: string;
  order: number;
  title: string;
  objective: string;
  dataset?: MLDataset;
  initialCode: string;
  solutionCode: string;
  expectedOutput?: string;
  chartOutput?: MLChartData;
  hint: string;
  explanation: string;
  quickChips?: string[];
}

export interface MLLessonDefinition {
  id: string;
  number: number;
  slug: string;
  title: string;
  shortDescription: string;
  estimatedMinutes: number;
  learningObjectives: string[];
  prerequisites: string[];
  sections: MLLessonSection[];
  exercises: MLExerciseDefinition[];
  quiz: QuizQuestion[];
}
