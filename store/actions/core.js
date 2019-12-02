import { FETCH_POSTS, FETCH_CLASSES, 
  DO_POST, DO_COMMENT, DO_GROUP, 
  FETCH_GROUPS, FETCH_GROUP_DETAILS, DO_TASK } from '.';

export const fetchClasses = token => ({ 
  type: FETCH_CLASSES, 
  token
});

export const fetchPosts = token => ({
  type: FETCH_POSTS,
  token
});

export const fetchGroups = token => ({
  type: FETCH_GROUPS,
  token
})

export const fetchGroupDetails = (token, id) => ({
  type: FETCH_GROUP_DETAILS,
  token,
  id
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

export const doGroup = title => ({
  type: DO_GROUP,
  title,
})

export const doTask = (id, content, assigneeId) => ({
  type: DO_TASK,
  id,
  content,
  assigneeId
})