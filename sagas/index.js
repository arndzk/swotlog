import { call, put, takeEvery } from 'redux-saga/effects';
import * as api from '../api';
import {
  ERROR_MESSAGE,
  AUTH_REQUEST,
  AUTH_RESPONSE,
} from 'actions';

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
}

export default rootSaga;