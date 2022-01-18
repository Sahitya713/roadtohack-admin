import questionActionTypes from "./question.types";

export const fetchQuestionsStart = (hackCode) => ({
  type: questionActionTypes.FETCH_QUESTIONS_START,
  payload: { hackCode: hackCode },
});

export const fetchQuestionsSuccess = (questions) => ({
  type: questionActionTypes.FETCH_QUESTIONS_SUCCESS,
  payload: questions,
});

export const fetchQuestionsFailure = (errorMessage) => ({
  type: questionActionTypes.FETCH_QUESTIONS_FAILURE,
  payload: errorMessage,
});

export const downloadInputStart = (url) => ({
  type: questionActionTypes.DOWNLOAD_INPUT_START,
  payload: { url },
});

export const downloadInputSuccess = () => ({
  type: questionActionTypes.DOWNLOAD_INPUT_SUCCESS,
  // payload: questions,
});

export const downloadInputFailure = (errorMessage) => ({
  type: questionActionTypes.DOWNLOAD_INPUT_FAILURE,
  payload: errorMessage,
});

export const deleteQuestionStart = (questionId) => ({
  type: questionActionTypes.DELETE_QUESTION_START,
  payload: questionId,
});

export const deleteQuestionSuccess = () => ({
  type: questionActionTypes.DELETE_QUESTION_SUCCESS,
});

export const deleteQuestionFailure = (errorMessage) => ({
  type: questionActionTypes.DELETE_QUESTION_FAILURE,
  payload: errorMessage,
});

export const editQuestionStart = (question) => ({
  type: questionActionTypes.EDIT_QUESTION_START,
  payload: question,
});

export const editQuestionSuccess = () => ({
  type: questionActionTypes.EDIT_QUESTION_SUCCESS,
});

export const editQuestionFailure = (errorMessage) => ({
  type: questionActionTypes.EDIT_QUESTION_FAILURE,
  payload: errorMessage,
});

export const createQuestionStart = (question) => ({
  type: questionActionTypes.CREATE_QUESTION_START,
  payload: question,
});

export const createQuestionSuccess = () => ({
  type: questionActionTypes.CREATE_QUESTION_SUCCESS,
});

export const createQuestionFailure = (errorMessage) => ({
  type: questionActionTypes.CREATE_QUESTION_FAILURE,
  payload: errorMessage,
});

export const setErrorsNull = () => ({
  type: questionActionTypes.SET_ERRORS_NULL,
});
