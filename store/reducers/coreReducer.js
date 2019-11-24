import { POSTS_FETCHED, CLASSES_FETCHED } from '../actions';

export const postsReducer = (state = [1], action) => {
	const { posts, type } = action;

	switch (type) {
		case POSTS_FETCHED:
			return state.concat(posts);
			
		default:
			return state;
	}
};

export const classesReducer = (state = [], action) => {
	const { payload, type } = action;
	
	switch (type) {
		case CLASSES_FETCHED: 
			return state.concat(payload)

		default:
			return state;
	}
}