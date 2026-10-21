import { NumpyChartData } from '../types/numpyLesson';

export interface NumpyExecutionResult {
  output: string;
  error?: string;
  chart?: NumpyChartData;
  executionTimeMs: number;
}

export class NDArray {
  data: number[] | number[][];
  shape: number[];
  ndim: number;
  size: number;
  dtype: string;

  constructor(data: number[] | number[][], dtype = 'float64') {
    this.dtype = dtype;
    if (Array.isArray(data) && data.length > 0 && Array.isArray(data[0])) {
      const rows = data.length;
      const cols = (data[0] as number[]).length;
      this.data = (data as number[][]).map((row) => [...row]);
      this.shape = [rows, cols];
      this.ndim = 2;
      this.size = rows * cols;
    } else {
      this.data = [...(data as number[])];
      this.shape = [data.length];
      this.ndim = 1;
      this.size = data.length;
    }
  }

  get T(): NDArray {
    if (this.ndim === 1) return this;
    const mat = this.data as number[][];
    const rows = this.shape[0];
    const cols = this.shape[1];
    const transposed: number[][] = Array.from({ length: cols }, () => new Array(rows).fill(0));
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        transposed[c][r] = mat[r][c];
      }
    }
    return new NDArray(transposed, this.dtype);
  }

  reshape(rows: number, cols: number): NDArray {
    if (rows * cols !== this.size) {
      throw new Error(`Cannot reshape array of size ${this.size} into shape (${rows}, ${cols})`);
    }
    const flat = this.flatten().data as number[];
    const reshaped: number[][] = [];
    let idx = 0;
    for (let r = 0; r < rows; r++) {
      const row: number[] = [];
      for (let c = 0; c < cols; c++) {
        row.push(flat[idx++]);
      }
      reshaped.push(row);
    }
    return new NDArray(reshaped, this.dtype);
  }

  flatten(): NDArray {
    if (this.ndim === 1) return this;
    const flat = (this.data as number[][]).flat();
    return new NDArray(flat, this.dtype);
  }

  sum(axis?: number): number | NDArray {
    if (this.ndim === 1 || axis === undefined) {
      const flat = this.ndim === 1 ? (this.data as number[]) : (this.data as number[][]).flat();
      return Number(flat.reduce((a, b) => a + b, 0).toFixed(4));
    }
    const mat = this.data as number[][];
    const rows = this.shape[0];
    const cols = this.shape[1];
    if (axis === 0) {
      // Collapse rows, sum columns
      const colSums = new Array(cols).fill(0);
      for (let c = 0; c < cols; c++) {
        for (let r = 0; r < rows; r++) {
          colSums[c] += mat[r][c];
        }
      }
      return new NDArray(colSums, this.dtype);
    } else if (axis === 1) {
      // Collapse columns, sum rows
      const rowSums = mat.map((row) => row.reduce((a, b) => a + b, 0));
      return new NDArray(rowSums, this.dtype);
    }
    throw new Error(`Axis ${axis} out of bounds for array of dimension ${this.ndim}`);
  }

  mean(axis?: number): number | NDArray {
    if (this.ndim === 1 || axis === undefined) {
      const total = this.sum() as number;
      return Number((total / this.size).toFixed(4));
    }
    const sumResult = this.sum(axis) as NDArray;
    const divisor = axis === 0 ? this.shape[0] : this.shape[1];
    const means = (sumResult.data as number[]).map((v) => Number((v / divisor).toFixed(4)));
    return new NDArray(means, this.dtype);
  }

  min(): number {
    const flat = this.ndim === 1 ? (this.data as number[]) : (this.data as number[][]).flat();
    return Math.min(...flat);
  }

  max(): number {
    const flat = this.ndim === 1 ? (this.data as number[]) : (this.data as number[][]).flat();
    return Math.max(...flat);
  }

  std(): number {
    const m = this.mean() as number;
    const flat = this.ndim === 1 ? (this.data as number[]) : (this.data as number[][]).flat();
    const variance = flat.reduce((acc, v) => acc + Math.pow(v - m, 2), 0) / this.size;
    return Number(Math.sqrt(variance).toFixed(4));
  }

  dot(other: NDArray): NDArray | number {
    // Vector dot vector
    if (this.ndim === 1 && other.ndim === 1) {
      if (this.size !== other.size) {
        throw new Error(`Dot product shape mismatch: (${this.size},) and (${other.size},)`);
      }
      const v1 = this.data as number[];
      const v2 = other.data as number[];
      return Number(v1.reduce((sum, val, i) => sum + val * v2[i], 0).toFixed(4));
    }

    // Matrix dot Matrix
    if (this.ndim === 2 && other.ndim === 2) {
      const [r1, c1] = this.shape;
      const [r2, c2] = other.shape;
      if (c1 !== r2) {
        throw new Error(`Matrix multiplication shape mismatch: (${r1}, ${c1}) x (${r2}, ${c2})`);
      }
      const m1 = this.data as number[][];
      const m2 = other.data as number[][];
      const result: number[][] = Array.from({ length: r1 }, () => new Array(c2).fill(0));
      for (let i = 0; i < r1; i++) {
        for (let j = 0; j < c2; j++) {
          let sum = 0;
          for (let k = 0; k < c1; k++) {
            sum += m1[i][k] * m2[k][j];
          }
          result[i][j] = Number(sum.toFixed(4));
        }
      }
      return new NDArray(result, this.dtype);
    }

    throw new Error('Unsupported dimension combination for dot product.');
  }

  tolist(): number[] | number[][] {
    return this.data;
  }

  toString(): string {
    if (this.ndim === 1) {
      return `array([${(this.data as number[]).join(', ')}])`;
    }
    const rows = (this.data as number[][]).map((r) => ` [${r.join(', ')}]`).join(',\n');
    return `array([${rows.trimStart()}])`;
  }
}

