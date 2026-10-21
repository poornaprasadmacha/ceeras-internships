import { PandasTableData } from '../types/pandasLesson';

export interface PandasExecutionResult {
  output: string;
  error?: string;
  table?: PandasTableData;
  executionTimeMs: number;
}

/**
 * Determine primitive dtype
 */
function inferDtype(vals: any[]): string {
  const nonNulls = vals.filter((v) => v !== null && v !== undefined && v !== '');
  if (nonNulls.length === 0) return 'object';
  if (nonNulls.every((v) => typeof v === 'boolean')) return 'bool';
  if (nonNulls.every((v) => typeof v === 'number' && Number.isInteger(v))) return 'int64';
  if (nonNulls.every((v) => typeof v === 'number')) return 'float64';
  if (
    nonNulls.every(
      (v) =>
        typeof v === 'string' &&
        /^\d{4}-\d{2}-\d{2}/.test(v) &&
        !isNaN(Date.parse(v))
    )
  ) {
    return 'datetime64';
  }
  return 'object';
}

/**
 * Pandas Series: 1D labeled homogeneous array
 */
export class Series {
  name: string;
  index: (string | number)[];
  values: any[];
  dtype: string;

  constructor(
    data: any[] | Record<string | number, any>,
    options?: { index?: (string | number)[]; name?: string; dtype?: string }
  ) {
    this.name = options?.name || '';
    if (Array.isArray(data)) {
      this.values = [...data];
      this.index =
        options?.index && options.index.length === data.length
          ? [...options.index]
          : Array.from({ length: data.length }, (_, i) => i);
    } else if (typeof data === 'object' && data !== null) {
      this.index = Object.keys(data);
      this.values = Object.values(data);
    } else {
      this.values = [];
      this.index = [];
    }
    this.dtype = options?.dtype || inferDtype(this.values);
  }

  get length(): number {
    return this.values.length;
  }

  get shape(): [number] {
    return [this.values.length];
  }

  head(n = 5): Series {
    const sliceCount = Math.min(n, this.values.length);
    return new Series(this.values.slice(0, sliceCount), {
      index: this.index.slice(0, sliceCount),
      name: this.name,
      dtype: this.dtype,
    });
  }

  tail(n = 5): Series {
    const start = Math.max(0, this.values.length - n);
    return new Series(this.values.slice(start), {
      index: this.index.slice(start),
      name: this.name,
      dtype: this.dtype,
    });
  }

  sum(): number {
    const nums = this.values.filter((v) => typeof v === 'number') as number[];
    const res = nums.reduce((a, b) => a + b, 0);
    return Number(res.toFixed(4));
  }

  mean(): number {
    const nums = this.values.filter((v) => typeof v === 'number') as number[];
    if (nums.length === 0) return 0;
    return Number((this.sum() / nums.length).toFixed(4));
  }

  median(): number {
    const nums = (this.values.filter((v) => typeof v === 'number') as number[]).sort((a, b) => a - b);
    if (nums.length === 0) return 0;
    const mid = Math.floor(nums.length / 2);
    if (nums.length % 2 !== 0) return nums[mid];
    return Number(((nums[mid - 1] + nums[mid]) / 2).toFixed(4));
  }

  min(): any {
    const nums = this.values.filter((v) => v !== null && v !== undefined);
    if (nums.length === 0) return null;
    if (typeof nums[0] === 'number') return Math.min(...(nums as number[]));
    return [...nums].sort()[0];
  }

  max(): any {
    const nums = this.values.filter((v) => v !== null && v !== undefined);
    if (nums.length === 0) return null;
    if (typeof nums[0] === 'number') return Math.max(...(nums as number[]));
    return [...nums].sort().reverse()[0];
  }

  std(): number {
    const nums = this.values.filter((v) => typeof v === 'number') as number[];
    if (nums.length <= 1) return 0;
    const m = this.mean();
    const variance = nums.reduce((acc, v) => acc + Math.pow(v - m, 2), 0) / (nums.length - 1);
    return Number(Math.sqrt(variance).toFixed(4));
  }

  count(): number {
    return this.values.filter((v) => v !== null && v !== undefined && v !== '').length;
  }

  value_counts(normalize = false): Series {
    const freq: Record<string, number> = {};
    for (const v of this.values) {
      if (v === null || v === undefined) continue;
      const k = String(v);
      freq[k] = (freq[k] || 0) + 1;
    }
    const sortedEntries = Object.entries(freq).sort((a, b) => b[1] - a[1]);
    const total = this.count();
    const idx = sortedEntries.map(([k]) => k);
    const vals = sortedEntries.map(([, c]) =>
      normalize && total > 0 ? Number((c / total).toFixed(4)) : c
    );
    return new Series(vals, { index: idx, name: this.name, dtype: normalize ? 'float64' : 'int64' });
  }

  unique(): any[] {
    const seen = new Set();
    const out: any[] = [];
    for (const v of this.values) {
      if (!seen.has(v)) {
        seen.add(v);
        out.push(v);
      }
    }
    return out;
  }

  nunique(): number {
    return this.unique().filter((v) => v !== null && v !== undefined).length;
  }

  isna(): Series {
    const bools = this.values.map((v) => v === null || v === undefined || Number.isNaN(v));
    return new Series(bools, { index: this.index, name: this.name, dtype: 'bool' });
  }

  isnull(): Series {
    return this.isna();
  }

  notna(): Series {
    const bools = this.values.map((v) => !(v === null || v === undefined || Number.isNaN(v)));
    return new Series(bools, { index: this.index, name: this.name, dtype: 'bool' });
  }

  dropna(): Series {
    const filteredVals: any[] = [];
    const filteredIdx: (string | number)[] = [];
    for (let i = 0; i < this.values.length; i++) {
      const v = this.values[i];
      if (v !== null && v !== undefined && !Number.isNaN(v)) {
        filteredVals.push(v);
        filteredIdx.push(this.index[i]);
      }
    }
    return new Series(filteredVals, { index: filteredIdx, name: this.name, dtype: this.dtype });
  }

  fillna(val: any): Series {
    const filled = this.values.map((v) =>
      v === null || v === undefined || Number.isNaN(v) ? val : v
    );
    return new Series(filled, { index: this.index, name: this.name, dtype: inferDtype(filled) });
  }

  map(fnOrDict: ((val: any) => any) | Record<string, any>): Series {
    const mapped = this.values.map((v) => {
      if (typeof fnOrDict === 'function') return fnOrDict(v);
      if (typeof fnOrDict === 'object' && fnOrDict !== null) {
        return fnOrDict[String(v)] !== undefined ? fnOrDict[String(v)] : v;
      }
      return v;
    });
    return new Series(mapped, { index: this.index, name: this.name, dtype: inferDtype(mapped) });
  }

  apply(fn: (val: any) => any): Series {
    return this.map(fn);
  }

