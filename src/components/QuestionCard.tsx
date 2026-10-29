import React from 'react';
import { Bookmark, ChevronLeft, ChevronRight } from 'lucide-react';
import { Question, StudentAnswer } from '../types/exam';
import { MultipleChoiceQuestion } from './questions/MultipleChoiceQuestion';
import { TrueFalseQuestion } from './questions/TrueFalseQuestion';
import { ShortAnswerQuestion } from './questions/ShortAnswerQuestion';
import { EssayQuestion } from './questions/EssayQuestion';

interface QuestionCardProps {
  question: Question;
  currentIndex: number;
  totalQuestions: number;
  answer: StudentAnswer | undefined;
  isMarked: boolean;
  showNoDiacriticsNotice?: boolean;
  onToggleMark: () => void;
  onAnswerChange: (answer: StudentAnswer) => void;
  onPrevQuestion?: () => void;
  onNextQuestion?: () => void;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  currentIndex,
  totalQuestions,
  answer,
  isMarked,
  showNoDiacriticsNotice,
  onToggleMark,
  onAnswerChange,
  onPrevQuestion,
  onNextQuestion
}) => {
  const getQuestionLabel = () => {
    if (question.type === 'essay') return `Câu ${question.order} (Tự luận)`;
    return `Câu ${question.order}`;
  };

  return (
    <article
      id={`question_${question.id}`}
      className="bg-white rounded-3xl p-5 sm:p-7 border border-slate-200/90 shadow-sm transition space-y-4"
    >
      {/* Top Meta Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-extrabold text-base sm:text-lg text-slate-900">
            {getQuestionLabel()}
          </span>

          <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-md">
            {question.points} điểm
          </span>

          {question.level && (
            <span className="text-xs font-medium text-slate-500">
              [{question.level}]
              {question.difficulty && <span className="ml-1 text-slate-400">· {question.difficulty}</span>}
            </span>
          )}
        </div>

        {/* Bookmark / Mark for Review button */}
        <button
          type="button"
          onClick={onToggleMark}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer border ${
            isMarked
              ? 'bg-orange-50 text-orange-600 border-orange-300 shadow-2xs'
              : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
          }`}
          title="Đánh dấu để xem lại sau trước khi nộp bài"
        >
          <Bookmark className={`w-3.5 h-3.5 ${isMarked ? 'fill-orange-500 text-orange-500' : ''}`} />
          <span>{isMarked ? 'Đang đánh dấu xem lại' : 'Đánh dấu xem lại'}</span>
        </button>
      </div>

      {/* Question Content */}
      <div className="text-sm sm:text-base font-semibold text-slate-800 leading-relaxed">
        {question.content}
      </div>

      {/* Render Answer Interface based on Question Type */}
      {question.type === 'multiple_choice' && (
        <MultipleChoiceQuestion
          options={question.options || []}
          selectedOption={answer?.type === 'multiple_choice' ? answer.selectedOption : null}
          onSelectOption={optionId => {
            onAnswerChange({ type: 'multiple_choice', selectedOption: optionId });
          }}
        />
      )}

      {question.type === 'true_false' && (
        <TrueFalseQuestion
          subQuestions={question.subQuestions || []}
          answers={answer?.type === 'true_false' ? answer.answers : {}}
          onAnswerChange={(subId, value) => {
            const currentAnswers = answer?.type === 'true_false' ? { ...answer.answers } : {};
            currentAnswers[subId] = value;
            onAnswerChange({ type: 'true_false', answers: currentAnswers });
          }}
        />
      )}

      {question.type === 'short_answer' && (
        <ShortAnswerQuestion
          value={answer?.type === 'short_answer' ? answer.value : ''}
          placeholder={question.shortPlaceholder}
          isNumeric={question.isNumeric}
          onChange={val => {
            onAnswerChange({ type: 'short_answer', value: val });
          }}
        />
      )}

      {question.type === 'essay' && (
        <EssayQuestion
          essayItems={question.essayItems}
          answers={answer?.type === 'essay' ? answer.answers : {}}
          showNoDiacriticsNotice={showNoDiacriticsNotice}
          onItemAnswerChange={(itemId, val) => {
            const currentAnswers = answer?.type === 'essay' ? { ...answer.answers } : {};
            currentAnswers[itemId] = val;
            onAnswerChange({ type: 'essay', answers: currentAnswers });
          }}
        />
      )}

      {/* Bottom Navigation Buttons: Prev / Next Question */}
      <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
        <button
          type="button"
          onClick={onPrevQuestion}
          disabled={!onPrevQuestion}
          className={`flex items-center gap-1 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition ${
            onPrevQuestion
              ? 'text-slate-700 bg-slate-100 hover:bg-slate-200 cursor-pointer'
              : 'text-slate-300 bg-slate-50 cursor-not-allowed'
          }`}
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Câu trước</span>
        </button>

        <span className="text-xs text-slate-400 font-medium">
          Câu {currentIndex + 1} / {totalQuestions}
        </span>

        <button
          type="button"
          onClick={onNextQuestion}
          disabled={!onNextQuestion}
          className={`flex items-center gap-1 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition ${
            onNextQuestion
              ? 'text-white bg-[#3478F6] hover:bg-[#2B66DE] cursor-pointer shadow-2xs'
              : 'text-slate-300 bg-slate-50 cursor-not-allowed'
          }`}
        >
          <span>Câu tiếp</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </article>
  );
};
