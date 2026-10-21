import React from 'react';
import { NumpyChartData } from '../../types/numpyLesson';
import { Grid, Layers, Flame, TrendingUp } from 'lucide-react';

export function NumpyChart({ chart }: { chart: NumpyChartData }) {
  if (chart.type === 'matrix' && chart.matrix) {
    const rows = chart.matrix.length;
    const cols = chart.matrix[0]?.length || 0;
    const isHighlighted = (r: number, c: number) =>
      chart.highlightIndices?.some(([hr, hc]) => hr === r && hc === c);

    return (
      <div className="space-y-3 p-4 bg-surface border border-border rounded-lg shadow-2xs">
        <div className="flex items-center justify-between pb-2 border-b border-border/60 text-xs font-bold text-text-main">
          <div className="flex items-center gap-2">
            <Grid className="w-4 h-4 text-[#4DABCF]" />
            <span>{chart.title}</span>
          </div>
          <span className="font-mono text-[11px] text-text-muted">
            Shape: ({rows}, {cols})
          </span>
        </div>

        <div className="flex justify-center p-2 overflow-x-auto">
          <div className="inline-block border-2 border-border/80 rounded-lg p-2.5 bg-subtle/50 relative">
            {/* Matrix brackets visual */}
            <div className="grid gap-1.5" style={{ gridTemplateColumns: `repeat(${cols}, minmax(44px, 1fr))` }}>
              {chart.matrix.map((row, rIdx) =>
                row.map((val, cIdx) => {
                  const highlighted = isHighlighted(rIdx, cIdx);
                  return (
                    <div
                      key={`${rIdx}-${cIdx}`}
                      className={`h-11 flex flex-col items-center justify-center font-mono text-xs rounded border transition-all ${
                        highlighted
                          ? 'bg-[#4DABCF]/20 border-[#4DABCF] text-[#013243] dark:text-[#4DABCF] font-bold shadow-2xs'
                          : 'bg-surface border-border text-text-main'
                      }`}
                    >
                      <span>{val}</span>
                      <span className="text-[9px] text-text-muted/70 font-sans">
                        [{rIdx},{cIdx}]
                      </span>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (chart.type === 'vector' && chart.vector) {
    return (
      <div className="space-y-3 p-4 bg-surface border border-border rounded-lg shadow-2xs">
        <div className="flex items-center justify-between pb-2 border-b border-border/60 text-xs font-bold text-text-main">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-[#4DABCF]" />
            <span>{chart.title}</span>
          </div>
          <span className="font-mono text-[11px] text-text-muted">
            Shape: ({chart.vector.length},)
          </span>
        </div>

        <div className="flex items-center gap-1.5 p-2 overflow-x-auto justify-center">
          {chart.vector.map((val, idx) => (
            <div
              key={idx}
              className="min-w-[46px] h-12 flex flex-col items-center justify-center font-mono text-xs bg-surface border border-border rounded-lg shadow-2xs"
            >
              <span className="font-bold text-text-main">{val}</span>
              <span className="text-[9px] text-text-muted">idx {idx}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (chart.type === 'heatmap' && chart.matrix) {
    const flat = chart.matrix.flat();
    const minVal = Math.min(...flat);
    const maxVal = Math.max(...flat) || 1;
    const rows = chart.matrix.length;
    const cols = chart.matrix[0]?.length || 0;

    return (
      <div className="space-y-3 p-4 bg-surface border border-border rounded-lg shadow-2xs">
        <div className="flex items-center justify-between pb-2 border-b border-border/60 text-xs font-bold text-text-main">
          <div className="flex items-center gap-2">
            <Flame className="w-4 h-4 text-[#E70488]" />
            <span>{chart.title}</span>
          </div>
          <span className="font-mono text-[11px] text-text-muted">
            Heatmap ({rows}x{cols})
          </span>
        </div>

        <div className="flex justify-center p-2">
          <div className="grid gap-1" style={{ gridTemplateColumns: `repeat(${cols}, 40px)` }}>
            {chart.matrix.map((row, r) =>
              row.map((val, c) => {
                const norm = Math.max(0, Math.min(1, (val - minVal) / (maxVal - minVal || 1)));
                return (
                  <div
                    key={`${r}-${c}`}
                    className="w-10 h-10 rounded flex items-center justify-center font-mono text-[11px] font-bold text-white transition-all cursor-pointer"
                    style={{
                      backgroundColor: `rgba(2, 64, 89, ${0.2 + norm * 0.8})`,
                    }}
                    title={`(${r}, ${c}) = ${val}`}
                  >
                    {val}
                  </div>
                );
              })
            )}
          </div>
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
          <TrendingUp className="w-4 h-4 text-[#4DABCF]" />
          <span>{chart.title}</span>
        </div>

        <div className="flex justify-center pt-2">
          <svg viewBox={`0 0 ${width} ${height}`} className="w-full max-w-sm overflow-visible">
            <line x1={pad} y1={height - pad} x2={width - pad} y2={height - pad} stroke="var(--border-color, #cbd5e1)" strokeWidth="1.5" />
            <line x1={pad} y1={pad} x2={pad} y2={height - pad} stroke="var(--border-color, #cbd5e1)" strokeWidth="1.5" />
            <polyline fill="none" stroke="#4DABCF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" points={polylinePoints} />
            {points.map((p, idx) => (
              <circle key={idx} cx={p.cx} cy={p.cy} r="4" fill="#024059" stroke="#4DABCF" strokeWidth="1.5">
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