  astype(type: 'int' | 'float' | 'str' | 'bool'): Series {
    const casted = this.values.map((v) => {
      if (v === null || v === undefined) return null;
      if (type === 'int') return Math.round(Number(v));
      if (type === 'float') return Number(v);
      if (type === 'str') return String(v);
      if (type === 'bool') return Boolean(v);
      return v;
    });
    const dtypeMap = { int: 'int64', float: 'float64', str: 'object', bool: 'bool' };
    return new Series(casted, { index: this.index, name: this.name, dtype: dtypeMap[type] });
  }

  sort_values(ascending = true): Series {
    const paired = this.values.map((v, i) => ({ val: v, idx: this.index[i] }));
    paired.sort((a, b) => {
      if (a.val === b.val) return 0;
      if (a.val === null || a.val === undefined) return 1;
      if (b.val === null || b.val === undefined) return -1;
      if (typeof a.val === 'number' && typeof b.val === 'number') {
        return ascending ? a.val - b.val : b.val - a.val;
      }
      return ascending
        ? String(a.val).localeCompare(String(b.val))
        : String(b.val).localeCompare(String(a.val));
    });
    return new Series(
      paired.map((p) => p.val),
      { index: paired.map((p) => p.idx), name: this.name, dtype: this.dtype }
    );
  }

  // Vectorized string operations
  get str() {
    return {
      lower: (): Series => this.map((v) => (typeof v === 'string' ? v.toLowerCase() : v)),
      upper: (): Series => this.map((v) => (typeof v === 'string' ? v.toUpperCase() : v)),
      strip: (): Series => this.map((v) => (typeof v === 'string' ? v.trim() : v)),
      contains: (sub: string): Series =>
        this.map((v) => (typeof v === 'string' ? v.toLowerCase().includes(sub.toLowerCase()) : false)),
      replace: (pat: string | RegExp, repl: string): Series =>
        this.map((v) => (typeof v === 'string' ? v.replace(pat, repl) : v)),
      len: (): Series => this.map((v) => (typeof v === 'string' ? v.length : 0)),
      split: (pat = ' ', n = 0): Series =>
        this.map((v) => {
          if (typeof v !== 'string') return v;
          const parts = v.split(pat);
          return parts[n] !== undefined ? parts[n] : parts;
        }),
    };
  }

  // Vectorized datetime operations
  get dt() {
    return {
      year: (): Series =>
        this.map((v) => {
          const d = new Date(v);
          return isNaN(d.getTime()) ? null : d.getFullYear();
        }),
      month: (): Series =>
        this.map((v) => {
          const d = new Date(v);
          return isNaN(d.getTime()) ? null : d.getMonth() + 1;
        }),
      day: (): Series =>
        this.map((v) => {
          const d = new Date(v);
          return isNaN(d.getTime()) ? null : d.getDate();
        }),
      day_name: (): Series =>
        this.map((v) => {
          const d = new Date(v);
          if (isNaN(d.getTime())) return null;
          return ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][
            d.getDay()
          ];
        }),
      month_name: (): Series =>
        this.map((v) => {
          const d = new Date(v);
          if (isNaN(d.getTime())) return null;
          return [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
          ][d.getMonth()];
        }),
      quarter: (): Series =>
        this.map((v) => {
          const d = new Date(v);
          if (isNaN(d.getTime())) return null;
          return Math.floor(d.getMonth() / 3) + 1;
        }),
    };
  }

  tolist(): any[] {
    return [...this.values];
  }

  to_dict(): Record<string | number, any> {
    const res: Record<string | number, any> = {};
    for (let i = 0; i < this.values.length; i++) {
      res[this.index[i]] = this.values[i];
    }
    return res;
  }

  toString(): string {
    const maxRows = 10;
    const showHead = this.values.slice(0, maxRows);
    const rows = showHead.map((v, i) => `${String(this.index[i]).padEnd(6)} ${v}`);
    if (this.values.length > maxRows) {
      rows.push(`... (${this.values.length - maxRows} more rows)`);
    }
    rows.push(`Name: ${this.name || 'None'}, dtype: ${this.dtype}`);
    return rows.join('\n');
  }

  toTableData(): PandasTableData {
    return {
      columns: [this.name || '0'],
      index: this.index,
      data: this.values.map((v) => [v]),
      dtypes: { [this.name || '0']: this.dtype },
      shape: [this.values.length, 1],
      title: `Series: ${this.name || 'unnamed'}`,
    };
  }
}

/**
 * Pandas DataFrame: 2D labeled tabular data structure
 */
export class DataFrame {
  columns: string[];
  index: (string | number)[];
  data: any[][];
  dtypes: Record<string, string>;

  constructor(
    data?: any[][] | Record<string, any[]> | Record<string, any>[],
    options?: { columns?: string[]; index?: (string | number)[] }
  ) {
    if (!data) {
      this.columns = options?.columns || [];
      this.index = options?.index || [];
      this.data = [];
      this.dtypes = {};
      return;
    }

    // Case 1: Dictionary of arrays/Series: { col1: [1,2], col2: ['a','b'] }
    if (!Array.isArray(data) && typeof data === 'object' && data !== null) {
      const dictData = data as Record<string, any>;
      this.columns = options?.columns || Object.keys(dictData);
      const colLengths = this.columns.map((col) => {
        const val = dictData[col];
        if (Array.isArray(val)) return val.length;
        if (val && typeof val === 'object' && 'values' in val && Array.isArray((val as any).values)) {
          return (val as any).values.length;
        }
        return 0;
      });
      const rowCount = Math.max(0, ...colLengths);
      this.index =
        options?.index && options.index.length === rowCount
          ? [...options.index]
          : Array.from({ length: rowCount }, (_, i) => i);
      this.data = Array.from({ length: rowCount }, (_, r) => {
        return this.columns.map((c) => {
          const colData = dictData[c];
          if (Array.isArray(colData)) return colData[r] !== undefined ? colData[r] : null;
          if (colData && typeof colData === 'object' && 'values' in colData && Array.isArray((colData as any).values)) {
            return (colData as any).values[r] !== undefined ? (colData as any).values[r] : null;
          }
          return null;
        });
      });
    }
    // Case 2: Array of objects (records): [{ a: 1, b: 2 }, { a: 3, b: 4 }]
    else if (Array.isArray(data) && data.length > 0 && !Array.isArray(data[0]) && typeof data[0] === 'object') {
      const recordData = data as Record<string, any>[];
      const keys = options?.columns || Array.from(new Set(recordData.flatMap((obj) => Object.keys(obj))));
      this.columns = keys;
      this.index =
        options?.index && options.index.length === recordData.length
          ? [...options.index]
          : Array.from({ length: recordData.length }, (_, i) => i);
      this.data = recordData.map((rowObj) => keys.map((k) => (rowObj[k] !== undefined ? rowObj[k] : null)));
    }
    // Case 3: 2D matrix of values: [[1, 2], [3, 4]]
    else if (Array.isArray(data)) {
      this.data = data.map((row) => (Array.isArray(row) ? [...row] : [row]));
      const colCount = this.data.length > 0 ? this.data[0].length : 0;
      this.columns =
        options?.columns && options.columns.length === colCount
          ? [...options.columns]
          : Array.from({ length: colCount }, (_, i) => String(i));
      this.index =
        options?.index && options.index.length === this.data.length
          ? [...options.index]
          : Array.from({ length: this.data.length }, (_, i) => i);
    } else {
      this.columns = [];
      this.index = [];
      this.data = [];
    }

    // Compute column dtypes
    this.dtypes = {};
    for (let c = 0; c < this.columns.length; c++) {
      const colName = this.columns[c];
      const colVals = this.data.map((r) => r[c]);
      this.dtypes[colName] = inferDtype(colVals);
    }
  }

