import { createSelector } from "reselect";

export const selectQuestion = (state) => state.question;

export const selectQuestions = createSelector(
  [selectQuestion],
  (question) => question.questions
);

export const selectCurrQuestion = (questionUrlParam) =>
  createSelector([selectQuestions], (qns) =>
    qns.find((qn) => qn.slug === questionUrlParam)
  );

export const selectQuestionError = createSelector(
  [selectQuestion],
  (qn) => qn.errorMessage
);

export const selectQuestionAddError = createSelector(
  [selectQuestion],
  (qn) => qn.addError
);
export const selectQuestionEditError = createSelector(
  [selectQuestion],
  (qn) => qn.editError
);
