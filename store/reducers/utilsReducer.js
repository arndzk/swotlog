import { ERROR, LOADING, AUTH_RESPONSE, AUTH_REQUEST } from '../actions';

export const loadingReducer = (state = false, action) => {
	const { loading, type } = action;

	switch (type) {
		case ERROR:
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

export const errorReducer = (state = '', action) => {
	const { error, type } = action;

	switch (type) {
		case ERROR:
			return state = error;

		default:
			return state;
	}
};