import { createSelector } from "reselect";

const selectUser = (state) => state.user;

export const selectCurrentUser = createSelector(
  [selectUser],
  (user) => user.currentUser
);

export const selectCurrentUserName = createSelector([selectUser], (user) =>
  user.currentUser ? user.currentUser.displayName : ""
);

export const isUserFetching = createSelector(
  [selectUser],
  (user) => !!user.isFetching
);

export const selectSignInError = createSelector([selectUser], (user) => {
  return user.error;
});
