import { QueryResult, VerificationResult } from '../types/database';

// Disallowed mutating keywords for read-only exercises
const DISALLOWED_MUTATIONS = [
  'DROP',
  'ALTER',
  'DELETE',
  'UPDATE',
  'INSERT',
  'CREATE',
  'REPLACE',
  'TRUNCATE',
  'ATTACH',
  'DETACH',
  'VACUUM',
  'REINDEX',
];

export function validateQuerySafety(query: string, allowMutations = false): { isSafe: boolean; reason?: string } {
  const trimmed = query.trim();
  if (!trimmed) {
    return { isSafe: false, reason: 'Please enter a SQL statement.' };
  }

  if (allowMutations) {
    return { isSafe: true };
  }

  // Tokenize roughly to look for top-level mutating commands
  // Remove comments (both -- and /* */)
  const cleanSql = trimmed
    .replace(/--.*$/gm, '')
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .trim();

  const words = cleanSql.split(/[\s;()]+/).filter(Boolean).map((w) => w.toUpperCase());

  for (const word of words) {
    if (DISALLOWED_MUTATIONS.includes(word)) {
      return {
        isSafe: false,
        reason: `Query rejected: This lesson is strictly read-only. Data modification and structural commands (such as ${word}) are restricted in this exercise.`,
      };
    }
  }

  return { isSafe: true };
}

/**
 * Normalizes a cell value for resilient equality comparison
 */
function normalizeVal(val: any): string {
  if (val === null || val === undefined) return 'NULL';
  if (typeof val === 'number') return String(val);
  return String(val).trim();
}

/**
 * Compares two rows for value equality
 */
function rowsEqual(rowA: any[], rowB: any[]): boolean {
  if (rowA.length !== rowB.length) return false;
  return rowA.every((v, i) => normalizeVal(v) === normalizeVal(rowB[i]));
}

/**
 * Semantically verifies a student's query output against the expected reference output
 */
export function verifyQueryResult(
  actual: QueryResult,
  expected: QueryResult,
  expectedColumns?: string[],
  requiresOrder = false
): VerificationResult {
  if (actual.error) {
    return {
      isCorrect: false,
      feedbackType: 'error',
      message: actual.error,
    };
  }

  // 1. Check Column Count
  if (actual.columns.length !== expected.columns.length) {
    return {
      isCorrect: false,
      feedbackType: 'warning',
      message: `Column count mismatch: Expected ${expected.columns.length} column(s) (${expected.columns.join(', ')}), but your query returned ${actual.columns.length} column(s) (${actual.columns.join(', ')}).`,
      details: {
        expectedColumns: expected.columns,
        actualColumns: actual.columns,
        mismatchReason: 'column_count_mismatch',
      },
    };
  }

  // 2. Check Column Names (case-insensitive)
  const actualColsLower = actual.columns.map((c) => c.toLowerCase());
  const expectedColsLower = (expectedColumns || expected.columns).map((c) => c.toLowerCase());

  const colMismatch = expectedColsLower.some((col, idx) => actualColsLower[idx] !== col);
  if (colMismatch) {
    return {
      isCorrect: false,
      feedbackType: 'warning',
      message: `Column name mismatch: Make sure you select the requested column(s). Expected: [${(expectedColumns || expected.columns).join(', ')}], received: [${actual.columns.join(', ')}]. Check spelling and order.`,
      details: {
        expectedColumns: expectedColumns || expected.columns,
        actualColumns: actual.columns,
        mismatchReason: 'column_name_mismatch',
      },
    };
  }

  // 3. Check Row Count
  if (actual.values.length !== expected.values.length) {
    return {
      isCorrect: false,
      feedbackType: 'warning',
      message: `Row count mismatch: Expected ${expected.values.length} row(s), but your query returned ${actual.values.length} row(s).`,
      details: {
        expectedRowCount: expected.values.length,
        actualRowCount: actual.values.length,
        mismatchReason: 'row_count_mismatch',
      },
    };
  }

  // 4. Check Row Values
  if (requiresOrder) {
    // Ordered comparison
    for (let i = 0; i < expected.values.length; i++) {
      if (!rowsEqual(actual.values[i], expected.values[i])) {
        return {
          isCorrect: false,
          feedbackType: 'warning',
          message: `Row content mismatch at row ${i + 1}. Check your query filters, columns, or sort order.`,
          details: {
            mismatchReason: 'row_value_mismatch_ordered',
          },
        };
      }
    }
  } else {
    // Unordered multiset comparison: each expected row must exist in actual rows
    const actualRemaining = [...actual.values];
    for (const expRow of expected.values) {
      const matchIdx = actualRemaining.findIndex((actRow) => rowsEqual(actRow, expRow));
      if (matchIdx === -1) {
        return {
          isCorrect: false,
          feedbackType: 'warning',
          message: 'The returned rows do not match the expected dataset. Verify your selected columns and table name.',
          details: {
            mismatchReason: 'row_value_mismatch_unordered',
          },
        };
      }
      actualRemaining.splice(matchIdx, 1);
    }
  }

  return {
    isCorrect: true,
    feedbackType: 'success',
    message: 'Excellent work! Your query returned the exact expected result.',
  };
}