  get shape(): [number, number] {
    return [this.data.length, this.columns.length];
  }

  get length(): number {
    return this.data.length;
  }

  head(n = 5): DataFrame {
    const sliceCount = Math.min(n, this.data.length);
    return new DataFrame(this.data.slice(0, sliceCount), {
      columns: [...this.columns],
      index: this.index.slice(0, sliceCount),
    });
  }

  tail(n = 5): DataFrame {
    const start = Math.max(0, this.data.length - n);
    return new DataFrame(this.data.slice(start), {
      columns: [...this.columns],
      index: this.index.slice(start),
    });
  }

  /**
   * Column accessor: df.get('col') -> Series, df.get(['col1', 'col2']) -> DataFrame
   */
  get(colOrCols: string | string[]): Series | DataFrame {
    if (typeof colOrCols === 'string') {
      const colIdx = this.columns.indexOf(colOrCols);
      if (colIdx === -1) throw new Error(`Column '${colOrCols}' not found in DataFrame.`);
      const vals = this.data.map((r) => r[colIdx]);
      return new Series(vals, {
        index: this.index,
        name: colOrCols,
        dtype: this.dtypes[colOrCols],
      });
    }
    if (Array.isArray(colOrCols)) {
      const indices = colOrCols.map((c) => {
        const idx = this.columns.indexOf(c);
        if (idx === -1) throw new Error(`Column '${c}' not found in DataFrame.`);
        return idx;
      });
      const subData = this.data.map((r) => indices.map((i) => r[i]));
      return new DataFrame(subData, {
        columns: colOrCols,
        index: this.index,
      });
    }
    throw new Error('Invalid argument to get(): provide string or string array');
  }

  /**
   * Integer position-based indexing: df.iloc(rowRange, colRange)
   */
  iloc(rowSlice?: number | [number, number], colSlice?: number | [number, number]): DataFrame | Series {
    let rows: number[] = [];
    if (rowSlice === undefined) {
      rows = Array.from({ length: this.data.length }, (_, i) => i);
    } else if (typeof rowSlice === 'number') {
      rows = [rowSlice < 0 ? this.data.length + rowSlice : rowSlice];
    } else if (Array.isArray(rowSlice)) {
      const [start, end] = rowSlice;
      for (let i = start; i < end; i++) rows.push(i);
    }

    let cols: number[] = [];
    if (colSlice === undefined) {
      cols = Array.from({ length: this.columns.length }, (_, i) => i);
    } else if (typeof colSlice === 'number') {
      cols = [colSlice < 0 ? this.columns.length + colSlice : colSlice];
    } else if (Array.isArray(colSlice)) {
      const [start, end] = colSlice;
      for (let i = start; i < end; i++) cols.push(i);
    }

    const subData = rows.map((r) => cols.map((c) => this.data[r][c]));
    const subCols = cols.map((c) => this.columns[c]);
    const subIdx = rows.map((r) => this.index[r]);

    if (cols.length === 1 && typeof colSlice === 'number') {
      const vals = subData.map((r) => r[0]);
      return new Series(vals, { index: subIdx, name: subCols[0] });
    }

    return new DataFrame(subData, { columns: subCols, index: subIdx });
  }

  /**
   * Label-based indexing: df.loc(rowSelector, colSelector)
   */
  loc(rowSelector?: any, colSelector?: string | string[]): DataFrame | Series {
    let rowIndices: number[] = [];
    if (rowSelector === undefined) {
      rowIndices = Array.from({ length: this.data.length }, (_, i) => i);
    } else if (typeof rowSelector === 'function') {
      rowIndices = this.data
        .map((_, i) => i)
        .filter((i) => rowSelector(this.getRowAsDict(i), this.index[i]));
    } else if (rowSelector instanceof Series && rowSelector.dtype === 'bool') {
      rowIndices = rowSelector.values
        .map((v, i) => (v ? i : -1))
        .filter((i) => i !== -1);
    } else if (Array.isArray(rowSelector)) {
      rowIndices = rowSelector
        .map((lbl) => this.index.indexOf(lbl))
        .filter((idx) => idx !== -1);
    } else {
      const idx = this.index.indexOf(rowSelector);
      if (idx !== -1) rowIndices = [idx];
    }

    let targetCols: string[] = [];
    if (colSelector === undefined) {
      targetCols = [...this.columns];
    } else if (typeof colSelector === 'string') {
      targetCols = [colSelector];
    } else if (Array.isArray(colSelector)) {
      targetCols = colSelector;
    }

    const colIndices = targetCols.map((c) => {
      const idx = this.columns.indexOf(c);
      if (idx === -1) throw new Error(`Column '${c}' not found`);
      return idx;
    });

    const subData = rowIndices.map((r) => colIndices.map((c) => this.data[r][c]));
    const subIdx = rowIndices.map((r) => this.index[r]);

    if (typeof colSelector === 'string') {
      return new Series(
        subData.map((r) => r[0]),
        { index: subIdx, name: colSelector }
      );
    }

    return new DataFrame(subData, { columns: targetCols, index: subIdx });
  }

  private getRowAsDict(rowIdx: number): Record<string, any> {
    const obj: Record<string, any> = {};
    for (let c = 0; c < this.columns.length; c++) {
      obj[this.columns[c]] = this.data[rowIdx][c];
    }
    return obj;
  }

  /**
   * Filter / boolean masking: df.filter((row) => row.age > 25)
   */
  filter(predicate: (row: Record<string, any>, idx: number) => boolean): DataFrame {
    const passedIndices: number[] = [];
    for (let r = 0; r < this.data.length; r++) {
      const rowDict = this.getRowAsDict(r);
      if (predicate(rowDict, r)) {
        passedIndices.push(r);
      }
    }
    const filteredData = passedIndices.map((r) => [...this.data[r]]);
    const filteredIdx = passedIndices.map((r) => this.index[r]);
    return new DataFrame(filteredData, { columns: [...this.columns], index: filteredIdx });
  }

