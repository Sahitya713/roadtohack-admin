import { all, call } from "redux-saga/effects";

import { userSagas } from "./user/user.sagas";
import { challengeSagas } from "./challenge/challenge.sagas";
import { groupSagas } from "./group/group.sagas";
import { questionSagas } from "./question/question.sagas";
import { answerSagas } from "./answer/answerr.sagas";
import { leaderboardSagas } from "./leaderboard/leaderboard.sagas";

export default function* rootSaga() {
  yield all([
    call(userSagas),
    call(challengeSagas),
    call(groupSagas),
    call(questionSagas),
    call(answerSagas),
    call(leaderboardSagas),
  ]);
}
