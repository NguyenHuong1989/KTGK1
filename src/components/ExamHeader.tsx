import React from 'react';
import { MonitorCheck, Clock, Send, CheckCircle2, Menu } from 'lucide-react';

interface ExamHeaderProps {
  title: string;
  studentCode: string;
  studentName?: string;
  examCode: string;
  remainingSeconds: number;
  lastSavedAt?: number;
  onSubmitClick: () => void;
  onToggleSidebar?: () => void;
}

export const ExamHeader: React.FC<ExamHeaderProps> = ({
  title,
  studentCode,
  studentName,
  examCode,
  remainingSeconds,
  lastSavedAt,
  onSubmitClick,
  onToggleSidebar
}) => {
  const minutes = Math.floor(remainingSeconds / 60);
  const seconds = remainingSeconds % 60;
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  const isWarning = remainingSeconds < 300; // less than 5 minutes

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Left: Branding & Student info */}
        <div className="flex items-center gap-3 min-w-0">
          {onToggleSidebar && (
            <button
              onClick={onToggleSidebar}
              className="lg:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition"
              title="Mở bản đồ câu hỏi"
            >
              <Menu className="w-5 h-5" />
            </button>
          )}

          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#3478F6] to-[#7548E8] flex items-center justify-center text-white shrink-0 shadow-xs">
            <MonitorCheck className="w-5 h-5" />
          </div>

          <div className="min-w-0">
            <div className="text-sm font-bold text-slate-800 truncate">
              {title}
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
              <span>
                SBD <strong className="text-slate-800 font-mono">{studentCode}</strong>
              </span>
              {studentName && (
                <>
                  <span className="text-slate-300">·</span>
                  <span className="truncate max-w-[120px] sm:max-w-none">{studentName}</span>
                </>
              )}
              <span className="text-slate-300">·</span>
              <span>
                Mã đề <strong className="text-blue-600 font-mono">{examCode}</strong>
              </span>
            </div>
          </div>
        </div>

        {/* Center / Right: Auto-save status, Timer & Submit Button */}
        <div className="flex items-center gap-3 sm:gap-4 shrink-0">
          {/* Autosave status indicator (quiet, non-intrusive) */}
          <div className="hidden sm:flex items-center gap-1.5 text-xs text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200/60">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>Đã lưu câu trả lời</span>
          </div>

          {/* Countdown Timer */}
          <div
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border font-mono font-bold text-sm sm:text-base tabular-nums transition shadow-2xs ${
              isWarning
                ? 'bg-red-50 text-red-600 border-red-300 animate-pulse'
                : 'bg-slate-50 text-slate-800 border-slate-200'
            }`}
          >
            <Clock className={`w-4 h-4 ${isWarning ? 'text-red-500' : 'text-slate-500'}`} />
            <span>{formattedTime}</span>
          </div>

          {/* Submit Button */}
          <button
            onClick={onSubmitClick}
            className="flex items-center gap-1.5 px-4 sm:px-5 py-2 rounded-xl bg-gradient-to-r from-[#F59A38] to-[#EA580C] hover:from-[#EA580C] hover:to-[#C2410C] text-white font-bold text-xs sm:text-sm tracking-wide uppercase shadow-md shadow-orange-100/50 hover:shadow-orange-200/70 active:scale-95 transition cursor-pointer"
          >
            <Send className="w-4 h-4" />
            <span>NỘP BÀI</span>
          </button>
        </div>
      </div>
    </header>
  );
};
