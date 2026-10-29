import React, { useState } from 'react';
import { Award, Clock, Printer, RotateCcw, ChevronDown, ChevronUp, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { ExamConfig, Question, StudentAttempt } from '../types/exam';
import { gradeSingleQuestionAuto } from '../utils/grading';

interface ResultScreenProps {
  config: ExamConfig;
  attempt: StudentAttempt;
  questions: Question[];
  onStartNewExam: () => void;
}

export const ResultScreen: React.FC<ResultScreenProps> = ({
  config,
  attempt,
  questions,
  onStartNewExam
}) => {
  const [showDetail, setShowDetail] = useState(false);

  // Time calculations
  const durationSeconds = Math.max(
    0,
    Math.round(((attempt.submittedAt || Date.now()) - attempt.startedAt) / 1000)
  );
  const durationMinutes = Math.floor(durationSeconds / 60);
  const durationRemSec = durationSeconds % 60;
  const timeTakenFormatted = `${durationMinutes} phút ${durationRemSec} giây`;

  const startDateFormatted = new Date(attempt.startedAt).toLocaleTimeString('vi-VN', {
    hour: '2-digit',
    minute: '2-digit'
  });
  const submitDateFormatted = new Date(attempt.submittedAt || Date.now()).toLocaleTimeString(
    'vi-VN',
    { hour: '2-digit', minute: '2-digit' }
  );

  // Count question stats
  const totalQuestions = questions.length;
  let answeredCount = 0;
  for (const q of questions) {
    const a = attempt.answers[q.id];
    if (a) answeredCount++;
  }
  const unansweredCount = totalQuestions - answeredCount;

  // Check pending essays
  const essayQuestions = questions.filter(q => q.type === 'essay');
  const hasPendingEssay = essayQuestions.length > 0 && attempt.status !== 'graded';

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F0F4FF] via-[#FAF5FF] to-[#F0FDF4] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Celebration Header Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xl text-center space-y-4 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#16B886] via-[#3478F6] to-[#7548E8]" />

          <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-tr from-emerald-400 to-[#16B886] flex items-center justify-center text-white shadow-lg shadow-emerald-200">
            <Award className="w-10 h-10" />
          </div>

          <div>
            <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-slate-800">
              CHÚC MỪNG EM ĐÃ HOÀN THÀNH BÀI THI! 🎉
            </h1>
            <p className="text-sm font-medium text-slate-500 mt-1">
              Bài thi của em đã được hệ thống ghi nhận thành công.
            </p>
          </div>

          {/* Student Info Pill Strip */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 grid grid-cols-2 sm:grid-cols-4 gap-3 text-left">
            <div>
              <div className="text-[11px] text-slate-400 font-bold uppercase">Số báo danh</div>
              <div className="text-base font-extrabold text-slate-800 font-mono">
                {attempt.studentCode}
              </div>
            </div>
            <div>
              <div className="text-[11px] text-slate-400 font-bold uppercase">Họ và tên</div>
              <div className="text-sm font-bold text-slate-800 truncate">
                {attempt.studentName || 'Học sinh'}
              </div>
            </div>
            <div>
              <div className="text-[11px] text-slate-400 font-bold uppercase">Mã đề</div>
              <div className="text-base font-extrabold text-[#3478F6] font-mono">
                {attempt.examCode}
              </div>
            </div>
            <div>
              <div className="text-[11px] text-slate-400 font-bold uppercase">Thời gian làm</div>
              <div className="text-sm font-bold text-slate-800 font-mono">
                {timeTakenFormatted}
              </div>
            </div>
          </div>

          {/* Score Badge */}
          {config.showScoreAfterSubmit && (
            <div className="py-4 px-6 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200/80 max-w-md mx-auto space-y-1">
              <div className="text-xs font-bold uppercase tracking-wider text-blue-700">
                {hasPendingEssay ? 'Điểm tự động chấm được (Tạm tính)' : 'Điểm tổng kết bài thi'}
              </div>
              <div className="text-4xl sm:text-5xl font-black text-[#3478F6] font-mono tabular-nums">
                {attempt.status === 'graded'
                  ? attempt.totalScore.toFixed(2)
                  : attempt.autoScore.toFixed(2)}
                <span className="text-lg sm:text-xl font-normal text-slate-400 ml-1">/ 10</span>
              </div>
              {hasPendingEssay && (
                <p className="text-xs text-amber-700 font-medium pt-1">
                  * Có {essayQuestions.length} câu tự luận đang chờ thầy/cô chấm điểm chính thức.
                </p>
              )}
            </div>
          )}

          {/* Summary Breakdown Metrics */}
          <div className="grid grid-cols-3 gap-3 pt-2">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <div className="text-lg sm:text-xl font-black text-slate-800 font-mono">
                {totalQuestions}
              </div>
              <div className="text-[11px] text-slate-500 font-medium">Tổng số câu</div>
            </div>
            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800">
              <div className="text-lg sm:text-xl font-black font-mono">{answeredCount}</div>
              <div className="text-[11px] font-medium">Đã trả lời</div>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-600">
              <div className="text-lg sm:text-xl font-black font-mono">{unansweredCount}</div>
              <div className="text-[11px] font-medium">Chưa làm</div>
            </div>
          </div>

          {/* Timestamp Info */}
          <div className="text-xs text-slate-400 flex items-center justify-center gap-2 pt-2">
            <Clock className="w-3.5 h-3.5" />
            <span>Bắt đầu lúc {startDateFormatted}</span>
            <span>·</span>
            <span>Nộp bài lúc {submitDateFormatted}</span>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-4 border-t border-slate-100 no-print">
            {config.showAnswersAfterSubmit && (
              <button
                type="button"
                onClick={() => setShowDetail(!showDetail)}
                className="px-4 py-2.5 rounded-xl bg-white border border-slate-200 hover:border-slate-300 text-slate-700 font-bold text-xs sm:text-sm flex items-center gap-2 shadow-2xs transition cursor-pointer"
              >
                <span>{showDetail ? 'Ẩn chi tiết bài làm' : 'XEM CHI TIẾT KẾT QUẢ'}</span>
                {showDetail ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
            )}

            <button
              type="button"
              onClick={handlePrint}
              className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs sm:text-sm flex items-center gap-2 transition cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>In kết quả / Lưu PDF</span>
            </button>

            {config.allowRetake && (
              <button
                type="button"
                onClick={onStartNewExam}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#3478F6] to-[#7548E8] hover:from-[#2B66DE] hover:to-[#6539DC] text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-md shadow-indigo-100 transition cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>LÀM BÀI KHÁC</span>
              </button>
            )}
          </div>
        </div>

        {/* Detailed Question Review List (if toggled) */}
        {showDetail && config.showAnswersAfterSubmit && (
          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm space-y-4">
            <h2 className="text-base font-bold text-slate-800 uppercase tracking-wide">
              Chi tiết các câu hỏi và đáp án
            </h2>

            <div className="space-y-4">
              {questions.map((q, idx) => {
                const ans = attempt.answers[q.id];
                const { score, maxScore, isFullyGraded } = gradeSingleQuestionAuto(q, ans);
                const isCorrect = score === maxScore && maxScore > 0;

                return (
                  <div
                    key={q.id}
                    className={`p-4 rounded-2xl border text-left space-y-2 transition ${
                      q.type === 'essay'
                        ? 'bg-purple-50/40 border-purple-200'
                        : isCorrect
                        ? 'bg-emerald-50/50 border-emerald-200'
                        : 'bg-rose-50/40 border-rose-200'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      <div className="flex items-center gap-2">
                        {q.type === 'essay' ? (
                          <span className="w-5 h-5 rounded-full bg-purple-600 text-white flex items-center justify-center text-xs font-bold">
                            IV
                          </span>
                        ) : isCorrect ? (
                          <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
                        ) : (
                          <XCircle className="w-5 h-5 text-rose-500 shrink-0" />
                        )}
                        <span className="font-bold text-sm text-slate-800">
                          Câu {idx + 1}. ({q.points} điểm)
                        </span>
                      </div>

                      <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-md bg-white border border-slate-200">
                        {q.type === 'essay' && !isFullyGraded
                          ? `Tự động: ${score}đ / Chờ giáo viên`
                          : `Đạt: ${score} / ${maxScore} điểm`}
                      </span>
                    </div>

                    <div className="text-xs sm:text-sm text-slate-700 font-medium">
                      {q.content}
                    </div>

                    {/* Show explanation or correct answer */}
                    {q.type === 'multiple_choice' && (
                      <div className="text-xs space-y-1 pt-1 border-t border-slate-200/50">
                        <div>
                          <span className="text-slate-500">Em chọn: </span>
                          <strong className={isCorrect ? 'text-emerald-700' : 'text-rose-700'}>
                            {ans && ans.type === 'multiple_choice' && ans.selectedOption
                              ? ans.selectedOption
                              : '(Chưa chọn)'}
                          </strong>
                        </div>
                        <div>
                          <span className="text-slate-500">Đáp án đúng: </span>
                          <strong className="text-emerald-700">{q.correctAnswer}</strong>
                        </div>
                        {q.explanation && (
                          <p className="text-slate-500 italic mt-0.5">{q.explanation}</p>
                        )}
                      </div>
                    )}

                    {q.type === 'short_answer' && (
                      <div className="text-xs space-y-1 pt-1 border-t border-slate-200/50">
                        <div>
                          <span className="text-slate-500">Em ghi: </span>
                          <strong className={isCorrect ? 'text-emerald-700' : 'text-rose-700'}>
                            {ans && ans.type === 'short_answer' && ans.value ? ans.value : '(Trống)'}
                          </strong>
                        </div>
                        <div>
                          <span className="text-slate-500">Đáp án chuẩn: </span>
                          <strong className="text-emerald-700">
                            {(q.correctAnswers || []).join(' hoặc ')}
                          </strong>
                        </div>
                      </div>
                    )}

                    {q.type === 'essay' && (
                      <div className="text-xs space-y-2 pt-1 border-t border-purple-200">
                        <div className="text-purple-800 font-semibold">
                          Bài làm tự luận của em đã được lưu để giáo viên chấm điểm.
                        </div>
                        {q.gradingCriteria && (
                          <div className="text-slate-500 text-[11px]">
                            <strong>Tiêu chí chấm: </strong>
                            {q.gradingCriteria}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
