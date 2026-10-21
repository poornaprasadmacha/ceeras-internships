import { QuizQuestion } from './quiz';

export interface CssCodeExample {
  code: string;
  explanation: string;
  previewHtml?: string;
}

export interface CssPropertyReference {
  property: string;
  description: string;
  syntax: string;
  commonValues: string[];
}

export interface CssLessonSection {
  id: string;
  title: string;
  content: string;
  codeExample?: CssCodeExample;
  propertyReferences?: CssPropertyReference[];
}

export interface CssValidationRule {
  id: string;
  description: string;
  targetSelector: string; // e.g. "button", ".card", "h1", ".container"
  property: string; // e.g. "color", "background-color", "border-radius", "display", "justify-content", "padding"
  expectedValue?: string; // e.g. "flex", "center", "pointer", "12px"
  pattern?: string; // Regex test on computed or raw CSS declaration
  customValidator?: string; // e.g. "has-gradient", "has-border-radius", "is-flex-centered"
}

export interface CssExerciseDefinition {
  id: string;
  lessonId: string;
  order: number;
  title: string;
  objective: string;
  htmlSnippet: string; // The HTML component being styled in the preview canvas
  initialCss: string;
  solutionCss: string;
  validationRules: CssValidationRule[];
  hint: string;
  explanation: string;
  quickChips?: string[];
}

export interface CssLessonDefinition {
  id: string;
  number: number;
  slug: string;
  title: string;
  shortDescription: string;
  estimatedMinutes: number;
  learningObjectives: string[];
  prerequisites: string[];
  sections: CssLessonSection[];
  exercises: CssExerciseDefinition[];
  quiz: QuizQuestion[];
}
