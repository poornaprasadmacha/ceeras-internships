import { MLDataset, MLChartData } from '../types/machineLearningLesson';

export interface MLExecutionResult {
  output: string;
  error?: string;
  chart?: MLChartData;
  executionTimeMs: number;
}

export function createMLToolkit(dataset?: MLDataset) {
  // Extract X and y from dataset if present
  const defaultX = dataset ? dataset.rows.map((r) => r.features) : [];
  const defaultY = dataset ? dataset.rows.map((r) => r.target) : [];

  const metrics = {
    accuracy: (yTrue: (number | string)[], yPred: (number | string)[]) => {
      if (yTrue.length === 0) return 0;
      let correct = 0;
      for (let i = 0; i < yTrue.length; i++) {
        if (yTrue[i] === yPred[i]) correct++;
      }
      return Number((correct / yTrue.length).toFixed(3));
    },
    mse: (yTrue: number[], yPred: number[]) => {
      if (yTrue.length === 0) return 0;
      const sumSq = yTrue.reduce((acc, y, i) => acc + Math.pow(y - yPred[i], 2), 0);
      return Number((sumSq / yTrue.length).toFixed(3));
    },
    rmse: (yTrue: number[], yPred: number[]) => {
      return Number(Math.sqrt(metrics.mse(yTrue, yPred)).toFixed(3));
    },
    mae: (yTrue: number[], yPred: number[]) => {
      if (yTrue.length === 0) return 0;
      const sum = yTrue.reduce((acc, y, i) => acc + Math.abs(y - yPred[i]), 0);
      return Number((sum / yTrue.length).toFixed(3));
    },
    confusionMatrix: (yTrue: (number | string)[], yPred: (number | string)[]) => {
      let tp = 0, fp = 0, fn = 0, tn = 0;
      for (let i = 0; i < yTrue.length; i++) {
        const actual = yTrue[i] === 1 || yTrue[i] === '1';
        const pred = yPred[i] === 1 || yPred[i] === '1';
        if (actual && pred) tp++;
        else if (!actual && pred) fp++;
        else if (actual && !pred) fn++;
        else tn++;
      }
      return { tp, fp, fn, tn, matrix: [[tp, fn], [fp, tn]] };
    },
    precision: (yTrue: (number | string)[], yPred: (number | string)[]) => {
      const { tp, fp } = metrics.confusionMatrix(yTrue, yPred);
      return tp + fp === 0 ? 0 : Number((tp / (tp + fp)).toFixed(3));
    },
    recall: (yTrue: (number | string)[], yPred: (number | string)[]) => {
      const { tp, fn } = metrics.confusionMatrix(yTrue, yPred);
      return tp + fn === 0 ? 0 : Number((tp / (tp + fn)).toFixed(3));
    },
    f1: (yTrue: (number | string)[], yPred: (number | string)[]) => {
      const p = metrics.precision(yTrue, yPred);
      const r = metrics.recall(yTrue, yPred);
      return p + r === 0 ? 0 : Number(((2 * p * r) / (p + r)).toFixed(3));
    },
  };

  const trainTestSplit = <T, U>(
    X: T[],
    y: U[],
    testSize = 0.2
  ): { XTrain: T[]; XTest: T[]; yTrain: U[]; yTest: U[] } => {
    const n = X.length;
    const testCount = Math.max(1, Math.round(n * testSize));
    const trainCount = n - testCount;

    return {
      XTrain: X.slice(0, trainCount),
      XTest: X.slice(trainCount),
      yTrain: y.slice(0, trainCount),
      yTest: y.slice(trainCount),
    };
  };

  class LinearRegression {
    slope = 0;
    intercept = 0;
    weights: number[] = [];

    fit(X: number[][], y: number[]) {
      const n = X.length;
      if (n === 0) return this;

      // Single feature OLS
      if (X[0].length === 1) {
        const xVals = X.map((row) => row[0]);
        const xMean = xVals.reduce((a, b) => a + b, 0) / n;
        const yMean = y.reduce((a, b) => a + b, 0) / n;

        const num = xVals.reduce((acc, x, i) => acc + (x - xMean) * (y[i] - yMean), 0);
        const den = xVals.reduce((acc, x) => acc + Math.pow(x - xMean, 2), 0);

        this.slope = den === 0 ? 0 : Number((num / den).toFixed(4));
        this.intercept = Number((yMean - this.slope * xMean).toFixed(4));
        this.weights = [this.slope];
      } else {
        // Multi-feature gradient descent approximation
        const numFeatures = X[0].length;
        this.weights = new Array(numFeatures).fill(0);
        this.intercept = 0;
        const alpha = 0.01;
        const epochs = 300;

        for (let ep = 0; ep < epochs; ep++) {
          for (let i = 0; i < n; i++) {
            const pred =
              this.intercept +
              X[i].reduce((sum, val, idx) => sum + val * this.weights[idx], 0);
            const err = pred - y[i];
            this.intercept -= (alpha * err) / n;
            for (let j = 0; j < numFeatures; j++) {
              this.weights[j] -= (alpha * err * X[i][j]) / n;
            }
          }
        }
      }
      return this;
    }

    predict(X: number[][]): number[] {
      return X.map((row) => {
        if (row.length === 1) {
          return Number((this.slope * row[0] + this.intercept).toFixed(2));
        }
        const val =
          this.intercept +
          row.reduce((acc, v, i) => acc + v * (this.weights[i] || 0), 0);
        return Number(val.toFixed(2));
      });
    }
  }

  class LogisticRegression {
    weights: number[] = [];
    bias = 0;

    private sigmoid(z: number) {
      return 1 / (1 + Math.exp(-Math.max(-50, Math.min(50, z))));
    }

    fit(X: number[][], y: (number | string)[], lr = 0.1, epochs = 250) {
      const n = X.length;
      if (n === 0) return this;
      const numFeatures = X[0].length;
      this.weights = new Array(numFeatures).fill(0);
      this.bias = 0;

      const numY = y.map((v) => (v === 1 || v === '1' ? 1 : 0));

      for (let ep = 0; ep < epochs; ep++) {
        for (let i = 0; i < n; i++) {
          const z =
            this.bias +
            X[i].reduce((sum, val, idx) => sum + val * this.weights[idx], 0);
          const p = this.sigmoid(z);
          const err = p - numY[i];

          this.bias -= lr * err;
          for (let j = 0; j < numFeatures; j++) {
            this.weights[j] -= lr * err * X[i][j];
          }
        }
      }
      return this;
    }

    predictProba(X: number[][]): number[] {
      return X.map((row) => {
        const z =
          this.bias +
          row.reduce((sum, val, idx) => sum + val * (this.weights[idx] || 0), 0);
        return Number(this.sigmoid(z).toFixed(3));
      });
    }

    predict(X: number[][], threshold = 0.5): number[] {
      return this.predictProba(X).map((p) => (p >= threshold ? 1 : 0));
    }
  }

  class KNN {
    k: number;
    trainX: number[][] = [];
    trainY: (number | string)[] = [];

    constructor(k = 3) {
      this.k = k;
    }

    fit(X: number[][], y: (number | string)[]) {
      this.trainX = X;
      this.trainY = y;
      return this;
    }

    predict(X: number[][]): (number | string)[] {
      return X.map((point) => {
        const distances = this.trainX.map((trainPoint, idx) => {
          const dist = Math.sqrt(
            trainPoint.reduce((sum, v, i) => sum + Math.pow(v - point[i], 2), 0)
          );
          return { dist, label: this.trainY[idx] };
        });

        distances.sort((a, b) => a.dist - b.dist);
        const kNearest = distances.slice(0, this.k);

        // Majority vote for classification, average for regression numbers
        const isNumeric = kNearest.every((n) => typeof n.label === 'number');
        if (isNumeric) {
          const sum = kNearest.reduce((a, b) => a + (b.label as number), 0);
          return Number((sum / this.k).toFixed(2));
        }

        const counts: Record<string, number> = {};
        let maxCount = 0;
        let bestLabel: string | number = kNearest[0].label;
        kNearest.forEach((n) => {
          const key = String(n.label);
          counts[key] = (counts[key] || 0) + 1;
          if (counts[key] > maxCount) {
            maxCount = counts[key];
            bestLabel = n.label;
          }
        });
        return bestLabel;
      });
    }
  }

  class KMeans {
    k: number;
    maxIter: number;
    centroids: number[][] = [];
    inertia = 0;

    constructor(k = 3, maxIter = 100) {
      this.k = k;
      this.maxIter = maxIter;
    }

    fit(X: number[][]) {
      const n = X.length;
      if (n === 0) return this;
      const numFeatures = X[0].length;

      // Seed centroids with first k points
      this.centroids = X.slice(0, this.k).map((row) => [...row]);

      let assignments = new Array(n).fill(0);

      for (let iter = 0; iter < this.maxIter; iter++) {
        // Assign each point to closest centroid
        assignments = X.map((point) => {
          let bestDist = Infinity;
          let bestIdx = 0;
          this.centroids.forEach((centroid, cIdx) => {
            const dist = Math.sqrt(
              centroid.reduce((acc, v, i) => acc + Math.pow(v - point[i], 2), 0)
            );
            if (dist < bestDist) {
              bestDist = dist;
              bestIdx = cIdx;
            }
          });
          return bestIdx;
        });

        // Recompute centroids
        const newCentroids = Array.from({ length: this.k }, () =>
          new Array(numFeatures).fill(0)
        );
        const counts = new Array(this.k).fill(0);

        X.forEach((point, idx) => {
          const c = assignments[idx];
          counts[c]++;
          for (let f = 0; f < numFeatures; f++) {
            newCentroids[c][f] += point[f];
          }
        });

        this.centroids = newCentroids.map((c, i) => {
          if (counts[i] === 0) return this.centroids[i];
          return c.map((v) => Number((v / counts[i]).toFixed(2)));
        });
      }

      // Compute total within-cluster sum of squares (inertia)
      this.inertia = Number(
        X.reduce((acc, point, idx) => {
          const c = this.centroids[assignments[idx]];
          const distSq = c.reduce((s, v, i) => s + Math.pow(v - point[i], 2), 0);
          return acc + distSq;
        }, 0).toFixed(2)
      );

      return this;
    }

    predict(X: number[][]): number[] {
      return X.map((point) => {
        let bestDist = Infinity;
        let bestIdx = 0;
        this.centroids.forEach((c, cIdx) => {
          const dist = Math.sqrt(
            c.reduce((acc, v, i) => acc + Math.pow(v - point[i], 2), 0)
          );
          if (dist < bestDist) {
            bestDist = dist;
            bestIdx = cIdx;
          }
        });
        return bestIdx;
      });
    }
  }

  class StandardScaler {
    means: number[] = [];
    stds: number[] = [];

    fit(X: number[][]) {
      const n = X.length;
      const numFeatures = X[0].length;
      this.means = new Array(numFeatures).fill(0);
      this.stds = new Array(numFeatures).fill(1);

      for (let f = 0; f < numFeatures; f++) {
        const vals = X.map((r) => r[f]);
        const mean = vals.reduce((a, b) => a + b, 0) / n;
        const variance = vals.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / n;
        this.means[f] = mean;
        this.stds[f] = Math.sqrt(variance) || 1;
      }
      return this;
    }

    transform(X: number[][]): number[][] {
      return X.map((row) =>
        row.map((v, f) => Number(((v - this.means[f]) / this.stds[f]).toFixed(3)))
      );
    }

    fitTransform(X: number[][]): number[][] {
      return this.fit(X).transform(X);
    }
  }

  return {
    X: defaultX,
    y: defaultY,
    metrics,
    trainTestSplit,
    LinearRegression,
    LogisticRegression,
    KNN,
    KMeans,
    StandardScaler,
  };
}

