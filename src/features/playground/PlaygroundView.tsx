import React, { useState, useEffect, useCallback } from 'react';
import { ALL_DATASETS } from '../../data/lessons';
import { DatasetDefinition } from '../../types/lesson';
import { QueryResult } from '../../types/database';
import { createDatabaseFromDataset, executeQuery } from '../../database/sqlEngine';
import { SqlEditor } from '../../components/editor/SqlEditor';
import { ResultsTable } from '../../components/editor/ResultsTable';
import { QueryExecutionBar } from '../../components/editor/QueryExecutionBar';
import { QuickSqlChips } from '../../components/editor/QuickSqlChips';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Terminal, Database, Table, RotateCcw } from 'lucide-react';
import { Database as SqliteDatabase } from 'sql.js';

export function PlaygroundView() {
  const [selectedDataset, setSelectedDataset] = useState<DatasetDefinition>(ALL_DATASETS[0]);
  const [dbInstance, setDbInstance] = useState<SqliteDatabase | null>(null);
  const [query, setQuery] = useState(`SELECT *\nFROM ${ALL_DATASETS[0].tableName}\nLIMIT 10;`);
  const [isRunning, setIsRunning] = useState(false);
  const [queryResult, setQueryResult] = useState<QueryResult | null>(null);
  const [initError, setInitError] = useState<string | null>(null);

  // Initialize SQLite database when selected dataset changes
  const initDb = useCallback(() => {
    let localDb: SqliteDatabase | null = null;
    setInitError(null);

    createDatabaseFromDataset(selectedDataset)
      .then((db) => {
        localDb = db;
        setDbInstance(db);
      })
      .catch((err) => {
        setInitError(err?.message || 'Failed to initialize sandbox database.');
      });

    return () => {
      if (localDb) localDb.close();
    };
  }, [selectedDataset]);

  useEffect(() => {
    const cleanup = initDb();
    setQuery(`SELECT *\nFROM ${selectedDataset.tableName}\nLIMIT 10;`);
    setQueryResult(null);
    return cleanup;
  }, [selectedDataset, initDb]);

  const handleRunQuery = useCallback(() => {
    if (!dbInstance) return;

    setIsRunning(true);
    setTimeout(() => {
      try {
        const res = executeQuery(dbInstance, query);
        setQueryResult(res);
      } catch (err: any) {
        setQueryResult({
          columns: [],
          values: [],
          rowCount: 0,
          executionTimeMs: 0,
          error: err?.message || String(err),
        });
      } finally {
        setIsRunning(false);
      }
    }, 40);
  }, [dbInstance, query]);

  const handleResetQuery = () => {
    setQuery(`SELECT *\nFROM ${selectedDataset.tableName}\nLIMIT 10;`);
    setQueryResult(null);
  };

  const handleResetDatabase = () => {
    initDb();
    setQueryResult(null);
  };

  const handleInsertSnippet = (snippet: string) => {
    setQuery((prev) => {
      if (!prev || prev.trim() === '') return snippet;
      if (/\s$/.test(prev)) return prev + snippet;
      return prev + ' ' + snippet;
    });
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="border-b border-border pb-5">
        <h1 className="font-raleway text-2xl sm:text-3xl font-bold tracking-tight text-text-main flex items-center gap-3">
          <Terminal className="w-7 h-7 text-primary" />
          <span>Practice Playground</span>
        </h1>
      </div>

      {/* Dataset Selection Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-surface border border-border rounded-lg shadow-subtle">
        <div className="flex items-center gap-3">
          <Database className="w-5 h-5 text-primary shrink-0" />
          <div>
            <span className="text-xs font-semibold text-text-muted block">Active Database Table</span>
            <span className="text-sm font-bold text-text-main font-mono">{selectedDataset.tableName}</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-text-muted">Switch Table:</span>
          <div className="flex items-center gap-1.5">
            {ALL_DATASETS.map((ds) => {
              const isSelected = selectedDataset.id === ds.id;
              return (
                <button
                  key={ds.id}
                  onClick={() => setSelectedDataset(ds)}
                  className={`px-3 py-1.5 text-xs font-mono rounded-md border transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-primary text-white border-primary font-semibold'
                      : 'bg-subtle text-text-main border-border hover:bg-border'
                  }`}
                >
                  {ds.tableName}
                </button>
              );
            })}
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={handleResetDatabase}
            title="Reload fresh dataset in SQLite"
            className="text-xs ml-2"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reload DB</span>
          </Button>
        </div>
      </div>

      {/* Schema Inspector */}
      <Card variant="subtle" className="p-4 space-y-2">
        <div className="flex items-center gap-2 text-xs font-semibold text-text-main">
          <Table className="w-3.5 h-3.5 text-secondary" />
          <span>Table Schema & Available Attributes: {selectedDataset.tableName}</span>
        </div>
        <div className="flex flex-wrap gap-2 pt-1 font-mono text-xs">
          {selectedDataset.sampleColumns.map((col) => (
            <span
              key={col}
              className="px-2.5 py-1 rounded bg-surface border border-border text-text-main"
            >
              {col}
            </span>
          ))}
        </div>
      </Card>

      {/* Editor & Execution */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs text-text-muted px-1">
          <span className="font-medium">Freeform Query Editor</span>
          <span>100% In-Browser SQLite WASM</span>
        </div>

        {initError ? (
          <div className="p-4 bg-error-subtle border border-error/40 rounded-lg text-xs text-error">
            {initError}
          </div>
        ) : (
          <div className="rounded-md border border-border overflow-hidden bg-surface shadow-subtle">
            <QuickSqlChips
              onInsert={handleInsertSnippet}
              tableName={selectedDataset.tableName}
              availableColumns={selectedDataset.sampleColumns}
            />

            <SqlEditor
              value={query}
              onChange={setQuery}
              onRun={handleRunQuery}
              disabled={!dbInstance || isRunning}
              minHeight="180px"
              className="border-0 rounded-none"
            />

            <div className="p-2.5 bg-subtle/50 border-t border-border">
              <QueryExecutionBar
                onRun={handleRunQuery}
                onReset={handleResetQuery}
                query={query}
                isRunning={isRunning}
              />
            </div>
          </div>
        )}
      </div>

      {/* Results */}
      <div className="space-y-2 pt-2">
        <span className="text-xs font-medium text-text-muted px-1 block">
          Output Grid
        </span>
        <ResultsTable result={queryResult} isLoading={isRunning} />
      </div>
    </div>
  );
}
