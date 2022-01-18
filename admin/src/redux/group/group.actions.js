import groupActionTypes from "./group.types";

export const fetchGroupsStart = (hackCode) => ({
  type: groupActionTypes.FETCH_GROUPS_START,
  payload: { hackCode: hackCode },
});

export const fetchGroupsSuccess = (groups) => ({
  type: groupActionTypes.FETCH_GROUPS_SUCCESS,
  payload: groups,
});

export const fetchGroupsFailure = (errorMessage) => ({
  type: groupActionTypes.FETCH_GROUPS_FAILURE,
  payload: errorMessage,
});

export const updateGroupStart = (group) => ({
  type: groupActionTypes.UPDATE_GROUP_START,
  payload: group,
});

export const updateGroupSuccess = (currGroup) => ({
  type: groupActionTypes.UPDATE_GROUP_SUCCESS,
  payload: currGroup,
});

export const updateGroupFailure = (errorMessage) => ({
  type: groupActionTypes.UPDATE_GROUP_FAILURE,
  payload: errorMessage,
});

export const deleteGroupStart = (groupId) => ({
  type: groupActionTypes.DELETE_GROUP_START,
  payload: { groupId },
});

export const deleteGroupSuccess = () => ({
  type: groupActionTypes.DELETE_GROUP_SUCCESS,
});

export const deleteGroupFailure = (errorMessage) => ({
  type: groupActionTypes.DELETE_GROUP_FAILURE,
  payload: errorMessage,
});

export const createGroupStart = (group) => ({
  type: groupActionTypes.CREATE_GROUP_START,
  payload: group,
});

export const createGroupSuccess = () => ({
  type: groupActionTypes.CREATE_GROUP_SUCCESS,
});

export const createGroupFailure = (errorMessage) => ({
  type: groupActionTypes.CREATE_GROUP_FAILURE,
  payload: errorMessage,
});
