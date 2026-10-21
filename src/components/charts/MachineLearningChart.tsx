import React from 'react';
import { MLChartData } from '../../types/machineLearningLesson';
import { ScatterChart, TrendingDown, Grid3X3, BarChart3, LineChart } from 'lucide-react';

export function MachineLearningChart({ chart }: { chart: MLChartData }) {
  if (chart.type === 'regression-fit' && chart.points && chart.line) {
    const xs = chart.points.map((p) => p.x);
    const ys = chart.points.map((p) => p.y);
    const minX = Math.min(...xs, 0);
    const maxX = Math.max(...xs, 10);
    const minY = Math.min(...ys, 0);
    const maxY = Math.max(...ys, 10);

    const width = 360;
    const height = 180;
    const pad = 30;

    const toSvgX = (x: number) => pad + ((x - minX) / (maxX - minX || 1)) * (width - 2 * pad);
    const toSvgY = (y: number) => height - pad - ((y - minY) / (maxY - minY || 1)) * (height - 2 * pad);

    const lineStart = { x: minX, y: chart.line.slope * minX + chart.line.intercept };
    const lineEnd = { x: maxX, y: chart.line.slope * maxX + chart.line.intercept };

    return (
      <div className="space-y-2 p-4 bg-surface border border-border rounded-lg shadow-2xs">
        <div className="flex items-center gap-2 text-xs font-bold text-text-main pb-1 border-b border-border/60">
          <LineChart className="w-4 h-4 text-[#38BDF8]" />
          <span>{chart.title}</span>
        </div>

        <div className="flex justify-center pt-2">
          <svg viewBox={`0 0 ${width} ${height}`} className="w-full max-w-sm overflow-visible">
            {/* Grid Axes */}
            <line x1={pad} y1={height - pad} x2={width - pad} y2={height - pad} stroke="var(--border-color, #cbd5e1)" strokeWidth="1.5" />
            <line x1={pad} y1={pad} x2={pad} y2={height - pad} stroke="var(--border-color, #cbd5e1)" strokeWidth="1.5" />

            {/* Regression Line */}
            <line
              x1={toSvgX(lineStart.x)}
              y1={toSvgY(lineStart.y)}
              x2={toSvgX(lineEnd.x)}
              y2={toSvgY(lineEnd.y)}
              stroke="#F89939"
              strokeWidth="2.5"
              strokeDasharray="4 2"
            />

            {/* Scatter Points */}
            {chart.points.map((p, idx) => (
              <circle
                key={idx}
                cx={toSvgX(p.x)}
                cy={toSvgY(p.y)}
                r="4.5"
                fill="#3499CD"
                stroke="#ffffff"
                strokeWidth="1.5"
                className="hover:r-6.5 transition-all cursor-pointer"
              >
                <title>{`(${p.x}, ${p.y}) ${p.label || ''}`}</title>
              </circle>
            ))}
          </svg>
        </div>
      </div>
    );
  }

  if (chart.type === 'scatter-boundary' && chart.points) {
    const xs = chart.points.map((p) => p.x);
    const ys = chart.points.map((p) => p.y);
    const minX = Math.min(...xs, 0);
    const maxX = Math.max(...xs, 10);
    const minY = Math.min(...ys, 0);
    const maxY = Math.max(...ys, 10);

    const width = 360;
    const height = 180;
    const pad = 30;

    return (
      <div className="space-y-2 p-4 bg-surface border border-border rounded-lg shadow-2xs">
        <div className="flex items-center gap-2 text-xs font-bold text-text-main pb-1 border-b border-border/60">
          <ScatterChart className="w-4 h-4 text-[#F89939]" />
          <span>{chart.title}</span>
        </div>

        <div className="flex justify-center pt-2">
          <svg viewBox={`0 0 ${width} ${height}`} className="w-full max-w-sm overflow-visible">
            <line x1={pad} y1={height - pad} x2={width - pad} y2={height - pad} stroke="var(--border-color, #cbd5e1)" strokeWidth="1.5" />
            <line x1={pad} y1={pad} x2={pad} y2={height - pad} stroke="var(--border-color, #cbd5e1)" strokeWidth="1.5" />

            {chart.points.map((p, idx) => {
              const cx = pad + ((p.x - minX) / (maxX - minX || 1)) * (width - 2 * pad);
              const cy = height - pad - ((p.y - minY) / (maxY - minY || 1)) * (height - 2 * pad);
              const isClassOne = p.class === 1 || p.class === '1';
              return (
                <circle
                  key={idx}
                  cx={cx}
                  cy={cy}
                  r="5"
                  fill={isClassOne ? '#F43F5E' : '#0284C7'}
                  stroke="#ffffff"
                  strokeWidth="1.5"
                  className="hover:r-7 transition-all cursor-pointer"
                >
                  <title>{`(${p.x}, ${p.y}) Class: ${p.class}`}</title>
                </circle>
              );
            })}
          </svg>
        </div>
      </div>
    );
  }

  if (chart.type === 'loss-curve' && chart.curve) {
    const xs = chart.curve.map((p) => p.x);
    const ys = chart.curve.map((p) => p.y);
    const minX = Math.min(...xs, 0);
    const maxX = Math.max(...xs, 1);
    const minY = 0;
    const maxY = Math.max(...ys, 1);

    const width = 360;
    const height = 180;
    const pad = 30;

    const points = chart.curve.map((p) => {
      const cx = pad + ((p.x - minX) / (maxX - minX || 1)) * (width - 2 * pad);
      const cy = height - pad - ((p.y - minY) / (maxY - minY || 1)) * (height - 2 * pad);
      return `${cx},${cy}`;
    }).join(' ');

    return (
      <div className="space-y-2 p-4 bg-surface border border-border rounded-lg shadow-2xs">
        <div className="flex items-center gap-2 text-xs font-bold text-text-main pb-1 border-b border-border/60">
          <TrendingDown className="w-4 h-4 text-emerald-500" />
          <span>{chart.title}</span>
        </div>

        <div className="flex justify-center pt-2">
          <svg viewBox={`0 0 ${width} ${height}`} className="w-full max-w-sm overflow-visible">
            <line x1={pad} y1={height - pad} x2={width - pad} y2={height - pad} stroke="var(--border-color, #cbd5e1)" strokeWidth="1.5" />
            <line x1={pad} y1={pad} x2={pad} y2={height - pad} stroke="var(--border-color, #cbd5e1)" strokeWidth="1.5" />
            <polyline fill="none" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" points={points} />
          </svg>
        </div>
      </div>
    );
  }

  if (chart.type === 'confusion-matrix' && chart.matrix) {
    const { labels, matrix } = chart.matrix;
    return (
      <div className="space-y-3 p-4 bg-surface border border-border rounded-lg shadow-2xs">
        <div className="flex items-center gap-2 text-xs font-bold text-text-main pb-2 border-b border-border/60">
          <Grid3X3 className="w-4 h-4 text-[#F89939]" />
          <span>{chart.title}</span>
        </div>

        <div className="grid grid-cols-2 gap-2 text-center text-xs">
          <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-lg">
            <span className="text-[10px] text-text-muted block font-semibold">True Positive (TP)</span>
            <span className="font-mono text-lg font-bold text-emerald-600 dark:text-emerald-400">{matrix[0]?.[0] ?? 0}</span>
          </div>
          <div className="p-3 bg-rose-500/10 border border-rose-500/30 rounded-lg">
            <span className="text-[10px] text-text-muted block font-semibold">False Negative (FN)</span>
            <span className="font-mono text-lg font-bold text-rose-600 dark:text-rose-400">{matrix[0]?.[1] ?? 0}</span>
          </div>
          <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-lg">
            <span className="text-[10px] text-text-muted block font-semibold">False Positive (FP)</span>
            <span className="font-mono text-lg font-bold text-amber-600 dark:text-amber-400">{matrix[1]?.[0] ?? 0}</span>
          </div>
          <div className="p-3 bg-sky-500/10 border border-sky-500/30 rounded-lg">
            <span className="text-[10px] text-text-muted block font-semibold">True Negative (TN)</span>
            <span className="font-mono text-lg font-bold text-sky-600 dark:text-sky-400">{matrix[1]?.[1] ?? 0}</span>
          </div>
        </div>
      </div>
    );
  }

  if (chart.type === 'bar' && chart.labels && chart.values) {
    const maxVal = Math.max(...chart.values, 1);
    return (
      <div className="space-y-3 p-4 bg-surface border border-border rounded-lg shadow-2xs">
        <div className="flex items-center gap-2 text-xs font-bold text-text-main pb-2 border-b border-border/60">
          <BarChart3 className="w-4 h-4 text-[#3499CD]" />
          <span>{chart.title}</span>
        </div>

        <div className="space-y-2 pt-1">
          {chart.labels.map((label, idx) => {
            const val = chart.values![idx];
            const pct = Math.max(8, Math.round((val / maxVal) * 100));
            return (
              <div key={idx} className="space-y-1">
                <div className="flex items-center justify-between text-xs font-medium">
                  <span className="text-text-main">{label}</span>
                  <span className="font-mono text-text-muted">{val}</span>
                </div>
                <div className="w-full bg-subtle rounded-full h-4 overflow-hidden border border-border/50">
                  <div
                    className="h-full bg-gradient-to-r from-[#3499CD] to-[#F89939] rounded-full transition-all duration-500"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return null;
}