export function createNumpyToolkit() {
  const np = {
    array: (data: number[] | number[][], dtype = 'float64') => new NDArray(data, dtype),
    zeros: (shape: number | [number, number]) => {
      if (typeof shape === 'number') {
        return new NDArray(new Array(shape).fill(0));
      }
      const [r, c] = shape;
      const mat = Array.from({ length: r }, () => new Array(c).fill(0));
      return new NDArray(mat);
    },
    ones: (shape: number | [number, number]) => {
      if (typeof shape === 'number') {
        return new NDArray(new Array(shape).fill(1));
      }
      const [r, c] = shape;
      const mat = Array.from({ length: r }, () => new Array(c).fill(1));
      return new NDArray(mat);
    },
    full: (shape: number | [number, number], fillVal: number) => {
      if (typeof shape === 'number') {
        return new NDArray(new Array(shape).fill(fillVal));
      }
      const [r, c] = shape;
      const mat = Array.from({ length: r }, () => new Array(c).fill(fillVal));
      return new NDArray(mat);
    },
    arange: (start: number, stop?: number, step = 1) => {
      const realStart = stop === undefined ? 0 : start;
      const realStop = stop === undefined ? start : stop;
      const values: number[] = [];
      for (let v = realStart; v < realStop; v += step) {
        values.push(Number(v.toFixed(4)));
      }
      return new NDArray(values);
    },
    linspace: (start: number, stop: number, num = 50) => {
      if (num <= 1) return new NDArray([start]);
      const step = (stop - start) / (num - 1);
      const values: number[] = [];
      for (let i = 0; i < num; i++) {
        values.push(Number((start + i * step).toFixed(4)));
      }
      return new NDArray(values);
    },
    eye: (n: number) => {
      const mat = Array.from({ length: n }, (_, r) =>
        Array.from({ length: n }, (_, c) => (r === c ? 1 : 0))
      );
      return new NDArray(mat);
    },
    add: (a: NDArray, b: NDArray | number): NDArray => {
      if (typeof b === 'number') {
        if (a.ndim === 1) {
          return new NDArray((a.data as number[]).map((v) => Number((v + b).toFixed(4))));
        }
        return new NDArray((a.data as number[][]).map((row) => row.map((v) => Number((v + b).toFixed(4)))));
      }
      // Broadcasting or elementwise
      if (a.ndim === 1 && b.ndim === 1) {
        const d1 = a.data as number[];
        const d2 = b.data as number[];
        return new NDArray(d1.map((v, i) => Number((v + d2[i]).toFixed(4))));
      }
      if (a.ndim === 2 && b.ndim === 2) {
        const m1 = a.data as number[][];
        const m2 = b.data as number[][];
        return new NDArray(m1.map((row, r) => row.map((v, c) => Number((v + m2[r][c]).toFixed(4)))));
      }
      // Broadcast 1D row vector across 2D matrix
      if (a.ndim === 2 && b.ndim === 1) {
        const m = a.data as number[][];
        const v = b.data as number[];
        return new NDArray(m.map((row) => row.map((val, c) => Number((val + v[c]).toFixed(4)))));
      }
      throw new Error('Unsupported array shapes for addition');
    },
    multiply: (a: NDArray, b: NDArray | number): NDArray => {
      if (typeof b === 'number') {
        if (a.ndim === 1) {
          return new NDArray((a.data as number[]).map((v) => Number((v * b).toFixed(4))));
        }
        return new NDArray((a.data as number[][]).map((row) => row.map((v) => Number((v * b).toFixed(4)))));
      }
      if (a.ndim === 1 && b.ndim === 1) {
        const d1 = a.data as number[];
        const d2 = b.data as number[];
        return new NDArray(d1.map((v, i) => Number((v * d2[i]).toFixed(4))));
      }
      if (a.ndim === 2 && b.ndim === 2) {
        const m1 = a.data as number[][];
        const m2 = b.data as number[][];
        return new NDArray(m1.map((row, r) => row.map((v, c) => Number((v * m2[r][c]).toFixed(4)))));
      }
      throw new Error('Unsupported array shapes for element-wise multiplication');
    },
    dot: (a: NDArray, b: NDArray) => a.dot(b),
    matmul: (a: NDArray, b: NDArray) => a.dot(b),
    vstack: (arrays: NDArray[]): NDArray => {
      const allRows: number[][] = [];
      arrays.forEach((arr) => {
        if (arr.ndim === 1) {
          allRows.push(arr.data as number[]);
        } else {
          allRows.push(...(arr.data as number[][]));
        }
      });
      return new NDArray(allRows);
    },
    hstack: (arrays: NDArray[]): NDArray => {
      if (arrays[0].ndim === 1) {
        const flat = arrays.map((a) => a.data as number[]).flat();
        return new NDArray(flat);
      }
      const numRows = arrays[0].shape[0];
      const combined: number[][] = Array.from({ length: numRows }, () => []);
      for (let r = 0; r < numRows; r++) {
        arrays.forEach((arr) => {
          combined[r].push(...(arr.data as number[][])[r]);
        });
      }
      return new NDArray(combined);
    },
    sum: (a: NDArray, axis?: number) => a.sum(axis),
    mean: (a: NDArray, axis?: number) => a.mean(axis),
    linalg: {
      det: (a: NDArray): number => {
        if (a.shape[0] !== 2 || a.shape[1] !== 2) {
          throw new Error('Determinant currently supported for 2x2 matrices.');
        }
        const m = a.data as number[][];
        return Number((m[0][0] * m[1][1] - m[0][1] * m[1][0]).toFixed(4));
      },
      inv: (a: NDArray): NDArray => {
        if (a.shape[0] !== 2 || a.shape[1] !== 2) {
          throw new Error('Inverse currently supported for 2x2 matrices.');
        }
        const det = np.linalg.det(a);
        if (det === 0) throw new Error('Singular matrix: inverse does not exist.');
        const m = a.data as number[][];
        const invMat = [
          [Number((m[1][1] / det).toFixed(4)), Number((-m[0][1] / det).toFixed(4))],
          [Number((-m[1][0] / det).toFixed(4)), Number((m[0][0] / det).toFixed(4))],
        ];
        return new NDArray(invMat);
      },
      norm: (a: NDArray): number => {
        const flat = a.ndim === 1 ? (a.data as number[]) : (a.data as number[][]).flat();
        const sumSq = flat.reduce((sum, v) => sum + v * v, 0);
        return Number(Math.sqrt(sumSq).toFixed(4));
      },
    },
    random: {
      rand: (...dims: number[]): NDArray => {
        if (dims.length === 1) {
          const vals = Array.from({ length: dims[0] }, () => Number(Math.random().toFixed(4)));
          return new NDArray(vals);
        }
        const [r, c] = dims;
        const mat = Array.from({ length: r }, () =>
          Array.from({ length: c }, () => Number(Math.random().toFixed(4)))
        );
        return new NDArray(mat);
      },
      randint: (low: number, high: number, size: number | [number, number] = 1): NDArray => {
        if (typeof size === 'number') {
          const vals = Array.from({ length: size }, () =>
            Math.floor(Math.random() * (high - low)) + low
          );
          return new NDArray(vals, 'int32');
        }
        const [r, c] = size;
        const mat = Array.from({ length: r }, () =>
          Array.from({ length: c }, () => Math.floor(Math.random() * (high - low)) + low)
        );
        return new NDArray(mat, 'int32');
      },
    },
  };

  return np;
}

