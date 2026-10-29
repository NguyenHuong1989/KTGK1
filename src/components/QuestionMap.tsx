import React from 'react';
import { Bookmark, Check, AlertCircle } from 'lucide-react';
import { ExamSection, Question, StudentAnswer } from '../types/exam';
import { getQuestionStatus } from '../utils/grading';

interface QuestionMapProps {
  sections: ExamSection[];
  questions: Question[];
  currentSectionId: string;
  currentQuestionId: string;
  answers: Record<string, StudentAnswer>;
  markedQuestions: string[];
  onSelectSection: (sectionId: string) => void;
  onSelectQuestion: (questionId: string) => void;
}

export const QuestionMap: React.FC<QuestionMapProps> = ({
  sections,
  questions,
  currentSectionId,
  currentQuestionId,
  answers,
  markedQuestions,
  onSelectSection,
  onSelectQuestion
}) => {
  // Compute progress for each section
  const sectionStats = sections.map(sec => {
    const secQuestions = questions.filter(q => q.sectionId === sec.id);
    const total = secQuestions.length;
    const completed = secQuestions.filter(
      q => getQuestionStatus(q, answers[q.id]) === 'completed'
    ).length;
    return {
      id: sec.id,
      title: sec.title,
      subtitle: sec.subtitle,
      completed,
      total
    };
  });

  // Helper to format button label in question map
  const getQuestionBadgeLabel = (q: Question): string => {
    if (q.type === 'essay') return `TL.${q.order}`;
    return `${q.order}`;
  };

  return (
    <aside className="w-full lg:w-[280px] shrink-0 space-y-4">
      {/* 6.1: 4 Section Navigation Tabs */}
      <div className="bg-white rounded-2xl p-3 border border-slate-200/90 shadow-xs space-y-1.5">
        <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-2 py-1">
          Các phần thi
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-1 gap-1.5">
          {sectionStats.map(sec => {
            const isActive = currentSectionId === sec.id;
            const isAllDone = sec.total > 0 && sec.completed === sec.total;
            return (
              <button
                key={sec.id}
                type="button"
                onClick={() => onSelectSection(sec.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left transition cursor-pointer text-xs ${
                  isActive
                    ? 'bg-blue-50/80 text-[#3478F6] font-bold border-2 border-[#3478F6] shadow-2xs'
                    : 'bg-slate-50/70 hover:bg-slate-100 text-slate-700 font-medium border border-transparent'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span>{sec.title}</span>
                  {isAllDone && <Check className="w-3.5 h-3.5 text-emerald-600" />}
                </div>
                <span
                  className={`font-mono text-[11px] px-1.5 py-0.5 rounded-md ${
                    isAllDone
                      ? 'bg-emerald-100 text-emerald-800 font-bold'
                      : isActive
                      ? 'bg-blue-100 text-[#3478F6] font-bold'
                      : 'bg-slate-200/70 text-slate-600'
                  }`}
                >
                  {sec.completed}/{sec.total}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 6.2: Question Map Grid */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-700">
            Bản đồ câu hỏi
          </div>
          <div className="text-[11px] text-slate-400 font-medium">
            {questions.filter(q => getQuestionStatus(q, answers[q.id]) === 'completed').length}/
            {questions.length} đã xong
          </div>
        </div>

        {/* Dynamic Buttons Grid */}
        <div className="grid grid-cols-5 gap-1.5">
          {questions.map(q => {
            const status = getQuestionStatus(q, answers[q.id]);
            const isCurrent = currentQuestionId === q.id;
            const isMarked = markedQuestions.includes(q.id);

            // Styling rules based on spec:
            // - Xanh lá: câu đã làm xong
            // - Vàng nhạt: câu làm chưa hết
            // - Trắng/xám nhạt: câu chưa làm
            // - Viền xanh dương: câu đang xem
            // - Viền cam / cờ cam: câu đánh dấu xem lại
            let bgClass = 'bg-slate-100 text-slate-700 hover:bg-slate-200 border-slate-200';
            if (status === 'completed') {
              bgClass = 'bg-emerald-500 text-white hover:bg-emerald-600 border-emerald-600';
            } else if (status === 'partial') {
              bgClass = 'bg-amber-100 text-amber-900 hover:bg-amber-200 border-amber-300';
            }

            return (
              <button
                key={q.id}
                type="button"
                onClick={() => {
                  onSelectSection(q.sectionId);
                  onSelectQuestion(q.id);
                }}
                title={`Câu ${getQuestionBadgeLabel(q)}: ${
                  status === 'completed'
                    ? 'Đã làm xong'
                    : status === 'partial'
                    ? 'Làm chưa hết'
                    : 'Chưa làm'
                }${isMarked ? ' (Đánh dấu xem lại)' : ''}`}
                className={`relative h-9 rounded-lg font-mono text-xs font-bold transition flex items-center justify-center cursor-pointer border ${bgClass} ${
                  isCurrent ? 'ring-2 ring-[#3478F6] ring-offset-1 scale-105 z-10' : ''
                } ${isMarked ? 'ring-2 ring-orange-400' : ''}`}
              >
                <span>{getQuestionBadgeLabel(q)}</span>

                {/* Marked Flag Icon in corner */}
                {isMarked && (
                  <span
                    className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-orange-500 text-white flex items-center justify-center shadow-xs"
                    title="Đánh dấu xem lại"
                  >
                    <Bookmark className="w-2.5 h-2.5 fill-white" />
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Legend */}
        <div className="pt-2 border-t border-slate-100 space-y-1.5 text-[11px] text-slate-600 font-medium">
          <div className="flex items-center gap-2">
            <span className="w-3.5 h-3.5 rounded bg-emerald-500 shrink-0" />
            <span>Đã làm xong</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3.5 h-3.5 rounded bg-amber-100 border border-amber-300 shrink-0" />
            <span>Làm chưa hết</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3.5 h-3.5 rounded bg-slate-100 border border-slate-200 shrink-0" />
            <span>Chưa làm</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3.5 h-3.5 rounded border-2 border-orange-400 bg-white flex items-center justify-center shrink-0">
              <Bookmark className="w-2 h-2 text-orange-500 fill-orange-500" />
            </span>
            <span>Đã đánh dấu xem lại</span>
          </div>
        </div>
      </div>
    </aside>
  );
};
