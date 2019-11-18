import { ERROR_MESSAGE, 
	SUCCESS_MESSAGE, CLEAR_MESSAGE, 
	LOADING, AUTH_RESPONSE, AUTH_REQUEST } from '../actions';

export const loadingReducer = (state = false, action) => {
	const { loading, type } = action;

	switch (type) {
		case ERROR_MESSAGE:
		case AUTH_RESPONSE:
			return state = false;
			
		case LOADING:
			return state = loading;
			
    case AUTH_REQUEST:
			return state = true;
			
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
			return state = {
				...state,
				message,
				type: 'error'
			};

		case AUTH_RESPONSE:
		case SUCCESS_MESSAGE:
			return state = {
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