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
	FETCH_POSTS,
	POSTS_FETCHED,
	DO_POST,
	POST_DONE,
	DO_COMMENT,
	COMMENT_DONE,
	DO_GROUP,
	GROUP_DONE,
	FETCH_GROUPS,
	GROUPS_FETCHED,
	FETCH_GROUP_DETAILS,
	GROUP_DETAILS_FETCHED,
	DO_TASK,
	TASK_DONE,
	FETCH_RELATED,
	RELATED_FETCHED,
	DO_FOLLOW,
	FOLLOWED_SUCCESSFULLY
} from 'actions';

// api.doFetch always expects all data under data:

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

function* doFollow({ followingId }) {
	const done = yield call(api.doFetch, { data: { followingId }, route: '/follow/create' });
	
	if (done.message) {
		const { related } = yield select();
		
		yield put({
			type: FOLLOWED_SUCCESSFULLY,
			message: done.message,
			followingId,
			followed: related.find(rel => rel.id === followingId),
		})
	}
}

function* doTask({ id, content, assigneeId }) {
	const task = yield call(api.doFetch, { data: { id, content, assigneeId }, route: '/tasks/create'});
	
	if (task.message) {
		const { user: { id: userId, firstName, lastName, email, followers } } = yield select();
		const assignee = followers.find(follower => follower.id === assigneeId);
		yield put({
			type: TASK_DONE,
			message: task.message,
			task: {
				id: task.data.id,
				content,
				author: {
					id: userId,
					firstName,
					lastName,
					email
				},
				assignee
			}
		})
	}
}

function* doGroup({ title }) {
	const group = yield call(api.doFetch, { data: { title }, route: '/groups/create' })

	if (group.message) {
		const { user: { id, firstName, lastName, email } } = yield select();

		yield put({
			type: GROUP_DONE,
			message: group.message,
			group:{
				title,
				id: group.data.id,
				creator: {
					id,
					firstName,
					lastName,
					email
				}
			}
		})
	}
}

function* doPost({ content, classId }) {
	
	const post = yield call(api.doFetch, { data: {
		content, classId
	}, route: '/posts/create' });
	
	
	if (post.message) {
		const { user: { id, firstName, lastName, email }, classes } = yield select();
		const { id: cid, name } = classes.find(c => c.id === classId);

		yield put({
			type: POST_DONE,
			message: post.message,
			post: {
				id: post.data.id,
				content,
				class: {
					id: cid,
					name
				},
				author: { id, firstName, lastName, email }
			}
		});
	}
}

function* doComment({ content, id }) {
	const comment = yield call(api.doFetch, { data: { content, id }, route: '/comments/create' })

	if (comment.message) {
		const { user: { id: userId, firstName, lastName }} = yield select();

		yield put({
			type: COMMENT_DONE,
			message: comment.message,
			comment: {
				postId: id,
				id: comment.data.id,
				content,
				author: {
					id: userId,
					firstName,
					lastName
				}
			}
		})
	}
}

function* fetchRelated({ token }) {
	try {
		const related = yield call(api.doFetch, { token, route: '/related'});
		if (!related.error) {
			yield put({
				type: RELATED_FETCHED,
				related,
			})
		}
	} catch (e) {}
}

function* fetchGroupDetails({ token, id }) {
	const group = yield call(api.doFetch, { token, route: `/groups/${id}`})

	if (!group.error && group.length) {
		yield put({
			type: GROUP_DETAILS_FETCHED,
			group
		})
	}
}

function* fetchGroups({ token }) {
	const groups = yield call(api.doFetch, { token, route: '/groups' });
	
	if (!groups.error) {
		yield put({
			type: GROUPS_FETCHED,
			groups,
		})
	}
}

function* fetchPosts({ token }) {
	const posts = yield call(api.doFetch, { token, route: '/posts' })

	yield put({
		type: POSTS_FETCHED,
		posts
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
	try {
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
	} catch (e) {
		yield put({
			type: ERROR_MESSAGE,
			message: 'Wrong credentials supplied'
		})
	}
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
	yield takeLatest(FETCH_POSTS, fetchPosts);
	yield takeLatest(FETCH_GROUPS, fetchGroups);
	yield takeLatest(FETCH_GROUP_DETAILS, fetchGroupDetails);
	yield takeLatest(FETCH_RELATED, fetchRelated);

	// CORE DO
	yield takeLatest(DO_POST, doPost);
	yield takeLatest(DO_COMMENT, doComment);
	yield takeLatest(DO_GROUP, doGroup);
	yield takeLatest(DO_TASK, doTask);
	yield takeLatest(DO_FOLLOW, doFollow);
	
	// PUT
	yield takeLatest(UPDATE_USER_DETAILS, updateUserData);
}

export default rootSaga;