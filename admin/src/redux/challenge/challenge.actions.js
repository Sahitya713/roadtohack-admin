import challengeActionTypes from "./challenge.types";

export const fetchChallengeStart = (hackCode) => ({
  type: challengeActionTypes.FETCH_CHALLENGE_START,
  payload: { hackCode: hackCode },
});

export const fetchChallengeSuccess = (challengeMap) => ({
  type: challengeActionTypes.FETCH_CHALLENGE_SUCCESS,
  payload: challengeMap,
});

export const fetchChallengeFailure = (errorMessage) => ({
  type: challengeActionTypes.FETCH_CHALLENGE_FAILURE,
  payload: errorMessage,
});

export const editChallengeStart = (challenge) => ({
  type: challengeActionTypes.EDIT_CHALLENGE_START,
  payload: challenge,
});

export const editChallengeSuccess = (challenge) => ({
  type: challengeActionTypes.EDIT_CHALLENGE_SUCCESS,
  payload: challenge,
});

export const editChallengeFailure = (errorMessage) => ({
  type: challengeActionTypes.EDIT_CHALLENGE_FAILURE,
  payload: errorMessage,
});
