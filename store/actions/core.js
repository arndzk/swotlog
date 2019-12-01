export const fetchClasses = token => ({ 
  type: 'FETCH_CLASSES', 
  token
});

export const fetchPosts = token => ({
  type: 'FETCH_POSTS',
  token,
})