  /**
   * Query syntax evaluation: df.query("salary > 50000 and department == 'Tech'")
   */
  query(expr: string): DataFrame {
    return this.filter((row) => {
      try {
        // Create a safe evaluation scope replacing column references
        let parsed = expr;
        for (const col of this.columns) {
          const val = row[col];
          const valStr = typeof val === 'string' ? `'${val}'` : val === null ? 'null' : String(val);
          const regex = new RegExp(`\\b${col}\\b`, 'g');
          parsed = parsed.replace(regex, valStr);
        }
        parsed = parsed
          .replace(/\band\b/g, '&&')
          .replace(/\bor\b/g, '||')
          .replace(/\bnot\b/g, '!');
        return Boolean(Function(`"use strict"; return (${parsed});`)());
      } catch {
        return false;
      }
    });
  }

  /**
   * Add or assign a new column
   */
  assign(newColumns: Record<string, any[] | Series | ((df: DataFrame) => any[])>): DataFrame {
    const copyData = this.data.map((r) => [...r]);
    const copyCols = [...this.columns];

    for (const [colName, valOrFn] of Object.entries(newColumns)) {
      let vals: any[] = [];
      if (typeof valOrFn === 'function') {
        vals = valOrFn(this);
      } else if (valOrFn instanceof Series) {
        vals = valOrFn.values;
      } else if (Array.isArray(valOrFn)) {
        vals = valOrFn;
      } else {
        vals = new Array(this.data.length).fill(valOrFn);
      }

      const existingColIdx = copyCols.indexOf(colName);
      if (existingColIdx !== -1) {
        // Replace
        for (let r = 0; r < copyData.length; r++) {
          copyData[r][existingColIdx] = vals[r] !== undefined ? vals[r] : null;
        }
      } else {
        // Append
        copyCols.push(colName);
        for (let r = 0; r < copyData.length; r++) {
          copyData[r].push(vals[r] !== undefined ? vals[r] : null);
        }
      }
    }

    return new DataFrame(copyData, { columns: copyCols, index: [...this.index] });
  }

  /**
   * Drop columns or rows
   */
  drop(options: { columns?: string[]; index?: (string | number)[] }): DataFrame {
    let targetCols = [...this.columns];
    let targetIndices = [...this.index];
    let currentData = this.data.map((r) => [...r]);

    if (options.columns) {
      const dropColSet = new Set(options.columns);
      const keepColIndices = this.columns
        .map((c, i) => (dropColSet.has(c) ? -1 : i))
        .filter((i) => i !== -1);
      targetCols = keepColIndices.map((i) => this.columns[i]);
      currentData = currentData.map((row) => keepColIndices.map((i) => row[i]));
    }

    if (options.index) {
      const dropIdxSet = new Set(options.index);
      const keepRowIndices = this.index
        .map((idx, i) => (dropIdxSet.has(idx) ? -1 : i))
        .filter((i) => i !== -1);
      targetIndices = keepRowIndices.map((i) => this.index[i]);
      currentData = keepRowIndices.map((i) => currentData[i]);
    }

    return new DataFrame(currentData, { columns: targetCols, index: targetIndices });
  }

  /**
   * Rename columns or indices
   */
  rename(options: {
    columns?: Record<string, string>;
    index?: Record<string | number, string | number>;
  }): DataFrame {
    const newCols = this.columns.map((c) =>
      options.columns && options.columns[c] ? options.columns[c] : c
    );
    const newIdx = this.index.map((i) =>
      options.index && options.index[i] !== undefined ? options.index[i] : i
    );
    return new DataFrame(this.data, { columns: newCols, index: newIdx });
  }

  /**
   * Set one column as DataFrame index
   */
  set_index(colName: string, drop = true): DataFrame {
    const colIdx = this.columns.indexOf(colName);
    if (colIdx === -1) throw new Error(`Column '${colName}' not found`);
    const newIdx = this.data.map((r) => r[colIdx]);
    let targetCols = [...this.columns];
    let targetData = this.data.map((r) => [...r]);

    if (drop) {
      targetCols = targetCols.filter((c) => c !== colName);
      targetData = targetData.map((r) => r.filter((_, i) => i !== colIdx));
    }

    return new DataFrame(targetData, { columns: targetCols, index: newIdx });
  }

  /**
   * Reset index back to 0, 1, 2...
   */
  reset_index(drop = false): DataFrame {
    let targetCols = [...this.columns];
    let targetData = this.data.map((r) => [...r]);

    if (!drop) {
      targetCols = ['index', ...this.columns];
      targetData = targetData.map((r, i) => [this.index[i], ...r]);
    }

    const newIdx = Array.from({ length: this.data.length }, (_, i) => i);
    return new DataFrame(targetData, { columns: targetCols, index: newIdx });
  }

  /**
   * Missing value detection
   */
  isna(): DataFrame {
    const nulls = this.data.map((r) =>
      r.map((v) => v === null || v === undefined || Number.isNaN(v))
    );
    return new DataFrame(nulls, { columns: [...this.columns], index: [...this.index] });
  }

  isnull(): DataFrame {
    return this.isna();
  }

  /**
   * Drop missing rows
   */
  dropna(options?: { subset?: string[]; how?: 'any' | 'all' }): DataFrame {
    const how = options?.how || 'any';
    const subsetCols = options?.subset || this.columns;
    const subsetIndices = subsetCols.map((c) => this.columns.indexOf(c)).filter((i) => i !== -1);

    const keptIndices: number[] = [];
    for (let r = 0; r < this.data.length; r++) {
      const row = this.data[r];
      const checkVals = subsetIndices.map((i) => row[i]);
      const nullCount = checkVals.filter(
        (v) => v === null || v === undefined || Number.isNaN(v) || v === ''
      ).length;

      const isDropped =
        how === 'any' ? nullCount > 0 : nullCount === checkVals.length;
      if (!isDropped) {
        keptIndices.push(r);
      }
    }

    const nextData = keptIndices.map((i) => [...this.data[i]]);
    const nextIdx = keptIndices.map((i) => this.index[i]);
    return new DataFrame(nextData, { columns: [...this.columns], index: nextIdx });
  }

  /**
   * Impute / fill missing values
   */
  fillna(val: any | Record<string, any>): DataFrame {
    const nextData = this.data.map((r) => [...r]);
    for (let c = 0; c < this.columns.length; c++) {
      const colName = this.columns[c];
      const replacement =
        typeof val === 'object' && val !== null && val[colName] !== undefined
          ? val[colName]
          : val;
      for (let r = 0; r < nextData.length; r++) {
        const v = nextData[r][c];
        if (v === null || v === undefined || Number.isNaN(v) || v === '') {
          nextData[r][c] = replacement;
        }
      }
    }
    return new DataFrame(nextData, { columns: [...this.columns], index: [...this.index] });
  }

