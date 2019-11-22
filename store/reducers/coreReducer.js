import { POSTS_FETCHED } from '../actions';

export const postsReducer = (state = [1], action) => {
	const { posts, type } = action;

	switch (type) {
		case POSTS_FETCHED:
			return state.concat(posts);
			
		default:
			return state;
	}
};