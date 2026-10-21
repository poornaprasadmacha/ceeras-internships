import { QuizQuestion } from './quiz';

export interface VsCodeFileItem {
  name: string;
  path: string;
  content: string;
  language: string;
  isModified?: boolean;
}

export interface VsCodeIdeState {
  files: Record<string, string>;
  openTabs: string[];
  activeFile: string;
  activeSidebar: 'explorer' | 'search' | 'git' | 'debug' | 'extensions' | 'settings';
  terminalOutput: string;
  statusInfo: {
    branch: string;
    line: number;
    col: number;
    errors: number;
    warnings: number;
    language: string;
    spaces: number;
  };
  commandPaletteOpen?: boolean;
}

export interface VsCodeCodeExample {
  title: string;
  code: string;
  language: string;
  explanation: string;
}

export interface VsCodeLessonSection {
  id: string;
  title: string;
  content: string;
  codeExample?: VsCodeCodeExample;
  idePreviewState?: Partial<VsCodeIdeState>;
}

export interface VsCodeExerciseDefinition {
  id: string;
  lessonId: string;
  order: number;
  title: string;
  objective: string;
  initialState: Partial<VsCodeIdeState>;
  solutionAction: string; // Action description or command
  expectedStateMatch: (state: VsCodeIdeState) => boolean;
  hint: string;
  explanation: string;
  quickChips?: string[];
}

export interface VsCodeLessonDefinition {
  id: string;
  number: number;
  slug: string;
  title: string;
  shortDescription: string;
  estimatedMinutes: number;
  learningObjectives: string[];
  prerequisites: string[];
  sections: VsCodeLessonSection[];
  exercises: VsCodeExerciseDefinition[];
  quiz: QuizQuestion[];
}
