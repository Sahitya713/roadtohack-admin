import { createSelector } from "reselect";

const selectleaderboard = (state) => state.leaderboard;

export const selectScores = createSelector(
  [selectleaderboard],
  (leaderboard) => leaderboard.scores
);

export const selectIsLeaderboardFetching = createSelector(
  [selectleaderboard],
  (leaderboard) => leaderboard.isFetching
);
