import initSqlJs, { Database, SqlJsStatic } from 'sql.js';
import { QueryResult } from '../types/database';
import { DatasetDefinition } from '../types/lesson';
import { validateQuerySafety } from './queryValidator';

let SQLModule: SqlJsStatic | null = null;
let initPromise: Promise<SqlJsStatic> | null = null;

export async function getSqlModule(): Promise<SqlJsStatic> {
  if (SQLModule) return SQLModule;

  if (!initPromise) {
    initPromise = initSqlJs({
      locateFile: (file: string) => `/${file}`,
    })
      .then((module) => {
        SQLModule = module;
        return module;
      })
      .catch((err) => {
        initPromise = null;
        console.error('Failed to initialize SQLite WebAssembly module:', err);
        throw new Error(
          `Could not initialize the local SQLite engine: ${err?.message || err}. Ensure WebAssembly is supported and assets are accessible.`
        );
      });
  }

  return initPromise;
}

/**
 * Creates a fresh, isolated in-memory SQLite database populated with the specified dataset
 */
export async function createDatabaseFromDataset(dataset: DatasetDefinition): Promise<Database> {
  const SQL = await getSqlModule();
  const db = new SQL.Database();

  try {
    if (dataset.schemaDDL) {
      db.run(dataset.schemaDDL);
    }
    if (dataset.seedDML) {
      db.run(dataset.seedDML);
    }
    return db;
  } catch (err: any) {
    db.close();
    throw new Error(`Failed to initialize exercise database: ${err?.message || err}`);
  }
}

/**
 * Maps raw SQLite error messages to student-friendly pedagogical guidance
 */
function humanizeSqlError(rawError: string): string {
  const lower = rawError.toLowerCase();

  if (lower.includes('no such table')) {
    const match = rawError.match(/no such table: (.*)/i);
    const tableName = match ? match[1] : '';
    return `Table not found ${tableName ? `("${tableName}")` : ''}. Check the spelling and capitalization of the table in your FROM clause.`;
  }

  if (lower.includes('no such column')) {
    const match = rawError.match(/no such column: (.*)/i);
    const colName = match ? match[1] : '';
    return `Column not found ${colName ? `("${colName}")` : ''}. Check the spelling of your column names. If you intended a text string, enclose it in single quotes ('text').`;
  }

  if (lower.includes('syntax error')) {
    return `Syntax error: SQLite could not understand your query. Check for missing commas between columns, unmatched parentheses, or misplaced keywords.`;
  }

  if (lower.includes('incomplete input')) {
    return `Incomplete query: It looks like your statement was cut short. Check that all quotes, parentheses, and clauses are closed.`;
  }

  return rawError;
}

/**
 * Executes a student query with safety validation, error translation, and execution timing
 */
export function executeQuery(
  db: Database,
  query: string,
  allowMutations = false,
  maxRows = 500
): QueryResult {
  const startTime = performance.now();

  // 1. Safety validation
  const safety = validateQuerySafety(query, allowMutations);
  if (!safety.isSafe) {
    return {
      columns: [],
      values: [],
      rowCount: 0,
      executionTimeMs: 0,
      error: safety.reason,
    };
  }

  try {
    const res = db.exec(query);
    const duration = Math.round((performance.now() - startTime) * 100) / 100;

    if (!res || res.length === 0) {
      return {
        columns: [],
        values: [],
        rowCount: 0,
        executionTimeMs: duration,
      };
    }

    // Take the last result statement
    const lastResult = res[res.length - 1];
    const columns = lastResult.columns;
    const values: (string | number | null)[][] = lastResult.values.slice(0, maxRows).map((row) =>
      row.map((cell) => {
        if (cell instanceof Uint8Array) {
          return '[BLOB]';
        }
        return cell;
      })
    );

    return {
      columns,
      values,
      rowCount: lastResult.values.length,
      executionTimeMs: duration,
    };
  } catch (err: any) {
    const duration = Math.round((performance.now() - startTime) * 100) / 100;
    const rawMessage = err?.message || String(err);
    return {
      columns: [],
      values: [],
      rowCount: 0,
      executionTimeMs: duration,
      error: humanizeSqlError(rawMessage),
    };
  }
}
