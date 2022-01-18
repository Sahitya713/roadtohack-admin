import answerActionTypes from "./answer.types";

export const fetchQuestionAnswersStart = (question) => ({
  type: answerActionTypes.FETCH_QUESTION_ANSWERS_START,
  payload: { question },
});

export const fetchQuestionAnswersSuccess = (answers) => ({
  type: answerActionTypes.FETCH_QUESTION_ANSWERS_SUCCESS,
  payload: answers,
});

export const fetchQuestionAnswersFailure = (errorMessage) => ({
  type: answerActionTypes.FETCH_QUESTION_ANSWERS_FAILURE,
  payload: errorMessage,
});

export const updateScoreStart = (score) => ({
  type: answerActionTypes.UPDATE_SCORE_START,
  payload: score,
});

export const updateScoreSuccess = (questionId) => ({
  type: answerActionTypes.UPDATE_SCORE_SUCCESS,
  payload: { question: questionId },
});

export const updateScoreFailure = (errorMessage) => ({
  type: answerActionTypes.UPDATE_SCORE_FAILURE,
  payload: errorMessage,
});

export const downloadCodeStart = (url) => ({
  type: answerActionTypes.DOWNLOAD_CODE_START,
  payload: { url },
});

export const downloadCodeSuccess = () => ({
  type: answerActionTypes.DOWNLOAD_CODE_SUCCESS,
  // payload: questions,
});

export const downloadCodeFailure = (errorMessage) => ({
  type: answerActionTypes.DOWNLOAD_CODE_FAILURE,
  payload: errorMessage,
});
