import Router from 'next/router'
import { select, call, put, takeLatest, all } from 'redux-saga/effects';
import * as api from '../api';
import {
	// GENERAL
	ERROR_MESSAGE,

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
	CLASSES_FETCHED,
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

function* fetchClasses({ token }) {
	try {
		const [ 
			classes,
			subscribed,
			passed,
		] = yield all([
			call(api.doFetch, { token, route: '/classes' }),
			call(api.doFetch, { token, route: '/users/subscribed' }),
			call(api.doFetch, { token, route: '/users/passed' }),
		]);

		yield put({
			type: CLASSES_FETCHED,
			payload: {
				classes,
				subscribed,
				passed
			},
		})
	} catch (error) {
		yield put({ type: ERROR_MESSAGE, message: error });
	}
}

function* fetchUserInfo ({ cookies }) {
	try {
		const user = yield call(api.doFetch, {
			internalRoute: '/auth/user',
			...cookies
		});

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
      api.doFetch, {
				internalRoute: '/auth/signin',
				data: {
					email,
					password
				}
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
		const done = yield call(api.doFetch, { 
			internalRoute: '/auth/signup',
			data 
		});

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
	yield takeLatest(FETCH_CLASSES, fetchClasses);

	// PUT
	yield takeLatest(UPDATE_USER_DETAILS, updateUserData);
}

export default rootSaga;