/**
 * Sandboxed execution of Machine Learning code in browser.
 */
export async function executeMachineLearningCode(
  code: string,
  dataset?: MLDataset
): Promise<MLExecutionResult> {
  const startTime = performance.now();
  const outputBuffer: string[] = [];
  let capturedChart: MLChartData | undefined;

  const ml = createMLToolkit(dataset);

  const plot = {
    scatter: (points: { x: number; y: number; class?: number | string; label?: string }[], title = 'Scatter Plot') => {
      capturedChart = {
        type: 'scatter-boundary',
        title,
        points,
      };
    },
    regression: (
      points: { x: number; y: number; label?: string }[],
      line: { slope: number; intercept: number },
      title = 'Regression Line Fit'
    ) => {
      capturedChart = {
        type: 'regression-fit',
        title,
        points,
        line,
      };
    },
    lossCurve: (curve: { x: number; y: number }[] | number[], title = 'Loss Curve (Epochs vs Loss)') => {
      const points = Array.isArray(curve) && typeof curve[0] === 'number'
        ? (curve as number[]).map((y, x) => ({ x, y }))
        : (curve as { x: number; y: number }[]);
      capturedChart = {
        type: 'loss-curve',
        title,
        curve: points,
      };
    },
    bar: (labels: string[], values: number[], title = 'Bar Metric') => {
      capturedChart = {
        type: 'bar',
        title,
        labels,
        values,
      };
    },
    confusionMatrix: (matrix: number[][], labels = ['Positive', 'Negative'], title = 'Confusion Matrix Heatmap') => {
      capturedChart = {
        type: 'confusion-matrix',
        title,
        matrix: {
          labels,
          matrix,
        },
      };
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
      'ml',
      'plot',
      'dataset',
      `return (async () => {
        ${code}
      })();`
    );

    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Machine Learning calculation timed out.')), 1500)
    );

    await Promise.race([wrappedFunction(mockConsole, ml, plot, dataset), timeoutPromise]);

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
