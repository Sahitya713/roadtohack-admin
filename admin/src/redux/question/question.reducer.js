import questionActionTypes from "./question.types";

const INITIAL_STATE = {
  questions: null,
  isFetching: false,
  errorMessage: null,
  addError: null,
  editError: null,
};

const questionReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case questionActionTypes.FETCH_QUESTIONS_START:
      return {
        ...state,
        isFetching: true,
      };
    case questionActionTypes.FETCH_QUESTIONS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        questions: action.payload,
        errorMessage: null,
      };
    case questionActionTypes.CREATE_QUESTION_SUCCESS:
      return {
        ...state,
        isFetching: true,
        addError: "Question Successfully Created!",
      };
    case questionActionTypes.EDIT_QUESTION_SUCCESS:
      return {
        ...state,
        isFetching: true,
        addError: "Question Successfully Edited!",
      };
    case questionActionTypes.DELETE_QUESTION_SUCCESS:
      return {
        ...state,
        isFetching: true,
      };
    case questionActionTypes.FETCH_QUESTIONS_FAILURE:
    case questionActionTypes.DELETE_QUESTION_FAILURE:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.payload,
      };
    case questionActionTypes.CREATE_QUESTION_FAILURE:
      return {
        ...state,
        isFetching: false,
        addError: action.payload,
      };
    case questionActionTypes.EDIT_QUESTION_FAILURE:
      return {
        ...state,
        isFetching: false,
        editError: action.payload,
      };
    case questionActionTypes.SET_ERRORS_NULL:
      return {
        ...state,
        errorMessage: null,
        addError: null,
        editError: null,
      };

    default:
      return state;
  }
};

export default questionReducer;
