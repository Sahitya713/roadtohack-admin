import UserActionTypes from "./user.types";

const INITIAL_STATE = {
  currentUser: null,
  error: null,
  isFetching: true,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UserActionTypes.SIGN_IN_SUCCESS:
      return {
        ...state,
        currentUser: action.payload,
        error: null,
        isFetching: false,
      };
    case UserActionTypes.SIGN_OUT_SUCCESS:
      return {
        ...state,
        currentUser: null,
        error: null,
      };
    case UserActionTypes.SIGN_IN_FAILURE:
      return {
        ...state,
        error: action.payload,
        isFetching: false,
      };
    case UserActionTypes.SIGN_OUT_FAILURE:
      return {
        ...state,
        error: action.payload,
        isFetching: false,
      };

    case UserActionTypes.CHECK_USER_SESSION:
      return {
        ...state,
        isFetching: true,
      };
    case UserActionTypes.CHECK_USER_SESSION_END:
      return {
        ...state,
        isFetching: false,
      };

    default:
      return state;
  }
};

export default userReducer;
