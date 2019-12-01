import { FETCH_POSTS, FETCH_CLASSES, 
  DO_POST, DO_COMMENT } from '.';

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

export const doComment = (content, id) => ({
  type: DO_COMMENT,
  content,
  id
})