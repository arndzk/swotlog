import { FETCH_POSTS, FETCH_CLASSES, DO_POST } from '.';

export const fetchClasses = token => ({ 
  type: FETCH_CLASSES, 
  token
});

export const fetchPosts = token => ({
  type: FETCH_POSTS,
  token
});

export const doPost = (content, classId) => ({
  type: DO_POST,
  content,
  classId
});