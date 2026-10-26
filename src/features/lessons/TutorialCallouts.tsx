import React, { useState } from 'react';
import { cn } from '../../lib/utils';
import { Check, ChevronDown, CheckCircle2 } from 'lucide-react';

export function ConceptBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-4 p-3.5 bg-[#eef6ff] dark:bg-[#1a2e40] border-l-4 border-[#0284c7] dark:border-[#38bdf8] text-sm text-[#0f172a] dark:text-[#e2e8f0] rounded-r leading-relaxed">
      <span className="font-bold text-[#0284c7] dark:text-[#38bdf8] mr-1.5">Concept:</span>
      {children}
    </div>
  );
}

export function ProTipBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-4 p-3.5 bg-[#f0fdf4] dark:bg-[#162f22] border-l-4 border-[#16a34a] dark:border-[#22c55e] text-sm text-[#0f172a] dark:text-[#e2e8f0] rounded-r leading-relaxed">
      <span className="font-bold text-[#16a34a] dark:text-[#22c55e] mr-1.5">Pro Tip:</span>
      {children}
    </div>
  );
}

export interface KnowledgeCheckOption {
  text: string;
  isCorrect: boolean;
}

export interface KnowledgeCheckProps {
  number: number;
  question: string;
  explanation: string;
  options?: KnowledgeCheckOption[];
}

export function KnowledgeCheck({
  number,
  question,
  explanation,
  options,
}: KnowledgeCheckProps) {
  const [isRevealed, setIsRevealed] = useState(false);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  const handleSelect = (idx: number) => {
    setSelectedIdx(idx);
    setIsRevealed(true);
  };

  return (
    <div className="my-6 p-4 sm:p-5 bg-[#fffbeb] dark:bg-[#1f261e]/90 border border-[#fde68a] dark:border-[#4d401a] rounded-lg text-center space-y-3 shadow-2xs">
      <h4 className="text-xs sm:text-sm font-bold tracking-wider text-[#ea580c] dark:text-[#f59e0b] uppercase">
        KNOWLEDGE CHECK {number}
      </h4>
      <p className="text-sm font-medium text-gray-900 dark:text-[#e6edf3] max-w-xl mx-auto leading-relaxed">
        {question}
      </p>

      {options && options.length > 0 ? (
        <div className="max-w-md mx-auto space-y-2 pt-1 text-left">
          {options.map((opt, idx) => {
            const isSelected = selectedIdx === idx;
            const isAnswered = selectedIdx !== null;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => handleSelect(idx)}
                className={cn(
                  'w-full min-h-[42px] p-2.5 rounded border text-xs sm:text-sm transition-all text-left flex items-center justify-between cursor-pointer',
                  isAnswered && opt.isCorrect
                    ? 'bg-green-50 dark:bg-[#132e22] border-green-500 dark:border-green-600 font-semibold text-green-900 dark:text-green-300'
                    : isAnswered && isSelected && !opt.isCorrect
                    ? 'bg-red-50 dark:bg-[#331a1a] border-red-400 dark:border-red-600 text-red-900 dark:text-red-300'
                    : 'bg-white dark:bg-[#15202b] border-amber-200 dark:border-[#2b3e50] hover:border-amber-400 hover:dark:border-[#38bdf8] text-gray-800 dark:text-[#cbd5e1]'
                )}
              >
                <span className="leading-snug">{opt.text}</span>
                {isAnswered && opt.isCorrect && (
                  <span className="text-green-700 dark:text-green-400 font-bold text-xs shrink-0 ml-2">
                    Correct
                  </span>
                )}
              </button>
            );
          })}
        </div>
      ) : (
        <div className="max-w-md mx-auto">
          <button
            type="button"
            onClick={() => setIsRevealed((prev) => !prev)}
            className="w-full bg-white dark:bg-[#15202b] border border-[#fde68a] dark:border-[#2b3e50] hover:border-amber-400 hover:dark:border-[#38bdf8] rounded p-2.5 text-xs text-[#0066cc] dark:text-[#38bdf8] font-semibold cursor-pointer flex items-center justify-between transition-colors shadow-2xs min-h-[40px]"
          >
            <span>{isRevealed ? 'Hide answer' : 'Click to reveal answer'}</span>
            <span className="text-base font-bold text-gray-500 dark:text-gray-400">{isRevealed ? '-' : '+'}</span>
          </button>
        </div>
      )}

      {isRevealed && (
        <div className="max-w-md mx-auto p-3 bg-white/95 dark:bg-[#15202b] border border-amber-200 dark:border-[#2b3e50] rounded text-left text-xs text-gray-800 dark:text-[#cbd5e1] leading-relaxed animate-fadeIn">
          <span className="font-semibold text-amber-900 dark:text-amber-400 block mb-0.5">Answer Explanation:</span>
          <p>{explanation}</p>
        </div>
      )}
    </div>
  );
}

export function OutputBox({
  columns,
  rows,
}: {
  columns: string[];
  rows: (string | number | null)[][];
}) {
  return (
    <div className="my-3 space-y-1">
      <p className="text-xs font-semibold text-gray-700 dark:text-gray-300">Output:</p>
      <div className="border border-[#e2e8f0] dark:border-[#283b4d] rounded-lg overflow-x-auto bg-[#f8fafc] dark:bg-[#0f172a]">
        <table className="w-full text-left text-xs border-collapse">
          <thead className="bg-[#f1f5f9] dark:bg-[#15202b] border-b border-[#e2e8f0] dark:border-[#283b4d]">
            <tr>
              {columns.map((c) => (
                <th key={c} className="p-2 font-mono font-bold text-gray-800 dark:text-white">
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#e2e8f0] dark:divide-[#283b4d]">
            {rows.map((row, rIdx) => (
              <tr key={rIdx} className="hover:bg-[#f1f5f9]/60 hover:dark:bg-[#1b2a38]/60">
                {row.map((cell, cIdx) => (
                  <td key={cIdx} className="p-2 font-mono text-gray-800 dark:text-[#cbd5e1]">
                    {cell === null ? (
                      <span className="text-gray-400 dark:text-gray-500 italic">NULL</span>
                    ) : (
                      String(cell)
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
