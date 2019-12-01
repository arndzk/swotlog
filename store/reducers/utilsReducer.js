import { ERROR_MESSAGE, 
	SUCCESS_MESSAGE, CLEAR_MESSAGE, 
	LOADING, AUTH_RESPONSE, AUTH_REQUEST, 
	UPDATE_USER_DETAILS, USER_DETAILS_UPDATED,
	SIGN_UP_SUCCESS, DO_POST, DO_COMMENT, POST_DONE, COMMENT_DONE } from '../actions';

export const loadingReducer = (state = false, action) => {
	const { loading, type } = action;

	switch (type) {
		case ERROR_MESSAGE:
		case USER_DETAILS_UPDATED:
		case AUTH_RESPONSE:
		case COMMENT_DONE:
		case POST_DONE:
			return false;
			
		case LOADING:
			return loading;
			
    case AUTH_REQUEST:
		case UPDATE_USER_DETAILS:
		case DO_POST:
		case DO_COMMENT:
			return true;
			
		default:
			return state;
	}
};

const initialNotificationReducer = {
	message: '',
	type: ''
}

export const notificationReducer = (state = initialNotificationReducer, action) => {
	const { message, type } = action;

	switch (type) {
		case ERROR_MESSAGE:
			return {
				...state,
				message,
				type: 'error'
			};

		case AUTH_RESPONSE:
		case SIGN_UP_SUCCESS:
		case USER_DETAILS_UPDATED:
		case SUCCESS_MESSAGE:
		case COMMENT_DONE:
		case POST_DONE:
			return {
				...state,
				message,
				type: 'success'
			};

		case CLEAR_MESSAGE: 
			return initialNotificationReducer;
			
		default:
			return state;
	}
};