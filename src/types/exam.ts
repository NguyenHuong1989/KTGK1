/**
 * Types for Phòng Thi Tin Học THCS
 */

export type QuestionType = 'multiple_choice' | 'true_false' | 'short_answer' | 'essay';

export interface OptionItem {
  id: string; // 'A' | 'B' | 'C' | 'D'
  text: string;
}

export interface TrueFalseSubItem {
  id: string; // 'a', 'b', 'c', 'd'
  label: string; // "a)", "b)", etc.
  statement: string;
  correctAnswer: boolean; // true = Đúng, false = Sai
  points: number;
}

export interface EssaySubItem {
  id: string;
  prompt: string;
  type: 'select' | 'textarea';
  choices?: string[]; // for 'select'
  correctAnswer?: string; // for auto-checking 'select'
  placeholder?: string;
  points: number;
  sampleAnswer?: string; // guidance for teacher
}

export interface Question {
  id: string;
  sectionId: string;
  order: number;
  type: QuestionType;
  content: string;
  points: number;
  level?: 'Nhận biết' | 'Thông hiểu' | 'Vận dụng' | 'Vận dụng cao';
  difficulty?: 'Dễ' | 'Trung bình' | 'Khó';
  // For multiple_choice
  options?: OptionItem[];
  correctAnswer?: string; // 'A' | 'B' | 'C' | 'D'
  // For true_false
  subQuestions?: TrueFalseSubItem[];
  // For short_answer
  correctAnswers?: string[]; // acceptable answers, e.g. ["8", "tám"]
  isNumeric?: boolean;
  tolerance?: number;
  shortPlaceholder?: string;
  // For essay
  essayItems?: EssaySubItem[];
  gradingCriteria?: string;
  explanation?: string;
}

export interface ExamSection {
  id: string;
  title: string;
  subtitle: string;
  instruction: string;
  color: string;
  badgeColor: string;
  type: QuestionType;
}

export interface ExamVersion {
  code: string; // '601', '602'
  name: string;
  questions: Question[];
}

export interface ExamConfig {
  id: string;
  title: string;
  subject: string;
  grade: string;
  schoolName: string;
  durationMinutes: number;
  totalPoints: number;
  instructions: string[];
  sections: ExamSection[];
  versions: Record<string, ExamVersion>;
  allowRetake: boolean;
  showScoreAfterSubmit: boolean;
  showAnswersAfterSubmit: boolean;
  showNoDiacriticsNotice: boolean;
  requireStudentName: boolean;
}

export type StudentAnswer =
  | { type: 'multiple_choice'; selectedOption: string | null }
  | { type: 'true_false'; answers: Record<string, boolean | null> }
  | { type: 'short_answer'; value: string }
  | { type: 'essay'; answers: Record<string, string> };

export interface StudentAttempt {
  attemptId: string;
  examId: string;
  examCode: string; // '601' | '602'
  studentCode: string; // SBD
  studentName?: string;
  studentClass?: string;
  startedAt: number; // timestamp
  submittedAt?: number; // timestamp
  answers: Record<string, StudentAnswer>;
  markedQuestions: string[]; // list of question IDs marked for review
  status: 'in_progress' | 'submitted' | 'graded';
  autoScore: number;
  essayScore: number;
  totalScore: number;
  teacherNotes?: string;
  essayItemScores?: Record<string, number>;
}
