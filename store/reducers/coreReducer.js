import { POSTS_FETCHED, CLASSES_FETCHED, POST_DONE } from '../actions';

export const postsReducer = (state = [], action) => {
	const { posts, post, type } = action;
	
	switch (type) {
		case POSTS_FETCHED:
			return state.concat(posts);
		case POST_DONE:
			const newPosts = [...state];
			newPosts.unshift(post);

			return newPosts;
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