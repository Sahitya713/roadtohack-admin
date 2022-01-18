import challengeActionTypes from "./challenge.types";
const INITIAL_STATE = {
  currChallenge: null,
  // currChallenge: {
  //   challengeCode: "123456",
  //   description: "hey There this is a test game yall!",
  //   id: 3,
  //   start: new Date(2021, 6, 16, 10),
  //   end: new Date(2021, 6, 29, 10),
  //   // note: y, m, d, h (month is from 0 to 6)
  // },

  isFetching: false,
  errorMessage: undefined,

  // can be waiting, ongoing, and finished
};

const challengeReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case challengeActionTypes.FETCH_CHALLENGE_START:
      return {
        ...state,
        isFetching: true,
      };
    case challengeActionTypes.FETCH_CHALLENGE_SUCCESS:
    case challengeActionTypes.EDIT_CHALLENGE_SUCCESS:
      return {
        ...state,
        isFetching: false,
        currChallenge: action.payload,
      };
    case challengeActionTypes.FETCH_CHALLENGE_FAILURE:
    case challengeActionTypes.EDIT_CHALLENGE_FAILURE:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.payload,
      };

    default:
      return state;
  }
};

export default challengeReducer;
