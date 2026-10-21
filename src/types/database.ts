export interface QueryResult {
  columns: string[];
  values: (string | number | null)[][];
  rowCount: number;
  executionTimeMs: number;
  error?: string;
}

export interface VerificationResult {
  isCorrect: boolean;
  message: string;
  feedbackType: 'success' | 'warning' | 'error' | 'info';
  details?: {
    expectedColumns?: string[];
    actualColumns?: string[];
    expectedRowCount?: number;
    actualRowCount?: number;
    mismatchReason?: string;
  };
}