  /**
   * Sort by column
   */
  sort_values(by: string | string[], ascending: boolean | boolean[] = true): DataFrame {
    const byCols = Array.isArray(by) ? by : [by];
    const ascList = Array.isArray(ascending)
      ? ascending
      : new Array(byCols.length).fill(ascending);

    const indices = byCols.map((c) => {
      const idx = this.columns.indexOf(c);
      if (idx === -1) throw new Error(`Column '${c}' not found for sorting`);
      return idx;
    });

    const paired = this.data.map((row, i) => ({ row, idx: this.index[i] }));
    paired.sort((a, b) => {
      for (let k = 0; k < indices.length; k++) {
        const colIdx = indices[k];
        const isAsc = ascList[k] !== undefined ? ascList[k] : true;
        const vA = a.row[colIdx];
        const vB = b.row[colIdx];

        if (vA === vB) continue;
        if (vA === null || vA === undefined) return 1;
        if (vB === null || vB === undefined) return -1;

        if (typeof vA === 'number' && typeof vB === 'number') {
          return isAsc ? vA - vB : vB - vA;
        }
        return isAsc
          ? String(vA).localeCompare(String(vB))
          : String(vB).localeCompare(String(vA));
      }
      return 0;
    });

    return new DataFrame(
      paired.map((p) => p.row),
      { columns: [...this.columns], index: paired.map((p) => p.idx) }
    );
  }

  /**
   * GroupBy operator
   */
  groupby(by: string | string[]): GroupBy {
    return new GroupBy(this, by);
  }

  /**
   * Pivot Table
   */
  pivot_table(options: {
    index: string;
    columns: string;
    values: string;
    aggfunc?: 'mean' | 'sum' | 'count';
  }): DataFrame {
    const { index, columns, values, aggfunc = 'mean' } = options;
    const idxCol = this.columns.indexOf(index);
    const colCol = this.columns.indexOf(columns);
    const valCol = this.columns.indexOf(values);

    if (idxCol === -1 || colCol === -1 || valCol === -1) {
      throw new Error('pivot_table columns not found in DataFrame');
    }

    const uniqueRows = Array.from(new Set(this.data.map((r) => r[idxCol]))).sort();
    const uniqueCols = Array.from(new Set(this.data.map((r) => r[colCol]))).sort();

    const grid: Record<string, Record<string, number[]>> = {};
    for (const r of uniqueRows) {
      grid[String(r)] = {};
      for (const c of uniqueCols) {
        grid[String(r)][String(c)] = [];
      }
    }

    for (const row of this.data) {
      const rKey = String(row[idxCol]);
      const cKey = String(row[colCol]);
      const v = Number(row[valCol]);
      if (!isNaN(v) && grid[rKey] && grid[rKey][cKey]) {
        grid[rKey][cKey].push(v);
      }
    }

    const resultRows: any[][] = [];
    for (const rKey of uniqueRows) {
      const rowArr: any[] = [];
      for (const cKey of uniqueCols) {
        const bucket = grid[String(rKey)][String(cKey)];
        if (bucket.length === 0) {
          rowArr.push(null);
        } else if (aggfunc === 'sum') {
          rowArr.push(Number(bucket.reduce((a, b) => a + b, 0).toFixed(2)));
        } else if (aggfunc === 'count') {
          rowArr.push(bucket.length);
        } else {
          // mean
          const avg = bucket.reduce((a, b) => a + b, 0) / bucket.length;
          rowArr.push(Number(avg.toFixed(2)));
        }
      }
      resultRows.push(rowArr);
    }

    return new DataFrame(resultRows, {
      columns: uniqueCols.map(String),
      index: uniqueRows,
    });
  }

  /**
   * Reshape: Melt wide to long
   */
  melt(options: {
    id_vars: string[];
    value_vars?: string[];
    var_name?: string;
    value_name?: string;
  }): DataFrame {
    const idVars = options.id_vars;
    const valVars = options.value_vars || this.columns.filter((c) => !idVars.includes(c));
    const varName = options.var_name || 'variable';
    const valName = options.value_name || 'value';

    const meltedRows: any[][] = [];
    for (let r = 0; r < this.data.length; r++) {
      const idValues = idVars.map((col) => this.data[r][this.columns.indexOf(col)]);
      for (const vVar of valVars) {
        const vVal = this.data[r][this.columns.indexOf(vVar)];
        meltedRows.push([...idValues, vVar, vVal]);
      }
    }

    return new DataFrame(meltedRows, {
      columns: [...idVars, varName, valName],
      index: Array.from({ length: meltedRows.length }, (_, i) => i),
    });
  }

  /**
   * Summary descriptive statistics
   */
  describe(): DataFrame {
    const numericCols = this.columns.filter(
      (c) => this.dtypes[c] === 'int64' || this.dtypes[c] === 'float64'
    );
    if (numericCols.length === 0) {
      return new DataFrame([], { columns: [], index: [] });
    }

    const stats = ['count', 'mean', 'std', 'min', '25%', '50%', '75%', 'max'];
    const rows: any[][] = [];

    for (const stat of stats) {
      const row: any[] = [];
      for (const col of numericCols) {
        const s = this.get(col) as Series;
        const nums = (s.values.filter((v) => typeof v === 'number') as number[]).sort((a, b) => a - b);
        if (stat === 'count') row.push(s.count());
        else if (stat === 'mean') row.push(s.mean());
        else if (stat === 'std') row.push(s.std());
        else if (stat === 'min') row.push(s.min());
        else if (stat === 'max') row.push(s.max());
        else if (stat === '50%') row.push(s.median());
        else if (stat === '25%') {
          const idx = Math.floor(nums.length * 0.25);
          row.push(nums[idx] !== undefined ? nums[idx] : null);
        } else if (stat === '75%') {
          const idx = Math.floor(nums.length * 0.75);
          row.push(nums[idx] !== undefined ? nums[idx] : null);
        }
      }
      rows.push(row);
    }

    return new DataFrame(rows, { columns: numericCols, index: stats });
  }

  info(): string {
    const lines = [
      `<class 'pandas.core.frame.DataFrame'>`,
      `RangeIndex: ${this.data.length} entries, ${this.index[0] ?? 0} to ${this.index[this.index.length - 1] ?? 0}`,
      `Data columns (total ${this.columns.length} columns):`,
      ` #   Column          Non-Null Count  Dtype`,
      `---  ------          --------------  -----`,
    ];
    this.columns.forEach((col, idx) => {
      const s = this.get(col) as Series;
      const nonNull = s.count();
      const dtype = this.dtypes[col];
      lines.push(
        ` ${String(idx).padEnd(3)} ${col.padEnd(15)} ${String(nonNull).padEnd(5)} non-null   ${dtype}`
      );
    });
    return lines.join('\n');
  }