/**
 * Sandboxed browser execution of NumPy code
 */
export async function executeNumpyCode(code: string): Promise<NumpyExecutionResult> {
  const startTime = performance.now();
  const outputBuffer: string[] = [];
  let capturedChart: NumpyChartData | undefined;

  const np = createNumpyToolkit();

  const plot = {
    matrix: (
      matrix: NDArray | number[][],
      title = 'Matrix Layout',
      highlightIndices?: [number, number][]
    ) => {
      const rawMat = matrix instanceof NDArray ? (matrix.data as number[][]) : matrix;
      capturedChart = {
        type: 'matrix',
        title,
        matrix: rawMat,
        highlightIndices,
      };
    },
    vector: (vector: NDArray | number[], title = 'Array Vector') => {
      const rawVec = vector instanceof NDArray ? (vector.data as number[]) : vector;
      capturedChart = {
        type: 'vector',
        title,
        vector: rawVec,
      };
    },
    heatmap: (matrix: NDArray | number[][], title = 'Matrix Heatmap') => {
      const rawMat = matrix instanceof NDArray ? (matrix.data as number[][]) : matrix;
      capturedChart = {
        type: 'heatmap',
        title,
        matrix: rawMat,
      };
    },
    line: (labels: (number | string)[], values: number[], title = 'Array Sequence Line') => {
      capturedChart = {
        type: 'line',
        title,
        labels: labels.map(String),
        values,
      };
    },
  };

  const mockConsole = {
    log: (...args: any[]) => {
      const line = args
        .map((a) => {
          if (a instanceof NDArray) {
            return a.toString();
          }
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
      'np',
      'plot',
      `return (async () => {
        ${code}
      })();`
    );

    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('NumPy execution timed out.')), 1500)
    );

    await Promise.race([wrappedFunction(mockConsole, np, plot), timeoutPromise]);

    const endTime = performance.now();
    return {
      output: outputBuffer.join('\n'),
      chart: capturedChart,
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
