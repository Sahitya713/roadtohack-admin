import { createSelector } from "reselect";

export const selectGroup = (state) => state.group;

export const selectGroups = createSelector(
  [selectGroup],
  (group) => group.groups
);

export const selectGroupError = createSelector(
  [selectGroup],
  (group) => group.groupError
);
