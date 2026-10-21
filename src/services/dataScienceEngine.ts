import { DataScienceDataset, DataScienceChartData } from '../types/dataScienceLesson';

export interface DataScienceExecutionResult {
  output: string;
  error?: string;
  chart?: DataScienceChartData;
  table?: {
    columns: string[];
    rows: (string | number)[][];
  };
  executionTimeMs: number;
}

function createDataFrame(dataset: DataScienceDataset) {
  const getCol = (colName: string) => {
    const idx = dataset.columns.indexOf(colName);
    if (idx === -1) throw new Error(`Column '${colName}' not found in dataset.`);
    return dataset.rows.map((r) => r[idx]);
  };

  const getMean = (colName: string) => {
    const vals = getCol(colName).filter((v) => typeof v === 'number') as number[];
    if (vals.length === 0) return 0;
    const sum = vals.reduce((a, b) => a + b, 0);
    return Number((sum / vals.length).toFixed(2));
  };

  const getMedian = (colName: string) => {
    const vals = (getCol(colName).filter((v) => typeof v === 'number') as number[]).sort(
      (a, b) => a - b
    );
    if (vals.length === 0) return 0;
    const mid = Math.floor(vals.length / 2);
    return vals.length % 2 !== 0
      ? (vals[mid] as number)
      : Number((((vals[mid - 1] as number) + (vals[mid] as number)) / 2).toFixed(2));
  };

  const getStd = (colName: string) => {
    const vals = getCol(colName).filter((v) => typeof v === 'number') as number[];
    if (vals.length <= 1) return 0;
    const mean = vals.reduce((a, b) => a + b, 0) / vals.length;
    const variance =
      vals.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / (vals.length - 1);
    return Number(Math.sqrt(variance).toFixed(2));
  };

  const getSum = (colName: string) => {
    const vals = getCol(colName).filter((v) => typeof v === 'number') as number[];
    return Number(vals.reduce((a, b) => a + b, 0).toFixed(2));
  };

  const getMin = (colName: string) => {
    const vals = getCol(colName).filter((v) => typeof v === 'number') as number[];
    if (vals.length === 0) return 0;
    return Math.min(...vals);
  };

  const getMax = (colName: string) => {
    const vals = getCol(colName).filter((v) => typeof v === 'number') as number[];
    if (vals.length === 0) return 0;
    return Math.max(...vals);
  };

  const getMode = (colName: string) => {
    const vals = getCol(colName);
    const freq: Record<string, number> = {};
    let maxCount = 0;
    let modeVal: any = null;
    vals.forEach((v) => {
      const key = String(v);
      freq[key] = (freq[key] || 0) + 1;
      if (freq[key] > maxCount) {
        maxCount = freq[key];
        modeVal = v;
      }
    });
    return modeVal;
  };

  const sortRows = (colName: string, ascending = true) => {
    const idx = dataset.columns.indexOf(colName);
    if (idx === -1) throw new Error(`Column '${colName}' not found in dataset.`);
    const sorted = [...dataset.rows].sort((a, b) => {
      const valA = a[idx];
      const valB = b[idx];
      if (typeof valA === 'number' && typeof valB === 'number') {
        return ascending ? valA - valB : valB - valA;
      }
      return ascending
        ? String(valA).localeCompare(String(valB))
        : String(valB).localeCompare(String(valA));
    });
    return sorted;
  };

  const dropNullRows = () => {
    return dataset.rows.filter((row) =>
      row.every((cell) => cell !== null && cell !== undefined && cell !== '')
    );
  };

  const filterRows = (predicate: (row: Record<string, any>) => boolean) => {
    const filteredRows = dataset.rows.filter((r) => {
      const rowObj: Record<string, any> = {};
      dataset.columns.forEach((col, i) => {
        rowObj[col] = r[i];
      });
      return predicate(rowObj);
    });
    return filteredRows;
  };

  const groupByCat = (
    catCol: string,
    numCol: string,
    op: 'mean' | 'sum' | 'count' = 'mean'
  ) => {
    const catIdx = dataset.columns.indexOf(catCol);
    const numIdx = dataset.columns.indexOf(numCol);
    if (catIdx === -1) throw new Error(`Category column '${catCol}' not found.`);
    if (numIdx === -1) throw new Error(`Numeric column '${numCol}' not found.`);
    const groups: Record<string, number[]> = {};
    dataset.rows.forEach((r) => {
      const cat = String(r[catIdx]);
      const val = r[numIdx];
      if (!groups[cat]) groups[cat] = [];
      if (typeof val === 'number') groups[cat].push(val);
    });
    const result: Record<string, number> = {};
    Object.entries(groups).forEach(([cat, vals]) => {
      if (op === 'count') {
        result[cat] = vals.length;
      } else if (op === 'sum') {
        result[cat] = Number(vals.reduce((a, b) => a + b, 0).toFixed(2));
      } else {
        const avg = vals.length > 0 ? vals.reduce((a, b) => a + b, 0) / vals.length : 0;
        result[cat] = Number(avg.toFixed(2));
      }
    });
    return result;
  };

  const calcCorr = (col1: string, col2: string) => {
    const idx1 = dataset.columns.indexOf(col1);
    const idx2 = dataset.columns.indexOf(col2);
    if (idx1 === -1 || idx2 === -1) throw new Error('Column not found for correlation.');
    const pairs = dataset.rows
      .map((r) => [r[idx1], r[idx2]])
      .filter((p) => typeof p[0] === 'number' && typeof p[1] === 'number') as [number, number][];
    const n = pairs.length;
    if (n <= 1) return 0;
    const x = pairs.map((p) => p[0]);
    const y = pairs.map((p) => p[1]);
    const sumX = x.reduce((a, b) => a + b, 0);
    const sumY = y.reduce((a, b) => a + b, 0);
    const sumXY = pairs.reduce((acc, p) => acc + p[0] * p[1], 0);
    const sumX2 = x.reduce((acc, v) => acc + v * v, 0);
    const sumY2 = y.reduce((acc, v) => acc + v * v, 0);
    const numerator = n * sumXY - sumX * sumY;
    const denominator = Math.sqrt((n * sumX2 - sumX * sumX) * (n * sumY2 - sumY * sumY));
    if (denominator === 0) return 0;
    return Number((numerator / denominator).toFixed(3));
  };

  const describeSummary = () => {
    const numericCols = dataset.columns.filter((c) => {
      const vals = getCol(c);
      return vals.some((v) => typeof v === 'number');
    });
    const summary = numericCols.map((c) => {
      return `Feature: ${c} | Mean: ${getMean(c)} | Median: ${getMedian(c)} | Std: ${getStd(c)}`;
    });
    return summary.join('\n');
  };

  return {
    columns: dataset.columns,
    rows: dataset.rows,
    head: (n = 5) => dataset.rows.slice(0, n),
    count: () => dataset.rows.length,
    col: getCol,
    mean: getMean,
    median: getMedian,
    std: getStd,
    sum: getSum,
    min: getMin,
    max: getMax,
    mode: getMode,
    sort: sortRows,
    dropNull: dropNullRows,
    filter: filterRows,
    groupBy: groupByCat,
    corr: calcCorr,
    describe: describeSummary,
  };
}

