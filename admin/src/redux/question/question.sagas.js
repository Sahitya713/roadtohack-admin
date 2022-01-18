import { takeLatest, all, put, call } from "redux-saga/effects";

import UserActionTypes from "../user/user.types";

import axios from "axios";
import {
  fetchQuestionsFailure,
  fetchQuestionsSuccess,
  downloadInputFailure,
  deleteQuestionSuccess,
  deleteQuestionFailure,
  editQuestionFailure,
  editQuestionSuccess,
  createQuestionFailure,
  createQuestionSuccess,
  // downloadInputSuccess,
} from "./question.actions";
import questionActionTypes from "./question.types";

export function* fetchQuestionsAsync(action) {
  try {
    const res = yield axios({
      url: `/api/v1/question/get-questions/1234567`,
      method: "get",
    });

    const questions = res.data.data;
    yield put(fetchQuestionsSuccess(questions));
  } catch (error) {
    yield put(fetchQuestionsFailure(error.response.data.message));
  }
}

export function* downloadInputAsync(action) {
  try {
    const response = yield axios({
      url: `/api/v1/question/download/${action.payload.url}`,
      method: "get",
    });

    const link = document.createElement("a");
    link.href = response.data.data;
    link.setAttribute("download", "file2.py");
    document.body.appendChild(link);
    link.click();
  } catch (error) {
    yield put(downloadInputFailure(error.response.data.message));
  }
}

export function* deleteQuestionAsync(action) {
  try {
    yield axios({
      url: `/api/v1/question/${action.payload}`,
      method: "DELETE",
    });
    yield put(deleteQuestionSuccess());
  } catch (error) {
    yield put(deleteQuestionFailure(error.response.data.message));
  }
}
export function* createQuestionAsync(action) {
  try {
    var formdata = new FormData();
    const {
      questionType,
      question,
      title,
      location,
      image,
      points,
      sampleInput,
      sampleOutput,
      input,
      inputs,
      correctAnswers,
      correctOptions,
      option1,
      option2,
      option3,
      option4,
      rationale,
    } = action.payload;
    const locations = {
      "Tiong Bahru Market": {
        name: "Tiong Bahru Market",

        long: 103.8324,
        lat: 1.2851,
      },
      "Tiong Bahru Community Center": {
        name: "Tiong Bahru Community Center",

        long: 103.8319,
        lat: 1.2835,
      },
      "Zhangde Primary School": {
        name: "Zhangde Primary School",

        long: 103.82604,
        lat: 1.28443,
      },
      "Tiong Bahru Air Raid Shelter": {
        name: "Tiong Bahru Air Raid Shelter",

        long: 103.83021,
        lat: 1.28326,
      },
      "Tiong Bahru Plaza": {
        name: "Tiong Bahru Plaza",
        long: 103.82715,
        lat: 1.28653,
      },
      "Tiong Bahru Bakery": {
        name: "Tiong Bahru Bakery",
        long: 103.83365,
        lat: 1.28448,
      },
      "Tiong Bahru Galicier Pastry": {
        name: "Tiong Bahru Galicier Pastry",
        long: 103.8343703,
        lat: 1.284306,
      },
      "Holiday Inn Singapore Atrium": {
        name: "Holiday Inn Singapore Atrium",
        long: 103.834197,
        lat: 1.28904,
      },
      "SPD Headquarters": {
        name: "SPD Headquarters",
        long: 103.8312046,
        lat: 1.28206678,
      },
      "Block 26 (Singapore Improvement Trust Flat)": {
        name: "Block 26 (Singapore Improvement Trust Flat)",
        long: 103.830825,
        lat: 1.285693,
      },
    };
    formdata.append("title", title);
    formdata.append("hackCode", "1234567");
    formdata.append("question", question);
    formdata.append("questionType", questionType);
    formdata.append("points", points);
    formdata.append("location", JSON.stringify(locations[location]));
    if (image !== "" || image !== undefined || image !== "undefined") {
      formdata.append("image", image);
    }
    if (questionType === "code") {
      formdata.append("input", input);
    } else if (questionType === "input") {
      formdata.append("inputs", JSON.stringify(inputs));
      formdata.append("correctAnswers", JSON.stringify(correctAnswers));
      formdata.append("sampleInput", JSON.stringify(sampleInput));
      formdata.append("sampleOutput", JSON.stringify(sampleOutput));
      formdata.append("rationale", rationale);
    } else {
      formdata.append("rationale", rationale);
      if (correctOptions.length === 0) {
        yield put(
          createQuestionFailure("At least one correct option must be selected")
        );
        return;
      }
      if (
        option1 === "" ||
        option2 === "" ||
        option3 === "" ||
        option4 === ""
      ) {
        yield put(
          createQuestionFailure("Please ensure all the options are given.")
        );
        return;
      }
      formdata.append("correctOptions", JSON.stringify(correctOptions));
      formdata.append("option1", option1);
      formdata.append("option2", option2);
      formdata.append("option3", option3);
      formdata.append("option4", option4);
    }
    // formdata.append("members", JSON.stringify(selectedOptions));
    yield axios({
      url: `/api/v1/question/`,
      method: "POST",
      data: formdata,
    });
    yield put(createQuestionSuccess());
  } catch (error) {
    yield put(createQuestionFailure(error.response.data.message));
  }
}
export function* editQuestionAsync(action) {
  try {
    yield axios({
      url: `/api/v1/question/${action.payload.QuestionId}`,
      method: "PATCH",
    });
    yield put(editQuestionSuccess());
  } catch (error) {
    yield put(editQuestionFailure(error.response.data.message));
  }
}
export function* onSignInSuccess() {
  yield takeLatest(UserActionTypes.SIGN_IN_SUCCESS, fetchQuestionsAsync);
}
export function* onDeleteQuestionSuccess() {
  yield takeLatest(
    questionActionTypes.DELETE_QUESTION_SUCCESS,
    fetchQuestionsAsync
  );
}
export function* onEditQuestionSuccess() {
  yield takeLatest(
    questionActionTypes.EDIT_QUESTION_SUCCESS,
    fetchQuestionsAsync
  );
}
export function* onCreateQuestionSuccess() {
  yield takeLatest(
    questionActionTypes.CREATE_QUESTION_SUCCESS,
    fetchQuestionsAsync
  );
}

export function* onCreateQuestionStart() {
  yield takeLatest(
    questionActionTypes.CREATE_QUESTION_START,
    createQuestionAsync
  );
}
export function* onEditQuestionStart() {
  yield takeLatest(questionActionTypes.EDIT_QUESTION_START, editQuestionAsync);
}
export function* onDeleteQuestionStart() {
  yield takeLatest(
    questionActionTypes.DELETE_QUESTION_START,
    deleteQuestionAsync
  );
}

export function* downloadInputFile() {
  yield takeLatest(
    questionActionTypes.DOWNLOAD_INPUT_START,
    downloadInputAsync
  );
}

export function* questionSagas() {
  yield all([
    call(onSignInSuccess),
    call(downloadInputFile),
    call(onEditQuestionStart),
    call(onDeleteQuestionStart),
    call(onCreateQuestionStart),
    call(onCreateQuestionSuccess),
    call(onDeleteQuestionSuccess),
    call(onEditQuestionSuccess),
  ]);
}
