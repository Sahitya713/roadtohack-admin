import { takeLatest, put, all, call } from "redux-saga/effects";

import {
  fetchQuestionAnswersSuccess,
  fetchQuestionAnswersFailure,
  updateScoreFailure,
  updateScoreSuccess,
  downloadCodeFailure,
} from "./answer.actions";

import axios from "axios";

import answerActionTypes from "./answer.types";
export function* fetchQuestionAnswersAsync(action) {
  try {
    const res = yield axios({
      url: `/api/v1/answer/get-question-answers/${action.payload.question}`,
      method: "get",
    });

    const answers = res.data.data;
    yield put(fetchQuestionAnswersSuccess(answers));
  } catch (error) {
    yield put(fetchQuestionAnswersFailure(error.response.data.message));
  }
}

export function* updateScoreAsync(action) {
  try {
    const { answerId, score, questionId } = action.payload;
    yield axios({
      url: `/api/v1/answer/update-score/${answerId}`,
      method: "PATCH",
      data: { score },
    });

    yield put(updateScoreSuccess(questionId));
  } catch (error) {
    yield put(updateScoreFailure(error.response.data.message));
  }
}
export function* downloadCodeAsync(action) {
  try {
    const response = yield axios({
      url: `/api/v1/answer/download-code/${action.payload.url}`,
      method: "get",
    });

    const link = document.createElement("a");
    link.href = response.data.data;
    link.setAttribute("download", "file2.py");
    document.body.appendChild(link);
    link.click();
  } catch (error) {
    yield put(downloadCodeFailure(error.response.data.message));
  }
}
export function* onFetchQuestionAnswersStart() {
  yield takeLatest(
    answerActionTypes.FETCH_QUESTION_ANSWERS_START,
    fetchQuestionAnswersAsync
  );
}
export function* onUpdateScoreSuccess() {
  yield takeLatest(
    answerActionTypes.UPDATE_SCORE_SUCCESS,
    fetchQuestionAnswersAsync
  );
}

export function* onUpdateScoreStart() {
  yield takeLatest(answerActionTypes.UPDATE_SCORE_START, updateScoreAsync);
}

export function* downloadCodeFile() {
  yield takeLatest(answerActionTypes.DOWNLOAD_CODE_START, downloadCodeAsync);
}

export function* answerSagas() {
  yield all([
    call(onFetchQuestionAnswersStart),
    call(onUpdateScoreStart),
    call(onUpdateScoreSuccess),
    call(downloadCodeFile),
  ]);
}
