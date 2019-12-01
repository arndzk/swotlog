import { POSTS_FETCHED, CLASSES_FETCHED } from '../actions';

export const postsReducer = (state = [], action) => {
	const { posts, type } = action;

	switch (type) {
		case POSTS_FETCHED:
			return state.concat(posts);
			
		default:
			return state;
	}
};

export const classesReducer = (state = [], action) => {
	const { classes, type } = action;
	
	switch (type) {
		case CLASSES_FETCHED: 
			return state.concat(classes);

		default:
			return state;
	}
}