import { takeLatest, all, put, call } from "redux-saga/effects";

import {
  deleteGroupFailure,
  deleteGroupSuccess,
  fetchGroupsFailure,
  fetchGroupsSuccess,
  updateGroupFailure,
  updateGroupSuccess,
  createGroupSuccess,
  createGroupFailure,
} from "./group.actions";

import axios from "axios";

import groupActionTypes from "./group.types";
import UserActionTypes from "../user/user.types";

export function* fetchGroupsAsync() {
  try {
    const res = yield axios({
      url: `/api/v1/group/get-groups/1234567`,
      method: "get",
    });

    const groups = res.data.data;
    yield put(fetchGroupsSuccess(groups));
  } catch (error) {
    yield put(fetchGroupsFailure(error.response.data.message));
  }
}

export function* deleteGroupAsync(action) {
  try {
    yield axios({
      url: `/api/v1/group/${action.payload.groupId}`,
      method: "DELETE",
    });
    yield put(deleteGroupSuccess());
  } catch (error) {
    yield put(deleteGroupFailure(error.response.data.message));
  }
}

export function* createGroupAsync(action) {
  try {
    var formdata = new FormData();

    const { name, members } = action.payload;

    formdata.append("name", name);

    formdata.append("members", JSON.stringify(members));
    formdata.append("hackCode", "1234567");

    yield axios({
      url: `/api/v1/group/`,
      method: "POST",
      data: formdata,
    });
    yield put(createGroupSuccess());
  } catch (error) {
    yield put(createGroupFailure(error.response.data.message));
  }
}

export function* updateGroupAsync(action) {
  try {
    var formdata = new FormData();

    const { groupId, group } = action.payload;
    if (group.name) {
      formdata.append("name", group.name);
    }
    if (group.members) {
      formdata.append("members", JSON.stringify(group.members));
    }
    yield axios({
      url: `/api/v1/group/${groupId}`,
      method: "PATCH",
      data: formdata,
    });
    yield put(updateGroupSuccess());
  } catch (error) {
    yield put(updateGroupFailure(error.response.data.message));
  }
}

export function* onUpdateGroup() {
  yield takeLatest(groupActionTypes.UPDATE_GROUP_START, updateGroupAsync);
}
export function* onDeleteGroup() {
  yield takeLatest(groupActionTypes.DELETE_GROUP_START, deleteGroupAsync);
}
export function* onCreateGroup() {
  yield takeLatest(groupActionTypes.CREATE_GROUP_START, createGroupAsync);
}
export function* onUpdateSuccess() {
  yield takeLatest(groupActionTypes.UPDATE_GROUP_SUCCESS, fetchGroupsAsync);
}
export function* onSignInSuccess() {
  yield takeLatest(UserActionTypes.SIGN_IN_SUCCESS, fetchGroupsAsync);
}
export function* onDeleteSuccess() {
  yield takeLatest(groupActionTypes.DELETE_GROUP_SUCCESS, fetchGroupsAsync);
}
export function* onCreateSuccess() {
  yield takeLatest(groupActionTypes.CREATE_GROUP_SUCCESS, fetchGroupsAsync);
}

export function* groupSagas() {
  yield all([
    call(onSignInSuccess),
    call(onUpdateGroup),
    call(onUpdateSuccess),
    call(onCreateGroup),
    call(onCreateSuccess),
    call(onDeleteGroup),
    call(onDeleteSuccess),
  ]);
}
