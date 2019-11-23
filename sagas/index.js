import { select, call, put, takeEvery, delay } from 'redux-saga/effects';
import * as api from '../api';
import {
  ERROR_MESSAGE,
  AUTH_REQUEST,
	AUTH_RESPONSE,
	FETCH_USER_DETAILS,
	USER_DETAILS
} from 'actions';

function* fetchUserDetails() {
	const { user: { id } } = yield select(); // use id for fetch

	try {
		// fancy api call to get details
		// yield delay(2000);

		const userDetails = {
			subs: [
				{
					"classId": 0,
					"className": "b3171ea5-7dea-46f1-87f0-2aed55ecc9e4",
					"status": true
				},
				{
					"classId": 1,
					"className": "b6d1f126-f8c6-4baf-81c3-2aa8744eee78",
					"status": true
				},
				{
					"classId": 2,
					"className": "dc10e4e9-631e-490c-b602-7564a747c017",
					"status": false
				},
				{
					"classId": 3,
					"className": "959470b1-0736-437b-8e56-1081eee7dfab",
					"status": false
				},
				{
					"classId": 4,
					"className": "327a0e07-bbe9-434d-8041-accd0af0f068",
					"status": true
				}
			],
			passed: [
				{
					"classId": 0,
					"className": "790a9952-dc38-4479-91a1-3073e42fb024",
					"status": false
				},
				{
					"classId": 1,
					"className": "b26cbbb8-94da-4c15-8579-b059b0a9047a",
					"status": false
				},
				{
					"classId": 2,
					"className": "af1bb37c-d969-4274-804b-984812ed57c2",
					"status": true
				},
				{
					"classId": 3,
					"className": "6f3a294c-8c38-4e7f-8b9e-365aeaf8730a",
					"status": true
				},
				{
					"classId": 4,
					"className": "2b251760-a4d1-45a9-9a9f-bb212bba1207",
					"status": false
				}
			]
		}

		if (!userDetails.error) { // Shall we say that if something is wrong I should expect a `.error`?¿
			yield put({
				type: USER_DETAILS,
				userDetails
			});
		} else {
			throw "Something went wrong";
		}
	} catch (error) {
		yield put({ type: ERROR_MESSAGE, message: error });
	}
}

function* requestAuthentication(action) {
  const { email, password } = action;
  
	try {
		const user = yield call(
      api.requestAuthentication, {
      email,
      password
		});

		if (user.id) {
			yield put({
				type: AUTH_RESPONSE,
        user,
        message: `Welcome ${user.firstName}!`
			});
		} else {
			throw "Something went wrong";
		}
	} catch (error) {
		yield put({ type: ERROR_MESSAGE, message: error });
	}
}

function* rootSaga() {
	yield takeEvery(AUTH_REQUEST, requestAuthentication);
	yield takeEvery(FETCH_USER_DETAILS, fetchUserDetails);
}

export default rootSaga;