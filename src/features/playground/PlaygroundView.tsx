import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ALL_DATASETS } from '../../data/lessons';
import { DatasetDefinition } from '../../types/lesson';
import { QueryResult } from '../../types/database';
import { createDatabaseFromDataset, executeQuery } from '../../database/sqlEngine';
import { executePythonCode, PythonExecutionResult } from '../../services/pythonEngine';
import { SqlEditor } from '../../components/editor/SqlEditor';
import { PythonEditor } from '../../components/editor/PythonEditor';
import { HtmlEditor } from '../../components/editor/HtmlEditor';
import { ResultsTable } from '../../components/editor/ResultsTable';
import { QueryExecutionBar } from '../../components/editor/QueryExecutionBar';
import { QuickSqlChips } from '../../components/editor/QuickSqlChips';
import { PythonQuickChips } from '../../components/editor/PythonQuickChips';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { useActiveCourse } from '../../hooks/useActiveCourse';
import {
  Terminal,
  Database,
  Table,
  RotateCcw,
  Play,
  Copy,
  Check,
  Code2,
  Globe,
  Trash2,
} from 'lucide-react';
import {
  SqlLogo,
  PythonLogo,
  HtmlLogo,
} from '../../components/ui/LanguageLogos';
import { Database as SqliteDatabase } from 'sql.js';
import { cn } from '../../lib/utils';

type SandboxTab = 'sql' | 'python' | 'web';

const PYTHON_PRESETS = [
  {
    name: 'Hello World & F-Strings',
    code: `# Basic Python output & f-string formatting
name = "World"
year = 2026

print(f"Hello, {name}!")
print(f"Welcome to Python learning in {year}.")

# Simple arithmetic
a = 15
b = 4
print(f"{a} + {b} = {a + b}")
print(f"{a} // {b} = {a // b} (integer division)")
print(f"{a} % {b} = {a % b} (modulus)")
`,
  },
  {
    name: 'List Comprehensions & Math',
    code: `# List comprehensions and filtering
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

# Calculate squares of even numbers
even_squares = [n ** 2 for n in numbers if n % 2 == 0]

print("Original list:", numbers)
print("Even squares:", even_squares)

# Aggregate functions
print("Sum of numbers:", sum(numbers))
print("Max value:", max(numbers))
print("Average:", sum(numbers) / len(numbers))
`,
  },
  {
    name: 'Dictionaries & Frequency Counter',
    code: `# Counting frequencies using dictionaries
words = ["python", "data", "sql", "python", "machine", "learning", "data", "python"]

counts = {}
for w in words:
    counts[w] = counts.get(w, 0) + 1

print("Word frequency count:")
for word, freq in counts.items():
    print(f"  {word.ljust(16)} -> {freq} occurrences")
`,
  },
  {
    name: 'Functions & Fibonacci Series',
    code: `# Recursive / iterative function
def fibonacci(n):
    sequence = [0, 1]
    while len(sequence) < n:
        sequence.append(sequence[-1] + sequence[-2])
    return sequence[:n]

n = 10
fib_series = fibonacci(n)
print(f"First {n} Fibonacci numbers:")
print(fib_series)
`,
  },
  {
    name: 'Classes & OOP',
    code: `# Object-Oriented Programming
class Student:
    def __init__(self, name, major, gpa):
        self.name = name
        self.major = major
        self.gpa = gpa
    
    def get_summary(self):
        status = "Honors" if self.gpa >= 3.5 else "Good Standing"
        return f"{self.name} ({self.major}) - GPA: {self.gpa} [{status}]"

s1 = Student("Alice", "Computer Science", 3.85)
s2 = Student("Bob", "Data Science", 3.42)

print(s1.get_summary())
print(s2.get_summary())
`,
  },
];

