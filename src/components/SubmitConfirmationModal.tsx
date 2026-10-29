import React from 'react';
import { FileCheck, AlertTriangle, ArrowLeft, Send } from 'lucide-react';

interface SubmitConfirmationModalProps {
  isOpen: boolean;
  unansweredLabels: string[];
  totalQuestions: number;
  completedCount: number;
  onCancel: () => void;
  onConfirmSubmit: () => void;
  onJumpToQuestion?: (label: string) => void;
}

export const SubmitConfirmationModal: React.FC<SubmitConfirmationModalProps> = ({
  isOpen,
  unansweredLabels,
  totalQuestions,
  completedCount,
  onCancel,
  onConfirmSubmit,
  onJumpToQuestion
}) => {
  if (!isOpen) return null;

  const hasUnanswered = unansweredLabels.length > 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs transition-opacity animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200/90 space-y-6 relative">
        {/* Top Icon */}
        <div className="flex items-center justify-center">
          <div
            className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-md ${
              hasUnanswered
                ? 'bg-amber-100 text-amber-600'
                : 'bg-emerald-100 text-emerald-600'
            }`}
          >
            {hasUnanswered ? (
              <AlertTriangle className="w-8 h-8" />
            ) : (
              <FileCheck className="w-8 h-8" />
            )}
          </div>
        </div>

        {/* Title */}
        <div className="text-center space-y-1">
          <h3 className="text-xl sm:text-2xl font-black text-slate-800">
            Em chắc chắn nộp bài?
          </h3>
          <p className="text-xs sm:text-sm text-slate-500">
            {hasUnanswered ? (
              <>
                Em đã làm xong <strong className="text-emerald-600">{completedCount}</strong>/
                {totalQuestions} câu.
              </>
            ) : (
              'Tuyệt vời! Em đã hoàn thành tất cả các câu hỏi trong đề thi.'
            )}
          </p>
        </div>

        {/* Unanswered Questions Warning & Badges */}
        {hasUnanswered && (
          <div className="bg-amber-50/80 rounded-2xl p-4 border border-amber-200/80 space-y-2.5">
            <div className="text-xs font-bold text-amber-900 flex items-center gap-1.5">
              <span>Em còn</span>
              <span className="font-extrabold text-amber-700 bg-amber-200/80 px-2 py-0.5 rounded-md text-sm">
                {unansweredLabels.length}
              </span>
              <span>câu chưa làm xong:</span>
            </div>

            <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto pr-1">
              {unansweredLabels.map(lbl => (
                <button
                  key={lbl}
                  type="button"
                  onClick={() => onJumpToQuestion && onJumpToQuestion(lbl)}
                  title={`Bấm để chuyển nhanh tới câu ${lbl}`}
                  className="px-2.5 py-1 rounded-lg text-xs font-mono font-bold bg-white hover:bg-amber-100 text-amber-900 border border-amber-300 shadow-2xs transition cursor-pointer"
                >
                  {lbl}
                </button>
              ))}
            </div>

            <p className="text-[11px] text-amber-700/90 italic">
              (Bấm vào từng câu trên để quay lại làm tiếp)
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          <button
            type="button"
            onClick={onCancel}
            className="py-3 px-4 rounded-xl text-slate-700 bg-slate-100 hover:bg-slate-200 font-bold text-xs sm:text-sm transition flex items-center justify-center gap-2 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>QUAY LẠI LÀM TIẾP</span>
          </button>

          <button
            type="button"
            onClick={onConfirmSubmit}
            className="py-3 px-4 rounded-xl text-white bg-gradient-to-r from-[#F59A38] to-[#EA580C] hover:from-[#EA580C] hover:to-[#C2410C] font-extrabold text-xs sm:text-sm uppercase tracking-wide transition shadow-md shadow-orange-100 flex items-center justify-center gap-2 cursor-pointer"
          >
            <Send className="w-4 h-4" />
            <span>NỘP BÀI NGAY</span>
          </button>
        </div>
      </div>
    </div>
  );
};