/**
 * Executes Data Science code in a sandboxed, client-side browser context.
 * Provides DataFrame tabular helpers, statistical functions, and real-time chart plotters.
 */
export async function executeDataScienceCode(
  code: string,
  dataset?: DataScienceDataset
): Promise<DataScienceExecutionResult> {
  const startTime = performance.now();
  const outputBuffer: string[] = [];
  let capturedChart: DataScienceChartData | undefined;
  let capturedTable: { columns: string[]; rows: (string | number)[][] } | undefined;

  const df = dataset ? createDataFrame(dataset) : null;

  // Custom Plotting Engine
  const plot = {
    bar: (labels: string[], values: number[], title = 'Bar Chart') => {
      capturedChart = {
        type: 'bar',
        title,
        labels,
        values,
      };
    },
    scatter: (points: { x: number; y: number; label?: string }[], title = 'Scatter Plot') => {
      capturedChart = {
        type: 'scatter',
        title,
        points,
      };
    },
    line: (labels: string[], values: number[], title = 'Line Chart') => {
      capturedChart = {
        type: 'line',
        title,
        labels,
        values,
      };
    },
    table: (columns: string[], rows: (string | number)[][]) => {
      capturedTable = { columns, rows };
    },
  };

  const mockConsole = {
    log: (...args: any[]) => {
      const line = args
        .map((a) => {
          if (typeof a === 'object' && a !== null) {
            try {
              return JSON.stringify(a);
            } catch {
              return String(a);
            }
          }
          return String(a);
        })
        .join(' ');
      outputBuffer.push(line);
    },
    table: (data: any) => {
      outputBuffer.push(JSON.stringify(data, null, 2));
    },
  };

  try {
    const wrappedFunction = new Function(
      'console',
      'df',
      'plot',
      'dataset',
      `return (async () => {
        ${code}
      })();`
    );

    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Execution timed out.')), 1500)
    );

    await Promise.race([wrappedFunction(mockConsole, df, plot, dataset), timeoutPromise]);

    const endTime = performance.now();
    return {
      output: outputBuffer.join('\n'),
      chart: capturedChart,
      table: capturedTable,
      executionTimeMs: Math.round(endTime - startTime),
    };
  } catch (err: any) {
    const endTime = performance.now();
    return {
      output: outputBuffer.join('\n'),
      error: err?.message || String(err),
      executionTimeMs: Math.round(endTime - startTime),
    };
  }
}