const WEB_PRESETS = [
  {
    name: 'Interactive Counter Card',
    code: `<div class="card">
  <h2>Interactive Web Sandbox</h2>
  <p>Edit HTML and styles to see live updates instantly.</p>
  <button id="counter-btn" onclick="handleClick()">Clicks: 0</button>
</div>

<style>
  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    margin: 0;
    background: #f8fafc;
    color: #0f172a;
  }
  .card {
    background: #ffffff;
    border: 1px solid #e2e8f0;
    border-radius: 12px;
    padding: 24px;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    max-width: 360px;
    text-align: center;
  }
  h2 { margin-top: 0; color: #0284c7; }
  p { color: #64748b; font-size: 14px; line-height: 1.5; }
  button {
    background: #0284c7;
    color: #ffffff;
    border: none;
    padding: 10px 20px;
    font-size: 14px;
    font-weight: 600;
    border-radius: 8px;
    cursor: pointer;
    transition: background 0.15s;
  }
  button:hover { background: #0369a1; }
</style>

<script>
  let count = 0;
  function handleClick() {
    count++;
    document.getElementById('counter-btn').innerText = 'Clicks: ' + count;
  }
</script>`,
  },
];

export function PlaygroundView() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { activeCourse, setActiveCourseId } = useActiveCourse();

  // Determine initial sandbox tab based on URL param or current active course
  const paramCourse = searchParams.get('course')?.toLowerCase();
  const initialTab: SandboxTab = useMemo(() => {
    if (paramCourse === 'python' || paramCourse === 'numpy' || paramCourse === 'pandas' || paramCourse === 'datascience' || paramCourse === 'machinelearning') {
      return 'python';
    }
    if (paramCourse === 'html' || paramCourse === 'css' || paramCourse === 'javascript') {
      return 'web';
    }
    if (paramCourse === 'sql') {
      return 'sql';
    }
    // Fall back to active course
    if (['python', 'numpy', 'pandas', 'datascience', 'machinelearning'].includes(activeCourse.id)) {
      return 'python';
    }
    if (['html', 'css', 'javascript'].includes(activeCourse.id)) {
      return 'web';
    }
    return 'sql';
  }, [paramCourse, activeCourse.id]);

  const [activeTab, setActiveTab] = useState<SandboxTab>(initialTab);

  // Sync tab with URL search parameter
  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  const handleTabChange = (tab: SandboxTab) => {
    setActiveTab(tab);
    setSearchParams({ course: tab });
    if (tab === 'python') setActiveCourseId('python');
    else if (tab === 'sql') setActiveCourseId('sql');
    else if (tab === 'web') setActiveCourseId('html');
  };

  // -------------------------------------------------------------
  // SQL Sandbox State & Logic
  // -------------------------------------------------------------
  const [selectedDataset, setSelectedDataset] = useState<DatasetDefinition>(ALL_DATASETS[0]);
  const [dbInstance, setDbInstance] = useState<SqliteDatabase | null>(null);
  const [sqlQuery, setSqlQuery] = useState(`SELECT *\nFROM ${ALL_DATASETS[0].tableName}\nLIMIT 10;`);
  const [isSqlRunning, setIsSqlRunning] = useState(false);
  const [sqlQueryResult, setSqlQueryResult] = useState<QueryResult | null>(null);
  const [sqlInitError, setSqlInitError] = useState<string | null>(null);

  const initDb = useCallback(() => {
    let localDb: SqliteDatabase | null = null;
    setSqlInitError(null);

    createDatabaseFromDataset(selectedDataset)
      .then((db) => {
        localDb = db;
        setDbInstance(db);
      })
      .catch((err) => {
        setSqlInitError(err?.message || 'Failed to initialize sandbox database.');
      });

    return () => {
      if (localDb) localDb.close();
    };
  }, [selectedDataset]);

  useEffect(() => {
    const cleanup = initDb();
    setSqlQuery(`SELECT *\nFROM ${selectedDataset.tableName}\nLIMIT 10;`);
    setSqlQueryResult(null);
    return cleanup;
  }, [selectedDataset, initDb]);

  const handleRunSqlQuery = useCallback(() => {
    if (!dbInstance) return;

    setIsSqlRunning(true);
    setTimeout(() => {
      try {
        const res = executeQuery(dbInstance, sqlQuery);
        setSqlQueryResult(res);
      } catch (err: any) {
        setSqlQueryResult({
          columns: [],
          values: [],
          rowCount: 0,
          executionTimeMs: 0,
          error: err?.message || String(err),
        });
      } finally {
        setIsSqlRunning(false);
      }
    }, 40);
  }, [dbInstance, sqlQuery]);

  const handleInsertSqlSnippet = (snippet: string) => {
    setSqlQuery((prev) => {
      if (!prev || prev.trim() === '') return snippet;
      if (/\s$/.test(prev)) return prev + snippet;
      return prev + ' ' + snippet;
    });
  };

  // -------------------------------------------------------------
  // Python Sandbox State & Logic
  // -------------------------------------------------------------
  const [pythonCode, setPythonCode] = useState(PYTHON_PRESETS[0].code);
  const [isPythonRunning, setIsPythonRunning] = useState(false);
  const [pythonResult, setPythonResult] = useState<PythonExecutionResult | null>(null);
  const [selectedPythonPreset, setSelectedPythonPreset] = useState(0);

  const handleRunPython = async () => {
    setIsPythonRunning(true);
    try {
      const res = await executePythonCode(pythonCode);
      setPythonResult(res);
    } catch (err: any) {
      setPythonResult({
        output: '',
        error: String(err),
        executionTimeMs: 0,
      });
    } finally {
      setIsPythonRunning(false);
    }
  };

  const handleInsertPythonSnippet = (snippet: string) => {
    setPythonCode((prev) => prev + snippet);
  };

  const handleSelectPythonPreset = (index: number) => {
    setSelectedPythonPreset(index);
    setPythonCode(PYTHON_PRESETS[index].code);
    setPythonResult(null);
  };

  // -------------------------------------------------------------
  // Web Sandbox State & Logic
  // -------------------------------------------------------------
  const [webCode, setWebCode] = useState(WEB_PRESETS[0].code);

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="border-b border-border pb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-raleway text-2xl sm:text-3xl font-bold tracking-tight text-text-main flex items-center gap-3">
            <Terminal className="w-7 h-7 text-primary" />
            <span>Practice Playground</span>
          </h1>
        </div>

        {/* Multi-Language Sandbox Environment Switcher Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-subtle border border-border rounded-lg self-start sm:self-auto">
          <button
            type="button"
            onClick={() => handleTabChange('sql')}
            className={cn(
              'flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-semibold transition-all cursor-pointer',
              activeTab === 'sql'
                ? 'bg-surface text-primary shadow-2xs border border-border'
                : 'text-text-muted hover:text-text-main'
            )}
          >
            <SqlLogo className="w-4 h-4 rounded" />
            <span>SQL WASM</span>
          </button>

          <button
            type="button"
            onClick={() => handleTabChange('python')}
            className={cn(
              'flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-semibold transition-all cursor-pointer',
              activeTab === 'python'
                ? 'bg-surface text-primary shadow-2xs border border-border'
                : 'text-text-muted hover:text-text-main'
            )}
          >
            <PythonLogo className="w-4 h-4" />
            <span>Python Console</span>
          </button>

          <button
            type="button"
            onClick={() => handleTabChange('web')}
            className={cn(
              'flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-semibold transition-all cursor-pointer',
              activeTab === 'web'
                ? 'bg-surface text-primary shadow-2xs border border-border'
                : 'text-text-muted hover:text-text-main'
            )}
          >
            <HtmlLogo className="w-4 h-4" />
            <span>Web (HTML/CSS/JS)</span>
          </button>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 1. PYTHON SANDBOX VIEW                                   */}
      {/* ========================================================= */}
      {activeTab === 'python' && (
        <div className="space-y-5 animate-fadeIn">
          {/* Preset Selector Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-surface border border-border rounded-lg shadow-subtle">
            <div className="flex items-center gap-3">
              <PythonLogo className="w-6 h-6 shrink-0" />
              <div>
                <span className="text-xs font-semibold text-text-muted block">In-Browser Python 3 Runtime</span>
                <span className="text-sm font-bold text-text-main font-mono">Skulpt Execution Engine</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <label htmlFor="python-preset" className="text-xs font-medium text-text-muted">
                Load Preset:
              </label>
              <select
                id="python-preset"
                value={selectedPythonPreset}
                onChange={(e) => handleSelectPythonPreset(Number(e.target.value))}
                className="px-3 py-1.5 text-xs font-mono rounded-md border border-border bg-subtle text-text-main focus:outline-none focus:ring-2 focus:ring-primary/40 cursor-pointer"
              >
                {PYTHON_PRESETS.map((p, idx) => (
                  <option key={idx} value={idx}>
                    {p.name}
                  </option>
                ))}
              </select>

              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setPythonCode(PYTHON_PRESETS[selectedPythonPreset].code);
                  setPythonResult(null);
                }}
                title="Reset code to current preset"
                className="text-xs"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </Button>
            </div>
          </div>

          {/* Editor Container */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-text-muted px-1">
              <span className="font-medium">Freeform Python Editor</span>
              <span className="font-mono text-[11px]">Ctrl + Enter to Execute</span>
            </div>

            <div className="rounded-md border border-border overflow-hidden bg-surface shadow-subtle">
              <PythonQuickChips onInsert={handleInsertPythonSnippet} />

              <PythonEditor
                value={pythonCode}
                onChange={setPythonCode}
                onRun={handleRunPython}
                disabled={isPythonRunning}
                minHeight="220px"
                className="border-0 rounded-none"
              />

              <div className="p-2.5 bg-subtle/50 border-t border-border flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={handleRunPython}
                    disabled={isPythonRunning}
                    className="text-xs"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>{isPythonRunning ? 'Executing...' : 'Run Python'}</span>
                  </Button>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setPythonResult(null);
                    }}
                    className="text-xs text-text-muted"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Clear Output</span>
                  </Button>
                </div>

                {pythonResult && !pythonResult.error && (
                  <span className="text-[11px] text-text-muted font-mono">
                    Executed in {pythonResult.executionTimeMs} ms
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Terminal Output Console */}
          <div className="space-y-2 pt-1">
            <div className="flex items-center justify-between text-xs text-text-muted px-1">
              <span className="font-semibold text-text-main flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-primary" />
                <span>Standard Output (Terminal Console)</span>
              </span>
            </div>

            <div className="p-4 bg-editor-bg border border-border rounded-lg font-mono text-xs min-h-[120px] max-h-80 overflow-y-auto scrollbar-thin text-editor-text">
              {pythonResult?.error ? (
                <div className="text-error font-semibold whitespace-pre-wrap">
                  {pythonResult.error}
                </div>
              ) : pythonResult?.output ? (
                <pre className="whitespace-pre-wrap font-mono leading-relaxed">
                  {pythonResult.output}
                </pre>
              ) : (
                <span className="text-text-muted italic">
                  Write or edit code above and click &quot;Run Python&quot; (or press Ctrl+Enter) to see terminal output.
                </span>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 2. SQL WASM SANDBOX VIEW                                 */}
      {/* ========================================================= */}
      {activeTab === 'sql' && (
        <div className="space-y-5 animate-fadeIn">
          {/* Dataset Selection Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-surface border border-border rounded-lg shadow-subtle">
            <div className="flex items-center gap-3">
              <Database className="w-5 h-5 text-primary shrink-0" />
              <div>
                <span className="text-xs font-semibold text-text-muted block">Active Database Table</span>
                <span className="text-sm font-bold text-text-main font-mono">{selectedDataset.tableName}</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <label htmlFor="dataset-select" className="text-xs font-medium text-text-muted">
                Switch Table:
              </label>
              <select
                id="dataset-select"
                value={selectedDataset.id}
                onChange={(e) => {
                  const ds = ALL_DATASETS.find((d) => d.id === e.target.value);
                  if (ds) setSelectedDataset(ds);
                }}
                className="px-3 py-1.5 text-xs font-mono rounded-md border border-border bg-subtle text-text-main focus:outline-none focus:ring-2 focus:ring-primary/40 cursor-pointer"
              >
                {ALL_DATASETS.map((ds) => (
                  <option key={ds.id} value={ds.id}>
                    {ds.tableName} ({ds.sampleColumns.length} columns)
                  </option>
                ))}
              </select>

              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  initDb();
                  setSqlQueryResult(null);
                }}
                title="Reload fresh dataset in SQLite"
                className="text-xs"
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
              <span>Table Schema: {selectedDataset.tableName}</span>
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

            {sqlInitError ? (
              <div className="p-4 bg-error-subtle border border-error/40 rounded-lg text-xs text-error">
                {sqlInitError}
              </div>
            ) : (
              <div className="rounded-md border border-border overflow-hidden bg-surface shadow-subtle">
                <QuickSqlChips
                  onInsert={handleInsertSqlSnippet}
                  tableName={selectedDataset.tableName}
                  availableColumns={selectedDataset.sampleColumns}
                />

                <SqlEditor
                  value={sqlQuery}
                  onChange={setSqlQuery}
                  onRun={handleRunSqlQuery}
                  disabled={!dbInstance || isSqlRunning}
                  minHeight="180px"
                  className="border-0 rounded-none"
                />

                <div className="p-2.5 bg-subtle/50 border-t border-border">
                  <QueryExecutionBar
                    onRun={handleRunSqlQuery}
                    onReset={() => {
                      setSqlQuery(`SELECT *\nFROM ${selectedDataset.tableName}\nLIMIT 10;`);
                      setSqlQueryResult(null);
                    }}
                    query={sqlQuery}
                    isRunning={isSqlRunning}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Results Grid */}
          <div className="space-y-2 pt-2">
            <span className="text-xs font-medium text-text-muted px-1 block">
              Output Grid
            </span>
            <ResultsTable result={sqlQueryResult} isLoading={isSqlRunning} />
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 3. WEB (HTML / CSS / JS) SANDBOX VIEW                    */}
      {/* ========================================================= */}
      {activeTab === 'web' && (
        <div className="space-y-5 animate-fadeIn">
          <div className="p-4 bg-surface border border-border rounded-lg shadow-subtle flex items-center justify-between">
            <div className="flex items-center gap-3">
              <HtmlLogo className="w-6 h-6 shrink-0" />
              <div>
                <span className="text-xs font-semibold text-text-muted block">Live Browser Environment</span>
                <span className="text-sm font-bold text-text-main">HTML5 • CSS3 • JavaScript</span>
              </div>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setWebCode(WEB_PRESETS[0].code)}
              className="text-xs"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Template</span>
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Code Editor */}
            <div className="space-y-2">
              <span className="text-xs font-medium text-text-muted px-1 block">
                Code Editor (HTML, CSS & JS)
              </span>
              <div className="rounded-md border border-border overflow-hidden bg-surface shadow-subtle">
                <HtmlEditor
                  value={webCode}
                  onChange={setWebCode}
                  minHeight="380px"
                  className="border-0 rounded-none"
                />
              </div>
            </div>

            {/* Live Preview Iframe */}
            <div className="space-y-2">
              <span className="text-xs font-medium text-text-muted px-1 block flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-primary" />
                <span>Live Sandboxed Preview</span>
              </span>
              <div className="rounded-md border border-border overflow-hidden bg-white shadow-subtle h-[420px]">
                <iframe
                  title="Web Live Sandbox Preview"
                  srcDoc={webCode}
                  sandbox="allow-scripts allow-modals"
                  className="w-full h-full border-0 bg-white"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
