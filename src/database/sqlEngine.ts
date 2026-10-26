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
 * Maps raw SQLite error messages to student-friendly pedagogical guidance with categorization
 */
export function humanizeSqlError(rawError: string): string {
  const lower = rawError.toLowerCase();

  if (lower.includes('no such table')) {
    const match = rawError.match(/no such table: (.*)/i);
    const tableName = match ? match[1] : '';
    return `[Table Error] Table not found${tableName ? ` "${tableName}"` : ''}. Check the spelling and casing of the table name in your FROM clause.`;
  }

  if (lower.includes('no such column')) {
    const match = rawError.match(/no such column: (.*)/i);
    const colName = match ? match[1] : '';
    return `[Column Error] Column not found${colName ? ` "${colName}"` : ''}. Check column spelling against the table schema. If you intended a text value, enclose it in single quotes ('text').`;
  }

  if (lower.includes('syntax error')) {
    return `[Syntax Error] SQLite could not parse your query. Common causes: missing comma between column names, missing FROM keyword, or misspelled SQL keywords.`;
  }

  if (lower.includes('incomplete input')) {
    return `[Incomplete Statement] The statement was cut short. Check that all quotes, parentheses, and clauses are properly closed with a semicolon.`;
  }

  return `[Query Error] ${rawError}`;
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
