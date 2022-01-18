import leaderboardActionTypes from "./leaderboard.types";

const INITIAL_STATE = {
  isFetching: null,
  errorMessage: undefined,
  scores: null,
};

const leaderboardReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case leaderboardActionTypes.FETCH_LEADERBOARD_START:
      return {
        ...state,
        isFetching: true,
      };
    case leaderboardActionTypes.FETCH_LEADERBOARD_SUCCESS:
      return {
        ...state,
        scores: action.payload,
        isFetching: false,
      };
    case leaderboardActionTypes.FETCH_LEADERBOARD_FAILURE:
      return {
        ...state,
        errorMessage: action.payload,
        isFetching: false,
      };

    default:
      return state;
  }
};

export default leaderboardReducer;
