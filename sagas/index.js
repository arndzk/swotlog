import Router from 'next/router'
import { call, put, takeLatest, all } from 'redux-saga/effects';
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

function* updateUserData({ data, dataToStore }) {
	const done = yield call(api.doFetch, { data, route: '/users/update' });

	if (done.error) throw done.error;

	yield put({ 
		type: USER_DETAILS_UPDATED,
		user: {
			...data,
			...dataToStore,
		},
		message: 'User details updated successfully!'
	});
}

function* fetchClasses({ token }) {
	const [ 
		classes,
		hasSubscribed,
		hasPassed,
	] = yield all([
		call(api.doFetch, { token, route: '/classes' }),
		call(api.doFetch, { token, route: '/users/subscribed' }),
		call(api.doFetch, { token, route: '/users/passed' }),
	]);

	yield put({
		type: CLASSES_FETCHED,
		classes,
		hasSubscribed,
		hasPassed
	})
}

function* fetchUserInfo ({ cookies }) {
	const user = yield call(api.doFetch, {
		internalRoute: '/auth/user',
		...cookies
	});

	if (!user.id) throw "Something went wrong";

	yield put({
		type: USER_INFO_FETCHED,
		user,
	});
}

function* requestAuthentication(action) {
  const { email, password } = action;
	const user = yield call(
		api.doFetch, {
			internalRoute: '/auth/signin',
			data: {
				email,
				password
			}
	});

	if (!user.id) throw "Something went wrong";

	yield put({
		type: AUTH_RESPONSE,
		user,
		message: `Welcome ${user.firstName}!`
	});

	Router.push('/');
}

function* signUp({ data }) {
	const done = yield call(api.doFetch, { 
		route: '/users/create',
		data 
	});

	yield put({
		type: SIGN_UP_SUCCESS,
		message: done.message
	})

	Router.push('/signin');
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