import groupActionTypes from "./group.types";

const INITIAL_STATE = {
  groups: null,
  isFetching: true,
  groupError: undefined,
};

const groupReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case groupActionTypes.FETCH_GROUPS_START:
    case groupActionTypes.UPDATE_GROUP_SUCCESS:
    case groupActionTypes.CREATE_GROUP_SUCCESS:
    case groupActionTypes.DELETE_GROUP_SUCCESS:
      return {
        ...state,
        isFetching: true,
        groupError: undefined,
      };
    case groupActionTypes.FETCH_GROUPS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        groups: action.payload,
        groupError: undefined,
      };
    case groupActionTypes.FETCH_GROUPS_FAILURE:
    case groupActionTypes.UPDATE_GROUP_FAILURE:
    case groupActionTypes.CREATE_GROUP_FAILURE:
    case groupActionTypes.DELETE_GROUP_FAILURE:
      return {
        ...state,
        isFetching: false,
        groupError: action.payload,
      };

    default:
      console.log("reducer triggered");
      return state;
  }
};

export default groupReducer;
