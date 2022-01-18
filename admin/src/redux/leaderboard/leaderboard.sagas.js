import { takeLatest, all, call, put } from "redux-saga/effects";

import {
  fetchLeaderboardSuccess,
  fetchLeaderboardFailure,
} from "./leaderboard.actions";

import axios from "axios";
import leaderboardActionTypes from "./leaderboard.types";

export function* fetchLeaderboardAsync(action) {
  try {
    console.log(action.payload);
    const res = yield axios({
      url: `/api/v1/answer/get-leaderboard/${action.payload.hackCode}`,
      method: "get",
    });

    const scores = res.data.data;

    yield put(fetchLeaderboardSuccess(scores));
  } catch (error) {
    yield put(fetchLeaderboardFailure(error.response.data.message));
  }
}
export function* onFetchLeaderboardStart() {
  yield takeLatest(
    leaderboardActionTypes.FETCH_LEADERBOARD_START,
    fetchLeaderboardAsync
  );
}

export function* leaderboardSagas() {
  yield all([call(onFetchLeaderboardStart)]);
}
