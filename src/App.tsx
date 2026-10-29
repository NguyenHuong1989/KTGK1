/**
 * PHÒNG THI TIN HỌC – KIỂM TRA TRỰC TUYẾN THCS
 * Theo Chương trình Giáo dục phổ thông 2018
 */

import React, { useState, useEffect, useRef } from 'react';
import { ExamConfig, StudentAttempt, StudentAnswer, Question } from './types/exam';
import {
  getExamConfig,
  getCurrentAttempt,
  saveCurrentAttempt,
  clearCurrentAttempt,
  saveSubmission
} from './utils/storage';
import { evaluateExamAttempt } from './utils/grading';
import { LoginScreen } from './components/LoginScreen';
import { ExamHeader } from './components/ExamHeader';
import { QuestionMap } from './components/QuestionMap';
import { QuestionCard } from './components/QuestionCard';
import { SubmitConfirmationModal } from './components/SubmitConfirmationModal';
import { ResultScreen } from './components/ResultScreen';
import { TeacherDashboard } from './components/teacher/TeacherDashboard';
import { Info, X } from 'lucide-react';

export default function App() {
  const [config, setConfig] = useState<ExamConfig>(getExamConfig);
  const [currentScreen, setCurrentScreen] = useState<'login' | 'exam' | 'result' | 'teacher'>('login');
  const [currentAttempt, setCurrentAttempt] = useState<StudentAttempt | null>(getCurrentAttempt);
  const [selectedSectionId, setSelectedSectionId] = useState<string>('part1');
  const [selectedQuestionId, setSelectedQuestionId] = useState<string>('');
  const [remainingSeconds, setRemainingSeconds] = useState<number>(45 * 60);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [lastSavedAt, setLastSavedAt] = useState<number>(Date.now());

  // Restore session on load if active
  useEffect(() => {
    const existing = getCurrentAttempt();
    if (existing) {
      setCurrentAttempt(existing);
      if (existing.status === 'submitted' || existing.status === 'graded') {
        setCurrentScreen('result');
      } else {
        const totalDurationSec = config.durationMinutes * 60;
        const elapsedSec = Math.floor((Date.now() - existing.startedAt) / 1000);
        const rem = Math.max(0, totalDurationSec - elapsedSec);
        setRemainingSeconds(rem);
        if (rem <= 0) {
          // Time expired while away
          handleAutoSubmit(existing);
        }
      }
    }
  }, [config.durationMinutes]);

  // Timer Countdown Effect
  useEffect(() => {
    if (currentScreen !== 'exam' || !currentAttempt || currentAttempt.status !== 'in_progress') {
      return;
    }

    const timer = setInterval(() => {
      const totalDurationSec = config.durationMinutes * 60;
      const elapsedSec = Math.floor((Date.now() - currentAttempt.startedAt) / 1000);
      const rem = Math.max(0, totalDurationSec - elapsedSec);

      setRemainingSeconds(rem);

      if (rem <= 0) {
        clearInterval(timer);
        handleAutoSubmit(currentAttempt);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [currentScreen, currentAttempt, config.durationMinutes]);

  // Questions for active exam code
  const activeQuestions: Question[] = React.useMemo(() => {
    if (!currentAttempt) return [];
    const ver = config.versions[currentAttempt.examCode];
    return ver ? ver.questions : [];
  }, [config, currentAttempt]);

  // Set default selected question when entering exam
  useEffect(() => {
    if (activeQuestions.length > 0 && !selectedQuestionId) {
      setSelectedQuestionId(activeQuestions[0].id);
      setSelectedSectionId(activeQuestions[0].sectionId);
    }
  }, [activeQuestions, selectedQuestionId]);

  // Start new exam session
  const handleStartExam = (
    sbd: string,
    examCode: string,
    studentName?: string,
    studentClass?: string
  ) => {
    const newAttempt: StudentAttempt = {
      attemptId: `att_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      examId: config.id,
      examCode,
      studentCode: sbd,
      studentName,
      studentClass,
      startedAt: Date.now(),
      answers: {},
      markedQuestions: [],
      status: 'in_progress',
      autoScore: 0,
      essayScore: 0,
      totalScore: 0
    };

    saveCurrentAttempt(newAttempt);
    setCurrentAttempt(newAttempt);
    setRemainingSeconds(config.durationMinutes * 60);

    const questions = config.versions[examCode]?.questions || [];
    if (questions.length > 0) {
      setSelectedQuestionId(questions[0].id);
      setSelectedSectionId(questions[0].sectionId);
    }

    setCurrentScreen('exam');
  };

  // Resume unfinished exam session
  const handleResumeExam = () => {
    if (!currentAttempt) return;
    const totalDurationSec = config.durationMinutes * 60;
    const elapsedSec = Math.floor((Date.now() - currentAttempt.startedAt) / 1000);
    const rem = Math.max(0, totalDurationSec - elapsedSec);

    setRemainingSeconds(rem);
    if (rem <= 0) {
      handleAutoSubmit(currentAttempt);
    } else {
      const questions = config.versions[currentAttempt.examCode]?.questions || [];
      if (questions.length > 0 && !selectedQuestionId) {
        setSelectedQuestionId(questions[0].id);
        setSelectedSectionId(questions[0].sectionId);
      }
      setCurrentScreen('exam');
    }
  };

  // Handle Student Answer Change (with instant auto-save)
  const handleAnswerChange = (questionId: string, answer: StudentAnswer) => {
    if (!currentAttempt || currentAttempt.status !== 'in_progress') return;

    const updatedAnswers = {
      ...currentAttempt.answers,
      [questionId]: answer
    };

    const evaluation = evaluateExamAttempt(activeQuestions, {
      ...currentAttempt,
      answers: updatedAnswers
    });

    const updatedAttempt: StudentAttempt = {
      ...currentAttempt,
      answers: updatedAnswers,
      autoScore: evaluation.autoScore,
      totalScore: evaluation.autoScore + (currentAttempt.essayScore || 0)
    };

    setCurrentAttempt(updatedAttempt);
    saveCurrentAttempt(updatedAttempt);
    setLastSavedAt(Date.now());
  };

  // Toggle Review Bookmark
  const handleToggleMark = (questionId: string) => {
    if (!currentAttempt || currentAttempt.status !== 'in_progress') return;

    const isMarked = currentAttempt.markedQuestions.includes(questionId);
    const updatedMarked = isMarked
      ? currentAttempt.markedQuestions.filter(id => id !== questionId)
      : [...currentAttempt.markedQuestions, questionId];

    const updatedAttempt: StudentAttempt = {
      ...currentAttempt,
      markedQuestions: updatedMarked
    };

    setCurrentAttempt(updatedAttempt);
    saveCurrentAttempt(updatedAttempt);
  };

  // Final submission action
  const handleConfirmSubmit = () => {
    if (!currentAttempt || currentAttempt.status !== 'in_progress') return;

    const evaluation = evaluateExamAttempt(activeQuestions, currentAttempt);

    const submittedAttempt: StudentAttempt = {
      ...currentAttempt,
      submittedAt: Date.now(),
      status: 'submitted',
      autoScore: evaluation.autoScore,
      totalScore: evaluation.autoScore + (currentAttempt.essayScore || 0)
    };

    saveSubmission(submittedAttempt);
    saveCurrentAttempt(submittedAttempt);
    setCurrentAttempt(submittedAttempt);
    setIsSubmitModalOpen(false);
    setCurrentScreen('result');
  };

  // Automatic submit on time-out
  const handleAutoSubmit = (attempt: StudentAttempt) => {
    if (attempt.status !== 'in_progress') return;

    const questions = config.versions[attempt.examCode]?.questions || [];
    const evaluation = evaluateExamAttempt(questions, attempt);

    const submittedAttempt: StudentAttempt = {
      ...attempt,
      submittedAt: Date.now(),
      status: 'submitted',
      autoScore: evaluation.autoScore,
      totalScore: evaluation.autoScore + (attempt.essayScore || 0)
    };

    saveSubmission(submittedAttempt);
    saveCurrentAttempt(submittedAttempt);
    setCurrentAttempt(submittedAttempt);
    setIsSubmitModalOpen(false);
    setCurrentScreen('result');
    alert('Hết giờ làm bài! Hệ thống đã tự động nộp bài thi của em.');
  };

  // Jump to specific question by click
  const handleJumpToQuestion = (qIdOrLabel: string) => {
    setIsSubmitModalOpen(false);
    setMobileSidebarOpen(false);

    let targetQ = activeQuestions.find(q => q.id === qIdOrLabel);
    if (!targetQ) {
      // Find by label (e.g. 'I.4' or '4' or 'II.1')
      targetQ = activeQuestions.find(q => {
        const prefix =
          q.sectionId === 'part1'
            ? 'I.'
            : q.sectionId === 'part2'
            ? 'II.'
            : q.sectionId === 'part3'
            ? 'III.'
            : 'IV.';
        return `${prefix}${q.order}` === qIdOrLabel || `${q.order}` === qIdOrLabel;
      });
    }

    if (targetQ) {
      setSelectedSectionId(targetQ.sectionId);
      setSelectedQuestionId(targetQ.id);

      setTimeout(() => {
        const el = document.getElementById(`question_${targetQ.id}`);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 50);
    }
  };

  // Start new exam (Retake)
  const handleStartNewExam = () => {
    clearCurrentAttempt();
    setCurrentAttempt(null);
    setCurrentScreen('login');
  };

  // 1. SCREEN: LOGIN
  if (currentScreen === 'login') {
    return (
      <LoginScreen
        config={config}
        onStartExam={handleStartExam}
        onOpenTeacher={() => setCurrentScreen('teacher')}
        resumeAvailable={
          !!currentAttempt &&
          currentAttempt.status === 'in_progress' &&
          remainingSeconds > 0
        }
        onResumeExam={handleResumeExam}
        resumeInfo={
          currentAttempt
            ? { sbd: currentAttempt.studentCode, code: currentAttempt.examCode }
            : undefined
        }
      />
    );
  }

  // 2. SCREEN: TEACHER DASHBOARD
  if (currentScreen === 'teacher') {
    return (
      <TeacherDashboard
        config={config}
        onUpdateConfig={newCfg => setConfig(newCfg)}
        onClose={() => setCurrentScreen('login')}
      />
    );
  }

  // 3. SCREEN: RESULT
  if (currentScreen === 'result' && currentAttempt) {
    return (
      <ResultScreen
        config={config}
        attempt={currentAttempt}
        questions={activeQuestions}
        onStartNewExam={handleStartNewExam}
      />
    );
  }

  // 4. SCREEN: EXAM TAKING (MÀN HÌNH LÀM BÀI)
  const currentSection = config.sections.find(s => s.id === selectedSectionId) || config.sections[0];
  const sectionQuestions = activeQuestions.filter(q => q.sectionId === selectedSectionId);

  // Compute stats for Submit Modal
  const evaluation = currentAttempt
    ? evaluateExamAttempt(activeQuestions, currentAttempt)
    : { completedCount: 0, unansweredQuestionLabels: [] };

  return (
    <div className="min-h-screen bg-[#F2F4FF] flex flex-col font-sans">
      {/* 5.1 Fixed Header */}
      <ExamHeader
        title={config.title}
        studentCode={currentAttempt?.studentCode || '001'}
        studentName={currentAttempt?.studentName}
        examCode={currentAttempt?.examCode || '901'}
        remainingSeconds={remainingSeconds}
        lastSavedAt={lastSavedAt}
        onSubmitClick={() => setIsSubmitModalOpen(true)}
        onToggleSidebar={() => setMobileSidebarOpen(!mobileSidebarOpen)}
      />

      {/* Main Content Layout */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 flex-1 flex flex-col lg:flex-row gap-6 items-start">
        {/* Desktop Sidebar: QuestionMap & Section Navigation */}
        <div className="hidden lg:block sticky top-24">
          <QuestionMap
            sections={config.sections}
            questions={activeQuestions}
            currentSectionId={selectedSectionId}
            currentQuestionId={selectedQuestionId}
            answers={currentAttempt?.answers || {}}
            markedQuestions={currentAttempt?.markedQuestions || []}
            onSelectSection={secId => {
              setSelectedSectionId(secId);
              const firstQ = activeQuestions.find(q => q.sectionId === secId);
              if (firstQ) setSelectedQuestionId(firstQ.id);
            }}
            onSelectQuestion={qId => {
              setSelectedQuestionId(qId);
              const el = document.getElementById(`question_${qId}`);
              if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }}
          />
        </div>

        {/* Mobile Slide-over Drawer for QuestionMap */}
        {mobileSidebarOpen && (
          <div className="fixed inset-0 z-40 lg:hidden flex">
            <div
              className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs"
              onClick={() => setMobileSidebarOpen(false)}
            />
            <div className="relative ml-auto w-4/5 max-w-sm bg-white h-full p-4 overflow-y-auto z-50 shadow-2xl flex flex-col gap-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <span className="text-sm font-bold text-slate-800">Điều hướng bài thi</span>
                <button
                  type="button"
                  onClick={() => setMobileSidebarOpen(false)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <QuestionMap
                sections={config.sections}
                questions={activeQuestions}
                currentSectionId={selectedSectionId}
                currentQuestionId={selectedQuestionId}
                answers={currentAttempt?.answers || {}}
                markedQuestions={currentAttempt?.markedQuestions || []}
                onSelectSection={secId => {
                  setSelectedSectionId(secId);
                  const firstQ = activeQuestions.find(q => q.sectionId === secId);
                  if (firstQ) setSelectedQuestionId(firstQ.id);
                  setMobileSidebarOpen(false);
                }}
                onSelectQuestion={qId => {
                  setSelectedQuestionId(qId);
                  setMobileSidebarOpen(false);
                  const el = document.getElementById(`question_${qId}`);
                  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }}
              />
            </div>
          </div>
        )}

        {/* Right Main Column: Questions List of Current Section */}
        <main className="flex-1 w-full space-y-6">
          {/* Section Banner Header */}
          <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2.5">
                <span
                  className="w-8 h-8 rounded-xl text-white font-extrabold flex items-center justify-center text-xs shadow-xs"
                  style={{ backgroundColor: currentSection.color }}
                >
                  {currentSection.id === 'part1'
                    ? 'I'
                    : currentSection.id === 'part2'
                    ? 'II'
                    : currentSection.id === 'part3'
                    ? 'III'
                    : 'IV'}
                </span>
                <h2 className="text-lg sm:text-xl font-black text-slate-800">
                  {currentSection.title}. {currentSection.subtitle}
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 font-medium">
                {currentSection.instruction}
              </p>
            </div>

            <div className="text-xs text-slate-400 font-semibold shrink-0">
              {sectionQuestions.length} câu hỏi trong phần này
            </div>
          </div>

          {/* Render All Questions in this section */}
          <div className="space-y-5">
            {sectionQuestions.map((q, idx) => {
              const currentGlobalIndex = activeQuestions.findIndex(item => item.id === q.id);
              const prevQuestion =
                currentGlobalIndex > 0 ? activeQuestions[currentGlobalIndex - 1] : undefined;
              const nextQuestion =
                currentGlobalIndex < activeQuestions.length - 1
                  ? activeQuestions[currentGlobalIndex + 1]
                  : undefined;

              return (
                <QuestionCard
                  key={q.id}
                  question={q}
                  currentIndex={currentGlobalIndex}
                  totalQuestions={activeQuestions.length}
                  answer={currentAttempt?.answers[q.id]}
                  isMarked={currentAttempt?.markedQuestions.includes(q.id) || false}
                  showNoDiacriticsNotice={config.showNoDiacriticsNotice}
                  onToggleMark={() => handleToggleMark(q.id)}
                  onAnswerChange={ans => handleAnswerChange(q.id, ans)}
                  onPrevQuestion={
                    prevQuestion
                      ? () => {
                          setSelectedSectionId(prevQuestion.sectionId);
                          setSelectedQuestionId(prevQuestion.id);
                          const el = document.getElementById(`question_${prevQuestion.id}`);
                          if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        }
                      : undefined
                  }
                  onNextQuestion={
                    nextQuestion
                      ? () => {
                          setSelectedSectionId(nextQuestion.sectionId);
                          setSelectedQuestionId(nextQuestion.id);
                          const el = document.getElementById(`question_${nextQuestion.id}`);
                          if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        }
                      : undefined
                  }
                />
              );
            })}
          </div>

          {/* Bottom Section Switcher / Pagination */}
          <div className="flex items-center justify-between pt-4 pb-12">
            {(() => {
              const secIdx = config.sections.findIndex(s => s.id === selectedSectionId);
              const prevSec = secIdx > 0 ? config.sections[secIdx - 1] : null;
              const nextSec =
                secIdx < config.sections.length - 1 ? config.sections[secIdx + 1] : null;

              return (
                <>
                  {prevSec ? (
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedSectionId(prevSec.id);
                        const firstQ = activeQuestions.find(q => q.sectionId === prevSec.id);
                        if (firstQ) setSelectedQuestionId(firstQ.id);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="px-4 py-2 rounded-xl bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs border border-slate-200 shadow-2xs transition cursor-pointer"
                    >
                      ← Sang {prevSec.title} ({prevSec.subtitle})
                    </button>
                  ) : (
                    <div />
                  )}

                  {nextSec ? (
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedSectionId(nextSec.id);
                        const firstQ = activeQuestions.find(q => q.sectionId === nextSec.id);
                        if (firstQ) setSelectedQuestionId(firstQ.id);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="px-4 py-2 rounded-xl bg-[#3478F6] hover:bg-blue-600 text-white font-bold text-xs shadow-xs transition cursor-pointer"
                    >
                      Sang {nextSec.title} ({nextSec.subtitle}) →
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setIsSubmitModalOpen(true)}
                      className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#F59A38] to-[#EA580C] hover:from-[#EA580C] hover:to-[#C2410C] text-white font-black text-xs uppercase tracking-wide shadow-md transition cursor-pointer"
                    >
                      NỘP BÀI THI ▶
                    </button>
                  )}
                </>
              );
            })()}
          </div>
        </main>
      </div>

      {/* Submit Confirmation Modal */}
      <SubmitConfirmationModal
        isOpen={isSubmitModalOpen}
        unansweredLabels={evaluation.unansweredQuestionLabels}
        totalQuestions={activeQuestions.length}
        completedCount={evaluation.completedCount}
        onCancel={() => setIsSubmitModalOpen(false)}
        onConfirmSubmit={handleConfirmSubmit}
        onJumpToQuestion={handleJumpToQuestion}
      />
    </div>
  );
}
