import React from 'react';
import { OptionItem } from '../../types/exam';

interface MultipleChoiceQuestionProps {
  options: OptionItem[];
  selectedOption: string | null;
  onSelectOption: (optionId: string) => void;
}

export const MultipleChoiceQuestion: React.FC<MultipleChoiceQuestionProps> = ({
  options,
  selectedOption,
  onSelectOption
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
      {options.map(opt => {
        const isSelected = selectedOption === opt.id;
        return (
          <button
            key={opt.id}
            type="button"
            onClick={() => onSelectOption(opt.id)}
            className={`p-3.5 sm:p-4 rounded-xl text-left border-2 transition-all flex items-start gap-3 cursor-pointer group ${
              isSelected
                ? 'border-[#3478F6] bg-blue-50/70 shadow-xs'
                : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/70'
            }`}
          >
            {/* Letter Badge (A, B, C, D) */}
            <span
              className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-colors ${
                isSelected
                  ? 'bg-[#3478F6] text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 group-hover:bg-slate-200'
              }`}
            >
              {opt.id}
            </span>

            {/* Option text */}
            <span
              className={`text-sm leading-relaxed ${
                isSelected ? 'text-slate-900 font-semibold' : 'text-slate-700'
              }`}
            >
              {opt.text}
            </span>
          </button>
        );
      })}
    </div>
  );
};
