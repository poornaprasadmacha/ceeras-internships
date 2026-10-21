import { QuizQuestion } from './quiz';

export interface DatasetDefinition {
  id: string;
  tableName: string;
  description: string;
  schemaDDL: string;
  seedDML: string;
  sampleColumns: string[];
  sampleRows: (string | number | null)[][];
}

export interface ExerciseDefinition {
  id: string;
  lessonId: string;
  order: number;
  title: string;
  objective: string;
  initialQuery: string;
  solutionQuery: string;
  hint: string;
  explanation: string;
  requiresOrder?: boolean;
  expectedColumns?: string[];
  acceptedAlternativeQueries?: string[];
  allowsMutation?: boolean;
  verificationQuery?: string;
}

export interface TerminologyItem {
  id: string;
  term: string;
  definition: string;
}

export interface LessonSection {
  id: string;
  title: string;
  content: string; // Markdown / prose
  codeExample?: {
    sql: string;
    explanation: string;
  };
  sampleTable?: {
    title: string;
    columns: string[];
    rows: (string | number | null)[][];
  };
}

export interface InteractiveCheck {
  id: string;
  title: string;
  instructions: string;
  type: 'identify-elements';
  options: {
    id: string;
    label: string;
    isRow: boolean;
    isColumn: boolean;
  }[];
}

export interface LessonDefinition {
  id: string;
  number: number;
  slug: string;
  title: string;
  shortDescription: string;
  estimatedMinutes: number;
  learningObjectives: string[];
  prerequisites: string[];
  dataset: DatasetDefinition;
  sections: LessonSection[];
  comprehensionQuestions?: QuizQuestion[];
  terminologyMatching?: TerminologyItem[];
  interactiveCheck?: InteractiveCheck;
  exercises: ExerciseDefinition[];
  quiz: QuizQuestion[];
}
