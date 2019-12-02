import produce from "immer"
import { POSTS_FETCHED, CLASSES_FETCHED, 
	POST_DONE, COMMENT_DONE, 
	GROUP_DONE, GROUPS_FETCHED, 
	GROUP_DETAILS_FETCHED, TASK_DONE, RELATED_FETCHED,
	FOLLOWED_SUCCESSFULLY, 
	LOGOUT } from '../actions';

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

export const currentGroupReducer = (state = {}, action) => {
	const { group, task, type } = action;

	switch (type) {
		case GROUP_DETAILS_FETCHED:
			return {
				...group[0]
			}
		
		case TASK_DONE:
			return produce(state, newState => {
				if (!newState.tasks)
					newState.tasks = [];

				newState.tasks.unshift(task);
			})
		case LOGOUT:
			return {};
			
		default:
			return state;
	}
}

export const relatedReducer = (state = [], action) => {
	const { related, type, followingId } = action;

	switch(type) {
		case RELATED_FETCHED:
			return state.concat(related);
		
		case FOLLOWED_SUCCESSFULLY:
			return state.filter(rel => rel.id !== followingId);

		case LOGOUT:
			return [];
		default:
			return state;
	}
}