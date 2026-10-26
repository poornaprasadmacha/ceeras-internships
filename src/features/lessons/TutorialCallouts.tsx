import React, { useState } from 'react';
import { cn } from '../../lib/utils';
import { Check, ChevronDown, CheckCircle2 } from 'lucide-react';

export function ConceptBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-4 p-3.5 bg-[#eef6ff] border-l-4 border-[#0284c7] text-sm text-[#0f172a] rounded-r leading-relaxed">
      <span className="font-bold text-[#0284c7] mr-1.5">Concept:</span>
      {children}
    </div>
  );
}

export function ProTipBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-4 p-3.5 bg-[#f0fdf4] border-l-4 border-[#16a34a] text-sm text-[#0f172a] rounded-r leading-relaxed">
      <span className="font-bold text-[#16a34a] mr-1.5">Pro Tip:</span>
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
    <div className="my-6 p-4 sm:p-5 bg-[#fffbeb] border border-[#fde68a] rounded-lg text-center space-y-3 shadow-2xs">
      <h4 className="text-xs sm:text-sm font-bold tracking-wider text-[#ea580c] uppercase">
        KNOWLEDGE CHECK {number}
      </h4>
      <p className="text-sm font-medium text-gray-900 max-w-xl mx-auto leading-relaxed">
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
                    ? 'bg-green-50 border-green-500 font-semibold text-green-900'
                    : isAnswered && isSelected && !opt.isCorrect
                    ? 'bg-red-50 border-red-400 text-red-900'
                    : 'bg-white border-amber-200 hover:border-amber-400 text-gray-800'
                )}
              >
                <span className="leading-snug">{opt.text}</span>
                {isAnswered && opt.isCorrect && (
                  <span className="text-green-700 font-bold text-xs shrink-0 ml-2">
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
            className="w-full bg-white border border-[#fde68a] hover:border-amber-400 rounded p-2.5 text-xs text-[#0066cc] font-semibold cursor-pointer flex items-center justify-between transition-colors shadow-2xs min-h-[40px]"
          >
            <span>{isRevealed ? 'Hide answer' : 'Click to reveal answer'}</span>
            <span className="text-base font-bold text-gray-500">{isRevealed ? '-' : '+'}</span>
          </button>
        </div>
      )}

      {isRevealed && (
        <div className="max-w-md mx-auto p-3 bg-white/95 border border-amber-200 rounded text-left text-xs text-gray-800 leading-relaxed animate-fadeIn">
          <span className="font-semibold text-amber-900 block mb-0.5">Answer Explanation:</span>
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
      <p className="text-xs font-semibold text-gray-700">Output:</p>
      <div className="border border-[#e2e8f0] rounded-lg overflow-x-auto bg-[#f8fafc]">
        <table className="w-full text-left text-xs border-collapse">
          <thead className="bg-[#f1f5f9] border-b border-[#e2e8f0]">
            <tr>
              {columns.map((c) => (
                <th key={c} className="p-2 font-mono font-bold text-gray-800">
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#e2e8f0]">
            {rows.map((row, rIdx) => (
              <tr key={rIdx} className="hover:bg-[#f1f5f9]/60">
                {row.map((cell, cIdx) => (
                  <td key={cIdx} className="p-2 font-mono text-gray-800">
                    {cell === null ? (
                      <span className="text-gray-400 italic">NULL</span>
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