  to_dict(orient: 'records' | 'list' = 'records'): any {
    if (orient === 'list') {
      const res: Record<string, any[]> = {};
      for (let c = 0; c < this.columns.length; c++) {
        res[this.columns[c]] = this.data.map((r) => r[c]);
      }
      return res;
    }
    return this.data.map((row) => {
      const obj: Record<string, any> = {};
      this.columns.forEach((col, i) => {
        obj[col] = row[i];
      });
      return obj;
    });
  }

  to_csv(): string {
    const header = ['index', ...this.columns].join(',');
    const rows = this.data.map((r, i) => [this.index[i], ...r].join(','));
    return [header, ...rows].join('\n');
  }

  toString(): string {
    const maxRows = 10;
    const showHead = this.data.slice(0, maxRows);
    const colWidths = this.columns.map((c) => Math.max(c.length, 8));
    const header = 'idx   ' + this.columns.map((c, i) => c.padEnd(colWidths[i])).join('  ');
    const rows = showHead.map((r, i) => {
      const rowIdx = String(this.index[i]).padEnd(5);
      const cells = r.map((cell, ci) => String(cell ?? 'NaN').padEnd(colWidths[ci])).join('  ');
      return `${rowIdx} ${cells}`;
    });
    if (this.data.length > maxRows) {
      rows.push(`... [${this.data.length} rows x ${this.columns.length} columns]`);
    }
    return [header, ...rows].join('\n');
  }

  toTableData(title?: string): PandasTableData {
    return {
      columns: this.columns,
      index: this.index,
      data: this.data,
      dtypes: this.dtypes,
      shape: this.shape,
      title: title || `DataFrame (${this.shape[0]} rows × ${this.shape[1]} cols)`,
    };
  }
}

/**
 * GroupBy helper class
 */
export class GroupBy {
  private df: DataFrame;
  private byCols: string[];

  constructor(df: DataFrame, by: string | string[]) {
    this.df = df;
    this.byCols = Array.isArray(by) ? by : [by];
  }

  private groupBuckets(): Map<string, { groupKeys: any[]; rowIndices: number[] }> {
    const map = new Map<string, { groupKeys: any[]; rowIndices: number[] }>();
    const byIndices = this.byCols.map((c) => this.df.columns.indexOf(c));

    for (let r = 0; r < this.df.data.length; r++) {
      const keys = byIndices.map((i) => this.df.data[r][i]);
      const keyStr = keys.map(String).join(' | ');
      if (!map.has(keyStr)) {
        map.set(keyStr, { groupKeys: keys, rowIndices: [] });
      }
      map.get(keyStr)!.rowIndices.push(r);
    }
    return map;
  }

  mean(): DataFrame {
    return this.aggregateNumeric('mean');
  }

  sum(): DataFrame {
    return this.aggregateNumeric('sum');
  }

  count(): DataFrame {
    const groups = this.groupBuckets();
    const targetCols = this.df.columns.filter((c) => !this.byCols.includes(c));
    const resultRows: any[][] = [];
    const groupIndices: string[] = [];

    for (const [key, { groupKeys, rowIndices }] of groups.entries()) {
      groupIndices.push(key);
      const counts = targetCols.map(() => rowIndices.length);
      resultRows.push([...groupKeys, ...counts]);
    }

    return new DataFrame(resultRows, {
      columns: [...this.byCols, ...targetCols],
      index: groupIndices,
    });
  }

  agg(spec: Record<string, 'mean' | 'sum' | 'count' | 'min' | 'max' | string[]>): DataFrame {
    const groups = this.groupBuckets();
    const aggColumns: string[] = [];
    const aggTasks: { col: string; fn: string; outCol: string }[] = [];

    for (const [col, fns] of Object.entries(spec)) {
      const fnList = Array.isArray(fns) ? fns : [fns];
      for (const fn of fnList) {
        const outCol = `${col}_${fn}`;
        aggColumns.push(outCol);
        aggTasks.push({ col, fn, outCol });
      }
    }

    const resultRows: any[][] = [];
    const indexList: string[] = [];

    for (const [key, { groupKeys, rowIndices }] of groups.entries()) {
      indexList.push(key);
      const rowAggs: any[] = [];
      for (const task of aggTasks) {
        const colIdx = this.df.columns.indexOf(task.col);
        const vals = rowIndices
          .map((r) => this.df.data[r][colIdx])
          .filter((v) => typeof v === 'number') as number[];

        if (vals.length === 0) {
          rowAggs.push(null);
        } else if (task.fn === 'sum') {
          rowAggs.push(Number(vals.reduce((a, b) => a + b, 0).toFixed(2)));
        } else if (task.fn === 'mean') {
          rowAggs.push(Number((vals.reduce((a, b) => a + b, 0) / vals.length).toFixed(2)));
        } else if (task.fn === 'min') {
          rowAggs.push(Math.min(...vals));
        } else if (task.fn === 'max') {
          rowAggs.push(Math.max(...vals));
        } else if (task.fn === 'count') {
          rowAggs.push(vals.length);
        } else {
          rowAggs.push(vals.length);
        }
      }
      resultRows.push([...groupKeys, ...rowAggs]);
    }

    return new DataFrame(resultRows, {
      columns: [...this.byCols, ...aggColumns],
      index: indexList,
    });
  }

  private aggregateNumeric(op: 'mean' | 'sum'): DataFrame {
    const groups = this.groupBuckets();
    const numCols = this.df.columns.filter(
      (c) =>
        !this.byCols.includes(c) &&
        (this.df.dtypes[c] === 'int64' || this.df.dtypes[c] === 'float64')
    );

    const resultRows: any[][] = [];
    const indexList: string[] = [];

    for (const [key, { groupKeys, rowIndices }] of groups.entries()) {
      indexList.push(key);
      const aggVals = numCols.map((col) => {
        const cIdx = this.df.columns.indexOf(col);
        const nums = rowIndices
          .map((r) => this.df.data[r][cIdx])
          .filter((v) => typeof v === 'number') as number[];
        if (nums.length === 0) return 0;
        const total = nums.reduce((a, b) => a + b, 0);
        return op === 'sum' ? Number(total.toFixed(2)) : Number((total / nums.length).toFixed(2));
      });
      resultRows.push([...groupKeys, ...aggVals]);
    }

    return new DataFrame(resultRows, {
      columns: [...this.byCols, ...numCols],
      index: indexList,
    });
  }
}

/**
 * Built-in real world datasets for immediate practice
 */
