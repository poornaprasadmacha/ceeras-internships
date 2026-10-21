export type QuestionType =
  | 'multiple-choice'
  | 'true-false'
  | 'predict-output'
  | 'identify-error'
  | 'concept-match';

export type QuestionDifficulty = 'beginner' | 'intermediate' | 'advanced';

export interface QuizOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface QuizQuestion {
  id: string;
  question: string;
  explanation: string;
  difficulty: QuestionDifficulty;
  topicTag: string;
  type: QuestionType;
  options: QuizOption[];
  codeSnippet?: string;
}

export interface QuizAttemptRecord {
  quizId: string;
  lessonId?: string;
  score: number;
  totalQuestions: number;
  percentage: number;
  passed: boolean;
  completedAt: string;
  userAnswers: Record<string, string>; // questionId -> optionId
}
