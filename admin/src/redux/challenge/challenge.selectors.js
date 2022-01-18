import { createSelector } from "reselect";
import { selectGroup } from "../group/group.selectors";
import { selectQuestion } from "../question/question.selectors";
import { selectAnswer } from "../answer/answer.selectors";
import { questionSagas } from "../question/question.sagas";
const selectChallenge = (state) => state.challenge;

export const selectCurrChallenge = createSelector(
  [selectChallenge],
  (challenge) => challenge.currChallenge
);

export const selectStatus = createSelector(
  [selectChallenge],
  (challenge) => challenge.challengeStatus
);

// export const selectIsChallengeInitialised = createSelector(
//   [selectChallenge, selectGroup, selectQuestion, selectAnswer],
//   (challenge, group, question, answer) =>
//     !!challenge.currChallenge &&
//     !!group.currGroup &&
//     !!question.questions &&
//     !!answer.answers
// );

export const selectIsChallengeInitialised = createSelector(
  [selectChallenge, selectQuestion, selectGroup],
  (challenge, question, group) => {
    return !!challenge.currChallenge && !!question.questions && !!group.groups;
  }
);