export const PANDAS_DATASETS = {
  ecommerce: new DataFrame([
    [101, 'Cust-12', 'Electronics', 899.99, 1, '2025-01-15', 'Delivered'],
    [102, 'Cust-45', 'Furniture', 249.5, 2, '2025-01-16', 'Delivered'],
    [103, 'Cust-12', 'Electronics', 49.99, 3, '2025-01-18', 'Shipped'],
    [104, 'Cust-88', 'Apparel', 120.0, 4, '2025-01-20', 'Delivered'],
    [105, 'Cust-33', 'Electronics', 1299.0, 1, '2025-01-21', 'Cancelled'],
    [106, 'Cust-45', 'Apparel', 85.5, 2, '2025-01-22', 'Delivered'],
    [107, 'Cust-91', 'Furniture', 450.0, 1, '2025-01-24', 'Shipped'],
    [108, 'Cust-12', 'Office', 34.0, 5, '2025-01-25', 'Delivered'],
    [109, 'Cust-77', 'Electronics', 210.0, 2, '2025-01-27', 'Delivered'],
    [110, 'Cust-33', 'Office', 15.5, 10, '2025-01-28', 'Delivered'],
  ], {
    columns: ['order_id', 'customer_id', 'category', 'unit_price', 'quantity', 'order_date', 'status'],
  }),

  employees: new DataFrame([
    [1, 'Alice Smith', 'Engineering', 98000, 5, 4.8, 'San Francisco'],
    [2, 'Bob Jones', 'Marketing', 64000, 3, 4.2, 'New York'],
    [3, 'Charlie Brown', 'Engineering', 115000, 8, 4.9, 'Seattle'],
    [4, 'Diana Prince', 'Finance', 85000, 6, 4.5, 'Chicago'],
    [5, 'Evan Wright', 'Marketing', 72000, 4, 3.9, 'Austin'],
    [6, 'Fiona Gallagher', 'Engineering', 88000, 2, 4.6, 'San Francisco'],
    [7, 'George Clark', 'Finance', 92000, 7, 4.1, 'New York'],
    [8, 'Hannah Abbott', 'HR', 58000, 3, 4.3, 'Austin'],
    [9, 'Ian Malcolm', 'Engineering', 130000, 10, 4.9, 'Seattle'],
    [10, 'Julia Roberts', 'Finance', 79000, 4, 4.0, 'Chicago'],
  ], {
    columns: ['emp_id', 'name', 'department', 'salary', 'experience_years', 'performance_rating', 'office_city'],
  }),

  titanic: new DataFrame([
    [1, 0, 3, 'Braund, Mr. Owen Harris', 'male', 22.0, 7.25, 'S'],
    [2, 1, 1, 'Cumings, Mrs. John Bradley', 'female', 38.0, 71.28, 'C'],
    [3, 1, 3, 'Heikkinen, Miss. Laina', 'female', 26.0, 7.925, 'S'],
    [4, 1, 1, 'Futrelle, Mrs. Jacques Heath', 'female', 35.0, 53.1, 'S'],
    [5, 0, 3, 'Allen, Mr. William Henry', 'male', 35.0, 8.05, 'S'],
    [6, 0, 3, 'Moran, Mr. James', 'male', null, 8.4583, 'Q'],
    [7, 0, 1, 'McCarthy, Mr. Timothy J', 'male', 54.0, 51.8625, 'S'],
    [8, 0, 3, 'Palsson, Master. Gosta Leonard', 'male', 2.0, 21.075, 'S'],
    [9, 1, 3, 'Johnson, Mrs. Oscar W', 'female', 27.0, 11.1333, 'S'],
    [10, 1, 2, 'Nasser, Mrs. Nicholas', 'female', 14.0, 30.0708, 'C'],
  ], {
    columns: ['passenger_id', 'survived', 'pclass', 'name', 'sex', 'age', 'fare', 'embarked'],
  }),

  customers: new DataFrame([
    ['Cust-12', 'Sarah Connor', '2023-04-12', 'Platinum', 'USA'],
    ['Cust-33', 'James Bond', '2022-11-05', 'Gold', 'UK'],
    ['Cust-45', 'Tony Stark', '2021-08-19', 'Platinum', 'USA'],
    ['Cust-77', 'Bruce Wayne', '2024-02-01', 'Silver', 'USA'],
    ['Cust-88', 'Peter Parker', '2024-05-15', 'Bronze', 'USA'],
    ['Cust-91', 'Natasha Romanoff', '2023-09-30', 'Gold', 'Germany'],
  ], {
    columns: ['customer_id', 'customer_name', 'join_date', 'membership', 'country'],
  }),
};

/**
 * Global pd object simulating pandas namespace
 */
