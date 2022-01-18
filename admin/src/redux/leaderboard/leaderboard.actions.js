import leaderboardActionTypes from "./leaderboard.types";

export const fetchLeaderboardStart = (hackCode) => ({
  type: leaderboardActionTypes.FETCH_LEADERBOARD_START,
  payload: { hackCode },
});

export const fetchLeaderboardSuccess = (scores) => ({
  type: leaderboardActionTypes.FETCH_LEADERBOARD_SUCCESS,
  payload: scores,
});

export const fetchLeaderboardFailure = (errorMessage) => ({
  type: leaderboardActionTypes.FETCH_LEADERBOARD_FAILURE,
  payload: errorMessage,
});
