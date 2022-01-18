import { createSelector } from "reselect";

export const selectAnswer = (state) => state.answer;

export const selectAnswers = createSelector(
  [selectAnswer],
  (answer) => answer.answers
);

// export const selectCurrAnswer = (questionId) =>
//   createSelector([selectAnswers], (answers) => {
//     console.log(questionId);
//     return answers.find((ans) => ans.question.slug === questionId);
//   });

export const selectAnswerError = createSelector(
  [selectAnswer],
  (ans) => ans.errorMessage
);

export const selectIsAnswersFetching = createSelector(
  [selectAnswer],
  (ans) => ans.isFetching
);