export const pd = {
  Series: (data: any, options?: any) => new Series(data, options),
  DataFrame: (data?: any, options?: any) => new DataFrame(data, options),

  read_csv: (csvTextOrName: string): DataFrame => {
    // If it references a built-in dataset
    if (PANDAS_DATASETS[csvTextOrName as keyof typeof PANDAS_DATASETS]) {
      return PANDAS_DATASETS[csvTextOrName as keyof typeof PANDAS_DATASETS];
    }
    // Parse raw CSV string
    const lines = csvTextOrName.trim().split('\n').filter((l) => l.trim().length > 0);
    if (lines.length === 0) return new DataFrame([], { columns: [] });
    const cols = lines[0].split(',').map((c) => c.trim().replace(/^["']|["']$/g, ''));
    const rows = lines.slice(1).map((line) => {
      return line.split(',').map((val) => {
        val = val.trim().replace(/^["']|["']$/g, '');
        if (val === '' || val === 'null' || val === 'NaN') return null;
        if (!isNaN(Number(val))) return Number(val);
        if (val.toLowerCase() === 'true') return true;
        if (val.toLowerCase() === 'false') return false;
        return val;
      });
    });
    return new DataFrame(rows, { columns: cols });
  },

  merge: (
    left: DataFrame,
    right: DataFrame,
    options: {
      on?: string;
      left_on?: string;
      right_on?: string;
      how?: 'inner' | 'left' | 'right' | 'outer';
    } = {}
  ): DataFrame => {
    const leftKey = options.on || options.left_on;
    const rightKey = options.on || options.right_on;
    const how = options.how || 'inner';

    if (!leftKey || !rightKey) throw new Error('merge requires on or left_on/right_on');
    const leftColIdx = left.columns.indexOf(leftKey);
    const rightColIdx = right.columns.indexOf(rightKey);

    if (leftColIdx === -1 || rightColIdx === -1) {
      throw new Error(`Merge key '${leftKey}' or '${rightKey}' not found in DataFrames`);
    }

    const rightColsToInclude = right.columns.filter((c) => c !== rightKey);
    const mergedCols = [...left.columns, ...rightColsToInclude];
    const mergedRows: any[][] = [];

    const rightLookup = new Map<string, any[][]>();
    for (const rRow of right.data) {
      const key = String(rRow[rightColIdx]);
      if (!rightLookup.has(key)) rightLookup.set(key, []);
      rightLookup.get(key)!.push(rRow);
    }

    for (const lRow of left.data) {
      const key = String(lRow[leftColIdx]);
      const matches = rightLookup.get(key);

      if (matches && matches.length > 0) {
        for (const m of matches) {
          const rightVals = rightColsToInclude.map((c) => m[right.columns.indexOf(c)]);
          mergedRows.push([...lRow, ...rightVals]);
        }
      } else if (how === 'left' || how === 'outer') {
        const nulls = new Array(rightColsToInclude.length).fill(null);
        mergedRows.push([...lRow, ...nulls]);
      }
    }

    return new DataFrame(mergedRows, { columns: mergedCols });
  },

  concat: (
    dfs: DataFrame[],
    options: { axis?: 0 | 1; ignore_index?: boolean } = {}
  ): DataFrame => {
    const axis = options.axis !== undefined ? options.axis : 0;
    if (dfs.length === 0) return new DataFrame();
    if (dfs.length === 1) return dfs[0];

    if (axis === 0) {
      // Row-wise concatenation
      const allCols = Array.from(new Set(dfs.flatMap((d) => d.columns)));
      const combinedRows: any[][] = [];
      const combinedIdx: (string | number)[] = [];

      for (const df of dfs) {
        for (let r = 0; r < df.data.length; r++) {
          const row = allCols.map((c) => {
            const cIdx = df.columns.indexOf(c);
            return cIdx !== -1 ? df.data[r][cIdx] : null;
          });
          combinedRows.push(row);
          if (!options.ignore_index) {
            combinedIdx.push(df.index[r]);
          }
        }
      }
      return new DataFrame(combinedRows, {
        columns: allCols,
        index: options.ignore_index ? undefined : combinedIdx,
      });
    } else {
      // Column-wise concatenation
      const maxRows = Math.max(...dfs.map((d) => d.data.length));
      const combinedCols = dfs.flatMap((d) => d.columns);
      const combinedRows: any[][] = Array.from({ length: maxRows }, (_, r) => {
        return dfs.flatMap((d) => (d.data[r] ? d.data[r] : new Array(d.columns.length).fill(null)));
      });
      return new DataFrame(combinedRows, { columns: combinedCols });
    }
  },

  crosstab: (indexSeries: Series, colSeries: Series): DataFrame => {
    const rows = Array.from(new Set(indexSeries.values)).sort();
    const cols = Array.from(new Set(colSeries.values)).sort();
    const counts: Record<string, Record<string, number>> = {};

    for (const r of rows) {
      counts[String(r)] = {};
      for (const c of cols) {
        counts[String(r)][String(c)] = 0;
      }
    }

    const len = Math.min(indexSeries.values.length, colSeries.values.length);
    for (let i = 0; i < len; i++) {
      const rVal = String(indexSeries.values[i]);
      const cVal = String(colSeries.values[i]);
      if (counts[rVal] && counts[rVal][cVal] !== undefined) {
        counts[rVal][cVal]++;
      }
    }

    const grid = rows.map((r) => cols.map((c) => counts[String(r)][String(c)]));
    return new DataFrame(grid, { columns: cols.map(String), index: rows });
  },

  to_datetime: (values: any[] | Series): Series => {
    const list = values instanceof Series ? values.values : values;
    const formatted = list.map((v) => {
      const d = new Date(v);
      return isNaN(d.getTime()) ? null : d.toISOString().split('T')[0];
    });
    return new Series(formatted, { dtype: 'datetime64' });
  },

  isna: (val: any) => val === null || val === undefined || Number.isNaN(val),
  notna: (val: any) => !(val === null || val === undefined || Number.isNaN(val)),
  datasets: PANDAS_DATASETS,
};

/**
 * Safe Browser Code Execution Sandbox for Pandas
 */
export function executePandasCode(code: string): PandasExecutionResult {
  const startTime = performance.now();
  const logs: string[] = [];
  let finalTable: PandasTableData | undefined;

  const customPrint = (...args: any[]) => {
    const formatted = args
      .map((a) => {
        if (a instanceof DataFrame) {
          finalTable = a.toTableData();
          return a.toString();
        }
        if (a instanceof Series) {
          finalTable = a.toTableData();
          return a.toString();
        }
        if (typeof a === 'object' && a !== null) {
          try {
            return JSON.stringify(a, null, 2);
          } catch {
            return String(a);
          }
        }
        return String(a);
      })
      .join(' ');
    logs.push(formatted);
  };

  try {
    // Transform python-style syntax to JS-compatible sandbox expressions
    let transformed = code
      // import pandas as pd
      .replace(/import\s+pandas\s+as\s+pd/g, '// import pandas as pd')
      .replace(/import\s+numpy\s+as\s+np/g, '// import numpy as np')
      .replace(/from\s+pandas\s+import\s+[\w,\s]+/g, '// from pandas')
      // print(...) -> print(...)
      // df['col'] -> df.get('col')
      .replace(/(\b[a-zA-Z_]\w*)\s*\[\s*(['"][^'"]+['"])\s*\]/g, '$1.get($2)')
      // df[['col1', 'col2']] -> df.get(['col1', 'col2'])
      .replace(/(\b[a-zA-Z_]\w*)\s*\[\s*(\[\s*['"][^'"]+['"][\s\S]*?\])\s*\]/g, '$1.get($2)')
      // Boolean operators
      .replace(/\s+and\s+/g, ' && ')
      .replace(/\s+or\s+/g, ' || ')
      .replace(/\bnot\s+/g, '!')
      .replace(/\bTrue\b/g, 'true')
      .replace(/\bFalse\b/g, 'false')
      .replace(/\bNone\b/g, 'null');

    // Create execution scope
    const sandboxScope = {
      pd,
      Series,
      DataFrame,
      ecommerce_df: PANDAS_DATASETS.ecommerce,
      employees_df: PANDAS_DATASETS.employees,
      titanic_df: PANDAS_DATASETS.titanic,
      customers_df: PANDAS_DATASETS.customers,
      print: customPrint,
      console: { log: customPrint, error: customPrint, warn: customPrint },
    };

    const func = new Function(
      ...Object.keys(sandboxScope),
      `"use strict";\n${transformed}`
    );

    const execResult = func(...Object.values(sandboxScope));

    // If the last evaluated expression was a DataFrame or Series
    if (execResult instanceof DataFrame) {
      finalTable = execResult.toTableData();
      if (logs.length === 0) {
        logs.push(execResult.toString());
      }
    } else if (execResult instanceof Series) {
      finalTable = execResult.toTableData();
      if (logs.length === 0) {
        logs.push(execResult.toString());
      }
    }

    const elapsed = Math.round(performance.now() - startTime);

    return {
      output: logs.join('\n') || (finalTable ? '' : 'Execution completed successfully with no output.'),
      table: finalTable,
      executionTimeMs: elapsed,
    };
  } catch (err: any) {
    const elapsed = Math.round(performance.now() - startTime);
    return {
      output: logs.join('\n'),
      error: err?.message || 'Execution error encountered.',
      executionTimeMs: elapsed,
    };
  }
}
