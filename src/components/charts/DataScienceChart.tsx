import React from 'react';
import { DataScienceChartData } from '../../types/dataScienceLesson';
import { BarChart3, ScatterChart, TrendingUp } from 'lucide-react';

export function DataScienceChart({ chart }: { chart: DataScienceChartData }) {
  if (chart.type === 'bar' && chart.labels && chart.values) {
    const maxVal = Math.max(...chart.values, 1);
    return (
      <div className="space-y-3 p-4 bg-surface border border-border rounded-lg shadow-2xs">
        <div className="flex items-center gap-2 text-xs font-bold text-text-main pb-2 border-b border-border/60">
          <BarChart3 className="w-4 h-4 text-[#E70488]" />
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
                    className="h-full bg-gradient-to-r from-[#130754] to-[#E70488] rounded-full transition-all duration-500"
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

  if (chart.type === 'scatter' && chart.points) {
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
          <ScatterChart className="w-4 h-4 text-[#00D2FF]" />
          <span>{chart.title}</span>
        </div>

        <div className="flex justify-center pt-2">
          <svg viewBox={`0 0 ${width} ${height}`} className="w-full max-w-sm overflow-visible">
            {/* Grid Axes */}
            <line
              x1={pad}
              y1={height - pad}
              x2={width - pad}
              y2={height - pad}
              stroke="var(--border-color, #cbd5e1)"
              strokeWidth="1.5"
            />
            <line
              x1={pad}
              y1={pad}
              x2={pad}
              y2={height - pad}
              stroke="var(--border-color, #cbd5e1)"
              strokeWidth="1.5"
            />

            {/* Scatter Points */}
            {chart.points.map((p, idx) => {
              const cx = pad + ((p.x - minX) / (maxX - minX || 1)) * (width - 2 * pad);
              const cy = height - pad - ((p.y - minY) / (maxY - minY || 1)) * (height - 2 * pad);
              return (
                <g key={idx}>
                  <circle
                    cx={cx}
                    cy={cy}
                    r="5"
                    fill="#E70488"
                    stroke="#ffffff"
                    strokeWidth="1.5"
                    className="hover:r-7 transition-all cursor-pointer"
                  >
                    <title>{`(${p.x}, ${p.y}) ${p.label || ''}`}</title>
                  </circle>
                </g>
              );
            })}
          </svg>
        </div>
      </div>
    );
  }

  if (chart.type === 'line' && chart.labels && chart.values) {
    const minVal = Math.min(...chart.values, 0);
    const maxVal = Math.max(...chart.values, 10);
    const width = 360;
    const height = 180;
    const pad = 30;

    const points = chart.values.map((val, idx) => {
      const cx = pad + (idx / Math.max(1, chart.values!.length - 1)) * (width - 2 * pad);
      const cy = height - pad - ((val - minVal) / (maxVal - minVal || 1)) * (height - 2 * pad);
      return { cx, cy, val, label: chart.labels![idx] };
    });

    const polylinePoints = points.map((p) => `${p.cx},${p.cy}`).join(' ');

    return (
      <div className="space-y-2 p-4 bg-surface border border-border rounded-lg shadow-2xs">
        <div className="flex items-center gap-2 text-xs font-bold text-text-main pb-1 border-b border-border/60">
          <TrendingUp className="w-4 h-4 text-[#10B981]" />
          <span>{chart.title}</span>
        </div>

        <div className="flex justify-center pt-2">
          <svg viewBox={`0 0 ${width} ${height}`} className="w-full max-w-sm overflow-visible">
            {/* Grid Axes */}
            <line
              x1={pad}
              y1={height - pad}
              x2={width - pad}
              y2={height - pad}
              stroke="var(--border-color, #cbd5e1)"
              strokeWidth="1.5"
            />
            <line
              x1={pad}
              y1={pad}
              x2={pad}
              y2={height - pad}
              stroke="var(--border-color, #cbd5e1)"
              strokeWidth="1.5"
            />

            {/* Line */}
            <polyline
              fill="none"
              stroke="#10B981"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              points={polylinePoints}
            />

            {/* Points */}
            {points.map((p, idx) => (
              <circle
                key={idx}
                cx={p.cx}
                cy={p.cy}
                r="4"
                fill="#10B981"
                stroke="#ffffff"
                strokeWidth="1.5"
                className="cursor-pointer hover:r-6"
              >
                <title>{`${p.label}: ${p.val}`}</title>
              </circle>
            ))}
          </svg>
        </div>
      </div>
    );
  }

  return null;
}
