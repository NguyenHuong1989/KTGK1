import React from 'react';
import { Info, HelpCircle } from 'lucide-react';
import { EssaySubItem } from '../../types/exam';

interface EssayQuestionProps {
  essayItems?: EssaySubItem[];
  answers: Record<string, string>;
  showNoDiacriticsNotice?: boolean;
  onItemAnswerChange: (itemId: string, value: string) => void;
}

export const EssayQuestion: React.FC<EssayQuestionProps> = ({
  essayItems = [],
  answers,
  showNoDiacriticsNotice = true,
  onItemAnswerChange
}) => {
  return (
    <div className="mt-4 space-y-4">
      {/* Yellowish Banner as requested in Section 10 */}
      {showNoDiacriticsNotice && (
        <div className="p-3.5 rounded-xl bg-amber-50/90 border border-amber-200/80 text-amber-900 text-xs sm:text-sm flex items-start gap-2.5">
          <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <span>
            Máy chưa gõ được tiếng Việt có dấu thì em gõ không dấu cũng được, cô vẫn chấm.
          </span>
        </div>
      )}

      {/* Render Essay Sub-items (Select dropdowns or Textarea) */}
      <div className="space-y-4">
        {essayItems.map((item, idx) => {
          const val = answers[item.id] || '';

          if (item.type === 'select') {
            return (
              <div
                key={item.id}
                className="p-4 rounded-xl border border-slate-200/80 bg-slate-50/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="text-sm font-medium text-slate-800 whitespace-pre-line">
                  {item.prompt}
                </div>

                <div className="shrink-0 w-full sm:w-56">
                  <select
                    value={val}
                    onChange={e => onItemAnswerChange(item.id, e.target.value)}
                    className="w-full text-sm font-semibold py-2 px-3 bg-white border-2 border-slate-200 rounded-xl focus:border-[#3478F6] focus:ring-2 focus:ring-blue-100 outline-none cursor-pointer"
                  >
                    <option value="">-- Chọn đáp án --</option>
                    {(item.choices || []).map(ch => (
                      <option key={ch} value={ch}>
                        {ch}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            );
          }

          // Textarea item
          return (
            <div
              key={item.id}
              className="p-4 rounded-xl border border-slate-200/80 bg-white space-y-2"
            >
              <div className="text-sm font-semibold text-slate-800 flex items-start gap-2">
                <HelpCircle className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                <span>{item.prompt}</span>
              </div>

              <div className="relative">
                <textarea
                  rows={4}
                  value={val}
                  onChange={e => onItemAnswerChange(item.id, e.target.value)}
                  placeholder={item.placeholder || 'Em hãy viết câu trả lời ngắn gọn, đủ ý vào đây...'}
                  className="w-full text-sm text-slate-800 p-3.5 bg-slate-50 border-2 border-slate-200 rounded-xl focus:bg-white focus:border-[#7548E8] focus:ring-4 focus:ring-purple-100 outline-none transition resize-y leading-relaxed"
                />
                <div className="flex justify-between items-center text-[11px] text-slate-400 mt-1">
                  <span>Tự động lưu câu trả lời</span>
                  <span>{val.length} ký tự</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
