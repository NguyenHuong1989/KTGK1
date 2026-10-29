import React from 'react';
import { Check, X } from 'lucide-react';
import { TrueFalseSubItem } from '../../types/exam';

interface TrueFalseQuestionProps {
  subQuestions: TrueFalseSubItem[];
  answers: Record<string, boolean | null>;
  onAnswerChange: (subId: string, value: boolean) => void;
}

export const TrueFalseQuestion: React.FC<TrueFalseQuestionProps> = ({
  subQuestions,
  answers,
  onAnswerChange
}) => {
  return (
    <div className="mt-4 space-y-3">
      {subQuestions.map(sub => {
        const currentVal = answers[sub.id];
        const isTrue = currentVal === true;
        const isFalse = currentVal === false;

        return (
          <div
            key={sub.id}
            className="p-3.5 sm:p-4 rounded-xl border border-slate-200/90 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition"
          >
            <div className="flex items-start gap-2.5 text-sm text-slate-800 leading-relaxed">
              <span className="font-bold text-[#3478F6] shrink-0 font-mono">{sub.label}</span>
              <span>{sub.statement}</span>
            </div>

            {/* Dual Choices: Đúng / Sai */}
            <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
              <button
                type="button"
                onClick={() => onAnswerChange(sub.id, true)}
                className={`px-4 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer border ${
                  isTrue
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs ring-2 ring-emerald-200'
                    : 'bg-white text-slate-700 border-slate-200 hover:border-emerald-500 hover:text-emerald-700'
                }`}
              >
                <Check className="w-3.5 h-3.5" />
                <span>ĐÚNG</span>
              </button>

              <button
                type="button"
                onClick={() => onAnswerChange(sub.id, false)}
                className={`px-4 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer border ${
                  isFalse
                    ? 'bg-rose-600 text-white border-rose-600 shadow-xs ring-2 ring-rose-200'
                    : 'bg-white text-slate-700 border-slate-200 hover:border-rose-500 hover:text-rose-700'
                }`}
              >
                <X className="w-3.5 h-3.5" />
                <span>SAI</span>
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};
