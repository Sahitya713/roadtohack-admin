import { takeLatest, put, all, call } from "redux-saga/effects";
import {
  editChallengeFailure,
  editChallengeSuccess,
  fetchChallengeFailure,
  fetchChallengeSuccess,
} from "./challenge.actions";

import axios from "axios";

import challengeActionTypes from "./challenge.types";
import UserActionTypes from "../user/user.types";

export function* fetchChallengeAsync(action) {
  try {
    const res = yield axios({
      url: "/api/v1/challenge/1234567",
      method: "get",
    });
    const challenge = res.data.data[0];

    yield put(fetchChallengeSuccess(challenge));
  } catch (error) {
    yield put(fetchChallengeFailure(error.response.data.message));
  }
}

export function* editChallengeAsync(action) {
  try {
    console.log("HELLO FRM CHallenge ");
    const { challengeId, challenge } = action.payload;
    const res = yield axios({
      url: `/api/v1/challenge/${challengeId}`,
      method: "PATCH",
      data: challenge,
    });

    const challenge_doc = res.data.data;
    console.log(challenge_doc);
    yield put(editChallengeSuccess(challenge_doc));
  } catch (error) {
    yield put(editChallengeFailure(error.response.data.message));
  }
}

export function* onSignInSuccess() {
  yield takeLatest(UserActionTypes.CHECK_USER_SESSION, fetchChallengeAsync);
}

export function* onEditChallenge() {
  yield takeLatest(
    challengeActionTypes.EDIT_CHALLENGE_START,
    editChallengeAsync
  );
}

export function* challengeSagas() {
  yield all([call(onSignInSuccess), call(onEditChallenge)]);
}
