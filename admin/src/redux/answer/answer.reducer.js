import answerActionTypes from "./answer.types";

const INITIAL_STATE = {
  answers: null,
  errorMessage: undefined,
  isFetching: null,
};

const answerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case answerActionTypes.FETCH_QUESTION_ANSWERS_SUCCESS:
      return {
        ...state,
        answers: action.payload,
        isFetching: false,
        errorMessage: undefined,
      };
    case answerActionTypes.UPDATE_SCORE_SUCCESS:
      return {
        ...state,
        isFetching: true,
        errorMessage: undefined,
      };

    case answerActionTypes.FETCH_QUESTION_ANSWERS_FAILURE:
    case answerActionTypes.UPDATE_SCORE_FAILURE:
    case answerActionTypes.DOWNLOAD_CODE_FAILURE:
      return {
        ...state,
        errorMessage: action.payload,
        isFetching: false,
      };

    case answerActionTypes.FETCH_QUESTION_ANSWERS_START:
      return {
        ...state,
        isFetching: true,
      };

    default:
      return state;
  }
};

export default answerReducer;
