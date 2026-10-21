import { QuizQuestion } from './quiz';

export interface DataScienceDataset {
  name: string;
  columns: string[];
  rows: (string | number | boolean | null)[][];
  description?: string;
}

export interface DataScienceChartData {
  type: 'bar' | 'scatter' | 'line' | 'table';
  title: string;
  labels?: string[];
  values?: number[];
  points?: { x: number; y: number; label?: string }[];
  xLabel?: string;
  yLabel?: string;
}

export interface DataScienceCodeExample {
  code: string;
  explanation: string;
  output?: string;
  tableData?: {
    columns: string[];
    rows: (string | number)[][];
  };
}

export interface DataScienceLessonSection {
  id: string;
  title: string;
  content: string;
  formula?: string;
  codeExample?: DataScienceCodeExample;
  chartPreview?: DataScienceChartData;
}

export interface DataScienceExerciseDefinition {
  id: string;
  lessonId: string;
  order: number;
  title: string;
  objective: string;
  dataset?: DataScienceDataset;
  initialCode: string;
  solutionCode: string;
  expectedOutput?: string;
  chartOutput?: DataScienceChartData;
  hint: string;
  explanation: string;
  quickChips?: string[];
}

export interface DataScienceLessonDefinition {
  id: string;
  number: number;
  slug: string;
  title: string;
  shortDescription: string;
  estimatedMinutes: number;
  learningObjectives: string[];
  prerequisites: string[];
  sections: DataScienceLessonSection[];
  exercises: DataScienceExerciseDefinition[];
  quiz: QuizQuestion[];
}
