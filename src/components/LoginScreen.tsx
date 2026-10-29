import React, { useState } from 'react';
import { MonitorCheck, ShieldAlert, ArrowRight, UserCog } from 'lucide-react';
import { ExamConfig } from '../types/exam';
import { RobotMascot } from './RobotMascot';

interface LoginScreenProps {
  config: ExamConfig;
  onStartExam: (sbd: string, examCode: string, studentName?: string, studentClass?: string) => void;
  onOpenTeacher: () => void;
  resumeAvailable?: boolean;
  onResumeExam?: () => void;
  resumeInfo?: { sbd: string; code: string };
}

export const LoginScreen: React.FC<LoginScreenProps> = ({
  config,
  onStartExam,
  onOpenTeacher,
  resumeAvailable,
  onResumeExam,
  resumeInfo
}) => {
  const [sbd, setSbd] = useState('');
  const availableCodes = Object.keys(config.versions);
  const [examCode, setExamCode] = useState<string>(availableCodes[0] || '901');
  const [studentName, setStudentName] = useState('');
  const [studentClass, setStudentClass] = useState('9/1');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const GRADE_9_CLASSES = ['9/1', '9/2', '9/3', '9/4', '9/5', '9/6', '9/7', '9/8'];

  const handleStart = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanSbd = sbd.trim();

    if (!cleanSbd) {
      setErrorMsg('Em vui lòng nhập số báo danh (VD: 012 hoặc 005) trước khi bắt đầu.');
      return;
    }

    if (!examCode) {
      setErrorMsg('Em vui lòng chọn mã đề cô ghi trên bảng (901 hoặc 902).');
      return;
    }

    if (!config.versions[examCode] || !config.versions[examCode].questions.length) {
      setErrorMsg(`Mã đề ${examCode} hiện chưa có câu hỏi. Thầy cô vui lòng cấu hình đề thi.`);
      return;
    }

    setErrorMsg(null);
    onStartExam(cleanSbd, examCode, studentName.trim() || undefined, studentClass.trim() || undefined);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F0F4FF] via-[#F5F3FF] to-[#FAF5FF] flex flex-col justify-between py-8 px-4 sm:px-6 lg:px-8">
      {/* Top Bar with Teacher link */}
      <div className="max-w-6xl mx-auto w-full flex items-center justify-between pb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#3478F6] to-[#7548E8] flex items-center justify-center text-white shadow-md">
            <MonitorCheck className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs uppercase tracking-wider font-semibold text-slate-500">
              {config.schoolName}
            </div>
            <div className="text-sm font-bold text-slate-800">
              {config.subject} · {config.grade}
            </div>
          </div>
        </div>

        <button
          onClick={onOpenTeacher}
          className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-medium text-slate-600 bg-white/80 hover:bg-white border border-slate-200/90 hover:border-[#3478F6] transition shadow-xs hover:text-[#3478F6] cursor-pointer"
        >
          <UserCog className="w-4 h-4 text-slate-500" />
          <span>Quản lý phòng thi (Giáo viên)</span>
        </button>
      </div>

      {/* Main Dual-Column Content */}
      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center my-auto">
        {/* LEFT COLUMN: Branding, Exam details, Instructions, Mascot, Section Badges */}
        <div className="lg:col-span-7 space-y-6">
          {/* Main Title */}
          <div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight bg-gradient-to-r from-[#3478F6] via-[#5F4BF2] to-[#7548E8] bg-clip-text text-transparent">
              PHÒNG THI TIN HỌC
            </h1>
            <p className="mt-2 text-sm sm:text-base text-slate-600 font-medium flex flex-wrap items-center gap-2">
              <span className="font-bold text-slate-800">{config.schoolName}</span>
              <span className="text-slate-300">·</span>
              <span>{config.title}</span>
              <span className="text-slate-300">·</span>
              <span>{config.subject}</span>
              <span className="text-slate-300">·</span>
              <span className="font-semibold text-blue-600">{config.durationMinutes} phút</span>
            </p>
          </div>

          {/* Resume Prompt if already in progress */}
          {resumeAvailable && onResumeExam && (
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200/80 flex items-center justify-between gap-4 shadow-xs">
              <div className="text-xs sm:text-sm text-amber-900">
                <span className="font-bold">Đang có bài thi chưa nộp:</span> SBD{' '}
                <span className="font-mono font-bold text-amber-800">{resumeInfo?.sbd}</span> · Mã đề{' '}
                <span className="font-bold text-amber-800">{resumeInfo?.code}</span>
              </div>
              <button
                type="button"
                onClick={onResumeExam}
                className="px-3.5 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold shrink-0 shadow-xs transition cursor-pointer"
              >
                Tiếp tục làm bài
              </button>
            </div>
          )}

          {/* 4 Numbered Steps */}
          <div className="bg-white/90 backdrop-blur-xs rounded-2xl p-5 border border-slate-200/80 shadow-xs space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              Hướng dẫn tham gia kiểm tra
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-slate-700">
              <div className="flex items-start gap-2.5">
                <span className="w-6 h-6 rounded-full bg-[#3478F6] text-white flex items-center justify-center text-xs font-bold shrink-0">
                  1
                </span>
                <span>Gõ số báo danh của em, chọn lớp và mã đề cô ghi trên bảng.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="w-6 h-6 rounded-full bg-[#3478F6] text-white flex items-center justify-center text-xs font-bold shrink-0">
                  2
                </span>
                <span>Làm đủ các phần thi. Ô câu nào làm xong sẽ chuyển màu xanh.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="w-6 h-6 rounded-full bg-[#3478F6] text-white flex items-center justify-center text-xs font-bold shrink-0">
                  3
                </span>
                <span>Không đóng trình duyệt. Hết 45 phút máy tự nộp bài.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="w-6 h-6 rounded-full bg-[#3478F6] text-white flex items-center justify-center text-xs font-bold shrink-0">
                  4
                </span>
                <span>Làm xong bấm NỘP BÀI, chờ màn hình chúc mừng.</span>
              </div>
            </div>
          </div>

          {/* Robot Mascot & Section Summary Cards */}
          <div className="flex flex-col sm:flex-row items-center gap-5 pt-2">
            <RobotMascot className="w-28 h-28 sm:w-32 sm:h-32 shrink-0" />
            <div className="grid grid-cols-3 gap-2.5 w-full">
              {config.sections.map(sec => (
                <div
                  key={sec.id}
                  className="rounded-2xl p-3 border border-slate-200/80 bg-white/90 shadow-xs text-center flex flex-col items-center justify-center transition hover:shadow-sm"
                >
                  <div
                    className="w-8 h-8 rounded-xl flex items-center justify-center text-white text-xs font-bold mb-1.5 shadow-xs"
                    style={{ backgroundColor: sec.color }}
                  >
                    {sec.id === 'part1' ? 'I' : sec.id === 'part2' ? 'II' : 'III'}
                  </div>
                  <div className="font-bold text-xs text-slate-800">{sec.title}</div>
                  <div className="text-[11px] text-slate-500 font-medium truncate max-w-full">
                    {sec.subtitle}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Student Login Card */}
        <div className="lg:col-span-5">
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl shadow-indigo-100/60 border border-slate-200/90 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#3478F6] via-[#7548E8] to-[#C03BE8]" />

            <form onSubmit={handleStart} className="space-y-5">
              {/* Error Message */}
              {errorMsg && (
                <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* SBD Input */}
              <div>
                <label
                  htmlFor="sbd_input"
                  className="block text-xs font-bold uppercase tracking-wide text-slate-700 mb-2"
                >
                  Số báo danh của em <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    id="sbd_input"
                    type="text"
                    value={sbd}
                    onChange={e => setSbd(e.target.value)}
                    placeholder="VD: 012"
                    maxLength={10}
                    autoComplete="off"
                    className="w-full text-center text-2xl sm:text-3xl font-extrabold tracking-widest text-slate-800 py-3.5 px-4 bg-slate-50/70 border-2 border-slate-200 rounded-2xl focus:bg-white focus:border-[#3478F6] focus:ring-4 focus:ring-blue-100 outline-none transition"
                  />
                </div>
                <p className="mt-1.5 text-center text-[11px] text-slate-400">
                  Cho phép nhập số 0 ở đầu (Ví dụ: 001, 012...)
                </p>
              </div>

              {/* Optional Name & Class Selection (9/1 -> 9/8) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div>
                  <label htmlFor="student_name" className="block text-xs font-semibold text-slate-600 mb-1">
                    Họ và tên học sinh (tùy chọn)
                  </label>
                  <input
                    id="student_name"
                    type="text"
                    value={studentName}
                    onChange={e => setStudentName(e.target.value)}
                    placeholder="VD: Nguyễn Văn An"
                    className="w-full text-xs font-medium py-2 px-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-[#3478F6] outline-none transition"
                  />
                </div>
                <div>
                  <label htmlFor="student_class" className="block text-xs font-semibold text-slate-600 mb-1">
                    Lớp <span className="text-blue-600 font-bold">*</span>
                  </label>
                  <select
                    id="student_class"
                    value={studentClass}
                    onChange={e => setStudentClass(e.target.value)}
                    className="w-full text-xs font-bold py-2 px-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-[#3478F6] outline-none transition cursor-pointer"
                  >
                    {GRADE_9_CLASSES.map(cls => (
                      <option key={cls} value={cls}>
                        Lớp {cls}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Exam Code Selector (901 & 902) */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wide text-slate-700 mb-2">
                  Mã đề (cô ghi trên bảng) <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {availableCodes.map(code => {
                    const isSelected = examCode === code;
                    const questionCount = config.versions[code]?.questions?.length || 0;
                    return (
                      <button
                        type="button"
                        key={code}
                        onClick={() => setExamCode(code)}
                        className={`p-3.5 rounded-2xl border-2 transition-all flex flex-col items-center justify-center text-center cursor-pointer ${
                          isSelected
                            ? 'border-[#3478F6] bg-blue-50/60 shadow-xs ring-2 ring-blue-200'
                            : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/60'
                        }`}
                      >
                        <span
                          className={`text-2xl font-black tracking-tight ${
                            isSelected ? 'text-[#3478F6]' : 'text-slate-700'
                          }`}
                        >
                          {code}
                        </span>
                        <span
                          className={`text-xs font-medium mt-0.5 ${
                            isSelected ? 'text-blue-700 font-bold' : 'text-slate-500'
                          }`}
                        >
                          Mã đề
                        </span>
                        <span className="text-[10px] text-slate-400 mt-0.5">
                          {questionCount} câu hỏi
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Start Button */}
              <button
                type="submit"
                className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-[#3478F6] via-[#5F4BF2] to-[#7548E8] hover:from-[#2B66DE] hover:to-[#6539DC] text-white font-extrabold text-base tracking-wider uppercase shadow-lg shadow-indigo-200/50 hover:shadow-indigo-300/60 active:scale-[0.99] transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>BẮT ĐẦU LÀM BÀI</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="max-w-6xl mx-auto w-full pt-8 text-center">
        <p className="text-xs text-slate-400">
          Trường THCS Lý Tự Trọng — Đề kiểm tra giữa học kỳ I môn Tin học 9
        </p>
      </div>
    </div>
  );
};
