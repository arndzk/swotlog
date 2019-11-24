import Router from 'next/router'
import { select, call, put, takeLatest } from 'redux-saga/effects';
import * as api from '../api';
import {
	// GENERAL
	ERROR_MESSAGE,
	MAP_ACTIONS,

	// USER
	SIGN_UP,
	SIGN_UP_SUCCESS,
  AUTH_REQUEST,
	AUTH_RESPONSE,
	FETCH_USER_INFO,
	USER_INFO_FETCHED,
	UPDATE_USER_DETAILS,
	USER_DETAILS_UPDATED,

	// CORE
	FETCH_CLASSES,
} from 'actions';

function* updateUserData({ data }) { // TODO: those data have a meaning only to backend. I should try normalize them for me
	const { user: { id } } = yield select(); // use id for fetch
	// const done = yield call(
	// 	api.updateUserInfo, {
	// 	id,
	// 	data
	// });

	try {
		if (done) { 
			yield put({ type: USER_DETAILS_UPDATED });
		} else {
			throw "Something went wrong";
		}
	} catch (error) {
		yield put({ type: ERROR_MESSAGE, message: error });
	}
}



function* doFetch({ type, token, route }) {
	try {
		const payload = yield call(api.doFetch, { token, route });
		
		yield put({
			type: MAP_ACTIONS[type],
			payload,
		})
	} catch (error) {
		yield put({ type: ERROR_MESSAGE, message: error });
	}
}

function* fetchUserInfo ({ cookies }) {
	try {
		const user = yield call(api.fetchUserInfo, cookies);

		if (user.id) {
			yield put({
				type: USER_INFO_FETCHED,
        user,
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

      Router.push('/');
		} else {
			throw "Something went wrong";
		}
	} catch (error) {
		yield put({ type: ERROR_MESSAGE, message: error });
	}
}

function* signUp({ data }) {
	try {
		const done = yield call(api.signUp, data);

		yield put({
			type: SIGN_UP_SUCCESS,
			message: done.message
		})

		Router.push('/signin');
	} catch (error) {
		yield put({ type: ERROR_MESSAGE, message: error });
	}
}

function* rootSaga() {
	// USER
	yield takeLatest(AUTH_REQUEST, requestAuthentication);
	yield takeLatest(FETCH_USER_INFO, fetchUserInfo);
	yield takeLatest(SIGN_UP, signUp);

	// CORE FETCH
	yield takeLatest(FETCH_CLASSES, doFetch);

	// PUT
	yield takeLatest(UPDATE_USER_DETAILS, updateUserData);
}

export default rootSaga;