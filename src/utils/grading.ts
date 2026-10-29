import { Question, StudentAnswer, StudentAttempt } from '../types/exam';

export type QuestionCompletionStatus = 'completed' | 'partial' | 'unanswered';

/**
 * Checks the completion status of a student's answer for a single question.
 */
export const getQuestionStatus = (
  question: Question,
  answer: StudentAnswer | undefined
): QuestionCompletionStatus => {
  if (!answer) return 'unanswered';

  switch (question.type) {
    case 'multiple_choice': {
      if (answer.type === 'multiple_choice' && answer.selectedOption) {
        return 'completed';
      }
      return 'unanswered';
    }

    case 'true_false': {
      if (answer.type === 'true_false' && answer.answers) {
        const subs = question.subQuestions || [];
        if (subs.length === 0) return 'unanswered';
        const answeredCount = subs.filter(
          s => answer.answers[s.id] !== undefined && answer.answers[s.id] !== null
        ).length;
        if (answeredCount === subs.length) return 'completed';
        if (answeredCount > 0) return 'partial';
      }
      return 'unanswered';
    }

    case 'short_answer': {
      if (answer.type === 'short_answer' && answer.value && answer.value.trim().length > 0) {
        return 'completed';
      }
      return 'unanswered';
    }

    case 'essay': {
      if (answer.type === 'essay' && answer.answers) {
        const items = question.essayItems || [];
        if (items.length === 0) return 'unanswered';

        let filledCount = 0;
        for (const it of items) {
          const val = answer.answers[it.id];
          if (val && val.trim().length > 0) {
            filledCount++;
          }
        }

        if (filledCount === items.length) return 'completed';
        if (filledCount > 0) return 'partial';
      }
      return 'unanswered';
    }

    default:
      return 'unanswered';
  }
};

/**
 * Normalize strings for fuzzy comparison in short answers (remove accents optional, lower case, trim spaces)
 */
export const normalizeString = (str: string): string => {
  return str
    .toLowerCase()
    .trim()
    .replace(/\s+/g, ' ');
};

/**
 * Evaluates auto-gradable points for a question.
 */
export const gradeSingleQuestionAuto = (
  question: Question,
  answer: StudentAnswer | undefined
): { score: number; maxScore: number; isFullyGraded: boolean; details?: string } => {
  if (!answer) {
    return { score: 0, maxScore: question.points, isFullyGraded: question.type !== 'essay' };
  }

  switch (question.type) {
    case 'multiple_choice': {
      if (answer.type === 'multiple_choice') {
        const isCorrect = answer.selectedOption === question.correctAnswer;
        return {
          score: isCorrect ? question.points : 0,
          maxScore: question.points,
          isFullyGraded: true
        };
      }
      return { score: 0, maxScore: question.points, isFullyGraded: true };
    }

    case 'true_false': {
      let earned = 0;
      const subs = question.subQuestions || [];
      if (answer.type === 'true_false' && answer.answers) {
        for (const sub of subs) {
          if (answer.answers[sub.id] === sub.correctAnswer) {
            earned += sub.points;
          }
        }
      }
      return {
        score: Math.round(earned * 100) / 100,
        maxScore: question.points,
        isFullyGraded: true
      };
    }

    case 'short_answer': {
      if (answer.type === 'short_answer' && answer.value) {
        const studentVal = normalizeString(answer.value);
        const correctList = (question.correctAnswers || []).map(normalizeString);

        // Direct string match
        if (correctList.includes(studentVal)) {
          return { score: question.points, maxScore: question.points, isFullyGraded: true };
        }

        // Numeric match with comma/dot normalization
        if (question.isNumeric) {
          const numStudent = parseFloat(studentVal.replace(',', '.'));
          if (!isNaN(numStudent)) {
            for (const ca of correctList) {
              const numCorrect = parseFloat(ca.replace(',', '.'));
              if (!isNaN(numCorrect)) {
                const tol = question.tolerance || 0;
                if (Math.abs(numStudent - numCorrect) <= tol) {
                  return { score: question.points, maxScore: question.points, isFullyGraded: true };
                }
              }
            }
          }
        }
      }
      return { score: 0, maxScore: question.points, isFullyGraded: true };
    }

    case 'essay': {
      let autoEarned = 0;
      let hasManualSubItems = false;
      const items = question.essayItems || [];

      if (answer.type === 'essay' && answer.answers) {
        for (const it of items) {
          if (it.type === 'select' && it.correctAnswer) {
            const studentChoice = (answer.answers[it.id] || '').trim().toLowerCase();
            const correctChoice = it.correctAnswer.trim().toLowerCase();
            if (studentChoice === correctChoice) {
              autoEarned += it.points;
            }
          } else {
            hasManualSubItems = true;
          }
        }
      } else {
        hasManualSubItems = true;
      }

      return {
        score: Math.round(autoEarned * 100) / 100,
        maxScore: question.points,
        isFullyGraded: !hasManualSubItems
      };
    }

    default:
      return { score: 0, maxScore: question.points, isFullyGraded: true };
  }
};

/**
 * Calculates complete exam evaluation for an attempt.
 */
export const evaluateExamAttempt = (
  questions: Question[],
  attempt: StudentAttempt
): {
  autoScore: number;
  totalPoints: number;
  totalQuestions: number;
  completedCount: number;
  partialCount: number;
  unansweredCount: number;
  unansweredQuestionLabels: string[];
  pendingEssayCount: number;
} => {
  let autoScore = 0;
  let totalPoints = 0;
  let completedCount = 0;
  let partialCount = 0;
  let unansweredCount = 0;
  let pendingEssayCount = 0;
  const unansweredQuestionLabels: string[] = [];

  for (const q of questions) {
    totalPoints += q.points;
    const ans = attempt.answers[q.id];
    const status = getQuestionStatus(q, ans);

    if (status === 'completed') {
      completedCount++;
    } else if (status === 'partial') {
      partialCount++;
      const label = q.type === 'essay' ? `TL.${q.order}` : `${q.order}`;
      unansweredQuestionLabels.push(label);
    } else {
      unansweredCount++;
      const label = q.type === 'essay' ? `TL.${q.order}` : `${q.order}`;
      unansweredQuestionLabels.push(label);
    }

    const { score, isFullyGraded } = gradeSingleQuestionAuto(q, ans);
    autoScore += score;

    if (!isFullyGraded) {
      pendingEssayCount++;
    }
  }

  return {
    autoScore: Math.round(autoScore * 100) / 100,
    totalPoints: Math.round(totalPoints * 100) / 100,
    totalQuestions: questions.length,
    completedCount,
    partialCount,
    unansweredCount,
    unansweredQuestionLabels,
    pendingEssayCount
  };
};
