import React from 'react';

interface ShortAnswerQuestionProps {
  value: string;
  placeholder?: string;
  isNumeric?: boolean;
  onChange: (val: string) => void;
}

export const ShortAnswerQuestion: React.FC<ShortAnswerQuestionProps> = ({
  value,
  placeholder = 'Nhập câu trả lời của em vào đây...',
  isNumeric,
  onChange
}) => {
  return (
    <div className="mt-4 space-y-2">
      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        <div className="relative flex-1 max-w-md">
          <input
            type="text"
            value={value}
            onChange={e => onChange(e.target.value)}
            placeholder={placeholder}
            className="w-full text-base sm:text-lg font-semibold text-slate-800 py-3 px-4 bg-slate-50 border-2 border-slate-200 rounded-xl focus:bg-white focus:border-[#3478F6] focus:ring-4 focus:ring-blue-100 outline-none transition"
          />
        </div>

        {value.trim().length > 0 && (
          <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1.5 rounded-lg border border-emerald-200 self-start sm:self-center">
            ✓ Đã ghi nhận đáp án
          </span>
        )}
      </div>

      <p className="text-xs text-slate-400">
        {isNumeric
          ? 'Gợi ý: Ghi một số (ví dụ: 8 hoặc 1024)'
          : 'Gợi ý: Gõ từ hoặc cụm từ ngắn gọn, chính xác.'}
      </p>
    </div>
  );
};
