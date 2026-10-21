import { QuizQuestion } from './quiz';

export interface HtmlCodeExample {
  code: string;
  explanation: string;
  previewHtml?: string;
}

export interface HtmlTagReference {
  tag: string;
  description: string;
  syntax: string;
  attributes?: string[];
  selfClosing?: boolean;
}

export interface HtmlLessonSection {
  id: string;
  title: string;
  content: string;
  codeExample?: HtmlCodeExample;
  tagReferences?: HtmlTagReference[];
}

export interface HtmlValidationRule {
  id: string;
  description: string;
  // DOM validation criteria
  selector?: string; // CSS selector e.g. "h1", "img[alt]", "ul > li"
  minCount?: number;
  exactCount?: number;
  attributeCheck?: {
    name: string;
    value?: string;
    mustNotBeEmpty?: boolean;
    pattern?: string; // Regex string
  };
  textContains?: string;
  customCheckId?: string; // e.g. "has-valid-doctype", "head-and-body"
}

export interface HtmlExerciseDefinition {
  id: string;
  lessonId: string;
  order: number;
  title: string;
  objective: string;
  initialCode: string;
  solutionCode: string;
  validationRules: HtmlValidationRule[];
  hint: string;
  explanation: string;
  quickChips?: string[];
}

export interface HtmlLessonDefinition {
  id: string;
  number: number;
  slug: string;
  title: string;
  shortDescription: string;
  estimatedMinutes: number;
  learningObjectives: string[];
  prerequisites: string[];
  sections: HtmlLessonSection[];
  exercises: HtmlExerciseDefinition[];
  quiz: QuizQuestion[];
}
