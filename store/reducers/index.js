import { combineReducers } from 'redux'
import userReducer from './userReducer';
import { loadingReducer, notificationReducer } from './utilsReducer';
import { postsReducer, classesReducer } from './coreReducer';

export default combineReducers({
  user: userReducer,

  loading: loadingReducer,
  notification: notificationReducer,

  posts: postsReducer,
  classes: classesReducer,
});

