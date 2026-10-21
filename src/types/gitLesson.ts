import { QuizQuestion } from './quiz';

export interface GitCommitNode {
  id: string; // 7-char short SHA or full hash
  message: string;
  author: string;
  timestamp: string;
  parents: string[];
  branchTags: string[];
  isHead?: boolean;
}

export interface GitGraphData {
  commits: GitCommitNode[];
  currentBranch: string;
  headCommitId?: string;
  stagedFiles: string[];
  modifiedFiles: string[];
  untrackedFiles: string[];
  remotes?: Record<string, string>;
}

export interface GitCodeExample {
  command: string;
  explanation: string;
  output?: string;
  graph?: GitGraphData;
}

export interface GitLessonSection {
  id: string;
  title: string;
  content: string;
  codeExample?: GitCodeExample;
  graphPreview?: GitGraphData;
}

export interface GitExerciseDefinition {
  id: string;
  lessonId: string;
  order: number;
  title: string;
  objective: string;
  initialCommands: string[];
  solutionCommands: string[];
  expectedOutputSubstring?: string;
  expectedBranch?: string;
  expectedCommitCount?: number;
  hint: string;
  explanation: string;
  quickChips?: string[];
}

export interface GitLessonDefinition {
  id: string;
  number: number;
  slug: string;
  title: string;
  shortDescription: string;
  estimatedMinutes: number;
  learningObjectives: string[];
  prerequisites: string[];
  sections: GitLessonSection[];
  exercises: GitExerciseDefinition[];
  quiz: QuizQuestion[];
}
