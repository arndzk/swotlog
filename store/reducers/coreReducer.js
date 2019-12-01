import produce from "immer"
import { POSTS_FETCHED, CLASSES_FETCHED, 
	POST_DONE, COMMENT_DONE, 
	GROUP_DONE, GROUPS_FETCHED } from '../actions';

export const postsReducer = (state = [], action) => {
	const { posts, post, type, comment } = action;
	
	switch (type) {
		case POSTS_FETCHED:
			return state.concat(posts);
		case POST_DONE:
			const newPosts = [...state];
			newPosts.unshift(post);

			return newPosts;
		case COMMENT_DONE:
			const { postId, ...newComment } = comment;
			return produce(state, newState => {
				const postToChange = newState.find(post => post.id === postId);
				if (!postToChange.comments)
					postToChange.comments = [];

				postToChange.comments.push(newComment);
			});
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

export const groupsReducer = (state = [], action) => {
	const { groups, group, type } = action;

	switch (type) {
		case GROUP_DONE:
			return state.concat(group);

		case GROUPS_FETCHED:
			return state.concat(groups);

		default:
			return state;
	}
}