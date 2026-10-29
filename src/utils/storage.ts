import { ExamConfig, StudentAttempt } from '../types/exam';
import { INITIAL_EXAM_CONFIG } from '../data/defaultExamData';

const STORAGE_KEYS = {
  EXAM_CONFIG: 'tinhoc9_lytutrong_exam_config_v2',
  CURRENT_ATTEMPT: 'tinhoc9_current_attempt_v2',
  ALL_SUBMISSIONS: 'tinhoc9_all_submissions_v2',
  TEACHER_PIN: 'tinhoc_teacher_pin_v2'
};

export const getExamConfig = (): ExamConfig => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.EXAM_CONFIG);
    if (!raw) return INITIAL_EXAM_CONFIG;
    const parsed = JSON.parse(raw);
    // Sanity check for Grade 9 exam
    if (parsed && parsed.versions && (parsed.versions['901'] || parsed.versions['902'])) {
      return parsed;
    }
    return INITIAL_EXAM_CONFIG;
  } catch (e) {
    console.error('Error loading exam config from localStorage:', e);
    return INITIAL_EXAM_CONFIG;
  }
};

export const saveExamConfig = (config: ExamConfig): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.EXAM_CONFIG, JSON.stringify(config));
  } catch (e) {
    console.error('Error saving exam config:', e);
  }
};

export const resetExamConfigToDefault = (): ExamConfig => {
  try {
    localStorage.removeItem(STORAGE_KEYS.EXAM_CONFIG);
  } catch (e) {
    console.error('Error resetting exam config:', e);
  }
  return INITIAL_EXAM_CONFIG;
};

export const getCurrentAttempt = (): StudentAttempt | null => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.CURRENT_ATTEMPT);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (e) {
    console.error('Error reading current attempt:', e);
    return null;
  }
};

export const saveCurrentAttempt = (attempt: StudentAttempt): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.CURRENT_ATTEMPT, JSON.stringify(attempt));
  } catch (e) {
    console.error('Error saving current attempt:', e);
  }
};

export const clearCurrentAttempt = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEYS.CURRENT_ATTEMPT);
  } catch (e) {
    console.error('Error clearing current attempt:', e);
  }
};

export const getAllSubmissions = (): StudentAttempt[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.ALL_SUBMISSIONS);
    if (!raw) {
      // Seed with 2 sample student submissions for THCS Lý Tự Trọng - Lớp 9
      const sampleAttempts: StudentAttempt[] = [
        {
          attemptId: 'sample_att_901_1',
          examId: 'exam_thcs_lytutrong_tinhoc9_gk1',
          examCode: '901',
          studentCode: '001',
          studentName: 'Nguyễn Đăng Khoa',
          studentClass: '9/1',
          startedAt: Date.now() - 40 * 60 * 1000,
          submittedAt: Date.now() - 5 * 60 * 1000,
          answers: {
            'q901_1': { type: 'multiple_choice', selectedOption: 'B' },
            'q901_2': { type: 'multiple_choice', selectedOption: 'D' },
            'q901_3': { type: 'multiple_choice', selectedOption: 'B' },
            'q901_4': { type: 'multiple_choice', selectedOption: 'A' },
            'q901_5': { type: 'multiple_choice', selectedOption: 'C' },
            'q901_13': {
              type: 'true_false',
              answers: { a: true, b: false, c: false, d: true }
            },
            'q901_14': {
              type: 'true_false',
              answers: { a: true, b: true, c: true, d: false }
            },
            'q901_17': {
              type: 'essay',
              answers: {
                item_1_a: 'Nguyện vọng 1 chọn Trường 3 vì điểm 31.5 vừa sức (32 điểm) và có CLB Tin học. Nguyện vọng 2 chọn Trường 2 (28 điểm) để an toàn.',
                item_1_b: 'Tránh trượt tất cả nguyện vọng và tránh đi học quá xa.'
              }
            }
          },
          markedQuestions: [],
          status: 'graded',
          autoScore: 6.5,
          essayScore: 2.5,
          totalScore: 9.0,
          teacherNotes: 'Lập luận chọn trường rất logic và khoa học, nắm vững kiến thức.'
        },
        {
          attemptId: 'sample_att_901_2',
          examId: 'exam_thcs_lytutrong_tinhoc9_gk1',
          examCode: '901',
          studentCode: '018',
          studentName: 'Phạm Minh Anh',
          studentClass: '9/2',
          startedAt: Date.now() - 50 * 60 * 1000,
          submittedAt: Date.now() - 10 * 60 * 1000,
          answers: {
            'q901_1': { type: 'multiple_choice', selectedOption: 'B' },
            'q901_2': { type: 'multiple_choice', selectedOption: 'D' },
            'q901_3': { type: 'multiple_choice', selectedOption: 'B' }
          },
          markedQuestions: ['q901_12'],
          status: 'submitted',
          autoScore: 5.75,
          essayScore: 0,
          totalScore: 5.75,
          teacherNotes: ''
        }
      ];
      localStorage.setItem(STORAGE_KEYS.ALL_SUBMISSIONS, JSON.stringify(sampleAttempts));
      return sampleAttempts;
    }
    return JSON.parse(raw);
  } catch (e) {
    console.error('Error reading all submissions:', e);
    return [];
  }
};

export const saveSubmission = (attempt: StudentAttempt): void => {
  try {
    const list = getAllSubmissions();
    const existingIndex = list.findIndex(a => a.attemptId === attempt.attemptId);
    if (existingIndex >= 0) {
      list[existingIndex] = attempt;
    } else {
      list.unshift(attempt);
    }
    localStorage.setItem(STORAGE_KEYS.ALL_SUBMISSIONS, JSON.stringify(list));
  } catch (e) {
    console.error('Error saving submission:', e);
  }
};

export const getTeacherPin = (): string => {
  return localStorage.getItem(STORAGE_KEYS.TEACHER_PIN) || '1234';
};

export const setTeacherPin = (pin: string): void => {
  localStorage.setItem(STORAGE_KEYS.TEACHER_PIN, pin);
};
