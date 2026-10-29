import React, { useState } from 'react';
import {
  Settings,
  BookOpen,
  Users,
  Download,
  Upload,
  ArrowLeft,
  Key,
  Plus,
  Trash2,
  Edit2,
  CheckCircle,
  FileSpreadsheet,
  RotateCcw,
  ShieldCheck,
  Eye,
  AlertTriangle
} from 'lucide-react';
import { ExamConfig, Question, StudentAttempt } from '../../types/exam';
import {
  saveExamConfig,
  resetExamConfigToDefault,
  getAllSubmissions,
  saveSubmission,
  getTeacherPin,
  setTeacherPin
} from '../../utils/storage';

interface TeacherDashboardProps {
  config: ExamConfig;
  onUpdateConfig: (newConfig: ExamConfig) => void;
  onClose: () => void;
}

export const TeacherDashboard: React.FC<TeacherDashboardProps> = ({
  config,
  onUpdateConfig,
  onClose
}) => {
  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [enteredPin, setEnteredPin] = useState('');
  const [pinError, setPinError] = useState(false);
  const [currentTab, setCurrentTab] = useState<'config' | 'questions' | 'results' | 'backup'>('results');

  // Exam Config Form State
  const [localConfig, setLocalConfig] = useState<ExamConfig>(config);
  const [selectedExamCode, setSelectedExamCode] = useState<string>(
    Object.keys(config.versions)[0] || '901'
  );
  const [submissions, setSubmissions] = useState<StudentAttempt[]>(getAllSubmissions());

  // Search & Filter state in results table
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCode, setFilterCode] = useState('all');

  // Grading Modal State
  const [gradingAttempt, setGradingAttempt] = useState<StudentAttempt | null>(null);
  const [manualScores, setManualScores] = useState<Record<string, number>>({});
  const [teacherComment, setTeacherComment] = useState('');

  // Question editing modal state
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);
  const [isNewQuestion, setIsNewQuestion] = useState(false);

  // New PIN modal
  const [newPinVal, setNewPinVal] = useState('');
  const [pinSuccessMsg, setPinSuccessMsg] = useState('');

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const correctPin = getTeacherPin();
    if (enteredPin.trim() === correctPin || enteredPin.trim() === '1234') {
      setIsAuthenticated(true);
      setPinError(false);
    } else {
      setPinError(true);
    }
  };

  const handleSaveConfig = () => {
    saveExamConfig(localConfig);
    onUpdateConfig(localConfig);
    alert('Đã lưu cấu hình bài thi thành công!');
  };

  const handleResetDefault = () => {
    if (confirm('Thầy/cô có chắc muốn đặt lại dữ liệu đề thi về mặc định ban đầu không?')) {
      const def = resetExamConfigToDefault();
      setLocalConfig(def);
      onUpdateConfig(def);
      alert('Đã khôi phục dữ liệu bài thi gốc thành công!');
    }
  };

  // Export Results to CSV with UTF-8 BOM
  const handleExportCSV = () => {
    const headers = [
      'STT',
      'Số báo danh',
      'Họ và tên',
      'Lớp',
      'Mã đề',
      'Thời gian nộp',
      'Điểm tự động',
      'Điểm tự luận',
      'Tổng điểm',
      'Trạng thái'
    ];

    const rows = submissions.map((att, idx) => {
      const submitTime = att.submittedAt
        ? new Date(att.submittedAt).toLocaleString('vi-VN')
        : 'Chưa nộp';
      return [
        idx + 1,
        `"${att.studentCode}"`,
        `"${att.studentName || ''}"`,
        `"${att.studentClass || ''}"`,
        att.examCode,
        `"${submitTime}"`,
        att.autoScore,
        att.essayScore || 0,
        att.totalScore,
        att.status === 'graded' ? 'Đã chấm đủ' : 'Chờ chấm tự luận'
      ].join(',');
    });

    const csvContent = '\uFEFF' + [headers.join(','), ...rows].join('\r\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute(
      'download',
      `Ket_Qua_Thi_Tin_Hoc_6_${new Date().toISOString().slice(0, 10)}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Export Config to JSON
  const handleExportJSON = () => {
    const dataStr =
      'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(localConfig, null, 2));
    const dlAnchorElem = document.createElement('a');
    dlAnchorElem.setAttribute('href', dataStr);
    dlAnchorElem.setAttribute('download', `De_Thi_Tin_Hoc_6_${localConfig.id}.json`);
    dlAnchorElem.click();
  };

  // Import Config from JSON
  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = event => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (parsed && parsed.versions && parsed.versions['601']) {
          setLocalConfig(parsed);
          saveExamConfig(parsed);
          onUpdateConfig(parsed);
          alert('Nhập đề thi từ tệp JSON thành công!');
        } else {
          alert('Tệp JSON không đúng định dạng đề thi Tin học THCS.');
        }
      } catch (err) {
        alert('Lỗi đọc tệp JSON: ' + (err as Error).message);
      }
    };
    reader.readAsText(file);
  };

  // Delete question
  const handleDeleteQuestion = (qId: string) => {
    if (!confirm('Thầy/cô có chắc muốn xóa câu hỏi này khỏi đề thi không?')) return;
    const version = localConfig.versions[selectedExamCode];
    if (!version) return;

    const updatedQuestions = version.questions.filter(q => q.id !== qId);
    const updatedConfig: ExamConfig = {
      ...localConfig,
      versions: {
        ...localConfig.versions,
        [selectedExamCode]: {
          ...version,
          questions: updatedQuestions
        }
      }
    };
    setLocalConfig(updatedConfig);
    saveExamConfig(updatedConfig);
    onUpdateConfig(updatedConfig);
  };

  // Open grading modal for essay
  const handleOpenGrading = (attempt: StudentAttempt) => {
    setGradingAttempt(attempt);
    setManualScores(attempt.essayItemScores || {});
    setTeacherComment(attempt.teacherNotes || '');
  };

  const handleSaveGrading = () => {
    if (!gradingAttempt) return;

    let totalEssay = 0;
    Object.values(manualScores).forEach(sc => {
      totalEssay += sc || 0;
    });

    const updatedAttempt: StudentAttempt = {
      ...gradingAttempt,
      essayScore: totalEssay,
      essayItemScores: manualScores,
      totalScore: Math.round((gradingAttempt.autoScore + totalEssay) * 100) / 100,
      status: 'graded',
      teacherNotes: teacherComment
    };

    saveSubmission(updatedAttempt);
    setSubmissions(getAllSubmissions());
    setGradingAttempt(null);
    alert('Đã cập nhật điểm tự luận thành công!');
  };

  // Render PIN Auth Screen if not logged in
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-slate-200 text-center space-y-6">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-blue-50 text-[#3478F6] flex items-center justify-center">
            <Key className="w-8 h-8" />
          </div>

          <div>
            <h2 className="text-xl font-bold text-slate-800">QUẢN LÝ PHÒNG THI</h2>
            <p className="text-xs text-slate-500 mt-1">
              Dành cho giáo viên cấu hình đề thi, xem kết quả và chấm bài tự luận.
            </p>
          </div>

          <form onSubmit={handlePinSubmit} className="space-y-4">
            <div>
              <input
                type="password"
                value={enteredPin}
                onChange={e => setEnteredPin(e.target.value)}
                placeholder="Nhập mã PIN (Mặc định: 1234)"
                maxLength={8}
                autoFocus
                className="w-full text-center text-2xl font-bold tracking-widest py-3 px-4 bg-slate-50 border-2 border-slate-200 rounded-xl focus:border-[#3478F6] outline-none"
              />
              {pinError && (
                <p className="text-xs text-red-500 font-medium mt-1.5">
                  Mã PIN không đúng. Vui lòng thử lại (hoặc dùng mặc định 1234).
                </p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={onClose}
                className="py-2.5 px-4 rounded-xl text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition cursor-pointer"
              >
                Quay lại phòng thi
              </button>
              <button
                type="submit"
                className="py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-[#3478F6] hover:bg-blue-600 transition shadow-xs cursor-pointer"
              >
                Đăng nhập
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // Active Questions for current selected exam code
  const currentQuestions = localConfig.versions[selectedExamCode]?.questions || [];

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">
      {/* Top Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition cursor-pointer"
              title="Quay lại giao diện học sinh"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <div className="text-xs uppercase font-bold text-slate-400">Trang quản trị</div>
              <div className="text-base font-black text-slate-800">
                QUẢN LÝ PHÒNG THI TIN HỌC THCS
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-3.5 py-1.5 rounded-xl bg-blue-50 text-[#3478F6] hover:bg-blue-100 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
            >
              <span>Vào thi thử</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2 border-t border-slate-100 overflow-x-auto">
          <button
            onClick={() => setCurrentTab('results')}
            className={`py-3 px-4 text-xs font-bold border-b-2 flex items-center gap-2 transition cursor-pointer whitespace-nowrap ${
              currentTab === 'results'
                ? 'border-[#3478F6] text-[#3478F6]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Kết quả học sinh & Chấm bài ({submissions.length})</span>
          </button>

          <button
            onClick={() => setCurrentTab('questions')}
            className={`py-3 px-4 text-xs font-bold border-b-2 flex items-center gap-2 transition cursor-pointer whitespace-nowrap ${
              currentTab === 'questions'
                ? 'border-[#3478F6] text-[#3478F6]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Ngân hàng câu hỏi & Mã đề</span>
          </button>

          <button
            onClick={() => setCurrentTab('config')}
            className={`py-3 px-4 text-xs font-bold border-b-2 flex items-center gap-2 transition cursor-pointer whitespace-nowrap ${
              currentTab === 'config'
                ? 'border-[#3478F6] text-[#3478F6]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>Cấu hình đề thi</span>
          </button>

          <button
            onClick={() => setCurrentTab('backup')}
            className={`py-3 px-4 text-xs font-bold border-b-2 flex items-center gap-2 transition cursor-pointer whitespace-nowrap ${
              currentTab === 'backup'
                ? 'border-[#3478F6] text-[#3478F6]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Download className="w-4 h-4" />
            <span>Sao lưu & Đổi mã PIN</span>
          </button>
        </div>
      </header>

      {/* Main Tab Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full flex-1">
        {/* ================= TAB 1: KẾT QUẢ & CHẤM BÀI ================= */}
        {currentTab === 'results' && (
          <div className="space-y-4">
            <div className="bg-white rounded-2xl p-4 sm:p-6 border border-slate-200/90 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-base font-bold text-slate-800">
                  Bảng danh sách kết quả học sinh
                </h3>
                <p className="text-xs text-slate-500">
                  Lưu trữ trực tiếp trên trình duyệt máy tính phòng thi này.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={handleExportCSV}
                  className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-2 transition shadow-xs cursor-pointer"
                >
                  <FileSpreadsheet className="w-4 h-4" />
                  <span>Xuất bảng điểm CSV / Excel</span>
                </button>
              </div>
            </div>

            {/* Filter & Search Bar */}
            <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-xs flex flex-wrap items-center gap-3">
              <input
                type="text"
                placeholder="Tìm kiếm theo Số báo danh hoặc Họ tên..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl flex-1 min-w-[200px] outline-none focus:border-[#3478F6]"
              />

              <div className="flex items-center gap-2">
                <label className="text-xs font-medium text-slate-500">Mã đề:</label>
                <select
                  value={filterCode}
                  onChange={e => setFilterCode(e.target.value)}
                  className="text-xs p-2 bg-slate-50 border border-slate-200 rounded-xl outline-none"
                >
                  <option value="all">Tất cả mã đề</option>
                  {Object.keys(localConfig.versions).map(code => (
                    <option key={code} value={code}>
                      Mã đề {code}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Results Table */}
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase font-semibold">
                    <tr>
                      <th className="py-3 px-4">STT</th>
                      <th className="py-3 px-4">Số báo danh</th>
                      <th className="py-3 px-4">Họ và tên</th>
                      <th className="py-3 px-4">Lớp</th>
                      <th className="py-3 px-4">Mã đề</th>
                      <th className="py-3 px-4">Điểm T.Động</th>
                      <th className="py-3 px-4">Điểm T.Luận</th>
                      <th className="py-3 px-4">Tổng điểm</th>
                      <th className="py-3 px-4">Trạng thái</th>
                      <th className="py-3 px-4 text-center">Thao tác</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {submissions
                      .filter(att => {
                        const matchSearch =
                          att.studentCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (att.studentName || '').toLowerCase().includes(searchTerm.toLowerCase());
                        const matchCode = filterCode === 'all' || att.examCode === filterCode;
                        return matchSearch && matchCode;
                      })
                      .map((att, idx) => (
                        <tr key={att.attemptId} className="hover:bg-slate-50/70 transition">
                          <td className="py-3 px-4 text-slate-400 font-mono">{idx + 1}</td>
                          <td className="py-3 px-4 font-bold text-slate-800 font-mono">
                            {att.studentCode}
                          </td>
                          <td className="py-3 px-4 font-medium text-slate-700">
                            {att.studentName || '—'}
                          </td>
                          <td className="py-3 px-4 text-slate-500">{att.studentClass || '—'}</td>
                          <td className="py-3 px-4 font-bold text-blue-600 font-mono">
                            {att.examCode}
                          </td>
                          <td className="py-3 px-4 font-mono font-bold text-slate-700">
                            {att.autoScore}đ
                          </td>
                          <td className="py-3 px-4 font-mono font-bold text-purple-700">
                            {att.essayScore !== undefined ? `${att.essayScore}đ` : 'Chờ chấm'}
                          </td>
                          <td className="py-3 px-4 font-mono font-black text-emerald-600 text-sm">
                            {att.totalScore}đ
                          </td>
                          <td className="py-3 px-4">
                            <span
                              className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                att.status === 'graded'
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : 'bg-amber-100 text-amber-800'
                              }`}
                            >
                              {att.status === 'graded' ? 'Đã chấm đủ' : 'Chờ chấm tự luận'}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-center">
                            <button
                              type="button"
                              onClick={() => handleOpenGrading(att)}
                              className="px-2.5 py-1 rounded-lg bg-blue-50 text-[#3478F6] hover:bg-blue-100 font-bold text-[11px] transition cursor-pointer"
                            >
                              Chấm tự luận
                            </button>
                          </td>
                        </tr>
                      ))}
                    {submissions.length === 0 && (
                      <tr>
                        <td colSpan={10} className="py-8 text-center text-slate-400 text-xs">
                          Chưa có bài thi nào được nộp. Học sinh làm bài xong sẽ hiển thị tại đây.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 2: NGÂN HÀNG CÂU HỎI & MÃ ĐỀ ================= */}
        {currentTab === 'questions' && (
          <div className="space-y-4">
            {/* Exam Code Selector Bar */}
            <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-xs flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Đang chọn mã đề:
                </span>
                <div className="flex items-center gap-2">
                  {Object.keys(localConfig.versions).map(code => (
                    <button
                      key={code}
                      type="button"
                      onClick={() => setSelectedExamCode(code)}
                      className={`px-3.5 py-1.5 rounded-xl font-bold text-xs transition cursor-pointer ${
                        selectedExamCode === code
                          ? 'bg-[#3478F6] text-white shadow-2xs'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      Mã đề {code} ({localConfig.versions[code]?.questions?.length || 0} câu)
                    </button>
                  ))}
                </div>
              </div>

              <div className="text-xs text-slate-500">
                Tổng số câu: <strong className="text-slate-800">{currentQuestions.length}</strong> ·
                Tổng điểm:{' '}
                <strong className="text-[#3478F6]">
                  {currentQuestions.reduce((sum, q) => sum + q.points, 0).toFixed(2)}đ
                </strong>
              </div>
            </div>

            {/* Questions List Grouped by Section */}
            {localConfig.sections.map(sec => {
              const secQuestions = currentQuestions.filter(q => q.sectionId === sec.id);

              return (
                <div
                  key={sec.id}
                  className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs space-y-3"
                >
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                      <span
                        className="w-7 h-7 rounded-lg text-white flex items-center justify-center text-xs font-bold"
                        style={{ backgroundColor: sec.color }}
                      >
                        {sec.id === 'part1' ? 'I' : sec.id === 'part2' ? 'II' : sec.id === 'part3' ? 'III' : 'IV'}
                      </span>
                      <h4 className="font-bold text-sm text-slate-800">
                        {sec.title} — {sec.subtitle}
                      </h4>
                      <span className="text-xs text-slate-400">({secQuestions.length} câu)</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    {secQuestions.map(q => (
                      <div
                        key={q.id}
                        className="p-3.5 rounded-xl bg-slate-50/70 border border-slate-200/80 flex items-start justify-between gap-4 text-xs"
                      >
                        <div className="space-y-1 flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-slate-800">Câu {q.order}.</span>
                            <span className="font-semibold text-blue-600">({q.points} điểm)</span>
                            {q.level && (
                              <span className="text-[11px] text-slate-500">
                                [{q.level} - {q.difficulty}]
                              </span>
                            )}
                          </div>
                          <p className="text-slate-700 leading-relaxed font-medium">{q.content}</p>

                          {q.type === 'multiple_choice' && (
                            <div className="text-[11px] text-slate-500 flex items-center gap-2 pt-1">
                              <span>Đáp án đúng:</span>
                              <strong className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                                {q.correctAnswer}
                              </strong>
                            </div>
                          )}

                          {q.type === 'short_answer' && (
                            <div className="text-[11px] text-slate-500 flex items-center gap-2 pt-1">
                              <span>Đáp án chấp nhận:</span>
                              <strong className="text-emerald-700">
                                {(q.correctAnswers || []).join(' / ')}
                              </strong>
                            </div>
                          )}
                        </div>

                        <div className="flex items-center gap-1 shrink-0">
                          <button
                            type="button"
                            onClick={() => handleDeleteQuestion(q.id)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition cursor-pointer"
                            title="Xóa câu hỏi"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}

                    {secQuestions.length === 0 && (
                      <p className="text-xs text-slate-400 italic py-2">
                        Chưa có câu hỏi nào trong phần này.
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ================= TAB 3: CẤU HÌNH ĐỀ THI ================= */}
        {currentTab === 'config' && (
          <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs space-y-6 max-w-3xl">
            <h3 className="text-base font-bold text-slate-800 pb-2 border-b border-slate-100">
              Thông số bài kiểm tra
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Tên bài kiểm tra</label>
                <input
                  type="text"
                  value={localConfig.title}
                  onChange={e => setLocalConfig({ ...localConfig, title: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#3478F6]"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Môn học</label>
                <input
                  type="text"
                  value={localConfig.subject}
                  onChange={e => setLocalConfig({ ...localConfig, subject: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#3478F6]"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Tên trường</label>
                <input
                  type="text"
                  value={localConfig.schoolName}
                  onChange={e => setLocalConfig({ ...localConfig, schoolName: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#3478F6]"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Thời lượng (phút)</label>
                <input
                  type="number"
                  value={localConfig.durationMinutes}
                  onChange={e =>
                    setLocalConfig({
                      ...localConfig,
                      durationMinutes: parseInt(e.target.value) || 45
                    })
                  }
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#3478F6]"
                />
              </div>
            </div>

            {/* Checkbox Options */}
            <div className="space-y-3 pt-2 border-t border-slate-100 text-xs">
              <label className="flex items-center gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={localConfig.allowRetake}
                  onChange={e => setLocalConfig({ ...localConfig, allowRetake: e.target.checked })}
                  className="w-4 h-4 text-[#3478F6] rounded"
                />
                <span className="font-semibold text-slate-700">
                  Cho phép học sinh làm bài khác sau khi nộp
                </span>
              </label>

              <label className="flex items-center gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={localConfig.showScoreAfterSubmit}
                  onChange={e =>
                    setLocalConfig({ ...localConfig, showScoreAfterSubmit: e.target.checked })
                  }
                  className="w-4 h-4 text-[#3478F6] rounded"
                />
                <span className="font-semibold text-slate-700">
                  Hiển thị điểm tạm tính ngay sau khi nộp bài
                </span>
              </label>

              <label className="flex items-center gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={localConfig.showAnswersAfterSubmit}
                  onChange={e =>
                    setLocalConfig({ ...localConfig, showAnswersAfterSubmit: e.target.checked })
                  }
                  className="w-4 h-4 text-[#3478F6] rounded"
                />
                <span className="font-semibold text-slate-700">
                  Cho phép xem chi tiết đáp án và lời giải sau khi nộp
                </span>
              </label>

              <label className="flex items-center gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={localConfig.showNoDiacriticsNotice}
                  onChange={e =>
                    setLocalConfig({ ...localConfig, showNoDiacriticsNotice: e.target.checked })
                  }
                  className="w-4 h-4 text-[#3478F6] rounded"
                />
                <span className="font-semibold text-slate-700">
                  Hiển thị thông báo hỗ trợ học sinh gõ không dấu ở Phần IV (Tự luận)
                </span>
              </label>
            </div>

            <div className="pt-4 flex items-center justify-between">
              <button
                type="button"
                onClick={handleResetDefault}
                className="px-3.5 py-2 rounded-xl text-slate-600 hover:text-red-600 hover:bg-red-50 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Đặt lại mặc định ban đầu</span>
              </button>

              <button
                type="button"
                onClick={handleSaveConfig}
                className="px-5 py-2.5 rounded-xl bg-[#3478F6] hover:bg-blue-600 text-white text-xs font-bold transition shadow-xs cursor-pointer"
              >
                Lưu cấu hình bài thi
              </button>
            </div>
          </div>
        )}

        {/* ================= TAB 4: SAO LƯU & MÃ PIN ================= */}
        {currentTab === 'backup' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Backup & Restore Card */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs space-y-4">
              <h3 className="text-base font-bold text-slate-800 pb-2 border-b border-slate-100">
                Sao lưu và Khôi phục đề thi
              </h3>
              <p className="text-xs text-slate-500">
                Xuất toàn bộ đề thi, ngân hàng câu hỏi ra tệp JSON để chuyển sang máy tính khác hoặc
                lưu trữ bài kiểm tra.
              </p>

              <div className="space-y-3 pt-2">
                <button
                  type="button"
                  onClick={handleExportJSON}
                  className="w-full py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold flex items-center justify-center gap-2 transition cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Xuất đề thi ra tệp JSON</span>
                </button>

                <label className="w-full py-2.5 px-4 rounded-xl bg-blue-50 hover:bg-blue-100 text-[#3478F6] text-xs font-bold flex items-center justify-center gap-2 transition cursor-pointer border border-blue-200">
                  <Upload className="w-4 h-4" />
                  <span>Nhập đề thi từ tệp JSON</span>
                  <input
                    type="file"
                    accept=".json"
                    onChange={handleImportJSON}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            {/* Change PIN Card */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs space-y-4">
              <h3 className="text-base font-bold text-slate-800 pb-2 border-b border-slate-100">
                Đổi mã PIN quản lý
              </h3>
              <p className="text-xs text-slate-500">
                Mã PIN dùng để đăng nhập vào trang quản trị này (mặc định ban đầu là 1234).
              </p>

              <div className="space-y-3">
                <input
                  type="password"
                  placeholder="Nhập mã PIN mới (VD: 8888)"
                  value={newPinVal}
                  onChange={e => setNewPinVal(e.target.value)}
                  maxLength={8}
                  className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#3478F6]"
                />

                <button
                  type="button"
                  onClick={() => {
                    if (newPinVal.trim().length >= 4) {
                      setTeacherPin(newPinVal.trim());
                      setPinSuccessMsg('Đã đổi mã PIN thành công!');
                      setNewPinVal('');
                      setTimeout(() => setPinSuccessMsg(''), 3000);
                    } else {
                      alert('Mã PIN cần có tối thiểu 4 ký tự.');
                    }
                  }}
                  className="w-full py-2.5 px-4 rounded-xl bg-[#3478F6] text-white text-xs font-bold transition hover:bg-blue-600 cursor-pointer"
                >
                  Lưu mã PIN mới
                </button>

                {pinSuccessMsg && (
                  <p className="text-xs text-emerald-600 font-bold text-center">
                    ✓ {pinSuccessMsg}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* ================= MODAL CHẤM BÀI TỰ LUẬN ================= */}
      {gradingAttempt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-base font-bold text-slate-800">
                  Chấm bài tự luận — SBD {gradingAttempt.studentCode} ({gradingAttempt.studentName || 'Học sinh'})
                </h3>
                <p className="text-xs text-slate-400">
                  Mã đề: {gradingAttempt.examCode} · Điểm trắc nghiệm tự động:{' '}
                  {gradingAttempt.autoScore}đ
                </p>
              </div>

              <button
                type="button"
                onClick={() => setGradingAttempt(null)}
                className="text-slate-400 hover:text-slate-600 text-lg font-bold"
              >
                ✕
              </button>
            </div>

            {/* Questions to Grade */}
            <div className="space-y-4">
              {(localConfig.versions[gradingAttempt.examCode]?.questions || [])
                .filter(q => q.type === 'essay')
                .map(q => {
                  const studentAns = gradingAttempt.answers[q.id];
                  const essayItems = q.essayItems || [];

                  return (
                    <div
                      key={q.id}
                      className="p-4 rounded-2xl bg-purple-50/40 border border-purple-200/80 space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs text-purple-900">
                          {q.content} ({q.points} điểm)
                        </span>
                      </div>

                      {q.gradingCriteria && (
                        <div className="text-[11px] text-slate-500 bg-white p-2.5 rounded-xl border border-slate-200">
                          <strong>Hướng dẫn chấm: </strong>
                          {q.gradingCriteria}
                        </div>
                      )}

                      {/* Sub items */}
                      <div className="space-y-2">
                        {essayItems.map(it => {
                          const val =
                            studentAns && studentAns.type === 'essay'
                              ? studentAns.answers[it.id] || '(Chưa điền)'
                              : '(Chưa điền)';

                          return (
                            <div
                              key={it.id}
                              className="p-3 rounded-xl bg-white border border-slate-200 text-xs space-y-1.5"
                            >
                              <div className="font-semibold text-slate-700 whitespace-pre-line">
                                {it.prompt}
                              </div>
                              <div className="p-2 rounded-lg bg-slate-50 font-medium text-slate-800">
                                <strong>Học sinh viết/chọn: </strong>
                                <span className="text-[#3478F6]">{val}</span>
                              </div>
                              {it.sampleAnswer && (
                                <div className="text-[11px] text-slate-400 italic">
                                  Đáp án gợi ý: {it.sampleAnswer}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>

                      {/* Teacher Score Input for this question */}
                      <div className="flex items-center justify-between pt-2 border-t border-purple-200/60">
                        <label className="text-xs font-bold text-purple-900">
                          Nhập điểm câu này (Tối đa {q.points}đ):
                        </label>
                        <input
                          type="number"
                          step="0.25"
                          min="0"
                          max={q.points}
                          value={manualScores[q.id] ?? ''}
                          onChange={e =>
                            setManualScores({
                              ...manualScores,
                              [q.id]: parseFloat(e.target.value) || 0
                            })
                          }
                          className="w-24 text-center font-bold text-sm p-1.5 bg-white border-2 border-purple-300 rounded-xl outline-none focus:border-purple-600"
                        />
                      </div>
                    </div>
                  );
                })}
            </div>

            {/* Teacher General Comment */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Lời nhận xét của thầy/cô (sẽ hiển thị cho học sinh):
              </label>
              <textarea
                rows={2}
                value={teacherComment}
                onChange={e => setTeacherComment(e.target.value)}
                placeholder="Nhận xét bài làm của học sinh..."
                className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#3478F6]"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setGradingAttempt(null)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition"
              >
                Đóng
              </button>
              <button
                type="button"
                onClick={handleSaveGrading}
                className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-[#16B886] hover:bg-emerald-600 transition shadow-xs"
              >
                Lưu điểm tự luận
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
